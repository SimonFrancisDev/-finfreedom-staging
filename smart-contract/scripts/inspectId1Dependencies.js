// Polygon reads and local artifact comparison only. No signer is constructed.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { ethers } = require("ethers");
const cbor = require("cbor");

const ROOT = path.resolve(__dirname, "../../..");
const IMPL = "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc";
const MANAGER = "0x0E9De0F24eB4774834A2c4A63eaBa8356A4A4B53";
const json = value => JSON.stringify(value, null, 2);

function compiledCandidates() {
  const matches = [];
  const directories = [
    path.join(ROOT, "tmp/id1-pre-change-build-info"),
    path.join(ROOT, "Smart-Contract/artifacts/build-info"),
    path.resolve(__dirname, "../artifacts/build-info"),
  ];
  for (const directory of directories) {
    if (!fs.existsSync(directory)) continue;
    for (const file of fs.readdirSync(directory).filter(name => name.endsWith(".json"))) {
      const build = JSON.parse(fs.readFileSync(path.join(directory, file), "utf8"));
      for (const [source, contracts] of Object.entries(build.output.contracts)) {
        for (const name of ["AutoUpgradeEscrow", "FreedomTokenController"]) {
          if (!contracts[name]) continue;
          matches.push({ source, name, file: path.relative(ROOT, path.join(directory, file)),
            compiler: build.solcLongVersion, contract: contracts[name],
            astSources: build.output.sources,
            sourceSha256: ethers.sha256(ethers.toUtf8Bytes(build.input.sources[source].content)) });
        }
      }
    }
  }
  return matches;
}

function normalize(hex, references) {
  let bytes = hex.replace(/^0x/, "").toLowerCase();
  for (const entries of Object.values(references || {})) {
    for (const { start, length } of entries) {
      assert((start + length) * 2 <= bytes.length, "Invalid immutable reference");
      bytes = bytes.slice(0, start * 2) + "0".repeat(length * 2) + bytes.slice((start + length) * 2);
    }
  }
  return bytes;
}

function splitMetadata(hex) {
  const count = Number.parseInt(hex.slice(-4), 16) + 2;
  assert(Number.isFinite(count) && count * 2 < hex.length, "Invalid metadata length");
  const start = hex.length - count * 2;
  const values = cbor.decodeAllSync(Buffer.from(hex.slice(start, -4), "hex"));
  assert.equal(values.length, 1);
  assert(Buffer.isBuffer(values[0].solc), "Missing Solidity compiler marker");
  return { executable: hex.slice(0, start), metadata: Object.fromEntries(
    Object.entries(values[0]).map(([key, value]) => [key, Buffer.isBuffer(value) ? value.toString("hex") : value])) };
}

function verifyImmutables(candidate, runtime, implementation) {
  const references = candidate.contract.evm.deployedBytecode.immutableReferences || {};
  const declarations = new Map();
  function visit(node) {
    if (!node || typeof node !== "object") return;
    if (references[String(node.id)]) declarations.set(String(node.id), node);
    for (const value of Object.values(node)) {
      if (Array.isArray(value)) value.forEach(visit);
      else if (value && typeof value === "object") visit(value);
    }
  }
  Object.values(candidate.astSources).forEach(source => visit(source.ast));
  for (const [id, entries] of Object.entries(references)) {
    const declaration = declarations.get(id);
    assert.equal(declaration?.name, "__self", "Unexpected immutable; requires explicit binding review");
    assert.equal(declaration.value?.kind, "typeConversion");
    assert.equal(declaration.value.arguments[0].name, "this");
    for (const { start, length } of entries) {
      assert.equal("0x" + runtime.slice(2 + start * 2, 2 + (start + length) * 2).toLowerCase(),
        ethers.zeroPadValue(implementation, length).toLowerCase(), "UUPS self binding differs from implementation");
    }
  }
}

async function main() {
  assert(process.env.ID1_MAINNET_REPLAY_RPC, "Explicit mainnet read-only RPC required");
  const snapshot = JSON.parse(fs.readFileSync(path.join(ROOT, "tmp/id1-repair-prestate.json"), "utf8"));
  assert.equal(snapshot.chainId, 137);
  assert.equal(snapshot.addresses.manager.toLowerCase(), MANAGER.toLowerCase());
  const request = new ethers.FetchRequest(process.env.ID1_MAINNET_REPLAY_RPC);
  request.timeout = 20000;
  const provider = new ethers.JsonRpcProvider(request, undefined, { batchMaxCount: 1, cacheTimeout: -1 });
  const report = { sourceChainId: 137, block: snapshot.block, blockHash: snapshot.blockHash,
    writes: 0, manager: MANAGER, dependencies: [] };
  try {
    assert.equal((await provider.getNetwork()).chainId, 137n);
    assert.equal((await provider.getBlock(snapshot.block)).hash, snapshot.blockHash);
    const manager = new ethers.Contract(MANAGER, [
      "function escrow() view returns (address)",
      "function tokenController() view returns (address)",
      "function usdt() view returns (address)",
      "function registration() view returns (address)",
    ], provider);
    const candidates = compiledCandidates();
    for (const [getter, name] of [["escrow", "AutoUpgradeEscrow"], ["tokenController", "FreedomTokenController"]]) {
      const proxy = await manager[getter]({ blockTag: snapshot.block });
      assert.notEqual(proxy, ethers.ZeroAddress);
      const implementation = ethers.getAddress("0x" + (await provider.getStorage(proxy, IMPL, snapshot.block)).slice(-40));
      assert.notEqual(implementation, ethers.ZeroAddress);
      const runtime = await provider.getCode(implementation, snapshot.block);
      assert.notEqual(runtime, "0x");
      const row = { name, proxy, implementation, runtimeKeccak256: ethers.keccak256(runtime),
        runtimeBytes: (runtime.length - 2) / 2, metadata: splitMetadata(runtime.slice(2)).metadata,
        exactMatches: [], executableOnlyMatches: [] };
      for (const candidate of candidates.filter(item => item.name === name)) {
        const bytecode = candidate.contract.evm.deployedBytecode;
        if (bytecode.object.length !== runtime.length - 2) continue;
        const expected = normalize(bytecode.object, bytecode.immutableReferences);
        const actual = normalize(runtime, bytecode.immutableReferences);
        const entry = { file: candidate.file, source: candidate.source, compiler: candidate.compiler,
          sourceSha256: candidate.sourceSha256 };
        if (actual === expected || splitMetadata(actual).executable === splitMetadata(expected).executable) {
          verifyImmutables(candidate, runtime, implementation);
          entry.immutableBindingsVerified = true;
          entry.compiledMetadata = splitMetadata(expected).metadata;
          assert.equal(entry.compiledMetadata.solc, row.metadata.solc, "Compiler metadata version mismatch");
          if (actual === expected) row.exactMatches.push(entry);
          else row.executableOnlyMatches.push(entry);
        }
      }
      row.status = row.exactMatches.length ? "exact-runtime-match" :
        row.executableOnlyMatches.length ? "executable-match-metadata-diff" : "source-identity-unresolved";
      if (row.status !== "source-identity-unresolved") {
        const matched = row.exactMatches[0] || row.executableOnlyMatches[0];
        const candidate = candidates.find(item => item.name === name && item.file === matched.file);
        const dependency = new ethers.Contract(proxy, candidate.contract.abi, provider);
        row.bindings = {};
        for (const getter of ["owner", "guardian", "levelManager", "registration", "usdt", "fgt", "fgtr"]) {
          if (dependency.interface.hasFunction(`${getter}()`)) row.bindings[getter] = await dependency[getter]({ blockTag: snapshot.block });
        }
        assert.equal(row.bindings.levelManager.toLowerCase(), MANAGER.toLowerCase());
        for (const getter of ["registration", "usdt"]) {
          if (row.bindings[getter]) assert.equal(row.bindings[getter].toLowerCase(),
            (await manager[getter]({ blockTag: snapshot.block })).toLowerCase());
        }
        row.protocolBindingsVerified = true;
      }
      report.dependencies.push(row);
      console.log(json(row));
    }
    report.status = report.dependencies.every(row => row.exactMatches.length || row.executableOnlyMatches.length)
      ? "executable-and-bindings-matched" : "unresolved";
    fs.writeFileSync(path.resolve(__dirname, "../../docs/evidence/id1-dependency-identity-2026-11-12.json"), json(report) + "\n");
    if (report.status === "unresolved") process.exitCode = 2;
  } finally {
    provider.destroy();
  }
}

main().catch(error => { console.error(error.shortMessage || error.message); process.exitCode = 1; });

// Pinned mainnet reads; every deployment and transaction executes on local chain 31337.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const hre = require("hardhat");
const { assertStorageUpgradeSafe } = require("@openzeppelin/upgrades-core");
const { extractStorageLayout } = require("@openzeppelin/upgrades-core/dist/storage/extract");
const { solcInputOutputDecoder } = require("@openzeppelin/upgrades-core");
const { astDereferencer } = require("solidity-ast/utils");
const { storageSpan } = require("./lib/primeForkOrbitStorage");
const { fundLocalReplayBalance } = require("./rehearseId1PrimaryPlacement");
const { ethers: E, network: N, artifacts } = hre;
const ROOT = path.resolve(__dirname, "../../..");
const AUDIT = path.join(ROOT, "tmp/freedom-plus-id1-audit");
const OUTPUT = path.join(ROOT, "tmp/freedom-plus-historical-repair-rehearsal.json");
const sourceFile = "contracts/migration/FreedomPlusHistoricalOrbitRepair.sol";
const IMPL = "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc";
const editType = "tuple(address account,uint8 level,uint256 cycle,bytes32 beforeHash,tuple(uint8 slot,tuple(address participant,address structuralParent,bytes32 activationId,bytes32 placementId,uint256 amount,uint40 timestamp,uint8 kind,bool financial) data,bytes32 originalTransaction)[] additions)[]";
const coder = E.AbiCoder.defaultAbiCoder();
const same = (a, b) => assert.equal(a.toLowerCase(), b.toLowerCase());
const json = value => JSON.stringify(value, (_, v) => typeof v === "bigint" ? v.toString() : v, 2);
const read = file => JSON.parse(fs.readFileSync(file, "utf8"));
function fullLayout(build, source, name) {
  const definition = build.output.sources[source].ast.nodes.find(n => n.nodeType === "ContractDefinition" && n.name === name);
  assert(definition, `Missing compiler AST for ${name}`);
  return extractStorageLayout(definition, solcInputOutputDecoder(build.input, build.output),
    astDereferencer(build.output), build.output.contracts[source][name].storageLayout);
}
const evidence = { sourceChainId: 137, executionChainId: 31337, liveTransactionsSent: 0,
  status: "in-progress", governanceMode: "local-impersonation-not-multisig-certification", phases: [] };
function record(phase, detail = {}) {
  evidence.phases.push({ phase, ...detail });
  fs.writeFileSync(OUTPUT, json(evidence) + "\n");
  console.log(json({ phase, ...detail }));
}
async function localSigner(address) {
  assert.equal(N.name, "hardhat");
  assert.equal((await E.provider.getNetwork()).chainId, 31337n);
  await N.provider.send("hardhat_impersonateAccount", [address]);
  await N.provider.send("hardhat_setBalance", [address, E.toBeHex(E.parseEther("100"))]);
  return E.getSigner(address);
}
async function localImplementation(proxy, implementation) {
  assert.equal(N.name, "hardhat");
  assert.equal((await E.provider.getNetwork()).chainId, 31337n);
  await N.provider.send("hardhat_setStorageAt", [proxy, IMPL, E.zeroPadValue(implementation, 32)]);
}
async function deploy(name, args = []) {
  const contract = await (await E.getContractFactory(name)).deploy(...args);
  await contract.waitForDeployment();
  return contract;
}
async function prime(rpc, block, proxy, layout, rows) {
  const slots = new Set();
  const add = (label, keys) => storageSpan(layout, label, keys).forEach(s => slots.add(s));
  for (const [wallet, level, capacity] of rows) {
    add("_currentCycles", [wallet, level]);
    add("_cycles", [wallet, level, 0]);
    for (let ring = 1; ring <= 3; ring++) add("_cycles", [wallet, level, 0, "ringFilledCounts", ring]);
    for (let slot = 1; slot <= capacity; slot++) add("_cycles", [wallet, level, 0, "positions", slot]);
  }
  const values = [...slots];
  const cacheFile = path.join(ROOT, `tmp/freedom-plus-repair-storage-${block}-${proxy.toLowerCase()}.json`);
  const cached = fs.existsSync(cacheFile) ? read(cacheFile) : {};
  for (let start = 0; start < values.length; start += 20) {
    const batch = values.slice(start, start + 20);
    if (batch.every(slot => /^0x[0-9a-fA-F]{64}$/.test(cached[slot] || ''))) {
      for (const slot of batch) await N.provider.send("hardhat_setStorageAt", [proxy, slot, cached[slot]]);
      continue;
    }
    const response = await fetch(rpc, { method: "POST", headers: { "content-type": "application/json" },
      signal: AbortSignal.timeout(30000), body: JSON.stringify(batch.map((slot, id) => ({
        jsonrpc: "2.0", id, method: "eth_getStorageAt", params: [proxy, slot, E.toQuantity(block)],
      }))) });
    assert(response.ok, `Pinned storage HTTP ${response.status}`);
    const replies = await response.json();
    assert(Array.isArray(replies) && replies.length === batch.length, "Incomplete pinned storage batch");
    const byId = new Map(replies.map(r => [r.id, r]));
    assert.equal(byId.size, batch.length);
    for (let id = 0; id < batch.length; id++) {
      const row = byId.get(id);
      assert(row && !row.error && /^0x[0-9a-fA-F]{64}$/.test(row.result), "Invalid pinned source storage");
      cached[batch[id]] = row.result;
      await N.provider.send("hardhat_setStorageAt", [proxy, batch[id], row.result]);
    }
    fs.writeFileSync(cacheFile, json(cached) + "\n");
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  record("source-storage-cached-locally", { proxy, slots: values.length,
    cacheSHA256: crypto.createHash("sha256").update(fs.readFileSync(cacheFile)).digest("hex") });
}
async function main() {
  assert.equal(N.name, "hardhat");
  assert.equal((await E.provider.getNetwork()).chainId, 31337n);
  assert.equal(process.env.ID1_ALLOW_SYNTHETIC_FUNDING, "1");
  const rpc = process.env.FP_REPAIR_MAINNET_RPC;
  assert(rpc, "Explicit read-only mainnet source RPC required");
  const audit = read(path.join(AUDIT, "events.json"));
  const table = read(path.join(ROOT, "staging-environment/docs/evidence/placement-payment-correction-table-2026-11-13.json"));
  const baseline = read(path.join(AUDIT, "baseline/build-info.json"));
  assert.equal(audit.chainId, 137); assert.equal(table.chainId, 137);
  const block = table.checkedAtBlock;
  const source = new E.JsonRpcProvider(rpc);
  try {
    assert.equal((await source.getNetwork()).chainId, 137n);
    assert.equal((await source.getBlock(block)).hash, table.checkedAtBlockHash);
  } finally { source.destroy(); }
  evidence.block = block; evidence.blockHash = table.checkedAtBlockHash;
  evidence.sourceHashes = Object.fromEntries([sourceFile,
    "contracts/freedom-plus/FreedomPlusSettlementRouter.sol",
    "contracts/freedom-plus/orbits/FreedomPlusBaseOrbit.sol",
    "scripts/rehearseFreedomPlusHistoricalRepair.js"].map(file => [file,
      crypto.createHash("sha256").update(fs.readFileSync(path.resolve(__dirname, "..", file))).digest("hex")]));
  await N.provider.send("hardhat_reset", [{ forking: { jsonRpcUrl: rpc, blockNumber: block } }]);
  const governance = await localSigner(audit.governance);
  const router = await E.getContractAt("FreedomPlusSettlementRouter", audit.contracts.FreedomPlusSettlementRouter.proxy, governance);
  const registration = await E.getContractAt("FreedomPlusRegistration", audit.contracts.FreedomPlusRegistration.proxy, governance);
  const manager = await E.getContractAt("FreedomPlusLevelManager", audit.contracts.FreedomPlusLevelManager.proxy, governance);
  same(await router.registration(), registration.target); same(await router.manager(), manager.target);
  same(await router.id1Wallet(), audit.id1); same(await router.usdt(), audit.wiring.usdt);
  for (const c of [router, registration, manager]) same(await c.owner(), audit.governance);
  const representative = "0xAa254e8e177dE104D9F87211b0f4a6B7eC71306A";
  const definitions = [["P39PlusOrbit", "FreedomPlusP39HistoricalRepair", 1, 39],
    ["P14PlusOrbit", "FreedomPlusP14HistoricalRepair", 2, 14],
    ["P12PlusOrbit", "FreedomPlusP12HistoricalRepair", 3, 12],
    ["P6PlusOrbit", "FreedomPlusP6HistoricalRepair", 4, 6]];
  const entries = [];
  for (const [name, repairName, level, capacity] of definitions) {
    const binding = audit.contracts[name];
    const proxy = binding.proxy;
    same(E.getAddress("0x" + (await E.provider.getStorage(proxy, IMPL)).slice(-40)), binding.implementation);
    assert.equal(E.keccak256(await E.provider.getCode(binding.implementation)), binding.runtimeHash);
    const engine = await E.getContractAt(name, proxy, governance);
    same(await engine.owner(), audit.governance); same(await engine.manager(), router.target);
    const old = baseline.output.contracts[`contracts/freedom-plus/orbits/${name}.sol`][name];
    const currentBuild = await artifacts.getBuildInfo(`${sourceFile}:${repairName}`);
    const current = currentBuild.output.contracts[sourceFile][repairName];
    const oldLayout = fullLayout(baseline, `contracts/freedom-plus/orbits/${name}.sol`, name);
    const currentLayout = fullLayout(currentBuild, sourceFile, repairName);
    assertStorageUpgradeSafe(oldLayout, currentLayout, false);
    assertStorageUpgradeSafe(currentLayout, oldLayout, false);
    assert(current.evm.deployedBytecode.object.length / 2 <= 24576, "Repair exceeds EIP-170 size limit");
    const watched = [[audit.id1, level, capacity]];
    if (level === 2 || level === 4) watched.push([representative, level, capacity]);
    await prime(rpc, block, proxy, old.storageLayout, watched);
    const existing = [];
    for (const [wallet, lvl, cap] of watched) {
      for (let slot = 1; slot <= cap; slot++) {
        const value = Array.from(await engine.positionAt(wallet, lvl, 0, slot));
        if (value[0] !== E.ZeroAddress) existing.push({ wallet, level: lvl, slot, value });
      }
    }
    const inspector = await deploy(repairName, [proxy, E.ZeroAddress, E.ZeroHash, 31337]);
    await localImplementation(proxy, inspector.target);
    const view = await E.getContractAt(repairName, proxy);
    const edits = [];
    const rows = table.rows.filter(row => row.program === "Freedom Plus" && row.level === level);
    if (rows.length) {
      const additions = [];
      for (const row of rows) {
        const sourcePosition = await engine.positionAt(row.existingParentPosition.owner, level, 0, row.existingParentPosition.slot);
        same(sourcePosition.participant, row.participant);
        assert.equal(sourcePosition.timestamp, BigInt(Date.parse(row.originalUtc) / 1000));
        additions.push({ slot: row.proposedSlot, originalTransaction: row.originalTx,
          data: [row.participant, row.proposedParent, sourcePosition.activationId,
            E.keccak256(coder.encode(["bytes32", "string", "uint8"], [sourcePosition.activationId, "COMPONENT", row.proposedRing])),
            row.paymentForMissingPosition.raw, sourcePosition.timestamp, 2, true] });
      }
      edits.push({ account: audit.id1, level, cycle: 0, beforeHash: await view.repairStateHash(audit.id1, level), additions });
    }
    if (level === 2 || level === 4) {
      const root = await engine.positionAt(audit.id1, level, 0, 3);
      same(root.structuralParent, representative); assert.equal(root.kind, 0n);
      const genesisEvent = audit.events.find(e => e.event === "PositionRecorded" &&
        e.args.activationId === root.activationId && e.args.orbitOwner === audit.id1);
      assert(genesisEvent && genesisEvent.args.kind === "0", "Genesis receipt/event binding required");
      const slot = level === 2 ? 2 : 1;
      assert.equal((await engine.positionAt(representative, level, 0, slot)).participant, E.ZeroAddress);
      edits.push({ account: representative, level, cycle: 0,
        beforeHash: await view.repairStateHash(representative, level), additions: [{ slot,
          originalTransaction: genesisEvent.tx,
          data: [root.participant, representative, root.activationId,
            E.keccak256(coder.encode(["bytes32", "string"], [root.activationId, "GENESIS_ANCESTRY"])),
            0, root.timestamp, 0, false] }] });
    }
    await localImplementation(proxy, binding.implementation);
    entries.push({ name, repairName, engine, proxy, level, existing, edits, original: binding.implementation,
      plan: coder.encode([editType], [edits]) });
    record("plan-and-storage-validated", { name, additions: edits.reduce((n, row) => n + row.additions.length, 0) });
  }
  const routerBinding = audit.contracts.FreedomPlusSettlementRouter;
  same(E.getAddress("0x" + (await E.provider.getStorage(router.target, IMPL)).slice(-40)), routerBinding.implementation);
  assert.equal(E.keccak256(await E.provider.getCode(routerBinding.implementation)), routerBinding.runtimeHash);
  const routerSource = "contracts/freedom-plus/FreedomPlusSettlementRouter.sol";
  const candidateBuild = await artifacts.getBuildInfo(`${routerSource}:FreedomPlusSettlementRouter`);
  assertStorageUpgradeSafe(fullLayout(baseline, routerSource, "FreedomPlusSettlementRouter"),
    fullLayout(candidateBuild, routerSource, "FreedomPlusSettlementRouter"), false);
  const token = await E.getContractAt("IERC20", audit.wiring.usdt);
  const controller = await E.getContractAt("FreedomPlusTokenController", await manager.tokenController());
  const fpt = await E.getContractAt("IERC20", await controller.fpt());
  const fptr = await E.getContractAt("IERC20", await controller.fptr());
  const wallets = [...new Set([audit.id1, representative, router.target, await router.nftPoolVault(),
    await router.operationsVault(), ...table.rows.filter(r => r.program === "Freedom Plus").map(r => r.participant)])];
  for (let i = 0; i < 8; i++) wallets.push(await router.founderWallets(i));
  const balancesBefore = [];
  for (const wallet of wallets) balancesBefore.push(await token.balanceOf(wallet));
  const supplyBefore = [await fpt.totalSupply(), await fptr.totalSupply()];
  const executor = await deploy("Id1HistoricalRepairExecutor", [audit.governance,
    entries.map(e => e.proxy), entries.map(e => E.keccak256(e.plan)), 31337]);
  const guardian = await E.getContractAt("Guardian", await router.guardian(), governance);
  same(await guardian.owner(), audit.governance);
  await registration.pause(); await manager.pause(); await router.pause();
  for (const entry of entries) {
    await entry.engine.pause();
    const implementation = await deploy(entry.repairName, [entry.proxy, executor.target, E.keccak256(entry.plan), 31337]);
    const engineGuardian = await E.getContractAt("Guardian", await entry.engine.guardian(), governance);
    same(await engineGuardian.owner(), audit.governance);
    assert.equal(await engineGuardian.paused(), false, "Guardian is paused");
    assert.equal(await engineGuardian.globalUpgradeFreeze(), false, "Guardian upgrades are frozen");
    const proxyApproved = await engineGuardian.approvedProxies(entry.proxy);
    record("local-upgrade-preapproval", { proxy: entry.proxy, guardian: engineGuardian.target, previouslyApprovedProxy: proxyApproved });
    if (!proxyApproved) await engineGuardian.setApprovedProxy(entry.proxy, true);
    await engineGuardian.setApprovedImplementation(entry.proxy, implementation.target, true);
    await entry.engine.upgradeToAndCall(implementation.target, "0x");
    entry.guardian = engineGuardian;
  }
  const receipt = await (await executor.connect(governance).execute(entries.map(e => e.plan))).wait();
  const tokenAddresses = [token.target, fpt.target, fptr.target].map(a => a.toLowerCase());
  assert(!receipt.logs.some(l => tokenAddresses.includes(l.address.toLowerCase())), "Repair emitted token events");
  for (const entry of entries) {
    for (const old of entry.existing) assert.deepEqual(Array.from(await entry.engine.positionAt(old.wallet, old.level, 0, old.slot)), old.value);
    for (const edit of entry.edits) for (const addition of edit.additions) {
      assert.equal(json(Array.from(await entry.engine.positionAt(edit.account, edit.level, 0, addition.slot))), json(addition.data.map((v, i) => [4, 5, 6].includes(i) ? BigInt(v) : v)));
    }
    await entry.guardian.setApprovedImplementation(entry.proxy, entry.original, true);
    await entry.engine.upgradeToAndCall(entry.original, "0x");
  }
  for (let i = 0; i < wallets.length; i++) assert.equal(await token.balanceOf(wallets[i]), balancesBefore[i]);
  assert.deepEqual([await fpt.totalSupply(), await fptr.totalSupply()], supplyBefore);
  const nextRouter = await deploy("FreedomPlusSettlementRouter");
  if (!await guardian.approvedProxies(router.target)) await guardian.setApprovedProxy(router.target, true);
  await guardian.setApprovedImplementation(router.target, nextRouter.target, true);
  await router.upgradeToAndCall(nextRouter.target, "0x");
  for (const entry of entries) await entry.engine.unpause();
  await router.unpause(); await manager.unpause(); await registration.unpause();
  evidence.edits = entries.map(({ name, edits }) => ({ name, edits }));
  evidence.repairLocalTransaction = receipt.hash;
  evidence.repairGasUsed = receipt.gasUsed;
  record("repair-passed", { paidAppearances: 16, genesisAppearances: 2, transfers: 0, preservedExistingPositions: true });
  const participant = "0x863447369632EA4AaC724683c1D448C68e2f1ADE";
  const participantSigner = await localSigner(participant);
  await fundLocalReplayBalance(token, participant, 1350000000n);
  await token.connect(participantSigner).approve(manager.target, 1350000000n);
  const probe = await (await registration.connect(participantSigner).activateLevel(4)).wait();
  assert(await registration.isLevelActive(participant, 4));
  evidence.futureProbe = { participant, level: 4, localTransaction: probe.hash, syntheticFunding: true };
  evidence.status = "local-fork-passed-not-live-release-approval";
  record("complete", { status: evidence.status });
}
if (require.main === module) main().catch(error => {
  evidence.status = "failed";
  evidence.error = error.shortMessage || error.message;
  record("failed", { error: evidence.error });
  process.exitCode = 1;
});
module.exports = { fullLayout };

// Offline artifact checks only. No provider, signer or deployment is created.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { createHash } = require("node:crypto");
const { Interface } = require("ethers");
const { assertStorageUpgradeSafe } = require("@openzeppelin/upgrades-core");

const root = path.resolve(__dirname, "..");
const baselineDir = process.argv[2];
assert(baselineDir, "Supply the saved, verified baseline build-info directory");
const baselines = fs.readdirSync(baselineDir).filter(name => name.endsWith(".json"))
  .map(name => ({ name, build: JSON.parse(fs.readFileSync(path.join(baselineDir, name), "utf8")) }));
const hash = value => createHash("sha256").update(value).digest("hex");
const signatures = abi => new Set(new Interface(abi).fragments
  .filter(fragment => ["function", "event"].includes(fragment.type))
  .map(fragment => `${fragment.type}:${fragment.format("sighash")}`));
function routerStorage(build, source) {
  const contract = build.output.sources[source].ast.nodes.find(node =>
    node.nodeType === "ContractDefinition" && node.name === "LevelSettlementRouter");
  const structs = ["RecycleReserve", "RecycleReserveLayout", "LegacyRecycleMigrationLayout"];
  return contract.nodes.filter(node =>
    (node.nodeType === "VariableDeclaration" && node.constant && node.name.endsWith("_STORAGE_SLOT")) ||
    (node.nodeType === "StructDefinition" && structs.includes(node.name)))
    .map(node => node.nodeType === "StructDefinition"
      ? { name: node.name, members: node.members.map(member => [member.name, member.typeDescriptions.typeString]) }
      : { name: node.name, hashFunction: node.value.expression.name,
        arguments: node.value.arguments.map(argument => argument.value) });
}
const report = { scope: "offline candidate artifacts, not live deployment certification", checks: [] };

for (const name of ["RegistrationFixed", "LevelManager", "P4Orbit", "P12Orbit", "P39Orbit", "LevelSettlementRouter"]) {
  const source = `contracts/${name}.sol`;
  const artifactPath = path.join(root, "artifacts", source, `${name}.json`);
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  const debug = JSON.parse(fs.readFileSync(artifactPath.replace(/\.json$/, ".dbg.json"), "utf8"));
  const build = JSON.parse(fs.readFileSync(path.resolve(path.dirname(artifactPath), debug.buildInfo), "utf8"));
  const candidate = build.output.contracts[source][name];
  const bytes = (artifact.deployedBytecode.length - 2) / 2;
  assert(bytes <= 24576, `${name} exceeds EIP-170 runtime size`);
  const currentSignatures = signatures(candidate.abi);
  const checks = [];
  for (const baseline of baselines) {
    const original = baseline.build.output.contracts[source]?.[name];
    if (!original) continue;
    assertStorageUpgradeSafe(original.storageLayout, candidate.storageLayout, false);
    if (name === "LevelSettlementRouter") {
      assert.deepEqual(routerStorage(build, source), routerStorage(baseline.build, source),
        "Router unstructured reserve storage changed");
    }
    const previousSignatures = signatures(original.abi);
    const removed = [...previousSignatures].filter(signature => !currentSignatures.has(signature));
    const added = [...currentSignatures].filter(signature => !previousSignatures.has(signature));
    const allowedRemoval = "function:settleRecycle(uint8,address,address,address,address,address,address,uint8,uint256,uint256,address,uint8,uint32,address[],uint256[])";
    assert(removed.every(signature => name === "LevelSettlementRouter" && signature === allowedRemoval),
      `${name} removes an unreviewed function/event: ${removed.join(", ")}`);
    checks.push({ baseline: baseline.name, storageCompatible: true,
      ...(name === "LevelSettlementRouter" ? { unstructuredReserveStorageCompatible: true } : {}), removed, added });
  }
  assert(checks.length, `No saved baseline contains ${name}`);
  // Metadata lists this contract's dependency closure, excluding unrelated
  // sources that may have shared an earlier incremental compilation batch.
  for (const file of Object.keys(JSON.parse(candidate.metadata).sources)) {
    const input = build.input.sources[file];
    const local = file.startsWith("@") ? path.join(root, "node_modules", file) : path.join(root, file);
    assert.equal(hash(fs.readFileSync(local, "utf8")), hash(input.content), `Stale compilation input: ${file}`);
  }
  report.checks.push({ name, compiler: build.solcLongVersion, runtimeBytes: bytes,
    runtimeLimit: 24576, bytecodeTemplateSha256: hash(artifact.deployedBytecode),
    compilerInputSha256: hash(JSON.stringify(build.input)), checks });
}
console.log(JSON.stringify(report, null, 2));
if (process.argv[3]) fs.writeFileSync(process.argv[3], JSON.stringify(report, null, 2) + "\n");

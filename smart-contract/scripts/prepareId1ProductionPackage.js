// Read-only mainnet preparation. Predicted addresses are NOT deployed addresses.
require("dotenv").config({ quiet: true });
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { ethers: E } = require("ethers");
const { A, buildPackage } = require("./lib/id1ProductionPackage");
const { PARENT_PLAN } = require("./lib/id1HistoricalRepairPlan");
const ROOT = path.resolve(__dirname, "../../..");
const IMPL = "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc";
const sha = data => crypto.createHash("sha256").update(data).digest("hex");
const json = data => JSON.stringify(data, (_, value) => typeof value === "bigint" ? value.toString() : value, 2);
const same = (a, b) => assert.equal(a.toLowerCase(), b.toLowerCase());
function artifact(name) {
  const source = name.startsWith("Id1") ? "migration/Id1HistoricalRepair.sol" : `${name}.sol`;
  return JSON.parse(fs.readFileSync(path.join(__dirname, `../artifacts/contracts/${source}/${path.basename(name)}.json`), "utf8"));
}

async function verifyLive(provider, pkg, block) {
  assert.equal((await provider.getNetwork()).chainId, 137n);
  const common = new E.Interface(["function owner() view returns(address)", "function guardian() view returns(address)", "function paused() view returns(bool)"]);
  const expected = pkg.previousImplementations;
  for (const key of ["registration", "manager", "p4", "p12", "p39"]) {
    const c = new E.Contract(A[key], common, provider);
    same(await c.owner({ blockTag: block }), A.governance);
    same(await c.guardian({ blockTag: block }), A.guardian);
    assert.equal(await c.paused({ blockTag: block }), false, `${key} already paused: review rather than overwrite intent`);
    same(E.getAddress("0x" + (await provider.getStorage(A[key], IMPL, block)).slice(-40)), expected[key]);
  }
  const manager = new E.Contract(A.manager, artifact("LevelManager").abi, provider);
  same(await manager.settlementRouter({ blockTag: block }), pkg.previousRouter);
  same(await manager.id1Wallet({ blockTag: block }), A.id1);
  same(await manager.usdt({ blockTag: block }), A.usdt);
  const guardian = new E.Contract(A.guardian, ["function owner() view returns(address)", "function paused() view returns(bool)", "function globalUpgradeFreeze() view returns(bool)", "function approvedProxies(address) view returns(bool)"], provider);
  same(await guardian.owner({ blockTag: block }), A.governance);
  assert.equal(await guardian.paused({ blockTag: block }), false);
  assert.equal(await guardian.globalUpgradeFreeze({ blockTag: block }), false);
  for (const key of ["registration", "manager", "p4", "p12", "p39"]) assert.equal(await guardian.approvedProxies(A[key], { blockTag: block }), true);
  for (const group of pkg.manifest.edits) {
    const art = artifact(group.key === "p4" ? "Id1P4RepairMigrator" : "Id1MultiRingRepairMigrator");
    const iface = new E.Interface(art.abi);
    for (const row of group.before) {
      const result = await provider.send("eth_call", [{ to: A[group.key], data: iface.encodeFunctionData("repairState", [row.wallet, row.level]) },
        E.toQuantity(block), { [A[group.key]]: { code: art.deployedBytecode } }]);
      assert.equal(iface.decodeFunctionResult("repairState", result)[0], row.hash, `Changed repair prestate: ${group.key}/${row.level}`);
    }
  }
  const reg = new E.Contract(A.registration, artifact("RegistrationFixed").abi, provider);
  const parents = E.AbiCoder.defaultAbiCoder().decode([PARENT_PLAN], pkg.manifest.plans[3])[0];
  for (const edit of parents) {
    same(await reg.getReferrer(edit.account, { blockTag: block }), edit.sponsor);
    same(await reg.currentMatrixParentOf(edit.account, edit.level, { blockTag: block }), edit.previousParent);
    assert.equal(await reg.isRegistered(edit.account, { blockTag: block }), true);
    assert.equal(await reg.isLevelActivated(edit.account, edit.level, { blockTag: block }), true);
    assert.equal(await reg.isLevelActivated(edit.correctedParent, edit.level, { blockTag: block }), true);
  }
}

async function main() {
  assert(process.env.ID1_MAINNET_REPLAY_RPC, "Explicit Polygon mainnet RPC required");
  const output = path.join(ROOT, "tmp/id1-production-package.json");
  assert(!fs.existsSync(path.join(ROOT, "tmp/id1-production-broadcasts.json")), "A broadcast journal exists; do not replace its bound package");
  const evidenceRaw = fs.readFileSync(path.join(ROOT, "tmp/id1-structural-repair-rehearsal.json"), "utf8");
  const provider = new E.JsonRpcProvider(process.env.ID1_MAINNET_REPLAY_RPC, undefined, { batchMaxCount: 1 });
  try {
    const nonce = await provider.getTransactionCount(A.submitter, "pending");
    assert.equal(nonce, await provider.getTransactionCount(A.submitter, "latest"), "Submitter has a pending transaction");
    const pkg = buildPackage(JSON.parse(evidenceRaw), nonce);
    const block = await provider.getBlock("latest");
    await verifyLive(provider, pkg, block.number);
    const multi = new E.Contract(A.governance, artifact("governance/SimpleMultiSig").abi, provider);
    assert(await multi.isProposalSubmitter(A.submitter, { blockTag: block.number }) || await multi.isOwner(A.submitter, { blockTag: block.number }));
    const fees = await provider.getFeeData();
    const feeCap = fees.maxFeePerGas;
    assert(feeCap && fees.maxPriorityFeePerGas);
    pkg.checkedAt = new Date().toISOString();
    pkg.verifiedBlock = { number: block.number, hash: block.hash };
    pkg.rehearsalSha256 = sha(evidenceRaw);
    pkg.governance = { required: await multi.requiredConfirmations(), timelockSeconds: await multi.timelockDelay(), nextProposalId: await multi.getTransactionCount() };
    let deploymentGas = 0n;
    for (const item of pkg.deployments) {
      const art = artifact(item.name);
      item.creationBytecodeHash = E.keccak256(art.bytecode);
      item.runtimeTemplateHash = E.keccak256(art.deployedBytecode);
      const unsigned = await new E.ContractFactory(art.abi, art.bytecode).getDeployTransaction(...item.args);
      item.gasLimit = (await provider.estimateGas({ ...unsigned, from: A.submitter })) * 120n / 100n;
      deploymentGas += item.gasLimit;
    }
    let submissionGas = 0n;
    for (const action of pkg.actions.filter(action => !action.submitAfterPostUpgradeVerification)) {
      const request = await multi.submitTransaction.populateTransaction(action.target, 0n, action.data);
      action.submissionGasLimit = (await provider.estimateGas({ ...request, from: A.submitter })) * 120n / 100n;
      submissionGas += action.submissionGasLimit;
    }
    pkg.budget = { maxFeePerGas: feeCap, maxPriorityFeePerGas: fees.maxPriorityFeePerGas,
      deploymentGas, submissionGas, maxCostWei: (deploymentGas + submissionGas) * feeCap,
      balanceWei: await provider.getBalance(A.submitter), excludesFoundersApprovalAndExecutionGas: true };
    pkg.budget.sufficientlyFunded = pkg.budget.balanceWei >= pkg.budget.maxCostWei;
    fs.writeFileSync(output, json(pkg) + "\n");
    console.log(json({ file: output, chainId: 137, liveWrites: 0, deployments: pkg.deployments.length,
      proposalsBeforeReopen: pkg.actions.filter(a => !a.submitAfterPostUpgradeVerification).length,
      reopenProposalsWithheld: pkg.actions.filter(a => a.submitAfterPostUpgradeVerification).length,
      balancePOL: E.formatEther(pkg.budget.balanceWei), maximumDeployerAndSubmissionCostPOL: E.formatEther(pkg.budget.maxCostWei),
      sufficientlyFunded: pkg.budget.sufficientlyFunded }));
  } finally { provider.destroy(); }
}

if (require.main === module) main().catch(error => { console.error(error.shortMessage || error.message); process.exitCode = 1; });
module.exports = { artifact, verifyLive, sha };

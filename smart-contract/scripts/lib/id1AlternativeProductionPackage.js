const assert = require("node:assert/strict");
const { ethers: E } = require("ethers");
const { A } = require("./id1ProductionPackage");
const plan = require("./id1AlternativeRepairPlan");
const revive = value => Array.isArray(value) ? value.map(revive) :
  typeof value === "string" && /^\d+$/.test(value) ? BigInt(value) : value;

function validateAlternativeEvidence(e) {
  assert.equal(e.repairPolicy, plan.POLICY);
  assert.equal(e.status, "passed");
  assert.equal(e.sourceChainId, 137);
  assert.equal(e.executionChainId, 31337);
  assert.equal(e.liveTransactionsSent, 0);
  assert.equal(e.governance.localWrapperPassed, true);
  assert.equal(e.governance.address.toLowerCase(), A.governance.toLowerCase());
  assert.deepEqual(e.before, e.after);
  assert.equal(String(e.manifest.repairTransferRaw), "0");
  assert.equal(e.deferredLevel6.unchangedByRepair, true);
  assert.equal(e.probes.length, 3);
  assert.deepEqual(e.probes.map(p => [p.upline, Number(p.level), Number(p.rootSlot), p.recipient, String(p.recipientAmount)]), [
    [A.sofia, 8, 0, A.sofia, "512000000"],
    [A.sabina, 8, 9, A.sabina, "512000000"],
    [A.sofia, 9, 6, A.sofia, "512000000"],
  ], "Only the alternative placement/payout probes can certify this package");
  assert.equal(e.manifest.plans.length, 4);
  assert.equal(e.manifest.edits.length, 3);
  for (const [i, key] of ["p4", "p12", "p39"].entries()) {
    const group = e.manifest.edits.find(row => row.key === key);
    const expected = key === "p4" ? [[A.id1, 1], [A.id1, 7]] :
      key === "p12" ? [[A.id1, 8], [A.sabina, 8]] : [[A.id1, 3], [A.id1, 9]];
    assert.deepEqual(group.before.map(row => [row.wallet, row.level]), expected);
    const edits = group.before.map(row => plan.buildOrbitEdit(row.wallet, row.level, row.hash, revive(row.slots), A));
    assert.equal(plan.encodeOrbitPlan(edits), e.manifest.plans[i]);
    assert.equal(e.manifest.targets[i], A[key]);
    assert.equal(E.keccak256(e.manifest.plans[i]), e.manifest.hashes[i]);
  }
  assert.equal(e.manifest.plans[3], plan.encodeParentPlan(A));
  assert.equal(e.manifest.targets[3], A.registration);
  assert.equal(E.keccak256(e.manifest.plans[3]), e.manifest.hashes[3]);
}

function buildAlternativePackage(e, previous, startNonce) {
  validateAlternativeEvidence(e);
  assert.equal(previous.chainId, 137);
  assert.equal(previous.packageId, "ID1_STRUCTURAL_ONLY_LEVEL6_DEFERRED_2026_11_12");
  assert.deepEqual(previous.addresses, A);
  assert(Number.isSafeInteger(startNonce) && startNonce >= 0);
  assert.equal(previous.actions.length, 30);
  const reused = previous.deployments.filter(row => ["p4", "p12", "p39", "manager", "router"].includes(row.key));
  assert.equal(reused.length, 5);
  const next = Object.fromEntries(reused.map(row => [row.key, row.address]));
  const deployments = [];
  const add = (key, name, args) => {
    const nonce = startNonce + deployments.length;
    const address = E.getCreateAddress({ from: A.submitter, nonce });
    deployments.push({ key, name, nonce, address, args });
    next[key] = address;
  };
  add("executor", "Id1HistoricalRepairExecutor", [A.governance, e.manifest.targets, e.manifest.hashes, 137]);
  for (const [i, key] of ["p4", "p12", "p39", "registration"].entries()) {
    const name = key === "p4" ? "Id1P4RepairMigrator" : key === "registration" ? "Id1RegistrationRepairMigrator" : "Id1MultiRingRepairMigrator";
    add(`${key}Migrator`, name, [A[key], next.executor, e.manifest.hashes[i], 137]);
  }
  next.registration = previous.previousImplementations.registration;
  const guardian = new E.Interface(["function batchSetApprovedImplementations(address,address[],bool)", "function setApprovedImplementation(address,address,bool)"]);
  const proxy = new E.Interface(["function upgradeToAndCall(address,bytes)"]);
  const executor = new E.Interface(["function execute(bytes[4])"]);
  const actions = previous.actions.map(old => {
    const action = { index: old.index, phase: old.phase, label: old.label, target: old.target,
      value: "0", data: old.data, submitAfterPostUpgradeVerification: old.phase === "REOPEN" };
    const key = Object.keys(A).find(key => A[key].toLowerCase() === action.target.toLowerCase());
    if (old.phase === "PREAPPROVAL") {
      const decoded = guardian.decodeFunctionData("batchSetApprovedImplementations", old.data);
      const name = ["p4", "p12", "p39", "registration", "manager"].find(key => A[key].toLowerCase() === decoded[0].toLowerCase());
      assert(name);
      action.data = guardian.encodeFunctionData("batchSetApprovedImplementations", [A[name],
        name === "manager" ? [next.manager] : [next[`${name}Migrator`], next[name]], true]);
    } else if (old.phase === "MIGRATOR") {
      assert(next[`${key}Migrator`]);
      action.data = proxy.encodeFunctionData("upgradeToAndCall", [next[`${key}Migrator`], "0x"]);
    } else if (old.phase === "REPAIR") {
      action.target = next.executor;
      action.label = "Apply alternative repair: keep Sabina, insert Sofia; no transfers";
      action.data = executor.encodeFunctionData("execute", [e.manifest.plans]);
    } else if (old.phase === "REVOKE") {
      const decoded = guardian.decodeFunctionData("setApprovedImplementation", old.data);
      const name = ["p4", "p12", "p39", "registration"].find(key => A[key].toLowerCase() === decoded[0].toLowerCase());
      assert(name);
      action.data = guardian.encodeFunctionData("setApprovedImplementation", [A[name], next[`${name}Migrator`], false]);
    } else assert(["PAUSE", "INSTALL", "REOPEN"].includes(old.phase));
    return action;
  });
  return { packageId: "ID1_SABINA_PRESERVED_LEVEL6_DEFERRED_2026_11_13", chainId: 137,
    status: "unsigned-candidate-not-deployed-or-submitted", addresses: A, startNonce,
    reusedDeployments: reused, deployments, actions, manifest: e.manifest,
    previousImplementations: previous.previousImplementations, previousRouter: previous.previousRouter,
    requiredCancelledProposalIds: Array.from({ length: 30 }, (_, i) => 130 + i),
    rules: ["Do not submit replacements until all old proposals 130-159 are cancelled on chain.",
      "Revalidate live runtime, constructor bindings and the complete guarded prestate before broadcasting.",
      "Execute in exact order with the five affected proxies paused until reconciliation passes.",
      "No compensation, permanent sponsor change, NFT/Freedom Plus change or historical level-6 edit."] };
}

module.exports = { validateAlternativeEvidence, buildAlternativePackage };

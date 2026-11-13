const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { ethers: E } = require("ethers");
const { A, buildPackage } = require("../scripts/lib/id1ProductionPackage");
const plan = require("../scripts/lib/id1AlternativeRepairPlan");
const { buildAlternativePackage, validateAlternativeEvidence } = require("../scripts/lib/id1AlternativeProductionPackage");
const readLegacy = () => JSON.parse(fs.readFileSync(path.join(__dirname,
  "../../docs/evidence/id1-level6-deferred-multisig-rehearsal-2026-11-12.json"), "utf8"));
const revive = value => Array.isArray(value) ? value.map(revive) :
  typeof value === "string" && /^\d+$/.test(value) ? BigInt(value) : value;

// Synthetic builder fixture only; this is not evidence of a live or fork execution.
function fixture() {
  const oldEvidence = readLegacy();
  const previous = buildPackage(oldEvidence, 500);
  const e = structuredClone(oldEvidence);
  e.repairPolicy = plan.POLICY;
  e.probes = [
    { upline: A.sofia, level: 8, rootSlot: 0, recipient: A.sofia, recipientAmount: "512000000" },
    { upline: A.sabina, level: 8, rootSlot: 9, recipient: A.sabina, recipientAmount: "512000000" },
    { upline: A.sofia, level: 9, rootSlot: 6, recipient: A.sofia, recipientAmount: "512000000" },
  ];
  for (const [i, group] of e.manifest.edits.entries()) {
    if (group.key === "p12") group.before[1].wallet = A.sabina;
    group.edits = group.before.map(row => plan.buildOrbitEdit(row.wallet, row.level, row.hash, revive(row.slots), A));
    e.manifest.plans[i] = plan.encodeOrbitPlan(group.edits);
  }
  e.manifest.plans[3] = plan.encodeParentPlan(A);
  e.manifest.hashes = e.manifest.plans.map(E.keccak256);
  return { e, previous };
}

test("Reuse the five fixed implementations but rebind all five repair contracts", () => {
  const { e, previous } = fixture();
  const original = JSON.stringify(previous);
  const pkg = buildAlternativePackage(e, previous, 800);
  assert.equal(pkg.deployments.length, 5);
  assert.equal(pkg.reusedDeployments.length, 5);
  assert.equal(pkg.actions.length, 30, "Three UI stages must not pretend to be three on-chain proposals");
  assert.deepEqual(pkg.requiredCancelledProposalIds, Array.from({ length: 30 }, (_, i) => 130 + i));
  for (const d of pkg.deployments) {
    assert.equal(d.address, E.getCreateAddress({ from: A.submitter, nonce: d.nonce }));
    assert.equal(d.args[3], 137);
  }
  assert.equal(JSON.stringify(previous), original);
  const executor = pkg.deployments[0];
  assert.equal(pkg.actions[14].target, executor.address);
  assert(pkg.deployments.slice(1).every(d => d.args[1] === executor.address));
  assert(pkg.actions.slice(25).every(row => row.phase === "REOPEN" && row.submitAfterPostUpgradeVerification));
  assert(pkg.actions.every(row => row.value === "0"));
});

test("New approvals/installations/revocations never reference the old temporary migrators", () => {
  const { e, previous } = fixture();
  const pkg = buildAlternativePackage(e, previous, 800);
  const oldTemps = previous.deployments.filter(d => d.key.endsWith("Migrator") || d.key === "executor");
  for (const action of pkg.actions) {
    for (const old of oldTemps) {
      assert.notEqual(action.target.toLowerCase(), old.address.toLowerCase());
      assert(!action.data.toLowerCase().includes(old.address.slice(2).toLowerCase()));
    }
  }
  for (const index of [5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 25, 26, 27, 28, 29]) {
    assert.equal(pkg.actions[index].data, previous.actions[index].data);
    assert.equal(pkg.actions[index].target, previous.actions[index].target);
  }
});

test("Reject old policy, failed rehearsal, wrong chain, balance changes and payload substitutions", () => {
  assert.throws(() => validateAlternativeEvidence(readLegacy()));
  for (const mutate of [e => e.status = "failed", e => e.sourceChainId = 80002,
    e => e.executionChainId = 137, e => e.governance.localWrapperPassed = false,
    e => e.after.registeredCount = "999999", e => e.manifest.repairTransferRaw = "512000000",
    e => e.probes[1].recipient = A.parent,
    e => e.manifest.targets[1] = A.sofia, e => e.manifest.hashes[2] = E.ZeroHash,
    e => e.manifest.edits[1].before[1].wallet = A.parent]) {
    const { e } = fixture(); mutate(e); assert.throws(() => validateAlternativeEvidence(e));
  }
});

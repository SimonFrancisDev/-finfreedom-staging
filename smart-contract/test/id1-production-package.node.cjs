const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { ethers: E } = require("ethers");
const { A, buildPackage, validateEvidence, submissionActions } = require("../scripts/lib/id1ProductionPackage");
const evidence = () => JSON.parse(fs.readFileSync(path.join(__dirname,
  "../../docs/evidence/id1-level6-deferred-multisig-rehearsal-2026-11-12.json"), "utf8"));

test("Builds only the tested mainnet package, with explicit constructor chain bindings", () => {
  const pkg = buildPackage(evidence(), 500);
  assert.equal(pkg.deployments.length, 10);
  assert.equal(pkg.actions.length, 30);
  for (const [index, d] of pkg.deployments.entries()) {
    assert.equal(d.address, E.getCreateAddress({ from: A.submitter, nonce: 500 + index }));
    if (d.key.endsWith("Migrator")) assert.equal(d.args[3], 137);
    if (d.key === "executor") assert.equal(d.args[3], 137);
  }
  assert.equal(pkg.actions.filter(a => !a.submitAfterPostUpgradeVerification).length, 25);
});

test("Five pauses precede migrators; router is paired before any reopening", () => {
  const pkg = buildPackage(evidence(), 500);
  assert.deepEqual(pkg.actions.slice(5, 10).map(a => a.phase), Array(5).fill("PAUSE"));
  assert.equal(pkg.actions[14].phase, "REPAIR");
  assert.equal(pkg.actions[19].target, A.manager);
  assert.equal(pkg.actions[20].label, "Bind matching revision-2 settlement router");
  assert(pkg.actions.slice(25).every(a => a.phase === "REOPEN" && a.submitAfterPostUpgradeVerification));
  assert(pkg.actions.every(a => a.value === "0"));
  assert(!pkg.actions.some(a => [A.usdt, A.sofia, A.sabina].includes(a.target)));
});

test("Explicit all-proposals submission includes unchanged reopening payloads without removing execution warnings", () => {
  const pkg = buildPackage(evidence(), 500);
  const before = JSON.stringify(pkg);
  assert.equal(submissionActions(pkg).length, 25);
  assert.equal(submissionActions(pkg, true).length, 30);
  const reopening = submissionActions(pkg, true).slice(25);
  const iface = new E.Interface(["function unpause()"]);
  assert(reopening.every(action => action.data === iface.encodeFunctionData("unpause") &&
    action.value === "0" && action.label.includes("ONLY after verification")));
  assert.deepEqual(reopening.map(action => action.target), [A.p4, A.p12, A.p39, A.manager, A.registration]);
  assert.equal(JSON.stringify(pkg), before, "Must not mutate the journal-bound package");
});

test("Rejects non-mainnet evidence, bypassed governance, changed balances and untested cycle", () => {
  for (const edit of [e => e.sourceChainId = 80002, e => e.executionChainId = 137,
    e => e.governance.localWrapperPassed = false, e => e.status = "failed",
    e => e.after.registeredCount = "999999999", e => e.deferredLevel6.cycleProbe.passed = false,
    e => e.deferredLevel6.unchangedByRepair = false, e => e.manifest.repairTransferRaw = "512000000"]) {
    const e = evidence(); edit(e); assert.throws(() => validateEvidence(e));
  }
});

test("Rejects substituted destinations and damaged payload hashes", () => {
  const destination = evidence(); destination.manifest.targets[0] = A.sofia;
  assert.throws(() => validateEvidence(destination));
  const payload = evidence(); payload.manifest.plans[2] = "0x";
  assert.throws(() => validateEvidence(payload));
  assert.throws(() => buildPackage(evidence(), -1));
});

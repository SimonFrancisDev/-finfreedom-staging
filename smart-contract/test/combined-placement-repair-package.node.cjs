const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { ethers: E } = require("ethers");
const { A, FP, phases, buildCombinedPackage, validateFreedomPlusEvidence, omitVerifiedProxyApprovals } = require("../scripts/lib/combinedPlacementRepairPackage");
const ROOT = path.resolve(__dirname, "../../..");
const read = p => JSON.parse(fs.readFileSync(path.join(ROOT, p), "utf8"));
function inputs() {
  const input = read("staging-environment/docs/evidence/combined-placement-package-inputs-2026-11-13.json");
  return [read("staging-environment/docs/evidence/id1-alternative-repair-rehearsal-2026-11-13.json"),
    input.previous,
    read("staging-environment/docs/evidence/freedom-plus-historical-repair-rehearsal-2026-11-13.json"),
    input.audit,
    read("staging-environment/docs/evidence/placement-payment-correction-table-2026-11-13.json"), 900];
}
test("Combined manifest preserves both reviewed repairs and explicit governance boundaries", () => {
  const args = inputs(); const before = JSON.stringify(args);
  const pkg = buildCombinedPackage(...args);
  assert.equal(JSON.stringify(args), before);
  assert.equal(pkg.chainId, 137); assert.equal(pkg.deployments.length, 11);
  assert.equal(pkg.actions.length, 68); assert.equal(pkg.cancellations.length, 30);
  assert.equal(pkg.actions.filter(a => a.phase === "REOPEN").length, 12);
  assert.equal(pkg.actions.filter(a => a.phase === "REPAIR").length, 2);
  assert(pkg.actions.every(a => a.value === "0"));
  assert.deepEqual(pkg.actions.map(a => phases.indexOf(a.phase)), pkg.actions.map(a => phases.indexOf(a.phase)).sort((a, b) => a - b));
  assert(pkg.actions.filter(a => a.phase === "REOPEN").every(a => a.executeAfterPostUpgradeVerification));
  assert(pkg.actions.every(a => !a.submitAfterPostUpgradeVerification));
  assert(pkg.fFreedom.actions.every(a => !a.submitAfterPostUpgradeVerification));
  assert(pkg.fFreedom.rules.every(rule => !rule.startsWith('Do not submit replacements until')));
  assert(pkg.deployments.every(d => d.address === E.getCreateAddress({ from: A.submitter, nonce: d.nonce })));
  assert(pkg.deployments.filter(d => d.args.length === 4).every(d => d.args[3] === 137));
  for (const a of pkg.fFreedom.actions) {
    assert(pkg.actions.some(b => b.program === "F-Freedom" && b.target === a.target && b.data === a.data));
  }
});

test('only verified redundant proxy approvals may be omitted; all other repair calls stay identical', () => {
  const pkg = buildCombinedPackage(...inputs());
  const original = JSON.stringify(pkg);
  const evidence = { chainId: 137, block: 97269165,
    blockHash: '0x9a580d097d4833fc07d3d396538090ff786bfbfb7f0d1fe8064fe6bcb56860e5',
    proxies: ['p39', 'p14', 'p12', 'p6', 'router'].map(key => ({ key, address: FP[key], alreadyApproved: key === 'router' })) };
  const result = omitVerifiedProxyApprovals(pkg, evidence);
  assert.equal(result.actions.length, 67);
  assert.equal(JSON.stringify(pkg), original);
  assert.deepEqual(result.executionApprovalRequirements, [FP.router]);
  assert.equal(result.omittedRedundantActions.length, 1);
  for (const a of result.actions) assert(pkg.actions.some(old => old.target === a.target && old.data === a.data && old.phase === a.phase));
  assert.equal(result.actions.filter(a => a.phase === 'REOPEN').length, 12);
  assert.equal(result.actions.filter(a => a.phase === 'REVOKE').length, 8);
  assert.equal(result.actions.filter(a => a.phase === 'REPAIR').length, 2);
  assert.throws(() => omitVerifiedProxyApprovals(pkg, { ...evidence, chainId: 80002 }));
  assert.throws(() => omitVerifiedProxyApprovals(pkg, { ...evidence, proxies: [{ key: 'router', address: A.manager, alreadyApproved: true }] }));
  assert.throws(() => omitVerifiedProxyApprovals(pkg, { ...evidence, proxies: [evidence.proxies[0], evidence.proxies[0]] }));
  assert.equal(omitVerifiedProxyApprovals(pkg, { ...evidence, proxies: evidence.proxies.map(p => ({ ...p, alreadyApproved: false })) }).actions.length, 68);
});
test("Every temporary implementation is approved, installed, restored and revoked", () => {
  const pkg = buildCombinedPackage(...inputs());
  const iface = new E.Interface(["function setApprovedImplementation(address,address,bool)", "function upgradeToAndCall(address,bytes)"]);
  for (const d of pkg.deployments.filter(d => d.key.endsWith("Migrator"))) {
    assert(pkg.actions.some(a => a.phase === "MIGRATOR" && a.data === iface.encodeFunctionData("upgradeToAndCall", [d.address, "0x"])));
    assert(pkg.actions.some(a => a.phase === "REVOKE" && a.data === iface.encodeFunctionData("setApprovedImplementation", [d.args[0], d.address, false])));
    assert(pkg.actions.some(a => a.phase === "INSTALL" && a.target === d.args[0]));
  }
  assert(pkg.actions.some(a => a.target === FP.router && a.phase === "INSTALL"));
});
test("Reject substituted chain, money, parents, slots, identity, evidence status and targets", () => {
  for (const mutate of [
    e => e.sourceChainId = 80002, e => e.executionChainId = 137,
    e => e.status = "failed", e => e.liveTransactionsSent = 1,
    e => e.edits[0].edits[0].additions[0].data[4] = "1",
    e => e.edits[0].edits[0].additions[0].data[1] = A.sofia,
    e => e.edits[0].edits[0].additions[0].slot = 39,
    e => e.edits[0].edits[0].additions[0].originalTransaction = E.ZeroHash,
    e => e.edits[0].edits[0].additions[0].data[2] = E.ZeroHash,
    e => e.edits[0].edits[0].account = A.sofia,
    e => e.edits[1].edits[1].additions[0].data[4] = "100",
  ]) {
    const [, , e, audit, table] = inputs(); mutate(e);
    assert.throws(() => validateFreedomPlusEvidence(e, audit, table));
  }
  const [, , e, audit, table] = inputs();
  audit.contracts.P39PlusOrbit.proxy = A.p39;
  assert.throws(() => validateFreedomPlusEvidence(e, audit, table));
});

const assert = require("node:assert/strict");
const { ethers: E } = require("ethers");
const { ORBIT_PLAN, encodeParentPlan, buildOrbitEdit, encodeOrbitPlan } = require("./id1HistoricalRepairPlan");

const A = Object.freeze({
  registration: "0x02ECA97e944Ac66b0444fd5F61A716917E83CfF5",
  manager: "0x0E9De0F24eB4774834A2c4A63eaBa8356A4A4B53",
  p4: "0x1ED0b443c880Ba88F732c3F5915561A07B21F6B4",
  p12: "0xCF998d8f7E9DD4f3FacFbA45e656dE07142f824b",
  p39: "0xEaD39819B8C4DBb0669320542B6B847D4c31b8Fb",
  id1: "0xCE38722a72c9099D9237897E18B0cfb6D51c4470",
  sofia: "0xEA2bCf620d164Af63fba2F832C5F37E9eABdC528",
  sabina: "0xb673c9D14Da920f187d25Cc793f1955a43284622",
  parent: "0xE8b1ac47231651cCc38326a59645a8D976D0Eabf",
  governance: "0x785cC854ce9e13CE1140cbFD7C08620713E1711d",
  guardian: "0x290c2300296379BD0048aFe9099Ed6Fc81BF75fC",
  usdt: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
  submitter: "0x884e48f9897E8633238747b608DD49dE12bF94df",
});
const coder = E.AbiCoder.defaultAbiCoder();
const same = (a, b) => assert.equal(a.toLowerCase(), b.toLowerCase());

function validateEvidence(e) {
  assert.equal(e.status, "passed");
  assert.equal(e.sourceChainId, 137);
  assert.equal(e.executionChainId, 31337);
  assert.equal(e.governance.localWrapperPassed, true);
  same(e.governance.address, A.governance);
  assert.equal(e.deferredLevel6.unchangedByRepair, true);
  assert.equal(e.deferredLevel6.cycleProbe.passed, true);
  assert.equal(String(e.manifest.repairTransferRaw), "0");
  assert.deepEqual(e.before, e.after);
  assert.equal(e.manifest.plans.length, 4);
  assert.equal(e.manifest.edits.length, 3);
  for (const [index, key] of ["p4", "p12", "p39", "registration"].entries()) {
    same(e.manifest.targets[index], A[key]);
    assert.equal(E.keccak256(e.manifest.plans[index]), e.manifest.hashes[index]);
    if (index === 3) {
      assert.equal(e.manifest.plans[index], encodeParentPlan(A));
      continue;
    }
    const group = e.manifest.edits.find(group => group.key === key);
    const decoded = coder.decode([ORBIT_PLAN], e.manifest.plans[index])[0];
    const allowed = key === "p4" ? [1, 7] : key === "p12" ? [8, 8] : [3, 9];
    assert.deepEqual(decoded.map(edit => Number(edit.level)), allowed);
    const context = {};
    // Rebuild from the saved ORIGINAL slots, not the edited payload.
    if (key === "p12") context.sabinaLevel8Source = group.before.find(row => row.wallet === A.id1).slots[2];
    const revived = value => Array.isArray(value) ? value.map(revived) :
      typeof value === "string" && /^\d+$/.test(value) ? BigInt(value) : value;
    const rebuilt = group.before.map(row => buildOrbitEdit(row.wallet, row.level, row.hash,
      revived(row.slots), A, { sabinaLevel8Source: revived(context.sabinaLevel8Source) }));
    assert.equal(encodeOrbitPlan(rebuilt), e.manifest.plans[index], "Current builder must reproduce tested payload exactly");
  }
  assert.equal(e.probes.length, 3);
}

function buildPackage(evidence, startNonce) {
  validateEvidence(evidence);
  assert(Number.isSafeInteger(startNonce) && startNonce >= 0);
  const deployments = [];
  const add = (key, name, args = []) => {
    const nonce = startNonce + deployments.length;
    const address = E.getCreateAddress({ from: A.submitter, nonce });
    deployments.push({ key, name, nonce, address, args });
    return address;
  };
  const next = {};
  for (const [key, name] of [["p4", "P4Orbit"], ["p12", "P12Orbit"], ["p39", "P39Orbit"], ["manager", "LevelManager"]]) {
    next[key] = add(key, name);
  }
  next.router = add("router", "LevelSettlementRouter", [A.manager, A.usdt]);
  next.executor = add("executor", "Id1HistoricalRepairExecutor", [A.governance, evidence.manifest.targets, evidence.manifest.hashes, 137]);
  for (const [index, key] of ["p4", "p12", "p39", "registration"].entries()) {
    const name = key === "p4" ? "Id1P4RepairMigrator" : key === "registration" ? "Id1RegistrationRepairMigrator" : "Id1MultiRingRepairMigrator";
    next[`${key}Migrator`] = add(`${key}Migrator`, name, [A[key], next.executor, evidence.manifest.hashes[index], 137]);
  }
  const original = Object.fromEntries(evidence.localUpgradeSet.map(row => [row.key, row.originalImplementation]));
  next.registration = original.registration;
  assert(E.isAddress(next.registration));
  const guardian = new E.Interface(["function batchSetApprovedImplementations(address,address[],bool)", "function setApprovedImplementation(address,address,bool)"]);
  const proxy = new E.Interface(["function pause()", "function unpause()", "function upgradeToAndCall(address,bytes)", "function setSettlementRouter(address)"]);
  const executor = new E.Interface(["function execute(bytes[4])"]);
  const actions = [];
  const action = (phase, label, target, iface, method, args = []) => actions.push({
    index: actions.length, phase, label, target, value: "0", data: iface.encodeFunctionData(method, args),
    submitAfterPostUpgradeVerification: phase === "REOPEN",
  });
  for (const key of ["p4", "p12", "p39", "registration", "manager"]) {
    const implementations = key === "manager" ? [next[key]] : [next[`${key}Migrator`], next[key]];
    action("PREAPPROVAL", `Approve ${key} implementation set`, A.guardian, guardian, "batchSetApprovedImplementations", [A[key], implementations, true]);
  }
  for (const key of ["registration", "manager", "p4", "p12", "p39"]) action("PAUSE", `Pause ${key}`, A[key], proxy, "pause");
  for (const key of ["p4", "p12", "p39", "registration"]) action("MIGRATOR", `Install bound ${key} repair implementation`, A[key], proxy, "upgradeToAndCall", [next[`${key}Migrator`], "0x"]);
  action("REPAIR", "Apply structural-only repair; level 6 excluded; no token transfer", next.executor, executor, "execute", [evidence.manifest.plans]);
  for (const key of ["p4", "p12", "p39", "registration", "manager"]) action("INSTALL", `Install final ${key} implementation`, A[key], proxy, "upgradeToAndCall", [next[key], "0x"]);
  action("INSTALL", "Bind matching revision-2 settlement router", A.manager, proxy, "setSettlementRouter", [next.router]);
  for (const key of ["p4", "p12", "p39", "registration"]) action("REVOKE", `Revoke temporary ${key} repair implementation`, A.guardian, guardian, "setApprovedImplementation", [A[key], next[`${key}Migrator`], false]);
  for (const key of ["p4", "p12", "p39", "manager", "registration"]) action("REOPEN", `Reopen ${key} ONLY after verification`, A[key], proxy, "unpause");
  return { packageId: "ID1_STRUCTURAL_ONLY_LEVEL6_DEFERRED_2026_11_12", chainId: 137,
    status: "unsigned-plan-not-deployed-or-submitted", addresses: A, startNonce, deployments, actions,
    previousImplementations: original, previousRouter: evidence.previousSettlementRouter,
    manifest: evidence.manifest, deferredLevel6: evidence.deferredLevel6,
    rules: ["Execute in exact order; all 5 program contracts remain paused throughout repair and installation.",
      "Do not execute REPAIR if guarded prestate changed; reprepare, do not bypass guards.",
      "Reopen proposals are withheld until chain, paired revisions, balances, positions and backend projections are verified.",
      "Do not restart suspended staging services. No production data reset. No compensation.",
      "This package does not alter NFT or Freedom Plus contracts, permanent sponsors, or level-6 historical positions."],
  };
}

function submissionActions(pkg, includeReopening = false) {
  return pkg.actions.filter(action => includeReopening || !action.submitAfterPostUpgradeVerification);
}

module.exports = { A, validateEvidence, buildPackage, submissionActions };

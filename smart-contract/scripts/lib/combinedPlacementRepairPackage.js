const assert = require("node:assert/strict");
const { ethers: E } = require("ethers");
const { A } = require("./id1ProductionPackage");
const { buildAlternativePackage } = require("./id1AlternativeProductionPackage");

const FP = Object.freeze({
  registration: "0x7eC9D69fD82B1e62E01d497d495fEdfFfC34a0B6",
  manager: "0x6E59b6580826DCcC4c1c9E5497F6bE3BE9C77384",
  router: "0x8C88262595cbEAA5FffB60a0689b3EAbe22B0498",
  p39: "0x1DFC59c915163D56998b764E6536CF869550B233",
  p14: "0x81e21a812181404325818dc042676e93293e0751",
  p12: "0xf1C9A1AFa0534cEb1075726Fab6Ac364224BD45d",
  p6: "0x4C2A8058f87E194e277BADB853C87E1a9f44BC0d",
});
const engines = [
  ["p39", "P39PlusOrbit", "FreedomPlusP39HistoricalRepair", 1],
  ["p14", "P14PlusOrbit", "FreedomPlusP14HistoricalRepair", 2],
  ["p12", "P12PlusOrbit", "FreedomPlusP12HistoricalRepair", 3],
  ["p6", "P6PlusOrbit", "FreedomPlusP6HistoricalRepair", 4],
];
const EDIT_TYPE = "tuple(address account,uint8 level,uint256 cycle,bytes32 beforeHash,tuple(uint8 slot,tuple(address participant,address structuralParent,bytes32 activationId,bytes32 placementId,uint256 amount,uint40 timestamp,uint8 kind,bool financial) data,bytes32 originalTransaction)[] additions)[]";
const phases = ["PREAPPROVAL", "PAUSE", "MIGRATOR", "REPAIR", "INSTALL", "REVOKE", "REOPEN"];
const coder = E.AbiCoder.defaultAbiCoder();
const same = (a, b) => assert.equal(a.toLowerCase(), b.toLowerCase());

function validateFreedomPlusEvidence(e, audit, table) {
  assert.equal(e.status, "local-fork-passed-not-live-release-approval");
  assert.equal(e.sourceChainId, 137); assert.equal(e.executionChainId, 31337);
  assert.equal(e.liveTransactionsSent, 0);
  assert.equal(audit.chainId, 137); assert.equal(table.chainId, 137);
  same(audit.id1, A.id1); same(audit.governance, A.governance);
  assert.equal(e.block, table.checkedAtBlock); assert.equal(e.blockHash, table.checkedAtBlockHash);
  const phase = e.phases.find(p => p.phase === "repair-passed");
  assert(phase && phase.paidAppearances === 16 && phase.genesisAppearances === 2 &&
    phase.transfers === 0 && phase.preservedExistingPositions === true);
  assert.equal(e.edits.length, 4);
  const rows = table.rows.filter(r => r.program === "Freedom Plus");
  assert.equal(rows.length, 16);
  let paid = 0; let genesis = 0;
  for (const [key, name, , level] of engines) {
    same(audit.contracts[name].proxy, FP[key]);
    const group = e.edits.find(g => g.name === name);
    assert(group && group.edits.length === (level === 2 ? 2 : 1));
    for (const edit of group.edits) {
      assert.equal(Number(edit.level), level); assert.equal(Number(edit.cycle), 0);
      assert(/^0x[0-9a-f]{64}$/i.test(edit.beforeHash) && edit.beforeHash !== E.ZeroHash);
      const used = new Set();
      for (const addition of edit.additions) {
        assert(!used.has(addition.slot)); used.add(addition.slot);
        const [participant, parent, activation, placement, amount, timestamp, kind, financial] = addition.data;
        if (Number(kind) === 2) {
          same(edit.account, A.id1); assert.equal(financial, true);
          const row = rows.find(r => r.level === level && r.participant.toLowerCase() === participant.toLowerCase());
          assert(row, "Unreviewed paid appearance");
          assert.equal(addition.slot, row.proposedSlot); same(parent, row.proposedParent);
          assert.equal(addition.originalTransaction, row.originalTx);
          assert.equal(String(amount), String(row.paymentForMissingPosition.raw));
          assert.equal(Number(timestamp), Date.parse(row.originalUtc) / 1000);
          const original = audit.events.find(v => v.tx === row.originalTx && v.event === "PositionRecorded" &&
            v.args.participant.toLowerCase() === participant.toLowerCase() && Number(v.args.level) === level);
          assert(original && original.args.activationId === activation);
          assert.equal(placement, E.keccak256(coder.encode(["bytes32", "string", "uint8"], [activation, "COMPONENT", row.proposedRing])));
          paid++;
        } else {
          assert([2, 4].includes(level)); assert.equal(Number(kind), 0);
          same(edit.account, "0xAa254e8e177dE104D9F87211b0f4a6B7eC71306A");
          same(participant, "0x117C9258a95775Ecf448fd086D00cA22506Ea79d"); same(parent, edit.account);
          assert.equal(addition.slot, level === 2 ? 2 : 1);
          assert.equal(String(amount), "0"); assert.equal(financial, false);
          const original = audit.events.find(v => v.event === "PositionRecorded" &&
            v.args.activationId === activation && v.args.orbitOwner.toLowerCase() === A.id1.toLowerCase());
          assert(original && Number(original.args.kind) === 0 && Number(original.args.level) === level);
          same(original.args.participant, participant); same(original.args.structuralParent, parent);
          assert.equal(addition.originalTransaction, original.tx);
          assert.equal(placement, E.keccak256(coder.encode(["bytes32", "string"], [activation, "GENESIS_ANCESTRY"])));
          genesis++;
        }
      }
    }
  }
  assert.equal(paid, 16); assert.equal(genesis, 2);
  for (const [name, key] of [["FreedomPlusRegistration", "registration"], ["FreedomPlusLevelManager", "manager"], ["FreedomPlusSettlementRouter", "router"]]) {
    same(audit.contracts[name].proxy, FP[key]);
  }
}

function buildCombinedPackage(ffEvidence, previous, fpEvidence, audit, table, startNonce) {
  validateFreedomPlusEvidence(fpEvidence, audit, table);
  const ff = buildAlternativePackage(ffEvidence, previous, startNonce);
  const deployments = ff.deployments.map(d => ({ ...d, program: "F-Freedom" }));
  const plans = engines.map(([, name]) => coder.encode([EDIT_TYPE], [fpEvidence.edits.find(g => g.name === name).edits]));
  const hashes = plans.map(E.keccak256);
  const next = {};
  function add(key, name, args) {
    const nonce = startNonce + deployments.length;
    next[key] = E.getCreateAddress({ from: A.submitter, nonce });
    deployments.push({ key: `fp.${key}`, program: "Freedom Plus", name, nonce, address: next[key], args });
  }
  add("router", "FreedomPlusSettlementRouter", []);
  add("executor", "Id1HistoricalRepairExecutor", [A.governance, engines.map(([key]) => FP[key]), hashes, 137]);
  for (const [i, [key, , name]] of engines.entries()) add(`${key}Migrator`, name, [FP[key], next.executor, hashes[i], 137]);
  const guardian = new E.Interface(["function setApprovedProxy(address,bool)", "function batchSetApprovedImplementations(address,address[],bool)", "function setApprovedImplementation(address,address,bool)"]);
  const proxy = new E.Interface(["function pause()", "function unpause()", "function upgradeToAndCall(address,bytes)"]);
  const executor = new E.Interface(["function execute(bytes[4])"]);
  const fpActions = [];
  const addAction = (phase, label, target, iface, fn, args = []) => fpActions.push({
    program: "Freedom Plus", phase, label, target, value: "0", data: iface.encodeFunctionData(fn, args),
    executeAfterPostUpgradeVerification: phase === "REOPEN",
  });
  for (const [key, name] of [...engines, ["router", "FreedomPlusSettlementRouter"]]) {
    addAction("PREAPPROVAL", `Approve Freedom Plus ${key} proxy`, A.guardian, guardian, "setApprovedProxy", [FP[key], true]);
    const implementations = key === "router" ? [next.router] : [next[`${key}Migrator`], audit.contracts[name].implementation];
    addAction("PREAPPROVAL", `Approve Freedom Plus ${key} implementations`, A.guardian, guardian, "batchSetApprovedImplementations", [FP[key], implementations, true]);
  }
  for (const key of ["registration", "manager", "router", ...engines.map(([key]) => key)]) {
    addAction("PAUSE", `Pause Freedom Plus ${key}`, FP[key], proxy, "pause");
  }
  for (const [key] of engines) addAction("MIGRATOR", `Install bound Freedom Plus ${key} repair`, FP[key], proxy, "upgradeToAndCall", [next[`${key}Migrator`], "0x"]);
  addAction("REPAIR", "Restore 16 paid ancestor appearances and 2 zero-money genesis links", next.executor, executor, "execute", [plans]);
  for (const [key, name] of engines) addAction("INSTALL", `Restore original Freedom Plus ${key} engine`, FP[key], proxy, "upgradeToAndCall", [audit.contracts[name].implementation, "0x"]);
  addAction("INSTALL", "Install preventive Freedom Plus router", FP.router, proxy, "upgradeToAndCall", [next.router, "0x"]);
  for (const [key] of engines) addAction("REVOKE", `Revoke temporary Freedom Plus ${key} repair`, A.guardian, guardian, "setApprovedImplementation", [FP[key], next[`${key}Migrator`], false]);
  for (const key of [...engines.map(([key]) => key), "router", "manager", "registration"]) addAction("REOPEN", `Reopen Freedom Plus ${key} ONLY after verification`, FP[key], proxy, "unpause");
  const ffActions = ff.actions.map(({ submitAfterPostUpgradeVerification, ...a }) => ({
    ...a, program: "F-Freedom", executeAfterPostUpgradeVerification: a.phase === "REOPEN",
  }));
  const actions = phases.flatMap(phase => [...ffActions, ...fpActions].filter(a => a.phase === phase))
    .map((a, index) => ({ ...a, index }));
  const gov = new E.Interface(["function cancelTransaction(uint256)"]);
  return {
    packageId: "COMBINED_PLACEMENT_REPAIR_2026_11_13", chainId: 137,
    status: "unsigned-template-not-live-deployed-or-submitted", startNonce,
    addresses: { fFreedom: A, freedomPlus: FP }, deployments, reusedDeployments: ff.reusedDeployments,
    requiredCancelledProposalIds: ff.requiredCancelledProposalIds,
    cancellations: ff.requiredCancelledProposalIds.map(id => ({ oldProposalId: id, target: A.governance, value: "0", data: gov.encodeFunctionData("cancelTransaction", [id]) })),
    actions, fFreedom: { ...ff, actions: ffActions,
      rules: ff.rules.map(rule => rule === "Do not submit replacements until all old proposals 130-159 are cancelled on chain."
        ? "Submit replacements after integration and deployment verification; execute only after old proposals 130-159 are cancelled on chain."
        : rule),
    }, freedomPlus: { plans, hashes, edits: fpEvidence.edits, previousBindings: audit.contracts },
    rules: [
      "All replacement proposals may be submitted together after integration and deployment verification. Cancel obsolete proposals 130-159 before maintenance EXECUTION, not submission.",
      "Predicted addresses must be rebound to the real deployer nonce before deployment; no local proposal IDs are live IDs.",
      "Follow the phase order. All twelve affected program contracts stay paused until both repairs and final installations are verified.",
      "Each repair call is atomic; the entire multi-proposal maintenance sequence is NOT atomic.",
      "Reopen only after chain, backend projections, balances and rendered positions have been reconciled.",
      "No compensation, NFT changes, permanent sponsor changes, deferred historical level-6 edits, database reset or staging restart.",
    ],
  };
}

function omitVerifiedProxyApprovals(pkg, evidence) {
  assert.equal(pkg.chainId, 137); assert.equal(evidence.chainId, 137);
  assert(Number.isSafeInteger(evidence.block) && evidence.block > 0);
  assert(/^0x[0-9a-f]{64}$/i.test(evidence.blockHash));
  const approved = new Set();
  const seen = new Set();
  for (const row of evidence.proxies) {
    assert(['p39', 'p14', 'p12', 'p6', 'router'].includes(row.key));
    same(row.address, FP[row.key]);
    assert(!seen.has(row.key)); seen.add(row.key);
    assert.equal(typeof row.alreadyApproved, 'boolean');
    if (row.alreadyApproved) approved.add(row.address.toLowerCase());
  }
  const guardian = new E.Interface(['function setApprovedProxy(address,bool)']);
  const omitted = [];
  const actions = pkg.actions.filter(action => {
    if (action.phase !== 'PREAPPROVAL' || action.target.toLowerCase() !== A.guardian.toLowerCase() || action.value !== '0') return true;
    let parsed;
    try { parsed = guardian.parseTransaction({ data: action.data }); } catch { return true; }
    if (!parsed || !parsed.args[1] || !approved.has(parsed.args[0].toLowerCase())) return true;
    omitted.push({ ...action, reason: 'Proxy already approved at the verified mainnet block; recheck before execution.' });
    return false;
  }).map((action, index) => ({ ...action, index }));
  return { ...pkg, actions, omittedRedundantActions: omitted, proxyApprovalEvidence: evidence,
    executionApprovalRequirements: omitted.map(action => guardian.decodeFunctionData('setApprovedProxy', action.data)[0]) };
}

module.exports = { A, FP, engines, EDIT_TYPE, phases, validateFreedomPlusEvidence, buildCombinedPackage, omitVerifiedProxyApprovals };

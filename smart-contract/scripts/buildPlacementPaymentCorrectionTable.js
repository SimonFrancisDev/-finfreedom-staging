// Step-one evidence only: RPC reads and local reports, with no signer or broadcast API.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const E = require('ethers');
const ROOT = path.resolve(__dirname, '../../..');
const DOCS = path.resolve(__dirname, '../../docs');
const OUT = path.join(ROOT, 'tmp/placement-payment-correction-table');
const load = file => JSON.parse(fs.readFileSync(file));
const json = value => JSON.stringify(value, (_, v) => typeof v === 'bigint' ? v.toString() : v, 2);
const same = (a, b) => a.toLowerCase() === b.toLowerCase();
const money = raw => E.formatUnits(raw, 6);
const sha = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const SLOT = '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc';
const FP_FILE = path.join(DOCS, 'evidence/freedom-plus-mainnet-audit-2026-11-13.json');
const FF_FILE = path.join(DOCS, 'evidence/id1-alternative-repair-prestate-2026-11-13.json');
const HIST_FILE = path.join(ROOT, 'tmp/ryy84k-levels89-audit.json');
const fp = load(FP_FILE), ff = load(FF_FILE), historical = load(HIST_FILE);
assert.equal(fp.chainId, 137); assert.equal(ff.chainId, 137); assert.equal(historical.chainId, 137);
const SOFIA = '0xEA2bCf620d164Af63fba2F832C5F37E9eABdC528';
const SABINA = '0xb673c9D14Da920f187d25Cc793f1955a43284622';
const ID1 = ff.id1;
const FP_DIR = path.join(ROOT, 'tmp/freedom-plus-id1-audit');
const fpEvents = load(path.join(FP_DIR, 'events.json'));
const founderWallets = fpEvents.events.find(e => e.event === 'FounderWalletsConfigured').args.wallets;
const token = new E.Interface(['event Transfer(address indexed from,address indexed to,uint256 value)']);
const fpOrbit = new E.Interface(require('../artifacts/contracts/freedom-plus/orbits/P39PlusOrbit.sol/P39PlusOrbit.json').abi);
const ffOrbit = new E.Interface(['function getPosition(address,uint8,uint8) view returns(address occupant,uint256 amount,uint256 timestamp,address referrer,bool isActive)']);
const ffReg = new E.Interface(['function currentMatrixParentOf(address,uint8) view returns(address)',
  'function getReferrer(address) view returns(address)', 'function levelManager() view returns(address)']);
const ffManager = new E.Interface(['function p12Orbit() view returns(address)', 'function p39Orbit() view returns(address)', 'function id1Wallet() view returns(address)']);
const affected = fp.transactions.filter(t => t.missingPositions.length);
assert.equal(affected.length, 16);

function transfers(receipt) {
  return receipt.logs.filter(l => same(l.address, ff.usdt)).flatMap(l => {
    try { const parsed = token.parseLog(l); return parsed ? [{ from: parsed.args.from, to: parsed.args.to, raw: String(parsed.args.value) }] : []; }
    catch { return []; }
  });
}
function paidTo(list, recipient, from) {
  return list.filter(t => same(t.to, recipient) && (!from || same(t.from, from))).reduce((n, t) => n + BigInt(t.raw), 0n);
}

async function collect() {
  assert(process.env.CORRECTION_TABLE_RPC, 'Set an explicit read-only mainnet RPC');
  let methods = 0, id = 0;
  async function batch(calls) {
    const results = [];
    for (let offset = 0; offset < calls.length; offset += 12) {
      const chunk = calls.slice(offset, offset + 12).map(c => ({ jsonrpc: '2.0', id: ++id, ...c }));
      methods += chunk.length;
      const response = await fetch(process.env.CORRECTION_TABLE_RPC, { method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify(chunk), signal: AbortSignal.timeout(45000) });
      assert(response.ok, `HTTP ${response.status}`);
      const data = await response.json(); assert(Array.isArray(data));
      for (const c of chunk) {
        const row = data.find(x => x.id === c.id); assert(row && !row.error, JSON.stringify(row)); results.push(row.result);
      }
    }
    return results;
  }
  const [chain, head] = await batch([{ method: 'eth_chainId', params: [] }, { method: 'eth_blockNumber', params: [] }]);
  assert.equal(Number(BigInt(chain)), 137);
  const end = Number(BigInt(head)) - 12, blockTag = E.toQuantity(end);
  const checks = [];
  const add = (label, address, abi, fn, args) => checks.push({ label, abi, fn,
    request: { method: 'eth_call', params: [{ to: address, data: abi.encodeFunctionData(fn, args) }, blockTag] } });
  add('FF manager binding', ff.addresses.registration, ffReg, 'levelManager', []);
  for (const name of ['p12Orbit', 'p39Orbit', 'id1Wallet']) add(`FF ${name}`, ff.addresses.manager, ffManager, name, []);
  for (const wallet of [SOFIA, SABINA]) {
    add(`sponsor:${wallet}`, ff.addresses.registration, ffReg, 'getReferrer', [wallet]);
    for (const level of [8, 9]) add(`parent:${wallet}:${level}`, ff.addresses.registration, ffReg, 'currentMatrixParentOf', [wallet, level]);
  }
  for (const [owner, level, slot] of [[ID1, 8, 3], [ID1, 8, 6], [SABINA, 8, 1], [ID1, 9, 2], [ID1, 9, 3]]) {
    add(`FF:${owner}:${level}:${slot}`, level === 8 ? ff.addresses.p12 : ff.addresses.p39, ffOrbit, 'getPosition', [owner, level, slot]);
  }
  const fpProxies = [null, fp.contracts.P39PlusOrbit.proxy, fp.contracts.P14PlusOrbit.proxy, fp.contracts.P12PlusOrbit.proxy];
  for (const level of [1, 2, 3]) {
    add(`FP-cycle:${level}`, fpProxies[level], fpOrbit, 'currentCycleOf', [ID1, level]);
    add(`FP-state:${level}`, fpProxies[level], fpOrbit, 'cycleState', [ID1, level, 0]);
  }
  for (const t of affected) for (const p of t.missingPositions) {
    add(`FP:${p.level}:${p.position}`, fpProxies[p.level], fpOrbit, 'positionAt', [ID1, p.level, p.cycle, p.position]);
  }
  const readResults = await batch(checks.map(c => c.request));
  const reads = checks.map((c, i) => ({ label: c.label, result: [...c.abi.decodeFunctionResult(c.fn, readResults[i])] }));
  const blocks = [...new Set(affected.map(t => t.block).concat(historical.transactions.map(t => t.blockNumber), end))];
  const blockResults = await batch(blocks.map(b => ({ method: 'eth_getBlockByNumber', params: [E.toQuantity(b), false] })));
  const headers = blockResults.map(b => ({ block: Number(BigInt(b.number)), hash: b.hash, timestamp: Number(BigInt(b.timestamp)), utc: new Date(Number(BigInt(b.timestamp)) * 1000).toISOString() }));
  const receipts = await batch(historical.transactions.map(t => ({ method: 'eth_getTransactionReceipt', params: [t.tx] })));
  const old = load(path.join(DOCS, 'evidence/id1-alternative-repair-rehearsal-2026-11-13.json')).localUpgradeSet;
  const implementations = [
    ...old.filter(x => ['registration', 'manager', 'p12', 'p39'].includes(x.key)).map(x => ({ name: `FF ${x.key}`, proxy: ff.addresses[x.key], expected: x.originalImplementation })),
    ...['FreedomPlusSettlementRouter', 'P39PlusOrbit', 'P14PlusOrbit', 'P12PlusOrbit'].map(name => ({ name: `FP ${name}`, proxy: fp.contracts[name].proxy, expected: fp.contracts[name].implementation })),
  ];
  const storage = await batch(implementations.map(x => ({ method: 'eth_getStorageAt', params: [x.proxy, SLOT, blockTag] })));
  implementations.forEach((x, i) => { x.actual = E.getAddress(`0x${storage[i].slice(-40)}`); x.unchanged = same(x.actual, x.expected); });
  let additionalFpEvents = 0;
  for (let from = fp.toBlock + 1; from <= end; from += 6250) {
    const [logs] = await batch([{ method: 'eth_getLogs', params: [{ address: Object.values(fp.contracts).map(c => c.proxy), fromBlock: E.toQuantity(from), toBlock: E.toQuantity(Math.min(end, from + 6249)) }] }]);
    additionalFpEvents += logs.length;
  }
  const proof = { chainId: 137, liveWrites: 0, rpcMethods: methods, block: end,
    blockHash: headers.find(b => b.block === end).hash, utc: headers.find(b => b.block === end).utc,
    additionalFpEvents, reads, headers, receipts, implementations };
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, 'read-only-proof.json'), json(proof) + '\n');
  return proof;
}

function build(proof) {
  assert.equal(proof.chainId, 137); assert.equal(proof.liveWrites, 0);
  assert(proof.implementations.every(x => x.unchanged), 'Implementation changed; refresh baseline before using this table');
  const read = label => { const row = proof.reads.find(x => x.label === label); assert(row, label); return row.result; };
  assert(same(read('FF manager binding')[0], ff.addresses.manager));
  assert(same(read('FF p12Orbit')[0], ff.addresses.p12)); assert(same(read('FF p39Orbit')[0], ff.addresses.p39));
  assert(same(read('FF id1Wallet')[0], ID1));
  assert(same(read(`sponsor:${SOFIA}`)[0], SABINA));
  const proofDate = block => proof.headers.find(x => x.block === block).utc;
  const rows = [], controls = [];
  for (const tx of affected) for (const p of tx.missingPositions) {
    const receiptFile = path.join(FP_DIR, 'receipts', `${tx.tx}.json`);
    assert.equal(sha(receiptFile), fp.evidenceSHA256[`receipts/${tx.tx}.json`]);
    const receipt = load(receiptFile); assert.equal(receipt.status, 1);
    const ts = transfers(receipt), router = fp.contracts.FreedomPlusSettlementRouter.proxy;
    const component = tx.components.find(c => c.role === p.ring && same(c.recipient, ID1)); assert(component);
    assert.equal(component.amount, p.amount);
    const parentComponent = tx.components.find(c => same(c.recipient, p.structuralParent)); assert(parentComponent);
    assert.equal(paidTo(ts, p.structuralParent, router), BigInt(parentComponent.amount));
    const ownParentPosition = tx.actualPositions.find(x => same(x.orbitOwner, p.structuralParent) && same(x.participant, tx.participant));
    assert(ownParentPosition && Number(ownParentPosition.ring) === 1, 'Parent already has its paid position');
    const split = fpEvents.events.filter(e => e.tx === tx.tx && e.event === 'FounderPaymentDistributed' && Number(e.args.role) === component.role);
    assert.equal(split.length, 8);
    assert.equal(split.reduce((n, e) => n + BigInt(e.args.amount), 0n), BigInt(component.amount));
    const currentSlot = read(`FP:${p.level}:${p.position}`)[0];
    const cycle = Number(read(`FP-cycle:${p.level}`)[0]);
    rows.push({ key: `FP-${tx.level}-${p.position}`, program: 'Freedom Plus', participant: tx.participant,
      level: tx.level, orbitType: ['P39', 'P14', 'P12'][tx.level - 1], orbitOwner: ID1, cycle: p.cycle,
      proposedRing: p.ring, proposedSlot: p.position, proposedParent: p.structuralParent,
      originalTx: tx.tx, originalBlock: tx.block, originalUtc: proofDate(tx.block), priceUSDT: tx.priceUSDT,
      permanentSponsor: tx.sponsor, primaryOrbit: tx.source.orbitOwner,
      existingParentPosition: { owner: ownParentPosition.orbitOwner, ring: Number(ownParentPosition.ring), slot: Number(ownParentPosition.position) },
      paymentForMissingPosition: { beneficiary: 'ID1, paid to its eight founders', raw: component.amount, usdt: money(component.amount),
        actualFounderTransfersForComponent: split.map(e => ({ wallet: e.args.founder, usdt: money(e.args.amount) })) },
      parentPayment: { wallet: p.structuralParent, expectedUSDT: money(parentComponent.amount), actualUSDT: money(paidTo(ts, p.structuralParent, router)), differenceUSDT: '0.0' },
      historicalOutflows: tx.actualOutflows,
      currentTarget: { occupant: currentSlot[0], cycle, empty: same(currentSlot[0], E.ZeroAddress) },
      restoresAnAlreadyPaidRelationship: true, introducesNewOrdinaryUserOrbitEntry: false,
      changesHistoricalAmounts: false, repairPaymentAuthorizedUSDT: '0.0',
      financialMapping: 'MATCH: historical payments support the missing ID1 position and its existing paid parent relationship',
      futureEffect: 'Restores the missing ID1 branch and occupancy. Can change future placement capacity and recycle timing relative to the defective state; no historical payments are repeated.',
      releaseStatus: same(currentSlot[0], E.ZeroAddress) && cycle === p.cycle && proof.additionalFpEvents === 0
        ? 'MAPPING_ONLY_NOT_RELEASE_APPROVAL' : 'STALE_STATE_REVIEW_REQUIRED' });
  }
  const ffReceipts = [];
  for (const t of historical.transactions) {
    assert.equal(t.parentState.before.sponsorActive, false, 'Review original sponsor eligibility before classifying the proposed exception');
    const receipt = proof.receipts.find(x => same(x.transactionHash, t.tx)); assert(receipt);
    assert.equal(Number(BigInt(receipt.status)), 1); assert.equal(Number(BigInt(receipt.blockNumber)), t.blockNumber);
    assert.equal(receipt.blockHash, proof.headers.find(h => h.block === t.blockNumber).hash);
    const ts = transfers(receipt), price = E.parseUnits(t.paidUSDT, 6);
    assert.equal(paidTo(ts, ff.addresses.manager, SOFIA), price);
    for (const f of founderWallets) assert.equal(paidTo(ts, f, ff.addresses.manager), price * 9n / 80n);
    assert.equal(paidTo(ts, ff.nftPool, ff.addresses.manager), price * 8n / 100n);
    assert.equal(paidTo(ts, ff.operationsWallet, ff.addresses.manager), price * 2n / 100n);
    assert.equal(paidTo(ts, SABINA, ff.addresses.manager), 0n);
    assert.equal(ts.filter(x => same(x.from, ff.addresses.manager)).reduce((n, x) => n + BigInt(x.raw), 0n), price);
    ffReceipts.push({ level: t.level, tx: t.tx, date: t.timestamp, grossUSDT: money(price), sponsorActiveAtOriginalActivation: false,
      foundersUSDT: money(price * 9n / 10n), nftUSDT: money(price * 8n / 100n), opsUSDT: money(price * 2n / 100n),
      sabinaUSDT: '0.0', transfers: ts.map(x => ({ ...x, usdt: money(x.raw) })) });
    const level = t.level;
    const locations = level === 8 ? [[ID1, 2, 6, SABINA], [SABINA, 1, 1, SABINA]] : [[ID1, 1, 3, ID1]];
    for (const [owner, ring, slot, parent] of locations) {
      const current = read(`FF:${owner}:${level}:${slot}`);
      rows.push({ key: `FF-${level}-${same(owner, ID1) ? 'ID1' : 'SABINA'}-${slot}`, program: 'F-Freedom',
        participant: SOFIA, level, orbitType: level === 8 ? 'P12' : 'P39', orbitOwner: owner,
        proposedRing: ring, proposedSlot: slot, proposedParent: parent,
        originalTx: t.tx, originalBlock: t.blockNumber, originalUtc: t.timestamp, priceUSDT: money(price),
        actualHistoricalPayout: { foundersUSDT: money(price * 9n / 10n), sabinaUSDT: '0.0', nftUSDT: money(price * 8n / 100n), opsUSDT: money(price * 2n / 100n) },
        ordinaryPaymentAtProposedRelationship: level === 8
          ? { beneficiary: SABINA, participantShareUSDT: '512.0', foundersUSDT: '640.0', unpaidComparedWithNewRelationshipUSDT: '512.0',
            warning: 'Hypothetical normal-placement comparison only. Sabina was inactive at the original activation, so this does not establish an historical debt or authorize compensation.' }
          : { beneficiary: ID1, foundersUSDT: '2304.0', differenceUSDT: '0.0' },
        mismatchGroup: level === 8 ? 'SOFIA_L8_NEW_SABINA_RELATIONSHIP' : null,
        currentTarget: { occupant: current[0], empty: same(current[0], E.ZeroAddress) },
        currentMatrixParent: read(`parent:${SOFIA}:${level}`)[0], permanentSponsor: SABINA,
        proposedMatrixParent: level === 8 ? SABINA : ID1,
        restoresAnAlreadyPaidRelationship: level === 9, introducesNewOrdinaryUserOrbitEntry: same(owner, SABINA),
        changesHistoricalAmounts: false, repairPaymentAuthorizedUSDT: '0.0',
        financialMapping: level === 8 ? 'MISMATCH: proposed parent relationship is not backed by a historical payment to Sabina'
          : 'PAYMENTS MATCH, BUT SLOT 3 IS A DELIBERATE NONCHRONOLOGICAL BRANCH ASSIGNMENT',
        futureEffect: level === 8 ? 'Creates a new level-8 structural relationship under Sabina and changes Sofia\'s future branch rights. Not equivalent to restoring the original ID1 first-ring position.'
          : 'Gives Sofia the third first-ring branch, preserving Sabina at slot 2, rather than restoring the original chronological order. Future descendants can earn through Sofia on that branch.',
        releaseStatus: level === 8 ? 'HOLD_DOES_NOT_MEET_ORDINARY_PLACEMENT_PAYMENT_RULE' : 'PAYMENT_MATCH_BRANCH_POLICY_REVIEW_REQUIRED' });
    }
  }
  for (const [level, slot] of [[8, 3], [9, 2]]) {
    const actual = read(`FF:${ID1}:${level}:${slot}`); assert(same(actual[0], SABINA));
    controls.push({ program: 'F-Freedom', participant: SABINA, level, orbitOwner: ID1, slot,
      proposedAction: 'KEEP EXISTING POSITION; no move, payment or new activation', currentOccupant: actual[0],
      matrixParent: read(`parent:${SABINA}:${level}`)[0] });
  }
  const report = { chainId: 137, liveWrites: 0, scope: 'Step 1 only: position-to-original-payment correction table, not a repair or release approval',
    checkedAtUtc: proof.utc, checkedAtBlock: proof.block, checkedAtBlockHash: proof.blockHash,
    auditBoundary: { fpBlock: fp.toBlock, ffSnapshotBlock: ff.block, additionalFpEvents: proof.additionalFpEvents },
    identities: { id1: ID1, sofia: SOFIA, sabina: SABINA, ffContracts: ff.addresses, fpRouter: fp.contracts.FreedomPlusSettlementRouter.proxy, usdt: ff.usdt },
    counts: { proposedPositions: rows.length, freedomPlusPaymentMatched: rows.filter(x => x.program === 'Freedom Plus').length,
      fFreedomLevel9PaymentMatchedWithBranchException: 1, fFreedomLevel8UnmatchedPositions: 2, fFreedomLevel8UnmatchedActivations: 1 },
    important: ['No amount in this table is authorization to pay, claw back or rewrite a transfer.',
      'Two level-8 rows describe ONE Sofia activation and ONE proposed relationship exception, not two debts.',
      'The eight founders\' actual transfers are distinguished from an ID1 wallet balance.',
      'No evidence of unpaid historical compensation was established by the placement comparison.',
      'Historical level-6 duplicates remain deferred. Existing package counter-only edits at levels 1,3,7 do not introduce users, but are outside this payment-mapping table.',
      'Observed empty destination slots do not replace a full guarded prestate and implementation/storage rehearsal before execution.'],
    rows, unchangedControls: controls, fFreedomOriginalReceipts: ffReceipts,
    proofFile: 'tmp/placement-payment-correction-table/read-only-proof.json',
    inputSHA256: { fpAudit: sha(FP_FILE), ffPrestate: sha(FF_FILE), ffOriginalCase: sha(HIST_FILE) } };
  assert.equal(rows.length, 19);
  return report;
}

function render(report) {
  const lines = ['# Step 1: Placement-to-Payment Correction Table', '',
    `Polygon mainnet (137). Read-only checkpoint: block ${report.checkedAtBlock}, ${report.checkedAtUtc}.`, '',
    '**No production writes, transfers, deployments, proposals, service changes or repair execution.**', '',
    '## Result', '',
    '- 16 Freedom Plus positions match existing payments. Their parents already have the participant in their own orbit and already received their related payment. No additional payment is indicated by these rows.',
    '- Sofia\'s F-Freedom level-9 position at ID1 slot 3 matches the historical payment destinations, but is an agreed alternative branch assignment, not a restoration of original chronological order.',
    '- Sofia\'s F-Freedom level-8 proposal creates two positions for one relationship: ID1 slot 6 under Sabina and Sabina\'s own slot 1. Sabina received no payment from the original activation. It does NOT satisfy the newly requested ordinary-placement/payment equivalence.', '',
    '**The 512 USDT comparison below is NOT a debt determination, payment request, or compensation authorization. Sabina was inactive when Sofia originally activated.**', '',
    '## Addresses', '', ...Object.entries(report.identities).filter(([, v]) => typeof v === 'string').map(([k, v]) => `- ${k}: ${v}`), '',
    '## Freedom Plus Summary', '',
    '| Participant | Level | Proposed ID1 ring/slot | Parent | Parent already received (USDT) | ID1 component already paid to founders (USDT) | Original transaction |',
    '| --- | ---: | --- | --- | ---: | ---: | --- |'];
  for (const r of report.rows.filter(x => x.program === 'Freedom Plus')) lines.push(
    `| ${r.participant} | ${r.level} | ${r.proposedRing}/${r.proposedSlot} | ${r.proposedParent} | ${r.parentPayment.actualUSDT} | ${r.paymentForMissingPosition.usdt} | [${r.originalTx}](https://polygonscan.com/tx/${r.originalTx}) |`);
  lines.push('', '## F-Freedom Comparison', '',
    '| Proposed position | Historical payment | Normal payment implied by proposed relationship | Finding |',
    '| --- | --- | --- | --- |',
    '| Sofia at ID1 L8 ring 2, slot 6 under Sabina | 1,152 USDT to eight founders; 0 to Sabina; 102.40 NFT; 25.60 operations | 640 to founders; 512 to Sabina; same 128 system charge | Relationship/payment mismatch. Do not present as an ordinary historically paid placement. |',
    '| Sofia at Sabina L8 ring 1, slot 1 | Same original activation; 0 to Sabina | This link ordinarily accompanies the same 512 component, not another 512 payment | Same mismatch, not another debt. Current proposal deliberately makes this link zero-money. |',
    '| Sofia at ID1 L9 ring 1, slot 3 | 2,304 USDT to eight founders; 204.80 NFT; 51.20 operations | 20% + 20% + 50% all reach ID1/founders, totaling 2,304 | Money matches; position 3 rather than original chronological 2 changes branch allocation. |', '',
    'Sabina keeps ID1 level-8 slot 3 and level-9 slot 2. Her existing positions are controls, not new entries or new payment events.', '',
    '## Full Per-Position Record', '');
  for (const r of report.rows) {
    lines.push(`### ${r.key}`, '', `Participant: ${r.participant}. Program: ${r.program}. Level: ${r.level} (${r.orbitType}).`,
      `Proposed orbit owner: ${r.orbitOwner}; ring ${r.proposedRing}, slot ${r.proposedSlot}; parent: ${r.proposedParent}.`,
      `Original activation: [${r.originalTx}](https://polygonscan.com/tx/${r.originalTx}), block ${r.originalBlock}, ${r.originalUtc}, ${r.priceUSDT} USDT.`,
      `Mapping result: **${r.financialMapping}**.`, `Release status: ${r.releaseStatus}.`,
      `Destination currently empty: ${r.currentTarget.empty}. Recorded occupant: ${r.currentTarget.occupant}.`,
      `Future effect: ${r.futureEffect}`, 'Repair payment authorized: **0 USDT**.', '');
    if (r.parentPayment) {
      lines.push(`The parent already has this participant at ring ${r.existingParentPosition.ring}, slot ${r.existingParentPosition.slot} in its own orbit, and received ${r.parentPayment.actualUSDT} USDT. No new position is proposed in that ordinary user\'s orbit.`,
        `ID1's missing-position component was ${r.paymentForMissingPosition.usdt} USDT, already split as:`,
        ...r.paymentForMissingPosition.actualFounderTransfersForComponent.map(x => `- ${x.wallet}: ${x.usdt} USDT`), '',
        'All actual USDT outflows from the original activation:', ...r.historicalOutflows.map(x => `- ${x.wallet}: ${x.usdt} USDT`), '');
    }
  }
  lines.push('## F-Freedom Original Receipt Transfers', '');
  for (const t of report.fFreedomOriginalReceipts) lines.push(`### Level ${t.level}`, '', `[Transaction](https://polygonscan.com/tx/${t.tx}), ${t.date}.`,
    ...t.transfers.map(x => `- ${x.from} -> ${x.to}: ${x.usdt} USDT`), '');
  lines.push('## Limits and Decision', '', ...report.important.map(x => `- ${x}`), '',
    'Step 1 is complete. Payment-backed Freedom Plus mapping is not approval of a code-only upgrade or historical repair. The Sofia level-8 alternative must not be combined with those rows and described as if all placements are backed by the same historical payment rule. Resolve that exception explicitly before further engineering or proposals.', '');
  return lines.join('\n');
}

async function main() {
  const proof = process.argv.includes('--offline') ? load(path.join(OUT, 'read-only-proof.json')) : await collect();
  const report = build(proof);
  const before = JSON.parse(json(proof));
  const badReceipt = before.receipts.find(x => same(x.transactionHash, historical.transactions[0].tx));
  badReceipt.logs = badReceipt.logs.filter(l => !same(l.address, ff.usdt));
  assert.throws(() => build(before), undefined, 'Missing payment evidence must fail');
  report.negativeControl = 'Removing original mainnet USDT transfers correctly rejects the table';
  report.readOnlyProofSHA256 = sha(path.join(OUT, 'read-only-proof.json'));
  fs.writeFileSync(path.join(DOCS, 'evidence/placement-payment-read-only-proof-2026-11-13.json'), json(proof) + '\n');
  for (const prefix of [path.join(OUT, 'correction-table'), path.join(DOCS, 'evidence/placement-payment-correction-table-2026-11-13')]) {
    fs.mkdirSync(path.dirname(prefix), { recursive: true });
    fs.writeFileSync(`${prefix}.json`, json(report) + '\n');
    fs.writeFileSync(`${prefix}.md`, render(report).trimEnd() + '\n');
  }
  console.log(json({ chainId: report.chainId, liveWrites: report.liveWrites, checkpoint: report.checkedAtUtc,
    counts: report.counts, additionalFpEvents: proof.additionalFpEvents, rpcMethods: proof.rpcMethods,
    allTargetsEmpty: report.rows.every(x => x.currentTarget.empty), negativeControl: report.negativeControl }));
}
main().catch(error => { console.error(error.stack || error.message); process.exitCode = 1; });

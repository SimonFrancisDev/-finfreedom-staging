// Offline historical audit. No provider, signer, transaction, or production writes.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const E = require('ethers');
const DIR = path.resolve(__dirname, '../../../tmp/freedom-plus-id1-audit');
const load = name => JSON.parse(fs.readFileSync(path.join(DIR, name)));
const json = value => JSON.stringify(value, (_, v) => typeof v === 'bigint' ? v.toString() : v, 2);
const lower = value => value.toLowerCase();
const same = (a, b) => lower(a) === lower(b);
const key = (...parts) => parts.join(':').toLowerCase();
const sumTo = (map, address, amount) => map.set(lower(address), (map.get(lower(address)) || 0n) + BigInt(amount));
const sorted = map => [...map].filter(([, n]) => n !== 0n).sort(([a], [b]) => a.localeCompare(b));
const money = raw => E.formatUnits(raw, 6);
const capacities = [0, 39, 14, 12, 6, 4, 4, 3];
const widths = [0, 3, 2, 3, 2, 4, 4, 3];
const prices = [0n, 50n, 150n, 450n, 1350n, 4050n, 12150n, 36450n].map(n => n * 1000000n);

// Round-robin children: positions 4,7,10 belong to position 1 in P12/P39.
function geometry(level, slot) {
  const width = widths[level];
  assert(slot > 0 && slot <= capacities[level]);
  if (slot <= width) return { ring: 1, parent: 0 };
  if (slot <= width + width ** 2) return { ring: 2, parent: 1 + (slot - width - 1) % width };
  return { ring: 3, parent: width + 1 + (slot - width - width ** 2 - 1) % (width ** 2) };
}
assert.deepEqual(geometry(1, 13), { ring: 3, parent: 4 });
assert.deepEqual(geometry(2, 14), { ring: 3, parent: 6 });
assert.deepEqual(geometry(3, 7), { ring: 2, parent: 1 });

class Matrix {
  constructor(root) { this.root = root; this.cycles = new Map(); this.boards = new Map(); this.parents = new Map(); }
  parent(wallet, level) { return this.parents.get(key(wallet, level)) || E.ZeroAddress; }
  board(owner, level, cycle = this.cycles.get(key(owner, level)) || 0) {
    const k = key(owner, level, cycle);
    if (!this.boards.has(k)) this.boards.set(k, new Map());
    return this.boards.get(k);
  }
  place(owner, participant, anchor, level, kind, amount) {
    const cycle = this.cycles.get(key(owner, level)) || 0;
    const board = this.board(owner, level, cycle);
    let anchorSlot = 0;
    if (!same(owner, anchor)) {
      for (const [slot, p] of board) if (same(p.participant, anchor)) anchorSlot = Math.max(anchorSlot, slot);
      assert(anchorSlot, `Missing ancestry anchor: ${owner} level ${level} anchor ${anchor}`);
    }
    let position;
    for (let slot = 1; slot <= capacities[level]; slot++) {
      if (!board.has(slot) && (!anchorSlot || geometry(level, slot).parent === anchorSlot)) { position = slot; break; }
    }
    assert(position, `Full branch: ${owner} level ${level} anchor ${anchor}`);
    const g = geometry(level, position);
    const structuralParent = g.parent ? board.get(g.parent)?.participant : owner;
    assert(structuralParent, 'Parent must precede its child');
    if (anchorSlot) assert(same(structuralParent, anchor));
    const row = { orbitOwner: owner, participant, level, cycle, position, ring: g.ring, structuralParent,
      amount: String(amount), kind, financial: kind !== 0 };
    board.set(position, row);
    if (kind !== 2) this.parents.set(key(participant, level), structuralParent);
    if (board.size === capacities[level]) this.cycles.set(key(owner, level), cycle + 1);
    return row;
  }
  reserveWindow(row) {
    if (row.level >= 5) return row.position === capacities[row.level];
    const finalRing = row.level <= 2 ? 3 : 2;
    if (row.ring !== finalRing) return false;
    const arrivals = [...this.board(row.orbitOwner, row.level, row.cycle).values()].filter(p => p.ring === finalRing).length;
    return arrivals >= widths[row.level] ** finalRing - 1;
  }
}

function normalizedPosition(p) {
  return Object.fromEntries(['orbitOwner', 'participant', 'level', 'cycle', 'position', 'ring', 'structuralParent', 'amount', 'kind', 'financial']
    .map(f => [f, String(p[f]).toLowerCase()]));
}

function reconcile(r, v) {
  assert.equal(r.chainId, 137); assert.equal(v.toBlockHash, r.toBlockHash);
  assert.equal(v.status, 'actual-execution-reconciled-with-confirmed-structural-defect');
  const paid = r.events.filter(e => e.event === 'PaidActivationSettled');
  const paidById = new Map(paid.map(e => [e.args.activationId, e]));
  const permanentSponsors = new Map(r.events.filter(e => e.event === 'ParticipantRegistered')
    .map(e => [lower(e.args.participant), e.args.sponsor]));
  const groups = new Map(paid.map(e => [e.args.activationId, r.events.filter(x => x.args.activationId === e.args.activationId)]));
  const foundersEvents = r.events.filter(e => e.event === 'FounderWalletsConfigured');
  assert.equal(foundersEvents.length, 1);
  const founders = foundersEvents[0].args.wallets;
  const vault = r.events.find(e => e.event === 'SystemVaultsUpdated').args;
  const active = new Set(), sponsors = new Map(), registered = new Set([lower(r.id1)]);
  const actualModel = new Matrix(r.id1), intendedModel = new Matrix(r.id1);
  const transactions = [], anomalies = [], missingPositions = [], accountTotals = new Map();
  const gateway = v.historicalGatewayLookups;
  let sourceSkips = 0, maxSkippedDepth = 0, genesisPositions = 0, lateActivations = 0;
  const skippedAtActivation = new Map();
  function resolve(candidate, participant, level, block) {
    const skipped = [];
    if (same(candidate, E.ZeroAddress) || same(candidate, participant)) return { recipient: r.id1, skipped };
    let cursor = candidate;
    const seen = new Set();
    for (let depth = 0; depth < 256; depth++) {
      if (same(cursor, r.id1) || same(cursor, participant)) return { recipient: r.id1, skipped };
      if (registered.has(lower(cursor)) && active.has(key(cursor, level))) return { recipient: cursor, skipped };
      assert(!seen.has(lower(cursor)), 'Sponsor cycle'); seen.add(lower(cursor)); skipped.push(cursor);
      let parent = sponsors.get(lower(cursor));
      if (!parent) {
        const evidence = gateway.find(x => x.block === block - 1 && same(x.participant, cursor));
        assert(evidence, `Historical sponsor evidence missing for ${cursor} at ${block}`);
        parent = evidence.referrer;
      }
      cursor = same(parent, E.ZeroAddress) ? r.id1 : parent;
    }
    throw Error('256-hop limit reached');
  }
  function simulate(model, p, includeRootPositions) {
    const a = p.args, level = Number(a.level), price = prices[level];
    assert.equal(BigInt(a.price), price);
    assert(same(a.sponsor, permanentSponsors.get(lower(a.participant))));
    const selection = resolve(a.sponsor, a.participant, level, p.block);
    const source = model.place(selection.recipient, a.participant, selection.recipient, level, 1, price);
    const positions = [source], components = [], outflows = new Map();
    // This audit deliberately stops instead of guessing if funded recycling is encountered.
    assert(!model.reserveWindow(source), 'Funded source recycle requires separate replay');
    const owner = source.orbitOwner, outside = model.parent(owner, level);
    let candidates;
    if (level >= 5) candidates = [[owner, owner, 9000]];
    else if (level >= 3) candidates = source.ring === 1
      ? [[owner, owner, 4000], [outside, owner, 5000]]
      : [[source.structuralParent, source.structuralParent, 4000], [owner, owner, 5000]];
    else {
      const first = level === 1 ? 2000 : 1500, second = level === 1 ? 2000 : 2500;
      if (source.ring === 1) candidates = [[owner, owner, first], [outside, owner, second], [model.parent(outside, level), owner, 5000]];
      else if (source.ring === 2) candidates = [[source.structuralParent, source.structuralParent, first], [owner, owner, second], [outside, source.structuralParent, 5000]];
      else {
        const grandSlot = geometry(level, geometry(level, source.position).parent).parent;
        const grand = model.board(owner, level, source.cycle).get(grandSlot).participant;
        candidates = [[source.structuralParent, source.structuralParent, first], [grand, grand, second], [owner, owner, 5000]];
      }
    }
    let rootPlaced = same(owner, r.id1);
    for (let index = 0; index < candidates.length; index++) {
      const [candidate, anchor, bps] = candidates[index];
      const { recipient, skipped } = resolve(candidate, a.participant, level, p.block);
      const role = index + 1, amount = price * BigInt(bps) / 10000n;
      const isRoot = same(recipient, r.id1), realRootAncestor = isRoot && same(candidate, r.id1) && !same(anchor, r.id1);
      let position;
      if (!same(recipient, owner) && (!isRoot || (includeRootPositions && realRootAncestor && !rootPlaced))) {
        position = model.place(recipient, a.participant, same(candidate, recipient) ? anchor : recipient, level, 2, amount);
        positions.push(position);
        if (isRoot) rootPlaced = true;
        assert(!(bps === 5000 && model.reserveWindow(position)), 'Funded routed recycle requires separate replay');
        if (same(candidate, recipient) && position.ring !== role) anomalies.push({ tx: p.tx, level, recipient, role, actualMirrorRing: position.ring });
      }
      if (isRoot) {
        for (let i = 0; i < founders.length; i++) sumTo(outflows, founders[i], i === 7 ? amount - amount / 8n * 7n : amount / 8n);
      } else sumTo(outflows, recipient, amount);
      components.push({ role, bps, recipient, candidate, amount: String(amount), skipped,
        reason: isRoot ? (same(candidate, r.id1) ? 'ID1 is the structural ancestor; eight founders share its component' : 'No eligible structural ancestor; fallback to ID1, split among eight founders')
          : 'Eligible structural recipient for this ring component',
        id1Fallback: isRoot && (!same(candidate, r.id1) || same(candidate, a.participant)) });
    }
    sumTo(outflows, vault.newNftPoolVault, price * 8n / 100n);
    sumTo(outflows, vault.newOperationsVault, price * 2n / 100n);
    assert.equal([...outflows.values()].reduce((a, b) => a + b, 0n), price);
    return { source, positions, components, outflows: sorted(outflows), skipped: selection.skipped };
  }
  for (const e of r.events) {
    const a = e.args;
    if (e.event === 'ParticipantRegistered') { registered.add(lower(a.participant)); sponsors.set(lower(a.participant), a.sponsor); }
    if (e.event === 'LevelActivated') {
      if (skippedAtActivation.has(key(a.participant, a.level))) lateActivations++;
      active.add(key(a.participant, a.level));
    }
    if (e.event !== 'PositionRecorded') continue;
    if (String(a.kind) === '0') {
      for (const model of [actualModel, intendedModel]) {
        const expected = model.place(a.orbitOwner, a.participant, a.orbitOwner, Number(a.level), 0, 0n);
        assert.deepEqual(normalizedPosition(expected), normalizedPosition(a));
      }
      genesisPositions++; continue;
    }
    if (String(a.kind) !== '1') continue;
    const p = paidById.get(a.activationId); assert(p);
    const events = groups.get(a.activationId);
    const baseline = simulate(actualModel, p, false), intended = simulate(intendedModel, p, true);
    const actualPositions = events.filter(x => x.event === 'PositionRecorded').map(x => x.args);
    assert.deepEqual(baseline.positions.map(normalizedPosition), actualPositions.map(normalizedPosition), `Live position reconstruction: ${p.tx}`);
    const actualComponents = events.filter(x => ['ComponentSettled', 'FounderComponentSettled'].includes(x.event));
    assert.equal(actualComponents.length, intended.components.length);
    for (let i = 0; i < actualComponents.length; i++) {
      const observed = actualComponents[i].args, expected = intended.components[i];
      for (const field of ['role', 'bps', 'amount', 'recipient', 'id1Fallback']) {
        assert.equal(String(observed[field]).toLowerCase(), String(expected[field]).toLowerCase(), `Payout rule mismatch ${p.tx} ${field}`);
      }
      assert(same(observed.originalCandidate, expected.candidate));
    }
    const receipt = v.receipts.find(x => x.tx === p.tx); assert(receipt?.verified);
    assert.deepEqual(intended.outflows, receipt.outflows.map(([address, amount]) => [address, BigInt(amount)]), `Actual transfer vs intended recipient ${p.tx}`);
    assert.deepEqual(baseline.outflows, intended.outflows, `Restoring missing root positions changes historical money: ${p.tx}`);
    const missing = intended.positions.filter(p => !actualPositions.some(x => same(x.orbitOwner, p.orbitOwner)));
    for (const observed of actualPositions) {
      const expected = intended.positions.find(x => same(x.orbitOwner, observed.orbitOwner));
      assert(expected); assert.deepEqual(normalizedPosition(observed), normalizedPosition(expected), `Existing position would change: ${p.tx}`);
    }
    missingPositions.push(...missing.map(x => ({ tx: p.tx, block: p.block, ...x })));
    if (intended.skipped.length) sourceSkips++;
    maxSkippedDepth = Math.max(maxSkippedDepth, intended.skipped.length);
    for (const wallet of intended.skipped) skippedAtActivation.set(key(wallet, a.level), p.tx);
    for (const [address, amount] of intended.outflows) sumTo(accountTotals, address, amount);
    const charge = events.find(x => x.event === 'SystemChargeSettled').args;
    assert.equal(BigInt(charge.grossCharge), prices[Number(a.level)] / 10n);
    assert.equal(BigInt(charge.nftPoolAmount), prices[Number(a.level)] * 8n / 100n);
    assert.equal(BigInt(charge.operationsAmount), prices[Number(a.level)] * 2n / 100n);
    transactions.push({ block: p.block, tx: p.tx, participant: a.participant, level: Number(a.level), priceUSDT: money(p.args.price),
      sponsor: p.args.sponsor, source: intended.source, skippedUplines: intended.skipped,
      actualPositions, intendedPositions: intended.positions, missingPositions: missing,
      components: intended.components, actualOutflows: intended.outflows.map(([wallet, raw]) => ({ wallet, raw: String(raw), usdt: money(raw) })),
      financialVerdict: 'PASS for these historical activations, including intended recipients and actual token transfers',
      structuralVerdict: missing.length ? 'FAIL: required additional ID1 position absent' : 'PASS for this activation' });
  }
  assert.equal(transactions.length, paid.length);
  assert.equal(anomalies.length, 0, json(anomalies));
  const gross = paid.reduce((n, p) => n + BigInt(p.args.price), 0n);
  const rootProjection = [];
  for (let level = 1; level <= 7; level++) rootProjection.push({ level,
    actualCycle: actualModel.cycles.get(key(r.id1, level)) || 0,
    intendedCycle: intendedModel.cycles.get(key(r.id1, level)) || 0,
    actualFilled: actualModel.board(r.id1, level).size, intendedFilled: intendedModel.board(r.id1, level).size,
    intendedPositions: [...intendedModel.board(r.id1, level).values()] });
  const founderTotal = founders.reduce((n, f) => n + (accountTotals.get(lower(f)) || 0n), 0n);
  const report = { chainId: 137, liveWrites: 0, fromBlock: r.fromBlock, toBlock: r.toBlock, toUtc: r.toUtc, toBlockHash: r.toBlockHash,
    methodology: 'Independent offline matrix and eligibility replay, then expected component recipients/percentages reconciled to actual mainnet USDT receipts. Second replay inserts legitimate missing ID1 ancestry positions chronologically and checks all subsequent payouts and existing positions again.',
    assumptions: ['One additional position per real ancestor orbit; no extra position for exhausted-ancestry fallback money to ID1.',
      'Existing genesis representatives are retained exactly as deployed. This report does not certify hypothetical future descendants of unexercised genesis branches.',
      'No historical compensation, current state repair, or live contract mutation is executed.'],
    verdict: 'Historical paid-transfer checks pass; structural correctness fails. Not a whole-program release certification.',
    counts: { paidActivations: transactions.length, paidWallets: new Set(transactions.map(x => lower(x.participant))).size,
      byLevel: Object.fromEntries(Array.from({ length: 7 }, (_, i) => [i + 1, transactions.filter(x => x.level === i + 1).length])),
      financiallyPassed: transactions.length, structurallyFailed: transactions.filter(x => x.missingPositions.length).length,
      structurallyPassed: transactions.filter(x => !x.missingPositions.length).length, missingPositions: missingPositions.length,
      affectedWallets: new Set(missingPositions.map(x => lower(x.participant))).size, genesisPositions, sourceSkips, maxSkippedDepth, lateActivations,
      fundedRecycles: r.events.filter(e => e.event === 'RecycleCompleted').length },
    totalsUSDT: { gross: money(gross), participantPayouts: money(gross - founderTotal - gross / 10n),
      founders: money(founderTotal), nftPool: money(gross * 8n / 100n), operations: money(gross * 2n / 100n), recycleReserve: '0', unexplainedDifference: '0' },
    coverageLimits: ['Successful activations only: reverted transactions emit no surviving events and were not enumerated.',
      'No paid activations at levels 4-7; no funded recycle or reserve-window arrival observed. These cannot be certified from this live history.',
      'Deep skip beyond the observed depth is not certified by these transactions.',
      'No frontend/database audit, NFT payout audit, utility-token issuance audit, or other-program audit in this report.',
      'The extra-position model demonstrates this finite history only; it is not a deployment-ready historical repair plan.'],
    accountTotals: sorted(accountTotals).map(([wallet, raw]) => ({ wallet, raw: String(raw), usdt: money(raw) })),
    missingPositions, rootProjection, transactions };
  report.lateActivationCases = transactions.flatMap(tx => tx.skippedUplines.flatMap(wallet => {
    const later = r.events.find(e => e.event === 'LevelActivated' && e.block > tx.block &&
      same(e.args.participant, wallet) && Number(e.args.level) === tx.level);
    if (!later) return [];
    const parentUpdates = r.events.filter(e => e.event === 'StructuralParentRecorded' && e.block > tx.block &&
      same(e.args.participant, tx.participant) && Number(e.args.level) === tx.level);
    assert.equal(parentUpdates.length, 0, 'Unexpected midway reparenting');
    return [{ skippedWallet: wallet, level: tx.level, downline: tx.participant, originalTx: tx.tx,
      lateActivationTx: later.tx, lateActivationBlock: later.block, downlineParentUpdates: parentUpdates.length,
      laterSameLevelActivations: transactions.filter(x => x.block > later.block && x.level === tx.level).length }];
  }));
  return report;
}

function writeReport(report) {
  const lines = ['# Freedom Plus Mainnet Transaction Audit', '', `Network: Polygon mainnet (137). Blocks ${report.fromBlock}-${report.toBlock}; ending ${report.toUtc}.`, '',
    `**Verdict:** ${report.verdict}`, '', `Method: ${report.methodology}`, '', '## Summary', '',
    '```json', json({ counts: report.counts, totalsUSDT: report.totalsUSDT }), '```', '',
    '## Scope Limits', '', ...report.coverageLimits.map(x => `- ${x}`), '', '## Assumptions', '', ...report.assumptions.map(x => `- ${x}`), '',
    '## Actual Recipient Totals', '', ...report.accountTotals.map(x => `- ${x.wallet}: ${x.usdt} USDT`), '', '## Transactions', ''];
  for (const [i, tx] of report.transactions.entries()) {
    lines.push(`### ${i + 1}. Level ${tx.level}: ${tx.participant}`, '', `Block ${tx.block}; [transaction](https://polygonscan.com/tx/${tx.tx}).`,
      `Paid ${tx.priceUSDT} USDT. Permanent sponsor: ${tx.sponsor}.`,
      `Selected orbit: ${tx.source.orbitOwner}, cycle ${tx.source.cycle}, ring ${tx.source.ring}, position ${tx.source.position}.`,
      `Inactive/non-joined sponsors skipped: ${tx.skippedUplines.join(', ') || 'none'}.`, '',
      `Financial: ${tx.financialVerdict}. Structural: ${tx.structuralVerdict}.`, '', 'Expected ring payments, verified against receipt:',
      ...tx.components.map(c => `- Role ${c.role}, ${c.bps / 100}%: ${money(c.amount)} USDT to ${c.recipient}. ${c.reason}.`), '',
      'Actual USDT recipients:', ...tx.actualOutflows.map(x => `- ${x.wallet}: ${x.usdt} USDT`), '',
      'Recorded positions:', ...tx.actualPositions.map(x => `- Orbit ${x.orbitOwner}, level ${x.level}, cycle ${x.cycle}, ring ${x.ring}, slot ${x.position}, parent ${x.structuralParent}.`), '',
      'Required but missing positions:', ...(tx.missingPositions.length ? tx.missingPositions.map(x => `- Orbit ${x.orbitOwner}, level ${x.level}, cycle ${x.cycle}, ring ${x.ring}, slot ${x.position}, parent ${x.structuralParent}. Historical expected position, not an instruction to overwrite live state.`) : ['- None.']), '');
  }
  for (const prefix of [path.join(DIR, 'financial-structural-reconciliation'),
    path.resolve(__dirname, '../../docs/evidence/freedom-plus-mainnet-audit-2026-11-13')]) {
    fs.mkdirSync(path.dirname(prefix), { recursive: true });
    fs.writeFileSync(`${prefix}.json`, json(report) + '\n');
    fs.writeFileSync(`${prefix}.md`, lines.join('\n').trimEnd() + '\n');
  }
}

function main() {
  const r = load('events.json'), v = load('verification.json');
  const report = reconcile(r, v);
  const negativeControls = [
    ['wrong token recipient', (_, test) => { test.receipts[0].outflows[0][0] = E.ZeroAddress; }],
    ['wrong token amount', (_, test) => { test.receipts[0].outflows[0][1] = '1'; }],
    ['wrong payout recipient', test => { test.events.find(e => e.event === 'ComponentSettled').args.recipient = E.ZeroAddress; }],
    ['wrong payout percentage', test => { test.events.find(e => e.event === 'ComponentSettled').args.bps = '2100'; }],
    ['wrong placement', test => { test.events.find(e => e.event === 'PositionRecorded' && e.args.kind === '1').args.position = '2'; }],
    ['wrong sponsor', test => { test.events.find(e => e.event === 'PaidActivationSettled').args.sponsor = E.ZeroAddress; }],
    ['wrong charge split', test => { test.events.find(e => e.event === 'SystemChargeSettled').args.nftPoolAmount = '1'; }],
  ];
  for (const [name, mutate] of negativeControls) {
    const events = structuredClone(r), verification = structuredClone(v);
    mutate(events, verification);
    assert.throws(() => reconcile(events, verification), undefined, `Auditor accepted ${name}`);
  }
  const token = new E.Interface(['event Transfer(address indexed from,address indexed to,uint256 value)']);
  for (const tx of report.transactions) {
    const receipt = load(`receipts/${tx.tx}.json`);
    const transfers = receipt.logs.filter(l => same(l.address, r.wiring.usdt)).flatMap(l => {
      try { const event = token.parseLog(l); return event ? [event.args] : []; } catch { return []; }
    });
    const router = r.contracts.FreedomPlusSettlementRouter.proxy;
    const incoming = transfers.filter(t => !same(t.from, router));
    assert.equal(incoming.length, 1, `Unexpected additional token transfer ${tx.tx}`);
    assert(same(incoming[0].from, tx.participant) && same(incoming[0].to, router));
    assert.equal(incoming[0].value, prices[tx.level]);
  }
  report.auditorNegativeControls = negativeControls.map(([name]) => ({ tampering: name, correctlyRejected: true }));
  report.receiptScopeCheck = 'Exactly one participant-to-router USDT payment per activation; all other USDT transfers originate from the router and reconcile to the expected recipients.';
  report.contracts = r.contracts;
  report.wiring = r.wiring;
  report.evidenceSHA256 = Object.fromEntries(['identity.json', 'events.json', 'verification.json',
    'baseline/FreedomPlusSettlementRouter.json', 'baseline/build-info.json',
    ...report.transactions.map(tx => `receipts/${tx.tx}.json`)].map(name =>
    [name, crypto.createHash('sha256').update(fs.readFileSync(path.join(DIR, name))).digest('hex')]));
  writeReport(report);
  console.log(json({ verdict: report.verdict, counts: report.counts, totalsUSDT: report.totalsUSDT,
    negativeControls: report.auditorNegativeControls.length,
    rootProjection: report.rootProjection.map(({ intendedPositions, ...x }) => x) }));
}
if (require.main === module) main();
module.exports = { reconcile, geometry, Matrix };

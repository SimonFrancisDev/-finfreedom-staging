const assert = require('node:assert/strict');
const ZERO = '0x0000000000000000000000000000000000000000';
const key = (...parts) => parts.join(':').toLowerCase();
const same = (a, b) => a.toLowerCase() === b.toLowerCase();
const compact = e => ({ block: e.block, tx: e.tx, log: e.index, ...e.args });

function analyze(report) {
  assert.equal(report.chainId, 137);
  assert.equal(report.status, 'collected');
  const groups = new Map(), parents = new Map(), slots = new Map();
  const duplicates = [], missingSources = [], expectedRootMirrors = [], sources = [];
  for (const e of report.events) {
    const a = e.args;
    if (a.activationId) {
      if (!groups.has(a.activationId)) groups.set(a.activationId, []);
      groups.get(a.activationId).push(e);
    }
    if (e.event === 'StructuralParentRecorded') parents.set(key(a.participant, a.level), a.parent);
    if (e.event !== 'PositionRecorded') continue;
    const positionKey = key(e.address, a.orbitOwner, a.level, a.cycle, a.position);
    assert(!slots.has(positionKey), `A historical position was overwritten: ${positionKey}`);
    slots.set(positionKey, e);
    if (!['1', '3'].includes(String(a.kind))) continue;
    sources.push(e);
    if (same(a.orbitOwner, report.id1) || Number(a.level) > 4) continue;
    const parent = parents.get(key(a.orbitOwner, a.level)) || ZERO;
    const grandparent = parents.get(key(parent, a.level)) || ZERO;
    const ring = Number(a.ring), level = Number(a.level);
    const candidates = [];
    if (ring === 1) {
      candidates.push({ role: 2, candidate: parent, anchor: a.orbitOwner });
      if (level <= 2) candidates.push({ role: 3, candidate: grandparent, anchor: a.orbitOwner });
    } else if (ring === 2 && level <= 2) {
      candidates.push({ role: 3, candidate: parent, anchor: a.structuralParent });
    }
    const rooted = candidates.filter(c => same(c.candidate, report.id1) && !same(c.anchor, report.id1));
    if (rooted.length) expectedRootMirrors.push({ source: e, roles: rooted.map(c => c.role), anchor: rooted[0].anchor });
  }
  for (const [activationId, events] of groups) {
    const positions = events.filter(e => e.event === 'PositionRecorded');
    const owners = new Map();
    for (const p of positions) {
      const k = key(p.address, p.args.orbitOwner, p.args.level, p.args.cycle);
      if (owners.has(k)) duplicates.push({ activationId, first: compact(owners.get(k)), second: compact(p) });
      else owners.set(k, p);
    }
    if (events.some(e => e.event === 'ActivationSettlementCompleted') &&
        positions.filter(p => ['1', '3'].includes(String(p.args.kind))).length !== 1) {
      missingSources.push({ activationId, events: events.map(compact) });
    }
  }
  const missing = expectedRootMirrors.filter(row => !(groups.get(row.source.args.activationId) || []).some(e =>
    e.event === 'PositionRecorded' && same(e.args.orbitOwner, report.id1))).map(row => {
    const events = groups.get(row.source.args.activationId);
    const payments = events.filter(e => ['ComponentSettled', 'FounderComponentSettled'].includes(e.event) &&
      same(e.args.recipient, report.id1));
    return { ...compact(row.source), sourceOwner: row.source.args.orbitOwner, requiredRootAnchor: row.anchor,
      missingOrbit: report.id1, candidateRoles: row.roles, actualId1Components: payments.map(compact),
      classification: 'missing-legitimate-ID1-ancestry-mirror',
      intendedHistoricalPayoutVerdict: 'requires chronological counterfactual; actual transfer is not proof of intended entitlement' };
  });
  const allPositions = [...slots.values()];
  const rootPositions = allPositions.filter(e => same(e.args.orbitOwner, report.id1));
  const currentByLevel = {};
  for (const e of report.events.filter(e => e.event === 'CycleClosed' && same(e.args.orbitOwner, report.id1))) {
    currentByLevel[e.args.level] = Number(e.args.cycle) + 1;
  }
  return { chainId: report.chainId, fromBlock: report.fromBlock, toBlock: report.toBlock, toBlockHash: report.toBlockHash,
    toUtc: report.toUtc, id1: report.id1, liveWrites: 0, status: missing.length || duplicates.length || missingSources.length ? 'defect-confirmed' : 'targeted-checks-passed',
    counts: { events: report.events.length, paidSourcePlacements: sources.length,
      paidActivations: sources.filter(e => String(e.args.kind) === '1').length,
      fundedRecycles: sources.filter(e => String(e.args.kind) === '3').length,
      positionEvents: allPositions.length, rootPositionEvents: rootPositions.length,
      expectedRootMirrors: expectedRootMirrors.length, missingRootMirrors: missing.length,
      affectedWallets: new Set(missing.map(e => e.participant.toLowerCase())).size,
      duplicateSameActivationPositions: duplicates.length, missingSourcePlacements: missingSources.length },
    missingRootMirrors: missing, duplicateSameActivationPositions: duplicates, missingSourcePlacements: missingSources,
    rootPositions: rootPositions.map(compact), currentRootCycles: currentByLevel,
    upgrades: report.events.filter(e => e.event === 'Upgraded').map(e => ({ contract: e.contract, ...compact(e) })),
    sources: sources.map(compact), positions: allPositions.map(e => ({ contract: e.contract, ...compact(e) })),
  };
}
module.exports = { analyze };

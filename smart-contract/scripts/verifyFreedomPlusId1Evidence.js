// Pinned mainnet state and actual USDT receipts; never loads a signing key.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const E = require('ethers');
const DIR = path.resolve(__dirname, '../../../tmp/freedom-plus-id1-audit');
const json = value => JSON.stringify(value, (_, v) => typeof v === 'bigint' ? v.toString() : v, 2);
const lower = s => s.toLowerCase();
const key = (...parts) => parts.join(':').toLowerCase();
const add = (map, address, amount) => map.set(lower(address), (map.get(lower(address)) || 0n) + BigInt(amount));
const comparable = map => [...map].filter(([, v]) => v !== 0n).sort(([a], [b]) => a.localeCompare(b));

async function main() {
  assert(process.env.FP_AUDIT_RPC);
  const r = JSON.parse(fs.readFileSync(path.join(DIR, 'events.json')));
  const analysis = JSON.parse(fs.readFileSync(path.join(DIR, 'analysis.json')));
  const req = new E.FetchRequest(process.env.FP_AUDIT_RPC); req.timeout = 30000;
  const provider = new E.JsonRpcProvider(req, undefined, { batchMaxCount: 1 });
  const tokenAbi = new E.Interface(['event Transfer(address indexed from,address indexed to,uint256 value)']);
  const orbitAbi = new E.Interface(require('../artifacts/contracts/freedom-plus/orbits/P39PlusOrbit.sol/P39PlusOrbit.json').abi);
  const router = r.contracts.FreedomPlusSettlementRouter.proxy;
  const manager = r.contracts.FreedomPlusLevelManager.proxy;
  const usdt = r.wiring.usdt;
  const report = { chainId: 137, toBlock: r.toBlock, toBlockHash: r.toBlockHash, liveWrites: 0,
    status: 'checking', receipts: [], positionsChecked: 0, rootStates: [], checks: [] };
  try {
    assert.equal((await provider.getNetwork()).chainId, 137n);
    assert.equal((await provider.getBlock(r.toBlock)).hash, r.toBlockHash);
    const vaultChange = r.events.filter(e => e.event === 'SystemVaultsUpdated');
    assert.equal(vaultChange.length, 1, 'Review historical vault mappings when they change');
    const paid = r.events.filter(e => e.event === 'PaidActivationSettled');
    const receiptDir = path.join(DIR, 'receipts'); fs.mkdirSync(receiptDir, { recursive: true });
    assert(paid.every(e => e.block > vaultChange[0].block));
    const nft = vaultChange[0].args.newNftPoolVault, ops = vaultChange[0].args.newOperationsVault;
    for (const p of paid) {
      const receiptFile = path.join(receiptDir, `${p.tx}.json`);
      const receipt = fs.existsSync(receiptFile) ? JSON.parse(fs.readFileSync(receiptFile)) : await provider.getTransactionReceipt(p.tx);
      if (!fs.existsSync(receiptFile)) fs.writeFileSync(receiptFile, json(receipt.toJSON()) + '\n');
      assert.equal(receipt.status, 1); assert.equal(receipt.blockNumber, p.block);
      const events = r.events.filter(e => e.tx === p.tx);
      const transfers = receipt.logs.filter(l => lower(l.address) === lower(usdt)).flatMap(l => {
        try { const e = tokenAbi.parseLog(l); return e ? [{ from: e.args.from, to: e.args.to, raw: e.args.value }] : []; }
        catch { return []; }
      });
      const expected = new Map(), actual = new Map();
      for (const e of events) {
        if (e.event === 'ComponentSettled') add(expected, e.args.recipient, e.args.amount);
        if (e.event === 'FounderPaymentDistributed') add(expected, e.args.founder, e.args.amount);
        if (e.event === 'SystemChargeSettled') {
          add(expected, nft, e.args.nftPoolAmount); add(expected, ops, e.args.operationsAmount);
        }
        if (['ComponentSettled', 'FounderComponentSettled'].includes(e.event)) {
          assert.equal(BigInt(e.args.amount), BigInt(p.args.price) * BigInt(e.args.bps) / 10000n);
        }
      }
      for (const t of transfers.filter(t => lower(t.from) === lower(router))) add(actual, t.to, t.raw);
      assert.deepEqual(comparable(actual), comparable(expected), `USDT receipt/event mismatch ${p.tx}`);
      // The manager spends the allowance but transfers the tokens directly to the router.
      assert(transfers.some(t => lower(t.from) === lower(p.args.participant) && lower(t.to) === lower(router) && t.raw === BigInt(p.args.price)));
      const reserveDelta = events.reduce((total, e) => total + (e.event === 'RecycleReserveUpdated' ? BigInt(e.args.added) :
        e.event === 'RecycleCompleted' ? -BigInt(e.args.repurchasePrice) : 0n), 0n);
      assert.equal([...actual.values()].reduce((a, b) => a + b, 0n) + reserveDelta, BigInt(p.args.price));
      for (const component of events.filter(e => e.event === 'FounderComponentSettled')) {
        const splits = events.filter(e => e.event === 'FounderPaymentDistributed' &&
          e.args.activationId === component.args.activationId && e.args.role === component.args.role);
        assert.equal(splits.length, 8); assert.equal(new Set(splits.map(e => lower(e.args.founder))).size, 8);
        assert.equal(splits.reduce((sum, e) => sum + BigInt(e.args.amount), 0n), BigInt(component.args.amount));
      }
      report.receipts.push({ tx: p.tx, block: p.block, participant: p.args.participant, level: p.args.level,
        activationId: p.args.activationId, price: p.args.price, reserveDelta, outflows: comparable(actual), verified: true });
    }
    console.log(json({ phase: 'receipts-verified', count: report.receipts.length }));
    const calls = [];
    for (const p of analysis.positions) {
      const proxy = r.contracts[p.contract].proxy;
      calls.push({ to: proxy, data: orbitAbi.encodeFunctionData('positionAt', [p.orbitOwner, p.level, p.cycle, p.position]),
        check: raw => {
          const result = orbitAbi.decodeFunctionResult('positionAt', raw)[0];
          for (const field of ['participant', 'structuralParent', 'activationId', 'placementId']) assert.equal(lower(result[field]), lower(p[field]));
          for (const field of ['amount', 'kind']) assert.equal(String(result[field]), String(p[field]));
          assert(result.timestamp > 0n && result.timestamp <= BigInt(Date.parse(r.toUtc) / 1000));
          assert.equal(result.financial, p.financial); report.positionsChecked++;
        } });
    }
    const levels = ['P39PlusOrbit', 'P14PlusOrbit', 'P12PlusOrbit', 'P6PlusOrbit', 'P4PlusOrbit', 'P4PlusOrbit', 'P3PlusOrbit'];
    for (let level = 1; level <= 7; level++) {
      const cycle = analysis.currentRootCycles[level] || 0, proxy = r.contracts[levels[level - 1]].proxy;
      calls.push({ to: proxy, data: orbitAbi.encodeFunctionData('cycleState', [r.id1, level, cycle]), check: raw => {
        const state = orbitAbi.decodeFunctionResult('cycleState', raw)[0];
        const recorded = analysis.rootPositions.filter(p => Number(p.level) === level && Number(p.cycle) === cycle);
        assert.equal(Number(state.filledPositions), recorded.length);
        report.rootStates.push({ level, cycle, filled: Number(state.filledPositions), capacity: Number(state.capacity), closed: state.closed });
      } });
      for (let position = 1; position <= [39, 14, 12, 6, 4, 4, 3][level - 1]; position++) {
        calls.push({ to: proxy, data: orbitAbi.encodeFunctionData('positionAt', [r.id1, level, cycle, position]), check: raw => {
          const actual = orbitAbi.decodeFunctionResult('positionAt', raw)[0];
          const expected = analysis.rootPositions.find(p => Number(p.level) === level && Number(p.cycle) === cycle && Number(p.position) === position);
          assert.equal(lower(actual.participant), lower(expected?.participant || E.ZeroAddress));
        } });
      }
    }
    for (let offset = 0; offset < calls.length; offset += 15) {
      const batch = calls.slice(offset, offset + 15);
      const response = await fetch(process.env.FP_AUDIT_RPC, { method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify(batch.map((call, i) => ({ jsonrpc: '2.0', id: i, method: 'eth_call', params: [{ to: call.to, data: call.data }, E.toQuantity(r.toBlock)] }))),
        signal: AbortSignal.timeout(30000) });
      assert(response.ok); const results = await response.json(); assert(Array.isArray(results));
      for (let i = 0; i < batch.length; i++) {
        const result = results.find(row => row.id === i); assert(result && !result.error, json(result)); batch[i].check(result.result);
      }
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    const active = new Set(), sponsors = new Map();
    const gateway = new E.Contract(r.wiring.fFreedomRegistration, ['function getReferrer(address) view returns(address)'], provider);
    report.historicalGatewayLookups = [];
    for (let level = 1; level <= 7; level++) active.add(key(r.id1, level));
    const paidById = new Map(paid.map(p => [p.args.activationId, p]));
    for (const e of r.events) {
      const a = e.args;
      if (e.event === 'ParticipantRegistered') sponsors.set(lower(a.participant), a.sponsor);
      if (e.event === 'LevelActivated') active.add(key(a.participant, a.level));
      if (e.event !== 'PositionRecorded' || String(a.kind) !== '1') continue;
      let expected = paidById.get(a.activationId).args.sponsor, seen = new Set();
      while (lower(expected) !== lower(r.id1) && !active.has(key(expected, a.level))) {
        assert(!seen.has(lower(expected)), 'Sponsor loop'); seen.add(lower(expected));
        const candidate = expected;
        expected = sponsors.get(lower(candidate));
        if (!expected) {
          expected = await gateway.getReferrer(candidate, { blockTag: e.block - 1 });
          report.historicalGatewayLookups.push({ block: e.block - 1, participant: candidate, referrer: expected });
        }
        if (expected === E.ZeroAddress) expected = r.id1;
      }
      assert.equal(lower(a.orbitOwner), lower(expected), `Wrong eligible primary recipient ${e.tx}`);
    }
    report.checks.push('All 50 successful activation receipts reconcile actual USDT transfers with emitted payouts and charges',
      'Recorded positions match pinned contract storage', 'ID1 current counters match complete event history',
      'Primary source recipients match replayed exact-level eligibility at activation');
    report.status = 'actual-execution-reconciled-with-confirmed-structural-defect';
    report.warning = 'This does not certify intended historical entitlements or exclude counterfactual reserve/placement effects of missing mirrors.';
    console.log(json({ status: report.status, receipts: report.receipts.length, positions: report.positionsChecked, rootStates: report.rootStates }));
  } catch (error) { report.status = 'failed'; report.error = error.message; throw error; }
  finally { fs.writeFileSync(path.join(DIR, 'verification.json'), json(report) + '\n'); provider.destroy(); }
}
main().catch(error => { console.error(error.stack || error.message); process.exitCode = 1; });

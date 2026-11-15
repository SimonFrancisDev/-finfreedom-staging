// Read-only receipt/state verification and next-batch preflight. Never signs.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const E = require('ethers');
const { ABI, OWNERS, RUNTIME_HASH } = require('./lib/id1CancellationPlan');
const { A, FP, engines } = require('./lib/combinedPlacementRepairPackage');
const { artifact } = require('./prepareCombinedPlacementRepair');
const ROOT = path.resolve(__dirname, '../../..');
const TX = '0x457ca9cfa5a6c02ab642e8862719384128c81bab81d817868d4eccd8047af4d8';
const RELAY = '0x16F9ac40B06e2a17bc0CC145b211A176E8654906';
const POL = '0x0000000000000000000000000000000000001010';
const read = file => JSON.parse(fs.readFileSync(path.join(ROOT, file), 'utf8'));
const json = value => JSON.stringify(value, (_, v) => typeof v === 'bigint' ? v.toString() : v, 2);
const same = (a, b) => assert.equal(a.toLowerCase(), b.toLowerCase());
const logs = values => values.filter(l => l.address.toLowerCase() !== POL).map(l =>
  JSON.stringify({ address: l.address.toLowerCase(), topics: Array.from(l.topics), data: l.data })).sort();

async function main() {
  assert(process.env.REPAIR_MAINNET_RPC, 'Explicit mainnet RPC required');
  const request = new E.FetchRequest(process.env.REPAIR_MAINNET_RPC); request.timeout = 120000;
  const p = new E.JsonRpcProvider(request, undefined, { batchMaxCount: 1, cacheTimeout: -1 });
  try {
    assert.equal((await p.getNetwork()).chainId, 137n);
    const block = await p.getBlock('latest'), at = { blockTag: block.number }, tag = E.toQuantity(block.number);
    const baseline = read('staging-environment/docs/evidence/repair225-release-preflight-2026-11-15.json');
    const pkg = read('tmp/combined-placement-live-package.json');
    const g = new E.Contract(A.governance, [...ABI, 'function isOwner(address) view returns(bool)', 'function executeTransaction(uint256)'], p);
    assert.equal(E.keccak256(await p.getCode(A.governance, block.number)), RUNTIME_HASH);
    assert.deepEqual(Array.from(await g.getOwners(at)), OWNERS);
    assert.equal(await g.requiredConfirmations(at), 3n); assert.equal(await g.isOwner(RELAY, at), false);
    for (const id of [224, 225, 258]) {
      const row = await g.transactions(id, at); assert(row.executed && !row.cancelled);
      if (id === 225) {
        same(row.to, pkg.actions[35].target); assert.equal(row.value, 0n);
        assert.equal(row.data, pkg.actions[35].data); assert.equal(E.keccak256(row.data), baseline.proposal225.payloadHash);
      }
    }
    const receipt = await p.getTransactionReceipt(TX), tx = await p.getTransaction(TX);
    assert.equal(receipt.status, 1); assert.equal(receipt.blockNumber, 97379940);
    same(tx.to, A.governance); assert.equal(tx.chainId, 137n); assert.equal(tx.value, 0n);
    assert(OWNERS.some(a => a.toLowerCase() === tx.from.toLowerCase()));
    assert.equal(tx.data, g.interface.encodeFunctionData('executeTransaction', [225]));
    assert.deepEqual(logs(receipt.logs), logs(baseline.simulatedLogs), 'Mined events differ from approved simulation');
    const transfer = E.id('Transfer(address,address,uint256)');
    assert(!receipt.logs.some(l => l.address.toLowerCase() !== POL && l.topics[0] === transfer));
    const state = [], positions = [], coder = E.AbiCoder.defaultAbiCoder();
    const tupleType = 'tuple(address,address,bytes32,bytes32,uint256,uint40,uint8,bool)';
    for (const [key, name, migrator] of engines) {
      const c = new E.Contract(FP[key], artifact(migrator).abi, p);
      assert.equal(await c.repairExecuted(at), true);
      for (const edit of pkg.freedomPlus.edits.find(e => e.name === name).edits) {
        const expected = baseline.simulatedOrbitEvents.find(e => e.address.toLowerCase() === FP[key].toLowerCase() &&
          e.account.toLowerCase() === edit.account.toLowerCase() && Number(e.level) === edit.level);
        assert(expected);
        assert.equal(await c.repairStateHash(edit.account, edit.level, { blockTag: receipt.blockNumber - 1 }), edit.beforeHash);
        const after = await c.repairStateHash(edit.account, edit.level, at);
        assert.equal(after, expected.afterHash, 'Complete orbit post-state differs from simulation');
        state.push({ orbit: FP[key], account: edit.account, level: edit.level, beforeHash: edit.beforeHash, afterHash: after });
        for (const addition of edit.additions) {
          const actual = await c.positionAt(edit.account, edit.level, edit.cycle, addition.slot, at);
          assert.equal(coder.encode([tupleType], [actual]), coder.encode([tupleType], [addition.data]));
          positions.push({ orbit: FP[key], account: edit.account, level: edit.level, slot: addition.slot,
            position: Array.from(actual), originalTransaction: addition.originalTransaction });
        }
      }
    }
    const diff = await p.send('debug_traceTransaction', [TX, { tracer: 'prestateTracer', tracerConfig: { diffMode: true } }]);
    const allowed = new Set([A.governance, pkg.actions[35].target, ...engines.map(([key]) => FP[key]), POL].map(a => a.toLowerCase()));
    const changedStorage = [];
    for (const [address, value] of Object.entries(diff.post)) if (value.storage && Object.keys(value.storage).length) {
      assert(allowed.has(address.toLowerCase()), `Unexpected contract storage change: ${address}`);
      changedStorage.push({ address, slots: Object.keys(value.storage).length });
    }
    assert.equal(positions.length, 18); assert.equal(state.length, 5);
    for (const { address } of read('tmp/repair224-release-status-2026-11-15.json').paused) {
      assert.equal(await new E.Contract(address, ['function paused() view returns(bool)'], p).paused(at), true);
    }
    console.log('225 receipt matches simulation; all 18 stored positions and five complete orbit hashes match. No token transfers or unrelated contract storage writes.');
    const iface = new E.Interface(['function upgradeToAndCall(address,bytes)', 'function setSettlementRouter(address)',
      'function setApprovedImplementation(address,address,bool)']);
    const actions = [], codeChecks = [];
    for (let id = 226; id <= 256; id++) {
      const row = await g.transactions(id, at), expected = pkg.actions[id - 190];
      same(row.to, expected.target); assert.equal(row.value, 0n); assert.equal(row.data, expected.data);
      assert(!row.executed && !row.cancelled, `Unexpected status ${id}`);
      if (id > 244) continue;
      assert(['INSTALL', 'REVOKE'].includes(expected.phase));
      const parsed = iface.parseTransaction({ data: row.data });
      if (['upgradeToAndCall', 'setSettlementRouter'].includes(parsed.name)) {
        const address = parsed.args[0], code = await p.getCode(address, block.number);
        assert.notEqual(code, '0x'); assert.equal(code, await p.getCode(address, baseline.block));
        codeChecks.push({ id, address, runtimeHash: E.keccak256(code), unchangedSinceVerifiedBlock: baseline.block });
      }
      // Target-only simulation checks the governed call, not ungranted confirmations.
      // Founder execution still needs live quorum and all predecessors executed.
      const call = { from: A.governance, to: row.to, data: row.data, value: '0x0', gas: E.toQuantity(2_000_000) };
      assert.equal(await p.send('eth_call', [call, tag]), '0x', `Target simulation failed ${id}`);
      actions.push({ id, phase: expected.phase, label: expected.label, target: row.to, payloadHash: E.keccak256(row.data),
        confirmations: String(row.confirmations), executeAfter: String(row.executeAfter), targetCallSimulationPassed: true });
    }
    const report = { status: 'mined-repair-225-verified-install-revoke-batch-ready', chainId: 137, block: block.number,
      blockHash: block.hash, checkedAt: new Date().toISOString(),
      repair225: { tx: TX, block: receipt.blockNumber, status: receipt.status, sender: tx.from,
        gasUsed: String(receipt.gasUsed), feePOL: E.formatEther(receipt.fee), eventsMatchSimulation: true,
        paidAppearances: 16, zeroMoneyGenesisLinks: 2, tokenTransfers: 0, allFiveOrbitHashesMatch: true },
      state, positions, changedStorage, receiptLogs: receipt.logs.map(l => ({ address: l.address, topics: l.topics, data: l.data })),
      originalOwnersRestored: true, threshold: 3, all12AffectedContractsPaused: true,
      actions, codeChecks, later245Through256Held: true, liveTransactionsSent: 0,
      limitation: '226-244 target calls simulated individually from governance, not a mined sequence or a substitute for founder quorum. Reopening still requires final receipt/state/backend/UI verification.' };
    fs.writeFileSync(path.join(ROOT, 'staging-environment/docs/evidence/repair225-mined-and-install-release-2026-11-15.json'), json(report) + '\n');
    console.log(json({ status: report.status, block: block.number, repair225: report.repair225, actions }));
  } finally { p.destroy(); }
}
if (require.main === module) main().catch(error => { console.error(error.shortMessage || error.message); process.exitCode = 1; });

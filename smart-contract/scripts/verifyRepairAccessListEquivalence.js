// Diagnostic traces only; no signing, submissions, storage overrides or fork mutations.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const E = require('ethers');
const ROOT = path.resolve(__dirname, '../../..');
const NATIVE_POL = '0x0000000000000000000000000000000000001010';
const FEE_EVENT = E.id('LogFeeTransfer(address,address,address,uint256,uint256,uint256,uint256,uint256)');
const read = file => JSON.parse(fs.readFileSync(path.join(ROOT, 'tmp', file)));
function logs(call, result = []) {
  assert(!call.error, call.error);
  for (const log of call.logs || []) {
    // Polygon journals native gas charges; these necessarily change with gas used.
    if (log.address.toLowerCase() === NATIVE_POL && log.topics?.[0] === FEE_EVENT) continue;
    result.push({ address: log.address, topics: log.topics, data: log.data, position: log.position });
  }
  for (const child of call.calls || []) logs(child, result);
  return result;
}
function storage(diff) {
  return Object.fromEntries(['pre', 'post'].map(phase => [phase, Object.fromEntries(
    Object.entries(diff[phase]).filter(([address, account]) => address.toLowerCase() !== NATIVE_POL && account.storage).map(([address, account]) => [address, account.storage]),
  )]));
}
function feeParticipants(call, result = new Set()) {
  assert(!call.value || BigInt(call.value) === 0n, 'Unexpected native-value contract call');
  for (const log of call.logs || []) {
    if (log.address.toLowerCase() === NATIVE_POL && log.topics?.[0] === FEE_EVENT) {
      for (const topic of log.topics.slice(1)) result.add('0x' + topic.slice(-40).toLowerCase());
    }
  }
  for (const child of call.calls || []) feeParticipants(child, result);
  return result;
}
async function main() {
  assert(process.env.REPAIR_MAINNET_RPC, 'Explicit read-only RPC required');
  const req = new E.FetchRequest(process.env.REPAIR_MAINNET_RPC); req.timeout = 120000;
  const p = new E.JsonRpcProvider(req, undefined, { batchMaxCount: 1, cacheTimeout: -1 });
  try {
    assert.equal((await p.getNetwork()).chainId, 137n);
    const bounded = read('combined-repair-224-bounded-access-list-validated.json');
    assert(bounded.gasLimit < 32_000_000 && bounded.packetBytesConservative < 128 * 1024);
    const baseline = { ...bounded.request, gas: E.toQuantity(50_000_000) }; delete baseline.accessList;
    const at = E.toQuantity(bounded.block);
    const baselineCalls = await p.send('debug_traceCall', [baseline, at, { tracer: 'callTracer', tracerConfig: { withLog: true } }]);
    const expectedLogs = logs(baselineCalls);
    assert.deepEqual(logs(bounded.trace), expectedLogs, 'Repair events differ');
    const before = await p.send('debug_traceCall', [baseline, at, { tracer: 'prestateTracer', tracerConfig: { diffMode: true } }]);
    const after = await p.send('debug_traceCall', [bounded.request, at, { tracer: 'prestateTracer', tracerConfig: { diffMode: true } }]);
    assert.deepEqual(storage(after), storage(before), 'Storage changes differ');
    const transfer = E.id('Transfer(address,address,uint256)');
    assert(!expectedLogs.some(log => log.topics?.[0] === transfer), 'Unexpected token transfer');
    const gasAccounts = feeParticipants(bounded.trace);
    gasAccounts.add(bounded.request.from.toLowerCase());
    for (const [address, account] of Object.entries(after.post)) {
      assert(!account.code, 'Code changed');
      if (!gasAccounts.has(address.toLowerCase())) {
        if (account.balance != null) assert.equal(account.balance, after.pre[address]?.balance, 'Unexpected native transfer');
      }
    }
    const report = { status: 'identical-repair-state-and-events-read-only', chainId: 137, block: bounded.block,
      baselineGas: Number(BigInt(baselineCalls.gasUsed)), boundedGas: bounded.gasUsed,
      gasLimit: bounded.gasLimit, maximumPacketBytes: bounded.packetBytesConservative,
      accessListKeys: bounded.keys, eventsCompared: expectedLogs.length,
      tokenTransfers: 0, contractsWithStorageChanges: Object.keys(storage(after).post),
      storageChangesIdentical: true, eventPayloadsIdentical: true,
      excludedExpectedDifference: 'Native POL gas accounting and LogFeeTransfer only; lower gas costs change these, not program payments.', liveWrites: 0 };
    fs.writeFileSync(path.join(ROOT, 'tmp/combined-repair-224-access-list-equivalence.json'), JSON.stringify({ ...report, storage: storage(after), events: expectedLogs }, null, 2) + '\n');
    console.log(JSON.stringify(report, null, 2));
  } finally { p.destroy(); }
}
if (require.main === module) main().catch(error => { console.error(error.shortMessage || error.message); process.exitCode = 1; });

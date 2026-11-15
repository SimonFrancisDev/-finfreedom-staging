// Read-only diagnostic. Oversized eth_call traces are NOT admissible transactions.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const E = require('ethers');
const ROOT = path.resolve(__dirname, '../../..');
const GOVERNANCE = '0x785cC854ce9e13CE1140cbFD7C08620713E1711d';
const OWNER = '0x04eaa54e7896C24aF2622b804Bf35E4C662bf12f';
const CAP = 32_000_000;
const ABI = ['function transactions(uint256) view returns(address to,uint256 value,bytes data,bool executed,bool cancelled,uint256 confirmations,uint256 submittedAt,uint256 executeAfter)',
  'function executeTransaction(uint256)', 'function isOwner(address) view returns(bool)'];
function summarize(call, depth = 0, rows = []) {
  rows.push({ depth, type: call.type, to: call.to, selector: call.input?.slice(0, 10),
    inputBytes: (call.input?.length - 2) / 2, gasUsed: Number(BigInt(call.gasUsed || '0x0')),
    error: call.error || null, revertReason: call.revertReason || null });
  for (const child of call.calls || []) summarize(child, depth + 1, rows);
  return rows;
}
async function main() {
  assert(process.env.REPAIR_MAINNET_RPC, 'Explicit read-only Polygon RPC required');
  const req = new E.FetchRequest(process.env.REPAIR_MAINNET_RPC); req.timeout = 120000;
  const provider = new E.JsonRpcProvider(req, undefined, { batchMaxCount: 1, cacheTimeout: -1 });
  try {
    assert.equal((await provider.getNetwork()).chainId, 137n);
    const block = await provider.getBlock('latest');
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'tmp/combined-placement-live-package.json')));
    const gov = new E.Contract(GOVERNANCE, ABI, provider);
    assert(await gov.isOwner(OWNER, { blockTag: block.number }));
    const rows = [];
    for (const id of [224, 225]) {
      const tx = await gov.transactions(id, { blockTag: block.number });
      const action = pkg.actions[id - 190];
      assert.equal(tx.to.toLowerCase(), action.target.toLowerCase());
      assert.equal(tx.data, action.data); assert.equal(tx.value, 0n);
      assert.equal(tx.executed, false); assert.equal(tx.cancelled, false);
      const request = { from: OWNER, to: GOVERNANCE, value: '0x0',
        data: gov.interface.encodeFunctionData('executeTransaction', [id]), gas: E.toQuantity(50_000_000) };
      const trace = await provider.send('debug_traceCall', [request, E.toQuantity(block.number), { tracer: 'callTracer' }]);
      const calls = summarize(trace);
      rows.push({ proposalId: id, payloadBytes: E.getBytes(tx.data).length,
        diagnosticGasLimit: 50_000_000, protocolTransactionCap: 33_554_432, conservativeGasCap: CAP,
        gasUsed: Number(BigInt(trace.gasUsed)), rootError: trace.error || null,
        withinProtocolCap: Number(BigInt(trace.gasUsed)) <= 33_554_432,
        withinConservativeCap: Number(BigInt(trace.gasUsed)) < CAP, calls });
      console.log(JSON.stringify({ ...rows.at(-1), calls: calls.filter(call => call.depth <= 2) }, null, 2));
    }
    const report = { chainId: 137, liveWrites: 0, block: block.number, blockHash: block.hash,
      utc: new Date(block.timestamp * 1000).toISOString(), governance: GOVERNANCE, from: OWNER, rows };
    fs.writeFileSync(path.join(ROOT, 'tmp/combined-repair-execution-gas-breakdown-2026-11-15.json'), JSON.stringify(report, null, 2) + '\n');
  } finally { provider.destroy(); }
}
if (require.main === module) main().catch(error => { console.error(error.shortMessage || error.message); process.exitCode = 1; });
module.exports = { summarize, CAP };

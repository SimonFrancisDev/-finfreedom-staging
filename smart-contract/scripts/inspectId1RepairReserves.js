// Read-only, bounded reserve inventory for the reviewed repair orbits.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const E = require('ethers');
const ROOT = path.resolve(__dirname, '../../..');

async function main() {
  const rpc = process.env.ID1_MAINNET_REPLAY_RPC;
  assert(rpc, 'Explicit mainnet read-only RPC required');
  const snapshot = JSON.parse(fs.readFileSync(path.join(ROOT, 'tmp/id1-repair-prestate.json'), 'utf8'));
  const manager = '0x0E9De0F24eB4774834A2c4A63eaBa8356A4A4B53';
  const provider = new E.JsonRpcProvider(rpc);
  try {
    assert.equal((await provider.getNetwork()).chainId, 137n);
    assert.equal((await provider.getBlock(snapshot.block)).hash, snapshot.blockHash);
    const namespace = E.id('ffreedom.levelSettlementRouter.recycleReserve.v1');
    const rows = [];
    for (const row of snapshot.orbits.filter(row => [3, 6, 8, 9].includes(row.level))) {
      const key = E.solidityPackedKeccak256(['address', 'uint8'], [row.wallet, row.level]);
      const slot = E.keccak256(E.AbiCoder.defaultAbiCoder().encode(['bytes32', 'bytes32'], [key, namespace]));
      const amount = BigInt(await provider.getStorage(manager, slot, snapshot.block));
      const fills = BigInt(await provider.getStorage(manager, BigInt(slot) + 1n, snapshot.block));
      rows.push({ wallet: row.wallet, level: row.level, amountRaw: amount.toString(), fills: fills.toString(),
        cycle: row.state.totalCycles, state: amount === 0n && fills === 0n ? 'empty' : 'review-required' });
    }
    const result = { sourceChainId: 137, block: snapshot.block, blockHash: snapshot.blockHash,
      manager, liveTransactionsSent: 0, rows,
      scope: 'Reviewed repair-orbit reserves only; not a global reserve-solvency certification',
      status: rows.every(row => row.state === 'empty') ? 'no-existing-reserve-in-reviewed-orbits' : 'review-required' };
    fs.writeFileSync(path.resolve(__dirname, '../../docs/evidence/id1-repair-reserves-2026-11-12.json'), JSON.stringify(result, null, 2) + '\n');
    console.log(JSON.stringify(result, null, 2));
  } finally { provider.destroy(); }
}
main().catch(error => { console.error(error.shortMessage || error.message); process.exitCode = 1; });

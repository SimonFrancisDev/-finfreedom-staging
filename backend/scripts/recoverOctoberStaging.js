import fs from 'node:fs';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import 'dotenv/config';

const mappings = JSON.parse(fs.readFileSync('../smart-contract/test-reports/october-cutover-addresses.json')).backend;
Object.assign(process.env, mappings, {
  NODE_ENV: 'staging', RUN_INDEXER: 'true', RPC_MAX_RPS: '6',
  SYNC_BLOCK_CHUNK_SIZE: '5000', INDEXER_LIVE_TAIL_ENABLED: 'false',
  NFT_AUTO_DISTRIBUTION_ENABLED: 'false',
});
const output = '../smart-contract/test-reports/october-recovery.json';
const report = { chainId: 80002, startedAt: new Date().toISOString(), passes: [] };
const save = () => fs.writeFileSync(output, JSON.stringify(report, null, 2));
try {
  const { connectDB } = await import('../src/config/db.js');
  await connectDB();
  assert.equal(mongoose.connection.name, 'finfreedom-staging');
  const { getProvider } = await import('../src/blockchain/provider.js');
  assert.equal(Number((await getProvider().getNetwork()).chainId), 80002);
  const { runIndexerOnce } = await import('../src/services/indexerService.js');
  let complete = false;
  for (let pass = 1; pass <= 30; pass++) {
    const result = await runIndexerOnce();
    const targets = result.ordered.results;
    report.passes.push({ pass, safeBlock: result.safeBlock, targets });
    save();
    const lag = Math.max(...targets.map(t => Number(t.lagBlocks || 0)));
    console.log(JSON.stringify({ program: 'F-Freedom', pass, lag }));
    assert(!targets.some(t => ['error', 'cooldown', 'leased'].includes(t.status)), 'Recovery target did not complete');
    if (lag === 0) { complete = true; break; }
  }
  assert(complete, 'F-Freedom recovery exceeded bounded pass limit');
  const { syncFreedomPlusOnce } = await import('../src/services/freedomPlusIndexerService.js');
  report.freedomPlus = await syncFreedomPlusOnce();
  report.completedAt = new Date().toISOString();
  report.verdict = 'PASS';
  save();
  console.log(JSON.stringify({ verdict: report.verdict, freedomPlus: report.freedomPlus }));
  await mongoose.disconnect();
  process.exit(0);
} catch (error) {
  report.verdict = 'FAIL';
  report.error = error.shortMessage || error.message;
  save();
  console.error(report.error);
  await mongoose.disconnect();
  process.exit(1);
}

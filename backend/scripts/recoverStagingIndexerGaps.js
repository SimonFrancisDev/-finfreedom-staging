import mongoose from 'mongoose';

const recoveryRpcUrl = String(process.env.RECOVERY_RPC_URL || '').trim();
if (!recoveryRpcUrl) throw new Error('RECOVERY_RPC_URL is required');

process.env.RPC_URL_1 = recoveryRpcUrl;
process.env.RPC_URL_2 = '';
process.env.RPC_URL_3 = '';
process.env.RPC_URL = '';
process.env.RPC_MAX_CONCURRENCY = '1';
process.env.RPC_MAX_RPS = '8';
process.env.INDEXER_REPLAY_CHUNK_SIZE = '10000';
process.env.SYNC_BLOCK_CHUNK_SIZE = '5000';
process.env.FREEDOM_PLUS_REALTIME_ENABLED = 'false';
process.env.FREEDOM_PLUS_POLLING_ENABLED = 'false';

const TARGET_START_ENV = {
  registration: 'START_BLOCK_REGISTRATION',
  levelManager: 'START_BLOCK_LEVEL_MANAGER',
  autoUpgradeEscrow: 'START_BLOCK_AUTO_UPGRADE_ESCROW',
  p4Orbit: 'START_BLOCK_P4_ORBIT',
  p12Orbit: 'START_BLOCK_P12_ORBIT',
  p39Orbit: 'START_BLOCK_P39_ORBIT',
  fgtToken: 'START_BLOCK_FGT_TOKEN',
  fgtrToken: 'START_BLOCK_FGTR_TOKEN',
  freedomTokenController: 'START_BLOCK_FGT_TOKEN',
};

async function main() {
  const [
    { default: env },
    { connectDB },
    { getProvider },
    { replayIndexerRange },
    { syncFreedomPlusOnce },
    { freedomPlusReconciliation },
  ] = await Promise.all([
    import('../src/config/env.js'),
    import('../src/config/db.js'),
    import('../src/blockchain/provider.js'),
    import('../src/services/indexerService.js'),
    import('../src/services/freedomPlusIndexerService.js'),
    import('../src/services/read/freedomPlusQueryService.js'),
  ]);

  await connectDB();
  const provider = getProvider();
  const network = await provider.getNetwork();
  const chainId = Number(network.chainId);
  if (chainId !== Number(env.CHAIN_ID)) {
    throw new Error(`Recovery chain mismatch: expected ${env.CHAIN_ID}, received ${chainId}`);
  }

  const head = await provider.getBlockNumber();
  const confirmedBlock = Math.max(0, head - Number(env.SYNC_CONFIRMATIONS));
  const fFreedom = [];

  for (const [targetKey, startEnv] of Object.entries(TARGET_START_ENV)) {
    const fromBlock = Number(env[startEnv] || env.START_BLOCK);
    console.log('[RECOVERY_F_FREEDOM_TARGET_START]', { targetKey, fromBlock, confirmedBlock });
    const result = await replayIndexerRange({
      targetKey,
      fromBlock,
      toBlock: confirmedBlock,
      reason: `controlled staging recovery through ${confirmedBlock}`,
      processRole: 'recovery',
    });
    fFreedom.push(result);
    console.log('[RECOVERY_F_FREEDOM_TARGET_COMPLETE]', result);
  }

  console.log('[RECOVERY_FREEDOM_PLUS_START]', { confirmedBlock });
  const freedomPlus = await syncFreedomPlusOnce();
  env.FREEDOM_PLUS_REALTIME_ENABLED = true;
  const reconciliation = await freedomPlusReconciliation();
  console.log(JSON.stringify({ ok: reconciliation.passed, chainId, head, confirmedBlock, fFreedom, freedomPlus, reconciliation }, null, 2));
  if (!reconciliation.passed) process.exitCode = 1;
}

main()
  .catch((error) => {
    console.error('[STAGING_RECOVERY_FAILED]', error);
    process.exitCode = 1;
  })
  .finally(async () => mongoose.disconnect());

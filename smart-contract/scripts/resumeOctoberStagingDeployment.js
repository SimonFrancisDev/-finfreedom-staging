const hre = require('hardhat');
const path = require('path');

async function main() {
  const network = await hre.ethers.provider.getNetwork();
  if (hre.network.name !== 'amoy' || network.chainId !== 80002n) throw new Error('Amoy only');
  const request = hre.network.provider.request.bind(hre.network.provider);
  const retryableReads = new Set(['eth_getTransactionReceipt', 'eth_getBlockByNumber', 'eth_getBlockByHash']);
  hre.network.provider.request = async (args) => {
    for (let attempt = 0; ; attempt++) {
      try { return await request(args); }
      catch (error) {
        if (!retryableReads.has(args.method) || attempt >= 8
          || !/unknown block|temporary internal error/i.test(error.message)) throw error;
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
  };
  process.env.STAGING_RECOVERY_FILE = path.resolve(__dirname, '../deployments-staging/recovery-20261001.json');
  require('./deployFullSystem');
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });

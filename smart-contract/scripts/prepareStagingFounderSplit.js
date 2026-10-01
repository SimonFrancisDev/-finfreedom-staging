const fs = require('fs');
const path = require('path');
const hre = require('hardhat');

async function main() {
  const { ethers, upgrades } = hre;
  if (hre.network.name !== 'amoy' || (await ethers.provider.getNetwork()).chainId !== 80002n) {
    throw new Error('Amoy staging only');
  }
  const deployment = require('../deployments-freedom-plus-staging/deployment-1790706637561.json');
  const proxy = deployment.contracts.FreedomPlusSettlementRouter.proxy;
  const Router = await ethers.getContractFactory('FreedomPlusSettlementRouter');
  await upgrades.validateUpgrade(proxy, Router, { kind: 'uups' });
  if (process.env.STAGING_PREPARE_FOUNDER_SPLIT !== 'DEPLOY_IMPLEMENTATION') {
    console.log('Storage valid; no deployment requested');
    return;
  }
  const implementation = await upgrades.prepareUpgrade(proxy, Router, {
    kind: 'uups', txOverrides: { gasPrice: BigInt(process.env.TEST_GAS_PRICE_WEI || '30000000000') },
  });
  const report = { preparedAt: new Date().toISOString(), chainId: '80002', proxy,
    implementation, multisig: deployment.multisig, guardian: deployment.guardian,
    status: 'PREPARED_NOT_EXECUTED', migration: 'configureFounderWallets from staging F-Freedom; no reserve repair' };
  const target = path.resolve(__dirname, '../test-reports/freedom-plus/founder-split-prepared.json');
  fs.writeFileSync(target, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report));
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });

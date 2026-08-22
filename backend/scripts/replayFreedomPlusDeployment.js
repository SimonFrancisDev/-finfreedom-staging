import fs from 'node:fs';
import path from 'node:path';
import mongoose from 'mongoose';

const manifestPath = path.resolve(
  process.cwd(),
  '../smart-contract/deployments-freedom-plus-staging/deployment-1787395200929.json'
);
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const contracts = manifest.contracts;

const addressMap = {
  FREEDOM_PLUS_REGISTRATION_ADDRESS: 'FreedomPlusRegistration',
  FREEDOM_PLUS_LEVEL_MANAGER_ADDRESS: 'FreedomPlusLevelManager',
  FREEDOM_PLUS_SETTLEMENT_ROUTER_ADDRESS: 'FreedomPlusSettlementRouter',
  FREEDOM_PLUS_P39_ORBIT_ADDRESS: 'P39PlusOrbit',
  FREEDOM_PLUS_P14_ORBIT_ADDRESS: 'P14PlusOrbit',
  FREEDOM_PLUS_P12_ORBIT_ADDRESS: 'P12PlusOrbit',
  FREEDOM_PLUS_P6_ORBIT_ADDRESS: 'P6PlusOrbit',
  FREEDOM_PLUS_P4_ORBIT_ADDRESS: 'P4PlusOrbit',
  FREEDOM_PLUS_P3_ORBIT_ADDRESS: 'P3PlusOrbit',
  FREEDOM_PLUS_FPT_ADDRESS: 'FPTToken',
  FREEDOM_PLUS_FPTR_ADDRESS: 'FPTrToken',
  FREEDOM_PLUS_TOKEN_CONTROLLER_ADDRESS: 'FreedomPlusTokenController',
  FREEDOM_NFT_MEMBERSHIP_ADDRESS: 'FreedomNFTMembership',
  FREEDOM_NFT_REWARD_DISTRIBUTOR_ADDRESS: 'FreedomNFTRewardDistributor',
  FREEDOM_NFT_POOL_VAULT_ADDRESS: 'FreedomNFTPoolVault',
  FREEDOM_PLUS_OPERATIONS_VAULT_ADDRESS: 'FreedomPlusOperationsVault',
};

process.env.FREEDOM_PLUS_ENABLED = 'true';
process.env.FREEDOM_PLUS_REALTIME_ENABLED = 'false';
process.env.FREEDOM_PLUS_POLLING_ENABLED = 'false';
process.env.FREEDOM_PLUS_START_BLOCK = String(
  Math.min(...Object.values(contracts).map((contract) => Number(contract.deploymentBlock)))
);
for (const [envName, contractName] of Object.entries(addressMap)) {
  process.env[envName] = contracts[contractName].proxy;
}

async function main() {
  const [{ connectDB }, { syncFreedomPlusOnce }, { freedomPlusReconciliation }] = await Promise.all([
    import('../src/config/db.js'),
    import('../src/services/freedomPlusIndexerService.js'),
    import('../src/services/read/freedomPlusQueryService.js'),
  ]);
  await connectDB();
  const sync = await syncFreedomPlusOnce();
  const reconciliation = await freedomPlusReconciliation();
  console.log(JSON.stringify({
    manifest: path.basename(manifestPath),
    startBlock: Number(process.env.FREEDOM_PLUS_START_BLOCK),
    sync,
    reconciliation,
  }, null, 2));
  if (!reconciliation.passed) process.exitCode = 1;
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => mongoose.disconnect());

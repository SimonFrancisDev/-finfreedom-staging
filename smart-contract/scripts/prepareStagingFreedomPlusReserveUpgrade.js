const fs = require('fs');
const path = require('path');
const hre = require('hardhat');
const { ethers, upgrades } = hre;

async function main() {
  if (hre.network.name !== 'amoy' || (await ethers.provider.getNetwork()).chainId !== 80002n) {
    throw new Error('Amoy staging only');
  }
  const deployment = require('../deployments-freedom-plus-staging/deployment-1790706637561.json');
  const proxy = deployment.contracts.FreedomPlusSettlementRouter.proxy;
  const account = '0x8844a10391801d5b1a4273588F8c6bF1DFE06E36';
  const router = await ethers.getContractAt('FreedomPlusSettlementRouter', proxy);
  const orbit = await ethers.getContractAt('FreedomPlusBaseOrbit', deployment.contracts.P39PlusOrbit.proxy);
  const state = await orbit.cycleState(account, 1, 0);
  if (state.filledPositions !== 38n || state.closed || await router.recycleReserve(account, 1, 0) !== 0n) {
    throw new Error('Audited staging recovery precondition changed');
  }
  const Repair = await ethers.getContractFactory('FreedomPlusStagingReserveRepair');
  await upgrades.validateUpgrade(proxy, Repair, { kind: 'uups' });
  const implementation = await upgrades.prepareUpgrade(proxy, Repair, {
    kind: 'uups', txOverrides: { gasPrice: 30_000_000_000n },
  });
  const rows = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../env-files/fresh-test-wallets.private.json'), 'utf8'));
  const row = rows.find((item) => item.label === 'Account 8');
  const wallet = new ethers.Wallet(row.privateKey, ethers.provider);
  if (wallet.address.toLowerCase() !== account.toLowerCase()) throw new Error('Canonical wallet mismatch');
  const usdt = await ethers.getContractAt('IERC20', deployment.usdt, wallet);
  const amount = 25_000_000n;
  if (await usdt.balanceOf(account) < amount) throw new Error('Recovery wallet lacks the returned contribution');
  let approvalTx = null;
  if (await usdt.allowance(account, proxy) !== amount) {
    const tx = await usdt.approve(proxy, amount, { gasPrice: 30_000_000_000n });
    await tx.wait();
    approvalTx = tx.hash;
  }
  const report = { chainId: '80002', proxy, implementation, account, amount: '25', approvalTx,
    multisig: deployment.multisig, guardian: deployment.guardian, preparedAt: new Date().toISOString() };
  const output = path.resolve(__dirname, '../test-reports/freedom-plus/reserve-upgrade-prepared.json');
  fs.writeFileSync(output, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report));
}
main().catch((error) => { console.error(error); process.exitCode = 1; });

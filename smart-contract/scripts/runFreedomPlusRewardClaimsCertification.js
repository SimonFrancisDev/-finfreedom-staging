const fs = require('fs');
const path = require('path');
const { ethers } = require('hardhat');

const DISTRIBUTOR = '0xFBc27A8813A8BAC4481F3ebB219c597f8Bb8a47f';
const VAULT = '0xa50bcf37dbc859a763C5018215EA297b040124c5';
const USDT = '0x7b7E39f3D177B3356368431C5C285bca58b43A60';
const UNIT = 10n ** 6n;

function assert(condition, message) {
  if (!condition) throw new Error(`REWARD_CLAIM_ASSERTION: ${message}`);
}

async function main() {
  assert((await ethers.provider.getNetwork()).chainId === 80002n, 'Amoy only');
  const rows = JSON.parse(fs.readFileSync(
    path.resolve(__dirname, '../../env-files/fresh-test-wallets.private.json'),
    'utf8'
  ));
  const wallet = (label) => new ethers.Wallet(
    rows.find((row) => row.label === label).privateKey,
    ethers.provider
  );
  const members = [
    { wallet: wallet('Account 9'), tier: 1, reward: 500n * UNIT },
    { wallet: wallet('Account 10'), tier: 2, reward: 300n * UNIT },
    { wallet: wallet('Account 8'), tier: 3, reward: 200n * UNIT },
  ];
  const distributor = await ethers.getContractAt('FreedomNFTRewardDistributor', DISTRIBUTOR);
  const vault = await ethers.getContractAt('FreedomNFTPoolVault', VAULT);
  const usdt = await ethers.getContractAt('IERC20', USDT);
  const period = await distributor.periodOf(202608);
  assert(period.created, 'period 202608 not created');
  assert(period.poolAmount === 1_000n * UNIT, 'pool amount');
  assert(period.reservedAmount === 1_000n * UNIT, 'reserved amount');
  assert(period.rewardPerMember[0] === 500n * UNIT, 'Foundational reward');
  assert(period.rewardPerMember[1] === 300n * UNIT, 'Intermediate reward');
  assert(period.rewardPerMember[2] === 200n * UNIT, 'Advanced reward');
  assert(await vault.reservedBalance(USDT) === 1_000n * UNIT, 'vault reserve before claims');

  const transactions = [];
  for (const member of members) {
    const before = await usdt.balanceOf(member.wallet.address);
    const tx = await distributor.connect(member.wallet).claim(202608, member.tier, []);
    await tx.wait();
    const after = await usdt.balanceOf(member.wallet.address);
    assert(after - before === member.reward, `tier ${member.tier} wallet credit`);
    assert(await distributor.claimed(202608, member.wallet.address), `tier ${member.tier} claim marker`);
    let duplicateRejected = false;
    try {
      await distributor.connect(member.wallet).claim.staticCall(202608, member.tier, []);
    } catch {
      duplicateRejected = true;
    }
    assert(duplicateRejected, `tier ${member.tier} duplicate claim`);
    transactions.push({ tier: member.tier, member: member.wallet.address, amount: ethers.formatUnits(member.reward, 6), hash: tx.hash });
  }
  assert(await vault.reservedBalance(USDT) === 0n, 'vault reserve after claims');
  const report = { verdict: 'PASS', periodId: 202608, pool: '1000', transactions };
  const reportDir = path.resolve(__dirname, '../test-reports/freedom-plus');
  fs.mkdirSync(reportDir, { recursive: true });
  const reportFile = path.join(reportDir, `nft-rewards-${Date.now()}.json`);
  fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
  console.log(`FREEDOM_PLUS_NFT_REWARDS=PASS report=${reportFile}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

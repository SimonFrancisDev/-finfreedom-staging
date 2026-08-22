const fs = require('fs');
const path = require('path');
const { ethers } = require('hardhat');

const MEMBERSHIP = '0x9f55e918BC3b11aE13bCBD7DFD1461E0Ea1D8135';
const FGT = '0xf5C0815fd2bDa5dBa0b7A48F14b4c3740bB088Fa';
const FPT = '0x2C8Cd7BDaf2A9242A76ef5174595a613526e55B9';
const UNIT = 10n ** 6n;

function assert(condition, message) {
  if (!condition) throw new Error(`THREE_TIER_ASSERTION: ${message}`);
}

async function main() {
  assert((await ethers.provider.getNetwork()).chainId === 80002n, 'Amoy only');
  const rows = JSON.parse(fs.readFileSync(
    path.resolve(__dirname, '../../env-files/fresh-test-wallets.private.json'),
    'utf8'
  ));
  const wallet = (label) => {
    const row = rows.find((candidate) => candidate.label === label);
    assert(row, `${label} missing`);
    return new ethers.Wallet(row.privateKey, ethers.provider);
  };
  const advanced = wallet('Account 8');
  const foundational = wallet('Account 9');
  const intermediate = wallet('Account 10');
  const membership = await ethers.getContractAt('FreedomNFTMembership', MEMBERSHIP);
  const fgt = await ethers.getContractAt('FPTToken', FGT);
  const fpt = await ethers.getContractAt('FPTToken', FPT);
  const transactions = [];

  let state = await membership.membershipOf(advanced.address);
  assert(state.tier === 1n, 'Account 8 must begin Foundational');
  const priorToken = state.tokenId;
  let tx = await membership.connect(advanced).upgradeMembership(
    3,
    7_350n * UNIT,
    54_650n * UNIT
  );
  await tx.wait();
  transactions.push({ action: 'advancedUpgrade', wallet: advanced.address, hash: tx.hash });
  state = await membership.membershipOf(advanced.address);
  assert(state.tier === 3n && state.rewardEligible, 'Advanced membership state');
  assert(state.lockedFGT === 7_350n * UNIT, 'Advanced FGT lock');
  assert(state.lockedFPT === 54_650n * UNIT, 'Advanced FPT lock');
  assert(state.tokenId !== priorToken, 'Advanced NFT was not replaced');
  assert(await fgt.lockedBalanceOf(advanced.address) === 7_350n * UNIT, 'Advanced FGT ledger');
  assert(await fpt.lockedBalanceOf(advanced.address) === 54_650n * UNIT, 'Advanced FPT ledger');

  for (const [member, tier, amount, action] of [
    [foundational, 1, 5_700n * UNIT, 'foundationalMint'],
    [intermediate, 2, 18_700n * UNIT, 'intermediateMint'],
  ]) {
    const before = await membership.membershipOf(member.address);
    assert(before.tier === 0n, `${action} wallet already has membership`);
    tx = await membership.connect(member).mintMembership(tier, 0, amount);
    await tx.wait();
    transactions.push({ action, wallet: member.address, hash: tx.hash });
    const after = await membership.membershipOf(member.address);
    assert(after.tier === BigInt(tier) && after.rewardEligible, `${action} state`);
    assert(after.lockedFPT === amount, `${action} locked FPT`);
  }

  console.log(JSON.stringify({
    result: 'PASS',
    tiers: {
      foundational: foundational.address,
      intermediate: intermediate.address,
      advanced: advanced.address,
    },
    transactions,
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

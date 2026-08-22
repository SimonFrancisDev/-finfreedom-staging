const fs = require('fs');
const path = require('path');
const { ethers } = require('hardhat');

const MEMBERSHIP = '0x9f55e918BC3b11aE13bCBD7DFD1461E0Ea1D8135';
const FGT = '0xf5C0815fd2bDa5dBa0b7A48F14b4c3740bB088Fa';
const FPT = '0x2C8Cd7BDaf2A9242A76ef5174595a613526e55B9';
const UNIT = 10n ** 6n;

function assert(condition, message) {
  if (!condition) throw new Error(`NFT_CERTIFICATION_ASSERTION: ${message}`);
}

async function main() {
  assert((await ethers.provider.getNetwork()).chainId === 80002n, 'Amoy only');
  const rows = JSON.parse(fs.readFileSync(
    path.resolve(__dirname, '../../env-files/fresh-test-wallets.private.json'),
    'utf8'
  ));
  const row = rows.find((wallet) => wallet.label === 'Account 8');
  assert(row, 'Account 8 is required');
  const member = new ethers.Wallet(row.privateKey, ethers.provider);
  const membership = await ethers.getContractAt('FreedomNFTMembership', MEMBERSHIP);
  const fgt = await ethers.getContractAt('FPTToken', FGT);
  const fpt = await ethers.getContractAt('FPTToken', FPT);
  const before = await membership.membershipOf(member.address);
  assert(before.tier === 0n, 'Account 8 already has a membership');
  assert(await fpt.availableBalanceOf(member.address) >= 18_700n * UNIT, 'insufficient earned FPT');

  const txs = [];
  let tx = await membership.connect(member).mintMembership(1, 0, 5_700n * UNIT);
  await tx.wait();
  txs.push({ action: 'mintFoundational', hash: tx.hash });
  let state = await membership.membershipOf(member.address);
  assert(state.tier === 1n && state.rewardEligible, 'foundational mint state');
  assert(state.lockedFPT === 5_700n * UNIT, 'foundational FPT lock');
  assert(await membership.ownerOf(state.tokenId) === member.address, 'foundational ownership');
  const firstTokenId = state.tokenId;

  try {
    await membership.connect(member).transferFrom.staticCall(member.address, ethers.ZeroAddress, firstTokenId);
  } catch {
    // Burning is not the non-transferability check; use a normal recipient below.
  }
  let transferRejected = false;
  try {
    await membership.connect(member).transferFrom.staticCall(
      member.address,
      '0x000000000000000000000000000000000000dEaD',
      firstTokenId
    );
  } catch (error) {
    transferRejected = error.data?.slice(0, 10) === membership.interface.getError('NonTransferable').selector;
  }
  assert(transferRejected, 'membership transfer was not rejected');

  tx = await membership.connect(member).unlockQualification(0, 700n * UNIT);
  await tx.wait();
  txs.push({ action: 'unlockAndFreeze', hash: tx.hash });
  state = await membership.membershipOf(member.address);
  assert(!state.rewardEligible && state.lockedFPT === 5_000n * UNIT, 'immediate freeze');

  let underRestoreRejected = false;
  try {
    await membership.connect(member).restoreEligibility.staticCall(0, 699n * UNIT);
  } catch {
    underRestoreRejected = true;
  }
  assert(underRestoreRejected, 'underfunded restoration was accepted');
  tx = await membership.connect(member).restoreEligibility(0, 700n * UNIT);
  await tx.wait();
  txs.push({ action: 'restoreEligibility', hash: tx.hash });
  state = await membership.membershipOf(member.address);
  assert(state.rewardEligible && state.lockedFPT === 5_700n * UNIT, 'restoration state');

  tx = await membership.connect(member).upgradeMembership(2, 0, 18_700n * UNIT);
  await tx.wait();
  txs.push({ action: 'upgradeIntermediate', hash: tx.hash });
  state = await membership.membershipOf(member.address);
  assert(state.tier === 2n && state.tokenId !== firstTokenId, 'intermediate replacement');
  assert(state.lockedFPT === 18_700n * UNIT && state.rewardEligible, 'intermediate lock');
  let oldTokenBurned = false;
  try { await membership.ownerOf(firstTokenId); } catch { oldTokenBurned = true; }
  assert(oldTokenBurned, 'old foundational token still exists');

  const intermediateTokenId = state.tokenId;
  tx = await membership.connect(member).downgradeMembership(1, 0, 5_700n * UNIT);
  await tx.wait();
  txs.push({ action: 'downgradeFoundational', hash: tx.hash });
  state = await membership.membershipOf(member.address);
  assert(state.tier === 1n && state.tokenId !== intermediateTokenId, 'foundational downgrade replacement');
  assert(state.lockedFPT === 5_700n * UNIT && state.rewardEligible, 'downgrade lock');
  assert(await fpt.lockedBalanceOf(member.address) === 5_700n * UNIT, 'FPT locked ledger');
  assert(await fgt.lockedBalanceOf(member.address) === 0n, 'unexpected FGT lock');

  const report = {
    verdict: 'PASS',
    completedAt: new Date().toISOString(),
    member: member.address,
    finalTier: Number(state.tier),
    finalTokenId: state.tokenId.toString(),
    lockedFPT: ethers.formatUnits(state.lockedFPT, 6),
    availableFPT: ethers.formatUnits(await fpt.availableBalanceOf(member.address), 6),
    transactions: txs,
  };
  const reportDir = path.resolve(__dirname, '../test-reports/freedom-plus');
  fs.mkdirSync(reportDir, { recursive: true });
  const reportFile = path.join(reportDir, `nft-membership-${Date.now()}.json`);
  fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
  console.log(`FREEDOM_PLUS_NFT_MEMBERSHIP=PASS report=${reportFile}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

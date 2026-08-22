const fs = require('fs');
const path = require('path');
const { ethers } = require('hardhat');

const MULTISIG = '0xD3f460AF3c6C9FAB8053ebF5eCdC1EdfC5de5f6A';
const DISTRIBUTOR = '0xFBc27A8813A8BAC4481F3ebB219c597f8Bb8a47f';
const POOL = 1_000n * 10n ** 6n;

function leaf(member, tier) {
  const inner = ethers.keccak256(
    ethers.AbiCoder.defaultAbiCoder().encode(['address', 'uint8'], [member, tier])
  );
  return ethers.keccak256(inner);
}

async function main() {
  if ((await ethers.provider.getNetwork()).chainId !== 80002n) throw new Error('Amoy only');
  const [sender] = await ethers.getSigners();
  const rows = JSON.parse(fs.readFileSync(
    path.resolve(__dirname, '../../env-files/fresh-test-wallets.private.json'),
    'utf8'
  ));
  const address = (label) => rows.find((row) => row.label === label).address;
  const roots = [leaf(address('Account 9'), 1), leaf(address('Account 10'), 2), leaf(address('Account 8'), 3)];
  const distributor = await ethers.getContractAt('FreedomNFTRewardDistributor', DISTRIBUTOR);
  const existing = await distributor.periodOf(202608);
  if (existing.created) {
    console.log('FREEDOM_PLUS_REWARD_PERIOD=ALREADY_CREATED');
    return;
  }
  const multisig = await ethers.getContractAt('SimpleMultiSig', MULTISIG, sender);
  if (!(await multisig.isOwner(sender.address))) throw new Error('Configured signer is not a staging owner');
  const data = distributor.interface.encodeFunctionData('createPeriod', [
    2026,
    8,
    POOL,
    roots,
    [1, 1, 1],
  ]);
  const tx = await multisig.submitTransaction(DISTRIBUTOR, 0, data);
  const receipt = await tx.wait();
  const submit = receipt.logs.map((log) => {
    try { return multisig.interface.parseLog(log); } catch { return null; }
  }).find((event) => event?.name === 'Submit');
  console.log(JSON.stringify({
    result: 'SUBMITTED',
    txId: Number(submit.args.txId),
    transactionHash: tx.hash,
    periodId: 202608,
    pool: '1000',
    roots,
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

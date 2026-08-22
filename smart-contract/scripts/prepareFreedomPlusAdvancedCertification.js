const fs = require('fs');
const path = require('path');
const { ethers } = require('hardhat');

const USDT = '0x7b7E39f3D177B3356368431C5C285bca58b43A60';
const REGISTRATION = '0x462DDc6C3Ba984b8BFd343948eADf321f8607792';
const MANAGER = '0x83dA1D3fF64411b1D2e73f236C8525bF08483fEb';
const FGT = '0xf5C0815fd2bDa5dBa0b7A48F14b4c3740bB088Fa';

function assert(condition, message) {
  if (!condition) throw new Error(`ADVANCED_PREPARATION_ASSERTION: ${message}`);
}

async function main() {
  assert((await ethers.provider.getNetwork()).chainId === 80002n, 'Amoy only');
  const rows = JSON.parse(fs.readFileSync(
    path.resolve(__dirname, '../../env-files/fresh-test-wallets.private.json'),
    'utf8'
  ));
  const account8 = rows.find((row) => row.label === 'Account 8');
  const gasDonor = rows.find((row) => row.label === 'Account 12');
  assert(account8 && gasDonor, 'Account 8 and Account 12 are required');
  const participant = new ethers.Wallet(account8.privateKey, ethers.provider);
  const donor = new ethers.Wallet(gasDonor.privateKey, ethers.provider);
  const [mockOwner] = await ethers.getSigners();
  const registration = new ethers.Contract(REGISTRATION, [
    'function isRegistered(address) view returns (bool)',
    'function activateLevel(uint8)',
  ], ethers.provider);
  const manager = new ethers.Contract(MANAGER, [
    'function levelPrices(uint8) view returns (uint256)',
    'function userLevelActivated(address,uint8) view returns (bool)',
  ], ethers.provider);
  const usdt = new ethers.Contract(USDT, [
    'function balanceOf(address) view returns (uint256)',
    'function allowance(address,address) view returns (uint256)',
    'function approve(address,uint256) returns (bool)',
    'function mint(address,uint256)',
  ], ethers.provider);
  const fgt = new ethers.Contract(FGT, [
    'function availableBalanceOf(address) view returns (uint256)',
  ], ethers.provider);
  assert(await registration.isRegistered(participant.address), 'Account 8 lacks shared F-Freedom identity');

  const targetPol = ethers.parseEther('1.5');
  const currentPol = await ethers.provider.getBalance(participant.address);
  if (currentPol < targetPol) {
    const amount = targetPol - currentPol;
    assert((await ethers.provider.getBalance(donor.address)) > amount + ethers.parseEther('0.5'), 'gas donor reserve');
    await (await donor.sendTransaction({ to: participant.address, value: amount })).wait();
  }

  let required = 0n;
  for (let level = 2; level <= 10; level++) {
    if (!(await manager.userLevelActivated(participant.address, level))) {
      required += await manager.levelPrices(level);
    }
  }
  const balance = await usdt.balanceOf(participant.address);
  if (balance < required) {
    await (await usdt.connect(mockOwner).mint(participant.address, required - balance + 100n * 10n ** 6n)).wait();
  }
  if ((await usdt.allowance(participant.address, MANAGER)) < required) {
    await (await usdt.connect(participant).approve(MANAGER, ethers.MaxUint256)).wait();
  }

  const transactions = [];
  for (let level = 2; level <= 10; level++) {
    if (await manager.userLevelActivated(participant.address, level)) continue;
    const tx = await registration.connect(participant).activateLevel(level);
    await tx.wait();
    transactions.push({ level, hash: tx.hash });
    console.log(`[F_FREEDOM_LEVEL] ${level} tx=${tx.hash}`);
  }
  const availableFgt = await fgt.availableBalanceOf(participant.address);
  assert(availableFgt >= 7_350n * 10n ** 6n, 'FGT qualification below 7,350');
  console.log(JSON.stringify({
    result: 'PASS',
    participant: participant.address,
    availableFgt: ethers.formatUnits(availableFgt, 6),
    transactions,
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

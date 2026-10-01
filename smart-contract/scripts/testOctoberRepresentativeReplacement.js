const hre = require('hardhat');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { ethers, upgrades, network } = hre;
const proxy = '0xaf6cC44C5B860BA076Ee703244edcaB0C806c27A';
const owner = '0xD3f460AF3c6C9FAB8053ebF5eCdC1EdfC5de5f6A';
const oldWallet = '0xf72873d6233B5e3dfbA6D1D8058BF90E990902f0';
const newWallet = '0x0de1B6F15Fe8E5Cf7fbBA2cD4C576357Ececa962';
async function impersonate(address) {
  await network.provider.send('hardhat_impersonateAccount', [address]);
  await network.provider.send('hardhat_setBalance', [address, '0x56BC75E2D63100000']);
  return ethers.getSigner(address);
}
async function main() {
  assert.equal(network.name, 'hardhat', 'Never run fork tests on a live network');
  assert.equal((await ethers.provider.getNetwork()).chainId, 80002n);
  const original = await ethers.getContractAt('LevelManager', proxy);
  const reg = await ethers.getContractAt('RegistrationFixed', await original.registration());
  const guardian = await ethers.getContractAt('Guardian', await original.guardian());
  const admin = await impersonate(owner);
  const Replacement = await ethers.getContractFactory('OctoberStagingRepresentativeReplacement');
  await upgrades.validateUpgrade(await ethers.getContractFactory('LevelManager'), Replacement, {kind:'uups'});
  const implementation = await Replacement.deploy();
  await implementation.waitForDeployment();
  const impl = await implementation.getAddress();
  const restore = await upgrades.erc1967.getImplementationAddress(proxy);
  await (await guardian.connect(admin).setApprovedProxy(proxy, true)).wait();
  await (await guardian.connect(admin).setApprovedImplementation(proxy, impl, true)).wait();
  await (await guardian.connect(admin).setApprovedImplementation(proxy, restore, true)).wait();
  const before = [];
  for (let i = 0; i < 3; i++) {
    const address = await original.founderRepWallets(i);
    before.push({address, registered:await reg.isRegistered(address), sponsor:await reg.getReferrer(address),
      active:await reg.isLevelActivated(address,1), used:await original.founderRepUsed(address)});
  }
  assert.equal(before[2].registered,false);
  assert.equal(await reg.isRegistered(newWallet),false);
  const snapshot = await network.provider.send('evm_snapshot');
  const oldSigner = await impersonate(oldWallet);
  await (await reg.connect(oldSigner).register(owner)).wait();
  const payload = Replacement.interface.encodeFunctionData('replaceUnusedStagingRepresentative',[restore]);
  await assert.rejects(original.connect(admin).upgradeToAndCall(impl,payload));
  await network.provider.send('evm_revert',[snapshot]);
  await (await original.connect(admin).upgradeToAndCall(impl,payload)).wait();
  assert.equal(await upgrades.erc1967.getImplementationAddress(proxy),restore);
  const changed = await ethers.getContractAt('OctoberStagingRepresentativeReplacement',proxy);
  assert.equal(await changed.founderRepresentative(oldWallet),false);
  assert.equal(await changed.founderRepresentative(newWallet),true);
  assert.equal(await changed.founderRepWallets(2),newWallet);
  await assert.rejects(changed.founderRepWallets(3));
  for(let i=0;i<2;i++){
    const row=before[i];
    assert.equal(await changed.founderRepWallets(i),row.address);
    assert.equal(await reg.isRegistered(row.address),row.registered);
    assert.equal(await reg.getReferrer(row.address),row.sponsor);
    assert.equal(await reg.isLevelActivated(row.address,1),row.active);
    assert.equal(await changed.founderRepUsed(row.address),row.used);
  }
  await assert.rejects(original.upgradeToAndCall(impl,payload));
  await assert.rejects(original.connect(admin).upgradeToAndCall(impl,payload));
  const replacementSigner=await impersonate(newWallet);
  const usdt=await ethers.getContractAt('MockUSDT',await changed.usdt());
  const balance=await usdt.balanceOf(newWallet);
  await (await reg.connect(replacementSigner).register(owner)).wait();
  assert.equal(await reg.getReferrer(newWallet),owner);
  assert.equal(await reg.isLevelActivated(newWallet,1),true);
  assert.equal(await usdt.balanceOf(newWallet),balance,'Free representative registration must not charge mock USDT');
  const result={verdict:'PASS',at:new Date().toISOString(),mode:'local Amoy fork only',proxy,
    oldWallet,newWallet,checks:['storage compatibility','used old wallet rejected','exact three representatives',
      'first two registrations preserved','unauthorized caller rejected','repeat replacement rejected',
      'new representative registers under ID1 without USDT charge']};
  fs.writeFileSync('test-reports/october-representative-fork.json',JSON.stringify(result,null,2));
  console.log(JSON.stringify(result,null,2));
}
main().catch(error=>{console.error(error.shortMessage||error.message);process.exitCode=1;});

const fs = require('node:fs');
const assert = require('node:assert/strict');
const { Wallet, Contract, JsonRpcProvider, parseEther } = require('../smart-contract/node_modules/ethers');
const { parse } = require('../backend/node_modules/dotenv');
const map = require('../smart-contract/test-reports/october-cutover-addresses.json').backend;
const file = 'smart-contract/test-reports/october-live-transactions.json';
const report = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : { chainId: 80002, transactions: [] };
const save = () => fs.writeFileSync(file, JSON.stringify(report, null, 2));
const abi = name => require('../smart-contract/artifacts/contracts/' + name + '.json').abi;
const gas = { gasPrice: 30000000000n };
const unit = 1000000n;
let provider;
async function main() {
  assert(process.env.AMOY_RPC_URL, 'Approved Amoy RPC required');
  provider = new JsonRpcProvider(process.env.AMOY_RPC_URL);
  assert.equal(Number((await provider.getNetwork()).chainId), 80002);
  const row = JSON.parse(fs.readFileSync('env-files/fresh-test-wallets.private.json')).find(r => r.label === 'Account 86');
  const member = new Wallet(row.privateKey, provider);
  assert.equal(member.address.toLowerCase(), row.address.toLowerCase());
  assert.equal(member.address, '0x15C21633a9231f6DACc0eBFf6a790Bf0c20ad171');
  const deployer = new Wallet(parse(fs.readFileSync('smart-contract/.env')).PRIVATE_KEY, provider);
  assert.equal(deployer.address, '0x296238e950ef0066D2119230Bf0eb3aDEBc94882');
  report.wallet = member.address;
  async function send(action, submit) {
    const old = report.transactions.find(t => t.action === action);
    let receipt;
    if (old) receipt = await provider.waitForTransaction(old.hash, 1, 120000);
    else {
      const tx = await submit();
      report.transactions.push({ action, hash: tx.hash }); save();
      receipt = await tx.wait(1, 120000);
    }
    assert(receipt && receipt.status === 1, action + ' did not succeed');
    Object.assign(report.transactions.find(t => t.action === action), { status: 1, blockNumber: receipt.blockNumber });
    save(); console.log(action + ' PASS');
    return receipt;
  }
  const usdt = new Contract(map.USDT_ADDRESS, abi('mocks/MockUSDT.sol/MockUSDT'), member);
  const ff = new Contract(map.REGISTRATION_ADDRESS, abi('RegistrationFixed.sol/RegistrationFixed'), member);
  const plus = new Contract(map.FREEDOM_PLUS_REGISTRATION_ADDRESS, abi('freedom-plus/FreedomPlusRegistration.sol/FreedomPlusRegistration'), member);
  const router = new Contract(map.FREEDOM_PLUS_SETTLEMENT_ROUTER_ADDRESS, abi('freedom-plus/FreedomPlusSettlementRouter.sol/FreedomPlusSettlementRouter'), provider);
  const nft = new Contract(map.FREEDOM_NFT_MEMBERSHIP_ADDRESS, abi('freedom-plus/FreedomNFTMembership.sol/FreedomNFTMembership'), member);
  const tokenAbi = ['function availableBalanceOf(address) view returns(uint256)', 'function lockedBalanceOf(address) view returns(uint256)'];
  const fgt = new Contract(map.FGT_TOKEN_ADDRESS, tokenAbi, provider);
  const fpt = new Contract(map.FREEDOM_PLUS_FPT_ADDRESS, tokenAbi, provider);
  const id1 = '0xD3f460AF3c6C9FAB8053ebF5eCdC1EdfC5de5f6A';
  const balance = await provider.getBalance(member.address);
  if (balance < parseEther('0.4')) await send('fundTestGas', () => deployer.sendTransaction({ to: member.address, value: parseEther('0.6') - balance, ...gas }));
  if (await usdt.balanceOf(member.address) < 11000n * unit) await send('fundMockUsdt', () => usdt.connect(deployer).mint(member.address, 11000n * unit, gas));
  if (await usdt.allowance(member.address, map.LEVEL_MANAGER_ADDRESS) < 10230n * unit)
    await send('approveFF', () => usdt.approve(map.LEVEL_MANAGER_ADDRESS, 10230n * unit, gas));
  if (!await ff.isRegistered(member.address)) await send('registerFF', () => ff.register(id1, gas));
  assert.equal((await ff.getReferrer(member.address)).toLowerCase(), id1.toLowerCase());
  for (let level = 2; level <= 10; level++)
    if (!await ff.isLevelActivated(member.address, level)) await send('activateFF' + level, () => ff.activateLevel(level, gas));
  assert.equal(await fgt.availableBalanceOf(member.address), 10230n * unit);
  if (await usdt.allowance(member.address, map.FREEDOM_PLUS_LEVEL_MANAGER_ADDRESS) < 50n * unit)
    await send('approvePlus', () => usdt.approve(map.FREEDOM_PLUS_LEVEL_MANAGER_ADDRESS, 50n * unit, gas));
  const receipt = await send('registerPlus', () => plus.register(id1, gas));
  const payments = receipt.logs.filter(l => l.address.toLowerCase() === router.target.toLowerCase())
    .map(l => { try { return router.interface.parseLog(l); } catch { return null; } })
    .filter(e => e?.name === 'FounderPaymentDistributed');
  assert(payments.length >= 8, 'No complete founder distribution recorded');
  const founders = [];
  for (let i = 0; i < 8; i++) founders.push((await router.founderWallets(i)).toLowerCase());
  const transfers = receipt.logs.filter(l => l.address.toLowerCase() === usdt.target.toLowerCase())
    .map(l => { try { return usdt.interface.parseLog(l); } catch { return null; } }).filter(e => e?.name === 'Transfer');
  for (const founder of founders) {
    const expected = payments.filter(e => e.args.founder.toLowerCase() === founder).reduce((s,e) => s + e.args.amount, 0n);
    assert(expected > 0n);
    const received = transfers.filter(e => e.args.to.toLowerCase() === founder).reduce((s,e) => s + e.args.value, 0n);
    assert.equal(received, expected, 'Founder receipt/transfer mismatch');
  }
  report.founderPayments = payments.map(e => ({ wallet: e.args.founder, amount: e.args.amount.toString(), role: Number(e.args.role) }));
  assert.equal(await fpt.availableBalanceOf(member.address), 50n * unit);
  const nftGasBalance = await provider.getBalance(member.address);
  if (nftGasBalance < parseEther('0.1'))
    await send('fundNftTestGas', () => deployer.sendTransaction({ to: member.address, value: parseEther('0.2') - nftGasBalance, ...gas }));
  await send('mintMixedFoundation', () => nft.mintMembership(1, 5650n * unit, 50n * unit, gas));
  let state = await nft.membershipOf(member.address);
  assert.equal(state.lockedFGT, 5650n * unit); assert.equal(state.lockedFPT, 50n * unit); assert(state.rewardEligible);
  await send('unlockFGT', () => nft.unlockQualification(100n * unit, 0, gas));
  state = await nft.membershipOf(member.address); assert(!state.rewardEligible); assert.equal(state.lockedFGT, 5550n * unit);
  await send('restoreFGT', () => nft.restoreEligibility(100n * unit, 0, gas));
  state = await nft.membershipOf(member.address); assert(state.rewardEligible);
  assert.equal(await fgt.lockedBalanceOf(member.address), state.lockedFGT);
  assert.equal(await fpt.lockedBalanceOf(member.address), state.lockedFPT);
  report.verdict = 'PASS'; report.completedAt = new Date().toISOString(); save();
  console.log('Live staging transaction smoke PASS');
}
main().catch(e => { report.verdict = 'FAIL'; report.error = String(e.shortMessage || e.message).replace(/https?:\/\/\S+/g, '[endpoint]'); save(); console.error(report.error); process.exitCode = 1; })
  .finally(() => provider?.destroy());

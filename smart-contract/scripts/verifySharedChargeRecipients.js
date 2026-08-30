const hre = require('hardhat');
const { ethers } = hre;
function requiredAddress(name) {
  const value = process.env[name];
  if (!value || !ethers.isAddress(value)) throw new Error(`${name} must be a valid address`);
  return ethers.getAddress(value);
}
async function main() {
  const levelManagerAddress = requiredAddress('LEVEL_MANAGER_ADDRESS');
  const expectedNftPool = requiredAddress('NFT_POOL_VAULT_ADDRESS');
  const expectedOperations = requiredAddress('OPERATIONS_VAULT_ADDRESS');
  const levelManager = await ethers.getContractAt('LevelManager', levelManagerAddress);
  const [actualNftPool, actualOperations] = await Promise.all([levelManager.nftPool(), levelManager.operationsWallet()]);
  const valid = actualNftPool.toLowerCase() === expectedNftPool.toLowerCase() && actualOperations.toLowerCase() === expectedOperations.toLowerCase();
  console.log(JSON.stringify({ valid, levelManager: levelManagerAddress, expected: { nftPool: expectedNftPool, operations: expectedOperations }, actual: { nftPool: actualNftPool, operations: actualOperations } }, null, 2));
  if (!valid) process.exitCode = 1;
}
main().catch((error) => { console.error(error.message || error); process.exitCode = 1; });

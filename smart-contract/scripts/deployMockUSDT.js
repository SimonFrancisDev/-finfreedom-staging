const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  if (!deployer) {
    throw new Error(`No deployer account configured for network "${hre.network.name}".`);
  }

  const provider = hre.ethers.provider;
  const { chainId } = await provider.getNetwork();
  if (chainId !== 80002n && chainId !== 31337n) {
    throw new Error(`MockUSDT deployment is only allowed on testnet/local chains. Current chainId=${chainId}`);
  }

  console.log("Deploying staging MockUSDT...");
  console.log("Network:", hre.network.name, `chainId=${chainId}`);
  console.log("Deployer address:", deployer.address);

  const MockUSDT = await hre.ethers.getContractFactory("contracts/mocks/MockUSDT.sol:MockUSDT");
  const usdt = await MockUSDT.deploy();
  await usdt.waitForDeployment();

  const address = await usdt.getAddress();
  const blockNumber = await provider.getBlockNumber();

  console.log("\nMockUSDT deployed successfully.");
  console.log("Address:", address);
  console.log("Deployment block:", blockNumber);
  console.log("Transaction hash:", usdt.deploymentTransaction()?.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

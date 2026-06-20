const hre = require("hardhat");
const { ethers } = hre;

function requiredAddress(name) {
  const value = process.env[name];
  if (!value || !ethers.isAddress(value)) {
    throw new Error(`${name} is required and must be a valid address`);
  }
  return ethers.getAddress(value);
}

async function main() {
  const [deployer] = await ethers.getSigners();
  if (!deployer) {
    throw new Error(`No signer configured for network "${hre.network.name}". Add PRIVATE_KEY to .env.`);
  }

  const levelManager = requiredAddress("LEVEL_MANAGER_ADDRESS");
  const usdt = requiredAddress("USDT_ADDRESS");

  console.log("Deploying LevelSettlementRouter");
  console.log("Network:", hre.network.name);
  console.log("Deployer:", deployer.address);
  console.log("LevelManager:", levelManager);
  console.log("USDT:", usdt);

  const Router = await ethers.getContractFactory("LevelSettlementRouter");
  const router = await Router.deploy(levelManager, usdt);
  await router.waitForDeployment();

  const routerAddress = await router.getAddress();
  console.log("SettlementRouter:", routerAddress);
  console.log("Validates config:", await router.validatesConfig(levelManager, usdt));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

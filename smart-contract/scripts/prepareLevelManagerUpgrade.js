const hre = require("hardhat");
const { ethers, upgrades } = hre;

async function main() {
  const [deployer] = await ethers.getSigners();
  if (!deployer) {
    throw new Error(`No deployer account configured for network "${hre.network.name}". Add PRIVATE_KEY to .env.`);
  }

  const proxyAddress = process.env.LEVEL_MANAGER_ADDRESS || process.env.VITE_LEVELMANAGER_ADDRESS;
  if (!proxyAddress || !ethers.isAddress(proxyAddress)) {
    throw new Error("LEVEL_MANAGER_ADDRESS is required and must be a valid proxy address");
  }

  console.log("Preparing LevelManager implementation upgrade");
  console.log("Network:", hre.network.name);
  console.log("Deployer:", deployer.address);
  console.log("Proxy:", proxyAddress);

  const factory = await ethers.getContractFactory("LevelManager");
  await upgrades.validateUpgrade(proxyAddress, factory, {
    kind: "uups",
    unsafeAllow: ["delegatecall"],
  });

  const implementationAddress = await upgrades.prepareUpgrade(proxyAddress, factory, {
    kind: "uups",
    unsafeAllow: ["delegatecall"],
  });

  console.log("");
  console.log("Prepared implementation:", implementationAddress);
  console.log("");
  console.log("AdminPanel proposals required:");
  console.log(`1. Guardian approve implementation: proxy=${proxyAddress}, implementation=${implementationAddress}, allowed=true`);
  console.log(`2. Upgrade proxy: proxy=${proxyAddress}, implementation=${implementationAddress}`);
  console.log("");
  console.log("No proxy was upgraded by this script.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

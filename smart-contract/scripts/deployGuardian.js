const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  if (!deployer) {
    throw new Error(`No deployer account configured for network "${hre.network.name}". Add PRIVATE_KEY to Smart-Contract/.env.`);
  }

  const provider = hre.ethers.provider;

  console.log("Deploying Guardian...");
  console.log("Deployer address:", deployer.address);

  const Guardian = await hre.ethers.getContractFactory("Guardian");
  const guardian = await Guardian.deploy(deployer.address);

  await guardian.waitForDeployment();
  
  const guardianAddress = await guardian.getAddress();
  const blockNumber = await provider.getBlockNumber();
  
  console.log("\n✅ Guardian deployed successfully!");
  console.log("📫 Address:", guardianAddress);
  console.log("🔢 Deployment block:", blockNumber);
  console.log("👤 Initial owner:", deployer.address);
  console.log("🔗 Transaction hash:", guardian.deploymentTransaction()?.hash);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});







// // scripts/deployGuardian.js
// const hre = require("hardhat");

// async function main() {
// const [deployer] = await hre.ethers.getSigners();

// const Guardian = await hre.ethers.getContractFactory("Guardian");
// const guardian = await Guardian.deploy(deployer.address);

// await guardian.waitForDeployment();

// console.log("Guardian deployed at:", await guardian.getAddress());
// console.log("Initial owner:", deployer.address);
// }

// main().catch(console.error);

const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

function readOwners() {
  const raw = process.env.MULTISIG_OWNERS || "";
  const owners = raw.split(",").map((value) => value.trim()).filter(Boolean);
  if (!owners.length) {
    throw new Error("MULTISIG_OWNERS is required as comma-separated addresses");
  }
  return owners.map((owner) => hre.ethers.getAddress(owner));
}

function readPositiveInteger(name, fallback) {
  const value = Number(process.env[name] || fallback);
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`${name} must be a positive integer`);
  }
  return value;
}

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  if (!deployer) {
    throw new Error(`No deployer account configured for network "${hre.network.name}". Add PRIVATE_KEY to Smart-Contract/.env.`);
  }

  const provider = hre.ethers.provider;

  const owners = readOwners();
  const confirmations = readPositiveInteger("MULTISIG_REQUIRED_CONFIRMATIONS", 4);
  const timelock = readPositiveInteger("MULTISIG_TIMELOCK_SECONDS", 120);

  const MultiSig = await hre.ethers.getContractFactory("SimpleMultiSig");
  const multisig = await MultiSig.deploy(owners, confirmations, timelock);

  await multisig.waitForDeployment();

  const multisigAddress = await multisig.getAddress();
  const blockNumber = await provider.getBlockNumber();

  console.log("Multisig deployed at:", multisigAddress);
  console.log("Deployment block:", blockNumber);
  console.log("Owners:", owners);
  console.log("Confirmations required:", confirmations);
  console.log("Timelock seconds:", timelock);

  const deploymentInfo = {
    contract: "SimpleMultiSig",
    network: hre.network.name,
    deployedAt: new Date().toISOString(),
    blockNumber,
    address: multisigAddress,
    deployer: deployer.address,
    transactionHash: multisig.deploymentTransaction()?.hash,
    owners,
    confirmations,
    timelock,
  };

  const outputDir = process.env.DEPLOYMENT_OUTPUT_DIR || "deployments";
  const deploymentsDir = path.isAbsolute(outputDir)
    ? outputDir
    : path.join(__dirname, "..", outputDir);
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  const filename = `multisig-deployment-${Date.now()}.json`;
  const filepath = path.join(deploymentsDir, filename);
  fs.writeFileSync(filepath, JSON.stringify(deploymentInfo, null, 2));

  console.log(`\nDeployment info saved to ${path.join(outputDir, filename)}`);
  console.log("\nAdd to backend .env:");
  console.log(`MULTISIG_ADDRESS=${multisigAddress}`);
  console.log(`START_BLOCK_MULTISIG=${blockNumber}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

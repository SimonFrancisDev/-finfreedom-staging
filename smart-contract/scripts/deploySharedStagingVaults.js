const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

function requiredAddress(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is required`);
  return hre.ethers.getAddress(value.trim());
}

async function deployProxy(name, args) {
  const Factory = await hre.ethers.getContractFactory(name);
  const contract = await hre.upgrades.deployProxy(Factory, args, { kind: "uups" });
  await contract.waitForDeployment();
  const proxy = await contract.getAddress();
  const implementation = await hre.upgrades.erc1967.getImplementationAddress(proxy);
  const receipt = await contract.deploymentTransaction().wait();
  return {
    record: {
      proxy,
      implementation,
      deploymentBlock: receipt.blockNumber,
      deploymentTx: receipt.hash,
    },
  };
}

async function main() {
  const { ethers } = hre;
  const [deployer] = await ethers.getSigners();
  if (!deployer) throw new Error("PRIVATE_KEY is not configured");
  const network = await ethers.provider.getNetwork();
  if (hre.network.name !== "amoy" || network.chainId !== 80002n) {
    throw new Error(`This script is Amoy-only; received ${hre.network.name}/${network.chainId}`);
  }

  const guardian = requiredAddress("GUARDIAN_ADDRESS");
  const multisig = requiredAddress("MULTISIG_ADDRESS");
  if (guardian === deployer.address || multisig === deployer.address) {
    throw new Error("Deployer must be distinct from guardian and multisig");
  }
  if ((await ethers.provider.getCode(guardian)) === "0x") {
    throw new Error(`GUARDIAN_ADDRESS has no contract code: ${guardian}`);
  }

  const nft = await deployProxy("FreedomNFTPoolVault", [deployer.address, guardian]);
  const operations = await deployProxy("FreedomPlusOperationsVault", [deployer.address, guardian]);
  const manifest = {
    purpose: "Shared F-Freedom and Freedom-Plus charge vaults",
    network: hre.network.name,
    chainId: Number(network.chainId),
    deployedAt: new Date().toISOString(),
    deployer: deployer.address,
    guardian,
    eventualOwner: multisig,
    ownershipState: "deployer-owned pending Freedom-Plus distributor configuration",
    contracts: {
      FreedomNFTPoolVault: nft.record,
      FreedomPlusOperationsVault: operations.record,
    },
  };

  const outputDir = path.join(__dirname, "..", "deployments-shared-staging-vaults");
  fs.mkdirSync(outputDir, { recursive: true });
  const output = path.join(outputDir, `deployment-${Date.now()}.json`);
  fs.writeFileSync(output, JSON.stringify(manifest, null, 2));
  console.log(`NFT_POOL_ADDRESS=${nft.record.proxy}`);
  console.log(`OPERATIONS_VAULT_ADDRESS=${operations.record.proxy}`);
  console.log(`Manifest: ${output}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

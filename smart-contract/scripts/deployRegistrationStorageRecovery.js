const fs = require("node:fs");
const path = require("node:path");
const hre = require("hardhat");
const { ethers } = hre;

const EXPECTED_SIGNER = "0x884e48f9897E8633238747b608DD49dE12bF94df";

async function main() {
  const network = await ethers.provider.getNetwork();
  if (hre.network.name !== "polygon" || network.chainId !== 137n) {
    throw new Error("Production Polygon only");
  }
  if (process.env.CONFIRM_REGISTRATION_STORAGE_RECOVERY !== "DEPLOY") {
    throw new Error("Set CONFIRM_REGISTRATION_STORAGE_RECOVERY=DEPLOY");
  }

  const [signer] = await ethers.getSigners();
  if (!signer || signer.address !== EXPECTED_SIGNER) {
    throw new Error(`Unexpected signer ${signer?.address || "missing"}`);
  }

  const factory = await ethers.getContractFactory("RegistrationFixed", signer);
  const fee = await ethers.provider.getFeeData();
  const unsigned = await factory.getDeployTransaction();
  const estimate = await ethers.provider.estimateGas({ ...unsigned, from: signer.address });
  const gasLimit = (estimate * 125n) / 100n;
  const contract = await factory.deploy({
    gasLimit,
    maxFeePerGas: fee.maxFeePerGas,
    maxPriorityFeePerGas: fee.maxPriorityFeePerGas,
  });
  const deploymentTx = contract.deploymentTransaction();
  await contract.waitForDeployment();
  const receipt = await deploymentTx.wait();
  const address = await contract.getAddress();
  const runtimeCode = await ethers.provider.getCode(address);
  if (runtimeCode === "0x") throw new Error("Recovery implementation has no code");

  const result = {
    generatedAt: new Date().toISOString(),
    chainId: Number(network.chainId),
    signer: signer.address,
    implementation: address,
    transactionHash: receipt.hash,
    blockNumber: receipt.blockNumber,
    runtimeCodeHash: ethers.keccak256(runtimeCode),
    productionProxyChanged: false,
  };
  const output = path.resolve(
    __dirname,
    `../deployments-production-migration/registration-storage-recovery-${Date.now()}.json`
  );
  fs.writeFileSync(output, `${JSON.stringify(result, null, 2)}\n`);
  console.log(JSON.stringify({ ...result, output }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

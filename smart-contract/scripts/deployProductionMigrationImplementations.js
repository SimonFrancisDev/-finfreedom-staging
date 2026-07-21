const fs = require("node:fs");
const path = require("node:path");
const hre = require("hardhat");
const { ethers } = hre;

const ADDRESSES = {
  levelManager: "0x0E9De0F24eB4774834A2c4A63eaBa8356A4A4B53",
  usdt: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
  proposalSubmitter: "0x884e48f9897E8633238747b608DD49dE12bF94df",
};

async function deploy(name, signer, args = []) {
  const maxFeePerGas = ethers.parseUnits(process.env.MAX_DEPLOY_FEE_GWEI || "350", "gwei");
  const maxPriorityFeePerGas = ethers.parseUnits(process.env.MAX_DEPLOY_PRIORITY_FEE_GWEI || "35", "gwei");
  const latestBlock = await ethers.provider.getBlock("latest");
  if (!latestBlock?.baseFeePerGas) throw new Error(`${name} deployment blocked: latest base fee unavailable`);
  if (latestBlock.baseFeePerGas + maxPriorityFeePerGas > maxFeePerGas) {
    throw new Error(`${name} deployment blocked: base fee ${ethers.formatUnits(latestBlock.baseFeePerGas, "gwei")} gwei plus priority cap exceeds max fee ${ethers.formatUnits(maxFeePerGas, "gwei")} gwei`);
  }
  const factory = await ethers.getContractFactory(name, signer);
  const feeOverrides = { maxFeePerGas, maxPriorityFeePerGas };
  const unsigned = await factory.getDeployTransaction(...args, feeOverrides);
  const overrideKey = `DEPLOY_GAS_LIMIT_${name.replace(/[^a-zA-Z0-9]/g, "_").toUpperCase()}`;
  const configuredGasLimit = process.env[overrideKey];
  const estimatedGas = configuredGasLimit
    ? null
    : await ethers.provider.estimateGas({ ...unsigned, from: signer.address });
  const gasLimit = configuredGasLimit
    ? BigInt(configuredGasLimit)
    : (estimatedGas * 120n) / 100n;
  const maximumCost = gasLimit * maxFeePerGas;
  const balance = await ethers.provider.getBalance(signer.address);
  if (balance < maximumCost) {
    throw new Error(`${name} deployment blocked: balance ${ethers.formatEther(balance)} POL is below capped maximum cost ${ethers.formatEther(maximumCost)} POL`);
  }
  console.log(`${name}: estimatedGas=${estimatedGas ?? "explicit-override"} gasLimit=${gasLimit} maxFee=${ethers.formatUnits(maxFeePerGas, "gwei")} gwei priorityCap=${ethers.formatUnits(maxPriorityFeePerGas, "gwei")} gwei maxCost=${ethers.formatEther(maximumCost)} POL`);
  const contract = await factory.deploy(...args, { ...feeOverrides, gasLimit });
  const deployment = contract.deploymentTransaction();
  await contract.waitForDeployment();
  const receipt = await deployment.wait();
  const address = await contract.getAddress();
  const code = await ethers.provider.getCode(address);
  if (code === "0x") throw new Error(`${name} deployed without runtime code`);
  console.log(`${name}: ${address} (${receipt.hash})`);
  return { address, transactionHash: receipt.hash, blockNumber: receipt.blockNumber };
}

async function reuseOrDeploy(name, signer, envPrefix, args = []) {
  const existing = process.env[`${envPrefix}_ADDRESS`];
  if (!existing) return deploy(name, signer, args);

  const address = ethers.getAddress(existing);
  const code = await ethers.provider.getCode(address);
  if (code === "0x") throw new Error(`${name} resume address ${address} has no runtime code`);
  const transactionHash = process.env[`${envPrefix}_TX_HASH`] || null;
  if (!transactionHash) throw new Error(`${name} resume transaction hash is required`);
  const [transaction, receipt] = await Promise.all([
    ethers.provider.getTransaction(transactionHash),
    ethers.provider.getTransactionReceipt(transactionHash),
  ]);
  if (!transaction || !receipt || receipt.status !== 1) {
    throw new Error(`${name} resume transaction ${transactionHash} is missing or unsuccessful`);
  }
  if (!receipt.contractAddress || ethers.getAddress(receipt.contractAddress) !== address) {
    throw new Error(`${name} resume transaction did not create ${address}`);
  }
  const factory = await ethers.getContractFactory(name, signer);
  const expected = await factory.getDeployTransaction(...args);
  if (transaction.data.toLowerCase() !== expected.data.toLowerCase()) {
    throw new Error(`${name} resume transaction input does not match the compiled creation bytecode`);
  }
  console.log(`${name}: reusing verified deployment ${address}${transactionHash ? ` (${transactionHash})` : ""}`);
  return { address, transactionHash, blockNumber: null, reused: true };
}

async function main() {
  const network = await ethers.provider.getNetwork();
  if (hre.network.name !== "polygon" || network.chainId !== 137n) {
    throw new Error("This script may only run with --network polygon");
  }
  const [deployer] = await ethers.getSigners();
  if (!deployer) throw new Error("PRIVATE_KEY is required");
  if (deployer.address !== ADDRESSES.proposalSubmitter) {
    throw new Error(`Configured signer ${deployer.address} is not the approved production proposal submitter`);
  }
  const balance = await ethers.provider.getBalance(deployer.address);
  if (balance === 0n) throw new Error(`Deployer ${deployer.address} has no POL`);
  if (String(process.env.PRODUCTION_DEPLOY_PREFLIGHT_ONLY || "").toLowerCase() === "true") {
    console.log(JSON.stringify({
      network: hre.network.name,
      chainId: Number(network.chainId),
      deployer: deployer.address,
      balanceWei: balance.toString(),
      preflight: "PASS",
      deploymentsSent: 0,
    }, null, 2));
    return;
  }
  if (String(process.env.CONFIRM_PRODUCTION_IMPLEMENTATION_DEPLOY || "") !== "DEPLOY") {
    throw new Error("Set CONFIRM_PRODUCTION_IMPLEMENTATION_DEPLOY=DEPLOY to deploy inert implementations");
  }

  const contracts = {};
  contracts.registration = await reuseOrDeploy("RegistrationFixed", deployer, "RESUME_REGISTRATION");
  contracts.levelManager = await reuseOrDeploy("LevelManager", deployer, "RESUME_LEVEL_MANAGER");
  contracts.p4 = await reuseOrDeploy("P4Orbit", deployer, "RESUME_P4");
  contracts.p12 = await reuseOrDeploy("P12Orbit", deployer, "RESUME_P12");
  contracts.p39 = await reuseOrDeploy("P39Orbit", deployer, "RESUME_P39");
  contracts.router = await reuseOrDeploy("LevelSettlementRouter", deployer, "RESUME_ROUTER", [ADDRESSES.levelManager, ADDRESSES.usdt]);

  const artifact = {
    generatedAt: new Date().toISOString(),
    network: hre.network.name,
    chainId: Number(network.chainId),
    deployer: deployer.address,
    productionProxiesUnchanged: true,
    contracts,
  };
  const directory = path.resolve(__dirname, "../deployments-production-migration");
  fs.mkdirSync(directory, { recursive: true });
  const output = path.join(directory, `implementations-${Date.now()}.json`);
  fs.writeFileSync(output, `${JSON.stringify(artifact, null, 2)}\n`);
  console.log(`Artifact: ${output}`);
  console.log("No production proxy was upgraded by this script.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

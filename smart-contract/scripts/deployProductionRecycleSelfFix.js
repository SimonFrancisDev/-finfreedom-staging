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
  const factory = await ethers.getContractFactory(name, signer);
  const unsigned = await factory.getDeployTransaction(...args);
  const estimatedGas = await ethers.provider.estimateGas({ ...unsigned, from: signer.address });
  const gasLimit = (estimatedGas * 120n) / 100n;
  const balance = await ethers.provider.getBalance(signer.address);
  if (balance < gasLimit * maxFeePerGas) throw new Error(`${name}: insufficient capped deployer balance`);

  const contract = await factory.deploy(...args, { maxFeePerGas, maxPriorityFeePerGas, gasLimit });
  const transaction = contract.deploymentTransaction();
  await contract.waitForDeployment();
  const receipt = await transaction.wait();
  const address = await contract.getAddress();
  if (await ethers.provider.getCode(address) === "0x") throw new Error(`${name}: runtime code missing`);
  console.log(`${name}: ${address} (${receipt.hash})`);
  return { address, transactionHash: receipt.hash, blockNumber: receipt.blockNumber };
}

async function main() {
  const network = await ethers.provider.getNetwork();
  if (hre.network.name !== "polygon" || network.chainId !== 137n) {
    throw new Error("This script may only run with --network polygon");
  }
  const [deployer] = await ethers.getSigners();
  if (!deployer || deployer.address !== ADDRESSES.proposalSubmitter) {
    throw new Error("PRIVATE_KEY must be the authorized production proposal submitter");
  }
  const balance = await ethers.provider.getBalance(deployer.address);
  const maxFeePerGas = ethers.parseUnits(process.env.MAX_DEPLOY_FEE_GWEI || "350", "gwei");
  const deploymentSpecs = [
    ["P12Orbit", []],
    ["P39Orbit", []],
    ["LevelSettlementRouter", [ADDRESSES.levelManager, ADDRESSES.usdt]],
  ];
  const estimates = [];
  let totalCappedCost = 0n;
  for (const [name, args] of deploymentSpecs) {
    const factory = await ethers.getContractFactory(name, deployer);
    const unsigned = await factory.getDeployTransaction(...args);
    const estimatedGas = await ethers.provider.estimateGas({ ...unsigned, from: deployer.address });
    const gasLimit = (estimatedGas * 120n) / 100n;
    const cappedCost = gasLimit * maxFeePerGas;
    totalCappedCost += cappedCost;
    estimates.push({
      name,
      estimatedGas: estimatedGas.toString(),
      gasLimit: gasLimit.toString(),
      cappedCostPOL: ethers.formatEther(cappedCost),
    });
  }
  const preflight = {
    network: hre.network.name,
    chainId: Number(network.chainId),
    deployer: deployer.address,
    balancePOL: ethers.formatEther(balance),
    scope: ["P12Orbit implementation", "P39Orbit implementation", "LevelSettlementRouter"],
    estimates,
    totalCappedCostPOL: ethers.formatEther(totalCappedCost),
    sufficientlyFundedAtCap: balance >= totalCappedCost,
    proxiesChanged: false,
  };
  if (String(process.env.PRODUCTION_DEPLOY_PREFLIGHT_ONLY || "").toLowerCase() === "true") {
    console.log(JSON.stringify(preflight, null, 2));
    return;
  }
  if (process.env.CONFIRM_PRODUCTION_RECYCLE_SELF_FIX !== "DEPLOY") {
    throw new Error("Set CONFIRM_PRODUCTION_RECYCLE_SELF_FIX=DEPLOY to deploy inert implementations");
  }

  const contracts = {
    p12: await deploy("P12Orbit", deployer),
    p39: await deploy("P39Orbit", deployer),
    router: await deploy("LevelSettlementRouter", deployer, [ADDRESSES.levelManager, ADDRESSES.usdt]),
  };
  const artifact = { generatedAt: new Date().toISOString(), ...preflight, contracts };
  const directory = path.resolve(__dirname, "../deployments-production-migration");
  fs.mkdirSync(directory, { recursive: true });
  const output = path.join(directory, `recycle-self-fix-${Date.now()}.json`);
  fs.writeFileSync(output, `${JSON.stringify(artifact, null, 2)}\n`);
  console.log(`Artifact: ${output}`);
  console.log("No production proxy or configuration was changed.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

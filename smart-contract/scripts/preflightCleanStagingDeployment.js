const hre = require("hardhat");

const REQUIRED_ADDRESSES = [
  "MULTISIG_ADDRESS",
  "GUARDIAN_ADDRESS",
  "USDT_ADDRESS",
  "ID1_WALLET",
];

function requiredAddress(name) {
  const value = String(process.env[name] || "").trim();
  if (!value) throw new Error(`${name} is required`);
  return hre.ethers.getAddress(value);
}

function addressList(name, expectedLength) {
  const values = String(process.env[name] || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean)
    .map(hre.ethers.getAddress);
  if (values.length !== expectedLength) {
    throw new Error(`${name} must contain exactly ${expectedLength} addresses`);
  }
  if (new Set(values.map((value) => value.toLowerCase())).size !== values.length) {
    throw new Error(`${name} contains duplicate addresses`);
  }
  return values;
}

async function main() {
  const { ethers } = hre;
  const [deployer] = await ethers.getSigners();
  if (!deployer) throw new Error("PRIVATE_KEY is not configured");

  const network = await ethers.provider.getNetwork();
  if (hre.network.name !== "amoy" || network.chainId !== 80002n) {
    throw new Error(`Clean staging deployment is Amoy-only; received ${hre.network.name}/${network.chainId}`);
  }

  const addresses = Object.fromEntries(REQUIRED_ADDRESSES.map((name) => [name, requiredAddress(name)]));
  const founders = addressList("FOUNDER_WALLETS", 8);
  const ratios = String(process.env.FOUNDER_RATIOS || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean)
    .map((value) => BigInt(value));
  if (ratios.length !== 8 || ratios.reduce((sum, value) => sum + value, 0n) !== 10_000n) {
    throw new Error("FOUNDER_RATIOS must contain eight integer ratios totaling 10000");
  }

  if (deployer.address.toLowerCase() === addresses.ID1_WALLET.toLowerCase()) {
    throw new Error("ID1_WALLET must be distinct from the deployer");
  }
  if (deployer.address.toLowerCase() === addresses.MULTISIG_ADDRESS.toLowerCase()) {
    throw new Error("MULTISIG_ADDRESS must be distinct from the deployer");
  }

  for (const name of ["MULTISIG_ADDRESS", "GUARDIAN_ADDRESS", "USDT_ADDRESS"]) {
    if ((await ethers.provider.getCode(addresses[name])) === "0x") {
      throw new Error(`${name} has no contract code: ${addresses[name]}`);
    }
  }

  const usdt = new ethers.Contract(
    addresses.USDT_ADDRESS,
    ["function decimals() view returns (uint8)", "function symbol() view returns (string)"],
    deployer
  );
  const decimals = Number(await usdt.decimals());
  if (decimals !== 6) throw new Error(`Retained mock USDT must use 6 decimals; received ${decimals}`);

  const balance = await ethers.provider.getBalance(deployer.address);
  const minimumDeploymentBalance = ethers.parseEther("5");
  if (balance < minimumDeploymentBalance) {
    throw new Error(`Deployer requires at least 5 POL before starting both fresh suites; available ${ethers.formatEther(balance)} POL`);
  }

  const outputDir = String(process.env.DEPLOYMENT_OUTPUT_DIR || "").trim();
  if (outputDir !== "deployments-staging") {
    throw new Error("DEPLOYMENT_OUTPUT_DIR must be deployments-staging for this reset");
  }
  if (String(process.env.DEPLOY_FRESH_TREASURY_VAULTS || "").toLowerCase() !== "true") {
    throw new Error("DEPLOY_FRESH_TREASURY_VAULTS=true is required for a genuinely fresh suite");
  }

  console.log(JSON.stringify({
    ok: true,
    network: hre.network.name,
    chainId: network.chainId.toString(),
    deployer: deployer.address,
    deployerPol: ethers.formatEther(balance),
    multisig: addresses.MULTISIG_ADDRESS,
    guardian: addresses.GUARDIAN_ADDRESS,
    id1Wallet: addresses.ID1_WALLET,
    retainedUsdt: addresses.USDT_ADDRESS,
    usdtSymbol: await usdt.symbol(),
    usdtDecimals: decimals,
    founders: founders.length,
    founderRatiosTotal: ratios.reduce((sum, value) => sum + value, 0n).toString(),
    deploymentOutputDir: outputDir,
    freshTreasuryVaults: true,
  }, null, 2));
}

main().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});

const hre = require("hardhat");

const REPRESENTATIVES = [
  "0x3f6Bb1E6Bfeb9C52f763a197d27B580d7DE7f100",
  "0xDd78425335C0c698615845d94f9FeE7492266396",
  "0xf72873d6233B5e3dfbA6D1D8058BF90E990902f0",
  "0xeE192BE4884B064281Fa426F3d855fb339445B83",
];

function address(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is required`);
  return hre.ethers.getAddress(value.trim());
}

async function main() {
  const { ethers } = hre;
  const [deployer] = await ethers.getSigners();
  if (!deployer) throw new Error("PRIVATE_KEY is not configured");
  const network = await ethers.provider.getNetwork();
  if (network.chainId !== 80002n || hre.network.name !== "amoy") {
    throw new Error(`Expected amoy/80002, received ${hre.network.name}/${network.chainId}`);
  }

  const targets = {
    multisig: address("MULTISIG_ADDRESS"),
    guardian: address("GUARDIAN_ADDRESS"),
    usdt: address("USDT_ADDRESS"),
    fgt: address("FGT_TOKEN_ADDRESS"),
    id1: address("ID1_WALLET"),
  };
  if (deployer.address === targets.multisig || deployer.address === targets.id1) {
    throw new Error("Deployer must be distinct from multisig and ID1");
  }
  for (const key of ["guardian", "usdt", "fgt"]) {
    if (await ethers.provider.getCode(targets[key]) === "0x") {
      throw new Error(`${key} has no contract code at ${targets[key]}`);
    }
  }
  const fgt = new ethers.Contract(targets.fgt, [
    "function owner() view returns (address)",
    "function operatorConfigLocked() view returns (bool)",
  ], deployer);
  const result = {
    network: hre.network.name,
    chainId: network.chainId.toString(),
    head: await ethers.provider.getBlockNumber(),
    deployer: deployer.address,
    deployerPol: ethers.formatEther(await ethers.provider.getBalance(deployer.address)),
    ...targets,
    fgtOwner: await fgt.owner(),
    fgtOperatorConfigLocked: await fgt.operatorConfigLocked(),
    representatives: REPRESENTATIVES.map(ethers.getAddress),
  };
  console.log(JSON.stringify(result, null, 2));
  if (result.fgtOperatorConfigLocked) {
    throw new Error("FGT operator configuration is locked; Freedom NFT membership authorization cannot be configured by this deployment");
  }
  console.log("FREEDOM_PLUS_STAGING_PREFLIGHT=PASS");
}

main().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});

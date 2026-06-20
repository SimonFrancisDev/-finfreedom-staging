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
  const levelManagerAddress = requiredAddress("LEVEL_MANAGER_ADDRESS");
  const expectedRouter = process.env.SETTLEMENT_ROUTER_ADDRESS &&
    ethers.isAddress(process.env.SETTLEMENT_ROUTER_ADDRESS)
      ? ethers.getAddress(process.env.SETTLEMENT_ROUTER_ADDRESS)
      : null;

  const levelManager = await ethers.getContractAt("LevelManager", levelManagerAddress);
  const currentRouter = await levelManager.settlementRouter();

  console.log("Network:", hre.network.name);
  console.log("LevelManager:", levelManagerAddress);
  console.log("SettlementRouter:", currentRouter);
  if (expectedRouter) {
    console.log("Expected:", expectedRouter);
    console.log("Matches expected:", currentRouter.toLowerCase() === expectedRouter.toLowerCase());
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

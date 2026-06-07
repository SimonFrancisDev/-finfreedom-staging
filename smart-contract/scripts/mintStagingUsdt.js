const hre = require("hardhat");
const { ethers } = hre;

const AMOY_CHAIN_ID = 80002n;
const DEFAULT_AMOUNT = "1000";

function requiredAddress(name) {
  const value = process.env[name];
  if (!value || !ethers.isAddress(value)) {
    throw new Error(`${name} is required and must be a valid address`);
  }
  return ethers.getAddress(value);
}

async function main() {
  const recipient = requiredAddress("MINT_TO");
  const usdtAddress = requiredAddress("USDT_ADDRESS");
  const amountText = process.env.MINT_AMOUNT || DEFAULT_AMOUNT;

  const [signer] = await ethers.getSigners();
  if (!signer) throw new Error("No signer configured");

  const network = await ethers.provider.getNetwork();
  if (network.chainId !== AMOY_CHAIN_ID) {
    throw new Error(`Refusing to mint outside Polygon Amoy. chainId=${network.chainId}`);
  }

  const code = await ethers.provider.getCode(usdtAddress);
  if (!code || code === "0x") {
    throw new Error(`USDT_ADDRESS has no contract code on Amoy: ${usdtAddress}`);
  }

  const usdt = await ethers.getContractAt("MockUSDT", usdtAddress);
  const decimals = await usdt.decimals();
  const amount = ethers.parseUnits(amountText, decimals);
  const before = await usdt.balanceOf(recipient);

  console.log("Network:", hre.network.name);
  console.log("Signer:", signer.address);
  console.log("USDT:", usdtAddress);
  console.log("Recipient:", recipient);
  console.log("Amount:", amountText);
  console.log("Balance before:", ethers.formatUnits(before, decimals));

  const tx = await usdt.mint(recipient, amount);
  console.log("Mint tx:", tx.hash);
  await tx.wait();

  const after = await usdt.balanceOf(recipient);
  console.log("Balance after:", ethers.formatUnits(after, decimals));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

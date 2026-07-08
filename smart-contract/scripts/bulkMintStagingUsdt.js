const hre = require("hardhat");
const { ethers } = hre;

const AMOY_CHAIN_ID = 80002n;
const DEFAULT_AMOUNT = "10000";

function requiredAddress(name) {
  const value = process.env[name];
  if (!value || !ethers.isAddress(value)) {
    throw new Error(`${name} is required and must be a valid address`);
  }
  return ethers.getAddress(value);
}

function parseRecipients() {
  const raw = process.env.MINT_TO_LIST || "";
  const recipients = raw
    .split(/[\s,]+/)
    .map((value) => value.trim())
    .filter(Boolean);

  if (recipients.length === 0) {
    throw new Error("MINT_TO_LIST must contain at least one wallet address");
  }

  const normalized = recipients.map((recipient) => {
    if (!ethers.isAddress(recipient)) {
      throw new Error(`Invalid recipient address: ${recipient}`);
    }
    return ethers.getAddress(recipient);
  });

  return [...new Set(normalized)];
}

async function main() {
  const usdtAddress = requiredAddress("USDT_ADDRESS");
  const recipients = parseRecipients();
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

  const txSigner = process.env.BATCH_SEND === "true" ? new ethers.NonceManager(signer) : signer;
  const usdt = await ethers.getContractAt("MockUSDT", usdtAddress, txSigner);
  const decimals = await usdt.decimals();
  const amount = ethers.parseUnits(amountText, decimals);

  console.log("Network:", hre.network.name);
  console.log("Signer:", signer.address);
  console.log("USDT:", usdtAddress);
  console.log("Recipients:", recipients.length);
  console.log("Amount each:", amountText);

  if (process.env.BATCH_SEND === "true") {
    const txs = [];
    for (const recipient of recipients) {
      const before = await usdt.balanceOf(recipient);
      const tx = await usdt.mint(recipient, amount);
      console.log(`${recipient} ${ethers.formatUnits(before, decimals)} -> pending tx=${tx.hash}`);
      txs.push({ recipient, tx });
    }

    for (const { recipient, tx } of txs) {
      await tx.wait();
      const after = await usdt.balanceOf(recipient);
      console.log(`${recipient} confirmed balance=${ethers.formatUnits(after, decimals)} tx=${tx.hash}`);
    }
  } else {
    for (const recipient of recipients) {
      const before = await usdt.balanceOf(recipient);
      const tx = await usdt.mint(recipient, amount);
      await tx.wait();
      const after = await usdt.balanceOf(recipient);
      console.log(`${recipient} ${ethers.formatUnits(before, decimals)} -> ${ethers.formatUnits(after, decimals)} tx=${tx.hash}`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

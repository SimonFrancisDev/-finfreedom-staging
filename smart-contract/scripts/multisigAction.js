const hre = require("hardhat");
const { ethers } = hre;

function requiredAddress(name) {
  const value = process.env[name];
  if (!value || !ethers.isAddress(value)) {
    throw new Error(`${name} is required and must be a valid address`);
  }
  return ethers.getAddress(value);
}

function requiredUint(name) {
  const raw = process.env[name];
  const value = Number(raw);
  if (!Number.isInteger(value) || value < 0) {
    throw new Error(`${name} is required and must be a non-negative integer`);
  }
  return value;
}

async function main() {
  const [sender] = await ethers.getSigners();
  if (!sender) {
    throw new Error(`No signer configured for network "${hre.network.name}". Set PRIVATE_KEY to a multisig owner key.`);
  }

  const action = String(process.env.MULTISIG_ACTION || "").trim().toLowerCase();
  if (!["approve", "execute"].includes(action)) {
    throw new Error("Set MULTISIG_ACTION=approve or MULTISIG_ACTION=execute");
  }

  const multisigAddress = requiredAddress("MULTISIG_ADDRESS");
  const txId = requiredUint("MULTISIG_TX_ID");
  const multisig = await ethers.getContractAt("SimpleMultiSig", multisigAddress);

  const owner = await multisig.isOwner(sender.address);
  if (!owner) {
    throw new Error(`Signer ${sender.address} is not an owner of multisig ${multisigAddress}`);
  }

  const txn = await multisig.transactions(txId);
  console.log("Multisig:", multisigAddress);
  console.log("Signer:", sender.address);
  console.log("Tx id:", txId);
  console.log("Target:", txn.to);
  console.log("Confirmations:", txn.confirmations.toString());
  console.log("Execute after:", new Date(Number(txn.executeAfter) * 1000).toISOString());

  const tx = action === "approve"
    ? await multisig.approveTransaction(txId)
    : await multisig.executeTransaction(txId);

  await tx.wait();

  console.log(`${action} completed`);
  console.log("Transaction hash:", tx.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

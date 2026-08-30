const hre = require("hardhat");
const { ethers } = hre;

function requiredAddress(name) {
  const value = process.env[name];
  if (!value || !ethers.isAddress(value)) throw new Error(`${name} must be a valid address`);
  return ethers.getAddress(value);
}

async function main() {
  const [sender] = await ethers.getSigners();
  if (!sender) throw new Error("PRIVATE_KEY must identify a multisig owner");

  const multisigAddress = requiredAddress("MULTISIG_ADDRESS");
  const levelManagerAddress = requiredAddress("LEVEL_MANAGER_ADDRESS");
  const nftPool = requiredAddress("NFT_POOL_VAULT_ADDRESS");
  const operations = requiredAddress("OPERATIONS_VAULT_ADDRESS");
  const multisig = await ethers.getContractAt("SimpleMultiSig", multisigAddress);
  if (!(await multisig.isOwner(sender.address))) throw new Error(`Signer ${sender.address} is not a multisig owner`);

  const iface = new ethers.Interface([
    "function updateChargeRecipients(address nftPool,address operations)",
  ]);
  const data = iface.encodeFunctionData("updateChargeRecipients", [nftPool, operations]);
  const tx = await multisig.submitTransaction(levelManagerAddress, 0, data);
  const receipt = await tx.wait();
  let txId = null;
  for (const log of receipt.logs) {
    try {
      const parsed = multisig.interface.parseLog(log);
      if (parsed?.name === "Submit") txId = parsed.args[0].toString();
    } catch {}
  }
  console.log(JSON.stringify({ proposalHash: tx.hash, txId, sender: sender.address, levelManagerAddress, nftPool, operations }, null, 2));
}
main().catch((error) => { console.error(error); process.exitCode = 1; });

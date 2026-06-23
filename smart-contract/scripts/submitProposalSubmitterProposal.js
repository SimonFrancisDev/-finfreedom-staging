const hre = require("hardhat");
const { ethers } = hre;

function requiredAddress(name) {
  const value = process.env[name];
  if (!value || !ethers.isAddress(value)) {
    throw new Error(`${name} is required and must be a valid address`);
  }
  return ethers.getAddress(value);
}

function optionalBoolean(name, fallback = true) {
  const raw = String(process.env[name] ?? "").trim().toLowerCase();
  if (!raw) return fallback;
  return raw === "true" || raw === "1" || raw === "yes";
}

async function main() {
  const [sender] = await ethers.getSigners();
  if (!sender) {
    throw new Error(`No signer configured for network "${hre.network.name}". Set PRIVATE_KEY.`);
  }

  const multisigAddress = requiredAddress("MULTISIG_ADDRESS");
  const submitterAddress = requiredAddress("PROPOSAL_SUBMITTER_ADDRESS");
  const allowed = optionalBoolean("PROPOSAL_SUBMITTER_ALLOWED", true);

  const multisig = await ethers.getContractAt("SimpleMultiSig", multisigAddress);
  const senderIsOwner = await multisig.isOwner(sender.address);
  const senderIsSubmitter = await multisig.isProposalSubmitter(sender.address);

  if (!senderIsOwner && !senderIsSubmitter) {
    throw new Error(`Signer ${sender.address} cannot submit multisig proposals`);
  }

  const data = multisig.interface.encodeFunctionData("setProposalSubmitter", [
    submitterAddress,
    allowed,
  ]);

  const tx = await multisig.submitTransaction(multisigAddress, 0, data);
  const receipt = await tx.wait();

  let txId = null;
  for (const log of receipt.logs) {
    try {
      const parsed = multisig.interface.parseLog(log);
      if (parsed?.name === "Submit") {
        txId = parsed.args[0].toString();
      }
    } catch {
      // ignore unrelated logs
    }
  }

  console.log("setProposalSubmitter proposal submitted");
  console.log("Sender:", sender.address);
  console.log("Multisig:", multisigAddress);
  console.log("Submitter:", submitterAddress);
  console.log("Allowed:", allowed);
  console.log("Transaction hash:", tx.hash);
  console.log("Multisig tx id:", txId ?? "unknown");
  console.log("");
  console.log("Next steps:");
  console.log(`1. Owners approve tx id ${txId ?? "<txId>"} with scripts/multisigAction.js`);
  console.log(`2. Owners execute tx id ${txId ?? "<txId>"} after the timelock expires`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

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
  const [sender] = await ethers.getSigners();
  if (!sender) {
    throw new Error(`No signer configured for network "${hre.network.name}". Set PRIVATE_KEY to a multisig owner key.`);
  }

  const multisigAddress = requiredAddress("MULTISIG_ADDRESS");
  const levelManagerAddress = requiredAddress("LEVEL_MANAGER_ADDRESS");
  const settlementRouterAddress = requiredAddress("SETTLEMENT_ROUTER_ADDRESS");

  const multisig = await ethers.getContractAt("SimpleMultiSig", multisigAddress);
  if (!(await multisig.isOwner(sender.address)) && !(await multisig.isProposalSubmitter(sender.address))) {
    throw new Error(`Signer ${sender.address} cannot submit proposals to multisig ${multisigAddress}`);
  }

  const levelManager = await ethers.getContractAt("LevelManager", levelManagerAddress);
  const data = levelManager.interface.encodeFunctionData("setSettlementRouter", [
    settlementRouterAddress,
  ]);

  const tx = await multisig.submitTransaction(levelManagerAddress, 0, data);
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

  console.log("setSettlementRouter proposal submitted");
  console.log("Sender:", sender.address);
  console.log("Multisig:", multisigAddress);
  console.log("LevelManager:", levelManagerAddress);
  console.log("SettlementRouter:", settlementRouterAddress);
  console.log("Transaction hash:", tx.hash);
  console.log("Multisig tx id:", txId ?? "unknown");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

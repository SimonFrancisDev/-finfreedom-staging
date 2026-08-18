const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

function latestManifest() {
  const directory = path.join(__dirname, "..", "deployments-freedom-plus-staging");
  const files = fs.readdirSync(directory)
    .filter((name) => /^deployment-\d+\.json$/.test(name))
    .sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]));
  if (!files.length) throw new Error("No Freedom-Plus staging deployment manifest found");
  return JSON.parse(fs.readFileSync(path.join(directory, files.at(-1)), "utf8"));
}

async function main() {
  const { ethers } = hre;
  const [sender] = await ethers.getSigners();
  if (!sender) throw new Error("PRIVATE_KEY is not configured");
  const network = await ethers.provider.getNetwork();
  if (hre.network.name !== "amoy" || network.chainId !== 80002n) throw new Error("Amoy only");

  const manifest = latestManifest();
  const multisig = await ethers.getContractAt("SimpleMultiSig", manifest.multisig, sender);
  const membership = manifest.contracts.FreedomNFTMembership.proxy;
  const fgt = new ethers.Contract(manifest.fgt, [
    "function authorizedOperators(address) view returns (bool)",
    "function setAuthorizedOperator(address,bool)",
  ], sender);
  if (await fgt.authorizedOperators(membership)) {
    console.log("FREEDOM_PLUS_FGT_AUTHORIZATION=ALREADY_EXECUTED");
    return;
  }
  const owner = await multisig.isOwner(sender.address);
  const submitter = await multisig.isProposalSubmitter(sender.address);
  if (!owner && !submitter) throw new Error(`Signer ${sender.address} is not an owner or proposal submitter`);

  const data = fgt.interface.encodeFunctionData("setAuthorizedOperator", [membership, true]);
  const count = Number(await multisig.getTransactionCount());
  for (let start = 0; start < count; start += 20) {
    const ids = Array.from({ length: Math.min(20, count - start) }, (_, index) => start + index);
    const transactions = await Promise.all(ids.map((txId) => multisig.transactions(txId)));
    for (let index = 0; index < transactions.length; index++) {
      const txId = ids[index];
      const transaction = transactions[index];
      if (
        transaction.to.toLowerCase() !== manifest.fgt.toLowerCase()
        || transaction.data.toLowerCase() !== data.toLowerCase()
        || transaction.executed
        || transaction.cancelled
      ) continue;
      console.log(JSON.stringify({
        result: "EXISTING_PENDING_PROPOSAL",
        txId,
        target: manifest.fgt,
        membership,
        confirmations: transaction.confirmations.toString(),
        requiredConfirmations: (await multisig.requiredConfirmations()).toString(),
        executeAfter: transaction.executeAfter.toString(),
      }, null, 2));
      return;
    }
  }

  const transaction = await multisig.submitTransaction(manifest.fgt, 0, data);
  const receipt = await transaction.wait();
  let txId = null;
  for (const log of receipt.logs) {
    try {
      const parsed = multisig.interface.parseLog(log);
      if (parsed?.name === "Submit") txId = Number(parsed.args.txId);
    } catch {
      // Ignore unrelated logs.
    }
  }
  console.log(JSON.stringify({
    result: "SUBMITTED",
    txId,
    transactionHash: transaction.hash,
    sender: sender.address,
    senderIsOwner: owner,
    senderIsProposalSubmitter: submitter,
    target: manifest.fgt,
    membership,
    requiredConfirmations: (await multisig.requiredConfirmations()).toString(),
    timelockSeconds: (await multisig.timelockDelay()).toString(),
  }, null, 2));
}

main().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});

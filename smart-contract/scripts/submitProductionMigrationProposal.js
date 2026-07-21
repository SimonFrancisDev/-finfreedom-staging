const fs = require("node:fs");
const path = require("node:path");
const hre = require("hardhat");
const { ethers } = hre;

async function main() {
  const network = await ethers.provider.getNetwork();
  if (hre.network.name !== "polygon" || network.chainId !== 137n) {
    throw new Error("This script may only run with --network polygon");
  }
  if (String(process.env.CONFIRM_PROPOSAL_SUBMISSION || "") !== "SUBMIT") {
    throw new Error("Set CONFIRM_PROPOSAL_SUBMISSION=SUBMIT to queue exactly one proposal");
  }

  const packageFile = process.env.MIGRATION_PACKAGE_FILE;
  const requestedIndex = Number(process.env.PACKAGE_ACTION_INDEX);
  if (!packageFile || !Number.isInteger(requestedIndex) || requestedIndex < 0) {
    throw new Error("MIGRATION_PACKAGE_FILE and non-negative PACKAGE_ACTION_INDEX are required");
  }
  const packageRaw = fs.readFileSync(path.resolve(packageFile), "utf8");
  const migrationPackage = JSON.parse(packageRaw);
  const packageDigest = ethers.sha256(ethers.toUtf8Bytes(packageRaw));
  const exactReportFile = path.resolve(__dirname, "../test-reports/production-exact-package-latest.json");
  const exactReport = JSON.parse(fs.readFileSync(exactReportFile, "utf8"));
  if (migrationPackage.chainId !== 137 || migrationPackage.certifiedForkBlock !== exactReport.forkBlock) {
    throw new Error("Package is not the certified Polygon production package");
  }
  if (
    exactReport.verdict !== "PASS" ||
    exactReport.exactPackageActionsExecuted !== migrationPackage.actions.length ||
    path.resolve(exactReport.exactPackageFile) !== path.resolve(packageFile)
  ) {
    throw new Error("Package does not match the latest successful exact-package fork report");
  }
  const proposal = migrationPackage.actions?.[requestedIndex];
  if (!proposal || proposal.index !== requestedIndex) throw new Error("Package action index is invalid");
  if (proposal.stage === "MIGRATION" && String(process.env.ALLOW_PAUSED_MIGRATION_PROPOSAL || "") !== "YES") {
    throw new Error("Set ALLOW_PAUSED_MIGRATION_PROPOSAL=YES for MIGRATION-stage proposals");
  }

  const [sender] = await ethers.getSigners();
  if (!sender) throw new Error("PRIVATE_KEY is required");
  const multisig = await ethers.getContractAt("SimpleMultiSig", migrationPackage.multisig, sender);
  const authorized = await multisig.isOwner(sender.address) || await multisig.isProposalSubmitter(sender.address);
  if (!authorized) throw new Error(`Signer ${sender.address} is not authorized to submit proposals`);

  const beforeCount = await multisig.getTransactionCount();
  const maxFeePerGas = ethers.parseUnits(process.env.MAX_PROPOSAL_FEE_GWEI || "350", "gwei");
  const maxPriorityFeePerGas = ethers.parseUnits(process.env.MAX_PROPOSAL_PRIORITY_FEE_GWEI || "35", "gwei");
  const latestBlock = await ethers.provider.getBlock("latest");
  if (!latestBlock?.baseFeePerGas || latestBlock.baseFeePerGas + maxPriorityFeePerGas > maxFeePerGas) {
    throw new Error("Proposal submission blocked by configured fee caps");
  }
  const estimatedGas = await multisig.submitTransaction.estimateGas(proposal.target, proposal.value, proposal.data);
  const gasLimit = (estimatedGas * 120n) / 100n;
  const maximumCost = gasLimit * maxFeePerGas;
  const balance = await ethers.provider.getBalance(sender.address);
  if (balance < maximumCost) throw new Error("Proposal submission blocked by insufficient capped balance");
  const tx = await multisig.submitTransaction(proposal.target, proposal.value, proposal.data, {
    maxFeePerGas,
    maxPriorityFeePerGas,
    gasLimit,
  });
  const receipt = await tx.wait();
  const afterCount = await multisig.getTransactionCount();
  if (afterCount !== beforeCount + 1n) throw new Error("Multisig transaction count did not increment exactly once");
  const txId = beforeCount;
  const stored = await multisig.transactions(txId);
  if (
    stored.to.toLowerCase() !== proposal.target.toLowerCase() ||
    stored.value.toString() !== String(proposal.value) ||
    stored.data.toLowerCase() !== proposal.data.toLowerCase()
  ) {
    throw new Error("Stored multisig proposal does not match the package action");
  }

  console.log(JSON.stringify({
    packageActionIndex: requestedIndex,
    packageDigest,
    stage: proposal.stage,
    label: proposal.label,
    multisigTxId: txId.toString(),
    submissionTransactionHash: receipt.hash,
    target: proposal.target,
    value: proposal.value,
    data: proposal.data,
    executeAfter: stored.executeAfter.toString(),
    requiredConfirmations: migrationPackage.requiredConfirmations,
    feeCaps: {
      maxFeeGwei: ethers.formatUnits(maxFeePerGas, "gwei"),
      maxPriorityFeeGwei: ethers.formatUnits(maxPriorityFeePerGas, "gwei"),
      estimatedGas: estimatedGas.toString(),
      gasLimit: gasLimit.toString(),
      maximumCostPOL: ethers.formatEther(maximumCost),
    },
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

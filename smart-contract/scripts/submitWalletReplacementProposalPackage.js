const fs = require('node:fs');
const path = require('node:path');
const hre = require('hardhat');
const { ethers } = hre;

async function assertStored(multisig, txId, action) {
  const stored = await multisig.transactions(txId);
  if (stored.to.toLowerCase() !== action.target.toLowerCase() || stored.value.toString() !== action.value || stored.data.toLowerCase() !== action.data.toLowerCase()) {
    throw new Error(`Stored proposal ${txId} does not match package action ${action.index}`);
  }
  return stored;
}

async function main() {
  const network = await ethers.provider.getNetwork();
  if (hre.network.name !== 'polygon' || network.chainId !== 137n) throw new Error('Polygon production only');
  const packageFile = path.resolve(process.env.WALLET_REPLACEMENT_PACKAGE_FILE || 'migration-packages/wallet-replacement-latest.json');
  const pkg = JSON.parse(fs.readFileSync(packageFile, 'utf8'));
  const validation = JSON.parse(fs.readFileSync(path.resolve('migration-audits/wallet-replacement-proposal-validation.json'), 'utf8'));
  if (process.env.CONFIRM_PACKAGE_HASH !== pkg.packageHash || validation.verdict !== 'PASS' || validation.packageHash !== pkg.packageHash) {
    throw new Error('Exact package-hash confirmation and PASS validation are required');
  }
  if (pkg.actions.length !== 35 || validation.nextTransactionId + pkg.actions.length - 1 !== validation.finalTransactionId) throw new Error('Package count mismatch');

  const [sender] = await ethers.getSigners();
  if (!sender) throw new Error('PRIVATE_KEY is required');
  const multisig = await ethers.getContractAt('SimpleMultiSig', pkg.multisig, sender);
  if (!(await multisig.isOwner(sender.address)) && !(await multisig.isProposalSubmitter(sender.address))) throw new Error('Signer is not an authorized submitter');

  const checkpointFile = path.resolve('migration-audits/wallet-replacement-proposal-submission-checkpoint.json');
  let checkpoint = fs.existsSync(checkpointFile) ? JSON.parse(fs.readFileSync(checkpointFile, 'utf8')) : {
    packageHash: pkg.packageHash, packageFile, startTransactionId: validation.nextTransactionId, submitted: [],
  };
  if (checkpoint.packageHash !== pkg.packageHash || checkpoint.startTransactionId !== validation.nextTransactionId) throw new Error('Checkpoint belongs to another package');
  for (const entry of checkpoint.submitted) await assertStored(multisig, entry.multisigTxId, pkg.actions[entry.actionIndex]);

  const chainCount = await multisig.getTransactionCount();
  const expectedCount = BigInt(checkpoint.startTransactionId + checkpoint.submitted.length);
  if (chainCount !== expectedCount) throw new Error(`Multisig count drift: expected ${expectedCount}, received ${chainCount}`);

  const maxFeePerGas = ethers.parseUnits(process.env.MAX_PROPOSAL_FEE_GWEI || '350', 'gwei');
  const maxPriorityFeePerGas = ethers.parseUnits(process.env.MAX_PROPOSAL_PRIORITY_FEE_GWEI || '35', 'gwei');
  for (let index = checkpoint.submitted.length; index < pkg.actions.length; index += 1) {
    const action = pkg.actions[index];
    const beforeCount = await multisig.getTransactionCount();
    const estimatedGas = await multisig.submitTransaction.estimateGas(action.target, action.value, action.data);
    const gasLimit = estimatedGas * 120n / 100n;
    const balance = await ethers.provider.getBalance(sender.address);
    if (balance < gasLimit * maxFeePerGas) throw new Error(`Insufficient capped balance at action ${index}`);
    const transaction = await multisig.submitTransaction(action.target, action.value, action.data, {
      maxFeePerGas, maxPriorityFeePerGas, gasLimit,
    });
    const receipt = await transaction.wait();
    if (await multisig.getTransactionCount() !== beforeCount + 1n) throw new Error(`Count failed at action ${index}`);
    const stored = await assertStored(multisig, beforeCount, action);
    checkpoint.submitted.push({
      actionIndex: index, stage: action.stage, label: action.label, multisigTxId: Number(beforeCount),
      submissionTransactionHash: receipt.hash, executeAfter: Number(stored.executeAfter),
    });
    checkpoint.updatedAt = new Date().toISOString();
    fs.writeFileSync(checkpointFile, `${JSON.stringify(checkpoint, null, 2)}\n`);
    console.log(`[${index + 1}/${pkg.actions.length}] ID ${beforeCount}: ${action.label}`);
  }
  const final = {
    ...checkpoint, completedAt: new Date().toISOString(), verdict: 'PASS',
    finalTransactionId: checkpoint.startTransactionId + pkg.actions.length - 1,
  };
  const output = path.resolve('migration-audits/wallet-replacement-proposal-submission.json');
  fs.writeFileSync(output, `${JSON.stringify(final, null, 2)}\n`);
  console.log(JSON.stringify({ output, verdict: final.verdict, submitted: final.submitted.length, startTransactionId: final.startTransactionId, finalTransactionId: final.finalTransactionId }, null, 2));
}

main().catch((error) => { console.error(error); process.exitCode = 1; });

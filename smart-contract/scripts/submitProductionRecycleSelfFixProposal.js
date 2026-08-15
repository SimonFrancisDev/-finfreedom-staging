const fs = require('node:fs');
const path = require('node:path');
const { ethers } = require('hardhat');

async function main() {
  if (process.env.CONFIRM_RECYCLE_SELF_FIX_PROPOSAL !== 'SUBMIT') throw new Error('Explicit submission confirmation missing');
  const file = process.env.RECYCLE_SELF_FIX_PACKAGE;
  const index = Number(process.env.RECYCLE_SELF_FIX_ACTION_INDEX);
  if (!file || !Number.isInteger(index) || index < 0 || index > 6) throw new Error('Package and action index 0..6 required');
  const raw = fs.readFileSync(path.resolve(file), 'utf8');
  const pkg = JSON.parse(raw);
  if (pkg.fixId !== 'RECYCLE_SELF_PAYMENT_V1' || pkg.sourceCommit !== 'f8981bc' || pkg.chainId !== 137 || pkg.actions?.length !== 7) {
    throw new Error('Invalid targeted fix package');
  }
  const proposal = pkg.actions[index];
  if (proposal.index !== index || proposal.value !== '0') throw new Error('Invalid action');
  const [sender] = await ethers.getSigners();
  const multisig = await ethers.getContractAt('SimpleMultiSig', pkg.multisig, sender);
  if (!(await multisig.isOwner(sender.address)) && !(await multisig.isProposalSubmitter(sender.address))) {
    throw new Error('Signer is not an authorized proposal submitter');
  }
  const before = await multisig.getTransactionCount();
  const fee = ethers.parseUnits(process.env.MAX_PROPOSAL_FEE_GWEI || '350', 'gwei');
  const priority = ethers.parseUnits(process.env.MAX_PROPOSAL_PRIORITY_FEE_GWEI || '35', 'gwei');
  const estimated = await multisig.submitTransaction.estimateGas(proposal.target, 0, proposal.data);
  const tx = await multisig.submitTransaction(proposal.target, 0, proposal.data, {
    maxFeePerGas: fee,
    maxPriorityFeePerGas: priority,
    gasLimit: estimated * 120n / 100n,
  });
  const receipt = await tx.wait();
  const after = await multisig.getTransactionCount();
  if (after !== before + 1n) throw new Error('Transaction count did not increment once');
  const stored = await multisig.transactions(before);
  if (stored.to.toLowerCase() !== proposal.target.toLowerCase() || stored.data.toLowerCase() !== proposal.data.toLowerCase()) {
    throw new Error('Stored proposal mismatch');
  }
  console.log(JSON.stringify({ actionIndex: index, label: proposal.label, multisigTxId: before.toString(), hash: receipt.hash }, null, 2));
}

main().catch((error) => { console.error(error); process.exitCode = 1; });

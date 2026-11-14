// Read-only final reconciliation and public founder instructions; no signing key.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { ethers: E } = require('ethers');
const { A } = require('./lib/combinedPlacementRepairPackage');
const { ABI, RUNTIME_HASH, verifyCancellation } = require('./lib/id1CancellationPlan');
const { sha } = require('./prepareId1ProductionPackage');
const { validatePackage } = require('./deployCombinedPlacementRepair');
const { validateProposal, validateSubmission } = require('./submitCombinedPlacementRepair');
const ROOT = path.resolve(__dirname, '../../..');
const json = value => JSON.stringify(value, (_, v) => typeof v === 'bigint' ? v.toString() : v, 2);
const read = file => JSON.parse(fs.readFileSync(path.join(ROOT, file), 'utf8'));

async function main() {
  assert(process.env.REPAIR_MAINNET_RPC, 'Explicit Polygon mainnet RPC required');
  const raw = fs.readFileSync(path.join(ROOT, 'tmp/combined-placement-live-package.json'), 'utf8');
  const pkg = JSON.parse(raw); validatePackage(pkg);
  const journal = read('tmp/combined-placement-live-broadcasts.json');
  assert.equal(journal.packageSha256, sha(raw)); assert.equal(journal.chainId, 137);
  assert.equal(journal.status, 'all-replacement-proposals-submitted-none-executed');
  assert.equal(journal.submissions.length, pkg.actions.length);
  assert.equal(journal.approvalsSent, 0); assert.equal(journal.executionsSent, 0);
  const request = new E.FetchRequest(process.env.REPAIR_MAINNET_RPC); request.timeout = 60000;
  const provider = new E.JsonRpcProvider(request, undefined, { batchMaxCount: 1, cacheTimeout: -1 });
  try {
    assert.equal((await provider.getNetwork()).chainId, 137n);
    const block = await provider.getBlock('latest'), at = { blockTag: block.number };
    assert.equal(E.keccak256(await provider.getCode(A.governance, block.number)), RUNTIME_HASH);
    const gov = new E.Contract(A.governance, ABI, provider), proposals = [];
    for (const [index, row] of journal.submissions.entries()) {
      assert.equal(row.index, index); assert.equal(row.confirmed, true);
      const action = pkg.actions[index], signed = E.Transaction.from(row.signedTransaction);
      validateSubmission(signed, action, pkg.startNonce + pkg.deployments.length + index, row.gasLimit);
      assert.equal(signed.hash, row.txHash);
      const current = await gov.transactions(row.proposalId, at); validateProposal(current, action);
      proposals.push({ proposalId: row.proposalId, index, phase: action.phase, program: action.program,
        label: action.label, target: action.target, value: '0', calldataHash: E.keccak256(action.data),
        txHash: row.txHash, nonce: row.nonce, block: row.block, blockHash: row.blockHash,
        gasUsed: row.gasUsed, effectiveGasPrice: row.effectiveGasPrice, actualFeeWei: row.feeWei,
        confirmations: String(current.confirmations), executed: current.executed, cancelled: current.cancelled,
        executionRequiresPostRepairVerification: action.phase === 'REOPEN' });
    }
    assert.equal(await gov.getTransactionCount(at), BigInt(pkg.nextProposalId) + BigInt(pkg.actions.length));
    const cancellations = [];
    for (const oldId of pkg.requiredCancelledProposalIds) {
      const old = await gov.transactions(oldId, at), cancellation = await gov.transactions(oldId + 30, at);
      verifyCancellation(cancellation, oldId); assert.equal(old.executed, false);
      cancellations.push({ cancellationProposalId: oldId + 30, cancelsProposalId: oldId,
        oldCancelled: old.cancelled, cancellationExecuted: cancellation.executed });
    }
    const fee = proposals.reduce((sum, row) => sum + BigInt(row.actualFeeWei), 0n);
    const balance = await provider.getBalance(A.submitter, block.number);
    const report = { status: 'all-67-replacement-proposals-verified-pending-founder-execution',
      chainId: 137, governance: A.governance, submitter: A.submitter, packageSha256: sha(raw),
      checkedAt: new Date().toISOString(), checkedBlock: { number: block.number, hash: block.hash },
      requiredConfirmations: Number(await gov.requiredConfirmations(at)), timelockSeconds: Number(await gov.timelockDelay(at)),
      proposals, cancellations, totalSubmissionFeePOL: E.formatEther(fee), remainingBalancePOL: E.formatEther(balance),
      approvalsSentByThisPass: 0, executionsSentByThisPass: 0, additionalDeployments: 0,
      limitations: ['Submission is not execution. The live repair is still pending.',
        'Reopening proposals must not be approved or executed before the post-repair checks pass.',
        'Founder approval and execution fees are separate from submitter fees.'] };
    fs.writeFileSync(path.join(ROOT, 'staging-environment/docs/evidence/combined-repair-live-proposals-2026-11-14.json'), json(report) + '\n');
    const stages = [
      ['PREAPPROVAL', 'Authorize only the reviewed implementations', 'These grant the Guardian permission for this specific maintenance package. They do not yet replace live code.'],
      ['PAUSE', 'Pause the affected F-Freedom and Freedom Plus contracts', 'This starts the maintenance window. Confirm all twelve affected contracts are paused before installing a temporary repair implementation.'],
      ['MIGRATOR', 'Install the eight tightly bound temporary repair implementations', 'These are restricted to the reviewed proxies, plan hashes, executors and Polygon mainnet. They are not the final live engines.'],
      ['REPAIR', 'Apply the two historical repairs', 'The first restores the agreed F-Freedom structure while keeping Lady Sabina in place. The second restores sixteen paid Freedom Plus ancestor appearances and two zero-money genesis links. These calls do not repay historical earnings.'],
      ['INSTALL', 'Install final code and restore normal engines', 'This installs the tested preventive code where required and restores the original Freedom Plus orbit engines after their temporary repair implementations.'],
      ['REVOKE', 'Remove permission for the temporary repair implementations', 'The one-time maintenance implementations must not remain approved for future use.'],
      ['REOPEN', 'Reopen only after written verification', 'HOLD both approval and execution of these proposals until I confirm the chain, money invariants, backend projections and actual displayed positions agree.'],
    ];
    const lines = ['# Founder instructions: combined mainnet placement repair', '',
      `Verified at ${report.checkedAt}, Polygon mainnet block ${block.number}.`, '',
      'Dear Lady Sabina, Mr. Harry, Mr. Anthony and the founders,', '',
      `I have submitted all ${proposals.length} replacement proposals, IDs **${proposals[0].proposalId}-${proposals.at(-1).proposalId}**. ` +
      'The contracts are deployed and the website recognizes the exact package. Submission alone does not activate the repair or change anyone\'s placement or payment.', '',
      '## Before signing', '',
      '- Open the existing founder panel on https://www.finfreedomnetwork.io/admin.',
      '- Use Polygon mainnet, chain ID 137, not Amoy.',
      `- Confirm the multisig is \`${A.governance}\`.`,
      `- The wallet requires ${report.requiredConfirmations} founder approvals. Its timelock is ${report.timelockSeconds} seconds; follow the panel\'s on-chain eligibility time before execution.`,
      '- Each signing/executing founder needs POL for their own gas. These proposals attach zero POL and do not authorize compensation or token transfers.',
      '- Match the proposal ID, target and meaning against this record. Stop if the wallet or panel shows a mismatch or an unexplained warning; do not sign blindly.', '',
      '## Retire the withdrawn package first', '',
      'The existing cancellation proposals **160-189** cancel the withdrawn proposals **130-159**, one for one. Do not approve or execute the withdrawn originals. Cancellation records preserve blockchain history; they do not delete it.', '',
      `At this check, ${cancellations.filter(c => c.oldCancelled).length} of the 30 originals are cancelled. ` +
      'Approve and execute only the still-needed cancellations, then confirm every withdrawn original is marked cancelled before starting the replacement maintenance.', '',
      '## Replacement execution order', '',
      'All replacement proposals are already submitted. Non-reopening approvals may be collected in advance, but execution must follow the phases and ID order below. Schedule the maintenance window before executing the pause phase. Do not skip ahead.', ''];
    for (const [phase, title, meaning] of stages) {
      const group = proposals.filter(row => row.phase === phase);
      lines.push(`### ${group[0].proposalId}-${group.at(-1).proposalId}: ${title}`, '', meaning, '',
        '| Proposal | Program | Meaning | Target |', '| --- | --- | --- | --- |');
      for (const row of group) lines.push(`| ${row.proposalId} | ${row.program} | ${row.label} | \`${row.target}\` |`);
      lines.push('');
      if (phase === 'PAUSE') lines.push('**Hold point:** I must confirm the paused contracts still match the approved repair prestate before the temporary implementations are installed. If the state changed while users were active, stop for review.', '');
      if (phase === 'REVOKE') lines.push('**Hold point:** keep the affected programs paused. I must verify final implementations, temporary permission revocation, unchanged money balances, repaired parent/slot records, original-payment provenance in the backend, and the actual website displays before reopening.', '');
    }
    lines.push('## What this changes, and what it does not', '',
      'Lady Sabina remains in ID1 level 8 slot 3 and level 9 slot 2. Sofia is restored to the accepted level 8 slot 6 beneath Lady Sabina, and level 9 slot 3. The level 8 arrangement is the specifically accepted historical exception, not a change allowing skipped sponsors to take over an established branch midway.', '',
      'Freedom Plus restoration preserves existing occupied positions and original payment provenance. A historical appearance is not a new activation, earning or repayment. The targeted preventive code distinguishes legitimate ancestor placements from extra fallback payments to ID1 that must not create duplicate positions.', '',
      'This package contains no 512 USDT compensation, no permanent sponsor change, no NFT-rule change, no production reset and no rearrangement of the deferred historical level-6 orbit. Neither suspended staging service is restarted.', '',
      'If any execution fails, stop and send me the proposal ID and transaction hash. Do not retry blindly, execute later phases, or reopen while temporary implementations are installed. An individual repair call is atomic; the entire multi-proposal sequence is not.', '',
      '## Spending and evidence', '',
      `Submission fees were **${report.totalSubmissionFeePOL} POL**. The submitter retains **${report.remainingBalancePOL} POL** at this check. No additional deployment was performed.`, '',
      'Full proposal targets, transaction hashes, fees and pending status are recorded in [the verified proposal evidence](evidence/combined-repair-live-proposals-2026-11-14.json). The [deployment record](COMBINED_REPAIR_LIVE_DEPLOYMENTS_2026-11-14.md) contains the contract addresses and earlier integration proof.', '');
    fs.writeFileSync(path.join(ROOT, 'staging-environment/docs/FOUNDERS_COMBINED_REPAIR_EXECUTION_2026-11-14.md'), lines.join('\n'));
    console.log(json({ status: report.status, proposalRange: `${proposals[0].proposalId}-${proposals.at(-1).proposalId}`,
      totalSubmissionFeePOL: report.totalSubmissionFeePOL, remainingBalancePOL: report.remainingBalancePOL,
      cancellationProposalsStillRequired: cancellations.filter(row => !row.oldCancelled).map(row => row.cancellationProposalId),
      phases: stages.map(([phase]) => ({ phase, ids: proposals.filter(row => row.phase === phase).map(row => row.proposalId) })) }));
  } finally { provider.destroy(); }
}
if (require.main === module) main().catch(error => { console.error(String(error.shortMessage || error.message).replace(/https?:\/\/\S+/g, '[endpoint]')); process.exitCode = 1; });

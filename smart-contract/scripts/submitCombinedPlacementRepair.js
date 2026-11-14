// Submit the verified package only. Never deploys, approves, executes, pauses or upgrades.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { ethers: E } = require('ethers');
const { A, FP, engines } = require('./lib/combinedPlacementRepairPackage');
const { ABI, iface, OWNERS, RUNTIME_HASH, verifyOriginal, verifyCancellation } = require('./lib/id1CancellationPlan');
const { validatePackage } = require('./deployCombinedPlacementRepair');
const { artifact } = require('./prepareCombinedPlacementRepair');
const { verifyLive, sha } = require('./prepareId1ProductionPackage');
const { repairFeeBudget } = require('./lib/repairFeeBudget');
const ROOT = path.resolve(__dirname, '../../..');
const PACKAGE = path.join(ROOT, 'tmp/combined-placement-live-package.json');
const JOURNAL = path.join(ROOT, 'tmp/combined-placement-live-broadcasts.json');
const IMPL = '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc';
const json = data => JSON.stringify(data, (_, value) => typeof value === 'bigint' ? value.toString() : value, 2);
const read = name => JSON.parse(fs.readFileSync(path.join(ROOT, name), 'utf8'));
const same = (a, b) => assert.equal(a.toLowerCase(), b.toLowerCase());
const submissionData = action => iface.encodeFunctionData('submitTransaction', [action.target, 0n, action.data]);

function validateSubmission(tx, action, nonce, gasLimit) {
  same(tx.from, A.submitter); same(tx.to, A.governance);
  assert.equal(tx.chainId, 137n); assert.equal(tx.type, 2); assert.equal(tx.value, 0n);
  assert.equal(action.value, '0'); assert.equal(tx.nonce, nonce);
  assert.equal(tx.data, submissionData(action)); assert.equal(tx.gasLimit, BigInt(gasLimit));
  assert(tx.maxPriorityFeePerGas >= E.parseUnits('25', 'gwei'));
  assert(tx.maxPriorityFeePerGas <= tx.maxFeePerGas && tx.maxFeePerGas <= E.parseUnits('450', 'gwei'));
}

function validateProposal(proposal, action) {
  same(proposal.to, action.target); assert.equal(proposal.value, 0n);
  assert.equal(proposal.data, action.data); assert.equal(proposal.executed, false);
  assert.equal(proposal.cancelled, false);
}

async function preflight(provider, pkg, journal, raw) {
  const checked = validatePackage(pkg);
  assert.equal((await provider.getNetwork()).chainId, 137n);
  assert.equal(journal.packageSha256, sha(raw)); assert.equal(journal.chainId, 137);
  assert.equal(journal.approvalsSent, 0); assert.equal(journal.executionsSent, 0);
  assert.equal(journal.deployments.length, pkg.deployments.length);
  assert.equal(new Set(journal.deployments.map(row => row.key)).size, pkg.deployments.length);
  const block = await provider.getBlock((await provider.getBlockNumber()) - 2), at = { blockTag: block.number };
  assert.equal(E.keccak256(await provider.getCode(A.governance, block.number)), RUNTIME_HASH);
  assert.equal(checked.governanceRuntimeHash, RUNTIME_HASH);
  const gov = new E.Contract(A.governance, ABI, provider);
  assert.deepEqual(Array.from(await gov.getOwners(at)), OWNERS);
  assert.equal(await gov.requiredConfirmations(at), 3n); assert.equal(await gov.timelockDelay(at), 120n);
  assert.equal(await gov.isProposalSubmitter(A.submitter, at), true);
  for (const item of pkg.deployments) {
    const row = journal.deployments.find(entry => entry.key === item.key);
    assert(row && row.confirmed && row.address === item.address);
    assert.equal(E.keccak256(await provider.getCode(item.address, block.number)), row.runtimeHash);
  }
  const publicDeployments = read('staging-environment/docs/evidence/combined-repair-live-deployments-2026-11-14.json');
  assert.equal(publicDeployments.packageSha256, sha(raw));
  for (const item of publicDeployments.deployments) {
    assert.equal(E.keccak256(await provider.getCode(item.address, block.number)), item.runtimeHash);
  }
  for (const key of ['executor', 'fp.executor']) {
    const item = pkg.deployments.find(d => d.key === key);
    const executor = new E.Contract(item.address, ['function executed() view returns(bool)'], provider);
    assert.equal(await executor.executed(at), false);
  }
  await verifyLive(provider, pkg.fFreedom, block.number);
  const common = ['function owner() view returns(address)', 'function guardian() view returns(address)', 'function paused() view returns(bool)'];
  for (const [key, name] of [...engines, ['registration', 'FreedomPlusRegistration'], ['manager', 'FreedomPlusLevelManager'], ['router', 'FreedomPlusSettlementRouter']]) {
    const c = new E.Contract(FP[key], common, provider), expected = pkg.freedomPlus.previousBindings[name];
    same(await c.owner(at), A.governance); same(await c.guardian(at), A.guardian);
    assert.equal(await c.paused(at), false, `Already paused: ${key}`);
    same('0x' + (await provider.getStorage(FP[key], IMPL, block.number)).slice(-40), expected.implementation);
    assert.equal(E.keccak256(await provider.getCode(expected.implementation, block.number)), expected.runtimeHash);
  }
  for (const [key, name, migrator] of engines) {
    const art = artifact(migrator), view = new E.Interface(art.abi);
    for (const edit of pkg.freedomPlus.edits.find(g => g.name === name).edits) {
      const result = await provider.send('eth_call', [{ to: FP[key], data: view.encodeFunctionData('repairStateHash', [edit.account, edit.level]) },
        E.toQuantity(block.number), { [FP[key]]: { code: art.deployedBytecode } }]);
      assert.equal(view.decodeFunctionResult('repairStateHash', result)[0], edit.beforeHash, `Changed FP prestate: ${key}/${edit.account}`);
    }
  }
  const guardian = new E.Contract(A.guardian, ['function approvedProxies(address) view returns(bool)'], provider);
  for (const proxy of pkg.executionApprovalRequirements) assert.equal(await guardian.approvedProxies(proxy, at), true);
  const inputs = read('staging-environment/docs/evidence/combined-placement-package-inputs-2026-11-13.json');
  const cancellations = [];
  for (const id of pkg.requiredCancelledProposalIds) {
    const original = await gov.transactions(id, at);
    verifyOriginal(original, inputs.previous.actions[id - 130], id);
    const cancellation = await gov.transactions(id + 30, at); verifyCancellation(cancellation, id);
    assert(!cancellation.cancelled || original.cancelled, `Cancellation ${id + 30} was itself cancelled`);
    cancellations.push({ oldProposalId: id, cancellationProposalId: id + 30, cancelled: original.cancelled,
      cancellationExecuted: cancellation.executed });
  }
  const manifest = read('Fin-Freedom-Web2 - Copy/src/constants/repairProposalManifest.json');
  assert.equal(manifest.status, 'verified-mainnet-deployments'); assert.equal(manifest.chainId, 137);
  assert.equal(manifest.packageSha256, sha(raw)); same(manifest.governance, A.governance);
  assert.equal(manifest.actions.length, pkg.actions.length);
  for (const [i, action] of manifest.actions.entries()) for (const key of Object.keys(action)) assert.deepEqual(action[key], pkg.actions[i][key]);
  const served = read('staging-environment/docs/evidence/combined-repair-served-manifest-2026-11-14.json');
  assert.equal(served.status, 'official-production-serves-verified-repair-manifest');
  assert.equal(served.sourcePackageSha256, sha(raw)); assert.equal(served.matchedProposalTargetsAndPayloads, pkg.actions.length);
  return { block: block.number, blockHash: block.hash, utc: new Date(block.timestamp * 1000).toISOString(), cancellations };
}

async function main() {
  const mode = process.env.COMBINED_REPAIR_ACTION;
  assert(['CHECK_SUBMISSIONS', 'SUBMIT_ALL'].includes(mode), 'Explicit submission mode required');
  assert(process.env.REPAIR_MAINNET_RPC, 'Explicit Polygon mainnet RPC required');
  const raw = fs.readFileSync(PACKAGE, 'utf8'), pkg = JSON.parse(raw);
  const journal = JSON.parse(fs.readFileSync(JOURNAL, 'utf8'));
  const request = new E.FetchRequest(process.env.REPAIR_MAINNET_RPC); request.timeout = 60000;
  const provider = new E.JsonRpcProvider(request, undefined, { batchMaxCount: 1, cacheTimeout: -1 });
  provider.pollingInterval = 5000;
  const save = () => { fs.writeFileSync(`${JOURNAL}.next`, json(journal) + '\n', { mode: 0o600 }); fs.renameSync(`${JOURNAL}.next`, JOURNAL); };
  try {
    const check = await preflight(provider, pkg, journal, raw);
    console.log(json({ status: 'both-program-prestates-and-mainnet-bindings-verified', ...check, cancellations: undefined }));
    const gov = new E.Contract(A.governance, ABI, provider);
    assert.equal(new Set(journal.submissions.map(row => row.index)).size, journal.submissions.length);
    assert(journal.submissions.every(row => pkg.actions[row.index]));
    async function recordReceipt(row, receipt) {
      assert(receipt && receipt.status === 1, `Proposal submission failed: ${row.txHash}`);
      same(receipt.from, A.submitter); same(receipt.to, A.governance);
      assert.equal(receipt.blockHash, (await provider.getBlock(receipt.blockNumber)).hash);
      const event = receipt.logs.filter(log => log.address.toLowerCase() === A.governance.toLowerCase())
        .map(log => { try { return iface.parseLog(log); } catch { return null; } }).find(log => log?.name === 'Submit');
      assert(event, 'No governance Submit event');
      assert.equal(event.args.txId, BigInt(pkg.nextProposalId) + BigInt(row.index), 'Unexpected queue interleaving; inspect before continuing');
      validateProposal(await gov.transactions(event.args.txId), pkg.actions[row.index]);
      Object.assign(row, { confirmed: true, proposalId: String(event.args.txId), block: receipt.blockNumber,
        blockHash: receipt.blockHash, gasUsed: String(receipt.gasUsed), effectiveGasPrice: String(receipt.gasPrice),
        feeWei: String(receipt.gasUsed * receipt.gasPrice) });
      if (mode === 'SUBMIT_ALL') save();
    }
    for (const [position, row] of journal.submissions.entries()) {
      assert.equal(row.index, position, 'Submission journal must be a contiguous prefix');
      const signed = E.Transaction.from(row.signedTransaction);
      validateSubmission(signed, pkg.actions[row.index], pkg.startNonce + pkg.deployments.length + row.index, row.gasLimit);
      assert.equal(row.txHash, signed.hash);
      const receipt = await provider.getTransactionReceipt(row.txHash);
      if (receipt) await recordReceipt(row, receipt);
      else { assert.equal(row.confirmed, false); assert.equal(position, journal.submissions.length - 1); }
    }
    const confirmed = journal.submissions.filter(row => row.confirmed).length;
    assert.equal(await gov.getTransactionCount(), BigInt(pkg.nextProposalId) + BigInt(confirmed), 'Governance queue changed outside the journal');
    const pending = pkg.actions.slice(confirmed), estimates = [];
    for (const action of pending) {
      const gas = await provider.estimateGas({ from: A.submitter, to: A.governance, value: 0n, data: submissionData(action) });
      estimates.push({ index: action.index, gas, gasLimit: (gas * 120n + 99n) / 100n });
    }
    const balance = await provider.getBalance(A.submitter), feeBlock = await provider.getBlock('latest');
    const quote = estimates.length ? repairFeeBudget({ baseFeePerGas: feeBlock.baseFeePerGas, balanceWei: balance,
      estimatedGas: estimates.reduce((sum, row) => sum + row.gas, 0n), gasLimit: estimates.reduce((sum, row) => sum + row.gasLimit, 0n) }) : null;
    const report = { status: 'submission-preflight-passed', checkedAt: new Date().toISOString(), chainId: 137,
      packageSha256: sha(raw), ...check, liveWrites: 0, remainingProposals: pending.length,
      balancePOL: E.formatEther(balance), estimatedCostPOL: E.formatEther(quote?.estimatedCostWei || 0n),
      cappedReservePOL: E.formatEther(quote?.maxCostWei || 0n), sufficientlyFunded: !quote || quote.sufficientlyFunded,
      feeBlock: feeBlock.number, estimates };
    fs.writeFileSync(path.join(ROOT, 'tmp/combined-repair-submission-preflight.json'), json(report) + '\n');
    console.log(json({ ...report, estimates: undefined, cancellations: undefined }));
    if (mode === 'CHECK_SUBMISSIONS' || !pending.length) return;
    assert(quote.sufficientlyFunded, 'Insufficient balance for the remaining capped submission budget');
    const wallet = new E.Wallet(process.env.PRODUCTION_SUBMITTER_KEY, provider); same(wallet.address, A.submitter);
    journal.submissionAuthorization = 'Owner funded the wallet and requested continuation; submit all proposals, never approve or execute';
    journal.submissionMaximumSpendWei = String(BigInt(journal.submissionMaximumSpendWei || '0') > balance ? BigInt(journal.submissionMaximumSpendWei) :
      balance + journal.submissions.reduce((sum, row) => sum + BigInt(row.feeWei || '0'), 0n));
    journal.submissionPreflight = { ...check, feeBlock: feeBlock.number }; save();
    for (const action of pending) {
      const estimate = estimates.find(row => row.index === action.index);
      let row = journal.submissions.find(entry => entry.index === action.index);
      const nonce = pkg.startNonce + pkg.deployments.length + action.index;
      if (!row) {
        assert.equal(await gov.getTransactionCount(), BigInt(pkg.nextProposalId) + BigInt(action.index), 'Queue changed; stop rather than duplicate');
        assert.equal(await provider.getTransactionCount(A.submitter, 'latest'), nonce);
        assert.equal(await provider.getTransactionCount(A.submitter, 'pending'), nonce);
        const currentBalance = await provider.getBalance(A.submitter), block = await provider.getBlock('latest');
        const fees = repairFeeBudget({ baseFeePerGas: block.baseFeePerGas, balanceWei: currentBalance,
          estimatedGas: estimate.gas, gasLimit: estimate.gasLimit });
        assert(fees.sufficientlyFunded, 'Insufficient funds or current fee above ceiling; no broadcast');
        const spent = journal.submissions.reduce((sum, entry) => sum + BigInt(entry.feeWei || '0'), 0n);
        assert(spent + fees.maxCostWei <= BigInt(journal.submissionMaximumSpendWei), 'Submission spending limit reached');
        const signedTransaction = await wallet.signTransaction({ to: A.governance, value: 0n, data: submissionData(action),
          type: 2, chainId: 137, nonce, gasLimit: estimate.gasLimit,
          maxFeePerGas: fees.maxFeePerGas, maxPriorityFeePerGas: fees.maxPriorityFeePerGas });
        const decoded = E.Transaction.from(signedTransaction); validateSubmission(decoded, action, nonce, estimate.gasLimit);
        row = { index: action.index, phase: action.phase, program: action.program, label: action.label, nonce,
          txHash: decoded.hash, gasLimit: String(decoded.gasLimit), signedTransaction, confirmed: false };
        journal.submissions.push(row); save();
      }
      let receipt = await provider.getTransactionReceipt(row.txHash);
      if (!receipt) {
        if (!(await provider.getTransaction(row.txHash))) {
          assert.equal(await provider.getTransactionCount(A.submitter, 'pending'), nonce);
          const signed = E.Transaction.from(row.signedTransaction);
          assert(await provider.getBalance(A.submitter) >= signed.gasLimit * signed.maxFeePerGas);
          const sent = await provider.broadcastTransaction(row.signedTransaction); assert.equal(sent.hash, row.txHash);
        }
        console.log(json({ waitingFor: action.index + 1, of: pkg.actions.length, txHash: row.txHash }));
        receipt = await provider.waitForTransaction(row.txHash, 2, 180000);
      }
      await recordReceipt(row, receipt);
      console.log(json({ confirmed: row.index + 1, proposalId: row.proposalId, phase: row.phase,
        label: row.label, feePOL: E.formatEther(row.feeWei), txHash: row.txHash }));
    }
    journal.status = 'all-replacement-proposals-submitted-none-executed';
    journal.remainingBalanceWei = String(await provider.getBalance(A.submitter)); save();
    console.log(json({ status: journal.status, proposalCount: journal.submissions.length,
      totalSubmissionFeePOL: E.formatEther(journal.submissions.reduce((sum, row) => sum + BigInt(row.feeWei), 0n)),
      remainingPOL: E.formatEther(journal.remainingBalanceWei), approvalsSent: 0, executionsSent: 0 }));
  } finally { provider.destroy(); }
}
if (require.main === module) main().catch(error => {
  console.error(String(error.shortMessage || error.message).replace(/https?:\/\/\S+/g, '[endpoint]'));
  process.exitCode = 1;
});
module.exports = { validateSubmission, validateProposal, preflight };

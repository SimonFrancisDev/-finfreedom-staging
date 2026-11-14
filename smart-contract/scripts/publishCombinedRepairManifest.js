// Export only public, verified deployment facts. Does not send transactions or deploy the site.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { ethers: E } = require('ethers');
const { A } = require('./lib/combinedPlacementRepairPackage');
const { sha } = require('./prepareId1ProductionPackage');
const { validatePackage, validateCreation } = require('./deployCombinedPlacementRepair');
const { artifact } = require('./prepareCombinedPlacementRepair');
const { repairFeeBudget } = require('./lib/repairFeeBudget');
const ROOT = path.resolve(__dirname, '../../..');
const json = data => JSON.stringify(data, (_, value) => typeof value === 'bigint' ? value.toString() : value, 2);

async function publish() {
  const raw = fs.readFileSync(path.join(ROOT, 'tmp/combined-placement-live-package.json'), 'utf8');
  const pkg = JSON.parse(raw); validatePackage(pkg);
  const journal = JSON.parse(fs.readFileSync(path.join(ROOT, 'tmp/combined-placement-live-broadcasts.json'), 'utf8'));
  assert.equal(journal.packageSha256, sha(raw)); assert.equal(journal.chainId, 137);
  assert.equal(journal.status, 'all-inert-deployments-verified-no-proposals-submitted');
  assert.equal(journal.deployments.length, pkg.deployments.length);
  assert.equal(new Set(journal.deployments.map(row => row.key)).size, pkg.deployments.length);
  assert(process.env.REPAIR_MAINNET_RPC, 'Explicit mainnet RPC required');
  const request = new E.FetchRequest(process.env.REPAIR_MAINNET_RPC); request.timeout = 60000;
  const provider = new E.JsonRpcProvider(request, undefined, { batchMaxCount: 1, cacheTimeout: -1 });
  try {
    assert.equal((await provider.getNetwork()).chainId, 137n);
    const deployments = [];
    for (const item of pkg.deployments) {
      const row = journal.deployments.find(entry => entry.key === item.key);
      assert(row && row.confirmed && row.address === item.address);
      const art = artifact(item.name);
      const creation = await new E.ContractFactory(art.abi, art.bytecode).getDeployTransaction(...item.args);
      const signed = E.Transaction.from(row.signedTransaction);
      validateCreation(signed, item, creation.data); assert.equal(signed.hash, row.txHash);
      const receipt = await provider.getTransactionReceipt(row.txHash);
      assert.equal(receipt.status, 1); assert.equal(receipt.blockHash, row.blockHash);
      assert.equal(receipt.contractAddress.toLowerCase(), item.address.toLowerCase());
      assert.equal(receipt.from.toLowerCase(), A.submitter.toLowerCase());
      // Constructor bindings were verified before this runtime hash entered the journal.
      assert.equal(E.keccak256(await provider.getCode(item.address)), row.runtimeHash);
      deployments.push({ key: item.key, name: item.name, address: item.address, txHash: row.txHash,
        block: row.block, blockHash: row.blockHash, runtimeHash: row.runtimeHash,
        creationBytecodeHash: item.creationBytecodeHash, constructorArgs: item.args,
        gasUsed: String(receipt.gasUsed), effectiveGasPrice: String(receipt.gasPrice),
        actualFeeWei: String(receipt.gasUsed * receipt.gasPrice) });
    }
    const block = await provider.getBlock('latest');
    const balance = await provider.getBalance(A.submitter, block.number);
    const quote = repairFeeBudget({ baseFeePerGas: block.baseFeePerGas, balanceWei: balance,
      estimatedGas: pkg.actions.reduce((sum, action) => sum + BigInt(action.estimatedSubmissionGas), 0n),
      gasLimit: pkg.actions.reduce((sum, action) => sum + BigInt(action.submissionGasLimit), 0n) });
    const manifest = { status: 'verified-mainnet-deployments', chainId: 137, governance: A.governance,
      packageId: pkg.packageId, packageSha256: sha(raw), verifiedBlock: { number: block.number, hash: block.hash },
      deployments: deployments.map(({ key, address, txHash, runtimeHash }) => ({ key, address, txHash, runtimeHash })),
      actions: pkg.actions.map(({ index, phase, program, label, target, value, data, executeAfterPostUpgradeVerification }) =>
        ({ index, phase, program, label, target, value, data, executeAfterPostUpgradeVerification })) };
    const evidence = { status: 'all-inert-deployments-verified-live-proxies-unchanged', chainId: 137,
      checkedAt: new Date().toISOString(), checkedBlock: manifest.verifiedBlock, packageSha256: sha(raw),
      submitter: A.submitter, deployments, reusedDeployments: pkg.reusedDeployments,
      totalDeploymentFeesPOL: E.formatEther(deployments.reduce((sum, row) => sum + BigInt(row.actualFeeWei), 0n)),
      balancePOL: E.formatEther(balance), proposalsSubmittedThisPass: 0, approvalsSent: 0, executionsSent: 0,
      remainingProposals: pkg.actions.length,
      remainingSubmissionBudget: { estimatedCostPOL: E.formatEther(quote.estimatedCostWei),
        cappedReservePOL: E.formatEther(quote.maxCostWei), cappedShortfallPOL: E.formatEther(quote.cappedShortfallWei),
        sufficientlyFunded: quote.sufficientlyFunded, feeBlock: block.number,
        maxFeeGwei: E.formatUnits(quote.maxFeePerGas, 'gwei'), priorityFeeGwei: E.formatUnits(quote.maxPriorityFeePerGas, 'gwei'),
        gasEstimatesFrom: pkg.checkedAt, excludesFounderApprovalAndExecutionGas: true },
      limitations: ['Manifest publication is not governance approval or execution.'] };
    fs.writeFileSync(path.join(ROOT, 'Fin-Freedom-Web2 - Copy/src/constants/repairProposalManifest.json'), json(manifest) + '\n');
    fs.writeFileSync(path.join(ROOT, 'staging-environment/docs/evidence/combined-repair-live-deployments-2026-11-14.json'), json(evidence) + '\n');
    console.log(json({ status: evidence.status, verifiedDeployments: deployments.length,
      totalDeploymentFeesPOL: evidence.totalDeploymentFeesPOL, balancePOL: evidence.balancePOL,
      manifestActions: manifest.actions.length, remainingSubmissionBudget: evidence.remainingSubmissionBudget,
      pendingHostedPublication: true }));
  } finally { provider.destroy(); }
}
if (require.main === module) publish().catch(error => {
  console.error(String(error.shortMessage || error.message).replace(/https?:\/\/\S+/g, '[endpoint]'));
  process.exitCode = 1;
});

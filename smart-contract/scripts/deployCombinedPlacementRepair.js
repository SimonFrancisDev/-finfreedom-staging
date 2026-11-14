// Inert deployments only. Never submits, approves, executes or upgrades a proxy.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { ethers: E } = require('ethers');
const { A, buildCombinedPackage, omitVerifiedProxyApprovals } = require('./lib/combinedPlacementRepairPackage');
const { artifact } = require('./prepareCombinedPlacementRepair');
const { sha } = require('./prepareId1ProductionPackage');
const { repairFeeBudget } = require('./lib/repairFeeBudget');
const ROOT = path.resolve(__dirname, '../../..');
const PACKAGE = path.join(ROOT, 'tmp/combined-placement-live-package.json');
const JOURNAL = path.join(ROOT, 'tmp/combined-placement-live-broadcasts.json');
const read = file => JSON.parse(fs.readFileSync(path.join(ROOT, file), 'utf8'));
const json = data => JSON.stringify(data, (_, value) => typeof value === 'bigint' ? value.toString() : value, 2);
const same = (a, b) => assert.equal(a.toLowerCase(), b.toLowerCase());

function validatePackage(pkg) {
  const inputs = read('staging-environment/docs/evidence/combined-placement-package-inputs-2026-11-13.json');
  let expected = buildCombinedPackage(
    read('staging-environment/docs/evidence/id1-alternative-repair-rehearsal-2026-11-13.json'), inputs.previous,
    read('staging-environment/docs/evidence/freedom-plus-historical-repair-rehearsal-2026-11-13.json'), inputs.audit,
    read('staging-environment/docs/evidence/placement-payment-correction-table-2026-11-13.json'), pkg.startNonce);
  expected = omitVerifiedProxyApprovals(expected, pkg.proxyApprovalEvidence);
  assert.equal(pkg.chainId, 137); assert.equal(pkg.packageId, expected.packageId);
  const actions = pkg.actions.map(({ estimatedSubmissionGas, submissionGasLimit, ...action }) => action);
  assert.deepEqual(actions, expected.actions, 'Changed prepared proposal actions');
  for (const key of ['fFreedom', 'freedomPlus', 'reusedDeployments', 'executionApprovalRequirements']) {
    assert.deepEqual(pkg[key], expected[key], `Changed prepared package: ${key}`);
  }
  assert.equal(pkg.deployments.length, expected.deployments.length);
  const rehearsal = read('staging-environment/docs/evidence/combined-placement-repair-rehearsal-2026-11-13.json');
  assert.equal(rehearsal.status, 'combined-multisig-fork-passed-not-live-release-approval');
  for (const [i, d] of expected.deployments.entries()) {
    for (const key of Object.keys(d)) assert.deepEqual(pkg.deployments[i][key], d[key]);
    const art = artifact(d.name), prepared = pkg.deployments[i];
    const proved = rehearsal.package.deployments.find(row => row.key === d.key);
    assert.equal(E.keccak256(art.bytecode), proved.creationBytecodeHash);
    assert.equal(prepared.creationBytecodeHash, proved.creationBytecodeHash);
    assert.equal(prepared.runtimeTemplateHash, E.keccak256(art.deployedBytecode));
    assert(BigInt(prepared.estimatedGas) > 0n && BigInt(prepared.gasLimit) >= BigInt(prepared.estimatedGas));
  }
  return { governanceRuntimeHash: rehearsal.governance.runtimeHash };
}

function validateCreation(tx, item, data) {
  same(tx.from, A.submitter);
  assert.equal(tx.chainId, 137n); assert.equal(tx.type, 2);
  assert.equal(tx.to, null); assert.equal(tx.value, 0n);
  assert.equal(tx.nonce, item.nonce); assert.equal(tx.data, data);
  assert(tx.maxPriorityFeePerGas >= E.parseUnits('25', 'gwei'));
  assert(tx.maxPriorityFeePerGas <= tx.maxFeePerGas);
  assert(tx.maxFeePerGas <= E.parseUnits('450', 'gwei'));
  assert(tx.gasLimit >= BigInt(item.estimatedGas) && tx.gasLimit <= BigInt(item.gasLimit));
  same(E.getCreateAddress({ from: tx.from, nonce: tx.nonce }), item.address);
}

async function verifyRuntime(provider, item) {
  const art = artifact(item.name);
  const debugPath = path.join(__dirname, '../artifacts', art.sourceName, `${art.contractName}.dbg.json`);
  const debug = JSON.parse(fs.readFileSync(debugPath, 'utf8'));
  const build = JSON.parse(fs.readFileSync(path.resolve(path.dirname(debugPath), debug.buildInfo), 'utf8'));
  const refs = build.output.contracts[art.sourceName][art.contractName].evm.deployedBytecode.immutableReferences || {};
  const normalize = code => {
    let result = code.replace(/^0x/, '');
    for (const locations of Object.values(refs)) for (const { start, length } of locations) {
      result = result.slice(0, start * 2) + '0'.repeat(length * 2) + result.slice((start + length) * 2);
    }
    return result;
  };
  const code = await provider.getCode(item.address);
  assert.notEqual(code, '0x'); assert.equal(normalize(code), normalize(art.deployedBytecode), `Runtime mismatch: ${item.key}`);
  const c = new E.Contract(item.address, art.abi, provider);
  if (item.key.endsWith('Migrator')) {
    same(await c.repairProxy(), item.args[0]); same(await c.repairExecutor(), item.args[1]);
    assert.equal(await c.repairPlanHash(), item.args[2]); assert.equal(await c.repairChain(), 137n);
    assert.equal(await c.repairExecuted(), false);
  } else if (item.key.endsWith('executor')) {
    same(await c.governance(), A.governance); assert.equal(await c.executionChain(), 137n);
    assert.equal(await c.executed(), false);
    for (let i = 0; i < 4; i++) {
      same(await c.targets(i), item.args[1][i]); assert.equal(await c.planHashes(i), item.args[2][i]);
    }
  } else if (item.key === 'fp.router') {
    same(await c.owner(), E.ZeroAddress); same(await c.manager(), E.ZeroAddress);
  } else if (item.key === 'router') {
    assert.equal(await c.validatesConfig(A.manager, A.usdt), true);
  }
  return E.keccak256(code);
}

async function deploy() {
  assert(process.env.REPAIR_MAINNET_RPC, 'Explicit mainnet RPC required');
  assert.equal(process.env.COMBINED_REPAIR_ACTION, 'DEPLOY_INERT_ONLY');
  const raw = fs.readFileSync(PACKAGE, 'utf8'), pkg = JSON.parse(raw);
  const { governanceRuntimeHash } = validatePackage(pkg);
  const request = new E.FetchRequest(process.env.REPAIR_MAINNET_RPC); request.timeout = 25000;
  const provider = new E.JsonRpcProvider(request, undefined, { batchMaxCount: 1, cacheTimeout: -1 });
  provider.pollingInterval = 5000;
  try {
    assert.equal((await provider.getNetwork()).chainId, 137n);
    assert.equal(E.keccak256(await provider.getCode(A.governance)), governanceRuntimeHash);
    assert.equal((await provider.getBlock(pkg.verifiedBlock.number)).hash, pkg.verifiedBlock.hash);
    const latest = await provider.getBlock('latest');
    assert(latest.number >= pkg.verifiedBlock.number && latest.number - pkg.verifiedBlock.number < 1800,
      'Preflight is stale; recheck before a new deployment run');
    const wallet = new E.Wallet(process.env.PRODUCTION_SUBMITTER_KEY, provider);
    same(wallet.address, A.submitter);
    const journal = fs.existsSync(JOURNAL) ? JSON.parse(fs.readFileSync(JOURNAL, 'utf8')) : {
      packageSha256: sha(raw), chainId: 137, submitter: A.submitter,
      authorization: '2026-11-14 owner authorized sequential inert deployment with available POL; stop on insufficient funds',
      maximumSpendWei: String(await provider.getBalance(A.submitter)),
      deployments: [], submissions: [], approvalsSent: 0, executionsSent: 0,
    };
    assert.equal(journal.chainId, 137); assert.equal(journal.packageSha256, sha(raw));
    assert.equal(journal.approvalsSent, 0); assert.equal(journal.executionsSent, 0);
    assert.equal(new Set(journal.deployments.map(row => row.key)).size, journal.deployments.length);
    assert(journal.deployments.every(row => pkg.deployments.some(item => item.key === row.key)));
    const save = () => {
      fs.writeFileSync(`${JOURNAL}.next`, json(journal) + '\n', { mode: 0o600 });
      fs.renameSync(`${JOURNAL}.next`, JOURNAL);
    };
    for (const item of pkg.reusedDeployments) await verifyRuntime(provider, item);
    for (const item of pkg.deployments) {
      const art = artifact(item.name);
      const creation = await new E.ContractFactory(art.abi, art.bytecode).getDeployTransaction(...item.args);
      let row = journal.deployments.find(entry => entry.key === item.key);
      if (!row) {
        assert.equal(await provider.getTransactionCount(A.submitter, 'latest'), item.nonce, 'Nonce changed; no new predicted address may be used');
        assert.equal(await provider.getTransactionCount(A.submitter, 'pending'), item.nonce, 'Pending transaction; do not queue another');
        assert.equal(await provider.getCode(item.address), '0x', 'Unexpected existing deployment');
        const balance = await provider.getBalance(A.submitter);
        const block = await provider.getBlock('latest');
        const quote = repairFeeBudget({ baseFeePerGas: block.baseFeePerGas, estimatedGas: BigInt(item.estimatedGas),
          gasLimit: BigInt(item.gasLimit), balanceWei: balance });
        const spent = journal.deployments.reduce((sum, entry) => sum + BigInt(entry.feeWei || '0'), 0n);
        if (!quote.sufficientlyFunded || spent + quote.maxCostWei > BigInt(journal.maximumSpendWei)) {
          journal.status = 'stopped-before-unaffordable-deployment'; save();
          console.log(json({ status: journal.status, next: item.key, balancePOL: E.formatEther(balance),
            maximumTransactionCostPOL: E.formatEther(quote.maxCostWei), fitsCurrentBaseFee: quote.fitsCurrentBaseFee }));
          return;
        }
        const gas = await provider.estimateGas({ ...creation, from: A.submitter });
        assert(gas <= BigInt(item.gasLimit), 'Creation gas exceeds prepared limit');
        const signedTransaction = await wallet.signTransaction({ ...creation, type: 2, chainId: 137,
          nonce: item.nonce, value: 0n, gasLimit: BigInt(item.gasLimit),
          maxFeePerGas: quote.maxFeePerGas, maxPriorityFeePerGas: quote.maxPriorityFeePerGas });
        const decoded = E.Transaction.from(signedTransaction); validateCreation(decoded, item, creation.data);
        row = { key: item.key, name: item.name, nonce: item.nonce, address: item.address,
          txHash: decoded.hash, signedTransaction, confirmed: false, maxCostWei: quote.maxCostWei,
          gasLimit: decoded.gasLimit, maxFeePerGas: decoded.maxFeePerGas, maxPriorityFeePerGas: decoded.maxPriorityFeePerGas };
        journal.deployments.push(row); save();
      }
      same(row.address, item.address); assert.equal(row.nonce, item.nonce);
      const decoded = E.Transaction.from(row.signedTransaction);
      validateCreation(decoded, item, creation.data); assert.equal(decoded.hash, row.txHash);
      let receipt = await provider.getTransactionReceipt(row.txHash);
      if (!receipt) {
        if (!(await provider.getTransaction(row.txHash))) {
          assert.equal(await provider.getTransactionCount(A.submitter, 'pending'), item.nonce, 'Unknown consumed nonce; inspect before resuming');
          assert(await provider.getBalance(A.submitter) >= decoded.gasLimit * decoded.maxFeePerGas, 'Insufficient balance for signed transaction');
          const sent = await provider.broadcastTransaction(row.signedTransaction); assert.equal(sent.hash, row.txHash);
        }
        console.log(json({ status: 'waiting-for-confirmation', key: item.key, txHash: row.txHash }));
        receipt = await provider.waitForTransaction(row.txHash, 2, 180000);
      }
      assert(receipt && receipt.status === 1, `Deployment failed or unconfirmed: ${row.txHash}`);
      assert.equal(receipt.blockHash, (await provider.getBlock(receipt.blockNumber)).hash);
      same(receipt.contractAddress, item.address); same(receipt.from, A.submitter);
      const runtimeHash = await verifyRuntime(provider, item);
      Object.assign(row, { confirmed: true, block: receipt.blockNumber, blockHash: receipt.blockHash,
        gasUsed: String(receipt.gasUsed), effectiveGasPrice: String(receipt.gasPrice),
        feeWei: String(receipt.gasUsed * receipt.gasPrice), runtimeHash });
      save();
      console.log(json({ key: row.key, address: row.address, txHash: row.txHash, block: row.block,
        confirmed: true, feePOL: E.formatEther(row.feeWei), runtimeAndBindingsVerified: true }));
    }
    journal.status = 'all-inert-deployments-verified-no-proposals-submitted';
    journal.remainingBalanceWei = String(await provider.getBalance(A.submitter)); save();
    console.log(json({ status: journal.status, confirmedDeployments: journal.deployments.length,
      totalFeePOL: E.formatEther(journal.deployments.reduce((sum, row) => sum + BigInt(row.feeWei), 0n)),
      remainingPOL: E.formatEther(journal.remainingBalanceWei), proxyUpgradesSent: 0 }));
  } finally { provider.destroy(); }
}

if (require.main === module) deploy().catch(error => {
  console.error(String(error.shortMessage || error.message).replace(/https?:\/\/\S+/g, '[endpoint]'));
  process.exitCode = 1;
});
module.exports = { validatePackage, validateCreation, verifyRuntime };

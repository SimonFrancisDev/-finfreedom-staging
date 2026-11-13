// Read-only preparation of the rehearsed package. No keys, signatures or broadcasts.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { ethers: E } = require('ethers');
const { A, FP, engines, buildCombinedPackage, omitVerifiedProxyApprovals } = require('./lib/combinedPlacementRepairPackage');
const { verifyLive } = require('./prepareId1ProductionPackage');
const ROOT = path.resolve(__dirname, '../../..');
const IMPL = '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc';
const read = p => JSON.parse(fs.readFileSync(path.join(ROOT, p), 'utf8'));
const json = v => JSON.stringify(v, (_, x) => typeof x === 'bigint' ? x.toString() : x, 2);
const same = (a, b) => assert.equal(a.toLowerCase(), b.toLowerCase());
function artifact(name) {
  const source = name.startsWith('Id1') ? 'migration/Id1HistoricalRepair.sol' :
    name.startsWith('FreedomPlus') && name.endsWith('HistoricalRepair') ? 'migration/FreedomPlusHistoricalOrbitRepair.sol' :
    name === 'FreedomPlusSettlementRouter' ? 'freedom-plus/FreedomPlusSettlementRouter.sol' : `${name}.sol`;
  return read(`staging-environment/smart-contract/artifacts/contracts/${source}/${name}.json`);
}
async function prepare() {
  assert(process.env.REPAIR_MAINNET_RPC, 'Explicit mainnet RPC required');
  assert(!fs.existsSync(path.join(ROOT, 'tmp/combined-placement-live-broadcasts.json')), 'A bound broadcast journal already exists');
  const inputs = read('staging-environment/docs/evidence/combined-placement-package-inputs-2026-11-13.json');
  const ff = read('staging-environment/docs/evidence/id1-alternative-repair-rehearsal-2026-11-13.json');
  const fp = read('staging-environment/docs/evidence/freedom-plus-historical-repair-rehearsal-2026-11-13.json');
  const table = read('staging-environment/docs/evidence/placement-payment-correction-table-2026-11-13.json');
  const rehearsal = read('staging-environment/docs/evidence/combined-placement-repair-rehearsal-2026-11-13.json');
  assert.equal(rehearsal.status, 'combined-multisig-fork-passed-not-live-release-approval');
  const request = new E.FetchRequest(process.env.REPAIR_MAINNET_RPC); request.timeout = 25000;
  const provider = new E.JsonRpcProvider(request, undefined, { batchMaxCount: 1 });
  try {
    assert.equal((await provider.getNetwork()).chainId, 137n);
    const nonce = await provider.getTransactionCount(A.submitter, 'pending');
    assert.equal(nonce, await provider.getTransactionCount(A.submitter, 'latest'), 'Pending submitter transaction');
    let pkg = buildCombinedPackage(ff, inputs.previous, fp, inputs.audit, table, nonce);
    const block = await provider.getBlock((await provider.getBlockNumber()) - 2);
    const at = { blockTag: block.number };
    await verifyLive(provider, pkg.fFreedom, block.number);
    console.log('PASS current F-Freedom implementations, bindings and guarded repair prestate');
    const common = ['function owner() view returns(address)', 'function guardian() view returns(address)', 'function paused() view returns(bool)'];
    for (const [key, name] of [...engines, ['registration', 'FreedomPlusRegistration'], ['manager', 'FreedomPlusLevelManager'], ['router', 'FreedomPlusSettlementRouter']]) {
      const proxy = new E.Contract(FP[key], common, provider);
      same(await proxy.owner(at), A.governance); same(await proxy.guardian(at), A.guardian);
      assert.equal(await proxy.paused(at), false, `Already paused: ${key}`);
      const expected = inputs.audit.contracts[name];
      same('0x' + (await provider.getStorage(FP[key], IMPL, block.number)).slice(-40), expected.implementation);
      assert.equal(E.keccak256(await provider.getCode(expected.implementation, block.number)), expected.runtimeHash, `Changed FP runtime: ${key}`);
    }
    for (const [key, name, migrator] of engines) {
      const art = artifact(migrator), iface = new E.Interface(art.abi);
      for (const edit of fp.edits.find(g => g.name === name).edits) {
        const result = await provider.send('eth_call', [{ to: FP[key], data: iface.encodeFunctionData('repairStateHash', [edit.account, edit.level]) },
          E.toQuantity(block.number), { [FP[key]]: { code: art.deployedBytecode } }]);
        assert.equal(iface.decodeFunctionResult('repairStateHash', result)[0], edit.beforeHash, `Changed FP prestate: ${key}/${edit.account}`);
      }
    }
    console.log('PASS current Freedom Plus implementations and guarded repair prestate');
    const gov = new E.Contract(A.governance, [
      'function transactions(uint256) view returns(address to,uint256 value,bytes data,bool executed,bool cancelled,uint256 confirmations,uint256 submittedAt,uint256 executeAfter)',
      'function submitTransaction(address,uint256,bytes) returns(uint256)',
      'function isProposalSubmitter(address) view returns(bool)', 'function isOwner(address) view returns(bool)',
      'function getTransactionCount() view returns(uint256)',
    ], provider);
    assert.equal(E.keccak256(await provider.getCode(A.governance, block.number)), rehearsal.governance.runtimeHash);
    assert(await gov.isProposalSubmitter(A.submitter, at) || await gov.isOwner(A.submitter, at));
    const cancellations = [];
    for (const id of pkg.requiredCancelledProposalIds) {
      const tx = await gov.transactions(id, at), old = inputs.previous.actions[id - 130];
      same(tx.to, old.target); assert.equal(tx.value, 0n); assert.equal(tx.data, old.data);
      assert.equal(tx.executed, false, `Obsolete proposal executed: ${id}`);
      cancellations.push({ id, cancelled: tx.cancelled });
    }
    for (const item of pkg.reusedDeployments) {
      assert.equal(E.keccak256(artifact(item.name).bytecode), item.creationBytecodeHash, `Changed reused source: ${item.name}`);
      assert.notEqual(await provider.getCode(item.address, block.number), '0x');
    }
    const guardian = new E.Contract(A.guardian, ['function approvedProxies(address) view returns(bool)'], provider);
    const proxies = [];
    for (const key of [...engines.map(([key]) => key), 'router']) proxies.push({ key, address: FP[key], alreadyApproved: await guardian.approvedProxies(FP[key], at) });
    pkg = omitVerifiedProxyApprovals(pkg, { chainId: 137, block: block.number, blockHash: block.hash, proxies });
    const fee = await provider.getFeeData();
    const cap = E.parseUnits('450', 'gwei');
    const maxFeePerGas = fee.maxFeePerGas < cap ? fee.maxFeePerGas : cap;
    const tip = fee.maxPriorityFeePerGas > E.parseUnits('25', 'gwei') ? fee.maxPriorityFeePerGas : E.parseUnits('25', 'gwei');
    assert(block.baseFeePerGas + tip <= maxFeePerGas, 'Current fees exceed reviewed 450-gwei limit');
    let deploymentGas = 0n, submissionGas = 0n;
    for (const item of pkg.deployments) {
      const art = artifact(item.name);
      const proved = rehearsal.package.deployments.find(d => d.key === item.key);
      assert.equal(E.keccak256(art.bytecode), proved.creationBytecodeHash, `Candidate changed since rehearsal: ${item.key}`);
      const tx = await new E.ContractFactory(art.abi, art.bytecode).getDeployTransaction(...item.args);
      item.creationBytecodeHash = E.keccak256(art.bytecode); item.runtimeTemplateHash = E.keccak256(art.deployedBytecode);
      item.gasLimit = (await provider.estimateGas({ ...tx, from: A.submitter })) * 120n / 100n;
      deploymentGas += item.gasLimit;
    }
    console.log('PASS 11 deployment bytecode hashes match the completed rehearsal; estimating proposal submissions');
    for (const action of pkg.actions) {
      const tx = await gov.submitTransaction.populateTransaction(action.target, 0n, action.data);
      action.submissionGasLimit = (await provider.estimateGas({ ...tx, from: A.submitter })) * 120n / 100n;
      submissionGas += action.submissionGasLimit;
    }
    const balance = await provider.getBalance(A.submitter);
    const maximumCost = (deploymentGas + submissionGas) * maxFeePerGas;
    Object.assign(pkg, { verifiedBlock: { number: block.number, hash: block.hash }, checkedAt: new Date().toISOString(),
      cancellations, nextProposalId: await gov.getTransactionCount(),
      budget: { maxFeePerGas, maxPriorityFeePerGas: tip, deploymentGas, submissionGas, balanceWei: balance,
        maxCostWei: maximumCost, sufficientlyFunded: balance >= maximumCost, excludesFoundersApprovalAndExecutionGas: true },
      status: 'verified-unsigned-package-not-deployed-or-submitted' });
    fs.writeFileSync(path.join(ROOT, 'tmp/combined-placement-live-package.json'), json(pkg) + '\n');
    console.log(json({ chainId: 137, liveWrites: 0, verifiedBlock: pkg.verifiedBlock, deployments: pkg.deployments.length,
      proposals: pkg.actions.length, balancePOL: E.formatEther(balance), cappedBudgetPOL: E.formatEther(maximumCost),
      sufficientlyFunded: pkg.budget.sufficientlyFunded, maxFeeGwei: E.formatUnits(maxFeePerGas, 'gwei'),
      cancellationsStillRequiredBeforeExecution: cancellations.filter(r => !r.cancelled).map(r => r.id) }));
  } finally { provider.destroy(); }
}
if (require.main === module) prepare().catch(error => { console.error(error.shortMessage || error.message); process.exitCode = 1; });
module.exports = { artifact };

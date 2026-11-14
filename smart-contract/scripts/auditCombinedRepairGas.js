// Read-only: reconcile actual mainnet fees and distinguish estimates from ceilings.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { ethers: E } = require('ethers');
const { A } = require('./lib/combinedPlacementRepairPackage');
const { ABI, iface, submissionData, RUNTIME_HASH } = require('./lib/id1CancellationPlan');
const { artifact } = require('./prepareCombinedPlacementRepair');
const ROOT = path.resolve(__dirname, '../../..');
const read = file => JSON.parse(fs.readFileSync(path.join(ROOT, file), 'utf8'));
const json = data => JSON.stringify(data, (_, value) => typeof value === 'bigint' ? value.toString() : value, 2);
const same = (a, b) => assert.equal(a.toLowerCase(), b.toLowerCase());
const pol = E.formatEther;
const gwei = value => E.formatUnits(value, 'gwei');

async function audit() {
  assert(process.env.REPAIR_MAINNET_RPC, 'Explicit mainnet RPC required');
  const request = new E.FetchRequest(process.env.REPAIR_MAINNET_RPC); request.timeout = 25000;
  const provider = new E.JsonRpcProvider(request, undefined, { batchMaxCount: 1, cacheTimeout: -1 });
  async function batch(calls, attempt = 0) {
    const response = await fetch(process.env.REPAIR_MAINNET_RPC, { method: 'POST',
      headers: { 'Content-Type': 'application/json' }, signal: AbortSignal.timeout(30000),
      body: JSON.stringify(calls.map((call, id) => ({ jsonrpc: '2.0', id, ...call }))) });
    assert(response.ok, `Read-only RPC HTTP ${response.status}`);
    const rows = await response.json(); assert(Array.isArray(rows) && rows.length === calls.length);
    const results = new Map(rows.map(row => [row.id, row])); assert.equal(results.size, calls.length);
    const error = rows.find(row => row.error)?.error;
    if (error && attempt < 2 && /rate|limit|timeout|busy/i.test(error.message || '')) {
      await new Promise(resolve => setTimeout(resolve, 1500 * (attempt + 1)));
      return batch(calls, attempt + 1);
    }
    return calls.map((_, id) => { const row = results.get(id); assert(row && !row.error,
      `Read-only RPC failed at ${id}: ${row?.error?.code} ${String(row?.error?.message || '').replace(/https?:\/\/\S+/g, '[endpoint]')}`); return row.result; });
  }
  try {
    assert.equal((await provider.getNetwork()).chainId, 137n);
    const original = read('tmp/id1-production-broadcasts.json');
    const previous = read('tmp/id1-production-package.json');
    const cancellations = read('tmp/id1-cancellation-submissions.json');
    const pkg = read('tmp/combined-placement-live-package.json');
    const baseline = read('tmp/id1-production-funding-preflight.json');
    assert.equal(pkg.chainId, 137);
    const known = [
      ...original.deployments.map(row => ({ group: 'originalDeployments', tx: row.txHash, address: row.address, key: row.key })),
      ...original.submissions.map(row => ({ group: 'originalProposalSubmissions', tx: row.txHash, index: row.index, proposalId: row.proposalId })),
      ...cancellations.submissions.map(row => ({ group: 'cancellationProposalSubmissions', tx: row.txHash, retires: row.retires, proposalId: row.proposalId })),
    ];
    assert.equal(known.length, 70); assert.equal(new Set(known.map(row => row.tx)).size, 70);
    const rows = [];
    for (let offset = 0; offset < known.length; offset += 2) {
      const group = known.slice(offset, offset + 2);
      const results = await batch(group.flatMap(row => [
        { method: 'eth_getTransactionByHash', params: [row.tx] },
        { method: 'eth_getTransactionReceipt', params: [row.tx] },
      ]));
      for (const [index, entry] of group.entries()) {
        const tx = results[index * 2], receipt = results[index * 2 + 1];
        assert(tx && receipt); same(tx.hash, entry.tx); same(receipt.transactionHash, entry.tx);
        same(tx.from, A.submitter); same(receipt.from, A.submitter);
        assert.equal(BigInt(tx.chainId), 137n); assert.equal(BigInt(tx.value), 0n);
        assert.equal(BigInt(receipt.status), 1n); assert.equal(tx.blockHash, receipt.blockHash);
        if (entry.group === 'originalDeployments') { assert.equal(tx.to, null); same(receipt.contractAddress, entry.address); }
        else {
          same(tx.to, A.governance);
          const expected = entry.group === 'cancellationProposalSubmissions' ? submissionData(entry.retires) :
            iface.encodeFunctionData('submitTransaction', [previous.actions[entry.index].target, 0n, previous.actions[entry.index].data]);
          assert.equal(tx.input, expected, 'Unexpected original transaction calldata');
        }
        const gasUsed = BigInt(receipt.gasUsed), gasPrice = BigInt(receipt.effectiveGasPrice);
        rows.push({ ...entry, nonce: Number(BigInt(tx.nonce)), block: Number(BigInt(receipt.blockNumber)),
          blockHash: receipt.blockHash, gasUsed, effectiveGasPrice: gasPrice, feeWei: gasUsed * gasPrice, valueWei: 0n });
      }
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    rows.sort((a, b) => a.nonce - b.nonce);
    rows.forEach((row, index) => assert.equal(row.nonce, rows[0].nonce + index, 'Missing outbound nonce in accounting window'));
    const openingBlock = rows[0].block - 1;
    const opening = await provider.getBalance(A.submitter, openingBlock);
    const totalFees = rows.reduce((sum, row) => sum + row.feeWei, 0n);
    const originalBaseline = await provider.getBalance(A.submitter, baseline.block);
    assert.equal(pol(originalBaseline), baseline.balancePOL);
    assert.equal(await provider.getTransactionCount(A.submitter, baseline.block), rows[0].nonce);
    assert.equal(await provider.getTransactionCount(A.submitter, openingBlock), rows[0].nonce);
    const originalEnd = rows.filter(row => row.group !== 'cancellationProposalSubmissions').at(-1).block;
    const afterOriginal = await provider.getBalance(A.submitter, originalEnd);
    console.log('PASS all 70 past receipts: contiguous sender nonces, exact calls, successful transactions, zero POL value sent');

    const pinned = await provider.getBlock((await provider.getBlockNumber()) - 2);
    assert.equal(E.keccak256(await provider.getCode(A.governance, pinned.number)), RUNTIME_HASH);
    const nonce = await provider.getTransactionCount(A.submitter, 'pending');
    assert.equal(nonce, rows.at(-1).nonce + 1, 'Additional outbound transaction needs reconciliation');
    assert.equal(nonce, pkg.startNonce, 'Prepared deployment nonce changed');
    const gov = new E.Contract(A.governance, ABI, provider);
    assert.equal(await gov.getTransactionCount(), BigInt(pkg.nextProposalId), 'Governance queue changed; review duplicate submissions');
    const estimates = [];
    for (const d of pkg.deployments) {
      const art = artifact(d.name);
      assert.equal(E.keccak256(art.bytecode), d.creationBytecodeHash);
      const tx = await new E.ContractFactory(art.abi, art.bytecode).getDeployTransaction(...d.args);
      const gas = await provider.estimateGas({ ...tx, from: A.submitter });
      estimates.push({ group: 'remainingDeployments', key: d.key, gas, gasLimit: (gas * 120n + 99n) / 100n });
    }
    for (const action of pkg.actions) {
      const tx = await gov.submitTransaction.populateTransaction(action.target, 0n, action.data);
      const gas = await provider.estimateGas({ ...tx, from: A.submitter });
      estimates.push({ group: 'remainingProposalSubmissions', index: action.index, phase: action.phase, label: action.label,
        calldataBytes: E.getBytes(action.data).length, gas, gasLimit: (gas * 120n + 99n) / 100n });
    }
    const block = await provider.getBlock('latest');
    const balance = await provider.getBalance(A.submitter, block.number);
    assert.equal(opening - totalFees, balance, 'Fees do not fully reconcile the balance; do not claim a complete ledger');
    const history = await provider.send('eth_feeHistory', ['0x14', E.toQuantity(block.number), [25, 50, 75]]);
    const tips = history.reward.map(row => BigInt(row[1])).sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
    const typicalTip = tips[Math.floor(tips.length / 2)];
    const minimumTip = E.parseUnits('25', 'gwei');
    const rawGas = estimates.reduce((sum, row) => sum + row.gas, 0n);
    const paddedGas = estimates.reduce((sum, row) => sum + row.gasLimit, 0n);
    const groups = [...new Set(rows.map(row => row.group))].map(group => ({ group,
      transactions: rows.filter(row => row.group === group).length,
      actualFeePOL: pol(rows.filter(row => row.group === group).reduce((sum, row) => sum + row.feeWei, 0n)) }));
    const scenarios = [
      ['currentBasePlus25GweiTip', rawGas, block.baseFeePerGas + minimumTip],
      ['currentBasePlusObservedMedianTip', rawGas, block.baseFeePerGas + typicalTip],
      ['20PercentGasAnd20PercentBaseFeeHeadroom', paddedGas, (block.baseFeePerGas * 120n + 99n) / 100n + minimumTip],
    ].map(([name, gas, price]) => ({ name, gas, priceGwei: gwei(price), costPOL: pol(gas * price),
      additionalPOL: pol(gas * price > balance ? gas * price - balance : 0n), fitsBalance: gas * price <= balance }));
    const report = { status: 'read-only-gas-and-ledger-verified', chainId: 137, liveWrites: 0, submitter: A.submitter,
      checkedBlock: { number: block.number, hash: block.hash, utc: new Date(block.timestamp * 1000).toISOString() },
      previousFunding: { baselineBlock: baseline.block, balanceBeforeFundingPOL: pol(originalBaseline),
        fundedBeforeFirstDeploymentBlock: openingBlock, balanceAfterFundingPOL: pol(opening),
        netFundingPOL: pol(opening - originalBaseline), unchangedOutboundNonceDuringFunding: rows[0].nonce },
      historical: { groups, totalActualFeesPOL: pol(totalFees), afterOriginalWorkPOL: pol(afterOriginal),
        currentBalancePOL: pol(balance), feesFullyReconcileBalance: true, all70Succeeded: true, nativeValueSentPOL: '0.0', rows },
      remaining: { deployments: pkg.deployments.length, proposals: pkg.actions.length, cancellationSubmissionsNeeded: 0,
        originalImplementationsReused: pkg.reusedDeployments.length, currentNonce: nonce,
        currentBaseFeeGwei: gwei(block.baseFeePerGas), observedMedianTipGwei: gwei(typicalTip),
        rawEstimatedGas: rawGas, gasWith20PercentHeadroom: paddedGas,
        affordableAveragePriceGweiWithoutHeadroom: gwei(balance / rawGas),
        affordablePriceGweiWith20PercentGasHeadroom: gwei(balance / paddedGas), scenarios, estimates,
        excludesFoundersApprovalAndExecutionGas: true },
      limitations: ['Future gas prices and total realized cost are not guaranteed.',
        'This read-only audit does not execute the upgrade or certify that future on-chain repair has occurred.',
        'The 25-gwei tip scenario may confirm slower than recently observed median-tip transactions.'] };
    fs.writeFileSync(path.join(ROOT, 'tmp/combined-repair-gas-audit-2026-11-14.json'), json(report) + '\n');
    console.log(json({ ...report, historical: { ...report.historical, rows: undefined }, remaining: { ...report.remaining, estimates: undefined } }));
  } finally { provider.destroy(); }
}
if (require.main === module) audit().catch(error => { console.error(error.shortMessage || error.message); process.exitCode = 1; });

// Only the already-approved proposal 224 can be executed by this runner.
// CHECK is read-only. EXECUTE_ONCE signs once; VERIFY never broadcasts.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const E = require('ethers');
const { ABI, OWNERS, RUNTIME_HASH } = require('./lib/id1CancellationPlan');
const { artifact } = require('./prepareCombinedPlacementRepair');
const { A } = require('./lib/id1ProductionPackage');
const { repairFeeBudget } = require('./lib/repairFeeBudget');
const ROOT = path.resolve(__dirname, '../../..');
const RELAY = '0x16F9ac40B06e2a17bc0CC145b211A176E8654906';
const RELAY_HASH = '0x391bdf63a93a9ec64929f8ab3dacb79371054365a6ae6f336a22b3af80aa96f4';
const PAYLOAD_HASH = '0x9d90c584451bdbc4214260b02891790175ec2e2a64e26fb08f86278b2abd0b9b';
const GAS = 32_800_000n;
const IMPL = '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc';
const POL = '0x0000000000000000000000000000000000001010';
const FEE = E.id('LogFeeTransfer(address,address,address,uint256,uint256,uint256,uint256,uint256)');
const TRANSFER = E.id('Transfer(address,address,uint256)');
const JOURNAL = path.join(ROOT, 'tmp/repair224-relay-execution.json');
const read = file => JSON.parse(fs.readFileSync(path.join(ROOT, file), 'utf8'));
const json = value => JSON.stringify(value, (_, v) => typeof v === 'bigint' ? v.toString() : v, 2);
const plain = value => JSON.parse(json(value));
const same = (a, b) => assert.equal(a.toLowerCase(), b.toLowerCase());
const slot = value => E.toBeHex(value, 32);
function applicationLogs(trace, out = []) {
  assert(!trace.error, trace.revertReason || trace.error);
  assert(!trace.value || BigInt(trace.value) === 0n, 'Unexpected native transfer');
  for (const l of trace.logs || []) {
    if (l.address.toLowerCase() === RELAY.toLowerCase() || (l.address.toLowerCase() === POL && l.topics[0] === FEE)) continue;
    assert.notEqual(l.topics[0], TRANSFER, 'Unexpected token transfer');
    out.push({ address: l.address.toLowerCase(), topics: l.topics, data: l.data });
  }
  for (const c of trace.calls || []) applicationLogs(c, out);
  return out;
}
function applicationStorage(diff) {
  return Object.fromEntries(['pre', 'post'].map(phase => [phase, Object.fromEntries(
    Object.entries(diff[phase]).filter(([a, v]) => ![POL, RELAY.toLowerCase()].includes(a.toLowerCase()) && v.storage)
      .map(([a, v]) => [a, v.storage]),
  )]));
}
function boundedList(discovered) {
  const list = discovered.map(e => ({ address: e.address.toLowerCase(), storageKeys: [...e.storageKeys] }));
  const gov = list.find(e => e.address === A.governance.toLowerCase()); assert(gov);
  // Verified SimpleMultiSig storage layout: owners array slot 0, isOwner mapping slot 1.
  const ownerKey = E.keccak256(E.AbiCoder.defaultAbiCoder().encode(['address', 'uint256'], [RELAY, 1]));
  gov.storageKeys = [...new Set([...gov.storageKeys, ownerKey])];
  list.push({ address: RELAY.toLowerCase(), storageKeys: [slot(0)] });
  for (const e of list) e.storageKeys.sort();
  list.sort((a, b) => a.address === A.governance.toLowerCase() ? -1 : b.address === A.governance.toLowerCase() ? 1 : a.address.localeCompare(b.address));
  let remaining = 3900;
  const bounded = list.map(e => { const storageKeys = e.storageKeys.slice(0, remaining); remaining -= storageKeys.length; return { address: e.address, storageKeys }; }).filter(e => e.storageKeys.length);
  assert.equal(remaining, 0); return bounded;
}
function validateSigned(raw, expected) {
  const tx = E.Transaction.from(raw); same(tx.from, A.submitter); same(tx.to, RELAY);
  assert.equal(tx.unsignedHash, E.Transaction.from(expected).unsignedHash, 'Signed transaction fields changed');
  assert.equal(tx.chainId, 137n); assert.equal(tx.type, 2); assert.equal(tx.value, 0n); assert.equal(tx.gasLimit, GAS);
  assert.equal(tx.data, new E.Interface(['function execute()']).encodeFunctionData('execute'));
  assert.equal(tx.accessList.reduce((n, e) => n + e.storageKeys.length, 0), 3900);
  assert(E.getBytes(raw).length < 131072); assert(tx.maxFeePerGas <= E.parseUnits('450', 'gwei'));
  return tx;
}
async function main() {
  const mode = process.env.REPAIR224_ACTION;
  assert(['CHECK_EXECUTION', 'EXECUTE_ONCE', 'VERIFY_EXECUTION'].includes(mode), 'Explicit action required');
  assert(process.env.REPAIR_MAINNET_RPC, 'Explicit Polygon mainnet RPC required');
  const req = new E.FetchRequest(process.env.REPAIR_MAINNET_RPC); req.timeout = 120000;
  const p = new E.JsonRpcProvider(req, undefined, { batchMaxCount: 1, cacheTimeout: -1 }); p.pollingInterval = 4000;
  const pkg = read('tmp/combined-placement-live-package.json');
  const baseline = read('tmp/combined-repair-224-access-list-equivalence.json');
  const expectedEvents = baseline.events.map(({ address, topics, data }) => ({ address: address.toLowerCase(), topics, data }));
  const helperAbi = read('tmp/repair224-relay-candidate-artifact.json').abi;
  const g = new E.Contract(A.governance, [...ABI, 'function isOwner(address) view returns(bool)', 'function executeTransaction(uint256)'], p);
  const helper = new E.Contract(RELAY, helperAbi, p);
  let record = fs.existsSync(JOURNAL) ? read('tmp/repair224-relay-execution.json') : null;
  const save = () => { fs.writeFileSync(JOURNAL + '.next', json(record) + '\n'); fs.renameSync(JOURNAL + '.next', JOURNAL); };
  async function bindings(block, completed = false) {
    const at = { blockTag: block };
    assert.equal((await p.getNetwork()).chainId, 137n);
    assert.equal(E.keccak256(await p.getCode(A.governance, block)), RUNTIME_HASH);
    assert.equal(E.keccak256(await p.getCode(RELAY, block)), RELAY_HASH);
    assert.deepEqual(Array.from(await g.getOwners(at)), [...OWNERS, RELAY]);
    assert.equal(await g.requiredConfirmations(at), 3n); assert.equal(await g.timelockDelay(at), 120n);
    assert.equal(await g.isOwner(RELAY, at), true);
    for (const id of [257, 258]) {
      const tx = await g.transactions(id, at);
      const expected = read('tmp/repair224-relay-deployment.json').transactions.find(t => t.proposalId === String(id));
      same(tx.to, A.governance); assert.equal(tx.value, 0n); assert.equal(tx.data, expected.action.data);
      assert.equal(tx.executed, id === 257); assert.equal(tx.cancelled, false);
    }
    const tx = await g.transactions(224, at);
    same(tx.to, pkg.actions[34].target); assert.equal(tx.data, pkg.actions[34].data);
    assert.equal(E.keccak256(tx.data), PAYLOAD_HASH); assert.equal(tx.value, 0n);
    assert.equal(tx.executed, completed); assert.equal(tx.cancelled, false); assert(tx.confirmations >= 3n);
    assert.equal(await helper.executed(at), completed);
    same(await helper.GOVERNANCE(at), A.governance); same(await helper.OPERATOR(at), A.submitter);
    assert.equal(await helper.PROPOSAL_ID(at), 224n); assert.equal(await helper.PAYLOAD_HASH(at), PAYLOAD_HASH);
    for (const { address } of read('tmp/repair224-release-status-2026-11-15.json').paused) {
      assert.equal(await new E.Contract(address, ['function paused() view returns(bool)'], p).paused(at), true, `Unpaused: ${address}`);
    }
    for (let id = 225; id <= 256; id++) assert.equal((await g.transactions(id, at)).executed, false, `Out-of-order proposal ${id}`);
    const deployments = read('staging-environment/docs/evidence/combined-repair-live-deployments-2026-11-14.json').deployments;
    const upgrade = new E.Interface(['function upgradeToAndCall(address,bytes)']);
    for (const action of pkg.actions.filter(a => a.phase === 'MIGRATOR').slice(0, 4)) {
      const impl = upgrade.decodeFunctionData('upgradeToAndCall', action.data)[0];
      same('0x' + (await p.getStorage(action.target, IMPL, block)).slice(-40), impl);
      const d = deployments.find(d => d.address.toLowerCase() === impl.toLowerCase()); assert(d);
      assert.equal(E.keccak256(await p.getCode(impl, block)), d.runtimeHash);
    }
    const executor = deployments.find(d => d.address.toLowerCase() === tx.to.toLowerCase()); assert(executor);
    assert.equal(E.keccak256(await p.getCode(tx.to, block)), executor.runtimeHash);
    assert.equal(await new E.Contract(tx.to, ['function executed() view returns(bool)'], p).executed(at), completed);
  }
  async function deferredHash(block) {
    return new E.Contract(A.p39, artifact('Id1MultiRingRepairMigrator').abi, p).repairStateHash(A.id1, 6, { blockTag: block });
  }
  async function orbitStates(block, completed) {
    const results = [];
    for (const group of pkg.fFreedom.manifest.edits) {
      const c = new E.Contract(A[group.key], artifact(group.key === 'p4' ? 'Id1P4RepairMigrator' : 'Id1MultiRingRepairMigrator').abi, p);
      for (const edit of group.edits) {
        const state = await c.repairState(edit[0], edit[1], { blockTag: block });
        if (completed) assert.deepEqual(plain(state[1]), edit[3], `Wrong repaired slot vector: ${group.key}/${edit[0]}/${edit[1]}`);
        else assert.equal(state[0], edit[2], 'Repair prestate changed');
        results.push({ contract: group.key, account: edit[0], level: edit[1], stateHash: state[0], positionsVerified: state[1].length });
      }
    }
    return results;
  }
  async function verify() {
    assert(record?.txHash, 'No execution journal to verify');
    const receipt = await p.getTransactionReceipt(record.txHash);
    assert(receipt && receipt.status === 1, `Not successfully mined: ${record.txHash}. No retry is permitted.`);
    const tx = await p.getTransaction(record.txHash); same(tx.from, A.submitter); same(tx.to, RELAY);
    assert.equal(tx.chainId, 137n); assert.equal(tx.nonce, record.nonce); assert.equal(tx.value, 0n);
    assert.equal(tx.data, record.request.data); assert.equal(tx.gasLimit, GAS);
    assert.deepEqual(E.accessListify(tx.accessList), E.accessListify(record.request.accessList));
    assert.equal(receipt.blockHash, (await p.getBlock(receipt.blockNumber)).hash);
    const trace = await p.send('debug_traceTransaction', [record.txHash, { tracer: 'callTracer', tracerConfig: { withLog: true } }]);
    assert.deepEqual(applicationLogs(trace), expectedEvents, 'Mined repair events differ');
    const diff = await p.send('debug_traceTransaction', [record.txHash, { tracer: 'prestateTracer', tracerConfig: { diffMode: true } }]);
    assert.deepEqual(applicationStorage(diff), baseline.storage, 'Mined repair storage differs');
    assert.equal(BigInt(diff.post[RELAY.toLowerCase()].storage[slot(0)]), 1n);
    assert(!receipt.logs.some(l => l.topics[0] === TRANSFER), 'Unexpected token transfer receipt');
    await bindings(receipt.blockNumber, true);
    const states = await orbitStates(receipt.blockNumber, true);
    assert.equal(await deferredHash(receipt.blockNumber), record.deferredLevel6Hash);
    const reg = new E.Contract(A.registration, ['function currentMatrixParentOf(address,uint8) view returns(address)'], p);
    same(await reg.currentMatrixParentOf(A.sofia, 8, { blockTag: receipt.blockNumber }), A.sabina);
    same(await reg.currentMatrixParentOf(A.sofia, 9, { blockTag: receipt.blockNumber }), A.id1);
    Object.assign(record, { status: 'proposal-224-executed-and-verified-removal-258-may-proceed', receiptBlock: receipt.blockNumber,
      receiptBlockHash: receipt.blockHash, gasUsed: String(receipt.gasUsed), feeWei: String(receipt.gasUsed * receipt.gasPrice),
      verifiedEvents: expectedEvents.length, exactStorageChanges: true, tokenTransfers: 0, orbitStates: states,
      deferredLevel6Unchanged: true, retainedPauses: 12, remainingBalancePOL: E.formatEther(await p.getBalance(A.submitter)),
      verifiedAt: new Date().toISOString() }); save();
    console.log(json({ ...record, request: undefined, preflight: undefined }));
  }
  try {
    assert.equal((await p.getNetwork()).chainId, 137n);
    if (record?.txHash || mode === 'VERIFY_EXECUTION') { await verify(); return; }
    const b = await p.getBlock('latest'), at = E.toQuantity(b.number);
    await bindings(b.number);
    assert(BigInt(b.timestamp) >= (await g.transactions(224, { blockTag: b.number })).executeAfter);
    await orbitStates(b.number, false);
    const oldLevel6 = await deferredHash(b.number);
    const discovery = await p.send('eth_createAccessList', [{ from: OWNERS[2], to: A.governance,
      data: g.interface.encodeFunctionData('executeTransaction', [224]), gas: E.toQuantity(50_000_000) }, at]);
    assert(!discovery.error, discovery.error);
    const accessList = boundedList(discovery.accessList);
    const nonce = await p.getTransactionCount(A.submitter, 'latest');
    assert.equal(nonce, await p.getTransactionCount(A.submitter, 'pending'), 'Outstanding operator transaction');
    const balance = await p.getBalance(A.submitter);
    const fees = repairFeeBudget({ baseFeePerGas: b.baseFeePerGas, estimatedGas: 30_637_888n, gasLimit: GAS, balanceWei: balance });
    assert(fees.sufficientlyFunded && fees.maxCostWei <= E.parseEther('14.76'), 'Gas budget exceeded');
    const request = { from: A.submitter, to: RELAY, data: helper.interface.encodeFunctionData('execute'), value: '0x0',
      gas: E.toQuantity(GAS), maxFeePerGas: E.toQuantity(fees.maxFeePerGas), maxPriorityFeePerGas: E.toQuantity(fees.maxPriorityFeePerGas), accessList };
    const trace = await p.send('debug_traceCall', [request, at, { tracer: 'callTracer', tracerConfig: { withLog: true } }]);
    assert.deepEqual(applicationLogs(trace), expectedEvents);
    const diff = await p.send('debug_traceCall', [request, at, { tracer: 'prestateTracer', tracerConfig: { diffMode: true } }]);
    assert.deepEqual(applicationStorage(diff), baseline.storage);
    assert.equal(BigInt(diff.post[RELAY.toLowerCase()].storage[slot(0)]), 1n);
    const expected = { chainId: 137, type: 2, nonce, to: RELAY, data: request.data, value: 0n, gasLimit: GAS,
      maxFeePerGas: fees.maxFeePerGas, maxPriorityFeePerGas: fees.maxPriorityFeePerGas, accessList };
    assert(E.getBytes(E.Transaction.from(expected).unsignedSerialized).length + 128 < 131072);
    const preflight = { block: b.number, blockHash: b.hash, utc: new Date(b.timestamp * 1000).toISOString(),
      simulationGas: String(BigInt(trace.gasUsed)), events: expectedEvents.length, storageEquivalent: true, stateOverrides: false,
      maximumFeePOL: E.formatEther(fees.maxCostWei), expectedFeePOL: E.formatEther(fees.estimatedCostWei), liveWrites: 0 };
    fs.writeFileSync(path.join(ROOT, 'tmp/repair224-relay-authorized-preflight.json'), json({ ...preflight, request }) + '\n');
    console.log(json({ status: 'authorized-mainnet-execution-preflight-passed', ...preflight }));
    if (mode === 'CHECK_EXECUTION') return;
    const key = process.env.PRODUCTION_SUBMITTER_KEY || ''; assert(/^(0x)?[0-9a-fA-F]{64}$/.test(key));
    const wallet = new E.Wallet(key.startsWith('0x') ? key : '0x' + key); same(wallet.address, A.submitter);
    const raw = await wallet.signTransaction(expected), tx = validateSigned(raw, expected);
    const latest = await p.getBlock('latest'); assert(latest.number - b.number < 120, 'Simulation too old');
    assert.equal(await p.getTransactionCount(A.submitter, 'latest'), nonce);
    assert.equal(await p.getTransactionCount(A.submitter, 'pending'), nonce);
    assert(await p.getBalance(A.submitter) >= GAS * fees.maxFeePerGas);
    assert(latest.baseFeePerGas + fees.maxPriorityFeePerGas <= fees.maxFeePerGas, 'Fee quote expired');
    assert.equal(await p.send('eth_call', [request, E.toQuantity(latest.number)]), '0x');
    record = { chainId: 137, governance: A.governance, relay: RELAY, proposalId: 224, nonce, txHash: tx.hash,
      status: 'signed-hash-recorded-before-broadcast', deferredLevel6Hash: oldLevel6, preflight, request };
    save(); console.log(json({ broadcastingOnlyProposal: 224, txHash: tx.hash }));
    const sent = await p.broadcastTransaction(raw); assert.equal(sent.hash, tx.hash);
    const receipt = await p.waitForTransaction(tx.hash, 2, 180000);
    assert(receipt && receipt.status === 1, 'Repair failed or unconfirmed; no automatic retry');
    await verify();
  } finally { p.destroy(); }
}
if (require.main === module) main().catch(e => { console.error(String(e.shortMessage || e.message).replace(/https?:\/\/\S+/g, '[endpoint]')); process.exitCode = 1; });
module.exports = { boundedList, validateSigned, applicationStorage, applicationLogs };

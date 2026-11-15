// Deploy the approved restricted helper and submit two proposals only.
// Never approves, executes, changes owners, unpauses, or invokes the repair.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const E = require('ethers');
const { ABI, OWNERS, RUNTIME_HASH } = require('./lib/id1CancellationPlan');
const { repairFeeBudget } = require('./lib/repairFeeBudget');
const ROOT = path.resolve(__dirname, '../../..');
const GOV = '0x785cC854ce9e13CE1140cbFD7C08620713E1711d';
const OPERATOR = '0x884e48f9897E8633238747b608DD49dE12bF94df';
const HASH = '0x391bdf63a93a9ec64929f8ab3dacb79371054365a6ae6f336a22b3af80aa96f4';
const PAYLOAD = '0x9d90c584451bdbc4214260b02891790175ec2e2a64e26fb08f86278b2abd0b9b';
const JOURNAL = path.join(ROOT, 'tmp/repair224-relay-deployment.json');
const interface_ = new E.Interface([...ABI, 'function addOwner(address)', 'function removeOwner(address)', 'function isOwner(address) view returns(bool)']);
const json = data => JSON.stringify(data, (_, v) => typeof v === 'bigint' ? v.toString() : v, 2);
const read = file => JSON.parse(fs.readFileSync(path.join(ROOT, file), 'utf8'));
const same = (a, b) => assert.equal(a.toLowerCase(), b.toLowerCase());

function validateSigned(raw, expected) {
  const tx = E.Transaction.from(raw);
  same(tx.from, OPERATOR);
  assert.equal(tx.unsignedHash, E.Transaction.from(expected).unsignedHash, 'Signed request differs');
  assert.equal(tx.chainId, 137n); assert.equal(tx.type, 2); assert.equal(tx.value, 0n);
  assert(tx.gasLimit <= 20_000_000n && tx.maxFeePerGas <= E.parseUnits('450', 'gwei'));
  assert(E.getBytes(raw).length < 128 * 1024);
  return tx;
}

async function main() {
  const mode = process.env.REPAIR224_ACTION;
  assert(['CHECK', 'DEPLOY_AND_SUBMIT'].includes(mode), 'Explicit action required');
  assert(process.env.REPAIR_MAINNET_RPC, 'Explicit Polygon mainnet RPC required');
  const artifact = read('tmp/repair224-relay-candidate-artifact.json');
  const proof = read('tmp/repair224-relay-candidate-simulation.json');
  const code = '0x' + artifact.evm.deployedBytecode.object;
  assert.equal(E.keccak256(code), HASH); assert.equal(proof.runtimeHash, HASH);
  const source = fs.readFileSync(path.resolve(__dirname, '../contracts/governance/Repair224ExecutionRelay.sol'), 'utf8');
  assert.equal(crypto.createHash('sha256').update(source).digest('hex'), proof.sourceSha256);
  assert.equal(proof.chainId, 137); assert.equal(proof.identicalRepairEvents, 46);
  assert.equal(proof.identicalRepairStorage, true);
  assert.equal(proof.negative.length, 10); assert.equal(proof.governanceRehearsals.length, 2);
  assert(proof.governanceRehearsals.every(r => r.threshold === 3 && r.originalOwnersPreserved));
  const req = new E.FetchRequest(process.env.REPAIR_MAINNET_RPC); req.timeout = 60000;
  const p = new E.JsonRpcProvider(req, undefined, { batchMaxCount: 1, cacheTimeout: -1 }); p.pollingInterval = 4000;
  const journal = fs.existsSync(JOURNAL) ? JSON.parse(fs.readFileSync(JOURNAL, 'utf8')) : {
    chainId: 137, governance: GOV, operator: OPERATOR, runtimeHash: HASH,
    authorization: 'User explicitly approved restricted helper deployment and two founder proposals on 2026-11-15',
    maximumSpendWei: E.parseEther('12').toString(), transactions: [], approvalsSent: 0, executionsSent: 0,
  };
  const save = () => { fs.writeFileSync(JOURNAL + '.next', json(journal) + '\n'); fs.renameSync(JOURNAL + '.next', JOURNAL); };
  try {
    assert.equal((await p.getNetwork()).chainId, 137n);
    assert.equal(journal.chainId, 137); same(journal.governance, GOV); same(journal.operator, OPERATOR);
    assert.equal(journal.runtimeHash, HASH); assert.equal(journal.approvalsSent, 0); assert.equal(journal.executionsSent, 0);
    const g = new E.Contract(GOV, interface_, p), b = await p.getBlock('latest'), at = { blockTag: b.number };
    assert.equal(E.keccak256(await p.getCode(GOV, b.number)), RUNTIME_HASH);
    assert.deepEqual(Array.from(await g.getOwners(at)), OWNERS);
    assert.equal(await g.requiredConfirmations(at), 3n); assert.equal(await g.timelockDelay(at), 120n);
    assert.equal(await g.isProposalSubmitter(OPERATOR, at), true);
    const repair = await g.transactions(224, at);
    same(repair.to, '0xd952d21B114F54C1259470b1693893F4D0Dd50Ed');
    assert.equal(E.keccak256(repair.data), PAYLOAD); assert.equal(repair.value, 0n);
    assert(!repair.executed && !repair.cancelled && repair.confirmations >= 3n);
    assert(BigInt(b.timestamp) >= repair.executeAfter);
    assert(b.number >= proof.block && b.number - proof.block < 1800, 'Refresh mainnet rehearsal before release');
    for (const row of read('tmp/repair224-release-status-2026-11-15.json').paused) {
      const c = new E.Contract(row.address, ['function paused() view returns(bool)'], p);
      assert.equal(await c.paused(at), true, `Not paused: ${row.address}`);
    }
    for (let id = 225; id <= 256; id++) assert.equal((await g.transactions(id, at)).executed, false, `Dependent ${id} executed`);
    const nonce = await p.getTransactionCount(OPERATOR, 'latest');
    assert.equal(await p.getTransactionCount(OPERATOR, 'pending'), nonce, 'Pending operator transaction; inspect before continuing');
    const deployed = journal.transactions.find(t => t.kind === 'deploy');
    const relay = deployed?.address || E.getCreateAddress({ from: OPERATOR, nonce });
    same(relay, proof.simulationAddress);
    assert.equal(await g.isOwner(relay), false);
    journal.relay = relay; journal.originalOwners = OWNERS;
    const actions = ['addOwner', 'removeOwner'].map(name => ({ name, target: GOV, value: '0', data: interface_.encodeFunctionData(name, [relay]) }));
    const creation = '0x' + artifact.evm.bytecode.object;
    const calls = [{ kind: 'deploy', to: null, data: creation, address: relay }, ...actions.map(a => ({
      kind: a.name, to: GOV, data: interface_.encodeFunctionData('submitTransaction', [GOV, 0, a.data]), action: a,
    }))];
    let wallet;
    if (mode === 'DEPLOY_AND_SUBMIT') {
      const key = process.env.PRODUCTION_SUBMITTER_KEY || '';
      assert(/^(0x)?[0-9a-fA-F]{64}$/.test(key), 'Submitter key unavailable');
      wallet = new E.Wallet(key.startsWith('0x') ? key : '0x' + key); same(wallet.address, OPERATOR);
    }
    const estimates = [];
    for (const call of calls) {
      let row = journal.transactions.find(t => t.kind === call.kind);
      if (row) {
        assert.equal(row.dataHash, E.keccak256(call.data));
        if (call.to) same(row.to, call.to); else assert.equal(row.to, null);
        const receipt = await p.getTransactionReceipt(row.txHash);
        assert(receipt && receipt.status === 1, `Recorded transaction not confirmed: ${row.txHash}. No duplicate will be sent.`);
      } else {
        const request = { from: OPERATOR, ...(call.to ? { to: call.to } : {}), value: 0n, data: call.data };
        const gas = await p.estimateGas(request), gasLimit = (gas * 120n + 99n) / 100n;
        assert(gasLimit <= 20_000_000n, 'Unexpected transaction gas');
        const current = await p.getBlock('latest'), balance = await p.getBalance(OPERATOR);
        const quote = repairFeeBudget({ baseFeePerGas: current.baseFeePerGas, estimatedGas: gas, gasLimit, balanceWei: balance });
        const spent = journal.transactions.reduce((sum, t) => sum + BigInt(t.feeWei || 0), 0n);
        assert(quote.sufficientlyFunded && spent + quote.maxCostWei <= BigInt(journal.maximumSpendWei), 'Fee budget exceeded');
        estimates.push({ kind: call.kind, gas, gasLimit, expectedPOL: E.formatEther(quote.estimatedCostWei), maximumPOL: E.formatEther(quote.maxCostWei) });
        if (mode === 'CHECK') continue;
        const liveNonce = await p.getTransactionCount(OPERATOR, 'latest');
        assert.equal(liveNonce, await p.getTransactionCount(OPERATOR, 'pending'));
        if (call.kind === 'deploy') same(E.getCreateAddress({ from: OPERATOR, nonce: liveNonce }), relay);
        else assert.equal(await p.getCode(relay), code, 'Helper runtime not verified');
        const proposalId = call.kind === 'deploy' ? null : String(await g.getTransactionCount());
        const expected = { to: call.to, data: call.data, value: 0n, chainId: 137, type: 2, nonce: liveNonce, gasLimit,
          maxFeePerGas: quote.maxFeePerGas, maxPriorityFeePerGas: quote.maxPriorityFeePerGas };
        const raw = await wallet.signTransaction(expected), signed = validateSigned(raw, expected);
        row = { kind: call.kind, to: call.to, dataHash: E.keccak256(call.data), txHash: signed.hash, nonce: liveNonce,
          ...(call.address ? { address: call.address } : {}), ...(call.action ? { action: call.action, proposalId } : {}),
          gasLimit: String(gasLimit), maxFeePerGas: String(quote.maxFeePerGas), confirmed: false };
        journal.transactions.push(row); save();
        console.log(json({ broadcasting: call.kind, txHash: signed.hash, maximumPOL: E.formatEther(quote.maxCostWei) }));
        // The exact hash is persisted before broadcast; an ambiguous result stops, never signs another nonce.
        const sent = await p.broadcastTransaction(raw); assert.equal(sent.hash, signed.hash);
        const receipt = await p.waitForTransaction(sent.hash, 2, 180000);
        assert(receipt && receipt.status === 1, `Failed/unconfirmed: ${sent.hash}`);
      }
      if (mode === 'CHECK') continue;
      const receipt = await p.getTransactionReceipt(row.txHash);
      const mined = await p.getTransaction(row.txHash);
      same(receipt.from, OPERATOR); assert.equal(mined.chainId, 137n);
      assert.equal(E.keccak256(mined.data), row.dataHash); assert.equal(mined.value, 0n);
      if (call.kind === 'deploy') {
        same(receipt.contractAddress, relay); assert.equal(await p.getCode(relay), code);
        const helper = new E.Contract(relay, artifact.abi, p);
        same(await helper.GOVERNANCE(), GOV); same(await helper.OPERATOR(), OPERATOR);
        assert.equal(await helper.PROPOSAL_ID(), 224n); assert.equal(await helper.PAYLOAD_HASH(), PAYLOAD);
        assert.equal(await helper.executed(), false); assert.equal(await g.isOwner(relay), false);
      } else {
        const event = receipt.logs.filter(l => l.address.toLowerCase() === GOV.toLowerCase())
          .map(l => { try { return interface_.parseLog(l); } catch { return null; } }).find(l => l?.name === 'Submit');
        assert(event); assert.equal(String(event.args.txId), row.proposalId, 'Proposal queue changed');
        const actual = await g.transactions(event.args.txId);
        same(actual.to, GOV); assert.equal(actual.value, 0n); assert.equal(actual.data, call.action.data);
        assert(!actual.executed && !actual.cancelled); assert.equal(actual.confirmations, 0n);
        row.executeAfter = String(actual.executeAfter);
      }
      Object.assign(row, { confirmed: true, block: receipt.blockNumber, blockHash: receipt.blockHash,
        gasUsed: String(receipt.gasUsed), feeWei: String(receipt.gasUsed * receipt.gasPrice) }); save();
      console.log(json({ kind: row.kind, txHash: row.txHash, proposalId: row.proposalId, address: row.address,
        confirmed: true, feePOL: E.formatEther(row.feeWei) }));
    }
    if (mode === 'CHECK') {
      console.log(json({ status: 'read-only-deployment-preflight-passed', relay, block: b.number, estimates, writes: 0 })); return;
    }
    assert.equal(journal.transactions.length, 3); assert.equal((await g.transactions(224)).executed, false);
    assert.equal(await g.isOwner(relay), false); assert.deepEqual(Array.from(await g.getOwners()), OWNERS);
    journal.status = 'helper-deployed-two-proposals-submitted-awaiting-founder-authorization';
    journal.remainingPOL = E.formatEther(await p.getBalance(OPERATOR));
    journal.checkedAt = new Date().toISOString(); save();
    console.log(json({ status: journal.status, relay, proposals: journal.transactions.filter(t => t.proposalId).map(t => ({ id: t.proposalId, action: t.kind })),
      totalFeePOL: E.formatEther(journal.transactions.reduce((sum, t) => sum + BigInt(t.feeWei), 0n)), remainingPOL: journal.remainingPOL }));
  } finally { p.destroy(); }
}
if (require.main === module) main().catch(e => { console.error(String(e.shortMessage || e.message).replace(/https?:\/\/\S+/g, '[endpoint]')); process.exitCode = 1; });
module.exports = { validateSigned };

// Read-only mainnet release gate. No wallet, signer, or broadcast path.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const E = require('ethers');
const { ABI, OWNERS, RUNTIME_HASH } = require('./lib/id1CancellationPlan');
const { A, FP, engines } = require('./lib/combinedPlacementRepairPackage');
const { artifact } = require('./prepareCombinedPlacementRepair');
const ROOT = path.resolve(__dirname, '../../..');
const RELAY = '0x16F9ac40B06e2a17bc0CC145b211A176E8654906';
const HASH = '0x52511954b0232bd7d719a22aaa1277192a6b53e03f06514892ce44c3d51da1e4';
const IMPL = '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc';
const read = file => JSON.parse(fs.readFileSync(path.join(ROOT, file), 'utf8'));
const json = value => JSON.stringify(value, (_, v) => typeof v === 'bigint' ? v.toString() : v, 2);
const same = (a, b) => assert.equal(a.toLowerCase(), b.toLowerCase());

async function main() {
  assert(process.env.REPAIR_MAINNET_RPC, 'Explicit mainnet RPC required');
  const request = new E.FetchRequest(process.env.REPAIR_MAINNET_RPC); request.timeout = 120000;
  const p = new E.JsonRpcProvider(request, undefined, { batchMaxCount: 1, cacheTimeout: -1 });
  try {
    assert.equal((await p.getNetwork()).chainId, 137n);
    const block = await p.getBlock('latest'), at = { blockTag: block.number }, tag = E.toQuantity(block.number);
    const pkg = read('tmp/combined-placement-live-package.json');
    const deployments = read('staging-environment/docs/evidence/combined-repair-live-deployments-2026-11-14.json').deployments;
    const g = new E.Contract(A.governance, [...ABI, 'function isOwner(address) view returns(bool)',
      'function executeTransaction(uint256)', 'function removeOwner(address)', 'event Execute(uint256 indexed txId)'], p);
    assert.equal(E.keccak256(await p.getCode(A.governance, block.number)), RUNTIME_HASH);
    assert.deepEqual(Array.from(await g.getOwners(at)), OWNERS);
    assert.equal(await g.requiredConfirmations(at), 3n);
    assert.equal(await g.timelockDelay(at), 120n);
    assert.equal(await g.isOwner(RELAY, at), false);
    for (const id of [224, 257, 258]) {
      const tx = await g.transactions(id, at);
      assert(tx.executed && !tx.cancelled, `Proposal ${id} not completed`);
      if (id === 258) {
        same(tx.to, A.governance); assert.equal(tx.value, 0n);
        assert.equal(tx.data, g.interface.encodeFunctionData('removeOwner', [RELAY]));
      }
    }
    let removalLogs = [];
    const topics = g.interface.encodeFilterTopics('Execute', [258]);
    for (let end = block.number; end >= 97369660 && !removalLogs.length; end -= 2000) {
      removalLogs = await p.getLogs({ address: A.governance, topics, fromBlock: Math.max(97369660, end - 1999), toBlock: end });
    }
    assert.equal(removalLogs.length, 1, 'Expected one removal execution');
    const removalReceipt = await p.getTransactionReceipt(removalLogs[0].transactionHash);
    const removalTx = await p.getTransaction(removalReceipt.hash);
    assert.equal(removalReceipt.status, 1); same(removalTx.to, A.governance);
    assert(OWNERS.some(a => a.toLowerCase() === removalTx.from.toLowerCase()));
    assert.equal(removalTx.data, g.interface.encodeFunctionData('executeTransaction', [258]));
    const tx = await g.transactions(225, at), expected = pkg.actions[35];
    same(tx.to, expected.target); assert.equal(tx.value, 0n); assert.equal(tx.data, expected.data);
    assert.equal(E.keccak256(tx.data), HASH);
    assert(!tx.executed && !tx.cancelled && tx.confirmations >= 3n && tx.executeAfter <= BigInt(block.timestamp));
    for (let id = 226; id <= 256; id++) assert.equal((await g.transactions(id, at)).executed, false, `Unexpected later execution: ${id}`);
    for (const { address } of read('tmp/repair224-release-status-2026-11-15.json').paused) {
      assert.equal(await new E.Contract(address, ['function paused() view returns(bool)'], p).paused(at), true);
    }
    const executor = deployments.find(d => d.key === 'fp.executor');
    same(tx.to, executor.address);
    assert.equal(E.keccak256(await p.getCode(executor.address, block.number)), executor.runtimeHash);
    const expectedPositions = [], orbitStates = [], interfaces = new Map();
    const tupleType = 'tuple(address,address,bytes32,bytes32,uint256,uint40,uint8,bool)';
    const coder = E.AbiCoder.defaultAbiCoder();
    for (const [key, name, migrator] of engines) {
      const dep = deployments.find(d => d.key === `fp.${key}Migrator`);
      same(E.getAddress('0x' + (await p.getStorage(FP[key], IMPL, block.number)).slice(-40)), dep.address);
      assert.equal(E.keccak256(await p.getCode(dep.address, block.number)), dep.runtimeHash);
      const contract = new E.Contract(FP[key], artifact(migrator).abi, p);
      interfaces.set(FP[key].toLowerCase(), contract.interface);
      assert.equal(await contract.repairExecuted(at), false);
      for (const edit of pkg.freedomPlus.edits.find(e => e.name === name).edits) {
        const hash = await contract.repairStateHash(edit.account, edit.level, at);
        assert.equal(hash, edit.beforeHash, 'Approved pre-repair state changed');
        orbitStates.push({ orbit: FP[key], account: edit.account, level: edit.level, beforeHash: hash });
        for (const addition of edit.additions) {
          const before = await contract.positionAt(edit.account, edit.level, edit.cycle, addition.slot, at);
          assert.equal(before.participant, E.ZeroAddress, 'Destination is occupied');
          expectedPositions.push({ address: FP[key].toLowerCase(), account: edit.account, participant: addition.data[0],
            level: String(edit.level), cycle: String(edit.cycle), position: String(addition.slot),
            positionData: coder.encode([tupleType], [addition.data]), originalTransaction: addition.originalTransaction });
        }
      }
    }
    console.log('Bindings, approvals, 12 pauses, five orbit state hashes and 18 empty destinations verified.');
    const call = { from: OWNERS[0], to: A.governance, data: g.interface.encodeFunctionData('executeTransaction', [225]), value: '0x0' };
    const estimate = BigInt(await p.send('eth_estimateGas', [call, tag]));
    const gasLimit = estimate * 12000n / 10000n;
    assert(gasLimit < 32_000_000n, 'Normal execution exceeds conservative gas bound');
    call.gas = E.toQuantity(gasLimit);
    assert.equal(await p.send('eth_call', [call, tag]), '0x');
    const trace = await p.send('debug_traceCall', [call, tag, { tracer: 'callTracer', tracerConfig: { withLog: true } }]);
    const positions = [], orbitEvents = [], allLogs = [];
    function visit(frame) {
      assert(!frame.error, frame.revertReason || frame.error);
      assert(!frame.value || BigInt(frame.value) === 0n, 'Unexpected native transfer');
      for (const log of frame.logs || []) {
        assert.notEqual(log.topics[0], E.id('Transfer(address,address,uint256)'), 'Unexpected token transfer');
        allLogs.push(log);
        const iface = interfaces.get(log.address.toLowerCase());
        if (!iface) continue;
        const parsed = iface.parseLog(log), a = parsed?.args;
        if (parsed?.name === 'FreedomPlusHistoricalPositionRestored') positions.push({ address: log.address.toLowerCase(),
          account: a.account, participant: a.participant, level: String(a.level), cycle: String(a.cycle),
          position: String(a.position), positionData: a.positionData, originalTransaction: a.originalTransaction });
        if (parsed?.name === 'FreedomPlusHistoricalOrbitRestored') orbitEvents.push({ address: log.address, account: a.account,
          level: String(a.level), beforeHash: a.beforeHash, afterHash: a.afterHash, planHash: a.planHash });
      }
      for (const child of frame.calls || []) visit(child);
    }
    visit(trace);
    const sort = list => list.map(row => JSON.stringify(row).toLowerCase()).sort();
    assert.deepEqual(sort(positions), sort(expectedPositions)); assert.equal(positions.length, 18); assert.equal(orbitEvents.length, 5);
    const report = { status: 'read-only-preflight-passed-not-executed', chainId: 137, block: block.number,
      blockHash: block.hash, utc: new Date(block.timestamp * 1000).toISOString(), checkedAt: new Date().toISOString(),
      removal258: { tx: removalReceipt.hash, block: removalReceipt.blockNumber, status: removalReceipt.status,
        originalOwnersRestored: true, helperAuthorized: false, threshold: 3 }, owners: OWNERS,
      proposal225: { target: tx.to, payloadHash: HASH, confirmations: String(tx.confirmations), executed: false,
        estimate: String(estimate), gasLimit: String(gasLimit), simulatedGasUsed: String(BigInt(trace.gasUsed)),
        accessListRequired: false, stateOverridesUsed: false },
      all12AffectedContractsPaused: true, later226Through256Unexecuted: true, orbitStates,
      simulatedPositions: positions, simulatedOrbitEvents: orbitEvents, simulatedLogs: allLogs,
      paidAppearances: 16, zeroMoneyGenesisLinks: 2, tokenTransfers: 0, liveTransactionsSent: 0,
      nextStep: 'Founder executes existing proposal 225 only, then stop for mined receipt verification.' };
    const output = path.join(ROOT, 'staging-environment/docs/evidence/repair225-release-preflight-2026-11-15.json');
    fs.writeFileSync(output, json(report) + '\n');
    console.log(json({ status: report.status, block: report.block, removal258: report.removal258, proposal225: report.proposal225,
      positions: positions.length, liveTransactionsSent: 0 }));
  } finally { p.destroy(); }
}
if (require.main === module) main().catch(error => { console.error(error.shortMessage || error.message); process.exitCode = 1; });

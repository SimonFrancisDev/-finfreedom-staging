// Candidate evaluation only. State overrides exist solely inside debug_traceCall.
// No deployment, signature, proposal submission or persistent chain write.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { execFileSync } = require('node:child_process');
const E = require('ethers');
const ROOT = path.resolve(__dirname, '../../..');
const GOV = '0x785cC854ce9e13CE1140cbFD7C08620713E1711d';
const OPERATOR = '0x884e48f9897E8633238747b608DD49dE12bF94df';
const RELAY = '0x0000000000000000000000000000000000000224';
const GAS_LIMIT = 32_800_000; // Below Bor MaxTxGas (1 << 25); includes nested-call headroom.
const POL = '0x0000000000000000000000000000000000001010';
const FEE_EVENT = E.id('LogFeeTransfer(address,address,address,uint256,uint256,uint256,uint256,uint256)');
const sourceFile = path.resolve(__dirname, '../contracts/governance/Repair224ExecutionRelay.sol');
const govFile = path.resolve(__dirname, '../contracts/governance/SimpleMultiSig.sol');
const slot = n => E.toBeHex(n, 32);
function repairLogs(c, out = []) {
  assert(!c.error, c.revertReason || c.error);
  for (const l of c.logs || []) if (l.address.toLowerCase() !== RELAY &&
    !(l.address.toLowerCase() === POL && l.topics[0] === FEE_EVENT)) {
    out.push({ address: l.address, topics: l.topics, data: l.data });
  }
  for (const child of c.calls || []) repairLogs(child, out);
  return out;
}
function storage(diff) {
  return Object.fromEntries(['pre', 'post'].map(phase => [phase, Object.fromEntries(
    Object.entries(diff[phase]).filter(([a, v]) => ![POL, RELAY].includes(a.toLowerCase()) && v.storage)
      .map(([a, v]) => [a, v.storage]),
  )]));
}
async function main() {
  assert(process.env.REPAIR_MAINNET_RPC, 'Explicit mainnet RPC required');
  const compiler = path.join(process.env.LOCALAPPDATA, 'hardhat-nodejs/Cache/compilers-v2/windows-amd64/solc-windows-amd64-v0.8.24+commit.e11b9ed9.exe');
  assert(/0\.8\.24\+commit\.e11b9ed9/.test(execFileSync(compiler, ['--version'], { encoding: 'utf8' })));
  const source = fs.readFileSync(sourceFile, 'utf8');
  const input = { language: 'Solidity', sources: {
    'Repair224ExecutionRelay.sol': { content: source },
    'SimpleMultiSig.sol': { content: fs.readFileSync(govFile, 'utf8') },
  }, settings: { optimizer: { enabled: true, runs: 1 }, viaIR: true,
    outputSelection: { '*': { '*': ['abi', 'evm.bytecode.object', 'evm.deployedBytecode.object', 'storageLayout'] } } } };
  const compiled = JSON.parse(execFileSync(compiler, ['--standard-json'], { input: JSON.stringify(input), encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 }));
  assert(!(compiled.errors || []).some(e => e.severity === 'error'), JSON.stringify(compiled.errors));
  const artifact = compiled.contracts['Repair224ExecutionRelay.sol'].Repair224ExecutionRelay;
  const layout = compiled.contracts['SimpleMultiSig.sol'].SimpleMultiSig.storageLayout;
  const req = new E.FetchRequest(process.env.REPAIR_MAINNET_RPC); req.timeout = 120000;
  const p = new E.JsonRpcProvider(req, undefined, { batchMaxCount: 1, cacheTimeout: -1 });
  try {
    assert.equal((await p.getNetwork()).chainId, 137n);
    const b = await p.getBlock('latest'); const at = E.toQuantity(b.number);
    const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'Fin-Freedom-Web2 - Copy/src/constants/repairProposalManifest.json')));
    const g = new E.Contract(GOV, compiled.contracts['SimpleMultiSig.sol'].SimpleMultiSig.abi, p);
    const tx = await g.transactions(224, { blockTag: b.number });
    assert.equal(tx.data, manifest.actions[34].data); assert.equal(tx.to.toLowerCase(), manifest.actions[34].target.toLowerCase());
    assert(!tx.executed && !tx.cancelled); assert.equal(tx.confirmations, 3n);
    assert.equal(await p.getCode(RELAY, b.number), '0x');
    const createdCode = await p.send('eth_call', [{ from: OPERATOR,
      data: '0x' + artifact.evm.bytecode.object, gas: E.toQuantity(20_000_000) }, at]);
    assert.equal(createdCode, '0x' + artifact.evm.deployedBytecode.object, 'Constructor binding failed');
    console.log('Constructor binding checked; no contract deployed.');
    const owners = await g.getOwners({ blockTag: b.number });
    const ownerSlot = BigInt(layout.storage.find(s => s.label === 'isOwner').slot);
    const ownersSlot = BigInt(layout.storage.find(s => s.label === 'owners').slot);
    const ownerKey = E.keccak256(E.AbiCoder.defaultAbiCoder().encode(['address', 'uint256'], [RELAY, ownerSlot]));
    const arrayKey = slot(BigInt(E.keccak256(slot(ownersSlot))) + BigInt(owners.length));
    const overrides = {
      [RELAY]: { code: '0x' + artifact.evm.deployedBytecode.object, state: { [slot(0)]: slot(0) } },
      [GOV]: { stateDiff: { [ownerKey]: slot(1), [slot(ownersSlot)]: slot(owners.length + 1), [arrayKey]: E.zeroPadValue(RELAY, 32) } },
    };
    const data = new E.Interface(artifact.abi).encodeFunctionData('execute');
    const request = { from: OPERATOR, to: RELAY, data, value: '0x0', gas: E.toQuantity(50_000_000) };
    // prestateTracer omits zero-valued storage; it is NOT a complete access list.
    // Discover the original, already-approved call, then include relay-specific reads.
    const discovered = await p.send('eth_createAccessList', [{
      from: '0x04eaa54e7896C24aF2622b804Bf35E4C662bf12f', to: GOV,
      data: g.interface.encodeFunctionData('executeTransaction', [224]), gas: E.toQuantity(50_000_000),
    }, at]);
    assert(!discovered.error, discovered.error);
    console.log('Complete access list discovered.');
    const list = discovered.accessList.map(a => ({ address: a.address, storageKeys: [...a.storageKeys] }));
    const govEntry = list.find(a => a.address.toLowerCase() === GOV.toLowerCase());
    assert(govEntry); govEntry.storageKeys = [...new Set([...govEntry.storageKeys, ownerKey])];
    list.push({ address: RELAY, storageKeys: [slot(0)] });
    for (const entry of list) entry.storageKeys.sort();
    list.sort((a, c) => a.address.toLowerCase() === GOV.toLowerCase() ? -1 : c.address.toLowerCase() === GOV.toLowerCase() ? 1 : a.address.localeCompare(c.address));
    let remaining = 3900;
    request.accessList = list.map(a => { const storageKeys = a.storageKeys.slice(0, remaining); remaining -= storageKeys.length; return { address: a.address, storageKeys }; }).filter(a => a.storageKeys.length);
    assert.equal(request.accessList.reduce((n, a) => n + a.storageKeys.length, 0), 3900);
    request.gas = E.toQuantity(GAS_LIMIT);
    const fees = await p.getFeeData();
    const packet = E.Transaction.from({ chainId: 137, type: 2, nonce: await p.getTransactionCount(OPERATOR, b.number),
      to: RELAY, data, value: 0, gasLimit: GAS_LIMIT, maxFeePerGas: fees.maxFeePerGas,
      maxPriorityFeePerGas: fees.maxPriorityFeePerGas, accessList: request.accessList });
    const packetBytes = E.getBytes(packet.unsignedSerialized).length + 128;
    assert(packetBytes < 128 * 1024, 'Packet too large');
    const trace = await p.send('debug_traceCall', [request, at, { tracer: 'callTracer', tracerConfig: { withLog: true }, stateOverrides: overrides }]);
    if (trace.error) fs.writeFileSync(path.join(ROOT, 'tmp/repair224-relay-candidate-failed-trace.json'), JSON.stringify(trace, null, 2));
    const logs = repairLogs(trace); const gas = Number(BigInt(trace.gasUsed));
    assert(GAS_LIMIT < 33_554_432 && gas < GAS_LIMIT, 'Gas headroom exhausted');
    const baseline = JSON.parse(fs.readFileSync(path.join(ROOT, 'tmp/combined-repair-224-access-list-equivalence.json')));
    assert.deepEqual(logs, baseline.events.map(({ address, topics, data }) => ({ address, topics, data })), 'Repair event payloads changed');
    const diff = await p.send('debug_traceCall', [request, at, { tracer: 'prestateTracer', tracerConfig: { diffMode: true }, stateOverrides: overrides }]);
    assert.deepEqual(storage(diff), baseline.storage, 'Repair storage changed');
    assert.equal(BigInt(diff.post[RELAY].storage[slot(0)]), 1n);
    const cases = [
      ['wrong operator', { ...request, from: owners[0] }, overrides],
      ['not authorized owner', request, { ...overrides, [GOV]: { stateDiff: { ...overrides[GOV].stateDiff, [ownerKey]: slot(0) } } }],
      ['relay already used', request, { ...overrides, [RELAY]: { ...overrides[RELAY], state: { [slot(0)]: slot(1) } } }],
      ['arbitrary governance selector', { ...request, data: g.interface.encodeFunctionData('approveTransaction', [225]) }, overrides],
      ['native value attached', { ...request, value: '0x1' }, overrides],
      ['governance code mismatch', request, { ...overrides, [GOV]: { ...overrides[GOV], code: '0x00' } }],
    ];
    const negative = [];
    for (const [name, call, stateOverrides] of cases) {
      const result = await p.send('debug_traceCall', [call, at, { tracer: 'callTracer', stateOverrides }]);
      assert(result.error, `${name} did not revert`); negative.push({ name, error: result.error, reason: result.revertReason || null });
    }
    const report = { status: 'candidate-only-read-only-state-override-simulation', chainId: 137,
      block: b.number, utc: new Date(b.timestamp * 1000).toISOString(), syntheticAddress: RELAY,
      runtimeHash: E.keccak256('0x' + artifact.evm.deployedBytecode.object),
      sourceSha256: crypto.createHash('sha256').update(source).digest('hex'), compiler: '0.8.24+commit.e11b9ed9',
      gasUsed: gas, gasLimit: GAS_LIMIT, protocolMaxTxGas: 33554432, headroom: GAS_LIMIT - gas, accessListKeys: 3900,
      maximumPacketBytes: packetBytes, identicalRepairEvents: logs.length, identicalRepairStorage: true,
      negative, requiresExplicitGovernanceApproval: true, deployed: false, liveWrites: 0 };
    fs.writeFileSync(path.join(ROOT, 'tmp/repair224-relay-candidate-simulation.json'), JSON.stringify(report, null, 2) + '\n');
    fs.writeFileSync(path.join(ROOT, 'tmp/repair224-relay-candidate-artifact.json'), JSON.stringify(artifact, null, 2) + '\n');
    console.log(JSON.stringify(report, null, 2));
  } finally { p.destroy(); }
}
if (require.main === module) main().catch(e => { console.error(e.shortMessage || e.message); process.exitCode = 1; });

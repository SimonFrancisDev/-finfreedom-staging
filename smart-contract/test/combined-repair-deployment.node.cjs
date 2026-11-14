const { test } = require('node:test');
const assert = require('node:assert/strict');
const { ethers: E } = require('ethers');
const fs = require('node:fs');
const path = require('node:path');
const { validatePackage, validateCreation } = require('../scripts/deployCombinedPlacementRepair');
const { artifact } = require('../scripts/prepareCombinedPlacementRepair');
const { A, FP, buildCombinedPackage, omitVerifiedProxyApprovals } = require('../scripts/lib/combinedPlacementRepairPackage');
const read = name => JSON.parse(fs.readFileSync(path.join(__dirname, '../../docs/evidence', name), 'utf8'));
const input = read('combined-placement-package-inputs-2026-11-13.json');
const pkg = omitVerifiedProxyApprovals(buildCombinedPackage(
  read('id1-alternative-repair-rehearsal-2026-11-13.json'), input.previous,
  read('freedom-plus-historical-repair-rehearsal-2026-11-13.json'), input.audit,
  read('placement-payment-correction-table-2026-11-13.json'), 353), {
  chainId: 137, block: 97292909, blockHash: '0xf0d536a62d1203d84f7aeaddf7da01df7a6559b2cf5f7e0c063b692770db5525',
  proxies: ['p39', 'p14', 'p12', 'p6', 'router'].map(key => ({ key, address: FP[key], alreadyApproved: key === 'router' })),
});
for (const d of pkg.deployments) Object.assign(d, { estimatedGas: '100', gasLimit: '120',
  creationBytecodeHash: E.keccak256(artifact(d.name).bytecode), runtimeTemplateHash: E.keccak256(artifact(d.name).deployedBytecode) });
for (const action of pkg.actions) Object.assign(action, { estimatedSubmissionGas: '100', submissionGasLimit: '120' });

test('accepts the verified combined package and rejects altered calls, constructor chain or bytecode', () => {
  validatePackage(pkg);
  for (const mutate of [p => p.chainId = 80002, p => p.actions[0].data = '0x',
    p => p.deployments[0].args[3] = 80002, p => p.deployments[0].address = A.id1,
    p => p.deployments[0].creationBytecodeHash = E.ZeroHash]) {
    const copy = structuredClone(pkg); mutate(copy); assert.throws(() => validatePackage(copy));
  }
});

test('only exact zero-value mainnet creations with bounded fees and nonce can be sent', () => {
  const item = pkg.deployments[0];
  const tx = { from: A.submitter, chainId: 137n, type: 2, to: null, value: 0n,
    nonce: item.nonce, data: '0x1234', maxPriorityFeePerGas: E.parseUnits('25', 'gwei'),
    maxFeePerGas: E.parseUnits('300', 'gwei'), gasLimit: BigInt(item.gasLimit) };
  validateCreation(tx, item, tx.data);
  for (const change of [{ to: A.governance }, { value: 1n }, { nonce: tx.nonce + 1 },
    { chainId: 80002n }, { from: A.id1 }, { data: '0x5678' },
    { maxFeePerGas: E.parseUnits('451', 'gwei') }, { gasLimit: tx.gasLimit + 1n }]) {
    assert.throws(() => validateCreation({ ...tx, ...change }, item, tx.data));
  }
});

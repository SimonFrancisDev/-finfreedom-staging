const { test } = require('node:test');
const assert = require('node:assert/strict');
const { ethers: E } = require('ethers');
const { A } = require('../scripts/lib/combinedPlacementRepairPackage');
const { iface } = require('../scripts/lib/id1CancellationPlan');
const { validateSubmission, validateProposal } = require('../scripts/submitCombinedPlacementRepair');
const action = { target: A.p4, value: '0', data: '0x8456cb59' };
const tx = { from: A.submitter, to: A.governance, type: 2, chainId: 137n, value: 0n, nonce: 364,
  data: iface.encodeFunctionData('submitTransaction', [action.target, 0n, action.data]),
  gasLimit: 200000n, maxFeePerGas: E.parseUnits('320', 'gwei'), maxPriorityFeePerGas: E.parseUnits('25', 'gwei') };

test('only exact mainnet proposal submission is permitted, never direct pause/upgrade/execute or value', () => {
  validateSubmission(tx, action, 364, 200000n);
  for (const change of [{ to: A.p4 }, { from: A.id1 }, { chainId: 80002n }, { value: 1n },
    { nonce: 365 }, { data: action.data }, { gasLimit: 200001n },
    { data: new E.Interface(['function executeTransaction(uint256)']).encodeFunctionData('executeTransaction', [190]) },
    { data: new E.Interface(['function approveTransaction(uint256)']).encodeFunctionData('approveTransaction', [190]) },
    { maxFeePerGas: E.parseUnits('451', 'gwei') }, { maxPriorityFeePerGas: E.parseUnits('1', 'gwei') }]) {
    assert.throws(() => validateSubmission({ ...tx, ...change }, action, 364, 200000n));
  }
});

test('receipt reconciliation must match target, zero value, exact calldata and pending state', () => {
  const proposal = { to: action.target, value: 0n, data: action.data, executed: false, cancelled: false };
  validateProposal(proposal, action);
  for (const change of [{ to: A.manager }, { value: 1n }, { data: '0x' }, { executed: true }, { cancelled: true }]) {
    assert.throws(() => validateProposal({ ...proposal, ...change }, action));
  }
});

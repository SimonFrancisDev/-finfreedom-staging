const { test } = require('node:test');
const assert = require('node:assert/strict');
const E = require('ethers');
const { boundedList, applicationLogs, applicationStorage } = require('../scripts/executeRepair224Relay');
const GOV = '0x785cc854ce9e13ce1140cbfd7c08620713e1711d';
const HELPER = '0x16f9ac40b06e2a17bc0cc145b211a176e8654906';
const APP = '0x0000000000000000000000000000000000000001';
const POL = '0x0000000000000000000000000000000000001010';

test('bounded access list is deterministic, complete to its exact key budget and does not mutate discovery', () => {
  const discovery = [{ address: APP, storageKeys: Array.from({ length: 4000 }, (_, n) => E.toBeHex(n, 32)) },
    { address: GOV, storageKeys: [E.toBeHex(9, 32)] }];
  const before = JSON.stringify(discovery), list = boundedList(discovery);
  assert.equal(list.reduce((n, e) => n + e.storageKeys.length, 0), 3900);
  assert.equal(list[0].address, GOV);
  assert.deepEqual(boundedList(discovery), list);
  assert.equal(JSON.stringify(discovery), before);
  assert.throws(() => boundedList([{ address: GOV, storageKeys: [] }]));
});

test('repair trace rejects any revert, native transfer or token Transfer event', () => {
  assert.throws(() => applicationLogs({ error: 'execution reverted' }));
  assert.throws(() => applicationLogs({ value: '0x1' }));
  assert.throws(() => applicationLogs({ calls: [{ error: 'out of gas' }] }));
  assert.throws(() => applicationLogs({ logs: [{ address: APP, topics: [E.id('Transfer(address,address,uint256)')], data: '0x' }] }));
});

test('only helper completion and Polygon gas event are excluded from application event equivalence', () => {
  const event = { address: APP, topics: [E.id('Repair()')], data: '0x12' };
  assert.deepEqual(applicationLogs({ value: '0x0', logs: [
    { address: HELPER, topics: [E.id('RepairProposalExecuted(uint256)')], data: '0x' },
    { address: POL, topics: [E.id('LogFeeTransfer(address,address,address,uint256,uint256,uint256,uint256,uint256)')], data: '0x' },
  ], calls: [{ logs: [event] }] }), [event]);
});

test('storage comparison retains every application account including unknown contracts', () => {
  const entry = { storage: { '0x1': '0x2' } };
  const diff = { pre: { [APP]: entry, [HELPER]: entry, [POL]: entry }, post: { [APP]: entry, [HELPER]: entry, [POL]: entry } };
  assert.deepEqual(applicationStorage(diff), { pre: { [APP]: entry.storage }, post: { [APP]: entry.storage } });
});

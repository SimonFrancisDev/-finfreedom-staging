const { test } = require('node:test');
const assert = require('node:assert/strict');
const { repairFeeBudget, MINIMUM_TIP, MAXIMUM_FEE } = require('../scripts/lib/repairFeeBudget');
const observed = { baseFeePerGas: 255613484257n, estimatedGas: 66044201n,
  gasLimit: 79253072n, balanceWei: 11681034136955361768n };

test('distinguishes expected fee from capped reserve using the fresh mainnet audit', () => {
  const quote = repairFeeBudget(observed);
  assert.equal(quote.estimatedCostWei, 18532893357579643657n);
  assert.equal(quote.maxCostWei, 26291111446436616848n);
  assert.equal(quote.cappedShortfallWei, 14610077309481255080n);
  assert.equal(quote.sufficientlyFunded, false);
  assert.equal(quote.fitsCurrentBaseFee, true);
  assert.equal(quote.affordableAverageFeePerGas, 176866915794n);
});
test('15 additional POL covers this snapshot, not an unconditional future guarantee', () => {
  const balanceWei = observed.balanceWei + 15n * 10n ** 18n;
  assert.equal(repairFeeBudget({ ...observed, balanceWei }).sufficientlyFunded, true);
  assert.equal(repairFeeBudget({ ...observed, balanceWei, baseFeePerGas: 300000000000n }).sufficientlyFunded, false);
});
test('available balance can suffice at lower gas prices without another top-up', () => {
  const quote = repairFeeBudget({ ...observed, baseFeePerGas: 100000000000n });
  assert.equal(quote.sufficientlyFunded, true);
  assert.equal(quote.cappedShortfallWei, 0n);
});
test('enforces fee ceiling and never treats an unmineable quote as funded', () => {
  const quote = repairFeeBudget({ ...observed, baseFeePerGas: MAXIMUM_FEE,
    balanceWei: 100n * 10n ** 18n });
  assert.equal(quote.maxFeePerGas, MAXIMUM_FEE);
  assert.equal(quote.fitsCurrentBaseFee, false);
  assert.equal(quote.sufficientlyFunded, false);
});
test('rejects unsafe numeric inputs, low tips and undersized gas limits', () => {
  assert.throws(() => repairFeeBudget({ ...observed, balanceWei: -1n }));
  assert.throws(() => repairFeeBudget({ ...observed, estimatedGas: 0n }));
  assert.throws(() => repairFeeBudget({ ...observed, priorityFeePerGas: MINIMUM_TIP - 1n }));
  assert.throws(() => repairFeeBudget({ ...observed, gasLimit: observed.estimatedGas - 1n }));
  assert.throws(() => repairFeeBudget({ ...observed, baseFeePerGas: Number(observed.baseFeePerGas) }));
});

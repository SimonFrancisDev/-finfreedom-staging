const assert = require('node:assert/strict');
const GWEI = 1_000_000_000n;
const MINIMUM_TIP = 25n * GWEI;
const MAXIMUM_FEE = 450n * GWEI;

// Separate expected expenditure from the reserved upper bound. Never change calldata.
function repairFeeBudget({ baseFeePerGas, estimatedGas, gasLimit, balanceWei,
  priorityFeePerGas = MINIMUM_TIP }) {
  for (const value of [baseFeePerGas, estimatedGas, gasLimit, balanceWei, priorityFeePerGas]) {
    assert(typeof value === 'bigint' && value >= 0n, 'Nonnegative bigint fee inputs required');
  }
  assert(estimatedGas > 0n && gasLimit >= estimatedGas, 'Gas limit must cover the estimate');
  assert(priorityFeePerGas >= MINIMUM_TIP, 'Tip below the reviewed Polygon minimum');
  const desired = (baseFeePerGas * 120n + 99n) / 100n + priorityFeePerGas;
  const maxFeePerGas = desired < MAXIMUM_FEE ? desired : MAXIMUM_FEE;
  const fitsCurrentBaseFee = baseFeePerGas + priorityFeePerGas <= maxFeePerGas;
  const estimatedCostWei = estimatedGas * (baseFeePerGas + priorityFeePerGas);
  const maxCostWei = gasLimit * maxFeePerGas;
  return {
    policy: '25-gwei-default-tip-20-percent-base-fee-headroom-450-gwei-ceiling',
    maxFeePerGas, maxPriorityFeePerGas: priorityFeePerGas,
    estimatedCostWei, maxCostWei, fitsCurrentBaseFee,
    sufficientlyFunded: fitsCurrentBaseFee && balanceWei >= maxCostWei,
    estimatedShortfallWei: estimatedCostWei > balanceWei ? estimatedCostWei - balanceWei : 0n,
    cappedShortfallWei: maxCostWei > balanceWei ? maxCostWei - balanceWei : 0n,
    affordableAverageFeePerGas: balanceWei / estimatedGas,
    affordableCapPerGas: balanceWei / gasLimit,
  };
}

module.exports = { repairFeeBudget, MINIMUM_TIP, MAXIMUM_FEE };

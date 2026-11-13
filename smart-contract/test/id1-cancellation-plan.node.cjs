const { test } = require("node:test");
const assert = require("node:assert/strict");
const { A } = require("../scripts/lib/id1ProductionPackage");
const { iface, cancellation, submissionData, verifyOriginal, verifyCancellation, activeCancellation, feeCaps } = require("../scripts/lib/id1CancellationPlan");

test("all 30 submissions target only zero-value cancellation of the withdrawn IDs", () => {
  for (let id = 130; id <= 159; id++) {
    const call = iface.decodeFunctionData("submitTransaction", submissionData(id));
    assert.equal(call[0], A.governance);
    assert.equal(call[1], 0n);
    assert.equal(iface.decodeFunctionData("cancelTransaction", call[2])[0], BigInt(id));
  }
  for (const id of [129, 160, -1, 130.5, "130"]) assert.throws(() => cancellation(id));
});

test("changed original payloads and already executed originals stop the process", () => {
  const expected = { target: A.governance, value: "0", data: "0x1234" };
  const actual = { to: A.governance, value: 0n, data: "0x1234", executed: false };
  verifyOriginal(actual, expected, 130);
  for (const change of [{ executed: true }, { value: 1n }, { to: A.usdt }, { data: "0x1235" }]) {
    assert.throws(() => verifyOriginal({ ...actual, ...change }, expected, 130));
  }
});

test("existing pending cancellation is reused; duplicates and wrong payment/target fail", () => {
  const call = cancellation(130);
  const row = { id: 160, to: call.target, value: 0n, data: call.data, executed: false, cancelled: false };
  verifyCancellation(row, 130);
  assert.equal(activeCancellation([row], 130).id, 160);
  assert.equal(activeCancellation([{ ...row, cancelled: true }], 130), undefined);
  assert.equal(activeCancellation([{ ...row, executed: true }], 130), undefined);
  assert.equal(activeCancellation([row], 131), undefined);
  assert.throws(() => activeCancellation([row, { ...row, id: 161 }], 130));
  for (const change of [{ value: 1n }, { to: A.usdt }, { data: cancellation(131).data }]) {
    assert.throws(() => verifyCancellation({ ...row, ...change }, 130));
  }
});

test("fee headroom never exceeds the ceiling and unaffordable current fees stop submission", () => {
  const gwei = 10n ** 9n;
  assert.deepEqual(feeCaps(255n * gwei, 393n * gwei, 25n * gwei), { tip: 30n * gwei, maxFee: 450n * gwei });
  assert.deepEqual(feeCaps(100n * gwei, 200n * gwei, 25n * gwei), { tip: 30n * gwei, maxFee: 230n * gwei });
  assert.throws(() => feeCaps(421n * gwei, 900n * gwei, 25n * gwei));
});

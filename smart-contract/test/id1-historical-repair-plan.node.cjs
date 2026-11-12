const { test } = require("node:test");
const assert = require("node:assert/strict");
const { ethers: E } = require("ethers");
const { buildOrbitEdit, normalizeArrivals, encodeOrbitPlan, encodeParentPlan, ORBIT_PLAN, PARENT_PLAN, plain } = require("../scripts/lib/id1HistoricalRepairPlan");
const A = {
  id1: "0x0000000000000000000000000000000000000001",
  parent: "0x0000000000000000000000000000000000000002",
  sofia: "0x0000000000000000000000000000000000000003",
  sabina: "0x0000000000000000000000000000000000000004",
};
const empty = () => [[E.ZeroAddress, 0n, 0n, E.ZeroAddress, false], E.ZeroAddress, 0n, 0n, false,
  [false, 0n, 0n, false, false, 0n, 0n, 0n, 0n, 0n, E.ZeroAddress, E.ZeroAddress]];
const filled = (wallet, time = 1n) => [[wallet, 1280000000n, time, A.id1, true], E.ZeroAddress, 0n, time, false,
  [true, 1n, 0n, false, true, 1152000000n, 0n, 0n, 0n, 0n, E.ZeroAddress, E.ZeroAddress]];

test("L8 inserts Sofia, moves Sabina, preserves unrelated slot and historical payment", () => {
  const slots = Array.from({ length: 12 }, empty);
  slots[0] = filled(A.parent);
  slots[1] = filled(A.id1, 2n);
  slots[2] = filled(A.sabina, 3n);
  slots[4] = filled(A.parent, 4n);
  const original = plain(slots);
  const plan = buildOrbitEdit(A.id1, 8, E.ZeroHash, slots, A);
  assert.deepEqual(slots, original, "Input must not be modified");
  assert.equal(plan[3][2][0][0], A.sofia);
  assert.equal(plan[3][3][0][0], A.sabina);
  assert.deepEqual(plan[3][3][5], original[2][5]);
  assert.deepEqual(plan[3][4][0], original[4][0]);
  assert.deepEqual(plan[3][4][5], original[4][5]);
  assert.equal(plan[4], 0, "No ancestry-only slot in ID1's orbit");
  assert.equal(E.AbiCoder.defaultAbiCoder().decode([ORBIT_PLAN], encodeOrbitPlan([plan]))[0][0].slots[2].position.user, A.sofia);
});

test("L9 restores chronological root positions without changing actual old payout snapshots", () => {
  const slots = Array.from({ length: 39 }, empty);
  slots[0] = filled(A.parent);
  slots[1] = filled(A.sabina, 3n);
  const plan = buildOrbitEdit(A.id1, 9, E.ZeroHash, slots, A);
  assert.equal(plan[3][1][0][0], A.sofia);
  assert.equal(plan[3][2][0][0], A.sabina);
  assert.deepEqual(plan[3][2][5], slots[1][5]);
});

test("Rejects changed destination occupancy and nonempty beneficiary orbit", () => {
  const slots = Array.from({ length: 12 }, empty);
  slots[0] = filled(A.parent);
  slots[2] = filled(A.sabina);
  slots[3] = filled(A.sofia);
  assert.throws(() => buildOrbitEdit(A.id1, 8, E.ZeroHash, slots, A), /no longer empty/);
  assert.throws(() => buildOrbitEdit(A.parent, 8, E.ZeroHash, slots, A), /no longer empty/);
});

test("Restored ancestry preserves activation identity without claiming a payment or earnings", () => {
  const source = filled(A.sabina, 123n);
  source[3] = 1132n;
  const original = plain(source);
  const plan = buildOrbitEdit(A.parent, 8, E.ZeroHash, Array.from({ length: 12 }, empty), A,
    { sabinaLevel8Source: source });
  assert.deepEqual(source, original);
  assert.equal(plan[4], 1);
  const restored = plan[3][0];
  assert.deepEqual(restored[0], [A.sabina, 0n, 123n, A.id1, true]);
  assert.equal(restored[3], 1132n);
  assert.equal(restored[4], true);
  assert.deepEqual(restored[5], [true, 1n, 1n, false, false, 0n, 0n, 0n, 0n, 0n, E.ZeroAddress, E.ZeroAddress]);
  const decoded = E.AbiCoder.defaultAbiCoder().decode([ORBIT_PLAN], encodeOrbitPlan([plan]))[0][0];
  assert.equal(decoded.ancestryOnlyPosition, 1n);
  assert.equal(decoded.slots[0].position.amount, 0n);
  assert.equal(decoded.slots[0].rule.toOwner, 0n);
});

test("Ancestry repair rejects absent or mismatched historical activation evidence", () => {
  for (const source of [undefined, filled(A.sofia), filled(A.sabina, 0n)]) {
    assert.throws(() => buildOrbitEdit(A.parent, 8, E.ZeroHash, Array.from({ length: 12 }, empty), A,
      { sabinaLevel8Source: source }), /verified original level-8 placement/);
  }
  const source = filled(A.sabina);
  source[3] = 0n;
  assert.throws(() => buildOrbitEdit(A.parent, 8, E.ZeroHash, Array.from({ length: 12 }, empty), A,
    { sabinaLevel8Source: source }), /verified original level-8 placement/);
});

test("Arrival normalization is per ring, deterministic, leaves historical rules unchanged", () => {
  const slots = Array.from({ length: 39 }, empty);
  for (const [index, timestamp] of [[0, 5n], [1, 1n], [3, 10n], [4, 7n], [12, 2n], [13, 3n]]) slots[index] = filled(A.parent, timestamp);
  normalizeArrivals(slots, 39);
  assert.deepEqual([0, 1, 3, 4, 12, 13].map((i) => slots[i][2]), [2n, 1n, 2n, 1n, 1n, 2n]);
  assert(slots.filter((s) => s[0][0] !== E.ZeroAddress).every((s) => s[5][2] === 0n));
});

test("Parent changes affect L8/L9 placement, never alter permanent sponsor", () => {
  const rows = E.AbiCoder.defaultAbiCoder().decode([PARENT_PLAN], encodeParentPlan(A))[0];
  assert.equal(rows.length, 4);
  assert.equal(rows[0].sponsor, A.sabina);
  assert.equal(rows[0].correctedParent, A.id1);
  assert.equal(rows[2].sponsor, E.ZeroAddress);
  assert.equal(rows[2].previousParent, A.id1);
  assert.equal(rows[2].correctedParent, A.parent);
});

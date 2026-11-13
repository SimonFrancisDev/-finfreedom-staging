const { test } = require("node:test");
const assert = require("node:assert/strict");
const { ethers: E } = require("ethers");
const { buildOrbitEdit, encodeParentPlan, PARENT_PLAN, plain, ACTIVATIONS } = require("../scripts/lib/id1AlternativeRepairPlan");
const A = { id1: E.getAddress(E.toBeHex(1, 20)), parent: E.getAddress(E.toBeHex(2, 20)),
  sofia: E.getAddress(E.toBeHex(3, 20)), sabina: E.getAddress(E.toBeHex(4, 20)) };
const empty = () => [[E.ZeroAddress, 0n, 0n, E.ZeroAddress, false], E.ZeroAddress, 0n, 0n, false,
  [false, 0n, 0n, false, false, 0n, 0n, 0n, 0n, 0n, E.ZeroAddress, E.ZeroAddress]];
const filled = (user, id = 1132n) => [[user, 1280000000n, 1793705170n, A.id1, true], E.ZeroAddress, 0n, id, false,
  [true, 1n, 0n, false, true, 1152000000n, 0n, 0n, 0n, 0n, E.ZeroAddress, E.ZeroAddress]];
const root = level => {
  const slots = Array.from({ length: level === 8 ? 12 : 39 }, empty);
  slots[0] = filled(A.parent, 97n);
  slots[level === 8 ? 2 : 1] = filled(A.sabina);
  return slots;
};

test("L8 preserves Sabina at 3 and adds Sofia at 6, never under the unrelated parent", () => {
  const slots = root(8);
  slots[4] = filled(A.parent, 650n);
  const before = plain(slots);
  const result = buildOrbitEdit(A.id1, 8, E.ZeroHash, slots, A)[3];
  assert.deepEqual(slots, before);
  assert.deepEqual(result[2][0], before[2][0]);
  assert.deepEqual(result[2][5], before[2][5]);
  assert.equal(result[5][0][0], A.sofia);
  assert.equal(result[5][3], 1126n);
  assert.equal(result[5][5][1], 2n);
  assert.equal(result[5][5][5], 1152000000n, "Retain actual past founders payment");
  assert.equal(result[5][5][6], 0n, "No fabricated historical payment to Sabina");
  assert.equal(result[3][0][0], E.ZeroAddress);
  assert.deepEqual(result[4][0], before[4][0]);
  assert.deepEqual(result[4][5], before[4][5]);
});

test("L9 preserves Sabina at 2 and inserts Sofia at 3 with original activation identity", () => {
  const slots = root(9);
  const result = buildOrbitEdit(A.id1, 9, E.ZeroHash, slots, A)[3];
  assert.deepEqual(result[1][0], slots[1][0]);
  assert.deepEqual(result[1][5], slots[1][5]);
  assert.equal(result[2][0][0], A.sofia);
  assert.equal(result[2][3], 1127n);
  assert.equal(result[2][5][5], 2304000000n);
});

test("Sabina's L8 ancestry link has no payment, escrow, reserve or invented earnings", () => {
  const result = buildOrbitEdit(A.sabina, 8, E.ZeroHash, Array.from({ length: 12 }, empty), A);
  assert.equal(result[4], 1);
  const cell = result[3][0];
  assert.equal(cell[0][0], A.sofia);
  assert.equal(cell[0][1], 0n);
  assert.equal(cell[0][2], ACTIVATIONS[8].time);
  assert.equal(cell[3], ACTIVATIONS[8].id);
  assert.equal(cell[4], true);
  assert(cell[5].slice(5, 10).every(value => value === 0n));
});

test("All occupied destination conflicts and already-placed Sofia fail closed", () => {
  for (const level of [8, 9]) {
    const slots = root(level);
    slots[level === 8 ? 5 : 2] = filled(A.parent);
    assert.throws(() => buildOrbitEdit(A.id1, level, E.ZeroHash, slots, A), /destination/);
    const duplicate = root(level);
    duplicate[10] = filled(A.sofia);
    assert.throws(() => buildOrbitEdit(A.id1, level, E.ZeroHash, duplicate, A), /already occupies/);
  }
  assert.throws(() => buildOrbitEdit(A.sabina, 8, E.ZeroHash, root(8), A), /no longer empty/);
});

test("Reject changed Sabina seat, incorrect capacity, level 6 and the old parent edit", () => {
  const slots = root(8);
  slots[2] = empty();
  assert.throws(() => buildOrbitEdit(A.id1, 8, E.ZeroHash, slots, A), /seat changed/);
  assert.throws(() => buildOrbitEdit(A.id1, 8, E.ZeroHash, [], A), /capacity/);
  assert.throws(() => buildOrbitEdit(A.id1, 6, E.ZeroHash, [], A), /deferred/);
  assert.throws(() => buildOrbitEdit(A.parent, 8, E.ZeroHash, root(8), A), /outside/);
});

test("Only Sofia's level-specific parents change; permanent sponsors and Sabina stay intact", () => {
  const rows = E.AbiCoder.defaultAbiCoder().decode([PARENT_PLAN], encodeParentPlan(A))[0];
  assert.equal(rows[0].correctedParent, A.sabina);
  assert.equal(rows[0].sponsor, A.sabina);
  assert.equal(rows[1].correctedParent, A.id1);
  for (const row of rows.slice(2)) {
    assert.equal(row.account, A.sabina);
    assert.equal(row.previousParent, A.id1);
    assert.equal(row.correctedParent, A.id1);
    assert.equal(row.sponsor, E.ZeroAddress);
  }
});

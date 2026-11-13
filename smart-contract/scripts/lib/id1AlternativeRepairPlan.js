const assert = require("node:assert/strict");
const { ethers: E } = require("ethers");
const legacy = require("./id1HistoricalRepairPlan");

const POLICY = "sabina-preserved-2026-11-13";
const ZERO = E.ZeroAddress;
const same = (a, b) => a.toLowerCase() === b.toLowerCase();
const ACTIVATIONS = Object.freeze({
  8: Object.freeze({ id: 1126n, price: 1280000000n, time: 1793510253n,
    tx: "0xfcc07130e2dfe7eff8e4475220d4f120cbcb70c61324c03492bca07eb45c88d1" }),
  9: Object.freeze({ id: 1127n, price: 2560000000n, time: 1793510334n,
    tx: "0x2b6956b22f6f67b731285554f835263e05a583e48f02fed2791ec92ca1982e7c" }),
});

function historicalPosition(addresses, level, line) {
  const a = ACTIVATIONS[level];
  // Actual historical ID1 payment, not the hypothetical payout at the new seat.
  return [[addresses.sofia, a.price, a.time, addresses.id1, true], ZERO, 0n, a.id, false,
    [true, BigInt(line), 0n, false, false, a.price * 9n / 10n, 0n, 0n, 0n, 0n, ZERO, ZERO]];
}

function buildOrbitEdit(account, level, beforeHash, originalSlots, addresses) {
  assert(level !== 6, "Level 6 historical edits remain deferred");
  if (same(account, addresses.id1) && [1, 3, 7].includes(level)) {
    return legacy.buildOrbitEdit(account, level, beforeHash, originalSlots, addresses);
  }
  assert((same(account, addresses.id1) && [8, 9].includes(level)) ||
    (same(account, addresses.sabina) && level === 8), "Orbit is outside the alternative repair scope");
  assert.equal(originalSlots.length, level === 9 ? 39 : 12, "Wrong orbit capacity");
  const slots = legacy.plain(originalSlots);
  assert(!slots.some(slot => same(slot[0][0], addresses.sofia)), "Sofia already occupies this orbit");
  let ancestryOnlyPosition = 0;
  if (same(account, addresses.id1)) {
    const sabinaIndex = level === 8 ? 2 : 1;
    const sofiaIndex = level === 8 ? 5 : 2;
    assert(same(slots[sabinaIndex][0][0], addresses.sabina), "Sabina's existing seat changed");
    assert.equal(slots[sofiaIndex][0][0], ZERO, "Sofia's destination is no longer empty");
    slots[sofiaIndex] = historicalPosition(addresses, level, level === 8 ? 2 : 1);
  } else {
    assert(slots.every(slot => slot[0][0] === ZERO), "Sabina's level-8 orbit is no longer empty");
    const a = ACTIVATIONS[8];
    ancestryOnlyPosition = 1;
    slots[0] = [[addresses.sofia, 0n, a.time, addresses.id1, true], ZERO, 1n, a.id, true,
      [true, 1n, 1n, false, false, 0n, 0n, 0n, 0n, 0n, ZERO, ZERO]];
  }
  legacy.normalizeArrivals(slots, slots.length);
  return [account, level, beforeHash, slots, ancestryOnlyPosition];
}

function encodeParentPlan(addresses) {
  return E.AbiCoder.defaultAbiCoder().encode([legacy.PARENT_PLAN], [[
    [addresses.sofia, 8, ZERO, addresses.sabina, addresses.sabina],
    [addresses.sofia, 9, ZERO, addresses.id1, addresses.sabina],
    [addresses.sabina, 8, addresses.id1, addresses.id1, ZERO],
    [addresses.sabina, 9, addresses.id1, addresses.id1, ZERO],
  ]]);
}

module.exports = { ...legacy, POLICY, ACTIVATIONS, buildOrbitEdit, encodeParentPlan };

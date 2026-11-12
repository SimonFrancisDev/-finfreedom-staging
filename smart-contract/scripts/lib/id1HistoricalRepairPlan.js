const assert = require("node:assert/strict");
const { ethers } = require("ethers");

const POSITION = "tuple(address user,uint256 amount,uint256 timestamp,address referrer,bool isActive)";
const RULE = "tuple(bool exists,uint8 line,uint8 linePaymentNumber,bool autoUpgradeEnabled,bool isFounderNoReferrerPath,uint256 toOwner,uint256 toSpillover1,uint256 toSpillover2,uint256 toEscrow,uint256 toRecycle,address spillover1Recipient,address spillover2Recipient)";
const SLOT = `tuple(${POSITION} position,address above,uint8 arrival,uint256 activationId,bool isMirror,${RULE} rule)`;
const ORBIT_PLAN = `tuple(address account,uint8 level,bytes32 beforeHash,${SLOT}[] slots,uint8 ancestryOnlyPosition)[]`;
const PARENT_PLAN = "tuple(address account,uint8 level,address previousParent,address correctedParent,address sponsor)[]";
const ZERO = ethers.ZeroAddress;
const plain = (value) => Array.isArray(value) ? value.map(plain) : value;
const same = (a, b) => a.toLowerCase() === b.toLowerCase();

function normalizeArrivals(slots, capacity) {
  for (let line = 0; line < 3; line += 1) {
    const filled = slots.map((state, index) => ({ state, index }))
      .filter(({ state, index }) => state[0][0] !== ZERO && (capacity === 4 || index < 3 ? 0 : index < 12 ? 1 : 2) === line)
      .sort((a, b) => Number(a.state[0][2] - b.state[0][2]) || Number(a.state[3] - b.state[3]) || a.index - b.index);
    filled.forEach(({ state }, index) => { state[2] = BigInt(index + 1); });
  }
  return slots;
}

function primary(wallet, price, timestamp, id, root) {
  return [[wallet, price, BigInt(timestamp), root, true], ZERO, 0n, BigInt(id), false,
    [true, 1n, 0n, false, false, price * 9n / 10n, 0n, 0n, 0n, 0n, ZERO, ZERO]];
}

function buildOrbitEdit(account, level, beforeHash, originalSlots, addresses, context = {}) {
  const slots = plain(originalSlots);
  let ancestryOnlyPosition = 0;
  if (same(account, addresses.id1) && level === 8) {
    assert(same(slots[0][0][0], addresses.parent));
    assert(same(slots[2][0][0], addresses.sabina));
    assert.equal(slots[3][0][0], ZERO, "Level-8 slot 4 is no longer empty");
    slots[3] = plain(slots[2]);
    slots[2] = primary(addresses.sofia, 1280000000n, 1793510253, 1126, addresses.id1);
  } else if (same(account, addresses.id1) && level === 9) {
    assert(same(slots[1][0][0], addresses.sabina));
    assert.equal(slots[2][0][0], ZERO, "Level-9 slot 3 is no longer empty");
    slots[2] = plain(slots[1]);
    slots[1] = primary(addresses.sofia, 2560000000n, 1793510334, 1127, addresses.id1);
  } else if (same(account, addresses.parent) && level === 8) {
    assert(slots.every((slot) => slot[0][0] === ZERO), "Recipient orbit is no longer empty");
    const source = context.sabinaLevel8Source;
    assert(source && same(source[0][0], addresses.sabina) && source[0][2] > 0n && source[3] > 0n,
      "Ancestry repair requires Sabina's verified original level-8 placement");
    ancestryOnlyPosition = 1;
    slots[0] = [[addresses.sabina, 0n, source[0][2], addresses.id1, true], ZERO, 1n, source[3], true,
      [true, 1n, 1n, false, false, 0n, 0n, 0n, 0n, 0n, ZERO, ZERO]];
  }
  normalizeArrivals(slots, slots.length);
  return [account, level, beforeHash, slots, ancestryOnlyPosition];
}

function encodeOrbitPlan(edits) {
  return ethers.AbiCoder.defaultAbiCoder().encode([ORBIT_PLAN], [edits]);
}

function encodeParentPlan(addresses) {
  return ethers.AbiCoder.defaultAbiCoder().encode([PARENT_PLAN], [[
    [addresses.sofia, 8, ZERO, addresses.id1, addresses.sabina],
    [addresses.sofia, 9, ZERO, addresses.id1, addresses.sabina],
    [addresses.sabina, 8, addresses.id1, addresses.parent, ZERO],
    [addresses.sabina, 9, addresses.id1, addresses.id1, ZERO],
  ]]);
}

module.exports = { ORBIT_PLAN, PARENT_PLAN, plain, buildOrbitEdit, encodeOrbitPlan, encodeParentPlan, normalizeArrivals };

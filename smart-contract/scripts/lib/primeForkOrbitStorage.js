const assert = require("node:assert/strict");
const { ethers: E } = require("ethers");

function storageSpan(layout, label, keys) {
  const field = layout.storage.find(row => row.label === label);
  assert(field, `Unknown baseline storage field ${label}`);
  let slot = BigInt(field.slot);
  let type = layout.types[field.type];
  for (const key of keys) {
    if (type.encoding === "mapping") {
      slot = BigInt(E.keccak256(E.AbiCoder.defaultAbiCoder().encode(
        [layout.types[type.key].label, "uint256"], [key, slot])));
      type = layout.types[type.value];
    } else {
      const member = type.members?.find(row => row.label === key);
      assert(member && member.offset === 0, `Unsupported packed member ${key}`);
      slot += BigInt(member.slot);
      type = layout.types[member.type];
    }
  }
  return Array.from({ length: Math.ceil(Number(type.numberOfBytes) / 32) }, (_, i) => E.toBeHex(slot + BigInt(i), 32));
}

function orbitStorageSlots(layout, rows) {
  const slots = new Set();
  const add = (label, keys) => storageSpan(layout, label, keys).forEach(slot => slots.add(slot));
  for (const { wallet, level, capacity, totalCycles } of rows) {
    add("levelConfig", [level]);
    add("userOrbits", [wallet, level]);
    for (let line = 1; line <= 3; line += 1) add("linePaymentCounts", [wallet, level, line]);
    for (let pos = 1; pos <= capacity; pos += 1) {
      add("userOrbits", [wallet, level, "positions", pos]);
      add("userOrbits", [wallet, level, "positionAbove", pos]);
      for (const label of ["positionLineArrivalNumber", "positionActivationId", "positionIsMirror", "storedRuleSnapshots"])
        add(label, [wallet, level, pos]);
    }
    for (let cycle = 1; cycle <= Number(totalCycles) + 1; cycle += 1) {
      for (const label of ["historicalCycleStored", "historicalCycleArchiveMask"]) add(label, [wallet, level, cycle]);
      for (let pos = 1; pos <= capacity; pos += 1) {
        for (const label of ["historicalCyclePositions", "historicalPositionLineArrivalNumber", "historicalPositionActivationId", "historicalPositionIsMirror", "historicalStoredRuleSnapshots"])
          add(label, [wallet, level, cycle, pos]);
      }
    }
  }
  return [...slots];
}

async function primeForkOrbitStorage({ network, rpc, block, proxy, layout, rows, progress }) {
  assert.equal(network.name, "hardhat");
  assert.equal(BigInt(await network.provider.send("eth_chainId")), 31337n);
  const slots = orbitStorageSlots(layout, rows);
  for (let start = 0; start < slots.length; start += 20) {
    const batch = slots.slice(start, start + 20);
    let replies;
    for (let attempt = 0; attempt < 3; attempt += 1) {
      await new Promise(resolve => setTimeout(resolve, 650 * (attempt + 1)));
      const response = await fetch(rpc, { method: "POST", headers: { "content-type": "application/json" },
        signal: AbortSignal.timeout(20000), body: JSON.stringify(batch.map((slot, id) => ({
          jsonrpc: "2.0", id, method: "eth_getStorageAt", params: [proxy, slot, E.toQuantity(block)],
        }))) });
      assert(response.ok, `Read-only batch HTTP ${response.status}`);
      replies = await response.json();
      if (Array.isArray(replies) && replies.every(row => !row.error)) break;
    }
    assert(Array.isArray(replies) && replies.length === batch.length, "Incomplete storage batch");
    const indexed = new Map(replies.map(row => [row.id, row]));
    assert.equal(indexed.size, batch.length);
    for (let i = 0; i < batch.length; i += 1) {
      const row = indexed.get(i);
      assert(row && !row.error && /^0x[0-9a-fA-F]{64}$/.test(row.result), "Invalid pinned source storage");
      // Cache the exact source value locally, before any repair mutation.
      await network.provider.send("hardhat_setStorageAt", [proxy, batch[i], row.result]);
    }
    if (start % 400 === 0) progress({ proxy, checked: start + batch.length, total: slots.length });
  }
  return slots.length;
}

module.exports = { storageSpan, orbitStorageSlots, primeForkOrbitStorage };

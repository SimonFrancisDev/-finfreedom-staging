const { test } = require("node:test");
const assert = require("node:assert/strict");
const { ethers: E } = require("ethers");
const { storageSpan, primeForkOrbitStorage } = require("../scripts/lib/primeForkOrbitStorage");

test("Storage priming derives nested mapping/struct slots from compiler layout", () => {
  const layout = { storage: [{ label: "orbits", slot: "7", type: "map" }], types: {
    map: { encoding: "mapping", key: "addr", value: "record" }, addr: { label: "address" },
    record: { numberOfBytes: "96", members: [{ label: "amount", slot: "2", offset: 0, type: "uint" }] },
    uint: { numberOfBytes: "32" },
  } };
  const wallet = E.getAddress(E.toBeHex(5, 20));
  const base = BigInt(E.keccak256(E.AbiCoder.defaultAbiCoder().encode(["address", "uint256"], [wallet, 7])));
  assert.deepEqual(storageSpan(layout, "orbits", [wallet, "amount"]), [E.toBeHex(base + 2n, 32)]);
  assert.equal(storageSpan(layout, "orbits", [wallet]).length, 3);
  assert.throws(() => storageSpan(layout, "missing", []));
});

test("Storage priming refuses any live or testnet execution network before RPC access", async () => {
  await assert.rejects(primeForkOrbitStorage({ network: { name: "polygon" } }));
  await assert.rejects(primeForkOrbitStorage({ network: { name: "hardhat", provider: { send: async () => "0x89" } } }));
});

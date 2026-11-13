const assert = require("node:assert/strict");
const { ethers: E } = require("ethers");
const { A } = require("./id1ProductionPackage");

const ABI = [
  "function transactions(uint256) view returns (address to,uint256 value,bytes data,bool executed,bool cancelled,uint256 confirmations,uint256 submittedAt,uint256 executeAfter)",
  "function getTransactionCount() view returns (uint256)",
  "function getOwners() view returns (address[])",
  "function requiredConfirmations() view returns (uint256)",
  "function timelockDelay() view returns (uint256)",
  "function isProposalSubmitter(address) view returns (bool)",
  "function submitTransaction(address,uint256,bytes) returns (uint256)",
  "function cancelTransaction(uint256)",
  "event Submit(uint256 indexed txId)",
];
const iface = new E.Interface(ABI);
const RUNTIME_HASH = "0x39381be5a244f93beb7d4f297de0f4cd7a211cb0676d67f5e4decefba4fcc0fa";
const ORIGINAL_HASH = "c8e36fa60e65b33cb50ac3d04e8dfabbcbccb169800050a79685eb4b6e11cf5c";
const OWNERS = [
  "0x17Fb12B3d5A2bbb4dD10bd3C5C35618baDA3D2D6",
  "0x67E138a2f46AEF2a0031CfCb5Ae843b41c973f41",
  "0x04eaa54e7896C24aF2622b804Bf35E4C662bf12f",
  "0xEA51893495D285D737db5062500C4F003E2b3A4D",
];
const same = (a, b) => assert.equal(a.toLowerCase(), b.toLowerCase());

function cancellation(id) {
  assert(Number.isSafeInteger(id) && id >= 130 && id <= 159, "Only withdrawn IDs 130-159 may be cancelled");
  return { retires: id, target: A.governance, value: "0", data: iface.encodeFunctionData("cancelTransaction", [id]) };
}

function verifyOriginal(actual, expected, id) {
  cancellation(id);
  same(actual.to, expected.target);
  assert.equal(actual.value, BigInt(expected.value));
  assert.equal(actual.data, expected.data, `Original proposal ${id} changed`);
  assert.equal(actual.executed, false, `Original proposal ${id} executed; stop and reassess`);
}

function verifyCancellation(actual, id) {
  const expected = cancellation(id);
  same(actual.to, expected.target);
  assert.equal(actual.value, 0n);
  assert.equal(actual.data, expected.data);
}

function activeCancellation(rows, id) {
  const call = cancellation(id);
  const matches = rows.filter(row => row.to.toLowerCase() === call.target.toLowerCase() &&
    row.value === 0n && row.data === call.data && !row.cancelled && !row.executed);
  assert(matches.length <= 1, `Multiple pending cancellations for ${id}; stop for review`);
  return matches[0];
}

function submissionData(id) {
  const call = cancellation(id);
  return iface.encodeFunctionData("submitTransaction", [call.target, 0n, call.data]);
}

function feeCaps(baseFee, recommendedFee, recommendedTip) {
  const minimumTip = E.parseUnits("30", "gwei");
  const ceiling = E.parseUnits("450", "gwei");
  const tip = recommendedTip > minimumTip ? recommendedTip : minimumTip;
  const headroom = baseFee * 2n + tip;
  const desired = recommendedFee > headroom ? recommendedFee : headroom;
  const maxFee = desired > ceiling ? ceiling : desired;
  assert(baseFee + tip <= maxFee, "Current base fee plus tip exceeds 450-gwei ceiling; no broadcast");
  return { tip, maxFee };
}

module.exports = { ABI, iface, RUNTIME_HASH, ORIGINAL_HASH, OWNERS, cancellation,
  verifyOriginal, verifyCancellation, activeCancellation, submissionData, feeCaps, same };

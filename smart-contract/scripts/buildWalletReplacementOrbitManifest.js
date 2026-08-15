const fs = require("node:fs");
const path = require("node:path");
const { ethers } = require("hardhat");

const prestate = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../migration-audits/wallet-replacement-orbit-prestate-latest.json"), "utf8"));
const draft = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../migration-audits/wallet-replacement-manifest-draft.json"), "utf8"));
const OLD = new Set([
  "0xc0545331e20587208d4b27b2a3e4920cc481133a",
  "0x2f1e28756a42a3680b5ad42c58a0c3887c9e60ba",
]);

const impacted = { P4: new Map(), P12: new Map(), P39: new Map() };
for (const row of prestate.references) {
  impacted[row.orbitType].set(`${row.owner.toLowerCase()}:${row.level}`, {
    owner: ethers.getAddress(row.owner), level: Number(row.level),
  });
}
for (const row of prestate.owned) {
  if (!OLD.has(row.owner.toLowerCase())) continue;
  if (!row.positions.length && Number(row.summary.totalCycles) === 0 && Number(row.summary.totalEarned) === 0) continue;
  impacted[row.orbitType].set(`${row.owner.toLowerCase()}:${row.level}`, {
    owner: ethers.getAddress(row.owner), level: Number(row.level),
  });
}

const coder = ethers.AbiCoder.defaultAbiCoder();
const result = { generatedAt: new Date().toISOString(), prestateBlocks: [prestate.snapshotStartBlock, prestate.snapshotEndBlock], orbits: {} };
for (const orbitType of ["P4", "P12", "P39"]) {
  const keys = [...impacted[orbitType].values()].sort((a, b) =>
    a.owner.toLowerCase().localeCompare(b.owner.toLowerCase()) || a.level - b.level
  );
  const matrix = draft.matrixParentRewrites
    .filter((row) => row.orbitType === orbitType)
    .map((row) => ({ user: ethers.getAddress(row.user), level: Number(row.level), expectedParent: ethers.getAddress(row.from) }))
    .sort((a, b) => a.user.toLowerCase().localeCompare(b.user.toLowerCase()) || a.level - b.level);
  const owners = keys.map((row) => row.owner);
  const levels = keys.map((row) => row.level);
  const matrixUsers = matrix.map((row) => row.user);
  const matrixLevels = matrix.map((row) => row.level);
  const matrixExpectedParents = matrix.map((row) => row.expectedParent);
  const encoded = orbitType === "P4"
    ? coder.encode(["address[]", "uint8[]"], [owners, levels])
    : coder.encode(
      ["address[]", "uint8[]", "address[]", "uint8[]", "address[]"],
      [owners, levels, matrixUsers, matrixLevels, matrixExpectedParents]
    );
  result.orbits[orbitType] = {
    owners, levels, matrixUsers, matrixLevels, matrixExpectedParents,
    manifestHash: ethers.keccak256(encoded),
  };
}

const output = path.resolve(__dirname, "../migration-audits/wallet-replacement-orbit-manifest.json");
fs.writeFileSync(output, `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ output, hashes: Object.fromEntries(Object.entries(result.orbits).map(([key, value]) => [key, value.manifestHash])), counts: Object.fromEntries(Object.entries(result.orbits).map(([key, value]) => [key, { keys: value.owners.length, matrix: value.matrixUsers.length }])) }, null, 2));

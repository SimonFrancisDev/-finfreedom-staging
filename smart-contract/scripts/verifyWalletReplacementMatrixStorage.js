const fs = require("node:fs");
const path = require("node:path");
const hre = require("hardhat");
const { ethers } = hre;

const PROXIES = {
  P12: "0xCF998d8f7E9DD4f3FacFbA45e656dE07142f824b",
  P39: "0xEaD39819B8C4DBb0669320542B6B847D4c31b8Fb",
};
const MATRIX_MAPPING_SLOT = 67n;
const WP_OLD = "0xC0545331E20587208d4b27b2A3e4920Cc481133a";
const WP_NEW = "0x1EA5513e017b4e25847e91aBc84aC8686331f80B";
const RY_OLD = "0x2F1E28756A42A3680b5AD42C58A0c3887C9e60bA";
const RY_NEW = "0xFb8D46674f51882baaA2c9606122484434FF2DC2";

function replacementOf(wallet) {
  if (wallet.toLowerCase() === WP_OLD.toLowerCase()) return WP_NEW;
  if (wallet.toLowerCase() === RY_OLD.toLowerCase()) return RY_NEW;
  return wallet;
}

function nestedMappingSlot(user, level) {
  const coder = ethers.AbiCoder.defaultAbiCoder();
  const outer = ethers.keccak256(coder.encode(["address", "uint256"], [user, MATRIX_MAPPING_SLOT]));
  return ethers.keccak256(coder.encode(["uint8", "uint256"], [level, BigInt(outer)]));
}

async function main() {
  const manifest = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../migration-audits/wallet-replacement-orbit-manifest.json"), "utf8"));
  const checks = [];
  for (const type of ["P12", "P39"]) {
    const row = manifest.orbits[type];
    for (let i = 0; i < row.matrixUsers.length; ++i) {
      const user = replacementOf(row.matrixUsers[i]);
      const slot = nestedMappingSlot(user, row.matrixLevels[i]);
      const raw = await ethers.provider.getStorage(PROXIES[type], slot);
      const actual = ethers.getAddress(`0x${raw.slice(-40)}`);
      const expected = ethers.getAddress(replacementOf(row.matrixExpectedParents[i]));
      checks.push({ type, user, level: row.matrixLevels[i], slot, actual, expected, pass: actual === expected });
    }
  }
  const report = {
    generatedAt: new Date().toISOString(), chainId: Number((await ethers.provider.getNetwork()).chainId),
    block: await ethers.provider.getBlockNumber(), mappingSlot: MATRIX_MAPPING_SLOT.toString(),
    result: checks.every((row) => row.pass) ? "PASS" : "FAIL", checks,
  };
  const output = path.resolve(__dirname, "../migration-audits/wallet-replacement-matrix-storage-verification.json");
  fs.writeFileSync(output, `${JSON.stringify(report, (_, value) => typeof value === "bigint" ? value.toString() : value, 2)}\n`);
  console.log(JSON.stringify({ output, block: report.block, result: report.result, checks: checks.length }, null, 2));
  if (report.result !== "PASS") process.exitCode = 1;
}

main().catch((error) => { console.error(error); process.exitCode = 1; });

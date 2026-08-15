const fs = require("node:fs");
const path = require("node:path");
const hre = require("hardhat");
const { ethers } = hre;

const REGISTRATION = "0x02ECA97e944Ac66b0444fd5F61A716917E83CfF5";
const INPUT = path.resolve(__dirname, "../../../backend/migration-audits/wallet-replacement-descendant-edges-91313968.json");
const OUTPUT = path.resolve(__dirname, "../migration-audits/wallet-replacement-descendant-chain-check.json");

async function main() {
  const registration = await ethers.getContractAt("RegistrationFixed", REGISTRATION.toLowerCase());
  const input = JSON.parse(fs.readFileSync(INPUT, "utf8"));
  const checks = [];
  for (let offset = 0; offset < input.edges.length; offset += 10) {
    const batch = input.edges.slice(offset, offset + 10);
    const actual = await Promise.all(batch.map((row) => registration.getReferrer(row.child)));
    batch.forEach((row, index) => checks.push({
      ...row,
      actualParent: actual[index],
      matches: actual[index].toLowerCase() === row.parent.toLowerCase(),
    }));
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  const mismatches = checks.filter((row) => !row.matches);
  const report = {
    generatedAt: new Date().toISOString(),
    chainId: Number((await ethers.provider.getNetwork()).chainId),
    blockNumber: await ethers.provider.getBlockNumber(),
    frozenInputBlock: input.frozenBlock,
    checked: checks.length,
    mismatchCount: mismatches.length,
    mismatches,
    checks,
  };
  fs.writeFileSync(OUTPUT, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify({ output: OUTPUT, blockNumber: report.blockNumber, checked: checks.length, mismatchCount: mismatches.length }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

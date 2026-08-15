const fs = require("node:fs");
const path = require("node:path");
const hre = require("hardhat");
const { ethers } = hre;

const ROOT = path.resolve(__dirname, "../../..");
const IMPLEMENTATION_SLOT = "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc";
const CONTRACTS = [
  ["RegistrationFixed", "0x02ECA97e944Ac66b0444fd5F61A716917E83CfF5", "RegistrationFixed.sol/RegistrationFixed.json"],
  ["LevelManager", "0x0E9De0F24eB4774834A2c4A63eaBa8356A4A4B53", "LevelManager.sol/LevelManager.json"],
  ["AutoUpgradeEscrow", "0x8b3db2AC7e30749479f2dbad14105C8eD4a377d4", "AutoUpgradeEscrow.sol/AutoUpgradeEscrow.json"],
  ["P4Orbit", "0x1ED0b443c880Ba88F732c3f5915561A07B21F6B4", "P4Orbit.sol/P4Orbit.json"],
  ["P12Orbit", "0xCF998d8f7E9DD4f3FacFbA45e656dE07142f824b", "P12Orbit.sol/P12Orbit.json"],
  ["P39Orbit", "0xEaD39819B8C4DBb0669320542B6B847D4c31b8Fb", "P39Orbit.sol/P39Orbit.json"],
  ["FreedomTokenController", "0x2Ee32EDfE1990408FE70bcADBDBDA8c2f9AdBb62", "FreedomTokenController.sol/FreedomTokenController.json"],
  ["FGTToken", "0x615201edaddB5CFD839Cc4eE693Dc464F6E2B5E4", "tokens/FGTToken.sol/FGTToken.json"],
  ["FGTrToken", "0xAaD41296b6Ec358b9C16dD7161C555fD3a464Bc3", "tokens/FGTrToken.sol/FGTrToken.json"],
];

function artifact(tree, relative) {
  const file = path.join(ROOT, tree, "artifacts/contracts", relative);
  if (!fs.existsSync(file)) return { file, exists: false };
  const parsed = JSON.parse(fs.readFileSync(file, "utf8"));
  const immutableReferences = findImmutableReferences(tree, parsed.sourceName, parsed.contractName);
  const normalizedExecutable = maskReferences(stripMetadata(parsed.deployedBytecode), immutableReferences);
  return {
    file,
    exists: true,
    runtimeHash: ethers.keccak256(parsed.deployedBytecode),
    executableHash: ethers.keccak256(normalizedExecutable),
    immutableReferences,
    runtimeLength: (parsed.deployedBytecode.length - 2) / 2,
  };
}

function findImmutableReferences(tree, sourceName, contractName) {
  const directory = path.join(ROOT, tree, "artifacts/build-info");
  if (!fs.existsSync(directory)) return [];
  for (const name of fs.readdirSync(directory)) {
    const build = JSON.parse(fs.readFileSync(path.join(directory, name), "utf8"));
    const refs = build.output?.contracts?.[sourceName]?.[contractName]?.evm?.deployedBytecode?.immutableReferences;
    if (refs) return Object.values(refs).flat();
  }
  return [];
}

function maskReferences(bytecode, references) {
  const chars = bytecode.slice(2).split("");
  for (const { start, length } of references) {
    chars.fill("0", start * 2, (start + length) * 2);
  }
  return `0x${chars.join("")}`;
}

function stripMetadata(bytecode) {
  if (!bytecode || bytecode === "0x" || bytecode.length < 6) return bytecode;
  const metadataBytes = Number.parseInt(bytecode.slice(-4), 16);
  const metadataHexLength = (metadataBytes + 2) * 2;
  if (!Number.isFinite(metadataBytes) || metadataHexLength > bytecode.length - 2) return bytecode;
  return bytecode.slice(0, bytecode.length - metadataHexLength);
}

async function main() {
  const rows = [];
  for (const [name, proxy, relative] of CONTRACTS) {
    const normalizedProxy = ethers.getAddress(proxy.toLowerCase());
    const raw = await ethers.provider.getStorage(normalizedProxy, IMPLEMENTATION_SLOT);
    const implementation = ethers.getAddress(`0x${raw.slice(-40)}`);
    const code = await ethers.provider.getCode(implementation);
    const liveHash = ethers.keccak256(code);
    const staging = artifact("staging-environment/smart-contract", relative);
    const production = artifact("Smart-Contract", relative);
    const liveExecutableHash = ethers.keccak256(maskReferences(stripMetadata(code), staging.immutableReferences));
    rows.push({
      name, proxy: normalizedProxy, implementation, liveHash, liveExecutableHash, liveRuntimeLength: (code.length - 2) / 2,
      staging: { ...staging, matches: staging.exists && staging.runtimeHash === liveHash, executableMatches: staging.exists && staging.executableHash === liveExecutableHash },
      production: { ...production, matches: production.exists && production.runtimeHash === liveHash, executableMatches: production.exists && production.executableHash === liveExecutableHash },
    });
  }
  const report = {
    generatedAt: new Date().toISOString(),
    chainId: Number((await ethers.provider.getNetwork()).chainId),
    blockNumber: await ethers.provider.getBlockNumber(),
    rows,
  };
  const output = path.resolve(__dirname, "../migration-audits/wallet-surgery-source-provenance.json");
  fs.writeFileSync(output, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify({
    output,
    blockNumber: report.blockNumber,
    rows: rows.map((row) => ({
      name: row.name,
      implementation: row.implementation,
      stagingMatches: row.staging.matches,
      stagingExecutableMatches: row.staging.executableMatches,
      productionMatches: row.production.matches,
      productionExecutableMatches: row.production.executableMatches,
      liveRuntimeLength: row.liveRuntimeLength,
      stagingRuntimeLength: row.staging.runtimeLength,
      productionRuntimeLength: row.production.runtimeLength,
    })),
  }, null, 2));
}

main().catch((error) => { console.error(error); process.exitCode = 1; });

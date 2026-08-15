const { ethers, upgrades } = require("hardhat");

async function main() {
  const pairs = [
    ["LevelManager", "LevelManagerWalletReplacementMigrator"],
    ["AutoUpgradeEscrow", "AutoUpgradeEscrowWalletReplacementMigrator"],
    ["RegistrationFixed", "RegistrationWalletReplacementMigrator"],
    ["FGTToken", "FGTWalletReplacementMigrator"],
    ["FGTrToken", "FGTrWalletReplacementMigrator"],
    ["P4Orbit", "P4OrbitWalletReplacementMigrator"],
    ["P12Orbit", "P12OrbitWalletReplacementMigrator"],
    ["P39Orbit", "P39OrbitWalletReplacementMigrator"],
  ];

  for (const [permanentName, migrationName] of pairs) {
    const permanent = await ethers.getContractFactory(permanentName);
    const migration = await ethers.getContractFactory(migrationName);
    const options = {
      kind: "uups",
      unsafeAllow: ["constructor", "missing-initializer", "delegatecall"],
    };
    await upgrades.validateUpgrade(permanent, migration, options);
    await upgrades.validateUpgrade(migration, permanent, options);
    console.log(`${permanentName} <-> ${migrationName}: STORAGE PASS`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

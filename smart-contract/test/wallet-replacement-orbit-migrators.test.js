const { expect } = require("chai");
const { ethers } = require("hardhat");
const manifest = require("../migration-audits/wallet-replacement-orbit-manifest.json");

const WP_OLD = "0xC0545331E20587208d4b27b2A3e4920Cc481133a";
const WP_NEW = "0x1EA5513e017b4e25847e91aBc84aC8686331f80B";
const RY_OLD = "0x2F1E28756A42A3680b5AD42C58A0c3887C9e60bA";
const RY_NEW = "0xFb8D46674f51882baaA2c9606122484434FF2DC2";

async function deploy(name) {
  const instance = await (await ethers.getContractFactory(name)).deploy();
  await instance.waitForDeployment();
  await instance.initializeHarness();
  return instance;
}

async function seedSummary(instance, owner, level, overrides = {}) {
  const line1 = overrides.line1 ?? 1;
  const line2 = overrides.line2 ?? 0;
  const line3 = overrides.line3 ?? 0;
  await instance.seedSummary(
    owner, level,
    overrides.currentPosition ?? 2,
    overrides.escrow ?? 0,
    overrides.auto ?? false,
    line1, line2, line3,
    overrides.cycles ?? 0,
    overrides.earned ?? 100
  );
  await instance.seedLineCount(owner, level, 1, line1);
  await instance.seedLineCount(owner, level, 2, line2);
  await instance.seedLineCount(owner, level, 3, line3);
}

function args(type) {
  const row = manifest.orbits[type];
  return [row.owners, row.levels, row.matrixUsers, row.matrixLevels, row.matrixExpectedParents];
}

describe("wallet replacement orbit migrators", function () {
  it("moves and normalizes P4 current state while rewriting external references", async function () {
    const orbit = await deploy("P4OrbitWalletReplacementMigratorHarness");
    await seedSummary(orbit, WP_OLD, 1, { currentPosition: 1, line1: 0, cycles: 3, earned: 81_000_000 });
    await orbit.seedHistoricalPosition(WP_OLD, 1, 2, 3, RY_OLD);
    await seedSummary(orbit, WP_OLD, 4, { currentPosition: 4, escrow: 160_000_000, auto: true, line1: 3, earned: 216_000_000 });
    await seedSummary(orbit, RY_OLD, 1, { currentPosition: 3, line1: 2, earned: 18_000_000 });

    const external = manifest.orbits.P4.owners.find((owner) => ![WP_OLD, RY_OLD].includes(ethers.getAddress(owner)));
    const externalIndex = manifest.orbits.P4.owners.indexOf(external);
    const externalLevel = manifest.orbits.P4.levels[externalIndex];
    await seedSummary(orbit, external, externalLevel);
    await orbit.seedPosition(external, externalLevel, 1, WP_OLD, RY_OLD, WP_OLD, 77, true, 1);
    await orbit.seedSnapshot(external, externalLevel, 1, WP_OLD, RY_OLD);

    const row = manifest.orbits.P4;
    await orbit.executeApprovedWalletReplacement(row.owners, row.levels);

    const wp4 = await orbit.userOrbits(WP_NEW, 4);
    expect(wp4.escrowBalance).to.equal(88_000_000n);
    expect(wp4.autoUpgradeCompleted).to.equal(false);
    expect((await orbit.userOrbits(WP_OLD, 4)).isActive).to.equal(false);
    expect((await orbit.userOrbits(RY_NEW, 1)).isActive).to.equal(true);
    expect(await orbit.readHistoricalPosition(WP_OLD, 1, 2, 3)).to.equal(RY_OLD);
    expect(await orbit.readHistoricalPosition(WP_NEW, 1, 2, 3)).to.equal(ethers.ZeroAddress);
    const patched = await orbit.readPosition(external, externalLevel, 1);
    expect(patched.user).to.equal(WP_NEW);
    expect(patched.referrer).to.equal(RY_NEW);
    expect(patched.above).to.equal(WP_NEW);
    expect(patched.first).to.equal(WP_NEW);
    expect(patched.second).to.equal(RY_NEW);
  });

  it("moves P12 state and rewrites manifest-bound matrix parents", async function () {
    const orbit = await deploy("P12OrbitWalletReplacementMigratorHarness");
    await seedSummary(orbit, WP_OLD, 2, { currentPosition: 12, line1: 3, line2: 8, earned: 94_000_000 });
    await seedSummary(orbit, RY_OLD, 2, { currentPosition: 5, line1: 3, line2: 4, earned: 64_000_000 });
    const row = manifest.orbits.P12;
    for (let i = 0; i < row.matrixUsers.length; i++) {
      await orbit.seedMatrixParent(row.matrixUsers[i], row.matrixLevels[i], row.matrixExpectedParents[i]);
    }
    await orbit.executeApprovedWalletReplacement(...args("P12"));
    expect((await orbit.userOrbits(WP_NEW, 2)).totalEarned).to.equal(94_000_000n);
    expect((await orbit.userOrbits(RY_NEW, 2)).totalEarned).to.equal(64_000_000n);
    expect((await orbit.userOrbits(WP_OLD, 2)).isActive).to.equal(false);
    for (let i = 0; i < row.matrixUsers.length; i++) {
      const targetUser = ethers.getAddress(row.matrixUsers[i]) === RY_OLD ? RY_NEW : row.matrixUsers[i];
      const expected = ethers.getAddress(row.matrixExpectedParents[i]) === WP_OLD
        ? WP_NEW
        : ethers.getAddress(row.matrixExpectedParents[i]) === RY_OLD ? RY_NEW : row.matrixExpectedParents[i];
      expect(await orbit.readMatrixParent(targetUser, row.matrixLevels[i])).to.equal(expected);
    }
  });

  it("moves valid P39 state and quarantines invalid WP level 6", async function () {
    const orbit = await deploy("P39OrbitWalletReplacementMigratorHarness");
    await seedSummary(orbit, WP_OLD, 3, { currentPosition: 9, line1: 3, line2: 5, line3: 6, earned: 160_000_000 });
    await seedSummary(orbit, RY_OLD, 3, { currentPosition: 2, line1: 1, line2: 1, earned: 16_000_000 });
    await seedSummary(orbit, WP_OLD, 6, { currentPosition: 2, line1: 1, line2: 1, earned: 224_000_000 });
    await orbit.seedPosition(WP_OLD, 6, 1, RY_OLD, WP_OLD, RY_OLD, 9, true, 1);
    const row = manifest.orbits.P39;
    for (let i = 0; i < row.matrixUsers.length; i++) {
      await orbit.seedMatrixParent(row.matrixUsers[i], row.matrixLevels[i], row.matrixExpectedParents[i]);
    }
    await orbit.executeApprovedWalletReplacement(...args("P39"));
    expect((await orbit.userOrbits(WP_NEW, 3)).totalEarned).to.equal(160_000_000n);
    expect((await orbit.userOrbits(RY_NEW, 3)).totalEarned).to.equal(16_000_000n);
    expect((await orbit.userOrbits(WP_NEW, 6)).isActive).to.equal(false);
    expect((await orbit.userOrbits(WP_OLD, 6)).isActive).to.equal(false);
    expect((await orbit.readPosition(WP_OLD, 6, 1)).user).to.equal(ethers.ZeroAddress);
  });

  it("rejects changed manifests and execution while unpaused", async function () {
    const orbit = await deploy("P4OrbitWalletReplacementMigratorHarness");
    const row = manifest.orbits.P4;
    await expect(orbit.executeApprovedWalletReplacement(row.owners.slice(1), row.levels.slice(1)))
      .to.be.revertedWithCustomError(orbit, "WalletReplacementManifestMismatch");
    await orbit.unpauseHarness();
    await expect(orbit.executeApprovedWalletReplacement(row.owners, row.levels))
      .to.be.revertedWithCustomError(orbit, "ExpectedPause");
  });
});

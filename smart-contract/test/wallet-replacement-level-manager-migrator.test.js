const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

const WP_OLD = "0xC0545331E20587208d4b27b2A3e4920Cc481133a";
const WP_NEW = "0x1EA5513e017b4e25847e91aBc84aC8686331f80B";
const RY_OLD = "0x2F1E28756A42A3680b5AD42C58A0c3887C9e60bA";
const RY_NEW = "0xFb8D46674f51882baaA2c9606122484434FF2DC2";

describe("LevelManagerWalletReplacementMigrator", function () {
  async function fixture(wpHighest = 4) {
    const [owner, outsider] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("LevelManagerWalletReplacementMigratorHarness");
    const manager = await upgrades.deployProxy(Factory, [owner.address], {
      initializer: "initializeHarness",
      kind: "uups",
      unsafeAllow: ["constructor", "missing-initializer"],
    });
    await manager.seedParticipant(WP_OLD, wpHighest, true);
    await manager.seedParticipant(RY_OLD, 3, true);
    return { manager, owner, outsider };
  }

  it("moves exact activation and ID1-downline state", async function () {
    const { manager, outsider } = await fixture();
    await expect(manager.connect(outsider).executeApprovedWalletReplacement()).to.be.reverted;
    await expect(manager.executeApprovedWalletReplacement()).to.be.revertedWithCustomError(manager, "ExpectedPause");
    await manager.pauseHarness();
    await manager.executeApprovedWalletReplacement();

    for (let level = 1; level <= 10; level++) {
      expect(await manager.userLevelActivated(WP_NEW, level)).to.equal(level <= 4);
      expect(await manager.userLevelActivated(RY_NEW, level)).to.equal(level <= 3);
      expect(await manager.userLevelActivated(WP_OLD, level)).to.equal(false);
      expect(await manager.userLevelActivated(RY_OLD, level)).to.equal(false);
    }
    expect(await manager.isID1Downline(WP_NEW)).to.equal(true);
    expect(await manager.isID1Downline(RY_NEW)).to.equal(true);
    expect(await manager.isID1Downline(WP_OLD)).to.equal(false);
    expect(await manager.isID1Downline(RY_OLD)).to.equal(false);
    await expect(manager.executeApprovedWalletReplacement()).to.be.revertedWithCustomError(
      manager, "WalletReplacementInvalidState"
    );
  });

  it("rejects unexpected old activation state without partial mutation", async function () {
    const { manager } = await fixture(5);
    await manager.pauseHarness();
    await expect(manager.executeApprovedWalletReplacement()).to.be.revertedWithCustomError(
      manager, "WalletReplacementInvalidState"
    );
    expect(await manager.userLevelActivated(WP_OLD, 1)).to.equal(true);
    expect(await manager.userLevelActivated(WP_NEW, 1)).to.equal(false);
  });
});

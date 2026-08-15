const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

const WP_OLD = "0xC0545331E20587208d4b27b2A3e4920Cc481133a";
const WP_NEW = "0x1EA5513e017b4e25847e91aBc84aC8686331f80B";
const RY_OLD = "0x2F1E28756A42A3680b5AD42C58A0c3887C9e60bA";
const RY_NEW = "0xFb8D46674f51882baaA2c9606122484434FF2DC2";
const unit = 10n ** 6n;

describe("AutoUpgradeEscrowWalletReplacementMigrator", function () {
  async function fixture(extraWp = 0n) {
    const [owner, outsider] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("MockUSDT");
    const usdt = await Token.deploy();
    const Guardian = await ethers.getContractFactory("MockMigrationGuardian");
    const guardian = await Guardian.deploy();
    const Factory = await ethers.getContractFactory("AutoUpgradeEscrowWalletReplacementMigrator");
    const escrow = await upgrades.deployProxy(
      Factory,
      [await usdt.getAddress(), await guardian.getAddress()],
      { initializer: "initialize", kind: "uups", unsafeAllow: ["constructor", "missing-initializer"] }
    );
    await usdt.mint(owner.address, 96n * unit + extraWp);
    await usdt.approve(await escrow.getAddress(), 96n * unit + extraWp);
    await escrow.lockFunds(WP_OLD, 4, 5, 88n * unit + extraWp);
    await escrow.lockFunds(RY_OLD, 3, 4, 8n * unit);
    return { escrow, usdt, owner, outsider };
  }

  it("moves exact tagged locks while preserving global accounting and custody", async function () {
    const { escrow, usdt, outsider } = await fixture();
    const globalBefore = (await escrow.getGlobalEscrowStats())[3];
    const custodyBefore = await usdt.balanceOf(await escrow.getAddress());

    await expect(escrow.connect(outsider).executeApprovedWalletReplacement()).to.be.reverted;
    await expect(escrow.executeApprovedWalletReplacement()).to.be.revertedWithCustomError(escrow, "ExpectedPause");
    await escrow.pause();
    await escrow.executeApprovedWalletReplacement();

    expect(await escrow.lockedFunds(WP_OLD, 4, 5)).to.equal(0);
    expect(await escrow.lockedFunds(RY_OLD, 3, 4)).to.equal(0);
    expect(await escrow.lockedFunds(WP_NEW, 4, 5)).to.equal(88n * unit);
    expect(await escrow.lockedFunds(RY_NEW, 3, 4)).to.equal(8n * unit);
    expect((await escrow.getGlobalEscrowStats())[3]).to.equal(globalBefore);
    expect(await usdt.balanceOf(await escrow.getAddress())).to.equal(custodyBefore);
    await expect(escrow.executeApprovedWalletReplacement()).to.be.revertedWithCustomError(
      escrow, "WalletReplacementInvalidLock"
    );
  });

  it("rejects any amount that differs from the frozen manifest", async function () {
    const { escrow } = await fixture(unit);
    await escrow.pause();
    await expect(escrow.executeApprovedWalletReplacement()).to.be.revertedWithCustomError(
      escrow, "WalletReplacementInvalidLock"
    );
    expect(await escrow.lockedFunds(WP_OLD, 4, 5)).to.equal(89n * unit);
    expect(await escrow.lockedFunds(WP_NEW, 4, 5)).to.equal(0);
  });
});

const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

const WP_OLD = "0xC0545331E20587208d4b27b2A3e4920Cc481133a";
const WP_NEW = "0x1EA5513e017b4e25847e91aBc84aC8686331f80B";
const RY_OLD = "0x2F1E28756A42A3680b5AD42C58A0c3887C9e60bA";
const RY_NEW = "0xFb8D46674f51882baaA2c9606122484434FF2DC2";
const unit = 10n ** 6n;

describe("wallet replacement utility-token migrators", function () {
  async function deploy(name) {
    const [owner, outsider] = await ethers.getSigners();
    const Guardian = await ethers.getContractFactory("MockMigrationGuardian");
    const guardian = await Guardian.deploy();
    const Factory = await ethers.getContractFactory(name);
    const token = await upgrades.deployProxy(
      Factory,
      [owner.address, await guardian.getAddress()],
      { initializer: "initialize", kind: "uups", unsafeAllow: ["constructor", "missing-initializer"] }
    );
    await token.setAuthorizedOperator(owner.address, true);
    return { token, owner, outsider };
  }

  it("moves exact FGT balances without changing supply", async function () {
    const { token, outsider } = await deploy("FGTWalletReplacementMigrator");
    await token.mint(WP_OLD, 150n * unit, "fixture");
    await token.mint(RY_OLD, 70n * unit, "fixture");
    const supplyBefore = await token.totalSupply();

    await expect(token.connect(outsider).executeApprovedWalletReplacement()).to.be.reverted;
    await expect(token.executeApprovedWalletReplacement()).to.be.revertedWithCustomError(token, "ExpectedPause");
    await token.pause();
    await token.executeApprovedWalletReplacement();

    expect(await token.balanceOf(WP_OLD)).to.equal(0);
    expect(await token.balanceOf(RY_OLD)).to.equal(0);
    expect(await token.balanceOf(WP_NEW)).to.equal(150n * unit);
    expect(await token.balanceOf(RY_NEW)).to.equal(70n * unit);
    expect(await token.lockedBalanceOf(WP_NEW)).to.equal(0);
    expect(await token.lockedBalanceOf(RY_NEW)).to.equal(0);
    expect(await token.totalSupply()).to.equal(supplyBefore);
    await expect(token.executeApprovedWalletReplacement()).to.be.revertedWithCustomError(
      token, "WalletReplacementInvalidBalance"
    );
  });

  it("moves WP FGTr and proves both RY wallets remain empty", async function () {
    const { token } = await deploy("FGTrWalletReplacementMigrator");
    await token.mint(WP_OLD, 15n * unit, "fixture");
    const supplyBefore = await token.totalSupply();
    await token.pause();
    await token.executeApprovedWalletReplacement();

    expect(await token.balanceOf(WP_OLD)).to.equal(0);
    expect(await token.balanceOf(WP_NEW)).to.equal(15n * unit);
    expect(await token.balanceOf(RY_OLD)).to.equal(0);
    expect(await token.balanceOf(RY_NEW)).to.equal(0);
    expect(await token.totalSupply()).to.equal(supplyBefore);
  });

  it("rejects migration when a replacement wallet is not empty", async function () {
    const { token } = await deploy("FGTWalletReplacementMigrator");
    await token.mint(WP_OLD, 150n * unit, "fixture");
    await token.mint(RY_OLD, 70n * unit, "fixture");
    await token.mint(WP_NEW, unit, "unexpected");
    await token.pause();
    await expect(token.executeApprovedWalletReplacement()).to.be.revertedWithCustomError(
      token, "WalletReplacementInvalidBalance"
    );
    expect(await token.balanceOf(WP_OLD)).to.equal(150n * unit);
  });
});

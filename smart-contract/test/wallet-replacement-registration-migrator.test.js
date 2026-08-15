const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

const WP_OLD = "0xC0545331E20587208d4b27b2A3e4920Cc481133a";
const WP_NEW = "0x1EA5513e017b4e25847e91aBc84aC8686331f80B";
const RY_OLD = "0x2F1E28756A42A3680b5AD42C58A0c3887C9e60bA";
const RY_NEW = "0xFb8D46674f51882baaA2c9606122484434FF2DC2";
const WP_SPONSOR = "0x3F02D99D7398ACdb29b2F6DCA50a0E35908629C1";

const sponsorChildren = [
  "0x41baab62394beefe994128fcfafc45ab34de7dcf",
  RY_OLD,
  "0x16e5b21eb13d8f0381d61770834df07f37bb802e",
  "0x03d0343c4138e42804774638f0cf0866381763a2",
  "0xeb752486bead4844c7ef8416ed6c6b9881fdf7ee",
  "0xee0d8e1152fb067e8276e0e8c10ed33dc0d4d0d8",
  "0xcc0af2eacf2937a1526f23f137644d4f94821899",
  "0x3734223b5db7438dc86d8508aa76805afccb202f",
  "0xd39db4b1535bcc980915bb5e92c601783213f06a",
  "0x0fded89d00403c941f94e44185e5400b322042bd",
  "0xa4e1197a882d91ebdb3614b7b02a21f1c1c2dba2",
];
const sponsorOldParents = sponsorChildren.map((_, i) => (i < 9 ? WP_OLD : RY_OLD));
const matrixUsers = [
  "0x03d0343c4138e42804774638f0cf0866381763a2",
  "0x0fded89d00403c941f94e44185e5400b322042bd",
  "0x16e5b21eb13d8f0381d61770834df07f37bb802e",
  RY_OLD,
  "0x41baab62394beefe994128fcfafc45ab34de7dcf",
  "0xa4e1197a882d91ebdb3614b7b02a21f1c1c2dba2",
  RY_OLD,
  "0x6f6036351989d89890c1a1e5a5e0e405d532d414",
  "0xa4e1197a882d91ebdb3614b7b02a21f1c1c2dba2",
  "0xcc0af2eacf2937a1526f23f137644d4f94821899",
];
const matrixLevels = [2, 2, 2, 2, 2, 2, 3, 3, 3, 3];
const matrixOldParents = [WP_OLD, RY_OLD, RY_OLD, WP_OLD, WP_OLD, RY_OLD, WP_OLD, WP_OLD, RY_OLD, WP_OLD];

describe("RegistrationWalletReplacementMigrator", function () {
  async function fixture() {
    const [owner, outsider] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("MockUSDT");
    const usdt = await Token.deploy();
    const Guardian = await ethers.getContractFactory("MockMigrationGuardian");
    const guardian = await Guardian.deploy();
    const Factory = await ethers.getContractFactory("RegistrationWalletReplacementMigratorHarness");
    const registration = await upgrades.deployProxy(
      Factory,
      [await usdt.getAddress(), ethers.ZeroAddress, owner.address, await guardian.getAddress()],
      { initializer: "initialize", kind: "uups", unsafeAllow: ["constructor"] }
    );

    await registration.seedIdentity(WP_OLD, WP_SPONSOR, [1, 2, 3, 4]);
    await registration.seedIdentity(RY_OLD, WP_OLD, [1, 2, 3]);
    for (let i = 0; i < sponsorChildren.length; i++) {
      const child = sponsorChildren[i];
      if (child !== RY_OLD) await registration.seedIdentity(child, sponsorOldParents[i], []);
    }
    for (let i = 0; i < matrixUsers.length; i++) {
      await registration.seedMatrixParent(matrixUsers[i], matrixLevels[i], matrixOldParents[i]);
    }
    return { registration, owner, outsider };
  }

  function execute(registration, signer) {
    return registration.connect(signer).executeApprovedWalletReplacement(
      sponsorChildren, sponsorOldParents, matrixUsers, matrixLevels, matrixOldParents
    );
  }

  it("requires the owner and paused state", async function () {
    const { registration, owner, outsider } = await fixture();
    await expect(execute(registration, outsider)).to.be.reverted;
    await expect(execute(registration, owner)).to.be.revertedWithCustomError(registration, "ExpectedPause");
  });

  it("rejects any manifest mutation before changing state", async function () {
    const { registration } = await fixture();
    await registration.pause();
    const altered = [...matrixLevels];
    altered[0] = 3;
    await expect(
      registration.executeApprovedWalletReplacement(
        sponsorChildren, sponsorOldParents, matrixUsers, altered, matrixOldParents
      )
    ).to.be.revertedWithCustomError(registration, "WalletReplacementManifestMismatch");
    expect(await registration.isRegistered(WP_OLD)).to.equal(true);
    expect(await registration.isRegistered(WP_NEW)).to.equal(false);
  });

  it("moves both identities and rewrites exact sponsor and matrix references once", async function () {
    const { registration, owner } = await fixture();
    await registration.pause();
    await expect(execute(registration, owner))
      .to.emit(registration, "WalletReplacementMigrationCompleted")
      .withArgs(WP_NEW, RY_NEW);

    expect(await registration.isRegistered(WP_OLD)).to.equal(false);
    expect(await registration.isRegistered(RY_OLD)).to.equal(false);
    expect(await registration.isRegistered(WP_NEW)).to.equal(true);
    expect(await registration.isRegistered(RY_NEW)).to.equal(true);
    expect(await registration.referrerOf(WP_NEW)).to.equal(WP_SPONSOR);
    expect(await registration.referrerOf(RY_NEW)).to.equal(WP_NEW);

    for (let level = 1; level <= 10; level++) {
      expect(await registration.levelActivated(WP_NEW, level)).to.equal(level <= 4);
      expect(await registration.levelActivated(RY_NEW, level)).to.equal(level <= 3);
      expect(await registration.levelActivated(WP_OLD, level)).to.equal(false);
      expect(await registration.levelActivated(RY_OLD, level)).to.equal(false);
    }
    for (let i = 0; i < sponsorChildren.length; i++) {
      const child = sponsorChildren[i] === RY_OLD ? RY_NEW : sponsorChildren[i];
      const expected = sponsorOldParents[i] === WP_OLD ? WP_NEW : RY_NEW;
      expect(await registration.referrerOf(child)).to.equal(expected);
    }
    for (let i = 0; i < matrixUsers.length; i++) {
      const user = matrixUsers[i] === RY_OLD ? RY_NEW : matrixUsers[i];
      const expected = matrixOldParents[i] === WP_OLD ? WP_NEW : RY_NEW;
      expect(await registration.currentMatrixParentOf(user, matrixLevels[i])).to.equal(expected);
    }
    await expect(execute(registration, owner)).to.be.revertedWithCustomError(
      registration, "WalletReplacementInvalidState"
    );
  });
});

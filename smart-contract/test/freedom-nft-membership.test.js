const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("Freedom NFT membership", function () {
  const UNIT = 10n ** 6n;
  let owner;
  let member;
  let outsider;
  let guardian;
  let fgt;
  let fpt;
  let membership;

  beforeEach(async function () {
    [owner, member, outsider] = await ethers.getSigners();
    const Guardian = await ethers.getContractFactory("MockMigrationGuardian");
    guardian = await Guardian.deploy();
    const Token = await ethers.getContractFactory("FPTToken");
    fgt = await upgrades.deployProxy(Token, [owner.address, await guardian.getAddress()], { kind: "uups" });
    fpt = await upgrades.deployProxy(Token, [owner.address, await guardian.getAddress()], { kind: "uups" });
    const Membership = await ethers.getContractFactory("FreedomNFTMembership");
    membership = await upgrades.deployProxy(
      Membership,
      [await fgt.getAddress(), await fpt.getAddress(), owner.address, await guardian.getAddress()],
      { kind: "uups" }
    );
    for (const token of [fgt, fpt]) {
      await token.setAuthorizedOperator(owner.address, true);
      await token.setAuthorizedOperator(await membership.getAddress(), true);
      await token.mint(member.address, 62_000n * UNIT, "test qualification");
    }
  });

  it("mints at an exact mixed-token threshold and is non-transferable", async function () {
    await membership.connect(member).mintMembership(1, 2_000n * UNIT, 3_700n * UNIT);
    const state = await membership.membershipOf(member.address);
    expect(state.tier).to.equal(1);
    expect(state.lockedFGT).to.equal(2_000n * UNIT);
    expect(state.lockedFPT).to.equal(3_700n * UNIT);
    expect(state.rewardEligible).to.equal(true);
    expect(await membership.ownerOf(state.tokenId)).to.equal(member.address);
    await expect(
      membership.connect(member).transferFrom(member.address, outsider.address, state.tokenId)
    ).to.be.revertedWithCustomError(membership, "NonTransferable");
    await expect(
      membership.connect(outsider).mintMembership(1, 0, 5_699n * UNIT)
    ).to.be.revertedWithCustomError(membership, "IncorrectLockTotal");
  });

  it("freezes immediately after unlock and restores only at the exact threshold", async function () {
    await membership.connect(member).mintMembership(1, 2_000n * UNIT, 3_700n * UNIT);
    await membership.connect(member).unlockQualification(0, 700n * UNIT);
    let state = await membership.membershipOf(member.address);
    expect(state.rewardEligible).to.equal(false);
    expect(state.lockedFPT).to.equal(3_000n * UNIT);

    await expect(
      membership.connect(member).restoreEligibility(0, 699n * UNIT)
    ).to.be.revertedWithCustomError(membership, "IncorrectLockTotal");
    await membership.connect(member).restoreEligibility(0, 700n * UNIT);
    state = await membership.membershipOf(member.address);
    expect(state.rewardEligible).to.equal(true);
    expect(state.lockedFGT + state.lockedFPT).to.equal(5_700n * UNIT);
  });

  it("atomically replaces the NFT on upgrade and downgrade", async function () {
    await membership.connect(member).mintMembership(1, 2_000n * UNIT, 3_700n * UNIT);
    const first = await membership.membershipOf(member.address);

    await membership.connect(member).upgradeMembership(2, 8_000n * UNIT, 10_700n * UNIT);
    const second = await membership.membershipOf(member.address);
    expect(second.tier).to.equal(2);
    expect(second.tokenId).to.not.equal(first.tokenId);
    await expect(membership.ownerOf(first.tokenId)).to.be.revertedWithCustomError(
      membership, "ERC721NonexistentToken"
    );
    expect(await membership.ownerOf(second.tokenId)).to.equal(member.address);

    await membership.connect(member).downgradeMembership(1, 1_000n * UNIT, 4_700n * UNIT);
    const third = await membership.membershipOf(member.address);
    expect(third.tier).to.equal(1);
    expect(third.lockedFGT + third.lockedFPT).to.equal(5_700n * UNIT);
    expect(await fgt.lockedBalanceOf(member.address)).to.equal(1_000n * UNIT);
    expect(await fpt.lockedBalanceOf(member.address)).to.equal(4_700n * UNIT);
  });
});

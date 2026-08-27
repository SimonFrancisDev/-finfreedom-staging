const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("Freedom-Plus registration and token controller", function () {
  this.timeout(180_000);

  const UNIT = 10n ** 6n;

  let owner;
  let id1;
  let participant;
  let participantTwo;
  let outsider;
  let guardian;
  let manager;
  let gateway;

  beforeEach(async function () {
    [owner, id1, participant, participantTwo, outsider] = await ethers.getSigners();

    const Guardian = await ethers.getContractFactory("MockMigrationGuardian");
    guardian = await Guardian.deploy();

    const Manager = await ethers.getContractFactory("MockFreedomPlusLevelManager");
    manager = await Manager.deploy();

    const Gateway = await ethers.getContractFactory("MockFFreedomGatewayRegistration");
    gateway = await Gateway.deploy();
    await gateway.setParticipant(participant.address, id1.address, true, true);
    await gateway.setParticipant(participantTwo.address, id1.address, true, true);
  });

  async function deployRegistration() {
    const Registration = await ethers.getContractFactory("FreedomPlusRegistration");
    const registration = await upgrades.deployProxy(
      Registration,
      [await manager.getAddress(), id1.address, owner.address, await guardian.getAddress()],
      { kind: "uups" }
    );
    await registration.setFFreedomRegistration(await gateway.getAddress());
    return registration;
  }

  it("requires F-Freedom registration, active Level 1, and the exact permanent sponsor", async function () {
    const registration = await deployRegistration();

    await gateway.setParticipant(outsider.address, id1.address, false, false);
    await expect(registration.connect(outsider).register(id1.address))
      .to.be.revertedWithCustomError(registration, "FFreedomLevelOneInactive")
      .withArgs(outsider.address);

    await gateway.setParticipant(outsider.address, id1.address, true, false);
    await expect(registration.connect(outsider).register(id1.address))
      .to.be.revertedWithCustomError(registration, "FFreedomLevelOneInactive")
      .withArgs(outsider.address);

    await gateway.setParticipant(outsider.address, participant.address, true, true);
    await expect(registration.connect(outsider).register(id1.address))
      .to.be.revertedWithCustomError(registration, "PermanentSponsorMismatch")
      .withArgs(participant.address, id1.address);
  });
  it("makes registration and paid Level 1 activation one atomic state transition", async function () {
    const registration = await deployRegistration();

    expect(await registration.isRegistered(id1.address)).to.equal(true);
    expect(await registration.participantNumber(id1.address)).to.equal(1);
    expect(await registration.registeredCount()).to.equal(1);

    await registration.connect(participant).register(id1.address);

    expect(await registration.isRegistered(participant.address)).to.equal(true);
    expect(await registration.sponsorOf(participant.address)).to.equal(id1.address);
    expect(await registration.participantNumber(participant.address)).to.equal(2);
    expect(await registration.isLevelActive(participant.address, 1)).to.equal(true);
    expect(await manager.lastParticipant()).to.equal(participant.address);
    expect(await manager.lastSponsor()).to.equal(id1.address);
    expect(await manager.lastLevel()).to.equal(1);
  });

  it("rolls registration back completely when Level 1 settlement fails", async function () {
    const registration = await deployRegistration();
    await manager.setShouldRevert(true);

    await expect(
      registration.connect(participant).register(id1.address)
    ).to.be.revertedWith("Mock settlement failed");

    expect(await registration.isRegistered(participant.address)).to.equal(false);
    expect(await registration.sponsorOf(participant.address)).to.equal(ethers.ZeroAddress);
    expect(await registration.participantNumber(participant.address)).to.equal(0);
    expect(await registration.registeredCount()).to.equal(1);
    expect(await registration.isLevelActive(participant.address, 1)).to.equal(false);
  });

  it("preserves the permanent sponsor even when that sponsor has not joined Freedom-Plus", async function () {
    const registration = await deployRegistration();

    await expect(
      registration.connect(participant).register(participant.address)
    ).to.be.revertedWithCustomError(registration, "SelfSponsorship");
    await gateway.setParticipant(participant.address, outsider.address, true, true);
    await registration.connect(participant).register(outsider.address);
    expect(await registration.sponsorOf(participant.address)).to.equal(outsider.address);
    expect(await manager.lastSponsor()).to.equal(outsider.address);
    await expect(
      registration.connect(participant).register(outsider.address)
    ).to.be.revertedWithCustomError(registration, "AlreadyRegistered");
  });

  it("allows only manual sequential Levels 2 through 7 and never auto-activates", async function () {
    const registration = await deployRegistration();
    await registration.connect(participant).register(id1.address);

    expect(await registration.isLevelActive(participant.address, 2)).to.equal(false);
    await expect(
      registration.connect(participant).activateLevel(3)
    ).to.be.revertedWithCustomError(registration, "PreviousLevelInactive");
    await expect(
      registration.connect(participant).activateLevel(1)
    ).to.be.revertedWithCustomError(registration, "LevelOneRequiresRegistration");

    for (let level = 2; level <= 7; level++) {
      await registration.connect(participant).activateLevel(level);
      expect(await registration.isLevelActive(participant.address, level)).to.equal(true);
      expect(await manager.lastLevel()).to.equal(level);
      if (level < 7) {
        expect(await registration.isLevelActive(participant.address, level + 1)).to.equal(false);
      }
    }

    await expect(
      registration.connect(participant).activateLevel(7)
    ).to.be.revertedWithCustomError(registration, "LevelAlreadyActive");
  });

  it("rejects activation by an unregistered wallet", async function () {
    const registration = await deployRegistration();
    await expect(
      registration.connect(participantTwo).activateLevel(2)
    ).to.be.revertedWithCustomError(registration, "NotRegistered");
  });

  async function deployTokenGraph() {
    const FPT = await ethers.getContractFactory("FPTToken");
    const FPTr = await ethers.getContractFactory("FPTrToken");
    const fpt = await upgrades.deployProxy(
      FPT,
      [owner.address, await guardian.getAddress()],
      { kind: "uups" }
    );
    const fptr = await upgrades.deployProxy(
      FPTr,
      [owner.address, await guardian.getAddress()],
      { kind: "uups" }
    );

    const Controller = await ethers.getContractFactory("FreedomPlusTokenController");
    const controller = await upgrades.deployProxy(
      Controller,
      [await fpt.getAddress(), await fptr.getAddress(), owner.address, await guardian.getAddress()],
      { kind: "uups" }
    );

    await fpt.setAuthorizedOperator(await controller.getAddress(), true);
    await fptr.setAuthorizedOperator(await controller.getAddress(), true);
    await controller.setLevelManager(await manager.getAddress());
    return { fpt, fptr, controller };
  }

  it("issues exact FPT once for paid or genesis first activation", async function () {
    const { fpt, controller } = await deployTokenGraph();

    await manager.issueFirstActivation(controller, participant.address, 1, 50n * UNIT);
    expect(await fpt.balanceOf(participant.address)).to.equal(50n * UNIT);
    expect(await controller.totalFPTMinted(participant.address)).to.equal(50n * UNIT);

    await expect(
      manager.issueGenesisActivation(controller, participant.address, 1, 50n * UNIT)
    ).to.be.revertedWithCustomError(controller, "FirstActivationRewardAlreadyMinted");

    await manager.issueGenesisActivation(controller, participantTwo.address, 1, 50n * UNIT);
    expect(await fpt.balanceOf(participantTwo.address)).to.equal(50n * UNIT);
  });

  it("issues FPTr once per immutable funded-recycle activation ID", async function () {
    const { fptr, controller } = await deployTokenGraph();
    const recycleId = ethers.keccak256(ethers.toUtf8Bytes("recycle-activation-1"));

    await manager.issueRecycle(controller, participant.address, 3, 225n * UNIT, recycleId);
    expect(await fptr.balanceOf(participant.address)).to.equal(225n * UNIT);
    expect(await controller.totalFPTrMinted(participant.address)).to.equal(225n * UNIT);

    await expect(
      manager.issueRecycle(controller, participant.address, 3, 225n * UNIT, recycleId)
    ).to.be.revertedWithCustomError(controller, "RecycleRewardAlreadyMinted");
    expect(await fptr.balanceOf(participant.address)).to.equal(225n * UNIT);
  });

  it("rejects token issuance from any caller other than the configured manager", async function () {
    const { controller } = await deployTokenGraph();
    await expect(
      controller.connect(outsider).onFirstActivation(participant.address, 1, 50n * UNIT)
    ).to.be.revertedWithCustomError(controller, "OnlyLevelManager");
  });
});

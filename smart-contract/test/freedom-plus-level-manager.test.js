const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("Freedom-Plus LevelManager custody boundary", function () {
  this.timeout(240_000);

  const UNIT = 10n ** 6n;

  let owner;
  let id1;
  let participant;
  let outsider;
  let guardian;

  beforeEach(async function () {
    [owner, id1, participant, outsider] = await ethers.getSigners();
    const Guardian = await ethers.getContractFactory("MockMigrationGuardian");
    guardian = await Guardian.deploy();
  });

  async function deployGraph(usdtContractName = "MockUSDT") {
    const Usdt = await ethers.getContractFactory(usdtContractName);
    const usdt = await Usdt.deploy();

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

    const Manager = await ethers.getContractFactory("FreedomPlusLevelManager");
    const manager = await upgrades.deployProxy(
      Manager,
      [await usdt.getAddress(), await controller.getAddress(), owner.address, await guardian.getAddress()],
      { kind: "uups" }
    );

    const Registration = await ethers.getContractFactory("FreedomPlusRegistration");
    const registration = await upgrades.deployProxy(
      Registration,
      [await manager.getAddress(), id1.address, owner.address, await guardian.getAddress()],
      { kind: "uups" }
    );
    const Gateway = await ethers.getContractFactory("MockFFreedomGatewayRegistration");
    const gateway = await Gateway.deploy();
    await gateway.setParticipant(participant.address, id1.address, true, true);
    await registration.setFFreedomRegistration(await gateway.getAddress());

    const Router = await ethers.getContractFactory("MockFreedomPlusSettlementRouter");
    const router = await Router.deploy();

    await manager.configureRegistration(await registration.getAddress());
    await manager.configureSettlementRouter(await router.getAddress());
    await controller.setLevelManager(await manager.getAddress());
    await fpt.setAuthorizedOperator(await controller.getAddress(), true);
    await fptr.setAuthorizedOperator(await controller.getAddress(), true);

    return { usdt, fpt, fptr, controller, manager, registration, router };
  }

  it("collects exactly 50 USDT, settles Level 1, registers, and mints 50 FPT atomically", async function () {
    const { usdt, fpt, manager, registration, router } = await deployGraph();
    await usdt.mint(participant.address, 50n * UNIT);
    await usdt.connect(participant).approve(await manager.getAddress(), 50n * UNIT);

    await registration.connect(participant).register(id1.address);

    expect(await usdt.balanceOf(participant.address)).to.equal(0);
    expect(await usdt.balanceOf(await router.getAddress())).to.equal(50n * UNIT);
    expect(await registration.isRegistered(participant.address)).to.equal(true);
    expect(await registration.isLevelActive(participant.address, 1)).to.equal(true);
    expect(await fpt.balanceOf(participant.address)).to.equal(50n * UNIT);
    expect(await router.lastParticipant()).to.equal(participant.address);
    expect(await router.lastSponsor()).to.equal(id1.address);
    expect(await router.lastLevel()).to.equal(1);
    expect(await router.lastPrice()).to.equal(50n * UNIT);
    expect(await manager.activationProcessed(await router.lastActivationId())).to.equal(true);
  });

  it("collects each later level manually at its exact tripled price", async function () {
    const { usdt, fpt, manager, registration, router } = await deployGraph();
    await usdt.mint(participant.address, 200n * UNIT);
    await usdt.connect(participant).approve(await manager.getAddress(), 200n * UNIT);

    await registration.connect(participant).register(id1.address);
    expect(await registration.isLevelActive(participant.address, 2)).to.equal(false);

    await registration.connect(participant).activateLevel(2);
    expect(await router.lastLevel()).to.equal(2);
    expect(await router.lastPrice()).to.equal(150n * UNIT);
    expect(await registration.isLevelActive(participant.address, 2)).to.equal(true);
    expect(await registration.isLevelActive(participant.address, 3)).to.equal(false);
    expect(await fpt.balanceOf(participant.address)).to.equal(200n * UNIT);
  });

  it("rolls back USDT, registration, activation nonce, and FPT when settlement fails", async function () {
    const { usdt, fpt, manager, registration, router } = await deployGraph();
    await usdt.mint(participant.address, 50n * UNIT);
    await usdt.connect(participant).approve(await manager.getAddress(), 50n * UNIT);
    await router.setShouldRevert(true);

    await expect(
      registration.connect(participant).register(id1.address)
    ).to.be.revertedWith("Mock router failed");

    expect(await usdt.balanceOf(participant.address)).to.equal(50n * UNIT);
    expect(await usdt.balanceOf(await router.getAddress())).to.equal(0);
    expect(await registration.isRegistered(participant.address)).to.equal(false);
    expect(await manager.activationNonce()).to.equal(0);
    expect(await fpt.balanceOf(participant.address)).to.equal(0);
  });

  it("rejects fee-on-transfer payment without retaining funds or registration state", async function () {
    const { usdt, fpt, manager, registration, router } = await deployGraph("MockFeeUSDT");
    await usdt.mint(participant.address, 50n * UNIT);
    await usdt.connect(participant).approve(await manager.getAddress(), 50n * UNIT);

    await expect(
      registration.connect(participant).register(id1.address)
    ).to.be.revertedWithCustomError(manager, "IncorrectTransferredAmount");

    expect(await usdt.balanceOf(participant.address)).to.equal(50n * UNIT);
    expect(await usdt.balanceOf(await router.getAddress())).to.equal(0);
    expect(await registration.isRegistered(participant.address)).to.equal(false);
    expect(await fpt.balanceOf(participant.address)).to.equal(0);
  });

  it("rejects activation requests that bypass Registration", async function () {
    const { manager } = await deployGraph();
    await expect(
      manager.connect(outsider).activatePaidLevel(participant.address, id1.address, 1)
    ).to.be.revertedWithCustomError(manager, "OnlyRegistration");
  });

  it("locks the Registration and SettlementRouter configuration to one initial assignment", async function () {
    const { manager, registration, router } = await deployGraph();
    await expect(
      manager.configureRegistration(await registration.getAddress())
    ).to.be.revertedWithCustomError(manager, "RegistrationAlreadyConfigured");
    await expect(
      manager.configureSettlementRouter(await router.getAddress())
    ).to.be.revertedWithCustomError(manager, "SettlementRouterAlreadyConfigured");
  });
});

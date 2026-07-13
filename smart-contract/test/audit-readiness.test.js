const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

const usdtUnits = (value) => ethers.parseUnits(String(value), 6);
const mirrorAmount = usdtUnits(10);

async function deployGuardian(owner) {
  const Guardian = await ethers.getContractFactory("Guardian");
  const guardian = await Guardian.deploy(owner.address);
  await guardian.waitForDeployment();
  return guardian;
}

async function deployCoreSystem(options = {}) {
  const { configureRouter = true } = options;
  const signers = await ethers.getSigners();
  const [owner, nftPool, operationsWallet, ...users] = signers;
  const guardian = await deployGuardian(owner);

  const MockUSDT = await ethers.getContractFactory("contracts/mocks/MockUSDT.sol:MockUSDT");
  const usdt = await MockUSDT.deploy();
  await usdt.waitForDeployment();

  const Escrow = await ethers.getContractFactory("AutoUpgradeEscrow");
  const escrow = await upgrades.deployProxy(Escrow, [usdt.target, guardian.target], {
    initializer: "initialize",
    kind: "uups",
  });
  await escrow.waitForDeployment();

  const Registration = await ethers.getContractFactory("RegistrationFixed");
  const registration = await upgrades.deployProxy(
    Registration,
    [usdt.target, ethers.ZeroAddress, owner.address, guardian.target],
    { initializer: "initialize", kind: "uups" }
  );
  await registration.waitForDeployment();

  const LevelManager = await ethers.getContractFactory("LevelManager");
  const levelManager = await upgrades.deployProxy(
    LevelManager,
    [
      usdt.target,
      nftPool.address,
      operationsWallet.address,
      registration.target,
      escrow.target,
      guardian.target,
    ],
    {
      initializer: "initialize",
      kind: "uups",
      unsafeAllow: ["delegatecall"],
    }
  );
  await levelManager.waitForDeployment();

  const Router = await ethers.getContractFactory("LevelSettlementRouter");
  const router = await Router.deploy(levelManager.target, usdt.target);
  await router.waitForDeployment();
  if (configureRouter) {
    await levelManager.setSettlementRouter(router.target);
  }

  const P4 = await ethers.getContractFactory("P4Orbit");
  const p4 = await upgrades.deployProxy(
    P4,
    [levelManager.target, escrow.target, registration.target, guardian.target],
    { initializer: "initialize", kind: "uups" }
  );
  await p4.waitForDeployment();

  const P12 = await ethers.getContractFactory("P12Orbit");
  const p12 = await upgrades.deployProxy(
    P12,
    [levelManager.target, escrow.target, registration.target, guardian.target],
    { initializer: "initialize", kind: "uups" }
  );
  await p12.waitForDeployment();

  const P39 = await ethers.getContractFactory("P39Orbit");
  const p39 = await upgrades.deployProxy(
    P39,
    [levelManager.target, escrow.target, registration.target, guardian.target],
    { initializer: "initialize", kind: "uups" }
  );
  await p39.waitForDeployment();

  await registration.setLevelManager(levelManager.target);
  await escrow.setLevelManager(levelManager.target);
  await levelManager.setOrbitContracts(p4.target, p12.target, p39.target);
  await levelManager.setFounderWallets(
    users.slice(0, 8).map((signer) => signer.address),
    [1250, 1250, 1250, 1250, 1250, 1250, 1250, 1250]
  );
  await levelManager.approveEscrow(ethers.MaxUint256);
  await registration.setID1Wallet(owner.address);

  async function fundAndApprove(user, amount = 100000) {
    await usdt.mint(user.address, usdtUnits(amount));
    await usdt.connect(user).approve(levelManager.target, usdtUnits(amount));
  }

  async function register(user, referrer = owner.address) {
    await fundAndApprove(user);
    await registration.connect(user).register(referrer);
  }

  async function activateToLevel(user, level) {
    for (let current = 2; current <= level; current += 1) {
      if (!(await registration.isLevelActivated(user.address, current))) {
        await registration.connect(user).activateLevel(current);
      }
    }
  }

  return {
    owner,
    users,
    guardian,
    usdt,
    escrow,
    registration,
    levelManager,
    router,
    p4,
    p12,
    p39,
    fundAndApprove,
    register,
    activateToLevel,
  };
}

async function deployLevelManagerWithMockRegistration() {
  const [owner, nftPool, operationsWallet] = await ethers.getSigners();
  const guardian = await deployGuardian(owner);

  const MockUSDT = await ethers.getContractFactory("contracts/mocks/MockUSDT.sol:MockUSDT");
  const usdt = await MockUSDT.deploy();
  await usdt.waitForDeployment();

  const MockEscrow = await ethers.getContractFactory("contracts/mocks/MockEscrow.sol:MockEscrow");
  const escrow = await MockEscrow.deploy();
  await escrow.waitForDeployment();

  const MockRegistration = await ethers.getContractFactory("contracts/mocks/MockRegistration.sol:MockRegistration");
  const registration = await MockRegistration.deploy();
  await registration.waitForDeployment();

  const LevelManager = await ethers.getContractFactory("LevelManager");
  const levelManager = await upgrades.deployProxy(
    LevelManager,
    [
      usdt.target,
      nftPool.address,
      operationsWallet.address,
      registration.target,
      escrow.target,
      guardian.target,
    ],
    {
      initializer: "initialize",
      kind: "uups",
      unsafeAllow: ["delegatecall"],
    }
  );
  await levelManager.waitForDeployment();

  await registration.setLevelManager(levelManager.target);
  await registration.setID1Wallet(owner.address);

  return { owner, registration, levelManager };
}

async function impersonateLevelManager(levelManager) {
  await ethers.provider.send("hardhat_impersonateAccount", [levelManager.target]);
  await ethers.provider.send("hardhat_setBalance", [
    levelManager.target,
    "0x56BC75E2D63100000",
  ]);
  return ethers.getSigner(levelManager.target);
}

function findEvent(receipt, contract, name) {
  return receipt.logs
    .map((log) => {
      try {
        return contract.interface.parseLog(log);
      } catch {
        return null;
      }
    })
    .find((event) => event?.name === name);
}

function parseEvents(receipt, contract, name) {
  return receipt.logs
    .map((log) => {
      try {
        return contract.interface.parseLog(log);
      } catch {
        return null;
      }
    })
    .filter((event) => event?.name === name);
}

async function balanceDeltas(usdt, accounts, action) {
  const before = await Promise.all(accounts.map((account) => usdt.balanceOf(account.address)));
  const tx = await action();
  const receipt = await tx.wait();
  const after = await Promise.all(accounts.map((account) => usdt.balanceOf(account.address)));
  return {
    receipt,
    deltas: after.map((balance, index) => balance - before[index]),
  };
}

async function createFundedWallets(funder, count) {
  const wallets = [];
  for (let index = 0; index < count; index += 1) {
    const wallet = ethers.Wallet.createRandom().connect(ethers.provider);
    await funder.sendTransaction({
      to: wallet.address,
      value: ethers.parseEther("1"),
    });
    wallets.push(wallet);
  }
  return wallets;
}

async function findOrbitPosition(orbit, orbitOwner, level, occupant, maxPosition) {
  for (let position = 1; position <= maxPosition; position += 1) {
    const row = await orbit.getPosition(orbitOwner.address, level, position);
    if (row.occupant === occupant.address) {
      const rule = await orbit.getPositionRuleView(orbitOwner.address, level, position);
      const activation = await orbit.getPositionActivationData(orbitOwner.address, level, position);
      return {
        position,
        line: Number(rule.line),
        arrival: Number(rule.linePaymentNumber),
        isMirror: activation.isMirror,
      };
    }
  }

  return null;
}

describe("Audit readiness contract invariants", function () {
  this.timeout(240000);

  it("deploys the production proxy graph and registers a user through Level 1", async function () {
    const { owner, users, registration, levelManager, p4, register } = await deployCoreSystem();

    const alice = users[0];
    await register(alice, owner.address);

    expect(await registration.isParticipant(alice.address)).to.equal(true);
    expect(await registration.isLevelActivated(alice.address, 1)).to.equal(true);
    expect(await levelManager.userLevelActivated(alice.address, 1)).to.equal(true);

    const position = await p4.getPosition(owner.address, 1, 1);
    expect(position.occupant).to.equal(alice.address);
  });

  it("lets founder representatives register and activate level 1 without USDT under ID1", async function () {
    const { registration, levelManager, usdt, users, owner, p4 } = await deployCoreSystem();
    const founderRep = users[8];

    await levelManager.setFounderRepresentatives([founderRep.address]);

    expect(await usdt.balanceOf(founderRep.address)).to.equal(0n);
    expect(await usdt.allowance(founderRep.address, levelManager.target)).to.equal(0n);

    await expect(registration.connect(founderRep).register(ethers.ZeroAddress))
      .to.emit(levelManager, "FounderRepActivated")
      .withArgs(founderRep.address, 1, 1);

    expect(await registration.isRegistered(founderRep.address)).to.equal(true);
    expect(await registration.isLevelActivated(founderRep.address, 1)).to.equal(true);
    expect(await levelManager.founderRepLevelsActivated(founderRep.address)).to.equal(1);

    const id1Position = await p4.getPosition(owner.address, 1, 1);
    expect(id1Position.occupant).to.equal(founderRep.address);
    expect(id1Position.amount).to.equal(0n);

    const ownPosition = await p4.getPosition(founderRep.address, 1, 1);
    expect(ownPosition.occupant).to.equal(ethers.ZeroAddress);
  });

  it("places founder representatives under their chosen active referrer while keeping activation free", async function () {
    const { registration, levelManager, usdt, users, owner, p4, register } = await deployCoreSystem();
    const sponsor = users[0];
    const founderRep = users[8];

    await register(sponsor, owner.address);
    await levelManager.setFounderRepresentatives([founderRep.address]);

    const repInitialUsdt = await usdt.balanceOf(founderRep.address);
    const managerInitialUsdt = await usdt.balanceOf(levelManager.target);

    await expect(registration.connect(founderRep).register(sponsor.address))
      .to.emit(levelManager, "FounderRepActivated")
      .withArgs(founderRep.address, 1, 1);

    expect(await registration.getReferrer(founderRep.address)).to.equal(sponsor.address);
    expect(await usdt.balanceOf(founderRep.address)).to.equal(repInitialUsdt);
    expect(await usdt.balanceOf(levelManager.target)).to.equal(managerInitialUsdt);

    const sponsorPosition = await p4.getPosition(sponsor.address, 1, 1);
    expect(sponsorPosition.occupant).to.equal(founderRep.address);
    expect(sponsorPosition.amount).to.equal(0n);
    expect(await p4.getPositionLineArrivalNumber(sponsor.address, 1, 1)).to.equal(1);

    const id1Position = await p4.getPosition(owner.address, 1, 2);
    expect(id1Position.occupant).to.not.equal(founderRep.address);

    const ownPosition = await p4.getPosition(founderRep.address, 1, 1);
    expect(ownPosition.occupant).to.equal(ethers.ZeroAddress);
  });

  it("lets founder representatives activate levels 1 through 10 once with zero USDT and valid P4/P12/P39 structure", async function () {
    const { registration, levelManager, usdt, users, owner, p4, p12, p39 } = await deployCoreSystem();
    const founderRep = users[8];

    await levelManager.setFounderRepresentatives([founderRep.address]);

    const repInitialUsdt = await usdt.balanceOf(founderRep.address);
    const managerInitialUsdt = await usdt.balanceOf(levelManager.target);

    await registration.connect(founderRep).register(ethers.ZeroAddress);

    for (let level = 2; level <= 10; level += 1) {
      await expect(registration.connect(founderRep).activateLevel(level))
        .to.emit(levelManager, "FounderRepActivated")
        .withArgs(founderRep.address, level, level);
    }

    expect(await levelManager.founderRepLevelsActivated(founderRep.address)).to.equal(10);
    expect(await levelManager.founderRepAllLevelsCompleted(founderRep.address)).to.equal(true);
    expect(await usdt.balanceOf(founderRep.address)).to.equal(repInitialUsdt);
    expect(await usdt.balanceOf(levelManager.target)).to.equal(managerInitialUsdt);

    for (let level = 1; level <= 10; level += 1) {
      expect(await registration.isLevelActivated(founderRep.address, level)).to.equal(true);
      expect(await levelManager.userLevelActivated(founderRep.address, level)).to.equal(true);

      const orbit = level === 1 || level === 4 || level === 7 || level === 10
        ? p4
        : level === 2 || level === 5 || level === 8
          ? p12
          : p39;

      const id1Position = await orbit.getPosition(owner.address, level, 1);
      expect(id1Position.occupant).to.equal(founderRep.address);
      expect(id1Position.amount).to.equal(0n);
      expect(await orbit.getPositionLineArrivalNumber(owner.address, level, 1)).to.equal(1);

      const ownPosition = await orbit.getPosition(founderRep.address, level, 1);
      expect(ownPosition.occupant).to.equal(ethers.ZeroAddress);
    }

    await expect(registration.connect(founderRep).activateLevel(10))
      .to.be.revertedWith("Level already activated");
    await expect(registration.connect(founderRep).activateLevel(11))
      .to.be.revertedWith("Invalid level");
  });

  it("rejects settlement routers that were not deployed for this LevelManager and USDT", async function () {
    const { users, usdt, levelManager } = await deployCoreSystem({ configureRouter: false });
    const Router = await ethers.getContractFactory("LevelSettlementRouter");

    const wrongManagerRouter = await Router.deploy(users[0].address, usdt.target);
    await wrongManagerRouter.waitForDeployment();
    await expect(levelManager.setSettlementRouter(wrongManagerRouter.target))
      .to.be.revertedWithCustomError(levelManager, "InvalidContract");

    const MockUSDT = await ethers.getContractFactory("contracts/mocks/MockUSDT.sol:MockUSDT");
    const wrongUsdt = await MockUSDT.deploy();
    await wrongUsdt.waitForDeployment();

    const wrongTokenRouter = await Router.deploy(levelManager.target, wrongUsdt.target);
    await wrongTokenRouter.waitForDeployment();
    await expect(levelManager.setSettlementRouter(wrongTokenRouter.target))
      .to.be.revertedWithCustomError(levelManager, "InvalidContract");

    const validRouter = await Router.deploy(levelManager.target, usdt.target);
    await validRouter.waitForDeployment();
    await expect(levelManager.setSettlementRouter(validRouter.target))
      .to.emit(levelManager, "SettlementRouterUpdated");

    const replacementRouter = await Router.deploy(levelManager.target, usdt.target);
    await replacementRouter.waitForDeployment();
    await expect(levelManager.setSettlementRouter(replacementRouter.target))
      .to.emit(levelManager, "SettlementRouterUpdated")
      .withArgs(validRouter.target, replacementRouter.target);
  });

  it("allows the owner to replace the settlement router only with a config-matched router", async function () {
    const { users, usdt, levelManager, router } = await deployCoreSystem();
    const Router = await ethers.getContractFactory("LevelSettlementRouter");

    const wrongRouter = await Router.deploy(users[0].address, usdt.target);
    await wrongRouter.waitForDeployment();
    await expect(levelManager.setSettlementRouter(wrongRouter.target))
      .to.be.revertedWithCustomError(levelManager, "InvalidContract");

    const replacementRouter = await Router.deploy(levelManager.target, usdt.target);
    await replacementRouter.waitForDeployment();
    await expect(levelManager.setSettlementRouter(replacementRouter.target))
      .to.emit(levelManager, "SettlementRouterUpdated")
      .withArgs(router.target, replacementRouter.target);
  });

  it("releases only the required escrow amount and leaves surplus locked", async function () {
    const { users, usdt, escrow, levelManager } = await deployCoreSystem();
    const levelManagerSigner = await impersonateLevelManager(levelManager);
    const beneficiary = users[0];

    await usdt.mint(levelManager.target, usdtUnits(130));
    await usdt.connect(levelManagerSigner).approve(escrow.target, usdtUnits(130));

    await escrow
      .connect(levelManagerSigner)
      .lockFunds(beneficiary.address, 1, 2, usdtUnits(130));

    await escrow
      .connect(levelManagerSigner)
      .releaseAmountForUpgrade(
        beneficiary.address,
        1,
        2,
        levelManager.target,
        usdtUnits(80)
      );

    expect(await escrow.getLockedAmount(beneficiary.address, 1, 2)).to.equal(usdtUnits(50));
    expect(await usdt.balanceOf(levelManager.target)).to.equal(usdtUnits(80));
    expect(await usdt.balanceOf(escrow.target)).to.equal(usdtUnits(50));
  });

  it("rejects fee-on-transfer tokens when locking escrow funds", async function () {
    const [owner, beneficiary] = await ethers.getSigners();
    const guardian = await deployGuardian(owner);
    const FeeUSDT = await ethers.getContractFactory("MockFeeUSDT");
    const feeUsdt = await FeeUSDT.deploy();
    await feeUsdt.waitForDeployment();

    const Escrow = await ethers.getContractFactory("AutoUpgradeEscrow");
    const escrow = await upgrades.deployProxy(Escrow, [feeUsdt.target, guardian.target], {
      initializer: "initialize",
      kind: "uups",
    });
    await escrow.waitForDeployment();

    await feeUsdt.mint(owner.address, usdtUnits(100));
    await feeUsdt.approve(escrow.target, usdtUnits(100));

    await expect(
      escrow.lockFunds(beneficiary.address, 1, 2, usdtUnits(10))
    ).to.be.revertedWithCustomError(escrow, "TokenAmountMismatch");
  });

  it("does not allow ID1 wallet replacement after initial configuration", async function () {
    const { owner, users, registration, levelManager } = await deployCoreSystem();

    await expect(registration.setID1Wallet(owner.address))
      .to.emit(registration, "ID1WalletSet")
      .withArgs(owner.address);

    await expect(registration.setID1Wallet(users[0].address))
      .to.be.revertedWith("ID1 wallet already set");

    await expect(levelManager.setID1Wallet(users[0].address))
      .to.be.revertedWithCustomError(levelManager, "OnlyRegistration");
  });

  it("allows approved utility modules to unlock previously locked FGT", async function () {
    const [owner, user, utilityModule] = await ethers.getSigners();
    const guardian = await deployGuardian(owner);

    const FGT = await ethers.getContractFactory("FGTToken");
    const fgt = await upgrades.deployProxy(FGT, [owner.address, guardian.target], {
      initializer: "initialize",
      kind: "uups",
    });
    await fgt.waitForDeployment();

    const FGTr = await ethers.getContractFactory("FGTrToken");
    const fgtr = await upgrades.deployProxy(FGTr, [owner.address, guardian.target], {
      initializer: "initialize",
      kind: "uups",
    });
    await fgtr.waitForDeployment();

    const Controller = await ethers.getContractFactory("FreedomTokenController");
    const controller = await upgrades.deployProxy(
      Controller,
      [fgt.target, fgtr.target, owner.address, guardian.target],
      { initializer: "initialize", kind: "uups" }
    );
    await controller.waitForDeployment();

    await fgt.setAuthorizedOperator(controller.target, true);
    await controller.setLevelManager(owner.address);
    await controller.setApprovedUtilityModule(utilityModule.address, true);

    await controller.onManualActivation(user.address, 1, usdtUnits(10));
    await controller
      .connect(utilityModule)
      .lockFGTForNFT(user.address, usdtUnits(4), "nftQualification");

    let balances = await controller.getFGTBalances(user.address);
    expect(balances.lockedBalance).to.equal(usdtUnits(4));
    expect(balances.availableBalance).to.equal(usdtUnits(6));

    await controller
      .connect(utilityModule)
      .unlockFGTFromNFT(user.address, usdtUnits(3), "nftRelease");

    balances = await controller.getFGTBalances(user.address);
    expect(balances.lockedBalance).to.equal(usdtUnits(1));
    expect(balances.availableBalance).to.equal(usdtUnits(9));

    await expect(
      controller.connect(utilityModule).unlockFGTFromNFT(user.address, usdtUnits(2), "excessRelease")
    ).to.be.revertedWith("Insufficient locked balance");
  });

  it("stores true no-referrer founder-path snapshots at the net amount after system charge", async function () {
    const { users, registration, levelManager, p4, fundAndApprove } = await deployCoreSystem();
    const noReferrerUser = users[0];

    await fundAndApprove(noReferrerUser);
    const tx = await registration.connect(noReferrerUser).register(ethers.ZeroAddress);
    const receipt = await tx.wait();

    const summaryEvent = findEvent(receipt, levelManager, "ActivationFinancialSummaryRecorded");
    expect(summaryEvent).to.not.equal(undefined);
    expect(summaryEvent.args.activationAmount).to.equal(usdtUnits(10));
    expect(summaryEvent.args.systemCharge).to.equal(usdtUnits(1));
    expect(summaryEvent.args.totalLiquidPaid).to.equal(usdtUnits(9));

    const rule = await p4.getPositionRuleView(await levelManager.id1Wallet(), 1, 1);
    expect(rule.isFounderNoReferrerPath).to.equal(true);
    expect(rule.toOwner).to.equal(usdtUnits(9));
    expect(rule.toSpillover1).to.equal(0);
    expect(rule.toSpillover2).to.equal(0);
    expect(rule.toEscrow).to.equal(0);
    expect(rule.toRecycle).to.equal(0);
  });

  it("pays exhausted-upline ID1 fallbacks to founders without creating P12, P39, or P4 positions", async function () {
    const { owner, users, usdt, registration, levelManager, p4, p12, p39, register } =
      await deployCoreSystem();
    const founderWallets = users.slice(0, 8);
    const inactiveSponsor = users[8];
    const fallbackUser = users[9];

    await register(inactiveSponsor, owner.address);
    await register(fallbackUser, inactiveSponsor.address);

    const cases = [
      { level: 2, amount: 20, orbit: p12 },
      { level: 3, amount: 40, orbit: p39 },
      { level: 4, amount: 80, orbit: p4 },
    ];

    for (const testCase of cases) {
      const { receipt, deltas } = await balanceDeltas(usdt, founderWallets, () =>
        registration.connect(fallbackUser).activateLevel(testCase.level)
      );
      const summary = findEvent(receipt, levelManager, "ActivationFinancialSummaryRecorded");
      const fallback = findEvent(receipt, levelManager, "PayoutNotDelivered");
      const founderReceipt = findEvent(receipt, levelManager, "DetailedPayoutReceiptRecorded");
      const position = await testCase.orbit.getPosition(owner.address, testCase.level, 1);
      const netAmount = usdtUnits(testCase.amount * 0.9);

      expect(await registration.isLevelActivated(fallbackUser.address, testCase.level)).to.equal(true);
      expect(position.occupant).to.equal(ethers.ZeroAddress);
      expect(deltas.reduce((sum, delta) => sum + delta, 0n)).to.equal(netAmount);
      expect(summary.args.systemCharge).to.equal(usdtUnits(testCase.amount * 0.1));
      expect(summary.args.totalLiquidPaid).to.equal(netAmount);
      expect(summary.args.totalEscrowLocked).to.equal(0);
      expect(summary.args.totalRecycleAllocated).to.equal(0);
      expect(fallback.args.reasonCode).to.equal(ethers.encodeBytes32String("ID1_FALLBACK"));
      expect(founderReceipt.args.sourcePosition).to.equal(0);
      expect(founderReceipt.args.mirroredPosition).to.equal(0);
      expect(parseEvents(receipt, testCase.orbit, "PositionFilled")).to.have.length(0);
    }
  });

  it("applies the P39 line-3 escrow rule from stored on-chain rule snapshots", async function () {
    const { owner, users, registration, p39, register, activateToLevel } = await deployCoreSystem();

    const orbitOwner = users[0];
    await register(orbitOwner, owner.address);
    await activateToLevel(orbitOwner, 3);

    const fillers = users.slice(1, 14);
    for (const filler of fillers) {
      await register(filler, orbitOwner.address);
      await activateToLevel(filler, 3);
    }

    const line3First = await p39.getPositionRuleView(orbitOwner.address, 3, 13);
    expect(line3First.line).to.equal(3);
    expect(line3First.linePaymentNumber).to.equal(1);
    expect(line3First.toOwner).to.equal(0);
    expect(line3First.toEscrow).to.equal(usdtUnits(20));
    expect(line3First.toSpillover1).to.equal(usdtUnits(8));
    expect(line3First.toSpillover2).to.equal(usdtUnits(8));

    const line3SecondUser = users[14];
    await register(line3SecondUser, orbitOwner.address);
    await activateToLevel(line3SecondUser, 3);

    const line3Second = await p39.getPositionRuleView(orbitOwner.address, 3, 14);
    expect(line3Second.line).to.equal(3);
    expect(line3Second.linePaymentNumber).to.equal(2);
    expect(line3Second.toOwner).to.equal(0);
    expect(line3Second.toEscrow).to.equal(usdtUnits(20));
  });

  it("applies the P39 line-3 escrow rule to mirrored arrivals at position 13", async function () {
    const {
      owner,
      users,
      usdt,
      escrow,
      registration,
      levelManager,
      p39,
      register,
      activateToLevel,
    } = await deployCoreSystem();

    const destinationOwner = users[8];
    const lineOneFillers = users.slice(9, 12);
    const sourceOwner = users[12];
    const mirroredUser = users[13];

    await register(destinationOwner, owner.address);
    await activateToLevel(destinationOwner, 3);

    for (const filler of lineOneFillers) {
      await register(filler, destinationOwner.address);
      await activateToLevel(filler, 3);
    }

    await register(sourceOwner, destinationOwner.address);
    await activateToLevel(sourceOwner, 3);

    const sourceInDestinationOrbit = await p39.getPosition(destinationOwner.address, 3, 4);
    expect(sourceInDestinationOrbit.occupant).to.equal(sourceOwner.address);

    const lockedBeforeMirror = await escrow.getLockedAmount(destinationOwner.address, 3, 4);

    await register(mirroredUser, sourceOwner.address);
    await registration.connect(mirroredUser).activateLevel(2);
    const mirrorTx = await registration.connect(mirroredUser).activateLevel(3);
    const mirrorReceipt = await mirrorTx.wait();

    const mirroredPosition = await p39.getPosition(destinationOwner.address, 3, 13);
    const mirroredActivation = await p39.getPositionActivationData(destinationOwner.address, 3, 13);
    const mirroredRule = await p39.getPositionRuleView(destinationOwner.address, 3, 13);

    expect(mirroredPosition.occupant).to.equal(mirroredUser.address);
    expect(mirroredActivation.isMirror).to.equal(true);
    expect(mirroredRule.line).to.equal(3);
    expect(mirroredRule.linePaymentNumber).to.equal(1);
    expect(mirroredRule.autoUpgradeEnabled).to.equal(true);

    expect(mirroredRule.toEscrow).to.equal(usdtUnits(20));

    const lockedAfterMirror = await escrow.getLockedAmount(destinationOwner.address, 3, 4);
    expect(lockedAfterMirror - lockedBeforeMirror).to.equal(usdtUnits(20));

    const summaryEvent = mirrorReceipt.logs
      .map((log) => {
        try {
          return levelManager.interface.parseLog(log);
        } catch {
          return null;
        }
      })
      .find((event) => event?.name === "ActivationFinancialSummaryRecorded");

    expect(summaryEvent).to.not.equal(undefined);
    expect(summaryEvent.args.activationAmount).to.equal(usdtUnits(40));
    expect(summaryEvent.args.systemCharge).to.equal(usdtUnits(4));
    expect(summaryEvent.args.totalLiquidPaid).to.equal(usdtUnits(8));
    expect(summaryEvent.args.totalEscrowLocked).to.equal(usdtUnits(28));
    expect(summaryEvent.args.totalRecycleAllocated).to.equal(0);
    expect(
      summaryEvent.args.totalLiquidPaid +
        summaryEvent.args.totalEscrowLocked +
        summaryEvent.args.totalRecycleAllocated +
        summaryEvent.args.systemCharge
    ).to.equal(summaryEvent.args.activationAmount);

    expect(await usdt.balanceOf(levelManager.target)).to.equal(0);
  });

  it("locks the full routed mirror amount for P4 escrow-window mirror arrivals", async function () {
    const { owner, users, levelManager, p4, register } = await deployCoreSystem();
    const levelManagerSigner = await impersonateLevelManager(levelManager);
    const orbitOwner = users[8];

    await register(orbitOwner, owner.address);

    await p4
      .connect(levelManagerSigner)
      .mirrorPositionDetailed(
        orbitOwner.address,
        1,
        users[9].address,
        orbitOwner.address,
        mirrorAmount,
        mirrorAmount,
        9001
      );

    const secondMirror = await p4
      .connect(levelManagerSigner)
      .mirrorPositionDetailed.staticCall(
        orbitOwner.address,
        1,
        users[10].address,
        orbitOwner.address,
        mirrorAmount,
        mirrorAmount,
        9002
      );

    expect(secondMirror.position).to.equal(2);
    expect(secondMirror.mirrorOwnerLiquidAmount).to.equal(0);
    expect(secondMirror.mirrorEscrowLockAmount).to.equal(mirrorAmount);
  });

  it("locks the full routed mirror amount for P12 line-2 escrow-window mirror arrivals", async function () {
    const { owner, users, levelManager, p12, register, activateToLevel } = await deployCoreSystem();
    const levelManagerSigner = await impersonateLevelManager(levelManager);
    const orbitOwner = users[8];

    await register(orbitOwner, owner.address);
    await activateToLevel(orbitOwner, 2);

    for (let index = 0; index < 3; index += 1) {
      await p12
        .connect(levelManagerSigner)
        .mirrorPositionDetailed(
          orbitOwner.address,
          2,
          users[9 + index].address,
          orbitOwner.address,
          mirrorAmount,
          mirrorAmount,
          9100 + index
        );
    }

    const lineTwoMirror = await p12
      .connect(levelManagerSigner)
      .mirrorPositionDetailed.staticCall(
        orbitOwner.address,
        2,
        users[12].address,
        orbitOwner.address,
        mirrorAmount,
        mirrorAmount,
        9104
      );

    expect(lineTwoMirror.position).to.equal(4);
    expect(lineTwoMirror.mirrorOwnerLiquidAmount).to.equal(0);
    expect(lineTwoMirror.mirrorEscrowLockAmount).to.equal(mirrorAmount);
  });

  it("locks the full routed mirror amount for P39 line-2 escrow-window mirror arrivals", async function () {
    const { owner, users, levelManager, p39, register, activateToLevel } = await deployCoreSystem();
    const levelManagerSigner = await impersonateLevelManager(levelManager);
    const orbitOwner = users[8];

    await register(orbitOwner, owner.address);
    await activateToLevel(orbitOwner, 3);

    for (let index = 0; index < 3; index += 1) {
      await p39
        .connect(levelManagerSigner)
        .mirrorPositionDetailed(
          orbitOwner.address,
          3,
          users[9 + index].address,
          orbitOwner.address,
          mirrorAmount,
          mirrorAmount,
          9200 + index
        );
    }

    const lineTwoMirror = await p39
      .connect(levelManagerSigner)
      .mirrorPositionDetailed.staticCall(
        orbitOwner.address,
        3,
        users[12].address,
        orbitOwner.address,
        mirrorAmount,
        mirrorAmount,
        9204
      );

    expect(lineTwoMirror.position).to.equal(4);
    expect(lineTwoMirror.mirrorOwnerLiquidAmount).to.equal(0);
    expect(lineTwoMirror.mirrorEscrowLockAmount).to.equal(mirrorAmount);
  });

  it("does not leak liquid on P4 recycle mirror escrow windows", async function () {
    const { users, registration, levelManager, escrow, fundAndApprove, register } = await deployCoreSystem();
    const sponsor = users[8];
    const orbitOwner = users[9];
    const fillers = users.slice(10, 14);

    await register(sponsor);
    await register(orbitOwner, sponsor.address);
    const lockedBeforeRecycle = await escrow.getLockedAmount(sponsor.address, 1, 2);

    for (let index = 0; index < fillers.length - 1; index += 1) {
      await register(fillers[index], orbitOwner.address);
    }

    await fundAndApprove(fillers[fillers.length - 1]);
    const recycleTx = await registration.connect(fillers[fillers.length - 1]).register(orbitOwner.address);
    const recycleReceipt = await recycleTx.wait();
    const recycleEvent = findEvent(recycleReceipt, levelManager, "RecycleCompletedDetailed");

    expect(recycleEvent).to.not.equal(undefined);
    expect(recycleEvent.args.recycleReceiver).to.equal(sponsor.address);
    expect(recycleEvent.args.recycleGross).to.equal(usdtUnits(9));
    expect(recycleEvent.args.recycleLiquidPaid).to.equal(0);
    expect(recycleEvent.args.recycleEscrowLocked).to.equal(usdtUnits(9));
    const lockedAfterRecycle = await escrow.getLockedAmount(sponsor.address, 1, 2);
    expect(lockedAfterRecycle - lockedBeforeRecycle).to.equal(usdtUnits(9));
  });

  it("locks full P12 recycle re-entry mirror amounts in escrow windows", async function () {
    const { owner, users, levelManager, p12, register, activateToLevel } = await deployCoreSystem();
    const levelManagerSigner = await impersonateLevelManager(levelManager);
    const orbitOwner = users[8];

    await register(orbitOwner, owner.address);
    await activateToLevel(orbitOwner, 2);

    for (let index = 0; index < 3; index += 1) {
      await p12
        .connect(levelManagerSigner)
        .mirrorPositionDetailed(
          orbitOwner.address,
          2,
          users[9 + index].address,
          orbitOwner.address,
          mirrorAmount,
          mirrorAmount,
          9300 + index
        );
    }

    const recycleReentry = await p12
      .connect(levelManagerSigner)
      .mirrorPositionDetailed.staticCall(
        orbitOwner.address,
        2,
        users[9].address,
        users[9].address,
        mirrorAmount,
        mirrorAmount,
        9304
      );

    expect(recycleReentry.position).to.equal(4);
    expect(recycleReentry.mirrorOwnerLiquidAmount).to.equal(0);
    expect(recycleReentry.mirrorEscrowLockAmount).to.equal(mirrorAmount);
  });

  it("mirrors no-referrer P12 recycle fallback into ID1 as a qualifying arrival", async function () {
    const { owner, users, registration, p12, register, activateToLevel } = await deployCoreSystem();
    const orbitOwner = users[8];
    const fillers = users.slice(9, 19);
    const recycleTrigger = users[19];
    const finalRecycleTrigger = users[20];

    await register(orbitOwner, ethers.ZeroAddress);
    await activateToLevel(orbitOwner, 2);

    for (const filler of fillers) {
      await register(filler, orbitOwner.address);
      await activateToLevel(filler, 2);
    }

    const countsBefore = await p12.getLinePaymentCounts(orbitOwner.address, 2);
    expect(countsBefore.line2Count).to.equal(7);

    await register(recycleTrigger, orbitOwner.address);
    const tx = await registration.connect(recycleTrigger).activateLevel(2);
    const receipt = await tx.wait();

    const countsAfter = await p12.getLinePaymentCounts(orbitOwner.address, 2);
    expect(countsAfter.line2Count).to.equal(8);

    const recycledPosition = await p12.getPosition(orbitOwner.address, 2, 11);
    expect(recycledPosition.occupant).to.equal(recycleTrigger.address);

    await register(finalRecycleTrigger, orbitOwner.address);
    await registration.connect(finalRecycleTrigger).activateLevel(2);

    const finalCounts = await p12.getLinePaymentCounts(orbitOwner.address, 2);
    expect(finalCounts.line2Count).to.equal(0);

    const id1Mirror = await p12.getPosition(owner.address, 2, 2);
    expect(id1Mirror.occupant).to.equal(orbitOwner.address);

    const id1MirrorArrival = await p12.getPositionLineArrivalNumber(owner.address, 2, 2);
    expect(id1MirrorArrival).to.equal(1);

    const recycleEvent = findEvent(receipt, p12, "PositionFilled");
    expect(recycleEvent).to.not.equal(undefined);
  });

  it("continues chained P4 recycle through every newly completed upline orbit", async function () {
    const { owner, users, registration, levelManager, register, fundAndApprove, usdt } = await deployCoreSystem();
    const [root, middle, lower, rootFill1, rootFill2, middleFill1, middleFill2, lowerFill1, lowerFill2, lowerFill3, lowerFill4] =
      users.slice(8, 19);

    await register(root, owner.address);
    await register(middle, root.address);
    await register(lower, middle.address);
    await register(rootFill1, root.address);
    await register(rootFill2, root.address);
    await register(middleFill1, middle.address);
    await register(middleFill2, middle.address);
    await register(lowerFill1, lower.address);
    await register(lowerFill2, lower.address);
    await register(lowerFill3, lower.address);

    const founderWallets = users.slice(0, 8);
    const founderBalancesBefore = await Promise.all(founderWallets.map((wallet) => usdt.balanceOf(wallet.address)));
    await fundAndApprove(lowerFill4);
    const tx = await registration.connect(lowerFill4).register(lower.address);
    const receipt = await tx.wait();

    const recycleEvents = parseEvents(receipt, levelManager, "RecycleCompletedDetailed");
    const ownerSequence = recycleEvents.map((event) => event.args.orbitOwner);
    const receiverSequence = recycleEvents.map((event) => event.args.recycleReceiver);

    expect(ownerSequence).to.deep.equal([lower.address, middle.address, root.address]);
    expect(receiverSequence).to.deep.equal([middle.address, root.address, owner.address]);
    expect(recycleEvents.every((event) => event.args.recycleGross === usdtUnits(9))).to.equal(true);
    const founderBalancesAfter = await Promise.all(founderWallets.map((wallet) => usdt.balanceOf(wallet.address)));
    const founderDelta = founderBalancesAfter.reduce(
      (total, balance, index) => total + balance - founderBalancesBefore[index],
      0n
    );
    expect(founderDelta).to.equal(usdtUnits(9));
  });

  it("reserves the first P12 recycle fill and releases both fills through the normal 40/50 split", async function () {
    const { users, registration, levelManager, router, usdt, register, activateToLevel } = await deployCoreSystem();
    const founderWallets = users.slice(0, 8);
    const sponsor = users[8];
    const orbitOwner = users[9];
    const fillers = users.slice(10, 20);
    const recycleTrigger = users[20];
    const finalRecycleTrigger = users[21];

    await register(sponsor);
    await activateToLevel(sponsor, 2);

    await register(orbitOwner, sponsor.address);
    await activateToLevel(orbitOwner, 2);

    for (const filler of fillers) {
      await register(filler, orbitOwner.address);
      await activateToLevel(filler, 2);
    }

    await register(recycleTrigger, orbitOwner.address);
    await register(finalRecycleTrigger, orbitOwner.address);

    const firstObserved = await balanceDeltas(
      usdt,
      [sponsor, ...founderWallets],
      () => registration.connect(recycleTrigger).activateLevel(2)
    );

    const firstReserveEvent = findEvent(firstObserved.receipt, router, "RecycleReserveUpdated");
    expect(firstObserved.deltas.every((delta) => delta === 0n)).to.equal(true);
    expect(firstReserveEvent.args.reservedAmount).to.equal(usdtUnits(10));
    expect(firstReserveEvent.args.fills).to.equal(1);
    expect(firstReserveEvent.args.released).to.equal(false);

    const observed = await balanceDeltas(
      usdt,
      [sponsor, ...founderWallets],
      () => registration.connect(finalRecycleTrigger).activateLevel(2)
    );

    const releaseEvent = findEvent(observed.receipt, router, "RecycleReserveUpdated");
    const recycleReceipts = parseEvents(observed.receipt, levelManager, "DetailedPayoutReceiptRecorded")
      .filter((event) => event.args.receiptType === 4n);

    const sponsorDelta = observed.deltas[0];
    const founderDelta = observed.deltas.slice(1).reduce((total, delta) => total + delta, 0n);

    expect(releaseEvent.args.reservedAmount).to.equal(usdtUnits(20));
    expect(releaseEvent.args.fills).to.equal(2);
    expect(releaseEvent.args.released).to.equal(true);
    expect(sponsorDelta).to.equal(usdtUnits(8));
    expect(founderDelta).to.equal(usdtUnits(10));
    expect(recycleReceipts.reduce((total, event) => total + event.args.grossAmount, 0n)).to.equal(usdtUnits(18));
    expect(recycleReceipts.some((event) => event.args.grossAmount === usdtUnits(20))).to.equal(false);
  });

  it("routes P12 recycle release through eligible registered upline, not matrix parent", async function () {
    const { owner, users, registration, levelManager, router, p12, usdt, register, activateToLevel } = await deployCoreSystem();
    const levelManagerSigner = await impersonateLevelManager(levelManager);
    const founderWallets = users.slice(0, 8);
    const rawReferrer = users[8];
    const placementParent = users[9];
    const orbitOwner = users[10];
    const fillers = users.slice(11, 21);
    const recycleTrigger = users[21];
    const finalRecycleTrigger = users[22];

    await register(rawReferrer, owner.address);
    await activateToLevel(rawReferrer, 2);
    await register(placementParent, owner.address);
    await activateToLevel(placementParent, 2);

    await register(orbitOwner, rawReferrer.address);
    await activateToLevel(orbitOwner, 2);

    await p12
      .connect(levelManagerSigner)
      .fillPositionDetailed(
        placementParent.address,
        2,
        orbitOwner.address,
        rawReferrer.address,
        usdtUnits(20),
        9901
      );

    for (const filler of fillers) {
      await register(filler, orbitOwner.address);
      await activateToLevel(filler, 2);
    }

    await register(recycleTrigger, orbitOwner.address);
    await register(finalRecycleTrigger, orbitOwner.address);

    await registration.connect(recycleTrigger).activateLevel(2);

    const observed = await balanceDeltas(
      usdt,
      [rawReferrer, placementParent, ...founderWallets],
      () => registration.connect(finalRecycleTrigger).activateLevel(2)
    );

    const releaseEvent = findEvent(observed.receipt, router, "RecycleReserveUpdated");
    const recycleReceipts = parseEvents(observed.receipt, levelManager, "DetailedPayoutReceiptRecorded")
      .filter((event) => event.args.receiptType === 4n);

    const rawReferrerDelta = observed.deltas[0];
    const placementParentDelta = observed.deltas[1];
    const founderDelta = observed.deltas.slice(2).reduce((total, delta) => total + delta, 0n);

    expect(releaseEvent.args.reservedAmount).to.equal(usdtUnits(20));
    expect(releaseEvent.args.released).to.equal(true);
    expect(rawReferrerDelta).to.equal(usdtUnits(8));
    expect(placementParentDelta).to.equal(0n);
    expect(founderDelta).to.equal(usdtUnits(10));
    expect(recycleReceipts.some((event) => event.args.receiver === rawReferrer.address)).to.equal(true);
    expect(recycleReceipts.some((event) => event.args.receiver === placementParent.address)).to.equal(false);
  });

  it("creates a P12 mirror position for structured recycle spillover receivers", async function () {
    const { owner, users, registration, levelManager, router, p12, usdt, register, activateToLevel } = await deployCoreSystem();
    const founderWallets = users.slice(0, 8);
    const grandUpline = users[8];
    const sponsor = users[9];
    const orbitOwner = users[10];
    const fillers = users.slice(11, 21);
    const recycleTrigger = users[21];
    const finalRecycleTrigger = users[22];

    await register(grandUpline, owner.address);
    await activateToLevel(grandUpline, 2);
    await register(sponsor, grandUpline.address);
    await activateToLevel(sponsor, 2);
    await register(orbitOwner, sponsor.address);
    await activateToLevel(orbitOwner, 2);

    for (const filler of fillers) {
      await register(filler, orbitOwner.address);
      await activateToLevel(filler, 2);
    }

    await register(recycleTrigger, orbitOwner.address);
    await register(finalRecycleTrigger, orbitOwner.address);
    await registration.connect(recycleTrigger).activateLevel(2);

    const observed = await balanceDeltas(
      usdt,
      [sponsor, grandUpline, ...founderWallets],
      () => registration.connect(finalRecycleTrigger).activateLevel(2)
    );

    const sponsorDelta = observed.deltas[0];
    const grandDelta = observed.deltas[1];
    const founderDelta = observed.deltas.slice(2).reduce((total, delta) => total + delta, 0n);
    const grandMirrorFill = parseEvents(observed.receipt, p12, "PositionFilled")
      .find((event) =>
        event.args.orbitOwner === grandUpline.address &&
        event.args.user === orbitOwner.address &&
        event.args.amount === usdtUnits(10)
      );
    const grandMirrorPosition = await findOrbitPosition(p12, grandUpline, 2, orbitOwner, 12);

    expect(sponsorDelta).to.equal(usdtUnits(8));
    expect(grandDelta).to.equal(usdtUnits(10));
    expect(founderDelta).to.equal(0n);
    expect(grandMirrorFill).to.not.equal(undefined);
    expect(grandMirrorPosition).to.deep.include({ line: 2, isMirror: true });
  });

  it("reserves mirrored P12 arrivals that land on the recycle window instead of paying them liquid", async function () {
    const { users, registration, levelManager, router, p12, usdt, register, activateToLevel } = await deployCoreSystem();
    const sponsor = users[8];
    const orbitOwner = users[9];
    const fillers = users.slice(10, 20);
    const mirrorTrigger = users[20];

    await register(sponsor);
    await activateToLevel(sponsor, 2);

    await register(orbitOwner, sponsor.address);
    await activateToLevel(orbitOwner, 2);

    for (const filler of fillers) {
      await register(filler, orbitOwner.address);
      await activateToLevel(filler, 2);
    }

    const countsBefore = await p12.getLinePaymentCounts(orbitOwner.address, 2);
    expect(countsBefore.line2Count).to.equal(7);

    const line1ParentPosition = await p12.getPosition(orbitOwner.address, 2, 3);
    const line1Parent = fillers.find(
      (filler) => filler.address.toLowerCase() === line1ParentPosition.occupant.toLowerCase()
    );
    expect(line1Parent).to.not.equal(undefined);

    await register(mirrorTrigger, line1Parent.address);

    const observed = await balanceDeltas(
      usdt,
      [orbitOwner],
      () => registration.connect(mirrorTrigger).activateLevel(2)
    );

    const reserveEvent = findEvent(observed.receipt, router, "RecycleReserveUpdated");
    const mirroredFill = parseEvents(observed.receipt, p12, "PositionFilled")
      .find((event) => event.args.orbitOwner === orbitOwner.address && event.args.user === mirrorTrigger.address);
    const rule = await p12.getPositionRuleView(orbitOwner.address, 2, mirroredFill.args.position);

    expect(observed.deltas[0]).to.equal(0n);
    expect(reserveEvent.args.orbitOwner).to.equal(orbitOwner.address);
    expect(reserveEvent.args.reservedAmount).to.equal(usdtUnits(10));
    expect(reserveEvent.args.fills).to.equal(1);
    expect(reserveEvent.args.released).to.equal(false);
    expect(rule.linePaymentNumber).to.equal(8);
    expect(rule.toRecycle).to.equal(usdtUnits(10));
    expect(rule.toOwner).to.equal(0n);
    expect(rule.toEscrow).to.equal(0n);
  });

  it("does not count a reused non-recycle mirror position as a new qualifying arrival", async function () {
    const { owner, users, levelManager, p12, register, activateToLevel } = await deployCoreSystem();
    const levelManagerSigner = await impersonateLevelManager(levelManager);
    const orbitOwner = users[8];
    const mirroredUser = users[9];

    await register(orbitOwner, owner.address);
    await activateToLevel(orbitOwner, 2);

    await p12
      .connect(levelManagerSigner)
      .mirrorPositionDetailed(
        orbitOwner.address,
        2,
        mirroredUser.address,
        orbitOwner.address,
        mirrorAmount,
        mirrorAmount,
        9500
      );

    const countsBefore = await p12.getLinePaymentCounts(orbitOwner.address, 2);

    const duplicateMirror = await p12
      .connect(levelManagerSigner)
      .mirrorPositionDetailed.staticCall(
        orbitOwner.address,
        2,
        mirroredUser.address,
        orbitOwner.address,
        mirrorAmount,
        mirrorAmount,
        9501
      );

    await p12
      .connect(levelManagerSigner)
      .mirrorPositionDetailed(
        orbitOwner.address,
        2,
        mirroredUser.address,
        orbitOwner.address,
        mirrorAmount,
        mirrorAmount,
        9501
      );

    const countsAfter = await p12.getLinePaymentCounts(orbitOwner.address, 2);

    expect(duplicateMirror.position).to.equal(1);
    expect(duplicateMirror.mirrorOwnerLiquidAmount).to.equal(0);
    expect(duplicateMirror.mirrorEscrowLockAmount).to.equal(0);
    expect(countsAfter.line1Count).to.equal(countsBefore.line1Count);
    expect(await p12.getPositionLineArrivalNumber(orbitOwner.address, 2, 1)).to.equal(1);
  });

  it("locks full P39 recycle re-entry mirror amounts in line-2 escrow windows", async function () {
    const { owner, users, levelManager, p39, register, activateToLevel } = await deployCoreSystem();
    const levelManagerSigner = await impersonateLevelManager(levelManager);
    const orbitOwner = users[8];

    await register(orbitOwner, owner.address);
    await activateToLevel(orbitOwner, 3);

    for (let index = 0; index < 3; index += 1) {
      await p39
        .connect(levelManagerSigner)
        .mirrorPositionDetailed(
          orbitOwner.address,
          3,
          users[9 + index].address,
          orbitOwner.address,
          mirrorAmount,
          mirrorAmount,
          9400 + index
        );
    }

    const recycleReentry = await p39
      .connect(levelManagerSigner)
      .mirrorPositionDetailed.staticCall(
        orbitOwner.address,
        3,
        users[9].address,
        users[9].address,
        mirrorAmount,
        mirrorAmount,
        9404
      );

    expect(recycleReentry.position).to.equal(4);
    expect(recycleReentry.mirrorOwnerLiquidAmount).to.equal(0);
    expect(recycleReentry.mirrorEscrowLockAmount).to.equal(mirrorAmount);
  });

  it("reserves the first P39 recycle fill and releases both fills through the normal 20/20/50 split", async function () {
    const { owner, users, registration, levelManager, router, p39, usdt, register, activateToLevel } = await deployCoreSystem();
    const founderWallets = users.slice(0, 8);
    const sponsor = users[8];
    const orbitOwner = users[9];
    const generated = await createFundedWallets(owner, 39);
    const fillers = generated.slice(0, 37);
    const recycleTrigger = generated[37];
    const finalRecycleTrigger = generated[38];

    await register(sponsor);
    await activateToLevel(sponsor, 3);

    await register(orbitOwner, sponsor.address);
    await activateToLevel(orbitOwner, 3);

    for (const filler of fillers) {
      await register(filler, orbitOwner.address);
      await activateToLevel(filler, 3);
    }

    await register(recycleTrigger, orbitOwner.address);
    await registration.connect(recycleTrigger).activateLevel(2);
    await register(finalRecycleTrigger, orbitOwner.address);
    await registration.connect(finalRecycleTrigger).activateLevel(2);

    const firstObserved = await balanceDeltas(
      usdt,
      [sponsor, ...founderWallets],
      () => registration.connect(recycleTrigger).activateLevel(3)
    );

    const firstReserveEvent = findEvent(firstObserved.receipt, router, "RecycleReserveUpdated");
    expect(firstObserved.deltas.every((delta) => delta === 0n)).to.equal(true);
    expect(firstReserveEvent.args.reservedAmount).to.equal(usdtUnits(20));
    expect(firstReserveEvent.args.fills).to.equal(1);
    expect(firstReserveEvent.args.released).to.equal(false);

    const observed = await balanceDeltas(
      usdt,
      [sponsor, ...founderWallets],
      () => registration.connect(finalRecycleTrigger).activateLevel(3)
    );

    const releaseEvent = findEvent(observed.receipt, router, "RecycleReserveUpdated");
    const recycleReceipts = parseEvents(observed.receipt, levelManager, "DetailedPayoutReceiptRecorded")
      .filter((event) => event.args.receiptType === 4n);

    const recycleGrosses = recycleReceipts.map((event) => event.args.grossAmount).sort((a, b) => Number(a - b));

    expect(releaseEvent.args.reservedAmount).to.equal(usdtUnits(40));
    expect(releaseEvent.args.fills).to.equal(2);
    expect(releaseEvent.args.released).to.equal(true);
    expect(recycleGrosses).to.deep.equal([usdtUnits(8), usdtUnits(8), usdtUnits(20)]);
    expect(recycleReceipts.reduce((total, event) => total + event.args.grossAmount, 0n)).to.equal(usdtUnits(36));
    expect(recycleReceipts.some((event) => event.args.grossAmount === usdtUnits(40))).to.equal(false);
    expect(observed.receipt.gasUsed).to.be.lessThan(12_000_000n);
    expect(await p39.hasHistoricalCycle(orbitOwner.address, 3, 1)).to.equal(true);
    expect((await p39.getHistoricalPosition(orbitOwner.address, 3, 1, 39)).occupant)
      .to.equal(finalRecycleTrigger.address);
  });

  it("routes P39 recycle release through eligible registered upline, not matrix chain", async function () {
    const { owner, users, registration, levelManager, router, p39, usdt, register, activateToLevel } = await deployCoreSystem();
    const levelManagerSigner = await impersonateLevelManager(levelManager);
    const founderWallets = users.slice(0, 8);
    const rawReferrer = users[8];
    const matrixGrandParent = users[9];
    const placementParent = users[10];
    const orbitOwner = users[11];
    const generated = await createFundedWallets(owner, 39);
    const fillers = generated.slice(0, 37);
    const recycleTrigger = generated[37];
    const finalRecycleTrigger = generated[38];

    await register(rawReferrer, owner.address);
    await activateToLevel(rawReferrer, 3);
    await register(matrixGrandParent, owner.address);
    await activateToLevel(matrixGrandParent, 3);
    await register(placementParent, rawReferrer.address);
    await activateToLevel(placementParent, 3);

    await p39
      .connect(levelManagerSigner)
      .fillPositionDetailed(
        matrixGrandParent.address,
        3,
        placementParent.address,
        rawReferrer.address,
        usdtUnits(40),
        9911
      );

    await register(orbitOwner, rawReferrer.address);
    await activateToLevel(orbitOwner, 3);

    await p39
      .connect(levelManagerSigner)
      .fillPositionDetailed(
        placementParent.address,
        3,
        orbitOwner.address,
        rawReferrer.address,
        usdtUnits(40),
        9912
      );

    for (const filler of fillers) {
      await register(filler, orbitOwner.address);
      await activateToLevel(filler, 3);
    }

    await register(recycleTrigger, orbitOwner.address);
    await registration.connect(recycleTrigger).activateLevel(2);
    await register(finalRecycleTrigger, orbitOwner.address);
    await registration.connect(finalRecycleTrigger).activateLevel(2);

    await registration.connect(recycleTrigger).activateLevel(3);

    const observed = await balanceDeltas(
      usdt,
      [rawReferrer, placementParent, matrixGrandParent, ...founderWallets],
      () => registration.connect(finalRecycleTrigger).activateLevel(3)
    );

    const releaseEvent = findEvent(observed.receipt, router, "RecycleReserveUpdated");
    const recycleReceipts = parseEvents(observed.receipt, levelManager, "DetailedPayoutReceiptRecorded")
      .filter((event) => event.args.receiptType === 4n);

    const rawReferrerDelta = observed.deltas[0];
    const placementParentDelta = observed.deltas[1];
    const matrixGrandParentDelta = observed.deltas[2];
    const founderDelta = observed.deltas.slice(3).reduce((total, delta) => total + delta, 0n);
    const rawReferrerReceipt = recycleReceipts.find(
      (event) => event.args.receiver === rawReferrer.address
    );

    expect(releaseEvent.args.reservedAmount).to.equal(usdtUnits(40));
    expect(releaseEvent.args.released).to.equal(true);
    expect(rawReferrerDelta).to.equal(0n);
    expect(placementParentDelta).to.equal(0n);
    expect(matrixGrandParentDelta).to.equal(0n);
    expect(founderDelta).to.equal(usdtUnits(28));
    expect(rawReferrerReceipt?.args.grossAmount).to.equal(usdtUnits(8));
    expect(rawReferrerReceipt?.args.escrowLocked).to.equal(usdtUnits(8));
    expect(recycleReceipts.some((event) => event.args.receiver === placementParent.address)).to.equal(false);
    expect(recycleReceipts.some((event) => event.args.receiver === matrixGrandParent.address)).to.equal(false);
  });

  it("creates a P39 mirror position for structured recycle spillover receivers", async function () {
    const { owner, users, registration, levelManager, router, p39, usdt, register, activateToLevel } = await deployCoreSystem();
    const founderWallets = users.slice(0, 8);
    const grandUpline = users[8];
    const sponsor = users[9];
    const orbitOwner = users[10];
    const generated = await createFundedWallets(owner, 39);
    const fillers = generated.slice(0, 37);
    const recycleTrigger = generated[37];
    const finalRecycleTrigger = generated[38];

    await register(grandUpline, owner.address);
    await activateToLevel(grandUpline, 3);
    await register(sponsor, grandUpline.address);
    await activateToLevel(sponsor, 3);
    await register(orbitOwner, sponsor.address);
    await activateToLevel(orbitOwner, 3);

    for (const filler of fillers) {
      await register(filler, orbitOwner.address);
      await activateToLevel(filler, 3);
    }

    await register(recycleTrigger, orbitOwner.address);
    await registration.connect(recycleTrigger).activateLevel(2);
    await register(finalRecycleTrigger, orbitOwner.address);
    await registration.connect(finalRecycleTrigger).activateLevel(2);
    await registration.connect(recycleTrigger).activateLevel(3);

    const observed = await balanceDeltas(
      usdt,
      [sponsor, grandUpline, ...founderWallets],
      () => registration.connect(finalRecycleTrigger).activateLevel(3)
    );

    const sponsorDelta = observed.deltas[0];
    const grandDelta = observed.deltas[1];
    const founderDelta = observed.deltas.slice(2).reduce((total, delta) => total + delta, 0n);
    const grandMirrorFill = parseEvents(observed.receipt, p39, "PositionFilled")
      .find((event) =>
        event.args.orbitOwner === grandUpline.address &&
        event.args.user === orbitOwner.address &&
        event.args.amount === usdtUnits(8)
      );
    const grandMirrorPosition = await findOrbitPosition(p39, grandUpline, 3, orbitOwner, 39);

    expect(sponsorDelta).to.equal(usdtUnits(8));
    expect(grandDelta).to.equal(usdtUnits(8));
    expect(founderDelta).to.equal(usdtUnits(20));
    expect(grandMirrorFill).to.not.equal(undefined);
    expect(grandMirrorPosition).to.deep.include({ line: 2, isMirror: true });
  });

  it("bounds sponsor resolution before deep inactive referral chains can exhaust gas", async function () {
    const { owner, registration, levelManager } = await deployLevelManagerWithMockRegistration();
    const start = ethers.Wallet.createRandom().address;

    let child = start;
    const chain = Array.from({ length: 65 }, () => ethers.Wallet.createRandom().address);
    for (const parent of chain) {
      await registration.setRef(child, parent);
      child = parent;
    }

    await expect(levelManager.resolveSponsor(start, 3))
      .to.be.revertedWithCustomError(levelManager, "UplineSearchTooDeep")
      .withArgs(start, 3);

    await registration.setActive(chain[63], 3);
    expect(await levelManager.resolveSponsor(start, 3)).to.equal(chain[63]);

    await registration.setActive(chain[63], 4);
    expect(await levelManager.resolveSponsor(start, 4)).to.equal(chain[63]);

    expect(await levelManager.resolveSponsor(ethers.ZeroAddress, 3)).to.equal(owner.address);
  });

  it("documents the P39 level-3 recipient truth table for B line 1 and line 2", async function () {
    const { owner, users, registration, levelManager, p39, register, activateToLevel } = await deployCoreSystem();

    const A = users[8];
    const B = users[9];
    const line1Parent = users[10];
    const line1Second = users[11];
    const line1Third = users[12];

    await register(A, owner.address);
    await activateToLevel(A, 3);

    await register(B, A.address);
    await activateToLevel(B, 3);

    const entrants = users.slice(10, 22);
    const rows = [];

    for (const entrant of entrants) {
      await register(entrant, B.address);
      const tx = await registration.connect(entrant).activateLevel(2);
      await tx.wait();
      const level3Tx = await registration.connect(entrant).activateLevel(3);
      const receipt = await level3Tx.wait();

      const position = rows.length + 1;
      const rule = await p39.getPositionRuleView(B.address, 3, position);
      const receipts = receipt.logs
        .map((log) => {
          try {
            return levelManager.interface.parseLog(log);
          } catch {
            return null;
          }
        })
        .filter((event) => event?.name === "DetailedPayoutReceiptRecorded");

      const ownerReceipt = receipts.find((event) => event.args.routedRole === 1n);
      const spill1Receipt = receipts.find((event) => event.args.routedRole === 2n);
      const spill2Receipt = receipts.find((event) => event.args.routedRole === 3n);

      rows.push({
        position,
        entrant: entrant.address,
        line: Number(rule.line),
        arrival: Number(rule.linePaymentNumber),
        directReceiver: ownerReceipt?.args.receiver,
        directGross: ownerReceipt?.args.grossAmount ?? 0n,
        directEscrow: ownerReceipt?.args.escrowLocked ?? 0n,
        spill1Receiver: spill1Receipt?.args.receiver,
        spill1Gross: spill1Receipt?.args.grossAmount ?? 0n,
        spill1Escrow: spill1Receipt?.args.escrowLocked ?? 0n,
        spill2Receiver: spill2Receipt?.args.receiver,
        spill2Gross: spill2Receipt?.args.grossAmount ?? 0n,
        spill2Escrow: spill2Receipt?.args.escrowLocked ?? 0n,
      });
    }

    expect(rows[0]).to.include({
      position: 1,
      line: 1,
      arrival: 1,
      directReceiver: B.address,
      spill1Receiver: A.address,
      spill2Receiver: owner.address,
    });
    expect(rows[0].directGross).to.equal(usdtUnits(8));
    expect(rows[0].spill1Gross).to.equal(usdtUnits(8));
    expect(rows[0].spill2Gross).to.equal(usdtUnits(20));

    expect(rows[2]).to.include({
      position: 3,
      line: 1,
      arrival: 3,
      directReceiver: B.address,
      spill1Receiver: A.address,
      spill2Receiver: owner.address,
    });
    expect(rows[2].directEscrow).to.equal(usdtUnits(8));
    expect(rows[2].spill1Gross).to.equal(usdtUnits(8));
    expect(rows[2].spill2Gross).to.equal(usdtUnits(20));

    const expectedLine2Parents = [
      line1Parent.address,
      line1Second.address,
      line1Third.address,
      line1Parent.address,
      line1Second.address,
      line1Third.address,
      line1Parent.address,
      line1Second.address,
      line1Third.address,
    ];

    for (let index = 3; index < 11; index += 1) {
      expect(rows[index]).to.include({
        position: index + 1,
        line: 2,
        arrival: index - 2,
        directReceiver: B.address,
        spill1Receiver: expectedLine2Parents[index - 3],
        spill2Receiver: A.address,
      });

      expect(rows[index].directGross).to.equal(usdtUnits(8));
      expect(rows[index].spill1Gross).to.equal(usdtUnits(8));
      expect(rows[index].spill2Gross).to.equal(usdtUnits(20));
    }

    for (let index = 3; index < 7; index += 1) {
      expect(rows[index].directEscrow).to.equal(usdtUnits(8));
    }

    for (let index = 7; index < 11; index += 1) {
      expect(rows[index].directEscrow).to.equal(0n);
    }
  });

  it("uses the connected P39 matrix parent instead of the raw referrer for line-1 spillovers", async function () {
    const { owner, users, registration, levelManager, p39, register, activateToLevel } = await deployCoreSystem();

    const X = users[8];
    const P = users[9];
    const Q = users[10];
    const R = users[11];
    const A = users[12];
    const B = users[13];

    await register(X, owner.address);
    await activateToLevel(X, 3);

    for (const line1User of [P, Q, R]) {
      await register(line1User, X.address);
      await activateToLevel(line1User, 3);
    }

    await register(A, X.address);
    await activateToLevel(A, 3);

    const aInX = await findOrbitPosition(p39, X, 3, A, 39);
    expect(aInX).to.deep.include({
      position: 4,
      line: 2,
      isMirror: false,
    });

    await register(B, A.address);
    await registration.connect(B).activateLevel(2);
    const tx = await registration.connect(B).activateLevel(3);
    const receipt = await tx.wait();

    const bInA = await findOrbitPosition(p39, A, 3, B, 39);
    const bInX = await findOrbitPosition(p39, X, 3, B, 39);
    const receipts = parseEvents(receipt, levelManager, "DetailedPayoutReceiptRecorded");

    const directReceipt = receipts.find((event) => event.args.routedRole === 1n);
    const spill1Receipt = receipts.find((event) => event.args.routedRole === 2n);
    const spill2Receipt = receipts.find((event) => event.args.routedRole === 3n);

    expect(bInA).to.deep.include({
      position: 1,
      line: 1,
      isMirror: false,
    });
    expect(bInX).to.deep.include({
      position: 13,
      line: 3,
      isMirror: true,
    });

    expect(directReceipt.args.receiver).to.equal(A.address);
    expect(directReceipt.args.grossAmount).to.equal(usdtUnits(8));
    expect(spill1Receipt.args.receiver).to.equal(P.address);
    expect(spill1Receipt.args.grossAmount).to.equal(usdtUnits(8));
    expect(spill2Receipt.args.receiver).to.equal(X.address);
    expect(spill2Receipt.args.grossAmount).to.equal(usdtUnits(20));
  });

  it("walks the connected P12 matrix chain before falling back to ID1", async function () {
    const { owner, users, levelManager, p12, register } = await deployCoreSystem();
    const levelManagerSigner = await impersonateLevelManager(levelManager);

    const inactiveRoot = users[8];
    const visibleMatrixParent = users[9];
    const orbitOwner = users[10];
    const activatingUser = users[11];

    await register(inactiveRoot, owner.address);
    await register(visibleMatrixParent, inactiveRoot.address);
    await register(orbitOwner, inactiveRoot.address);
    await register(activatingUser, orbitOwner.address);

    await p12
      .connect(levelManagerSigner)
      .fillPositionDetailed(
        visibleMatrixParent.address,
        2,
        orbitOwner.address,
        visibleMatrixParent.address,
        usdtUnits(20),
        9701
      );

    const orbitOwnerPosition = await p12.getPosition(visibleMatrixParent.address, 2, 1);
    expect(orbitOwnerPosition.occupant).to.equal(orbitOwner.address);

    await p12
      .connect(levelManagerSigner)
      .fillPositionDetailed(
        orbitOwner.address,
        2,
        activatingUser.address,
        orbitOwner.address,
        usdtUnits(20),
        9702
      );

    const rule = await p12.getPositionRuleView(orbitOwner.address, 2, 1);
    expect(rule.line).to.equal(1);
    expect(rule.toOwner).to.equal(usdtUnits(8));
    expect(rule.toSpillover1).to.equal(usdtUnits(10));
    expect(rule.spillover1Recipient).to.equal(visibleMatrixParent.address);
    expect(rule.spillover1Recipient).to.not.equal(owner.address);
  });

  it("uses stored P12 placement parent when referrer chain and placement chain differ", async function () {
    const { owner, users, levelManager, p12, register } = await deployCoreSystem();
    const levelManagerSigner = await impersonateLevelManager(levelManager);

    const rawReferrer = users[8];
    const placementParent = users[9];
    const orbitOwner = users[10];
    const activatingUser = users[11];

    await register(rawReferrer, owner.address);
    await register(placementParent, owner.address);
    await register(orbitOwner, rawReferrer.address);
    await register(activatingUser, orbitOwner.address);

    await p12
      .connect(levelManagerSigner)
      .fillPositionDetailed(
        placementParent.address,
        2,
        orbitOwner.address,
        rawReferrer.address,
        usdtUnits(20),
        9711
      );

    const orbitOwnerInPlacementParent = await p12.getPosition(placementParent.address, 2, 1);
    expect(orbitOwnerInPlacementParent.occupant).to.equal(orbitOwner.address);

    await p12
      .connect(levelManagerSigner)
      .fillPositionDetailed(
        orbitOwner.address,
        2,
        activatingUser.address,
        orbitOwner.address,
        usdtUnits(20),
        9712
      );

    const rule = await p12.getPositionRuleView(orbitOwner.address, 2, 1);
    expect(rule.line).to.equal(1);
    expect(rule.toOwner).to.equal(usdtUnits(8));
    expect(rule.toSpillover1).to.equal(usdtUnits(10));
    expect(rule.spillover1Recipient).to.equal(placementParent.address);
    expect(rule.spillover1Recipient).to.not.equal(rawReferrer.address);
    expect(rule.spillover1Recipient).to.not.equal(owner.address);
  });

  it("walks the connected P39 matrix chain before falling back to ID1", async function () {
    const { owner, users, levelManager, p39, register } = await deployCoreSystem();
    const levelManagerSigner = await impersonateLevelManager(levelManager);

    const inactiveRoot = users[8];
    const visibleMatrixParent = users[9];
    const orbitOwner = users[10];
    const activatingUser = users[11];

    await register(inactiveRoot, owner.address);
    await register(visibleMatrixParent, inactiveRoot.address);
    await register(orbitOwner, inactiveRoot.address);
    await register(activatingUser, orbitOwner.address);

    await p39
      .connect(levelManagerSigner)
      .fillPositionDetailed(
        visibleMatrixParent.address,
        3,
        orbitOwner.address,
        visibleMatrixParent.address,
        usdtUnits(40),
        9801
      );

    const orbitOwnerPosition = await p39.getPosition(visibleMatrixParent.address, 3, 1);
    expect(orbitOwnerPosition.occupant).to.equal(orbitOwner.address);

    await p39
      .connect(levelManagerSigner)
      .fillPositionDetailed(
        orbitOwner.address,
        3,
        activatingUser.address,
        orbitOwner.address,
        usdtUnits(40),
        9802
      );

    const rule = await p39.getPositionRuleView(orbitOwner.address, 3, 1);
    expect(rule.line).to.equal(1);
    expect(rule.toOwner).to.equal(usdtUnits(8));
    expect(rule.toSpillover1).to.equal(usdtUnits(8));
    expect(rule.toSpillover2).to.equal(usdtUnits(20));
    expect(rule.spillover1Recipient).to.equal(visibleMatrixParent.address);
    expect(rule.spillover1Recipient).to.not.equal(owner.address);
  });

  it("uses stored P39 placement parents for line-1 spillovers when referrer chain differs", async function () {
    const { owner, users, levelManager, p39, register } = await deployCoreSystem();
    const levelManagerSigner = await impersonateLevelManager(levelManager);

    const rawReferrer = users[8];
    const matrixGrandParent = users[9];
    const placementParent = users[10];
    const orbitOwner = users[11];
    const activatingUser = users[12];

    await register(rawReferrer, owner.address);
    await register(matrixGrandParent, owner.address);
    await register(placementParent, rawReferrer.address);
    await register(orbitOwner, rawReferrer.address);
    await register(activatingUser, orbitOwner.address);

    await p39
      .connect(levelManagerSigner)
      .fillPositionDetailed(
        matrixGrandParent.address,
        3,
        placementParent.address,
        rawReferrer.address,
        usdtUnits(40),
        9811
      );

    await p39
      .connect(levelManagerSigner)
      .fillPositionDetailed(
        placementParent.address,
        3,
        orbitOwner.address,
        rawReferrer.address,
        usdtUnits(40),
        9812
      );

    await p39
      .connect(levelManagerSigner)
      .fillPositionDetailed(
        orbitOwner.address,
        3,
        activatingUser.address,
        orbitOwner.address,
        usdtUnits(40),
        9813
      );

    const rule = await p39.getPositionRuleView(orbitOwner.address, 3, 1);
    expect(rule.line).to.equal(1);
    expect(rule.toOwner).to.equal(usdtUnits(8));
    expect(rule.toSpillover1).to.equal(usdtUnits(8));
    expect(rule.toSpillover2).to.equal(usdtUnits(20));
    expect(rule.spillover1Recipient).to.equal(placementParent.address);
    expect(rule.spillover2Recipient).to.equal(matrixGrandParent.address);
    expect(rule.spillover1Recipient).to.not.equal(rawReferrer.address);
    expect(rule.spillover2Recipient).to.not.equal(owner.address);
  });

  it("validates the described P39 chain where H is referred by C and appears under C in A's line 2", async function () {
    const { owner, users, registration, levelManager, p39, register, activateToLevel } = await deployCoreSystem();

    const A = users[8];
    const B = users[9];
    const C = users[10];
    const D = users[11];
    const E = users[12];
    const F = users[13];
    const G = users[14];
    const H = users[15];

    await register(A, owner.address);
    await activateToLevel(A, 3);

    for (const direct of [B, C, D, E]) {
      await register(direct, A.address);
      await activateToLevel(direct, 3);
    }

    for (const bDownline of [F, G]) {
      await register(bDownline, B.address);
      await activateToLevel(bDownline, 3);
    }

    await register(H, C.address);
    const hLevel2Tx = await registration.connect(H).activateLevel(2);
    await hLevel2Tx.wait();
    const hLevel3Tx = await registration.connect(H).activateLevel(3);
    const receipt = await hLevel3Tx.wait();

    const hInA = await p39.getPosition(A.address, 3, 5);
    const hRuleInA = await p39.getPositionRuleView(A.address, 3, 5);
    expect(hInA.occupant).to.equal(H.address);
    expect(hRuleInA.line).to.equal(2);
    expect(hRuleInA.linePaymentNumber).to.equal(4);

    const receipts = receipt.logs
      .map((log) => {
        try {
          return levelManager.interface.parseLog(log);
        } catch {
          return null;
        }
      })
      .filter((event) => event?.name === "DetailedPayoutReceiptRecorded");

    const hReceipts = receipts.map((event) => ({
      receiver: event.args.receiver,
      role: Number(event.args.routedRole),
      gross: event.args.grossAmount,
      escrow: event.args.escrowLocked,
      liquid: event.args.liquidPaid,
      sourceOwner: event.args.orbitOwner,
      sourcePosition: Number(event.args.sourcePosition),
      mirrorPosition: Number(event.args.mirroredPosition),
    }));

    const cOwnerReceipt = hReceipts.find((row) => row.receiver === C.address && row.role === 1);
    const aSpilloverReceipt = hReceipts.find((row) => row.receiver === A.address && row.role === 2);
    const id1SpilloverReceipt = hReceipts.find((row) => row.receiver === owner.address && row.role === 3);

    expect(cOwnerReceipt?.gross).to.equal(usdtUnits(8));
    expect(aSpilloverReceipt?.gross).to.equal(usdtUnits(8));
    expect(aSpilloverReceipt?.escrow).to.equal(usdtUnits(8));
    expect(id1SpilloverReceipt?.gross).to.equal(usdtUnits(20));

    const systemCharge = usdtUnits(4);
    const distributed = hReceipts.reduce(
      (total, row) => total + row.escrow + row.liquid,
      0n
    );
    expect(distributed + systemCharge).to.equal(usdtUnits(40));
  });

  it("guards operations vault disbursements behind multisig execution with a reason", async function () {
    const [owner, recipient] = await ethers.getSigners();
    const MockUSDT = await ethers.getContractFactory("MockUSDT");
    const MultiSig = await ethers.getContractFactory("SimpleMultiSig");
    const OperationsVault = await ethers.getContractFactory("OperationsVault");

    const usdt = await MockUSDT.deploy();
    const multisig = await MultiSig.deploy([owner.address], 1, 1);
    const vault = await OperationsVault.deploy(usdt.target, multisig.target);

    await usdt.mint(vault.target, usdtUnits(100));

    await expect(
      vault.disburse(recipient.address, usdtUnits(10), "direct caller should fail")
    ).to.be.reverted;

    const data = vault.interface.encodeFunctionData("disburse", [
      recipient.address,
      usdtUnits(10),
      "worker payment",
    ]);

    await multisig.submitTransaction(vault.target, 0, data);
    await multisig.approveTransaction(0);
    await ethers.provider.send("evm_increaseTime", [2]);
    await ethers.provider.send("evm_mine", []);
    await expect(multisig.executeTransaction(0))
      .to.emit(vault, "OperationsDisbursement")
      .withArgs(recipient.address, usdtUnits(10), "worker payment");

    expect(await usdt.balanceOf(recipient.address)).to.equal(usdtUnits(10));
    expect(await usdt.balanceOf(vault.target)).to.equal(usdtUnits(90));
  });

  it("allows an approved proposal submitter to submit but not vote or execute", async function () {
    const [owner, secondOwner, submitter, target] = await ethers.getSigners();
    const MultiSig = await ethers.getContractFactory("SimpleMultiSig");
    const multisig = await MultiSig.deploy([owner.address, secondOwner.address], 2, 1);

    const setSubmitterData = multisig.interface.encodeFunctionData("setProposalSubmitter", [
      submitter.address,
      true,
    ]);

    await multisig.submitTransaction(multisig.target, 0, setSubmitterData);
    await multisig.approveTransaction(0);
    await multisig.connect(secondOwner).approveTransaction(0);
    await ethers.provider.send("evm_increaseTime", [2]);
    await ethers.provider.send("evm_mine", []);
    await multisig.executeTransaction(0);

    expect(await multisig.isProposalSubmitter(submitter.address)).to.equal(true);

    const txId = await multisig
      .connect(submitter)
      .submitTransaction.staticCall(target.address, 0, "0x");
    await expect(multisig.connect(submitter).submitTransaction(target.address, 0, "0x"))
      .to.emit(multisig, "Submit")
      .withArgs(txId);

    await expect(multisig.connect(submitter).approveTransaction(txId)).to.be.revertedWith("Not owner");
    await expect(multisig.connect(submitter).executeTransaction(txId)).to.be.revertedWith("Not owner");
  });

  it("keeps NFT pool USDT distribution controlled by multisig-owned vault rules", async function () {
    const [owner, recipient] = await ethers.getSigners();
    const MockUSDT = await ethers.getContractFactory("MockUSDT");
    const MultiSig = await ethers.getContractFactory("SimpleMultiSig");
    const NFTPoolVault = await ethers.getContractFactory("NFTPoolVault");

    const usdt = await MockUSDT.deploy();
    const multisig = await MultiSig.deploy([owner.address], 1, 1);
    const vault = await NFTPoolVault.deploy(usdt.target, multisig.target);
    const distributionId = ethers.id("future-nft-layer-round-1");
    const merkleRoot = ethers.keccak256(ethers.toUtf8Bytes("qualified-members-root"));

    await usdt.mint(vault.target, usdtUnits(50));

    await expect(
      vault.distribute(recipient.address, usdtUnits(5), distributionId, "direct caller should fail")
    ).to.be.reverted;

    const setRootData = vault.interface.encodeFunctionData("setDistributionRoot", [
      distributionId,
      merkleRoot,
      "ipfs://future-qualified-members",
      "prepare future NFT layer",
    ]);
    await multisig.submitTransaction(vault.target, 0, setRootData);
    await multisig.approveTransaction(0);
    await ethers.provider.send("evm_increaseTime", [2]);
    await ethers.provider.send("evm_mine", []);
    await multisig.executeTransaction(0);

    const distributeData = vault.interface.encodeFunctionData("distribute", [
      recipient.address,
      usdtUnits(5),
      distributionId,
      "qualified member distribution",
    ]);
    await multisig.submitTransaction(vault.target, 0, distributeData);
    await multisig.approveTransaction(1);
    await ethers.provider.send("evm_increaseTime", [2]);
    await ethers.provider.send("evm_mine", []);
    await expect(multisig.executeTransaction(1))
      .to.emit(vault, "NFTPoolDistribution")
      .withArgs(recipient.address, usdtUnits(5), distributionId, "qualified member distribution");

    expect(await usdt.balanceOf(recipient.address)).to.equal(usdtUnits(5));
    expect(await usdt.balanceOf(vault.target)).to.equal(usdtUnits(45));
  });

  it("anchors mirrored children under the latest repeated matrix-parent occurrence", async function () {
    const { users, levelManager, p39, register } = await deployCoreSystem();
    const levelManagerSigner = await impersonateLevelManager(levelManager);
    const orbitOwner = users[8];
    const firstLineUser = users[9];
    const repeatedParent = users[10];
    const mirroredChild = users[11];

    await register(orbitOwner);
    await register(firstLineUser, orbitOwner.address);
    await register(repeatedParent, orbitOwner.address);
    await register(mirroredChild, repeatedParent.address);

    await p39.connect(levelManagerSigner).fillPositionDetailed(
      orbitOwner.address,
      3,
      firstLineUser.address,
      orbitOwner.address,
      usdtUnits(40),
      99001
    );

    await p39.connect(levelManagerSigner).mirrorPositionDetailed(
      orbitOwner.address,
      3,
      repeatedParent.address,
      repeatedParent.address,
      usdtUnits(40),
      usdtUnits(40),
      99002
    );
    await p39.connect(levelManagerSigner).mirrorPositionDetailed(
      orbitOwner.address,
      3,
      repeatedParent.address,
      repeatedParent.address,
      usdtUnits(40),
      usdtUnits(40),
      99003
    );

    expect((await p39.getPosition(orbitOwner.address, 3, 2)).occupant)
      .to.equal(repeatedParent.address);
    expect((await p39.getPosition(orbitOwner.address, 3, 3)).occupant)
      .to.equal(repeatedParent.address);

    await p39.connect(levelManagerSigner).mirrorPositionDetailed(
      orbitOwner.address,
      3,
      mirroredChild.address,
      repeatedParent.address,
      usdtUnits(8),
      0,
      99004
    );

    expect((await p39.getPosition(orbitOwner.address, 3, 6)).occupant)
      .to.equal(mirroredChild.address);
    expect((await p39.getPosition(orbitOwner.address, 3, 5)).occupant)
      .to.equal(ethers.ZeroAddress);
  });

  it("preserves parent P39 mirror accounting when routed escrow triggers a nested auto-upgrade", async function () {
    this.timeout(600000);
    const { owner, usdt, escrow, registration, levelManager, register, activateToLevel } =
      await deployCoreSystem();
    const accounts = await createFundedWallets(owner, 40);
    const account = (label) => accounts[label - 8];

    await register(account(8), owner.address);
    for (let position = 1; position <= 39; position += 1) {
      const childLabel = position + 8;
      let sponsorLabel = 8;
      if (position >= 4 && position <= 12) {
        sponsorLabel = 9 + ((position - 4) % 3);
      } else if (position >= 13) {
        const parentPosition = 4 + ((position - 13) % 9);
        sponsorLabel = parentPosition + 8;
      }
      await register(account(childLabel), account(sponsorLabel).address);
    }

    for (let label = 9; label <= 47; label += 1) {
      await activateToLevel(account(label), 2);
    }
    await activateToLevel(account(8), 3);
    for (let label = 9; label < 36; label += 1) {
      await activateToLevel(account(label), 3);
    }

    const levelManagerSigner = await impersonateLevelManager(levelManager);
    await usdt.mint(levelManager.target, usdtUnits(13 * 79));
    for (let label = 8; label <= 20; label += 1) {
      await escrow
        .connect(levelManagerSigner)
        .lockFunds(account(label).address, 3, 4, usdtUnits(79));
    }

    const tx = await registration.connect(account(36)).activateLevel(3);
    const receipt = await tx.wait();
    const summaries = parseEvents(receipt, levelManager, "ActivationFinancialSummaryRecorded");
    const targetSummary = summaries.find(
      (event) => event.args.user === account(36).address && event.args.level === 3n
    );
    const targetReceipts = parseEvents(receipt, levelManager, "DetailedPayoutReceiptRecorded")
      .filter((event) => event.args.activationId === targetSummary.args.activationId);

    expect(targetSummary.args.systemCharge).to.equal(usdtUnits(4));
    expect(targetSummary.args.totalLiquidPaid).to.equal(usdtUnits(28));
    expect(targetSummary.args.totalEscrowLocked).to.equal(usdtUnits(8));
    expect(targetReceipts.reduce((sum, event) => sum + event.args.liquidPaid, 0n))
      .to.equal(usdtUnits(28));
    expect(targetReceipts.reduce((sum, event) => sum + event.args.escrowLocked, 0n))
      .to.equal(usdtUnits(8));
    expect(summaries.some((event) => event.args.isAutoUpgrade && event.args.level === 4n))
      .to.equal(true);
  });
});

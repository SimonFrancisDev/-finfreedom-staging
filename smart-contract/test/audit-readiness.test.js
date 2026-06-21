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

    // Mirrored arrivals settle the already-routed amount. They must not create
    // an additional full-price line-3 entitlement from an 8 USDT route.
    expect(mirroredRule.toEscrow).to.equal(usdtUnits(8));

    const lockedAfterMirror = await escrow.getLockedAmount(destinationOwner.address, 3, 4);
    expect(lockedAfterMirror - lockedBeforeMirror).to.equal(usdtUnits(8));

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
    expect(summaryEvent.args.totalLiquidPaid).to.equal(usdtUnits(28));
    expect(summaryEvent.args.totalEscrowLocked).to.equal(usdtUnits(8));
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
    const { owner, users, registration, levelManager, router, usdt, register, activateToLevel } = await deployCoreSystem();
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
});

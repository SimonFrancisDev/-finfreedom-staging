const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("Freedom-Plus ordinary settlement router", function () {
  this.timeout(360_000);

  const UNIT = 10n ** 6n;
  let owner;
  let id1;
  let a;
  let b;
  let c;
  let d;
  let outsider;
  let guardian;

  beforeEach(async function () {
    [owner, id1, a, b, c, d, outsider] = await ethers.getSigners();
    const Guardian = await ethers.getContractFactory("MockMigrationGuardian");
    guardian = await Guardian.deploy();
  });

  async function deployGraph(usdtContract = "MockUSDT") {
    const Usdt = await ethers.getContractFactory(usdtContract);
    const usdt = await Usdt.deploy();

    const FPT = await ethers.getContractFactory("FPTToken");
    const FPTr = await ethers.getContractFactory("FPTrToken");
    const fpt = await upgrades.deployProxy(FPT, [owner.address, await guardian.getAddress()], { kind: "uups" });
    const fptr = await upgrades.deployProxy(FPTr, [owner.address, await guardian.getAddress()], { kind: "uups" });

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

    const orbitSpecs = [
      ["P39PlusOrbit", 0],
      ["P14PlusOrbit", 1],
      ["P12PlusOrbit", 2],
      ["P6PlusOrbit", 3],
      ["P4PlusOrbit", 4],
      ["P3PlusOrbit", 5],
    ];
    const orbits = {};
    for (const [name, type] of orbitSpecs) {
      const Orbit = await ethers.getContractFactory(name);
      orbits[type] = await upgrades.deployProxy(
        Orbit,
        [await manager.getAddress(), owner.address, await guardian.getAddress()],
        { kind: "uups" }
      );
    }

    const Vault = await ethers.getContractFactory("MockFreedomPlusVault");
    const nftVault = await Vault.deploy();
    const operationsVault = await Vault.deploy();

    const Router = await ethers.getContractFactory("FreedomPlusSettlementRouter");
    const router = await upgrades.deployProxy(
      Router,
      [
        await usdt.getAddress(),
        await registration.getAddress(),
        await manager.getAddress(),
        id1.address,
        await nftVault.getAddress(),
        await operationsVault.getAddress(),
        owner.address,
        await guardian.getAddress(),
      ],
      { kind: "uups" }
    );

    for (const [, type] of orbitSpecs) {
      await router.configureOrbit(type, await orbits[type].getAddress());
      await orbits[type].setManager(await router.getAddress());
    }
    await router.lockConfiguration();
    await manager.configureRegistration(await registration.getAddress());
    await manager.configureSettlementRouter(await router.getAddress());
    await controller.setLevelManager(await manager.getAddress());
    await fpt.setAuthorizedOperator(await controller.getAddress(), true);
    await fptr.setAuthorizedOperator(await controller.getAddress(), true);

    return { usdt, fpt, fptr, controller, manager, registration, router, orbits, nftVault, operationsVault };
  }

  async function fundAndApprove(system, signer, amount) {
    await system.usdt.mint(signer.address, amount);
    await system.usdt.connect(signer).approve(await system.manager.getAddress(), amount);
  }

  async function activateThrough(system, signer, finalLevel) {
    for (let level = 2; level <= finalLevel; level++) {
      await system.registration.connect(signer).activateLevel(level);
    }
  }

  it("settles the exact three-generation P39 component path and anchored placement", async function () {
    const system = await deployGraph();
    for (const signer of [a, b, c]) await fundAndApprove(system, signer, 50n * UNIT);

    await system.registration.connect(a).register(id1.address);
    await system.registration.connect(b).register(a.address);

    const bBefore = await system.usdt.balanceOf(b.address);
    const aBefore = await system.usdt.balanceOf(a.address);
    const id1Before = await system.usdt.balanceOf(id1.address);
    const nftBefore = await system.usdt.balanceOf(await system.nftVault.getAddress());
    const operationsBefore = await system.usdt.balanceOf(await system.operationsVault.getAddress());

    const tx = await system.registration.connect(c).register(b.address);
    const receipt = await tx.wait();

    expect((await system.usdt.balanceOf(b.address)) - bBefore).to.equal(10n * UNIT);
    expect((await system.usdt.balanceOf(a.address)) - aBefore).to.equal(10n * UNIT);
    expect((await system.usdt.balanceOf(id1.address)) - id1Before).to.equal(25n * UNIT);
    expect((await system.usdt.balanceOf(await system.nftVault.getAddress())) - nftBefore).to.equal(4n * UNIT);
    expect((await system.usdt.balanceOf(await system.operationsVault.getAddress())) - operationsBefore).to.equal(1n * UNIT);
    expect(await system.usdt.balanceOf(await system.router.getAddress())).to.equal(0);
    expect(await system.fpt.balanceOf(c.address)).to.equal(50n * UNIT);

    const p39 = system.orbits[0];
    const cInB = await p39.positionAt(b.address, 1, 0, 1);
    expect(cInB.participant).to.equal(c.address);
    expect(cInB.structuralParent).to.equal(b.address);
    expect(cInB.kind).to.equal(1);

    const cInA = await p39.positionAt(a.address, 1, 0, 4);
    expect(cInA.participant).to.equal(c.address);
    expect(cInA.structuralParent).to.equal(b.address);
    expect(cInA.kind).to.equal(2);

    const routerAddress = (await system.router.getAddress()).toLowerCase();
    const componentLogs = receipt.logs
      .filter((log) => log.address.toLowerCase() === routerAddress)
      .map((log) => {
        try { return system.router.interface.parseLog(log); } catch { return null; }
      })
      .filter((parsed) => parsed && parsed.name === "ComponentSettled");
    expect(componentLogs).to.have.length(3);
    expect(componentLogs.map((log) => log.args.bps)).to.deep.equal([2000n, 2000n, 5000n]);
    expect(componentLogs.map((log) => log.args.recipient)).to.deep.equal([b.address, a.address, id1.address]);
  });

  it("routes exhausted structural components to ID1 without artificial ID1 placements", async function () {
    const system = await deployGraph();
    await fundAndApprove(system, a, 50n * UNIT);

    await system.registration.connect(a).register(id1.address);

    expect(await system.usdt.balanceOf(id1.address)).to.equal(45n * UNIT);
    expect(await system.usdt.balanceOf(await system.nftVault.getAddress())).to.equal(4n * UNIT);
    expect(await system.usdt.balanceOf(await system.operationsVault.getAddress())).to.equal(1n * UNIT);
    const id1Cycle = await system.orbits[0].cycleState(id1.address, 1, 0);
    expect(id1Cycle.filledPositions).to.equal(1);
  });

  it("uses P39 line-2 structure: immediate parent 20%, owner 20%, upper recipient 50%", async function () {
    const system = await deployGraph();
    for (const signer of [a, b, c, d]) await fundAndApprove(system, signer, 50n * UNIT);

    await system.registration.connect(a).register(id1.address);
    await system.registration.connect(b).register(a.address);
    await system.registration.connect(c).register(a.address);
    await system.registration.connect(d).register(a.address);

    const extra = (await ethers.getSigners())[6];
    await fundAndApprove(system, extra, 50n * UNIT);
    const bBefore = await system.usdt.balanceOf(b.address);
    const aBefore = await system.usdt.balanceOf(a.address);
    const id1Before = await system.usdt.balanceOf(id1.address);
    await system.registration.connect(extra).register(a.address);

    expect((await system.usdt.balanceOf(b.address)) - bBefore).to.equal(10n * UNIT);
    expect((await system.usdt.balanceOf(a.address)) - aBefore).to.equal(10n * UNIT);
    expect((await system.usdt.balanceOf(id1.address)) - id1Before).to.equal(25n * UNIT);
    const source = await system.orbits[0].positionAt(a.address, 1, 0, 4);
    expect(source.participant).to.equal(extra.address);
    expect(source.structuralParent).to.equal(b.address);
  });

  it("keeps P12 40% and 50% roles distinct on a first-ring activation", async function () {
    const system = await deployGraph();
    for (const signer of [a, b]) await fundAndApprove(system, signer, 650n * UNIT);

    await system.registration.connect(a).register(id1.address);
    await system.registration.connect(a).activateLevel(2);
    await system.registration.connect(a).activateLevel(3);
    await system.registration.connect(b).register(a.address);
    await system.registration.connect(b).activateLevel(2);

    const aBefore = await system.usdt.balanceOf(a.address);
    const id1Before = await system.usdt.balanceOf(id1.address);
    await system.registration.connect(b).activateLevel(3);

    expect((await system.usdt.balanceOf(a.address)) - aBefore).to.equal(180n * UNIT);
    expect((await system.usdt.balanceOf(id1.address)) - id1Before).to.equal(225n * UNIT);
    expect(await system.usdt.balanceOf(await system.router.getAddress())).to.equal(0);
  });

  it("settles every level engine at its exact first-ring percentages", async function () {
    const system = await deployGraph();
    const fullCost = 54_650n * UNIT;
    await fundAndApprove(system, a, fullCost);
    await fundAndApprove(system, b, fullCost);

    await system.registration.connect(a).register(id1.address);
    await activateThrough(system, a, 7);
    await system.registration.connect(b).register(a.address);

    const cases = [
      [2, 22_500_000n, 112_500_000n, 12_000_000n, 3_000_000n],
      [3, 180n * UNIT, 225n * UNIT, 36n * UNIT, 9n * UNIT],
      [4, 540n * UNIT, 675n * UNIT, 108n * UNIT, 27n * UNIT],
      [5, 3_645n * UNIT, 0n, 324n * UNIT, 81n * UNIT],
      [6, 10_935n * UNIT, 0n, 972n * UNIT, 243n * UNIT],
      [7, 32_805n * UNIT, 0n, 2_916n * UNIT, 729n * UNIT],
    ];

    for (const [level, toA, toId1, toNft, toOperations] of cases) {
      const before = {
        a: await system.usdt.balanceOf(a.address),
        id1: await system.usdt.balanceOf(id1.address),
        nft: await system.usdt.balanceOf(await system.nftVault.getAddress()),
        operations: await system.usdt.balanceOf(await system.operationsVault.getAddress()),
      };
      await system.registration.connect(b).activateLevel(level);
      expect((await system.usdt.balanceOf(a.address)) - before.a).to.equal(toA);
      expect((await system.usdt.balanceOf(id1.address)) - before.id1).to.equal(toId1);
      expect((await system.usdt.balanceOf(await system.nftVault.getAddress())) - before.nft).to.equal(toNft);
      expect((await system.usdt.balanceOf(await system.operationsVault.getAddress())) - before.operations).to.equal(toOperations);
      expect(await system.usdt.balanceOf(await system.router.getAddress())).to.equal(0);
    }

    expect(await system.fpt.balanceOf(b.address)).to.equal(fullCost);
  });

  it("skips an inactive exact-level recipient and pays it normally after later activation", async function () {
    const system = await deployGraph();
    for (const signer of [a, b, c, d]) await fundAndApprove(system, signer, 1_300n * UNIT);

    await system.registration.connect(a).register(id1.address);
    await activateThrough(system, a, 3);
    await system.registration.connect(b).register(a.address);
    await system.registration.connect(c).register(b.address);
    await system.registration.connect(c).activateLevel(2);

    const aBeforeSkipped = await system.usdt.balanceOf(a.address);
    const bBeforeSkipped = await system.usdt.balanceOf(b.address);
    await system.registration.connect(c).activateLevel(3);
    expect((await system.usdt.balanceOf(a.address)) - aBeforeSkipped).to.equal(180n * UNIT);
    expect((await system.usdt.balanceOf(b.address)) - bBeforeSkipped).to.equal(0);

    await system.registration.connect(b).activateLevel(2);
    await system.registration.connect(b).activateLevel(3);
    await system.registration.connect(d).register(b.address);
    await system.registration.connect(d).activateLevel(2);

    const bBeforeRecovery = await system.usdt.balanceOf(b.address);
    await system.registration.connect(d).activateLevel(3);
    expect((await system.usdt.balanceOf(b.address)) - bBeforeRecovery).to.equal(180n * UNIT);
  });

  it("initializes ID1 and four representatives without financial side effects", async function () {
    const system = await deployGraph();
    const representatives = [a, b, c, d];
    const trackedAddresses = [
      id1.address,
      ...representatives.map((representative) => representative.address),
      await system.router.getAddress(),
      await system.nftVault.getAddress(),
      await system.operationsVault.getAddress(),
    ];
    const usdtBefore = await Promise.all(
      trackedAddresses.map((address) => system.usdt.balanceOf(address))
    );

    await expect(
      system.registration.connect(outsider).initializeGenesis(
        representatives.map((representative) => representative.address)
      )
    ).to.be.revertedWithCustomError(system.registration, "OwnableUnauthorizedAccount");

    await system.registration.initializeGenesis(
      representatives.map((representative) => representative.address)
    );

    expect(await system.registration.genesisInitialized()).to.equal(true);
    expect(await system.registration.registeredCount()).to.equal(5);
    const genesisParticipants = [id1, ...representatives];
    for (let index = 0; index < genesisParticipants.length; index++) {
      const participant = genesisParticipants[index];
      expect(await system.registration.isRegistered(participant.address)).to.equal(true);
      expect(await system.registration.participantNumber(participant.address)).to.equal(index + 1);
      if (index > 0) {
        expect(await system.registration.sponsorOf(participant.address)).to.equal(id1.address);
      }
      for (let level = 1; level <= 7; level++) {
        expect(await system.registration.isLevelActive(participant.address, level)).to.equal(true);
      }
      expect(await system.fpt.balanceOf(participant.address)).to.equal(54_650n * UNIT);
      expect(await system.fptr.balanceOf(participant.address)).to.equal(0);
    }

    const usdtAfter = await Promise.all(
      trackedAddresses.map((address) => system.usdt.balanceOf(address))
    );
    expect(usdtAfter).to.deep.equal(usdtBefore);

    const engineLevels = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [4, 6]];
    for (const [orbitType, level] of engineLevels) {
      const orbit = system.orbits[orbitType];
      for (let index = 0; index < representatives.length; index++) {
        const position = await orbit.positionAt(id1.address, level, 0, index + 1);
        expect(position.participant).to.equal(representatives[index].address);
        expect(position.kind).to.equal(0);
        expect(position.financial).to.equal(false);
        expect(await orbit.currentStructuralParentOf(representatives[index].address, level))
          .to.equal(position.structuralParent);
      }
    }

    const p3 = system.orbits[5];
    for (let index = 0; index < 3; index++) {
      const position = await p3.positionAt(id1.address, 7, 0, index + 1);
      expect(position.participant).to.equal(representatives[index].address);
      expect(position.kind).to.equal(0);
    }
    const fourth = await p3.positionAt(id1.address, 7, 1, 1);
    expect(fourth.participant).to.equal(d.address);
    expect(fourth.structuralParent).to.equal(id1.address);
    expect(fourth.kind).to.equal(0);
    expect(await p3.currentCycleOf(id1.address, 7)).to.equal(1);

    await expect(
      system.registration.initializeGenesis(
        representatives.map((representative) => representative.address)
      )
    ).to.be.revertedWithCustomError(system.registration, "GenesisAlreadyInitialized");
  });

  it("rejects fee-on-transfer USDT and rolls registration back atomically", async function () {
    const system = await deployGraph("MockFeeOnTransferUSDT");
    await fundAndApprove(system, a, 50n * UNIT);
    await expect(
      system.registration.connect(a).register(id1.address)
    ).to.be.revertedWithCustomError(system.manager, "IncorrectTransferredAmount");
    expect(await system.registration.isRegistered(a.address)).to.equal(false);
    expect(await system.registration.registeredCount()).to.equal(1);
    expect(await system.fpt.balanceOf(a.address)).to.equal(0);
    expect((await system.orbits[0].cycleState(id1.address, 1, 0)).filledPositions).to.equal(0);
  });

  it("traverses several inactive sponsors and stops at the first exact-level eligible wallet", async function () {
    const system = await deployGraph();
    const signers = (await ethers.getSigners()).slice(2, 10);
    for (const signer of signers) await fundAndApprove(system, signer, 650n * UNIT);
    const [top, ...chain] = signers;
    await system.registration.connect(top).register(id1.address);
    await activateThrough(system, top, 3);
    let sponsor = top;
    for (const signer of chain) {
      await system.registration.connect(signer).register(sponsor.address);
      sponsor = signer;
    }
    const payer = ethers.Wallet.createRandom().connect(ethers.provider);
    await owner.sendTransaction({ to: payer.address, value: ethers.parseEther("0.2") });
    await fundAndApprove(system, payer, 650n * UNIT);
    await system.registration.connect(payer).register(sponsor.address);
    await system.registration.connect(payer).activateLevel(2);
    const topBefore = await system.usdt.balanceOf(top.address);
    await system.registration.connect(payer).activateLevel(3);
    expect((await system.usdt.balanceOf(top.address)) - topBefore).to.equal(180n * UNIT);
    for (const inactive of chain) {
      expect(await system.registration.isLevelActive(inactive.address, 3)).to.equal(false);
    }
  });

  const recycleCases = [
    ["P39", 1, 39, 0, 50n, true],
    ["P14", 2, 14, 1, 150n, true],
    ["P12", 3, 12, 2, 450n, true],
    ["P6", 4, 6, 3, 1_350n, true],
    ["P4 Level 5", 5, 4, 4, 4_050n, false],
    ["P4 Level 6", 6, 4, 4, 12_150n, false],
    ["P3", 7, 3, 5, 36_450n, false],
  ];
  const cumulativeCosts = [0n, 50n, 200n, 650n, 2_000n, 6_050n, 18_200n, 54_650n];

  for (const [label, level, capacity, orbitType, price, hasTwoFillReserve] of recycleCases) {
    it(`completes ${label} reserve, recycle re-entry, and FPTr exactly once`, async function () {
      const system = await deployGraph();
      await fundAndApprove(system, a, cumulativeCosts[level] * UNIT);
      await system.registration.connect(a).register(id1.address);
      await activateThrough(system, a, level);

      const participants = [];
      for (let index = 0; index < capacity; index++) {
        const wallet = ethers.Wallet.createRandom().connect(ethers.provider);
        await owner.sendTransaction({ to: wallet.address, value: ethers.parseEther("0.2") });
        await fundAndApprove(system, wallet, cumulativeCosts[level] * UNIT);
        participants.push(wallet);
      }

      if (level > 1) {
        for (const wallet of participants) {
          await system.registration.connect(wallet).register(a.address);
          await activateThrough(system, wallet, level - 1);
        }
      }

      const fptrBefore = await system.fptr.balanceOf(a.address);
      let finalReceipt;
      for (let index = 0; index < participants.length; index++) {
        const wallet = participants[index];
        const tx = level === 1
          ? await system.registration.connect(wallet).register(a.address)
          : await system.registration.connect(wallet).activateLevel(level);
        if (index === participants.length - 1) finalReceipt = await tx.wait();

        if (hasTwoFillReserve && index === capacity - 2) {
          expect(await system.router.recycleReserve(a.address, level, 0)).to.equal(price * UNIT / 2n);
          expect(await system.router.recycleReserveConsumed(a.address, level, 0)).to.equal(false);
        }
      }

      const completed = await system.orbits[orbitType].cycleState(a.address, level, 0);
      expect(completed.filledPositions).to.equal(capacity);
      expect(completed.closed).to.equal(true);
      expect(await system.orbits[orbitType].currentCycleOf(a.address, level)).to.equal(1);
      expect(await system.router.recycleReserve(a.address, level, 0)).to.equal(0);
      expect(await system.router.recycleReserveConsumed(a.address, level, 0)).to.equal(true);
      expect((await system.fptr.balanceOf(a.address)) - fptrBefore).to.equal(price * UNIT / 2n);
      expect(await system.orbits[orbitType].currentStructuralParentOf(a.address, level)).to.equal(id1.address);
      expect(await system.usdt.balanceOf(await system.router.getAddress())).to.equal(0);

      const routerAddress = (await system.router.getAddress()).toLowerCase();
      const parsed = finalReceipt.logs
        .filter((log) => log.address.toLowerCase() === routerAddress)
        .map((log) => { try { return system.router.interface.parseLog(log); } catch { return null; } })
        .filter(Boolean);
      const recycle = parsed.find((event) => event.name === "RecycleCompleted");
      expect(recycle).to.not.equal(undefined);
      const recycleComponents = parsed.filter(
        (event) => event.name === "ComponentSettled"
          && event.args.activationId === recycle.args.recycleActivationId
      );
      expect(recycleComponents.some(
        (event) => event.args.recipient.toLowerCase() === a.address.toLowerCase()
      )).to.equal(false);
    });
  }
});

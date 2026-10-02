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
    const Gateway = await ethers.getContractFactory("MockFFreedomGatewayRegistration");
    const gateway = await Gateway.deploy();
    await registration.setFFreedomRegistration(await gateway.getAddress());
    for (const representative of [a, b, c]) {
      await gateway.setParticipant(representative.address, id1.address, true, true);
    }

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
    const founders = Array.from({ length: 8 }, (_, i) => ethers.getAddress(ethers.toBeHex(1000 + i, 20)));
    await router.configureFounderWallets(founders);
    await router.lockConfiguration();
    await manager.configureRegistration(await registration.getAddress());
    await manager.configureSettlementRouter(await router.getAddress());
    await controller.setLevelManager(await manager.getAddress());
    await fpt.setAuthorizedOperator(await controller.getAddress(), true);
    await fptr.setAuthorizedOperator(await controller.getAddress(), true);

    return { usdt, fpt, fptr, controller, manager, registration, router, orbits, nftVault, operationsVault, gateway, founders };
  }

  async function founderBalance(system) {
    const balances = await Promise.all(system.founders.map((wallet) => system.usdt.balanceOf(wallet)));
    return balances.reduce((total, balance) => total + balance, 0n);
  }

  async function register(system, signer, sponsor) {
    await system.gateway.setParticipant(signer.address, sponsor, true, true);
    return system.registration.connect(signer).register(sponsor);
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

  it("rejects genesis representatives without matching active F-Freedom sponsorship", async function () {
    const system = await deployGraph();
    await system.gateway.setParticipant(a.address, id1.address, false, false);
    await expect(system.registration.initializeGenesis([a.address, b.address, c.address]))
      .to.be.revertedWithCustomError(system.registration, "FFreedomLevelOneInactive");
    expect(await system.registration.genesisInitialized()).to.equal(false);
    await system.gateway.setParticipant(a.address, id1.address, true, false);
    await expect(system.registration.initializeGenesis([a.address, b.address, c.address]))
      .to.be.revertedWithCustomError(system.registration, "FFreedomLevelOneInactive");
    await system.gateway.setParticipant(a.address, d.address, true, true);
    await expect(system.registration.initializeGenesis([a.address, b.address, c.address]))
      .to.be.revertedWithCustomError(system.registration, "PermanentSponsorMismatch");
    expect(await system.registration.registeredCount()).to.equal(1);
    await system.gateway.setParticipant(a.address, id1.address, true, true);
    await system.registration.pause();
    await system.registration.initializeGenesis([a.address, b.address, c.address]);
    expect(await system.registration.paused()).to.equal(true);
    expect(await system.registration.sponsorOf(a.address)).to.equal(await system.gateway.getReferrer(a.address));
  });

  it("normalizes legacy zero-referrer representatives to ID1 without changing gateway records", async function () {
    const system = await deployGraph();
    for (const representative of [a, b, c]) {
      await system.gateway.setParticipant(representative.address, ethers.ZeroAddress, true, true);
    }
    await system.registration.pause();
    await system.registration.initializeGenesis([a.address, b.address, c.address]);
    expect(await system.registration.registeredCount()).to.equal(4);
    expect(await system.registration.paused()).to.equal(true);
    for (const representative of [a, b, c]) {
      expect(await system.gateway.getReferrer(representative.address)).to.equal(ethers.ZeroAddress);
      expect(await system.registration.sponsorOf(representative.address)).to.equal(id1.address);
      expect(await system.fpt.balanceOf(representative.address)).to.equal(54650n * UNIT);
      for (let level = 1; level <= 7; level++) {
        expect(await system.registration.isLevelActive(representative.address, level)).to.equal(true);
      }
    }
  });

  it("splits ID1 income equally among eight founders without changing genesis placements", async function () {
    const system = await deployGraph();
    await system.registration.initializeGenesis([a.address, b.address, c.address]);
    await fundAndApprove(system, d, 50n * UNIT);
    const tx = await register(system, d, id1.address);
    const receipt = await tx.wait();
    const transfers = receipt.logs.map((log) => {
      try { return system.router.interface.parseLog(log); } catch { return null; }
    }).filter((event) => event?.name === "FounderPaymentDistributed");
    expect(transfers.length).to.be.greaterThan(0);
    for (const event of transfers) {
      expect(system.founders).to.include(event.args.founder);
    }
    const balances = await Promise.all(system.founders.map((wallet) => system.usdt.balanceOf(wallet)));
    expect(balances.every((balance) => balance === balances[0])).to.equal(true);
    expect(await system.usdt.balanceOf(id1.address)).to.equal(0);
    for (let i = 0; i < 3; i++) {
      expect((await system.orbits[0].positionAt(id1.address, 1, 0, i + 1)).participant)
        .to.equal([a, b, c][i].address);
    }
    await expect(system.router.connect(outsider).configureFounderWallets(system.founders))
      .to.be.revertedWithCustomError(system.router, "OwnableUnauthorizedAccount");
    const duplicate = [...system.founders]; duplicate[7] = duplicate[0];
    await expect(system.router.configureFounderWallets(duplicate))
      .to.be.revertedWithCustomError(system.router, "InvalidFounderWallets");
  });

  it("updates both system vaults atomically without changing router storage shape", async function () {
    const system = await deployGraph();
    const Vault = await ethers.getContractFactory("MockFreedomPlusVault");
    const nextNftVault = await Vault.deploy();
    const nextOperationsVault = await Vault.deploy();

    await expect(
      system.router.connect(outsider).setSystemVaults(
        await nextNftVault.getAddress(),
        await nextOperationsVault.getAddress()
      )
    ).to.be.revertedWithCustomError(system.router, "OwnableUnauthorizedAccount");

    await expect(
      system.router.setSystemVaults(
        await nextNftVault.getAddress(),
        await nextOperationsVault.getAddress()
      )
    ).to.emit(system.router, "SystemVaultsUpdated").withArgs(
      await system.nftVault.getAddress(),
      await nextNftVault.getAddress(),
      await system.operationsVault.getAddress(),
      await nextOperationsVault.getAddress()
    );

    expect(await system.router.nftPoolVault()).to.equal(await nextNftVault.getAddress());
    expect(await system.router.operationsVault()).to.equal(await nextOperationsVault.getAddress());
    await expect(
      system.router.setSystemVaults(ethers.ZeroAddress, await nextOperationsVault.getAddress())
    ).to.be.revertedWithCustomError(system.router, "InvalidContract");
  });

  it("settles the exact three-generation P39 component path and anchored placement", async function () {
    const system = await deployGraph();
    for (const signer of [a, b, c]) await fundAndApprove(system, signer, 50n * UNIT);

    await register(system, a, id1.address);
    await register(system, b, a.address);

    const bBefore = await system.usdt.balanceOf(b.address);
    const aBefore = await system.usdt.balanceOf(a.address);
    const id1Before = await founderBalance(system);
    const nftBefore = await system.usdt.balanceOf(await system.nftVault.getAddress());
    const operationsBefore = await system.usdt.balanceOf(await system.operationsVault.getAddress());

    const tx = await register(system, c, b.address);
    const receipt = await tx.wait();

    expect((await system.usdt.balanceOf(b.address)) - bBefore).to.equal(10n * UNIT);
    expect((await system.usdt.balanceOf(a.address)) - aBefore).to.equal(10n * UNIT);
    expect((await founderBalance(system)) - id1Before).to.equal(25n * UNIT);
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
      .filter((parsed) => parsed && ["ComponentSettled", "FounderComponentSettled"].includes(parsed.name));
    expect(componentLogs).to.have.length(3);
    expect(componentLogs.map((log) => log.args.bps)).to.deep.equal([2000n, 2000n, 5000n]);
    expect(componentLogs.map((log) => log.args.recipient)).to.deep.equal([b.address, a.address, id1.address]);
  });

  it("keeps a nested participant under its immediate matrix parent after three sibling branches", async function () {
    const system = await deployGraph();
    const signers = await ethers.getSigners();
    const parent = signers[7];
    const children = signers.slice(8, 12);
    await system.registration.initializeGenesis([a.address, b.address, c.address]);
    for (const signer of [parent, ...children]) {
      await fundAndApprove(system, signer, 50n * UNIT);
    }

    await register(system, parent, a.address);
    await register(system, children[0], parent.address);
    await register(system, children[1], parent.address);
    await register(system, children[2], parent.address);
    await expect(register(system, children[3], children[0].address)).to.not.be.reverted;

    const p39 = system.orbits[0];
    const source = await p39.positionAt(children[0].address, 1, 0, 1);
    expect(source.participant).to.equal(children[3].address);
    expect(source.structuralParent).to.equal(children[0].address);

    const nestedMirror = await p39.positionAt(a.address, 1, 0, 13);
    expect(nestedMirror.participant).to.equal(children[3].address);
    expect(nestedMirror.structuralParent).to.equal(children[0].address);
  });
  it("routes exhausted structural components to ID1 without artificial ID1 placements", async function () {
    const system = await deployGraph();
    await fundAndApprove(system, a, 50n * UNIT);

    await register(system, a, id1.address);

    expect(await founderBalance(system)).to.equal(45n * UNIT);
    expect(await system.usdt.balanceOf(await system.nftVault.getAddress())).to.equal(4n * UNIT);
    expect(await system.usdt.balanceOf(await system.operationsVault.getAddress())).to.equal(1n * UNIT);
    const id1Cycle = await system.orbits[0].cycleState(id1.address, 1, 0);
    expect(id1Cycle.filledPositions).to.equal(1);
  });

  it("uses P39 line-2 structure: immediate parent 20%, owner 20%, upper recipient 50%", async function () {
    const system = await deployGraph();
    for (const signer of [a, b, c, d]) await fundAndApprove(system, signer, 50n * UNIT);

    await register(system, a, id1.address);
    await register(system, b, a.address);
    await register(system, c, a.address);
    await register(system, d, a.address);

    const extra = (await ethers.getSigners())[6];
    await fundAndApprove(system, extra, 50n * UNIT);
    const bBefore = await system.usdt.balanceOf(b.address);
    const aBefore = await system.usdt.balanceOf(a.address);
    const id1Before = await founderBalance(system);
    await register(system, extra, a.address);

    expect((await system.usdt.balanceOf(b.address)) - bBefore).to.equal(10n * UNIT);
    expect((await system.usdt.balanceOf(a.address)) - aBefore).to.equal(10n * UNIT);
    expect((await founderBalance(system)) - id1Before).to.equal(25n * UNIT);
    const source = await system.orbits[0].positionAt(a.address, 1, 0, 4);
    expect(source.participant).to.equal(extra.address);
    expect(source.structuralParent).to.equal(b.address);
  });

  it("keeps P12 40% and 50% roles distinct on a first-ring activation", async function () {
    const system = await deployGraph();
    for (const signer of [a, b]) await fundAndApprove(system, signer, 650n * UNIT);

    await register(system, a, id1.address);
    await system.registration.connect(a).activateLevel(2);
    await system.registration.connect(a).activateLevel(3);
    await register(system, b, a.address);
    await system.registration.connect(b).activateLevel(2);

    const aBefore = await system.usdt.balanceOf(a.address);
    const id1Before = await founderBalance(system);
    await system.registration.connect(b).activateLevel(3);

    expect((await system.usdt.balanceOf(a.address)) - aBefore).to.equal(180n * UNIT);
    expect((await founderBalance(system)) - id1Before).to.equal(225n * UNIT);
    expect(await system.usdt.balanceOf(await system.router.getAddress())).to.equal(0);
  });

  it("settles every level engine at its exact first-ring percentages", async function () {
    const system = await deployGraph();
    const fullCost = 54_650n * UNIT;
    await fundAndApprove(system, a, fullCost);
    await fundAndApprove(system, b, fullCost);

    await register(system, a, id1.address);
    await activateThrough(system, a, 7);
    await register(system, b, a.address);

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
        id1: await founderBalance(system),
        nft: await system.usdt.balanceOf(await system.nftVault.getAddress()),
        operations: await system.usdt.balanceOf(await system.operationsVault.getAddress()),
      };
      await system.registration.connect(b).activateLevel(level);
      expect((await system.usdt.balanceOf(a.address)) - before.a).to.equal(toA);
      expect((await founderBalance(system)) - before.id1).to.equal(toId1);
      expect((await system.usdt.balanceOf(await system.nftVault.getAddress())) - before.nft).to.equal(toNft);
      expect((await system.usdt.balanceOf(await system.operationsVault.getAddress())) - before.operations).to.equal(toOperations);
      expect(await system.usdt.balanceOf(await system.router.getAddress())).to.equal(0);
    }

    expect(await system.fpt.balanceOf(b.address)).to.equal(fullCost);
  });

  it("skips an inactive exact-level recipient and pays it normally after later activation", async function () {
    const system = await deployGraph();
    for (const signer of [a, b, c, d]) await fundAndApprove(system, signer, 1_300n * UNIT);

    await register(system, a, id1.address);
    await activateThrough(system, a, 3);
    await register(system, b, a.address);
    await register(system, c, b.address);
    await system.registration.connect(c).activateLevel(2);

    const aBeforeSkipped = await system.usdt.balanceOf(a.address);
    const bBeforeSkipped = await system.usdt.balanceOf(b.address);
    await system.registration.connect(c).activateLevel(3);
    expect((await system.usdt.balanceOf(a.address)) - aBeforeSkipped).to.equal(180n * UNIT);
    expect((await system.usdt.balanceOf(b.address)) - bBeforeSkipped).to.equal(0);
    expect((await system.orbits[2].cycleState(b.address, 3, 0)).filledPositions).to.equal(0);
    expect((await system.orbits[2].positionAt(b.address, 3, 0, 1)).participant)
      .to.equal(ethers.ZeroAddress);

    await system.registration.connect(b).activateLevel(2);
    await system.registration.connect(b).activateLevel(3);
    expect((await system.orbits[2].cycleState(b.address, 3, 0)).filledPositions).to.equal(0);
    await register(system, d, b.address);
    await system.registration.connect(d).activateLevel(2);

    const bBeforeRecovery = await system.usdt.balanceOf(b.address);
    await system.registration.connect(d).activateLevel(3);
    expect((await system.usdt.balanceOf(b.address)) - bBeforeRecovery).to.equal(180n * UNIT);
  });

  it("returns a skipped participant to its permanent sponsor only when the participant recycles", async function () {
    const system = await deployGraph();
    const level = 5;
    const orbitType = 4;
    const fullCost = 6_050n * UNIT;
    for (const signer of [a, b, c]) await fundAndApprove(system, signer, fullCost);

    await register(system, a, id1.address);
    await activateThrough(system, a, level);
    await register(system, b, a.address);
    await activateThrough(system, b, level - 1);
    await register(system, c, b.address);
    await activateThrough(system, c, level);

    expect((await system.orbits[orbitType].cycleState(a.address, level, 0)).filledPositions)
      .to.equal(1);
    expect((await system.orbits[orbitType].cycleState(b.address, level, 0)).filledPositions)
      .to.equal(0);
    expect(await system.registration.sponsorOf(c.address)).to.equal(b.address);

    await system.registration.connect(b).activateLevel(level);
    expect((await system.orbits[orbitType].cycleState(b.address, level, 0)).filledPositions)
      .to.equal(0);

    for (let index = 0; index < 4; index++) {
      const filler = ethers.Wallet.createRandom().connect(ethers.provider);
      await owner.sendTransaction({ to: filler.address, value: ethers.parseEther("0.2") });
      await fundAndApprove(system, filler, fullCost);
      await register(system, filler, c.address);
      await activateThrough(system, filler, level);
    }

    expect((await system.orbits[orbitType].cycleState(c.address, level, 0)).closed).to.equal(true);
    expect((await system.orbits[orbitType].cycleState(b.address, level, 0)).filledPositions)
      .to.equal(1);
    expect((await system.orbits[orbitType].positionAt(b.address, level, 0, 1)).participant)
      .to.equal(c.address);
    expect(await system.orbits[orbitType].currentStructuralParentOf(c.address, level))
      .to.equal(b.address);
  });

  it("never prefills an inactive sponsor orbit at any Freedom-Plus level", async function () {
    const system = await deployGraph();
    const fullCost = 54_650n * UNIT;
    for (const signer of [a, b, c]) await fundAndApprove(system, signer, fullCost);

    await register(system, a, id1.address);
    await activateThrough(system, a, 7);

    await system.gateway.setParticipant(b.address, a.address, true, true);
    await register(system, c, b.address);
    await activateThrough(system, c, 7);

    const orbitByLevel = [0, 0, 1, 2, 3, 4, 4, 5];
    for (let level = 1; level <= 7; level++) {
      expect(
        (await system.orbits[orbitByLevel[level]].cycleState(b.address, level, 0))
          .filledPositions
      ).to.equal(0);
    }

    await system.registration.connect(b).register(a.address);
    await activateThrough(system, b, 7);
    for (let level = 1; level <= 7; level++) {
      expect(
        (await system.orbits[orbitByLevel[level]].cycleState(b.address, level, 0))
          .filledPositions
      ).to.equal(0);
    }
  });

  it("initializes ID1 and three representatives without financial side effects", async function () {
    const system = await deployGraph();
    const representatives = [a, b, c];
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
    expect(await system.registration.registeredCount()).to.equal(4);
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
    expect(fourth.participant).to.equal(ethers.ZeroAddress);
    expect(await p3.currentCycleOf(id1.address, 7)).to.equal(1);

    await expect(
      system.registration.initializeGenesis(
        representatives.map((representative) => representative.address)
      )
    ).to.be.revertedWithCustomError(system.registration, "GenesisAlreadyInitialized");
  });

  it("keeps normal descendants routable after the three genesis representatives", async function () {
    const system = await deployGraph();
    const [, , , , , , , participant, child, child2, child3, child4] = await ethers.getSigners();
    await system.registration.initializeGenesis([a.address, b.address, c.address]);
    await fundAndApprove(system, participant, 50n * UNIT);
    for (const descendant of [child, child2, child3, child4]) {
      await fundAndApprove(system, descendant, 50n * UNIT);
    }

    await register(system, participant, id1.address);

    const participantInId1 = await system.orbits[0].positionAt(id1.address, 1, 0, 4);
    expect(participantInId1.participant).to.equal(participant.address);
    expect(participantInId1.structuralParent).to.equal(a.address);
    expect(participantInId1.kind).to.equal(1);

    const participantInParent = await system.orbits[0].positionAt(a.address, 1, 0, 1);
    expect(participantInParent.participant).to.equal(participant.address);
    expect(participantInParent.structuralParent).to.equal(a.address);
    expect(participantInParent.kind).to.equal(2);
    expect(await system.orbits[0].currentStructuralParentOf(participant.address, 1))
      .to.equal(a.address);

    await expect(register(system, child, participant.address))
      .to.not.be.reverted;
    await register(system, child2, participant.address);
    await register(system, child3, participant.address);
    await expect(register(system, child4, participant.address))
      .to.not.be.reverted;

    const childSource = await system.orbits[0].positionAt(participant.address, 1, 0, 1);
    expect(childSource.participant).to.equal(child.address);
    expect(childSource.structuralParent).to.equal(participant.address);
    expect(childSource.kind).to.equal(1);

    const childInParent = await system.orbits[0].positionAt(a.address, 1, 0, 4);
    expect(childInParent.participant).to.equal(child.address);
    expect(childInParent.structuralParent).to.equal(participant.address);
    expect(childInParent.kind).to.equal(2);
    expect(await system.orbits[0].currentStructuralParentOf(child.address, 1))
      .to.equal(participant.address);

    const secondRingPositions = [4, 7, 10];
    for (let index = 0; index < secondRingPositions.length; index++) {
      const routed = await system.orbits[0].positionAt(
        a.address,
        1,
        0,
        secondRingPositions[index]
      );
      expect(routed.participant).to.equal([child, child2, child3][index].address);
      expect(routed.structuralParent).to.equal(participant.address);
      expect(routed.kind).to.equal(2);
    }

    const fourthInParent = await system.orbits[0].positionAt(a.address, 1, 0, 13);
    expect(fourthInParent.participant).to.equal(child4.address);
    expect(fourthInParent.structuralParent).to.equal(child.address);
    expect(fourthInParent.kind).to.equal(2);
    expect(await system.orbits[0].currentStructuralParentOf(child4.address, 1))
      .to.equal(child.address);
  });

  it("conserves funds through all seven first paid levels after three-representative genesis", async function () {
    const system = await deployGraph();
    await system.registration.initializeGenesis([a.address, b.address, c.address]);
    const total = 54_650n * UNIT;
    await fundAndApprove(system, d, total);
    const prices = [50n, 150n, 450n, 1_350n, 4_050n, 12_150n, 36_450n];
    let paid = 0n;
    const holders = [
      id1.address, ...system.founders, a.address, b.address, c.address, d.address,
      await system.manager.getAddress(), await system.router.getAddress(),
      await system.nftVault.getAddress(), await system.operationsVault.getAddress(),
    ];
    for (let level = 1; level <= 7; level++) {
      if (level === 1) await register(system, d, id1.address);
      else await system.registration.connect(d).activateLevel(level);
      paid += prices[level - 1] * UNIT;
      expect(await system.registration.isLevelActive(d.address, level)).to.equal(true);
      expect(await system.usdt.balanceOf(d.address)).to.equal(total - paid);
      expect(await system.fpt.balanceOf(d.address)).to.equal(paid);
      expect(await system.usdt.balanceOf(await system.manager.getAddress())).to.equal(0);
      const balances = await Promise.all(holders.map((address) => system.usdt.balanceOf(address)));
      expect(balances.reduce((sum, balance) => sum + balance, 0n)).to.equal(total);
    }
    expect(await system.registration.registeredCount()).to.equal(5);
    expect(await system.registration.isRegistered(outsider.address)).to.equal(false);
    expect(await system.fpt.totalSupply()).to.equal(5n * total);
    expect(await system.fpt.balanceOf(id1.address)).to.equal(total);
    // Gate 1 token rules: funded recycle mints FPTr equal to half the level price.
    expect(await system.fptr.balanceOf(id1.address)).to.equal((2_025n + 6_075n) * UNIT);
    for (const level of [5, 6]) {
      expect(await system.router.recycleReserveConsumed(id1.address, level, 0)).to.equal(true);
      expect(await system.router.recycleReserve(id1.address, level, 0)).to.equal(0);
    }
  });

  it("rejects fee-on-transfer USDT and rolls registration back atomically", async function () {
    const system = await deployGraph("MockFeeOnTransferUSDT");
    await fundAndApprove(system, a, 50n * UNIT);
    await expect(
      register(system, a, id1.address)
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
    await register(system, top, id1.address);
    await activateThrough(system, top, 3);
    let sponsor = top;
    for (const signer of chain) {
      await register(system, signer, sponsor.address);
      sponsor = signer;
    }
    const payer = ethers.Wallet.createRandom().connect(ethers.provider);
    await owner.sendTransaction({ to: payer.address, value: ethers.parseEther("0.2") });
    await fundAndApprove(system, payer, 650n * UNIT);
    await register(system, payer, sponsor.address);
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

  const routedCases = [
    [1, 0, 50n, [0,0,0,1,2,3,1,2,3,1,2,3,4,5,6,7,8,9,10,11,12,4,5,6,7,8,9,10,11,12,4,5,6,7,8,9,10,11,12]],
    [2, 1, 150n, [0,0,1,2,1,2,3,4,5,6,3,4,5,6]],
    [3, 2, 450n, [0,0,0,1,2,3,1,2,3,1,2,3]],
    [4, 3, 1350n, [0,0,1,2,1,2]],
  ];
  it('repairs only the audited staging reserve with real funding and rejects a second repair', async function () {
    const system = await deployGraph();
    const account = await ethers.getImpersonatedSigner('0x8844a10391801d5b1a4273588F8c6bF1DFE06E36');
    await ethers.provider.send('hardhat_setBalance', [account.address, ethers.toBeHex(ethers.parseEther('10'))]);
    await fundAndApprove(system, account, 50n * UNIT);
    await register(system, account, id1.address);
    const parents = routedCases[0][3];
    const participants = [];
    for (let index = 0; index < 38; index++) {
      const wallet = ethers.Wallet.createRandom().connect(ethers.provider);
      participants.push(wallet);
      await owner.sendTransaction({ to: wallet.address, value: ethers.parseEther('0.2') });
      await fundAndApprove(system, wallet, 50n * UNIT);
      await register(system, wallet, parents[index] === 0 ? account.address : participants[parents[index] - 1].address);
    }
    const proxy = await system.router.getAddress();
    expect(await system.router.recycleReserve(account.address, 1, 0)).to.equal(25n * UNIT);
    // Reproduce the pre-fix state: the first contribution was paid out rather than reserved.
    const build = await require('hardhat').artifacts.getBuildInfo('contracts/freedom-plus/FreedomPlusSettlementRouter.sol:FreedomPlusSettlementRouter');
    const layout = build.output.contracts['contracts/freedom-plus/FreedomPlusSettlementRouter.sol'].FreedomPlusSettlementRouter.storageLayout;
    const slot = layout.storage.find((entry) => entry.label === 'recycleReserve').slot;
    const coder = ethers.AbiCoder.defaultAbiCoder();
    let key = ethers.keccak256(coder.encode(['address', 'uint256'], [account.address, slot]));
    key = ethers.keccak256(coder.encode(['uint256', 'bytes32'], [1, key]));
    key = ethers.keccak256(coder.encode(['uint256', 'bytes32'], [0, key]));
    await ethers.provider.send('hardhat_setStorageAt', [proxy, key, ethers.ZeroHash]);
    const proxySigner = await ethers.getImpersonatedSigner(proxy);
    await ethers.provider.send('hardhat_setBalance', [proxy, ethers.toBeHex(ethers.parseEther('1'))]);
    await system.usdt.connect(proxySigner).transfer(account.address, 25n * UNIT);
    const Repair = await ethers.getContractFactory('FreedomPlusStagingReserveRepair');
    const repaired = await upgrades.upgradeProxy(proxy, Repair, { kind: 'uups' });
    await expect(repaired.connect(outsider).repairStagingP39Reserve()).to.be.revertedWithCustomError(repaired, 'OwnableUnauthorizedAccount');
    await expect(repaired.repairStagingP39Reserve()).to.be.reverted;
    await system.usdt.connect(account).approve(proxy, 25n * UNIT);
    const before = await system.usdt.balanceOf(account.address);
    await repaired.repairStagingP39Reserve();
    expect(before - await system.usdt.balanceOf(account.address)).to.equal(25n * UNIT);
    expect(await repaired.recycleReserve(account.address, 1, 0)).to.equal(25n * UNIT);
    await expect(repaired.repairStagingP39Reserve()).to.be.revertedWithCustomError(repaired, 'StagingRepairPrecondition');
    const last = ethers.Wallet.createRandom().connect(ethers.provider);
    await owner.sendTransaction({ to: last.address, value: ethers.parseEther('0.2') });
    await fundAndApprove(system, last, 50n * UNIT);
    await register(system, last, participants[parents[38] - 1].address);
    expect(await repaired.recycleReserveConsumed(account.address, 1, 0)).to.equal(true);
    expect(await repaired.recycleReserve(account.address, 1, 0)).to.equal(0);
    expect(await system.fptr.balanceOf(account.address)).to.equal(25n * UNIT);
  });
  for (const [level, orbitType, price, parents, mode] of routedCases.flatMap((row) => [[...row, 'routed'], [...row, 'mixed']])) {
    it(`reserves the final two ${mode} arrivals and recycles Level ${level} exactly once`, async function () {
      const system = await deployGraph();
      await fundAndApprove(system, a, cumulativeCosts[level] * UNIT);
      await register(system, a, id1.address);
      await activateThrough(system, a, level);
      const participants = [];
      for (let index = 0; index < parents.length; index++) {
        const wallet = ethers.Wallet.createRandom().connect(ethers.provider);
        participants.push(wallet);
        await owner.sendTransaction({ to: wallet.address, value: ethers.parseEther('0.2') });
        await fundAndApprove(system, wallet, cumulativeCosts[level] * UNIT);
        const sponsor = parents[index] === 0 || (mode === 'mixed' && index === parents.length - 1)
          ? a.address : participants[parents[index] - 1].address;
        await register(system, wallet, sponsor);
        await activateThrough(system, wallet, level);
        if (index === parents.length - 2) {
          expect(await system.orbits[orbitType].ringFilledCount(a.address, level, 0, level <= 2 ? 3 : 2))
            .to.equal(level === 1 ? 26 : level === 2 ? 7 : level === 3 ? 8 : 3);
          expect(await system.router.recycleReserve(a.address, level, 0)).to.equal(price * UNIT / 2n);
          expect(await system.router.recycleReserveConsumed(a.address, level, 0)).to.equal(false);
        }
      }
      expect((await system.orbits[orbitType].cycleState(a.address, level, 0)).closed).to.equal(true);
      expect(await system.router.recycleReserve(a.address, level, 0)).to.equal(0);
      expect(await system.router.recycleReserveConsumed(a.address, level, 0)).to.equal(true);
      expect(await system.fptr.balanceOf(a.address)).to.equal(price * UNIT / 2n);
      const reservedBefore = await system.usdt.balanceOf(await system.router.getAddress());
      expect(reservedBefore).to.equal(0);
    });
  }

  for (const [label, level, capacity, orbitType, price, hasTwoFillReserve] of recycleCases) {
    it(`completes ${label} reserve, recycle re-entry, and FPTr exactly once`, async function () {
      const system = await deployGraph();
      await fundAndApprove(system, a, cumulativeCosts[level] * UNIT);
      await register(system, a, id1.address);
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
          await register(system, wallet, a.address);
          await activateThrough(system, wallet, level - 1);
        }
      }

      const fptrBefore = await system.fptr.balanceOf(a.address);
      let finalReceipt;
      for (let index = 0; index < participants.length; index++) {
        const wallet = participants[index];
        const tx = level === 1
          ? await register(system, wallet, a.address)
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
        (event) => ["ComponentSettled", "FounderComponentSettled"].includes(event.name)
          && event.args.activationId === recycle.args.recycleActivationId
      );
      expect(recycleComponents.some(
        (event) => event.args.recipient.toLowerCase() === a.address.toLowerCase()
      )).to.equal(false);
    });
  }
});

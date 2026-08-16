const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("Freedom-Plus orbit engines", function () {
  this.timeout(180_000);

  const UNIT = 10n ** 6n;
  const GENESIS = 0;
  const ACTIVATION = 1;
  const ROUTED_PAYMENT = 2;
  const RECYCLE = 3;

  let owner;
  let orbitOwner;
  let participants;
  let guardian;
  let manager;

  beforeEach(async function () {
    [owner, orbitOwner, ...participants] = await ethers.getSigners();

    const Guardian = await ethers.getContractFactory("MockMigrationGuardian");
    guardian = await Guardian.deploy();

    const Manager = await ethers.getContractFactory("FreedomPlusOrbitManagerHarness");
    manager = await Manager.deploy();
  });

  async function deployOrbit(contractName) {
    const Orbit = await ethers.getContractFactory(contractName);
    return upgrades.deployProxy(
      Orbit,
      [await manager.getAddress(), owner.address, await guardian.getAddress()],
      { kind: "uups" }
    );
  }

  function id(label) {
    return ethers.keccak256(ethers.toUtf8Bytes(label));
  }

  async function record({
    orbit,
    participant,
    level,
    activationLabel,
    placementLabel,
    amount = 1n * UNIT,
    kind = ACTIVATION,
    financial = true,
    targetOrbitOwner = orbitOwner.address,
  }) {
    return manager.record(
      await orbit.getAddress(),
      targetOrbitOwner,
      participant,
      level,
      id(activationLabel),
      id(placementLabel),
      amount,
      kind,
      financial
    );
  }

  const engineCases = [
    {
      contractName: "P39PlusOrbit",
      level: 1,
      type: 0,
      capacity: 39,
      parents: [
        ...Array(3).fill(0),
        1, 2, 3, 1, 2, 3, 1, 2, 3,
        4, 5, 6, 7, 8, 9, 10, 11, 12,
        4, 5, 6, 7, 8, 9, 10, 11, 12,
        4, 5, 6, 7, 8, 9, 10, 11, 12,
      ],
    },
    {
      contractName: "P14PlusOrbit",
      level: 2,
      type: 1,
      capacity: 14,
      parents: [0, 0, 1, 2, 1, 2, 3, 4, 5, 6, 3, 4, 5, 6],
    },
    {
      contractName: "P12PlusOrbit",
      level: 3,
      type: 2,
      capacity: 12,
      parents: [0, 0, 0, 1, 2, 3, 1, 2, 3, 1, 2, 3],
    },
    {
      contractName: "P6PlusOrbit",
      level: 4,
      type: 3,
      capacity: 6,
      parents: [0, 0, 1, 2, 1, 2],
    },
    {
      contractName: "P4PlusOrbit",
      level: 5,
      type: 4,
      capacity: 4,
      parents: [0, 0, 0, 0],
    },
    {
      contractName: "P4PlusOrbit",
      level: 6,
      type: 4,
      capacity: 4,
      parents: [0, 0, 0, 0],
    },
    {
      contractName: "P3PlusOrbit",
      level: 7,
      type: 5,
      capacity: 3,
      parents: [0, 0, 0],
    },
  ];

  for (const engine of engineCases) {
    it(`fills ${engine.contractName} level ${engine.level} deterministically and preserves history`, async function () {
      const orbit = await deployOrbit(engine.contractName);
      expect(await orbit.orbitType()).to.equal(engine.type);
      expect(await orbit.supportsLevel(engine.level)).to.equal(true);

      const occupantByPosition = {};
      for (let position = 1; position <= engine.capacity; position++) {
        const participant = participants[(position - 1) % participants.length].address;
        occupantByPosition[position] = participant;

        await record({
          orbit,
          participant,
          level: engine.level,
          activationLabel: `${engine.contractName}-${engine.level}-activation-${position}`,
          placementLabel: `${engine.contractName}-${engine.level}-placement-${position}`,
        });

        const stored = await orbit.positionAt(orbitOwner.address, engine.level, 0, position);
        const parentSlot = engine.parents[position - 1];
        const expectedParent = parentSlot === 0
          ? orbitOwner.address
          : occupantByPosition[parentSlot];

        expect(stored.participant).to.equal(participant);
        expect(stored.structuralParent).to.equal(expectedParent);
        expect(stored.financial).to.equal(true);
        expect(stored.kind).to.equal(ACTIVATION);
      }

      const completed = await orbit.cycleState(orbitOwner.address, engine.level, 0);
      expect(completed.filledPositions).to.equal(engine.capacity);
      expect(completed.capacity).to.equal(engine.capacity);
      expect(completed.closed).to.equal(true);
      expect(await orbit.currentCycleOf(orbitOwner.address, engine.level)).to.equal(1);

      const historicalFirst = await orbit.positionAt(orbitOwner.address, engine.level, 0, 1);
      await record({
        orbit,
        participant: participants[participants.length - 1].address,
        level: engine.level,
        activationLabel: `${engine.contractName}-${engine.level}-next-cycle-activation`,
        placementLabel: `${engine.contractName}-${engine.level}-next-cycle-placement`,
        kind: RECYCLE,
      });

      const nextCycle = await orbit.cycleState(orbitOwner.address, engine.level, 1);
      expect(nextCycle.filledPositions).to.equal(1);
      expect(nextCycle.closed).to.equal(false);
      expect(
        (await orbit.positionAt(orbitOwner.address, engine.level, 0, 1)).placementId
      ).to.equal(historicalFirst.placementId);
    });
  }

  it("allows several component placements for one activation but rejects a duplicate placement", async function () {
    const orbit = await deployOrbit("P12PlusOrbit");
    const activationLabel = "shared-activation";

    await record({
      orbit,
      participant: participants[0].address,
      level: 3,
      activationLabel,
      placementLabel: "component-1",
    });
    await record({
      orbit,
      participant: participants[1].address,
      level: 3,
      activationLabel,
      placementLabel: "component-2",
      kind: ROUTED_PAYMENT,
    });

    await expect(
      record({
        orbit,
        participant: participants[2].address,
        level: 3,
        activationLabel: "different-activation",
        placementLabel: "component-2",
      })
    ).to.be.revertedWithCustomError(orbit, "DuplicatePlacement");
  });

  it("never lets a routed-payment record overwrite a real structural parent", async function () {
    const orbit = await deployOrbit("P12PlusOrbit");
    const participant = participants[0].address;

    await record({
      orbit,
      participant,
      level: 3,
      activationLabel: "real-activation",
      placementLabel: "real-placement",
    });
    expect(await orbit.currentStructuralParentOf(participant, 3)).to.equal(orbitOwner.address);

    await record({
      orbit,
      participant,
      level: 3,
      activationLabel: "later-routed-activation",
      placementLabel: "later-routed-placement",
      kind: ROUTED_PAYMENT,
      targetOrbitOwner: participants[1].address,
    });
    expect(await orbit.currentStructuralParentOf(participant, 3)).to.equal(orbitOwner.address);

    const routed = await orbit.positionAt(participants[1].address, 3, 0, 1);
    expect(routed.participant).to.equal(participant);
    expect(routed.kind).to.equal(ROUTED_PAYMENT);
  });

  it("accepts non-financial genesis placement but rejects mixed genesis accounting", async function () {
    const orbit = await deployOrbit("P3PlusOrbit");

    await record({
      orbit,
      participant: participants[0].address,
      level: 7,
      activationLabel: "genesis-activation",
      placementLabel: "genesis-placement",
      amount: 0n,
      kind: GENESIS,
      financial: false,
    });

    const stored = await orbit.positionAt(orbitOwner.address, 7, 0, 1);
    expect(stored.amount).to.equal(0);
    expect(stored.financial).to.equal(false);
    expect(stored.kind).to.equal(GENESIS);

    await expect(
      record({
        orbit,
        participant: participants[1].address,
        level: 7,
        activationLabel: "bad-genesis-activation",
        placementLabel: "bad-genesis-placement",
        amount: 1n,
        kind: GENESIS,
        financial: false,
      })
    ).to.be.revertedWithCustomError(orbit, "InvalidGenesisFinancialState");
  });

  it("restricts writes to the manager and enforces engine-level ownership", async function () {
    const orbit = await deployOrbit("P14PlusOrbit");

    await expect(
      orbit.recordPosition(
        orbitOwner.address,
        participants[0].address,
        2,
        id("direct-activation"),
        id("direct-placement"),
        1n * UNIT,
        ACTIVATION,
        true
      )
    ).to.be.revertedWithCustomError(orbit, "OnlyManager");

    await expect(
      record({
        orbit,
        participant: participants[0].address,
        level: 1,
        activationLabel: "wrong-level-activation",
        placementLabel: "wrong-level-placement",
      })
    ).to.be.revertedWithCustomError(orbit, "UnsupportedLevel");
  });
});

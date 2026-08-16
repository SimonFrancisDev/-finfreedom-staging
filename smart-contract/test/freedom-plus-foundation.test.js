const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("Freedom-Plus foundation", function () {
  this.timeout(120_000);

  const UNIT = 10n ** 6n;

  let owner;
  let operator;
  let participant;
  let outsider;
  let config;
  let guardian;

  beforeEach(async function () {
    [owner, operator, participant, outsider] = await ethers.getSigners();

    const Config = await ethers.getContractFactory("FreedomPlusConfigHarness");
    config = await Config.deploy();

    const Guardian = await ethers.getContractFactory("MockMigrationGuardian");
    guardian = await Guardian.deploy();
  });

  it("defines all seven levels, prices, orbit engines, and token rewards", async function () {
    const expected = [
      [0n, 50n],
      [1n, 150n],
      [2n, 450n],
      [3n, 1_350n],
      [4n, 4_050n],
      [4n, 12_150n],
      [5n, 36_450n],
    ];

    let totalFpt = 0n;
    for (let level = 1; level <= expected.length; level++) {
      const [orbitType, price, fptReward, fptrReward] = await config.levelConfig(level);
      const expectedPrice = expected[level - 1][1] * UNIT;
      expect(orbitType).to.equal(expected[level - 1][0]);
      expect(price).to.equal(expectedPrice);
      expect(fptReward).to.equal(expectedPrice);
      expect(fptrReward).to.equal(expectedPrice / 2n);
      totalFpt += fptReward;
    }

    expect(totalFpt).to.equal(54_650n * UNIT);
    await expect(config.levelConfig(0)).to.be.reverted;
    await expect(config.levelConfig(8)).to.be.reverted;
  });

  it("defines exact position counts and ring boundaries", async function () {
    const engines = [
      [0, 39, 3, [3, 12, 39]],
      [1, 14, 3, [2, 6, 14]],
      [2, 12, 2, [3, 12]],
      [3, 6, 2, [2, 6]],
      [4, 4, 1, [4]],
      [5, 3, 1, [3]],
    ];

    for (const [engine, positions, rings, boundaries] of engines) {
      expect(await config.positionCount(engine)).to.equal(positions);
      expect(await config.ringCount(engine)).to.equal(rings);

      let start = 1;
      for (let ring = 1; ring <= boundaries.length; ring++) {
        for (let position = start; position <= boundaries[ring - 1]; position++) {
          expect(await config.ringForPosition(engine, position)).to.equal(ring);
        }
        start = boundaries[ring - 1] + 1;
      }
    }
  });

  it("defines deterministic structural parents for every multi-ring engine", async function () {
    const expectedParents = {
      0: [
        ...Array(3).fill(0),
        1, 2, 3, 1, 2, 3, 1, 2, 3,
        4, 5, 6, 7, 8, 9, 10, 11, 12,
        4, 5, 6, 7, 8, 9, 10, 11, 12,
        4, 5, 6, 7, 8, 9, 10, 11, 12,
      ],
      1: [0, 0, 1, 2, 1, 2, 3, 4, 5, 6, 3, 4, 5, 6],
      2: [0, 0, 0, 1, 2, 3, 1, 2, 3, 1, 2, 3],
      3: [0, 0, 1, 2, 1, 2],
    };

    for (const [engine, parents] of Object.entries(expectedParents)) {
      for (let position = 1; position <= parents.length; position++) {
        expect(await config.parentPosition(engine, position)).to.equal(parents[position - 1]);
      }
    }

    for (const engine of [4, 5]) {
      const count = Number(await config.positionCount(engine));
      for (let position = 1; position <= count; position++) {
        expect(await config.parentPosition(engine, position)).to.equal(0);
      }
    }
  });

  it("keeps each engine payout role separate and applies the 10 percent charge", async function () {
    const payoutRows = [
      [0, [2_000, 2_000, 5_000]],
      [1, [1_500, 2_500, 5_000]],
      [2, [4_000, 5_000]],
      [3, [4_000, 5_000]],
      [4, [9_000]],
      [5, [9_000]],
    ];

    expect(await config.systemChargeBps()).to.equal(1_000);
    for (const [engine, payouts] of payoutRows) {
      for (let ring = 1; ring <= payouts.length; ring++) {
        expect(await config.payoutBps(engine, ring)).to.equal(payouts[ring - 1]);
      }
    }
  });

  it("defines the final two qualifying arrivals and single recycle-only positions", async function () {
    const firstReservedArrival = [26, 7, 8, 3, 4, 3];
    for (let engine = 0; engine < firstReservedArrival.length; engine++) {
      expect(await config.firstRecycleQualifyingArrival(engine)).to.equal(
        firstReservedArrival[engine]
      );
    }

    expect(await config.isRecycleOnlyPosition(4, 4)).to.equal(true);
    expect(await config.isRecycleOnlyPosition(5, 3)).to.equal(true);
    expect(await config.isRecycleOnlyPosition(4, 3)).to.equal(false);
    expect(await config.isRecycleOnlyPosition(5, 2)).to.equal(false);
  });

  for (const tokenSpec of [
    ["FPTToken", "Freedom-Plus Token", "FPT"],
    ["FPTrToken", "Freedom-Plus Token - Reactivation", "FPTr"],
  ]) {
    it(`enforces utility-token accounting and access rules for ${tokenSpec[2]}`, async function () {
      const Token = await ethers.getContractFactory(tokenSpec[0]);
      const token = await upgrades.deployProxy(
        Token,
        [owner.address, await guardian.getAddress()],
        { kind: "uups" }
      );

      expect(await token.name()).to.equal(tokenSpec[1]);
      expect(await token.symbol()).to.equal(tokenSpec[2]);
      expect(await token.decimals()).to.equal(6);

      await token.setAuthorizedOperator(operator.address, true);
      await expect(
        token.connect(outsider).mint(participant.address, 50n * UNIT, "unauthorized")
      ).to.be.revertedWith("Not authorized");

      await token.connect(operator).mint(participant.address, 50n * UNIT, "level activation");
      expect(await token.balanceOf(participant.address)).to.equal(50n * UNIT);
      expect(await token.availableBalanceOf(participant.address)).to.equal(50n * UNIT);

      await token.connect(operator).lockFrom(participant.address, 30n * UNIT, "nft commitment");
      expect(await token.lockedBalanceOf(participant.address)).to.equal(30n * UNIT);
      expect(await token.availableBalanceOf(participant.address)).to.equal(20n * UNIT);
      await expect(
        token.connect(operator).burnFrom(participant.address, 21n * UNIT, "utility")
      ).to.be.revertedWith("Insufficient available balance");

      await token.connect(operator).unlockFrom(participant.address, 10n * UNIT, "nft withdrawal");
      await token.connect(operator).burnFrom(participant.address, 25n * UNIT, "utility");
      expect(await token.balanceOf(participant.address)).to.equal(25n * UNIT);
      expect(await token.lockedBalanceOf(participant.address)).to.equal(20n * UNIT);
      expect(await token.availableBalanceOf(participant.address)).to.equal(5n * UNIT);

      await expect(token.connect(participant).transfer(outsider.address, 1)).to.be.revertedWith(
        "Non-transferable"
      );
      await expect(token.connect(participant).approve(outsider.address, 1)).to.be.revertedWith(
        "Non-transferable"
      );
    });
  }
});

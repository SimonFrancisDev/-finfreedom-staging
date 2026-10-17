const { expect } = require("chai");
const { ethers, upgrades, network } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Freedom NFT fixed-cycle rewards", function () {
  this.timeout(180_000);
  const UNIT = 10n ** 6n;
  const DAY = 24n * 60n * 60n;
  const CYCLE = 30n * DAY;
  let owner;
  let id1;
  let foundational;
  let intermediate;
  let advanced;
  let outsider;
  let guardian;
  let usdt;
  let vault;
  let distributor;
  let firstDistributionAt;

  function leaf(member, tier) {
    const inner = ethers.keccak256(
      ethers.AbiCoder.defaultAbiCoder().encode(["address", "uint8"], [member, tier])
    );
    return ethers.keccak256(inner);
  }

  async function reachCycle(cycleId) {
    const scheduled = firstDistributionAt + BigInt(cycleId - 1) * CYCLE;
    await network.provider.send("evm_setNextBlockTimestamp", [Number(scheduled)]);
    await network.provider.send("evm_mine");
  }

  async function deployFixture() {
    const signers = await ethers.getSigners();
    [owner, id1, foundational, intermediate, advanced, outsider] = signers;
    const Guardian = await ethers.getContractFactory("MockMigrationGuardian");
    guardian = await Guardian.deploy();
    const Usdt = await ethers.getContractFactory("MockUSDT");
    usdt = await Usdt.deploy();
    const Vault = await ethers.getContractFactory("FreedomNFTPoolVault");
    vault = await upgrades.deployProxy(
      Vault,
      [owner.address, await guardian.getAddress()],
      { kind: "uups" }
    );
    const Distributor = await ethers.getContractFactory("FreedomNFTRewardDistributor");
    distributor = await upgrades.deployProxy(
      Distributor,
      [await usdt.getAddress(), await vault.getAddress(), owner.address, await guardian.getAddress()],
      { kind: "uups" }
    );
    await vault.configureDistributor(await distributor.getAddress());
    await usdt.mint(await vault.getAddress(), 1_001n * UNIT);

    const latest = await ethers.provider.getBlock("latest");
    firstDistributionAt = ((BigInt(latest.timestamp) / DAY) + 3n) * DAY;
    await distributor.configureCycleSchedule(firstDistributionAt, id1.address, outsider.address);
    return {
      owner,
      id1,
      foundational,
      intermediate,
      advanced,
      outsider,
      guardian,
      usdt,
      vault,
      distributor,
      firstDistributionAt,
    };
  }

  beforeEach(async function () {
    ({
      owner,
      id1,
      foundational,
      intermediate,
      advanced,
      outsider,
      guardian,
      usdt,
      vault,
      distributor,
      firstDistributionAt,
    } = await loadFixture(deployFixture));
  });

  it("uses exact 30-day cycles with a 24-hour eligibility cutoff", async function () {
    const first = await distributor.cycleTimes(1);
    const second = await distributor.cycleTimes(2);
    expect(first.distributionAt).to.equal(firstDistributionAt);
    expect(first.eligibilityCutoff).to.equal(firstDistributionAt - DAY);
    expect(second.distributionAt).to.equal(firstDistributionAt + CYCLE);
    expect(second.eligibilityCutoff).to.equal(firstDistributionAt + CYCLE - DAY);

    await expect(
      distributor.createCycle(
        1,
        1_000n * UNIT,
        [leaf(foundational.address, 1), leaf(intermediate.address, 2), leaf(advanced.address, 3)],
        [1, 1, 1]
      )
    ).to.be.revertedWithCustomError(distributor, "DistributionNotReached");

    await expect(
      distributor.createPeriod(
        2026,
        11,
        1_000n * UNIT,
        [leaf(foundational.address, 1), leaf(intermediate.address, 2), leaf(advanced.address, 3)],
        [1, 1, 1]
      )
    ).to.be.revertedWithCustomError(distributor, "LegacyPeriodCreationDisabled");
  });

  it("reserves and distributes the fixed 50/30/20 tier shares", async function () {
    await reachCycle(1);
    await distributor.createCycle(
      1,
      1_000n * UNIT,
      [leaf(foundational.address, 1), leaf(intermediate.address, 2), leaf(advanced.address, 3)],
      [1, 1, 1]
    );

    const period = await distributor.periodOf(1);
    expect(period.cutoff).to.equal(firstDistributionAt - DAY);
    expect(period.distributionAt).to.equal(firstDistributionAt);
    expect(period.rewardPerMember).to.deep.equal([500n * UNIT, 300n * UNIT, 200n * UNIT]);
    expect(period.reservedAmount).to.equal(1_000n * UNIT);
    expect(await vault.unreservedBalance(await usdt.getAddress())).to.equal(1n * UNIT);

    await distributor.distributeBatch(
      1,
      [foundational.address, intermediate.address, advanced.address],
      [1, 2, 3],
      [[], [], []]
    );
    expect(await usdt.balanceOf(foundational.address)).to.equal(500n * UNIT);
    expect(await usdt.balanceOf(intermediate.address)).to.equal(300n * UNIT);
    expect(await usdt.balanceOf(advanced.address)).to.equal(200n * UNIT);
    expect(await vault.reservedBalance(await usdt.getAddress())).to.equal(0);

    await distributor.distributeBatch(
      1,
      [foundational.address, intermediate.address, advanced.address],
      [1, 2, 3],
      [[], [], []]
    );
    expect(await usdt.balanceOf(foundational.address)).to.equal(500n * UNIT);
  });

  it("excludes ID1 until governance explicitly enables it", async function () {
    expect(await distributor.rewardExcluded(id1.address)).to.equal(true);
    await reachCycle(1);
    await distributor.createCycle(
      1,
      100n * UNIT,
      [leaf(id1.address, 1), ethers.ZeroHash, ethers.ZeroHash],
      [1, 0, 0]
    );

    await expect(distributor.connect(id1).claim(1, 1, []))
      .to.be.revertedWithCustomError(distributor, "RewardRecipientExcluded")
      .withArgs(id1.address);
    expect(await distributor.claimed(1, id1.address)).to.equal(false);

    await distributor.setRewardExclusion(id1.address, false);
    await distributor.connect(id1).claim(1, 1, []);
    expect(await usdt.balanceOf(id1.address)).to.equal(50n * UNIT);
  });

  it("retains empty-tier allocations and rounding dust in the pool", async function () {
    await reachCycle(1);
    await distributor.createCycle(
      1,
      1_001n * UNIT,
      [leaf(foundational.address, 1), ethers.ZeroHash, leaf(advanced.address, 3)],
      [3, 0, 2]
    );
    const period = await distributor.periodOf(1);
    const foundationalReward = (1_001n * UNIT * 5_000n / 10_000n) / 3n;
    const advancedReward = (1_001n * UNIT * 2_000n / 10_000n) / 2n;
    const reserved = foundationalReward * 3n + advancedReward * 2n;
    expect(period.rewardPerMember[1]).to.equal(0);
    expect(period.reservedAmount).to.equal(reserved);
    expect(await vault.unreservedBalance(await usdt.getAddress()))
      .to.equal(1_001n * UNIT - reserved);
  });

  it("publishes an all-empty cycle without reserving or moving pool funds", async function () {
    await reachCycle(1);
    await distributor.createCycle(
      1,
      1_001n * UNIT,
      [ethers.ZeroHash, ethers.ZeroHash, ethers.ZeroHash],
      [0, 0, 0]
    );

    const period = await distributor.periodOf(1);
    expect(period.created).to.equal(true);
    expect(period.reservedAmount).to.equal(0);
    expect(period.rewardPerMember).to.deep.equal([0, 0, 0]);
    expect(await vault.reservedBalance(await usdt.getAddress())).to.equal(0);
    expect(await vault.unreservedBalance(await usdt.getAddress())).to.equal(1_001n * UNIT);
  });

  it("enforces publisher, cycle, proof, batch and pause safeguards", async function () {
    await distributor.setRewardOperator(outsider.address);
    await reachCycle(1);
    await expect(
      distributor.connect(advanced).createCycle(
        1,
        100n * UNIT,
        [leaf(foundational.address, 1), ethers.ZeroHash, ethers.ZeroHash],
        [1, 0, 0]
      )
    ).to.be.revertedWithCustomError(distributor, "UnauthorizedRewardOperator");

    await distributor.connect(outsider).createCycle(
      1,
      100n * UNIT,
      [leaf(foundational.address, 1), ethers.ZeroHash, ethers.ZeroHash],
      [1, 0, 0]
    );
    await expect(
      distributor.connect(outsider).createCycle(
        1,
        100n * UNIT,
        [leaf(foundational.address, 1), ethers.ZeroHash, ethers.ZeroHash],
        [1, 0, 0]
      )
    ).to.be.revertedWithCustomError(distributor, "PeriodAlreadyExists");
    await expect(distributor.connect(outsider).distributeBatch(1, [advanced.address], [1], [[]]))
      .to.be.revertedWithCustomError(distributor, "InvalidProof");
    await expect(distributor.connect(outsider).distributeBatch(1, [], [], []))
      .to.be.revertedWithCustomError(distributor, "InvalidDistributionBatch");
    await expect(
      distributor.connect(outsider).distributeBatch(
        1,
        Array(51).fill(foundational.address),
        Array(51).fill(1),
        Array(51).fill([])
      )
    ).to.be.revertedWithCustomError(distributor, "InvalidDistributionBatch");

    await distributor.pause();
    await expect(distributor.connect(outsider).distributeBatch(1, [foundational.address], [1], [[]]))
      .to.be.revertedWithCustomError(distributor, "EnforcedPause");
  });
});

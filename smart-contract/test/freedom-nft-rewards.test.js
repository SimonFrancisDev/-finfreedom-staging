const { expect } = require("chai");
const { ethers, upgrades, network } = require("hardhat");

describe("Freedom NFT monthly rewards", function () {
  const UNIT = 10n ** 6n;
  let owner;
  let foundational;
  let intermediate;
  let advanced;
  let outsider;
  let guardian;
  let usdt;
  let vault;
  let distributor;

  function leaf(member, tier) {
    const inner = ethers.keccak256(
      ethers.AbiCoder.defaultAbiCoder().encode(["address", "uint8"], [member, tier])
    );
    return ethers.keccak256(inner);
  }

  beforeEach(async function () {
    [owner, foundational, intermediate, advanced, outsider] = await ethers.getSigners();
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
  });

  it("reserves 50/30/20 at the UTC monthly cutoff and pays permanent direct claims", async function () {
    const roots = [
      leaf(foundational.address, 1),
      leaf(intermediate.address, 2),
      leaf(advanced.address, 3),
    ];
    await distributor.createPeriod(2026, 1, 1_000n * UNIT, roots, [1, 1, 1]);
    const period = await distributor.periodOf(202601);
    expect(period.cutoff).to.equal(BigInt(Date.UTC(2026, 0, 1) / 1000));
    expect(period.rewardPerMember).to.deep.equal([500n * UNIT, 300n * UNIT, 200n * UNIT]);
    expect(period.reservedAmount).to.equal(1_000n * UNIT);
    expect(await vault.reservedBalance(await usdt.getAddress())).to.equal(1_000n * UNIT);
    expect(await vault.unreservedBalance(await usdt.getAddress())).to.equal(1n * UNIT);

    await expect(
      vault.withdraw(await usdt.getAddress(), outsider.address, 2n * UNIT, ethers.id("reserved"))
    ).to.be.revertedWithCustomError(vault, "InsufficientUnreservedBalance");

    await network.provider.send("evm_increaseTime", [370 * 24 * 60 * 60]);
    await network.provider.send("evm_mine");
    await distributor.connect(foundational).claim(202601, 1, []);
    await distributor.connect(intermediate).claim(202601, 2, []);
    await distributor.connect(advanced).claim(202601, 3, []);
    expect(await usdt.balanceOf(foundational.address)).to.equal(500n * UNIT);
    expect(await usdt.balanceOf(intermediate.address)).to.equal(300n * UNIT);
    expect(await usdt.balanceOf(advanced.address)).to.equal(200n * UNIT);
    expect(await vault.reservedBalance(await usdt.getAddress())).to.equal(0);
    await expect(
      distributor.connect(foundational).claim(202601, 1, [])
    ).to.be.revertedWithCustomError(distributor, "AlreadyClaimed");
  });

  it("leaves a zero-member tier allocation and rounding dust unreserved in the vault", async function () {
    await distributor.createPeriod(
      2026,
      2,
      1_001n * UNIT,
      [leaf(foundational.address, 1), ethers.ZeroHash, leaf(advanced.address, 3)],
      [3, 0, 2]
    );
    const period = await distributor.periodOf(202602);
    const expectedFoundational = (1_001n * UNIT * 5_000n / 10_000n) / 3n;
    const expectedAdvanced = (1_001n * UNIT * 2_000n / 10_000n) / 2n;
    const expectedReserved = expectedFoundational * 3n + expectedAdvanced * 2n;
    expect(period.rewardPerMember[0]).to.equal(expectedFoundational);
    expect(period.rewardPerMember[1]).to.equal(0);
    expect(period.rewardPerMember[2]).to.equal(expectedAdvanced);
    expect(period.reservedAmount).to.equal(expectedReserved);
    expect(await vault.unreservedBalance(await usdt.getAddress()))
      .to.equal(1_001n * UNIT - expectedReserved);
  });

  it("rejects future cutoffs, duplicate periods, and invalid proofs", async function () {
    const latest = await ethers.provider.getBlock("latest");
    const future = new Date((Number(latest.timestamp) + 370 * 24 * 60 * 60) * 1000);
    await expect(
      distributor.createPeriod(
        future.getUTCFullYear(),
        future.getUTCMonth() + 1,
        100n * UNIT,
        [leaf(foundational.address, 1), ethers.ZeroHash, ethers.ZeroHash],
        [1, 0, 0]
      )
    ).to.be.revertedWithCustomError(distributor, "CutoffNotReached");

    await distributor.createPeriod(
      2026, 3, 100n * UNIT,
      [leaf(foundational.address, 1), ethers.ZeroHash, ethers.ZeroHash],
      [1, 0, 0]
    );
    await expect(
      distributor.createPeriod(
        2026, 3, 100n * UNIT,
        [leaf(foundational.address, 1), ethers.ZeroHash, ethers.ZeroHash],
        [1, 0, 0]
      )
    ).to.be.revertedWithCustomError(distributor, "PeriodAlreadyExists");
    await expect(
      distributor.connect(outsider).claim(202603, 1, [])
    ).to.be.revertedWithCustomError(distributor, "InvalidProof");
  });
});

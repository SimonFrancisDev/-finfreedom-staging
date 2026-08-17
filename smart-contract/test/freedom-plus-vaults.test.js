const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("Freedom-Plus governed vaults", function () {
  let owner;
  let recipient;
  let outsider;
  let guardian;
  let usdt;

  beforeEach(async function () {
    [owner, recipient, outsider] = await ethers.getSigners();
    const Guardian = await ethers.getContractFactory("MockMigrationGuardian");
    guardian = await Guardian.deploy();
    const Usdt = await ethers.getContractFactory("MockUSDT");
    usdt = await Usdt.deploy();
  });

  it("restricts operations withdrawals to governance", async function () {
    const Vault = await ethers.getContractFactory("FreedomPlusOperationsVault");
    const vault = await upgrades.deployProxy(
      Vault,
      [owner.address, await guardian.getAddress()],
      { kind: "uups" }
    );
    await usdt.mint(await vault.getAddress(), 100n);

    await expect(
      vault.connect(outsider).withdraw(
        await usdt.getAddress(), recipient.address, 25n, ethers.id("unauthorized")
      )
    ).to.be.revertedWithCustomError(vault, "OwnableUnauthorizedAccount");

    await vault.withdraw(
      await usdt.getAddress(), recipient.address, 25n, ethers.id("approved-operations")
    );
    expect(await usdt.balanceOf(recipient.address)).to.equal(25n);
    expect(await usdt.balanceOf(await vault.getAddress())).to.equal(75n);
  });

  it("locks the NFT distributor once and permits only that contract to disburse", async function () {
    const Vault = await ethers.getContractFactory("FreedomNFTPoolVault");
    const vault = await upgrades.deployProxy(
      Vault,
      [owner.address, await guardian.getAddress()],
      { kind: "uups" }
    );
    const Distributor = await ethers.getContractFactory("MockFreedomPlusDistributor");
    const distributor = await Distributor.deploy();
    await vault.configureDistributor(await distributor.getAddress());
    await usdt.mint(await vault.getAddress(), 100n);

    await expect(
      vault.connect(outsider).disburse(
        await usdt.getAddress(), recipient.address, 30n, ethers.id("period-1")
      )
    ).to.be.revertedWithCustomError(vault, "OnlyDistributor");
    await expect(
      vault.configureDistributor(await distributor.getAddress())
    ).to.be.revertedWithCustomError(vault, "DistributorAlreadyConfigured");

    await distributor.reserve(
      await vault.getAddress(),
      await usdt.getAddress(),
      30n,
      ethers.id("period-1-reserve")
    );
    await distributor.disburse(
      await vault.getAddress(),
      await usdt.getAddress(),
      recipient.address,
      30n,
      ethers.id("period-1")
    );
    expect(await usdt.balanceOf(recipient.address)).to.equal(30n);
    expect(await usdt.balanceOf(await vault.getAddress())).to.equal(70n);
  });
});

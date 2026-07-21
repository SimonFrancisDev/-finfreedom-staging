const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

async function approveAndUpgrade(proxy, factory, guardian) {
  const implementation = await upgrades.prepareUpgrade(proxy, factory, {
    kind: "uups",
    unsafeAllow: ["delegatecall"],
  });
  await guardian.setApprovedImplementation(proxy.target, implementation, true);
  return upgrades.upgradeProxy(proxy, factory, {
    kind: "uups",
    unsafeAllow: ["delegatecall"],
  });
}

describe("Production orbit migration transition", function () {
  async function deployOrbit(name) {
    const [owner, user, parent] = await ethers.getSigners();
    const Guardian = await ethers.getContractFactory("Guardian");
    const guardian = await Guardian.deploy(owner.address);
    await guardian.waitForDeployment();

    const Dummy = await ethers.getContractFactory("contracts/mocks/MockUSDT.sol:MockUSDT");
    const dummy = await Dummy.deploy();
    await dummy.waitForDeployment();

    const LevelManagerReader = await ethers.getContractFactory("MockLevelManagerReader");
    const levelManagerReader = await LevelManagerReader.deploy(owner.address);
    await levelManagerReader.waitForDeployment();

    const Orbit = await ethers.getContractFactory(name);
    const orbit = await upgrades.deployProxy(
      Orbit,
      [levelManagerReader.target, dummy.target, dummy.target, guardian.target],
      { initializer: "initialize", kind: "uups", unsafeAllow: ["delegatecall"] }
    );
    await orbit.waitForDeployment();
    await guardian.setApprovedProxy(orbit.target, true);
    return { owner, user, parent, guardian, orbit, Orbit };
  }

  for (const [name, level] of [["P12Orbit", 2], ["P39Orbit", 3]]) {
    it(`seeds and preserves ${name} matrix parents through a temporary implementation`, async function () {
      const { user, parent, guardian, orbit, Orbit } = await deployOrbit(name);
      const before = {
        levelManager: await orbit.levelManager(),
        escrow: await orbit.escrow(),
        registration: await orbit.registration(),
        guardian: await orbit.guardian(),
      };

      const Seeder = await ethers.getContractFactory("OrbitMatrixParentSeeder");
      const seeder = await approveAndUpgrade(orbit, Seeder, guardian);
      await seeder.seedMatrixParents([user.address], [level], [parent.address]);
      expect(await seeder.matrixParentOf(user.address, level)).to.equal(parent.address);

      const restored = await approveAndUpgrade(seeder, Orbit, guardian);
      expect(await restored.matrixParentOf(user.address, level)).to.equal(parent.address);
      expect(await restored.levelManager()).to.equal(before.levelManager);
      expect(await restored.escrow()).to.equal(before.escrow);
      expect(await restored.registration()).to.equal(before.registration);
      expect(await restored.guardian()).to.equal(before.guardian);
    });
  }

  it("configures legacy recycle keys through a temporary LevelManager implementation", async function () {
    const [owner, orbitOwner] = await ethers.getSigners();
    const Guardian = await ethers.getContractFactory("Guardian");
    const guardian = await Guardian.deploy(owner.address);
    await guardian.waitForDeployment();

    const LevelManager = await ethers.getContractFactory("LevelManager");
    const levelManager = await upgrades.deployProxy(
      LevelManager,
      [owner.address, owner.address, owner.address, owner.address, owner.address, guardian.target],
      { initializer: "initialize", kind: "uups", unsafeAllow: ["delegatecall"] }
    );
    await levelManager.waitForDeployment();
    await guardian.setApprovedProxy(levelManager.target, true);

    const Configurator = await ethers.getContractFactory("LevelManagerMigrationConfigurator");
    const configurator = await approveAndUpgrade(levelManager, Configurator, guardian);
    await configurator.configureLegacyRecycleMigration([12], [orbitOwner.address], [2], [0]);
    expect(await configurator.legacyRecycleMigrationState(12, orbitOwner.address, 2, 0))
      .to.deep.equal([true, true]);

    await approveAndUpgrade(configurator, LevelManager, guardian);
    const restoredConfigurator = await approveAndUpgrade(levelManager, Configurator, guardian);
    expect(await restoredConfigurator.legacyRecycleMigrationState(12, orbitOwner.address, 2, 0))
      .to.deep.equal([true, true]);
    await expect(
      restoredConfigurator.configureLegacyRecycleMigration([12], [orbitOwner.address], [2], [0])
    ).to.be.revertedWithCustomError(restoredConfigurator, "MigrationAlreadyConfigured");
  });
});

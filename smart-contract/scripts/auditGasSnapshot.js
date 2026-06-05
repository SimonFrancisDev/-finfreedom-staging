const { ethers, upgrades } = require("hardhat");

const usdtUnits = (value) => ethers.parseUnits(String(value), 6);

async function deployGuardian(owner) {
  const Guardian = await ethers.getContractFactory("Guardian");
  const guardian = await Guardian.deploy(owner.address);
  await guardian.waitForDeployment();
  return guardian;
}

async function waitGas(label, txPromise, rows) {
  const tx = await txPromise;
  const receipt = await tx.wait();
  rows.push({ label, gasUsed: receipt.gasUsed.toString(), hash: tx.hash });
  return receipt;
}

async function deploySystem() {
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

  await levelManager.setSettlementRouter(router.target);
  await registration.setLevelManager(levelManager.target);
  await escrow.setLevelManager(levelManager.target);
  await levelManager.setOrbitContracts(p4.target, p12.target, p39.target);
  await levelManager.setFounderWallets(
    users.slice(0, 8).map((signer) => signer.address),
    [1250, 1250, 1250, 1250, 1250, 1250, 1250, 1250]
  );
  await levelManager.approveEscrow(ethers.MaxUint256);
  await registration.setID1Wallet(owner.address);

  return { owner, users, usdt, registration };
}

async function prepareUser(usdt, levelManager, user, amount = 100000) {
  await usdt.mint(user.address, usdtUnits(amount));
  await usdt.connect(user).approve(levelManager, usdtUnits(amount));
}

async function main() {
  const rows = [];
  const { owner, users, usdt, registration } = await deploySystem();
  const levelManagerAddress = await registration.levelManager();

  const alice = users[10];
  await prepareUser(usdt, levelManagerAddress, alice);
  await waitGas("register + level 1", registration.connect(alice).register(owner.address), rows);
  await waitGas("activate level 2", registration.connect(alice).activateLevel(2), rows);
  await waitGas("activate level 3", registration.connect(alice).activateLevel(3), rows);

  const orbitOwner = users[11];
  await prepareUser(usdt, levelManagerAddress, orbitOwner);
  await registration.connect(orbitOwner).register(owner.address);
  await registration.connect(orbitOwner).activateLevel(2);
  await registration.connect(orbitOwner).activateLevel(3);

  for (let index = 0; index < 13; index += 1) {
    const user = users[index + 12];
    await prepareUser(usdt, levelManagerAddress, user);
    await registration.connect(user).register(orbitOwner.address);
    await registration.connect(user).activateLevel(2);
    const label = index === 12 ? "activate level 3 into P39 line 3 escrow window" : null;
    if (label) {
      await waitGas(label, registration.connect(user).activateLevel(3), rows);
    } else {
      await registration.connect(user).activateLevel(3);
    }
  }

  console.log("| Scenario | Gas Used |");
  console.log("|---|---:|");
  for (const row of rows) {
    console.log(`| ${row.label} | ${row.gasUsed} |`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

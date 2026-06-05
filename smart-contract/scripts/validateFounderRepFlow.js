const hre = require("hardhat");
const { ethers } = hre;

function requiredAddress(name) {
  const value = process.env[name];
  if (!value || !ethers.isAddress(value)) {
    throw new Error(`${name} is required and must be a valid address`);
  }
  return ethers.getAddress(value);
}

function orbitForLevel(level, contracts) {
  const mod = level % 3;
  if (mod === 1) return contracts.p4;
  if (mod === 2) return contracts.p12;
  return contracts.p39;
}

async function main() {
  const [rep] = await ethers.getSigners();
  if (!rep) {
    throw new Error(`No signer configured for network "${hre.network.name}".`);
  }

  const id1 = requiredAddress("ID1_WALLET");
  const registration = await ethers.getContractAt("RegistrationFixed", requiredAddress("REGISTRATION_ADDRESS"));
  const levelManager = await ethers.getContractAt("LevelManager", requiredAddress("LEVEL_MANAGER_ADDRESS"));
  const usdt = await ethers.getContractAt("MockUSDT", requiredAddress("USDT_ADDRESS"));
  const contracts = {
    p4: await ethers.getContractAt("P4Orbit", requiredAddress("P4_ORBIT_ADDRESS")),
    p12: await ethers.getContractAt("P12Orbit", requiredAddress("P12_ORBIT_ADDRESS")),
    p39: await ethers.getContractAt("P39Orbit", requiredAddress("P39_ORBIT_ADDRESS")),
  };

  const repAddress = rep.address;
  console.log("Network:", hre.network.name);
  console.log("Founder rep:", repAddress);
  console.log("ID1:", id1);

  if (!(await levelManager.founderRepresentative(repAddress))) {
    throw new Error("Signer is not marked as a founder representative yet.");
  }
  if (await registration.isRegistered(repAddress)) {
    throw new Error("Signer is already registered; use a clean founder-rep wallet for this validation.");
  }

  const repInitialUsdt = await usdt.balanceOf(repAddress);
  const managerInitialUsdt = await usdt.balanceOf(await levelManager.getAddress());

  console.log("Initial rep USDT:", repInitialUsdt.toString());
  console.log("Initial LevelManager USDT:", managerInitialUsdt.toString());

  let tx = await registration.connect(rep).register(ethers.ZeroAddress);
  await tx.wait();
  console.log("Activated level 1:", tx.hash);

  for (let level = 2; level <= 10; level++) {
    tx = await registration.connect(rep).activateLevel(level);
    await tx.wait();
    console.log(`Activated level ${level}:`, tx.hash);
  }

  const repFinalUsdt = await usdt.balanceOf(repAddress);
  const managerFinalUsdt = await usdt.balanceOf(await levelManager.getAddress());

  console.log("Registered:", await registration.isRegistered(repAddress));
  console.log("Highest active level:", (await registration.highestActiveLevel(repAddress)).toString());
  console.log("Founder rep levels activated:", (await levelManager.founderRepLevelsActivated(repAddress)).toString());
  console.log("Founder rep completed:", await levelManager.founderRepAllLevelsCompleted(repAddress));
  console.log("Final rep USDT:", repFinalUsdt.toString());
  console.log("Final LevelManager USDT:", managerFinalUsdt.toString());
  console.log("Rep USDT changed:", (repFinalUsdt - repInitialUsdt).toString());
  console.log("LevelManager USDT changed:", (managerFinalUsdt - managerInitialUsdt).toString());

  if (repFinalUsdt !== repInitialUsdt) {
    throw new Error("Founder rep USDT balance changed during free activation.");
  }
  if (managerFinalUsdt !== managerInitialUsdt) {
    throw new Error("LevelManager USDT balance changed during free activation.");
  }

  for (let level = 1; level <= 10; level++) {
    if (!(await registration.isLevelActivated(repAddress, level))) {
      throw new Error(`Level ${level} is not active in Registration.`);
    }
    if (!(await levelManager.userLevelActivated(repAddress, level))) {
      throw new Error(`Level ${level} is not active in LevelManager.`);
    }

    const orbit = orbitForLevel(level, contracts);
    const id1Position = await orbit.getPosition(id1, level, 1);
    if (id1Position.occupant.toLowerCase() !== repAddress.toLowerCase()) {
      throw new Error(`Level ${level} ID1 orbit position 1 occupant mismatch.`);
    }
    if (id1Position.amount !== 0n) {
      throw new Error(`Level ${level} ID1 orbit amount is not zero.`);
    }

    const ownPosition = await orbit.getPosition(repAddress, level, 1);
    if (ownPosition.isActive) {
      throw new Error(`Level ${level} incorrectly filled the founder rep's own orbit.`);
    }
  }

  console.log("Founder-rep staging validation passed.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

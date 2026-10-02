const hre = require("hardhat");

function requiredAddress(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is required`);
  return hre.ethers.getAddress(value.trim());
}

function requiredAddressList(name, expectedLength) {
  const values = String(process.env[name] || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean)
    .map((value) => hre.ethers.getAddress(value));
  if (values.length !== expectedLength || new Set(values).size !== expectedLength) {
    throw new Error(`${name} must contain exactly ${expectedLength} distinct addresses`);
  }
  return values;
}

async function main() {
  const { ethers } = hre;
  const [representative] = await ethers.getSigners();
  if (!representative) throw new Error("PRIVATE_KEY is not configured");
  const network = await ethers.provider.getNetwork();
  if (hre.network.name !== "amoy" || network.chainId !== 80002n) {
    throw new Error(`This script is Amoy-only; received ${hre.network.name}/${network.chainId}`);
  }

  const representatives = requiredAddressList("FOUNDER_REPRESENTATIVES", 3);
  if (!representatives.includes(representative.address)) {
    throw new Error(`Signer is not an approved representative: ${representative.address}`);
  }
  const registration = await ethers.getContractAt(
    "RegistrationFixed",
    requiredAddress("REGISTRATION_ADDRESS"),
    representative
  );
  const manager = await ethers.getContractAt(
    "LevelManager",
    requiredAddress("LEVEL_MANAGER_ADDRESS"),
    representative
  );
  const id1 = requiredAddress("ID1_WALLET");
  if (!(await manager.founderRepresentative(representative.address))) {
    throw new Error("Signer is not configured as an F-Freedom founder representative");
  }

  if (!(await registration.isRegistered(representative.address))) {
    const tx = await registration.register(id1);
    await tx.wait();
    console.log(`Registered representative at Level 1: ${tx.hash}`);
  }
  for (let level = 2; level <= 10; level++) {
    if (!(await registration.isLevelActivated(representative.address, level))) {
      const tx = await registration.activateLevel(level);
      await tx.wait();
      console.log(`Activated representative Level ${level}: ${tx.hash}`);
    }
  }

  if ((await registration.getReferrer(representative.address)) !== id1) {
    throw new Error("Founder representative must be directly sponsored by ID1");
  }
  if ((await manager.founderRepLevelsActivated(representative.address)) !== 10n
      || !(await manager.founderRepAllLevelsCompleted(representative.address))) {
    throw new Error("Founder representative did not complete all ten free levels");
  }
  console.log(`FOUNDER_REPRESENTATIVE_READY=${representative.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

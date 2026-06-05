const hre = require("hardhat");

function requiredAddress(name) {
  const value = process.env[name] || process.env[`VITE_${name}`];
  if (!value || !hre.ethers.isAddress(value)) {
    throw new Error(`${name} is required and must be a valid address`);
  }
  return hre.ethers.getAddress(value);
}

async function main() {
  const { ethers } = hre;

  const addresses = {
    multisig: requiredAddress("MULTISIG_ADDRESS"),
    guardian: requiredAddress("GUARDIAN_ADDRESS"),
    fgt: requiredAddress("FGT_TOKEN_ADDRESS"),
    fgtr: requiredAddress("FGTR_TOKEN_ADDRESS"),
    escrow: requiredAddress("ESCROW_ADDRESS"),
    registration: requiredAddress("REGISTRATION_ADDRESS"),
    levelManager: requiredAddress("LEVEL_MANAGER_ADDRESS"),
    p4: requiredAddress("P4_ORBIT_ADDRESS"),
    p12: requiredAddress("P12_ORBIT_ADDRESS"),
    p39: requiredAddress("P39_ORBIT_ADDRESS"),
    controller: requiredAddress("FREEDOM_TOKEN_CONTROLLER_ADDRESS"),
    usdt: requiredAddress("USDT_ADDRESS"),
  };

  const registration = await ethers.getContractAt("RegistrationFixed", addresses.registration);
  const escrow = await ethers.getContractAt("AutoUpgradeEscrow", addresses.escrow);
  const levelManager = await ethers.getContractAt("LevelManager", addresses.levelManager);
  const fgt = await ethers.getContractAt("FGTToken", addresses.fgt);
  const fgtr = await ethers.getContractAt("FGTrToken", addresses.fgtr);
  const guardian = await ethers.getContractAt("Guardian", addresses.guardian);
  const controller = await ethers.getContractAt("FreedomTokenController", addresses.controller);
  const p4 = await ethers.getContractAt("P4Orbit", addresses.p4);
  const p12 = await ethers.getContractAt("P12Orbit", addresses.p12);
  const p39 = await ethers.getContractAt("P39Orbit", addresses.p39);

  console.log("=== Wiring Checks ===");
  console.log("registration.levelManager:", await registration.levelManager());
  console.log("escrow.levelManager:", await escrow.levelManager());
  console.log("levelManager.registration:", await levelManager.registration());
  console.log("levelManager.escrow:", await levelManager.escrow());
  console.log("levelManager.tokenController:", await levelManager.tokenController());
  console.log("levelManager.p4Orbit:", await levelManager.p4Orbit());
  console.log("levelManager.p12Orbit:", await levelManager.p12Orbit());
  console.log("levelManager.p39Orbit:", await levelManager.p39Orbit());

  console.log("\n=== Ownership Checks ===");
  console.log("guardian.owner:", await guardian.owner());
  console.log("levelManager.owner:", await levelManager.owner());
  console.log("registration.owner:", await registration.owner());
  console.log("escrow.owner:", await escrow.owner());
  console.log("controller.owner:", await controller.owner());
  console.log("p4.owner:", await p4.owner());
  console.log("p12.owner:", await p12.owner());
  console.log("p39.owner:", await p39.owner());
  console.log("fgt.owner:", await fgt.owner());
  console.log("fgtr.owner:", await fgtr.owner());

  console.log("\n=== Token Operator Checks ===");
  console.log("fgt.authorized(controller):", await fgt.authorizedOperators(addresses.controller));
  console.log("fgtr.authorized(controller):", await fgtr.authorizedOperators(addresses.controller));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

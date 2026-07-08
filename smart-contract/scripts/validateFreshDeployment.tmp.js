const hre = require("hardhat");
const { ethers } = hre;

function addr(name) {
  const value = process.env[name];
  if (!value || !ethers.isAddress(value)) {
    throw new Error(`${name} is required`);
  }
  return ethers.getAddress(value);
}

async function ownerOf(label, contract) {
  try {
    return await contract.owner();
  } catch (_) {
    return "N/A";
  }
}

async function main() {
  const expected = {
    multisig: addr("MULTISIG_ADDRESS"),
    guardian: addr("GUARDIAN_ADDRESS"),
    usdt: addr("USDT_ADDRESS"),
    registration: addr("REGISTRATION_ADDRESS"),
    levelManager: addr("LEVEL_MANAGER_ADDRESS"),
    settlementRouter: addr("LEVEL_SETTLEMENT_ROUTER_ADDRESS"),
    escrow: addr("ESCROW_ADDRESS"),
    p4: addr("P4_ORBIT_ADDRESS"),
    p12: addr("P12_ORBIT_ADDRESS"),
    p39: addr("P39_ORBIT_ADDRESS"),
    fgt: addr("FGT_TOKEN_ADDRESS"),
    fgtr: addr("FGTR_TOKEN_ADDRESS"),
    controller: addr("FREEDOM_TOKEN_CONTROLLER_ADDRESS"),
    nftPool: addr("NFT_POOL_VAULT_ADDRESS"),
    operations: addr("OPERATIONS_VAULT_ADDRESS"),
    id1: addr("ID1_WALLET"),
  };

  const provider = ethers.provider;
  const network = await provider.getNetwork();
  console.log("Network:", hre.network.name, network.chainId.toString());
  console.log("Expected:", expected);

  for (const [label, address] of Object.entries(expected)) {
    if (["id1"].includes(label)) continue;
    const code = await provider.getCode(address);
    console.log(`${label} code:`, code === "0x" ? "MISSING" : "OK");
    if (code === "0x") throw new Error(`${label} has no code: ${address}`);
  }

  const registration = await ethers.getContractAt("RegistrationFixed", expected.registration);
  const levelManager = await ethers.getContractAt("LevelManager", expected.levelManager);
  const escrow = await ethers.getContractAt("AutoUpgradeEscrow", expected.escrow);
  const p4 = await ethers.getContractAt("P4Orbit", expected.p4);
  const p12 = await ethers.getContractAt("P12Orbit", expected.p12);
  const p39 = await ethers.getContractAt("P39Orbit", expected.p39);
  const guardian = await ethers.getContractAt("Guardian", expected.guardian);
  const fgt = await ethers.getContractAt("FGTToken", expected.fgt);
  const fgtr = await ethers.getContractAt("FGTrToken", expected.fgtr);
  const controller = await ethers.getContractAt("FreedomTokenController", expected.controller);

  const checks = [
    ["registration.owner", await ownerOf("registration", registration), expected.multisig],
    ["levelManager.owner", await ownerOf("levelManager", levelManager), expected.multisig],
    ["escrow.owner", await ownerOf("escrow", escrow), expected.multisig],
    ["p4.owner", await ownerOf("p4", p4), expected.multisig],
    ["p12.owner", await ownerOf("p12", p12), expected.multisig],
    ["p39.owner", await ownerOf("p39", p39), expected.multisig],
    ["guardian.owner", await ownerOf("guardian", guardian), expected.multisig],
    ["fgt.owner", await ownerOf("fgt", fgt), expected.multisig],
    ["fgtr.owner", await ownerOf("fgtr", fgtr), expected.multisig],
    ["controller.owner", await ownerOf("controller", controller), expected.multisig],
    ["registration.levelManager", await registration.levelManager(), expected.levelManager],
    ["registration.id1Wallet", await registration.id1Wallet(), expected.id1],
    ["levelManager.id1Wallet", await levelManager.id1Wallet(), expected.id1],
    ["levelManager.registration", await levelManager.registration(), expected.registration],
    ["levelManager.escrow", await levelManager.escrow(), expected.escrow],
    ["levelManager.settlementRouter", await levelManager.settlementRouter(), expected.settlementRouter],
    ["p4.levelManager", await p4.levelManager(), expected.levelManager],
    ["p12.levelManager", await p12.levelManager(), expected.levelManager],
    ["p39.levelManager", await p39.levelManager(), expected.levelManager],
    ["escrow.levelManager", await escrow.levelManager(), expected.levelManager],
  ];

  let failed = 0;
  for (const [label, actual, want] of checks) {
    const actualAddress = ethers.isAddress(actual) ? ethers.getAddress(actual) : actual;
    const ok = String(actualAddress).toLowerCase() === String(want).toLowerCase();
    console.log(`${ok ? "OK" : "FAIL"} ${label}: ${actualAddress}`);
    if (!ok) failed += 1;
  }

  const registeredCount = await registration.registeredCount();
  const totalParticipants = await registration.totalParticipants();
  console.log("registeredCount:", registeredCount.toString());
  console.log("totalParticipants:", totalParticipants.toString());

  if (failed > 0) {
    throw new Error(`${failed} validation checks failed`);
  }

  console.log("VALIDATION PASSED");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

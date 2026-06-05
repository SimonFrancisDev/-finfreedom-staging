const hre = require("hardhat");
const { ethers } = hre;

function requiredAddress(name) {
  const value = process.env[name];
  if (!value || !ethers.isAddress(value)) {
    throw new Error(`${name} is required and must be a valid address`);
  }
  return ethers.getAddress(value);
}

async function main() {
  const [signer] = await ethers.getSigners();
  if (!signer) {
    throw new Error(`No signer configured for network "${hre.network.name}".`);
  }

  const multisigAddress = requiredAddress("MULTISIG_ADDRESS");
  const guardianAddress = requiredAddress("GUARDIAN_ADDRESS");
  const proxies = {
    LevelManager: requiredAddress("LEVEL_MANAGER_ADDRESS"),
    P4Orbit: requiredAddress("P4_ORBIT_ADDRESS"),
    P12Orbit: requiredAddress("P12_ORBIT_ADDRESS"),
    P39Orbit: requiredAddress("P39_ORBIT_ADDRESS"),
  };

  const multisig = await ethers.getContractAt("SimpleMultiSig", multisigAddress);
  const guardian = await ethers.getContractAt("Guardian", guardianAddress);

  console.log("Network:", hre.network.name);
  console.log("Signer:", signer.address);
  console.log("Multisig:", multisigAddress);
  console.log("Signer is multisig owner:", await multisig.isOwner(signer.address));
  console.log("Required confirmations:", (await multisig.requiredConfirmations()).toString());
  console.log("Timelock seconds:", (await multisig.timelockDelay()).toString());
  console.log("Transaction count:", (await multisig.getTransactionCount()).toString());
  console.log("Guardian:", guardianAddress);
  console.log("Guardian owner:", await guardian.owner());
  console.log("Guardian paused:", await guardian.paused());
  console.log("Guardian global freeze:", await guardian.globalUpgradeFreeze());

  for (const [name, proxy] of Object.entries(proxies)) {
    console.log(`${name} proxy approved:`, await guardian.approvedProxies(proxy));
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

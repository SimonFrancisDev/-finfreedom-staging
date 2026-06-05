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
  const user = process.env.USER_ADDRESS && ethers.isAddress(process.env.USER_ADDRESS)
    ? ethers.getAddress(process.env.USER_ADDRESS)
    : signer.address;

  const registration = await ethers.getContractAt("RegistrationFixed", requiredAddress("REGISTRATION_ADDRESS"));
  const levelManager = await ethers.getContractAt("LevelManager", requiredAddress("LEVEL_MANAGER_ADDRESS"));
  const usdt = await ethers.getContractAt("MockUSDT", requiredAddress("USDT_ADDRESS"));

  console.log("Network:", hre.network.name);
  console.log("User:", user);
  console.log("Registered:", await registration.isRegistered(user));
  console.log("Founder representative:", await levelManager.founderRepresentative(user));
  console.log("Founder rep levels activated:", (await levelManager.founderRepLevelsActivated(user)).toString());
  console.log("Founder rep completed:", await levelManager.founderRepAllLevelsCompleted(user));
  console.log("Highest active level:", (await registration.highestActiveLevel(user)).toString());
  console.log("USDT balance:", (await usdt.balanceOf(user)).toString());
  console.log("USDT allowance:", (await usdt.allowance(user, await levelManager.getAddress())).toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

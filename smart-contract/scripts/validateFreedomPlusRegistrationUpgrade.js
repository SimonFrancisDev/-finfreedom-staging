const { ethers, upgrades } = require("hardhat");

async function main() {
  const proxyAddress = process.env.FREEDOM_PLUS_REGISTRATION_ADDRESS;
  if (!ethers.isAddress(proxyAddress || "")) {
    throw new Error("FREEDOM_PLUS_REGISTRATION_ADDRESS is missing or invalid");
  }

  const Registration = await ethers.getContractFactory("FreedomPlusRegistration");
  await upgrades.validateUpgrade(proxyAddress, Registration, { kind: "uups" });

  console.log("FreedomPlusRegistration upgrade validation passed", {
    proxy: proxyAddress,
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
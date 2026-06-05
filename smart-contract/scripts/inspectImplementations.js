const hre = require("hardhat");
const { ethers, upgrades } = hre;

function requiredAddress(name) {
  const value = process.env[name];
  if (!value || !ethers.isAddress(value)) {
    throw new Error(`${name} is required and must be a valid address`);
  }
  return ethers.getAddress(value);
}

async function main() {
  const proxies = {
    LevelManager: {
      proxy: requiredAddress("LEVEL_MANAGER_ADDRESS"),
      expected: process.env.LEVEL_MANAGER_IMPLEMENTATION_ADDRESS,
    },
    P4Orbit: {
      proxy: requiredAddress("P4_ORBIT_ADDRESS"),
      expected: process.env.P4_ORBIT_IMPLEMENTATION_ADDRESS,
    },
    P12Orbit: {
      proxy: requiredAddress("P12_ORBIT_ADDRESS"),
      expected: process.env.P12_ORBIT_IMPLEMENTATION_ADDRESS,
    },
    P39Orbit: {
      proxy: requiredAddress("P39_ORBIT_ADDRESS"),
      expected: process.env.P39_ORBIT_IMPLEMENTATION_ADDRESS,
    },
  };

  console.log("Network:", hre.network.name);
  for (const [name, item] of Object.entries(proxies)) {
    const implementation = await upgrades.erc1967.getImplementationAddress(item.proxy);
    const expected = item.expected && ethers.isAddress(item.expected)
      ? ethers.getAddress(item.expected)
      : null;
    console.log(`${name}:`);
    console.log("  proxy:", item.proxy);
    console.log("  implementation:", implementation);
    if (expected) {
      console.log("  expected:", expected);
      console.log("  matches expected:", implementation.toLowerCase() === expected.toLowerCase());
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

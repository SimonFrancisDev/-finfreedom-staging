const hre = require("hardhat");
const { ethers, upgrades } = hre;

const ORBIT_PROXIES = {
  P4Orbit:
    process.env.P4_ORBIT_ADDRESS ||
    process.env.VITE_P4_ORBIT_ADDRESS,
  P12Orbit:
    process.env.P12_ORBIT_ADDRESS ||
    process.env.VITE_P12_ORBIT_ADDRESS,
  P39Orbit:
    process.env.P39_ORBIT_ADDRESS ||
    process.env.VITE_P39_ORBIT_ADDRESS,
};

async function prepareOrbitUpgrade(contractName, proxyAddress) {
  if (!ethers.isAddress(proxyAddress)) {
    throw new Error(`${contractName} proxy address is invalid: ${proxyAddress}`);
  }

  const factory = await ethers.getContractFactory(contractName);

  await upgrades.validateUpgrade(proxyAddress, factory, {
    kind: "uups",
  });

  const implementationAddress = await upgrades.prepareUpgrade(
    proxyAddress,
    factory,
    {
      kind: "uups",
    }
  );

  return implementationAddress;
}

async function main() {
  const [deployer] = await ethers.getSigners();
  if (!deployer) {
    throw new Error(`No deployer account configured for network "${hre.network.name}". Add PRIVATE_KEY to Smart-Contract/.env.`);
  }

  console.log("Preparing orbit implementation upgrades");
  console.log("Network:", hre.network.name);
  console.log("Deployer:", deployer.address);
  console.log("");

  const prepared = {};
  const selectedTargets = String(process.env.ORBIT_UPGRADE_TARGETS || Object.keys(ORBIT_PROXIES).join(","))
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  const unknownTargets = selectedTargets.filter((name) => !ORBIT_PROXIES[name]);
  if (unknownTargets.length) throw new Error(`Unknown orbit targets: ${unknownTargets.join(", ")}`);

  for (const contractName of selectedTargets) {
    const proxyAddress = ORBIT_PROXIES[contractName];
    console.log(`${contractName}`);
    console.log("  proxy:", proxyAddress);

    const implementationAddress = await prepareOrbitUpgrade(
      contractName,
      proxyAddress
    );

    prepared[contractName] = {
      proxy: proxyAddress,
      implementation: implementationAddress,
    };

    console.log("  implementation:", implementationAddress);
    console.log("");
  }

  console.log("Prepared implementations for AdminPanel:");
  console.log(JSON.stringify(prepared, null, 2));
  console.log("");
  console.log("No proxies were upgraded by this script.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

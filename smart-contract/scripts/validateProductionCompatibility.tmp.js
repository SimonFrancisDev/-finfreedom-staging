const hre = require("hardhat");

const TARGETS = [
  ["RegistrationFixed", "0x02ECA97e944Ac66b0444fd5F61A716917E83CfF5", []],
  ["LevelManager", "0x0E9De0F24eB4774834A2c4A63eaBa8356A4A4B53", ["delegatecall"]],
  ["P4Orbit", "0x1ED0b443c880Ba88F732c3F5915561A07B21F6B4", []],
  ["P12Orbit", "0xCF998d8f7E9DD4f3FacFbA45e656dE07142f824b", []],
  ["P39Orbit", "0xEaD39819B8C4DBb0669320542B6B847D4c31b8Fb", []],
];

async function main() {
  const network = await hre.ethers.provider.getNetwork();
  if (network.chainId !== 137n) {
    throw new Error(`Expected Polygon chain 137, received ${network.chainId}`);
  }

  const results = [];
  for (const [contractName, proxy, unsafeAllow] of TARGETS) {
    const implementation = await hre.upgrades.erc1967.getImplementationAddress(proxy);
    const factory = await hre.ethers.getContractFactory(contractName);

    try {
      await hre.upgrades.forceImport(proxy, factory, {
        kind: "uups",
        ...(unsafeAllow.length ? { unsafeAllow } : {}),
      });
      await hre.upgrades.validateUpgrade(proxy, factory, {
        kind: "uups",
        ...(unsafeAllow.length ? { unsafeAllow } : {}),
      });
      results.push({ contractName, proxy, implementation, compatible: true });
    } catch (error) {
      results.push({
        contractName,
        proxy,
        implementation,
        compatible: false,
        error: error.message,
      });
    }
  }

  console.log(JSON.stringify({ chainId: Number(network.chainId), results }, null, 2));
  if (results.some((result) => !result.compatible)) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

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
  const [deployer] = await ethers.getSigners();
  if (!deployer) {
    throw new Error("No deployer account configured");
  }

  const proxyAddress = requiredAddress("FREEDOM_PLUS_SETTLEMENT_ROUTER_ADDRESS");
  const nftPoolVault = requiredAddress("NFT_POOL_VAULT_ADDRESS");
  const operationsVault = requiredAddress("OPERATIONS_VAULT_ADDRESS");
  const network = await ethers.provider.getNetwork();
  if (hre.network.name !== "amoy" || network.chainId !== 80002n) {
    throw new Error(`Amoy only; received ${hre.network.name}/${network.chainId}`);
  }

  for (const [name, address] of Object.entries({ proxyAddress, nftPoolVault, operationsVault })) {
    if (await ethers.provider.getCode(address) === "0x") {
      throw new Error(`${name} has no contract code: ${address}`);
    }
  }

  const Router = await ethers.getContractFactory("FreedomPlusSettlementRouter");
  await upgrades.validateUpgrade(proxyAddress, Router, { kind: "uups" });
  if (String(process.env.VALIDATE_ONLY || "").toLowerCase() === "true") {
    console.log(JSON.stringify({
      result: "STORAGE_LAYOUT_VALID",
      network: hre.network.name,
      chainId: network.chainId.toString(),
      proxy: proxyAddress,
      sharedVaults: { nftPoolVault, operationsVault },
    }, null, 2));
    return;
  }
  const implementationAddress = await upgrades.prepareUpgrade(proxyAddress, Router, { kind: "uups" });
  const migrationData = Router.interface.encodeFunctionData("setSystemVaults", [
    nftPoolVault,
    operationsVault,
  ]);
  const uups = new ethers.Interface([
    "function upgradeToAndCall(address newImplementation,bytes data)",
  ]);
  const upgradeData = uups.encodeFunctionData("upgradeToAndCall", [
    implementationAddress,
    migrationData,
  ]);

  console.log(JSON.stringify({
    result: "PREPARED_NOT_EXECUTED",
    network: hre.network.name,
    chainId: network.chainId.toString(),
    deployer: deployer.address,
    proxy: proxyAddress,
    implementation: implementationAddress,
    sharedVaults: { nftPoolVault, operationsVault },
    governance: {
      guardianApproveProxy: {
        target: requiredAddress("GUARDIAN_ADDRESS"),
        signature: "setApprovedProxy(address,bool)",
        args: [proxyAddress, true],
      },
      guardianApproveImplementation: {
        target: requiredAddress("GUARDIAN_ADDRESS"),
        signature: "setApprovedImplementation(address,address,bool)",
        args: [proxyAddress, implementationAddress, true],
      },
      upgradeProxyAndSetVaults: {
        target: proxyAddress,
        value: "0",
        data: upgradeData,
      },
    },
  }, null, 2));
}

main().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});
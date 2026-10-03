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

function same(actual, expected, label) {
  if (hre.ethers.getAddress(actual) !== expected) {
    throw new Error(`${label} mismatch: expected ${expected}, received ${actual}`);
  }
}

async function main() {
  const { ethers } = hre;
  const network = await ethers.provider.getNetwork();
  if (hre.network.name !== "amoy" || network.chainId !== 80002n) {
    throw new Error(`This verifier is Amoy-only; received ${hre.network.name}/${network.chainId}`);
  }
  const id1 = requiredAddress("ID1_WALLET");
  const nftPool = requiredAddress("NFT_POOL_ADDRESS");
  const operations = requiredAddress("OPERATIONS_VAULT_ADDRESS");
  const representatives = requiredAddressList("FOUNDER_REPRESENTATIVES", 3);

  const ffManager = await ethers.getContractAt("LevelManager", requiredAddress("LEVEL_MANAGER_ADDRESS"));
  const ffRegistration = await ethers.getContractAt("RegistrationFixed", requiredAddress("REGISTRATION_ADDRESS"));
  const plusRegistration = await ethers.getContractAt(
    "FreedomPlusRegistration",
    requiredAddress("FREEDOM_PLUS_REGISTRATION_ADDRESS")
  );
  const plusRouter = await ethers.getContractAt(
    "FreedomPlusSettlementRouter",
    requiredAddress("FREEDOM_PLUS_SETTLEMENT_ROUTER_ADDRESS")
  );
  const vault = await ethers.getContractAt("FreedomNFTPoolVault", nftPool);

  same(await ffManager.id1Wallet(), id1, "F-Freedom ID1");
  same(await ffManager.nftPool(), nftPool, "F-Freedom NFT pool");
  same(await ffManager.operationsWallet(), operations, "F-Freedom operations vault");
  same(await plusRegistration.id1Wallet(), id1, "Freedom-Plus ID1");
  same(await plusRouter.id1Wallet(), id1, "Freedom-Plus router ID1");
  same(await plusRouter.nftPoolVault(), nftPool, "Freedom-Plus NFT pool");
  same(await plusRouter.operationsVault(), operations, "Freedom-Plus operations vault");
  if (!(await vault.distributorLocked()) || (await vault.distributor()) === ethers.ZeroAddress) {
    throw new Error("NFT pool distributor is not permanently configured");
  }

  for (const representative of representatives) {
    const fFreedomSponsor = ethers.getAddress(await ffRegistration.getReferrer(representative));
    if (!(await ffManager.founderRepresentative(representative))
        || !(await ffRegistration.isRegistered(representative))
        || !(await ffRegistration.isLevelActivated(representative, 1))
        || (fFreedomSponsor !== ethers.ZeroAddress && fFreedomSponsor !== id1)) {
      throw new Error(`F-Freedom representative is incomplete: ${representative}`);
    }
    if (!(await plusRegistration.isRegistered(representative))
        || (await plusRegistration.sponsorOf(representative)) !== id1) {
      throw new Error(`Freedom-Plus representative topology mismatch: ${representative}`);
    }
    for (let level = 1; level <= 7; level++) {
      if (!(await plusRegistration.isLevelActive(representative, level))) {
        throw new Error(`Freedom-Plus representative Level ${level} inactive: ${representative}`);
      }
    }
  }
  console.log(JSON.stringify({
    ok: true,
    chainId: network.chainId.toString(),
    id1,
    representatives,
    sharedVaults: { nftPool, operations },
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

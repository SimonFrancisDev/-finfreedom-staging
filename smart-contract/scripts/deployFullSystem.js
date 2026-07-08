const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

function readRequiredAddress(ethers, name) {
  const raw = process.env[name];
  if (!raw || raw.trim() === "") {
    throw new Error(`${name} is required in Smart-Contract/.env`);
  }

  return ethers.getAddress(raw.trim());
}

function readOptionalAddress(ethers, name) {
  const raw = process.env[name];
  if (!raw || raw.trim() === "") return "";
  return ethers.getAddress(raw.trim());
}

function readRequiredAddressList(ethers, name, expectedLength) {
  const raw = process.env[name];
  if (!raw || raw.trim() === "") {
    throw new Error(`${name} is required in Smart-Contract/.env`);
  }

  const values = raw.split(",").map((value) => value.trim()).filter(Boolean);
  if (values.length !== expectedLength) {
    throw new Error(`${name} must contain exactly ${expectedLength} comma-separated addresses`);
  }

  return values.map((value) => ethers.getAddress(value));
}

function readOptionalAddressList(ethers, name, expectedLength = null) {
  const raw = process.env[name];
  if (!raw || raw.trim() === "") {
    return [];
  }

  const values = raw.split(",").map((value) => value.trim()).filter(Boolean);
  if (expectedLength !== null && values.length !== expectedLength) {
    throw new Error(`${name} must contain exactly ${expectedLength} comma-separated addresses`);
  }

  return values.map((value) => ethers.getAddress(value));
}

function readRequiredRatioList(name, expectedLength) {
  const raw = process.env[name];
  if (!raw || raw.trim() === "") {
    throw new Error(`${name} is required in Smart-Contract/.env`);
  }

  const values = raw.split(",").map((value) => value.trim()).filter(Boolean);
  if (values.length !== expectedLength) {
    throw new Error(`${name} must contain exactly ${expectedLength} comma-separated integer ratios`);
  }

  const ratios = values.map((value) => {
    if (!/^\d+$/.test(value)) {
      throw new Error(`${name} contains a non-integer ratio: ${value}`);
    }

    return BigInt(value);
  });

  const total = ratios.reduce((sum, value) => sum + value, 0n);
  if (total !== 10000n) {
    throw new Error(`${name} must total 10000 basis points`);
  }

  return ratios;
}

function isLocalOrTestnet(networkName, chainId) {
  return networkName === "hardhat" || networkName === "localhost" || chainId === 31337n || chainId === 80002n;
}

async function assertDeploymentSafety(provider, networkName, usdt, id1Wallet, deployer) {
  const { chainId } = await provider.getNetwork();
  const production = !isLocalOrTestnet(networkName, chainId);

  const usdtCode = await provider.getCode(usdt);
  if (usdtCode === "0x") {
    throw new Error(`USDT_ADDRESS has no contract code on chain ${chainId}: ${usdt}`);
  }

  if (id1Wallet === deployer) {
    throw new Error("ID1_WALLET must not be the deployer address");
  }

  if (production && process.env.CONFIRM_PRODUCTION_DEPLOY !== "true") {
    throw new Error("Set CONFIRM_PRODUCTION_DEPLOY=true to deploy to a production chain");
  }

  if (production && process.env.ALLOW_MOCK_USDT === "true") {
    throw new Error("Mock USDT is forbidden on production chains");
  }

  console.log("Network:", networkName, `chainId=${chainId}`);
  console.log("Production mode:", production ? "yes" : "no");
  return chainId;
}

// Helper function to capture deployment block
async function captureDeploymentBlock(contractName, contractAddress, provider, deploymentBlocks) {
  const blockNumber = await provider.getBlockNumber();
  deploymentBlocks[contractName] = blockNumber;
  console.log(`✅ ${contractName} proxy: ${contractAddress} (block: ${blockNumber})`);
  return blockNumber;
}

async function deployOrUseTreasuryVault(ethers, provider, deploymentBlocks, contractName, envAddress, usdt, multisig) {
  if (envAddress) {
    const code = await provider.getCode(envAddress);
    if (code === "0x") {
      throw new Error(`${contractName} address has no contract code: ${envAddress}`);
    }

    console.log(`${contractName}: using existing ${envAddress}`);
    return envAddress;
  }

  console.log(`Deploying ${contractName}...`);
  const Factory = await ethers.getContractFactory(contractName);
  const vault = await Factory.deploy(usdt, multisig);
  await vault.waitForDeployment();
  const address = await vault.getAddress();
  await captureDeploymentBlock(contractName, address, provider, deploymentBlocks);
  return address;
}

// Helper function to save deployment info
async function saveDeploymentInfo(networkName, chainId, deployer, multisig, guardian, addresses, deploymentBlocks, provider) {
  const finalBlockNumber = await provider.getBlockNumber();
  const deploymentInfo = {
    network: networkName,
    chainId: chainId.toString(),
    deployedAt: new Date().toISOString(),
    finalBlockNumber: finalBlockNumber,
    deployer: deployer,
    multisig: multisig,
    guardian: guardian,
    deploymentBlocks: deploymentBlocks,
    addresses: addresses,
    // Add all contract addresses for easy reference
    contractAddresses: addresses
  };
  
  const outputDir = process.env.DEPLOYMENT_OUTPUT_DIR || "deployments";
  const deploymentsDir = path.isAbsolute(outputDir)
    ? outputDir
    : path.join(__dirname, "..", outputDir);
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }
  
  const filename = `deployment-${Date.now()}.json`;
  const filepath = path.join(deploymentsDir, filename);
  fs.writeFileSync(filepath, JSON.stringify(deploymentInfo, null, 2));
  console.log(`\n📦 Deployment info saved to deployments/${filename}`);
  console.log(`🎯 Final deployment block: ${finalBlockNumber}`);
  
  // Also save a .env friendly output
  const envBlocks = Object.entries(deploymentBlocks)
    .map(([name, block]) => `START_BLOCK_${name.toUpperCase()}=${block}`)
    .join("\n");
  
  console.log("\n📝 Add these to your backend .env:");
  console.log("=================================");
  console.log(envBlocks);
  console.log(`\nOr use a single START_BLOCK=${finalBlockNumber - 10} (to be safe)`);
  
  return finalBlockNumber;
}

async function main() {
  const { ethers, upgrades } = hre;
  const [deployer] = await ethers.getSigners();
  if (!deployer) {
    throw new Error(`No deployer account configured for network "${hre.network.name}". Add PRIVATE_KEY to Smart-Contract/.env.`);
  }

  const provider = ethers.provider;
  
  // Store deployment blocks
  const deploymentBlocks = {};

  // =========================
  // EXISTING ADDRESSES
  // =========================
  const MULTISIG = readRequiredAddress(ethers, "MULTISIG_ADDRESS");
  const GUARDIAN = readRequiredAddress(ethers, "GUARDIAN_ADDRESS");
  const USDT = readRequiredAddress(ethers, "USDT_ADDRESS");
  const ID1_WALLET = readRequiredAddress(ethers, "ID1_WALLET");
  const deployFreshTreasuryVaults = process.env.DEPLOY_FRESH_TREASURY_VAULTS === "true";
  const configuredNftPoolAddress = deployFreshTreasuryVaults ? "" : readOptionalAddress(ethers, "NFT_POOL_ADDRESS");
  const configuredOperationsAddress = deployFreshTreasuryVaults
    ? ""
    : readOptionalAddress(ethers, "OPERATIONS_VAULT_ADDRESS") ||
      readOptionalAddress(ethers, "OPERATIONS_WALLET_ADDRESS");
  const founderWallets = readRequiredAddressList(ethers, "FOUNDER_WALLETS", 8);
  const founderRatios = readRequiredRatioList("FOUNDER_RATIOS", 8);
  const founderRepresentatives = readOptionalAddressList(ethers, "FOUNDER_REPRESENTATIVES", 4);
  const chainId = await assertDeploymentSafety(provider, hre.network.name, USDT, ID1_WALLET, deployer.address);
  const nftPoolAddress = await deployOrUseTreasuryVault(
    ethers,
    provider,
    deploymentBlocks,
    "NFTPoolVault",
    configuredNftPoolAddress,
    USDT,
    MULTISIG
  );
  const operationsAddress = await deployOrUseTreasuryVault(
    ethers,
    provider,
    deploymentBlocks,
    "OperationsVault",
    configuredOperationsAddress,
    USDT,
    MULTISIG
  );

  console.log("🚀 FULL DEPLOYMENT STARTED");
  console.log("Deployer:", deployer.address);
  console.log("Multisig:", MULTISIG);
  console.log("Guardian:", GUARDIAN);
  console.log("USDT:", USDT);
  console.log("ID1 Wallet:", ID1_WALLET);
  console.log("NFT Pool:", nftPoolAddress);
  console.log("Operations:", operationsAddress);
  console.log("Founder wallets:", founderWallets.length);
  console.log("Founder representatives:", founderRepresentatives.length);
  console.log("");

  // =========================
  // 1. TOKENS (PROXY)
  // =========================
  console.log("1. Deploying FGTToken proxy...");
  const FGT = await ethers.getContractFactory("FGTToken");
  const fgt = await upgrades.deployProxy(
    FGT,
    [deployer.address, GUARDIAN],
    {
      initializer: "initialize",
      kind: "uups",
    }
  );
  await fgt.waitForDeployment();
  const fgtAddress = await fgt.getAddress();
  await captureDeploymentBlock("FGTToken", fgtAddress, provider, deploymentBlocks);

  console.log("2. Deploying FGTrToken proxy...");
  const FGTr = await ethers.getContractFactory("FGTrToken");
  const fgtr = await upgrades.deployProxy(
    FGTr,
    [deployer.address, GUARDIAN],
    {
      initializer: "initialize",
      kind: "uups",
    }
  );
  await fgtr.waitForDeployment();
  const fgtrAddress = await fgtr.getAddress();
  await captureDeploymentBlock("FGTrToken", fgtrAddress, provider, deploymentBlocks);
  console.log("");

  // =========================
  // 2. ESCROW (PROXY)
  // =========================
  console.log("3. Deploying AutoUpgradeEscrow proxy...");
  const Escrow = await ethers.getContractFactory("AutoUpgradeEscrow");
  const escrow = await upgrades.deployProxy(
    Escrow,
    [USDT, GUARDIAN],
    {
      initializer: "initialize",
      kind: "uups",
    }
  );
  await escrow.waitForDeployment();
  const escrowAddress = await escrow.getAddress();
  await captureDeploymentBlock("Escrow", escrowAddress, provider, deploymentBlocks);
  console.log("");

  // =========================
  // 3. REGISTRATION (PROXY)
  // =========================
  console.log("4. Deploying RegistrationFixed proxy...");
  const Registration = await ethers.getContractFactory("RegistrationFixed");
  const registration = await upgrades.deployProxy(
    Registration,
    [USDT, ethers.ZeroAddress, deployer.address, GUARDIAN],
    {
      initializer: "initialize",
      kind: "uups",
    }
  );
  await registration.waitForDeployment();
  const regAddress = await registration.getAddress();
  await captureDeploymentBlock("Registration", regAddress, provider, deploymentBlocks);
  console.log("");

  // =========================
  // 4. TOKEN CONTROLLER (PROXY)
  // =========================
  console.log("5. Deploying FreedomTokenController proxy...");
  const Controller = await ethers.getContractFactory("FreedomTokenController");
  const controller = await upgrades.deployProxy(
    Controller,
    [fgtAddress, fgtrAddress, deployer.address, GUARDIAN],
    {
      initializer: "initialize",
      kind: "uups",
    }
  );
  await controller.waitForDeployment();
  const controllerAddress = await controller.getAddress();
  await captureDeploymentBlock("TokenController", controllerAddress, provider, deploymentBlocks);
  console.log("");

  // =========================
  // 5. LEVEL MANAGER (PROXY)
  // =========================
  console.log("6. Deploying LevelManager proxy...");
  const LevelManager = await ethers.getContractFactory("LevelManager");
  const lm = await upgrades.deployProxy(
    LevelManager,
    [
      USDT,
      nftPoolAddress,
      operationsAddress,
      regAddress,
      escrowAddress,
      GUARDIAN
    ],
    {
      initializer: "initialize",
      kind: "uups",
      unsafeAllow: ["delegatecall"],
    }
  );
  await lm.waitForDeployment();
  const lmAddress = await lm.getAddress();
  await captureDeploymentBlock("LevelManager", lmAddress, provider, deploymentBlocks);
  console.log("");

  // =========================
  // 5B. SETTLEMENT ROUTER
  // =========================
  console.log("6B. Deploying LevelSettlementRouter...");
  const SettlementRouter = await ethers.getContractFactory("LevelSettlementRouter");
  const settlementRouter = await SettlementRouter.deploy(lmAddress, USDT);
  await settlementRouter.waitForDeployment();
  const settlementRouterAddress = await settlementRouter.getAddress();
  await captureDeploymentBlock("LevelSettlementRouter", settlementRouterAddress, provider, deploymentBlocks);

  console.log("6C. Linking LevelManager -> SettlementRouter...");
  await (await lm.setSettlementRouter(settlementRouterAddress)).wait();
  console.log("✅ Settlement router linked");
  console.log("");

  // =========================
  // 6. LINK BASIC
  // =========================
  console.log("7. Linking Registration -> LevelManager...");
  await (await registration.setLevelManager(lmAddress)).wait();
  console.log("✅ Registration linked");

  console.log("8. Linking Escrow -> LevelManager...");
  await (await escrow.setLevelManager(lmAddress)).wait();
  console.log("✅ Escrow linked");

  console.log("9. Setting ID1 Wallet...");
  await (await registration.setID1Wallet(ID1_WALLET)).wait();
  console.log("✅ ID1 wallet set");
  console.log("");

  // =========================
  // 7. ORBITS (PROXY)
  // =========================
  console.log("10. Deploying P4Orbit proxy...");
  const P4 = await ethers.getContractFactory("P4Orbit");
  const p4 = await upgrades.deployProxy(
    P4,
    [lmAddress, escrowAddress, regAddress, GUARDIAN],
    {
      initializer: "initialize",
      kind: "uups",
    }
  );
  await p4.waitForDeployment();
  const p4Address = await p4.getAddress();
  await captureDeploymentBlock("P4Orbit", p4Address, provider, deploymentBlocks);

  console.log("11. Deploying P12Orbit proxy...");
  const P12 = await ethers.getContractFactory("P12Orbit");
  const p12 = await upgrades.deployProxy(
    P12,
    [lmAddress, escrowAddress, regAddress, GUARDIAN],
    {
      initializer: "initialize",
      kind: "uups",
    }
  );
  await p12.waitForDeployment();
  const p12Address = await p12.getAddress();
  await captureDeploymentBlock("P12Orbit", p12Address, provider, deploymentBlocks);

  console.log("12. Deploying P39Orbit proxy...");
  const P39 = await ethers.getContractFactory("P39Orbit");
  const p39 = await upgrades.deployProxy(
    P39,
    [lmAddress, escrowAddress, regAddress, GUARDIAN],
    {
      initializer: "initialize",
      kind: "uups",
    }
  );
  await p39.waitForDeployment();
  const p39Address = await p39.getAddress();
  await captureDeploymentBlock("P39Orbit", p39Address, provider, deploymentBlocks);
  console.log("");

  // =========================
  // 8. ORBIT CONFIG
  // =========================
  console.log("13. Configuring LevelManager with orbit contracts...");
  await (await lm.setOrbitContracts(p4Address, p12Address, p39Address)).wait();
  console.log("13B. Configuring founder wallets...");
  await (await lm.setFounderWallets(founderWallets, founderRatios)).wait();
  console.log("Founder wallets configured");
  if (founderRepresentatives.length > 0) {
    console.log("13C. Configuring founder representatives...");
    await (await lm.setFounderRepresentatives(founderRepresentatives)).wait();
    console.log("Founder representatives configured");
  }
  console.log("✅ Orbit contracts configured");
  console.log("");

  // =========================
  // 9. TOKEN LINKING
  // =========================
  console.log("14. Linking LevelManager -> TokenController...");
  await (await lm.setTokenController(controllerAddress)).wait();
  console.log("✅ LevelManager linked to token controller");

  console.log("15. Linking TokenController -> LevelManager...");
  await (await controller.setLevelManager(lmAddress)).wait();
  console.log("✅ TokenController linked to LevelManager");

  console.log("16. Linking TokenController -> OrbitManager...");
  await (await controller.setOrbitManager(lmAddress)).wait();
  console.log("✅ TokenController linked to OrbitManager");
  console.log("");

  // =========================
  // 10. AUTHORIZE CONTROLLER ON TOKENS
  // =========================
  console.log("17. Authorizing TokenController on FGT and FGTr...");
  await (await fgt.setAuthorizedOperator(controllerAddress, true)).wait();
  await (await fgtr.setAuthorizedOperator(controllerAddress, true)).wait();
  console.log("✅ TokenController authorized on FGT");
  console.log("✅ TokenController authorized on FGTr");
  console.log("");

  // =========================
  // 11. OPTIONAL ESCROW APPROVAL
  // =========================
  if (typeof lm.approveEscrow === "function") {
    console.log("18. Approving Escrow from LevelManager...");
    await (await lm.approveEscrow(ethers.MaxUint256)).wait();
    console.log("✅ Escrow approved");
    console.log("");
  }

  // =========================
  // 12. OWNERSHIP TRANSFER TO MULTISIG
  // =========================
  console.log("19. Transferring ownerships to multisig...");

  await (await fgt.transferOwnership(MULTISIG)).wait();
  await (await fgtr.transferOwnership(MULTISIG)).wait();
  await (await escrow.transferOwnership(MULTISIG)).wait();
  await (await registration.transferOwnership(MULTISIG)).wait();
  await (await controller.transferOwnership(MULTISIG)).wait();
  await (await p4.transferOwnership(MULTISIG)).wait();
  await (await p12.transferOwnership(MULTISIG)).wait();
  await (await p39.transferOwnership(MULTISIG)).wait();
  await (await lm.transferOwnership(MULTISIG)).wait();

  console.log("✅ Core contract ownerships transferred to multisig");
  console.log("");

  // =========================
  // 13. GUARDIAN OWNERSHIP TO MULTISIG
  // =========================
  console.log("20. Transferring Guardian ownership to multisig...");
  const guardian = await ethers.getContractAt("Guardian", GUARDIAN);
  await (await guardian.transferOwnership(MULTISIG)).wait();
  console.log("✅ Guardian ownership transferred");
  console.log("");

  // =========================
  // SAVE DEPLOYMENT INFO
  // =========================
  const addresses = {
    multisig: MULTISIG,
    guardian: GUARDIAN,
    fgt: fgtAddress,
    fgtr: fgtrAddress,
    escrow: escrowAddress,
    registration: regAddress,
    levelManager: lmAddress,
    settlementRouter: settlementRouterAddress,
    nftPoolVault: nftPoolAddress,
    operationsVault: operationsAddress,
    p4Orbit: p4Address,
    p12Orbit: p12Address,
    p39Orbit: p39Address,
    tokenController: controllerAddress,
    usdt: USDT,
    id1Wallet: ID1_WALLET
  };

  await saveDeploymentInfo(
    hre.network.name,
    chainId,
    deployer.address,
    MULTISIG,
    GUARDIAN,
    addresses,
    deploymentBlocks,
    provider
  );

  // =========================
  // DONE
  // =========================
  console.log("\n🎉 FULL DEPLOYMENT COMPLETE");
  console.log("");
  console.log("FINAL ADDRESSES");
  console.log("==============================");
  Object.entries(addresses).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

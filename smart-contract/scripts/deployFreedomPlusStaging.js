const hre = require("hardhat");
const fs = require("fs");
const path = require("path");
const progressFile = process.env.STAGING_DEPLOYMENT_PROGRESS_FILE;
function checkpoint(manifest) {
  if (!progressFile) return;
  fs.mkdirSync(path.dirname(path.resolve(progressFile)), { recursive: true });
  fs.writeFileSync(progressFile, JSON.stringify(manifest, null, 2));
}

function requiredAddress(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is required`);
  return hre.ethers.getAddress(value.trim());
}

async function requireContract(name, address) {
  if ((await hre.ethers.provider.getCode(address)) === "0x") {
    throw new Error(`${name} has no contract code: ${address}`);
  }
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

async function deployProxy(name, args, manifest) {
  const Factory = await hre.ethers.getContractFactory(name);
  const contract = await hre.upgrades.deployProxy(Factory, args, { kind: "uups" });
  manifest.pendingDeployment = { name, address: await contract.getAddress(),
    tx: contract.deploymentTransaction()?.hash ?? null };
  checkpoint(manifest);
  await contract.waitForDeployment();
  const address = await contract.getAddress();
  const implementation = await hre.upgrades.erc1967.getImplementationAddress(address);
  const tx = contract.deploymentTransaction();
  const receipt = tx ? await tx.wait() : null;
  manifest.contracts[name] = {
    proxy: address,
    implementation,
    deploymentBlock: receipt?.blockNumber ?? null,
    deploymentTx: tx?.hash ?? null,
  };
  delete manifest.pendingDeployment;
  checkpoint(manifest);
  console.log(`${name}: ${address}`);
  return contract;
}

async function send(label, txPromise, manifest) {
  const tx = await txPromise;
  manifest.pendingConfiguration = { label, tx: tx.hash };
  checkpoint(manifest);
  const receipt = await tx.wait();
  manifest.configuration.push({ label, tx: tx.hash, block: receipt.blockNumber });
  delete manifest.pendingConfiguration;
  checkpoint(manifest);
  console.log(`${label}: ${tx.hash}`);
}

async function main() {
  const { ethers } = hre;
  const [deployer] = await ethers.getSigners();
  if (!deployer) throw new Error("PRIVATE_KEY is not configured");
  const network = await ethers.provider.getNetwork();
  if (network.chainId !== 80002n || hre.network.name !== "amoy") {
    throw new Error(`This script is Amoy-only; received ${hre.network.name}/${network.chainId}`);
  }

  const multisig = requiredAddress("MULTISIG_ADDRESS");
  const guardian = requiredAddress("GUARDIAN_ADDRESS");
  const usdt = requiredAddress("USDT_ADDRESS");
  const fgt = requiredAddress("FGT_TOKEN_ADDRESS");
  const id1 = requiredAddress("ID1_WALLET");
  const rewardOperator = requiredAddress("NFT_REWARD_OPERATOR_ADDRESS");
  const nftVaultAddress = requiredAddress("NFT_POOL_ADDRESS");
  const operationsVaultAddress = requiredAddress("OPERATIONS_VAULT_ADDRESS");
  if ([ethers.ZeroAddress, deployer.address, multisig, id1].includes(rewardOperator)) {
    throw new Error("NFT_REWARD_OPERATOR_ADDRESS must be a dedicated approved reward signer");
  }
  if (progressFile && fs.existsSync(progressFile)) {
    throw new Error("Deployment progress already exists. Reconcile its receipts before continuing; do not redeploy.");
  }
  const founderWallets = String(process.env.FREEDOM_PLUS_FOUNDER_WALLETS || '')
    .split(',').filter(Boolean).map((value) => ethers.getAddress(value.trim()));
  if (founderWallets.length !== 8 || new Set(founderWallets).size !== 8
      || founderWallets.includes(ethers.ZeroAddress) || founderWallets.includes(id1)) {
    throw new Error("FREEDOM_PLUS_FOUNDER_WALLETS must contain eight distinct approved payout wallets, excluding ID1");
  }
  await requireContract("GUARDIAN_ADDRESS", guardian);
  await requireContract("USDT_ADDRESS", usdt);
  await requireContract("FGT_TOKEN_ADDRESS", fgt);
  if (multisig === deployer.address || id1 === deployer.address) {
    throw new Error("Deployer must be distinct from multisig and ID1");
  }

  const fgtPreflight = new ethers.Contract(
    fgt,
    ["function operatorConfigLocked() view returns (bool)"],
    deployer
  );
  if (await fgtPreflight.operatorConfigLocked()) {
    throw new Error(
      "FGT operator configuration is locked. The NFT membership cannot lock FGT until an approved compatibility upgrade is completed."
    );
  }

  const representatives = requiredAddressList("FOUNDER_REPRESENTATIVES", 3);
  if (representatives.includes(id1)) {
    throw new Error("FOUNDER_REPRESENTATIVES must exclude ID1");
  }
  await requireContract("NFT_POOL_ADDRESS", nftVaultAddress);
  await requireContract("OPERATIONS_VAULT_ADDRESS", operationsVaultAddress);
  const nftVault = await ethers.getContractAt("FreedomNFTPoolVault", nftVaultAddress, deployer);
  const operationsVault = await ethers.getContractAt(
    "FreedomPlusOperationsVault",
    operationsVaultAddress,
    deployer
  );
  if ((await nftVault.owner()) !== deployer.address || (await operationsVault.owner()) !== deployer.address) {
    throw new Error("Shared vaults must remain deployer-owned until Freedom-Plus configuration completes");
  }
  if (await nftVault.distributorLocked()) {
    throw new Error("Shared NFT vault distributor is already configured");
  }
  const fFreedomRegistration = requiredAddress("REGISTRATION_ADDRESS");
  await requireContract("REGISTRATION_ADDRESS", fFreedomRegistration);
  const gateway = new ethers.Contract(fFreedomRegistration, [
    "function isRegistered(address) view returns(bool)",
    "function isLevelActivated(address,uint8) view returns(bool)",
    "function getReferrer(address) view returns(address)",
  ], ethers.provider);
  for (const representative of representatives) {
    const fFreedomSponsor = ethers.getAddress(await gateway.getReferrer(representative));
    if (!(await gateway.isRegistered(representative))
      || !(await gateway.isLevelActivated(representative, 1))
      || (fFreedomSponsor !== ethers.ZeroAddress && fFreedomSponsor !== id1)) {
      throw new Error(`Representative must first activate F-Freedom Level 1 with ID1 or no stored sponsor: ${representative}`);
    }
  }
  const manifest = {
    program: "Freedom-Plus",
    network: hre.network.name,
    chainId: network.chainId.toString(),
    commit: require("child_process").execFileSync("git", ["rev-parse", "HEAD"], {
      cwd: path.join(__dirname, "..", ".."), encoding: "utf8",
    }).trim(),
    deployedAt: new Date().toISOString(),
    deployer: deployer.address,
    multisig,
    guardian,
    usdt,
    fgt,
    id1,
    representatives,
    founderWallets,
    sharedVaults: {
      nftPool: nftVaultAddress,
      operations: operationsVaultAddress,
    },
    contracts: {},
    configuration: [],
    pendingGovernanceActions: [],
  };

  checkpoint(manifest);
  const fpt = await deployProxy("FPTToken", [deployer.address, guardian], manifest);
  const fptr = await deployProxy("FPTrToken", [deployer.address, guardian], manifest);
  const controller = await deployProxy(
    "FreedomPlusTokenController",
    [await fpt.getAddress(), await fptr.getAddress(), deployer.address, guardian],
    manifest
  );
  const manager = await deployProxy(
    "FreedomPlusLevelManager",
    [usdt, await controller.getAddress(), deployer.address, guardian],
    manifest
  );
  const registration = await deployProxy(
    "FreedomPlusRegistration",
    [await manager.getAddress(), id1, deployer.address, guardian],
    manifest
  );
  await send(
    "registration.setFFreedomRegistration",
    registration.setFFreedomRegistration(fFreedomRegistration),
    manifest
  );
  manifest.fFreedomRegistration = fFreedomRegistration;
  const orbitNames = [
    "P39PlusOrbit", "P14PlusOrbit", "P12PlusOrbit",
    "P6PlusOrbit", "P4PlusOrbit", "P3PlusOrbit",
  ];
  const orbits = [];
  for (const name of orbitNames) {
    orbits.push(await deployProxy(name, [await manager.getAddress(), deployer.address, guardian], manifest));
  }

  const router = await deployProxy(
    "FreedomPlusSettlementRouter",
    [
      usdt,
      await registration.getAddress(),
      await manager.getAddress(),
      id1,
      await nftVault.getAddress(),
      await operationsVault.getAddress(),
      deployer.address,
      guardian,
    ],
    manifest
  );
  const membership = await deployProxy(
    "FreedomNFTMembership",
    [fgt, await fpt.getAddress(), deployer.address, guardian],
    manifest
  );
  const rewardDistributor = await deployProxy(
    "FreedomNFTRewardDistributor",
    [usdt, await nftVault.getAddress(), deployer.address, guardian],
    manifest
  );

  for (let type = 0; type < orbits.length; type++) {
    await send(`router.configureOrbit.${type}`, router.configureOrbit(type, await orbits[type].getAddress()), manifest);
    await send(`${orbitNames[type]}.setManager`, orbits[type].setManager(await router.getAddress()), manifest);
  }
  await send("router.configureFounderWallets", router.configureFounderWallets(founderWallets), manifest);
  await send("router.lockConfiguration", router.lockConfiguration(), manifest);
  await send("manager.configureRegistration", manager.configureRegistration(await registration.getAddress()), manifest);
  await send("manager.configureSettlementRouter", manager.configureSettlementRouter(await router.getAddress()), manifest);
  await send("controller.setLevelManager", controller.setLevelManager(await manager.getAddress()), manifest);
  await send("fpt.authorizeController", fpt.setAuthorizedOperator(await controller.getAddress(), true), manifest);
  await send("fpt.authorizeMembership", fpt.setAuthorizedOperator(await membership.getAddress(), true), manifest);
  await send("fptr.authorizeController", fptr.setAuthorizedOperator(await controller.getAddress(), true), manifest);
  await send(
    "nftVault.configureDistributor",
    nftVault.configureDistributor(await rewardDistributor.getAddress()),
    manifest
  );
  await send("rewards.setRewardOperator", rewardDistributor.setRewardOperator(rewardOperator), manifest);
  if (await rewardDistributor.rewardOperator() !== rewardOperator) {
    throw new Error("Reward operator read-back mismatch");
  }

  const qualifyingToken = new ethers.Contract(
    fgt,
    [
      "function owner() view returns (address)",
      "function operatorConfigLocked() view returns (bool)",
      "function authorizedOperators(address) view returns (bool)",
      "function setAuthorizedOperator(address,bool)",
    ],
    deployer
  );
  if (!(await qualifyingToken.authorizedOperators(await membership.getAddress()))) {
    if ((await qualifyingToken.owner()) === deployer.address) {
      await send(
        "fgt.authorizeMembership",
        qualifyingToken.setAuthorizedOperator(await membership.getAddress(), true),
        manifest
      );
    } else {
      manifest.pendingGovernanceActions.push({
        target: fgt,
        action: "setAuthorizedOperator(address,bool)",
        args: [await membership.getAddress(), true],
        reason: "Allow Freedom NFT to lock and unlock qualifying FGT",
      });
    }
  }

  const tracked = [id1, ...representatives, await router.getAddress(), await nftVault.getAddress(), await operationsVault.getAddress()];
  const stable = new ethers.Contract(usdt, ["function balanceOf(address) view returns (uint256)"], deployer);
  const balancesBefore = await Promise.all(tracked.map((address) => stable.balanceOf(address)));
  await send("registration.initializeGenesis", registration.initializeGenesis(representatives), manifest);
  const balancesAfter = await Promise.all(tracked.map((address) => stable.balanceOf(address)));
  if (balancesBefore.some((balance, index) => balance !== balancesAfter[index])) {
    throw new Error("Genesis changed a tracked USDT balance");
  }
  if ((await registration.registeredCount()) !== 4n) throw new Error("Genesis participant count mismatch");
  for (const participant of [id1, ...representatives]) {
    for (let level = 1; level <= 7; level++) {
      if (!(await registration.isLevelActive(participant, level))) {
        throw new Error(`Genesis level inactive: ${participant} level ${level}`);
      }
    }
    if ((await fpt.balanceOf(participant)) !== 54_650n * 10n ** 6n) {
      throw new Error(`Genesis FPT mismatch: ${participant}`);
    }
    if ((await fptr.balanceOf(participant)) !== 0n) throw new Error(`Genesis FPTr mismatch: ${participant}`);
  }

  await send("fpt.lockOperatorConfig", fpt.lockOperatorConfig(), manifest);
  await send("fptr.lockOperatorConfig", fptr.lockOperatorConfig(), manifest);
  const owned = [
    fpt, fptr, controller, manager, registration, nftVault, operationsVault,
    ...orbits, router, membership, rewardDistributor,
  ];
  for (const contract of owned) {
    const name = Object.keys(manifest.contracts).find(
      (key) => manifest.contracts[key].proxy === contract.target
    ) || contract.target;
    await send(`${name}.transferOwnership`, contract.transferOwnership(multisig), manifest);
  }

  manifest.finalBlock = await ethers.provider.getBlockNumber();
  checkpoint(manifest);
  const outputDir = path.join(__dirname, "..", "deployments-freedom-plus-staging");
  fs.mkdirSync(outputDir, { recursive: true });
  const output = path.join(outputDir, `deployment-${Date.now()}.json`);
  fs.writeFileSync(output, JSON.stringify(manifest, null, 2));
  console.log(`Manifest: ${output}`);
  console.log(`Pending governance actions: ${manifest.pendingGovernanceActions.length}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

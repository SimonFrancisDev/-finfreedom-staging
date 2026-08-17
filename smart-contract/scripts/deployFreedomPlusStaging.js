const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

const APPROVED_REPRESENTATIVES = [
  "0x3f6Bb1E6Bfeb9C52f763a197d27B580d7DE7f100",
  "0xDd78425335C0c698615845d94f9FeE7492266396",
  "0xf72873d6233B5e3dfbA6D1D8058BF90E990902f0",
  "0xeE192BE4884B064281Fa426F3d855fb339445B83",
];

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

async function deployProxy(name, args, manifest) {
  const Factory = await hre.ethers.getContractFactory(name);
  const contract = await hre.upgrades.deployProxy(Factory, args, { kind: "uups" });
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
  console.log(`${name}: ${address}`);
  return contract;
}

async function send(label, txPromise, manifest) {
  const tx = await txPromise;
  const receipt = await tx.wait();
  manifest.configuration.push({ label, tx: tx.hash, block: receipt.blockNumber });
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

  const representatives = APPROVED_REPRESENTATIVES.map(ethers.getAddress);
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
    contracts: {},
    configuration: [],
    pendingGovernanceActions: [],
  };

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
  const nftVault = await deployProxy("FreedomNFTPoolVault", [deployer.address, guardian], manifest);
  const operationsVault = await deployProxy("FreedomPlusOperationsVault", [deployer.address, guardian], manifest);

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
  if ((await registration.registeredCount()) !== 5n) throw new Error("Genesis participant count mismatch");
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

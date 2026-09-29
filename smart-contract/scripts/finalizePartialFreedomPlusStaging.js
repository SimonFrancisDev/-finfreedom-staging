const hre = require("hardhat");
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const REPRESENTATIVES = [
  "0x3f6Bb1E6Bfeb9C52f763a197d27B580d7DE7f100",
  "0xDd78425335C0c698615845d94f9FeE7492266396",
  "0xf72873d6233B5e3dfbA6D1D8058BF90E990902f0",
];

function address(ethers, name) {
  if (!process.env[name]) throw new Error(`${name} is required`);
  return ethers.getAddress(process.env[name]);
}

async function main() {
  const { ethers, upgrades } = hre;
  if (process.env.RECOVER_PARTIAL_FREEDOM_PLUS !== "true") {
    throw new Error("Set RECOVER_PARTIAL_FREEDOM_PLUS=true");
  }
  const network = await ethers.provider.getNetwork();
  if (hre.network.name !== "amoy" || network.chainId !== 80002n) {
    throw new Error(`Amoy only; received ${hre.network.name}/${network.chainId}`);
  }

  const [deployer] = await ethers.getSigners();
  const multisig = address(ethers, "MULTISIG_ADDRESS");
  const guardian = address(ethers, "GUARDIAN_ADDRESS");
  const usdt = address(ethers, "USDT_ADDRESS");
  const fgtAddress = address(ethers, "FGT_TOKEN_ADDRESS");
  const id1 = address(ethers, "ID1_WALLET");
  const fFreedomRegistration = address(ethers, "REGISTRATION_ADDRESS");
  const representatives = REPRESENTATIVES.map(ethers.getAddress);
  const startBlock = Number(process.env.FREEDOM_PLUS_START_BLOCK);
  if (!Number.isSafeInteger(startBlock) || startBlock <= 0) throw new Error("Invalid FREEDOM_PLUS_START_BLOCK");

  const specs = [
    ["FPTToken", "FREEDOM_PLUS_FPT_ADDRESS"],
    ["FPTrToken", "FREEDOM_PLUS_FPTR_ADDRESS"],
    ["FreedomPlusTokenController", "FREEDOM_PLUS_TOKEN_CONTROLLER_ADDRESS"],
    ["FreedomPlusLevelManager", "FREEDOM_PLUS_LEVEL_MANAGER_ADDRESS"],
    ["FreedomPlusRegistration", "FREEDOM_PLUS_REGISTRATION_ADDRESS"],
    ["FreedomNFTPoolVault", "FREEDOM_NFT_POOL_VAULT_ADDRESS"],
    ["FreedomPlusOperationsVault", "FREEDOM_PLUS_OPERATIONS_VAULT_ADDRESS"],
    ["P39PlusOrbit", "FREEDOM_PLUS_P39_ORBIT_ADDRESS"],
    ["P14PlusOrbit", "FREEDOM_PLUS_P14_ORBIT_ADDRESS"],
    ["P12PlusOrbit", "FREEDOM_PLUS_P12_ORBIT_ADDRESS"],
    ["P6PlusOrbit", "FREEDOM_PLUS_P6_ORBIT_ADDRESS"],
    ["P4PlusOrbit", "FREEDOM_PLUS_P4_ORBIT_ADDRESS"],
    ["P3PlusOrbit", "FREEDOM_PLUS_P3_ORBIT_ADDRESS"],
    ["FreedomPlusSettlementRouter", "FREEDOM_PLUS_SETTLEMENT_ROUTER_ADDRESS"],
    ["FreedomNFTMembership", "FREEDOM_NFT_MEMBERSHIP_ADDRESS"],
    ["FreedomNFTRewardDistributor", "FREEDOM_NFT_REWARD_DISTRIBUTOR_ADDRESS"],
  ];
  const contracts = {};
  for (const [artifact, envName] of specs) {
    const target = address(ethers, envName);
    if ((await ethers.provider.getCode(target)) === "0x") throw new Error(`${envName} has no code`);
    contracts[artifact] = await ethers.getContractAt(artifact, target, deployer);
  }

  const registration = contracts.FreedomPlusRegistration;
  const fpt = contracts.FPTToken;
  const fptr = contracts.FPTrToken;
  if (!(await registration.genesisInitialized())) throw new Error("Genesis not initialized");
  if ((await registration.registeredCount()) !== 4n) throw new Error("Genesis count is not four");
  if (ethers.getAddress(await registration.fFreedomRegistration()) !== fFreedomRegistration) {
    throw new Error("F-Freedom registration mismatch");
  }
  for (const participant of [id1, ...representatives]) {
    if (!(await registration.isRegistered(participant))) throw new Error(`Not registered: ${participant}`);
    for (let level = 1; level <= 7; level += 1) {
      if (!(await registration.isLevelActive(participant, level))) throw new Error(`Inactive: ${participant}/${level}`);
    }
    if ((await fpt.balanceOf(participant)) !== 54_650n * 10n ** 6n) throw new Error(`FPT mismatch: ${participant}`);
    if ((await fptr.balanceOf(participant)) !== 0n) throw new Error(`FPTr mismatch: ${participant}`);
  }

  const configuration = [];
  for (const [label, token] of [["fpt", fpt], ["fptr", fptr]]) {
    if (!(await token.operatorConfigLocked())) {
      if (ethers.getAddress(await token.owner()) !== deployer.address) throw new Error(`${label} owner mismatch`);
      const receipt = await (await token.lockOperatorConfig()).wait();
      configuration.push({ action: `${label}.lockOperatorConfig`, txHash: receipt.hash, blockNumber: receipt.blockNumber });
    }
  }
  for (const [name, contract] of Object.entries(contracts)) {
    const owner = ethers.getAddress(await contract.owner());
    if (owner === deployer.address) {
      const receipt = await (await contract.transferOwnership(multisig)).wait();
      configuration.push({ action: `${name}.transferOwnership`, txHash: receipt.hash, blockNumber: receipt.blockNumber });
    } else if (owner !== multisig) {
      throw new Error(`${name} has unexpected owner ${owner}`);
    }
  }
  for (const [name, contract] of Object.entries(contracts)) {
    if (ethers.getAddress(await contract.owner()) !== multisig) throw new Error(`${name} ownership not transferred`);
  }
  if (!(await fpt.operatorConfigLocked()) || !(await fptr.operatorConfigLocked())) {
    throw new Error("Token operator configuration not locked");
  }

  const membership = await contracts.FreedomNFTMembership.getAddress();
  const fgt = new ethers.Contract(fgtAddress, ["function authorizedOperators(address) view returns (bool)"], deployer);
  const pendingGovernanceActions = (await fgt.authorizedOperators(membership)) ? [] : [{
    target: fgtAddress,
    action: "setAuthorizedOperator(address,bool)",
    args: [membership, true],
    reason: "Allow Freedom NFT to lock and unlock qualifying FGT",
  }];
  const manifestContracts = {};
  for (const [name, contract] of Object.entries(contracts)) {
    const proxy = await contract.getAddress();
    manifestContracts[name] = {
      proxy,
      implementation: await upgrades.erc1967.getImplementationAddress(proxy),
    };
  }
  const manifest = {
    program: "Freedom-Plus",
    recoveredPartialDeployment: true,
    network: hre.network.name,
    chainId: network.chainId.toString(),
    commit: execFileSync("git", ["rev-parse", "HEAD"], {
      cwd: path.join(__dirname, "..", ".."), encoding: "utf8",
    }).trim(),
    deployedAt: new Date().toISOString(),
    deployer: deployer.address,
    multisig,
    guardian,
    usdt,
    fgt: fgtAddress,
    fFreedomRegistration,
    id1,
    representatives,
    startBlock,
    finalBlock: await ethers.provider.getBlockNumber(),
    contracts: manifestContracts,
    configuration,
    pendingGovernanceActions,
  };
  const outputDir = path.join(__dirname, "..", "deployments-freedom-plus-staging");
  fs.mkdirSync(outputDir, { recursive: true });
  const output = path.join(outputDir, `deployment-${Date.now()}.json`);
  fs.writeFileSync(output, JSON.stringify(manifest, null, 2));
  console.log(JSON.stringify({
    ok: true,
    manifest: output,
    registeredCount: "4",
    representatives,
    finalBlock: manifest.finalBlock,
    pendingGovernanceActions: pendingGovernanceActions.length,
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

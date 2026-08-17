const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

function latestManifest() {
  const directory = path.join(__dirname, "..", "deployments-freedom-plus-staging");
  const files = fs.readdirSync(directory)
    .filter((name) => /^deployment-\d+\.json$/.test(name))
    .sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]));
  if (!files.length) throw new Error("No Freedom-Plus staging deployment manifest found");
  const file = path.join(directory, files.at(-1));
  return { file, manifest: JSON.parse(fs.readFileSync(file, "utf8")) };
}

function equal(actual, expected, label) {
  if (String(actual).toLowerCase() !== String(expected).toLowerCase()) {
    throw new Error(`${label}: expected ${expected}, received ${actual}`);
  }
}

async function main() {
  const { ethers, upgrades } = hre;
  const network = await ethers.provider.getNetwork();
  if (hre.network.name !== "amoy" || network.chainId !== 80002n) throw new Error("Amoy only");
  const { file, manifest } = latestManifest();
  equal(manifest.chainId, network.chainId, "manifest chain");

  for (const [name, record] of Object.entries(manifest.contracts)) {
    if (await ethers.provider.getCode(record.proxy) === "0x") throw new Error(`${name} proxy has no code`);
    if (await ethers.provider.getCode(record.implementation) === "0x") throw new Error(`${name} implementation has no code`);
    equal(await upgrades.erc1967.getImplementationAddress(record.proxy), record.implementation, `${name} implementation`);
    const contract = await ethers.getContractAt(name, record.proxy);
    equal(await contract.owner(), manifest.multisig, `${name} owner`);
  }

  const c = manifest.contracts;
  const registration = await ethers.getContractAt("FreedomPlusRegistration", c.FreedomPlusRegistration.proxy);
  const manager = await ethers.getContractAt("FreedomPlusLevelManager", c.FreedomPlusLevelManager.proxy);
  const controller = await ethers.getContractAt("FreedomPlusTokenController", c.FreedomPlusTokenController.proxy);
  const router = await ethers.getContractAt("FreedomPlusSettlementRouter", c.FreedomPlusSettlementRouter.proxy);
  const membership = await ethers.getContractAt("FreedomNFTMembership", c.FreedomNFTMembership.proxy);
  const vault = await ethers.getContractAt("FreedomNFTPoolVault", c.FreedomNFTPoolVault.proxy);
  const distributor = await ethers.getContractAt("FreedomNFTRewardDistributor", c.FreedomNFTRewardDistributor.proxy);
  const fpt = await ethers.getContractAt("FPTToken", c.FPTToken.proxy);
  const fptr = await ethers.getContractAt("FPTrToken", c.FPTrToken.proxy);

  equal(await registration.levelManager(), c.FreedomPlusLevelManager.proxy, "registration manager");
  equal(await registration.id1Wallet(), manifest.id1, "registration ID1");
  if (!(await registration.genesisInitialized())) throw new Error("genesis is not initialized");
  if ((await registration.registeredCount()) !== 5n) throw new Error("registered count is not five");
  equal(await manager.registration(), c.FreedomPlusRegistration.proxy, "manager registration");
  equal(await manager.settlementRouter(), c.FreedomPlusSettlementRouter.proxy, "manager router");
  equal(await manager.tokenController(), c.FreedomPlusTokenController.proxy, "manager controller");
  equal(await controller.levelManager(), c.FreedomPlusLevelManager.proxy, "controller manager");
  equal(await router.registration(), c.FreedomPlusRegistration.proxy, "router registration");
  equal(await router.manager(), c.FreedomPlusLevelManager.proxy, "router manager");
  equal(await router.id1Wallet(), manifest.id1, "router ID1");
  if (!(await router.configurationLocked())) throw new Error("router configuration is not locked");
  equal(await membership.fgt(), manifest.fgt, "membership FGT");
  equal(await membership.fpt(), c.FPTToken.proxy, "membership FPT");
  equal(await vault.distributor(), c.FreedomNFTRewardDistributor.proxy, "vault distributor");
  if (!(await vault.distributorLocked())) throw new Error("vault distributor is not locked");
  equal(await distributor.vault(), c.FreedomNFTPoolVault.proxy, "distributor vault");
  equal(await distributor.rewardToken(), manifest.usdt, "distributor reward token");

  const orbitNames = ["P39PlusOrbit", "P14PlusOrbit", "P12PlusOrbit", "P6PlusOrbit", "P4PlusOrbit", "P3PlusOrbit"];
  for (let type = 0; type < orbitNames.length; type++) {
    const orbit = await ethers.getContractAt(orbitNames[type], c[orbitNames[type]].proxy);
    equal(await orbit.manager(), c.FreedomPlusSettlementRouter.proxy, `${orbitNames[type]} manager`);
    equal(await router.orbitByType(type), c[orbitNames[type]].proxy, `${orbitNames[type]} router entry`);
  }

  for (const participant of [manifest.id1, ...manifest.representatives]) {
    if (!(await registration.isRegistered(participant))) throw new Error(`${participant} is not registered`);
    for (let level = 1; level <= 7; level++) {
      if (!(await registration.isLevelActive(participant, level))) throw new Error(`${participant} level ${level} inactive`);
    }
    if ((await fpt.balanceOf(participant)) !== 54_650n * 10n ** 6n) throw new Error(`${participant} FPT mismatch`);
    if ((await fptr.balanceOf(participant)) !== 0n) throw new Error(`${participant} FPTr is not zero`);
  }
  if (!(await fpt.operatorConfigLocked()) || !(await fptr.operatorConfigLocked())) {
    throw new Error("new token operator configuration is not locked");
  }
  console.log(JSON.stringify({
    result: "PASS",
    manifest: path.basename(file),
    commit: manifest.commit,
    finalBlock: manifest.finalBlock,
    registeredCount: "5",
    pendingGovernanceActions: manifest.pendingGovernanceActions.length,
  }, null, 2));
}

main().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});

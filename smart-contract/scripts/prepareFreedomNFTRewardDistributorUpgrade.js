const hre = require("hardhat");
const { ethers, upgrades } = hre;

const NETWORK_DEFAULTS = {
  polygon: {
    chainId: 137n,
    proxy: "0xD3b9637281C41fc7575aF34d5e63C4dE2D86c838",
    governance: "0x785cC854ce9e13CE1140cbFD7C08620713E1711d",
    guardian: "0x290c2300296379BD0048aFe9099Ed6Fc81BF75fC",
    id1: "0xCE38722a72c9099D9237897E18B0cfb6D51c4470",
  },
  amoy: {
    chainId: 80002n,
    proxy: "0x901C08a34aA81CeF881b7A419158705599FBE43a",
    governance: "0xD3f460AF3c6C9FAB8053ebF5eCdC1EdfC5de5f6A",
    guardian: "0x52F22c1e396dF20c2078B4a86b4A0ac3b51a9911",
    id1: "0xD3f460AF3c6C9FAB8053ebF5eCdC1EdfC5de5f6A",
  },
};

function address(name, fallback) {
  const value = process.env[name] || fallback;
  if (!value || !ethers.isAddress(value)) {
    throw new Error(`${name} must be a valid address`);
  }
  return ethers.getAddress(value);
}

function distributionTimestamp() {
  const raw = process.env.NFT_REWARD_FIRST_DISTRIBUTION_AT || "2026-11-02T00:00:00.000Z";
  const milliseconds = /^\d+$/.test(raw) ? Number(raw) * 1000 : Date.parse(raw);
  if (!Number.isSafeInteger(milliseconds) || milliseconds <= Date.now() + 86_400_000) {
    throw new Error("First distribution must be more than 24 hours in the future");
  }
  const date = new Date(milliseconds);
  if (
    date.getUTCHours() !== 0
    || date.getUTCMinutes() !== 0
    || date.getUTCSeconds() !== 0
    || date.getUTCMilliseconds() !== 0
  ) {
    throw new Error("First distribution must be exactly 00:00 UTC");
  }
  return BigInt(milliseconds / 1000);
}

async function main() {
  const defaults = NETWORK_DEFAULTS[hre.network.name];
  if (!defaults) throw new Error("Only the amoy and polygon networks are supported");
  const network = await ethers.provider.getNetwork();
  if (network.chainId !== defaults.chainId) {
    throw new Error(`Network mismatch: ${hre.network.name}/${network.chainId}`);
  }

  const proxy = address("NFT_REWARD_PROXY_ADDRESS", defaults.proxy);
  const governance = address("NFT_REWARD_GOVERNANCE_ADDRESS", defaults.governance);
  const guardianAddress = address("NFT_REWARD_GUARDIAN_ADDRESS", defaults.guardian);
  const id1 = address("NFT_REWARD_ID1_ADDRESS", defaults.id1);
  const prepare = String(process.env.PREPARE_UPGRADE || "").toLowerCase() === "true";
  const operator = process.env.NFT_REWARD_OPERATOR_ADDRESS
    ? address("NFT_REWARD_OPERATOR_ADDRESS")
    : null;
  if (prepare && !operator) throw new Error("NFT_REWARD_OPERATOR_ADDRESS is required to prepare the upgrade");
  const firstDistributionAt = distributionTimestamp();

  for (const [label, target] of Object.entries({ proxy, governance, guardianAddress })) {
    if (await ethers.provider.getCode(target) === "0x") {
      throw new Error(`${label} has no contract code: ${target}`);
    }
  }

  const Distributor = await ethers.getContractFactory("FreedomNFTRewardDistributor");
  const distributor = Distributor.attach(proxy);
  if ((await distributor.owner()).toLowerCase() !== governance.toLowerCase()) {
    throw new Error("Reward distributor owner does not match governance");
  }
  if ((await distributor.guardian()).toLowerCase() !== guardianAddress.toLowerCase()) {
    throw new Error("Reward distributor guardian mismatch");
  }

  await upgrades.validateUpgrade(proxy, Distributor, { kind: "uups" });
  const base = {
    result: "STORAGE_LAYOUT_VALID",
    network: hre.network.name,
    chainId: network.chainId.toString(),
    proxy,
    governance,
    guardian: guardianAddress,
    id1Excluded: id1,
    rewardOperator: operator,
    firstDistributionAt: firstDistributionAt.toString(),
    firstDistributionIso: new Date(Number(firstDistributionAt) * 1000).toISOString(),
  };

  if (!prepare) {
    console.log(JSON.stringify(base, null, 2));
    return;
  }

  const [deployer] = await ethers.getSigners();
  if (!deployer) throw new Error("A funded implementation deployer is required");
  const implementation = await upgrades.prepareUpgrade(proxy, Distributor, { kind: "uups" });
  const migrationData = Distributor.interface.encodeFunctionData("configureCycleSchedule", [
    firstDistributionAt,
    id1,
    operator,
  ]);
  const uups = new ethers.Interface([
    "function upgradeToAndCall(address newImplementation,bytes data)",
  ]);
  const guardian = new ethers.Contract(guardianAddress, [
    "function approvedProxies(address) view returns (bool)",
    "function setApprovedProxy(address,bool)",
    "function setApprovedImplementation(address,address,bool)",
  ], ethers.provider);

  const actions = [];
  if (!(await guardian.approvedProxies(proxy))) {
    actions.push({
      label: "Approve NFT reward distributor proxy",
      target: guardianAddress,
      value: "0",
      data: guardian.interface.encodeFunctionData("setApprovedProxy", [proxy, true]),
    });
  }
  actions.push({
    label: "Approve fixed-cycle NFT reward implementation",
    target: guardianAddress,
    value: "0",
    data: guardian.interface.encodeFunctionData("setApprovedImplementation", [
      proxy,
      implementation,
      true,
    ]),
  });
  actions.push({
    label: "Upgrade NFT rewards and atomically configure Cycle 1",
    target: proxy,
    value: "0",
    data: uups.encodeFunctionData("upgradeToAndCall", [implementation, migrationData]),
  });

  console.log(JSON.stringify({
    ...base,
    result: "PREPARED_NOT_EXECUTED",
    deployer: deployer.address,
    implementation,
    actions,
  }, null, 2));
}

main().catch((error) => {
  console.error(error.shortMessage || error.message || error);
  process.exitCode = 1;
});

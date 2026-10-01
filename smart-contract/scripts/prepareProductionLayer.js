const hre = require("hardhat");
const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const P = {
  governance: "0x785cC854ce9e13CE1140cbFD7C08620713E1711d",
  guardian: "0x290c2300296379BD0048aFe9099Ed6Fc81BF75fC",
  registration: "0x02ECA97e944Ac66b0444fd5F61A716917E83CfF5",
  manager: "0x0E9De0F24eB4774834A2c4A63eaBa8356A4A4B53",
  fgt: "0x615201edaddB5CFD839Cc4eE693Dc464F6E2B5E4",
  usdt: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
  oldPool: "0xf8F60Da42681b73DFeCa7731E78b29C8707C184b",
  operations: "0x3ee9B4913e175c15B2Ef76Ac352B6737210248Fb",
  id1: "0xCE38722a72c9099D9237897E18B0cfb6D51c4470",
  deployer: "0x884e48f9897E8633238747b608DD49dE12bF94df",
  representatives: [
    "0xAa254e8e177dE104D9F87211b0f4a6B7eC71306A",
    "0xb673c9D14Da920f187d25Cc793f1955a43284622",
    "0x117C9258a95775Ecf448fd086D00cA22506Ea79d",
  ],
};

async function main() {
  const { ethers, upgrades } = hre;
  const rehearsal = process.env.PRODUCTION_LAYER_FORK_REHEARSAL === "true";
  if (rehearsal) {
    if (hre.network.name !== "hardhat") throw new Error("Rehearsal must use local hardhat");
    if (!process.env.POLYGON_RPC_URL) throw new Error("POLYGON_RPC_URL required");
    await hre.network.provider.send("hardhat_reset", [{
      forking: { jsonRpcUrl: process.env.POLYGON_RPC_URL },
    }]);
    await hre.network.provider.send("hardhat_impersonateAccount", [P.deployer]);
    await hre.network.provider.send("hardhat_setBalance", [P.deployer, "0x56BC75E2D63100000"]);
  }
  const network = await ethers.provider.getNetwork();
  if (!rehearsal && (network.chainId !== 137n || hre.network.name !== "polygon")) {
    throw new Error("Production execution requires polygon / chain 137");
  }
  const signer = rehearsal ? await ethers.getSigner(P.deployer) : (await ethers.getSigners())[0];
  if (!signer || signer.address.toLowerCase() !== P.deployer.toLowerCase()) {
    throw new Error("Unexpected production deployer");
  }
  const manager = new ethers.Contract(P.manager, [
    "function owner() view returns(address)",
    "function nftPool() view returns(address)",
    "function operationsWallet() view returns(address)",
    "function getFounderWallets() view returns(address[],uint256[])",
    "function updateChargeRecipients(address,address)",
  ], signer);
  const fgt = new ethers.Contract(P.fgt, [
    "function owner() view returns(address)",
    "function operatorConfigLocked() view returns(bool)",
    "function setAuthorizedOperator(address,bool)",
    "function authorizedOperators(address) view returns(bool)",
  ], signer);
  const equal = (a, b) => a.toLowerCase() === b.toLowerCase();
  if (!equal(await manager.owner(), P.governance) || !equal(await fgt.owner(), P.governance)) {
    throw new Error("Production governance changed");
  }
  if (!equal(await manager.nftPool(), P.oldPool) || !equal(await manager.operationsWallet(), P.operations)) {
    throw new Error("Production recipients changed; review before deployment");
  }
  if (await fgt.operatorConfigLocked()) throw new Error("FGT operator configuration is locked");
  const [founders, ratios] = await manager.getFounderWallets();
  if (founders.length !== 8 || new Set(founders.map(x => x.toLowerCase())).size !== 8
      || ratios.length !== 8 || ratios.some(x => x !== 1250n)) {
    throw new Error("Unexpected founder payout configuration");
  }
  for (const target of [P.governance, P.guardian, P.registration, P.manager, P.fgt, P.usdt, P.oldPool, P.operations]) {
    if (await ethers.provider.getCode(target) === "0x") throw new Error("Missing production contract");
  }
  const oldRegistration = new ethers.Contract(P.registration, [
    "function isRegistered(address) view returns(bool)",
    "function isLevelActivated(address,uint8) view returns(bool)",
  ], signer);
  for (const rep of P.representatives) {
    if (!(await oldRegistration.isRegistered(rep)) || !(await oldRegistration.isLevelActivated(rep, 1))) {
      throw new Error("Representative is not eligible: " + rep);
    }
  }
  const stable = new ethers.Contract(P.usdt, ["function balanceOf(address) view returns(uint256)"], signer);
  const oldPoolBalance = await stable.balanceOf(P.oldPool);
  if (!rehearsal && process.env.PRODUCTION_LAYER_EXECUTE !== "DEPLOY_PAUSED_LAYER") {
    console.log(JSON.stringify({ status: "PREFLIGHT_ONLY", chainId: 137, transactionsSent: 0,
      oldPoolBalance: String(oldPoolBalance), representatives: P.representatives }, null, 2));
    return;
  }
  if (!rehearsal) {
    const proof = JSON.parse(fs.readFileSync(path.resolve(__dirname,
      "../deployments-production-migration/production-layer-fork-rehearsal.json"), "utf8"));
    if (proof.status !== "LOCAL_FORK_WIRING_PASS" || !proof.rehearsal) {
      throw new Error("Passing local-fork wiring evidence is required");
    }
    if (!process.env.POLYGON_GAS_PRICE || hre.network.config.gasPrice === "auto") {
      throw new Error("Set an explicit POLYGON_GAS_PRICE after checking live fees");
    }
    const price = BigInt(process.env.POLYGON_GAS_PRICE);
    const cap = ethers.parseUnits(process.env.PRODUCTION_LAYER_MAX_GAS_PRICE_GWEI || "50", "gwei");
    if (price <= 0n || price > cap) throw new Error("Gas price exceeds the approved cap");
    const budget = BigInt(proof.rehearsalGasUsed) * price * 125n / 100n;
    if (await ethers.provider.getBalance(signer.address) < budget) {
      throw new Error("Insufficient deployment funding including the 25% buffer");
    }
  }
  const output = path.resolve(__dirname, "../deployments-production-migration",
    rehearsal ? "production-layer-fork-rehearsal.json" : "production-layer-deployment.json");
  if (!rehearsal && fs.existsSync(output)) {
    throw new Error("Deployment record already exists. Inspect it; never redeploy blindly.");
  }
  const manifest = {
    chainId: rehearsal ? Number(network.chainId) : 137, rehearsal, status: "DEPLOYING",
    sourceCommit: execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim(),
    createdAt: new Date().toISOString(), existing: P, founderWallets: [...founders],
    oldPoolBalance: String(oldPoolBalance), contracts: {}, transactions: [], proposals: [],
    existingFundsMoved: false, productionReset: false,
    sourceScriptSha256: require("node:crypto").createHash("sha256")
      .update(fs.readFileSync(__filename)).digest("hex"),
    startBlock: Number(BigInt(await ethers.provider.send("eth_blockNumber", []))),
  };
  const save = () => fs.writeFileSync(output, JSON.stringify(manifest, null, 2) + "\n");
  fs.mkdirSync(path.dirname(output), { recursive: true });
  save();
  async function send(label, action) {
    const tx = await action();
    const record = { label, hash: tx.hash, status: "PENDING" };
    manifest.transactions.push(record);
    save();
    const receipt = await tx.wait();
    if (receipt.status !== 1) throw new Error("Transaction failed: " + label);
    record.status = "CONFIRMED";
    record.block = receipt.blockNumber;
    save();
    console.log(label + ": " + tx.hash);
  }
  const owned = [];
  async function deploy(name, args) {
    const factory = await ethers.getContractFactory(name, signer);
    const contract = await upgrades.deployProxy(factory, args, { kind: "uups" });
    manifest.contracts[name] = { proxy: await contract.getAddress(),
      transactionHash: contract.deploymentTransaction()?.hash };
    save();
    await contract.waitForDeployment();
    const deploymentReceipt = await contract.deploymentTransaction().wait();
    manifest.contracts[name].deploymentBlock = deploymentReceipt.blockNumber;
    manifest.contracts[name].implementation = await upgrades.erc1967.getImplementationAddress(contract.target);
    save();
    owned.push([name, contract]);
    console.log("Deployed " + name + ": " + contract.target);
    return contract;
  }
  const owner = signer.address;
  const fpt = await deploy("FPTToken", [owner, P.guardian]);
  const fptr = await deploy("FPTrToken", [owner, P.guardian]);
  const controller = await deploy("FreedomPlusTokenController", [fpt.target, fptr.target, owner, P.guardian]);
  const plusManager = await deploy("FreedomPlusLevelManager", [P.usdt, controller.target, owner, P.guardian]);
  const registration = await deploy("FreedomPlusRegistration", [plusManager.target, P.id1, owner, P.guardian]);
  await send("registration.pause", () => registration.pause());
  const pool = await deploy("FreedomNFTPoolVault", [owner, P.guardian]);
  const orbits = [];
  for (const name of ["P39PlusOrbit", "P14PlusOrbit", "P12PlusOrbit", "P6PlusOrbit", "P4PlusOrbit", "P3PlusOrbit"]) {
    orbits.push(await deploy(name, [plusManager.target, owner, P.guardian]));
  }
  const router = await deploy("FreedomPlusSettlementRouter", [
    P.usdt, registration.target, plusManager.target, P.id1, pool.target, P.operations, owner, P.guardian,
  ]);
  const membership = await deploy("FreedomNFTMembership", [P.fgt, fpt.target, owner, P.guardian]);
  await send("membership.pause", () => membership.pause());
  const rewards = await deploy("FreedomNFTRewardDistributor", [P.usdt, pool.target, owner, P.guardian]);
  for (let i = 0; i < orbits.length; i++) {
    await send("router.orbit." + i, () => router.configureOrbit(i, orbits[i].target));
    await send("orbit.manager." + i, () => orbits[i].setManager(router.target));
  }
  await send("router.founders", () => router.configureFounderWallets([...founders]));
  await send("router.lock", () => router.lockConfiguration());
  await send("manager.registration", () => plusManager.configureRegistration(registration.target));
  await send("manager.router", () => plusManager.configureSettlementRouter(router.target));
  await send("controller.manager", () => controller.setLevelManager(plusManager.target));
  await send("fpt.controller", () => fpt.setAuthorizedOperator(controller.target, true));
  await send("fpt.membership", () => fpt.setAuthorizedOperator(membership.target, true));
  await send("fptr.controller", () => fptr.setAuthorizedOperator(controller.target, true));
  await send("pool.distributor", () => pool.configureDistributor(rewards.target));
  // Owner-only genesis runs while public registration remains paused.
  await send("registration.gateway", () => registration.setFFreedomRegistration(P.registration));
  await send("registration.genesis", () => registration.initializeGenesis(P.representatives));
  if (await registration.registeredCount() !== 4n) throw new Error("Genesis count mismatch");
  for (const wallet of [P.id1, ...P.representatives]) {
    for (let level = 1; level <= 7; level++) {
      if (!(await registration.isLevelActive(wallet, level))) throw new Error("Genesis level missing");
    }
    if (await fpt.balanceOf(wallet) !== 54650n * 10n ** 6n) throw new Error("Genesis FPT mismatch");
    if (await fptr.balanceOf(wallet) !== 0n) throw new Error("Genesis FPTr mismatch");
  }
  await send("manager.pause", () => plusManager.pause());
  await send("fpt.lock", () => fpt.lockOperatorConfig());
  await send("fptr.lock", () => fptr.lockOperatorConfig());
  for (const [name, contract] of owned) {
    await send(name + ".ownership", () => contract.transferOwnership(P.governance));
    if (!equal(await contract.owner(), P.governance)) throw new Error("Ownership verification failed: " + name);
  }
  function proposal(label, target, iface, method, args, phase) {
    manifest.proposals.push({ label, target, value: "0", data: iface.encodeFunctionData(method, args), phase });
  }
  proposal("Authorize NFT membership for existing FGT", P.fgt, fgt.interface,
    "setAuthorizedOperator", [membership.target, true], "INTEGRATION");
  proposal("Connect F-Freedom to the shared NFT pool; preserve operations", P.manager, manager.interface,
    "updateChargeRecipients", [pool.target, P.operations], "INTEGRATION");
  proposal("Enable new manager after integration verification", plusManager.target, plusManager.interface, "unpause", [], "OPEN");
  proposal("Enable new registration after integration verification", registration.target, registration.interface, "unpause", [], "OPEN");
  proposal("Enable NFT membership after integration verification", membership.target, membership.interface,
    "unpause", [], "OPEN");
  manifest.status = "DEPLOYED_PAUSED_AWAITING_GOVERNANCE";
  manifest.rewardOperatorConfigured = false;
  manifest.executionWarnings = [
    "A dedicated reward operator must be approved before enabling the monthly worker.",
    "Historical pool funds and commitments are excluded from this package.",
    "Do not enable the website countdown release until integration and genesis are verified.",
  ];
  save();
  if (rehearsal) {
    await hre.network.provider.send("hardhat_impersonateAccount", [P.governance]);
    await hre.network.provider.send("hardhat_setBalance", [P.governance, "0x56BC75E2D63100000"]);
    const governance = await ethers.getSigner(P.governance);
    for (const action of manifest.proposals) {
      await send("REHEARSAL: " + action.label, () => governance.sendTransaction({
        to: action.target, data: action.data, value: 0,
      }));
    }
    if (!equal(await manager.nftPool(), pool.target) || !equal(await manager.operationsWallet(), P.operations)) {
      throw new Error("Shared recipient verification failed");
    }
    if (!(await fgt.authorizedOperators(membership.target))) throw new Error("FGT authorization failed");
    if (await stable.balanceOf(P.oldPool) !== oldPoolBalance) throw new Error("Historical pool changed");
    if (await registration.paused() || await plusManager.paused() || await membership.paused()) {
      throw new Error("Rehearsal opening failed");
    }
    manifest.status = "LOCAL_FORK_WIRING_PASS";
    manifest.governanceSimulation = "Owner impersonation on local fork; real multisig approvals still required";
    manifest.finalBlock = Number(BigInt(await ethers.provider.send("eth_blockNumber", [])));
    let gasUsed = 0n;
    for (let block = manifest.startBlock + 1; block <= manifest.finalBlock; block++) {
      gasUsed += (await ethers.provider.getBlock(block)).gasUsed;
    }
    manifest.rehearsalGasUsed = String(gasUsed);
    save();
  }
  console.log("Record: " + output);
}

main().catch(error => {
  console.error(error.shortMessage || error.message);
  process.exitCode = 1;
});

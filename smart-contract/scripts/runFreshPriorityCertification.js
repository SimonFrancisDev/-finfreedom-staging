const fs = require("fs");
const path = require("path");
const hre = require("hardhat");
const { ethers } = hre;
const { buildManifest, validateManifest } = require("./buildFreshPriorityManifest");

const PHASE_ORDER = ["P0", "P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "P10", "P11"];
const LEVEL_PRICE = {
  1: ethers.parseUnits("10", 6),
  2: ethers.parseUnits("20", 6),
  3: ethers.parseUnits("40", 6),
};
const MIN_POL = ethers.parseEther("0.05");
const MAX_P39_COMPLETION_GAS = 15_000_000n;

function boolEnv(name, fallback = false) {
  const value = process.env[name];
  if (value == null || value === "") return fallback;
  return String(value).toLowerCase() === "true";
}

function requiredAddress(name) {
  const value = process.env[name];
  if (!value || !ethers.isAddress(value)) throw new Error(`${name} is required and must be a valid address`);
  return ethers.getAddress(value);
}

function contractConfig(manifest) {
  const config = {
    usdt: requiredAddress("USDT_ADDRESS"),
    registration: requiredAddress("REGISTRATION_ADDRESS"),
    levelManager: requiredAddress("LEVEL_MANAGER_ADDRESS"),
    settlementRouter: requiredAddress("LEVEL_SETTLEMENT_ROUTER_ADDRESS"),
    escrow: requiredAddress("ESCROW_ADDRESS"),
    p4: requiredAddress("P4_ORBIT_ADDRESS"),
    p12: requiredAddress("P12_ORBIT_ADDRESS"),
    p39: requiredAddress("P39_ORBIT_ADDRESS"),
    id1: requiredAddress("ID1_WALLET"),
    nftPool: requiredAddress("NFT_POOL_VAULT_ADDRESS"),
    operations: requiredAddress("OPERATIONS_VAULT_ADDRESS"),
  };
  if (config.usdt !== ethers.getAddress(manifest.preserveMockUsdt)) {
    throw new Error(`Refusing non-preserved MockUSDT ${config.usdt}`);
  }
  return config;
}

function normalizeKey(value) {
  const raw = String(value || "").trim();
  const key = raw.startsWith("0x") ? raw : `0x${raw}`;
  return /^0x[0-9a-fA-F]{64}$/.test(key) ? key : "";
}

function loadSigners(manifest) {
  const keyFile = path.resolve(
    process.cwd(),
    process.env.TEST_WALLET_KEYS_FILE || "../env-files/fresh-test-wallets.private.json"
  );
  const rows = JSON.parse(fs.readFileSync(keyFile, "utf8"));
  const signers = new Map();
  const seenKeys = new Set();
  const seenAddresses = new Set();

  for (const row of rows) {
    const expected = manifest.wallets[row.label];
    if (!expected) continue;
    const key = normalizeKey(row.privateKey);
    if (!key) throw new Error(`${row.label} has no valid private key`);
    const wallet = new ethers.Wallet(key, ethers.provider);
    if (ethers.getAddress(wallet.address) !== ethers.getAddress(expected)) {
      throw new Error(`${row.label} key resolves to ${wallet.address}, expected ${expected}`);
    }
    const keyId = key.toLowerCase();
    const addressId = wallet.address.toLowerCase();
    if (seenKeys.has(keyId)) throw new Error(`Duplicate private key for ${row.label}`);
    if (seenAddresses.has(addressId)) throw new Error(`Duplicate address for ${row.label}`);
    seenKeys.add(keyId);
    seenAddresses.add(addressId);
    wallet.label = row.label;
    signers.set(row.label, wallet);
  }

  if (signers.size !== manifest.walletCount) {
    throw new Error(`Expected ${manifest.walletCount} controlled signers, loaded ${signers.size}`);
  }
  return signers;
}

async function contractsAt(config) {
  return {
    usdt: await ethers.getContractAt("MockUSDT", config.usdt),
    registration: await ethers.getContractAt("RegistrationFixed", config.registration),
    levelManager: await ethers.getContractAt("LevelManager", config.levelManager),
    router: await ethers.getContractAt("LevelSettlementRouter", config.settlementRouter),
    escrow: await ethers.getContractAt("AutoUpgradeEscrow", config.escrow),
    p4: await ethers.getContractAt("P4Orbit", config.p4),
    p12: await ethers.getContractAt("P12Orbit", config.p12),
    p39: await ethers.getContractAt("P39Orbit", config.p39),
  };
}

function interfaces() {
  return ["RegistrationFixed", "LevelManager", "LevelSettlementRouter", "AutoUpgradeEscrow", "P4Orbit", "P12Orbit", "P39Orbit", "MockUSDT"]
    .map((name) => new ethers.Interface(hre.artifacts.readArtifactSync(name).abi));
}

function decodeLogs(receipt, ifaces) {
  const events = [];
  for (const log of receipt.logs) {
    for (const iface of ifaces) {
      try {
        const parsed = iface.parseLog(log);
        if (parsed) {
          events.push({ address: ethers.getAddress(log.address), name: parsed.name, args: parsed.args, index: log.index });
          break;
        }
      } catch (_) {}
    }
  }
  return events;
}

function jsonValue(value) {
  if (typeof value === "bigint") return value.toString();
  if (Array.isArray(value)) return value.map(jsonValue);
  if (value && typeof value === "object") {
    const result = {};
    for (const [key, child] of Object.entries(value)) {
      if (!/^\d+$/.test(key)) result[key] = jsonValue(child);
    }
    return result;
  }
  return value;
}

function eventRecord(event) {
  return { address: event.address, name: event.name, args: jsonValue(event.args) };
}

function assertReceiptArithmetic(events, actor, level) {
  const failures = [];
  const detailed = events.filter((event) => event.name === "DetailedPayoutReceiptRecorded");
  const charges = events.filter((event) => event.name === "SystemChargeDistributedDetailed");
  const summaries = events.filter(
    (event) => event.name === "ActivationFinancialSummaryRecorded" &&
      ethers.getAddress(event.args.user) === ethers.getAddress(actor) && Number(event.args.level) === level
  );

  for (const event of detailed) {
    if (event.args.grossAmount !== event.args.escrowLocked + event.args.liquidPaid) {
      failures.push(`receipt gross mismatch for ${event.args.receiver}`);
    }
  }
  for (const event of charges) {
    if (event.args.systemChargeTotal !== event.args.nftPoolAmount + event.args.operationsAmount) {
      failures.push(`system charge mismatch activation ${event.args.activationId}`);
    }
  }
  if (!summaries.length) failures.push(`missing activation financial summary for ${actor} level ${level}`);
  for (const summary of summaries) {
    if (summary.args.activationAmount !== LEVEL_PRICE[level]) {
      failures.push(`activation amount ${summary.args.activationAmount} != ${LEVEL_PRICE[level]}`);
    }
    if (summary.args.systemCharge !== LEVEL_PRICE[level] / 10n) {
      failures.push(`system charge ${summary.args.systemCharge} != ${LEVEL_PRICE[level] / 10n}`);
    }
    const accounted =
      summary.args.systemCharge +
      summary.args.totalLiquidPaid +
      summary.args.totalEscrowLocked +
      summary.args.totalRecycleAllocated;
    if (accounted !== summary.args.activationAmount) {
      failures.push(`activation summary accounting ${accounted} != ${summary.args.activationAmount}`);
    }
  }
  if (failures.length) throw new Error(failures.join("; "));
}

function assertMatrixRules(events) {
  for (const event of events.filter((item) => item.name === "PaymentRuleApplied")) {
    const line = Number(event.args.line);
    const amounts = [event.args.toOwner, event.args.toSpillover1, event.args.toSpillover2, event.args.toEscrow, event.args.toRecycle];
    if (amounts.some((amount) => amount < 0n)) throw new Error("negative payout amount");
    if (line < 1 || line > 3) throw new Error(`invalid payment line ${line}`);
  }
}

function assertExpectedRecycleChain(action, events, config) {
  if (!action.expectedRecycleChain) return;
  const actual = events.filter((event) => event.name === "RecycleCompletedDetailed");
  if (actual.length !== action.expectedRecycleChain.length) {
    throw new Error(`expected ${action.expectedRecycleChain.length} recycle hops, found ${actual.length}`);
  }
  action.expectedRecycleChain.forEach((expected, index) => {
    const event = actual[index];
    const expectedOwner = walletForLabel(expected.orbitOwner);
    const expectedReceiver = expected.receiver === "ID1" ? config.id1 : walletForLabel(expected.receiver);
    if (ethers.getAddress(event.args.orbitOwner) !== ethers.getAddress(expectedOwner)) {
      throw new Error(`recycle hop ${index + 1} owner mismatch`);
    }
    if (ethers.getAddress(event.args.recycleReceiver) !== ethers.getAddress(expectedReceiver)) {
      throw new Error(`recycle hop ${index + 1} receiver mismatch`);
    }
    if (event.args.recycleGross !== ethers.parseUnits(expected.amount, 6)) {
      throw new Error(`recycle hop ${index + 1} amount mismatch`);
    }
  });
}

function assertFounderTerminal(action, events, config) {
  if (action.expectedTerminalRoute !== "ID1_FOUNDERS") return;
  const founderEvents = events.filter((event) => event.name === "FounderDistributionDetailed");
  if (!founderEvents.length || founderEvents.length % 8 !== 0) {
    throw new Error(`founder distribution count ${founderEvents.length} is not a non-zero multiple of 8`);
  }
  const founderTotal = founderEvents.reduce((sum, event) => sum + event.args.amount, 0n);
  const routedToId1 = events
    .filter(
      (event) => event.name === "DetailedPayoutReceiptRecorded" &&
        ethers.getAddress(event.args.receiver) === config.id1
    )
    .reduce((sum, event) => sum + event.args.liquidPaid, 0n);
  if (founderTotal !== routedToId1) {
    throw new Error(`founder total ${founderTotal} != ID1 routed liquid ${routedToId1}`);
  }
}

async function approveIfNeeded(wallet, amount, contracts, config) {
  const allowance = await contracts.usdt.allowance(wallet.address, config.levelManager);
  if (allowance >= amount) return null;
  const tx = await contracts.usdt.connect(wallet).approve(config.levelManager, ethers.MaxUint256);
  return tx.wait();
}

async function executePaidAction(action, wallet, contracts, config, ifaces) {
  if (action.kind === "register") {
    if (await contracts.registration.isRegistered(wallet.address)) {
      throw new Error(`${action.actor} unexpectedly already registered`);
    }
    const sponsor = action.sponsor === "ID1" ? config.id1 : walletForLabel(action.sponsor);
    await approveIfNeeded(wallet, LEVEL_PRICE[1], contracts, config);
    const tx = await contracts.registration.connect(wallet).register(sponsor);
    const receipt = await tx.wait();
    const events = decodeLogs(receipt, ifaces);
    assertReceiptArithmetic(events, wallet.address, 1);
    assertMatrixRules(events);
    assertExpectedRecycleChain(action, events, config);
    assertFounderTerminal(action, events, config);
    if (!(await contracts.registration.isRegistered(wallet.address))) throw new Error("registration state missing");
    if (ethers.getAddress(await contracts.registration.getReferrer(wallet.address)) !== ethers.getAddress(sponsor)) {
      throw new Error("stored sponsor mismatch");
    }
    return { txHash: tx.hash, receipt, events, outcome: "MINED" };
  }

  if (action.kind === "ensureLevel") {
    const level = Number(action.level);
    if (await contracts.levelManager.userLevelActivated(wallet.address, level)) {
      return { txHash: null, receipt: null, events: [], outcome: "ALREADY_ACTIVE_AUTO_OR_PRIOR" };
    }
    if (!(await contracts.levelManager.userLevelActivated(wallet.address, level - 1))) {
      throw new Error(`${action.actor} previous level ${level - 1} is not active`);
    }
    await approveIfNeeded(wallet, LEVEL_PRICE[level], contracts, config);
    const gasEstimate = await contracts.registration.connect(wallet).activateLevel.estimateGas(level);
    const tx = await contracts.registration.connect(wallet).activateLevel(level, { gasLimit: (gasEstimate * 125n) / 100n });
    const receipt = await tx.wait();
    const events = decodeLogs(receipt, ifaces);
    assertReceiptArithmetic(events, wallet.address, level);
    assertMatrixRules(events);
    if (!(await contracts.levelManager.userLevelActivated(wallet.address, level))) throw new Error("level activation state missing");
    return { txHash: tx.hash, receipt, events, gasEstimate, outcome: "MINED" };
  }

  throw new Error(`Unsupported paid action ${action.kind}`);
}

let activeManifest;
function walletForLabel(label) {
  const address = activeManifest.wallets[label];
  if (!address) throw new Error(`Unknown wallet label ${label}`);
  return address;
}

async function validateWiring(contracts, config) {
  const checks = [
    ["registration.id1", await contracts.registration.id1Wallet(), config.id1],
    ["registration.manager", await contracts.registration.levelManager(), config.levelManager],
    ["manager.id1", await contracts.levelManager.id1Wallet(), config.id1],
    ["manager.registration", await contracts.levelManager.registration(), config.registration],
    ["manager.escrow", await contracts.levelManager.escrow(), config.escrow],
    ["manager.router", await contracts.levelManager.settlementRouter(), config.settlementRouter],
    ["p4.manager", await contracts.p4.levelManager(), config.levelManager],
    ["p12.manager", await contracts.p12.levelManager(), config.levelManager],
    ["p39.manager", await contracts.p39.levelManager(), config.levelManager],
    ["escrow.manager", await contracts.escrow.levelManager(), config.levelManager],
  ];
  for (const [label, actual, expected] of checks) {
    if (ethers.getAddress(actual) !== ethers.getAddress(expected)) throw new Error(`${label} mismatch ${actual} != ${expected}`);
  }
  for (const address of Object.values(config)) {
    if (address === config.id1) continue;
    if ((await ethers.provider.getCode(address)) === "0x") throw new Error(`missing code at ${address}`);
  }
}

async function validateCleanState(contracts, manifest) {
  const [registered, participants] = await Promise.all([
    contracts.registration.registeredCount(),
    contracts.registration.totalParticipants(),
  ]);
  if (registered !== 0n || participants !== 1n) {
    throw new Error(`expected ID1-only state, registered=${registered}, participants=${participants}`);
  }
  for (const address of Object.values(manifest.wallets)) {
    if (await contracts.registration.isRegistered(address)) throw new Error(`controlled wallet already registered ${address}`);
  }
}

async function validateFunding(actions, signers, contracts, negativePhase) {
  const labels = [...new Set(actions.map((action) => action.actor).filter((actor) => signers.has(actor)))];
  for (const label of labels) {
    const wallet = signers.get(label);
    const [pol, usdt] = await Promise.all([
      ethers.provider.getBalance(wallet.address),
      contracts.usdt.balanceOf(wallet.address),
    ]);
    if (pol < MIN_POL) throw new Error(`${label} has insufficient POL ${ethers.formatEther(pol)}`);
    if (!negativePhase && usdt < ethers.parseUnits("70", 6)) {
      throw new Error(`${label} has insufficient MockUSDT ${ethers.formatUnits(usdt, 6)}`);
    }
  }
}

async function validatePrimaryP39Topology(manifest, contracts) {
  const owner = walletForLabel(manifest.primaryP39Topology[0].sponsor);
  for (const expected of manifest.primaryP39Topology) {
    const position = await contracts.p39.getPosition(owner, 3, expected.position);
    if (ethers.getAddress(position.occupant) !== ethers.getAddress(walletForLabel(expected.wallet))) {
      throw new Error(`P39 position ${expected.position}: ${position.occupant} != ${walletForLabel(expected.wallet)}`);
    }
    const rule = await contracts.p39.getPositionRuleView(owner, 3, expected.position);
    if (Number(rule.line) !== expected.line) throw new Error(`P39 position ${expected.position} line mismatch`);
  }
}

async function validateAutoUpgrade(action, contracts) {
  const user = walletForLabel(action.actor);
  const fromLevel = Number(action.fromLevel);
  const toLevel = Number(action.toLevel);
  const startBlock = Number(process.env.START_BLOCK || process.env.START_BLOCK_LEVEL_MANAGER || 0);
  if (!startBlock) throw new Error("START_BLOCK or START_BLOCK_LEVEL_MANAGER is required for auto-upgrade audit");
  if (!(await contracts.levelManager.userLevelActivated(user, toLevel))) {
    throw new Error(`${action.actor} level ${toLevel} is not active`);
  }
  const triggerEvents = await contracts.levelManager.queryFilter(
    contracts.levelManager.filters.AutoUpgradeTriggered(user, fromLevel, toLevel),
    startBlock,
    "latest"
  );
  if (triggerEvents.length !== Number(action.expectedActivations)) {
    throw new Error(`expected ${action.expectedActivations} auto-upgrade event, found ${triggerEvents.length}`);
  }
  const usedEvents = await contracts.escrow.queryFilter(
    contracts.escrow.filters.EscrowUsedForUpgrade(user, fromLevel, toLevel),
    startBlock,
    "latest"
  );
  if (usedEvents.length !== 1) throw new Error(`expected one escrow-use event, found ${usedEvents.length}`);
  const expected = ethers.parseUnits(action.requiredEscrow, 6);
  if (usedEvents[0].args.amount !== expected) {
    throw new Error(`auto-upgrade used ${usedEvents[0].args.amount}, expected ${expected}`);
  }
}

async function validateLatestOccurrence(manifest, contracts, config) {
  const repeatedParent = walletForLabel(manifest.roles?.primaryOwner || "Account 8");
  const children = ["Account 63", "Account 64", "Account 65"].map(walletForLabel);
  const occurrences = [];
  for (let position = 1; position <= 39; position += 1) {
    const row = await contracts.p39.getPosition(config.id1, 3, position);
    if (ethers.getAddress(row.occupant) === ethers.getAddress(repeatedParent)) occurrences.push(position);
  }
  if (occurrences.length < 2) throw new Error(`expected repeated Account 8 occurrence in ID1 P39, found ${occurrences.length}`);
  const latest = occurrences.at(-1);
  let expectedChildren;
  if (latest <= 3) expectedChildren = [3 + latest, 6 + latest, 9 + latest];
  else if (latest <= 12) expectedChildren = [9 + latest, 18 + latest, 27 + latest];
  else throw new Error(`latest repeated parent at terminal line-3 position ${latest}`);
  for (let index = 0; index < children.length; index += 1) {
    const row = await contracts.p39.getPosition(config.id1, 3, expectedChildren[index]);
    if (ethers.getAddress(row.occupant) !== ethers.getAddress(children[index])) {
      throw new Error(`latest-parent child position ${expectedChildren[index]} mismatch`);
    }
  }
}

async function expectRevert(label, action) {
  try {
    await action();
  } catch (_) {
    return;
  }
  throw new Error(`${label} unexpectedly succeeded`);
}

async function executeNegativeCase(action, wallet, signers, contracts, config) {
  const caseName = action.caseName;
  if (caseName === "insufficientUsdt") {
    const balance = await contracts.usdt.balanceOf(wallet.address);
    if (balance >= LEVEL_PRICE[1]) throw new Error("insufficient-USDT wallet must remain below 10 USDT");
    await expectRevert(caseName, () => contracts.registration.connect(wallet).register.staticCall(config.id1));
    return;
  }
  if (caseName === "missingAllowance") {
    if ((await contracts.usdt.balanceOf(wallet.address)) < LEVEL_PRICE[1]) throw new Error("missing-allowance wallet needs USDT");
    await (await contracts.usdt.connect(wallet).approve(config.levelManager, 0)).wait();
    await expectRevert(caseName, () => contracts.registration.connect(wallet).register.staticCall(config.id1));
    return;
  }
  if (caseName === "duplicateRegistration") {
    if (!(await contracts.registration.isRegistered(wallet.address))) {
      await approveIfNeeded(wallet, LEVEL_PRICE[1], contracts, config);
      await (await contracts.registration.connect(wallet).register(config.id1)).wait();
    }
    await expectRevert(caseName, () => contracts.registration.connect(wallet).register.staticCall(config.id1));
    return;
  }
  if (caseName === "previousLevelMissing") {
    if (!(await contracts.registration.isRegistered(wallet.address))) {
      await approveIfNeeded(wallet, LEVEL_PRICE[1], contracts, config);
      await (await contracts.registration.connect(wallet).register(config.id1)).wait();
    }
    if (await contracts.levelManager.userLevelActivated(wallet.address, 2)) {
      throw new Error("previous-level test wallet unexpectedly has Level 2 active");
    }
    await expectRevert(caseName, () => contracts.registration.connect(wallet).activateLevel.staticCall(3));
    return;
  }
  if (caseName === "walletRpcFallback") {
    const source = fs.readFileSync(
      path.resolve(process.cwd(), "../frontend/src/Pages/ActivationCenter/ActivationCenterPage.jsx"),
      "utf8"
    );
    if (!source.includes("estimateActivationGas") || !source.includes("web3Service.getReadProvider()")) {
      throw new Error("frontend read-RPC gas fallback is missing");
    }
    return;
  }
  throw new Error(`unknown negative case ${caseName}`);
}

async function fetchRequiredJson(url) {
  const response = await fetch(url, { headers: { accept: "application/json" } });
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  return response.json();
}

async function validateReconciliation(contracts) {
  const apiBase = String(process.env.TEST_API_BASE_URL || "").replace(/\/$/, "");
  const frontendUrl = String(process.env.TEST_FRONTEND_URL || "").replace(/\/$/, "");
  if (!apiBase || !frontendUrl) throw new Error("TEST_API_BASE_URL and TEST_FRONTEND_URL are required");
  const [health, summary, participants, frontend] = await Promise.all([
    fetchRequiredJson(`${apiBase}/api/health`),
    fetchRequiredJson(`${apiBase}/api/community/summary`),
    contracts.registration.totalParticipants(),
    fetch(frontendUrl),
  ]);
  if (!health.ok || health.db?.readyState !== 1) throw new Error("staging API health failed");
  if (!frontend.ok) throw new Error(`staging frontend returned ${frontend.status}`);
  const apiParticipants = BigInt(summary?.data?.public?.totalParticipants ?? -1);
  if (apiParticipants !== participants) {
    throw new Error(`API participants ${apiParticipants} != chain ${participants}`);
  }
}

function printPlan(manifest, phase, actions) {
  console.log("Fresh Priority Certification");
  console.log("Mode:", boolEnv("TEST_DRY_RUN", true) ? "DRY_RUN" : "LIVE");
  console.log("Phase:", phase);
  console.log("Wallets:", manifest.walletCount);
  console.log("Preserved MockUSDT:", manifest.preserveMockUsdt);
  console.log("Actions:", actions.length);
  for (const action of actions) console.log(`${action.id} ${action.kind} ${action.actor}`);
}

function writeReport(report) {
  const outputDir = path.resolve(process.cwd(), process.env.TEST_REPORT_DIR || "test-reports");
  fs.mkdirSync(outputDir, { recursive: true });
  const file = path.join(outputDir, `${report.phase.toLowerCase()}-${Date.now()}.json`);
  fs.writeFileSync(file, `${JSON.stringify(report, null, 2)}\n`);
  console.log("Report:", file);
}

async function main() {
  const manifest = buildManifest();
  validateManifest(manifest);
  activeManifest = manifest;

  const phase = String(process.env.TEST_PHASE || "PLAN").toUpperCase();
  const dryRun = boolEnv("TEST_DRY_RUN", true);
  const actions = phase === "PLAN" ? manifest.actions : manifest.actions.filter((action) => action.phase === phase);
  if (phase !== "PLAN" && !PHASE_ORDER.includes(phase)) throw new Error(`Unknown phase ${phase}`);
  if (!actions.length) throw new Error(`No actions for phase ${phase}`);
  printPlan(manifest, phase, actions);
  if (dryRun) return;

  if (!boolEnv("TEST_CONFIRM_FRESH_STAGING", false)) {
    throw new Error("Set TEST_CONFIRM_FRESH_STAGING=true only after deployment and environment validation");
  }
  const network = await ethers.provider.getNetwork();
  if (network.chainId !== 80002n) throw new Error(`Refusing chain ${network.chainId}`);

  const config = contractConfig(manifest);
  const contracts = await contractsAt(config);
  const signers = loadSigners(manifest);
  const ifaces = interfaces();
  await validateWiring(contracts, config);
  if (phase === "P1") await validateCleanState(contracts, manifest);
  await validateFunding(actions, signers, contracts, phase === "P10");

  const report = {
    version: 1,
    phase,
    startedAt: new Date().toISOString(),
    chainId: network.chainId.toString(),
    startBlock: await ethers.provider.getBlockNumber(),
    contracts: config,
    results: [],
    status: "RUNNING",
  };

  for (const action of actions) {
    console.log(`\n${action.id} ${action.kind} ${action.actor}`);
    if (["assertDeployment", "assertCleanState"].includes(action.kind)) {
      if (action.kind === "assertDeployment") await validateWiring(contracts, config);
      else await validateCleanState(contracts, manifest);
      report.results.push({ id: action.id, status: "PASS", outcome: action.kind });
      continue;
    }
    if (action.kind === "assertAutoUpgrade") {
      await validateAutoUpgrade(action, contracts);
      report.results.push({ id: action.id, status: "PASS", outcome: action.kind });
      continue;
    }
    if (action.kind === "assertReconciliation") {
      await validateReconciliation(contracts);
      report.results.push({ id: action.id, status: "PASS", outcome: action.kind });
      continue;
    }
    if (action.kind === "negativeCase") {
      const wallet = signers.get(action.actor);
      await executeNegativeCase(action, wallet, signers, contracts, config);
      report.results.push({ id: action.id, status: "PASS", outcome: action.caseName });
      continue;
    }
    const wallet = signers.get(action.actor);
    if (!wallet) throw new Error(`No signer for ${action.actor}`);
    const result = await executePaidAction(action, wallet, contracts, config, ifaces);
    if (action.phase === "P5" && action.recycleWindow === "reserve-2-release" && result.gasEstimate > MAX_P39_COMPLETION_GAS) {
      throw new Error(`P39 completion estimate ${result.gasEstimate} exceeds ${MAX_P39_COMPLETION_GAS}`);
    }
    report.results.push({
      id: action.id,
      status: "PASS",
      outcome: result.outcome,
      txHash: result.txHash,
      block: result.receipt?.blockNumber || null,
      gasUsed: result.receipt?.gasUsed?.toString() || null,
      gasEstimate: result.gasEstimate?.toString() || null,
      events: result.events.map(eventRecord),
    });
  }

  if (phase === "P5") await validatePrimaryP39Topology(manifest, contracts);
  if (phase === "P6") await validateLatestOccurrence(manifest, contracts, config);
  report.endBlock = await ethers.provider.getBlockNumber();
  report.completedAt = new Date().toISOString();
  report.status = report.results.every((row) => row.status === "PASS") ? "PASS" : "INCOMPLETE";
  writeReport(report);
  if (report.status !== "PASS") throw new Error(`${phase} contains specialized checks that are not implemented yet`);
  console.log(`PHASE ${phase}: PASS`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

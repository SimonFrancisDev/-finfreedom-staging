const fs = require("fs");
const path = require("path");
const hre = require("hardhat");
const { ethers } = hre;

const DEFAULT_CONTRACTS = {
  usdt: "0x7b7E39f3D177B3356368431C5C285bca58b43A60",
  registration: "0x80c0663c1f1C1772b5dE08c9FfdABA553Ab81a4d",
  levelManager: "0xD95474915b3BbFf19929F2D2cE6f32882EF45A0B",
  escrow: "0xC9af1976FB6B88a5660b906482f9512fbF7fe164",
  p4: "0x14d74b0330C677a54dB6640dC603E11912e9aAc2",
  p12: "0x83C907F102DB3aA5F7C30f874a8fC2FC62db5F45",
  p39: "0xc603E7123aa2C391C92d9325311c7b9D49256581",
};

const USE_ENV_CONTRACTS = String(process.env.TEST_USE_ENV_CONTRACTS || "false").toLowerCase() === "true";
const FRESH_ID1 = "0x019e3e2638Bb45E4BA14bD41eA2616246434A588";
const ID1 = USE_ENV_CONTRACTS && process.env.ID1_WALLET ? process.env.ID1_WALLET : FRESH_ID1;
const API_BASE = process.env.TEST_API_BASE_URL || "https://finfreedom-staging-api.onrender.com";

const LEVEL_PRICE = {
  1: ethers.parseUnits("10", 6),
  2: ethers.parseUnits("20", 6),
  3: ethers.parseUnits("40", 6),
};

const CONTRACTS = {
  usdt: USE_ENV_CONTRACTS && process.env.USDT_ADDRESS ? process.env.USDT_ADDRESS : DEFAULT_CONTRACTS.usdt,
  registration:
    USE_ENV_CONTRACTS && process.env.REGISTRATION_ADDRESS
      ? process.env.REGISTRATION_ADDRESS
      : DEFAULT_CONTRACTS.registration,
  levelManager:
    USE_ENV_CONTRACTS && process.env.LEVEL_MANAGER_ADDRESS
      ? process.env.LEVEL_MANAGER_ADDRESS
      : DEFAULT_CONTRACTS.levelManager,
  escrow: USE_ENV_CONTRACTS && process.env.ESCROW_ADDRESS ? process.env.ESCROW_ADDRESS : DEFAULT_CONTRACTS.escrow,
  p4: USE_ENV_CONTRACTS && process.env.P4_ORBIT_ADDRESS ? process.env.P4_ORBIT_ADDRESS : DEFAULT_CONTRACTS.p4,
  p12: USE_ENV_CONTRACTS && process.env.P12_ORBIT_ADDRESS ? process.env.P12_ORBIT_ADDRESS : DEFAULT_CONTRACTS.p12,
  p39: USE_ENV_CONTRACTS && process.env.P39_ORBIT_ADDRESS ? process.env.P39_ORBIT_ADDRESS : DEFAULT_CONTRACTS.p39,
};

const TREE = [
  ["Account 8", ID1],
  ["Account 9", "Account 8"],
  ["Account 10", "Account 8"],
  ["Account 11", "Account 8"],
  ["Account 13", "Account 9"],
  ["Account 14", "Account 9"],
  ["Account 15", "Account 9"],
  ["Account 16", "Account 10"],
  ["Account 17", "Account 10"],
  ["Account 18", "Account 10"],
  ["Account 19", "Account 11"],
  ["Account 20", "Account 11"],
  ["Account 21", "Account 11"],
  ["Account 25", "Account 13"],
  ["Account 26", "Account 13"],
  ["Account 27", "Account 13"],
  ["Account 28", "Account 14"],
  ["Account 29", "Account 14"],
  ["Account 30", "Account 14"],
  ["Account 31", "Account 15"],
  ["Account 32", "Account 15"],
  ["Account 33", "Account 15"],
  ["Account 34", "Account 16"],
  ["Account 35", "Account 16"],
  ["Account 36", "Account 16"],
  ["Account 37", "Account 17"],
  ["Account 38", "Account 17"],
  ["Account 39", "Account 17"],
  ["Account 40", "Account 18"],
  ["Account 41", "Account 18"],
  ["Account 42", "Account 18"],
  ["Account 43", "Account 19"],
  ["Account 44", "Account 19"],
  ["Account 45", "Account 19"],
  ["Account 46", "Account 20"],
  ["Account 47", "Account 20"],
  ["Account 48", "Account 20"],
  ["Account 49", "Account 21"],
  ["Account 50", "Account 21"],
  ["Account 51", "Account 21"],
];

const BASE_LABELS = new Set([
  "Account 8",
  "Account 9",
  "Account 10",
  "Account 11",
  "Account 13",
  "Account 14",
  "Account 15",
  "Account 16",
  "Account 17",
  "Account 18",
  "Account 19",
  "Account 20",
  "Account 21",
]);

const WIDER_LABELS = new Set(TREE.map(([label]) => label).filter((label) => !BASE_LABELS.has(label)));
const RESERVE_LABELS = new Set(["Account 12", "Account 22", "Account 23", "Account 24"]);

const PHASES = {
  phase0: {
    title: "Clean-state proof",
    proves: [
      "fresh contracts are wired correctly",
      "ID1 is the only participant",
      "all controlled wallets are unregistered and funded",
      "API summary is clean",
    ],
  },
  base: {
    title: "Base registration tree",
    proves: ["registration", "referrer routing", "P4 first placements", "API/frontend participant growth"],
  },
  p4: {
    title: "P4 deeper fill proof",
    proves: ["P4 fill behavior", "P4 payout presence", "wider registration tree", "placement visibility"],
  },
  "p12-line": {
    title: "P12 line payout proof",
    proves: ["P12 line 1 40%", "P12 line 2 50%", "system 10%", "eligible receiver routing"],
  },
  "p12-recycle": {
    title: "P12 cycle/recycle pressure proof",
    proves: ["P12 full-cycle pressure", "recycle routing through owner upline route", "payment must have placement"],
  },
  "p39-line": {
    title: "P39 line payout proof",
    proves: ["P39 line 1 20%", "P39 line 2 20%", "P39 line 3 50%", "system 10%"],
  },
  "p39-recycle": {
    title: "P39 cycle/recycle proof",
    proves: ["39-position cycle pressure", "P39 recycle route", "line split after recycle", "payment-placement match"],
  },
  "auto-upgrade": {
    title: "Auto-upgrade escrow proof",
    proves: ["locked escrow amounts", "target level activation only after full accumulation", "no false frontend activation"],
  },
  audit: {
    title: "Final audit",
    proves: ["chain/API comparison", "escrow state", "orbit summaries", "frontend checkpoint inputs"],
  },
  all: {
    title: "Full scripted sequence",
    proves: ["only for dry-run planning unless TEST_ALLOW_ALL_LIVE=true"],
  },
};

function accountNumber(label) {
  const match = String(label || "").trim().match(/^Account\s+(\d+)$/i);
  return match ? Number(match[1]) : 0;
}

function keyFilePath() {
  return path.resolve(
    process.cwd(),
    process.env.TEST_WALLET_KEYS_FILE || "../env-files/fresh-test-wallets.private.json"
  );
}

function normalizeKey(privateKey) {
  const value = String(privateKey || "").trim();
  if (!value || value.includes("PUT_PRIVATE_KEY")) return "";
  const key = value.startsWith("0x") ? value : `0x${value}`;
  if (!/^0x[0-9a-fA-F]{64}$/.test(key)) {
    throw new Error("Invalid private key format. Expected 32-byte hex.");
  }
  return key;
}

function readWallets() {
  const file = keyFilePath();
  if (!fs.existsSync(file)) throw new Error(`Missing private-key file: ${file}`);
  const raw = JSON.parse(fs.readFileSync(file, "utf8"));
  if (!Array.isArray(raw)) throw new Error("Private-key file must be a JSON array.");

  const wallets = new Map();
  const keys = new Map();

  for (const entry of raw) {
    const label = String(entry.label || "").trim();
    const address = String(entry.address || "").trim();
    const key = normalizeKey(entry.privateKey);
    if (!label || !ethers.isAddress(address) || !key) continue;

    const normalizedAddress = ethers.getAddress(address);
    const derived = ethers.getAddress(new ethers.Wallet(key).address);
    if (derived !== normalizedAddress) {
      throw new Error(`${label} private key resolves to ${derived}, expected ${normalizedAddress}`);
    }

    wallets.set(label, normalizedAddress);
    keys.set(label, key);
  }

  return {
    wallets: new Map([...wallets.entries()].sort((a, b) => accountNumber(a[0]) - accountNumber(b[0]))),
    keys,
  };
}

function requiredTreeLabelsForPhase(phase) {
  if (phase === "phase0" || phase === "audit" || phase === "auto-upgrade") return [];
  if (phase === "base" || phase === "p12-line" || phase === "p39-line") {
    return [...BASE_LABELS];
  }
  if (phase === "p4" || phase === "p12-recycle" || phase === "p39-recycle" || phase === "all") {
    return TREE.map(([label]) => label);
  }
  throw new Error(
    "Set TEST_PHASE to phase0, base, p4, p12-line, p12-recycle, p39-line, p39-recycle, auto-upgrade, audit, or all."
  );
}

function referrerAddress(referrer, wallets) {
  if (ethers.isAddress(referrer)) return ethers.getAddress(referrer);
  const address = wallets.get(referrer);
  if (!address) throw new Error(`Missing referrer wallet for ${referrer}`);
  return address;
}

function actionPlan(phase, wallets) {
  const actions = [];

  const addRegister = (labels) => {
    for (const [label, referrer] of TREE) {
      if (!labels.has(label)) continue;
      actions.push({
        kind: "register",
        label,
        address: wallets.get(label),
        referrerLabel: ethers.isAddress(referrer) ? "ID1" : referrer,
        referrer: referrerAddress(referrer, wallets),
      });
    }
  };

  const addLevel = (labels, level) => {
    for (const label of [...labels].sort((a, b) => accountNumber(a) - accountNumber(b))) {
      actions.push({ kind: "activate", label, address: wallets.get(label), level });
    }
  };

  if (phase === "phase0" || phase === "audit" || phase === "auto-upgrade") return actions;
  if (phase === "base") addRegister(BASE_LABELS);
  if (phase === "p4") addRegister(WIDER_LABELS);
  if (phase === "p12-line") addLevel(BASE_LABELS, 2);
  if (phase === "p12-recycle") addLevel(WIDER_LABELS, 2);
  if (phase === "p39-line") addLevel(BASE_LABELS, 3);
  if (phase === "p39-recycle") addLevel(WIDER_LABELS, 3);
  if (phase === "all") {
    addRegister(BASE_LABELS);
    addRegister(WIDER_LABELS);
    addLevel(BASE_LABELS, 2);
    addLevel(WIDER_LABELS, 2);
    addLevel(BASE_LABELS, 3);
    addLevel(WIDER_LABELS, 3);
  }

  return actions;
}

async function getContracts() {
  return {
    usdt: await ethers.getContractAt("MockUSDT", CONTRACTS.usdt),
    registration: await ethers.getContractAt("RegistrationFixed", CONTRACTS.registration),
    levelManager: await ethers.getContractAt("LevelManager", CONTRACTS.levelManager),
    escrow: await ethers.getContractAt("AutoUpgradeEscrow", CONTRACTS.escrow),
    p4: await ethers.getContractAt("P4Orbit", CONTRACTS.p4),
    p12: await ethers.getContractAt("P12Orbit", CONTRACTS.p12),
    p39: await ethers.getContractAt("P39Orbit", CONTRACTS.p39),
  };
}

async function validateFreshContractWiring(contracts) {
  const expected = {
    usdt: ethers.getAddress(CONTRACTS.usdt),
    registration: ethers.getAddress(CONTRACTS.registration),
    levelManager: ethers.getAddress(CONTRACTS.levelManager),
    escrow: ethers.getAddress(CONTRACTS.escrow),
    p4: ethers.getAddress(CONTRACTS.p4),
    p12: ethers.getAddress(CONTRACTS.p12),
    p39: ethers.getAddress(CONTRACTS.p39),
    id1: ethers.getAddress(ID1),
  };

  for (const [label, address] of Object.entries(expected)) {
    if (label === "id1") continue;
    const code = await ethers.provider.getCode(address);
    if (!code || code === "0x") {
      throw new Error(`${label} has no code at ${address}`);
    }
  }

  const checks = [
    ["registration.id1Wallet", await contracts.registration.id1Wallet(), expected.id1],
    ["registration.levelManager", await contracts.registration.levelManager(), expected.levelManager],
    ["levelManager.id1Wallet", await contracts.levelManager.id1Wallet(), expected.id1],
    ["levelManager.registration", await contracts.levelManager.registration(), expected.registration],
    ["levelManager.escrow", await contracts.levelManager.escrow(), expected.escrow],
    ["p4.levelManager", await contracts.p4.levelManager(), expected.levelManager],
    ["p12.levelManager", await contracts.p12.levelManager(), expected.levelManager],
    ["p39.levelManager", await contracts.p39.levelManager(), expected.levelManager],
    ["escrow.levelManager", await contracts.escrow.levelManager(), expected.levelManager],
  ];

  const failed = checks
    .map(([label, actual, want]) => [label, ethers.getAddress(actual), ethers.getAddress(want)])
    .filter(([, actual, want]) => actual !== want);

  if (failed.length) {
    throw new Error(
      `Fresh contract wiring failed: ${failed.map(([label, actual, want]) => `${label}=${actual}, expected ${want}`).join("; ")}`
    );
  }
}

async function isLevelActive(levelManager, user, level) {
  if (typeof levelManager.isLevelActive === "function") return levelManager.isLevelActive(user, level);
  return levelManager.userLevelActivated(user, level);
}

async function readOrbit(contract, owner, level) {
  const orbit = await contract.getUserOrbit(owner, level);
  return {
    current: Number(orbit.currentPosition ?? orbit[0]),
    line1: Number(orbit.positionsInLine1 ?? orbit[3]),
    line2: Number(orbit.positionsInLine2 ?? orbit[4]),
    line3: Number(orbit.positionsInLine3 ?? orbit[5]),
    cycles: Number(orbit.totalCycles ?? orbit[6]),
    earned: ethers.formatUnits(orbit.totalEarned ?? orbit[7] ?? 0n, 6),
    escrow: ethers.formatUnits(orbit.escrowBalance ?? orbit[1] ?? 0n, 6),
    autoCompleted: Boolean(orbit.autoUpgradeCompleted ?? orbit[2]),
  };
}

async function readAccountState(label, address, contracts) {
  const [registered, l2, l3, p4, p12, p39, l1to2, l2to3, l3to4] = await Promise.all([
    contracts.registration.isRegistered(address),
    isLevelActive(contracts.levelManager, address, 2),
    isLevelActive(contracts.levelManager, address, 3),
    readOrbit(contracts.p4, address, 1),
    readOrbit(contracts.p12, address, 2),
    readOrbit(contracts.p39, address, 3),
    contracts.escrow.getLockedAmount(address, 1, 2),
    contracts.escrow.getLockedAmount(address, 2, 3),
    contracts.escrow.getLockedAmount(address, 3, 4),
  ]);

  return {
    label,
    address,
    registered,
    l2,
    l3,
    p4,
    p12,
    p39,
    escrow: {
      "1->2": ethers.formatUnits(l1to2, 6),
      "2->3": ethers.formatUnits(l2to3, 6),
      "3->4": ethers.formatUnits(l3to4, 6),
    },
  };
}

async function fetchJson(url) {
  if (process.env.TEST_SKIP_API === "true") return null;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), Number(process.env.TEST_API_TIMEOUT_MS || 15000));
  try {
    const response = await fetch(url, { signal: controller.signal });
    return await response.json();
  } catch (error) {
    return { ok: false, error: error.message, url };
  } finally {
    clearTimeout(timer);
  }
}

async function printAudit(label, wallets, contracts) {
  const latestBlock = await ethers.provider.getBlockNumber();
  const [registeredCount, totalParticipants] = await Promise.all([
    contracts.registration.registeredCount(),
    contracts.registration.totalParticipants(),
  ]);

  console.log(`\n=== ${label} CHAIN AUDIT ===`);
  console.log("block:", latestBlock);
  console.log("registeredCount:", registeredCount.toString());
  console.log("totalParticipants:", totalParticipants.toString());

  const focusLabels = [
    "Account 8",
    "Account 9",
    "Account 10",
    "Account 11",
    "Account 13",
    "Account 16",
    "Account 19",
    "Account 25",
    "Account 34",
    "Account 43",
    "Account 51",
  ].filter((item) => wallets.has(item));

  for (const focus of focusLabels) {
    const state = await readAccountState(focus, wallets.get(focus), contracts);
    console.log(
      `${state.label} ${state.address} registered=${state.registered} L2=${state.l2} L3=${state.l3} ` +
        `P4(current=${state.p4.current},cycles=${state.p4.cycles},L1=${state.p4.line1}) ` +
        `P12(current=${state.p12.current},cycles=${state.p12.cycles},L1=${state.p12.line1},L2=${state.p12.line2},earned=${state.p12.earned}) ` +
        `P39(current=${state.p39.current},cycles=${state.p39.cycles},L1=${state.p39.line1},L2=${state.p39.line2},L3=${state.p39.line3},earned=${state.p39.earned}) ` +
        `escrow=${JSON.stringify(state.escrow)}`
    );
  }

  const summary = await fetchJson(`${API_BASE}/api/community/summary`);
  if (summary) {
    const publicData = summary?.data?.public || {};
    console.log(`\n=== ${label} API SUMMARY ===`);
    console.log(
      JSON.stringify(
        {
          ok: summary.ok,
          totalParticipants: publicData.totalParticipants,
          totalGeneratedVolume: publicData.totalGeneratedVolume,
          walletCreditedLiquid: publicData.walletCreditedLiquid,
          currentEscrowLocked: publicData.currentEscrowLocked,
          receiptEscrowLocked: publicData.receiptEscrowLocked,
          recycleAllocated: publicData.recycleAllocated,
          recyclePaidLiquid: publicData.recyclePaidLiquid,
          recycleEscrowLocked: publicData.recycleEscrowLocked,
          paidActivationCount: publicData.paidActivationCount,
        },
        null,
        2
      )
    );
  }
}

function makeInterfaces() {
  return [
    "RegistrationFixed",
    "LevelManager",
    "LevelSettlementRouter",
    "P4Orbit",
    "P12Orbit",
    "P39Orbit",
    "AutoUpgradeEscrow",
    "MockUSDT",
  ].map((name) => {
    try {
      return new ethers.Interface(hre.artifacts.readArtifactSync(name).abi);
    } catch (_) {
      return null;
    }
  }).filter(Boolean);
}

function printReceiptEvents(receipt, interfaces) {
  console.log(`confirmed block=${receipt.blockNumber} gasUsed=${receipt.gasUsed.toString()}`);
  const decoded = [];
  for (const log of receipt.logs) {
    for (const iface of interfaces) {
      try {
        const parsed = iface.parseLog(log);
        if (parsed) {
          decoded.push(parsed.name);
          break;
        }
      } catch (_) {
        // Try the next interface.
      }
    }
  }
  console.log("events:", decoded.length ? decoded.join(", ") : "none decoded");
}

async function approveIfNeeded(usdt, wallet, spender, amount) {
  const allowance = await usdt.allowance(wallet.address, spender);
  if (allowance >= amount) return;
  const tx = await usdt.connect(wallet).approve(spender, ethers.MaxUint256);
  console.log(`${wallet.label} approve: ${tx.hash}`);
  await tx.wait();
}

async function executeAction(action, signerByLabel, contracts, interfaces) {
  const wallet = signerByLabel.get(action.label);
  if (!wallet) throw new Error(`No signer for ${action.label}`);

  if (action.kind === "register") {
    const registered = await contracts.registration.isRegistered(action.address);
    if (registered) {
      console.log(`${action.label} already registered; skip`);
      return null;
    }
    await approveIfNeeded(contracts.usdt, wallet, CONTRACTS.levelManager, LEVEL_PRICE[1]);
    const tx = await contracts.registration.connect(wallet).register(action.referrer);
    console.log(`${action.label} register under ${action.referrerLabel}: ${tx.hash}`);
    const receipt = await tx.wait();
    printReceiptEvents(receipt, interfaces);
    return receipt;
  }

  if (action.kind === "activate") {
    const active = await isLevelActive(contracts.levelManager, action.address, action.level);
    if (active) {
      console.log(`${action.label} level ${action.level} already active; skip`);
      return null;
    }
    await approveIfNeeded(contracts.usdt, wallet, CONTRACTS.levelManager, LEVEL_PRICE[action.level]);
    const tx = await contracts.registration.connect(wallet).activateLevel(action.level);
    console.log(`${action.label} activate L${action.level}: ${tx.hash}`);
    const receipt = await tx.wait();
    printReceiptEvents(receipt, interfaces);
    return receipt;
  }

  throw new Error(`Unsupported action: ${action.kind}`);
}

async function validatePreflight(actions, wallets, keys, contracts) {
  const required = [...new Set(actions.map((action) => action.label))];
  const missingWallets = required.filter((label) => !wallets.has(label));
  const missingKeys = required.filter((label) => !keys.has(label));
  if (missingWallets.length) throw new Error(`Missing wallet addresses: ${missingWallets.join(", ")}`);
  if (missingKeys.length) throw new Error(`Missing private keys: ${missingKeys.join(", ")}`);

  const usdtDecimals = await contracts.usdt.decimals();
  const low = [];
  for (const label of required) {
    const address = wallets.get(label);
    const [usdtBalance, polBalance] = await Promise.all([
      contracts.usdt.balanceOf(address),
      ethers.provider.getBalance(address),
    ]);
    const neededUsdt = actions.some((action) => action.label === label && action.kind === "activate" && action.level === 3)
      ? LEVEL_PRICE[1] + LEVEL_PRICE[2] + LEVEL_PRICE[3]
      : LEVEL_PRICE[1] + LEVEL_PRICE[2];

    if (usdtBalance < neededUsdt) {
      low.push(`${label} low USDT ${ethers.formatUnits(usdtBalance, usdtDecimals)}`);
    }
    if (polBalance < ethers.parseEther("0.05")) {
      low.push(`${label} low POL ${ethers.formatEther(polBalance)}`);
    }
  }
  if (low.length) throw new Error(`Funding preflight failed: ${low.join("; ")}`);
}

async function validatePhasePreconditions(phase, wallets, contracts) {
  const labels = {
    base: [...BASE_LABELS],
    wider: [...WIDER_LABELS],
    tree: TREE.map(([label]) => label),
  };

  const registered = async (label) => contracts.registration.isRegistered(wallets.get(label));
  const active = async (label, level) => isLevelActive(contracts.levelManager, wallets.get(label), level);
  const requireRegistered = async (phaseName, items) => {
    const missing = [];
    for (const label of items) {
      if (!(await registered(label))) missing.push(label);
    }
    if (missing.length) throw new Error(`${phaseName} requires registered wallets first: ${missing.join(", ")}`);
  };
  const requireInactive = async (phaseName, items) => {
    const already = [];
    for (const label of items) {
      if (await registered(label)) already.push(label);
    }
    if (already.length) throw new Error(`${phaseName} expected unregistered wallets but found: ${already.join(", ")}`);
  };
  const requireLevel = async (phaseName, items, level) => {
    const missing = [];
    for (const label of items) {
      if (!(await active(label, level))) missing.push(label);
    }
    if (missing.length) throw new Error(`${phaseName} requires level ${level} active first: ${missing.join(", ")}`);
  };

  if (phase === "phase0") {
    const [registeredCount, totalParticipants] = await Promise.all([
      contracts.registration.registeredCount(),
      contracts.registration.totalParticipants(),
    ]);
    if (registeredCount !== 0n || totalParticipants !== 1n) {
      throw new Error(`phase0 expected clean state, got registeredCount=${registeredCount} totalParticipants=${totalParticipants}`);
    }
    await requireInactive("phase0", labels.tree);
  }

  if (phase === "base") {
    await requireInactive("base", labels.base);
  }

  if (phase === "p4") {
    await requireRegistered("p4", labels.base);
    await requireInactive("p4", labels.wider);
  }

  if (phase === "p12-line") {
    await requireRegistered("p12-line", labels.base);
  }

  if (phase === "p12-recycle") {
    await requireRegistered("p12-recycle", labels.tree);
    await requireLevel("p12-recycle", labels.base, 2);
  }

  if (phase === "p39-line") {
    await requireRegistered("p39-line", labels.base);
    await requireLevel("p39-line", labels.base, 2);
  }

  if (phase === "p39-recycle") {
    await requireRegistered("p39-recycle", labels.tree);
    await requireLevel("p39-recycle", labels.tree, 2);
    await requireLevel("p39-recycle", labels.base, 3);
  }
}

function printPlan(phase, actions, wallets) {
  const info = PHASES[phase];
  console.log("Network:", hre.network.name);
  console.log("Phase:", phase);
  if (info) {
    console.log("Title:", info.title);
    console.log("Proves:", info.proves.join(" | "));
  }
  console.log("Actions:", actions.length);
  console.log("ID1:", ID1);
  console.log("Contracts:", CONTRACTS);
  console.log("\nTree:");
  for (const [label, referrer] of TREE) {
    if (!wallets.has(label)) continue;
    const parent = ethers.isAddress(referrer) ? "ID1" : referrer;
    console.log(`${label} ${wallets.get(label)} <- ${parent}`);
  }
  console.log("\nActions:");
  for (const [index, action] of actions.entries()) {
    const extra = action.kind === "activate" ? ` L${action.level}` : ` under ${action.referrerLabel}`;
    console.log(`${index + 1}. ${action.label} ${action.kind}${extra}`);
  }
}

async function main() {
  const phase = String(process.env.TEST_PHASE || "phase0").toLowerCase();
  const dryRun = String(process.env.TEST_DRY_RUN || "true").toLowerCase() !== "false";
  const maxActions = Number(process.env.TEST_MAX_ACTIONS || "0");
  const delayMs = Number(process.env.TEST_ACTION_DELAY_MS || "0");
  const allowAllLive = String(process.env.TEST_ALLOW_ALL_LIVE || "false").toLowerCase() === "true";

  const network = await ethers.provider.getNetwork();
  if (network.chainId !== 80002n) {
    throw new Error(`Refusing to run outside Amoy. chainId=${network.chainId}`);
  }
  if (!PHASES[phase]) {
    throw new Error(`Unknown phase: ${phase}. Valid phases: ${Object.keys(PHASES).join(", ")}`);
  }
  if (phase === "all" && !dryRun && !allowAllLive) {
    throw new Error("Refusing live TEST_PHASE=all. Set TEST_ALLOW_ALL_LIVE=true only after every individual phase has passed.");
  }

  const { wallets, keys } = readWallets();
  const requiredLabels = requiredTreeLabelsForPhase(phase);
  const missing = requiredLabels.filter((label) => !wallets.has(label));
  if (missing.length) throw new Error(`Private-key file missing required labels: ${missing.join(", ")}`);

  const contracts = await getContracts();
  let actions = actionPlan(phase, wallets);
  if (maxActions > 0) actions = actions.slice(0, maxActions);

  await validateFreshContractWiring(contracts);
  await validatePhasePreconditions(phase, wallets, contracts);
  printPlan(phase, actions, wallets);
  await validatePreflight(actions, wallets, keys, contracts);
  await printAudit("BEFORE", wallets, contracts);

  console.log("\nDry run:", dryRun);
  if (dryRun || actions.length === 0) {
    console.log("No transactions sent.");
    return;
  }

  const signerByLabel = new Map();
  for (const [label, address] of wallets.entries()) {
    if (!keys.has(label)) continue;
    const wallet = new ethers.Wallet(keys.get(label), ethers.provider);
    wallet.label = label;
    wallet.expectedAddress = address;
    signerByLabel.set(label, wallet);
  }

  const interfaces = makeInterfaces();
  for (const [index, action] of actions.entries()) {
    console.log(`\nACTION ${index + 1}/${actions.length}`);
    await executeAction(action, signerByLabel, contracts, interfaces);
    if (delayMs > 0 && index < actions.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  await printAudit("AFTER", wallets, contracts);
  console.log("\nPHASE COMPLETE");
  console.log("Now inspect the frontend before running the next phase.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

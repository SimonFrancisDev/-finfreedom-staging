const fs = require("fs");
const path = require("path");
const hre = require("hardhat");
const { ethers } = hre;

const CONTRACTS = {
  usdt: "0x7b7E39f3D177B3356368431C5C285bca58b43A60",
  registration: "0x80c0663c1f1C1772b5dE08c9FfdABA553Ab81a4d",
  levelManager: "0xD95474915b3BbFf19929F2D2cE6f32882EF45A0B",
  p39: "0xc603E7123aa2C391C92d9325311c7b9D49256581",
};

const TARGET = {
  label: "Account 9",
  address: "0x3B7651dF08915f740a7eB079690327c4E8cCD3F0",
};

const MIRROR_PARENT = {
  label: "Account 13",
  address: "0xC1E95C22503871D23A6149280dd1A9Ca1CE8FA99",
};

const DIRECT_LABELS = Array.from({ length: 24 }, (_, i) => `Account ${52 + i}`);
const MIRROR_LABELS = Array.from({ length: 6 }, (_, i) => `Account ${76 + i}`);
const LEVEL_PRICE = {
  1: ethers.parseUnits("10", 6),
  2: ethers.parseUnits("20", 6),
  3: ethers.parseUnits("40", 6),
};

function keyPath() {
  return path.resolve(process.cwd(), "../env-files/fresh-test-wallets.private.json");
}

function normalizeKey(value) {
  const raw = String(value || "").trim();
  return raw.startsWith("0x") ? raw : `0x${raw}`;
}

function loadWalletRows() {
  const raw = JSON.parse(fs.readFileSync(keyPath(), "utf8"));
  const byLabel = new Map();
  for (const row of raw) {
    const label = String(row.label || "").trim();
    const address = String(row.address || "").trim();
    const privateKey = normalizeKey(row.privateKey);
    if (!label || !ethers.isAddress(address) || !/^0x[0-9a-fA-F]{64}$/.test(privateKey)) continue;
    const wallet = new ethers.Wallet(privateKey);
    if (ethers.getAddress(wallet.address) !== ethers.getAddress(address)) {
      throw new Error(`${label} private key/address mismatch`);
    }
    byLabel.set(label, { label, address: ethers.getAddress(address), privateKey });
  }
  return byLabel;
}

function amount(value) {
  return ethers.formatUnits(value || 0n, 6);
}

async function orbitState(p39, owner = TARGET.address) {
  const orbit = await p39.getUserOrbit(owner, 3);
  return {
    current: Number(orbit.currentPosition ?? orbit[0]),
    line1: Number(orbit.positionsInLine1 ?? orbit[3]),
    line2: Number(orbit.positionsInLine2 ?? orbit[4]),
    line3: Number(orbit.positionsInLine3 ?? orbit[5]),
    cycles: Number(orbit.totalCycles ?? orbit[6]),
    earned: amount(orbit.totalEarned ?? orbit[7]),
  };
}

function makeInterfaces() {
  return ["RegistrationFixed", "LevelManager", "LevelSettlementRouter", "P39Orbit", "MockUSDT"].map((name) => {
    try {
      return new ethers.Interface(hre.artifacts.readArtifactSync(name).abi);
    } catch (_) {
      return null;
    }
  }).filter(Boolean);
}

function decodeReceipt(receipt, interfaces) {
  const decoded = [];
  for (const log of receipt.logs) {
    for (const iface of interfaces) {
      try {
        const parsed = iface.parseLog(log);
        decoded.push({ address: log.address, name: parsed.name, args: parsed.args });
        break;
      } catch (_) {}
    }
  }
  return decoded;
}

async function approveIfNeeded(usdt, wallet, spender, amount) {
  const allowance = await usdt.allowance(wallet.address, spender);
  if (allowance >= amount) return null;
  const tx = await usdt.connect(wallet).approve(spender, ethers.MaxUint256);
  await tx.wait();
  return tx.hash;
}

async function ensureRegistered(row, referrer, contracts, wallet) {
  if (await contracts.registration.isRegistered(row.address)) return { skipped: true };
  await approveIfNeeded(contracts.usdt, wallet, CONTRACTS.levelManager, LEVEL_PRICE[1]);
  const tx = await contracts.registration.connect(wallet).register(referrer);
  const receipt = await tx.wait();
  return { tx: tx.hash, receipt };
}

async function ensureLevel(row, level, contracts, wallet) {
  if (await contracts.levelManager.userLevelActivated(row.address, level)) return { skipped: true };
  await approveIfNeeded(contracts.usdt, wallet, CONTRACTS.levelManager, LEVEL_PRICE[level]);
  const tx = await contracts.registration.connect(wallet).activateLevel(level);
  const receipt = await tx.wait();
  return { tx: tx.hash, receipt };
}

async function validatePreflight(rows, contracts) {
  const issues = [];
  for (const row of rows) {
    const [registered, usdtBalance, polBalance] = await Promise.all([
      contracts.registration.isRegistered(row.address),
      contracts.usdt.balanceOf(row.address),
      ethers.provider.getBalance(row.address),
    ]);
    if (registered) issues.push(`${row.label} already registered`);
    if (usdtBalance < ethers.parseUnits("70", 6)) issues.push(`${row.label} low USDT ${amount(usdtBalance)}`);
    if (polBalance < ethers.parseEther("0.05")) issues.push(`${row.label} low POL ${ethers.formatEther(polBalance)}`);
  }
  if (issues.length) throw new Error(`Preflight failed:\n${issues.join("\n")}`);
}

async function main() {
  const dryRun = String(process.env.TEST_DRY_RUN || "true").toLowerCase() !== "false";
  const network = await ethers.provider.getNetwork();
  if (network.chainId !== 80002n) throw new Error(`Refusing outside Amoy. chainId=${network.chainId}`);

  const rows = loadWalletRows();
  const required = [...DIRECT_LABELS, ...MIRROR_LABELS];
  const missing = required.filter((label) => !rows.has(label));
  if (missing.length) throw new Error(`Missing wallet rows: ${missing.join(", ")}`);

  const contracts = {
    usdt: await ethers.getContractAt("MockUSDT", CONTRACTS.usdt),
    registration: await ethers.getContractAt("RegistrationFixed", CONTRACTS.registration),
    levelManager: await ethers.getContractAt("LevelManager", CONTRACTS.levelManager),
    p39: await ethers.getContractAt("P39Orbit", CONTRACTS.p39),
  };

  const targetActive = await contracts.levelManager.userLevelActivated(TARGET.address, 3);
  const mirrorParentActive = await contracts.levelManager.userLevelActivated(MIRROR_PARENT.address, 3);
  if (!targetActive) throw new Error("Account 9 is not Level 3 active");
  if (!mirrorParentActive) throw new Error("Account 13 is not Level 3 active");

  const selectedRows = required.map((label) => rows.get(label));
  await validatePreflight(selectedRows, contracts);

  console.log("Focused P39 recycle test");
  console.log("Target:", `${TARGET.label} ${TARGET.address}`);
  console.log("Direct arrivals under target:", DIRECT_LABELS.length, DIRECT_LABELS.join(", "));
  console.log("Mirror-edge arrivals under Account 13:", MIRROR_LABELS.length, MIRROR_LABELS.join(", "));
  console.log("Before target P39:", await orbitState(contracts.p39));
  console.log("Dry run:", dryRun);
  if (dryRun) return;

  const interfaces = makeInterfaces();
  const recycleEvents = [];
  const targetPositionEvents = [];

  for (const label of required) {
    const row = rows.get(label);
    const referrer = DIRECT_LABELS.includes(label) ? TARGET.address : MIRROR_PARENT.address;
    const referrerLabel = DIRECT_LABELS.includes(label) ? TARGET.label : MIRROR_PARENT.label;
    const wallet = new ethers.Wallet(row.privateKey, ethers.provider);
    console.log(`\n${label}: register under ${referrerLabel}, activate L2, activate L3`);

    const registerResult = await ensureRegistered(row, referrer, contracts, wallet);
    if (registerResult.skipped) console.log("  register skipped");
    else console.log(`  register tx=${registerResult.tx}`);

    const l2 = await ensureLevel(row, 2, contracts, wallet);
    if (l2.skipped) console.log("  L2 skipped");
    else console.log(`  L2 tx=${l2.tx}`);

    const l3 = await ensureLevel(row, 3, contracts, wallet);
    if (l3.skipped) {
      console.log("  L3 skipped");
    } else {
      console.log(`  L3 tx=${l3.tx}`);
      const decoded = decodeReceipt(l3.receipt, interfaces);
      for (const event of decoded) {
        if (event.name === "RecycleCompletedDetailed") recycleEvents.push({ tx: l3.tx, args: event.args });
        if (
          event.name === "PositionFilled" &&
          event.address.toLowerCase() === CONTRACTS.p39.toLowerCase() &&
          ethers.getAddress(event.args.orbitOwner) === ethers.getAddress(TARGET.address)
        ) {
          targetPositionEvents.push({
            tx: l3.tx,
            user: ethers.getAddress(event.args.user),
            position: Number(event.args.position),
            amount: amount(event.args.amount),
          });
        }
      }
    }

    console.log("  target P39:", await orbitState(contracts.p39));
  }

  console.log("\nTarget Account 9 P39 PositionFilled events in this run:");
  for (const event of targetPositionEvents) {
    console.log(`tx=${event.tx} user=${event.user} position=${event.position} amount=${event.amount}`);
  }

  console.log("\nRecycleCompletedDetailed events:");
  if (!recycleEvents.length) console.log("none");
  for (const event of recycleEvents) {
    const a = event.args;
    console.log(
      `tx=${event.tx} orbitOwner=${a.orbitOwner} sourceUser=${a.sourceUser} receiver=${a.recycleReceiver} gross=${amount(a.recycleGross)} liquid=${amount(a.recycleLiquidPaid)} escrow=${amount(a.recycleEscrowLocked)} mirrorPosition=${a.mirrorPosition} mirrorCycle=${a.mirrorCycle}`
    );
  }

  console.log("\nAfter target P39:", await orbitState(contracts.p39));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

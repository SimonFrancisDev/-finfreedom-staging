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

const CONTRACTS = {
  usdt: process.env.USDT_ADDRESS || DEFAULT_CONTRACTS.usdt,
  registration: process.env.REGISTRATION_ADDRESS || DEFAULT_CONTRACTS.registration,
  levelManager: process.env.LEVEL_MANAGER_ADDRESS || DEFAULT_CONTRACTS.levelManager,
  escrow: process.env.ESCROW_ADDRESS || DEFAULT_CONTRACTS.escrow,
};

const ACCOUNT_2 = process.env.TEST_REFERRER_ACCOUNT_2 || "0x296238e950ef0066D2119230Bf0eb3aDEBc94882";

const TEST_WALLETS = [
  ["Account 8", "0x8844a10391801d5b1a4273588F8c6bF1DFE06E36"],
  ["Account 9", "0x3B7651dF08915f740a7eB079690327c4E8cCD3F0"],
  ["Account 10", "0x48F0356220E2220d5aB9ba9de83EA993A510e7CF"],
  ["Account 11", "0xC9f74323878edF59eB60c3713B938dE298C962eF"],
  ["Account 12", "0x998be76968Fe24fFf8f59D93EeE3fE49653781BB"],
  ["Account 13", "0xC1E95C22503871D23A6149280dd1A9Ca1CE8FA99"],
  ["Account 14", "0x86f8010A988AF0d6ffB79f59FdE372b350e744F9"],
  ["Account 15", "0x9Dfa0839EC4843db035d60141B2168a718cC2B74"],
  ["Account 16", "0xF3cC607185Aba21E476C124b15e59663BB7D8cA3"],
  ["Account 17", "0x9DB58586cc6FA287Fa9eA37c60C94372FF6B02f6"],
  ["Account 18", "0xa6aF0D0Ac4CBE9f5bBa569E8a560bb67129A990E"],
  ["Account 19", "0x1d0ffCF85A4f726a64CA860188C140d2f9Ba36D6"],
  ["Account 20", "0x5E5aC608C7F49DA450D332594dB8171CfA8C84F6"],
  ["Account 21", "0x1aBcE5B912B4452D9FB09DBA4175275Aa8Fb3558"],
  ["Account 22", "0xC47ff153e0D4269b46bEe0Ad3f5ACf4185dddf1A"],
  ["Account 23", "0x14D8682e2b47dA8132A4Cd1568AfeD3ef68Da261"],
  ["Account 24", "0xDa82a7480c476F5Ca05C7bc4f0C694564b480087"],
  ["Account 25", "0x02E54356BAA19a1108931338c784DC4874101c9F"],
  ["Account 26", "0xB21Ba397c47a864FB169871825E8f7c917e65544"],
  ["Account 27", "0x882d178ACa5a3B798214ca2dAD0043dAa9Df1518"],
  ["Account 28", "0x4174E35d87d775D20bfF6df09311a0D3eDc7940e"],
  ["Account 29", "0xE2832Cb339B3381dCdB3DBf409a5e3f55cf27F9d"],
  ["Account 30", "0x69907AF03135c2659f282b694c5B98F403b2fBc0"],
  ["Account 31", "0x8EF83F33747b9B26bD41A06FaBcDC86821227546"],
  ["Account 32", "0x8B76Ff1ca69B91037Ac27a277fE0B374C3afb406"],
  ["Account 33", "0x8a671D17694619843769104e39deaDe2D710e4C8"],
  ["Account 34", "0xA449ffB5b67292f474Dee8d15a6242895E354C8D"],
  ["Account 35", "0xE4445b6820E8461e3437fFc2156c1e2B4b2CEe63"],
  ["Account 36", "0x23f75e81Ee1E6ad54504f71481135cCD59977188"],
  ["Account 37", "0xB862AF9D4F6C53cB959EEF314B1d494A44C3530c"],
  ["Account 38", "0xc6dF47fc84bbafa288B5b7aB45D207EfA1b76c0d"],
  ["Account 39", "0xE381Fdb68314DB956960e56501B1c1336986a992"],
  ["Account 40", "0x384f80f28543259E1EC1dC8265Cca80A49d24312"],
  ["Account 41", "0xca8fFf69932287CC3bC81bc16302A088b6d4061d"],
  ["Account 42", "0x5CFcd5348e40e8CA2589b2Ff9f095DB884894f7a"],
];

const LEVEL_PRICE = {
  1: ethers.parseUnits("10", 6),
  2: ethers.parseUnits("20", 6),
  3: ethers.parseUnits("40", 6),
};

const ORBITS = {
  p4: process.env.P4_ORBIT_ADDRESS || DEFAULT_CONTRACTS.p4,
  p12: process.env.P12_ORBIT_ADDRESS || DEFAULT_CONTRACTS.p12,
  p39: process.env.P39_ORBIT_ADDRESS || DEFAULT_CONTRACTS.p39,
};

function keyFilePath() {
  return path.resolve(
    process.cwd(),
    process.env.TEST_WALLET_KEYS_FILE || "../env-files/fresh-test-wallets.private.json"
  );
}

function readKeyEntries() {
  const file = keyFilePath();
  if (!fs.existsSync(file)) {
    throw new Error(`Missing private-key file: ${file}`);
  }
  const raw = JSON.parse(fs.readFileSync(file, "utf8"));
  if (!Array.isArray(raw)) {
    throw new Error("Private-key file must be a JSON array.");
  }
  return raw;
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

function planForPhase(phase) {
  const wallets = TEST_WALLETS.map(([label, address]) => ({ label, address }));
  if (phase === "auto") {
    return wallets.slice(0, 2).flatMap((wallet) => [
      { ...wallet, action: "register", referrer: ACCOUNT_2 },
      { ...wallet, action: "activate", level: 2 },
      { ...wallet, action: "activate", level: 3 },
    ]);
  }
  if (phase === "p12") {
    return wallets.slice(2, 8).flatMap((wallet) => [
      { ...wallet, action: "register", referrer: ACCOUNT_2 },
      { ...wallet, action: "activate", level: 2 },
    ]);
  }
  if (phase === "p39") {
    return wallets.slice(2, 20).flatMap((wallet) => [
      { ...wallet, action: "ensureRegistered", referrer: ACCOUNT_2 },
      { ...wallet, action: "ensureLevel", level: 2 },
      { ...wallet, action: "activate", level: 3 },
    ]);
  }
  if (phase === "grand") {
    // Current fresh staging state after Accounts 1-9:
    // - Account 2 P12 is around position 8, so Accounts 10-14 complete the first P12 cycle.
    // - Account 2 P39 is around position 8, so Accounts 10-41 complete the first P39 cycle.
    // The ensure* actions make the runner resumable if it stops mid-way.
    return wallets.slice(2, 34).flatMap((wallet) => [
      { ...wallet, action: "ensureRegistered", referrer: ACCOUNT_2 },
      { ...wallet, action: "ensureLevel", level: 2 },
      { ...wallet, action: "ensureLevel", level: 3 },
    ]);
  }
  if (phase === "all") {
    return [...planForPhase("auto"), ...planForPhase("p12"), ...planForPhase("p39")];
  }
  throw new Error("Set TEST_PHASE to auto, p12, p39, grand, or all.");
}

async function waitFor(label, txPromise) {
  const tx = await txPromise;
  console.log(`${label}: ${tx.hash}`);
  const receipt = await tx.wait();
  console.log(`${label} confirmed in block ${receipt.blockNumber}`);
  return receipt;
}

async function approveIfNeeded(usdt, wallet, spender, amount) {
  const allowance = await usdt.allowance(wallet.address, spender);
  if (allowance >= amount) return;
  await waitFor(
    `${wallet.label} approve LevelManager USDT`,
    usdt.connect(wallet).approve(spender, ethers.MaxUint256)
  );
}

async function isLevelActive(levelManager, user, level) {
  if (typeof levelManager.isLevelActive === "function") {
    return levelManager.isLevelActive(user, level);
  }
  return levelManager.userLevelActivated(user, level);
}

async function readOrbitSummary(contract, owner, level) {
  const orbit = await contract.getUserOrbit(owner, level);
  return {
    currentPosition: Number(orbit.currentPosition ?? orbit[0]),
    escrowBalance: orbit.escrowBalance ?? orbit[1],
    autoUpgradeCompleted: Boolean(orbit.autoUpgradeCompleted ?? orbit[2]),
    positionsInLine1: Number(orbit.positionsInLine1 ?? orbit[3]),
    positionsInLine2: Number(orbit.positionsInLine2 ?? orbit[4]),
    positionsInLine3: Number(orbit.positionsInLine3 ?? orbit[5]),
    totalCycles: Number(orbit.totalCycles ?? orbit[6]),
    totalEarned: orbit.totalEarned ?? orbit[7],
  };
}

async function readGrandState({ registration, levelManager, escrow, p12, p39 }) {
  const account1 = "0x884e48f9897E8633238747b608DD49dE12bF94df";
  const account2 = ACCOUNT_2;
  const account1Level4 = await isLevelActive(levelManager, account1, 4);
  const account2Level4 = await isLevelActive(levelManager, account2, 4);
  const account1L3ToL4 = await escrow.getLockedAmount(account1, 3, 4);
  const account2L3ToL4 = await escrow.getLockedAmount(account2, 3, 4);
  const p12Account2 = await readOrbitSummary(p12, account2, 2);
  const p39Account2 = await readOrbitSummary(p39, account2, 3);
  const p39Account1 = await readOrbitSummary(p39, account1, 3);

  return {
    totalRegisteredProbe: await Promise.all(
      TEST_WALLETS.map(async ([, address]) => registration.isRegistered(address))
    ).then((items) => items.filter(Boolean).length),
    account1Level4,
    account2Level4,
    account1L3ToL4,
    account2L3ToL4,
    p12Account2,
    p39Account2,
    p39Account1,
  };
}

function printGrandState(label, state) {
  console.log(`\n${label}`);
  console.log(`registered test wallets: ${state.totalRegisteredProbe}`);
  console.log(`Account 1 L4 active: ${state.account1Level4}, L3->L4 locked: ${ethers.formatUnits(state.account1L3ToL4, 6)}`);
  console.log(`Account 2 L4 active: ${state.account2Level4}, L3->L4 locked: ${ethers.formatUnits(state.account2L3ToL4, 6)}`);
  console.log(
    `Account 2 P12 L2: current=${state.p12Account2.currentPosition}, cycles=${state.p12Account2.totalCycles}, line1=${state.p12Account2.positionsInLine1}, line2=${state.p12Account2.positionsInLine2}, autoCompleted=${state.p12Account2.autoUpgradeCompleted}`
  );
  console.log(
    `Account 2 P39 L3: current=${state.p39Account2.currentPosition}, cycles=${state.p39Account2.totalCycles}, line1=${state.p39Account2.positionsInLine1}, line2=${state.p39Account2.positionsInLine2}, line3=${state.p39Account2.positionsInLine3}, autoCompleted=${state.p39Account2.autoUpgradeCompleted}`
  );
  console.log(
    `Account 1 P39 L3: current=${state.p39Account1.currentPosition}, cycles=${state.p39Account1.totalCycles}, line1=${state.p39Account1.positionsInLine1}, line2=${state.p39Account1.positionsInLine2}, line3=${state.p39Account1.positionsInLine3}, autoCompleted=${state.p39Account1.autoUpgradeCompleted}`
  );
}

function printGrandVerdict(before, after) {
  const autoPassed = after.account1Level4 || after.account2Level4 || after.p12Account2.autoUpgradeCompleted || after.p39Account2.autoUpgradeCompleted;
  const p12RecycleMoved = after.p12Account2.totalCycles > before.p12Account2.totalCycles || after.p12Account2.currentPosition < before.p12Account2.currentPosition;
  const p39RecycleMoved = after.p39Account2.totalCycles > before.p39Account2.totalCycles || after.p39Account2.currentPosition < before.p39Account2.currentPosition;

  console.log("\nGRAND TEST VERDICT");
  console.log(`Auto-upgrade proof: ${autoPassed ? "PASS" : "NEEDS REVIEW"}`);
  console.log(`P12 recycle completion proof: ${p12RecycleMoved ? "PASS" : "NEEDS MORE FILLS"}`);
  console.log(`P39 recycle completion proof: ${p39RecycleMoved ? "PASS" : "NEEDS MORE FILLS"}`);
  console.log("Use the printed transaction hashes plus this before/after state as the audit trail.");
}

async function main() {
  const phase = String(process.env.TEST_PHASE || "auto").toLowerCase();
  const dryRun = String(process.env.TEST_DRY_RUN || "false").toLowerCase() === "true";
  const actions = planForPhase(phase);
  console.log("Network:", hre.network.name);
  console.log("Phase:", phase);
  console.log("Dry run:", dryRun);
  console.log("Actions:", actions.length);
  for (const [index, action] of actions.entries()) {
    console.log(`${index + 1}. ${action.label} ${action.action}${action.level ? ` L${action.level}` : ""}`);
  }
  if (dryRun) return;

  const expected = new Map(TEST_WALLETS.map(([label, address]) => [label, ethers.getAddress(address)]));
  const keys = new Map();

  for (const entry of readKeyEntries()) {
    const label = String(entry.label || "").trim();
    if (!expected.has(label)) continue;
    const key = normalizeKey(entry.privateKey);
    if (!key) continue;
    const wallet = new ethers.Wallet(key);
    const expectedAddress = expected.get(label);
    if (ethers.getAddress(wallet.address) !== expectedAddress) {
      throw new Error(`${label} private key resolves to ${wallet.address}, expected ${expectedAddress}`);
    }
    keys.set(label, key);
  }

  const requiredLabels = [...new Set(actions.map((action) => action.label))];
  const missing = requiredLabels.filter((label) => !keys.has(label));
  if (missing.length) {
    throw new Error(`Missing private keys for: ${missing.join(", ")}`);
  }

  const registration = await ethers.getContractAt("RegistrationFixed", CONTRACTS.registration);
  const levelManager = await ethers.getContractAt("LevelManager", CONTRACTS.levelManager);
  const escrow = await ethers.getContractAt("AutoUpgradeEscrow", CONTRACTS.escrow);
  const usdt = await ethers.getContractAt("MockUSDT", CONTRACTS.usdt);
  const p12 = await ethers.getContractAt("P12Orbit", ORBITS.p12);
  const p39 = await ethers.getContractAt("P39Orbit", ORBITS.p39);

  const isGrand = phase === "grand";
  const beforeGrandState = isGrand
    ? await readGrandState({ registration, levelManager, escrow, p12, p39 })
    : null;
  if (beforeGrandState) printGrandState("BEFORE GRAND RUN", beforeGrandState);

  const signerByLabel = new Map(
    TEST_WALLETS.map(([label, address]) => {
      if (!keys.has(label)) return [label, null];
      const wallet = new ethers.Wallet(keys.get(label), ethers.provider);
      wallet.label = label;
      wallet.expectedAddress = ethers.getAddress(address);
      return [label, wallet];
    })
  );

  for (const action of actions) {
    const wallet = signerByLabel.get(action.label);
    const registered = await registration.isRegistered(wallet.address);
    if ((action.action === "register" || action.action === "ensureRegistered") && registered) {
      console.log(`${action.label} already registered; skipping register`);
      continue;
    }
    if (action.action === "register" || action.action === "ensureRegistered") {
      await approveIfNeeded(usdt, wallet, CONTRACTS.levelManager, LEVEL_PRICE[1]);
      await waitFor(`${action.label} register under Account 2`, registration.connect(wallet).register(action.referrer));
      continue;
    }

    if (action.action === "activate" || action.action === "ensureLevel") {
      const active = await isLevelActive(levelManager, wallet.address, action.level);
      if (active) {
        console.log(`${action.label} level ${action.level} already active; skipping`);
        continue;
      }
      await approveIfNeeded(usdt, wallet, CONTRACTS.levelManager, LEVEL_PRICE[action.level]);
      await waitFor(`${action.label} activate level ${action.level}`, registration.connect(wallet).activateLevel(action.level));
    }
  }

  if (isGrand) {
    const afterGrandState = await readGrandState({ registration, levelManager, escrow, p12, p39 });
    printGrandState("AFTER GRAND RUN", afterGrandState);
    printGrandVerdict(beforeGrandState, afterGrandState);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

const fs = require("fs");
const path = require("path");
const hre = require("hardhat");
const { ethers } = hre;

const LABELS = Array.from({ length: 11 }, (_, index) => `Account ${66 + index}`);
const PRICE = { 1: ethers.parseUnits("10", 6), 2: ethers.parseUnits("20", 6) };

function requiredAddress(name) {
  const value = process.env[name];
  if (!value || !ethers.isAddress(value)) throw new Error(`${name} is required`);
  return ethers.getAddress(value);
}

function loadWallets() {
  const keyFile = path.resolve(
    process.cwd(),
    process.env.TEST_WALLET_KEYS_FILE || "../env-files/fresh-test-wallets.private.json"
  );
  const rows = JSON.parse(fs.readFileSync(keyFile, "utf8"));
  const wallets = new Map();
  for (const label of LABELS) {
    const row = rows.find((entry) => entry.label === label);
    if (!row?.privateKey) throw new Error(`Missing private key for ${label}`);
    const wallet = new ethers.Wallet(row.privateKey, ethers.provider);
    wallet.label = label;
    wallets.set(label, wallet);
  }
  return wallets;
}

function parsedEvents(receipt, contracts) {
  const rows = [];
  for (const log of receipt.logs) {
    for (const [source, contract] of Object.entries(contracts)) {
      try {
        rows.push({ source, event: contract.interface.parseLog(log) });
        break;
      } catch {}
    }
  }
  return rows;
}

async function main() {
  const dryRun = String(process.env.FOCUSED_DRY_RUN || "false").toLowerCase() === "true";
  const wallets = loadWallets();
  const wallet = (label) => wallets.get(label);
  const beneficiary = wallet("Account 66");
  const sponsors = [wallet("Account 67"), wallet("Account 68"), wallet("Account 69")];
  const firstChildren = [wallet("Account 70"), wallet("Account 71"), wallet("Account 72")];
  const nestedCandidate = wallet("Account 73");
  const nestedChildren = [wallet("Account 74"), wallet("Account 75"), wallet("Account 76")];

  const contracts = {
    usdt: await ethers.getContractAt("contracts/mocks/MockUSDT.sol:MockUSDT", requiredAddress("USDT_ADDRESS")),
    registration: await ethers.getContractAt("RegistrationFixed", requiredAddress("REGISTRATION_ADDRESS")),
    levelManager: await ethers.getContractAt("LevelManager", requiredAddress("LEVEL_MANAGER_ADDRESS")),
    escrow: await ethers.getContractAt("AutoUpgradeEscrow", requiredAddress("ESCROW_ADDRESS")),
    p12: await ethers.getContractAt("P12Orbit", requiredAddress("P12_ORBIT_ADDRESS")),
  };
  const id1 = requiredAddress("ID1_WALLET");

  console.log("Focused nested P12 auto-upgrade certification");
  console.log("Beneficiary:", beneficiary.address);
  console.log("Nested candidate:", nestedCandidate.address);

  const fundingIssues = [];
  for (const controlled of wallets.values()) {
    if (await contracts.registration.isRegistered(controlled.address)) {
      throw new Error(`${controlled.label} is already registered`);
    }
    const [pol, usdt] = await Promise.all([
      ethers.provider.getBalance(controlled.address),
      contracts.usdt.balanceOf(controlled.address),
    ]);
    if (pol < ethers.parseEther("0.25")) fundingIssues.push(`${controlled.label} POL=${ethers.formatEther(pol)}`);
    if (usdt < ethers.parseUnits("50", 6)) fundingIssues.push(`${controlled.label} USDT=${ethers.formatUnits(usdt, 6)}`);
  }
  if (fundingIssues.length) throw new Error(`Funding required: ${fundingIssues.join(", ")}`);

  if (dryRun) {
    console.log("DRY RUN PASS: 11 wallets are unused and funded");
    return;
  }

  async function approve(controlled) {
    const allowance = await contracts.usdt.allowance(controlled.address, contracts.levelManager.target);
    if (allowance < ethers.parseUnits("50", 6)) {
      await (await contracts.usdt.connect(controlled).approve(contracts.levelManager.target, ethers.MaxUint256)).wait();
    }
  }

  async function register(controlled, sponsor) {
    await approve(controlled);
    const tx = await contracts.registration.connect(controlled).register(sponsor);
    await tx.wait();
    console.log(`${controlled.label} registered: ${tx.hash}`);
  }

  async function activateLevel2(controlled) {
    if (await contracts.levelManager.userLevelActivated(controlled.address, 2)) return;
    const tx = await contracts.registration.connect(controlled).activateLevel(2);
    await tx.wait();
    console.log(`${controlled.label} Level 2: ${tx.hash}`);
  }

  await register(beneficiary, id1);
  await activateLevel2(beneficiary);

  for (const sponsor of sponsors) {
    await register(sponsor, beneficiary.address);
    await activateLevel2(sponsor);
  }

  for (let index = 0; index < firstChildren.length; index += 1) {
    await register(firstChildren[index], sponsors[index].address);
    await activateLevel2(firstChildren[index]);
  }

  await register(nestedCandidate, sponsors[0].address);
  await register(nestedChildren[0], nestedCandidate.address);
  await register(nestedChildren[1], nestedCandidate.address);

  const orbitBefore = await contracts.p12.getUserOrbit(beneficiary.address, 2);
  const escrowBefore = await contracts.escrow.getLockedAmount(beneficiary.address, 2, 3);
  if (Number(orbitBefore.currentPosition) !== 7 || orbitBefore.escrowBalance !== ethers.parseUnits("30", 6)) {
    throw new Error(`P12 precondition mismatch position=${orbitBefore.currentPosition} escrow=${orbitBefore.escrowBalance}`);
  }
  if (escrowBefore !== ethers.parseUnits("30", 6)) {
    throw new Error(`external escrow precondition mismatch ${escrowBefore}`);
  }
  if (await contracts.levelManager.userLevelActivated(beneficiary.address, 3)) {
    throw new Error("beneficiary Level 3 activated before the nested trigger");
  }

  await approve(nestedChildren[2]);
  const targetTx = await contracts.registration.connect(nestedChildren[2]).register(nestedCandidate.address);
  const targetReceipt = await targetTx.wait();
  const events = parsedEvents(targetReceipt, contracts);

  const beneficiaryTrigger = events.find(({ source, event }) =>
    source === "levelManager" && event.name === "AutoUpgradeTriggered" &&
    ethers.getAddress(event.args.user) === beneficiary.address &&
    Number(event.args.fromLevel) === 2 && Number(event.args.toLevel) === 3
  );
  const positionSeven = events.find(({ source, event }) =>
    source === "p12" && event.name === "PositionFilled" &&
    ethers.getAddress(event.args.orbitOwner) === beneficiary.address &&
    ethers.getAddress(event.args.user) === nestedCandidate.address &&
    Number(event.args.level) === 2 && Number(event.args.position) === 7 &&
    event.args.amount === ethers.parseUnits("10", 6)
  );
  if (!beneficiaryTrigger) throw new Error("missing beneficiary 2->3 AutoUpgradeTriggered event");
  if (!positionSeven) throw new Error("missing beneficiary P12 position-7 mirror placement");
  if (!(await contracts.levelManager.userLevelActivated(nestedCandidate.address, 2))) {
    throw new Error("nested candidate did not auto-activate Level 2");
  }
  if (!(await contracts.levelManager.userLevelActivated(beneficiary.address, 3))) {
    throw new Error("beneficiary did not auto-activate Level 3");
  }
  if ((await contracts.escrow.getLockedAmount(beneficiary.address, 2, 3)) !== 0n) {
    throw new Error("beneficiary external escrow was not consumed");
  }
  const orbitAfter = await contracts.p12.getUserOrbit(beneficiary.address, 2);
  if (orbitAfter.escrowBalance !== 0n || !orbitAfter.autoUpgradeCompleted) {
    throw new Error("beneficiary orbit escrow state was not settled");
  }

  console.log("TARGET TX:", targetTx.hash);
  console.log("PASS: nested Level 2 completed, P12 position 7 filled, beneficiary Level 3 completed, escrow settled");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

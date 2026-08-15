const fs = require("node:fs");
const path = require("node:path");
const hre = require("hardhat");
const { ethers } = hre;

const BLOCK = 91313968;
const ADDRESSES = {
  registration: "0x02ECA97e944Ac66b0444fd5F61A716917E83CfF5",
  levelManager: "0x0E9De0F24eB4774834A2c4A63eaBa8356A4A4B53",
  escrow: "0x8b3db2AC7e30749479f2dbad14105C8eD4a377d4",
  p4: "0x1ED0b443c880Ba88F732c3f5915561A07B21F6B4",
  p12: "0xCF998d8f7E9DD4f3FacFbA45e656dE07142f824b",
  p39: "0xEaD39819B8C4DBb0669320542B6B847D4c31b8Fb",
  usdt: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
  fgt: "0x615201edaddB5CFD839Cc4eE693Dc464F6E2B5E4",
  fgtr: "0xAaD41296b6Ec358b9C16dD7161C555fD3a464Bc3",
  multisig: "0x785cC854ce9e13CE1140cbFD7C08620713E1711d",
  guardian: "0x290c2300296379BD0048aFe9099Ed6Fc81BF75fC",
};

const WALLETS = {
  wp98hbOld: "0xc0545331e20587208d4b27b2a3e4920cc481133a",
  wp98hbNew: "0x1EA5513e017b4e25847e91aBc84aC8686331f80B",
  rymqk4Old: "0x2f1e28756a42a3680b5ad42c58a0c3887c9e60ba",
  rymqk4New: "0xFb8D46674f51882baaA2c9606122484434FF2DC2",
};

const LEVEL_ORBIT = {
  1: ["P4", "p4", 4], 2: ["P12", "p12", 12], 3: ["P39", "p39", 39],
  4: ["P4", "p4", 4], 5: ["P12", "p12", 12], 6: ["P39", "p39", 39],
  7: ["P4", "p4", 4], 8: ["P12", "p12", 12], 9: ["P39", "p39", 39],
  10: ["P4", "p4", 4],
};

const ERC20_ABI = [
  "function balanceOf(address) view returns(uint256)",
  "function allowance(address,address) view returns(uint256)",
  "function totalSupply() view returns(uint256)",
];

function clean(value) {
  if (typeof value === "bigint") return value.toString();
  if (Array.isArray(value)) return value.map(clean);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).filter(([key]) => !/^\d+$/.test(key)).map(([key, item]) => [key, clean(item)]));
  }
  return value;
}

function decodeOrbitSummary(summary) {
  return {
    currentPosition: Number(summary[0]),
    escrowBalance: summary[1].toString(),
    autoUpgradeCompleted: Boolean(summary[2]),
    positionsInLine1: Number(summary[3]),
    positionsInLine2: Number(summary[4]),
    positionsInLine3: Number(summary[5]),
    totalCycles: Number(summary[6]),
    totalEarned: summary[7].toString(),
  };
}

function decodeLineCounts(lineCounts) {
  return {
    line1Count: Number(lineCounts[0]),
    line2Count: Number(lineCounts[1]),
    line3Count: Number(lineCounts[2]),
  };
}

function decodePosition(row) {
  return {
    occupant: row[0],
    amount: row[1].toString(),
    timestamp: Number(row[2]),
    referrer: row[3],
    isActive: Boolean(row[4]),
  };
}

function decodeCurrentActivation(activation) {
  return {
    activationId: activation[0].toString(),
    cycleNumber: Number(activation[1]),
    isMirror: Boolean(activation[2]),
  };
}

function decodeHistoricalActivation(activation, cycleNumber) {
  return {
    activationId: activation[0].toString(),
    cycleNumber,
    isMirror: Boolean(activation[1]),
  };
}

async function readPositions(orbit, wallet, level, count, totalCycles) {
  const current = [];
  for (let position = 1; position <= count; position += 1) {
    const [row, activation] = await Promise.all([
      orbit.getPosition(wallet, level, position, { blockTag: BLOCK }),
      orbit.getPositionActivationData(wallet, level, position, { blockTag: BLOCK }),
    ]);
    if (row[0] !== ethers.ZeroAddress) {
      current.push({
        position,
        data: decodePosition(row),
        activation: decodeCurrentActivation(activation),
      });
    }
  }

  const historical = [];
  for (let cycle = 1; cycle <= totalCycles; cycle += 1) {
    if (!(await orbit.hasHistoricalCycle(wallet, level, cycle, { blockTag: BLOCK }))) continue;
    const positions = [];
    for (let position = 1; position <= count; position += 1) {
      const [row, activation] = await Promise.all([
        orbit.getHistoricalPosition(wallet, level, cycle, position, { blockTag: BLOCK }),
        orbit.getHistoricalPositionActivationData(wallet, level, cycle, position, { blockTag: BLOCK }),
      ]);
      if (row[0] !== ethers.ZeroAddress) {
        positions.push({
          position,
          data: decodePosition(row),
          activation: decodeHistoricalActivation(activation, cycle),
        });
      }
    }
    historical.push({ cycle, positions });
  }
  return { current, historical };
}

async function main() {
  const chainHead = await ethers.provider.getBlockNumber();
  if (chainHead < BLOCK) throw new Error(`RPC head ${chainHead} is behind frozen block ${BLOCK}`);

  const contracts = {
    registration: await ethers.getContractAt("RegistrationFixed", ADDRESSES.registration.toLowerCase()),
    levelManager: await ethers.getContractAt("LevelManager", ADDRESSES.levelManager.toLowerCase()),
    escrow: await ethers.getContractAt("AutoUpgradeEscrow", ADDRESSES.escrow.toLowerCase()),
    p4: await ethers.getContractAt("P4Orbit", ADDRESSES.p4.toLowerCase()),
    p12: await ethers.getContractAt("P12Orbit", ADDRESSES.p12.toLowerCase()),
    p39: await ethers.getContractAt("P39Orbit", ADDRESSES.p39.toLowerCase()),
    usdt: new ethers.Contract(ADDRESSES.usdt.toLowerCase(), ERC20_ABI, ethers.provider),
    fgt: new ethers.Contract(ADDRESSES.fgt.toLowerCase(), ERC20_ABI, ethers.provider),
    fgtr: new ethers.Contract(ADDRESSES.fgtr.toLowerCase(), ERC20_ABI, ethers.provider),
  };

  const report = {
    generatedAt: new Date().toISOString(),
    chainId: Number((await ethers.provider.getNetwork()).chainId),
    frozenBlock: BLOCK,
    observedHead: chainHead,
    contracts: ADDRESSES,
    wallets: {},
  };

  for (const [label, wallet] of Object.entries(WALLETS)) {
    const [registered, sponsor, nativeBalance, usdt, fgt, fgtr] = await Promise.all([
      contracts.registration.isRegistered(wallet, { blockTag: BLOCK }),
      contracts.registration.getReferrer(wallet, { blockTag: BLOCK }),
      ethers.provider.getBalance(wallet, BLOCK),
      contracts.usdt.balanceOf(wallet, { blockTag: BLOCK }),
      contracts.fgt.balanceOf(wallet, { blockTag: BLOCK }),
      contracts.fgtr.balanceOf(wallet, { blockTag: BLOCK }),
    ]);

    const levels = [];
    for (let level = 1; level <= 10; level += 1) {
      const [orbitType, orbitKey, positionCount] = LEVEL_ORBIT[level];
      const [active, matrixParent, summary, lineCounts] = await Promise.all([
        contracts.registration.isLevelActivated(wallet, level, { blockTag: BLOCK }),
        contracts.registration.currentMatrixParentOf(wallet, level, { blockTag: BLOCK }),
        contracts[orbitKey].getUserOrbit(wallet, level, { blockTag: BLOCK }),
        contracts[orbitKey].getLinePaymentCounts(wallet, level, { blockTag: BLOCK }),
      ]);
      const decodedSummary = decodeOrbitSummary(summary);
      const decodedLineCounts = decodeLineCounts(lineCounts);
      const lockedTransitions = [];
      if (level < 10) {
        lockedTransitions.push({
          fromLevel: level,
          toLevel: level + 1,
          amount: (await contracts.escrow.getLockedAmount(wallet, level, level + 1, { blockTag: BLOCK })).toString(),
        });
      }
      const totalCycles = decodedSummary.totalCycles;
      const hasState = active || matrixParent !== ethers.ZeroAddress || decodedSummary.currentPosition > 0 || totalCycles > 0 || BigInt(decodedSummary.escrowBalance) > 0n || BigInt(lockedTransitions[0]?.amount || 0) > 0n;
      let positions = { current: [], historical: [] };
      if (hasState) {
        positions = await readPositions(contracts[orbitKey], wallet, level, positionCount, totalCycles);
      }
      levels.push({
        level,
        orbitType,
        active,
        matrixParent,
        summary: decodedSummary,
        lineCounts: decodedLineCounts,
        lockedTransitions,
        positions,
      });
    }

    report.wallets[label] = {
      wallet,
      registered,
      sponsor,
      balances: {
        native: nativeBalance.toString(),
        usdt: usdt.toString(),
        fgt: fgt.toString(),
        fgtr: fgtr.toString(),
      },
      privilegedAddressMatches: Object.fromEntries(
        ["multisig", "guardian"].map((role) => [role, wallet.toLowerCase() === ADDRESSES[role].toLowerCase()])
      ),
      levels,
    };
  }

  const output = path.resolve(__dirname, "../migration-audits/wallet-migration-chain-state-91313968.json");
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify({
    output,
    frozenBlock: BLOCK,
    wallets: Object.fromEntries(Object.entries(report.wallets).map(([label, row]) => [label, {
      wallet: row.wallet,
      registered: row.registered,
      sponsor: row.sponsor,
      balances: row.balances,
      activeLevels: row.levels.filter((level) => level.active).map((level) => level.level),
      nonZeroEscrow: row.levels.flatMap((level) => level.lockedTransitions.filter((entry) => BigInt(entry.amount) > 0n)),
      ownedOrbitStates: row.levels.filter((level) => Number(level.summary.currentPosition || 0) > 0 || Number(level.summary.totalCycles || 0) > 0).map((level) => ({
        level: level.level,
        orbitType: level.orbitType,
        currentPosition: Number(level.summary.currentPosition || 0),
        totalCycles: Number(level.summary.totalCycles || 0),
        currentFilled: level.positions.current.length,
        historicalCycles: level.positions.historical.length,
      })),
    }])),
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

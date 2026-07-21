const fs = require("node:fs");
const path = require("node:path");
const { ethers } = require("hardhat");

const DEPLOYMENT_BLOCK = 87490025;
const FROZEN_LEDGER_BLOCK = 90322384;
const MULTICALL_ADDRESS = "0xcA11bde05977b3631167028862bE2a173976CA11";
const DEFAULT_ADDRESSES = Object.freeze({
  registration: "0x02ECA97e944Ac66b0444fd5F61A716917E83CfF5",
  p4: "0x1ED0b443c880Ba88F732c3F5915561A07B21F6B4",
  p12: "0xCF998d8f7E9DD4f3FacFbA45e656dE07142f824b",
  p39: "0xEaD39819B8C4DBb0669320542B6B847D4c31b8Fb",
});

const ORBIT_ABI = [
  "event PositionFilled(address indexed orbitOwner,address indexed user,uint8 indexed level,uint8 position,uint256 amount)",
  "function getUserOrbit(address,uint8) view returns (uint8 currentPosition,uint256 escrowBalance,bool autoUpgradeCompleted,uint8 positionsInLine1,uint8 positionsInLine2,uint8 positionsInLine3,uint256 totalCycles,uint256 totalEarned)",
  "function getPosition(address,uint8,uint8) view returns (address occupant,uint256 amount,uint256 timestamp,address referrer,bool isActive)",
  "function getHistoricalPosition(address,uint8,uint256,uint8) view returns (address occupant,uint256 amount,uint256 timestamp,address referrer,bool isActive)",
  "function hasHistoricalCycle(address,uint8,uint256) view returns (bool)",
  "function getPositionActivationData(address,uint8,uint8) view returns (uint256 activationId,uint32 cycleNumber,bool isMirror)",
  "function getHistoricalPositionActivationData(address,uint8,uint256,uint8) view returns (uint256 activationId,bool isMirror)",
];

const REGISTRATION_ABI = [
  "function isLevelActivated(address,uint8) view returns (bool)",
  "function getReferrer(address) view returns (address)",
];
const MULTICALL_ABI = [
  "function aggregate3(tuple(address target,bool allowFailure,bytes callData)[] calls) payable returns (tuple(bool success,bytes returnData)[] returnData)",
];

const CONFIG = Object.freeze({
  P4: { levels: [1, 4, 7, 10], positions: 4 },
  P12: { levels: [2, 5, 8], positions: 12 },
  P39: { levels: [3, 6, 9], positions: 39 },
});

function lineFor(orbitType, position) {
  if (orbitType === "P4") return 1;
  if (position <= 3) return 1;
  if (orbitType === "P12" || position <= 12) return 2;
  return 3;
}

function parentPositionFor(orbitType, position) {
  if (orbitType === "P4" || position <= 3) return 0;
  if (position <= 12) return ((position - 4) % 3) + 1;
  return 4 + ((position - 13) % 9);
}

function expectedAmountForLine(orbitType, level, line) {
  const price = 10n * 10n ** 6n * (2n ** BigInt(level - 1));
  if (orbitType === "P4") return (price * 90n) / 100n;
  if (orbitType === "P12") return line === 1 ? (price * 40n) / 100n : (price * 50n) / 100n;
  return line === 3 ? (price * 50n) / 100n : (price * 20n) / 100n;
}

function activationPrice(level) {
  return 10n * 10n ** 6n * (2n ** BigInt(level - 1));
}

function key(owner, level) {
  return `${owner.toLowerCase()}:${level}`;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function rpcCall(action) {
  let lastError;
  for (let attempt = 0; attempt < 6; attempt += 1) {
    try {
      return await action();
    } catch (error) {
      lastError = error;
      const message = String(error?.shortMessage || error?.message || error);
      const detail = String(error?.info?.error?.message || "");
      if (!/rate limit|50\/second|429|ECONNRESET|socket hang up|network error/i.test(`${message} ${detail}`)) throw error;
      await sleep(1000 * (attempt + 1));
    }
  }
  throw lastError;
}

async function queryPositionOwners(contract, fromBlock, toBlock, chunkSize) {
  const owners = new Map();
  for (let start = fromBlock; start <= toBlock; start += chunkSize) {
    const end = Math.min(start + chunkSize - 1, toBlock);
    const logs = await contract.queryFilter(contract.filters.PositionFilled(), start, end);
    for (const log of logs) {
      const owner = String(log.args.orbitOwner);
      const level = Number(log.args.level);
      owners.set(key(owner, level), { owner, level });
    }
    process.stderr.write(`scanned ${contract.target} ${start}-${end}\n`);
  }
  return owners;
}

function loadFrozenOwners(orbitType) {
  const ledgerPath = path.resolve(
    __dirname,
    "../test-reports/production-matrix-parent-ledger-frozen-90322384.json"
  );
  if (!fs.existsSync(ledgerPath)) return new Map();

  const ledger = JSON.parse(fs.readFileSync(ledgerPath, "utf8"));
  const owners = new Map();
  for (const seed of ledger.seeds || []) {
    if (orbitType === "P4") {
      const candidates = [seed.occupant, seed.latestOccurrence?.orbitOwner].filter(Boolean);
      for (const owner of candidates) {
        for (const level of CONFIG.P4.levels) owners.set(key(owner, level), { owner, level });
      }
      continue;
    }
    if (seed.orbitType === orbitType) {
      const owner = seed.latestOccurrence?.orbitOwner;
      const level = Number(seed.level || 0);
      if (owner && level) owners.set(key(owner, level), { owner, level });
    }
  }
  return owners;
}

async function readCycle(contract, multicall, orbitType, owner, level, cycle, totalPositions, historical) {
  const calls = [];
  for (let position = 1; position <= totalPositions; position += 1) {
    calls.push({
      target: contract.target,
      allowFailure: false,
      callData: contract.interface.encodeFunctionData(
        historical ? "getHistoricalPosition" : "getPosition",
        historical ? [owner, level, cycle, position] : [owner, level, position]
      ),
    });
    calls.push({
      target: contract.target,
      allowFailure: false,
      callData: contract.interface.encodeFunctionData(
        historical ? "getHistoricalPositionActivationData" : "getPositionActivationData",
        historical ? [owner, level, cycle, position] : [owner, level, position]
      ),
    });
  }
  const results = await rpcCall(() => multicall.aggregate3.staticCall(calls));
  const positions = [];
  for (let position = 1; position <= totalPositions; position += 1) {
    const resultOffset = (position - 1) * 2;
    const row = contract.interface.decodeFunctionResult(
      historical ? "getHistoricalPosition" : "getPosition",
      results[resultOffset].returnData
    );
    const activation = contract.interface.decodeFunctionResult(
      historical ? "getHistoricalPositionActivationData" : "getPositionActivationData",
      results[resultOffset + 1].returnData
    );

    const occupant = row.occupant;
    const line = lineFor(orbitType, position);
    const parentPosition = parentPositionFor(orbitType, position);
    positions.push({
      position,
      line,
      parentPosition,
      occupant,
      amount: row.amount.toString(),
      timestamp: Number(row.timestamp),
      referrer: row.referrer,
      active: Boolean(row.isActive),
      activationId: activation.activationId.toString(),
      isMirror: Boolean(activation.isMirror),
      expectedLineAmount: expectedAmountForLine(orbitType, level, line).toString(),
      expectedStoredAmount: (
        Boolean(activation.isMirror)
          ? expectedAmountForLine(orbitType, level, line)
          : activationPrice(level)
      ).toString(),
    });
  }
  return positions;
}

function classifyCycle(orbitType, positions, historical) {
  const filled = positions.filter((row) => row.occupant !== ethers.ZeroAddress);
  const gaps = [];
  const orphanChildren = [];
  const amountMismatches = [];
  let sawEmpty = false;

  for (const row of positions) {
    const occupied = row.occupant !== ethers.ZeroAddress;
    if (!occupied) sawEmpty = true;
    else if (sawEmpty) gaps.push(row.position);

    if (occupied && row.parentPosition > 0) {
      const parent = positions[row.parentPosition - 1];
      if (!parent || parent.occupant === ethers.ZeroAddress) {
        orphanChildren.push({ position: row.position, parentPosition: row.parentPosition });
      }
    }

    if (occupied && BigInt(row.amount) !== BigInt(row.expectedStoredAmount)) {
      amountMismatches.push({
        position: row.position,
        line: row.line,
        actual: row.amount,
        expected: row.expectedStoredAmount,
        activationId: row.activationId,
        isMirror: row.isMirror,
      });
    }
  }

  return {
    historical,
    filledCount: filled.length,
    complete: filled.length === positions.length,
    sequentialGaps: gaps,
    orphanChildren,
    amountMismatches,
    activationIdZeroCount: filled.filter((row) => row.activationId === "0").length,
    mirrorCount: filled.filter((row) => row.isMirror).length,
    duplicateOccupants: Object.entries(
      filled.reduce((acc, row) => {
        const occupant = row.occupant.toLowerCase();
        acc[occupant] = (acc[occupant] || 0) + 1;
        return acc;
      }, {})
    ).filter(([, count]) => count > 1).map(([occupant, count]) => ({ occupant, count })),
  };
}

async function main() {
  const rpcUrl = process.env.MAINNET_RPC_URL;
  if (!rpcUrl) throw new Error("MAINNET_RPC_URL is required");

  const provider = new ethers.JsonRpcProvider(rpcUrl, 137, { staticNetwork: true });
  const network = await provider.getNetwork();
  const latestBlock = await provider.getBlockNumber();
  if (network.chainId !== 137n) throw new Error(`Expected Polygon chain 137, received ${network.chainId}`);

  const addresses = {
    registration: process.env.PRODUCTION_REGISTRATION_ADDRESS || DEFAULT_ADDRESSES.registration,
    P4: process.env.PRODUCTION_P4_ORBIT_ADDRESS || DEFAULT_ADDRESSES.p4,
    P12: process.env.PRODUCTION_P12_ORBIT_ADDRESS || DEFAULT_ADDRESSES.p12,
    P39: process.env.PRODUCTION_P39_ORBIT_ADDRESS || DEFAULT_ADDRESSES.p39,
  };
  const fromBlock = Number(process.env.PRODUCTION_AUDIT_START_BLOCK || FROZEN_LEDGER_BLOCK + 1);
  const chunkSize = Math.min(
    Number(process.env.PRODUCTION_AUDIT_CHUNK_SIZE || 10000),
    10000
  );
  const registration = new ethers.Contract(addresses.registration, REGISTRATION_ABI, provider);
  const multicall = new ethers.Contract(MULTICALL_ADDRESS, MULTICALL_ABI, provider);
  const report = {
    generatedAt: new Date().toISOString(),
    chainId: Number(network.chainId),
    fromBlock,
    toBlock: latestBlock,
    addresses,
    summary: {
      ownerLevels: 0,
      currentCycles: 0,
      historicalCycles: 0,
      positionsRead: 0,
      topologyViolations: 0,
      amountMismatches: 0,
      activationIdZero: 0,
      repeatedOccupants: 0,
      oneFillAway: { P4: 0, P12: 0, P39: 0 },
    },
    ownerLevels: [],
  };

  for (const orbitType of ["P4", "P12", "P39"]) {
    const contract = new ethers.Contract(addresses[orbitType], ORBIT_ABI, provider);
    const discovered = loadFrozenOwners(orbitType);
    const deltaOwners = await queryPositionOwners(contract, fromBlock, latestBlock, chunkSize);
    for (const [ownerKey, ownerRow] of deltaOwners) discovered.set(ownerKey, ownerRow);

    const pendingOwnerAudits = [];
    for (const { owner, level } of discovered.values()) {
      if (!CONFIG[orbitType].levels.includes(level)) continue;
      pendingOwnerAudits.push((async () => {
      const totalPositions = CONFIG[orbitType].positions;
      const [state, active] = await rpcCall(() => Promise.all([
        contract.getUserOrbit(owner, level),
        registration.isLevelActivated(owner, level),
      ]));
      const currentCycle = Number(state.totalCycles) + 1;
      const currentPositions = await readCycle(
        contract,
        multicall,
        orbitType,
        owner,
        level,
        currentCycle,
        totalPositions,
        false
      );
      const currentFinding = classifyCycle(orbitType, currentPositions, false);
      const historicalCycles = [];

      for (let cycle = 1; cycle <= Number(state.totalCycles); cycle += 1) {
        if (!(await rpcCall(() => contract.hasHistoricalCycle(owner, level, cycle)))) {
          historicalCycles.push({ cycle, missingArchive: true });
          report.summary.topologyViolations += 1;
          continue;
        }
        const positions = await readCycle(contract, multicall, orbitType, owner, level, cycle, totalPositions, true);
        historicalCycles.push({
          cycle,
          finding: classifyCycle(orbitType, positions, true),
          positions,
        });
        report.summary.historicalCycles += 1;
        report.summary.positionsRead += totalPositions;
      }

      const findings = [currentFinding, ...historicalCycles.map((row) => row.finding).filter(Boolean)];
      for (const finding of findings) {
        // Sparse branches are valid; only an occupied child without its matrix parent is invalid.
        if (finding.orphanChildren.length) report.summary.topologyViolations += 1;
        report.summary.amountMismatches += finding.amountMismatches.length;
        report.summary.activationIdZero += finding.activationIdZeroCount;
        report.summary.repeatedOccupants += finding.duplicateOccupants.length;
      }
      if (currentFinding.filledCount === totalPositions - 1) report.summary.oneFillAway[orbitType] += 1;

      report.ownerLevels.push({
        orbitType,
        owner,
        level,
        ownerLevelActive: active,
        currentPosition: Number(state.currentPosition),
        escrowBalance: state.escrowBalance.toString(),
        autoUpgradeCompleted: Boolean(state.autoUpgradeCompleted),
        completedCycles: Number(state.totalCycles),
        totalEarned: state.totalEarned.toString(),
        currentCycle,
        currentFinding,
        currentPositions,
        historicalCycles,
      });
      report.summary.ownerLevels += 1;
      report.summary.currentCycles += 1;
      report.summary.positionsRead += totalPositions;
      })());

      if (pendingOwnerAudits.length >= 8) {
        await Promise.all(pendingOwnerAudits);
        pendingOwnerAudits.length = 0;
        process.stderr.write(`audited ${orbitType} owner-levels=${report.summary.ownerLevels}\n`);
      }
    }
    await Promise.all(pendingOwnerAudits);
  }

  const outputPath = path.resolve(
    __dirname,
    `../test-reports/production-structural-state-${latestBlock}.json`
  );
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  fs.writeFileSync(
    path.resolve(__dirname, "../test-reports/production-structural-state-latest.json"),
    JSON.stringify(report, null, 2)
  );
  console.log(JSON.stringify({ outputPath, ...report.summary }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

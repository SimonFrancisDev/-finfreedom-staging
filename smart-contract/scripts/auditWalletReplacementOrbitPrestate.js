const fs = require("node:fs");
const path = require("node:path");
const hre = require("hardhat");
const { ethers } = hre;

const INDEX_KEYS_PATH = path.resolve(__dirname, "../migration-audits/wallet-replacement-orbit-index-keys.json");
const ORBITS = {
  P4: { address: "0x1ED0b443c880Ba88F732c3f5915561A07B21F6B4", artifact: "P4Orbit", positions: 4 },
  P12: { address: "0xCF998d8f7E9DD4f3FacFbA45e656dE07142f824b", artifact: "P12Orbit", positions: 12 },
  P39: { address: "0xEaD39819B8C4DBb0669320542B6B847D4c31b8Fb", artifact: "P39Orbit", positions: 39 },
};
const OLD = new Set([
  "0xc0545331e20587208d4b27b2a3e4920cc481133a",
  "0x2f1e28756a42a3680b5ad42c58a0c3887c9e60ba",
]);
const OLD_WALLETS = [...OLD];
const LEVELS = { P4: [1, 4, 7, 10], P12: [2, 5, 8], P39: [3, 6, 9] };

function lower(value) {
  return String(value).toLowerCase();
}

function summary(row) {
  return {
    currentPosition: Number(row[0]), escrowBalance: row[1].toString(),
    autoUpgradeCompleted: Boolean(row[2]), positionsInLine1: Number(row[3]),
    positionsInLine2: Number(row[4]), positionsInLine3: Number(row[5]),
    totalCycles: row[6].toString(), totalEarned: row[7].toString(),
  };
}

async function discoverOwnerLevels() {
  const index = JSON.parse(fs.readFileSync(INDEX_KEYS_PATH, "utf8"));
  const keys = new Set();
  for (const event of index.oldWalletReferences) {
    keys.add(`${event.orbitType}:${Number(event.level)}:${lower(event.orbitOwner)}`);
  }
  for (const wallet of OLD_WALLETS) {
    for (const [orbitType, levels] of Object.entries(LEVELS)) {
      for (const level of levels) keys.add(`${orbitType}:${level}:${wallet}`);
    }
  }
  return [...keys].sort();
}

async function readOwnerLevel(contract, orbitType, owner, level, maxPositions) {
  const [orbitSummary, counts] = await Promise.all([
    contract.getUserOrbit(owner, level),
    contract.getLinePaymentCounts(owner, level),
  ]);
  const positions = [];
  for (let position = 1; position <= maxPositions; position++) {
    const [row, activation] = await Promise.all([
      contract.getPosition(owner, level, position),
      contract.getPositionActivationData(owner, level, position),
    ]);
    if (row[0] === ethers.ZeroAddress) continue;
    const rule = await contract.getPositionRuleView(owner, level, position);
    positions.push({
      position,
      occupant: row[0], amount: row[1].toString(), timestamp: Number(row[2]), referrer: row[3], active: Boolean(row[4]),
      activationId: activation[0].toString(), cycleNumber: Number(activation[1]), isMirror: Boolean(activation[2]),
      line: Number(rule.line), linePaymentNumber: Number(rule.linePaymentNumber),
      spillover1Recipient: rule.spillover1Recipient, spillover2Recipient: rule.spillover2Recipient,
      toOwner: rule.toOwner.toString(), toSpillover1: rule.toSpillover1.toString(), toSpillover2: rule.toSpillover2.toString(),
      toEscrow: rule.toEscrow.toString(), toRecycle: rule.toRecycle.toString(),
    });
  }
  return {
    orbitType, level, owner, summary: summary(orbitSummary),
    lineCounts: { line1: Number(counts[0]), line2: Number(counts[1]), line3: Number(counts[2]) },
    positions,
  };
}

async function main() {
  const snapshotStartBlock = await ethers.provider.getBlockNumber();
  const contracts = {};
  for (const [orbitType, config] of Object.entries(ORBITS)) {
    contracts[orbitType] = await ethers.getContractAt(config.artifact, config.address.toLowerCase());
  }
  const keys = await discoverOwnerLevels();
  const ownerLevels = [];
  for (const key of keys) {
    const [orbitType, levelText, owner] = key.split(":");
    ownerLevels.push(await readOwnerLevel(contracts[orbitType], orbitType, owner, Number(levelText), ORBITS[orbitType].positions));
  }

  const references = [];
  for (const row of ownerLevels) {
    for (const position of row.positions) {
      const fields = {
        owner: row.owner,
        occupant: position.occupant,
        referrer: position.referrer,
        spillover1Recipient: position.spillover1Recipient,
        spillover2Recipient: position.spillover2Recipient,
      };
      const matchedFields = Object.entries(fields).filter(([, value]) => OLD.has(lower(value))).map(([field]) => field);
      if (matchedFields.length) references.push({ orbitType: row.orbitType, level: row.level, owner: row.owner, position: position.position, matchedFields, ...position });
    }
  }
  const owned = ownerLevels.filter((row) => OLD.has(lower(row.owner)));
  const snapshotEndBlock = await ethers.provider.getBlockNumber();
  const report = {
    generatedAt: new Date().toISOString(), chainId: Number((await ethers.provider.getNetwork()).chainId),
    snapshotStartBlock, snapshotEndBlock, discoverySource: INDEX_KEYS_PATH,
    discoveredOwnerLevelCount: ownerLevels.length, liveReferenceCount: references.length,
    references, owned,
  };
  const output = path.resolve(__dirname, `../migration-audits/wallet-replacement-orbit-prestate-${snapshotEndBlock}.json`);
  fs.writeFileSync(output, `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(path.resolve(__dirname, "../migration-audits/wallet-replacement-orbit-prestate-latest.json"), `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify({ output, snapshotStartBlock, snapshotEndBlock, discoveredOwnerLevelCount: ownerLevels.length, liveReferenceCount: references.length, ownedStateCount: owned.filter((row) => row.positions.length || Number(row.summary.totalCycles)).length }, null, 2));
}

main().catch((error) => { console.error(error); process.exitCode = 1; });

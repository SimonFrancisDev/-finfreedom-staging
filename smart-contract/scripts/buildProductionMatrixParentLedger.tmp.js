const fs = require("node:fs");
const path = require("node:path");
const { ethers } = require("hardhat");

const VERIFIED_NO_REFERRER_FOUNDER_REPS = new Set([
  "0x3176a012618ab6f527ed1bd038b64a179725ef07",
  "0xf6c5b0600566d032fe67302a34fa774c0456bfef",
  "0xfb142123c6efc9b9f406eeed0df763b9c8bc856e",
]);

function occurrenceKey(row) {
  return [row.orbitType, row.level, row.orbitOwner.toLowerCase(), row.cycleNumber, row.position].join(":");
}

function participantKey(row) {
  return `${row.orbitType}:${row.level}:${row.occupant.toLowerCase()}`;
}

function collectCycle(occurrences, unresolved, ignoredAnomalies, excludedFounderRecords, frozenKeys, ownerLevel, cycleNumber, positions, source) {
  for (const position of positions) {
    if (!position.active || position.occupant === ethers.ZeroAddress || position.isMirror) continue;
    const parent = position.parentPosition === 0
      ? ownerLevel.owner
      : positions[position.parentPosition - 1]?.occupant;
    const row = {
      orbitType: ownerLevel.orbitType,
      level: ownerLevel.level,
      occupant: position.occupant,
      parent,
      orbitOwner: ownerLevel.owner,
      cycleNumber,
      position: position.position,
      parentPosition: position.parentPosition,
      timestamp: position.timestamp,
      activationId: Number(position.activationId),
      isMirror: false,
      source,
    };
    if (!parent || parent === ethers.ZeroAddress || parent.toLowerCase() === position.occupant.toLowerCase()) {
      const anomaly = { ...row, reason: !parent || parent === ethers.ZeroAddress ? "missing-parent" : "self-parent" };
      if (
        anomaly.reason === "self-parent" &&
        Number(position.activationId) === 0 &&
        VERIFIED_NO_REFERRER_FOUNDER_REPS.has(position.occupant.toLowerCase())
      ) excludedFounderRecords.push(anomaly);
      else if (frozenKeys.has(participantKey(row))) ignoredAnomalies.push(anomaly);
      else unresolved.push(anomaly);
      continue;
    }
    occurrences.set(occurrenceKey(row), row);
  }
}

function main() {
  const sourcePath = path.resolve(__dirname, "../test-reports/production-structural-state-latest.json");
  const frozenPath = path.resolve(__dirname, "../test-reports/production-matrix-parent-ledger-frozen-90322384.json");
  const report = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
  const frozen = JSON.parse(fs.readFileSync(frozenPath, "utf8"));
  const occurrences = new Map();
  const unresolved = [];
  const ignoredAnomalies = [];
  const excludedFounderRecords = [];
  const frozenKeys = new Set();

  for (const seed of frozen.seeds) {
    if (
      seed.occupant.toLowerCase() === seed.parent.toLowerCase() &&
      VERIFIED_NO_REFERRER_FOUNDER_REPS.has(seed.occupant.toLowerCase())
    ) continue;
    const row = {
      orbitType: seed.orbitType,
      level: seed.level,
      occupant: seed.occupant,
      parent: seed.parent,
      ...seed.latestOccurrence,
    };
    frozenKeys.add(participantKey(row));
    occurrences.set(occurrenceKey(row), row);
  }

  for (const ownerLevel of report.ownerLevels) {
    if (ownerLevel.orbitType !== "P12" && ownerLevel.orbitType !== "P39") continue;
    for (const historical of ownerLevel.historicalCycles) {
      if (historical.missingArchive) {
        unresolved.push({
          orbitType: ownerLevel.orbitType,
          owner: ownerLevel.owner,
          level: ownerLevel.level,
          cycleNumber: historical.cycle,
          reason: "missing-historical-cycle",
        });
        continue;
      }
      collectCycle(occurrences, unresolved, ignoredAnomalies, excludedFounderRecords, frozenKeys, ownerLevel, historical.cycle, historical.positions, "historical");
    }
    collectCycle(
      occurrences,
      unresolved,
      ignoredAnomalies,
      excludedFounderRecords,
      frozenKeys,
      ownerLevel,
      ownerLevel.currentCycle,
      ownerLevel.currentPositions,
      "current"
    );
  }

  const grouped = new Map();
  for (const row of occurrences.values()) {
    const key = participantKey(row);
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(row);
  }

  const seeds = [];
  let conflictingParentCount = 0;
  let repeatedOccupantLevelCount = 0;
  for (const rows of grouped.values()) {
    rows.sort((left, right) =>
      left.timestamp - right.timestamp ||
      left.activationId - right.activationId ||
      left.cycleNumber - right.cycleNumber ||
      left.position - right.position
    );
    const latest = rows[rows.length - 1];
    const knownParents = [...new Set(rows.map((row) => row.parent.toLowerCase()))];
    if (rows.length > 1) repeatedOccupantLevelCount += 1;
    if (knownParents.length > 1) conflictingParentCount += 1;
    seeds.push({
      orbitType: latest.orbitType,
      level: latest.level,
      occupant: latest.occupant.toLowerCase(),
      parent: latest.parent.toLowerCase(),
      occurrenceCount: rows.length,
      knownParents,
      latestOccurrence: {
        orbitOwner: latest.orbitOwner.toLowerCase(),
        cycleNumber: latest.cycleNumber,
        position: latest.position,
        parentPosition: latest.parentPosition,
        timestamp: latest.timestamp,
        activationId: latest.activationId,
        isMirror: false,
        source: latest.source,
      },
    });
  }
  seeds.sort((left, right) =>
    left.orbitType.localeCompare(right.orbitType) ||
    left.level - right.level ||
    left.occupant.localeCompare(right.occupant)
  );

  const output = {
    generatedAt: new Date().toISOString(),
    sourceBlock: report.toBlock,
    sourceReport: path.basename(sourcePath),
    frozenBaseline: path.basename(frozenPath),
    summary: {
      chainId: report.chainId,
      liveSnapshotCount: report.ownerLevels.filter((row) => row.orbitType === "P12" || row.orbitType === "P39").length,
      historicalCycleSnapshotCount: report.ownerLevels.reduce(
        (count, row) => count + ((row.orbitType === "P12" || row.orbitType === "P39") ? row.historicalCycles.length : 0),
        0
      ),
      rawOccurrenceCount: occurrences.size,
      dedupedOccurrenceCount: occurrences.size,
      seedCount: seeds.length,
      unresolvedCount: unresolved.length,
      ignoredLegacyAnomalyCount: ignoredAnomalies.length,
      excludedNoReferrerFounderRecordCount: excludedFounderRecords.length,
      repeatedOccupantLevelCount,
      conflictingParentCount,
      byOrbit: {
        P12: seeds.filter((row) => row.orbitType === "P12").length,
        P39: seeds.filter((row) => row.orbitType === "P39").length,
      },
    },
    unresolved,
    ignoredAnomalies,
    excludedFounderRecords,
    seeds,
  };
  const latestPath = path.resolve(__dirname, "../test-reports/production-matrix-parent-ledger-latest.json");
  const blockPath = path.resolve(__dirname, `../test-reports/production-matrix-parent-ledger-${report.toBlock}.json`);
  fs.writeFileSync(latestPath, `${JSON.stringify(output, null, 2)}\n`);
  fs.writeFileSync(blockPath, `${JSON.stringify(output, null, 2)}\n`);
  console.log(JSON.stringify({ outputPath: blockPath, ...output.summary }, null, 2));
  if (unresolved.length) process.exitCode = 1;
}

main();

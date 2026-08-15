const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const ROOT = path.resolve(__dirname, "../../..");
const CHAIN_FILE = path.resolve(__dirname, "../migration-audits/wallet-migration-chain-state-91313968.json");
const LIVE_FILE = path.resolve(__dirname, "../migration-audits/wallet-replacement-live-references.json");
const DB_FILE = path.resolve(ROOT, "backend/migration-audits/wallet-migration-inventory-91313968.json");
const OUTPUT = path.resolve(__dirname, "../migration-audits/wallet-replacement-manifest-draft.json");

const PAIRS = [
  {
    id: "FFN-WP98HB",
    oldKey: "wp98hbOld",
    newKey: "wp98hbNew",
    oldWallet: "0xc0545331e20587208d4b27b2a3e4920cc481133a",
    newWallet: "0x1EA5513e017b4e25847e91aBc84aC8686331f80B",
  },
  {
    id: "FFN-RYMQK4",
    oldKey: "rymqk4Old",
    newKey: "rymqk4New",
    oldWallet: "0x2f1e28756a42a3680b5ad42c58a0c3887c9e60ba",
    newWallet: "0xFb8D46674f51882baaA2c9606122484434FF2DC2",
  },
];
const ADDRESS_REPLACEMENTS = Object.fromEntries(PAIRS.map((pair) => [pair.oldWallet.toLowerCase(), pair.newWallet]));

function read(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function decodeSummary(value) {
  return {
    currentPosition: Number(value[0]),
    escrowBalance: value[1],
    autoUpgradeCompleted: Boolean(value[2]),
    positionsInLine1: Number(value[3]),
    positionsInLine2: Number(value[4]),
    positionsInLine3: Number(value[5]),
    totalCycles: Number(value[6]),
    totalEarned: value[7],
  };
}

function decodePosition(row) {
  return {
    occupant: row.data[0],
    amount: row.data[1],
    timestamp: Number(row.data[2]),
    referrer: row.data[3],
    isActive: Boolean(row.data[4]),
    activationId: row.activation[0],
    cycleNumber: Number(row.activation[1]),
    isMirror: Boolean(row.activation[2]),
    position: row.position,
  };
}

function canonical(address) {
  return ADDRESS_REPLACEMENTS[address.toLowerCase()] || address;
}

function main() {
  const chain = read(CHAIN_FILE);
  const live = read(LIVE_FILE);
  const db = read(DB_FILE);

  const identities = PAIRS.map((pair) => {
    const oldChain = chain.wallets[pair.oldKey];
    const newLive = live.replacementState.find((row) => row.wallet.toLowerCase() === pair.newWallet.toLowerCase());
    const oldDb = db.wallets[pair.oldKey];
    const legitimateLevels = oldChain.levels.filter((row) => row.active).map((row) => row.level);
    const ownedCurrentOrbits = oldChain.levels
      .filter((row) => row.active && (Number(row.summary[0]) > 0 || row.positions.current.length > 0 || Number(row.summary[6]) > 0))
      .map((row) => ({
        level: row.level,
        orbitType: row.orbitType,
        matrixParent: canonical(row.matrixParent),
        summary: decodeSummary(row.summary),
        lineCounts: { line1: Number(row.lineCounts[0]), line2: Number(row.lineCounts[1]), line3: Number(row.lineCounts[2]) },
        currentPositions: row.positions.current.map(decodePosition).map((position) => ({
          ...position,
          occupant: canonical(position.occupant),
          referrer: canonical(position.referrer),
        })),
      }));
    if (pair.id === "FFN-WP98HB") {
      const level4 = ownedCurrentOrbits.find((row) => row.level === 4);
      if (!level4) throw new Error("WP98HB Level 4 orbit missing from frozen inventory");
      level4.legacySummaryBeforeNormalization = { ...level4.summary };
      level4.summary.escrowBalance = "88000000";
      level4.summary.autoUpgradeCompleted = false;
      level4.normalizationReason = "PHANTOM_72_USDT_WAS_LOCKED_FOR_D39DB4_NOT_WP98HB_IN_TX_0x1c4568498aa3b619d6f76865ed03c1edb381fd5345585ba20f2a90d47ea1a66b";
    }
    const escrowLocks = oldChain.levels.flatMap((row) => row.lockedTransitions)
      .filter((row) => BigInt(row.amount) > 0n);
    const historicalCycles = oldChain.levels.flatMap((row) => row.positions.historical.map((cycle) => ({
      level: row.level,
      orbitType: row.orbitType,
      cycle: cycle.cycle,
      positionCount: cycle.positions.length,
      treatment: "PRESERVE_HISTORY_AND_ALIAS_FOR_READS",
    })));

    return {
      id: pair.id,
      oldWallet: pair.oldWallet,
      newWallet: pair.newWallet,
      preconditions: {
        oldRegistered: oldChain.registered,
        newRegistered: newLive.registered,
        newSponsor: newLive.sponsor,
        newActiveLevels: newLive.activeLevels,
      },
      sponsorAfter: canonical(oldChain.sponsor),
      legitimateActiveLevels: legitimateLevels,
      directChildren: oldDb.descendants.direct,
      descendants: oldDb.descendants,
      escrowLocks,
      ownedCurrentOrbits,
      historicalCycles,
      currentExternalOccurrences: oldDb.currentOccurrences,
      historicalExternalOccurrences: oldDb.historicalOccurrences,
      personallyHeldAssetsAtFrozenBlock: oldChain.balances,
    };
  });

  const sponsorRewrites = live.directChildSponsors.map((row) => ({
    child: row.wallet,
    from: row.sponsor,
    to: canonical(row.sponsor),
  })).filter((row) => row.from.toLowerCase() !== row.to.toLowerCase());

  const matrixParentRewrites = live.live.map((row) => ({
    user: row.occupant,
    level: row.level,
    orbitType: row.orbitType,
    from: row.liveMatrixParent,
    to: canonical(row.liveMatrixParent),
  })).filter((row) => row.from.toLowerCase() !== row.to.toLowerCase());

  const currentOccupantRewrites = identities.flatMap((identity) => identity.currentExternalOccurrences.map((row) => ({
    ...row,
    fromOccupant: identity.oldWallet,
    toOccupant: identity.newWallet,
  })));

  const wpLevel6 = chain.wallets.wp98hbOld.levels.find((row) => row.level === 6);
  const quarantinedLevel6 = {
    owner: PAIRS[0].oldWallet,
    replacementOwner: PAIRS[0].newWallet,
    active: wpLevel6.active,
    summary: decodeSummary(wpLevel6.summary),
    lineCounts: { line1: Number(wpLevel6.lineCounts[0]), line2: Number(wpLevel6.lineCounts[1]), line3: Number(wpLevel6.lineCounts[2]) },
    positions: wpLevel6.positions.current.map(decodePosition),
    treatment: "QUARANTINE_INVALID_DO_NOT_COPY_TO_REPLACEMENT_CURRENT_STATE",
    preserveTransactions: [
      "0x7e00b766b89e80621f917378e4d83c52c57ab35e56c4e576c878a75448354cb4",
      "0x03ffc96ad0d200bf5d2d4fe57325cdef76a030ea7650f946bd94c63d19c40975",
    ],
    forkProofRequired: true,
  };

  const utilityTokenMoves = PAIRS.map((pair) => {
    const oldState = live.tokenState.find((row) => row.wallet.toLowerCase() === pair.oldWallet.toLowerCase());
    const newState = live.tokenState.find((row) => row.wallet.toLowerCase() === pair.newWallet.toLowerCase());
    if (!oldState || !newState) throw new Error(`Token state missing for ${pair.id}`);
    return {
      id: pair.id,
      oldWallet: pair.oldWallet,
      newWallet: pair.newWallet,
      from: oldState,
      replacementBefore: newState,
      treatment: "MOVE_BALANCES_STORAGE_LEVEL_TOTAL_SUPPLY_UNCHANGED_HISTORY_PRESERVED",
    };
  });

  const manifestBody = {
    status: "DRAFT_NOT_CERTIFIED",
    chainId: 137,
    frozenBlock: chain.frozenBlock,
    latestReferenceAuditBlock: live.blockNumber,
    parentBeforeChildOrder: PAIRS.map((pair) => pair.id),
    identities,
    sponsorRewrites,
    matrixParentRewrites,
    currentOccupantRewrites,
    quarantinedLevel6,
    utilityTokenMoves,
    utilityTokenSupplyBefore: live.tokenSupply,
    historicalPolicy: "PRESERVE_ORIGINAL_CHAIN_ADDRESSES_AND_ALIAS_ONLY_IN_READ_MODELS",
    oldWalletPolicy: "DISABLE_ALL_FUTURE_PROTOCOL_USE",
    unresolved: [
      "LEVEL6_QUARANTINE_EXACT_FORK_PROOF",
      "FINAL_PRE_EXECUTION_DELTA_RESCAN",
    ],
  };
  const canonicalJson = JSON.stringify(manifestBody);
  const manifest = {
    ...manifestBody,
    draftHash: `sha256:${crypto.createHash("sha256").update(canonicalJson).digest("hex")}`,
  };
  fs.writeFileSync(OUTPUT, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(JSON.stringify({
    output: OUTPUT,
    draftHash: manifest.draftHash,
    identities: identities.length,
    sponsorRewrites: sponsorRewrites.length,
    matrixParentRewrites: matrixParentRewrites.length,
    currentOccupantRewrites: currentOccupantRewrites.length,
    unresolved: manifest.unresolved,
  }, null, 2));
}

main();

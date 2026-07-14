const fs = require("fs");
const path = require("path");
const { ethers } = require("hardhat");

const root = path.resolve(__dirname, "..");
const rolePath = path.join(root, "test-plans", "fresh-priority-wallet-roles.json");
const walletPath = path.resolve(root, "..", "env-files", "fresh-test-wallets.private.json");

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function walletMap(rows) {
  const result = new Map();
  for (const row of rows) {
    if (!row.label || !ethers.isAddress(row.address)) continue;
    result.set(row.label, ethers.getAddress(row.address));
  }
  return result;
}

function addAction(actions, phase, kind, actor, details = {}) {
  const phaseIndex = actions.filter((action) => action.phase === phase).length + 1;
  actions.push({
    id: `${phase}-${String(phaseIndex).padStart(3, "0")}`,
    phase,
    kind,
    actor,
    ...details,
  });
}

function buildPrimaryTree(roles) {
  const parentByPosition = new Map();
  parentByPosition.set(0, roles.primaryOwner);
  for (const [position, wallet] of Object.entries(roles.p39Line1)) {
    parentByPosition.set(Number(position), wallet);
  }
  for (const [position, row] of Object.entries(roles.p39Line2)) {
    parentByPosition.set(Number(position), row.wallet);
  }

  const rows = [];
  for (const [position, wallet] of Object.entries(roles.p39Line1)) {
    rows.push({ position: Number(position), wallet, sponsor: roles.primaryOwner, parentPosition: 0, line: 1 });
  }
  for (const [position, row] of Object.entries(roles.p39Line2)) {
    rows.push({
      position: Number(position),
      wallet: row.wallet,
      sponsor: parentByPosition.get(row.parentPosition),
      parentPosition: row.parentPosition,
      line: 2,
    });
  }
  for (const [position, row] of Object.entries(roles.p39Line3)) {
    rows.push({
      position: Number(position),
      wallet: row.wallet,
      sponsor: parentByPosition.get(row.parentPosition),
      parentPosition: row.parentPosition,
      grandParentPosition: ((row.parentPosition - 4) % 3) + 1,
      line: 3,
    });
  }
  return rows.sort((a, b) => a.position - b.position);
}

function buildManifest() {
  const roleFile = readJson(rolePath);
  const roles = roleFile.roles;
  const wallets = walletMap(readJson(walletPath));
  const primaryTree = buildPrimaryTree(roles);
  const actions = [];

  addAction(actions, "P0", "assertDeployment", "SYSTEM", { proves: "fresh deployment wiring and preserved MockUSDT" });
  addAction(actions, "P1", "assertCleanState", "SYSTEM", { proves: "ID1-only chain, database, API, and UI state" });

  addAction(actions, "P2", "register", roles.primaryOwner, {
    sponsor: "ID1",
    expected: { level: 1, orbit: "P4", gross: "10", systemCharge: "1" },
  });
  for (const row of primaryTree) {
    addAction(actions, "P2", "register", row.wallet, {
      sponsor: row.sponsor,
      expected: { level: 1, orbit: "P4", gross: "10", systemCharge: "1" },
    });
  }

  addAction(actions, "P8", "assertAutoUpgrade", roles.primaryOwner, {
    checkpoint: "after-primary-registration",
    fromLevel: 1,
    toLevel: 2,
    requiredEscrow: "20",
    expectedActivations: 1,
  });

  const p39CompletionCandidates = [
    ...Array.from({ length: 11 }, (_, index) => `Account ${48 + index}`),
    ...Array.from({ length: 15 }, (_, index) => `Account ${67 + index}`),
  ];
  const p39MissingLevel2 = new Set([
    ...Array.from({ length: 8 }, (_, index) => `Account ${51 + index}`),
    "Account 67", "Account 68", "Account 69", "Account 72", "Account 73", "Account 78", "Account 81",
  ]);
  const p39MissingLevel3 = new Set([
    ...Array.from({ length: 11 }, (_, index) => `Account ${48 + index}`),
    "Account 67", "Account 68", "Account 69", "Account 70", "Account 71", "Account 72", "Account 73", "Account 74",
    "Account 78", "Account 80", "Account 81",
  ]);
  addAction(actions, "P15", "register", "Account 81", {
    sponsor: "Account 9",
    purpose: "final controlled P39 arrival",
  });
  for (const actor of p39CompletionCandidates) {
    if (p39MissingLevel2.has(actor)) {
      addAction(actions, "P15", "ensureLevel", actor, {
        level: 2,
        payoutRule: "P12_40_50_10",
      });
    }
    if (p39MissingLevel3.has(actor)) {
      addAction(actions, "P15", "ensureLevel", actor, {
        level: 3,
        payoutRule: "P39_20_20_50_10",
      });
    }
  }
  for (let account = 82; account <= 111; account += 1) {
    const actor = `Account ${account}`;
    addAction(actions, "P16", "register", actor, {
      sponsor: "Account 9",
      purpose: "Account 9 P39 completion and post-recycle proof",
    });
    addAction(actions, "P16", "ensureLevel", actor, {
      level: 2,
      payoutRule: "P12_40_50_10",
    });
    addAction(actions, "P16", "ensureLevel", actor, {
      level: 3,
      payoutRule: "P39_20_20_50_10",
    });
  }

  for (const row of primaryTree) {
    addAction(actions, "P4", "ensureLevel", row.wallet, {
      level: 2,
      expectedTopology: {
        owner: roles.primaryOwner,
        position: row.position <= 12 ? row.position : null,
        line: row.position <= 3 ? 1 : row.position <= 12 ? 2 : null,
        parentPosition: row.position <= 12 ? row.parentPosition : null,
      },
      payoutRule: "P12_40_50_10",
    });
  }

  addAction(actions, "P8", "assertAutoUpgrade", roles.primaryOwner, {
    checkpoint: "after-p12-structure",
    fromLevel: 2,
    toLevel: 3,
    requiredEscrow: "40",
    expectedActivations: 1,
  });

  addAction(actions, "P5", "ensureLevel", roles.primaryOwner, { level: 3, payoutRule: "P39_20_20_50_10" });
  for (const row of primaryTree) {
    addAction(actions, "P5", "ensureLevel", row.wallet, {
      level: 3,
      expectedTopology: {
        owner: roles.primaryOwner,
        position: row.position,
        line: row.line,
        parentPosition: row.parentPosition,
        grandParentPosition: row.grandParentPosition || null,
      },
      payoutRule: "P39_20_20_50_10",
      recycleWindow: row.position === 38 ? "reserve-1" : row.position === 39 ? "reserve-2-release" : null,
    });
  }

  addAction(actions, "P8", "assertAutoUpgrade", roles.primaryOwner, {
    checkpoint: "after-p39-structure",
    fromLevel: 3,
    toLevel: 4,
    requiredEscrow: "80",
    expectedActivations: 1,
  });

  for (const actor of roles.repeatedParentScenario) {
    addAction(actions, "P6", "register", actor, {
      sponsor: roles.primaryOwner,
      purpose: "post-recycle latest-parent occurrence proof",
    });
    addAction(actions, "P6", "ensureLevel", actor, {
      level: 2,
      expectedParentOccurrence: "LATEST",
    });
    addAction(actions, "P6", "ensureLevel", actor, {
      level: 3,
      expectedParentOccurrence: "LATEST",
    });
  }

  const p4 = roles.p4ChainedRecycle;
  const p4Registrations = [
    [p4.root, "ID1", "root"],
    [p4.middle, p4.root, "root-position-1"],
    [p4.lower, p4.middle, "middle-position-1"],
    [p4.rootPrefill[0], p4.root, "root-position-2"],
    [p4.rootPrefill[1], p4.root, "root-position-3"],
    [p4.middlePrefill[0], p4.middle, "middle-position-2"],
    [p4.middlePrefill[1], p4.middle, "middle-position-3"],
    [p4.lowerFill[0], p4.lower, "lower-position-1"],
    [p4.lowerFill[1], p4.lower, "lower-position-2"],
    [p4.lowerFill[2], p4.lower, "lower-position-3"],
    [p4.lowerFill[3], p4.lower, "lower-position-4-chain-trigger"],
  ];
  for (const [actor, sponsor, purpose] of p4Registrations) {
    addAction(actions, "P3", "register", actor, {
      sponsor,
      purpose,
      expected: { gross: "10", component: "9", systemCharge: "1" },
      expectedRecycleChain: purpose === "lower-position-4-chain-trigger"
        ? [
            { orbitOwner: p4.lower, receiver: p4.middle, amount: "9" },
            { orbitOwner: p4.middle, receiver: p4.root, amount: "9" },
            { orbitOwner: p4.root, receiver: "ID1", amount: "9" },
          ]
        : null,
    });
  }

  const skip = roles.inactiveUplineChain;
  addAction(actions, "P7", "register", skip.eligibleRoot, { sponsor: "ID1" });
  addAction(actions, "P7", "ensureLevel", skip.eligibleRoot, { level: 2 });
  addAction(actions, "P7", "ensureLevel", skip.eligibleRoot, { level: 3 });
  addAction(actions, "P7", "register", skip.inactiveMiddle, { sponsor: skip.eligibleRoot });
  addAction(actions, "P7", "register", skip.actorBeforeEligibility, { sponsor: skip.inactiveMiddle });
  addAction(actions, "P7", "ensureLevel", skip.actorBeforeEligibility, { level: 2 });
  addAction(actions, "P7", "ensureLevel", skip.actorBeforeEligibility, {
    level: 3,
    expectedEligibleUpline: skip.eligibleRoot,
    expectedSkippedUpline: skip.inactiveMiddle,
  });
  addAction(actions, "P7", "ensureLevel", skip.inactiveMiddle, { level: 2 });
  addAction(actions, "P7", "ensureLevel", skip.inactiveMiddle, { level: 3 });
  addAction(actions, "P7", "register", skip.actorAfterEligibility, { sponsor: skip.inactiveMiddle });
  addAction(actions, "P7", "ensureLevel", skip.actorAfterEligibility, { level: 2 });
  addAction(actions, "P7", "ensureLevel", skip.actorAfterEligibility, {
    level: 3,
    expectedEligibleUpline: skip.inactiveMiddle,
  });

  for (const actor of roles.id1FounderFallback) {
    addAction(actions, "P9", "register", actor, { sponsor: "ID1", expectedTerminalRoute: "ID1_FOUNDERS_NORMAL" });
  }

  for (const [caseName, actor] of Object.entries(roles.failureCases)) {
    addAction(actions, "P10", "negativeCase", actor, { caseName, expectedStateChange: "NONE" });
  }

  addAction(actions, "P11", "assertReconciliation", "SYSTEM", {
    layers: ["CHAIN", "WORKER", "DATABASE", "API", "UI"],
  });

  // Post-upgrade live regression for the founder-approved Rule A. These
  // reserved wallets are intentionally outside the original fresh-state run.
  addAction(actions, "P12", "register", "Account 66", { sponsor: "ID1" });
  addAction(actions, "P12", "ensureLevel", "Account 66", { level: 2 });
  addAction(actions, "P12", "ensureLevel", "Account 66", { level: 3 });
  addAction(actions, "P12", "register", "Account 75", { sponsor: "Account 66" });
  addAction(actions, "P12", "register", "Account 76", { sponsor: "Account 75" });
  addAction(actions, "P12", "ensureLevel", "Account 76", {
    level: 2,
    expectedEligibleUpline: "Account 66",
    expectedSkippedUpline: "Account 75",
  });
  addAction(actions, "P12", "ensureLevel", "Account 76", {
    level: 3,
    expectedEligibleUpline: "Account 66",
    expectedSkippedUpline: "Account 75",
  });
  addAction(actions, "P12", "ensureLevel", "Account 75", { level: 2 });
  addAction(actions, "P12", "ensureLevel", "Account 75", { level: 3 });
  addAction(actions, "P12", "register", "Account 77", { sponsor: "Account 75" });
  addAction(actions, "P12", "ensureLevel", "Account 77", {
    level: 2,
    expectedEligibleUpline: "Account 75",
  });
  addAction(actions, "P12", "ensureLevel", "Account 77", {
    level: 3,
    expectedEligibleUpline: "Account 75",
  });
  addAction(actions, "P12", "register", "Account 78", { sponsor: "ID1" });
  addAction(actions, "P12", "register", "Account 79", { sponsor: "Account 78" });
  addAction(actions, "P12", "ensureLevel", "Account 79", {
    level: 2,
    expectedTerminalRoute: "ID1_FOUNDERS",
  });
  addAction(actions, "P12", "ensureLevel", "Account 79", {
    level: 3,
    expectedTerminalRoute: "ID1_FOUNDERS",
  });

  addAction(actions, "P13", "register", "Account 70", { sponsor: roles.primaryOwner });
  addAction(actions, "P13", "ensureLevel", "Account 70", { level: 2 });
  addAction(actions, "P13", "register", "Account 71", { sponsor: roles.primaryOwner });
  addAction(actions, "P13", "ensureLevel", "Account 71", { level: 2 });
  addAction(actions, "P13", "register", "Account 74", { sponsor: roles.primaryOwner });
  addAction(actions, "P13", "ensureLevel", "Account 74", {
    level: 2,
  });

  addAction(actions, "P14", "register", "Account 80", { sponsor: roles.primaryOwner });
  addAction(actions, "P14", "ensureLevel", "Account 80", {
    level: 2,
    expectedRecycleChain: [
      { orbitOwner: roles.primaryOwner, receiver: "ID1", amount: "20" },
    ],
  });

  const publicWallets = Object.fromEntries([...wallets.entries()]);
  const phaseOrder = ["P0", "P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "P10", "P11", "P12", "P13", "P14", "P15", "P16"];
  actions.sort((a, b) => {
    const phaseDifference = phaseOrder.indexOf(a.phase) - phaseOrder.indexOf(b.phase);
    return phaseDifference || a.id.localeCompare(b.id);
  });

  return {
    version: 1,
    generatedAt: new Date().toISOString(),
    network: "amoy",
    chainId: 80002,
    preserveMockUsdt: roleFile.preserveMockUsdt,
    walletCount: wallets.size,
    wallets: publicWallets,
    roles,
    primaryP39Topology: primaryTree,
    actions,
    requiredPhases: ["P0", "P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "P10", "P11", "P12", "P13", "P14", "P15", "P16"],
  };
}

function validateManifest(manifest) {
  const errors = [];
  const ids = new Set();
  for (const action of manifest.actions) {
    if (ids.has(action.id)) errors.push(`duplicate action id ${action.id}`);
    ids.add(action.id);
  }
  const positions = manifest.primaryP39Topology.map((row) => row.position);
  if (positions.length !== 39 || positions.some((position, index) => position !== index + 1)) {
    errors.push("primary P39 topology must contain positions 1 through 39 exactly once");
  }
  const covered = new Set(manifest.actions.map((action) => action.phase));
  for (const phase of manifest.requiredPhases) {
    if (!covered.has(phase)) errors.push(`phase ${phase} has no action`);
  }
  if (manifest.walletCount !== 104) errors.push(`expected 104 wallets, found ${manifest.walletCount}`);
  if (errors.length) throw new Error(errors.join("\n"));
}

function printManifest(manifest) {
  const output = process.env.TEST_MANIFEST_OUTPUT;
  if (output) {
    const outputPath = path.resolve(process.cwd(), output);
    fs.writeFileSync(outputPath, `${JSON.stringify(manifest, null, 2)}\n`);
    console.log(`Manifest written: ${outputPath}`);
  }

  const phaseCounts = manifest.actions.reduce((counts, action) => {
    counts[action.phase] = (counts[action.phase] || 0) + 1;
    return counts;
  }, {});

  console.log(JSON.stringify({
    valid: true,
    walletCount: manifest.walletCount,
    topologyPositions: manifest.primaryP39Topology.length,
    actionCount: manifest.actions.length,
    phaseCounts,
    preservedMockUsdt: manifest.preserveMockUsdt,
  }, null, 2));

  if (String(process.env.TEST_PRINT_ACTIONS || "false").toLowerCase() === "true") {
    for (const action of manifest.actions) console.log(JSON.stringify(action));
  }
}

module.exports = { buildManifest, validateManifest };

if (require.main === module) {
  const manifest = buildManifest();
  validateManifest(manifest);
  printManifest(manifest);
}

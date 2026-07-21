const fs = require("node:fs");
const path = require("node:path");
const { ethers } = require("hardhat");

const PRODUCTION = {
  multisig: "0x785cC854ce9e13CE1140cbFD7C08620713E1711d",
  guardian: "0x290c2300296379BD0048aFe9099Ed6Fc81BF75fC",
  registration: "0x02ECA97e944Ac66b0444fd5F61A716917E83CfF5",
  levelManager: "0x0E9De0F24eB4774834A2c4A63eaBa8356A4A4B53",
  p4: "0x1ED0b443c880Ba88F732c3F5915561A07B21F6B4",
  p12: "0xCF998d8f7E9DD4f3FacFbA45e656dE07142f824b",
  p39: "0xEaD39819B8C4DBb0669320542B6B847D4c31b8Fb",
  oldRouter: "0x66683F35b2cd42b8B66C0E078acc7005CB558F25",
};

const OLD_IMPLEMENTATIONS = {
  registration: "0xcA2C7Ea6F50a5b23aEc69d06Ff6317a49E704D7F",
  levelManager: "0x469A16bAB40c760AcddA7150b397123B88fCbb2e",
  p4: "0x8ED893df949648cD38D15D23cD5eAC36cC429Fa0",
  p12: "0xA738c1F5B50e199cF7199Cd45f47AA659CF71d64",
  p39: "0xc203Dc156DbBCF75ff9bD5d3e3C46EA6013Cd1A5",
};

const VERIFIED_GRANDFATHER_P12 = [
  "0x863447369632ea4aac724683c1d448c68e2f1ade",
  "0xc0545331e20587208d4b27b2a3e4920cc481133a",
];

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function requireAddress(value, label) {
  if (!ethers.isAddress(value)) throw new Error(`${label} is not a valid address`);
  return ethers.getAddress(value);
}

function action(stage, label, target, data, checks = []) {
  return { index: 0, stage, label, target: requireAddress(target, `${label} target`), value: "0", data, checks };
}

function main() {
  const deploymentFile = process.env.MIGRATION_IMPLEMENTATIONS_FILE;
  if (!deploymentFile) throw new Error("MIGRATION_IMPLEMENTATIONS_FILE is required");
  const deployment = readJson(path.resolve(deploymentFile));
  if (deployment.chainId !== 137 || !deployment.productionProxiesUnchanged) {
    throw new Error("Implementation artifact is not a Polygon inert-deployment artifact");
  }

  const ledgerFile = path.resolve(__dirname, "../test-reports/production-matrix-parent-ledger-latest.json");
  const forkReportFile = path.resolve(__dirname, "../test-reports/production-fork-migration-latest.json");
  const ledger = readJson(ledgerFile);
  const forkReport = readJson(forkReportFile);
  if (ledger.summary.unresolvedCount !== 0 || ledger.seeds.length !== ledger.summary.seedCount) {
    throw new Error("Matrix-parent ledger is incomplete");
  }
  if (forkReport.verdict !== "PASS" || forkReport.forkBlock !== ledger.sourceBlock) {
    throw new Error("Latest production fork report does not match the refreshed parent ledger block");
  }
  if (forkReport.after.parentSeedChecks.checked !== ledger.seeds.length || forkReport.after.parentSeedChecks.mismatches.length) {
    throw new Error("Fork report and parent ledger do not reconcile");
  }
  if (!Array.isArray(forkReport.transactionRehearsal) || forkReport.transactionRehearsal.length !== VERIFIED_GRANDFATHER_P12.length || forkReport.transactionRehearsal.some((row) => !row.passed)) {
    throw new Error("Both verified grandfather transitions must pass before package generation");
  }
  if (!forkReport.fullLevelRehearsal?.passed) {
    throw new Error("The independent Levels 1-10 fork rehearsal must pass before package generation");
  }

  const impl = {};
  for (const name of ["registration", "levelManager", "p4", "p12", "p39", "router"]) {
    impl[name] = requireAddress(deployment.contracts?.[name]?.address, `deployment.contracts.${name}.address`);
  }

  const guardian = new ethers.Interface([
    "function setApprovedProxy(address,bool)",
    "function batchSetApprovedImplementations(address,address[],bool)",
  ]);
  const uups = new ethers.Interface(["function upgradeToAndCall(address,bytes)"]);
  const manager = new ethers.Interface([
    "function pause()",
    "function unpause()",
    "function setSettlementRouter(address)",
  ]);
  const registration = new ethers.Interface([
    "function seedCurrentMatrixParents(address[] users,uint8[] levels,address[] parents)",
    "function finalizeMatrixParentMigration()",
  ]);

  const actions = [];
  const proxyImpls = [
    ["Registration", PRODUCTION.registration, [impl.registration]],
    ["LevelManager", PRODUCTION.levelManager, [impl.levelManager]],
    ["P4", PRODUCTION.p4, [impl.p4]],
    ["P12", PRODUCTION.p12, [impl.p12]],
    ["P39", PRODUCTION.p39, [impl.p39]],
  ];
  for (const [name, proxy, implementations] of proxyImpls) {
    actions.push(action("PREAPPROVAL", `Approve ${name} proxy`, PRODUCTION.guardian,
      guardian.encodeFunctionData("setApprovedProxy", [proxy, true])));
    actions.push(action("PREAPPROVAL", `Approve ${name} implementations`, PRODUCTION.guardian,
      guardian.encodeFunctionData("batchSetApprovedImplementations", [proxy, implementations, true])));
  }

  actions.push(action("MIGRATION", "Pause LevelManager", PRODUCTION.levelManager,
    manager.encodeFunctionData("pause"), ["LevelManager.paused() == true"]));
  actions.push(action("MIGRATION", "Upgrade Registration", PRODUCTION.registration,
    uups.encodeFunctionData("upgradeToAndCall", [impl.registration, "0x"])));
  actions.push(action("MIGRATION", "Upgrade P4", PRODUCTION.p4,
    uups.encodeFunctionData("upgradeToAndCall", [impl.p4, "0x"])));
  actions.push(action("MIGRATION", "Upgrade P12", PRODUCTION.p12,
    uups.encodeFunctionData("upgradeToAndCall", [impl.p12, "0x"])));
  actions.push(action("MIGRATION", "Upgrade P39", PRODUCTION.p39,
    uups.encodeFunctionData("upgradeToAndCall", [impl.p39, "0x"])));
  actions.push(action("MIGRATION", "Upgrade LevelManager", PRODUCTION.levelManager,
    uups.encodeFunctionData("upgradeToAndCall", [impl.levelManager, "0x"])));

  for (let offset = 0; offset < ledger.seeds.length; offset += 35) {
    const batch = ledger.seeds.slice(offset, offset + 35);
    actions.push(action("MIGRATION", `Seed Registration parents ${offset + 1}-${offset + batch.length}`, PRODUCTION.registration,
      registration.encodeFunctionData("seedCurrentMatrixParents", [
        batch.map((row) => row.occupant),
        batch.map((row) => row.level),
        batch.map((row) => row.parent),
      ])));
  }
  actions.push(action("MIGRATION", "Finalize Registration parent migration", PRODUCTION.registration,
    registration.encodeFunctionData("finalizeMatrixParentMigration"), [
      `Registration parent seed count == ${ledger.seeds.length}`,
      "Registration.matrixParentMigrationFinalized() == true",
    ]));
  actions.push(action("MIGRATION", "Set corrected settlement router", PRODUCTION.levelManager,
    manager.encodeFunctionData("setSettlementRouter", [impl.router])));
  actions.push(action("MIGRATION", "Unpause LevelManager", PRODUCTION.levelManager,
    manager.encodeFunctionData("unpause"), ["All post-migration invariants PASS", "LevelManager.paused() == false"]));

  actions.forEach((entry, index) => { entry.index = index; });

  const rollback = [
    action("ROLLBACK", "Restore old settlement router", PRODUCTION.levelManager,
      manager.encodeFunctionData("setSettlementRouter", [PRODUCTION.oldRouter])),
    ...["registration", "p4", "p12", "p39", "levelManager"].map((name) => action(
      "ROLLBACK",
      `Restore old ${name} implementation`,
      PRODUCTION[name],
      uups.encodeFunctionData("upgradeToAndCall", [OLD_IMPLEMENTATIONS[name], "0x"])
    )),
    action("ROLLBACK", "Unpause restored LevelManager after rollback verification", PRODUCTION.levelManager,
      manager.encodeFunctionData("unpause")),
  ];
  rollback.forEach((entry, index) => { entry.index = index; });

  const output = {
    generatedAt: new Date().toISOString(),
    chainId: 137,
    certifiedForkBlock: forkReport.forkBlock,
    multisig: PRODUCTION.multisig,
    requiredConfirmations: 3,
    timelockSeconds: 120,
    ledgerSummary: ledger.summary,
    verifiedGrandfatherP12: VERIFIED_GRANDFATHER_P12,
    implementations: impl,
    actions,
    rollback,
    executionRules: [
      "Execute PREAPPROVAL actions before pausing; they do not change participant behavior.",
      "Immediately before Pause, rescan production and abort if canonical parents or grandfather states changed.",
      "Execute MIGRATION actions strictly by index and verify each receipt before continuing.",
      "No participant activation may be allowed between Pause and Unpause.",
      "Do not execute Unpause unless every post-migration invariant passes.",
    ],
  };
  const directory = path.resolve(__dirname, "../migration-packages");
  fs.mkdirSync(directory, { recursive: true });
  const outputFile = path.join(directory, `production-migration-${Date.now()}.json`);
  fs.writeFileSync(outputFile, `${JSON.stringify(output, null, 2)}\n`);
  console.log(JSON.stringify({
    outputFile,
    actions: actions.length,
    preapprovals: actions.filter((row) => row.stage === "PREAPPROVAL").length,
    migrationActions: actions.filter((row) => row.stage === "MIGRATION").length,
    rollbackActions: rollback.length,
    seeds: ledger.seeds.length,
    verifiedGrandfatherTransitions: VERIFIED_GRANDFATHER_P12.length,
  }, null, 2));
}

main();

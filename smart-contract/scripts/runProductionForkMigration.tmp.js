const fs = require("node:fs");
const path = require("node:path");
const http = require("node:http");
const https = require("node:https");
const hre = require("hardhat");
const { ethers, network } = hre;

const FORK_BLOCK = process.env.FORK_BLOCK ? Number(process.env.FORK_BLOCK) : undefined;
const MIGRATION_PACKAGE_FILE = process.env.MIGRATION_PACKAGE_FILE
  ? path.resolve(process.env.MIGRATION_PACKAGE_FILE)
  : null;
const FOCUSED_PACKAGE_ONLY = String(process.env.FOCUSED_PACKAGE_ONLY || "").toLowerCase() === "true";
const ADDRESSES = {
  owner: "0x785cC854ce9e13CE1140cbFD7C08620713E1711d",
  guardian: "0x290c2300296379BD0048aFe9099Ed6Fc81BF75fC",
  usdt: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
  registration: "0x02ECA97e944Ac66b0444fd5F61A716917E83CfF5",
  levelManager: "0x0E9De0F24eB4774834A2c4A63eaBa8356A4A4B53",
  p4: "0x1ED0b443c880Ba88F732c3F5915561A07B21F6B4",
  p12: "0xCF998d8f7E9DD4f3FacFbA45e656dE07142f824b",
  p39: "0xEaD39819B8C4DBb0669320542B6B847D4c31b8Fb",
  escrow: "0x8b3db2AC7e30749479f2dbad14105C8eD4a377d4",
};
const DEFAULT_LEGACY_P12 = [
  "0x863447369632ea4aac724683c1d448c68e2f1ade",
  "0xc0545331e20587208d4b27b2a3e4920cc481133a",
];
const LEGACY_P12 = process.env.LEGACY_P12_OWNER
  ? [process.env.LEGACY_P12_OWNER]
  : DEFAULT_LEGACY_P12;
const IMPLEMENTATION_SLOT =
  "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc";
const LARGE_PARTICIPANT_HOLDERS = [
  "0xbafafb77a090d7f989aa64d4f867b1b942a50591",
  "0xb673c9d14da920f187d25cc793f1955a43284622",
  "0x98ba988eb79b1828d9925b9197324bcc611009c8",
  "0x3f02d99d7398acdb29b2f6dca50a0e35908629c1",
  "0xc0545331e20587208d4b27b2a3e4920cc481133a",
  "0xbdfc98b5ae74f3829de02221d627e4bd6a0943ef",
  "0x41b65562ccdb4baf1f9ab67a1e01c160fcfcddc3",
  "0x3fd47bc432b2c0681d7687adfe77ac0307f1f8f4",
];
let relayServer;

async function startRpcRelay(upstreamUrl) {
  const upstream = new URL(upstreamUrl);
  relayServer = http.createServer((request, response) => {
    const chunks = [];
    request.on("data", (chunk) => chunks.push(chunk));
    request.on("end", () => {
      const body = Buffer.concat(chunks);
      const upstreamRequest = https.request({
        protocol: upstream.protocol,
        hostname: upstream.hostname,
        port: upstream.port || 443,
        path: upstream.pathname,
        method: request.method,
        headers: {
          "content-type": request.headers["content-type"] || "application/json",
          "content-length": body.length,
        },
      }, (upstreamResponse) => {
        response.writeHead(upstreamResponse.statusCode || 502, {
          "content-type": upstreamResponse.headers["content-type"] || "application/json",
        });
        upstreamResponse.pipe(response);
      });
      upstreamRequest.on("error", (error) => {
        response.writeHead(502, { "content-type": "application/json" });
        response.end(JSON.stringify({ error: error.message }));
      });
      upstreamRequest.setTimeout(45_000, () => {
        upstreamRequest.destroy(new Error("Upstream RPC request timed out after 45 seconds"));
      });
      upstreamRequest.end(body);
    });
  });
  await new Promise((resolve) => relayServer.listen(0, "127.0.0.1", resolve));
  const address = relayServer.address();
  return `http://127.0.0.1:${address.port}`;
}

function serialize(value) {
  if (typeof value === "bigint") return value.toString();
  if (Array.isArray(value)) return value.map(serialize);
  if (value && typeof value === "object") {
    const output = {};
    for (const [key, entry] of Object.entries(value)) {
      if (!/^\d+$/.test(key)) output[key] = serialize(entry);
    }
    return Object.keys(output).length ? output : Array.from(value).map(serialize);
  }
  return value;
}

async function implementationOf(address) {
  const stored = await ethers.provider.getStorage(address, IMPLEMENTATION_SLOT);
  return ethers.getAddress(`0x${stored.slice(-40)}`);
}

async function deployImplementation(name, deployer, args = []) {
  const factory = await ethers.getContractFactory(name, deployer);
  const contract = await factory.deploy(...args);
  await contract.waitForDeployment();
  return contract;
}

async function approveAndUpgrade(guardian, owner, proxyAddress, implementation) {
  const implementationAddress = await implementation.getAddress();
  if (!(await guardian.approvedProxies(proxyAddress))) {
    await (await guardian.connect(owner).setApprovedProxy(proxyAddress, true)).wait();
  }
  await (await guardian.connect(owner).setApprovedImplementation(proxyAddress, implementationAddress, true)).wait();
  const proxy = new ethers.Contract(
    proxyAddress,
    ["function upgradeToAndCall(address newImplementation, bytes data) payable"],
    owner
  );
  await (await proxy.upgradeToAndCall(implementationAddress, "0x")).wait();
  const actual = await implementationOf(proxyAddress);
  if (actual !== implementationAddress) {
    throw new Error(`Implementation mismatch for ${proxyAddress}: ${actual} != ${implementationAddress}`);
  }
}

async function orbitState(factoryName, proxyAddress, owner, level) {
  const orbit = await ethers.getContractAt(factoryName, proxyAddress);
  return serialize(await orbit.getUserOrbit(owner, level));
}

async function fundFromForkHolders(token, recipient, requiredAmount, holders) {
  let remaining = requiredAmount;
  const transfers = [];
  for (const holder of [...new Set(holders.map((address) => address.toLowerCase()))]) {
    if (remaining === 0n || holder === recipient.toLowerCase()) break;
    const balance = await token.balanceOf(holder);
    if (balance === 0n) continue;
    const amount = balance < remaining ? balance : remaining;
    await network.provider.request({ method: "hardhat_impersonateAccount", params: [holder] });
    await network.provider.send("hardhat_setBalance", [holder, "0x3635C9ADC5DEA00000"]);
    const signer = await ethers.getSigner(holder);
    await (await token.connect(signer).transfer(recipient, amount)).wait();
    transfers.push({ holder, amount: amount.toString() });
    remaining -= amount;
  }
  if (remaining !== 0n) throw new Error(`Fork holders are short by ${remaining} USDT base units`);
  return transfers;
}

async function main() {
  const rpcUrl = process.env.MAINNET_RPC_URL;
  if (!rpcUrl) throw new Error("MAINNET_RPC_URL is required");
  const ledgerPath = path.resolve(
    __dirname,
    "../test-reports/production-matrix-parent-ledger-latest.json"
  );
  const ledger = JSON.parse(fs.readFileSync(ledgerPath, "utf8"));
  if (
    ledger.summary.unresolvedCount !== 0 ||
    ledger.seeds.length === 0 ||
    ledger.seeds.length !== ledger.summary.seedCount
  ) {
    throw new Error("Matrix-parent ledger is incomplete or stale");
  }
  const exactPackage = MIGRATION_PACKAGE_FILE
    ? JSON.parse(fs.readFileSync(MIGRATION_PACKAGE_FILE, "utf8"))
    : null;
  if (exactPackage) {
    if (exactPackage.chainId !== 137) throw new Error("Exact package is not for Polygon");
    if (FORK_BLOCK !== exactPackage.certifiedForkBlock) {
      throw new Error("Exact package and requested fork block differ");
    }
    if (exactPackage.ledgerSummary.seedCount !== ledger.seeds.length) {
      throw new Error("Exact package and parent ledger seed counts differ");
    }
  }

  const relayUrl = await startRpcRelay(rpcUrl);
  await network.provider.request({
    method: "hardhat_reset",
    params: [{
      forking: FORK_BLOCK
        ? { jsonRpcUrl: relayUrl, blockNumber: FORK_BLOCK }
        : { jsonRpcUrl: relayUrl },
    }],
  });

  const [deployer] = await ethers.getSigners();
  await network.provider.request({ method: "hardhat_impersonateAccount", params: [ADDRESSES.owner] });
  await network.provider.send("hardhat_setBalance", [ADDRESSES.owner, "0x3635C9ADC5DEA00000"]);
  const owner = await ethers.getSigner(ADDRESSES.owner);

  const Guardian = await ethers.getContractFactory("Guardian");
  const guardian = Guardian.attach(ADDRESSES.guardian);
  if ((await guardian.owner()) !== ADDRESSES.owner) throw new Error("Unexpected guardian owner");
  if (await guardian.paused()) throw new Error("Guardian is paused");
  if (await guardian.globalUpgradeFreeze()) throw new Error("Guardian upgrades are frozen");

  const LevelManager = await ethers.getContractFactory("LevelManager");
  const levelManager = LevelManager.attach(ADDRESSES.levelManager);
  const Registration = await ethers.getContractFactory("RegistrationFixed");
  const P4 = await ethers.getContractFactory("P4Orbit");
  const P12 = await ethers.getContractFactory("P12Orbit");
  const P39 = await ethers.getContractFactory("P39Orbit");
  let registration = Registration.attach(ADDRESSES.registration);
  const usdt = new ethers.Contract(
    ADDRESSES.usdt,
    [
      "function balanceOf(address) view returns (uint256)",
      "function transfer(address,uint256) returns (bool)",
      "function approve(address,uint256) returns (bool)",
    ],
    ethers.provider
  );

  const before = {
    block: await ethers.provider.getBlockNumber(),
    implementations: {},
    levelManager: {
      owner: await levelManager.owner(),
      guardian: await levelManager.guardian(),
      registration: await levelManager.registration(),
      escrow: await levelManager.escrow(),
      id1Wallet: await levelManager.id1Wallet(),
      nextActivationId: (await levelManager.nextActivationId()).toString(),
    },
    registration: {
      owner: await registration.owner(),
      id1Wallet: await registration.id1Wallet(),
      levelManager: await registration.levelManager(),
    },
    balances: {},
    affectedP12: {},
  };
  for (const [name, address] of Object.entries({
    registration: ADDRESSES.registration,
    levelManager: ADDRESSES.levelManager,
    p4: ADDRESSES.p4,
    p12: ADDRESSES.p12,
    p39: ADDRESSES.p39,
  })) before.implementations[name] = await implementationOf(address);
  for (const [name, address] of Object.entries({
    registration: ADDRESSES.registration,
    levelManager: ADDRESSES.levelManager,
    escrow: ADDRESSES.escrow,
    p4: ADDRESSES.p4,
    p12: ADDRESSES.p12,
    p39: ADDRESSES.p39,
  })) before.balances[name] = (await usdt.balanceOf(address)).toString();
  for (const wallet of LEGACY_P12) {
    before.affectedP12[wallet.toLowerCase()] = await orbitState("P12Orbit", ADDRESSES.p12, wallet, 2);
  }

  let implementations;
  if (exactPackage) {
    implementations = {
      registration: Registration.attach(exactPackage.implementations.registration),
      levelManager: LevelManager.attach(exactPackage.implementations.levelManager),
      p4: P4.attach(exactPackage.implementations.p4),
      p12: P12.attach(exactPackage.implementations.p12),
      p39: P39.attach(exactPackage.implementations.p39),
      router: await ethers.getContractAt("LevelSettlementRouter", exactPackage.implementations.router),
    };
    for (const proposal of exactPackage.actions) {
      const receipt = await (await owner.sendTransaction({
        to: proposal.target,
        value: BigInt(proposal.value),
        data: proposal.data,
        gasLimit: 30_000_000,
      })).wait();
      console.log(`FORK_PACKAGE_ACTION: ${proposal.index} ${proposal.label} ${receipt.hash}`);
    }
    console.log("FORK_PHASE: exact_package_executed");
  } else {
    if (!(await levelManager.paused())) {
      await (await levelManager.connect(owner).pause()).wait();
    }
    console.log("FORK_PHASE: paused");

    implementations = {
      registration: await deployImplementation("RegistrationFixed", deployer),
      levelManager: await deployImplementation("LevelManager", deployer),
      p4: await deployImplementation("P4Orbit", deployer),
      p12: await deployImplementation("P12Orbit", deployer),
      p39: await deployImplementation("P39Orbit", deployer),
    };
    implementations.router = await deployImplementation(
      "LevelSettlementRouter",
      deployer,
      [ADDRESSES.levelManager, ADDRESSES.usdt]
    );
    console.log("FORK_PHASE: implementations_deployed");

    await approveAndUpgrade(guardian, owner, ADDRESSES.registration, implementations.registration);
    await approveAndUpgrade(guardian, owner, ADDRESSES.levelManager, implementations.levelManager);
    await approveAndUpgrade(guardian, owner, ADDRESSES.p4, implementations.p4);
    await approveAndUpgrade(guardian, owner, ADDRESSES.p12, implementations.p12);
    await approveAndUpgrade(guardian, owner, ADDRESSES.p39, implementations.p39);
    console.log("FORK_PHASE: all_changed_proxies_upgraded");

    registration = Registration.attach(ADDRESSES.registration).connect(owner);
    for (let offset = 0; offset < ledger.seeds.length; offset += 35) {
      const batch = ledger.seeds.slice(offset, offset + 35);
      await (await registration.seedCurrentMatrixParents(
        batch.map((row) => row.occupant),
        batch.map((row) => row.level),
        batch.map((row) => row.parent)
      )).wait();
    }
    await (await registration.finalizeMatrixParentMigration()).wait();
    console.log("FORK_PHASE: registration_parents_seeded_and_finalized");

    const configuredManager = LevelManager.attach(ADDRESSES.levelManager).connect(owner);
    await (await configuredManager.setSettlementRouter(await implementations.router.getAddress())).wait();
    await (await configuredManager.unpause()).wait();
    console.log("FORK_PHASE: manager_configured_and_unpaused");
  }

  registration = Registration.attach(ADDRESSES.registration).connect(owner);
  const restoredManager = LevelManager.attach(ADDRESSES.levelManager).connect(owner);

  const after = {
    block: await ethers.provider.getBlockNumber(),
    implementations: {},
    levelManager: {
      owner: await restoredManager.owner(),
      guardian: await restoredManager.guardian(),
      registration: await restoredManager.registration(),
      escrow: await restoredManager.escrow(),
      id1Wallet: await restoredManager.id1Wallet(),
      nextActivationId: (await restoredManager.nextActivationId()).toString(),
      settlementRouter: await restoredManager.settlementRouter(),
      paused: await restoredManager.paused(),
    },
    registration: {
      owner: await registration.owner(),
      id1Wallet: await registration.id1Wallet(),
      levelManager: await registration.levelManager(),
      matrixParentMigrationFinalized: await registration.matrixParentMigrationFinalized(),
    },
    balances: {},
    affectedP12: {},
    parentSeedChecks: { checked: 0, mismatches: [] },
  };
  for (const [name, address] of Object.entries({
    registration: ADDRESSES.registration,
    levelManager: ADDRESSES.levelManager,
    p4: ADDRESSES.p4,
    p12: ADDRESSES.p12,
    p39: ADDRESSES.p39,
  })) after.implementations[name] = await implementationOf(address);
  for (const [name, address] of Object.entries({
    registration: ADDRESSES.registration,
    levelManager: ADDRESSES.levelManager,
    escrow: ADDRESSES.escrow,
    p4: ADDRESSES.p4,
    p12: ADDRESSES.p12,
    p39: ADDRESSES.p39,
  })) after.balances[name] = (await usdt.balanceOf(address)).toString();
  for (const wallet of LEGACY_P12) {
    after.affectedP12[wallet.toLowerCase()] = await orbitState("P12Orbit", ADDRESSES.p12, wallet, 2);
  }

  const p12 = P12.attach(ADDRESSES.p12);
  const p39 = P39.attach(ADDRESSES.p39);
  for (const seed of ledger.seeds) {
    const orbit = seed.orbitType === "P12" ? p12 : p39;
    const actual = await orbit.matrixParentOf(seed.occupant, seed.level);
    const registrationActual = await registration.currentMatrixParentOf(seed.occupant, seed.level);
    after.parentSeedChecks.checked += 1;
    if (
      actual.toLowerCase() !== seed.parent.toLowerCase() ||
      registrationActual.toLowerCase() !== seed.parent.toLowerCase()
    ) {
      after.parentSeedChecks.mismatches.push({ ...seed, orbitActual: actual, registrationActual });
    }
  }

  const preserved = {
    levelManagerOwner: after.levelManager.owner === before.levelManager.owner,
    levelManagerGuardian: after.levelManager.guardian === before.levelManager.guardian,
    registrationDependency: after.levelManager.registration === before.levelManager.registration,
    escrowDependency: after.levelManager.escrow === before.levelManager.escrow,
    id1Wallet: after.levelManager.id1Wallet === before.levelManager.id1Wallet,
    nextActivationId: after.levelManager.nextActivationId === before.levelManager.nextActivationId,
    registrationOwner: after.registration.owner === before.registration.owner,
    registrationId1Wallet: after.registration.id1Wallet === before.registration.id1Wallet,
    registrationLevelManager: after.registration.levelManager === before.registration.levelManager,
    registrationMigrationFinalized: after.registration.matrixParentMigrationFinalized === true,
    balances: JSON.stringify(after.balances) === JSON.stringify(before.balances),
    affectedP12: JSON.stringify(after.affectedP12) === JSON.stringify(before.affectedP12),
    allParentsSeeded: after.parentSeedChecks.mismatches.length === 0,
    managerUnpaused: after.levelManager.paused === false,
  };
  const failed = Object.entries(preserved).filter(([, value]) => !value).map(([key]) => key);

  if (exactPackage && FOCUSED_PACKAGE_ONLY) {
    const report = {
      generatedAt: new Date().toISOString(),
      forkBlock: before.block,
      exactPackageFile: MIGRATION_PACKAGE_FILE,
      exactPackageActionsExecuted: exactPackage.actions.length,
      ledgerGeneratedAt: ledger.generatedAt,
      ledgerSummary: ledger.summary,
      before,
      after,
      newImplementations: Object.fromEntries(
        await Promise.all(Object.entries(implementations).map(async ([name, contract]) => [name, await contract.getAddress()]))
      ),
      preserved,
      skippedAsPreviouslyCertified: ["grandfather transaction rehearsal", "Levels 1-10 behavioral rehearsal"],
      verdict: failed.length === 0 ? "PASS" : "FAIL",
      failed,
    };
    const outputPath = path.resolve(__dirname, "../test-reports/production-exact-package-latest.json");
    fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
    console.log(JSON.stringify({
      verdict: report.verdict,
      forkBlock: before.block,
      exactPackageActionsExecuted: report.exactPackageActionsExecuted,
      seedChecks: after.parentSeedChecks.checked,
      seedMismatches: after.parentSeedChecks.mismatches.length,
      preserved,
      report: outputPath,
    }, null, 2));
    await new Promise((resolve) => relayServer.close(resolve));
    relayServer = undefined;
    if (failed.length) throw new Error(`Focused exact-package migration failed: ${failed.join(", ")}`);
    return;
  }

  const transactionRehearsal = [];
  // Funding is fork-only and reverted after each case. The escrow contract is used
  // because its fixed-block token balance was already captured and is deterministic.
  await network.provider.request({ method: "hardhat_impersonateAccount", params: [ADDRESSES.escrow] });
  await network.provider.send("hardhat_setBalance", [ADDRESSES.escrow, "0x3635C9ADC5DEA00000"]);
  const fundingSigner = await ethers.getSigner(ADDRESSES.escrow);
  const fundingUsdt = usdt.connect(fundingSigner);

  for (const legacyOwner of LEGACY_P12) {
    console.log(`FORK_PHASE: rehearsal_start_${legacyOwner}`);
    const snapshot = await network.provider.send("evm_snapshot");
    try {
      const participant = ethers.Wallet.createRandom().connect(ethers.provider);
      await network.provider.send("hardhat_setBalance", [participant.address, "0x3635C9ADC5DEA00000"]);
      await (await fundingUsdt.transfer(participant.address, 40_000_000n)).wait();
      await (await usdt.connect(participant).approve(ADDRESSES.levelManager, 40_000_000n)).wait();
      console.log(`FORK_PHASE: rehearsal_funded_${legacyOwner}`);

      const stateBefore = await orbitState("P12Orbit", ADDRESSES.p12, legacyOwner, 2);
      await (await registration.connect(participant).register(legacyOwner, { gasLimit: 15_000_000 })).wait();
      console.log(`FORK_PHASE: rehearsal_registered_${legacyOwner}`);
      const activation = await registration.connect(participant).activateLevel(2, { gasLimit: 25_000_000 });
      const receipt = await activation.wait();
      console.log(`FORK_PHASE: rehearsal_activated_${legacyOwner}`);
      const stateAfter = await orbitState("P12Orbit", ADDRESSES.p12, legacyOwner, 2);

      const decodedEvents = [];
      for (const log of receipt.logs) {
        for (const contract of [restoredManager, p12, implementations.router]) {
          try {
            const parsed = contract.interface.parseLog(log);
            if (parsed) {
              decodedEvents.push({
                address: log.address,
                name: parsed.name,
                args: serialize(parsed.args),
              });
              break;
            }
          } catch (_) {}
        }
      }
      const legacyEvents = decodedEvents.filter((event) => event.name === "LegacyRecycleTransitionConsumed");
      const reserveEvents = decodedEvents.filter((event) => event.name === "RecycleReserveUpdated");
      const recycleEvents = decodedEvents.filter((event) => event.name === "RecycleCompletedDetailed");
      const resetEvents = decodedEvents.filter((event) => event.name === "OrbitReset");
      const positionEvents = decodedEvents.filter((event) => event.name === "PositionFilled");
      const passed =
        legacyEvents.length === 1 &&
        reserveEvents.length === 0 &&
        recycleEvents.length >= 1 &&
        resetEvents.length >= 1 &&
        positionEvents.length > 0;
      transactionRehearsal.push({
        legacyOwner,
        participant: participant.address,
        transactionHash: receipt.hash,
        stateBefore,
        stateAfter,
        eventCounts: {
          legacyTransition: legacyEvents.length,
          reserveUpdated: reserveEvents.length,
          recycleCompleted: recycleEvents.length,
          orbitReset: resetEvents.length,
          positionFilled: positionEvents.length,
        },
        recycleEvents,
        resetEvents,
        positionEvents,
        passed,
      });
      if (!passed) failed.push(`legacyP12Transaction:${legacyOwner}`);
      console.log(`FORK_PHASE: rehearsal_${passed ? "passed" : "failed"}_${legacyOwner}`);
    } catch (error) {
      transactionRehearsal.push({ legacyOwner, passed: false, error: error.message });
      failed.push(`legacyP12Transaction:${legacyOwner}`);
    } finally {
      await network.provider.send("evm_revert", [snapshot]);
    }
  }

  const fullLevelRehearsal = { passed: false };
  const fullLevelSnapshot = await network.provider.send("evm_snapshot");
  try {
    console.log("FORK_PHASE: full_level_rehearsal_start");
    const participant = ethers.Wallet.createRandom().connect(ethers.provider);
    await network.provider.send("hardhat_setBalance", [participant.address, "0x3635C9ADC5DEA00000"]);
    const [founderWallets] = await restoredManager.getFounderWallets();
    const fundingTransfers = await fundFromForkHolders(
      usdt,
      participant.address,
      10_230_000_000n,
      [...LARGE_PARTICIPANT_HOLDERS, ...founderWallets, ADDRESSES.escrow]
    );
    await (await usdt.connect(participant).approve(ADDRESSES.levelManager, 10_230_000_000n)).wait();

    const receipts = [];
    const registerTx = await registration.connect(participant).register(before.levelManager.id1Wallet, { gasLimit: 25_000_000 });
    receipts.push({ level: 1, receipt: await registerTx.wait() });
    for (let level = 2; level <= 10; level += 1) {
      const activationTx = await registration.connect(participant).activateLevel(level, { gasLimit: 30_000_000 });
      receipts.push({ level, receipt: await activationTx.wait() });
    }

    const levels = [];
    let allActive = true;
    for (let level = 1; level <= 10; level += 1) {
      const active = await registration.isLevelActivated(participant.address, level);
      levels.push({ level, active });
      if (!active) allActive = false;
    }

    const transactionAudits = [];
    for (const { level, receipt } of receipts) {
      const events = [];
      for (const log of receipt.logs) {
        for (const contract of [restoredManager, registration, P4.attach(ADDRESSES.p4), p12, p39, implementations.router]) {
          try {
            const parsed = contract.interface.parseLog(log);
            if (parsed) {
              events.push({ address: log.address, name: parsed.name, args: serialize(parsed.args) });
              break;
            }
          } catch (_) {}
        }
      }
      const detailedPayouts = events.filter((event) => event.name === "DetailedPayoutReceiptRecorded");
      const ineligibleReceivers = [];
      for (const payout of detailedPayouts) {
        const receiver = payout.args.receiver;
        if (!receiver || receiver === ethers.ZeroAddress || receiver.toLowerCase() === before.levelManager.id1Wallet.toLowerCase()) continue;
        if (!(await registration.isLevelActivated(receiver, level))) {
          ineligibleReceivers.push(receiver);
        }
      }
      const activationEvents = events.filter((event) => event.name === "LevelActivated");
      const positionEvents = events.filter((event) => event.name === "PositionFilled");
      const passed = activationEvents.length > 0 && positionEvents.length > 0 && ineligibleReceivers.length === 0;
      transactionAudits.push({
        level,
        transactionHash: receipt.hash,
        gasUsed: receipt.gasUsed.toString(),
        activationEvents: activationEvents.length,
        positionEvents: positionEvents.length,
        detailedPayouts: detailedPayouts.length,
        ineligibleReceivers,
        passed,
      });
    }
    fullLevelRehearsal.participant = participant.address;
    fullLevelRehearsal.fundingTransfers = fundingTransfers;
    fullLevelRehearsal.levels = levels;
    fullLevelRehearsal.transactions = transactionAudits;
    fullLevelRehearsal.passed = allActive && transactionAudits.every((row) => row.passed);
    if (!fullLevelRehearsal.passed) failed.push("fullLevelRehearsal");
    console.log(`FORK_PHASE: full_level_rehearsal_${fullLevelRehearsal.passed ? "passed" : "failed"}`);
  } catch (error) {
    fullLevelRehearsal.error = error.message;
    failed.push("fullLevelRehearsal");
  } finally {
    await network.provider.send("evm_revert", [fullLevelSnapshot]);
  }

  const report = {
    generatedAt: new Date().toISOString(),
    exactPackageFile: MIGRATION_PACKAGE_FILE,
    forkBlock: before.block,
    ledgerGeneratedAt: ledger.generatedAt,
    ledgerSummary: ledger.summary,
    before,
    after,
    newImplementations: Object.fromEntries(
      await Promise.all(Object.entries(implementations).map(async ([name, contract]) => [name, await contract.getAddress()]))
    ),
    preserved,
    transactionRehearsal,
    fullLevelRehearsal,
    verdict: failed.length === 0 ? "PASS" : "FAIL",
    failed,
  };
  const outputPath = path.resolve(__dirname, "../test-reports/production-fork-migration-latest.json");
  fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify({
    verdict: report.verdict,
    forkBlock: before.block,
    seedChecks: after.parentSeedChecks.checked,
    seedMismatches: after.parentSeedChecks.mismatches.length,
    preserved,
    report: outputPath,
  }, null, 2));
  await new Promise((resolve) => relayServer.close(resolve));
  relayServer = undefined;
  if (failed.length) throw new Error(`Fork migration failed: ${failed.join(", ")}`);
}

main().catch((error) => {
  console.error(error);
  if (relayServer) relayServer.close();
  process.exitCode = 1;
});

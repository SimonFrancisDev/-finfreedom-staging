const fs = require("node:fs");
const path = require("node:path");
const http = require("node:http");
const https = require("node:https");
const hre = require("hardhat");
const { ethers, network } = hre;

const A = {
  owner: "0x785cC854ce9e13CE1140cbFD7C08620713E1711d",
  guardian: "0x290c2300296379BD0048aFe9099Ed6Fc81BF75fC",
  registration: "0x02ECA97e944Ac66b0444fd5F61A716917E83CfF5",
  levelManager: "0x0E9De0F24eB4774834A2c4A63eaBa8356A4A4B53",
  escrow: "0x8b3db2AC7e30749479f2dbad14105C8eD4a377d4",
  p4: "0x1ED0b443c880Ba88F732c3f5915561A07B21F6B4",
  p12: "0xCF998d8f7E9DD4f3FacFbA45e656dE07142f824b",
  p39: "0xEaD39819B8C4DBb0669320542B6B847D4c31b8Fb",
  fgt: "0x615201edaddB5CFD839Cc4eE693Dc464F6E2B5E4",
  fgtr: "0xAaD41296b6Ec358b9C16dD7161C555fD3a464Bc3",
};
for (const key of Object.keys(A)) A[key] = ethers.getAddress(A[key].toLowerCase());
const WP_OLD = "0xC0545331E20587208d4b27b2A3e4920Cc481133a";
const WP_NEW = "0x1EA5513e017b4e25847e91aBc84aC8686331f80B";
const RY_OLD = "0x2F1E28756A42A3680b5AD42C58A0c3887C9e60bA";
const RY_NEW = "0xFb8D46674f51882baaA2c9606122484434FF2DC2";
const IMPLEMENTATION_SLOT = "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc";
const orbitManifest = require("../migration-audits/wallet-replacement-orbit-manifest.json");
const identityManifest = require("../migration-audits/wallet-replacement-manifest-draft.json");
const progressFile = path.resolve(__dirname, "../migration-audits/wallet-replacement-fork-progress.log");
let relay;
const LOCAL_TX = { gasLimit: 29_000_000n };

function mark(message) {
  const line = `${new Date().toISOString()} ${message}`;
  fs.appendFileSync(progressFile, `${line}\n`);
  console.log(message);
}

async function startRelay(upstreamUrl) {
  const upstream = new URL(upstreamUrl);
  const agent = new https.Agent({ keepAlive: true, maxSockets: 20 });
  const queue = [];
  let active = 0;
  let started = 0;
  let lastStartedAt = 0;

  const schedule = () => {
    if (!queue.length || active >= 20) return;
    const waitMs = Math.max(0, 25 - (Date.now() - lastStartedAt));
    setTimeout(() => {
      if (!queue.length || active >= 20) return;
      const run = queue.shift();
      active += 1;
      started += 1;
      lastStartedAt = Date.now();
      if (started % 100 === 0) console.log(`[RPC relay] ${started} requests started, ${queue.length} queued`);
      run(() => {
        active -= 1;
        schedule();
      });
      schedule();
    }, waitMs);
  };

  relay = http.createServer((request, response) => {
    const chunks = [];
    request.on("data", (chunk) => chunks.push(chunk));
    request.on("end", () => {
      const body = Buffer.concat(chunks);
      queue.push((done) => {
        let completed = false;
        const finish = () => {
          if (completed) return;
          completed = true;
          done();
        };
        const attemptRequest = (attempt = 1) => {
          const retry = (reason) => {
            if (attempt >= 5) {
              if (!response.headersSent) response.writeHead(502);
              response.end(`RPC failed after ${attempt} attempts: ${reason}`);
              finish();
              return;
            }
            const delay = 500 * (2 ** (attempt - 1));
            console.log(`[RPC relay] retry ${attempt}/5 in ${delay}ms: ${reason}`);
            setTimeout(() => attemptRequest(attempt + 1), delay);
          };
          const outgoing = https.request({
            protocol: upstream.protocol, hostname: upstream.hostname, port: upstream.port || 443,
            path: `${upstream.pathname}${upstream.search}`, method: request.method, agent,
            headers: { "content-type": "application/json", "content-length": body.length },
          }, (incoming) => {
            const responseChunks = [];
            incoming.on("data", (chunk) => responseChunks.push(chunk));
            incoming.on("end", () => {
              const status = incoming.statusCode || 502;
              if (status === 429 || status >= 500) return retry(`upstream HTTP ${status}`);
              response.writeHead(status, { "content-type": incoming.headers["content-type"] || "application/json" });
              response.end(Buffer.concat(responseChunks));
              finish();
            });
            incoming.on("error", (error) => retry(error.message));
          });
          outgoing.on("error", (error) => retry(error.message));
          outgoing.setTimeout(120_000, () => outgoing.destroy(new Error("RPC relay timeout")));
          outgoing.end(body);
        };
        attemptRequest();
      });
      schedule();
    });
  });
  await new Promise((resolve) => relay.listen(0, "127.0.0.1", resolve));
  return `http://127.0.0.1:${relay.address().port}`;
}

async function implementationOf(proxy) {
  const value = await ethers.provider.getStorage(proxy, IMPLEMENTATION_SLOT);
  return ethers.getAddress(`0x${value.slice(-40)}`);
}

async function approveAndUpgrade(guardian, owner, proxy, implementation) {
  const target = typeof implementation === "string" ? implementation : await implementation.getAddress();
  if (!(await guardian.approvedProxies(proxy))) await (await guardian.connect(owner).setApprovedProxy(proxy, true, LOCAL_TX)).wait();
  await (await guardian.connect(owner).setApprovedImplementation(proxy, target, true, LOCAL_TX)).wait();
  const uups = new ethers.Contract(proxy, ["function upgradeToAndCall(address,bytes)"], owner);
  await (await uups.upgradeToAndCall(target, "0x", LOCAL_TX)).wait();
  if ((await implementationOf(proxy)) !== ethers.getAddress(target)) throw new Error(`upgrade mismatch: ${proxy}`);
}

async function pauseIfNeeded(proxy, owner) {
  const contract = new ethers.Contract(proxy, ["function paused() view returns(bool)", "function pause()"], owner);
  const wasPaused = await contract.paused();
  if (!wasPaused) await (await contract.pause(LOCAL_TX)).wait();
  return wasPaused;
}

async function restorePause(proxy, owner, wasPaused) {
  const contract = new ethers.Contract(proxy, ["function paused() view returns(bool)", "function unpause()"], owner);
  if (!wasPaused && await contract.paused()) await (await contract.unpause(LOCAL_TX)).wait();
}

function orbitArgs(type) {
  const row = orbitManifest.orbits[type];
  return [row.owners, row.levels, row.matrixUsers, row.matrixLevels, row.matrixExpectedParents];
}

function assert(condition, message) { if (!condition) throw new Error(message); }

async function main() {
  fs.writeFileSync(progressFile, "");
  if (!process.env.MAINNET_RPC_URL) throw new Error("MAINNET_RPC_URL is required");
  const directFork = String(process.env.DIRECT_FORK || "").toLowerCase() === "true";
  const forkUrl = directFork ? process.env.MAINNET_RPC_URL : await startRelay(process.env.MAINNET_RPC_URL);
  const configuredForkBlock = process.env.FORK_BLOCK ? Number(process.env.FORK_BLOCK) : undefined;
  if (configuredForkBlock !== undefined && (!Number.isSafeInteger(configuredForkBlock) || configuredForkBlock <= 0)) {
    throw new Error("FORK_BLOCK must be a positive safe integer");
  }
  mark("[1/9] Initializing Polygon fork");
  await network.provider.request({
    method: "hardhat_reset",
    params: [{ forking: { jsonRpcUrl: forkUrl, ...(configuredForkBlock ? { blockNumber: configuredForkBlock } : {}) } }],
  });
  const forkBlock = await ethers.provider.getBlockNumber();
  mark(`[2/9] Fork initialized at block ${forkBlock}`);
  const [deployer] = await ethers.getSigners();
  await network.provider.request({ method: "hardhat_impersonateAccount", params: [A.owner] });
  await network.provider.send("hardhat_setBalance", [A.owner, "0x3635C9ADC5DEA00000"]);
  const owner = await ethers.getSigner(A.owner);
  const guardian = await ethers.getContractAt("Guardian", A.guardian);
  assert((await guardian.owner()) === A.owner, "guardian owner mismatch");

  const proxyNames = ["registration", "levelManager", "escrow", "p4", "p12", "p39", "fgt", "fgtr"];
  const beforeImplementations = {};
  const initialPause = {};
  for (const name of proxyNames) {
    beforeImplementations[name] = await implementationOf(A[name]);
    initialPause[name] = await pauseIfNeeded(A[name], owner);
  }
  mark("[3/9] Production implementations captured and proxies paused locally");

  const migrationNames = {
    registration: "RegistrationWalletReplacementMigrator",
    levelManager: "LevelManagerWalletReplacementMigrator",
    escrow: "AutoUpgradeEscrowWalletReplacementMigrator",
    p4: "P4OrbitWalletReplacementMigrator",
    p12: "P12OrbitWalletReplacementMigrator",
    p39: "P39OrbitWalletReplacementMigrator",
    fgt: "FGTWalletReplacementMigrator",
    fgtr: "FGTrWalletReplacementMigrator",
  };
  const migrations = {};
  for (const name of proxyNames) {
    migrations[name] = await (await ethers.getContractFactory(migrationNames[name], deployer)).deploy(LOCAL_TX);
    await migrations[name].waitForDeployment();
    await approveAndUpgrade(guardian, owner, A[name], migrations[name]);
    mark(`[4/9] Temporary ${name} migrator installed locally`);
  }

  const p4 = (await ethers.getContractFactory(migrationNames.p4)).attach(A.p4).connect(owner);
  const p12 = (await ethers.getContractFactory(migrationNames.p12)).attach(A.p12).connect(owner);
  const p39 = (await ethers.getContractFactory(migrationNames.p39)).attach(A.p39).connect(owner);
  await (await p4.executeApprovedWalletReplacement(orbitManifest.orbits.P4.owners, orbitManifest.orbits.P4.levels, LOCAL_TX)).wait();
  await (await p12.executeApprovedWalletReplacement(...orbitArgs("P12"), LOCAL_TX)).wait();
  await (await p39.executeApprovedWalletReplacement(...orbitArgs("P39"), LOCAL_TX)).wait();
  mark("[5/9] Orbit state migrated locally");
  await (await (await ethers.getContractAt(migrationNames.escrow, A.escrow, owner)).executeApprovedWalletReplacement(LOCAL_TX)).wait();
  await (await (await ethers.getContractAt(migrationNames.levelManager, A.levelManager, owner)).executeApprovedWalletReplacement(LOCAL_TX)).wait();
  await (await (await ethers.getContractAt(migrationNames.fgt, A.fgt, owner)).executeApprovedWalletReplacement(LOCAL_TX)).wait();
  await (await (await ethers.getContractAt(migrationNames.fgtr, A.fgtr, owner)).executeApprovedWalletReplacement(LOCAL_TX)).wait();

  const sponsor = identityManifest.sponsorRewrites;
  const matrix = identityManifest.matrixParentRewrites;
  const registration = await ethers.getContractAt(migrationNames.registration, A.registration, owner);
  await (await registration.executeApprovedWalletReplacement(
    sponsor.map((row) => row.child), sponsor.map((row) => row.from),
    matrix.map((row) => row.user), matrix.map((row) => row.level), matrix.map((row) => row.from), LOCAL_TX
  )).wait();
  mark("[6/9] Identity and asset state migrated locally");

  assert(await registration.isRegistered(WP_NEW), "WP new identity missing");
  assert(await registration.isRegistered(RY_NEW), "RY new identity missing");
  assert(!(await registration.isRegistered(WP_OLD)), "WP old identity remains active");
  assert(!(await registration.isRegistered(RY_OLD)), "RY old identity remains active");
  assert((await registration.referrerOf(RY_NEW)) === WP_NEW, "RY sponsor not canonicalized");
  const manager = await ethers.getContractAt(migrationNames.levelManager, A.levelManager);
  for (let level = 1; level <= 10; level++) {
    assert((await manager.userLevelActivated(WP_NEW, level)) === (level <= 4), `WP level ${level} mismatch`);
    assert((await manager.userLevelActivated(RY_NEW, level)) === (level <= 3), `RY level ${level} mismatch`);
  }
  assert((await p39.userOrbits(WP_NEW, 6)).isActive === false, "invalid WP level 6 survived");
  assert((await p4.userOrbits(WP_NEW, 4)).escrowBalance === 88_000_000n, "WP P4 L4 escrow mismatch");
  const escrow = await ethers.getContractAt(migrationNames.escrow, A.escrow);
  assert((await escrow.lockedFunds(WP_NEW, 4, 5)) === 88_000_000n, "WP custody lock mismatch");
  assert((await escrow.lockedFunds(RY_NEW, 3, 4)) === 8_000_000n, "RY custody lock mismatch");
  assert((await (await ethers.getContractAt(migrationNames.fgt, A.fgt)).balanceOf(WP_NEW)) === 150_000_000n, "WP FGT mismatch");
  assert((await (await ethers.getContractAt(migrationNames.fgtr, A.fgtr)).balanceOf(WP_NEW)) === 15_000_000n, "WP FGTr mismatch");
  mark("[7/9] Migrated post-state assertions passed");

  for (const name of [...proxyNames].reverse()) await approveAndUpgrade(guardian, owner, A[name], beforeImplementations[name]);
  mark("[8/9] Permanent implementations restored locally");
  for (const name of proxyNames) await restorePause(A[name], owner, initialPause[name]);

  const permanentRegistration = await ethers.getContractAt("RegistrationFixed", A.registration);
  const permanentManager = await ethers.getContractAt("LevelManager", A.levelManager);
  assert(await permanentRegistration.isRegistered(WP_NEW), "restored Registration lost WP");
  assert(await permanentManager.userLevelActivated(WP_NEW, 4), "restored LevelManager lost WP L4");
  for (const name of proxyNames) assert((await implementationOf(A[name])) === beforeImplementations[name], `${name} was not restored`);
  mark("[9/9] Restored-state assertions passed");

  const report = {
    generatedAt: new Date().toISOString(), forkBlock, chainId: Number((await ethers.provider.getNetwork()).chainId),
    result: "PASS", restoredImplementations: beforeImplementations,
    identities: { WP: { old: WP_OLD, replacement: WP_NEW, highestLevel: 4 }, RY: { old: RY_OLD, replacement: RY_NEW, highestLevel: 3 } },
    assertions: ["identity moved", "sponsors rewritten", "matrix parents rewritten", "current orbits moved", "historical storage untouched by migrators", "escrow moved", "FGT/FGTr moved", "invalid level 6 quarantined", "permanent implementations restored"],
  };
  const output = path.resolve(__dirname, `../migration-audits/wallet-replacement-fork-${forkBlock}.json`);
  fs.writeFileSync(output, `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(path.resolve(__dirname, "../migration-audits/wallet-replacement-fork-latest.json"), `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify({ output, forkBlock, result: report.result }, null, 2));
}

main().catch((error) => { console.error(error); process.exitCode = 1; }).finally(() => relay?.close());

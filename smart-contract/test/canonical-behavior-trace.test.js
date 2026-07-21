const fs = require("fs");
const path = require("path");
const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");
const { renderTraceMarkdown, traceTransaction } = require("./helpers/canonical-trace");

const units = (value) => ethers.parseUnits(String(value), 6);

async function deploySystem() {
  const [id1, nftPool, operations, ...founders] = await ethers.getSigners();
  const Guardian = await ethers.getContractFactory("Guardian");
  const guardian = await Guardian.deploy(id1.address);
  const USDT = await ethers.getContractFactory("contracts/mocks/MockUSDT.sol:MockUSDT");
  const usdt = await USDT.deploy();
  const Escrow = await ethers.getContractFactory("AutoUpgradeEscrow");
  const escrow = await upgrades.deployProxy(Escrow, [usdt.target, guardian.target], { kind: "uups" });
  const Registration = await ethers.getContractFactory("RegistrationFixed");
  const registration = await upgrades.deployProxy(
    Registration,
    [usdt.target, ethers.ZeroAddress, id1.address, guardian.target],
    { kind: "uups" }
  );
  const LevelManager = await ethers.getContractFactory("LevelManager");
  const levelManager = await upgrades.deployProxy(LevelManager, [
    usdt.target,
    nftPool.address,
    operations.address,
    registration.target,
    escrow.target,
    guardian.target,
  ], { kind: "uups", unsafeAllow: ["delegatecall"] });
  const Router = await ethers.getContractFactory("LevelSettlementRouter");
  const router = await Router.deploy(levelManager.target, usdt.target);
  const P4 = await ethers.getContractFactory("P4Orbit");
  const p4 = await upgrades.deployProxy(P4, [levelManager.target, escrow.target, registration.target, guardian.target], { kind: "uups" });
  const P12 = await ethers.getContractFactory("P12Orbit");
  const p12 = await upgrades.deployProxy(P12, [levelManager.target, escrow.target, registration.target, guardian.target], { kind: "uups" });
  const P39 = await ethers.getContractFactory("P39Orbit");
  const p39 = await upgrades.deployProxy(P39, [levelManager.target, escrow.target, registration.target, guardian.target], { kind: "uups" });

  await levelManager.setSettlementRouter(router.target);
  await registration.setLevelManager(levelManager.target);
  await escrow.setLevelManager(levelManager.target);
  await levelManager.setOrbitContracts(p4.target, p12.target, p39.target);
  await levelManager.setFounderWallets(
    founders.slice(0, 8).map((founder) => founder.address),
    Array(8).fill(1250)
  );
  await levelManager.approveEscrow(ethers.MaxUint256);
  await registration.setID1Wallet(id1.address);

  return {
    id1,
    founders: founders.slice(0, 8),
    nftPool,
    operations,
    guardian,
    usdt,
    escrow,
    registration,
    levelManager,
    router,
    p4,
    p12,
    p39,
  };
}

async function deterministicWallet(id1, index) {
  const key = ethers.keccak256(ethers.toUtf8Bytes(`canonical-behavior-wallet-${index}`));
  const wallet = new ethers.Wallet(key, ethers.provider);
  await id1.sendTransaction({ to: wallet.address, value: ethers.parseEther("2") });
  return wallet;
}

function labelMap(system, actors) {
  const rows = [
    ["ID1", system.id1],
    ["NFT_POOL", system.nftPool],
    ["OPERATIONS", system.operations],
    ...system.founders.map((wallet, index) => [`FOUNDER_${index + 1}`, wallet]),
    ...actors.map((actor) => [actor.label, actor]),
  ];
  return Object.fromEntries(rows.map(([label, wallet]) => [wallet.address.toLowerCase(), label]));
}

function physicalParentPosition(size, position) {
  if (position <= 3) return 0;
  if (size === 12) return ((position - 4) % 3) + 1;
  if (size === 39 && position <= 12) return ((position - 4) % 3) + 1;
  if (size === 39) return 4 + ((position - 13) % 9);
  return 0;
}

function addPhysicalParents(rows, owner, labels, size) {
  const byPosition = Object.fromEntries(rows.map((row) => [row.position, row]));
  return rows.map((row) => {
    const parentPosition = physicalParentPosition(size, row.position);
    const parentAddress = parentPosition === 0 ? owner.address : byPosition[parentPosition]?.occupant;
    return {
      ...row,
      physicalParentPosition: parentPosition,
      physicalParent: parentAddress || null,
      physicalParentLabel: parentAddress ? labels[parentAddress.toLowerCase()] || null : null,
    };
  });
}

async function positionSnapshot(orbit, owner, level, size, labels) {
  const rows = [];
  for (let position = 1; position <= size; position += 1) {
    const stored = await orbit.getPosition(owner.address, level, position);
    if (stored.occupant === ethers.ZeroAddress) continue;
    const rule = await orbit.getPositionRuleView(owner.address, level, position);
    const activation = await orbit.getPositionActivationData(owner.address, level, position);
    rows.push({
      position,
      line: Number(rule.line),
      lineArrival: Number(rule.linePaymentNumber),
      occupant: stored.occupant,
      occupantLabel: labels[stored.occupant.toLowerCase()] || null,
      recordedReferrer: stored.referrer,
      recordedReferrerLabel: labels[stored.referrer.toLowerCase()] || null,
      activationId: activation.activationId.toString(),
      isPaymentRecord: activation.isMirror,
      ownerLiquid: rule.toOwner.toString(),
      escrow: rule.toEscrow.toString(),
      recycle: rule.toRecycle.toString(),
    });
  }
  return addPhysicalParents(rows, owner, labels, size);
}

async function historicalPositionSnapshot(orbit, owner, level, cycle, size, labels) {
  const rows = [];
  for (let position = 1; position <= size; position += 1) {
    const stored = await orbit.getHistoricalPosition(owner.address, level, cycle, position);
    if (stored.occupant === ethers.ZeroAddress) continue;
    const rule = await orbit.getHistoricalPositionRuleView(owner.address, level, cycle, position);
    const activation = await orbit.getHistoricalPositionActivationData(owner.address, level, cycle, position);
    rows.push({
      position,
      line: Number(rule.line),
      lineArrival: Number(rule.linePaymentNumber),
      occupant: stored.occupant,
      occupantLabel: labels[stored.occupant.toLowerCase()] || null,
      recordedReferrer: stored.referrer,
      recordedReferrerLabel: labels[stored.referrer.toLowerCase()] || null,
      activationId: activation.activationId.toString(),
      isPaymentRecord: activation.isMirror,
      ownerLiquid: rule.toOwner.toString(),
      escrow: rule.toEscrow.toString(),
      recycle: rule.toRecycle.toString(),
    });
  }
  return addPhysicalParents(rows, owner, labels, size);
}

describe("Canonical end-to-end behavior trace", function () {
  this.timeout(900000);

  it("produces an exact named-wallet ledger through complete P12 and P39 recycle", async function () {
    const system = await deploySystem();
    const sponsor = await deterministicWallet(system.id1, 1);
    sponsor.label = "ALICE_SPONSOR";
    const owner = await deterministicWallet(system.id1, 2);
    owner.label = "BOB_ORBIT_OWNER";
    const members = [];
    for (let index = 1; index <= 39; index += 1) {
      const member = await deterministicWallet(system.id1, index + 2);
      member.label = `MEMBER_${String(index).padStart(2, "0")}`;
      members.push(member);
    }
    const actors = [sponsor, owner, ...members];
    const labels = labelMap(system, actors);
    const watchedAddresses = [
      system.id1.address,
      system.nftPool.address,
      system.operations.address,
      ...system.founders.map((founder) => founder.address),
      ...actors.map((actor) => actor.address),
      system.escrow.target,
      system.levelManager.target,
    ];
    const contracts = {
      usdt: system.usdt,
      registration: system.registration,
      levelManager: system.levelManager,
      router: system.router,
      escrow: system.escrow,
      p4: system.p4,
      p12: system.p12,
      p39: system.p39,
    };
    const transactions = [];

    async function prepare(actor) {
      await system.usdt.mint(actor.address, units(100000));
      await system.usdt.connect(actor).approve(system.levelManager.target, units(100000));
    }

    async function traced(title, action) {
      transactions.push(await traceTransaction({
        title,
        transaction: action,
        contracts,
        watchedAddresses,
        labels,
      }));
    }

    async function register(actor, referrer) {
      await prepare(actor);
      await traced(`${actor.label} registers under ${labels[referrer.toLowerCase()]}`, () =>
        system.registration.connect(actor).register(referrer)
      );
    }

    async function activate(actor, level) {
      await traced(`${actor.label} activates Level ${level}`, () =>
        system.registration.connect(actor).activateLevel(level)
      );
    }

    await register(sponsor, system.id1.address);
    await activate(sponsor, 2);
    await activate(sponsor, 3);
    await register(owner, sponsor.address);
    await activate(owner, 2);
    await activate(owner, 3);

    for (const member of members) {
      await register(member, owner.address);
      await activate(member, 2);
      await activate(member, 3);
    }

    const p12Cycle = await system.p12.getUserOrbit(owner.address, 2);
    const p39Cycle = await system.p39.getUserOrbit(owner.address, 3);
    expect(p12Cycle.totalCycles).to.be.greaterThan(0);
    expect(p39Cycle.totalCycles).to.equal(1);
    expect(await system.p12.hasHistoricalCycle(owner.address, 2, 1)).to.equal(true);
    expect(await system.p39.hasHistoricalCycle(owner.address, 3, 1)).to.equal(true);

    const report = {
      generatedAt: new Date().toISOString(),
      purpose: "Exact contract-derived chronology; amounts use 6-decimal USDT base units.",
      actors: Object.entries(labels).map(([address, label]) => ({ label, address: ethers.getAddress(address) })),
      finalState: {
        ownerP4Level1: await positionSnapshot(system.p4, owner, 1, 4, labels),
        ownerP12Level2Current: await positionSnapshot(system.p12, owner, 2, 12, labels),
        ownerP39Level3Current: await positionSnapshot(system.p39, owner, 3, 39, labels),
        ownerP12Level2CompletedCycles: await Promise.all(
          Array.from({ length: Number(p12Cycle.totalCycles) }, (_, index) =>
            historicalPositionSnapshot(system.p12, owner, 2, index + 1, 12, labels)
          )
        ),
        ownerP39Level3CompletedCycles: [
          await historicalPositionSnapshot(system.p39, owner, 3, 1, 39, labels),
        ],
        ownerP12Cycles: p12Cycle.totalCycles.toString(),
        ownerP39Cycles: p39Cycle.totalCycles.toString(),
      },
      transactions,
    };
    const output = path.join(__dirname, "..", "test-reports", "canonical-behavior-trace.json");
    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.writeFileSync(output, `${JSON.stringify(report, null, 2)}\n`);
    fs.writeFileSync(output.replace(/\.json$/, ".md"), renderTraceMarkdown(report));
    console.log(`Canonical behavior trace: ${output}`);
  });
});

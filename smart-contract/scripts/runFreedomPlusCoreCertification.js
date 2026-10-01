const fs = require('fs');
const path = require('path');
const { ethers } = require('hardhat');

function requiredAddress(name) {
  const value = process.env[name];
  if (!value || !ethers.isAddress(value)) {
    throw new Error(`${name} must be a valid address`);
  }
  return ethers.getAddress(value);
}

const ADDRESSES = {
  usdt: requiredAddress('USDT_ADDRESS'),
  registration: requiredAddress('FREEDOM_PLUS_REGISTRATION_ADDRESS'),
  manager: requiredAddress('FREEDOM_PLUS_LEVEL_MANAGER_ADDRESS'),
  router: requiredAddress('FREEDOM_PLUS_SETTLEMENT_ROUTER_ADDRESS'),
  fpt: requiredAddress('FREEDOM_PLUS_FPT_ADDRESS'),
  fptr: requiredAddress('FREEDOM_PLUS_FPTR_ADDRESS'),
  fFreedomRegistration: requiredAddress('REGISTRATION_ADDRESS'),
};

const TEST_GAS_PRICE_WEI = BigInt(process.env.TEST_GAS_PRICE_WEI || '30000000000');
const transactionOverrides = () => ({ gasPrice: TEST_GAS_PRICE_WEI });

const LEVELS = [
  { level: 1, price: 50, capacity: 39, orbit: requiredAddress('FREEDOM_PLUS_P39_ORBIT_ADDRESS'), parents: [0,0,0,1,2,3,1,2,3,1,2,3,4,5,6,7,8,9,10,11,12,4,5,6,7,8,9,10,11,12,4,5,6,7,8,9,10,11,12] },
  { level: 2, price: 150, capacity: 14, orbit: requiredAddress('FREEDOM_PLUS_P14_ORBIT_ADDRESS'), parents: [0,0,1,2,1,2,3,4,5,6,3,4,5,6] },
  { level: 3, price: 450, capacity: 12, orbit: requiredAddress('FREEDOM_PLUS_P12_ORBIT_ADDRESS'), parents: [0,0,0,1,2,3,1,2,3,1,2,3] },
  { level: 4, price: 1350, capacity: 6, orbit: requiredAddress('FREEDOM_PLUS_P6_ORBIT_ADDRESS'), parents: [0,0,1,2,1,2] },
  { level: 5, price: 4050, capacity: 4, orbit: requiredAddress('FREEDOM_PLUS_P4_ORBIT_ADDRESS'), parents: [0,0,0,0] },
  { level: 6, price: 12150, capacity: 4, orbit: requiredAddress('FREEDOM_PLUS_P4_ORBIT_ADDRESS'), parents: [0,0,0,0] },
  { level: 7, price: 36450, capacity: 3, orbit: requiredAddress('FREEDOM_PLUS_P3_ORBIT_ADDRESS'), parents: [0,0,0] },
];

// Select existing wallets whose immutable sponsors match each orbit's branching.
const PARTICIPANTS = {
  1: Array.from({ length: 39 }, (_, index) => index + 9),
  2: [9,10,12,13,15,16,21,22,24,25,30,31,33,34],
  3: [9,10,11,12,13,14,15,16,17,18,19,20],
  4: [9,10,12,13,15,16],
  5: [9,10,11,70],
  6: [9,10,11,70],
  7: [9,10,11],
};

function assert(condition, message) {
  if (!condition) throw new Error(`CERTIFICATION_ASSERTION: ${message}`);
}

async function main() {
  const network = await ethers.provider.getNetwork();
  assert(network.chainId === 80002n, 'Amoy only');
  const source = JSON.parse(fs.readFileSync(
    path.resolve(__dirname, '../../env-files/fresh-test-wallets.private.json'),
    'utf8'
  ));
  const byNumber = new Map(source.map((row) => [Number(row.label.replace(/\D/g, '')), row]));
  const ownerRow = byNumber.get(8);
  const childRows = Array.from({ length: 39 }, (_, index) => byNumber.get(index + 9));
  assert(ownerRow && childRows.every(Boolean), 'Accounts 8-47 are required');

  const registration = await ethers.getContractAt('FreedomPlusRegistration', ADDRESSES.registration);
  const fFreedomRegistration = await ethers.getContractAt('RegistrationFixed', ADDRESSES.fFreedomRegistration);
  const router = await ethers.getContractAt('FreedomPlusSettlementRouter', ADDRESSES.router);
  const usdt = await ethers.getContractAt('IERC20', ADDRESSES.usdt);
  const fpt = await ethers.getContractAt('FPTToken', ADDRESSES.fpt);
  const fptr = await ethers.getContractAt('FPTrToken', ADDRESSES.fptr);
  const id1 = await registration.id1Wallet();
  const owner = new ethers.Wallet(ownerRow.privateKey, ethers.provider);
  const children = childRows.map((row) => new ethers.Wallet(row.privateKey, ethers.provider));
  const report = { startedAt: new Date().toISOString(), chainId: String(network.chainId), owner: owner.address, levels: [] };
  const reportDir = path.resolve(__dirname, '../test-reports/freedom-plus');
  fs.mkdirSync(reportDir, { recursive: true });
  const reportFile = path.join(reportDir, `core-${Date.now()}.json`);
  const checkpoint = () => fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
  report.verdict = 'IN_PROGRESS';
  checkpoint();
  let levelChildren = children;

  async function approve(wallet, amount) {
    const balance = await usdt.balanceOf(wallet.address);
    if (balance < amount) {
      const mock = await ethers.getContractAt('MockUSDT', ADDRESSES.usdt, wallet);
      await (await mock.mint(wallet.address, amount - balance, transactionOverrides())).wait();
    }
    if ((await usdt.allowance(wallet.address, ADDRESSES.manager)) < amount) {
      await (await usdt.connect(wallet).approve(ADDRESSES.manager, ethers.MaxUint256, transactionOverrides())).wait();
    }
  }

  async function ensureLevel(wallet, target) {
    for (let level = 1; level <= target; level++) {
      if (await registration.isLevelActive(wallet.address, level)) continue;
      await approve(wallet, ethers.parseUnits(String(LEVELS[level - 1].price), 6));
      const tx = level === 1
        ? await registration.connect(wallet).register(await fFreedomRegistration.getReferrer(wallet.address), transactionOverrides())
        : await registration.connect(wallet).activateLevel(level, transactionOverrides());
      await tx.wait();
      console.log(`[PREREQUISITE] ${wallet.address} level=${level} tx=${tx.hash}`);
    }
  }

  async function auditReceipt(receipt, levelConfig, expectedPosition, participant) {
    const parsed = receipt.logs.map((log) => {
      try { return router.interface.parseLog(log); } catch { return null; }
    }).filter(Boolean);
    const completion = parsed.find((event) => event.name === 'ActivationSettlementCompleted');
    assert(completion, `level ${levelConfig.level} missing settlement completion`);
    const components = parsed.filter((event) => event.name === 'ComponentSettled');
    const reserves = parsed.filter((event) => event.name === 'RecycleReserveUpdated');
    const charges = parsed.filter((event) => event.name === 'SystemChargeSettled');
    const recycle = parsed.find((event) => event.name === 'RecycleCompleted');
    const price = ethers.parseUnits(String(levelConfig.price), 6);
    const componentTotal = components.reduce((sum, event) => sum + event.args.amount, 0n);
    const reserveAdded = reserves.reduce((sum, event) => sum + event.args.added, 0n);
    const systemTotal = charges.reduce((sum, event) => sum + event.args.grossCharge, 0n);
    assert(componentTotal + reserveAdded + systemTotal >= price, `level ${levelConfig.level} primary accounting underflow`);
    for (const event of components) {
      assert([1500n, 2000n, 2500n, 4000n, 5000n, 9000n].includes(event.args.bps), `unexpected bps ${event.args.bps}`);
      assert(event.args.recipient !== ethers.ZeroAddress, 'zero component recipient');
    }
    const orbit = await ethers.getContractAt('FreedomPlusBaseOrbit', levelConfig.orbit);
    const stored = await orbit.positionAt(owner.address, levelConfig.level, 0, expectedPosition);
    assert(stored.participant.toLowerCase() === participant.toLowerCase(), `level ${levelConfig.level} position ${expectedPosition} occupant`);
    const parentSlot = levelConfig.parents[expectedPosition - 1];
    const expectedParent = parentSlot === 0 ? owner.address : levelChildren[parentSlot - 1].address;
    assert(stored.structuralParent.toLowerCase() === expectedParent.toLowerCase(), `level ${levelConfig.level} position ${expectedPosition} parent`);
    return {
      tx: receipt.hash,
      position: expectedPosition,
      participant,
      structuralParent: stored.structuralParent,
      components: components.map((event) => ({ role: Number(event.args.role), recipient: event.args.recipient, bps: Number(event.args.bps), amount: ethers.formatUnits(event.args.amount, 6), fallback: event.args.id1Fallback })),
      reserveAdded: ethers.formatUnits(reserveAdded, 6),
      systemCharge: ethers.formatUnits(systemTotal, 6),
      recycle: Boolean(recycle),
    };
  }

  if (!(await registration.isRegistered(owner.address))) {
    await approve(owner, ethers.parseUnits('50', 6));
    const sponsor = await fFreedomRegistration.getReferrer(owner.address);
    await (await registration.connect(owner).register(sponsor || id1, transactionOverrides())).wait();
  }
  assert(await registration.isLevelActive(owner.address, 1), 'owner Level 1 inactive');

  for (const config of LEVELS) {
    levelChildren = PARTICIPANTS[config.level].map((number) => {
      const row = byNumber.get(number);
      assert(row, `Account ${number} is required`);
      return new ethers.Wallet(row.privateKey, ethers.provider);
    });
    const orbit = await ethers.getContractAt('FreedomPlusBaseOrbit', config.orbit);
    const existing = await orbit.cycleState(owner.address, config.level, 0);
    assert(existing.filledPositions <= BigInt(config.capacity), `level ${config.level} invalid filled positions`);
    if (config.level > 1 && !(await registration.isLevelActive(owner.address, config.level))) {
      const price = ethers.parseUnits(String(config.price), 6);
      await approve(owner, price);
      await (await registration.connect(owner).activateLevel(config.level, transactionOverrides())).wait();
    }

    const fptrBefore = await fptr.balanceOf(owner.address);
    const levelReport = { level: config.level, price: config.price, capacity: config.capacity, actions: [] };
    report.levels.push(levelReport);
    for (let index = 0; index < config.capacity; index++) {
      const wallet = levelChildren[index];
      const price = ethers.parseUnits(String(config.price), 6);
      if (BigInt(index) < existing.filledPositions) {
        const stored = await orbit.positionAt(owner.address, config.level, 0, index + 1);
        assert(stored.participant.toLowerCase() === wallet.address.toLowerCase(), `level ${config.level} resumed position ${index + 1}`);
        levelReport.actions.push({
          position: index + 1,
          participant: wallet.address,
          structuralParent: stored.structuralParent,
          resumed: true,
        });
        continue;
      }

      await ensureLevel(wallet, config.level - 1);
      const parentSlot = config.parents[index];
      const expectedSponsor = parentSlot === 0 ? owner.address : levelChildren[parentSlot - 1].address;
      assert((await fFreedomRegistration.getReferrer(wallet.address)).toLowerCase() === expectedSponsor.toLowerCase(), `level ${config.level} immutable sponsor mismatch for ${wallet.address}`);
      const fptBefore = await fpt.balanceOf(wallet.address);
      await approve(wallet, price);

      let tx;
      if (config.level === 1) {
        assert(!(await registration.isRegistered(wallet.address)), `child ${index + 1} unexpectedly registered`);
        const sponsor = await fFreedomRegistration.getReferrer(wallet.address);
        assert(sponsor !== ethers.ZeroAddress, `child ${index + 1} has no permanent F-Freedom sponsor`);
        tx = await registration.connect(wallet).register(sponsor, transactionOverrides());
      } else {
        assert(await registration.isLevelActive(wallet.address, config.level - 1), `child ${index + 1} previous level inactive`);
        assert(!(await registration.isLevelActive(wallet.address, config.level)), `child ${index + 1} level already active`);
        tx = await registration.connect(wallet).activateLevel(config.level, transactionOverrides());
      }
      const receipt = await tx.wait();
      assert((await fpt.balanceOf(wallet.address)) - fptBefore === price, `level ${config.level} FPT issuance`);
      levelReport.actions.push(await auditReceipt(receipt, config, index + 1, wallet.address));
      const reserve = await router.recycleReserve(owner.address, config.level, 0);
      if (index === config.capacity - 2 && config.capacity > 4) {
        assert(reserve === price / 2n, `level ${config.level} first recycle reserve`);
      }
      console.log(`[PLUS_LEVEL_${config.level}] ${index + 1}/${config.capacity} tx=${tx.hash}`);
      checkpoint();
    }

    const finalState = await orbit.cycleState(owner.address, config.level, 0);
    assert(finalState.filledPositions === BigInt(config.capacity), `level ${config.level} incomplete cycle`);
    assert(finalState.closed, `level ${config.level} cycle not closed`);
    assert(await orbit.currentCycleOf(owner.address, config.level) === 1n, `level ${config.level} cycle counter`);
    assert(await router.recycleReserve(owner.address, config.level, 0) === 0n, `level ${config.level} reserve not consumed`);
    assert(await router.recycleReserveConsumed(owner.address, config.level, 0), `level ${config.level} reserve marker`);
    assert((await fptr.balanceOf(owner.address)) - fptrBefore === (existing.closed ? 0n : ethers.parseUnits(String(config.price / 2), 6)), `level ${config.level} FPTr issuance`);
    levelReport.verdict = 'PASS';
    checkpoint();
  }

  report.completedAt = new Date().toISOString();
  report.verdict = 'PASS';
  fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
  console.log(`FREEDOM_PLUS_CORE_CERTIFICATION=PASS report=${reportFile}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

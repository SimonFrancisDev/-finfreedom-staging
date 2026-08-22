const fs = require('fs');
const path = require('path');
const { ethers } = require('hardhat');

const ADDRESSES = {
  usdt: '0x7b7E39f3D177B3356368431C5C285bca58b43A60',
  registration: '0x56Dc8f775e4Bf7e31777080eB8AFb9cAA42c300A',
  manager: '0xEC87E48946344a8d4a03aa1da1262b467682AE5C',
  router: '0x5Cc0594a2d275c9CfaC38F5Ef6E03e84f0E05B63',
  fpt: '0x2C8Cd7BDaf2A9242A76ef5174595a613526e55B9',
  fptr: '0xf7732dC3570c0d31F41814645Ac72A4219b6fF28',
};

const LEVELS = [
  { level: 1, price: 50, capacity: 39, orbit: '0x447bC08847Dd951D3cDFA3ea4fB2A138FCD79dE4', parents: [0,0,0,1,2,3,1,2,3,1,2,3,4,5,6,7,8,9,10,11,12,4,5,6,7,8,9,10,11,12,4,5,6,7,8,9,10,11,12] },
  { level: 2, price: 150, capacity: 14, orbit: '0x33be14637300eD1365e691897fcbDEA27a52A5Be', parents: [0,0,1,2,1,2,3,4,5,6,3,4,5,6] },
  { level: 3, price: 450, capacity: 12, orbit: '0xCf2e7E5b43c3c49790529893e8EF5bA606BbD015', parents: [0,0,0,1,2,3,1,2,3,1,2,3] },
  { level: 4, price: 1350, capacity: 6, orbit: '0x91e9ee298D82bED26cdCcbc6dB28dE81886BD766', parents: [0,0,1,2,1,2] },
  { level: 5, price: 4050, capacity: 4, orbit: '0xE5A6557cb646EE9F2AF01b8829d727Fd9932aF34', parents: [0,0,0,0] },
  { level: 6, price: 12150, capacity: 4, orbit: '0xE5A6557cb646EE9F2AF01b8829d727Fd9932aF34', parents: [0,0,0,0] },
  { level: 7, price: 36450, capacity: 3, orbit: '0x8C565C06Fd2A94d5437dCE22b3d1b3C0323AC3c4', parents: [0,0,0] },
];

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
  const router = await ethers.getContractAt('FreedomPlusSettlementRouter', ADDRESSES.router);
  const usdt = await ethers.getContractAt('IERC20', ADDRESSES.usdt);
  const fpt = await ethers.getContractAt('FPTToken', ADDRESSES.fpt);
  const fptr = await ethers.getContractAt('FPTrToken', ADDRESSES.fptr);
  const id1 = await registration.id1Wallet();
  const owner = new ethers.Wallet(ownerRow.privateKey, ethers.provider);
  const children = childRows.map((row) => new ethers.Wallet(row.privateKey, ethers.provider));
  const report = { startedAt: new Date().toISOString(), chainId: String(network.chainId), owner: owner.address, levels: [] };

  async function approve(wallet, amount) {
    if ((await usdt.allowance(wallet.address, ADDRESSES.manager)) < amount) {
      await (await usdt.connect(wallet).approve(ADDRESSES.manager, ethers.MaxUint256)).wait();
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
    const expectedParent = parentSlot === 0 ? owner.address : children[parentSlot - 1].address;
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
    await (await registration.connect(owner).register(id1)).wait();
  }
  assert(await registration.isLevelActive(owner.address, 1), 'owner Level 1 inactive');

  for (const config of LEVELS) {
    const orbit = await ethers.getContractAt('FreedomPlusBaseOrbit', config.orbit);
    const existing = await orbit.cycleState(owner.address, config.level, 0);
    assert(existing.filledPositions === 0n, `level ${config.level} owner cycle is not clean`);
    if (config.level > 1 && !(await registration.isLevelActive(owner.address, config.level))) {
      const price = ethers.parseUnits(String(config.price), 6);
      await approve(owner, price);
      await (await registration.connect(owner).activateLevel(config.level)).wait();
    }

    const fptrBefore = await fptr.balanceOf(owner.address);
    const levelReport = { level: config.level, price: config.price, capacity: config.capacity, actions: [] };
    for (let index = 0; index < config.capacity; index++) {
      const wallet = children[index];
      const price = ethers.parseUnits(String(config.price), 6);
      const fptBefore = await fpt.balanceOf(wallet.address);
      await approve(wallet, price);
      let tx;
      if (config.level === 1) {
        assert(!(await registration.isRegistered(wallet.address)), `child ${index + 1} unexpectedly registered`);
        tx = await registration.connect(wallet).register(owner.address);
      } else {
        assert(await registration.isLevelActive(wallet.address, config.level - 1), `child ${index + 1} previous level inactive`);
        assert(!(await registration.isLevelActive(wallet.address, config.level)), `child ${index + 1} level already active`);
        tx = await registration.connect(wallet).activateLevel(config.level);
      }
      const receipt = await tx.wait();
      assert((await fpt.balanceOf(wallet.address)) - fptBefore === price, `level ${config.level} FPT issuance`);
      levelReport.actions.push(await auditReceipt(receipt, config, index + 1, wallet.address));
      const reserve = await router.recycleReserve(owner.address, config.level, 0);
      if (index === config.capacity - 2 && config.capacity > 4) {
        assert(reserve === price / 2n, `level ${config.level} first recycle reserve`);
      }
      console.log(`[PLUS_LEVEL_${config.level}] ${index + 1}/${config.capacity} tx=${tx.hash}`);
    }

    const finalState = await orbit.cycleState(owner.address, config.level, 0);
    assert(finalState.filledPositions === BigInt(config.capacity), `level ${config.level} incomplete cycle`);
    assert(finalState.closed, `level ${config.level} cycle not closed`);
    assert(await orbit.currentCycleOf(owner.address, config.level) === 1n, `level ${config.level} cycle counter`);
    assert(await router.recycleReserve(owner.address, config.level, 0) === 0n, `level ${config.level} reserve not consumed`);
    assert(await router.recycleReserveConsumed(owner.address, config.level, 0), `level ${config.level} reserve marker`);
    assert((await fptr.balanceOf(owner.address)) - fptrBefore === ethers.parseUnits(String(config.price / 2), 6), `level ${config.level} FPTr issuance`);
    report.levels.push(levelReport);
  }

  report.completedAt = new Date().toISOString();
  report.verdict = 'PASS';
  const reportDir = path.resolve(__dirname, '../test-reports/freedom-plus');
  fs.mkdirSync(reportDir, { recursive: true });
  const reportFile = path.join(reportDir, `core-${Date.now()}.json`);
  fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
  console.log(`FREEDOM_PLUS_CORE_CERTIFICATION=PASS report=${reportFile}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

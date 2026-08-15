const fs = require('node:fs');
const path = require('node:path');
const { ethers } = require('hardhat');

const A = {
  multisig: '0x785cC854ce9e13CE1140cbFD7C08620713E1711d',
  guardian: '0x290c2300296379BD0048aFe9099Ed6Fc81BF75fC',
  manager: '0x0E9De0F24eB4774834A2c4A63eaBa8356A4A4B53',
  p12Proxy: '0xCF998d8f7E9DD4f3FacFbA45e656dE07142f824b',
  p39Proxy: '0xEaD39819B8C4DBb0669320542B6B847D4c31b8Fb',
  p12Implementation: '0x437A8846c3dD1efE970fe0731bB71779Fd6699a7',
  p39Implementation: '0x8d3190Ad251c0c621eee0DD97A5Cc303930948E0',
  router: '0x7c978Ed8EA43b16aF4088998bf6FF0EB1567a3Be',
};

function main() {
  const guardian = new ethers.Interface(['function setApprovedImplementation(address,address,bool)']);
  const uups = new ethers.Interface(['function upgradeToAndCall(address,bytes)']);
  const manager = new ethers.Interface(['function pause()', 'function unpause()', 'function setSettlementRouter(address)']);
  const action = (stage, label, target, data) => ({ index: 0, stage, label, target, value: '0', data });
  const actions = [
    action('PREAPPROVAL', 'Approve P12 recycle-self-fix implementation', A.guardian,
      guardian.encodeFunctionData('setApprovedImplementation', [A.p12Proxy, A.p12Implementation, true])),
    action('PREAPPROVAL', 'Approve P39 recycle-self-fix implementation', A.guardian,
      guardian.encodeFunctionData('setApprovedImplementation', [A.p39Proxy, A.p39Implementation, true])),
    action('EXECUTION', 'Pause LevelManager for targeted recycle fix', A.manager, manager.encodeFunctionData('pause')),
    action('EXECUTION', 'Upgrade P12 for recycle self-parent guard', A.p12Proxy,
      uups.encodeFunctionData('upgradeToAndCall', [A.p12Implementation, '0x'])),
    action('EXECUTION', 'Upgrade P39 for recycle self-parent guard', A.p39Proxy,
      uups.encodeFunctionData('upgradeToAndCall', [A.p39Implementation, '0x'])),
    action('EXECUTION', 'Set recycle self-payment settlement router', A.manager,
      manager.encodeFunctionData('setSettlementRouter', [A.router])),
    action('FINALIZE', 'Unpause LevelManager after targeted verification', A.manager, manager.encodeFunctionData('unpause')),
  ];
  actions.forEach((entry, index) => { entry.index = index; });
  const output = {
    fixId: 'RECYCLE_SELF_PAYMENT_V1',
    sourceCommit: 'f8981bc',
    generatedAt: new Date().toISOString(),
    chainId: 137,
    multisig: A.multisig,
    requiredConfirmations: 3,
    addresses: A,
    actions,
    executionRules: [
      'Execute actions 0 and 1 before action 2.',
      'Suspend the production worker and block user activations before action 2.',
      'Execute actions 2 through 5 strictly in order.',
      'Verify implementations, router, balances, positions, cycles, escrow, migration state and ownership before action 6.',
      'Execute action 6 only after all post-upgrade checks pass.',
    ],
  };
  const directory = path.resolve(__dirname, '../migration-packages');
  fs.mkdirSync(directory, { recursive: true });
  const file = path.join(directory, `recycle-self-fix-${Date.now()}.json`);
  fs.writeFileSync(file, `${JSON.stringify(output, null, 2)}\n`);
  console.log(file);
}

main();

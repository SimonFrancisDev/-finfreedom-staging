const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { ethers } = require('hardhat');

const MULTISIG = '0x785cC854ce9e13CE1140cbFD7C08620713E1711d';
const verification = require('../migration-audits/wallet-replacement-deployments-verification.json');
const orbitManifest = require('../migration-audits/wallet-replacement-orbit-manifest.json');
const identityManifest = require('../migration-audits/wallet-replacement-manifest-draft.json');
const databasePlan = require('../migration-audits/wallet-replacement-database-dry-run.json');

const guardian = new ethers.Interface([
  'function setApprovedProxy(address,bool)',
  'function batchSetApprovedImplementations(address,address[],bool)',
]);
const uups = new ethers.Interface(['function upgradeToAndCall(address,bytes)']);
const common = new ethers.Interface(['function pause()', 'function unpause()']);
const migrationInterfaces = {
  registration: new ethers.Interface(['function executeApprovedWalletReplacement(address[],address[],address[],uint8[],address[])']),
  levelManager: new ethers.Interface(['function executeApprovedWalletReplacement()']),
  escrow: new ethers.Interface(['function executeApprovedWalletReplacement()']),
  p4: new ethers.Interface(['function executeApprovedWalletReplacement(address[],uint8[])']),
  p12: new ethers.Interface(['function executeApprovedWalletReplacement(address[],uint8[],address[],uint8[],address[])']),
  p39: new ethers.Interface(['function executeApprovedWalletReplacement(address[],uint8[],address[],uint8[],address[])']),
  fgt: new ethers.Interface(['function executeApprovedWalletReplacement()']),
  fgtr: new ethers.Interface(['function executeApprovedWalletReplacement()']),
};

function add(actions, stage, label, target, data, checks = []) {
  actions.push({ index: actions.length, stage, label, target, value: '0', data, dependsOn: actions.length ? actions.length - 1 : null, checks });
}

function migrationData(key) {
  if (key === 'registration') {
    const sponsor = identityManifest.sponsorRewrites;
    const matrix = identityManifest.matrixParentRewrites;
    return migrationInterfaces.registration.encodeFunctionData('executeApprovedWalletReplacement', [
      sponsor.map((row) => row.child), sponsor.map((row) => row.from),
      matrix.map((row) => row.user), matrix.map((row) => row.level), matrix.map((row) => row.from),
    ]);
  }
  if (key === 'p4') {
    const row = orbitManifest.orbits.P4;
    return migrationInterfaces.p4.encodeFunctionData('executeApprovedWalletReplacement', [row.owners, row.levels]);
  }
  if (key === 'p12' || key === 'p39') {
    const row = orbitManifest.orbits[key.toUpperCase()];
    return migrationInterfaces[key].encodeFunctionData('executeApprovedWalletReplacement', [
      row.owners, row.levels, row.matrixUsers, row.matrixLevels, row.matrixExpectedParents,
    ]);
  }
  return migrationInterfaces[key].encodeFunctionData('executeApprovedWalletReplacement');
}

function main() {
  if (verification.verdict !== 'PASS' || verification.chainId !== 137 || verification.rows.length !== 8) {
    throw new Error('Deployment verification report is not a complete Polygon PASS');
  }
  if (databasePlan.mode !== 'DRY_RUN' || databasePlan.operations.length !== 14) throw new Error('Database plan is not frozen');

  const byKey = Object.fromEntries(verification.rows.map((row) => [row.key, row]));
  const actions = [];
  const orderedKeys = ['registration', 'levelManager', 'escrow', 'p4', 'p12', 'p39', 'fgt', 'fgtr'];
  for (const key of orderedKeys) {
    const row = byKey[key];
    if (!row.proxyApproved) {
      add(actions, 'AUTHORIZE', `Authorize ${key} proxy`, verification.guardian,
        guardian.encodeFunctionData('setApprovedProxy', [row.proxy, true]), [`Guardian.approvedProxies(${row.proxy}) == true`]);
    }
    const implementations = [row.temporary, ...(!row.permanentApproved ? [row.permanent] : [])];
    add(actions, 'AUTHORIZE', `Authorize ${key} migration and restoration implementations`, verification.guardian,
      guardian.encodeFunctionData('batchSetApprovedImplementations', [row.proxy, implementations, true]),
      implementations.map((implementation) => `Guardian.approvedImplementations(${row.proxy}, ${implementation}) == true`));
  }

  for (const key of orderedKeys) {
    const row = byKey[key];
    add(actions, 'PAUSE', `Pause ${key}`, row.proxy, common.encodeFunctionData('pause'), [`${key}.paused() == true`]);
  }

  const migrationOrder = ['p4', 'p12', 'p39', 'escrow', 'levelManager', 'fgt', 'fgtr', 'registration'];
  for (const key of migrationOrder) {
    const row = byKey[key];
    add(actions, 'MIGRATE', `Install ${key} migrator and atomically migrate approved state`, row.proxy,
      uups.encodeFunctionData('upgradeToAndCall', [row.temporary, migrationData(key)]),
      [`${key} implementation == ${row.temporary}`, `${key} wallet replacement postconditions PASS`]);
  }

  const restoreOrder = ['p4', 'p12', 'p39', 'escrow', 'fgt', 'fgtr', 'registration', 'levelManager'];
  for (const key of restoreOrder) {
    const row = byKey[key];
    add(actions, 'RESTORE', `Restore permanent ${key} implementation and unpause`, row.proxy,
      uups.encodeFunctionData('upgradeToAndCall', [row.permanent, common.encodeFunctionData('unpause')]),
      [`${key} implementation == ${row.permanent}`, `${key}.paused() == false`]);
  }

  const core = {
    chainId: 137, multisig: MULTISIG, requiredConfirmations: 3, timelockSeconds: 120,
    frozenProductionBlock: verification.blockNumber, databasePlanHash: databasePlan.planHash,
    identities: identityManifest.identities, actions,
  };
  const packageHash = `0x${crypto.createHash('sha256').update(JSON.stringify(core)).digest('hex')}`;
  const output = {
    generatedAt: new Date().toISOString(), ...core, packageHash,
    counts: Object.fromEntries(['AUTHORIZE', 'PAUSE', 'MIGRATE', 'RESTORE'].map((stage) => [stage, actions.filter((row) => row.stage === stage).length])),
    executionRules: [
      'Submit and approve all actions together; execute strictly by index.',
      'Revalidate production state immediately before executing the first PAUSE action.',
      'Stop immediately if any receipt or listed postcondition fails.',
      'After the final MIGRATE action, do not execute RESTORE until chain post-state verification and the guarded database migration both PASS.',
      'LevelManager is restored and unpaused last so participant activity remains globally gated throughout restoration.',
    ],
  };
  const directory = path.resolve(__dirname, '../migration-packages');
  fs.mkdirSync(directory, { recursive: true });
  const file = path.join(directory, `wallet-replacement-${Date.now()}.json`);
  fs.writeFileSync(file, `${JSON.stringify(output, null, 2)}\n`);
  fs.writeFileSync(path.join(directory, 'wallet-replacement-latest.json'), `${JSON.stringify(output, null, 2)}\n`);
  console.log(JSON.stringify({ file, packageHash, actions: actions.length, counts: output.counts, databasePlanHash: databasePlan.planHash }, null, 2));
}

main();

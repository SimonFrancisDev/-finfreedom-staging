const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { ethers } = require('hardhat');

const EXPECTED_SUBMITTER = '0x884e48f9897E8633238747b608DD49dE12bF94df';
const verification = require('../migration-audits/wallet-replacement-deployments-verification.json');
const guardian = new ethers.Interface([
  'function setApprovedProxy(address,bool)',
  'function batchSetApprovedImplementations(address,address[],bool)',
]);
const common = new ethers.Interface(['function pause()', 'function unpause()']);
const uups = new ethers.Interface(['function upgradeToAndCall(address,bytes)']);
const migration = {
  registration: new ethers.Interface(['function executeApprovedWalletReplacement(address[],address[],address[],uint8[],address[])']),
  levelManager: new ethers.Interface(['function executeApprovedWalletReplacement()']),
  escrow: new ethers.Interface(['function executeApprovedWalletReplacement()']),
  p4: new ethers.Interface(['function executeApprovedWalletReplacement(address[],uint8[])']),
  p12: new ethers.Interface(['function executeApprovedWalletReplacement(address[],uint8[],address[],uint8[],address[])']),
  p39: new ethers.Interface(['function executeApprovedWalletReplacement(address[],uint8[],address[],uint8[],address[])']),
  fgt: new ethers.Interface(['function executeApprovedWalletReplacement()']),
  fgtr: new ethers.Interface(['function executeApprovedWalletReplacement()']),
};

function hashCore(pkg) {
  const core = {
    chainId: pkg.chainId, multisig: pkg.multisig, requiredConfirmations: pkg.requiredConfirmations,
    timelockSeconds: pkg.timelockSeconds, frozenProductionBlock: pkg.frozenProductionBlock,
    databasePlanHash: pkg.databasePlanHash, identities: pkg.identities, actions: pkg.actions,
  };
  return `0x${crypto.createHash('sha256').update(JSON.stringify(core)).digest('hex')}`;
}

async function main() {
  const packageFile = process.env.WALLET_REPLACEMENT_PACKAGE_FILE || '../migration-packages/wallet-replacement-latest.json';
  const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, packageFile), 'utf8'));
  if (pkg.chainId !== 137 || pkg.actions.length !== 35 || hashCore(pkg) !== pkg.packageHash) throw new Error('Package integrity failed');
  const rows = Object.fromEntries(verification.rows.map((row) => [row.key, row]));
  const expectedCounts = { AUTHORIZE: 11, PAUSE: 8, MIGRATE: 8, RESTORE: 8 };
  for (const [stage, count] of Object.entries(expectedCounts)) {
    if (pkg.actions.filter((row) => row.stage === stage).length !== count) throw new Error(`${stage} count mismatch`);
  }
  for (const [index, action] of pkg.actions.entries()) {
    if (action.index !== index || action.dependsOn !== (index ? index - 1 : null) || action.value !== '0') throw new Error(`Sequence mismatch at ${index}`);
    if (action.stage === 'AUTHORIZE') {
      if (action.target.toLowerCase() !== verification.guardian.toLowerCase() || !guardian.parseTransaction({ data: action.data })) throw new Error(`Authorization decode failed ${index}`);
    } else if (action.stage === 'PAUSE') {
      if (common.parseTransaction({ data: action.data }).name !== 'pause') throw new Error(`Pause decode failed ${index}`);
    } else {
      const key = Object.keys(rows).find((candidate) => rows[candidate].proxy.toLowerCase() === action.target.toLowerCase());
      if (!key) throw new Error(`Unknown proxy at ${index}`);
      const outer = uups.parseTransaction({ data: action.data });
      if (outer.name !== 'upgradeToAndCall') throw new Error(`Upgrade decode failed ${index}`);
      if (action.stage === 'MIGRATE') {
        if (outer.args[0].toLowerCase() !== rows[key].temporary.toLowerCase()) throw new Error(`Temporary target mismatch ${index}`);
        if (migration[key].parseTransaction({ data: outer.args[1] }).name !== 'executeApprovedWalletReplacement') throw new Error(`Migration decode failed ${index}`);
      } else {
        if (outer.args[0].toLowerCase() !== rows[key].permanent.toLowerCase()) throw new Error(`Permanent target mismatch ${index}`);
        if (common.parseTransaction({ data: outer.args[1] }).name !== 'unpause') throw new Error(`Restore decode failed ${index}`);
      }
    }
  }
  if (pkg.actions.at(-1).label !== 'Restore permanent levelManager implementation and unpause') throw new Error('LevelManager must be last');

  const multisig = new ethers.Contract(pkg.multisig, [
    'function getTransactionCount() view returns(uint256)', 'function requiredConfirmations() view returns(uint256)',
    'function timelockDelay() view returns(uint256)', 'function isProposalSubmitter(address) view returns(bool)',
  ], ethers.provider);
  const [nextTransactionId, confirmations, timelock, submitterAllowed] = await Promise.all([
    multisig.getTransactionCount(), multisig.requiredConfirmations(), multisig.timelockDelay(), multisig.isProposalSubmitter(EXPECTED_SUBMITTER),
  ]);
  if (confirmations !== 3n || timelock !== 120n || !submitterAllowed) throw new Error('Multisig readiness failed');
  const report = {
    generatedAt: new Date().toISOString(), chainId: 137, packageFile: path.resolve(__dirname, packageFile),
    packageHash: pkg.packageHash, verdict: 'PASS', actions: pkg.actions.length,
    nextTransactionId: Number(nextTransactionId), finalTransactionId: Number(nextTransactionId) + pkg.actions.length - 1,
    confirmations: Number(confirmations), timelockSeconds: Number(timelock), submitter: EXPECTED_SUBMITTER,
  };
  const output = path.resolve(__dirname, '../migration-audits/wallet-replacement-proposal-validation.json');
  fs.writeFileSync(output, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify({ output, ...report }, null, 2));
}

main().catch((error) => { console.error(error); process.exitCode = 1; });

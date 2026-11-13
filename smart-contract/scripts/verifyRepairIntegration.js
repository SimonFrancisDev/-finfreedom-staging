// Offline compatibility checks; no provider, signer, database or hosted writes.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { createRequire } = require('node:module');
const { Interface } = require('ethers');
const ROOT = path.resolve(__dirname, '../../..');
const front = path.join(ROOT, 'Fin-Freedom-Web2 - Copy');
const back = path.join(ROOT, 'backend');
const read = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const artifact = (source, name) => read(path.join(__dirname, '../artifacts/contracts', source, `${name}.json`)).abi;
const report = { status: 'checking', liveWrites: 0, checks: [], limitations: [
  'Source/ABI compatibility does not certify hosted deployment or post-repair data.',
  'The frontend repair manifest must be bound to verified live deployments before replacement submission.',
] };

function compare(label, existing, candidate) {
  const left = new Interface(existing), right = new Interface(candidate);
  const fragments = left.fragments.filter(f => ['function', 'event'].includes(f.type));
  for (const f of fragments) {
    const signature = f.format('sighash');
    const actual = f.type === 'function' ? right.getFunction(signature) : right.getEvent(signature);
    assert(actual, `${label}: missing ${signature}`);
    assert.deepEqual(f.outputs?.map(v => v.format('sighash')), actual.outputs?.map(v => v.format('sighash')), `${label}: output mismatch ${signature}`);
    if (f.type === 'event') assert.deepEqual(f.inputs.map(v => Boolean(v.indexed)), actual.inputs.map(v => Boolean(v.indexed)), `${label}: indexed fields ${signature}`);
  }
  report.checks.push({ label, fragments: fragments.length, passed: true });
}

async function main() {
  for (const [name, backendFile] of [['RegistrationFixed', 'registration'], ['LevelManager', 'levelManager'],
    ['P4Orbit', 'p4Orbit'], ['P12Orbit', 'p12Orbit'], ['P39Orbit', 'p39Orbit']]) {
    const candidate = artifact(`${name}.sol`, name);
    // Router events are emitted at the manager proxy through delegatecall.
    if (name === 'LevelManager') candidate.push(...artifact('LevelSettlementRouter.sol', 'LevelSettlementRouter').filter(f => f.type === 'event'));
    compare(`frontend ${name}`, read(path.join(front, `src/abis/${name}.json`)), candidate);
    compare(`backend ${name}`, read(path.join(back, `src/blockchain/abis/${backendFile}.abi.json`)), candidate);
  }
  for (const name of ['FreedomPlusRegistration', 'FreedomPlusLevelManager', 'FreedomPlusSettlementRouter',
    'P39PlusOrbit', 'P14PlusOrbit', 'P12PlusOrbit', 'P6PlusOrbit', 'P4PlusOrbit', 'P3PlusOrbit']) {
    const source = name.endsWith('Orbit') ? `freedom-plus/orbits/${name}.sol` : `freedom-plus/${name}.sol`;
    compare(`backend ${name}`, read(path.join(back, `src/blockchain/abis/freedom-plus/${name}.abi.json`)), artifact(source, name));
  }
  const requireFrontend = createRequire(path.join(front, 'package.json'));
  const parser = requireFrontend('@babel/parser');
  const ast = parser.parse(fs.readFileSync(path.join(front, 'src/Services/freedomPlus.js'), 'utf8'), { sourceType: 'module' });
  const registration = ast.program.body.filter(n => n.type === 'VariableDeclaration')
    .flatMap(n => n.declarations).find(n => n.id.name === 'REGISTRATION_ABI');
  assert(registration && registration.init.elements.every(n => n.type === 'StringLiteral'));
  compare('frontend inline Freedom Plus registration', registration.init.elements.map(n => n.value),
    artifact('freedom-plus/FreedomPlusRegistration.sol', 'FreedomPlusRegistration'));
  const ffRepair = await import(pathToFileURL(path.join(back, 'src/blockchain/historicalOrbitRepair.js')));
  compare('F-Freedom repair event ABI', ffRepair.historicalOrbitRepairAbi,
    artifact('migration/Id1HistoricalRepair.sol', 'Id1MultiRingRepairMigrator'));
  const fpRepair = await import(pathToFileURL(path.join(back, 'src/blockchain/freedomPlusHistoricalRepair.js')));
  compare('Freedom Plus repair event ABI', fpRepair.freedomPlusHistoricalRepairAbi,
    artifact('migration/FreedomPlusHistoricalOrbitRepair.sol', 'FreedomPlusP39HistoricalRepair'));

  const served = read(path.join(ROOT, 'tmp/repair-served-frontend-bindings.json'));
  assert.equal(served.origin, 'https://www.finfreedomnetwork.io');
  assert(served.scripts.length > 0);
  const env = { ...served.values };
  const { A, FP } = require('./lib/combinedPlacementRepairPackage');
  const expected = { VITE_CHAIN_ID: '137', VITE_MULTISIG_ADDRESS: A.governance, VITE_GUARDIAN_ADDRESS: A.guardian,
    VITE_REGISTRATION_ADDRESS: A.registration, VITE_LEVEL_MANAGER_ADDRESS: A.manager,
    VITE_P4_ORBIT_ADDRESS: A.p4, VITE_P12_ORBIT_ADDRESS: A.p12, VITE_P39_ORBIT_ADDRESS: A.p39,
    VITE_USDT_ADDRESS: A.usdt, VITE_FREEDOM_PLUS_REGISTRATION_ADDRESS: FP.registration,
    VITE_FREEDOM_PLUS_LEVEL_MANAGER_ADDRESS: FP.manager,
    ...Object.fromEntries(['p39', 'p14', 'p12', 'p6'].map(k => [`VITE_FREEDOM_PLUS_${k.toUpperCase()}_ORBIT_ADDRESS`, FP[k]])) };
  for (const [key, value] of Object.entries(expected)) {
    const actual = key === 'VITE_CHAIN_ID' ? String(Number(env[key] || env.VITE_NETWORK_CHAIN_ID)) :
      env[key] || (key === 'VITE_LEVEL_MANAGER_ADDRESS' ? env.VITE_LEVELMANAGER_ADDRESS : '');
    assert.equal(actual.toLowerCase(), value.toLowerCase(), `Served production ${key} mismatch`);
  }
  assert.equal(env.VITE_FREEDOM_PLUS_ENABLED, 'true');
  report.checks.push({ label: 'actual served production bundle bindings', passed: true, chainId: 137,
    sourceCheckedAt: served.checkedAt, scripts: served.scripts, addressBindings: Object.keys(expected).length - 1 });
  const render = read(path.join(ROOT, 'tmp/repair-render-environment-review.json'));
  assert.equal(render.hostedWrites, 0);
  for (const service of render.services) assert.equal(service.publicAddresses.FREEDOM_PLUS_SETTLEMENT_ROUTER_ADDRESS.toLowerCase(), FP.router.toLowerCase());
  if (!env.VITE_FREEDOM_PLUS_SETTLEMENT_ROUTER_ADDRESS) {
    report.limitations.push('Served frontend lacks the Freedom Plus router target label binding; add the verified public address and rebuild before proposals.');
    env.VITE_FREEDOM_PLUS_SETTLEMENT_ROUTER_ADDRESS = FP.router;
  } else assert.equal(env.VITE_FREEDOM_PLUS_SETTLEMENT_ROUTER_ADDRESS.toLowerCase(), FP.router.toLowerCase());
  const ui = await import(pathToFileURL(path.join(front, 'src/utils/governanceMaintenance.js')));
  const pkg = read(path.join(__dirname, '../../docs/evidence/combined-placement-repair-rehearsal-2026-11-13.json')).package;
  const targets = ui.governanceTargets(env);
  // This manifest is test-only. Fork-predicted addresses are NEVER exported as a live manifest.
  const fixtureManifest = { status: 'verified-mainnet-deployments', chainId: 137, governance: A.governance, actions: pkg.actions };
  let count = 0;
  for (const action of pkg.actions) {
    if (!['PAUSE', 'MIGRATOR', 'REPAIR', 'INSTALL', 'REOPEN'].includes(action.phase)) continue;
    const decoded = ui.describeGovernanceMaintenance({ to: action.target, value: action.value, data: action.data,
      chainId: 137, multisig: A.governance }, targets, fixtureManifest);
    assert(decoded && decoded.reviewRequired === false, `Unrecognized maintenance action: ${action.label}`);
    if (action.program === 'Freedom Plus') assert(decoded.targetLabel.includes('Freedom Plus'));
    count++;
  }
  report.checks.push({ label: 'all combined-package maintenance descriptions (fixture manifest)', passed: true, actions: count });
  report.status = 'source-and-served-bindings-verified-live-repair-not-executed';
  fs.writeFileSync(path.join(ROOT, 'tmp/repair-integration-verification.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report, null, 2));
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });

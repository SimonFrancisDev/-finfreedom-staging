// Read-only Polygon audit. No environment file, wallet, signer or broadcast.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const E = require('ethers');
const ROOT = path.resolve(__dirname, '../../..');
const CONTRACTS = path.resolve(__dirname, '..');
const DIR = path.join(ROOT, 'tmp/freedom-plus-id1-audit');
const manifest = require('../deployments-production-migration/production-layer-deployment.json');
const names = ['FreedomPlusRegistration', 'FreedomPlusLevelManager', 'FreedomPlusSettlementRouter',
  'P39PlusOrbit', 'P14PlusOrbit', 'P12PlusOrbit', 'P6PlusOrbit', 'P4PlusOrbit', 'P3PlusOrbit'];
const slot = '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc';
const json = v => JSON.stringify(v, (_, x) => typeof x === 'bigint' ? x.toString() : x, 2);
const same = (a, b) => assert.equal(a.toLowerCase(), b.toLowerCase());
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
const builds = new Map();
function artifact(name) {
  const source = `contracts/freedom-plus/${name.includes('Orbit') ? 'orbits/' : ''}${name}.sol`;
  const file = path.join(CONTRACTS, 'artifacts', source, `${name}.json`);
  const a = JSON.parse(fs.readFileSync(file));
  const dbg = JSON.parse(fs.readFileSync(file.replace(/\.json$/, '.dbg.json')));
  const buildPath = path.resolve(path.dirname(file), dbg.buildInfo);
  if (!builds.has(buildPath)) builds.set(buildPath, JSON.parse(fs.readFileSync(buildPath)));
  const build = builds.get(buildPath);
  return { ...a, source, build, compiled: build.output.contracts[source][name] };
}
function normalize(code, refs) {
  let result = code.slice(2).toLowerCase();
  for (const ref of Object.values(refs).flat()) result = result.slice(0, ref.start * 2) +
    '0'.repeat(ref.length * 2) + result.slice((ref.start + ref.length) * 2);
  return result;
}
function stripMetadata(code) {
  return code.slice(0, code.length - 4 - Number.parseInt(code.slice(-4), 16) * 2);
}
async function main() {
  assert(process.env.FP_AUDIT_RPC, 'Explicit Polygon mainnet RPC required');
  fs.mkdirSync(DIR, { recursive: true });
  const req = new E.FetchRequest(process.env.FP_AUDIT_RPC); req.timeout = 30000;
  const provider = new E.JsonRpcProvider(req, undefined, { batchMaxCount: 1 });
  try {
    assert.equal((await provider.getNetwork()).chainId, 137n);
    const end = Number(process.env.FP_AUDIT_END_BLOCK || (await provider.getBlockNumber()) - 12);
    const block = await provider.getBlock(end);
    const addresses = names.map(name => manifest.contracts[name].proxy);
    const start = Math.min(...names.map(name => manifest.contracts[name].deploymentBlock));
    const report = { chainId: 137, liveWrites: 0, status: 'collecting', fromBlock: start, toBlock: end,
      toBlockHash: block.hash, toUtc: new Date(block.timestamp * 1000).toISOString(),
      id1: manifest.existing.id1, governance: manifest.existing.governance, contracts: {}, wiring: {} };
    const deployed = {};
    for (const name of names) {
      const a = artifact(name), proxy = manifest.contracts[name].proxy;
      const impl = E.getAddress('0x' + (await provider.getStorage(proxy, slot, end)).slice(-40));
      const code = await provider.getCode(impl, end); assert.notEqual(code, '0x');
      const refs = a.compiled.evm.deployedBytecode.immutableReferences || {};
      const live = normalize(code, refs), local = normalize(a.deployedBytecode, refs);
      const sourceMatches = Object.keys(JSON.parse(a.compiled.metadata).sources).every(file => {
        const localPath = file.startsWith('@') ? path.join(CONTRACTS, 'node_modules', file) : path.join(CONTRACTS, file);
        return fs.readFileSync(localPath, 'utf8') === a.build.input.sources[file].content;
      });
      const c = new E.Contract(proxy, a.abi, provider); deployed[name] = c;
      const owner = await c.owner({ blockTag: end }); same(owner, manifest.existing.governance);
      report.contracts[name] = { proxy, implementation: impl, runtimeHash: E.keccak256(code), owner,
        paused: await c.paused({ blockTag: end }), exactNormalizedMatch: live === local,
        executableMatch: stripMetadata(live) === stripMetadata(local), sourceMatches,
        source: a.source, compiler: a.build.solcLongVersion };
      console.log(json({ phase: 'identity', name, ...report.contracts[name] }));
    }
    const router = deployed.FreedomPlusSettlementRouter;
    const reg = deployed.FreedomPlusRegistration;
    const mgr = deployed.FreedomPlusLevelManager;
    const opts = { blockTag: end };
    same(await router.id1Wallet(opts), report.id1);
    same(await reg.id1Wallet(opts), report.id1);
    same(await reg.fFreedomRegistration(opts), manifest.existing.registration);
    same(await router.registration(opts), reg.target);
    same(await router.manager(opts), mgr.target);
    same(await mgr.settlementRouter(opts), router.target);
    same(await router.usdt(opts), manifest.existing.usdt);
    for (let i = 0; i < 6; i++) {
      const orbit = deployed[names[3 + i]];
      same(await router.orbitByType(i, opts), orbit.target);
      same(await orbit.manager(opts), router.target);
    }
    report.wiring = { verified: true, registeredCount: String(await reg.registeredCount(opts)),
      id1: report.id1, usdt: manifest.existing.usdt, fFreedomRegistration: manifest.existing.registration };
    fs.writeFileSync(path.join(DIR, 'identity.json'), json(report) + '\n');
    const interfaces = new Map(names.map(name => [manifest.contracts[name].proxy.toLowerCase(), new E.Interface(artifact(name).abi)]));
    const addressNames = new Map(names.map(name => [manifest.contracts[name].proxy.toLowerCase(), name]));
    const all = [];
    let cursor = start, width = 50000;
    const ranges = path.join(DIR, 'ranges'); fs.mkdirSync(ranges, { recursive: true });
    while (cursor <= end) {
      const last = Math.min(end, cursor + width - 1);
      const cache = path.join(ranges, `${cursor}-${last}.json`);
      let logs;
      if (fs.existsSync(cache)) {
        const saved = JSON.parse(fs.readFileSync(cache));
        assert.equal(saved.chainId, 137); assert.deepEqual(saved.addresses, addresses);
        logs = saved.logs;
      } else {
        try {
          logs = await provider.send('eth_getLogs', [{ address: addresses, fromBlock: E.toQuantity(cursor), toBlock: E.toQuantity(last) }]);
        } catch (error) {
          const message = json(error);
          if (/range|too many|limit|exceed/i.test(message) && width > 1000) {
            width = Math.max(1000, Math.floor(width / 2));
            console.log(json({ phase: 'reduce-range', width })); await pause(500); continue;
          }
          throw error;
        }
        fs.writeFileSync(cache, json({ chainId: 137, addresses, logs }) + '\n');
        await pause(150);
      }
      all.push(...logs); cursor = last + 1;
      console.log(json({ phase: 'logs', through: last, end, count: all.length }));
    }
    same((await provider.getBlock(end)).hash, block.hash);
    const events = all.map(log => {
      let parsed; try { parsed = interfaces.get(log.address.toLowerCase()).parseLog(log); } catch {}
      const base = { block: Number(BigInt(log.blockNumber)), tx: log.transactionHash, index: Number(BigInt(log.logIndex)),
        address: E.getAddress(log.address), contract: addressNames.get(log.address.toLowerCase()) };
      return { ...base, event: parsed?.name || 'UNDECODED', args: parsed ? Object.fromEntries(
        parsed.fragment.inputs.map((input, i) => [input.name, parsed.args[i]])) : { topics: log.topics, data: log.data } };
    }).sort((a, b) => a.block - b.block || a.index - b.index);
    report.status = 'collected'; report.eventCount = events.length;
    report.eventCounts = events.reduce((o, e) => (o[e.event] = (o[e.event] || 0) + 1, o), {});
    report.events = events;
    fs.writeFileSync(path.join(DIR, 'events.json'), json(report) + '\n');
    console.log(json({ phase: 'complete', fromBlock: start, toBlock: end, eventCounts: report.eventCounts,
      output: path.join(DIR, 'events.json') }));
  } finally { provider.destroy(); }
}
if (require.main === module) main().catch(error => { console.error(error.stack || error.message); process.exitCode = 1; });
module.exports = { artifact, normalize, stripMetadata };

// Read-only Polygon source; every approval, cancellation and execution below is LOCAL.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const hre = require("hardhat");
const { A, FP, engines, buildCombinedPackage } = require("./lib/combinedPlacementRepairPackage");
const { orbitStorageSlots, storageSpan } = require("./lib/primeForkOrbitStorage");
const { baselineContract } = require("./rehearseId1PrimaryPlacement");
const { verifyLive } = require("./prepareId1ProductionPackage");
const { plain } = require("./lib/id1HistoricalRepairPlan");
const { ethers: E, network: N, artifacts } = hre;
const ROOT = path.resolve(__dirname, "../../..");
const OUTPUT = path.join(ROOT, "tmp/combined-placement-repair-rehearsal.json");
const IMPL = "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc";
const read = p => JSON.parse(fs.readFileSync(path.join(ROOT, p), "utf8"));
const json = v => JSON.stringify(v, (_, x) => typeof x === "bigint" ? x.toString() : x, 2);
const sha = v => crypto.createHash("sha256").update(v).digest("hex");
const same = (a, b) => assert.equal(a.toLowerCase(), b.toLowerCase());
const report = { status: "in-progress", sourceChainId: 137, executionChainId: 31337,
  liveTransactionsSent: 0, phases: [], actions: [], cancellations: [], checks: [] };
function record(phase, detail = {}) {
  report.phases.push({ phase, ...detail });
  fs.writeFileSync(OUTPUT, json(report) + "\n");
  console.log(json({ phase, ...detail }));
}
async function signer(address) {
  assert.equal(N.name, "hardhat"); assert.equal((await E.provider.getNetwork()).chainId, 31337n);
  await N.provider.send("hardhat_impersonateAccount", [address]);
  await N.provider.send("hardhat_setBalance", [address, E.toBeHex(E.parseEther("100"))]);
  return E.getSigner(address);
}
async function batchRead(rpc, requests) {
  const response = await fetch(rpc, { method: "POST", headers: { "content-type": "application/json" },
    signal: AbortSignal.timeout(30000), body: JSON.stringify(requests.map((r, id) => ({ jsonrpc: "2.0", id, ...r }))) });
  assert(response.ok, `Read-only RPC HTTP ${response.status}`);
  const rows = await response.json();
  assert(Array.isArray(rows) && rows.length === requests.length, "Incomplete read-only response");
  const byId = new Map(rows.map(r => [r.id, r])); assert.equal(byId.size, requests.length);
  return requests.map((_, id) => {
    const row = byId.get(id); assert(row && !row.error, `Read-only RPC failed at item ${id}`); return row.result;
  });
}
async function prime(rpc, block, hash, proxy, slots) {
  const file = path.join(ROOT, `tmp/combined-placement-storage-${block}-${proxy.toLowerCase()}.json`);
  const cache = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : { chainId: 137, block, hash, proxy, values: {} };
  assert.equal(cache.chainId, 137); assert.equal(cache.block, block); assert.equal(cache.hash, hash); same(cache.proxy, proxy);
  for (let start = 0; start < slots.length; start += 20) {
    const batch = slots.slice(start, start + 20);
    const missing = batch.filter(s => !cache.values[s]);
    if (missing.length) {
      const values = await batchRead(rpc, missing.map(slot => ({ method: "eth_getStorageAt", params: [proxy, slot, E.toQuantity(block)] })));
      for (const [i, slot] of missing.entries()) {
        assert(/^0x[0-9a-f]{64}$/i.test(values[i])); cache.values[slot] = values[i];
      }
      fs.writeFileSync(file, json(cache) + "\n");
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    for (const slot of batch) {
      assert(/^0x[0-9a-f]{64}$/i.test(cache.values[slot]));
      await N.provider.send("hardhat_setStorageAt", [proxy, slot, cache.values[slot]]);
    }
    if (start % 600 === 0) console.log(json({ phase: "cache-pinned-source", proxy, loaded: start + batch.length, total: slots.length }));
  }
  record("source-storage-primed", { proxy, slots: slots.length, sha256: sha(fs.readFileSync(file)) });
}
async function expectRevert(label, expression, run) {
  let error; try { await run(); } catch (caught) { error = caught; }
  assert(error && expression.test(error.shortMessage || error.message), `${label}: expected ${expression}, got ${error?.message}`);
  report.checks.push({ label, passed: true });
}
async function main() {
  assert.equal(N.name, "hardhat"); assert.equal((await E.provider.getNetwork()).chainId, 31337n);
  const rpc = process.env.COMBINED_REPAIR_MAINNET_RPC;
  assert(rpc, "Explicit read-only Polygon RPC required");
  const ff = read("staging-environment/docs/evidence/id1-alternative-repair-rehearsal-2026-11-13.json");
  const inputs = read("staging-environment/docs/evidence/combined-placement-package-inputs-2026-11-13.json");
  const previous = inputs.previous;
  const fp = read("staging-environment/docs/evidence/freedom-plus-historical-repair-rehearsal-2026-11-13.json");
  const audit = inputs.audit;
  const table = read("staging-environment/docs/evidence/placement-payment-correction-table-2026-11-13.json");
  const block = fp.block; const blockHash = fp.blockHash;
  const source = new E.JsonRpcProvider(rpc, undefined, { batchMaxCount: 1 });
  let header; const oldProposals = [];
  const govInterface = new E.Interface((await artifacts.readArtifact("SimpleMultiSig")).abi);
  try {
    assert.equal((await source.getNetwork()).chainId, 137n);
    header = await source.getBlock(block); assert.equal(header.hash, blockHash);
    const checkPackage = buildCombinedPackage(ff, previous, fp, audit, table, 0);
    await verifyLive(source, checkPackage.fFreedom, block);
    assert.equal(E.keccak256(await source.getCode(A.governance, block)), ff.governance.runtimeHash);
    for (let start = 130; start <= 159; start += 10) {
      const ids = Array.from({ length: 10 }, (_, i) => start + i);
      const data = await batchRead(rpc, ids.map(id => ({ method: "eth_call", params: [{ to: A.governance,
        data: govInterface.encodeFunctionData("transactions", [id]) }, E.toQuantity(block)] })));
      for (const [i, id] of ids.entries()) {
        const tx = govInterface.decodeFunctionResult("transactions", data[i]);
        const expected = previous.actions[id - 130];
        same(tx.to, expected.target); assert.equal(tx.value, 0n); assert.equal(tx.data, expected.data);
        assert.equal(tx.executed, false, `Old proposal ${id} executed; reassess, do not proceed`);
        oldProposals.push({ id, cancelled: tx.cancelled, confirmations: Number(tx.confirmations) });
      }
    }
  } finally { source.destroy(); }
  report.sourceBlock = { number: block, hash: blockHash, utc: new Date(header.timestamp * 1000).toISOString(), gasLimit: header.gasLimit };
  report.sourceOldProposals = oldProposals;
  report.sourceFiles = Object.fromEntries([
    "scripts/lib/combinedPlacementRepairPackage.js", "scripts/rehearseCombinedPlacementRepair.js",
    "contracts/migration/FreedomPlusHistoricalOrbitRepair.sol", "contracts/migration/Id1HistoricalRepair.sol",
    "contracts/freedom-plus/FreedomPlusSettlementRouter.sol",
  ].map(file => [file, sha(fs.readFileSync(path.resolve(__dirname, "..", file)))]));
  await N.provider.send("hardhat_reset", [{ forking: { jsonRpcUrl: rpc, blockNumber: block } }]);
  const submitter = await signer(A.submitter);
  const gov = await E.getContractAt("SimpleMultiSig", A.governance, submitter);
  assert(await gov.isOwner(A.submitter) || await gov.isProposalSubmitter(A.submitter));
  const owners = await gov.getOwners(); const threshold = Number(await gov.requiredConfirmations());
  const delay = Number(await gov.timelockDelay());
  assert.equal(threshold, 3); assert.equal(delay, 120);
  const ownerSigners = []; for (const address of owners.slice(0, threshold)) ownerSigners.push(await signer(address));
  report.governance = { address: A.governance, owners, threshold, delay, runtimeHash: ff.governance.runtimeHash };
  record("mainnet-bindings-and-governance-verified", { block, threshold, timelockSeconds: delay, obsoleteProposals: oldProposals.length });

  // Long proposal calldata otherwise causes thousands of serial lazy fork reads.
  // Cache the actual pinned source values for those slots, never assumed zeroes.
  const govArtifact = await artifacts.readArtifact("SimpleMultiSig");
  // This layout is ONLY a read-ahead hint. Every cached word is read from the
  // pinned source unchanged, so a different layout cannot fabricate state.
  // The multisig is never upgraded/overridden: execution uses its verified
  // on-chain bytecode, not this locally compiled version.
  record("governance-code-boundary", { deployedRuntimeHash: ff.governance.runtimeHash,
    localArtifactRuntimeHash: E.keccak256(govArtifact.deployedBytecode),
    usesDeployedCodeForExecution: true, localLayoutUsedOnlyForExactSourceReadAhead: true });
  const govBuild = await artifacts.getBuildInfo(`${govArtifact.sourceName}:SimpleMultiSig`);
  const govLayout = govBuild.output.contracts[govArtifact.sourceName].SimpleMultiSig.storageLayout;
  const array = govLayout.storage.find(s => s.label === "transactions");
  const item = govLayout.types[govLayout.types[array.type].base];
  const stride = BigInt(Math.ceil(Number(item.numberOfBytes) / 32));
  const dataOffset = BigInt(item.members.find(m => m.label === "data").slot);
  const arrayBase = BigInt(E.keccak256(E.AbiCoder.defaultAbiCoder().encode(["uint256"], [array.slot])));
  const template = buildCombinedPackage(ff, previous, fp, audit, table, 0);
  const cancellations = template.cancellations.filter(a => !oldProposals.find(o => o.id === a.oldProposalId).cancelled);
  const future = [...cancellations, ...template.actions];
  const firstId = await gov.getTransactionCount(); const govSlots = new Set();
  for (const [i, action] of future.entries()) {
    const id = firstId + BigInt(i); const base = arrayBase + id * stride;
    for (let j = 0n; j < stride; j++) govSlots.add(E.toBeHex(base + j, 32));
    const length = E.getBytes(action.data).length;
    if (length >= 32) {
      const start = BigInt(E.keccak256(E.AbiCoder.defaultAbiCoder().encode(["uint256"], [base + dataOffset])));
      for (let j = 0; j < Math.ceil(length / 32); j++) govSlots.add(E.toBeHex(start + BigInt(j), 32));
    }
    for (const owner of owners.slice(0, threshold)) for (const slot of storageSpan(govLayout, "approved", [id, owner])) govSlots.add(slot);
  }
  for (const old of oldProposals) for (let j = 0n; j < stride; j++) govSlots.add(E.toBeHex(arrayBase + BigInt(old.id) * stride + j, 32));
  await prime(rpc, block, blockHash, A.governance, [...govSlots]);

  // All multisig calls use its real code and owner checks; only owner signatures are impersonated locally.
  async function submit(action) {
    const receipt = await (await gov.submitTransaction(action.target, 0, action.data, { gasLimit: 29_000_000 })).wait();
    const event = receipt.logs.map(l => { try { return gov.interface.parseLog(l); } catch { return null; } }).find(e => e?.name === "Submit");
    assert(event); return event.args.txId;
  }
  async function approveAndExecute(action, checkGuards = false) {
    const id = await submit(action);
    if (checkGuards) {
      await expectRevert("multisig rejects missing approvals", /Not enough confirmations/, () => gov.connect(ownerSigners[0]).executeTransaction.staticCall(id));
      await expectRevert("submitter cannot approve as a founder", /Not owner/, () => gov.approveTransaction.staticCall(id));
    }
    for (const owner of ownerSigners) await (await gov.connect(owner).approveTransaction(id, { gasLimit: 150_000 })).wait();
    if (checkGuards) await expectRevert("multisig enforces timelock", /Timelock not expired/, () => gov.connect(ownerSigners[0]).executeTransaction.staticCall(id));
    await N.provider.send("evm_increaseTime", [delay + 1]); await N.provider.send("evm_mine");
    const receipt = await (await gov.connect(ownerSigners[0]).executeTransaction(id, { gasLimit: 29_000_000 })).wait();
    assert(receipt.gasUsed < header.gasLimit, "Execution exceeds source block gas limit");
    assert((await gov.transactions(id)).executed);
    return { localProposalId: id, localTransaction: receipt.hash, gasUsed: receipt.gasUsed };
  }
  for (const old of oldProposals) {
    if (old.cancelled) continue;
    const action = { target: A.governance, data: gov.interface.encodeFunctionData("cancelTransaction", [old.id]) };
    const result = await approveAndExecute(action, report.cancellations.length === 0);
    report.cancellations.push({ oldProposalId: old.id, ...result });
    if (report.cancellations.length % 5 === 0) record("cancellations-progress", { completed: report.cancellations.length });
  }
  record("obsolete-proposals-cancelled-locally", { count: report.cancellations.length });
  const startNonce = await E.provider.getTransactionCount(A.submitter);
  const pkg = buildCombinedPackage(ff, previous, fp, audit, table, startNonce);
  report.package = pkg;
  report.productionConstructorDifference = "Repair constructors use 31337 only in rehearsal; unsigned production template uses 137. All targets, payloads and phase order are unchanged.";
  for (const d of pkg.reusedDeployments) {
    const art = await artifacts.readArtifact(d.name);
    assert.equal(E.keccak256(art.bytecode), d.creationBytecodeHash, `Changed reused artifact ${d.key}`);
    const runtime = await E.provider.getCode(d.address); assert.notEqual(runtime, "0x");
    if (d.key === "router") {
      const router = await E.getContractAt("LevelSettlementRouter", d.address);
      same(await router.levelManager(), A.manager); same(await router.usdt(), A.usdt);
    }
  }
  for (const d of pkg.deployments) {
    const args = [...d.args]; if (args.length === 4) args[3] = 31337;
    const factory = await E.getContractFactory(d.name, submitter);
    const c = await factory.deploy(...args, { gasLimit: 29_000_000 }); await c.waitForDeployment(); same(c.target, d.address);
    d.creationBytecodeHash = E.keccak256(factory.bytecode);
    d.localDeploymentTransaction = c.deploymentTransaction().hash;
  }
  record("bound-contracts-deployed-locally", { count: pkg.deployments.length, reused: pkg.reusedDeployments.length });

  const ffContracts = {};
  for (const [key, name] of [["registration", "RegistrationFixed"], ["manager", "LevelManager"], ["p4", "P4Orbit"], ["p12", "P12Orbit"], ["p39", "P39Orbit"]]) {
    const c = await E.getContractAt(name, A[key]); ffContracts[key] = c;
    same(await c.owner(), A.governance);
    const old = pkg.fFreedom.previousImplementations[key];
    same("0x" + (await E.provider.getStorage(A[key], IMPL)).slice(-40), old);
    const baseline = baselineContract(path.join(ROOT, "tmp/id1-pre-change-build-info"), `contracts/${name}.sol`, name, await E.provider.getCode(old));
    const group = ff.manifest.edits.find(g => g.key === key);
    if (group) {
      const snapshot = read("staging-environment/docs/evidence/id1-alternative-repair-prestate-2026-11-13.json");
      const rows = group.before.map(row => ({ wallet: row.wallet, level: row.level, capacity: row.slots.length,
        totalCycles: snapshot.orbits.find(o => o.wallet.toLowerCase() === row.wallet.toLowerCase() && o.level === row.level).state.totalCycles }));
      if (key === "p39") rows.push({ wallet: A.id1, level: 6, capacity: 39,
        totalCycles: snapshot.orbits.find(o => o.wallet.toLowerCase() === A.id1.toLowerCase() && o.level === 6).state.totalCycles });
      await prime(rpc, block, blockHash, A[key], orbitStorageSlots(baseline.storageLayout, rows));
    }
  }
  const fpContracts = {};
  for (const [key, name] of [...engines, ["registration", "FreedomPlusRegistration"], ["manager", "FreedomPlusLevelManager"], ["router", "FreedomPlusSettlementRouter"]]) {
    const c = await E.getContractAt(name, FP[key]); fpContracts[key] = c;
    same(await c.owner(), A.governance); same(await c.guardian(), A.guardian);
    same("0x" + (await E.provider.getStorage(FP[key], IMPL)).slice(-40), audit.contracts[name].implementation);
    assert.equal(E.keccak256(await E.provider.getCode(audit.contracts[name].implementation)), audit.contracts[name].runtimeHash);
    if (engines.some(([k]) => k === key)) {
      const cacheFile = path.join(ROOT, `tmp/freedom-plus-repair-storage-${block}-${FP[key].toLowerCase()}.json`);
      const raw = fs.readFileSync(cacheFile);
      const sourceRecord = fp.phases.find(p => p.phase === "source-storage-cached-locally" && p.proxy === FP[key]);
      assert.equal(sha(raw), sourceRecord.cacheSHA256);
      for (const [slot, value] of Object.entries(JSON.parse(raw))) await N.provider.send("hardhat_setStorageAt", [FP[key], slot, value]);
    }
  }
  same(await fpContracts.registration.fFreedomRegistration(), A.registration);
  same(await fpContracts.router.registration(), FP.registration); same(await fpContracts.router.manager(), FP.manager);
  same(await fpContracts.router.id1Wallet(), A.id1); same(await fpContracts.router.usdt(), A.usdt);
  const token = await E.getContractAt("IERC20", A.usdt);
  const ffController = await E.getContractAt("FreedomTokenController", await ffContracts.manager.tokenController());
  const fpController = await E.getContractAt("FreedomPlusTokenController", await fpContracts.manager.tokenController());
  const tokens = [token];
  for (const address of [await ffController.fgt(), await ffController.fgtr(), await fpController.fpt(), await fpController.fptr()]) tokens.push(await E.getContractAt("IERC20", address));
  const watched = new Set([A.id1, A.sofia, A.sabina, A.parent, A.manager, A.registration, FP.router, FP.manager,
    await ffContracts.manager.escrow(), await ffContracts.manager.nftPool(), await ffContracts.manager.operationsWallet(),
    await fpContracts.router.nftPoolVault(), await fpContracts.router.operationsVault(),
    ...table.rows.filter(r => r.program === "Freedom Plus").flatMap(r => [r.participant, r.proposedParent]),
    ...(await ffContracts.manager.getFounderWallets())[0]]);
  for (let i = 0; i < 8; i++) watched.add(await fpContracts.router.founderWallets(i));
  const fpOriginalPositions = [];
  for (const [key, name, , level] of engines) {
    const groups = fp.edits.find(g => g.name === name).edits;
    const capacity = { p39: 39, p14: 14, p12: 12, p6: 6 }[key];
    for (const edit of groups) for (let slot = 1; slot <= capacity; slot++) {
      const p = plain(await fpContracts[key].positionAt(edit.account, level, edit.cycle, slot));
      if (p[0] !== E.ZeroAddress) fpOriginalPositions.push({ key, account: edit.account, level, cycle: edit.cycle, slot, position: p });
    }
  }
  async function invariants() {
    const value = { supplies: [], usdt: [], earnings: [], sponsors: [], ffRegistered: await ffContracts.registration.registeredCount(),
      fpRegistered: await fpContracts.registration.registeredCount(), ffActivation: await ffContracts.manager.nextActivationId() };
    for (const c of tokens) value.supplies.push([c.target, await c.totalSupply()]);
    for (const wallet of watched) value.usdt.push([wallet, await token.balanceOf(wallet)]);
    for (const group of ff.manifest.edits) for (const row of group.before) value.earnings.push([group.key, row.wallet, row.level, (await ffContracts[group.key].userOrbits(row.wallet, row.level)).totalEarned]);
    for (const wallet of [A.sofia, A.sabina, ...new Set(table.rows.filter(r => r.program === "Freedom Plus").map(r => r.participant))]) {
      value.sponsors.push([wallet, await ffContracts.registration.getReferrer(wallet), await fpContracts.registration.sponsorOf(wallet)]);
    }
    return plain(value);
  }
  const before = await invariants(); report.before = before;
  const guardian = await E.getContractAt("Guardian", A.guardian);
  let deferredHash;
  async function checkRepairedState(temporary = false) {
    for (const row of fpOriginalPositions) assert.deepEqual(plain(await fpContracts[row.key].positionAt(row.account, row.level, row.cycle, row.slot)), row.position);
    for (const [key, name] of engines) for (const edit of fp.edits.find(g => g.name === name).edits) {
      for (const addition of edit.additions) assert.deepEqual(plain(await fpContracts[key].positionAt(edit.account, edit.level, edit.cycle, addition.slot)),
        addition.data.map((v, i) => [4, 5, 6].includes(i) ? BigInt(v) : v));
    }
    same(await ffContracts.registration.currentMatrixParentOf(A.sofia, 8), A.sabina);
    same(await ffContracts.registration.currentMatrixParentOf(A.sofia, 9), A.id1);
    if (temporary) {
      for (const group of ff.manifest.edits) {
        const view = await E.getContractAt(group.key === "p4" ? "Id1P4RepairMigrator" : "Id1MultiRingRepairMigrator", A[group.key]);
        for (const edit of group.edits) {
          const state = await view.repairState(edit[0], edit[1]);
          assert.equal(json(plain(state[1])), json(edit[3]), "Temporary repair state differs from reviewed full slot vector");
        }
      }
    } else {
      same((await ffContracts.p12.getPosition(A.id1, 8, 3)).occupant, A.sabina);
      same((await ffContracts.p12.getPosition(A.id1, 8, 6)).occupant, A.sofia);
      same((await ffContracts.p39.getPosition(A.id1, 9, 2)).occupant, A.sabina);
      same((await ffContracts.p39.getPosition(A.id1, 9, 3)).occupant, A.sofia);
    }
    assert.deepEqual(await invariants(), before);
  }
  let previousPhase;
  for (const action of pkg.actions) {
    if (action.phase !== previousPhase) {
      record("begin-phase", { phaseName: action.phase }); previousPhase = action.phase;
      if (action.phase === "REPAIR") {
        for (const c of [...Object.values(ffContracts), ...Object.values(fpContracts)]) assert(await c.paused());
        const view = await E.getContractAt("Id1MultiRingRepairMigrator", A.p39);
        deferredHash = (await view.repairState(A.id1, 6))[0];
      }
      if (action.phase === "INSTALL") {
        await checkRepairedState(true);
        const view = await E.getContractAt("Id1MultiRingRepairMigrator", A.p39);
        assert.equal((await view.repairState(A.id1, 6))[0], deferredHash);
        report.checks.push({ label: "both repairs preserve money, sponsorship, occupied FP slots and deferred level 6", passed: true });
      }
      if (action.phase === "REOPEN") {
        await checkRepairedState();
        for (const c of [...Object.values(ffContracts), ...Object.values(fpContracts)]) assert(await c.paused());
        for (const d of pkg.deployments.filter(d => d.key.endsWith("Migrator"))) assert.equal(await guardian.approvedImplementations(d.args[0], d.address), false);
        record("local-reopening-gate-passed", { liveBackendAndBrowserVerificationStillRequired: true });
      }
    }
    const result = await approveAndExecute(action);
    report.actions.push({ index: action.index, phase: action.phase, program: action.program, label: action.label, ...result });
    if (action.phase === "REPAIR") {
      const receipt = await E.provider.getTransactionReceipt(result.localTransaction);
      assert(!receipt.logs.some(log => tokens.some(t => t.target.toLowerCase() === log.address.toLowerCase())), "Repair produced token events");
    }
    if (action.index % 5 === 0 || action.phase === "REPAIR") record("action-executed-locally", { index: action.index, phaseName: action.phase, gasUsed: result.gasUsed });
  }
  for (const c of [...Object.values(ffContracts), ...Object.values(fpContracts)]) assert.equal(await c.paused(), false);
  for (const [key, name] of engines) same("0x" + (await E.provider.getStorage(FP[key], IMPL)).slice(-40), audit.contracts[name].implementation);
  same("0x" + (await E.provider.getStorage(FP.router, IMPL)).slice(-40), pkg.deployments.find(d => d.key === "fp.router").address);
  for (const key of ["p4", "p12", "p39", "manager"]) same("0x" + (await E.provider.getStorage(A[key], IMPL)).slice(-40), pkg.reusedDeployments.find(d => d.key === key).address);
  same(await ffContracts.manager.settlementRouter(), pkg.reusedDeployments.find(d => d.key === "router").address);
  report.after = await invariants(); assert.deepEqual(report.after, before);
  assert.equal(Number(await gov.requiredConfirmations()), threshold); assert.equal(Number(await gov.timelockDelay()), delay);
  assert.deepEqual(Array.from(await gov.getOwners()), Array.from(owners));
  report.status = "combined-multisig-fork-passed-not-live-release-approval";
  record("complete", { status: report.status, repairActions: pkg.actions.length, localCancellations: report.cancellations.length,
    noTokenTransferOrSupplyChange: true, governanceUnchanged: true, backendReleaseStillRequired: true });
}
if (require.main === module) main().catch(error => {
  report.status = "failed"; report.error = error.shortMessage || error.message;
  record("failed", { error: report.error }); process.exitCode = 1;
});

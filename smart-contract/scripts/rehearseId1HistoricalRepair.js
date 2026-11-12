// Disposable mainnet-fork rehearsal only. No remote signer or live broadcasts.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const hre = require("hardhat");
const { assertStorageUpgradeSafe } = require("@openzeppelin/upgrades-core");
const { addresses: A, baselineContract, fundLocalReplayBalance } = require("./rehearseId1PrimaryPlacement");
const { plain, buildOrbitEdit, encodeOrbitPlan, encodeParentPlan } = require("./lib/id1HistoricalRepairPlan");
const { ethers: E, network: N, artifacts } = hre;
const IMPL = "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc";
const MIGRATION = "contracts/migration/Id1HistoricalRepair.sol";
const ADJUSTMENT = 512000000n;
const ROOT = path.resolve(__dirname, "../../..");
const json = (x) => JSON.stringify(x, (_, v) => typeof v === "bigint" ? v.toString() : v, 2);
const same = (a, b) => assert.equal(a.toLowerCase(), b.toLowerCase());
const evidence = { sourceChainId: 137, executionChainId: 31337, liveTransactionsSent: 0, status: "in-progress", phases: [], checks: [] };
const output = path.join(ROOT, "tmp/id1-historical-repair-rehearsal.json");
function record(phase, data = {}) {
  evidence.phases.push({ phase, ...data });
  fs.writeFileSync(output, json(evidence) + "\n");
  console.log(json({ phase, ...data }));
}
async function deploy(name, args = []) {
  const c = await (await E.getContractFactory(name)).deploy(...args);
  await c.waitForDeployment();
  return c;
}
async function impersonate(address) {
  await N.provider.send("hardhat_impersonateAccount", [address]);
  await N.provider.send("hardhat_setBalance", [address, E.toBeHex(E.parseEther("100"))]);
  return E.getSigner(address);
}
async function setImplementation(proxy, implementation) {
  assert.equal(N.name, "hardhat");
  assert.equal((await E.provider.getNetwork()).chainId, 31337n);
  await N.provider.send("hardhat_setStorageAt", [proxy, IMPL, E.zeroPadValue(implementation, 32)]);
}
async function layout(source, name) {
  const build = await artifacts.getBuildInfo(`${source}:${name}`);
  return build.output.contracts[source][name].storageLayout;
}
async function main() {
  assert.equal(N.name, "hardhat");
  assert.equal((await E.provider.getNetwork()).chainId, 31337n);
  assert.equal(process.env.ID1_ALLOW_SYNTHETIC_FUNDING, "1", "Explicit local funding consent required");
  const rpc = process.env.ID1_MAINNET_REPLAY_RPC;
  const baseline = process.env.ID1_BASELINE_BUILD_INFO;
  assert(rpc && baseline, "Source RPC and bytecode baseline are required");
  const snapshot = JSON.parse(fs.readFileSync(path.join(ROOT, "tmp/id1-repair-prestate.json"), "utf8"));
  const source = new E.JsonRpcProvider(rpc);
  try {
    assert.equal((await source.getNetwork()).chainId, 137n);
    assert.equal((await source.getBlock(snapshot.block)).hash, snapshot.blockHash);
  } finally { source.destroy(); }
  evidence.forkBlock = snapshot.block;
  evidence.forkBlockHash = snapshot.blockHash;
  evidence.snapshotTimestamp = snapshot.timestamp;
  evidence.candidateSources = Object.fromEntries([
    "contracts/migration/Id1HistoricalRepair.sol", "scripts/rehearseId1HistoricalRepair.js",
    "scripts/lib/id1HistoricalRepairPlan.js",
  ].map(file => [file, require("node:crypto").createHash("sha256")
    .update(fs.readFileSync(path.resolve(__dirname, "..", file))).digest("hex")]));
  await N.provider.send("hardhat_reset", [{ forking: { jsonRpcUrl: rpc, blockNumber: snapshot.block } }]);
  const registration = await E.getContractAt("RegistrationFixed", A.registration);
  const manager = await E.getContractAt("LevelManager", A.manager);
  const token = await E.getContractAt("IERC20", await manager.usdt());
  const governanceAddress = await manager.owner();
  same(governanceAddress, snapshot.managerOwner);
  same(await registration.owner(), governanceAddress);
  const governance = await impersonate(governanceAddress);
  const [sponsor, stranger, child] = await E.getSigners();
  const definitions = [
    ["p4", "P4Orbit", "Id1P4RepairMigrator", [[A.id1, 1], [A.id1, 7]]],
    ["p12", "P12Orbit", "Id1MultiRingRepairMigrator", [[A.id1, 8], [A.parent, 8]]],
    ["p39", "P39Orbit", "Id1MultiRingRepairMigrator", [[A.id1, 3], [A.id1, 6], [A.id1, 9]]],
    ["registration", "RegistrationFixed", "Id1RegistrationRepairMigrator", []],
    ["manager", "LevelManager", null, []],
  ];
  const engines = {};
  const records = [];
  const plans = [];
  const summaries = [];
  record("fork-ready", { token: token.target, governance: governanceAddress });

  for (const [key, name, migrator, keys] of definitions) {
    const contract = await E.getContractAt(name, A[key]);
    same(await contract.owner(), governanceAddress);
    const originalImplementation = E.getAddress("0x" + (await E.provider.getStorage(A[key], IMPL)).slice(-40));
    const original = baselineContract(baseline, `contracts/${name}.sol`, name, await E.provider.getCode(originalImplementation));
    const currentLayout = await layout(`contracts/${name}.sol`, name);
    assertStorageUpgradeSafe(original.storageLayout, currentLayout, false);
    const entry = { key, name, migrator, proxy: A[key], originalImplementation,
      wasPaused: await contract.paused(), keys, originalLayout: original.storageLayout };
    if (migrator) {
      assertStorageUpgradeSafe(original.storageLayout, await layout(MIGRATION, migrator), false);
      assertStorageUpgradeSafe(await layout(MIGRATION, migrator), currentLayout, false);
    }
    if (keys.length) {
      entry.inspector = await deploy(migrator, [A[key], E.ZeroAddress, E.ZeroHash, 31337]);
      for (const [wallet, level] of keys) {
        summaries.push({ key, wallet, level, value: plain(await contract.getUserOrbit(wallet, level)) });
      }
      // Read otherwise-private state without writing it; restore the original implementation immediately.
      await setImplementation(A[key], entry.inspector.target);
      const inspector = await E.getContractAt(migrator, A[key]);
      entry.before = [];
      entry.completed = [];
      for (const [wallet, level] of keys) {
        const [hash, slots] = await inspector.repairState(wallet, level);
        entry.before.push({ wallet, level, hash, slots: plain(slots) });
        const summary = snapshot.orbits.find((r) => r.wallet.toLowerCase() === wallet.toLowerCase() && r.level === level);
        for (let cycle = 1; cycle <= Number(summary.state.totalCycles); cycle += 1) {
          entry.completed.push({ wallet, level, cycle, hash: await inspector.completedCycleHash(wallet, level, cycle) });
        }
      }
      await setImplementation(A[key], originalImplementation);
      const edits = entry.before.map((r) => buildOrbitEdit(r.wallet, r.level, r.hash, r.slots, A));
      plans.push(encodeOrbitPlan(edits));
      entry.edits = edits;
    } else if (key === "registration") plans.push(encodeParentPlan(A));
    records.push(entry);
    engines[key] = contract;
    record("storage-and-bytecode-verified", { key, originalImplementation, affectedOrbits: keys.length });
  }
  const hashes = plans.map(E.keccak256);
  const executor = await deploy("Id1HistoricalRepairExecutor", [governanceAddress, token.target, sponsor.address,
    A.parent, records.slice(0, 4).map((r) => r.proxy), hashes, 31337]);
  evidence.manifest = { funding: "Synthetic USDT on local fork only; live funding source NOT approved",
    sponsor: sponsor.address, beneficiary: A.parent, amountRaw: ADJUSTMENT, targets: records.slice(0, 4).map((r) => r.proxy),
    hashes, plans, edits: records.filter((r) => r.edits).map((r) => ({ key: r.key, before: r.before, edits: r.edits })) };

  async function upgrade(entry, implementation) {
    const contract = engines[entry.key].connect(governance);
    const guardian = await E.getContractAt("Guardian", await contract.guardian());
    const guardianOwner = await impersonate(await guardian.owner());
    assert.equal(await guardian.paused(), false);
    assert.equal(await guardian.globalUpgradeFreeze(), false);
    await (await guardian.connect(guardianOwner).setApprovedProxy(entry.proxy, true)).wait();
    await (await guardian.connect(guardianOwner).setApprovedImplementation(entry.proxy, implementation, true)).wait();
    await (await contract.upgradeToAndCall(implementation, "0x")).wait();
    same("0x" + (await E.provider.getStorage(entry.proxy, IMPL)).slice(-40), implementation);
  }
  for (const entry of records) {
    if (!(await engines[entry.key].paused())) await (await engines[entry.key].connect(governance).pause()).wait();
    if (!entry.migrator) continue;
    entry.bound = await deploy(entry.migrator, [entry.proxy, executor.target, hashes[records.indexOf(entry)], 31337]);
    await upgrade(entry, entry.bound.target);
    entry.repair = await E.getContractAt(entry.migrator, entry.proxy);
  }
  record("guarded-migrators-installed-locally", { executor: executor.target });

  const founders = (await manager.getFounderWallets())[0];
  const participants = [...new Set([A.id1, A.sofia, A.sabina, A.parent, ...founders])];
  const balancesToWatch = [...new Set([...participants, A.manager, A.registration, await manager.escrow(),
    await manager.nftPool(), await manager.operationsWallet(), sponsor.address, executor.target])];
  const controller = await E.getContractAt("FreedomTokenController", await manager.tokenController());
  const fgt = await E.getContractAt("IERC20", await controller.fgt());
  const fgtr = await E.getContractAt("IERC20", await controller.fgtr());
  async function invariants() {
    const result = { registeredCount: await registration.registeredCount(), nextActivation: await manager.nextActivationId(),
      fgtSupply: await fgt.totalSupply(), fgtrSupply: await fgtr.totalSupply(), participants: [], usdt: [] };
    for (const wallet of participants) {
      const active = [];
      for (let level = 1; level <= 10; level += 1) active.push(await registration.isLevelActivated(wallet, level));
      result.participants.push({ wallet, sponsor: await registration.getReferrer(wallet), active,
        fgt: await fgt.balanceOf(wallet), fgtr: await fgtr.balanceOf(wallet) });
    }
    for (const wallet of balancesToWatch) result.usdt.push([wallet, await token.balanceOf(wallet)]);
    return result;
  }
  const before = await invariants();
  async function assertNotRepaired() {
    assert.equal(await executor.executed(), false);
    for (const entry of records.filter((r) => r.repair)) {
      assert.equal(await entry.repair.repairExecuted(), false);
      for (const row of entry.before || []) assert.equal((await entry.repair.repairState(row.wallet, row.level))[0], row.hash);
    }
    same(await registration.currentMatrixParentOf(A.sofia, 8), E.ZeroAddress);
    same(await registration.currentMatrixParentOf(A.sabina, 8), A.id1);
  }
  async function assertExpectedRevert(label, reason, action) {
    let caught;
    try { await action(); } catch (error) { caught = error; }
    assert(caught, `${label}: call unexpectedly succeeded`);
    const options = [caught.data, caught.error?.data, caught.info?.error?.data];
    const data = options.map(value => typeof value === "string" ? value : value?.data)
      .find(value => typeof value === "string" && /^0x[0-9a-f]+$/i.test(value));
    let decoded;
    for (const iface of [executor.interface, registration.interface,
      ...records.filter(entry => entry.repair).map(entry => entry.repair.interface)]) {
      try { decoded = iface.parseError(data); } catch {}
      if (decoded) break;
    }
    const diagnostic = { label, reason: decoded ? `${decoded.name}(${decoded.args.join(",")})` : caught.shortMessage || caught.message,
      data: data || null, code: caught.code || null };
    if (!decoded || !reason.test(diagnostic.reason)) {
      record("unexpected-revert", diagnostic);
      if (label === "unfunded compensation rolls back every repair") {
        const trace = await N.provider.send("debug_traceCall", [{
          from: governanceAddress, to: executor.target,
          data: executor.interface.encodeFunctionData("execute", [plans]), gas: E.toBeHex(30000000),
        }, "latest", { disableMemory: true, disableStorage: true, disableStack: true }]);
        record("repair-failure-trace", { failed: trace.failed, gas: trace.gas,
          returnValue: trace.returnValue,
          errors: trace.structLogs.filter(step => step.error).map(({ pc, op, depth, gas, error }) => ({ pc, op, depth, gas, error })),
          frameEnds: trace.structLogs.flatMap((step, index, steps) =>
            index + 1 === steps.length || steps[index + 1].depth < step.depth
              ? [{ index, tail: steps.slice(Math.max(0, index - 5), index + 1)
                .map(({ pc, op, depth, gas, gasCost }) => ({ pc, op, depth, gas, gasCost })) }] : []),
          lastSteps: trace.structLogs.slice(-12).map(({ pc, op, depth, gas, gasCost }) => ({ pc, op, depth, gas, gasCost })) });
      }
      assert.fail(`${label}: expected ${reason}, received ${diagnostic.reason}; raw=${data || "none"}`);
    }
    return diagnostic;
  }
  async function rejected(label, reason, action) {
    const diagnostic = await assertExpectedRevert(label, reason, async () => { await (await action()).wait(); });
    await assertNotRepaired();
    evidence.checks.push({ label, passed: true, decodedRevert: diagnostic.reason });
    record("guard-passed", { label });
  }
  await rejected("unauthorized executor caller", /Not authorized/, () => executor.connect(stranger).execute(plans));
  await rejected("modified manifest rejected", /Plan mismatch/, () => executor.connect(governance).execute(["0x", ...plans.slice(1)]));
  await rejected("direct repair bypass rejected", /RepairUnauthorized/, () => records[1].repair.connect(governance).repair(plans[1]));
  const guarded = records[0];
  for (const [label, proxy, chain] of [
    ["wrong execution chain rejected", guarded.proxy, 137],
    ["wrong proxy binding rejected", A.id1, 31337],
  ]) {
    const wrongBinding = await deploy(guarded.migrator, [proxy, executor.target, hashes[0], chain]);
    await upgrade(guarded, wrongBinding.target);
    await rejected(label, /RepairUnauthorized/, () => executor.connect(governance).execute(plans));
    await upgrade(guarded, guarded.bound.target);
  }
  await rejected("unfunded compensation rolls back every repair", /allowance|transfer amount|SafeERC20FailedOperation/i, () => executor.connect(governance).execute(plans));
  await (await registration.connect(governance).unpause()).wait();
  await rejected("unpaused registration rolls back earlier orbit repairs", /ExpectedPause/, () => executor.connect(governance).execute(plans));
  await (await registration.connect(governance).pause()).wait();

  const changed = records[0];
  const mapping = changed.originalLayout.storage.find((s) => s.label === "linePaymentCounts");
  const mappingSlot = (keyType, key, slot) => E.keccak256(E.AbiCoder.defaultAbiCoder().encode([keyType, "uint256"], [key, slot]));
  const slot = mappingSlot("uint8", 1, mappingSlot("uint8", 1, mappingSlot("address", A.id1, mapping.slot)));
  const saved = await E.provider.getStorage(changed.proxy, slot);
  await N.provider.send("hardhat_setStorageAt", [changed.proxy, slot, E.toBeHex(BigInt(saved) + 1n, 32)]);
  await assertExpectedRevert("stale orbit prestate", /RepairStateChanged/,
    () => executor.connect(governance).execute.staticCall(plans));
  await N.provider.send("hardhat_setStorageAt", [changed.proxy, slot, saved]);
  await assertNotRepaired();
  evidence.checks.push({ label: "stale orbit prestate rejected", passed: true });
  assert.deepEqual(await invariants(), before, "Failed attempts must not change money, tokens or activations");
  evidence.syntheticFundingRaw = await fundLocalReplayBalance(token, sponsor.address, ADJUSTMENT);
  await (await token.connect(sponsor).approve(executor.target, ADJUSTMENT)).wait();
  const fundedBefore = await invariants();
  const estimate = await executor.connect(governance).execute.estimateGas(plans);
  const gasLimit = (estimate * 110n + 99n) / 100n;
  const blockGasLimit = (await E.provider.getBlock("latest")).gasLimit;
  record("repair-gas-estimated", { estimate, gasLimit, blockGasLimit,
    exceedsInitialConservativeBudget: gasLimit > 25000000n,
    liveGovernanceGasValidated: false });
  assert(gasLimit <= 30000000n && gasLimit < blockGasLimit, "Atomic repair exceeds the local block gas budget");
  const receipt = await (await executor.connect(governance).execute(plans, { gasLimit })).wait();
  assert.equal(receipt.status, 1);
  evidence.repairTransaction = { hash: receipt.hash, gasUsed: receipt.gasUsed, logs: receipt.logs.map((l) => ({ address: l.address, topics: l.topics, data: l.data })) };
  assert.equal(await executor.executed(), true);
  await assertExpectedRevert("completed repair replay", /Already executed/,
    () => executor.connect(governance).execute.staticCall(plans));
  const after = await invariants();
  assert.deepEqual({ ...after, usdt: [] }, { ...fundedBefore, usdt: [] });
  for (let i = 0; i < after.usdt.length; i += 1) {
    const [wallet, balance] = after.usdt[i];
    const expected = wallet.toLowerCase() === A.parent.toLowerCase() ? ADJUSTMENT : wallet === sponsor.address ? -ADJUSTMENT : 0n;
    assert.equal(balance - fundedBefore.usdt[i][1], expected, `Unexpected USDT change at ${wallet}`);
  }
  for (const entry of records.filter((r) => r.repair)) {
    assert.equal(await entry.repair.repairExecuted(), true);
    for (const archived of entry.completed || []) {
      assert.equal(await entry.repair.completedCycleHash(archived.wallet, archived.level, archived.cycle), archived.hash);
    }
    for (const edit of entry.edits || []) {
      const [, slots] = await entry.repair.repairState(edit[0], edit[1]);
      const actual = plain(slots);
      const expected = plain(edit[3]);
      if (edit[4]) expected[0][0][2] = BigInt((await E.provider.getBlock(receipt.blockNumber)).timestamp);
      assert.deepEqual(actual, expected);
      const summary = snapshot.orbits.find(row => row.wallet.toLowerCase() === edit[0].toLowerCase() && row.level === edit[1]);
      const cycle = BigInt(summary.state.totalCycles) + 1n;
      const cell = (label, keys) => {
        const field = entry.originalLayout.storage.find(item => item.label === label);
        assert(field, `Missing storage field ${label}`);
        let slot = BigInt(field.slot);
        let type = entry.originalLayout.types[field.type];
        for (const key of keys) {
          if (type.encoding === "mapping") {
            slot = BigInt(E.keccak256(E.AbiCoder.defaultAbiCoder().encode(
              [entry.originalLayout.types[type.key].label, "uint256"], [key, slot])));
            type = entry.originalLayout.types[type.value];
          } else {
            const member = type.members.find(item => item.label === key);
            assert(member && member.offset === 0, `Unsupported storage member ${key}`);
            slot += BigInt(member.slot);
            type = entry.originalLayout.types[member.type];
          }
        }
        return { slot, width: Math.ceil(Number(type.numberOfBytes) / 32) };
      };
      for (let index = 1; index <= edit[3].length; index += 1) {
        for (const [current, archived] of [
          ["userOrbits", "historicalCyclePositions"],
          ["positionLineArrivalNumber", "historicalPositionLineArrivalNumber"],
          ["positionActivationId", "historicalPositionActivationId"],
          ["positionIsMirror", "historicalPositionIsMirror"],
          ["storedRuleSnapshots", "historicalStoredRuleSnapshots"],
        ]) {
          const now = cell(current, current === "userOrbits"
            ? [edit[0], edit[1], "positions", index] : [edit[0], edit[1], index]);
          const history = cell(archived, [edit[0], edit[1], cycle, index]);
          assert.equal(now.width, history.width);
          for (let offset = 0; offset < now.width; offset += 1) {
            assert.equal(await E.provider.getStorage(entry.proxy, now.slot + BigInt(offset)),
              await E.provider.getStorage(entry.proxy, history.slot + BigInt(offset)),
              `Open-cycle archive mismatch: ${entry.key}/${edit[1]}/${index}/${current}/${offset}`);
          }
        }
      }
    }
  }
  same(await registration.currentMatrixParentOf(A.sofia, 8), A.id1);
  same(await registration.currentMatrixParentOf(A.sofia, 9), A.id1);
  same(await registration.currentMatrixParentOf(A.sabina, 8), A.parent);
  same(await registration.currentMatrixParentOf(A.sabina, 9), A.id1);
  evidence.checks.push({ label: "single funded adjustment, immutable sponsors/activations/tokens/completed cycles, exact positions, no replay", passed: true });
  record("historical-repair-passed", { gasUsed: receipt.gasUsed, amountRaw: ADJUSTMENT });

  const previousRouter = await manager.settlementRouter();
  for (const entry of records) {
    const implementation = entry.key === "registration" ? entry.originalImplementation : (await deploy(entry.name)).target;
    await upgrade(entry, implementation);
    entry.correctedImplementation = implementation;
  }
  for (const entry of records) assert.equal(await engines[entry.key].paused(), true);
  const router = await deploy("LevelSettlementRouter", [A.manager, token.target]);
  await (await manager.connect(governance).setSettlementRouter(router.target)).wait();
  same(await manager.settlementRouter(), router.target);
  assert.equal(await manager.settlementRevision(), 2n);
  assert.equal(await router.settlementRevision(), 2n);
  assert.equal(await router.validatesConfig(A.manager, token.target), true);
  for (const entry of records) {
    if (!entry.wasPaused) await (await engines[entry.key].connect(governance).unpause()).wait();
  }
  evidence.localUpgradeSet = records.map(({ key, originalImplementation, correctedImplementation }) => ({ key, originalImplementation, correctedImplementation }));
  evidence.localSettlementRouter = router.target;
  evidence.previousSettlementRouter = previousRouter;
  for (const row of summaries) {
    const afterSummary = plain(await engines[row.key].getUserOrbit(row.wallet, row.level));
    const beforeSummary = row.value;
    // getUserOrbit: currentPosition, escrowBalance, autoUpgradeCompleted,
    // three line counts, totalCycles, totalEarned.
    for (const index of [1, 2, 6]) assert.equal(afterSummary[index], beforeSummary[index]);
    const funded = row.wallet.toLowerCase() === A.parent.toLowerCase() && row.level === 8;
    assert.equal(afterSummary[7], beforeSummary[7] + (funded ? ADJUSTMENT : 0n));
  }
  evidence.before = fundedBefore;
  evidence.after = after;
  evidence.probes = [];
  for (const [upline, level, rootSlot, recipient, recipientAmount] of [
    [A.sofia, 8, 6, A.sofia, 512000000n],
    [A.sabina, 8, 0, A.parent, 640000000n],
    [A.sofia, 9, 5, A.sofia, 512000000n],
  ]) {
    const checkpoint = await N.provider.send("evm_snapshot");
    const synthetic = await fundLocalReplayBalance(token, child.address, E.parseUnits("15000", 6));
    await (await token.connect(child).approve(A.manager, E.MaxUint256)).wait();
    await (await registration.connect(child).register(upline)).wait();
    for (let l = 2; l < level; l += 1) await (await registration.connect(child).activateLevel(l)).wait();
    const balance = await token.balanceOf(recipient);
    const activation = await (await registration.connect(child).activateLevel(level)).wait();
    assert.equal((await token.balanceOf(recipient)) - balance, recipientAmount);
    const engine = level === 8 ? engines.p12 : engines.p39;
    if (rootSlot) same((await engine.getPosition(A.id1, level, rootSlot)).occupant, child.address);
    if (upline === A.sabina) same((await engine.getPosition(A.parent, 8, 4)).occupant, child.address);
    same((await engine.getPosition(upline, level, 1)).occupant, child.address);
    const summary = activation.logs.map((l) => { try { return manager.interface.parseLog(l); } catch { return null; } })
      .find((l) => l?.name === "ActivationFinancialSummaryRecorded");
    assert(summary);
    assert.equal(summary.args.totalLiquidPaid + summary.args.totalEscrowLocked + summary.args.totalRecycleAllocated + summary.args.systemCharge,
      summary.args.activationAmount);
    const probe = { upline, level, rootSlot, recipient, recipientAmount, syntheticUsdtRaw: synthetic, transaction: activation.hash };
    evidence.probes.push(probe);
    record("post-repair-activation-passed", probe);
    await N.provider.send("evm_revert", [checkpoint]);
  }
  evidence.status = "passed";
  evidence.liveExecutionAuthorized = false;
  evidence.remaining = ["Approve external 512-USDT funding source and exact governance manifest",
    "Refresh guarded prestate before any mainnet proposal", "Integrate repair events into backend projections before live execution",
    "Review unrelated legacy duplicated ID1 mirrors separately; they are preserved by this repair"];
  record("rehearsal-complete");
}

main().catch((error) => {
  evidence.status = "failed";
  evidence.error = error.shortMessage || error.message;
  fs.writeFileSync(output, json(evidence) + "\n");
  console.error(error.stack || error.message);
  process.exitCode = 1;
});

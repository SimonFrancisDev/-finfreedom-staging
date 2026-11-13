// Deploy inert implementations OR submit proposals. Never approves, executes or reopens production.
require("dotenv").config({ quiet: true });
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { ethers: E } = require("ethers");
const { A, buildPackage, submissionActions } = require("./lib/id1ProductionPackage");
const { artifact, verifyLive, sha } = require("./prepareId1ProductionPackage");
const ROOT = path.resolve(__dirname, "../../..");
const json = value => JSON.stringify(value, (_, v) => typeof v === "bigint" ? v.toString() : v, 2);
const same = (a, b) => assert.equal(a.toLowerCase(), b.toLowerCase());

async function checkCode(provider, deployment, art) {
  const source = deployment.name.startsWith("Id1") ? "migration/Id1HistoricalRepair.sol" : `${deployment.name}.sol`;
  const debugPath = path.join(__dirname, `../artifacts/contracts/${source}/${deployment.name}.dbg.json`);
  const debug = JSON.parse(fs.readFileSync(debugPath, "utf8"));
  const build = JSON.parse(fs.readFileSync(path.resolve(path.dirname(debugPath), debug.buildInfo), "utf8"));
  const output = build.output.contracts[`contracts/${source}`][deployment.name];
  const normalize = code => {
    let result = code.replace(/^0x/, "");
    for (const refs of Object.values(output.evm.deployedBytecode.immutableReferences || {})) {
      for (const { start, length } of refs) result = result.slice(0, start * 2) + "0".repeat(length * 2) + result.slice((start + length) * 2);
    }
    return result;
  };
  assert.equal(normalize(await provider.getCode(deployment.address)), normalize(art.deployedBytecode), `Runtime mismatch: ${deployment.key}`);
  const contract = new E.Contract(deployment.address, art.abi, provider);
  if (deployment.key.endsWith("Migrator")) {
    same(await contract.repairProxy(), deployment.args[0]);
    same(await contract.repairExecutor(), deployment.args[1]);
    assert.equal(await contract.repairPlanHash(), deployment.args[2]);
    assert.equal(await contract.repairChain(), 137n);
  } else if (deployment.key === "executor") {
    same(await contract.governance(), A.governance);
    assert.equal(await contract.executionChain(), 137n);
    assert.equal(await contract.executed(), false);
    for (let i = 0; i < 4; i += 1) {
      same(await contract.targets(i), deployment.args[1][i]);
      assert.equal(await contract.planHashes(i), deployment.args[2][i]);
    }
  } else if (deployment.key === "router") {
    assert.equal(await contract.validatesConfig(A.manager, A.usdt), true);
    assert.equal(await contract.settlementRevision(), 2n);
  } else if (deployment.key === "manager") assert.equal(await contract.settlementRevision(), 2n);
}

async function main() {
  const mode = process.env.ID1_PRODUCTION_ACTION;
  assert(["CHECK", "DEPLOY", "SUBMIT", "SUBMIT_ALL"].includes(mode), "Explicit ID1_PRODUCTION_ACTION=CHECK, DEPLOY, SUBMIT or SUBMIT_ALL required");
  assert.equal(mode, "CHECK", "The November 12 package is withdrawn. No further deployment or submission is allowed from this script.");
  assert(process.env.ID1_MAINNET_REPLAY_RPC, "Explicit mainnet RPC required");
  assert(process.env.PRODUCTION_SUBMITTER_KEY, "Authorized submitter key required");
  const raw = fs.readFileSync(path.join(ROOT, "tmp/id1-production-package.json"), "utf8");
  const pkg = JSON.parse(raw);
  const rehearsalRaw = fs.readFileSync(path.join(ROOT, "tmp/id1-structural-repair-rehearsal.json"), "utf8");
  assert.equal(sha(rehearsalRaw), pkg.rehearsalSha256);
  const expected = buildPackage(JSON.parse(rehearsalRaw), pkg.startNonce);
  assert.equal(pkg.chainId, 137);
  assert.equal(pkg.packageId, expected.packageId);
  assert.deepEqual(pkg.manifest, expected.manifest);
  assert.equal(pkg.actions.length, expected.actions.length);
  for (const [index, action] of expected.actions.entries()) {
    for (const key of Object.keys(action)) assert.deepEqual(pkg.actions[index][key], action[key]);
  }
  for (const [index, deployment] of expected.deployments.entries()) {
    for (const key of Object.keys(deployment)) assert.deepEqual(pkg.deployments[index][key], deployment[key]);
    const art = artifact(deployment.name);
    assert.equal(pkg.deployments[index].creationBytecodeHash, E.keccak256(art.bytecode));
    assert.equal(pkg.deployments[index].runtimeTemplateHash, E.keccak256(art.deployedBytecode));
  }
  const provider = new E.JsonRpcProvider(process.env.ID1_MAINNET_REPLAY_RPC, undefined, { batchMaxCount: 1 });
  try {
    const wallet = new E.Wallet(process.env.PRODUCTION_SUBMITTER_KEY, provider);
    same(wallet.address, A.submitter);
    await verifyLive(provider, pkg, await provider.getBlockNumber());
    const multi = new E.Contract(A.governance, artifact("governance/SimpleMultiSig").abi, wallet);
    assert(await multi.isProposalSubmitter(wallet.address) || await multi.isOwner(wallet.address));
    const options = { maxFeePerGas: BigInt(pkg.budget.maxFeePerGas), maxPriorityFeePerGas: BigInt(pkg.budget.maxPriorityFeePerGas) };
    assert(options.maxFeePerGas <= E.parseUnits("450", "gwei"), "Fee cap exceeds the reviewed 450-gwei limit");
    assert((await provider.getBlock("latest")).baseFeePerGas + options.maxPriorityFeePerGas <= options.maxFeePerGas,
      "Fees rose above the prepared budget; re-estimate before broadcasting");
    const journalPath = path.join(ROOT, "tmp/id1-production-broadcasts.json");
    const journal = fs.existsSync(journalPath) ? JSON.parse(fs.readFileSync(journalPath, "utf8")) :
      { packageSha256: sha(raw), chainId: 137, deployments: [], submissions: [], approvalsSent: 0, executionsSent: 0 };
    assert.equal(journal.packageSha256, sha(raw), "Journal belongs to a different package");
    const save = () => fs.writeFileSync(journalPath, json(journal) + "\n");
    const actionsToSubmit = submissionActions(pkg, mode === "SUBMIT_ALL");
    const pendingActions = actionsToSubmit.filter(a => !journal.submissions.some(r => r.index === a.index && r.confirmed));
    const submissionLimits = new Map();
    for (const action of pendingActions) {
      const limit = action.submissionGasLimit ? BigInt(action.submissionGasLimit) :
        (await multi.submitTransaction.estimateGas(action.target, 0n, action.data)) * 120n / 100n;
      submissionLimits.set(action.index, limit);
    }
    const remainingGas = pkg.deployments.filter(d => !journal.deployments.some(r => r.key === d.key && r.confirmed))
      .reduce((sum, d) => sum + BigInt(d.gasLimit), 0n) + [...submissionLimits.values()].reduce((sum, limit) => sum + limit, 0n);
    const balance = await provider.getBalance(wallet.address);
    if (mode === "CHECK") {
      console.log(json({ chainId: 137, submitter: wallet.address, liveWrites: 0,
        balancePOL: E.formatEther(balance), remainingBudgetPOL: E.formatEther(remainingGas * options.maxFeePerGas),
        sufficientlyFunded: balance >= remainingGas * options.maxFeePerGas,
        packageAndCurrentStateVerified: true }));
      return;
    }
    assert(balance >= remainingGas * options.maxFeePerGas,
      `Insufficient POL for remaining capped budget (${E.formatEther(remainingGas * options.maxFeePerGas)} POL)`);
    if (mode === "DEPLOY") {
      for (const item of pkg.deployments) {
        const art = artifact(item.name);
        let row = journal.deployments.find(row => row.key === item.key);
        if (!row) {
          assert.equal(await provider.getTransactionCount(wallet.address, "pending"), item.nonce, "Unexpected deployer nonce; do not reuse predicted addresses");
          const deployed = await new E.ContractFactory(art.abi, art.bytecode, wallet).deploy(...item.args,
            { ...options, nonce: item.nonce, gasLimit: BigInt(item.gasLimit) });
          row = { key: item.key, address: item.address, txHash: deployed.deploymentTransaction().hash, confirmed: false };
          journal.deployments.push(row); save();
        }
        const receipt = await provider.waitForTransaction(row.txHash, 1, 180000);
        assert(receipt && receipt.status === 1, `Deployment not confirmed: ${row.txHash}`);
        same(receipt.contractAddress, item.address);
        await checkCode(provider, item, art);
        Object.assign(row, { confirmed: true, block: receipt.blockNumber, gasUsed: receipt.gasUsed.toString() }); save();
        console.log(json(row));
      }
      console.log("Inert deployments verified. No production proxy, service or database was changed. Submit proposals separately.");
      return;
    }
    assert.equal(journal.deployments.filter(row => row.confirmed).length, pkg.deployments.length, "Deployments are incomplete");
    for (const item of pkg.deployments) await checkCode(provider, item, artifact(item.name));
    if (mode === "SUBMIT_ALL") {
      journal.reopeningSubmissionAuthorization = "Owner explicitly requested all proposals submitted now; reopening EXECUTION still requires post-upgrade verification";
    }
    for (const action of pendingActions) {
      let row = journal.submissions.find(row => row.index === action.index);
      if (!row) {
        const tx = await multi.submitTransaction(action.target, 0n, action.data, { ...options, gasLimit: submissionLimits.get(action.index) });
        row = { index: action.index, label: action.label, txHash: tx.hash, confirmed: false };
        journal.submissions.push(row); save();
      }
      const receipt = await provider.waitForTransaction(row.txHash, 1, 180000);
      assert(receipt && receipt.status === 1, `Proposal not confirmed: ${row.txHash}`);
      const event = receipt.logs.filter(log => log.address.toLowerCase() === A.governance.toLowerCase())
        .map(log => { try { return multi.interface.parseLog(log); } catch { return null; } }).find(log => log?.name === "Submit");
      assert(event, "No Submit event");
      const proposal = await multi.transactions(event.args.txId);
      same(proposal.to, action.target);
      assert.equal(proposal.value, 0n);
      assert.equal(proposal.data, action.data);
      assert.equal(proposal.executed, false);
      Object.assign(row, { proposalId: event.args.txId.toString(), confirmed: true, block: receipt.blockNumber }); save();
      console.log(json(row));
    }
    console.log(mode === "SUBMIT_ALL"
      ? "All proposals submitted, none approved or executed by this script. Reopening execution must wait for post-upgrade verification."
      : "Proposals submitted, not approved or executed. Five reopening proposals remain withheld pending post-upgrade verification.");
  } finally { provider.destroy(); }
}

main().catch(error => { console.error(error.shortMessage || error.message); process.exitCode = 1; });

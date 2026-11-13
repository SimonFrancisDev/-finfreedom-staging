// Submits ONLY zero-value cancellation proposals. Never approves or executes them.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { ethers: E } = require("ethers");
const { A } = require("./lib/id1ProductionPackage");
const { ABI, iface, RUNTIME_HASH, ORIGINAL_HASH, OWNERS, cancellation,
  verifyOriginal, verifyCancellation, activeCancellation, submissionData, feeCaps, same } = require("./lib/id1CancellationPlan");
const ROOT = path.resolve(__dirname, "../../..");
const stringify = v => JSON.stringify(v, (_, x) => typeof x === "bigint" ? x.toString() : x, 2) + "\n";
const sha = value => crypto.createHash("sha256").update(value).digest("hex");
const save = (file, data) => {
  fs.writeFileSync(file + ".tmp", stringify(data));
  fs.renameSync(file + ".tmp", file);
};

async function main() {
  const mode = process.env.ID1_CANCELLATION_ACTION;
  assert(["CHECK", "SUBMIT"].includes(mode), "Explicit CHECK or SUBMIT action required");
  assert(process.env.ID1_MAINNET_REPLAY_RPC, "Explicit mainnet RPC required");
  const raw = fs.readFileSync(path.join(ROOT, "tmp/id1-production-package.json"), "utf8");
  assert.equal(sha(raw), ORIGINAL_HASH, "Withdrawn original package hash mismatch");
  const pkg = JSON.parse(raw);
  assert.equal(pkg.chainId, 137);
  assert.equal(pkg.actions.length, 30);
  same(pkg.addresses.governance, A.governance);
  const originalJournal = JSON.parse(fs.readFileSync(path.join(ROOT, "tmp/id1-production-broadcasts.json"), "utf8"));
  assert.equal(originalJournal.packageSha256, ORIGINAL_HASH);
  assert.equal(originalJournal.submissions.length, 30);
  for (let i = 0; i < 30; i++) {
    assert.equal(originalJournal.submissions[i].index, i);
    assert.equal(Number(originalJournal.submissions[i].proposalId), 130 + i);
    assert.equal(originalJournal.submissions[i].confirmed, true);
  }
  const request = new E.FetchRequest(process.env.ID1_MAINNET_REPLAY_RPC);
  request.timeout = 20000;
  const provider = new E.JsonRpcProvider(request, undefined, { batchMaxCount: 1, cacheTimeout: -1 });
  const journalFile = path.join(ROOT, "tmp/id1-cancellation-submissions.json");
  const lockFile = journalFile + ".lock";
  let lock;
  try {
    if (mode === "SUBMIT") lock = fs.openSync(lockFile, "wx");
    assert.equal((await provider.getNetwork()).chainId, 137n);
    const block = await provider.getBlock((await provider.getBlockNumber()) - 2);
    const opts = { blockTag: block.number };
    const gov = new E.Contract(A.governance, ABI, provider);
    assert.equal(E.keccak256(await provider.getCode(A.governance, block.number)), RUNTIME_HASH);
    assert.equal(await gov.requiredConfirmations(opts), 3n);
    assert.equal(await gov.timelockDelay(opts), 120n);
    assert.deepEqual((await gov.getOwners(opts)).map(x => x.toLowerCase()).sort(), OWNERS.map(x => x.toLowerCase()).sort());
    assert.equal(await gov.isProposalSubmitter(A.submitter, opts), true);
    const originals = [];
    for (let id = 130; id <= 159; id++) {
      const actual = await gov.transactions(id, opts);
      verifyOriginal(actual, pkg.actions[id - 130], id);
      originals.push({ id, cancelled: actual.cancelled, confirmations: actual.confirmations.toString() });
    }
    const rows = [];
    let cursor = 160;
    async function scan(blockTag) {
      const count = Number(await gov.getTransactionCount(blockTag === undefined ? {} : { blockTag }));
      assert(count >= cursor && count - cursor <= 1000, "Unexpected governance queue size");
      for (; cursor < count; cursor++) {
        const actual = await gov.transactions(cursor, blockTag === undefined ? {} : { blockTag });
        rows.push({ id: cursor, to: actual.to, value: actual.value, data: actual.data,
          executed: actual.executed, cancelled: actual.cancelled });
      }
    }
    await scan(block.number);
    const journal = fs.existsSync(journalFile) ? JSON.parse(fs.readFileSync(journalFile, "utf8")) :
      { chainId: 137, governance: A.governance, originalPackageSha256: ORIGINAL_HASH,
        submitter: A.submitter, submissions: [], approvalsSent: 0, executionsSent: 0 };
    assert.equal(journal.chainId, 137);
    assert.equal(journal.originalPackageSha256, ORIGINAL_HASH);
    same(journal.governance, A.governance);
    same(journal.submitter, A.submitter);
    assert.equal(journal.approvalsSent, 0);
    assert.equal(journal.executionsSent, 0);
    const plan = originals.map(old => ({ ...cancellation(old.id), alreadyCancelled: old.cancelled,
      existingCancellationId: activeCancellation(rows, old.id)?.id ?? null }));
    const fees = await provider.getFeeData();
    const latest = await provider.getBlock("latest");
    const { tip, maxFee } = feeCaps(latest.baseFeePerGas, fees.maxFeePerGas, fees.maxPriorityFeePerGas);
    const pending = plan.filter(row => !row.alreadyCancelled && row.existingCancellationId === null);
    for (const row of pending) {
      row.gasLimit = ((await provider.estimateGas({ from: A.submitter, to: A.governance, value: 0n,
        data: submissionData(row.retires) })) * 125n / 100n).toString();
    }
    const budget = pending.reduce((sum, row) => sum + BigInt(row.gasLimit) * maxFee, 0n);
    const balance = await provider.getBalance(A.submitter);
    const report = { chainId: 137, block: block.number, blockHash: block.hash,
      timestamp: new Date(block.timestamp * 1000).toISOString(), governance: A.governance,
      runtimeHash: RUNTIME_HASH, originalPackageSha256: ORIGINAL_HASH,
      requiredConfirmations: 3, timelockSeconds: 120, submitter: A.submitter,
      totalGovernanceProposals: cursor, originals, plan, pendingSubmissions: pending.length,
      maxFeePerGas: maxFee.toString(), maxPriorityFeePerGas: tip.toString(),
      balancePOL: E.formatEther(balance), cappedSubmissionBudgetPOL: E.formatEther(budget),
      sufficientlyFunded: balance >= budget, approvalsSent: 0, executionsSent: 0 };
    save(path.join(ROOT, "tmp/id1-cancellation-preflight.json"), report);
    console.log(stringify({ ...report, originals: originals.length, plan: plan.map(row =>
      ({ retires: row.retires, existingCancellationId: row.existingCancellationId, alreadyCancelled: row.alreadyCancelled })) }));
    if (mode === "CHECK") return;
    assert(balance >= budget, "Insufficient submitter POL for capped cancellation-submission budget");
    const wallet = new E.Wallet(process.env.PRODUCTION_SUBMITTER_KEY);
    same(wallet.address, A.submitter);
    journal.preflight = report;
    save(journalFile, journal);
    for (const item of plan.filter(row => !row.alreadyCancelled)) {
      const id = item.retires;
      const old = await gov.transactions(id);
      verifyOriginal(old, pkg.actions[id - 130], id);
      if (old.cancelled) continue;
      await scan();
      let record = journal.submissions.find(row => row.retires === id);
      const existing = activeCancellation(rows, id);
      if (existing && !record) {
        console.log(`Cancellation already exists: ${existing.id} retires ${id}; not resubmitted`);
        continue;
      }
      if (!record) {
        const nonce = await provider.getTransactionCount(A.submitter, "pending");
        assert.equal(nonce, await provider.getTransactionCount(A.submitter, "latest"), "Pending submitter transaction; stop without duplicating");
        assert((await provider.getBlock("latest")).baseFeePerGas + tip <= maxFee, "Fees exceeded prepared cap");
        const signedTransaction = await wallet.signTransaction({ chainId: 137, type: 2, nonce,
          to: A.governance, value: 0n, data: submissionData(id), gasLimit: BigInt(item.gasLimit),
          maxFeePerGas: maxFee, maxPriorityFeePerGas: tip });
        record = { retires: id, nonce, txHash: E.keccak256(signedTransaction), signedTransaction, confirmed: false };
        // Persist the exact signed hash BEFORE broadcast so a retry cannot create another proposal.
        journal.submissions.push(record);
        save(journalFile, journal);
      }
      const signed = E.Transaction.from(record.signedTransaction);
      same(signed.from, A.submitter);
      same(signed.to, A.governance);
      assert.equal(signed.chainId, 137n);
      assert.equal(signed.value, 0n);
      assert.equal(signed.data, submissionData(id));
      assert.equal(signed.hash, record.txHash);
      let receipt = await provider.getTransactionReceipt(record.txHash);
      if (!receipt) {
        const known = await provider.getTransaction(record.txHash);
        if (!known) {
          assert.equal(await provider.getTransactionCount(A.submitter, "pending"), signed.nonce,
            "Saved transaction nonce no longer matches; do not replace or duplicate");
          await provider.broadcastTransaction(record.signedTransaction);
        }
        receipt = await provider.waitForTransaction(record.txHash, 3, 180000);
      }
      assert(receipt && receipt.status === 1, `Submission unconfirmed/failed: ${record.txHash}`);
      if (await provider.getBlockNumber() < receipt.blockNumber + 2) {
        receipt = await provider.waitForTransaction(record.txHash, 3, 180000);
        assert(receipt && receipt.status === 1, "Submission has not reached three confirmations");
      }
      const events = receipt.logs.filter(log => log.address.toLowerCase() === A.governance.toLowerCase())
        .map(log => { try { return iface.parseLog(log); } catch { return null; } }).filter(log => log?.name === "Submit");
      assert.equal(events.length, 1);
      const proposalId = Number(events[0].args.txId);
      const proposal = await gov.transactions(proposalId);
      verifyCancellation(proposal, id);
      Object.assign(record, { confirmed: true, proposalId, block: receipt.blockNumber, blockHash: receipt.blockHash,
        gasUsed: receipt.gasUsed.toString(), gasPrice: receipt.gasPrice.toString() });
      save(journalFile, journal);
      console.log(stringify({ retires: id, proposalId, txHash: record.txHash, confirmed: true }));
    }
    const finalBlock = await provider.getBlock((await provider.getBlockNumber()) - 2);
    const mappings = [];
    await scan(finalBlock.number);
    for (const item of plan) {
      const original = await gov.transactions(item.retires, { blockTag: finalBlock.number });
      verifyOriginal(original, pkg.actions[item.retires - 130], item.retires);
      const match = activeCancellation(rows, item.retires);
      const record = journal.submissions.find(row => row.retires === item.retires);
      const proposalId = record?.proposalId ?? match?.id ?? item.existingCancellationId;
      assert(original.cancelled || proposalId !== null && proposalId !== undefined, "Missing cancellation proposal");
      const proposal = proposalId == null ? null : await gov.transactions(proposalId, { blockTag: finalBlock.number });
      if (proposal) verifyCancellation(proposal, item.retires);
      assert(original.cancelled || !proposal.cancelled && !proposal.executed, "Cancellation no longer pending; inspect state");
      mappings.push({ retires: item.retires, proposalId, txHash: record?.txHash ?? null,
        oldCancelled: original.cancelled, cancellationExecuted: proposal?.executed ?? null,
        confirmations: proposal?.confirmations.toString() ?? null });
    }
    const evidence = { ...report, status: "cancellation-proposals-submitted-not-executed",
      verifiedBlock: finalBlock.number, verifiedBlockHash: finalBlock.hash,
      verifiedAt: new Date(finalBlock.timestamp * 1000).toISOString(), mappings,
      submissionTransactions: journal.submissions.map(({ signedTransaction, ...row }) => row),
      totalGasCostPOL: E.formatEther(journal.submissions.filter(row => row.confirmed)
        .reduce((sum, row) => sum + BigInt(row.gasUsed) * BigInt(row.gasPrice), 0n)),
      allOldProposalsCancelled: mappings.every(row => row.oldCancelled) };
    save(path.join(ROOT, "tmp/id1-cancellation-submission-evidence.json"), evidence);
    console.log(stringify({ status: evidence.status, mappings, totalGasCostPOL: evidence.totalGasCostPOL,
      allOldProposalsCancelled: evidence.allOldProposalsCancelled, approvalsSent: 0, executionsSent: 0 }));
  } finally {
    provider.destroy();
    if (lock !== undefined) { fs.closeSync(lock); fs.unlinkSync(lockFile); }
  }
}

if (require.main === module) main().catch(error => { console.error(error.shortMessage || error.message); process.exitCode = 1; });

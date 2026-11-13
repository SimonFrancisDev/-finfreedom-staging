// Read-only: authenticate the old package and prepare unsigned cancellation calls.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { ethers: E } = require("ethers");
const { A } = require("./lib/id1ProductionPackage");
const ROOT = path.resolve(__dirname, "../../..");
const json = value => JSON.stringify(value, (_, v) => typeof v === "bigint" ? v.toString() : v, 2);
const same = (a, b) => assert.equal(a.toLowerCase(), b.toLowerCase());

async function main() {
  assert(process.env.ID1_MAINNET_REPLAY_RPC, "Explicit Polygon mainnet RPC required");
  const raw = fs.readFileSync(path.join(ROOT, "tmp/id1-production-package.json"), "utf8");
  const pkg = JSON.parse(raw);
  const journal = JSON.parse(fs.readFileSync(path.join(ROOT, "tmp/id1-production-broadcasts.json"), "utf8"));
  const rehearsal = JSON.parse(fs.readFileSync(path.join(ROOT, "tmp/id1-structural-repair-rehearsal.json"), "utf8"));
  assert.equal(journal.packageSha256, crypto.createHash("sha256").update(raw).digest("hex"));
  assert.equal(pkg.chainId, 137);
  assert.equal(journal.chainId, 137);
  same(pkg.addresses.governance, A.governance);
  assert.equal(journal.submissions.length, 30);
  const abi = JSON.parse(fs.readFileSync(path.join(__dirname,
    "../artifacts/contracts/governance/SimpleMultiSig.sol/SimpleMultiSig.json"), "utf8")).abi;
  const req = new E.FetchRequest(process.env.ID1_MAINNET_REPLAY_RPC);
  req.timeout = 20000;
  const provider = new E.JsonRpcProvider(req, undefined, { batchMaxCount: 1 });
  try {
    assert.equal((await provider.getNetwork()).chainId, 137n);
    const block = await provider.getBlock((await provider.getBlockNumber()) - 2);
    const opts = { blockTag: block.number };
    const gov = new E.Contract(A.governance, abi, provider);
    const codeHash = E.keccak256(await provider.getCode(A.governance, block.number));
    assert.equal(codeHash, rehearsal.governance.runtimeHash, "Governance runtime differs from the rehearsed multisig");
    const report = { chainId: 137, block: block.number, blockHash: block.hash,
      timestamp: new Date(block.timestamp * 1000).toISOString(), governance: A.governance,
      runtimeHash: codeHash, originalPackageSha256: journal.packageSha256,
      requiredConfirmations: await gov.requiredConfirmations(opts), liveWrites: 0,
      status: "unsigned-cancellation-plan-not-submitted", proposals: [], cancellationCalls: [] };
    const seen = new Set();
    for (const submitted of journal.submissions) {
      assert(submitted.confirmed);
      const id = Number(submitted.proposalId);
      assert.equal(id, 130 + submitted.index);
      assert(!seen.has(id));
      seen.add(id);
      const expected = pkg.actions[submitted.index];
      const actual = await gov.transactions(id, opts);
      same(actual.to, expected.target);
      assert.equal(actual.value, BigInt(expected.value));
      assert.equal(actual.data, expected.data, `Proposal ${id} payload mismatch`);
      assert.equal(actual.executed, false, `Proposal ${id} already executed; stop and reassess live state`);
      report.proposals.push({ id, label: expected.label, payloadHash: E.keccak256(actual.data),
        confirmations: actual.confirmations, cancelled: actual.cancelled, executed: actual.executed });
      if (!actual.cancelled) report.cancellationCalls.push({ target: A.governance, value: "0",
        data: gov.interface.encodeFunctionData("cancelTransaction", [id]),
        label: `Cancel superseded ID1 proposal ${id}`, retires: id });
    }
    report.allOldProposalsCancelled = report.cancellationCalls.length === 0;
    report.replacementSubmissionAllowed = report.allOldProposalsCancelled;
    const output = path.join(ROOT, "tmp/id1-alternative-proposal-retirement.json");
    fs.writeFileSync(output, json(report) + "\n");
    console.log(json({ ...report, proposals: report.proposals.map(({ id, confirmations, cancelled }) => ({ id, confirmations, cancelled })),
      cancellationCalls: report.cancellationCalls.length, output }));
  } finally { provider.destroy(); }
}

if (require.main === module) main().catch(error => { console.error(error.shortMessage || error.message); process.exitCode = 1; });

// Read-only preparation. Predicted addresses are not deployments; no keys loaded here.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { ethers: E } = require("ethers");
const { A } = require("./lib/id1ProductionPackage");
const { buildAlternativePackage } = require("./lib/id1AlternativeProductionPackage");
const { artifact, verifyLive, sha } = require("./prepareId1ProductionPackage");
const ROOT = path.resolve(__dirname, "../../..");
const json = value => JSON.stringify(value, (_, v) => typeof v === "bigint" ? v.toString() : v, 2);

async function main() {
  assert(process.env.ID1_MAINNET_REPLAY_RPC, "Explicit Polygon mainnet RPC required");
  assert(!fs.existsSync(path.join(ROOT, "tmp/id1-alternative-production-broadcasts.json")),
    "Do not replace a package that is bound to a live broadcast journal");
  const previousRaw = fs.readFileSync(path.join(ROOT, "tmp/id1-production-package.json"), "utf8");
  const previous = JSON.parse(previousRaw);
  const journal = JSON.parse(fs.readFileSync(path.join(ROOT, "tmp/id1-production-broadcasts.json"), "utf8"));
  assert.equal(journal.packageSha256, sha(previousRaw));
  const evidenceRaw = fs.readFileSync(path.join(ROOT, "tmp/id1-alternative-repair-rehearsal.json"), "utf8");
  const req = new E.FetchRequest(process.env.ID1_MAINNET_REPLAY_RPC);
  req.timeout = 20000;
  const provider = new E.JsonRpcProvider(req, undefined, { batchMaxCount: 1 });
  try {
    assert.equal((await provider.getNetwork()).chainId, 137n);
    const nonce = await provider.getTransactionCount(A.submitter, "pending");
    assert.equal(nonce, await provider.getTransactionCount(A.submitter, "latest"), "Submitter has a pending transaction");
    const pkg = buildAlternativePackage(JSON.parse(evidenceRaw), previous, nonce);
    const block = await provider.getBlock((await provider.getBlockNumber()) - 2);
    await verifyLive(provider, pkg, block.number);
    const gov = new E.Contract(A.governance, artifact("governance/SimpleMultiSig").abi, provider);
    const oldGovernance = JSON.parse(fs.readFileSync(path.join(ROOT, "tmp/id1-structural-repair-rehearsal.json"), "utf8")).governance;
    assert.equal(E.keccak256(await provider.getCode(A.governance, block.number)), oldGovernance.runtimeHash);
    const remaining = [];
    for (const id of pkg.requiredCancelledProposalIds) {
      const actual = await gov.transactions(id, { blockTag: block.number });
      const old = previous.actions[id - 130];
      assert.equal(actual.to.toLowerCase(), old.target.toLowerCase());
      assert.equal(actual.value, 0n);
      assert.equal(actual.data, old.data);
      assert.equal(actual.executed, false, `Old proposal ${id} has executed: reassess the repair`);
      if (!actual.cancelled) remaining.push(id);
    }
    for (const d of pkg.reusedDeployments) {
      const oldDeployment = journal.deployments.find(row => row.key === d.key && row.confirmed);
      assert(oldDeployment && oldDeployment.address === d.address);
      assert.equal(E.keccak256(artifact(d.name).bytecode), d.creationBytecodeHash, `Changed reused ${d.key} artifact`);
      assert.notEqual(await provider.getCode(d.address, block.number), "0x");
    }
    pkg.rehearsalSha256 = sha(evidenceRaw);
    pkg.originalPackageSha256 = sha(previousRaw);
    pkg.verifiedBlock = { number: block.number, hash: block.hash, utc: new Date(block.timestamp * 1000).toISOString() };
    pkg.remainingCancellations = remaining;
    pkg.replacementSubmissionAllowed = remaining.length === 0;
    pkg.status = remaining.length ? "validated-unsigned-blocked-by-old-proposals" : "validated-unsigned-budget-and-release-review-required";
    const output = path.join(ROOT, "tmp/id1-alternative-production-package.json");
    fs.writeFileSync(output, json(pkg) + "\n");
    console.log(json({ output, chainId: 137, status: pkg.status, liveWrites: 0,
      verifiedBlock: pkg.verifiedBlock, reusedImplementations: pkg.reusedDeployments.length,
      newInertDeploymentsRequired: pkg.deployments.length, repairProposals: pkg.actions.length,
      oldProposalsStillRequiringCancellation: remaining, addressesArePredictedNotDeployed: true }));
  } finally { provider.destroy(); }
}
if (require.main === module) main().catch(error => { console.error(error.shortMessage || error.message); process.exitCode = 1; });

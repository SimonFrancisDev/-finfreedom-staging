const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const hre = require("hardhat");

const { ethers, upgrades } = hre;

const CHAIN_ID = 80002n;
const MULTISIG = "0xD3f460AF3c6C9FAB8053ebF5eCdC1EdfC5de5f6A";
const GUARDIAN = "0x52F22c1e396dF20c2078B4a86b4A0ac3b51a9911";
const PROXY = "0x901C08a34aA81CeF881b7A419158705599FBE43a";
const IMPLEMENTATION = "0x5B8174d1549B395e94cD2152c9A7Da312209539c";
const EXCLUDED_ID1 = "0xD3f460AF3c6C9FAB8053ebF5eCdC1EdfC5de5f6A";
const REWARD_OPERATOR = "0x4e0b5aE304d657fF9E460161DaBD38E1566306a8";
const FIRST_DISTRIBUTION_AT = 1793577600n;
const GAS = { gasPrice: BigInt(process.env.TEST_GAS_PRICE_WEI || "30000000000") };

const reportDirectory = path.resolve(__dirname, "../test-reports/nft-fixed-cycle");
const reportFile = path.join(reportDirectory, "amoy-fixed-cycle-upgrade.json");
fs.mkdirSync(reportDirectory, { recursive: true });
const report = fs.existsSync(reportFile)
  ? JSON.parse(fs.readFileSync(reportFile, "utf8"))
  : { network: "amoy", chainId: CHAIN_ID.toString(), transactions: {} };

function save() {
  fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
}

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function confirmed(label, submit) {
  if (!report.transactions[label]) {
    const transaction = await submit();
    report.transactions[label] = { hash: transaction.hash };
    save();
    console.log("[SUBMITTED]", label, transaction.hash);
  }

  const hash = report.transactions[label].hash;
  for (let attempt = 0; attempt < 120; attempt += 1) {
    let receipt;
    try {
      receipt = await ethers.provider.getTransactionReceipt(hash);
    } catch {}
    if (receipt) {
      assert.equal(receipt.status, 1, `${label} reverted: ${hash}`);
      report.transactions[label].blockNumber = receipt.blockNumber;
      save();
      return receipt;
    }
    await sleep(2_000);
  }
  throw new Error(`Receipt unresolved; inspect ${reportFile} before retrying: ${hash}`);
}

async function waitForTimelock(multisig, transactionId) {
  const transaction = await multisig.transactions(transactionId);
  for (;;) {
    const latest = await ethers.provider.getBlock("latest");
    const remaining = Number(transaction.executeAfter) - Number(latest.timestamp);
    if (remaining <= 0) return;
    console.log(`[TIMELOCK] tx=${transactionId} remaining=${remaining}s`);
    await sleep(Math.min(remaining * 1_000, 10_000));
  }
}

async function queue(multisig, owner1, owner2, label, target, data) {
  const submitReceipt = await confirmed(`${label}-submit`, () =>
    multisig.submitTransaction(target, 0, data, GAS)
  );
  const submitted = submitReceipt.logs
    .map((log) => {
      try {
        return multisig.interface.parseLog(log);
      } catch {
        return null;
      }
    })
    .find((event) => event?.name === "Submit");
  assert(submitted, `${label} is missing its Submit event`);

  const transactionId = submitted.args.txId;
  const transaction = await multisig.transactions(transactionId);
  assert.equal(transaction.to.toLowerCase(), target.toLowerCase(), `${label} target mismatch`);
  assert.equal(transaction.value, 0n, `${label} value mismatch`);
  assert.equal(transaction.data, data, `${label} calldata mismatch`);
  assert.equal(transaction.cancelled, false, `${label} was cancelled`);

  report.transactions[label] = {
    transactionId: transactionId.toString(),
    target,
    data,
  };
  save();

  if (!transaction.executed && !(await multisig.approved(transactionId, owner1.address))) {
    await confirmed(`${label}-approve-owner1`, () => multisig.approveTransaction(transactionId, GAS));
  }
  if (!transaction.executed && !(await multisig.approved(transactionId, owner2.address))) {
    await confirmed(`${label}-approve-owner2`, () =>
      multisig.connect(owner2).approveTransaction(transactionId, GAS)
    );
  }
  return { label, transactionId };
}

async function execute(multisig, queued) {
  const transaction = await multisig.transactions(queued.transactionId);
  if (transaction.executed) return;
  await waitForTimelock(multisig, queued.transactionId);
  await confirmed(`${queued.label}-execute`, () =>
    multisig.executeTransaction(queued.transactionId, GAS)
  );
}

async function main() {
  const network = await ethers.provider.getNetwork();
  assert.equal(hre.network.name, "amoy");
  assert.equal(network.chainId, CHAIN_ID);

  const keyFile = path.resolve(__dirname, "../../env-files/staging-multisig.private.json");
  const keys = JSON.parse(fs.readFileSync(keyFile, "utf8"));
  const owner1 = new ethers.Wallet(keys.owner1PrivateKey, ethers.provider);
  const owner2 = new ethers.Wallet(keys.owner2PrivateKey, ethers.provider);
  const multisig = await ethers.getContractAt("SimpleMultiSig", MULTISIG, owner1);
  const guardian = await ethers.getContractAt("Guardian", GUARDIAN);
  const Distributor = await ethers.getContractFactory("FreedomNFTRewardDistributor");

  assert.equal(await multisig.isOwner(owner1.address), true, "owner1 is not a multisig owner");
  assert.equal(await multisig.isOwner(owner2.address), true, "owner2 is not a multisig owner");
  assert.equal(await multisig.requiredConfirmations(), 2n, "unexpected multisig threshold");
  assert.equal((await guardian.owner()).toLowerCase(), MULTISIG.toLowerCase(), "guardian owner mismatch");
  assert.equal(await guardian.paused(), false, "guardian is paused");
  assert.equal(await guardian.globalUpgradeFreeze(), false, "guardian upgrades are frozen");
  assert.notEqual(await ethers.provider.getCode(IMPLEMENTATION), "0x", "implementation has no code");
  await upgrades.validateUpgrade(PROXY, Distributor, { kind: "uups" });

  const actions = [];
  if (!(await guardian.approvedProxies(PROXY))) {
    actions.push(await queue(
      multisig,
      owner1,
      owner2,
      "approve-reward-proxy",
      GUARDIAN,
      guardian.interface.encodeFunctionData("setApprovedProxy", [PROXY, true])
    ));
  }
  if (!(await guardian.approvedImplementations(PROXY, IMPLEMENTATION))) {
    actions.push(await queue(
      multisig,
      owner1,
      owner2,
      "approve-reward-implementation",
      GUARDIAN,
      guardian.interface.encodeFunctionData("setApprovedImplementation", [
        PROXY,
        IMPLEMENTATION,
        true,
      ])
    ));
  }

  const activeImplementation = ethers.getAddress(await upgrades.erc1967.getImplementationAddress(PROXY));
  if (activeImplementation !== ethers.getAddress(IMPLEMENTATION)) {
    const migrationData = Distributor.interface.encodeFunctionData("configureCycleSchedule", [
      FIRST_DISTRIBUTION_AT,
      EXCLUDED_ID1,
      REWARD_OPERATOR,
    ]);
    const uups = new ethers.Interface([
      "function upgradeToAndCall(address newImplementation,bytes data)",
    ]);
    actions.push(await queue(
      multisig,
      owner1,
      owner2,
      "upgrade-and-configure-rewards",
      PROXY,
      uups.encodeFunctionData("upgradeToAndCall", [IMPLEMENTATION, migrationData])
    ));
  }

  for (const action of actions) await execute(multisig, action);

  const distributor = Distributor.attach(PROXY);
  assert.equal(
    ethers.getAddress(await upgrades.erc1967.getImplementationAddress(PROXY)),
    ethers.getAddress(IMPLEMENTATION),
    "active implementation mismatch"
  );
  assert.equal(await distributor.firstDistributionAt(), FIRST_DISTRIBUTION_AT);
  assert.equal(await distributor.rewardOperator(), REWARD_OPERATOR);
  assert.equal(await distributor.rewardExcluded(EXCLUDED_ID1), true);
  const [distributionAt, cutoff] = await distributor.cycleTimes(1);
  assert.equal(distributionAt, FIRST_DISTRIBUTION_AT);
  assert.equal(cutoff, FIRST_DISTRIBUTION_AT - 86_400n);

  report.verdict = "PASS";
  report.completedAt = new Date().toISOString();
  report.multisig = MULTISIG;
  report.guardian = GUARDIAN;
  report.proxy = PROXY;
  report.implementation = IMPLEMENTATION;
  report.firstDistributionAt = FIRST_DISTRIBUTION_AT.toString();
  report.eligibilityCutoff = cutoff.toString();
  report.excludedId1 = EXCLUDED_ID1;
  report.rewardOperator = REWARD_OPERATOR;
  save();
  console.log(`STAGING_NFT_FIXED_CYCLE_UPGRADE=PASS report=${reportFile}`);
}

main().catch((error) => {
  console.error(error.shortMessage || error.message || error);
  process.exitCode = 1;
});

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const hre = require("hardhat");

const { ethers, network, upgrades } = hre;

const DISTRIBUTOR = "0x901C08a34aA81CeF881b7A419158705599FBE43a";
const IMPLEMENTATION = "0x5B8174d1549B395e94cD2152c9A7Da312209539c";
const ID1 = "0xD3f460AF3c6C9FAB8053ebF5eCdC1EdfC5de5f6A";
const OPERATOR = "0x4e0b5aE304d657fF9E460161DaBD38E1566306a8";
const FIRST_DISTRIBUTION_AT = 1793577600n;
const DAY = 86_400n;
const CYCLE = 30n * DAY;
const UNIT = 10n ** 6n;

function leaf(member, tier) {
  const inner = ethers.keccak256(
    ethers.AbiCoder.defaultAbiCoder().encode(["address", "uint8"], [member, tier])
  );
  return ethers.keccak256(inner);
}

async function setBalance(address, amount = 100n * 10n ** 18n) {
  await network.provider.send("hardhat_setBalance", [address, ethers.toBeHex(amount)]);
}

async function expectRevert(action, label) {
  let reverted = false;
  try {
    await action();
  } catch {
    reverted = true;
  }
  assert.equal(reverted, true, `${label} did not revert`);
}

async function main() {
  const rpcUrl = process.env.AMOY_RPC_URL || process.env.POLYGON_AMOY_RPC_URL;
  assert(rpcUrl, "AMOY_RPC_URL or POLYGON_AMOY_RPC_URL is required");
  assert.equal(hre.network.name, "hardhat", "run this certification on the local Hardhat network");

  await network.provider.send("hardhat_reset", [{ forking: { jsonRpcUrl: rpcUrl } }]);
  const sourceBlock = await ethers.provider.getBlock("latest");
  assert(sourceBlock, "fork source block is unavailable");

  const walletRows = JSON.parse(fs.readFileSync(
    path.resolve(__dirname, "../../env-files/fresh-test-wallets.private.json"),
    "utf8"
  ));
  const canonicalRoles = [
    { label: "Account 9", tier: 1 },
    { label: "Account 10", tier: 2 },
    { label: "Account 8", tier: 3 },
  ];
  const canonical = canonicalRoles.map(({ label, tier }) => {
    const row = walletRows.find((candidate) => candidate.label === label);
    assert(row, `missing canonical wallet ${label}`);
    assert.equal(new ethers.Wallet(row.privateKey).address, ethers.getAddress(row.address));
    return { label, address: ethers.getAddress(row.address), tier };
  });

  assert.equal(
    ethers.getAddress(await upgrades.erc1967.getImplementationAddress(DISTRIBUTOR)),
    ethers.getAddress(IMPLEMENTATION),
    "fork does not contain the certified implementation"
  );

  const distributor = await ethers.getContractAt("FreedomNFTRewardDistributor", DISTRIBUTOR);
  const tokenAddress = await distributor.rewardToken();
  const vaultAddress = await distributor.vault();
  const token = await ethers.getContractAt("MockUSDT", tokenAddress);
  const vault = await ethers.getContractAt("FreedomNFTPoolVault", vaultAddress);
  const [localSigner] = await ethers.getSigners();

  assert.equal(await distributor.firstDistributionAt(), FIRST_DISTRIBUTION_AT);
  assert.equal(await distributor.rewardOperator(), OPERATOR);
  assert.equal(await distributor.rewardExcluded(ID1), true);
  assert.equal(await distributor.owner(), ID1);
  assert.equal(await vault.distributor(), DISTRIBUTOR);
  const cycle1 = await distributor.cycleTimes(1);
  const cycle2 = await distributor.cycleTimes(2);
  assert.equal(cycle1.distributionAt, FIRST_DISTRIBUTION_AT);
  assert.equal(cycle1.eligibilityCutoff, FIRST_DISTRIBUTION_AT - DAY);
  assert.equal(cycle2.distributionAt, FIRST_DISTRIBUTION_AT + CYCLE);
  assert.equal(cycle2.eligibilityCutoff, FIRST_DISTRIBUTION_AT + CYCLE - DAY);

  const roots = canonical.map((wallet) => leaf(wallet.address, wallet.tier));
  await expectRevert(
    () => distributor.createCycle.staticCall(1, 1_000n * UNIT, roots, [1, 1, 1]),
    "early Cycle 1 publication"
  );
  await expectRevert(
    () => distributor.createPeriod.staticCall(2026, 11, 1_000n * UNIT, roots, [1, 1, 1]),
    "legacy period publication"
  );

  await network.provider.send("hardhat_impersonateAccount", [OPERATOR]);
  await setBalance(OPERATOR);
  const operator = await ethers.getSigner(OPERATOR);
  await token.connect(localSigner).mint(vaultAddress, 1_001n * UNIT);

  const balancesBefore = [];
  for (const wallet of canonical) balancesBefore.push(await token.balanceOf(wallet.address));
  const reservedBefore = await vault.reservedBalance(tokenAddress);
  const unreservedBefore = await vault.unreservedBalance(tokenAddress);

  await network.provider.send("evm_setNextBlockTimestamp", [Number(FIRST_DISTRIBUTION_AT)]);
  await network.provider.send("evm_mine");
  const createTransaction = await distributor.connect(operator).createCycle(
    1,
    1_000n * UNIT,
    roots,
    [1, 1, 1]
  );
  const createReceipt = await createTransaction.wait();
  const period = await distributor.periodOf(1);
  assert.equal(period.created, true);
  assert.equal(period.cutoff, FIRST_DISTRIBUTION_AT - DAY);
  assert.equal(period.distributionAt, FIRST_DISTRIBUTION_AT);
  assert.deepEqual(Array.from(period.rewardPerMember), [500n * UNIT, 300n * UNIT, 200n * UNIT]);
  assert.equal(period.reservedAmount, 1_000n * UNIT);
  assert.equal(await vault.reservedBalance(tokenAddress), reservedBefore + 1_000n * UNIT);
  assert.equal(await vault.unreservedBalance(tokenAddress), unreservedBefore - 1_000n * UNIT);

  await expectRevert(
    () => distributor.distributeBatch.staticCall(1, [ID1], [1], [[]]),
    "ID1 distribution"
  );

  const payoutTransaction = await distributor.distributeBatch(
    1,
    canonical.map((wallet) => wallet.address),
    canonical.map((wallet) => wallet.tier),
    [[], [], []]
  );
  const payoutReceipt = await payoutTransaction.wait();
  const expectedRewards = [500n * UNIT, 300n * UNIT, 200n * UNIT];
  for (let index = 0; index < canonical.length; index += 1) {
    assert.equal(
      (await token.balanceOf(canonical[index].address)) - balancesBefore[index],
      expectedRewards[index],
      `${canonical[index].label} payout mismatch`
    );
    assert.equal(await distributor.claimed(1, canonical[index].address), true);
  }
  assert.equal(await vault.reservedBalance(tokenAddress), reservedBefore);

  const balancesAfter = [];
  for (const wallet of canonical) balancesAfter.push(await token.balanceOf(wallet.address));
  await (await distributor.distributeBatch(
    1,
    canonical.map((wallet) => wallet.address),
    canonical.map((wallet) => wallet.tier),
    [[], [], []]
  )).wait();
  for (let index = 0; index < canonical.length; index += 1) {
    assert.equal(await token.balanceOf(canonical[index].address), balancesAfter[index]);
  }

  await network.provider.send("evm_setNextBlockTimestamp", [Number(FIRST_DISTRIBUTION_AT + CYCLE)]);
  await network.provider.send("evm_mine");
  const reservedBeforeEmptyCycle = await vault.reservedBalance(tokenAddress);
  const unreservedBeforeEmptyCycle = await vault.unreservedBalance(tokenAddress);
  const emptyTransaction = await distributor.connect(operator).createCycle(
    2,
    1_000n * UNIT,
    [ethers.ZeroHash, ethers.ZeroHash, ethers.ZeroHash],
    [0, 0, 0]
  );
  const emptyReceipt = await emptyTransaction.wait();
  const emptyPeriod = await distributor.periodOf(2);
  assert.equal(emptyPeriod.created, true);
  assert.equal(emptyPeriod.reservedAmount, 0n);
  assert.deepEqual(Array.from(emptyPeriod.rewardPerMember), [0n, 0n, 0n]);
  assert.equal(await vault.reservedBalance(tokenAddress), reservedBeforeEmptyCycle);
  assert.equal(await vault.unreservedBalance(tokenAddress), unreservedBeforeEmptyCycle);

  const report = {
    verdict: "PASS",
    completedAt: new Date().toISOString(),
    fork: { sourceChainId: "80002", sourceBlock: sourceBlock.number },
    distributor: DISTRIBUTOR,
    implementation: IMPLEMENTATION,
    token: tokenAddress,
    vault: vaultAddress,
    firstDistributionAt: FIRST_DISTRIBUTION_AT.toString(),
    eligibilityCutoff: (FIRST_DISTRIBUTION_AT - DAY).toString(),
    id1Excluded: ID1,
    operator: OPERATOR,
    canonicalWallets: canonical.map((wallet, index) => ({
      label: wallet.label,
      address: wallet.address,
      tier: wallet.tier,
      payout: ethers.formatUnits(expectedRewards[index], 6),
    })),
    assertions: {
      activeImplementation: true,
      exactThirtyDayCycles: true,
      twentyFourHourCutoff: true,
      earlyPublicationRejected: true,
      legacyPublicationRejected: true,
      fixedTierShares: "50/30/20",
      id1Rejected: true,
      canonicalPayoutsExact: true,
      duplicatePayoutPrevented: true,
      emptyTierFundsRetained: true,
    },
    localForkTransactions: {
      createCycle1: createReceipt.hash,
      distributeCycle1: payoutReceipt.hash,
      createEmptyCycle2: emptyReceipt.hash,
    },
  };
  const reportDirectory = path.resolve(__dirname, "../test-reports/nft-fixed-cycle");
  fs.mkdirSync(reportDirectory, { recursive: true });
  const reportFile = path.join(reportDirectory, "amoy-post-upgrade-canonical-fork.json");
  fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
  console.log(`STAGING_NFT_CANONICAL_FORK=PASS report=${reportFile}`);
}

main().catch((error) => {
  console.error(error.shortMessage || error.message || error);
  process.exitCode = 1;
});

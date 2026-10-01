const fs = require("fs");
const path = require("path");
const hre = require("hardhat");
const { ethers, upgrades } = hre;

const AMOY_CHAIN_ID = 80002n;
const GAS_PRICE = BigInt(process.env.TEST_GAS_PRICE_WEI || "30000000000");

function requiredAddress(name) {
  const value = process.env[name];
  if (!value || !ethers.isAddress(value)) throw new Error(name + " must be a valid address");
  return ethers.getAddress(value);
}

function assert(condition, message) {
  if (!condition) throw new Error("STAGING_ROUTER_UPGRADE: " + message);
}

async function waitForTimelock(multisig, txId) {
  const transaction = await multisig.transactions(txId);
  const executeAfter = Number(transaction.executeAfter);
  for (;;) {
    const latest = await ethers.provider.getBlock("latest");
    if (Number(latest.timestamp) >= executeAfter) return;
    const remaining = executeAfter - Number(latest.timestamp);
    console.log("[TIMELOCK] tx=" + txId + " remaining=" + remaining + "s");
    await new Promise((resolve) => setTimeout(resolve, Math.min(remaining * 1000, 10000)));
  }
}

async function submitApproveExecute(multisigAddress, owner1, owner2, target, data, label) {
  const multisig1 = await ethers.getContractAt("SimpleMultiSig", multisigAddress, owner1);
  const multisig2 = multisig1.connect(owner2);
  const submit = await multisig1.submitTransaction(target, 0, data, { gasPrice: GAS_PRICE });
  const submitReceipt = await submit.wait();
  const parsed = submitReceipt.logs
    .map((log) => { try { return multisig1.interface.parseLog(log); } catch { return null; } })
    .find((event) => event && event.name === "Submit");
  assert(parsed, label + " missing Submit event");
  const txId = parsed.args.txId;
  await (await multisig1.approveTransaction(txId, { gasPrice: GAS_PRICE })).wait();
  await (await multisig2.approveTransaction(txId, { gasPrice: GAS_PRICE })).wait();
  await waitForTimelock(multisig1, txId);
  const execute = await multisig1.executeTransaction(txId, { gasPrice: GAS_PRICE });
  const executeReceipt = await execute.wait();
  console.log("[EXECUTED] " + label + " multisigTx=" + txId + " chainTx=" + execute.hash);
  return {
    label,
    multisigTxId: txId.toString(),
    submitTx: submit.hash,
    executeTx: execute.hash,
    blockNumber: executeReceipt.blockNumber,
  };
}

async function main() {
  const network = await ethers.provider.getNetwork();
  assert(hre.network.name === "amoy" && network.chainId === AMOY_CHAIN_ID, "Amoy only");

  const multisigAddress = requiredAddress("MULTISIG_ADDRESS");
  const guardianAddress = requiredAddress("GUARDIAN_ADDRESS");
  const proxyAddress = requiredAddress("FREEDOM_PLUS_SETTLEMENT_ROUTER_ADDRESS");
  const implementationAddress = requiredAddress("UPGRADE_IMPLEMENTATION_ADDRESS");
  const keyFile = path.resolve(
    __dirname,
    process.env.STAGING_MULTISIG_KEYS_FILE || "../../env-files/staging-multisig.private.json"
  );
  const keys = JSON.parse(fs.readFileSync(keyFile, "utf8"));
  const owner1 = new ethers.Wallet(keys.owner1PrivateKey, ethers.provider);
  const owner2 = new ethers.Wallet(keys.owner2PrivateKey, ethers.provider);
  const multisig = await ethers.getContractAt("SimpleMultiSig", multisigAddress);
  assert(await multisig.isOwner(owner1.address), "owner1 is not a multisig owner");
  assert(await multisig.isOwner(owner2.address), "owner2 is not a multisig owner");
  assert(await ethers.provider.getCode(implementationAddress) !== "0x", "implementation has no code");

  const guardian = await ethers.getContractAt("Guardian", guardianAddress);
  const actions = [];
  if (!(await guardian.approvedProxies(proxyAddress))) {
    const data = guardian.interface.encodeFunctionData("setApprovedProxy", [proxyAddress, true]);
    actions.push(await submitApproveExecute(multisigAddress, owner1, owner2, guardianAddress, data, "guardian-approve-proxy"));
  }
  if (!(await guardian.approvedImplementations(proxyAddress, implementationAddress))) {
    const data = guardian.interface.encodeFunctionData(
      "setApprovedImplementation",
      [proxyAddress, implementationAddress, true]
    );
    actions.push(await submitApproveExecute(multisigAddress, owner1, owner2, guardianAddress, data, "guardian-approve-implementation"));
  }

  const uups = new ethers.Interface(["function upgradeToAndCall(address newImplementation,bytes data)"]);
  const repairRequested = process.env.STAGING_REPAIR_P39_RESERVE === 'true';
  const repairInterface = new ethers.Interface(['function repairStagingP39Reserve()']);
  const migrationData = repairRequested ? repairInterface.encodeFunctionData('repairStagingP39Reserve') : '0x';
  const upgradeData = uups.encodeFunctionData('upgradeToAndCall', [implementationAddress, migrationData]);
  actions.push(await submitApproveExecute(multisigAddress, owner1, owner2, proxyAddress, upgradeData, "upgrade-router-proxy"));

  const activeImplementation = ethers.getAddress(await upgrades.erc1967.getImplementationAddress(proxyAddress));
  assert(activeImplementation === implementationAddress, "active implementation mismatch");
  const report = {
    verdict: "PASS",
    completedAt: new Date().toISOString(),
    chainId: network.chainId.toString(),
    multisig: multisigAddress,
    guardian: guardianAddress,
    proxy: proxyAddress,
    implementation: implementationAddress,
    stagingReserveRepair: repairRequested,
    actions,
  };
  const reportDir = path.resolve(__dirname, "../test-reports/freedom-plus");
  fs.mkdirSync(reportDir, { recursive: true });
  const reportFile = path.join(reportDir, "router-upgrade-" + Date.now() + ".json");
  fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
  console.log("STAGING_FREEDOM_PLUS_ROUTER_UPGRADE=PASS report=" + reportFile);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

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
  const journalDir = path.resolve(__dirname, '../test-reports/freedom-plus');
  fs.mkdirSync(journalDir, { recursive: true });
  async function confirmed(tx, step) {
    fs.appendFileSync(path.join(journalDir, 'founder-upgrade-transactions.jsonl'),
      JSON.stringify({ at: new Date().toISOString(), label, step, hash: tx.hash }) + '\n');
    console.log('[SUBMITTED]', step, tx.hash);
    for (let attempt = 0; attempt < 90; attempt++) {
      let receipt;
      try { receipt = await ethers.provider.getTransactionReceipt(tx.hash); }
      catch (error) {
        if (attempt === 89) throw error;
      }
      if (receipt) {
        assert(receipt.status === 1, step + ' reverted: ' + tx.hash);
        return receipt;
      }
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    throw new Error('Receipt unresolved; inspect journal before retry: ' + tx.hash);
  }
  let txId;
  let submitHash = null;
  const resume = process.env.STAGING_RESUME_IMPLEMENTATION_PROPOSAL;
  if (label === 'guardian-approve-implementation' && resume) {
    txId = BigInt(resume);
    const existing = await multisig1.transactions(txId);
    assert(existing.to.toLowerCase() === target.toLowerCase() && existing.value === 0n
      && existing.data === data && !existing.cancelled && !existing.executed,
      'resume proposal does not exactly match intended action');
  } else {
  const submit = await multisig1.submitTransaction(target, 0, data, { gasPrice: GAS_PRICE });
  submitHash = submit.hash;
  const submitReceipt = await confirmed(submit, 'submit');
  const parsed = submitReceipt.logs
    .map((log) => { try { return multisig1.interface.parseLog(log); } catch { return null; } })
    .find((event) => event && event.name === "Submit");
  assert(parsed, label + " missing Submit event");
  txId = parsed.args.txId;
  }
  if (!(await multisig1.approved(txId, owner1.address)))
    await confirmed(await multisig1.approveTransaction(txId, { gasPrice: GAS_PRICE }), 'approve-owner1');
  if (!(await multisig1.approved(txId, owner2.address)))
    await confirmed(await multisig2.approveTransaction(txId, { gasPrice: GAS_PRICE }), 'approve-owner2');
  await waitForTimelock(multisig1, txId);
  const execute = await multisig1.executeTransaction(txId, { gasPrice: GAS_PRICE });
  const executeReceipt = await confirmed(execute, 'execute');
  console.log("[EXECUTED] " + label + " multisigTx=" + txId + " chainTx=" + execute.hash);
  return {
    label,
    multisigTxId: txId.toString(),
    submitTx: submitHash,
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
  const configureFounders = process.env.STAGING_CONFIGURE_FOUNDERS === 'true';
  const repairRequested = process.env.STAGING_REPAIR_P39_RESERVE === 'true';
  assert(!(configureFounders && repairRequested), 'founder migration must not repeat reserve repair');
  let founderWallets = [];
  if (configureFounders) {
    const deployment = require('../deployments-freedom-plus-staging/deployment-1790706637561.json');
    assert(proxyAddress === ethers.getAddress(deployment.contracts.FreedomPlusSettlementRouter.proxy), 'unexpected staging proxy');
    assert(multisigAddress === ethers.getAddress(deployment.multisig), 'unexpected staging multisig');
    assert(guardianAddress === ethers.getAddress(deployment.guardian), 'unexpected staging guardian');
    const manager = new ethers.Contract('0xb49130f8a48e358c867c8abee5381f6138f7b6b2',
      ['function getFounderWallets() view returns(address[],uint256[])'], ethers.provider);
    const [wallets, ratios] = await manager.getFounderWallets();
    founderWallets = Array.from(wallets, ethers.getAddress);
    assert(founderWallets.length === 8 && new Set(founderWallets).size === 8, 'eight distinct founders required');
    assert(ratios.length === 8 && ratios.every(value => value === 1250n), 'founder ratios must be equal');
    assert(!founderWallets.includes(ethers.ZeroAddress) && !founderWallets.includes(multisigAddress)
      && !founderWallets.includes(proxyAddress), 'invalid founder recipient');
    const Router = await ethers.getContractFactory('FreedomPlusSettlementRouter');
    await upgrades.validateUpgrade(proxyAddress, Router, { kind: 'uups' });
  }
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
  const repairInterface = new ethers.Interface(['function repairStagingP39Reserve()']);
  const founderInterface = new ethers.Interface(['function configureFounderWallets(address[8])']);
  const migrationData = configureFounders
    ? founderInterface.encodeFunctionData('configureFounderWallets', [founderWallets])
    : repairRequested ? repairInterface.encodeFunctionData('repairStagingP39Reserve') : '0x';
  const upgradeData = uups.encodeFunctionData('upgradeToAndCall', [implementationAddress, migrationData]);
  actions.push(await submitApproveExecute(multisigAddress, owner1, owner2, proxyAddress, upgradeData, "upgrade-router-proxy"));

  const activeImplementation = ethers.getAddress(await upgrades.erc1967.getImplementationAddress(proxyAddress));
  assert(activeImplementation === implementationAddress, "active implementation mismatch");
  if (configureFounders) {
    const router = await ethers.getContractAt('FreedomPlusSettlementRouter', proxyAddress);
    for (let index = 0; index < 8; index++) {
      assert(await router.founderWallets(index) === founderWallets[index], 'founder configuration mismatch');
    }
  }
  const report = {
    verdict: "PASS",
    completedAt: new Date().toISOString(),
    chainId: network.chainId.toString(),
    multisig: multisigAddress,
    guardian: guardianAddress,
    proxy: proxyAddress,
    implementation: implementationAddress,
    stagingReserveRepair: repairRequested,
    founderWallets,
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

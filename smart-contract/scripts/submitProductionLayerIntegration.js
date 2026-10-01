const hre = require("hardhat");
const fs = require("node:fs");
const path = require("node:path");

async function main() {
  const { ethers } = hre;
  if (hre.network.name !== "polygon" || (await ethers.provider.getNetwork()).chainId !== 137n) {
    throw new Error("Polygon mainnet only");
  }
  const file = path.resolve(__dirname, "../deployments-production-migration/production-layer-deployment.json");
  const manifest = JSON.parse(fs.readFileSync(file, "utf8"));
  if (manifest.rehearsal || manifest.chainId !== 137 || manifest.status !== "DEPLOYED_PAUSED_AWAITING_GOVERNANCE") {
    throw new Error("A completed, paused mainnet deployment record is required");
  }
  const governanceAddress = "0x785cC854ce9e13CE1140cbFD7C08620713E1711d";
  const managerAddress = "0x0E9De0F24eB4774834A2c4A63eaBa8356A4A4B53";
  const fgtAddress = "0x615201edaddB5CFD839Cc4eE693Dc464F6E2B5E4";
  const operationsAddress = "0x3ee9B4913e175c15B2Ef76Ac352B6737210248Fb";
  const oldPool = "0xf8F60Da42681b73DFeCa7731E78b29C8707C184b";
  const [sender] = await ethers.getSigners();
  if (sender.address.toLowerCase() !== "0x884e48f9897e8633238747b608dd49de12bf94df") {
    throw new Error("Unexpected proposal submitter");
  }
  const multisig = await ethers.getContractAt("SimpleMultiSig", governanceAddress, sender);
  if (!(await multisig.isProposalSubmitter(sender.address)) && !(await multisig.isOwner(sender.address))) {
    throw new Error("Signer has no proposal authority");
  }
  const contract = async name => {
    const address = ethers.getAddress(manifest.contracts[name].proxy);
    const instance = await ethers.getContractAt(name, address, sender);
    if ((await instance.owner()).toLowerCase() !== governanceAddress.toLowerCase()) {
      throw new Error("Incorrect owner: " + name);
    }
    return instance;
  };
  const membership = await contract("FreedomNFTMembership");
  const pool = await contract("FreedomNFTPoolVault");
  const rewards = await contract("FreedomNFTRewardDistributor");
  const plusManager = await contract("FreedomPlusLevelManager");
  const registration = await contract("FreedomPlusRegistration");
  const router = await contract("FreedomPlusSettlementRouter");
  const same = (a, b) => a.toLowerCase() === b.toLowerCase();
  if (!(await membership.paused()) || !(await plusManager.paused()) || !(await registration.paused())) {
    throw new Error("New program entrypoints must remain paused");
  }
  if (!same(await pool.distributor(), rewards.target) || !same(await rewards.vault(), pool.target)
      || !same(await router.nftPoolVault(), pool.target) || !same(await router.operationsVault(), operationsAddress)) {
    throw new Error("New shared-pool wiring mismatch");
  }
  const fgt = new ethers.Contract(fgtAddress, [
    "function owner() view returns(address)",
    "function authorizedOperators(address) view returns(bool)",
    "function setAuthorizedOperator(address,bool)",
  ], sender);
  const manager = new ethers.Contract(managerAddress, [
    "function owner() view returns(address)",
    "function nftPool() view returns(address)",
    "function operationsWallet() view returns(address)",
    "function updateChargeRecipients(address,address)",
  ], sender);
  if (!same(await fgt.owner(), governanceAddress) || !same(await manager.owner(), governanceAddress)
      || !same(await manager.operationsWallet(), operationsAddress)) throw new Error("Existing governance/wiring changed");
  const currentPool = await manager.nftPool();
  if (!same(currentPool, oldPool) && !same(currentPool, pool.target)) throw new Error("Unexpected existing pool");
  // Construct allowlisted calls from verified contract addresses, not arbitrary manifest calldata.
  const actions = [
    { label: "Authorize new NFT membership for FGT", target: fgtAddress,
      data: fgt.interface.encodeFunctionData("setAuthorizedOperator", [membership.target, true]),
      complete: await fgt.authorizedOperators(membership.target) },
    { label: "Connect both programs to the new shared NFT pool", target: managerAddress,
      data: manager.interface.encodeFunctionData("updateChargeRecipients", [pool.target, operationsAddress]),
      complete: same(currentPool, pool.target) },
  ];
  const count = Number(await multisig.getTransactionCount());
  for (const action of actions) {
    if (action.complete) continue;
    for (let id = count - 1; id >= 0; id--) {
      const tx = await multisig.transactions(id);
      if (!tx.executed && !tx.cancelled && tx.value === 0n
          && same(tx.to, action.target) && tx.data.toLowerCase() === action.data.toLowerCase()) {
        action.existingProposalId = id;
        break;
      }
    }
    await ethers.provider.call({ from: governanceAddress, to: action.target, data: action.data });
  }
  const recordFile = path.resolve(__dirname, "../deployments-production-migration/production-layer-proposals.json");
  const record = {
    chainId: 137, governance: governanceAddress, submitter: sender.address,
    requiredConfirmations: String(await multisig.requiredConfirmations()),
    timelockSeconds: String(await multisig.timelockDelay()), actions,
    scope: "Integration only; no unpause, historical fund transfer or reset",
  };
  if (process.env.PRODUCTION_LAYER_SUBMIT !== "INTEGRATION_ONLY") {
    console.log(JSON.stringify({ status: "PREVIEW_ONLY", ...record }, null, 2));
    return;
  }
  const save = () => fs.writeFileSync(recordFile, JSON.stringify(record, null, 2) + "\n");
  save();
  for (const action of actions) {
    if (action.complete || action.existingProposalId != null) continue;
    const tx = await multisig.submitTransaction(action.target, 0, action.data);
    action.submissionHash = tx.hash;
    save();
    const receipt = await tx.wait();
    if (receipt.status !== 1) throw new Error("Proposal submission failed");
    for (const log of receipt.logs) {
      if (!same(log.address, governanceAddress)) continue;
      try {
        const parsed = multisig.interface.parseLog(log);
        if (parsed?.name === "Submit") action.proposalId = Number(parsed.args.txId);
      } catch { /* Other governance events do not identify the submitted proposal. */ }
    }
    if (action.proposalId == null) throw new Error("Submitted proposal ID missing; inspect receipt before retry");
    save();
    console.log(JSON.stringify({ label: action.label, proposalId: action.proposalId, hash: tx.hash }));
  }
  console.log("Owners must approve and execute the recorded proposals. No changes have been executed by this script.");
}

main().catch(error => {
  console.error(error.shortMessage || error.message);
  process.exitCode = 1;
});

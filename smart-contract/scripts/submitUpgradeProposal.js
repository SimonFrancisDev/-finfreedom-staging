const hre = require("hardhat");
const { ethers } = hre;

function requiredAddress(name) {
  const value = process.env[name];
  if (!value || !ethers.isAddress(value)) {
    throw new Error(`${name} is required and must be a valid address`);
  }
  return ethers.getAddress(value);
}

async function main() {
  const [sender] = await ethers.getSigners();
  if (!sender) {
    throw new Error(`No signer configured for network "${hre.network.name}". Set PRIVATE_KEY to a multisig owner key.`);
  }

  const proposal = String(process.env.PROPOSAL || "").trim().toLowerCase();
  if (!["approve-proxy", "approve-implementation", "upgrade-proxy"].includes(proposal)) {
    throw new Error("Set PROPOSAL=approve-proxy, PROPOSAL=approve-implementation, or PROPOSAL=upgrade-proxy");
  }

  const multisigAddress = requiredAddress("MULTISIG_ADDRESS");
  const guardianAddress = requiredAddress("GUARDIAN_ADDRESS");
  const proxyAddress = requiredAddress("UPGRADE_PROXY_ADDRESS");
  const implementationAddress = requiredAddress("UPGRADE_IMPLEMENTATION_ADDRESS");

  const multisig = await ethers.getContractAt("SimpleMultiSig", multisigAddress);
  const owner = await multisig.isOwner(sender.address);
  if (!owner) {
    throw new Error(`Signer ${sender.address} is not an owner of multisig ${multisigAddress}`);
  }

  let target;
  let data;
  if (proposal === "approve-proxy") {
    const guardianIface = new ethers.Interface([
      "function setApprovedProxy(address proxy,bool allowed)",
    ]);
    target = guardianAddress;
    data = guardianIface.encodeFunctionData("setApprovedProxy", [
      proxyAddress,
      true,
    ]);
  } else if (proposal === "approve-implementation") {
    const guardianIface = new ethers.Interface([
      "function setApprovedImplementation(address proxy,address implementation,bool allowed)",
    ]);
    target = guardianAddress;
    data = guardianIface.encodeFunctionData("setApprovedImplementation", [
      proxyAddress,
      implementationAddress,
      true,
    ]);
  } else {
    const guardian = await ethers.getContractAt("Guardian", guardianAddress);
    const approved = await guardian.approvedImplementations(proxyAddress, implementationAddress);
    if (!approved) {
      throw new Error("Guardian has not approved this implementation yet. Execute approve-implementation first.");
    }

    const uupsIface = new ethers.Interface([
      "function upgradeToAndCall(address newImplementation,bytes data)",
    ]);
    target = proxyAddress;
    data = uupsIface.encodeFunctionData("upgradeToAndCall", [
      implementationAddress,
      "0x",
    ]);
  }

  const tx = await multisig.submitTransaction(target, 0, data);
  const receipt = await tx.wait();

  let txId = null;
  for (const log of receipt.logs) {
    try {
      const parsed = multisig.interface.parseLog(log);
      if (parsed?.name === "Submit") {
        txId = parsed.args[0].toString();
      }
    } catch {
      // ignore unrelated logs
    }
  }

  console.log(`${proposal} proposal submitted`);
  console.log("Sender:", sender.address);
  console.log("Multisig:", multisigAddress);
  console.log("Proxy:", proxyAddress);
  console.log("Implementation:", implementationAddress);
  console.log("Target:", target);
  console.log("Transaction hash:", tx.hash);
  console.log("Multisig tx id:", txId ?? "unknown");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

const hre = require("hardhat");
const { ethers } = hre;

const ADDRESSES = {
  signer: "0x884e48f9897E8633238747b608DD49dE12bF94df",
  multisig: "0x785cC854ce9e13CE1140cbFD7C08620713E1711d",
  guardian: "0x290c2300296379BD0048aFe9099Ed6Fc81BF75fC",
  registration: "0x02ECA97e944Ac66b0444fd5F61A716917E83CfF5",
  implementation: "0x2F2c5E43eBBf666E00a1a2d699256B2Eae6268f5",
  deploymentTx: "0x521429ad386631945c2494c5465112d74cce49f818896a08a1f7801dffac606d",
};

async function normalizeRuntime(bytecode) {
  const buildInfo = await hre.artifacts.getBuildInfo(
    "contracts/RegistrationFixed.sol:RegistrationFixed"
  );
  const references = buildInfo.output.contracts["contracts/RegistrationFixed.sol"]
    .RegistrationFixed.evm.deployedBytecode.immutableReferences || {};
  const bytes = bytecode.slice(2).match(/.{2}/g) || [];
  for (const ranges of Object.values(references)) {
    for (const { start, length } of ranges) {
      for (let index = start; index < start + length; index += 1) bytes[index] = "00";
    }
  }
  return `0x${bytes.join("")}`;
}

async function main() {
  const network = await ethers.provider.getNetwork();
  if (hre.network.name !== "polygon" || network.chainId !== 137n) {
    throw new Error("Production Polygon only");
  }
  if (process.env.CONFIRM_REGISTRATION_STORAGE_RECOVERY !== "SUBMIT") {
    throw new Error("Set CONFIRM_REGISTRATION_STORAGE_RECOVERY=SUBMIT");
  }
  const [signer] = await ethers.getSigners();
  if (!signer || signer.address !== ADDRESSES.signer) throw new Error("Unexpected signer");

  const factory = await ethers.getContractFactory("RegistrationFixed", signer);
  const artifact = await hre.artifacts.readArtifact("RegistrationFixed");
  const [deployment, receipt, runtime] = await Promise.all([
    ethers.provider.getTransaction(ADDRESSES.deploymentTx),
    ethers.provider.getTransactionReceipt(ADDRESSES.deploymentTx),
    ethers.provider.getCode(ADDRESSES.implementation),
  ]);
  const expectedCreation = await factory.getDeployTransaction();
  if (!deployment || !receipt || receipt.status !== 1) throw new Error("Deployment not successful");
  if (ethers.getAddress(receipt.contractAddress) !== ADDRESSES.implementation) {
    throw new Error("Deployment address mismatch");
  }
  if (deployment.data.toLowerCase() !== expectedCreation.data.toLowerCase()) {
    throw new Error("Creation bytecode mismatch");
  }
  if ((await normalizeRuntime(runtime)).toLowerCase() !==
      (await normalizeRuntime(artifact.deployedBytecode)).toLowerCase()) {
    throw new Error("Runtime bytecode mismatch");
  }

  const registration = new ethers.Contract(
    ADDRESSES.registration,
    ["function registeredCount() view returns(uint256)"],
    ethers.provider
  );
  const currentWrongCount = await registration.registeredCount();
  const rawLegacyCount = BigInt(await ethers.provider.getStorage(ADDRESSES.registration, 8));
  if (currentWrongCount !== 10n || rawLegacyCount !== 249n) {
    throw new Error(`Unexpected recovery baseline getter=${currentWrongCount} rawSlot8=${rawLegacyCount}`);
  }

  const guardianInterface = new ethers.Interface([
    "function setApprovedImplementation(address proxy,address implementation,bool allowed)",
  ]);
  const proxyInterface = new ethers.Interface([
    "function upgradeToAndCall(address newImplementation,bytes data) payable",
  ]);
  const actions = [
    {
      label: "Authorize corrected Registration storage implementation",
      target: ADDRESSES.guardian,
      data: guardianInterface.encodeFunctionData("setApprovedImplementation", [
        ADDRESSES.registration,
        ADDRESSES.implementation,
        true,
      ]),
    },
    {
      label: "Upgrade Registration to corrected storage implementation",
      target: ADDRESSES.registration,
      data: proxyInterface.encodeFunctionData("upgradeToAndCall", [
        ADDRESSES.implementation,
        "0x",
      ]),
    },
  ];

  const multisig = await ethers.getContractAt("SimpleMultiSig", ADDRESSES.multisig, signer);
  const submitted = [];
  for (const action of actions) {
    const currentCount = Number(await multisig.getTransactionCount());
    let duplicate = null;
    for (let id = 0; id < currentCount; id += 1) {
      const existing = await multisig.transactions(id);
      if (!existing.cancelled && existing.to.toLowerCase() === action.target.toLowerCase()
          && existing.value === 0n && existing.data.toLowerCase() === action.data.toLowerCase()) {
        duplicate = id;
        break;
      }
    }
    if (duplicate !== null) {
      submitted.push({ label: action.label, id: duplicate, existing: true });
      continue;
    }
    const expectedId = currentCount;
    const tx = await multisig.submitTransaction(action.target, 0, action.data);
    const result = await tx.wait();
    const finalCount = Number(await multisig.getTransactionCount());
    if (finalCount !== expectedId + 1) throw new Error("Unexpected multisig transaction count");
    submitted.push({ label: action.label, id: expectedId, hash: result.hash });
  }
  console.log(JSON.stringify({
    bytecodeVerification: "PASS",
    legacyCountSlot8: rawLegacyCount.toString(),
    currentWrongGetter: currentWrongCount.toString(),
    implementation: ADDRESSES.implementation,
    submitted,
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

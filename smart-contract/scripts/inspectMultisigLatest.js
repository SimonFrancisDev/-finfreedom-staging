const { ethers } = require("hardhat");

async function main() {
  const multisig = await ethers.getContractAt(
    "SimpleMultiSig",
    process.env.MULTISIG_ADDRESS
  );
  const count = await multisig.getTransactionCount();
  const output = {
    count: count.toString(),
    required: (await multisig.requiredConfirmations()).toString(),
    timelock: (await multisig.timelockDelay()).toString(),
  };
  if (count > 0n) {
    const id = count - 1n;
    const tx = await multisig.transactions(id);
    output.latest = {
      id: id.toString(),
      to: tx.to,
      executed: tx.executed,
      cancelled: tx.cancelled,
      confirmations: tx.confirmations.toString(),
      executeAfter: new Date(Number(tx.executeAfter) * 1000).toISOString(),
      selector: tx.data.slice(0, 10),
    };
  }
  console.log(JSON.stringify(output, null, 2));
}

main().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});
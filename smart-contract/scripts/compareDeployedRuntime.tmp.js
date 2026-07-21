const hre = require("hardhat");

async function main() {
  const address = process.env.COMPARE_ADDRESS;
  const contractName = process.env.COMPARE_CONTRACT;
  if (!address || !contractName) throw new Error("COMPARE_ADDRESS and COMPARE_CONTRACT are required");
  const actual = (await hre.ethers.provider.getCode(address)).slice(2).toLowerCase();
  const artifact = await hre.artifacts.readArtifact(contractName);
  const expected = artifact.deployedBytecode.slice(2).toLowerCase();
  const differences = [];
  const limit = Math.min(actual.length, expected.length);
  for (let index = 0; index < limit; index += 2) {
    if (actual.slice(index, index + 2) !== expected.slice(index, index + 2)) {
      differences.push({ byte: index / 2, actual: actual.slice(index, index + 2), expected: expected.slice(index, index + 2) });
      if (differences.length === 20) break;
    }
  }
  console.log(JSON.stringify({
    address,
    contractName,
    actualBytes: actual.length / 2,
    expectedBytes: expected.length / 2,
    actualHash: hre.ethers.keccak256(`0x${actual}`),
    expectedHash: hre.ethers.keccak256(`0x${expected}`),
    firstDifferences: differences,
  }, null, 2));
}

main().catch((error) => { console.error(error); process.exitCode = 1; });

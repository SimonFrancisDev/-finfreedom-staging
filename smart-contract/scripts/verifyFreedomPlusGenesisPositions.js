const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

function latestManifest() {
  const directory = path.join(__dirname, "..", "deployments-freedom-plus-staging");
  const file = fs.readdirSync(directory)
    .filter((name) => /^deployment-\d+\.json$/.test(name))
    .sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]))
    .at(-1);
  if (!file) throw new Error("No Freedom-Plus staging deployment manifest found");
  return JSON.parse(fs.readFileSync(path.join(directory, file), "utf8"));
}

function equal(actual, expected, label) {
  if (String(actual).toLowerCase() !== String(expected).toLowerCase()) {
    throw new Error(`${label}: expected ${expected}, received ${actual}`);
  }
}

async function main() {
  const { ethers } = hre;
  const network = await ethers.provider.getNetwork();
  if (hre.network.name !== "amoy" || network.chainId !== 80002n) throw new Error("Amoy only");

  const manifest = latestManifest();
  const levelOrbits = {
    1: "P39PlusOrbit",
    2: "P14PlusOrbit",
    3: "P12PlusOrbit",
    4: "P6PlusOrbit",
    5: "P4PlusOrbit",
    6: "P4PlusOrbit",
    7: "P3PlusOrbit",
  };
  const verified = [];

  for (let level = 1; level <= 7; level++) {
    const orbitName = levelOrbits[level];
    const orbit = await ethers.getContractAt(orbitName, manifest.contracts[orbitName].proxy);
    for (let index = 0; index < manifest.representatives.length; index++) {
      const expectedCycle = level === 7 && index === 3 ? 1 : 0;
      const expectedPosition = level === 7 && index === 3 ? 1 : index + 1;
      let expectedParent = manifest.id1;
      if ([1, 3].includes(level) && expectedPosition === 4) expectedParent = manifest.representatives[0];
      if ([2, 4].includes(level) && expectedPosition >= 3) {
        expectedParent = manifest.representatives[expectedPosition - 3];
      }
      const position = await orbit.positionAt(manifest.id1, level, expectedCycle, expectedPosition);
      equal(position.participant, manifest.representatives[index], `level ${level} representative ${index + 1}`);
      equal(position.structuralParent, expectedParent, `level ${level} representative ${index + 1} parent`);
      equal(position.amount, 0, `level ${level} representative ${index + 1} amount`);
      equal(position.kind, 0, `level ${level} representative ${index + 1} placement kind`);
      equal(position.financial, false, `level ${level} representative ${index + 1} financial flag`);
      verified.push({
        representative: position.participant,
        level,
        orbit: orbitName.replace("PlusOrbit", ""),
        cycle: expectedCycle,
        position: expectedPosition,
        structuralParent: position.structuralParent,
        amount: position.amount.toString(),
        financial: position.financial,
      });
    }
  }

  console.log(JSON.stringify({ result: "PASS", id1: manifest.id1, positions: verified }, null, 2));
}

main().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});

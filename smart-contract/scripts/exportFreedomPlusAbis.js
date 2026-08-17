const fs = require("fs");
const path = require("path");

const contracts = [
  "FreedomPlusRegistration",
  "FreedomPlusLevelManager",
  "FreedomPlusSettlementRouter",
  "FreedomPlusTokenController",
  "P39PlusOrbit",
  "P14PlusOrbit",
  "P12PlusOrbit",
  "P6PlusOrbit",
  "P4PlusOrbit",
  "P3PlusOrbit",
  "FPTToken",
  "FPTrToken",
  "FreedomNFTMembership",
  "FreedomNFTRewardDistributor",
  "FreedomNFTPoolVault",
  "FreedomPlusOperationsVault",
];

const root = path.join(__dirname, "..");
const output = path.join(root, "..", "backend", "src", "blockchain", "abis", "freedom-plus");
fs.mkdirSync(output, { recursive: true });

for (const contract of contracts) {
  const matches = [];
  const walk = (directory) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const target = path.join(directory, entry.name);
      if (entry.isDirectory()) walk(target);
      else if (entry.name === `${contract}.json` && !entry.name.endsWith(".dbg.json")) matches.push(target);
    }
  };
  walk(path.join(root, "artifacts", "contracts"));
  if (matches.length !== 1) throw new Error(`${contract}: expected one artifact, found ${matches.length}`);
  const artifact = JSON.parse(fs.readFileSync(matches[0], "utf8"));
  fs.writeFileSync(
    path.join(output, `${contract}.abi.json`),
    `${JSON.stringify(artifact.abi, null, 2)}\n`
  );
}

console.log(`Exported ${contracts.length} Freedom-Plus ABIs to ${output}`);

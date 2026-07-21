const fs = require("node:fs");
const path = require("node:path");
const { expect } = require("chai");

const ROOT = path.resolve(__dirname, "..");

function readAbi(file) {
  const document = JSON.parse(fs.readFileSync(path.resolve(ROOT, file), "utf8"));
  return Array.isArray(document) ? document : document.abi;
}

function signatures(abi) {
  return new Set(abi.map((entry) =>
    `${entry.type}:${entry.name || ""}(${(entry.inputs || []).map((input) => input.type).join(",")})`
  ));
}

const TARGETS = [
  {
    name: "RegistrationFixed",
    artifact: "artifacts/contracts/RegistrationFixed.sol/RegistrationFixed.json",
    backend: "../backend/src/blockchain/abis/registration.abi.json",
    frontend: "../frontend/src/abis/RegistrationFixed.json",
    required: [
      "function:getReferrer(address)",
      "function:isLevelActivated(address,uint8)",
      "function:currentMatrixParentOf(address,uint8)",
      "function:matrixParentMigrationFinalized()",
      "event:CurrentMatrixParentRecorded(address,uint8,address)",
      "event:MatrixParentMigrationFinalized()",
      "error:UplineSearchTooDeep(address,uint8)",
    ],
  },
  {
    name: "LevelManager",
    artifact: "artifacts/contracts/LevelManager.sol/LevelManager.json",
    backend: "../backend/src/blockchain/abis/levelManager.abi.json",
    frontend: "../frontend/src/abis/LevelManager.json",
    required: [
      "event:DetailedPayoutReceiptRecorded(address,uint256,uint8,uint8,address,address,uint8,uint32,uint8,uint32,uint8,uint256,uint256,uint256)",
      "event:PayoutNotDelivered(address,address,uint8,uint8,uint8,uint32,uint256,address,uint256,uint8,bytes32,bytes32,bytes32,uint256)",
      "event:RecycleCompletedDetailed(uint256,address,uint8,address,uint8,uint32,address,uint256,uint256,uint256,uint8,uint32,bool)",
      "event:AutoUpgradeCompleted(uint256,address,uint8,uint8,uint256,uint256,uint256,uint256)",
    ],
  },
  ...["P4Orbit", "P12Orbit", "P39Orbit"].map((name) => ({
    name,
    artifact: `artifacts/contracts/${name}.sol/${name}.json`,
    backend: `../backend/src/blockchain/abis/${name[0].toLowerCase()}${name.slice(1)}.abi.json`,
    frontend: `../frontend/src/abis/${name}.json`,
    required: [
      "event:PositionFilled(address,address,uint8,uint8,uint256,uint256)",
      "event:PaymentRuleApplied(address,uint8,uint8,uint8,uint8,uint256,uint256,uint256,uint256,uint256)",
      "event:OrbitReset(address,uint8,uint256)",
      ...(name === "P4Orbit" ? [] : ["function:matrixParentOf(address,uint8)"]),
    ],
  })),
];

describe("Application ABI reconciliation", function () {
  for (const target of TARGETS) {
    it(`keeps ${target.name} backend and frontend ABIs aligned with required protocol truth`, function () {
      const artifact = signatures(readAbi(target.artifact));
      const backend = signatures(readAbi(target.backend));
      const frontend = signatures(readAbi(target.frontend));

      for (const required of target.required) {
        expect(artifact, `${target.name} artifact lacks ${required}`).to.include(required);
        expect(backend, `${target.name} backend lacks ${required}`).to.include(required);
        expect(frontend, `${target.name} frontend lacks ${required}`).to.include(required);
      }
    });
  }

  it("keeps realtime and polling recycle-reserve indexing aligned", function () {
    const realtimeSource = fs.readFileSync(path.resolve(
      ROOT,
      "../backend/src/services/realtimeEventIndexer.js"
    ), "utf8");
    const pollingSource = fs.readFileSync(path.resolve(
      ROOT,
      "../backend/src/services/indexerService.js"
    ), "utf8");

    expect(realtimeSource.match(/'RecycleReserveUpdated'/g) || []).to.have.length.greaterThanOrEqual(2);
    expect(pollingSource).to.include("'RecycleReserveUpdated'");
  });
});

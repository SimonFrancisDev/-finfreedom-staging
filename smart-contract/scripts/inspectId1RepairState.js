// Read-only, pinned Polygon mainnet inventory. No signer or write RPC methods.
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const { ethers } = require("ethers");

const ROOT = "0xCE38722a72c9099D9237897E18B0cfb6D51c4470";
const SOFIA = "0xEA2bCf620d164Af63fba2F832C5F37E9eABdC528";
const SABINA = "0xb673c9D14Da920f187d25Cc793f1955a43284622";
const PARENT = "0xE8b1ac47231651cCc38326a59645a8D976D0Eabf";
const addresses = {
  registration: "0x02ECA97e944Ac66b0444fd5F61A716917E83CfF5",
  manager: "0x0E9De0F24eB4774834A2c4A63eaBa8356A4A4B53",
  p4: "0x1ED0b443c880Ba88F732c3F5915561A07B21F6B4",
  p12: "0xCF998d8f7E9DD4f3FacFbA45e656dE07142f824b",
  p39: "0xEaD39819B8C4DBb0669320542B6B847D4c31b8Fb",
};
const json = (value) => JSON.stringify(value, (_, item) => typeof item === "bigint" ? item.toString() : item, 2);

async function main() {
  assert(process.env.ID1_MAINNET_REPLAY_RPC, "Explicit source RPC required");
  const request = new ethers.FetchRequest(process.env.ID1_MAINNET_REPLAY_RPC);
  request.timeout = 20000;
  const provider = new ethers.JsonRpcProvider(request, undefined, { batchMaxCount: 1, cacheTimeout: -1 });
  try {
    assert.equal((await provider.getNetwork()).chainId, 137n);
    const blockTag = (await provider.getBlockNumber()) - 2;
    const block = await provider.getBlock(blockTag);
    const make = (name, address) => new ethers.Contract(address,
      JSON.parse(fs.readFileSync(path.join(__dirname, `../artifacts/contracts/${name}.sol/${name}.json`))).abi, provider);
    const registration = make("RegistrationFixed", addresses.registration);
    const manager = make("LevelManager", addresses.manager);
    const engines = { p4: make("P4Orbit", addresses.p4), p12: make("P12Orbit", addresses.p12), p39: make("P39Orbit", addresses.p39) };
    const report = { chainId: 137, block: blockTag, blockHash: block.hash, timestamp: new Date(block.timestamp * 1000).toISOString(),
      addresses, id1: ROOT, participants: [], orbits: [], writes: 0 };
    for (const wallet of [ROOT, SOFIA, SABINA, PARENT]) {
      const levels = {};
      for (const level of [8, 9]) levels[level] = {
        active: await registration.isLevelActivated(wallet, level, { blockTag }),
        matrixParent: await registration.currentMatrixParentOf(wallet, level, { blockTag }),
      };
      report.participants.push({ wallet, sponsor: await registration.getReferrer(wallet, { blockTag }),
        noReferrer: await registration.hadNoReferrer(wallet, { blockTag }), levels });
    }
    for (const [wallet, levels] of [[ROOT, [1,2,3,4,5,6,7,8,9,10]], [SOFIA, [8,9]], [SABINA, [8,9]], [PARENT, [8,9]]]) {
      for (const level of levels) {
        const key = [1,4,7,10].includes(level) ? "p4" : [2,5,8].includes(level) ? "p12" : "p39";
        const engine = engines[key];
        const state = (await engine.getUserOrbit(wallet, level, { blockTag })).toObject();
        const counts = (await engine.getLinePaymentCounts(wallet, level, { blockTag })).toObject();
        const row = { wallet, level, engine: key, state, counts, positions: [] };
        const occupied = Number(state.positionsInLine1 + state.positionsInLine2 + state.positionsInLine3);
        if (occupied > 0) {
          const capacity = key === "p4" ? 4 : key === "p12" ? 12 : 39;
          for (let slot = 1; slot <= capacity; slot += 1) {
            const position = (await engine.getPosition(wallet, level, slot, { blockTag })).toObject();
            if (position.occupant === ethers.ZeroAddress) continue;
            row.positions.push({ slot, ...position,
              arrival: await engine.getPositionLineArrivalNumber(wallet, level, slot, { blockTag }),
              link: (await engine.getPositionActivationData(wallet, level, slot, { blockTag })).toObject(),
              rule: (await engine.getPositionRuleView(wallet, level, slot, { blockTag })).toObject(),
            });
          }
          assert.equal(row.positions.length, occupied, "Occupied positions disagree with orbit counts");
        }
        report.orbits.push(row);
        console.log(json({ wallet, level, cycle: Number(state.totalCycles) + 1, occupied, counts }));
      }
    }
    report.managerOwner = await manager.owner({ blockTag });
    report.registrationOwner = await registration.owner({ blockTag });
    report.usdt = await manager.usdt({ blockTag });
    report.nftPool = await manager.nftPool({ blockTag });
    report.operationsWallet = await manager.operationsWallet({ blockTag });
    const output = path.resolve(__dirname, process.env.ID1_REPAIR_PLAN === "sabina-preserved-2026-11-13"
      ? "../../../tmp/id1-alternative-repair-prestate.json" : "../../../tmp/id1-repair-prestate.json");
    fs.writeFileSync(output, json(report) + "\n");
    console.log(`Pinned read-only inventory: ${output}`);
  } finally {
    provider.destroy();
  }
}

main().catch((error) => { console.error(error.shortMessage || error.message); process.exitCode = 1; });

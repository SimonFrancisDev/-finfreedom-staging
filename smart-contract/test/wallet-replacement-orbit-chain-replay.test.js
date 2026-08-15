const { expect } = require("chai");
const { ethers } = require("hardhat");
const path = require("node:path");
const prestate = require(path.resolve(
  process.env.PRESTATE_REPORT ||
  path.join(__dirname, "../migration-audits/wallet-replacement-orbit-prestate-latest.json"),
));
const manifest = require("../migration-audits/wallet-replacement-orbit-manifest.json");

const WP_OLD = "0xC0545331E20587208d4b27b2A3e4920Cc481133a";
const WP_NEW = "0x1EA5513e017b4e25847e91aBc84aC8686331f80B";
const RY_OLD = "0x2F1E28756A42A3680b5AD42C58A0c3887C9e60bA";
const RY_NEW = "0xFb8D46674f51882baaA2c9606122484434FF2DC2";
const old = new Set([WP_OLD.toLowerCase(), RY_OLD.toLowerCase()]);
const replace = (address) => address.toLowerCase() === WP_OLD.toLowerCase()
  ? WP_NEW : address.toLowerCase() === RY_OLD.toLowerCase() ? RY_NEW : ethers.getAddress(address);

const configs = {
  P4: { harness: "P4OrbitWalletReplacementMigratorHarness", max: 4 },
  P12: { harness: "P12OrbitWalletReplacementMigratorHarness", max: 12 },
  P39: { harness: "P39OrbitWalletReplacementMigratorHarness", max: 39 },
};

async function deploy(name) {
  const value = await (await ethers.getContractFactory(name)).deploy();
  await value.waitForDeployment();
  await value.initializeHarness();
  return value;
}

async function seedPosition(orbit, owner, level, item) {
  await orbit.seedPosition(owner, level, item.position, item.occupant, item.referrer, ethers.ZeroAddress,
    item.activationId, item.isMirror, item.linePaymentNumber);
  await orbit.seedSnapshot(owner, level, item.position, item.spillover1Recipient, item.spillover2Recipient);
}

describe("wallet replacement captured-chain orbit replay", function () {
  for (const type of ["P4", "P12", "P39"]) {
    it(`rewrites every captured ${type} reference and preserves valid owner state`, async function () {
      const orbit = await deploy(configs[type].harness);
      const seeded = new Set();
      const relevantOwned = prestate.owned.filter((row) => row.orbitType === type &&
        (row.positions.length || Number(row.summary.totalCycles) || Number(row.summary.totalEarned)));

      for (const row of relevantOwned) {
        await orbit.seedSummary(row.owner, row.level, row.summary.currentPosition, row.summary.escrowBalance,
          row.summary.autoUpgradeCompleted, row.summary.positionsInLine1, row.summary.positionsInLine2,
          row.summary.positionsInLine3, row.summary.totalCycles, row.summary.totalEarned);
        await orbit.seedLineCount(row.owner, row.level, 1, row.lineCounts.line1);
        await orbit.seedLineCount(row.owner, row.level, 2, row.lineCounts.line2);
        await orbit.seedLineCount(row.owner, row.level, 3, row.lineCounts.line3);
        for (const item of row.positions) {
          await seedPosition(orbit, row.owner, row.level, item);
          seeded.add(`${row.owner.toLowerCase()}:${row.level}:${item.position}`);
        }
      }

      for (const item of prestate.references.filter((row) => row.orbitType === type)) {
        const key = `${item.owner.toLowerCase()}:${item.level}:${item.position}`;
        if (seeded.has(key)) continue;
        await seedPosition(orbit, item.owner, item.level, item);
        seeded.add(key);
      }

      const m = manifest.orbits[type];
      if (type !== "P4") {
        for (let i = 0; i < m.matrixUsers.length; i++) {
          await orbit.seedMatrixParent(m.matrixUsers[i], m.matrixLevels[i], m.matrixExpectedParents[i]);
        }
      }
      if (type === "P4") await orbit.executeApprovedWalletReplacement(m.owners, m.levels);
      else await orbit.executeApprovedWalletReplacement(m.owners, m.levels, m.matrixUsers, m.matrixLevels, m.matrixExpectedParents);

      for (const item of prestate.references.filter((row) => row.orbitType === type)) {
        if (type === "P39" && item.owner.toLowerCase() === WP_OLD.toLowerCase() && item.level === 6) continue;
        const targetOwner = replace(item.owner);
        const position = await orbit.readPosition(targetOwner, item.level, item.position);
        expect(old.has(position.user.toLowerCase())).to.equal(false);
        expect(old.has(position.referrer.toLowerCase())).to.equal(false);
        expect(old.has(position.first.toLowerCase())).to.equal(false);
        expect(old.has(position.second.toLowerCase())).to.equal(false);
        if (item.matchedFields.includes("occupant")) expect(position.user).to.equal(replace(item.occupant));
        if (item.matchedFields.includes("referrer")) expect(position.referrer).to.equal(replace(item.referrer));
        if (item.matchedFields.includes("spillover1Recipient")) expect(position.first).to.equal(replace(item.spillover1Recipient));
        if (item.matchedFields.includes("spillover2Recipient")) expect(position.second).to.equal(replace(item.spillover2Recipient));
      }

      for (const row of relevantOwned) {
        const source = await orbit.userOrbits(row.owner, row.level);
        expect(source.isActive).to.equal(false);
        if (type === "P39" && row.owner.toLowerCase() === WP_OLD.toLowerCase() && row.level === 6) {
          expect((await orbit.userOrbits(WP_NEW, 6)).isActive).to.equal(false);
        } else {
          const target = await orbit.userOrbits(replace(row.owner), row.level);
          expect(target.isActive).to.equal(true);
          expect(target.totalEarned).to.equal(BigInt(row.summary.totalEarned));
          expect(target.totalCycles).to.equal(BigInt(row.summary.totalCycles));
        }
      }
    });
  }
});

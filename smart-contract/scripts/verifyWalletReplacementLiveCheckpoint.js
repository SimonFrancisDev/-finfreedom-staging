const fs = require("node:fs");
const path = require("node:path");
const hre = require("hardhat");

const { ethers } = hre;
const SLOT = "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc";
const OLD_WP = "0xC0545331E20587208d4b27b2A3e4920Cc481133a";
const NEW_WP = "0x1EA5513e017b4e25847e91aBc84aC8686331f80B";
const OLD_RY = "0x2F1E28756A42A3680b5AD42C58A0c3887C9e60bA";
const NEW_RY = "0xFb8D46674f51882baaA2c9606122484434FF2DC2";
const ZERO = ethers.ZeroAddress;
const proxies = {
  registration: "0x02ECA97e944Ac66b0444fd5F61A716917E83CfF5",
  levelManager: "0x0E9De0F24eB4774834A2c4A63eaBa8356A4A4B53",
  escrow: "0x8b3db2AC7e30749479f2dbad14105C8eD4a377d4",
  p4: "0x1ED0b443c880Ba88F732c3f5915561A07B21F6B4",
  p12: "0xCF998d8f7E9DD4f3FacFbA45e656dE07142f824b",
  p39: "0xEaD39819B8C4DBb0669320542B6B847D4c31b8Fb",
  fgt: "0x615201edaddB5CFD839Cc4eE693Dc464F6E2B5E4",
  fgtr: "0xAaD41296b6Ec358b9C16dD7161C555fD3a464Bc3",
};
const temporary = {
  registration: "0x2e30A51C4FeEE4370B6Fb19ed98A1eCBDE408f72",
  levelManager: "0xc8064bf96Fba0BD3A7a9a087E61523039e0564e3",
  escrow: "0x4E5C085227DEb7E2E75aB92d9372819a95bDb6C2",
  p4: "0x25E09FC493904D6706E129315513693407c03722",
  p12: "0x3B0b51B8c80B8A649601811647f40E08bF1C3A59",
  p39: "0x566A0ce0bC8b4118e74940876E36a2Cf6e0cce9a",
  fgt: "0x33534E581EEF904c76ACA42410faEE14FEe7FC0D",
  fgtr: "0x9f06F9453173713660aC92aCF5Bd362AE442a975",
};
const permanent = {
  registration: "0x2F2c5E43eBBf666E00a1a2d699256B2Eae6268f5",
  levelManager: "0x36017dd046653654dCF2CE52C2a44A1914b3998A",
  escrow: "0x48c512362E047288d83Fe949614a571401aDA075",
  p4: "0xDCDF3e86B417eFfA411B75373F6596863f9B7bd8",
  p12: "0xCD673bc614Ad2C1d6Bc4F888df7b31A7a468d078",
  p39: "0x9255eD0c56371039Dd2fA70acA23421b1A530455",
  fgt: "0x435295Ef236841fd2a162062cB86464C4808DE26",
  fgtr: "0xC6cF732CF49faDDF2E614f1154294a3c2f786cfF",
};
const names = {
  registration: "RegistrationWalletReplacementMigrator",
  levelManager: "LevelManagerWalletReplacementMigrator",
  escrow: "AutoUpgradeEscrowWalletReplacementMigrator",
  p4: "P4OrbitWalletReplacementMigrator",
  p12: "P12OrbitWalletReplacementMigrator",
  p39: "P39OrbitWalletReplacementMigrator",
  fgt: "FGTWalletReplacementMigrator",
  fgtr: "FGTrWalletReplacementMigrator",
};

function replacement(address) {
  const value = address.toLowerCase();
  if (value === OLD_WP.toLowerCase()) return NEW_WP;
  if (value === OLD_RY.toLowerCase()) return NEW_RY;
  return ethers.getAddress(address.toLowerCase());
}

function check(condition, label, rows, detail = null) {
  rows.push({ label, pass: Boolean(condition), detail });
  if (!condition) throw new Error(`${label}${detail ? `: ${JSON.stringify(detail)}` : ""}`);
}

async function main() {
  const finalState = process.env.FINAL_STATE === "true";
  const expectedImplementations = finalState ? permanent : temporary;
  const manifest = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../migration-audits/wallet-replacement-manifest-draft.json"), "utf8"));
  const rows = [];
  const contracts = {};

  for (const key of Object.keys(proxies)) {
    const proxy = ethers.getAddress(proxies[key].toLowerCase());
    const raw = await ethers.provider.getStorage(proxy, SLOT);
    const actual = ethers.getAddress(`0x${raw.slice(-40)}`);
    check(actual === ethers.getAddress(expectedImplementations[key].toLowerCase()), `${key} ${finalState ? "permanent" : "temporary"} implementation installed`, rows, { actual, expected: expectedImplementations[key] });
    contracts[key] = await ethers.getContractAt(names[key], proxy);
    check((await contracts[key].paused()) === !finalState, `${key} ${finalState ? "is unpaused" : "remains paused"}`, rows);
  }

  const registration = contracts.registration;
  check(await registration.isRegistered(NEW_WP), "WP replacement registered", rows);
  check(await registration.isRegistered(NEW_RY), "RY replacement registered", rows);
  check(!(await registration.isRegistered(OLD_WP)), "WP old identity disabled", rows);
  check(!(await registration.isRegistered(OLD_RY)), "RY old identity disabled", rows);
  check(ethers.getAddress(await registration.referrerOf(NEW_WP)) === ethers.getAddress(manifest.identities[0].sponsorAfter.toLowerCase()), "WP sponsor preserved", rows);
  check(ethers.getAddress(await registration.referrerOf(NEW_RY)) === ethers.getAddress(NEW_WP.toLowerCase()), "RY sponsor canonicalized to WP replacement", rows);

  for (const row of manifest.sponsorRewrites) {
    const child = replacement(row.child);
    const expected = replacement(row.from);
    const actual = await registration.referrerOf(child);
    check(ethers.getAddress(actual) === ethers.getAddress(expected.toLowerCase()), `sponsor rewrite ${child}`, rows, { actual, expected });
  }
  for (const row of manifest.matrixParentRewrites) {
    const user = replacement(row.user);
    const expected = replacement(row.from);
    const actual = await registration.currentMatrixParentOf(user, row.level);
    check(ethers.getAddress(actual) === ethers.getAddress(expected.toLowerCase()), `registration matrix parent ${user} L${row.level}`, rows, { actual, expected });
  }

  for (let level = 1; level <= 10; level += 1) {
    check((await contracts.levelManager.userLevelActivated(NEW_WP, level)) === (level <= 4), `WP LevelManager L${level}`, rows);
    check((await contracts.levelManager.userLevelActivated(NEW_RY, level)) === (level <= 3), `RY LevelManager L${level}`, rows);
    check(!(await contracts.levelManager.userLevelActivated(OLD_WP, level)), `WP old LevelManager L${level} cleared`, rows);
    check(!(await contracts.levelManager.userLevelActivated(OLD_RY, level)), `RY old LevelManager L${level} cleared`, rows);
  }

  check((await contracts.escrow.lockedFunds(NEW_WP, 4, 5)) === 88_000_000n, "WP escrow moved", rows);
  check((await contracts.escrow.lockedFunds(NEW_RY, 3, 4)) === 8_000_000n, "RY escrow moved", rows);
  check((await contracts.escrow.lockedFunds(OLD_WP, 4, 5)) === 0n, "WP old escrow cleared", rows);
  check((await contracts.escrow.lockedFunds(OLD_RY, 3, 4)) === 0n, "RY old escrow cleared", rows);

  check((await contracts.fgt.balanceOf(NEW_WP)) === 150_000_000n, "WP FGT moved", rows);
  check((await contracts.fgt.balanceOf(NEW_RY)) === 70_000_000n, "RY FGT moved", rows);
  check((await contracts.fgt.balanceOf(OLD_WP)) === 0n, "WP old FGT cleared", rows);
  check((await contracts.fgt.balanceOf(OLD_RY)) === 0n, "RY old FGT cleared", rows);
  check((await contracts.fgtr.balanceOf(NEW_WP)) === 15_000_000n, "WP FGTr moved", rows);
  check((await contracts.fgtr.balanceOf(NEW_RY)) === 0n, "RY FGTr remains zero", rows);
  check((await contracts.fgtr.balanceOf(OLD_WP)) === 0n, "WP old FGTr cleared", rows);

  const invalidP39 = await contracts.p39.userOrbits(NEW_WP, 6);
  check(invalidP39.isActive === false, "invalid WP P39 Level 6 quarantined", rows);
  const wpP4L4 = await contracts.p4.userOrbits(NEW_WP, 4);
  check(wpP4L4.escrowBalance === 88_000_000n, "WP P4 Level 4 orbit escrow preserved", rows);

  const result = rows.every((row) => row.pass) ? "PASS" : "FAIL";
  const report = { generatedAt: new Date().toISOString(), block: await ethers.provider.getBlockNumber(), mode: finalState ? "FINAL" : "CHECKPOINT", result, checks: rows.length, rows };
  const output = path.resolve(__dirname, `../migration-audits/wallet-replacement-live-${finalState ? "final" : "checkpoint"}.json`);
  fs.writeFileSync(output, `${JSON.stringify(report, (_, value) => typeof value === "bigint" ? value.toString() : value, 2)}\n`);
  console.log(JSON.stringify({ output, block: report.block, result, checks: rows.length }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

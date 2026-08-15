const fs = require("node:fs");
const path = require("node:path");
const hre = require("hardhat");
const { ethers } = hre;

const REGISTRATION = "0x02ECA97e944Ac66b0444fd5F61A716917E83CfF5";
const FGT = "0x615201edaddB5CFD839Cc4eE693Dc464F6E2B5E4";
const FGTR = "0xAaD41296b6Ec358b9C16dD7161C555fD3a464Bc3";
const TOKEN_ABI = [
  "function balanceOf(address) view returns(uint256)",
  "function lockedBalanceOf(address) view returns(uint256)",
  "function totalSupply() view returns(uint256)",
];
const OLD = new Set([
  "0xc0545331e20587208d4b27b2a3e4920cc481133a",
  "0x2f1e28756a42a3680b5ad42c58a0c3887c9e60ba",
]);
const LEVEL6_PARTICIPANTS = [
  "0x41b65562ccdb4baf1f9ab67a1e01c160fcfcddc3",
  "0x3fd47bc432b2c0681d7687adfe77ac0307f1f8f4",
];

async function main() {
  const registration = await ethers.getContractAt("RegistrationFixed", REGISTRATION.toLowerCase());
  const fgt = new ethers.Contract(FGT.toLowerCase(), TOKEN_ABI, ethers.provider);
  const fgtr = new ethers.Contract(FGTR.toLowerCase(), TOKEN_ABI, ethers.provider);
  const ledgerPath = path.resolve(__dirname, "../test-reports/production-matrix-parent-ledger-latest.json");
  const ledger = JSON.parse(fs.readFileSync(ledgerPath, "utf8"));
  const related = ledger.seeds.filter((row) => {
    const values = [row.occupant, row.parent, row.latestOccurrence?.orbitOwner]
      .filter(Boolean)
      .map((value) => value.toLowerCase());
    return values.some((value) => OLD.has(value));
  });

  const live = [];
  for (const row of related) {
    const [sponsor, parent, active] = await Promise.all([
      registration.getReferrer(row.occupant),
      registration.currentMatrixParentOf(row.occupant, row.level),
      registration.isLevelActivated(row.occupant, row.level),
    ]);
    live.push({ ...row, liveSponsor: sponsor, liveMatrixParent: parent, liveLevelActive: active });
  }

  const level6 = [];
  for (const wallet of LEVEL6_PARTICIPANTS) {
    const [sponsor, parent, active] = await Promise.all([
      registration.getReferrer(wallet),
      registration.currentMatrixParentOf(wallet, 6),
      registration.isLevelActivated(wallet, 6),
    ]);
    level6.push({ wallet, sponsor, matrixParent: parent, level6Active: active });
  }

  const inventoryPath = path.resolve(__dirname, "../../../backend/migration-audits/wallet-migration-inventory-91313968.json");
  const inventory = JSON.parse(fs.readFileSync(inventoryPath, "utf8"));
  const directChildren = [...new Set([
    ...inventory.wallets.wp98hbOld.descendants.direct,
    ...inventory.wallets.rymqk4Old.descendants.direct,
  ].map((wallet) => wallet.toLowerCase()))];
  const directChildSponsors = [];
  for (const wallet of directChildren) {
    directChildSponsors.push({ wallet, sponsor: await registration.getReferrer(wallet) });
  }

  const replacementState = [];
  for (const wallet of [
    "0x1EA5513e017b4e25847e91aBc84aC8686331f80B",
    "0xFb8D46674f51882baaA2c9606122484434FF2DC2",
  ]) {
    replacementState.push({
      wallet,
      registered: await registration.isRegistered(wallet),
      sponsor: await registration.getReferrer(wallet),
      activeLevels: (await Promise.all(
        Array.from({ length: 10 }, (_, index) => registration.isLevelActivated(wallet, index + 1))
      )).map((active, index) => active ? index + 1 : null).filter(Boolean),
    });
  }

  const tokenState = [];
  for (const wallet of [
    "0xc0545331e20587208d4b27b2a3e4920cc481133a",
    "0x1EA5513e017b4e25847e91aBc84aC8686331f80B",
    "0x2f1e28756a42a3680b5ad42c58a0c3887c9e60ba",
    "0xFb8D46674f51882baaA2c9606122484434FF2DC2",
  ]) {
    const [fgtBalance, fgtLocked, fgtrBalance, fgtrLocked] = await Promise.all([
      fgt.balanceOf(wallet), fgt.lockedBalanceOf(wallet), fgtr.balanceOf(wallet), fgtr.lockedBalanceOf(wallet),
    ]);
    tokenState.push({
      wallet,
      fgtBalance: fgtBalance.toString(),
      fgtLocked: fgtLocked.toString(),
      fgtrBalance: fgtrBalance.toString(),
      fgtrLocked: fgtrLocked.toString(),
    });
  }
  const [fgtTotalSupply, fgtrTotalSupply] = await Promise.all([fgt.totalSupply(), fgtr.totalSupply()]);

  const report = {
    generatedAt: new Date().toISOString(),
    chainId: Number((await ethers.provider.getNetwork()).chainId),
    blockNumber: await ethers.provider.getBlockNumber(),
    ledgerSourceBlock: ledger.sourceBlock,
    relatedCount: related.length,
    live,
    level6,
    directChildSponsors,
    replacementState,
    tokenState,
    tokenSupply: { fgt: fgtTotalSupply.toString(), fgtr: fgtrTotalSupply.toString() },
  };
  const output = path.resolve(__dirname, "../migration-audits/wallet-replacement-live-references.json");
  fs.writeFileSync(output, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify({
    output,
    blockNumber: report.blockNumber,
    relatedCount: live.length,
    level6,
    directChildSponsors,
    replacementState,
    tokenState,
    tokenSupply: report.tokenSupply,
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

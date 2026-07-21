const fs = require("node:fs");
const hre = require("hardhat");
const { ethers, upgrades } = hre;

const ARTIFACT = process.env.MIGRATION_IMPLEMENTATIONS_FILE;
const PROXIES = {
  registration: "0x02ECA97e944Ac66b0444fd5F61A716917E83CfF5",
  levelManager: "0x0E9De0F24eB4774834A2c4A63eaBa8356A4A4B53",
  p4: "0x1ED0b443c880Ba88F732c3F5915561A07B21F6B4",
  p12: "0xCF998d8f7E9DD4f3FacFbA45e656dE07142f824b",
  p39: "0xEaD39819B8C4DBb0669320542B6B847D4c31b8Fb",
};
const CONTRACTS = {
  registration: ["RegistrationFixed", []],
  levelManager: ["LevelManager", []],
  p4: ["P4Orbit", []],
  p12: ["P12Orbit", []],
  p39: ["P39Orbit", []],
  router: ["LevelSettlementRouter", ["0x0E9De0F24eB4774834A2c4A63eaBa8356A4A4B53", "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"]],
};

async function normalizedRuntime(name, bytecode) {
  const buildInfo = await hre.artifacts.getBuildInfo(`contracts/${name}.sol:${name}`);
  if (!buildInfo) throw new Error(`${name} build info unavailable`);
  const references = buildInfo.output.contracts[`contracts/${name}.sol`][name]
    .evm.deployedBytecode.immutableReferences || {};
  const bytes = bytecode.slice(2).match(/.{2}/g) || [];
  for (const ranges of Object.values(references)) {
    for (const { start, length } of ranges) {
      for (let index = start; index < start + length; index += 1) bytes[index] = "00";
    }
  }
  return `0x${bytes.join("")}`;
}

async function main() {
  if (!ARTIFACT) throw new Error("MIGRATION_IMPLEMENTATIONS_FILE is required");
  const deployment = JSON.parse(fs.readFileSync(ARTIFACT, "utf8"));
  const forkReport = JSON.parse(fs.readFileSync("test-reports/production-fork-migration-latest.json", "utf8"));
  const network = await ethers.provider.getNetwork();
  if (network.chainId !== 137n || deployment.chainId !== 137) throw new Error("Expected Polygon chain 137");

  const verified = {};
  for (const [key, [name, args]] of Object.entries(CONTRACTS)) {
    const item = deployment.contracts[key];
    const [code, transaction, receipt] = await Promise.all([
      ethers.provider.getCode(item.address),
      ethers.provider.getTransaction(item.transactionHash),
      ethers.provider.getTransactionReceipt(item.transactionHash),
    ]);
    if (code === "0x" || !transaction || !receipt || receipt.status !== 1) throw new Error(`${key} missing code or successful receipt`);
    if (ethers.getAddress(receipt.contractAddress) !== ethers.getAddress(item.address)) throw new Error(`${key} receipt address mismatch`);
    const factory = await ethers.getContractFactory(name);
    const expected = await factory.getDeployTransaction(...args);
    if (transaction.data.toLowerCase() !== expected.data.toLowerCase()) throw new Error(`${key} creation bytecode mismatch`);
    const artifact = await hre.artifacts.readArtifact(name);
    const [normalizedActual, normalizedExpected] = await Promise.all([
      normalizedRuntime(name, code),
      normalizedRuntime(name, artifact.deployedBytecode),
    ]);
    const runtimeBytecodeMatches = normalizedActual.toLowerCase() === normalizedExpected.toLowerCase();
    if (!runtimeBytecodeMatches) throw new Error(`${key} runtime bytecode mismatch`);
    verified[key] = {
      address: item.address,
      transactionHash: item.transactionHash,
      creationBytecodeMatches: true,
      runtimeBytecodeMatches: true,
      runtimeCodeHash: ethers.keccak256(code),
    };
  }

  const proxyState = {};
  for (const [key, proxy] of Object.entries(PROXIES)) {
    const expected = forkReport.before.implementations[key];
    if (!expected) throw new Error(`${key} missing from certified fork baseline`);
    const actual = await upgrades.erc1967.getImplementationAddress(proxy);
    if (actual.toLowerCase() !== expected.toLowerCase()) throw new Error(`${key} production proxy changed unexpectedly`);
    proxyState[key] = { proxy, implementation: actual, unchanged: true };
  }

  const router = await ethers.getContractAt("LevelSettlementRouter", deployment.contracts.router.address);
  const routerConfig = { levelManager: await router.levelManager(), usdt: await router.usdt() };
  if (routerConfig.levelManager.toLowerCase() !== CONTRACTS.router[1][0].toLowerCase()) throw new Error("router LevelManager mismatch");
  if (routerConfig.usdt.toLowerCase() !== CONTRACTS.router[1][1].toLowerCase()) throw new Error("router USDT mismatch");

  console.log(JSON.stringify({ chainId: 137, verified, proxyState, routerConfig, verdict: "PASS" }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

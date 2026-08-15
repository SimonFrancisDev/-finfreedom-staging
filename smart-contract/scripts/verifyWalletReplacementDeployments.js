const fs = require('node:fs');
const path = require('node:path');
const hre = require('hardhat');
const { ethers } = hre;

const IMPLEMENTATION_SLOT = '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc';
const OWNER = '0x785cC854ce9e13CE1140cbFD7C08620713E1711d';
const GUARDIAN = '0x290c2300296379BD0048aFe9099Ed6Fc81BF75fC';
const PROXIES = {
  registration: '0x02ECA97e944Ac66b0444fd5F61A716917E83CfF5',
  levelManager: '0x0E9De0F24eB4774834A2c4A63eaBa8356A4A4B53',
  escrow: '0x8b3db2AC7e30749479f2dbad14105C8eD4a377d4',
  p4: '0x1ED0b443c880Ba88F732c3f5915561A07B21F6B4',
  p12: '0xCF998d8f7E9DD4f3FacFbA45e656dE07142f824b',
  p39: '0xEaD39819B8C4DBb0669320542B6B847D4c31b8Fb',
  fgt: '0x615201edaddB5CFD839Cc4eE693Dc464F6E2B5E4',
  fgtr: '0xAaD41296b6Ec358b9C16dD7161C555fD3a464Bc3',
};

function stripMetadata(bytecode) {
  if (!bytecode || bytecode === '0x' || bytecode.length < 6) return bytecode;
  const metadataBytes = Number.parseInt(bytecode.slice(-4), 16);
  const metadataHexLength = (metadataBytes + 2) * 2;
  return metadataHexLength <= bytecode.length - 2 ? bytecode.slice(0, bytecode.length - metadataHexLength) : bytecode;
}

function maskReferences(bytecode, references) {
  const chars = bytecode.slice(2).split('');
  for (const { start, length } of references) chars.fill('0', start * 2, (start + length) * 2);
  return `0x${chars.join('')}`;
}

async function compiledExecutableHash(contractName) {
  const artifact = await hre.artifacts.readArtifact(contractName);
  const build = await hre.artifacts.getBuildInfo(`${artifact.sourceName}:${artifact.contractName}`);
  const references = Object.values(
    build?.output?.contracts?.[artifact.sourceName]?.[artifact.contractName]?.evm?.deployedBytecode?.immutableReferences || {},
  ).flat();
  return {
    expected: ethers.keccak256(maskReferences(stripMetadata(artifact.deployedBytecode), references)),
    references,
  };
}

async function main() {
  const deploymentFile = process.env.WALLET_REPLACEMENT_DEPLOYMENT_FILE;
  if (!deploymentFile) throw new Error('WALLET_REPLACEMENT_DEPLOYMENT_FILE is required');
  const deployment = JSON.parse(fs.readFileSync(path.resolve(deploymentFile), 'utf8'));
  if (deployment.chainId !== 137 || deployment.productionProxiesUnchanged !== true) throw new Error('Invalid deployment artifact');
  const guardian = new ethers.Contract(GUARDIAN, [
    'function owner() view returns(address)', 'function paused() view returns(bool)',
    'function globalUpgradeFreeze() view returns(bool)', 'function approvedProxies(address) view returns(bool)',
    'function approvedImplementations(address,address) view returns(bool)',
  ], ethers.provider);
  if ((await guardian.owner()).toLowerCase() !== OWNER.toLowerCase()) throw new Error('Guardian owner mismatch');
  if (await guardian.paused() || await guardian.globalUpgradeFreeze()) throw new Error('Guardian blocks upgrades');

  const rows = [];
  const governanceActionsRequired = [];
  for (const [key, proxyRaw] of Object.entries(PROXIES)) {
    const proxy = ethers.getAddress(proxyRaw.toLowerCase());
    const temporary = ethers.getAddress(deployment.contracts[key].address.toLowerCase());
    const contractName = deployment.contracts[key].contractName;
    const [stored, code, proxyApproved, temporaryApproved, paused, compiled] = await Promise.all([
      ethers.provider.getStorage(proxy, IMPLEMENTATION_SLOT), ethers.provider.getCode(temporary),
      guardian.approvedProxies(proxy), guardian.approvedImplementations(proxy, temporary),
      new ethers.Contract(proxy, ['function paused() view returns(bool)'], ethers.provider).paused(),
      compiledExecutableHash(contractName),
    ]);
    const permanent = ethers.getAddress(`0x${stored.slice(-40)}`);
    const permanentApproved = await guardian.approvedImplementations(proxy, permanent);
    const actualHash = ethers.keccak256(maskReferences(stripMetadata(code), compiled.references));
    if (code === '0x' || actualHash !== compiled.expected) throw new Error(`${key} temporary bytecode mismatch`);
    if (!proxyApproved) governanceActionsRequired.push({ key, action: 'APPROVE_PROXY', proxy });
    if (!permanentApproved) governanceActionsRequired.push({ key, action: 'APPROVE_PERMANENT_IMPLEMENTATION', proxy, implementation: permanent });
    if (paused) throw new Error(`${key} is unexpectedly paused`);
    rows.push({ key, proxy, permanent, temporary, contractName, executableHash: actualHash, proxyApproved, permanentApproved, temporaryApproved, paused });
  }
  const report = {
    generatedAt: new Date().toISOString(), chainId: 137, blockNumber: await ethers.provider.getBlockNumber(),
    owner: OWNER, guardian: GUARDIAN, deploymentFile: path.resolve(deploymentFile), verdict: 'PASS',
    governanceActionsRequired, rows,
  };
  const output = path.resolve(__dirname, '../migration-audits/wallet-replacement-deployments-verification.json');
  fs.writeFileSync(output, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify({ output, blockNumber: report.blockNumber, verdict: report.verdict, governanceActionsRequired, rows }, null, 2));
}

main().catch((error) => { console.error(error); process.exitCode = 1; });

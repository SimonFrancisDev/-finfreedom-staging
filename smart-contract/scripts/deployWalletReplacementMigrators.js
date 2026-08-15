const fs = require('node:fs');
const path = require('node:path');
const hre = require('hardhat');
const { ethers } = hre;

const EXPECTED_DEPLOYER = '0x884e48f9897E8633238747b608DD49dE12bF94df';
const contracts = {
  registration: 'RegistrationWalletReplacementMigrator',
  levelManager: 'LevelManagerWalletReplacementMigrator',
  escrow: 'AutoUpgradeEscrowWalletReplacementMigrator',
  p4: 'P4OrbitWalletReplacementMigrator',
  p12: 'P12OrbitWalletReplacementMigrator',
  p39: 'P39OrbitWalletReplacementMigrator',
  fgt: 'FGTWalletReplacementMigrator',
  fgtr: 'FGTrWalletReplacementMigrator',
};

function stripMetadata(bytecode) {
  if (!bytecode || bytecode === '0x' || bytecode.length < 6) return bytecode;
  const metadataBytes = Number.parseInt(bytecode.slice(-4), 16);
  const metadataHexLength = (metadataBytes + 2) * 2;
  if (!Number.isFinite(metadataBytes) || metadataHexLength > bytecode.length - 2) return bytecode;
  return bytecode.slice(0, bytecode.length - metadataHexLength);
}

function maskReferences(bytecode, references) {
  const chars = bytecode.slice(2).split('');
  for (const { start, length } of references) chars.fill('0', start * 2, (start + length) * 2);
  return `0x${chars.join('')}`;
}

async function executableHash(contractName, bytecode) {
  const artifact = await hre.artifacts.readArtifact(contractName);
  const buildInfo = await hre.artifacts.getBuildInfo(`${artifact.sourceName}:${artifact.contractName}`);
  const references = Object.values(
    buildInfo?.output?.contracts?.[artifact.sourceName]?.[artifact.contractName]?.evm?.deployedBytecode?.immutableReferences || {},
  ).flat();
  return ethers.keccak256(maskReferences(stripMetadata(bytecode), references));
}

async function main() {
  const network = await ethers.provider.getNetwork();
  if (hre.network.name !== 'polygon' || network.chainId !== 137n) throw new Error('Polygon production only');
  const [deployer] = await ethers.getSigners();
  if (!deployer || deployer.address !== EXPECTED_DEPLOYER) throw new Error(`Expected deployer ${EXPECTED_DEPLOYER}`);
  const balance = await ethers.provider.getBalance(deployer.address);
  if (String(process.env.PREFLIGHT_ONLY || '').toLowerCase() === 'true') {
    console.log(JSON.stringify({ chainId: 137, deployer: deployer.address, balance: ethers.formatEther(balance), deployments: 0 }, null, 2));
    return;
  }
  if (process.env.CONFIRM_WALLET_REPLACEMENT_DEPLOY !== 'DEPLOY') throw new Error('Set CONFIRM_WALLET_REPLACEMENT_DEPLOY=DEPLOY');

  const maxFeePerGas = ethers.parseUnits(process.env.MAX_DEPLOY_FEE_GWEI || '350', 'gwei');
  const maxPriorityFeePerGas = ethers.parseUnits(process.env.MAX_DEPLOY_PRIORITY_FEE_GWEI || '35', 'gwei');
  const estimateOnly = String(process.env.ESTIMATE_ONLY || '').toLowerCase() === 'true';
  let remainingMaximumCost = 0n;
  const deployed = {};
  for (const [key, contractName] of Object.entries(contracts)) {
    const factory = await ethers.getContractFactory(contractName, deployer);
    const resumeAddress = process.env[`RESUME_${key.toUpperCase()}_ADDRESS`];
    if (resumeAddress) {
      const address = ethers.getAddress(resumeAddress);
      const [actualCode, artifact] = await Promise.all([
        ethers.provider.getCode(address), hre.artifacts.readArtifact(contractName),
      ]);
      const [actualHash, compiledHash] = await Promise.all([
        executableHash(contractName, actualCode), executableHash(contractName, artifact.deployedBytecode),
      ]);
      if (actualCode === '0x' || actualHash !== compiledHash) {
        throw new Error(`${contractName} resume address does not match compiled runtime bytecode`);
      }
      deployed[key] = { contractName, address, executableHash: actualHash, transactionHash: null, blockNumber: null, reused: true };
      console.log(`${contractName}: reusing bytecode-verified ${address}`);
      continue;
    }
    const unsigned = await factory.getDeployTransaction();
    const estimated = await ethers.provider.estimateGas({ ...unsigned, from: deployer.address });
    const gasLimit = estimated * 120n / 100n;
    remainingMaximumCost += gasLimit * maxFeePerGas;
    if (estimateOnly) {
      deployed[key] = { contractName, estimatedGas: estimated.toString(), gasLimit: gasLimit.toString() };
      console.log(`${contractName}: estimate ${estimated}, capped maximum ${ethers.formatEther(gasLimit * maxFeePerGas)} POL`);
      continue;
    }
    if (balance < gasLimit * maxFeePerGas) throw new Error(`Insufficient capped balance for ${contractName}`);
    const contract = await factory.deploy({ maxFeePerGas, maxPriorityFeePerGas, gasLimit });
    const transaction = contract.deploymentTransaction();
    await contract.waitForDeployment();
    const receipt = await transaction.wait();
    const address = await contract.getAddress();
    if (await ethers.provider.getCode(address) === '0x') throw new Error(`${contractName} has no runtime code`);
    deployed[key] = { contractName, address, transactionHash: receipt.hash, blockNumber: receipt.blockNumber };
    console.log(`${contractName}: ${address}`);

    const checkpointDirectory = path.resolve(__dirname, '../deployments-production-migration');
    fs.mkdirSync(checkpointDirectory, { recursive: true });
    fs.writeFileSync(path.join(checkpointDirectory, 'wallet-replacement-migrators-checkpoint.json'), `${JSON.stringify({
      generatedAt: new Date().toISOString(), chainId: 137, deployer: deployer.address,
      productionProxiesUnchanged: true, purpose: 'temporary-wallet-replacement-migrators-checkpoint', contracts: deployed,
    }, null, 2)}\n`);
  }

  if (estimateOnly) {
    console.log(JSON.stringify({
      chainId: 137, deployer: deployer.address, balance: ethers.formatEther(balance),
      remainingMaximumCost: ethers.formatEther(remainingMaximumCost), deploymentsSent: 0, contracts: deployed,
    }, null, 2));
    return;
  }

  const artifact = {
    generatedAt: new Date().toISOString(), chainId: 137, deployer: deployer.address,
    productionProxiesUnchanged: true, purpose: 'temporary-wallet-replacement-migrators', contracts: deployed,
  };
  const directory = path.resolve(__dirname, '../deployments-production-migration');
  fs.mkdirSync(directory, { recursive: true });
  const output = path.join(directory, `wallet-replacement-migrators-${Date.now()}.json`);
  fs.writeFileSync(output, `${JSON.stringify(artifact, null, 2)}\n`);
  console.log(`Artifact: ${output}`);
  console.log('No proxy was upgraded and no participant state was changed.');
}

main().catch((error) => { console.error(error); process.exitCode = 1; });

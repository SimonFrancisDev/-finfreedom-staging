const hre = require('hardhat');
const fs = require('fs');
const path = require('path');
const assert = require('node:assert/strict');
const { ethers } = hre;
const addresses = {
  multisig:'0xD3f460AF3c6C9FAB8053ebF5eCdC1EdfC5de5f6A', guardian:'0x52F22c1e396dF20c2078B4a86b4A0ac3b51a9911',
  usdt:'0x7b7E39f3D177B3356368431C5C285bca58b43A60', id1Wallet:'0xD3f460AF3c6C9FAB8053ebF5eCdC1EdfC5de5f6A',
  nftPoolVault:'0xB3f249c152214e12EeC1a74E32BAB0cE55F0c168', operationsVault:'0x483e6795b5BFbF1F4d757226Ba5e28633Bcc3b27',
  fgt:'0x2C675980C6431d40312b258cE9c982C41CAC4393', fgtr:'0x780B047A46d65D15C5F34ff8c66d5e2F20dFc960',
  escrow:'0x03289108688B00666bb8e366125318B502139268', registration:'0xC5750BfA5b4Dd888e55420911b58CB57539aEb90',
  tokenController:'0x594ad7378A1AD1b2A035521f2c535E2Ff817a28f', levelManager:'0xaf6cC44C5B860BA076Ee703244edcaB0C806c27A',
  settlementRouter:'0x3c278f5b195e5505F5c200d7BF3754A8a40bC5B2', p4Orbit:'0x0A5D190AcC1762d5D4c62996D341a7B758706a95',
  p12Orbit:'0xAbD1Da3c9b1F4Fa6642db96E7F7Fb80DdA5C72a2', p39Orbit:'0xb712D515983185eed2823A1F3D1cBd751aB68318',
};
async function main(){
  assert.equal(hre.network.name,'amoy');assert.equal((await ethers.provider.getNetwork()).chainId,80002n);
  const [signer]=await ethers.getSigners();assert.equal(signer.address,'0x296238e950ef0066D2119230Bf0eb3aDEBc94882');
  const specs={fgt:'FGTToken',fgtr:'FGTrToken',escrow:'AutoUpgradeEscrow',registration:'RegistrationFixed',tokenController:'FreedomTokenController',p4Orbit:'P4Orbit',p12Orbit:'P12Orbit',p39Orbit:'P39Orbit',levelManager:'LevelManager'};
  const contracts={};
  for(const [key,name] of Object.entries(specs)){
    const c=await ethers.getContractAt(name,addresses[key]);contracts[key]=c;
    assert.notEqual(await ethers.provider.getCode(addresses[key]),'0x');
    const owner=await c.owner();assert([signer.address,addresses.multisig].includes(owner),'Unexpected owner: '+key);
  }
  assert.equal(await contracts.registration.levelManager(),addresses.levelManager);
  assert.equal(await contracts.registration.id1Wallet(),addresses.id1Wallet);
  assert.equal(await contracts.levelManager.registration(),addresses.registration);
  assert.equal(await contracts.levelManager.settlementRouter(),addresses.settlementRouter);
  for(const key of ['escrow','p4Orbit','p12Orbit','p39Orbit'])assert.equal(await contracts[key].levelManager(),addresses.levelManager);
  for(const [key,c] of Object.entries(contracts)){
    if(await c.owner()===addresses.multisig){console.log('Ownership already complete:',key);continue;}
    const tx=await c.transferOwnership(addresses.multisig,{gasPrice:30000000000n});
    fs.appendFileSync(path.resolve(__dirname,'../deployments-staging/october-ownership.jsonl'),JSON.stringify({key,hash:tx.hash})+'\n');
    console.log('Ownership submitted:',key,tx.hash);
    let receipt;
    for(let i=0;i<90;i++){
      try{receipt=await ethers.provider.getTransactionReceipt(tx.hash);}catch{}
      if(receipt)break;await new Promise(resolve=>setTimeout(resolve,2000));
    }
    assert(receipt,'Unresolved ownership transaction; inspect journal before retry');assert.equal(receipt.status,1);
    assert.equal(await c.owner(),addresses.multisig);
  }
  const deploymentBlocks={NFTPoolVault:49054197,OperationsVault:49054201,FGTToken:49054210,FGTrToken:49054215,Escrow:49054626,Registration:49054631,TokenController:49054638,LevelManager:49054643,LevelSettlementRouter:49054648,P4Orbit:49054663,P12Orbit:49054668,P39Orbit:49054675};
  const report={network:'amoy',chainId:'80002',deployedAt:new Date().toISOString(),deployer:signer.address,multisig:addresses.multisig,guardian:addresses.guardian,addresses,contractAddresses:addresses,deploymentBlocks,finalBlockNumber:await ethers.provider.getBlockNumber(),status:'DEPLOYED_OWNERSHIP_VERIFIED_NOT_HOSTED',representativeRegistration:'PENDING_OWNER_SIGNATURES'};
  const file=path.resolve(__dirname,'../deployments-staging/deployment-october-20261001.json');fs.writeFileSync(file,JSON.stringify(report,null,2));console.log('Fresh staging ownership and core links verified:',file);
}
main().catch(error=>{console.error(error.message);process.exitCode=1;});

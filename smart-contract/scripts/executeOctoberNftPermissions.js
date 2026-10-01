const hre=require('hardhat');
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const {ethers}=hre;
const ff=require('../deployments-staging/deployment-october-20261001.json');
const plus=require('../deployments-freedom-plus-staging/deployment-1790884982975.json');
const file=path.resolve(__dirname,'../test-reports/october-nft-permissions.json');
const record=fs.existsSync(file)?JSON.parse(fs.readFileSync(file,'utf8')):{chainId:80002,transactions:{}};
const save=()=>fs.writeFileSync(file,JSON.stringify(record,null,2));
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const gas={gasPrice:30000000000n};
async function confirmed(label,submit){
  if(!record.transactions[label]){
    const tx=await submit();record.transactions[label]={hash:tx.hash};save();
    console.log('Submitted',label,tx.hash);
  }
  for(let i=0;i<120;i++){
    let receipt;try{receipt=await ethers.provider.getTransactionReceipt(record.transactions[label].hash);}catch{}
    if(receipt){assert.equal(receipt.status,1,label+' reverted');record.transactions[label].block=receipt.blockNumber;save();return receipt;}
    await sleep(2000);
  }
  throw Error('Unresolved receipt; preserve journal and inspect before resuming: '+label);
}
async function main(){
  assert.equal(hre.network.name,'amoy');assert.equal((await ethers.provider.getNetwork()).chainId,80002n);
  assert.equal(plus.fFreedomRegistration,ff.addresses.registration);
  const keys=JSON.parse(fs.readFileSync(path.resolve(__dirname,'../../env-files/staging-multisig.private.json'),'utf8'));
  const one=new ethers.Wallet(keys.owner1PrivateKey,ethers.provider);
  const two=new ethers.Wallet(keys.owner2PrivateKey,ethers.provider);
  const multi=await ethers.getContractAt('SimpleMultiSig',ff.multisig,one);
  assert(await multi.isOwner(one.address));assert(await multi.isOwner(two.address));
  assert.equal(await multi.requiredConfirmations(),2n);
  const fgt=await ethers.getContractAt('FGTToken',ff.addresses.fgt);
  const manager=await ethers.getContractAt('LevelManager',ff.addresses.levelManager);
  const membership=plus.contracts.FreedomNFTMembership.proxy;
  const vault=plus.contracts.FreedomNFTPoolVault.proxy;
  const operations=ff.addresses.operationsVault;
  assert.equal(await fgt.owner(),ff.multisig);assert.equal(await manager.owner(),ff.multisig);
  assert.equal(await manager.operationsWallet(),operations);
  const pending=[];
  async function queue(label,target,data){
    const receipt=await confirmed(label+'-submit',()=>multi.submitTransaction(target,0,data,gas));
    const event=receipt.logs.map(log=>{try{return multi.interface.parseLog(log);}catch{return null;}}).find(e=>e?.name==='Submit');
    assert(event);const id=event.args.txId;const proposal=await multi.transactions(id);
    assert.equal(proposal.to.toLowerCase(),target.toLowerCase());assert.equal(proposal.data,data);
    assert.equal(proposal.value,0n);assert.equal(proposal.cancelled,false);
    if(proposal.executed)return;
    if(!await multi.approved(id,one.address))await confirmed(label+'-approve1',()=>multi.approveTransaction(id,gas));
    if(!await multi.approved(id,two.address))await confirmed(label+'-approve2',()=>multi.connect(two).approveTransaction(id,gas));
    pending.push(async()=>{
      for(let i=0;i<180;i++){
        if(BigInt((await ethers.provider.getBlock('latest')).timestamp)>=proposal.executeAfter)break;
        if(i===179)throw Error('Timelock pending');await sleep(5000);
      }
      await confirmed(label+'-execute',()=>multi.executeTransaction(id,gas));
    });
  }
  if(!await fgt.authorizedOperators(membership)){
    assert.equal(await fgt.operatorConfigLocked(),false);
    await queue('authorize-nft-fgt',ff.addresses.fgt,fgt.interface.encodeFunctionData('setAuthorizedOperator',[membership,true]));
  }
  if(await manager.nftPool()!==vault)
    await queue('share-nft-pool',ff.addresses.levelManager,manager.interface.encodeFunctionData('updateChargeRecipients',[vault,operations]));
  for(const execute of pending)await execute();
  assert.equal(await fgt.authorizedOperators(membership),true);
  assert.equal(await manager.nftPool(),vault);assert.equal(await manager.operationsWallet(),operations);
  record.verdict='PASS';record.completedAt=new Date().toISOString();
  record.membership=membership;record.sharedNftPool=vault;record.preservedOperations=operations;save();
  console.log('NFT FGT authorization and shared pool verified; operations recipient preserved.');
}
main().catch(error=>{console.error(error.shortMessage||error.message);process.exitCode=1;});

const hre=require('hardhat');
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const {ethers,upgrades}=hre;
const proxy='0xaf6cC44C5B860BA076Ee703244edcaB0C806c27A';
const owner='0xD3f460AF3c6C9FAB8053ebF5eCdC1EdfC5de5f6A';
const previous='0xf72873d6233B5e3dfbA6D1D8058BF90E990902f0';
const replacement='0x0de1B6F15Fe8E5Cf7fbBA2cD4C576357Ececa962';
const file=path.resolve(__dirname,'../test-reports/october-representative-execution.json');
const state=fs.existsSync(file)?JSON.parse(fs.readFileSync(file,'utf8')):{chainId:80002,proxy,previous,replacement,transactions:{}};
const save=()=>fs.writeFileSync(file,JSON.stringify(state,null,2));
const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const gas={gasPrice:30000000000n};
async function confirmed(label,send){
  if(!state.transactions[label]){
    const tx=await send();
    state.transactions[label]={hash:tx.hash};save();
    console.log('Submitted',label,tx.hash);
  }
  const row=state.transactions[label];
  for(let i=0;i<120;i++){
    let receipt;
    try{receipt=await ethers.provider.getTransactionReceipt(row.hash);}catch{}
    if(receipt){assert.equal(receipt.status,1,'Transaction reverted: '+label);row.block=receipt.blockNumber;save();return receipt;}
    await delay(2000);
  }
  throw Error('Receipt pending; resume this script without deleting its journal: '+label);
}
async function main(){
  assert.equal(hre.network.name,'amoy');assert.equal((await ethers.provider.getNetwork()).chainId,80002n);
  assert.equal(state.proxy,proxy);assert.equal(state.replacement,replacement);
  const factory=await ethers.getContractFactory('OctoberStagingRepresentativeReplacement');
  await upgrades.validateUpgrade(await ethers.getContractFactory('LevelManager'),factory,{kind:'uups'});
  const manager=await ethers.getContractAt('LevelManager',proxy);
  assert.equal(await manager.owner(),owner);
  assert.equal(await manager.registration(),'0xC5750BfA5b4Dd888e55420911b58CB57539aEb90');
  const registration=await ethers.getContractAt('RegistrationFixed',await manager.registration());
  const guardian=await ethers.getContractAt('Guardian',await manager.guardian());
  assert.equal(await guardian.getAddress(),'0x52F22c1e396dF20c2078B4a86b4A0ac3b51a9911');
  assert.equal(await guardian.owner(),owner);
  const keys=JSON.parse(fs.readFileSync(path.resolve(__dirname,'../../env-files/staging-multisig.private.json'),'utf8'));
  const signer1=new ethers.Wallet(keys.owner1PrivateKey,ethers.provider);
  const signer2=new ethers.Wallet(keys.owner2PrivateKey,ethers.provider);
  const multisig=await ethers.getContractAt('SimpleMultiSig',owner,signer1);
  assert(await multisig.isOwner(signer1.address));assert(await multisig.isOwner(signer2.address));
  assert.equal(await multisig.requiredConfirmations(),2n);
  if(!state.before){
    assert.equal(await registration.isRegistered(previous),false,'Old representative already registered: stop');
    assert.equal(await registration.isRegistered(replacement),false,'Replacement already registered: stop');
    assert.equal(await manager.founderRepWallets(2),previous);
    state.before={implementation:await upgrades.erc1967.getImplementationAddress(proxy),representatives:[]};
    for(let i=0;i<3;i++){
      const address=await manager.founderRepWallets(i);
      state.before.representatives.push({address,registered:await registration.isRegistered(address),
        sponsor:await registration.getReferrer(address),active:await registration.isLevelActivated(address,1)});
    }
    save();
  }
  if(!state.implementation){
    const receipt=await confirmed('deploy-implementation',()=>factory.deploy(gas).then(c=>c.deploymentTransaction()));
    state.implementation=receipt.contractAddress;save();
  }
  const pending=[];
  async function govern(label,target,data){
    const receipt=await confirmed(label+'-submit',()=>multisig.submitTransaction(target,0,data,gas));
    const event=receipt.logs.map(log=>{try{return multisig.interface.parseLog(log);}catch{return null;}}).find(e=>e?.name==='Submit');
    assert(event,'Missing proposal ID');const txId=event.args.txId;
    const proposal=await multisig.transactions(txId);
    assert.equal(proposal.to.toLowerCase(),target.toLowerCase());assert.equal(proposal.data,data);
    assert.equal(proposal.value,0n);assert.equal(proposal.cancelled,false);
    if(proposal.executed)return;
    if(!await multisig.approved(txId,signer1.address))
      await confirmed(label+'-approve1',()=>multisig.approveTransaction(txId,gas));
    if(!await multisig.approved(txId,signer2.address))
      await confirmed(label+'-approve2',()=>multisig.connect(signer2).approveTransaction(txId,gas));
    pending.push(async()=>{
    for(let i=0;i<180;i++){
      const block=await ethers.provider.getBlock('latest');
      if(BigInt(block.timestamp)>=proposal.executeAfter)break;
      if(i===179)throw Error('Timelock still pending; resume later');
      await delay(5000);
    }
    await confirmed(label+'-execute',()=>multisig.executeTransaction(txId,gas));
    });
  }
  if(!await guardian.approvedProxies(proxy))
    await govern('approve-proxy',await guardian.getAddress(),guardian.interface.encodeFunctionData('setApprovedProxy',[proxy,true]));
  if(!await guardian.approvedImplementations(proxy,state.implementation))
    await govern('approve-implementation',await guardian.getAddress(),guardian.interface.encodeFunctionData('setApprovedImplementation',[proxy,state.implementation,true]));
  if(!await guardian.approvedImplementations(proxy,state.before.implementation))
    await govern('approve-restore',await guardian.getAddress(),guardian.interface.encodeFunctionData('setApprovedImplementation',[proxy,state.before.implementation,true]));
  if(!await manager.founderRepresentative(replacement)){
    const migration=factory.interface.encodeFunctionData('replaceUnusedStagingRepresentative',[state.before.implementation]);
    await govern('replace',proxy,manager.interface.encodeFunctionData('upgradeToAndCall',[state.implementation,migration]));
  }
  // Proposal timelocks run concurrently, but execution preserves dependency order.
  for(const execute of pending)await execute();
  assert.equal((await upgrades.erc1967.getImplementationAddress(proxy)).toLowerCase(),state.before.implementation.toLowerCase());
  assert.equal(await manager.founderRepresentative(previous),false);
  assert.equal(await manager.founderRepresentative(replacement),true);
  assert.equal(await manager.founderRepWallets(2),replacement);
  await assert.rejects(manager.founderRepWallets(3));
  for(const [i,row] of state.before.representatives.slice(0,2).entries()){
    assert.equal(await manager.founderRepWallets(i),row.address);
    assert.equal(await registration.isRegistered(row.address),row.registered);
    assert.equal(await registration.getReferrer(row.address),row.sponsor);
    assert.equal(await registration.isLevelActivated(row.address,1),row.active);
  }
  const transaction={from:replacement,to:await registration.getAddress(),data:registration.interface.encodeFunctionData('register',[owner])};
  if(!await registration.isRegistered(replacement))state.registrationGas=(await ethers.provider.estimateGas(transaction)).toString();
  state.verdict='PASS';state.completedAt=new Date().toISOString();save();
  console.log('Replacement verified: exactly three representatives; first two preserved; mainnet untouched.');
}
main().catch(error=>{console.error(error.shortMessage||error.message);process.exitCode=1;});

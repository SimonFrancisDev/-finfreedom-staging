const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {parse}=require('../backend/node_modules/dotenv');
const f=require('../smart-contract/deployments-staging/deployment-october-20261001.json');
const p=require('../smart-contract/deployments-freedom-plus-staging/deployment-1790884982975.json');
assert.equal(String(f.chainId),'80002');assert.equal(String(p.chainId),'80002');
assert.equal(p.fFreedomRegistration,f.addresses.registration);
const a=f.addresses,b=f.deploymentBlocks,proxy=name=>p.contracts[name].proxy;
const backend={
 CHAIN_ID:'80002',USDT_ADDRESS:a.usdt,REGISTRATION_ADDRESS:a.registration,LEVEL_MANAGER_ADDRESS:a.levelManager,
 LEVEL_SETTLEMENT_ROUTER_ADDRESS:a.settlementRouter,ESCROW_ADDRESS:a.escrow,
 P4_ORBIT_ADDRESS:a.p4Orbit,P12_ORBIT_ADDRESS:a.p12Orbit,P39_ORBIT_ADDRESS:a.p39Orbit,
 FGT_TOKEN_ADDRESS:a.fgt,FGTR_TOKEN_ADDRESS:a.fgtr,FREEDOM_TOKEN_CONTROLLER_ADDRESS:a.tokenController,
 MULTISIG_ADDRESS:a.multisig,GUARDIAN_ADDRESS:a.guardian,
 NFT_POOL_VAULT_ADDRESS:proxy('FreedomNFTPoolVault'),OPERATIONS_VAULT_ADDRESS:a.operationsVault,
 START_BLOCK:String(Math.min(...Object.values(b))),START_BLOCK_REGISTRATION:String(b.Registration),
 START_BLOCK_LEVEL_MANAGER:String(b.LevelManager),START_BLOCK_LEVEL_SETTLEMENT_ROUTER:String(b.LevelSettlementRouter),
 START_BLOCK_ESCROW:String(b.Escrow),START_BLOCK_AUTO_UPGRADE_ESCROW:String(b.Escrow),
 START_BLOCK_FGT_TOKEN:String(b.FGTToken),START_BLOCK_FGTR_TOKEN:String(b.FGTrToken),
 START_BLOCK_P4_ORBIT:String(b.P4Orbit),START_BLOCK_P12_ORBIT:String(b.P12Orbit),START_BLOCK_P39_ORBIT:String(b.P39Orbit),
 START_BLOCK_NFT_POOL_VAULT:String(p.contracts.FreedomNFTPoolVault.deploymentBlock),
 START_BLOCK_OPERATIONS_VAULT:String(b.OperationsVault),
 FREEDOM_PLUS_ENABLED:'true',FREEDOM_PLUS_START_BLOCK:String(p.contracts.FPTToken.deploymentBlock),
 FREEDOM_PLUS_REGISTRATION_ADDRESS:proxy('FreedomPlusRegistration'),
 FREEDOM_PLUS_LEVEL_MANAGER_ADDRESS:proxy('FreedomPlusLevelManager'),
 FREEDOM_PLUS_SETTLEMENT_ROUTER_ADDRESS:proxy('FreedomPlusSettlementRouter'),
 FREEDOM_PLUS_FPT_ADDRESS:proxy('FPTToken'),FREEDOM_PLUS_FPTR_ADDRESS:proxy('FPTrToken'),
 FREEDOM_PLUS_TOKEN_CONTROLLER_ADDRESS:proxy('FreedomPlusTokenController'),
 FREEDOM_NFT_MEMBERSHIP_ADDRESS:proxy('FreedomNFTMembership'),
 FREEDOM_NFT_REWARD_DISTRIBUTOR_ADDRESS:proxy('FreedomNFTRewardDistributor'),
 FREEDOM_NFT_POOL_VAULT_ADDRESS:proxy('FreedomNFTPoolVault'),
 FREEDOM_PLUS_OPERATIONS_VAULT_ADDRESS:proxy('FreedomPlusOperationsVault'),
 NFT_REWARD_FIRST_PERIOD:'202611',RPC_MAX_RPS:'6',
};
for(const n of ['39','14','12','6','4','3'])backend['FREEDOM_PLUS_P'+n+'_ORBIT_ADDRESS']=proxy('P'+n+'PlusOrbit');
const frontend={VITE_CHAIN_ID:'80002',VITE_FREEDOM_PLUS_ENABLED:'true',VITE_SYSTEM_WALLET:a.id1Wallet};
for(const [k,v] of Object.entries(backend))if(k.endsWith('_ADDRESS')&&!k.startsWith('FREEDOM_NFT_'))frontend['VITE_'+k]=v;
Object.assign(frontend,{VITE_LEVELMANAGER_ADDRESS:a.levelManager,
 VITE_NFT_POOL_ADDRESS:backend.NFT_POOL_VAULT_ADDRESS,VITE_OPERATIONS_WALLET_ADDRESS:a.operationsVault,
 VITE_FREEDOM_PLUS_NFT_MEMBERSHIP_ADDRESS:backend.FREEDOM_NFT_MEMBERSHIP_ADDRESS,
 VITE_FREEDOM_PLUS_NFT_REWARD_DISTRIBUTOR_ADDRESS:backend.FREEDOM_NFT_REWARD_DISTRIBUTOR_ADDRESS});
const root=path.resolve(__dirname,'..'),backupDir=path.join(root,'backend/backups');
const reportFile=path.join(root,'smart-contract/test-reports/october-cloud-cutover.json');
const report=fs.existsSync(reportFile)?JSON.parse(fs.readFileSync(reportFile,'utf8')):{chainId:80002};
const save=()=>fs.writeFileSync(reportFile,JSON.stringify(report,null,2));
async function request(url,token,method='GET',body){
 const response=await fetch(url,{method,headers:{Authorization:'Bearer '+token,'Content-Type':'application/json'},
   body:body===undefined?undefined:JSON.stringify(body),signal:AbortSignal.timeout(30000)});
 if(!response.ok)throw Error('Cloud request failed '+response.status+' '+new URL(url).pathname);
 const text=await response.text();return text?JSON.parse(text):null;
}
function writeEnv(relative,values){
 const file=path.join(root,relative),current=fs.existsSync(file)?parse(fs.readFileSync(file)): {};
 Object.assign(current,values);
 fs.writeFileSync(file,Object.entries(current).map(([k,v])=>k+'='+JSON.stringify(String(v))).join('\n')+'\n');
}
async function main(){
 const mode=process.argv[2];assert(['prepare','render','vercel'].includes(mode));
 fs.mkdirSync(backupDir,{recursive:true});
 fs.writeFileSync(path.join(root,'smart-contract/test-reports/october-cutover-addresses.json'),JSON.stringify({backend,frontend},null,2));
 if(mode==='prepare'){
   writeEnv('backend/.env',backend);
   writeEnv('frontend/.env',frontend);
   for(const role of ['api','worker'])writeEnv('env-files/render-staging-'+role+'.runtime.env',backend);
   writeEnv('env-files/vercel-staging-frontend.runtime.env',frontend);
   console.log('Prepared public contract mappings and local mirrors');return;
 }
 if(mode==='render'){
   const token=process.env.RENDER_API_KEY_TEMP;assert(token,'Render token required');
   for(const [role,id] of [['api','srv-d8h37kj7uimc73cg3750'],['worker','srv-d8h3bptdt1ts73fuc7eg']]){
     const base='https://api.render.com/v1/services/'+id;
     const service=await request(base,token);
     assert.equal(service.repo,'https://github.com/SimonFrancisDev/-finfreedom-staging');
     assert.equal(service.suspended,'suspended');
     async function readEnv(){
       const rows=[];let cursor='';
       for(;;){const page=await request(base+'/env-vars?limit=100'+(cursor?'&cursor='+encodeURIComponent(cursor):''),token);
         rows.push(...page.map(row=>row.envVar));if(page.length<100)break;cursor=page.at(-1).cursor;assert(cursor);}
       return Object.fromEntries(rows.map(row=>[row.key,row.value]));
     }
     const before=await readEnv(),backup=path.join(backupDir,'october-render-'+role+'.private.json');
     if(!fs.existsSync(backup))fs.writeFileSync(backup,JSON.stringify(before,null,2));
     const values={...backend,RPC_MAX_RPS:role==='worker'?'6':'3',
       RUN_INDEXER:String(role==='worker'),NFT_AUTO_DISTRIBUTION_ENABLED:'false'};
     for(const [key,value] of Object.entries(values)){
       if(before[key]!==value)await request(base+'/env-vars/'+encodeURIComponent(key),token,'PUT',{value});
     }
     const after=await readEnv();
     for(const [key,value] of Object.entries(values))if(after[key]!==value)throw Error('Readback mismatch: '+key);
     report[role]={id,verifiedKeys:Object.keys(values),at:new Date().toISOString()};save();
     console.log(role+' staging variables updated and verified: '+Object.keys(values).length);
   }
 }else{
   const project='prj_82BQtIqkebJdub7s650N2m7QWn3A',team='team_98GZDS2nGxNAiC4mCAnbtonb';
   const auth=JSON.parse(fs.readFileSync(path.join(process.env.APPDATA,'com.vercel.cli/Data/auth.json')));
   const base='https://api.vercel.com/v10/projects/'+project;
   const info=await request('https://api.vercel.com/v9/projects/'+project+'?teamId='+team,auth.token);
   assert.equal(info.name,'finfreedom-staging');
   const before=await request(base+'/env?teamId='+team,auth.token);
   const backup=path.join(backupDir,'october-vercel.private.json');
   if(!fs.existsSync(backup))fs.writeFileSync(backup,JSON.stringify(before,null,2));
   const result=await request(base+'/env?teamId='+team+'&upsert=true',auth.token,'POST',
     Object.entries(frontend).map(([key,value])=>({key,value,type:'plain',target:['production','preview']})));
   assert(!result.failed?.length,'Some Vercel variables failed');
   const initial=await request(base+'/env?teamId='+team,auth.token);
   for(const [key,value] of Object.entries(frontend)){
     const entries=initial.envs.filter(e=>e.key===key&&!e.gitBranch);
     const current=entries.find(e=>e.value===value&&['production','preview'].every(scope=>e.target.includes(scope)));
     assert(current,'Missing replacement variable '+key);
     for(const entry of entries.filter(e=>e.id!==current.id&&e.target.some(scope=>['production','preview'].includes(scope)))){
       assert(entry.target.every(scope=>['production','preview'].includes(scope))&&!entry.customEnvironmentIds?.length,
         'Mixed-scope duplicate requires preserving other environments: '+key);
       await request('https://api.vercel.com/v9/projects/'+project+'/env/'+entry.id+'?teamId='+team,auth.token,'DELETE');
     }
   }
   const after=await request(base+'/env?teamId='+team,auth.token);
   for(const [key,value] of Object.entries(frontend))for(const scope of ['production','preview']){
     const matches=after.envs.filter(e=>e.key===key&&!e.gitBranch&&e.target.includes(scope));
     assert.equal(matches.length,1,'Duplicate effective variable '+key+' '+scope);
     const found=matches[0];
     assert(found,'Missing Vercel variable '+key+' '+scope);assert.equal(found.value,value,'Readback mismatch: '+key);
   }
   report.vercel={project,verifiedKeys:Object.keys(frontend),scopes:['production','preview'],at:new Date().toISOString()};save();
   console.log('Staging Vercel public variables updated and verified: '+Object.keys(frontend).length);
 }
}
main().catch(e=>{console.error(e.message);process.exitCode=1;});

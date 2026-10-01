const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const source = fs.readFileSync('frontend/public/staging-representative-setup.html', 'utf8').match(/<script>([\s\S]*?)<\/script>/)[1];
const id1 = '0xd3f460af3c6c9fab8053ebf5ecdc1edfc5de5f6a';
const wallet = '0xdd78425335c0c698615845d94f9fee7492266396';
const word = value => value.replace(/^0x/, '').padStart(64, '0');
function setup(options = {}) {
  const elements = {};
  const calls = [];
  let registered = Boolean(options.registered);
  const provider = { on() {}, async request(request) {
    calls.push(request);
    switch (request.method) {
      case 'eth_requestAccounts': case 'eth_accounts': return [options.wallet || wallet];
      case 'wallet_switchEthereumChain': return null;
      case 'eth_chainId': return options.chain || '0x13882';
      case 'eth_getBlockByNumber':
        if(options.rpcUnavailable)throw Error('RPC endpoint not found or unavailable.');
        return options.legacy?{}:{baseFeePerGas:'0x3b9aca00'};
      case 'eth_maxPriorityFeePerGas':
        if(options.tipUnsupported)throw Object.assign(Error('Unsupported method'),{code:-32601});
        return options.tip || '0x59682f00';
      case 'eth_gasPrice': return options.gasPrice || '0x59682f00';
      case 'eth_call': {
        const data = request.params[0].data;
        if (data.startsWith('0xc8e33990')) return '0x' + word(options.id1 || id1);
        if (data.startsWith('0xc3c5a547')) return '0x' + word(registered ? '1' : '0');
        if (data.startsWith('0x4a9fefc7')) return '0x' + word(options.sponsor || id1);
        if (data.startsWith('0xe79738ea')) return '0x' + word('1');
        throw Error('Unexpected read');
      }
      case 'eth_estimateGas': return '0x50000';
      case 'eth_sendTransaction': registered = true; return '0x' + 'a'.repeat(64);
      case 'eth_getTransactionReceipt': return { status: '0x1' };
      default: throw Error('Unexpected request: ' + request.method);
    }
  } };
  const context = vm.createContext({ document: { getElementById(id) { return elements[id] ||= {}; } },
    location: { hostname: options.host || 'finfreedom-staging.vercel.app' }, window: { ethereum: provider },
    setTimeout(callback) { callback(); } });
  vm.runInContext(source, context);
  return { elements, calls };
}
test('signs only the expected Amoy registration with ID1 and zero value', async () => {
  const { elements, calls } = setup();
  await elements.connect.onclick(); assert.equal(elements.register.disabled, false);
  await elements.register.onclick();
  const sent = calls.find(x => x.method === 'eth_sendTransaction').params[0];
  assert.equal(sent.chainId, '0x13882'); assert.equal(sent.value, '0x0');
  assert.equal(sent.to, '0xc5750bfa5b4dd888e55420911b58cb57539aeb90');
  assert.equal(sent.data, '0x4420e486' + word(id1));
  assert.equal(BigInt(sent.maxPriorityFeePerGas),30000000000n);
  assert.equal(BigInt(sent.maxFeePerGas),32000000000n);
  assert.equal(BigInt(sent.gas),(0x50000n*120n+99n)/100n);
  assert.equal(sent.gasPrice,undefined);
  assert.match(elements.status.textContent, /Confirmed/);
});

for(const [name,options,tip] of [
  ['higher live priority fee',{tip:'0xba43b7400'},50000000000n],
  ['unsupported priority RPC',{tipUnsupported:true},30000000000n],
]){
  test(name,async()=>{
    const {elements,calls}=setup(options);
    await elements.connect.onclick();await elements.register.onclick();
    const tx=calls.find(x=>x.method==='eth_sendTransaction').params[0];
    assert.equal(BigInt(tx.maxPriorityFeePerGas),tip);
    assert.equal(BigInt(tx.maxFeePerGas),tip+2000000000n);
  });
}
test('legacy fees retain the floor without mixing EIP1559 fields',async()=>{
  const {elements,calls}=setup({legacy:true});
  await elements.connect.onclick();await elements.register.onclick();
  const tx=calls.find(x=>x.method==='eth_sendTransaction').params[0];
  assert.equal(BigInt(tx.gasPrice),30000000000n);
  assert.equal(tx.maxFeePerGas,undefined);assert.equal(tx.maxPriorityFeePerGas,undefined);
});
test('unavailable RPC never submits a transaction',async()=>{
  const {elements,calls}=setup({rpcUnavailable:true});
  await elements.connect.onclick();await elements.register.onclick();
  assert.equal(calls.some(x=>x.method==='eth_sendTransaction'),false);
  assert.match(elements.status.textContent,/RPC endpoint/);
});
for (const [name, options] of Object.entries({ wrongNetwork: { chain: '0x89' }, wrongWallet: { wallet: id1 },
  retiredRepresentative: {wallet:'0xf72873d6233b5e3dfba6d1d8058bf90e990902f0'},
  wrongContractID1: { id1: wallet }, wrongHost: { host: 'production.example' }, conflictingSponsor: { registered: true, sponsor: wallet } })) {
  test('blocks ' + name, async () => {
    const { elements, calls } = setup(options); await elements.connect.onclick();
    assert.equal(elements.register.disabled, true);
    assert.equal(calls.some(x => x.method === 'eth_sendTransaction'), false);
  });
}
test('already registered under ID1 does not prompt another payment', async () => {
  const { elements, calls } = setup({ registered: true }); await elements.connect.onclick();
  assert.match(elements.status.textContent, /Confirmed/);
  assert.equal(elements.register.disabled, true); assert.equal(calls.some(x => x.method === 'eth_sendTransaction'), false);
});

test('replacement representative can sign the exact ID1 registration', async () => {
  const replacement='0x0de1b6f15fe8e5cf7fbba2cd4c576357ececa962';
  const {elements,calls}=setup({wallet:replacement});
  await elements.connect.onclick();
  assert.equal(elements.register.disabled,false);
  await elements.register.onclick();
  const sent=calls.find(x=>x.method==='eth_sendTransaction').params[0];
  assert.equal(sent.from,replacement);
  assert.equal(sent.data,'0x4420e486'+word(id1));
  assert.equal(sent.chainId,'0x13882');
  assert.equal(sent.value,'0x0');
});

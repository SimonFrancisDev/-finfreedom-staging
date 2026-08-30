import mongoose from 'mongoose';
import { Interface } from 'ethers';
import { connectDB } from '../src/config/db.js';
import { getContracts } from '../src/blockchain/contracts.js';
import { getFreedomPlusContractEntries } from '../src/blockchain/freedomPlusContracts.js';
import FreedomPlusEvent from '../src/models/FreedomPlusEvent.js';
import FreedomPlusPayment from '../src/models/FreedomPlusPayment.js';
import FreedomPlusLedgerEntry from '../src/models/FreedomPlusLedgerEntry.js';
import FreedomPlusPosition from '../src/models/FreedomPlusPosition.js';

const hashes = process.argv.slice(2).map((value) => value.toLowerCase());
if (hashes.length !== 2) throw new Error('Pass the F-Freedom and Freedom-Plus transaction hashes');

const base = getContracts();
const known = new Map();
for (const [key, contract] of Object.entries(base)) {
  if (!contract?.target || !contract?.interface) continue;
  known.set(String(contract.target).toLowerCase(), { program: 'f-freedom', key, interface: contract.interface });
}
for (const [key, contract] of getFreedomPlusContractEntries(base.provider)) {
  known.set(String(contract.target).toLowerCase(), { program: 'freedom-plus', key, interface: contract.interface });
}
const erc20 = new Interface([
  'event Transfer(address indexed from,address indexed to,uint256 value)',
  'event Approval(address indexed owner,address indexed spender,uint256 value)',
]);

function values(parsed) {
  return Object.fromEntries(parsed.fragment.inputs.map((input, index) => [
    input.name || String(index),
    typeof parsed.args[index] === 'bigint' ? parsed.args[index].toString() : parsed.args[index],
  ]));
}

const reports = [];
for (const hash of hashes) {
  const tx = await base.provider.getTransaction(hash);
  const receipt = await base.provider.getTransactionReceipt(hash);
  if (!tx || !receipt) throw new Error('Transaction not found: ' + hash);
  const logs = receipt.logs.map((log) => {
    const specification = known.get(log.address.toLowerCase());
    let parsed = null;
    let source = specification ? specification.program + ':' + specification.key : 'unknown';
    if (specification) {
      try { parsed = specification.interface.parseLog(log); } catch {}
    }
    if (!parsed) {
      try { parsed = erc20.parseLog(log); source = 'erc20:' + log.address.toLowerCase(); } catch {}
    }
    return {
      logIndex: log.index,
      address: log.address,
      source,
      event: parsed?.name || 'UNKNOWN',
      args: parsed ? values(parsed) : {},
    };
  });
  reports.push({
    hash,
    status: receipt.status,
    blockNumber: receipt.blockNumber,
    from: tx.from,
    to: tx.to,
    value: tx.value.toString(),
    gasUsed: receipt.gasUsed.toString(),
    logs,
  });
}

await connectDB();
const indexed = {};
for (const hash of hashes) {
  indexed[hash] = {
    events: await FreedomPlusEvent.find({ txHash: hash }).sort({ logIndex: 1 }).lean(),
    payments: await FreedomPlusPayment.find({ txHash: hash }).lean(),
    ledger: await FreedomPlusLedgerEntry.find({ txHash: hash }).lean(),
    positions: await FreedomPlusPosition.find({ txHash: hash }).lean(),
  };
}
console.log(JSON.stringify({ reports, freedomPlusIndexed: indexed }, (_, value) =>
  typeof value === 'bigint' ? value.toString() : value, 2));
await mongoose.disconnect();

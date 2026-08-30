import mongoose from 'mongoose';
import { connectDB } from '../src/config/db.js';
import A from '../src/models/IndexedActivationSummary.js';
import R from '../src/models/IndexedReceipt.js';
import F from '../src/models/IndexedFinancialEvent.js';
import O from '../src/models/IndexedOrbitEvent.js';
import E from '../src/models/FreedomPlusEvent.js';
import P from '../src/models/FreedomPlusPayment.js';
import L from '../src/models/FreedomPlusLedgerEntry.js';
import X from '../src/models/FreedomPlusPosition.js';

const [ff, fp] = process.argv.slice(2).map((value) => value.toLowerCase());
await connectDB();
const select = '-_id -__v -createdAt -updatedAt';
const report = {
  fFreedom: {
    activations: await A.find({ txHash: ff }).select(select).lean(),
    receipts: await R.find({ txHash: ff }).select(select).sort({ logIndex: 1 }).lean(),
    financial: await F.find({ txHash: ff }).select(select).sort({ logIndex: 1 }).lean(),
    orbit: await O.find({ txHash: ff }).select(select).sort({ logIndex: 1 }).lean(),
  },
  freedomPlus: {
    events: await E.find({ txHash: fp }).select('contractKey eventName logIndex blockNumber activationId args addresses -_id').sort({ logIndex: 1 }).lean(),
    payments: await P.find({ txHash: fp }).select(select).sort({ role: 1 }).lean(),
    ledger: await L.find({ txHash: fp }).select(select).sort({ logIndex: 1 }).lean(),
    positions: await X.find({ txHash: fp }).select(select).sort({ position: 1 }).lean(),
  },
};
console.log(JSON.stringify(report, null, 2));
await mongoose.disconnect();

import mongoose from 'mongoose';
import { connectDB } from '../src/config/db.js';
import FreedomPlusEvent from '../src/models/FreedomPlusEvent.js';
import FreedomPlusLedgerEntry from '../src/models/FreedomPlusLedgerEntry.js';
import FreedomPlusLevelState from '../src/models/FreedomPlusLevelState.js';
import FreedomPlusParticipant from '../src/models/FreedomPlusParticipant.js';
import FreedomPlusPayment from '../src/models/FreedomPlusPayment.js';
import FreedomPlusPosition from '../src/models/FreedomPlusPosition.js';
import FreedomPlusRewardSnapshot from '../src/models/FreedomPlusRewardSnapshot.js';
import FreedomPlusSyncState from '../src/models/FreedomPlusSyncState.js';

const EXPECTED_DEPLOYMENT = '1787395200929';
const models = [
  FreedomPlusEvent,
  FreedomPlusLedgerEntry,
  FreedomPlusLevelState,
  FreedomPlusParticipant,
  FreedomPlusPayment,
  FreedomPlusPosition,
  FreedomPlusRewardSnapshot,
  FreedomPlusSyncState,
];

async function main() {
  await connectDB();
  const before = Object.fromEntries(await Promise.all(models.map(async (model) => [
    model.collection.collectionName,
    await model.countDocuments(),
  ])));

  console.log(JSON.stringify({ deployment: EXPECTED_DEPLOYMENT, before }, null, 2));

  if (process.env.CONFIRM_FREEDOM_PLUS_RESET !== EXPECTED_DEPLOYMENT) {
    console.log(`Dry run only. Set CONFIRM_FREEDOM_PLUS_RESET=${EXPECTED_DEPLOYMENT} to clear these Freedom-Plus projections.`);
    return;
  }

  const deleted = Object.fromEntries(await Promise.all(models.map(async (model) => {
    const result = await model.deleteMany({});
    return [model.collection.collectionName, result.deletedCount];
  })));
  console.log(JSON.stringify({ reset: true, deployment: EXPECTED_DEPLOYMENT, deleted }, null, 2));
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => mongoose.disconnect());

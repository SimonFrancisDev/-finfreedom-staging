import mongoose from 'mongoose';
import env from '../src/config/env.js';
import { connectDB } from '../src/config/db.js';
import FreedomPlusEvent from '../src/models/FreedomPlusEvent.js';
import FreedomPlusLedgerEntry from '../src/models/FreedomPlusLedgerEntry.js';
import FreedomPlusLevelState from '../src/models/FreedomPlusLevelState.js';
import FreedomPlusParticipant from '../src/models/FreedomPlusParticipant.js';
import FreedomPlusPayment from '../src/models/FreedomPlusPayment.js';
import FreedomPlusPosition from '../src/models/FreedomPlusPosition.js';
import FreedomPlusRewardSnapshot from '../src/models/FreedomPlusRewardSnapshot.js';
import FreedomPlusSyncState from '../src/models/FreedomPlusSyncState.js';

const EXPECTED_DATABASE = 'finfreedom-staging';
const EXPECTED_CHAIN_ID = 80002;
const EXPECTED_DEPLOYMENT = '1788028241010';
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

async function counts() {
  return Object.fromEntries(await Promise.all(models.map(async (model) => [
    model.collection.collectionName,
    await model.countDocuments(),
  ])));
}

async function main() {
  await connectDB();
  const database = mongoose.connection.db.databaseName;
  const chainId = Number(env.CHAIN_ID);
  const before = await counts();
  console.log(JSON.stringify({ deployment: EXPECTED_DEPLOYMENT, database, chainId, before }, null, 2));

  if (database !== EXPECTED_DATABASE || chainId !== EXPECTED_CHAIN_ID) {
    throw new Error(`Refusing reset for database=${database}, chainId=${chainId}`);
  }
  if (process.env.CONFIRM_FREEDOM_PLUS_RESET !== EXPECTED_DEPLOYMENT) {
    console.log(`Dry run only. Set CONFIRM_FREEDOM_PLUS_RESET=${EXPECTED_DEPLOYMENT} after completing the runbook preconditions.`);
    return;
  }
  if (process.env.API_AND_WORKER_SUSPENDED !== 'true') {
    throw new Error('Set API_AND_WORKER_SUSPENDED=true only after both staging services are suspended');
  }

  const deleted = {};
  for (const model of models) {
    const result = await model.deleteMany({});
    deleted[model.collection.collectionName] = result.deletedCount;
  }

  const after = await counts();
  const nonEmpty = Object.entries(after).filter(([, count]) => count !== 0);
  if (nonEmpty.length) throw new Error('Freedom-Plus reset verification failed: ' + JSON.stringify(nonEmpty));
  console.log(JSON.stringify({ reset: true, deployment: EXPECTED_DEPLOYMENT, deleted, after }, null, 2));
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => mongoose.disconnect());

import mongoose from 'mongoose';
import env from '../src/config/env.js';
import { connectDB } from '../src/config/db.js';

const EXPECTED_CHAIN_ID = 80002;
const EXPECTED_DATABASE = 'finfreedom-staging';
const CONFIRMATION = `${EXPECTED_DATABASE}:${EXPECTED_CHAIN_ID}:DROP`;

async function collectionInventory(db) {
  const collections = await db.listCollections({}, { nameOnly: true }).toArray();
  const rows = await Promise.all(collections.map(async ({ name }) => ({
    name,
    documents: await db.collection(name).estimatedDocumentCount(),
  })));
  return rows.sort((left, right) => left.name.localeCompare(right.name));
}

async function main() {
  await connectDB();
  const db = mongoose.connection.db;
  const database = db.databaseName;
  const chainId = Number(env.CHAIN_ID);
  const before = await collectionInventory(db);

  console.log(JSON.stringify({ database, chainId, collections: before }, null, 2));

  if (database !== EXPECTED_DATABASE || chainId !== EXPECTED_CHAIN_ID) {
    throw new Error(`Refusing reset for database=${database}, chainId=${chainId}`);
  }

  if (process.env.CONFIRM_FULL_STAGING_RESET !== CONFIRMATION) {
    console.log(`Dry run only. Set CONFIRM_FULL_STAGING_RESET=${CONFIRMATION} after completing the runbook preconditions.`);
    return;
  }

  if (process.env.API_AND_WORKER_SUSPENDED !== 'true') {
    throw new Error('Set API_AND_WORKER_SUSPENDED=true only after both staging services are suspended');
  }

  let mode = 'dropDatabase';
  let result;

  try {
    result = await db.dropDatabase();
  } catch (error) {
    const cannotDropDatabase = error?.code === 8000 && /dropDatabase/i.test(error?.message || '');
    if (!cannotDropDatabase) throw error;

    mode = 'deleteMany';
    result = {};
    for (const { name } of before) {
      const deletion = await db.collection(name).deleteMany({});
      result[name] = deletion.deletedCount;
    }
  }

  const after = await collectionInventory(db);
  const nonEmptyCollections = after.filter(({ documents }) => documents !== 0);
  if (nonEmptyCollections.length) {
    throw new Error('Reset verification failed: ' + JSON.stringify(nonEmptyCollections));
  }

  console.log(JSON.stringify({ reset: true, mode, database, chainId, result, remainingCollections: after }, null, 2));
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => mongoose.disconnect());
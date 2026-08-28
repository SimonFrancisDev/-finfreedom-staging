import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

const indexerSource = await readFile(
  new URL('../src/services/freedomPlusIndexerService.js', import.meta.url),
  'utf8'
);
const querySource = await readFile(
  new URL('../src/services/read/freedomPlusQueryService.js', import.meta.url),
  'utf8'
);

function functionBody(source, name) {
  const start = source.indexOf(`async function ${name}(`);
  assert.notEqual(start, -1, `${name} must exist`);
  const next = source.indexOf('\nasync function ', start + 1);
  return source.slice(start, next === -1 ? source.length : next);
}

test('realtime indexing does not start a periodic HTTP recovery scan', () => {
  const polling = functionBody(indexerSource, 'startFreedomPlusIndexer');
  const realtime = functionBody(indexerSource, 'startFreedomPlusRealtimeIndexer');

  assert.match(polling, /setInterval\(scheduledPass, env\.SYNC_POLL_INTERVAL_MS\)/);
  assert.doesNotMatch(realtime, /setInterval|SYNC_POLL_INTERVAL_MS/);
  assert.match(realtime, /startup-event-confirmation-reconnect/);
});

test('realtime reconciliation accepts quiet checkpoints at the latest indexed event', () => {
  assert.match(
    querySource,
    /requiredCheckpointBlock = realtimeMode \? latestEventBlock : checkpointFloor/
  );
  assert.match(
    querySource,
    /lastProcessedBlock \|\| 0\) >= requiredCheckpointBlock/
  );
});

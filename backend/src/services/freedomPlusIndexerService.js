import env from '../config/env.js';
import { getProvider } from '../blockchain/provider.js';
import { getFreedomPlusContractEntries } from '../blockchain/freedomPlusContracts.js';
import FreedomPlusEvent from '../models/FreedomPlusEvent.js';
import FreedomPlusSyncState from '../models/FreedomPlusSyncState.js';
import { projectFreedomPlusEvent } from './freedomPlusProjectionService.js';

function normalize(value) {
  if (typeof value === 'bigint') return value.toString();
  if (Array.isArray(value)) return value.map(normalize);
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([key]) => !/^\d+$/.test(key))
        .map(([key, nested]) => [key, normalize(nested)])
    );
  }
  return value;
}

function parsedArgs(parsed) {
  const args = {};
  parsed.fragment.inputs.forEach((input, index) => {
    args[input.name || `arg${index}`] = normalize(parsed.args[index]);
  });
  return args;
}

function indexedAddresses(args) {
  return [...new Set(
    Object.values(args)
      .filter((value) => typeof value === 'string' && /^0x[a-fA-F0-9]{40}$/.test(value))
      .map((value) => value.toLowerCase())
  )];
}

async function syncTarget(provider, chainId, contractKey, contract, confirmedBlock) {
  const initialBlock = Math.max(0, Number(env.FREEDOM_PLUS_START_BLOCK));
  const state = await FreedomPlusSyncState.findOneAndUpdate(
    { chainId, contractKey },
    { $setOnInsert: { lastProcessedBlock: Math.max(0, initialBlock - 1), status: 'idle' } },
    { upsert: true, new: true }
  );
  if (state.lastProcessedBlock > 0 && state.lastProcessedBlockHash) {
    const checkpointBlock = await provider.getBlock(state.lastProcessedBlock);
    if (!checkpointBlock || checkpointBlock.hash.toLowerCase() !== state.lastProcessedBlockHash) {
      throw new Error(
        `Freedom-Plus reorg detected for ${contractKey} at block ${state.lastProcessedBlock}; operator replay required`
      );
    }
  }
  let cursor = Math.max(initialBlock, state.lastProcessedBlock + 1);
  if (cursor > confirmedBlock) return { contractKey, processed: 0, toBlock: state.lastProcessedBlock };

  await FreedomPlusSyncState.updateOne({ chainId, contractKey }, { $set: { status: 'running', errorMessage: '' } });
  let processed = 0;
  try {
    while (cursor <= confirmedBlock) {
      const toBlock = Math.min(cursor + env.SYNC_BLOCK_CHUNK_SIZE - 1, confirmedBlock);
      const logs = await provider.getLogs({ address: contract.target, fromBlock: cursor, toBlock });
      const blockCache = new Map();
      for (const log of logs) {
        let parsed;
        try { parsed = contract.interface.parseLog(log); } catch { continue; }
        if (!parsed) continue;
        let block = blockCache.get(log.blockNumber);
        if (!block) {
          block = await provider.getBlock(log.blockNumber);
          if (!block) throw new Error(`Missing confirmed block ${log.blockNumber}`);
          blockCache.set(log.blockNumber, block);
        }
        const args = parsedArgs(parsed);
        const document = {
          chainId,
          contractKey,
          contractAddress: contract.target.toLowerCase(),
          eventName: parsed.name,
          txHash: log.transactionHash.toLowerCase(),
          logIndex: Number(log.index),
          blockNumber: Number(log.blockNumber),
          blockHash: log.blockHash.toLowerCase(),
          timestamp: new Date(Number(block.timestamp) * 1000),
          activationId: String(args.activationId || args.recycleActivationId || args.rewardId || '').toLowerCase(),
          addresses: indexedAddresses(args),
          args,
        };
        await FreedomPlusEvent.updateOne(
          {
            chainId,
            contractAddress: document.contractAddress,
            txHash: document.txHash,
            logIndex: document.logIndex,
          },
          { $setOnInsert: document },
          { upsert: true }
        );
        await projectFreedomPlusEvent(document);
        processed += 1;
      }
      const terminalBlock = await provider.getBlock(toBlock);
      await FreedomPlusSyncState.updateOne(
        { chainId, contractKey },
        {
          $set: {
            lastProcessedBlock: toBlock,
            lastProcessedBlockHash: terminalBlock?.hash?.toLowerCase() || '',
            status: 'running',
            lastSyncedAt: new Date(),
          },
        }
      );
      cursor = toBlock + 1;
    }
    await FreedomPlusSyncState.updateOne(
      { chainId, contractKey },
      { $set: { status: 'idle', lastSyncedAt: new Date() } }
    );
    return { contractKey, processed, toBlock: confirmedBlock };
  } catch (error) {
    await FreedomPlusSyncState.updateOne(
      { chainId, contractKey },
      { $set: { status: 'error', errorMessage: String(error?.message || error) } }
    );
    throw error;
  }
}

export async function syncFreedomPlusOnce() {
  if (!env.FREEDOM_PLUS_ENABLED) return { enabled: false, targets: [] };
  const provider = getProvider();
  const network = await provider.getNetwork();
  const chainId = Number(network.chainId);
  if (chainId !== Number(env.CHAIN_ID)) {
    throw new Error(`Freedom-Plus chain mismatch: expected ${env.CHAIN_ID}, received ${chainId}`);
  }
  const head = await provider.getBlockNumber();
  const confirmedBlock = Math.max(0, head - env.SYNC_CONFIRMATIONS);
  const targets = [];
  for (const [contractKey, contract] of getFreedomPlusContractEntries(provider)) {
    targets.push(await syncTarget(provider, chainId, contractKey, contract, confirmedBlock));
  }
  return { enabled: true, head, confirmedBlock, targets };
}

let timer = null;
let running = false;

async function scheduledPass() {
  if (running) return;
  running = true;
  try {
    const result = await syncFreedomPlusOnce();
    if (result.enabled) {
      console.log('[FREEDOM_PLUS_INDEXER_PASS]', {
        head: result.head,
        confirmedBlock: result.confirmedBlock,
        events: result.targets.reduce((sum, target) => sum + target.processed, 0),
      });
    }
  } catch (error) {
    console.error('[FREEDOM_PLUS_INDEXER_FAILED]', {
      message: String(error?.message || error),
    });
  } finally {
    running = false;
  }
}

export async function startFreedomPlusIndexer() {
  if (!env.FREEDOM_PLUS_ENABLED) return { enabled: false };
  if (timer) return { enabled: true, alreadyStarted: true };
  await scheduledPass();
  timer = setInterval(scheduledPass, env.SYNC_POLL_INTERVAL_MS);
  timer.unref?.();
  return { enabled: true, intervalMs: env.SYNC_POLL_INTERVAL_MS };
}

export async function stopFreedomPlusIndexer() {
  if (timer) clearInterval(timer);
  timer = null;
  while (running) await new Promise((resolve) => setTimeout(resolve, 50));
}

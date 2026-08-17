import { getAddress } from 'ethers';
import env from '../../config/env.js';
import FreedomPlusEvent from '../../models/FreedomPlusEvent.js';
import FreedomPlusParticipant from '../../models/FreedomPlusParticipant.js';
import FreedomPlusLevelState from '../../models/FreedomPlusLevelState.js';
import FreedomPlusPosition from '../../models/FreedomPlusPosition.js';
import FreedomPlusPayment from '../../models/FreedomPlusPayment.js';
import FreedomPlusSyncState from '../../models/FreedomPlusSyncState.js';
import FreedomPlusLedgerEntry from '../../models/FreedomPlusLedgerEntry.js';
import { getProvider } from '../../blockchain/provider.js';
import { getFreedomPlusContracts } from '../../blockchain/freedomPlusContracts.js';
import {
  freedomPlusRewardProof,
  listFreedomPlusRewardPeriods,
} from '../freedomPlusRewardSnapshotService.js';

function wallet(value) {
  try { return getAddress(value).toLowerCase(); } catch { throw new Error('Invalid wallet address'); }
}

function pageOptions(query) {
  const limit = Math.min(200, Math.max(1, Number(query.limit || 50)));
  const page = Math.max(1, Number(query.page || 1));
  return { limit, skip: (page - 1) * limit, page };
}

export async function freedomPlusStatus() {
  if (!env.FREEDOM_PLUS_ENABLED) return { enabled: false, sync: [], participants: 0 };
  const [sync, participants, events] = await Promise.all([
    FreedomPlusSyncState.find({ chainId: env.CHAIN_ID }).sort({ contractKey: 1 }).lean(),
    FreedomPlusParticipant.countDocuments({ chainId: env.CHAIN_ID, registered: true }),
    FreedomPlusEvent.countDocuments({ chainId: env.CHAIN_ID }),
  ]);
  return { enabled: true, participants, events, sync };
}

export async function freedomPlusReconciliation() {
  if (!env.FREEDOM_PLUS_ENABLED) return { enabled: false, passed: false };
  const contracts = getFreedomPlusContracts();
  const provider = getProvider();
  const [head, chainParticipants, databaseParticipants, rawPositions, positions, rawPayments, payments, sync] = await Promise.all([
    provider.getBlockNumber(),
    contracts.registration.registeredCount(),
    FreedomPlusParticipant.countDocuments({ chainId: env.CHAIN_ID, registered: true }),
    FreedomPlusEvent.countDocuments({ chainId: env.CHAIN_ID, eventName: 'PositionRecorded' }),
    FreedomPlusPosition.countDocuments({ chainId: env.CHAIN_ID }),
    FreedomPlusEvent.countDocuments({ chainId: env.CHAIN_ID, eventName: 'ComponentSettled' }),
    FreedomPlusPayment.countDocuments({ chainId: env.CHAIN_ID }),
    FreedomPlusSyncState.find({ chainId: env.CHAIN_ID }).lean(),
  ]);
  const confirmedHead = Math.max(0, head - env.SYNC_CONFIRMATIONS);
  const checks = {
    participants: Number(chainParticipants) === databaseParticipants,
    positions: rawPositions === positions,
    payments: rawPayments === payments,
    checkpoints: sync.length > 0 && sync.every(
      (state) => state.status !== 'error' && state.lastProcessedBlock >= confirmedHead
    ),
  };
  return {
    enabled: true,
    passed: Object.values(checks).every(Boolean),
    head,
    confirmedHead,
    checks,
    totals: {
      chainParticipants: Number(chainParticipants),
      databaseParticipants,
      rawPositions,
      positions,
      rawPayments,
      payments,
    },
  };
}

export async function freedomPlusParticipant(address) {
  const normalized = wallet(address);
  const [participant, levels, positions, payments, ledger] = await Promise.all([
    FreedomPlusParticipant.findOne({ chainId: env.CHAIN_ID, wallet: normalized }).lean(),
    FreedomPlusLevelState.find({ chainId: env.CHAIN_ID, wallet: normalized }).sort({ level: 1 }).lean(),
    FreedomPlusPosition.find({ chainId: env.CHAIN_ID, participant: normalized })
      .sort({ blockNumber: -1, position: -1 }).limit(200).lean(),
    FreedomPlusPayment.find({ chainId: env.CHAIN_ID, recipient: normalized })
      .sort({ blockNumber: -1 }).limit(200).lean(),
    FreedomPlusLedgerEntry.find({ chainId: env.CHAIN_ID, wallet: normalized })
      .sort({ blockNumber: -1, logIndex: -1 }).limit(200).lean(),
  ]);
  return { wallet: normalized, participant, levels, positions, payments, ledger };
}

export async function freedomPlusOrbit(address, level, query = {}) {
  const normalized = wallet(address);
  const numericLevel = Number(level);
  if (!Number.isInteger(numericLevel) || numericLevel < 1 || numericLevel > 7) {
    throw new Error('Invalid Freedom-Plus level');
  }
  const filter = { chainId: env.CHAIN_ID, orbitOwner: normalized, level: numericLevel };
  if (query.cycle !== undefined) filter.cycle = Number(query.cycle);
  return FreedomPlusPosition.find(filter).sort({ cycle: 1, position: 1 }).lean();
}

export async function freedomPlusPayments(address, query = {}) {
  const normalized = wallet(address);
  const { limit, skip, page } = pageOptions(query);
  const filter = { chainId: env.CHAIN_ID, recipient: normalized };
  if (query.level) filter.level = Number(query.level);
  const [items, total] = await Promise.all([
    FreedomPlusPayment.find(filter).sort({ blockNumber: -1, role: 1 }).skip(skip).limit(limit).lean(),
    FreedomPlusPayment.countDocuments(filter),
  ]);
  return { page, limit, total, items };
}

export async function freedomPlusEvents(address, query = {}) {
  const normalized = wallet(address);
  const { limit, skip, page } = pageOptions(query);
  const filter = { chainId: env.CHAIN_ID, addresses: normalized };
  if (query.eventName) filter.eventName = String(query.eventName);
  const [items, total] = await Promise.all([
    FreedomPlusEvent.find(filter).sort({ blockNumber: -1, logIndex: -1 }).skip(skip).limit(limit).lean(),
    FreedomPlusEvent.countDocuments(filter),
  ]);
  return { page, limit, total, items };
}

export { freedomPlusRewardProof, listFreedomPlusRewardPeriods };

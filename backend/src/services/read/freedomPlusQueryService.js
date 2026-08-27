import { getAddress } from 'ethers';
import env from '../../config/env.js';
import FreedomPlusEvent from '../../models/FreedomPlusEvent.js';
import FreedomPlusParticipant from '../../models/FreedomPlusParticipant.js';
import FreedomPlusLevelState from '../../models/FreedomPlusLevelState.js';
import FreedomPlusPosition from '../../models/FreedomPlusPosition.js';
import FreedomPlusPayment from '../../models/FreedomPlusPayment.js';
import FreedomPlusSyncState from '../../models/FreedomPlusSyncState.js';
import FreedomPlusLedgerEntry from '../../models/FreedomPlusLedgerEntry.js';
import IndexedRegistrationEvent from '../../models/IndexedRegistrationEvent.js';
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
  const [head, chainParticipants, databaseParticipants, rawPositions, positions, rawPayments, payments, sync, latestEvent] = await Promise.all([
    provider.getBlockNumber(),
    contracts.registration.registeredCount(),
    FreedomPlusParticipant.countDocuments({ chainId: env.CHAIN_ID, registered: true }),
    FreedomPlusEvent.countDocuments({ chainId: env.CHAIN_ID, eventName: 'PositionRecorded' }),
    FreedomPlusPosition.countDocuments({ chainId: env.CHAIN_ID }),
    FreedomPlusEvent.countDocuments({ chainId: env.CHAIN_ID, eventName: 'ComponentSettled' }),
    FreedomPlusPayment.countDocuments({ chainId: env.CHAIN_ID }),
    FreedomPlusSyncState.find({ chainId: env.CHAIN_ID }).lean(),
    FreedomPlusEvent.findOne({ chainId: env.CHAIN_ID }).sort({ blockNumber: -1, logIndex: -1 }).select('blockNumber').lean(),
  ]);
  const confirmedHead = Math.max(0, head - env.SYNC_CONFIRMATIONS);
  const latestEventBlock = Number(latestEvent?.blockNumber || env.FREEDOM_PLUS_START_BLOCK || 0);
  const checks = {
    participants: Number(chainParticipants) === databaseParticipants,
    positions: rawPositions === positions,
    payments: rawPayments === payments,
    checkpoints: sync.length > 0 && sync.every(
      (state) => state.status !== 'error' && state.lastProcessedBlock >= latestEventBlock
    ),
  };
  return {
    enabled: true,
    passed: Object.values(checks).every(Boolean),
    head,
    confirmedHead,
    latestEventBlock,
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
  const [participant, levels, positions, payments, ledger, fFreedomRegistration, fFreedomLevelOne] = await Promise.all([
    FreedomPlusParticipant.findOne({ chainId: env.CHAIN_ID, wallet: normalized }).lean(),
    FreedomPlusLevelState.find({ chainId: env.CHAIN_ID, wallet: normalized }).sort({ level: 1 }).lean(),
    FreedomPlusPosition.find({ chainId: env.CHAIN_ID, participant: normalized })
      .sort({ blockNumber: -1, position: -1 }).limit(200).lean(),
    FreedomPlusPayment.find({ chainId: env.CHAIN_ID, recipient: normalized })
      .sort({ blockNumber: -1 }).limit(200).lean(),
    FreedomPlusLedgerEntry.find({ chainId: env.CHAIN_ID, wallet: normalized })
      .sort({ blockNumber: -1, logIndex: -1 }).limit(200).lean(),
    IndexedRegistrationEvent.findOne({ chainId: env.CHAIN_ID, user: normalized, eventName: 'Registered' })
      .sort({ blockNumber: 1, logIndex: 1 }).lean(),
    IndexedRegistrationEvent.findOne({
      chainId: env.CHAIN_ID,
      user: normalized,
      eventName: { $in: ['Registered', 'LevelActivated', 'FounderRepActivated'] },
      $or: [{ level: 1 }, { eventName: 'Registered' }],
    }).sort({ blockNumber: 1, logIndex: 1 }).lean(),
  ]);
  return {
    wallet: normalized,
    gateway: {
      registered: Boolean(fFreedomRegistration),
      levelOneActive: Boolean(fFreedomLevelOne),
      sponsor: fFreedomRegistration?.referrer || '',
      source: 'indexed',
    },
    participant, levels, positions, payments, ledger,
  };
}

export async function freedomPlusActivationSummary(address) {
  const normalized = wallet(address);
  const [participant, levels, positionGroups, latestWalletEvent, sync] = await Promise.all([
    FreedomPlusParticipant.findOne({ chainId: env.CHAIN_ID, wallet: normalized }).lean(),
    FreedomPlusLevelState.find({ chainId: env.CHAIN_ID, wallet: normalized }).sort({ level: 1 }).lean(),
    FreedomPlusPosition.aggregate([
      { $match: { chainId: env.CHAIN_ID, orbitOwner: normalized } },
      { $group: {
        _id: { level: '$level', cycle: '$cycle' },
        orbitType: { $first: '$orbitType' },
        filledPositions: { $sum: 1 },
        latestBlock: { $max: '$blockNumber' },
      } },
      { $sort: { '_id.level': 1, '_id.cycle': -1 } },
    ]),
    FreedomPlusEvent.findOne({ chainId: env.CHAIN_ID, addresses: normalized })
      .sort({ blockNumber: -1, logIndex: -1 }).select('blockNumber timestamp txHash eventName').lean(),
    FreedomPlusSyncState.find({ chainId: env.CHAIN_ID }).select('contractKey lastProcessedBlock status error').lean(),
  ]);

  const currentByLevel = new Map();
  for (const group of positionGroups) {
    const level = Number(group._id.level);
    if (!currentByLevel.has(level)) currentByLevel.set(level, group);
  }
  const indexedThrough = sync.length ? Math.min(...sync.map((item) => Number(item.lastProcessedBlock || 0))) : 0;

  return {
    wallet: normalized,
    participant,
    levels,
    orbitSummaries: Array.from({ length: 7 }, (_, index) => {
      const level = index + 1;
      const current = currentByLevel.get(level);
      return {
        level,
        orbitType: current?.orbitType || '',
        currentCycle: current ? Number(current._id.cycle) : 0,
        filledPositions: Number(current?.filledPositions || 0),
        latestBlock: Number(current?.latestBlock || 0),
      };
    }),
    sync: {
      indexedThrough,
      latestWalletEvent: latestWalletEvent || null,
      healthy: sync.length > 0 && sync.every((item) => item.status !== 'error'),
      errors: sync.filter((item) => item.status === 'error').map((item) => ({ contractKey: item.contractKey, error: item.error })),
    },
  };
}

export async function freedomPlusOrbit(address, level, query = {}) {
  const normalized = wallet(address);
  const numericLevel = Number(level);
  if (!Number.isInteger(numericLevel) || numericLevel < 1 || numericLevel > 7) {
    throw new Error('Invalid Freedom-Plus level');
  }
  const filter = { chainId: env.CHAIN_ID, orbitOwner: normalized, level: numericLevel };
  if (query.cycle !== undefined) filter.cycle = Number(query.cycle);
  const positions = await FreedomPlusPosition.find(filter).sort({ cycle: 1, position: 1 }).lean();
  const activationIds = [...new Set(positions.map((item) => item.activationId).filter(Boolean))];
  const payments = activationIds.length
    ? await FreedomPlusPayment.find({ chainId: env.CHAIN_ID, activationId: { $in: activationIds } })
      .sort({ activationId: 1, role: 1 }).lean()
    : [];
  const paymentsByActivation = new Map();
  for (const payment of payments) {
    const key = String(payment.activationId || '').toLowerCase();
    const current = paymentsByActivation.get(key) || [];
    current.push(payment);
    paymentsByActivation.set(key, current);
  }
  return positions.map((position) => ({
    ...position,
    payments: paymentsByActivation.get(String(position.activationId || '').toLowerCase()) || [],
    dataSource: 'indexed',
  }));
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

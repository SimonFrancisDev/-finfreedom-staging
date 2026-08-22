import { ethers } from 'ethers'
import { getApiUrl } from './apiConfig'
import { web3Service } from './web3'
import USDT_ABI from '../abis/USDT.json'

const env = import.meta.env

export const FREEDOM_PLUS_ENABLED = String(env.VITE_FREEDOM_PLUS_ENABLED || 'false').toLowerCase() === 'true'

export const FREEDOM_PLUS_ADDRESSES = Object.freeze({
  registration: env.VITE_FREEDOM_PLUS_REGISTRATION_ADDRESS || '',
  levelManager: env.VITE_FREEDOM_PLUS_LEVEL_MANAGER_ADDRESS || '',
  p39Orbit: env.VITE_FREEDOM_PLUS_P39_ORBIT_ADDRESS || '',
  p14Orbit: env.VITE_FREEDOM_PLUS_P14_ORBIT_ADDRESS || '',
  p12Orbit: env.VITE_FREEDOM_PLUS_P12_ORBIT_ADDRESS || '',
  p6Orbit: env.VITE_FREEDOM_PLUS_P6_ORBIT_ADDRESS || '',
  p4Orbit: env.VITE_FREEDOM_PLUS_P4_ORBIT_ADDRESS || '',
  p3Orbit: env.VITE_FREEDOM_PLUS_P3_ORBIT_ADDRESS || '',
  fpt: env.VITE_FREEDOM_PLUS_FPT_ADDRESS || '',
  fptr: env.VITE_FREEDOM_PLUS_FPTR_ADDRESS || '',
  nftMembership: env.VITE_FREEDOM_PLUS_NFT_MEMBERSHIP_ADDRESS || '',
  nftRewardDistributor: env.VITE_FREEDOM_PLUS_NFT_REWARD_DISTRIBUTOR_ADDRESS || '',
})

export const FREEDOM_PLUS_LEVELS = Object.freeze([
  { level: 1, orbit: 'P39', price: 50, positions: 39, rings: '3 / 9 / 27', payouts: '20% / 20% / 50%' },
  { level: 2, orbit: 'P14', price: 150, positions: 14, rings: '2 / 4 / 8', payouts: '15% / 25% / 50%' },
  { level: 3, orbit: 'P12', price: 450, positions: 12, rings: '3 / 9', payouts: '40% / 50%' },
  { level: 4, orbit: 'P6', price: 1350, positions: 6, rings: '2 / 4', payouts: '40% / 50%' },
  { level: 5, orbit: 'P4', price: 4050, positions: 4, rings: '4', payouts: '90% / recycle' },
  { level: 6, orbit: 'P4', price: 12150, positions: 4, rings: '4', payouts: '90% / recycle' },
  { level: 7, orbit: 'P3', price: 36450, positions: 3, rings: '3', payouts: '90% / recycle' },
])

export const NFT_TIERS = Object.freeze([
  { tier: 1, name: 'Foundational', threshold: 5700, poolShare: 50 },
  { tier: 2, name: 'Intermediate', threshold: 18700, poolShare: 30 },
  { tier: 3, name: 'Advanced', threshold: 62000, poolShare: 20 },
])

const REGISTRATION_ABI = [
  'function register(address sponsor)',
  'function activateLevel(uint8 level)',
  'function isRegistered(address participant) view returns (bool)',
  'function isLevelActive(address participant,uint8 level) view returns (bool)',
  'function sponsorOf(address participant) view returns (address)',
  'function participantNumber(address participant) view returns (uint256)',
  'function registeredCount() view returns (uint256)',
]

const TOKEN_ABI = [
  'function balanceOf(address account) view returns (uint256)',
  'function availableBalanceOf(address account) view returns (uint256)',
  'function lockedBalanceOf(address account) view returns (uint256)',
]

const NFT_MEMBERSHIP_ABI = [
  'function membershipOf(address member) view returns ((uint8 tier,uint256 tokenId,uint256 lockedFGT,uint256 lockedFPT,bool rewardEligible))',
  'function mintMembership(uint8 tier,uint256 fgtAmount,uint256 fptAmount)',
  'function upgradeMembership(uint8 newTier,uint256 targetFGT,uint256 targetFPT)',
  'function downgradeMembership(uint8 newTier,uint256 targetFGT,uint256 targetFPT)',
  'function unlockQualification(uint256 fgtAmount,uint256 fptAmount)',
  'function restoreEligibility(uint256 fgtAmount,uint256 fptAmount)',
]

const NFT_REWARD_DISTRIBUTOR_ABI = [
  'function claim(uint32 periodId,uint8 tier,bytes32[] proof)',
  'function claimed(uint32 periodId,address member) view returns (bool)',
  'function periodOf(uint32 periodId) view returns ((uint64 cutoff,uint256 poolAmount,uint256 reservedAmount,bytes32[3] eligibleRoots,uint256[3] eligibleCounts,uint256[3] rewardPerMember,bool created))',
]

function assertEnabled() {
  if (!FREEDOM_PLUS_ENABLED) throw new Error('Freedom-Plus is not enabled in this environment.')
}

function assertAddress(key) {
  const address = FREEDOM_PLUS_ADDRESSES[key]
  if (!ethers.isAddress(address)) throw new Error(`Missing or invalid Freedom-Plus ${key} address.`)
  return address
}

function requiredAddress(label, value) {
  if (!ethers.isAddress(value)) throw new Error(`Missing or invalid ${label} address.`)
  return value
}

export function getFreedomPlusReadContracts() {
  assertEnabled()
  const provider = web3Service.getReadProvider()
  return {
    registration: new ethers.Contract(assertAddress('registration'), REGISTRATION_ABI, provider),
    usdt: new ethers.Contract(requiredAddress('USDT', env.VITE_USDT_ADDRESS), USDT_ABI, provider),
    fpt: new ethers.Contract(assertAddress('fpt'), TOKEN_ABI, provider),
    fptr: new ethers.Contract(assertAddress('fptr'), TOKEN_ABI, provider),
    nftMembership: new ethers.Contract(assertAddress('nftMembership'), NFT_MEMBERSHIP_ABI, provider),
    nftRewardDistributor: new ethers.Contract(assertAddress('nftRewardDistributor'), NFT_REWARD_DISTRIBUTOR_ABI, provider),
  }
}

export function getFreedomPlusWriteContracts() {
  assertEnabled()
  const signer = web3Service.getSigner()
  if (!signer) throw new Error('Connect your wallet before continuing.')
  return {
    registration: new ethers.Contract(assertAddress('registration'), REGISTRATION_ABI, signer),
    usdt: new ethers.Contract(requiredAddress('USDT', env.VITE_USDT_ADDRESS), USDT_ABI, signer),
    nftMembership: new ethers.Contract(assertAddress('nftMembership'), NFT_MEMBERSHIP_ABI, signer),
    nftRewardDistributor: new ethers.Contract(assertAddress('nftRewardDistributor'), NFT_REWARD_DISTRIBUTOR_ABI, signer),
  }
}

async function fetchJson(path) {
  const response = await fetch(getApiUrl(path), { headers: { Accept: 'application/json' } })
  const payload = await response.json().catch(() => null)
  if (!response.ok) throw new Error(payload?.message || `Freedom-Plus API request failed (${response.status}).`)
  return payload?.data ?? payload
}

export const freedomPlusApi = {
  status: () => fetchJson('/api/freedom-plus/status'),
  reconciliation: () => fetchJson('/api/freedom-plus/reconciliation'),
  participant: (wallet) => fetchJson(`/api/freedom-plus/participant/${wallet}`),
  orbit: (wallet, level, cycle) => fetchJson(`/api/freedom-plus/orbit/${wallet}/level/${level}${cycle === '' ? '' : `?cycle=${cycle}`}`),
  payments: (wallet, level = '') => fetchJson(`/api/freedom-plus/payments/${wallet}${level ? `?level=${level}` : ''}`),
  rewardPeriods: () => fetchJson('/api/freedom-plus/rewards/periods'),
  rewardProof: (periodId, wallet) => fetchJson(`/api/freedom-plus/rewards/${periodId}/${wallet}`),
  referralForWallet: (wallet) => fetchJson(`/api/referral/code/${wallet}`),
  resolveReferral: (referralId) => fetchJson(`/api/referral/resolve/${encodeURIComponent(referralId)}`),
}

export function tokenUnits(value) {
  return ethers.parseUnits(String(value || 0), 6)
}

export function formatToken(value) {
  return Number(ethers.formatUnits(value || 0, 6)).toLocaleString(undefined, { maximumFractionDigits: 2 })
}

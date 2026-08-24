import { useCallback, useEffect, useMemo, useState } from 'react'
import { ethers } from 'ethers'
import { Activity, AlertTriangle, ArrowRight, ArrowUpRight, Check, CheckCircle2, Coins, History, Info, LayoutDashboard, Lock, LockKeyhole, Network, RefreshCw, ShieldCheck, Trophy, User, UserPlus, Wallet, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useWallet } from '../../hooks/useWallet'
import { CHAIN_ID, NETWORK_CONFIG } from '../../constants/addresses'
import { web3Service } from '../../Services/web3'
import { useToast } from '../../components/feedback'
import { TransactionStatus } from '../../components/feedback'
import { InlineAlert } from '../../components/ui'
import { ProgressionLineChart } from '../../components/charts/InstitutionalCharts'
import { lockBodyScroll } from '../../utils/bodyScrollLock'
import FreedomPlusOrbit from './FreedomPlusOrbit'
import FreedomPlusOverview from './FreedomPlusOverview'
import {
  FREEDOM_PLUS_ADDRESSES,
  FREEDOM_PLUS_ENABLED,
  FREEDOM_PLUS_LEVELS,
  NFT_TIERS,
  formatToken,
  freedomPlusApi,
  getFreedomPlusReadContracts,
  getFreedomPlusWriteContracts,
  tokenUnits,
} from '../../Services/freedomPlus'
import './FreedomPlusPage.css'

const ZERO = ethers.ZeroAddress
const VIEW_ROUTES = {
  overview: '/freedom-plus',
  dashboard: '/freedom-plus/dashboard',
  levels: '/freedom-plus/activation',
  orbits: '/freedom-plus/orbits',
  tokens: '/freedom-plus/tokens',
  activity: '/freedom-plus/activity',
  account: '/freedom-plus/account',
  nftOverview: '/freedom-nft',
  membership: '/freedom-nft/membership',
  rewards: '/freedom-nft/rewards',
}
const PROGRAM_TABS = [
  ['overview', <LayoutDashboard />, 'Overview'],
  ['levels', <Coins />, 'Activation'],
  ['tokens', <Coins />, 'FPT / FPTr'],
]
const NFT_TABS = [
  ['nftOverview', <ShieldCheck />, 'NFT Program'],
  ['membership', <LockKeyhole />, 'Membership'],
  ['rewards', <Trophy />, 'Rewards'],
]

function short(value) {
  return value && ethers.isAddress(value) ? `${value.slice(0, 6)}...${value.slice(-4)}` : 'Not available'
}

function normalizeMembership(raw) {
  return {
    tier: Number(raw?.tier ?? raw?.[0] ?? 0),
    tokenId: String(raw?.tokenId ?? raw?.[1] ?? 0),
    lockedFGT: raw?.lockedFGT ?? raw?.[2] ?? 0n,
    lockedFPT: raw?.lockedFPT ?? raw?.[3] ?? 0n,
    rewardEligible: Boolean(raw?.rewardEligible ?? raw?.[4]),
  }
}

export default function FreedomPlusPage({ initialTab = 'overview' }) {
  const navigate = useNavigate()
  const { account, isConnected, connect } = useWallet()
  const toast = useToast()
  const [tab, setTab] = useState(initialTab)
  const [loading, setLoading] = useState(false)
  const [busy, setBusy] = useState('')
  const [sponsor, setSponsor] = useState('')
  const [sponsorCode, setSponsorCode] = useState('')
  const [referralId, setReferralId] = useState('')
  const [selectedLevel, setSelectedLevel] = useState(1)
  const [cycle, setCycle] = useState('')
  const [data, setData] = useState(null)
  const [orbit, setOrbit] = useState([])
  const [selectedPosition, setSelectedPosition] = useState(null)
  const [status, setStatus] = useState(null)
  const [reconciliation, setReconciliation] = useState(null)
  const [nftForm, setNftForm] = useState({ tier: 1, fgt: '0', fpt: '5700' })
  const [unlockForm, setUnlockForm] = useState({ fgt: '0', fpt: '0' })
  const [rewardPeriods, setRewardPeriods] = useState([])
  const [txState, setTxState] = useState({ status: 'idle', stage: 'idle', hash: '', note: '', error: null })
  const [activationSummary, setActivationSummary] = useState(null)
  const [networkReady, setNetworkReady] = useState(true)
  const [pendingAction, setPendingAction] = useState(null)
  const [securityAccepted, setSecurityAccepted] = useState(false)

  const activeLevels = useMemo(() => new Set((data?.levels || []).filter((item) => item.active).map((item) => Number(item.level))), [data])
  const membership = data?.chain?.membership || normalizeMembership(null)
  const selectedLevelConfig = FREEDOM_PLUS_LEVELS.find((item) => item.level === selectedLevel)
  const orbitCycles = useMemo(() => [...new Set(orbit.map((item) => Number(item.cycle)))].sort((a, b) => b - a), [orbit])
  const visualOrbit = useMemo(() => {
    if (cycle !== '') return orbit
    const currentCycle = orbitCycles[0]
    return currentCycle == null ? orbit : orbit.filter((item) => Number(item.cycle) === currentCycle)
  }, [cycle, orbit, orbitCycles])
  const paymentTotal = useMemo(
    () => (data?.payments || []).reduce((total, item) => total + BigInt(item.amount || 0), 0n),
    [data]
  )
  const ledgerTotal = useMemo(
    () => (data?.ledger || []).reduce((total, item) => total + BigInt(item.amount || 0), 0n),
    [data]
  )
  const isProgramOverview = tab === 'overview'
  const isNftView = NFT_TABS.some(([value]) => value === tab)
  const visibleTabs = isNftView ? NFT_TABS : PROGRAM_TABS
  const nextLevel = FREEDOM_PLUS_LEVELS.find((item) => !activeLevels.has(item.level))?.level || null
  const progressionData = useMemo(() => {
    let cumulative = 0
    return FREEDOM_PLUS_LEVELS.map((item) => {
      const activated = activeLevels.has(item.level)
      if (activated) cumulative += 1
      return { level: item.level, activated, cumulative }
    })
  }, [activeLevels])

  const openView = (view) => {
    setTab(view)
    navigate(VIEW_ROUTES[view])
  }

  const load = useCallback(async () => {
    if (!FREEDOM_PLUS_ENABLED || !account) return
    setLoading(true)
    try {
      const contracts = getFreedomPlusReadContracts({ includeNft: isNftView })
      const [apiData, apiActivationSummary, apiStatus, apiReconciliation, periods, identity, registered, participantNumber, chainSponsor, usdt, fgt, fpt, fptr, membershipRaw, levelFlags] = await Promise.all([
        freedomPlusApi.participant(account).catch(() => null),
        freedomPlusApi.activationSummary(account).catch(() => null),
        freedomPlusApi.status().catch(() => null),
        freedomPlusApi.reconciliation().catch(() => null),
        isNftView ? freedomPlusApi.rewardPeriods().catch(() => []) : Promise.resolve([]),
        freedomPlusApi.referralForWallet(account).catch(() => null),
        contracts.registration.isRegistered(account),
        contracts.registration.participantNumber(account),
        contracts.registration.sponsorOf(account),
        contracts.usdt.balanceOf(account),
        contracts.fgt.availableBalanceOf(account),
        contracts.fpt.availableBalanceOf(account),
        contracts.fptr.balanceOf(account),
        isNftView ? contracts.nftMembership.membershipOf(account) : Promise.resolve(null),
        Promise.all(FREEDOM_PLUS_LEVELS.map(({ level }) => contracts.registration.isLevelActive(account, level))),
      ])
      const indexedLevels = new Map((apiData?.levels || []).map((item) => [Number(item.level), item]))
      const levels = FREEDOM_PLUS_LEVELS.map((config, index) => ({ ...indexedLevels.get(config.level), ...config, active: Boolean(levelFlags[index]) }))
      setData({
        ...(apiData || {}),
        levels,
        chain: {
          registered: Boolean(registered),
          participantNumber: String(participantNumber),
          sponsor: chainSponsor,
          usdt: formatToken(usdt),
          fgt: formatToken(fgt),
          fpt: formatToken(fpt),
          fptr: formatToken(fptr),
          membership: normalizeMembership(membershipRaw),
        },
      })
      setStatus(apiStatus)
      setActivationSummary(apiActivationSummary)
      setReconciliation(apiReconciliation)
      setReferralId(identity?.referralId || identity?.shortCode || '')
      setSponsorCode(identity?.referredByCode || '')
      const enrichedPeriods = await Promise.all((periods || []).map(async (period) => {
        const proof = await freedomPlusApi.rewardProof(period.periodId, account)
        const published = period.status === 'published'
        const [claimed, chainPeriod] = published
          ? await Promise.all([
              contracts.nftRewardDistributor.claimed(period.periodId, account),
              contracts.nftRewardDistributor.periodOf(period.periodId),
            ])
          : [false, null]
        return {
          ...period,
          proof,
          claimed: Boolean(claimed),
          reward: proof.eligible && chainPeriod ? chainPeriod.rewardPerMember[proof.tier - 1] : 0n,
        }
      }))
      setRewardPeriods(enrichedPeriods)
      if (registered && chainSponsor && chainSponsor !== ZERO) {
        setSponsor(chainSponsor)
      } else if (identity?.referredByWallet && identity.referredByWallet !== ZERO) {
        setSponsor(identity.referredByWallet)
      }
    } catch (error) {
      toast.error(error?.shortMessage || error?.message || 'Unable to load Freedom-Plus data.')
    } finally {
      setLoading(false)
    }
  }, [account, isNftView, toast])

  useEffect(() => { load() }, [load])
  useEffect(() => { setTab(initialTab) }, [initialTab])
  useEffect(() => {
    if (!isConnected) return
    const provider = web3Service.getEip1193Provider() || window.ethereum
    const checkNetwork = async () => {
      try {
        const value = await provider?.request?.({ method: 'eth_chainId' })
        setNetworkReady(String(value || '').toLowerCase() === CHAIN_ID.toLowerCase())
      } catch {
        setNetworkReady(false)
      }
    }
    checkNetwork()
    provider?.on?.('chainChanged', checkNetwork)
    return () => provider?.removeListener?.('chainChanged', checkNetwork)
  }, [account, isConnected])

  useEffect(() => {
    if (!pendingAction) return undefined
    const release = lockBodyScroll()
    const closeOnEscape = (event) => { if (event.key === 'Escape' && !busy) setPendingAction(null) }
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      release()
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [busy, pendingAction])

  const loadOrbit = useCallback(async () => {
    if (!account) return
    setLoading(true)
    try {
      setOrbit(await freedomPlusApi.orbit(account, selectedLevel, cycle))
    } catch (error) {
      toast.error(error?.message || 'Unable to load this orbit.')
    } finally {
      setLoading(false)
    }
  }, [account, cycle, selectedLevel, toast])

  useEffect(() => {
    if ((tab === 'orbits' || tab === 'levels') && account && data?.chain?.registered) loadOrbit()
  }, [account, data?.chain?.registered, loadOrbit, tab])

  const transact = async (key, operation, success) => {
    setBusy(key)
    setTxState({ status: 'running', stage: 'signing', hash: '', note: 'Review and confirm this Freedom-Plus action in your wallet.', error: null })
    try {
      const tx = await operation()
      setTxState({ status: 'running', stage: 'pending', hash: tx.hash, note: 'Transaction submitted. Waiting for on-chain confirmation.', error: null })
      toast.info('Transaction submitted. Waiting for confirmation.')
      await tx.wait()
      setTxState({ status: 'complete', stage: 'complete', hash: tx.hash, note: success, error: null })
      toast.success(success)
      await load()
      if (tab === 'orbits' || tab === 'levels') await loadOrbit()
    } catch (error) {
      const message = error?.shortMessage || error?.reason || error?.message || 'Transaction failed.'
      const rejected = error?.code === 4001 || error?.code === 'ACTION_REJECTED'
      setTxState({ status: 'error', stage: 'error', hash: error?.transactionHash || '', note: '', error: { title: rejected ? 'Transaction rejected' : 'Transaction did not complete', message: rejected ? 'The wallet request was rejected. No on-chain state was changed.' : message, action: 'Reset this notice after reviewing the requirement, then retry.' } })
      toast.error(message)
    } finally {
      setBusy('')
    }
  }

  const approveAndRun = async (price, action) => {
    const contracts = getFreedomPlusWriteContracts()
    const amount = tokenUnits(price)
    const allowance = await contracts.usdt.allowance(account, FREEDOM_PLUS_ADDRESSES.levelManager)
    if (allowance < amount) {
      setTxState({ status: 'running', stage: 'signing', hash: '', note: `Approve ${price} USDT for the Freedom-Plus Level Manager.`, error: null })
      const approval = await contracts.usdt.approve(FREEDOM_PLUS_ADDRESSES.levelManager, amount)
      setTxState({ status: 'running', stage: 'pending', hash: approval.hash, note: 'USDT approval submitted. The program action follows after confirmation.', error: null })
      toast.info('USDT approval submitted.')
      await approval.wait()
      setTxState({ status: 'running', stage: 'signing', hash: '', note: 'Approval confirmed. Confirm the program action in your wallet.', error: null })
    }
    return action(contracts)
  }

  const register = async () => {
    setBusy('register')
    setTxState({ status: 'running', stage: 'preflight', hash: '', note: 'Verifying your permanent FFN sponsor, balances and Freedom-Plus eligibility.', error: null })
    try {
      const sponsorWallet = sponsor.trim()
      if (!ethers.isAddress(sponsorWallet) || sponsorWallet === ZERO || sponsorWallet.toLowerCase() === account?.toLowerCase()) {
        throw new Error('Your permanent F-Freedom sponsor could not be verified. Freedom-Plus registration has been stopped without changing your wallet.')
      }
      const readContracts = getFreedomPlusReadContracts()
      if (!(await readContracts.registration.isRegistered(sponsorWallet))) {
        throw new Error('Your permanent sponsor has not registered in Freedom-Plus yet. The sponsor must join first; the system will not substitute another sponsor.')
      }
      const price = tokenUnits(50)
      const balance = await readContracts.usdt.balanceOf(account)
      if (balance < price) throw new Error(`Insufficient USDT balance. Registration and Level 1 require 50 USDT; this wallet has ${formatToken(balance)} USDT.`)

      const contracts = getFreedomPlusWriteContracts()
      const allowance = await contracts.usdt.allowance(account, FREEDOM_PLUS_ADDRESSES.levelManager)
      if (allowance < price) {
        setTxState({ status: 'running', stage: 'signing', hash: '', note: 'Approve exactly 50 USDT for the Freedom-Plus Level Manager.', error: null })
        const approval = await contracts.usdt.approve(FREEDOM_PLUS_ADDRESSES.levelManager, price)
        setTxState({ status: 'running', stage: 'pending', hash: approval.hash, note: 'USDT approval submitted. Waiting for confirmation.', error: null })
        await approval.wait()
      }

      setTxState({ status: 'running', stage: 'signing', hash: '', note: 'Confirm registration and the atomic Level 1 activation in your wallet.', error: null })
      await contracts.registration.register.estimateGas(sponsorWallet)
      const tx = await contracts.registration.register(sponsorWallet)
      setTxState({ status: 'running', stage: 'pending', hash: tx.hash, note: 'Registration and Level 1 activation submitted. Waiting for confirmation.', error: null })
      toast.info('Transaction submitted. Waiting for confirmation.')
      await tx.wait()
      setTxState({ status: 'complete', stage: 'complete', hash: tx.hash, note: 'Registration, Level 1 activation and 50 FPT issuance are confirmed.', error: null })
      toast.success('Registration and Level 1 activation confirmed.')
      await load()
    } catch (error) {
      const message = error?.shortMessage || error?.reason || error?.message || 'Registration failed.'
      const rejected = error?.code === 4001 || error?.code === 'ACTION_REJECTED'
      setTxState({
        status: 'error',
        stage: 'error',
        hash: error?.transactionHash || '',
        note: '',
        error: {
          title: rejected ? 'Transaction rejected' : 'Registration did not complete',
          message: rejected ? 'The wallet request was rejected. No registration or activation occurred.' : message,
          action: 'Review the requirement shown above, then reset and retry. No partial Freedom-Plus registration is retained after a failed activation.',
        },
      })
      toast.error(message)
    } finally {
      setBusy('')
    }
  }

  const activate = (level, price) => {
    transact(`level-${level}`, async () => {
      const readContracts = getFreedomPlusReadContracts()
      const balance = await readContracts.usdt.balanceOf(account)
      if (balance < tokenUnits(price)) throw new Error(`Insufficient USDT balance. Level ${level} requires ${price.toLocaleString()} USDT; this wallet has ${formatToken(balance)} USDT.`)
      return approveAndRun(price, async (contracts) => {
        await contracts.registration.activateLevel.estimateGas(level)
        return contracts.registration.activateLevel(level)
      })
    }, `Level ${level} activation confirmed.`)
  }

  const openRegistrationReview = () => {
    setSecurityAccepted(false)
    setPendingAction({ type: 'register', level: 1, price: 50, orbit: 'P39' })
  }

  const openActivationReview = (item) => {
    setSecurityAccepted(false)
    setPendingAction({ type: 'activate', ...item })
  }

  const confirmPendingAction = () => {
    if (!pendingAction || !securityAccepted) return
    const action = pendingAction
    setPendingAction(null)
    if (action.type === 'register') register()
    else activate(action.level, action.price)
  }

  const submitMembership = () => {
    const tier = Number(nftForm.tier)
    const fgt = tokenUnits(nftForm.fgt)
    const fpt = tokenUnits(nftForm.fpt)
    const current = membership.tier
    const target = NFT_TIERS.find((item) => item.tier === tier)
    transact('membership', async () => {
      if (!target || fgt + fpt !== tokenUnits(target.threshold)) {
        throw new Error(`The FGT and FPT commitment must total exactly ${target?.threshold?.toLocaleString() || 0} tokens for this tier.`)
      }
      const contracts = getFreedomPlusWriteContracts({ includeNft: true })
      const additionalFgt = fgt > membership.lockedFGT ? fgt - membership.lockedFGT : 0n
      const additionalFpt = fpt > membership.lockedFPT ? fpt - membership.lockedFPT : 0n
      const [availableFgt, availableFpt] = await Promise.all([
        contracts.fgt.availableBalanceOf(account),
        contracts.fpt.availableBalanceOf(account),
      ])
      if (availableFgt < additionalFgt) throw new Error(`Insufficient available FGT. This change requires ${formatToken(additionalFgt)} additional FGT.`)
      if (availableFpt < additionalFpt) throw new Error(`Insufficient available FPT. This change requires ${formatToken(additionalFpt)} additional FPT.`)
      if (current === tier) throw new Error('Choose a different membership tier or use the qualification controls below.')
      if (current === 0) {
        await contracts.nftMembership.mintMembership.estimateGas(tier, fgt, fpt)
        return contracts.nftMembership.mintMembership(tier, fgt, fpt)
      }
      if (tier > current) {
        await contracts.nftMembership.upgradeMembership.estimateGas(tier, fgt, fpt)
        return contracts.nftMembership.upgradeMembership(tier, fgt, fpt)
      }
      await contracts.nftMembership.downgradeMembership.estimateGas(tier, fgt, fpt)
      return contracts.nftMembership.downgradeMembership(tier, fgt, fpt)
    }, 'Freedom NFT membership updated and qualifying balances reconciled.')
  }

  const unlockQualification = () => {
    const contracts = getFreedomPlusWriteContracts({ includeNft: true })
    const fgt = tokenUnits(unlockForm.fgt)
    const fpt = tokenUnits(unlockForm.fpt)
    transact('unlock', async () => {
      if (fgt + fpt === 0n) throw new Error('Enter at least one qualifying token amount to unlock.')
      if (fgt > membership.lockedFGT || fpt > membership.lockedFPT) throw new Error('The unlock amount exceeds the tokens currently locked in this membership.')
      await contracts.nftMembership.unlockQualification.estimateGas(fgt, fpt)
      return contracts.nftMembership.unlockQualification(fgt, fpt)
    }, 'Qualifying tokens unlocked. Reward eligibility recalculated.')
  }

  const restoreEligibility = () => {
    const contracts = getFreedomPlusWriteContracts({ includeNft: true })
    const fgt = tokenUnits(unlockForm.fgt)
    const fpt = tokenUnits(unlockForm.fpt)
    transact('restore', async () => {
      const threshold = tokenUnits(NFT_TIERS.find((item) => item.tier === membership.tier)?.threshold || 0)
      const missing = threshold - membership.lockedFGT - membership.lockedFPT
      if (fgt + fpt !== missing) throw new Error(`Restoration requires exactly ${formatToken(missing)} qualifying tokens.`)
      const [availableFgt, availableFpt] = await Promise.all([contracts.fgt.availableBalanceOf(account), contracts.fpt.availableBalanceOf(account)])
      if (availableFgt < fgt || availableFpt < fpt) throw new Error('The selected FGT/FPT restoration split exceeds the available qualifying balance.')
      await contracts.nftMembership.restoreEligibility.estimateGas(fgt, fpt)
      return contracts.nftMembership.restoreEligibility(fgt, fpt)
    }, 'Freedom NFT reward eligibility restored.')
  }

  const claimReward = (period) => {
    const contracts = getFreedomPlusWriteContracts({ includeNft: true })
    transact(`claim-${period.periodId}`, () => contracts.nftRewardDistributor.claim(period.periodId, period.proof.tier, period.proof.proof), `Reward for ${period.periodId} claimed.`)
  }

  if (!FREEDOM_PLUS_ENABLED) {
    return <main className="freedom-plus-page"><section className="fp-empty"><ShieldCheck /><h1>Freedom-Plus is not enabled</h1><p>This environment has not been connected to a verified Freedom-Plus deployment.</p></section></main>
  }

  return (
    <main className="freedom-plus-page">
      {!isProgramOverview && <header className="fp-header">
        <div><span className="fp-kicker">Advanced participation</span><h1>Freedom-Plus</h1><p>Seven manually activated levels, deterministic orbit placement and long-term Freedom NFT progression.</p></div>
        <button className="fp-icon-button" type="button" onClick={load} disabled={loading} title="Refresh chain and indexed data"><RefreshCw className={loading ? 'spin' : ''} /></button>
      </header>}

      {!isProgramOverview && !isConnected && (
        <section className="fp-connect"><Wallet /><div><h2>Connect your wallet</h2><p>Connect on the configured Polygon network to view or manage Freedom-Plus.</p></div><button type="button" onClick={connect}>Connect</button></section>
      )}

      {!isProgramOverview && isConnected && (
        <section className="fp-metrics">
            <article><span>FFN ID</span><strong>{data?.chain?.registered ? (referralId || 'Resolving...') : 'Not registered'}</strong><small>{short(account)}</small></article>
            <article><span>Active levels</span><strong>{activeLevels.size} / 7</strong><small>Manual progression</small></article>
            <article><span>USDT available</span><strong>{data?.chain?.usdt || '0'} USDT</strong><small>Wallet balance</small></article>
            <article><span>FGT / FPT / FPTr</span><strong>{data?.chain?.fgt || '0'} / {data?.chain?.fpt || '0'} / {data?.chain?.fptr || '0'}</strong><small>NFT qualifying / activation / recycle</small></article>
        </section>
      )}

      {tab === 'levels' && isConnected && !networkReady && (
        <InlineAlert tone="warning" title={`Switch to ${NETWORK_CONFIG.chainName}`} icon={AlertTriangle}>
          <p>Your wallet is connected to another network. Registration and level activation remain blocked until the configured network is selected.</p>
        </InlineAlert>
      )}

      {tab === 'levels' && isConnected && loading && !data && (
        <section className="fp-activation-loading" aria-live="polite">
          <RefreshCw className="spin" /><div><h2>Loading activation state</h2><p>Confirming registration, active levels, balances and indexed orbit cycles.</p></div>
        </section>
      )}

      {!isProgramOverview && <nav className="fp-tabs" aria-label={isNftView ? 'Freedom NFT views' : 'Freedom-Plus views'}>
            {visibleTabs.map(([value, icon, label]) => (
              <button type="button" className={tab === value ? 'active' : ''} onClick={() => openView(value)} key={value}>{icon}{label}</button>
            ))}
      </nav>}

      {isConnected && data?.chain?.registered && <TransactionStatus txState={txState} onReset={() => setTxState({ status: 'idle', stage: 'idle', hash: '', note: '', error: null })} explorerBaseUrl={`${NETWORK_CONFIG.blockExplorerUrls[0]}/tx`} />}

          {tab === 'overview' && <FreedomPlusOverview registered={Boolean(data?.chain?.registered)} activeLevelCount={activeLevels.size} membershipTier={membership.tier} openView={openView} />}

          {tab === 'dashboard' && (
            <section className="fp-panel">
              <div className="fp-section-heading"><div><span className="fp-kicker">Wallet position</span><h2>Freedom-Plus dashboard</h2></div><button type="button" onClick={() => openView('activity')}>View activity<ArrowUpRight /></button></div>
              <div className="fp-dashboard-grid"><article><span>Progression</span><strong>{activeLevels.size} of 7 levels</strong><div className="fp-progress"><i style={{ width: `${(activeLevels.size / 7) * 100}%` }} /></div><small>{activeLevels.size === 7 ? 'All levels active' : `Level ${Math.min(activeLevels.size + 1, 7)} is next`}</small></article><article><span>Orbit records</span><strong>{data?.positions?.length || 0}</strong><small>Structural and payment placements</small></article><article><span>Wallet receipts</span><strong>{formatToken(paymentTotal)} USDT</strong><small>{data?.payments?.length || 0} payout components</small></article><article><span>Membership</span><strong>{NFT_TIERS.find((item) => item.tier === membership.tier)?.name || 'Not minted'}</strong><small>{membership.rewardEligible ? 'Reward eligible' : 'Not reward eligible'}</small></article></div>
              <div className="fp-split"><div><div className="fp-section-title"><Coins /><div><h2>Level progression</h2><p>Current on-chain activation state.</p></div></div><div className="fp-compact-levels">{FREEDOM_PLUS_LEVELS.map((item) => <button type="button" key={item.level} className={activeLevels.has(item.level) ? 'active' : ''} onClick={() => openView('levels')}><span>{item.level}</span><div><strong>{item.orbit}</strong><small>{activeLevels.has(item.level) ? 'Active' : 'Inactive'}</small></div></button>)}</div></div><div><div className="fp-section-title"><History /><div><h2>Recent receipts</h2><p>Latest indexed payout components.</p></div></div><div className="fp-recent-list">{data?.payments?.slice(0, 6).map((item) => <article key={item._id}><div><strong>Level {item.level} / Role {item.role}</strong><small>Block {item.blockNumber}</small></div><span>{formatToken(item.amount)} USDT</span></article>)}{!data?.payments?.length && <p className="fp-note">No payment receipts are indexed for this wallet.</p>}</div></div></div>
            </section>
          )}

          {tab === 'tokens' && (
            <section className="fp-panel">
              <div className="fp-section-heading"><div><span className="fp-kicker">Utility balances</span><h2>FPT and FPTr</h2></div></div>
              <div className="fp-token-balances"><article><ShieldCheck /><div><span>FGT available</span><strong>{data?.chain?.fgt || '0'}</strong><small>Qualifies for Freedom NFT</small></div></article><article><Coins /><div><span>FPT available</span><strong>{data?.chain?.fpt || '0'}</strong><small>Activation token and NFT qualification</small></div></article><article><RefreshCw /><div><span>FPTr available</span><strong>{data?.chain?.fptr || '0'}</strong><small>Completed cycle re-entry</small></div></article><article><Activity /><div><span>Indexed ledger</span><strong>{formatToken(ledgerTotal)}</strong><small>{data?.ledger?.length || 0} records</small></div></article></div>
              <div className="fp-table-wrap"><table><thead><tr><th>Block</th><th>Level</th><th>Category</th><th>Event</th><th>Amount</th><th>Transaction</th></tr></thead><tbody>{data?.ledger?.length ? data.ledger.map((item) => <tr key={item._id}><td>{item.blockNumber}</td><td>{item.level || '-'}</td><td>{String(item.category || '').replaceAll('_', ' ')}</td><td>{item.eventName}</td><td>{formatToken(item.amount)}</td><td title={item.txHash}>{short(item.txHash)}</td></tr>) : <tr><td colSpan="6" className="fp-no-data">No indexed Freedom-Plus ledger entries.</td></tr>}</tbody></table></div>
            </section>
          )}

          {tab === 'nftOverview' && (
            <section className="fp-panel">
              <div className="fp-section-heading"><div><span className="fp-kicker">Membership status</span><h2>Freedom NFT Program</h2></div><button type="button" onClick={() => openView('membership')}>Manage membership<ArrowUpRight /></button></div>
              <div className="fp-nft-tiers">{NFT_TIERS.map((item) => <article key={item.tier} className={membership.tier === item.tier ? 'current' : ''}><span>Tier {item.tier}</span><h3>{item.name}</h3><strong>{item.threshold.toLocaleString()} FGT and/or FPT</strong><div><small>Monthly pool allocation</small><b>{item.poolShare}%</b></div>{membership.tier === item.tier && <em><Check />Current membership</em>}</article>)}</div>
              <div className="fp-rule-grid"><article><strong>One active tier</strong><span>Only the highest active membership tier participates in its allocation.</span></article><article><strong>Locked qualification</strong><span>FGT and FPT committed to membership are locked, not burned.</span></article><article><strong>Immediate eligibility</strong><span>Unlocking below the threshold freezes reward eligibility immediately.</span></article><article><strong>Direct rewards</strong><span>Published monthly entitlements remain claimable by the eligible wallet.</span></article></div>
            </section>
          )}

          {tab === 'rewards' && (
            <section className="fp-panel">
              <div className="fp-section-heading"><div><span className="fp-kicker">Monthly distribution</span><h2>Freedom NFT rewards</h2></div></div>
              <div className="fp-reward-list fp-reward-list--standalone">{rewardPeriods.length ? rewardPeriods.map((period) => <article key={period.periodId}><div><strong>{period.periodId}</strong><span>{period.proof?.eligible ? `${formatToken(period.reward)} USDT` : period.proof?.snapshotAvailable === false ? 'Proof archive unavailable' : 'Not eligible at cutoff'}</span></div><small>{period.status === 'published' ? 'Published on-chain' : 'Awaiting founder publication'}</small>{period.proof?.eligible && period.status === 'published' && <button type="button" disabled={period.claimed || Boolean(busy)} onClick={() => claimReward(period)}>{period.claimed ? <><Check />Claimed</> : <><ArrowUpRight />Claim reward</>}</button>}</article>) : <p className="fp-note">No monthly reward period is available.</p>}</div>
            </section>
          )}

          {tab === 'membership' && membership.tier > 0 && (
            <section className="fp-panel fp-membership-tools">
              <div className="fp-tool-row">
                <div><h2>Qualification balance</h2><p>Unlocking tokens recalculates eligibility immediately. Restore requires the exact missing qualifying amount.</p></div>
                <label>FGT amount<input type="number" min="0" value={unlockForm.fgt} onChange={(event) => setUnlockForm((current) => ({ ...current, fgt: event.target.value }))} /></label>
                <label>FPT amount<input type="number" min="0" value={unlockForm.fpt} onChange={(event) => setUnlockForm((current) => ({ ...current, fpt: event.target.value }))} /></label>
                <button type="button" disabled={Boolean(busy)} onClick={membership.rewardEligible ? unlockQualification : restoreEligibility}>{busy === 'unlock' || busy === 'restore' ? 'Processing...' : membership.rewardEligible ? 'Unlock tokens' : 'Restore eligibility'}</button>
              </div>
              <div className="fp-reward-list">
                <h2>Monthly rewards</h2>
                {rewardPeriods.length ? rewardPeriods.map((period) => (
                  <article key={period.periodId}>
                    <div><strong>{period.periodId}</strong><span>{period.proof?.eligible ? `${formatToken(period.reward)} USDT` : 'Not eligible at cutoff'}</span></div>
                    <small>{period.status === 'published' ? 'Published on-chain' : 'Awaiting founder publication'}</small>
                    {period.proof?.eligible && period.status === 'published' && <button type="button" disabled={period.claimed || Boolean(busy)} onClick={() => claimReward(period)}>{period.claimed ? <><Check />Claimed</> : <><ArrowUpRight />Claim</>}</button>}
                  </article>
                )) : <p className="fp-note">No monthly reward period has been prepared yet.</p>}
              </div>
            </section>
          )}

          {tab === 'levels' && isConnected && data && (
            <section className="fp-panel fp-activation-center">
              <div className="fp-activation-hero">
                <div className="fp-activation-hero__copy">
                  <span className="fp-kicker">Manual progression center</span>
                  <h2>{data?.chain?.registered ? 'Manage your Freedom-Plus levels' : 'Begin Freedom-Plus'}</h2>
                  <p>{data?.chain?.registered ? 'Activate each level in order, review its orbit rules before signing, and inspect the live cycle after confirmation.' : 'Your existing FFN identity and permanent sponsor are preserved. Registration and the Level 1 P39 activation complete together.'}</p>
                  <div className="fp-activation-chips">
                    <span className={networkReady ? 'is-ready' : 'is-warning'}>{networkReady ? <CheckCircle2 /> : <AlertTriangle />}{networkReady ? NETWORK_CONFIG.chainName : 'Wrong network'}</span>
                    <span className={data?.chain?.registered ? 'is-ready' : ''}>{data?.chain?.registered ? <CheckCircle2 /> : <UserPlus />}{data?.chain?.registered ? 'Registered' : 'Registration required'}</span>
                    <span><Coins />{activeLevels.size} of 7 active</span>
                  </div>
                </div>
                <div className="fp-activation-progress">
                  <div><span>Level progression</span><strong>{activeLevels.size}/7</strong></div>
                  <ProgressionLineChart data={progressionData} maxValue={7} ariaLabel="Freedom-Plus level progression" />
                  <small>{nextLevel ? `Level ${nextLevel} is the next available activation.` : 'All seven Freedom-Plus levels are active.'}</small>
                </div>
              </div>

              {!data?.chain?.registered && <><div className="fp-registration"><div><UserPlus /><h2>Register and activate Level 1</h2><p>One confirmed transaction registers this wallet and activates the 50 USDT P39 level.</p></div><div className="fp-sponsor-lock"><span>Permanent sponsor</span><strong>{sponsorCode || short(sponsor)}</strong><small title={sponsor}>{ethers.isAddress(sponsor) ? short(sponsor) : 'Awaiting chain verification'}</small></div><button type="button" disabled={busy === 'register' || !ethers.isAddress(sponsor) || !networkReady} onClick={openRegistrationReview}>{busy === 'register' ? 'Processing...' : 'Review registration'}<ArrowRight /></button></div><InlineAlert tone="info" title="Sponsor relationship is locked"><p>Freedom-Plus uses the sponsor already recorded for this wallet in F-Freedom. It cannot be edited or replaced during registration.</p></InlineAlert><TransactionStatus txState={txState} onReset={() => setTxState({ status: 'idle', stage: 'idle', hash: '', note: '', error: null })} explorerBaseUrl={`${NETWORK_CONFIG.blockExplorerUrls[0]}/tx`} /></>}

              <div className="fp-level-grid fp-level-grid--managed">
                {FREEDOM_PLUS_LEVELS.map((item) => {
                  const active = activeLevels.has(item.level)
                  const previousActive = item.level === 1 || activeLevels.has(item.level - 1)
                  const locked = !active && (!data?.chain?.registered || !previousActive)
                  const orbitSummary = activationSummary?.orbitSummaries?.find((entry) => Number(entry.level) === item.level)
                  return <article className={`fp-level fp-managed-level ${active ? 'active' : ''} ${locked ? 'locked' : ''} ${item.level === nextLevel ? 'next' : ''}`} key={item.level}>
                    <div className="fp-level-title"><span>Level {item.level}</span><strong>{item.orbit}</strong></div>
                    <div className="fp-managed-level__price"><h3>{item.price.toLocaleString()} USDT</h3><small>{item.price.toLocaleString()} FPT on first activation</small></div>
                    <dl><div><dt>Positions</dt><dd>{item.positions}</dd></div><div><dt>Rings</dt><dd>{item.rings}</dd></div><div><dt>Payout roles</dt><dd>{item.payouts}</dd></div><div><dt>Current cycle</dt><dd>{active ? (orbitSummary?.currentCycle || 1) : '-'}</dd></div></dl>
                    {active && <div className="fp-managed-level__occupancy"><span><i style={{ width: `${Math.min(100, ((orbitSummary?.filledPositions || 0) / item.positions) * 100)}%` }} /></span><small>{orbitSummary?.filledPositions || 0} of {item.positions} current-cycle positions recorded</small></div>}
                    {active ? <div className="fp-managed-level__actions"><span className="fp-active"><Check />Active</span><button type="button" className="fp-level-view" onClick={() => { setSelectedLevel(item.level); setSelectedPosition(null); document.querySelector('.fp-level-orbits')?.scrollIntoView({ behavior: 'smooth' }) }}>View orbit<ArrowRight /></button></div> : <button type="button" disabled={locked || Boolean(busy) || !networkReady} onClick={() => openActivationReview(item)}>{busy === `level-${item.level}` ? 'Processing...' : locked ? <><Lock />{data?.chain?.registered ? `Activate Level ${item.level - 1} first` : 'Registration required'}</> : `Review Level ${item.level}`}</button>}
                  </article>
                })}
              </div>
            </section>
          )}

          {tab === 'levels' && data?.chain?.registered && <section className="fp-panel fp-level-orbits"><div className="fp-section-heading"><div><span className="fp-kicker">Live level structure</span><h2>Orbit position and cycle</h2><p>Select an active level to inspect its current indexed orbit.</p></div></div><div className="fp-toolbar"><label>Level<select value={selectedLevel} onChange={(event) => { setSelectedLevel(Number(event.target.value)); setSelectedPosition(null) }}>{FREEDOM_PLUS_LEVELS.map((item) => <option key={item.level} value={item.level} disabled={!activeLevels.has(item.level)}>Level {item.level} / {item.orbit}{activeLevels.has(item.level) ? '' : ' (inactive)'}</option>)}</select></label><label>Cycle<input type="number" min="1" value={cycle} placeholder="Current" onChange={(event) => { setCycle(event.target.value); setSelectedPosition(null) }} /></label><button type="button" onClick={loadOrbit}><RefreshCw />Refresh orbit</button></div><div className="fp-orbit-summary"><article><span>Orbit engine</span><strong>{selectedLevelConfig?.orbit}</strong><small>Level {selectedLevel}</small></article><article><span>Recorded positions</span><strong>{visualOrbit.length} / {selectedLevelConfig?.positions}</strong><small>{cycle ? `Cycle ${cycle}` : orbitCycles.length ? `Current cycle ${orbitCycles[0]}` : 'Current cycle'}</small></article><article><span>Ring structure</span><strong>{selectedLevelConfig?.rings}</strong><small>Deterministic topology</small></article><article><span>Payout roles</span><strong>{selectedLevelConfig?.payouts}</strong><small>Independently recorded</small></article></div><div className="fp-orbit-layout"><FreedomPlusOrbit orbitType={selectedLevelConfig?.orbit} positions={visualOrbit} owner={account} onSelect={setSelectedPosition} /><aside className="fp-position-inspector">{selectedPosition ? <><span>Position {selectedPosition.position}</span><h3>{selectedPosition.financial ? 'Payment-linked placement' : 'Structural placement'}</h3><dl><div><dt>Participant</dt><dd title={selectedPosition.participant}>{short(selectedPosition.participant)}</dd></div><div><dt>Matrix parent</dt><dd title={selectedPosition.structuralParent}>{short(selectedPosition.structuralParent)}</dd></div><div><dt>Ring</dt><dd>{selectedPosition.ring || selectedPosition.line}</dd></div><div><dt>Cycle</dt><dd>{selectedPosition.cycle}</dd></div><div><dt>Amount</dt><dd>{formatToken(selectedPosition.amount)} USDT</dd></div></dl></> : <><Network /><h3>Select a filled position</h3><p>Inspect its participant, structural parent, ring, cycle and recorded amount.</p></>}</aside></div></section>}

          {tab === 'orbits' && <section className="fp-panel"><div className="fp-toolbar"><label>Level<select value={selectedLevel} onChange={(event) => { setSelectedLevel(Number(event.target.value)); setSelectedPosition(null) }}>{FREEDOM_PLUS_LEVELS.map((item) => <option key={item.level} value={item.level}>Level {item.level} / {item.orbit}</option>)}</select></label><label>Cycle<input type="number" min="1" value={cycle} placeholder="Current" onChange={(event) => { setCycle(event.target.value); setSelectedPosition(null) }} /></label><button type="button" onClick={loadOrbit}><RefreshCw />Refresh</button></div><div className="fp-orbit-summary"><article><span>Orbit engine</span><strong>{selectedLevelConfig?.orbit}</strong><small>Level {selectedLevel}</small></article><article><span>Recorded positions</span><strong>{visualOrbit.length} / {selectedLevelConfig?.positions}</strong><small>{cycle ? `Cycle ${cycle}` : orbitCycles.length ? `Current cycle ${orbitCycles[0]}` : 'Current cycle'}</small></article><article><span>Ring structure</span><strong>{selectedLevelConfig?.rings}</strong><small>Deterministic parent topology</small></article><article><span>Payout roles</span><strong>{selectedLevelConfig?.payouts}</strong><small>Roles remain independently recorded</small></article></div><div className="fp-orbit-layout"><FreedomPlusOrbit orbitType={selectedLevelConfig?.orbit} positions={visualOrbit} owner={account} onSelect={setSelectedPosition} /><aside className="fp-position-inspector">{selectedPosition ? <><span>Position {selectedPosition.position}</span><h3>{selectedPosition.financial ? 'Payment-linked placement' : 'Structural placement'}</h3><dl><div><dt>Participant</dt><dd title={selectedPosition.participant}>{short(selectedPosition.participant)}</dd></div><div><dt>Matrix parent</dt><dd title={selectedPosition.structuralParent}>{short(selectedPosition.structuralParent)}</dd></div><div><dt>Ring</dt><dd>{selectedPosition.ring || selectedPosition.line}</dd></div><div><dt>Cycle</dt><dd>{selectedPosition.cycle}</dd></div><div><dt>Amount</dt><dd>{formatToken(selectedPosition.amount)} USDT</dd></div></dl></> : <><Network /><h3>Select a filled position</h3><p>Inspect its participant, exact structural parent, ring, cycle and recorded amount.</p></>}</aside></div><div className="fp-section-title"><History /><div><h2>Position ledger</h2><p>The diagram and table show the selected cycle only.</p></div></div><div className="fp-table-wrap"><table><thead><tr><th>Cycle</th><th>Position</th><th>Ring</th><th>Participant</th><th>Matrix parent</th><th>Entry</th><th>Amount</th></tr></thead><tbody>{visualOrbit.length ? visualOrbit.map((item) => <tr key={`${item.cycle}-${item.position}-${item.activationId || item._id}`}><td>{item.cycle}</td><td>{item.position}</td><td>{item.ring || item.line}</td><td title={item.participant}>{short(item.participant)}</td><td title={item.structuralParent}>{short(item.structuralParent)}</td><td>{item.financial ? 'Payment-linked placement' : 'Structural placement'}</td><td>{formatToken(item.amount)} USDT</td></tr>) : <tr><td colSpan="7" className="fp-no-data">No indexed positions for this level and cycle.</td></tr>}</tbody></table></div></section>}

          {tab === 'membership' && <section className="fp-panel fp-membership"><div className="fp-membership-status"><ShieldCheck /><div><span>Current membership</span><h2>{NFT_TIERS.find((item) => item.tier === membership.tier)?.name || 'No active NFT'}</h2><p>{membership.tier ? `${formatToken(membership.lockedFGT)} FGT + ${formatToken(membership.lockedFPT)} FPT locked` : 'Choose a tier and commit an exact qualifying token total.'}</p></div><strong className={membership.rewardEligible ? 'eligible' : ''}>{membership.rewardEligible ? 'Reward eligible' : 'Not eligible'}</strong></div><div className="fp-tier-grid">{NFT_TIERS.map((item) => <button type="button" className={Number(nftForm.tier) === item.tier ? 'selected' : ''} key={item.tier} onClick={() => setNftForm({ tier: item.tier, fgt: '0', fpt: String(item.threshold) })}><span>{item.name}</span><strong>{item.threshold.toLocaleString()} tokens</strong><small>{item.poolShare}% tier allocation</small></button>)}</div><div className="fp-token-form"><label>FGT commitment<input type="number" min="0" value={nftForm.fgt} onChange={(event) => setNftForm((current) => ({ ...current, fgt: event.target.value }))} /></label><label>FPT commitment<input type="number" min="0" value={nftForm.fpt} onChange={(event) => setNftForm((current) => ({ ...current, fpt: event.target.value }))} /></label><button type="button" onClick={submitMembership} disabled={Boolean(busy)}>{busy === 'membership' ? 'Processing...' : membership.tier ? 'Update membership' : 'Mint membership'}</button></div><p className="fp-note">FGT and FPT used for membership are locked, not burned. Removing enough qualifying tokens freezes future reward eligibility immediately; prior finalized monthly entitlements remain claimable.</p></section>}

          {tab === 'account' && <section className="fp-panel"><div className="fp-section-heading"><div><span className="fp-kicker">Shared FFN identity</span><h2>Freedom-Plus account</h2></div></div><div className="fp-account-grid"><article><span>Wallet</span><strong title={account}>{account || 'Not connected'}</strong><small>Shared across F-Freedom and Freedom-Plus</small></article><article><span>FFN ID</span><strong>{referralId || 'Not available'}</strong><small>No second Freedom-Plus referral ID</small></article><article><span>Permanent sponsor</span><strong>{sponsorCode || short(data?.chain?.sponsor || sponsor)}</strong><small title={data?.chain?.sponsor || sponsor}>{short(data?.chain?.sponsor || sponsor)}</small></article><article><span>Freedom-Plus number</span><strong>{data?.chain?.registered ? `#${data.chain.participantNumber}` : 'Not registered'}</strong><small>Internal record, not a referral identity</small></article></div><div className="fp-account-grid"><article><span>USDT available</span><strong>{data?.chain?.usdt || '0'}</strong><small>Wallet balance</small></article><article><span>FPT available</span><strong>{data?.chain?.fpt || '0'}</strong><small>First-activation utility token</small></article><article><span>FPTr available</span><strong>{data?.chain?.fptr || '0'}</strong><small>Recycle utility token</small></article><article><span>NFT status</span><strong>{NFT_TIERS.find((item) => item.tier === membership.tier)?.name || 'Not minted'}</strong><small>{membership.rewardEligible ? 'Reward eligible' : 'Not reward eligible'}</small></article></div></section>}

          {tab === 'activity' && <section className="fp-panel"><div className="fp-health"><article><span>Backend indexing</span><strong>{status?.enabled ? 'Enabled' : 'Not enabled'}</strong><small>{status?.events || 0} decoded events</small></article><article><span>Reconciliation</span><strong>{reconciliation?.passed ? 'Passed' : 'Pending'}</strong><small>{reconciliation?.confirmedHead ? `Through block ${reconciliation.confirmedHead}` : 'Awaiting deployment data'}</small></article><article><span>Indexed participants</span><strong>{status?.participants || 0}</strong><small>Chain count {reconciliation?.totals?.chainParticipants ?? '-'}</small></article><article><span>Wallet receipts</span><strong>{formatToken(paymentTotal)} USDT</strong><small>{data?.payments?.length || 0} component receipts shown</small></article></div><div className="fp-section-title"><History /><div><h2>Payment receipts</h2><p>Each payout component remains separate, including its level, role, candidate, fallback state and transaction.</p></div></div><div className="fp-table-wrap"><table><thead><tr><th>Block</th><th>Level</th><th>Role</th><th>Rate</th><th>Amount</th><th>Route</th><th>Transaction</th></tr></thead><tbody>{data?.payments?.length ? data.payments.map((item) => <tr key={item._id}><td>{item.blockNumber}</td><td>{item.level}</td><td>{item.role}</td><td>{Number(item.bps || 0) / 100}%</td><td>{formatToken(item.amount)} USDT</td><td>{item.id1Fallback ? 'ID1 fallback' : `From ${short(item.originalCandidate)}`}</td><td title={item.txHash}>{short(item.txHash)}</td></tr>) : <tr><td colSpan="7" className="fp-no-data">No indexed payments for this wallet.</td></tr>}</tbody></table></div></section>}

      {pendingAction && (
        <div className="fp-action-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget && !busy) setPendingAction(null) }}>
          <section className="fp-action-modal" role="dialog" aria-modal="true" aria-labelledby="fp-action-title">
            <header>
              <div><span className="fp-kicker">Review before signing</span><h2 id="fp-action-title">{pendingAction.type === 'register' ? 'Register and activate Level 1' : `Activate Level ${pendingAction.level}`}</h2></div>
              <button type="button" className="fp-action-modal__close" onClick={() => setPendingAction(null)} aria-label="Close activation review"><X /></button>
            </header>

            <div className="fp-action-summary">
              <article><span>Program action</span><strong>{pendingAction.type === 'register' ? 'Registration + Level 1' : `Level ${pendingAction.level} activation`}</strong></article>
              <article><span>Orbit engine</span><strong>{pendingAction.orbit}</strong></article>
              <article><span>Amount</span><strong>{pendingAction.price.toLocaleString()} USDT</strong></article>
              <article><span>Token issuance</span><strong>{pendingAction.price.toLocaleString()} FPT</strong></article>
            </div>

            {pendingAction.type === 'register' && <div className="fp-action-sponsor"><User /><div><span>Permanent sponsor from F-Freedom</span><strong>{sponsorCode || short(sponsor)}</strong><small title={sponsor}>{short(sponsor)}</small></div></div>}

            <div className="fp-action-checks">
              {[
                { label: 'Wallet connected', passed: isConnected, hint: short(account) },
                { label: `Correct network`, passed: networkReady, hint: NETWORK_CONFIG.chainName },
                { label: pendingAction.type === 'register' ? 'Permanent sponsor verified' : 'Freedom-Plus registration complete', passed: pendingAction.type === 'register' ? ethers.isAddress(sponsor) : Boolean(data?.chain?.registered), hint: pendingAction.type === 'register' ? 'Inherited from the existing FFN identity' : referralId || short(account) },
                { label: pendingAction.level === 1 ? 'Level 1 entry is available' : `Level ${pendingAction.level - 1} is active`, passed: pendingAction.level === 1 || activeLevels.has(pendingAction.level - 1), hint: 'Levels activate sequentially' },
                { label: `${pendingAction.price.toLocaleString()} USDT available`, passed: Number(String(data?.chain?.usdt || '0').replaceAll(',', '')) >= pendingAction.price, hint: `Wallet balance: ${data?.chain?.usdt || '0'} USDT` },
              ].map((item) => <article className={item.passed ? 'passed' : 'failed'} key={item.label}>{item.passed ? <CheckCircle2 /> : <AlertTriangle />}<div><strong>{item.label}</strong><span>{item.hint}</span></div></article>)}
            </div>

            <InlineAlert tone="info" title="How confirmation works" icon={Info}>
              <p>If USDT approval is required, your wallet will first request approval. After it confirms, a second wallet request completes the {pendingAction.type === 'register' ? 'registration and Level 1 activation' : 'level activation'}.</p>
            </InlineAlert>

            <label className="fp-security-acknowledgment">
              <input type="checkbox" checked={securityAccepted} onChange={(event) => setSecurityAccepted(event.target.checked)} />
              <span><strong>I have verified the wallet, level and amount.</strong> Blockchain transactions are irreversible, and Fin Freedom Network will never request my private key or recovery phrase.</span>
            </label>

            <footer>
              <button type="button" className="fp-action-secondary" onClick={() => setPendingAction(null)}>Cancel</button>
              <button type="button" className="fp-action-primary" disabled={!securityAccepted || !networkReady || Number(String(data?.chain?.usdt || '0').replaceAll(',', '')) < pendingAction.price} onClick={confirmPendingAction}>Continue to wallet<ArrowRight /></button>
            </footer>
          </section>
        </div>
      )}
    </main>
  )
}



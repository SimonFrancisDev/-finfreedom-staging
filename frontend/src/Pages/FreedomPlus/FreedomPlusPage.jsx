import { useCallback, useEffect, useMemo, useState } from 'react'
import { ethers } from 'ethers'
import { Activity, ArrowUpRight, Check, Coins, History, LayoutDashboard, LockKeyhole, Network, RefreshCw, ShieldCheck, Trophy, UserPlus, Wallet } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useWallet } from '../../hooks/useWallet'
import { useToast } from '../../components/feedback'
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
  nftOverview: '/freedom-nft',
  membership: '/freedom-nft/membership',
  rewards: '/freedom-nft/rewards',
}
const VIEW_TABS = [
  ['overview', <LayoutDashboard />, 'Overview'],
  ['dashboard', <Activity />, 'Dashboard'],
  ['levels', <Coins />, 'Activation'],
  ['orbits', <Network />, 'Orbits'],
  ['tokens', <Coins />, 'FPT / FPTr'],
  ['activity', <History />, 'Activity'],
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
  const [referralId, setReferralId] = useState('')
  const [selectedLevel, setSelectedLevel] = useState(1)
  const [cycle, setCycle] = useState('')
  const [data, setData] = useState(null)
  const [orbit, setOrbit] = useState([])
  const [status, setStatus] = useState(null)
  const [reconciliation, setReconciliation] = useState(null)
  const [nftForm, setNftForm] = useState({ tier: 1, fgt: '0', fpt: '5700' })
  const [unlockForm, setUnlockForm] = useState({ fgt: '0', fpt: '0' })
  const [rewardPeriods, setRewardPeriods] = useState([])

  const activeLevels = useMemo(() => new Set((data?.levels || []).filter((item) => item.active).map((item) => Number(item.level))), [data])
  const membership = data?.chain?.membership || normalizeMembership(null)
  const selectedLevelConfig = FREEDOM_PLUS_LEVELS.find((item) => item.level === selectedLevel)
  const orbitCycles = useMemo(() => [...new Set(orbit.map((item) => Number(item.cycle)))].sort((a, b) => b - a), [orbit])
  const paymentTotal = useMemo(
    () => (data?.payments || []).reduce((total, item) => total + BigInt(item.amount || 0), 0n),
    [data]
  )
  const ledgerTotal = useMemo(
    () => (data?.ledger || []).reduce((total, item) => total + BigInt(item.amount || 0), 0n),
    [data]
  )

  const openView = (view) => {
    setTab(view)
    navigate(VIEW_ROUTES[view])
  }

  const load = useCallback(async () => {
    if (!FREEDOM_PLUS_ENABLED || !account) return
    setLoading(true)
    try {
      const contracts = getFreedomPlusReadContracts()
      const [apiData, apiStatus, apiReconciliation, periods, identity, registered, participantNumber, chainSponsor, usdt, fpt, fptr, membershipRaw, levelFlags] = await Promise.all([
        freedomPlusApi.participant(account).catch(() => null),
        freedomPlusApi.status().catch(() => null),
        freedomPlusApi.reconciliation().catch(() => null),
        freedomPlusApi.rewardPeriods().catch(() => []),
        freedomPlusApi.referralForWallet(account).catch(() => null),
        contracts.registration.isRegistered(account),
        contracts.registration.participantNumber(account),
        contracts.registration.sponsorOf(account),
        contracts.usdt.balanceOf(account),
        contracts.fpt.balanceOf(account),
        contracts.fptr.balanceOf(account),
        contracts.nftMembership.membershipOf(account),
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
          fpt: formatToken(fpt),
          fptr: formatToken(fptr),
          membership: normalizeMembership(membershipRaw),
        },
      })
      setStatus(apiStatus)
      setReconciliation(apiReconciliation)
      setReferralId(identity?.referralId || identity?.shortCode || '')
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
      if (chainSponsor && chainSponsor !== ZERO) setSponsor(chainSponsor)
    } catch (error) {
      toast.error(error?.shortMessage || error?.message || 'Unable to load Freedom-Plus data.')
    } finally {
      setLoading(false)
    }
  }, [account, toast])

  useEffect(() => { load() }, [load])
  useEffect(() => { setTab(initialTab) }, [initialTab])

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
    if (tab === 'orbits' && account) loadOrbit()
  }, [account, loadOrbit, tab])

  const transact = async (key, operation, success) => {
    setBusy(key)
    try {
      const tx = await operation()
      toast.info('Transaction submitted. Waiting for confirmation.')
      await tx.wait()
      toast.success(success)
      await load()
      if (tab === 'orbits') await loadOrbit()
    } catch (error) {
      toast.error(error?.shortMessage || error?.reason || error?.message || 'Transaction failed.')
    } finally {
      setBusy('')
    }
  }

  const approveAndRun = async (price, action) => {
    const contracts = getFreedomPlusWriteContracts()
    const amount = tokenUnits(price)
    const allowance = await contracts.usdt.allowance(account, FREEDOM_PLUS_ADDRESSES.levelManager)
    if (allowance < amount) {
      const approval = await contracts.usdt.approve(FREEDOM_PLUS_ADDRESSES.levelManager, amount)
      toast.info('USDT approval submitted.')
      await approval.wait()
    }
    return action(contracts)
  }

  const register = async () => {
    setBusy('register')
    try {
      const input = sponsor.trim()
      const resolved = ethers.isAddress(input)
        ? { walletAddress: input }
        : await freedomPlusApi.resolveReferral(input.toUpperCase())
      const sponsorWallet = resolved?.walletAddress
      if (!ethers.isAddress(sponsorWallet) || sponsorWallet === ZERO || sponsorWallet.toLowerCase() === account?.toLowerCase()) {
        throw new Error('Enter a valid sponsor FFN ID different from your own identity.')
      }
      const readContracts = getFreedomPlusReadContracts()
      if (!(await readContracts.registration.isRegistered(sponsorWallet))) {
        throw new Error('This FFN sponsor has not registered in Freedom-Plus yet.')
      }
      const tx = await approveAndRun(50, (contracts) => contracts.registration.register(sponsorWallet))
      toast.info('Transaction submitted. Waiting for confirmation.')
      await tx.wait()
      toast.success('Registration and Level 1 activation confirmed.')
      await load()
    } catch (error) {
      toast.error(error?.shortMessage || error?.reason || error?.message || 'Registration failed.')
    } finally {
      setBusy('')
    }
  }

  const activate = (level, price) => {
    transact(`level-${level}`, () => approveAndRun(price, (contracts) => contracts.registration.activateLevel(level)), `Level ${level} activation confirmed.`)
  }

  const submitMembership = () => {
    const tier = Number(nftForm.tier)
    const fgt = tokenUnits(nftForm.fgt)
    const fpt = tokenUnits(nftForm.fpt)
    const contracts = getFreedomPlusWriteContracts()
    const current = membership.tier
    const operation = current === 0
      ? () => contracts.nftMembership.mintMembership(tier, fgt, fpt)
      : tier > current
        ? () => contracts.nftMembership.upgradeMembership(tier, fgt, fpt)
        : () => contracts.nftMembership.downgradeMembership(tier, fgt, fpt)
    transact('membership', operation, 'Freedom NFT membership updated.')
  }

  const unlockQualification = () => {
    const contracts = getFreedomPlusWriteContracts()
    transact('unlock', () => contracts.nftMembership.unlockQualification(tokenUnits(unlockForm.fgt), tokenUnits(unlockForm.fpt)), 'Qualifying tokens unlocked. Reward eligibility recalculated.')
  }

  const restoreEligibility = () => {
    const contracts = getFreedomPlusWriteContracts()
    transact('restore', () => contracts.nftMembership.restoreEligibility(tokenUnits(unlockForm.fgt), tokenUnits(unlockForm.fpt)), 'Freedom NFT reward eligibility restored.')
  }

  const claimReward = (period) => {
    const contracts = getFreedomPlusWriteContracts()
    transact(`claim-${period.periodId}`, () => contracts.nftRewardDistributor.claim(period.periodId, period.proof.tier, period.proof.proof), `Reward for ${period.periodId} claimed.`)
  }

  if (!FREEDOM_PLUS_ENABLED) {
    return <main className="freedom-plus-page"><section className="fp-empty"><ShieldCheck /><h1>Freedom-Plus is not enabled</h1><p>This environment has not been connected to a verified Freedom-Plus deployment.</p></section></main>
  }

  return (
    <main className="freedom-plus-page">
      <header className="fp-header">
        <div><span className="fp-kicker">Advanced participation</span><h1>Freedom-Plus</h1><p>Seven manually activated levels, deterministic orbit placement and long-term Freedom NFT progression.</p></div>
        <button className="fp-icon-button" type="button" onClick={load} disabled={loading} title="Refresh chain and indexed data"><RefreshCw className={loading ? 'spin' : ''} /></button>
      </header>

      {!isConnected && (
        <section className="fp-connect"><Wallet /><div><h2>Connect your wallet</h2><p>Connect on the configured Polygon network to view or manage Freedom-Plus.</p></div><button type="button" onClick={connect}>Connect</button></section>
      )}

      {isConnected && (
        <section className="fp-metrics">
            <article><span>FFN ID</span><strong>{data?.chain?.registered ? (referralId || 'Resolving...') : 'Not registered'}</strong><small>{short(account)}</small></article>
            <article><span>Active levels</span><strong>{activeLevels.size} / 7</strong><small>Manual progression</small></article>
            <article><span>USDT available</span><strong>{data?.chain?.usdt || '0'} USDT</strong><small>Wallet balance</small></article>
            <article><span>FPT / FPTr</span><strong>{data?.chain?.fpt || '0'} / {data?.chain?.fptr || '0'}</strong><small>Activation / recycle tokens</small></article>
        </section>
      )}

      <nav className="fp-tabs" aria-label="Freedom-Plus views">
            {VIEW_TABS.map(([value, icon, label]) => (
              <button type="button" className={tab === value ? 'active' : ''} onClick={() => openView(value)} key={value}>{icon}{label}</button>
            ))}
      </nav>

          {tab === 'overview' && (
            <section className="fp-panel">
              <div className="fp-section-heading"><div><span className="fp-kicker">Program structure</span><h2>Seven levels. Six orbit engines.</h2></div><button type="button" onClick={() => openView(data?.chain?.registered ? 'dashboard' : 'levels')}>{data?.chain?.registered ? 'Open dashboard' : 'Register in Freedom-Plus'}<ArrowUpRight /></button></div>
              <div className="fp-rule-grid"><article><strong>Manual progression</strong><span>Levels activate sequentially from Level 1 through Level 7.</span></article><article><strong>First activation</strong><span>Each paid level issues FPT equal to its USDT level value.</span></article><article><strong>Cycle re-entry</strong><span>A completed orbit reopens the same level and issues FPTr at 50% of FPT.</span></article><article><strong>System allocation</strong><span>Each payable arrival keeps its participant roles and 10% charge separate.</span></article></div>
              <div className="fp-level-map">{FREEDOM_PLUS_LEVELS.map((item) => <button type="button" key={item.level} onClick={() => openView('levels')}><span>Level {item.level}</span><strong>{item.orbit}</strong><small>{item.price.toLocaleString()} USDT</small><em>{item.rings}</em></button>)}</div>
            </section>
          )}

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
              <div className="fp-token-balances"><article><Coins /><div><span>FPT available</span><strong>{data?.chain?.fpt || '0'}</strong><small>First level activations</small></div></article><article><RefreshCw /><div><span>FPTr available</span><strong>{data?.chain?.fptr || '0'}</strong><small>Completed cycle re-entry</small></div></article><article><Activity /><div><span>Indexed ledger</span><strong>{formatToken(ledgerTotal)}</strong><small>{data?.ledger?.length || 0} records</small></div></article></div>
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

          {tab === 'levels' && (
            <section className="fp-panel">
              {!data?.chain?.registered && <div className="fp-registration"><div><UserPlus /><h2>Register and activate Level 1</h2><p>Your existing FFN identity is used. Registration and the first 50 USDT P39 activation execute atomically.</p></div><label>Sponsor FFN ID<input value={sponsor} onChange={(event) => setSponsor(event.target.value.trim())} placeholder="FFN-XXXXXX" /></label><button type="button" disabled={busy === 'register'} onClick={register}>{busy === 'register' ? 'Processing...' : 'Register / 50 USDT'}</button></div>}
              <div className="fp-level-grid">
                {FREEDOM_PLUS_LEVELS.map((item) => {
                  const active = activeLevels.has(item.level)
                  const previousActive = item.level === 1 || activeLevels.has(item.level - 1)
                  return <article className={`fp-level ${active ? 'active' : ''}`} key={item.level}><div className="fp-level-title"><span>Level {item.level}</span><strong>{item.orbit}</strong></div><h3>{item.price.toLocaleString()} USDT</h3><dl><div><dt>Positions</dt><dd>{item.positions}</dd></div><div><dt>Rings</dt><dd>{item.rings}</dd></div><div><dt>Payout roles</dt><dd>{item.payouts}</dd></div><div><dt>FPT</dt><dd>{item.price.toLocaleString()}</dd></div></dl>{active ? <span className="fp-active"><Check />Active</span> : <button type="button" disabled={!data?.chain?.registered || !previousActive || Boolean(busy)} onClick={() => activate(item.level, item.price)}>{busy === `level-${item.level}` ? 'Processing...' : item.level === 1 && !data?.chain?.registered ? 'Registration required' : `Activate Level ${item.level}`}</button>}</article>
                })}
              </div>
            </section>
          )}

          {tab === 'orbits' && <section className="fp-panel"><div className="fp-toolbar"><label>Level<select value={selectedLevel} onChange={(event) => setSelectedLevel(Number(event.target.value))}>{FREEDOM_PLUS_LEVELS.map((item) => <option key={item.level} value={item.level}>Level {item.level} / {item.orbit}</option>)}</select></label><label>Cycle<input type="number" min="1" value={cycle} placeholder="All" onChange={(event) => setCycle(event.target.value)} /></label><button type="button" onClick={loadOrbit}><RefreshCw />Refresh</button></div><div className="fp-orbit-summary"><article><span>Orbit engine</span><strong>{selectedLevelConfig?.orbit}</strong><small>Level {selectedLevel}</small></article><article><span>Recorded positions</span><strong>{orbit.length} / {selectedLevelConfig?.positions}</strong><small>{cycle ? `Cycle ${cycle}` : `${orbitCycles.length} cycle${orbitCycles.length === 1 ? '' : 's'} shown`}</small></article><article><span>Ring structure</span><strong>{selectedLevelConfig?.rings}</strong><small>Deterministic parent topology</small></article><article><span>Payout roles</span><strong>{selectedLevelConfig?.payouts}</strong><small>Roles remain independently recorded</small></article></div><div className="fp-table-wrap"><table><thead><tr><th>Cycle</th><th>Position</th><th>Ring</th><th>Participant</th><th>Matrix parent</th><th>Entry</th><th>Amount</th></tr></thead><tbody>{orbit.length ? orbit.map((item) => <tr key={`${item.cycle}-${item.position}-${item.activationId || item._id}`}><td>{item.cycle}</td><td>{item.position}</td><td>{item.ring || item.line}</td><td title={item.participant}>{short(item.participant)}</td><td title={item.structuralParent}>{short(item.structuralParent)}</td><td>{item.financial ? 'Payment placement' : 'Structural placement'}</td><td>{formatToken(item.amount)} USDT</td></tr>) : <tr><td colSpan="7" className="fp-no-data">No indexed positions for this level and cycle.</td></tr>}</tbody></table></div></section>}

          {tab === 'membership' && <section className="fp-panel fp-membership"><div className="fp-membership-status"><ShieldCheck /><div><span>Current membership</span><h2>{NFT_TIERS.find((item) => item.tier === membership.tier)?.name || 'No active NFT'}</h2><p>{membership.tier ? `${formatToken(membership.lockedFGT)} FGT + ${formatToken(membership.lockedFPT)} FPT locked` : 'Choose a tier and commit an exact qualifying token total.'}</p></div><strong className={membership.rewardEligible ? 'eligible' : ''}>{membership.rewardEligible ? 'Reward eligible' : 'Not eligible'}</strong></div><div className="fp-tier-grid">{NFT_TIERS.map((item) => <button type="button" className={Number(nftForm.tier) === item.tier ? 'selected' : ''} key={item.tier} onClick={() => setNftForm({ tier: item.tier, fgt: '0', fpt: String(item.threshold) })}><span>{item.name}</span><strong>{item.threshold.toLocaleString()} tokens</strong><small>{item.poolShare}% tier allocation</small></button>)}</div><div className="fp-token-form"><label>FGT commitment<input type="number" min="0" value={nftForm.fgt} onChange={(event) => setNftForm((current) => ({ ...current, fgt: event.target.value }))} /></label><label>FPT commitment<input type="number" min="0" value={nftForm.fpt} onChange={(event) => setNftForm((current) => ({ ...current, fpt: event.target.value }))} /></label><button type="button" onClick={submitMembership} disabled={Boolean(busy)}>{busy === 'membership' ? 'Processing...' : membership.tier ? 'Update membership' : 'Mint membership'}</button></div><p className="fp-note">FGT and FPT used for membership are locked, not burned. Removing enough qualifying tokens freezes future reward eligibility immediately; prior finalized monthly entitlements remain claimable.</p></section>}

          {tab === 'activity' && <section className="fp-panel"><div className="fp-health"><article><span>Backend indexing</span><strong>{status?.enabled ? 'Enabled' : 'Not enabled'}</strong><small>{status?.events || 0} decoded events</small></article><article><span>Reconciliation</span><strong>{reconciliation?.passed ? 'Passed' : 'Pending'}</strong><small>{reconciliation?.confirmedHead ? `Through block ${reconciliation.confirmedHead}` : 'Awaiting deployment data'}</small></article><article><span>Indexed participants</span><strong>{status?.participants || 0}</strong><small>Chain count {reconciliation?.totals?.chainParticipants ?? '-'}</small></article><article><span>Wallet receipts</span><strong>{formatToken(paymentTotal)} USDT</strong><small>{data?.payments?.length || 0} component receipts shown</small></article></div><div className="fp-section-title"><History /><div><h2>Payment receipts</h2><p>Each payout component remains separate, including its level, role, candidate, fallback state and transaction.</p></div></div><div className="fp-table-wrap"><table><thead><tr><th>Block</th><th>Level</th><th>Role</th><th>Rate</th><th>Amount</th><th>Route</th><th>Transaction</th></tr></thead><tbody>{data?.payments?.length ? data.payments.map((item) => <tr key={item._id}><td>{item.blockNumber}</td><td>{item.level}</td><td>{item.role}</td><td>{Number(item.bps || 0) / 100}%</td><td>{formatToken(item.amount)} USDT</td><td>{item.id1Fallback ? 'ID1 fallback' : `From ${short(item.originalCandidate)}`}</td><td title={item.txHash}>{short(item.txHash)}</td></tr>) : <tr><td colSpan="7" className="fp-no-data">No indexed payments for this wallet.</td></tr>}</tbody></table></div></section>}
    </main>
  )
}



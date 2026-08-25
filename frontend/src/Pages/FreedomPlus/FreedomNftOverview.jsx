import { createElement } from 'react'
import { ArrowRight, Check, Flame, LockKeyhole, ShieldCheck, Trophy, WalletCards } from 'lucide-react'
import { NFT_TIERS } from '../../Services/freedomPlus'

const PRINCIPLES = [
  { icon: LockKeyhole, title: 'Tokens stay locked', text: 'Committed FGT and FPT remain yours, but cannot be reused while supporting membership.' },
  { icon: ShieldCheck, title: 'One active tier', text: 'Your highest active membership is the only tier included in each monthly allocation.' },
  { icon: Flame, title: 'Immediate qualification', text: 'Eligibility updates immediately when locked qualifying value moves below or returns to the tier threshold.' },
  { icon: Trophy, title: 'Verifiable rewards', text: 'Monthly eligibility and reward proofs remain tied to the published on-chain period.' },
]

export default function FreedomNftOverview({ membership, formatToken, openView }) {
  const currentTier = NFT_TIERS.find((tier) => tier.tier === membership.tier)

  return <div className="fn-program-page">
    <section className="fn-program-hero">
      <div className="fn-program-hero__media" aria-hidden="true">
        <img src="/images/program-freedom-nft.jpg" alt="" />
      </div>
      <div className="fn-program-hero__scrim" />
      <div className="fn-program-hero__content">
        <span className="fn-program-kicker">Membership, recognition and long-term value</span>
        <h1>Freedom NFT</h1>
        <p>Turn qualifying FGT and FPT into a transparent membership status connected to monthly ecosystem rewards.</p>
        <div className="fn-program-hero__actions">
          <button type="button" onClick={() => openView('membership')}>Manage membership <ArrowRight /></button>
          <button type="button" className="secondary" onClick={() => openView('rewards')}>View rewards</button>
        </div>
        <div className="fn-program-hero__status">
          <WalletCards />
          <div><span>Current membership</span><strong>{currentTier?.name || 'Not minted'}</strong></div>
          <em className={membership.rewardEligible ? 'eligible' : ''}>{membership.rewardEligible ? 'Reward eligible' : 'Not eligible'}</em>
        </div>
      </div>
    </section>

    <section className="fn-program-section fn-program-section--tiers">
      <header><span>Three membership stages</span><h2>Choose the tier your qualifying balance supports</h2><p>FGT and FPT may be combined. Only available, uncommitted token balances can be locked.</p></header>
      <div className="fn-program-tier-grid">
        {NFT_TIERS.map((tier) => <article key={tier.tier} className={membership.tier === tier.tier ? 'current' : ''}>
          <div className="fn-program-tier-grid__head"><span>Tier {tier.tier}</span>{membership.tier === tier.tier && <em><Check /> Active</em>}</div>
          <h3>{tier.name}</h3>
          <strong>{tier.threshold.toLocaleString()}</strong>
          <small>FGT and/or FPT required</small>
          <div className="fn-program-tier-grid__allocation"><span>Monthly pool allocation</span><b>{tier.poolShare}%</b></div>
        </article>)}
      </div>
    </section>

    <section className="fn-program-section fn-program-section--principles">
      <header><span>Membership safeguards</span><h2>One status, one qualifying balance, one reward tier</h2></header>
      <div className="fn-program-principles">
        {PRINCIPLES.map(({ icon, title, text }) => <article key={title}>{createElement(icon)}<div><h3>{title}</h3><p>{text}</p></div></article>)}
      </div>
    </section>

    <section className="fn-program-section fn-program-section--journey">
      <div><span>Membership journey</span><h2>Lock, qualify, participate, and adjust when needed</h2></div>
      <ol>
        <li><b>01</b><div><strong>Lock qualifying tokens</strong><span>Commit the exact FGT and FPT combination required by your selected tier.</span></div></li>
        <li><b>02</b><div><strong>Mint one active NFT</strong><span>Your membership remains non-transferable and connected to the registered wallet.</span></div></li>
        <li><b>03</b><div><strong>Enter monthly snapshots</strong><span>Eligible members participate only through their highest active tier.</span></div></li>
        <li><b>04</b><div><strong>Upgrade, restore or downgrade</strong><span>Membership follows your maintained qualifying balance and chosen tier.</span></div></li>
      </ol>
      {membership.tier > 0 && <p className="fn-program-locked">Currently locked: <strong>{formatToken(membership.lockedFGT)} FGT</strong> and <strong>{formatToken(membership.lockedFPT)} FPT</strong></p>}
    </section>
  </div>
}
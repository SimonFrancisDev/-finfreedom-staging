import {
  ArrowRight,
  CheckCircle2,
  Coins,
  Layers3,
  LockKeyhole,
  Orbit,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { FREEDOM_PLUS_LEVELS, NFT_TIERS } from '../../Services/freedomPlus'

export default function FreedomPlusOverview({ registered, activeLevelCount, membershipTier, openView }) {
  const nextLevel = FREEDOM_PLUS_LEVELS[Math.min(activeLevelCount, FREEDOM_PLUS_LEVELS.length - 1)]
  const membership = NFT_TIERS.find((item) => item.tier === membershipTier)

  return (
    <div className="fp-overview-page">
      <section className="fp-overview-hero">
        <div className="fp-overview-hero__content">
          <div className="fp-overview-eyebrow"><Sparkles /><span>Freedom-Plus Program</span></div>
          <div className="fp-overview-copy">
            <h2>Advance through seven levels at your own pace.</h2>
            <p>Use your existing FFN identity and sponsor, activate each level manually, and build qualifying FPT toward Freedom NFT membership.</p>
          </div>
          <div className="fp-overview-actions">
            <button type="button" className="fp-primary-action" onClick={() => openView(registered ? 'dashboard' : 'levels')}>
              {registered ? 'Open dashboard' : 'Register and activate'}<ArrowRight />
            </button>
            <button type="button" className="fp-secondary-action" onClick={() => openView('orbits')}>Explore orbits<Orbit /></button>
          </div>
          <div className="fp-overview-facts">
            <span><CheckCircle2 />Manual progression</span>
            <span><CheckCircle2 />No automatic upgrade</span>
            <span><CheckCircle2 />Shared FFN sponsor</span>
          </div>
        </div>

        <aside className="fp-overview-hero__status">
          <div className="fp-overview-status__header"><span>Your progression</span><strong>{registered ? 'Active' : 'Not started'}</strong></div>
          <div className="fp-overview-progress-ring" style={{ '--progress': `${(activeLevelCount / 7) * 360}deg` }}>
            <div><strong>{activeLevelCount}</strong><span>of 7 levels</span></div>
          </div>
          <div className="fp-overview-status__next">
            <span>{activeLevelCount === 7 ? 'Progression complete' : 'Next available level'}</span>
            <strong>{activeLevelCount === 7 ? 'All levels active' : `Level ${nextLevel.level} · ${nextLevel.orbit}`}</strong>
            <small>{activeLevelCount === 7 ? 'Continue building orbit cycles.' : `${nextLevel.price.toLocaleString()} USDT`}</small>
          </div>
        </aside>
      </section>

      <section className="fp-overview-stat-grid" aria-label="Freedom-Plus program summary">
        <article><span className="fp-overview-stat__icon"><Layers3 /></span><div><small>Program levels</small><strong>7</strong><p>Sequential manual activation</p></div></article>
        <article><span className="fp-overview-stat__icon"><Orbit /></span><div><small>Orbit engines</small><strong>6</strong><p>P39 through P3</p></div></article>
        <article><span className="fp-overview-stat__icon"><Coins /></span><div><small>Activation reward</small><strong>FPT</strong><p>Equal to the level value</p></div></article>
        <article><span className="fp-overview-stat__icon"><LockKeyhole /></span><div><small>NFT status</small><strong>{membership?.name || 'Not minted'}</strong><p>Highest active tier only</p></div></article>
      </section>

      <section className="fp-overview-section">
        <div className="fp-overview-section__heading"><div><span>Progression map</span><h2>Seven levels, one controlled path</h2><p>Every higher level remains locked until the preceding level is active.</p></div><button type="button" onClick={() => openView('levels')}>Manage levels<ArrowRight /></button></div>
        <div className="fp-overview-level-track">
          {FREEDOM_PLUS_LEVELS.map((level, index) => (
            <button type="button" key={level.level} className={index < activeLevelCount ? 'is-active' : index === activeLevelCount ? 'is-next' : ''} onClick={() => openView('levels')}>
              <span>{index < activeLevelCount ? <CheckCircle2 /> : level.level}</span>
              <div><small>Level {level.level}</small><strong>{level.orbit}</strong><p>{level.price.toLocaleString()} USDT</p></div>
            </button>
          ))}
        </div>
      </section>

      <section className="fp-overview-two-column">
        <article className="fp-overview-program-card">
          <div className="fp-overview-card__icon"><ShieldCheck /></div>
          <div><span>Freedom NFT</span><h2>Turn qualifying participation into membership.</h2><p>Available FGT and FPT can be locked toward Foundational, Intermediate, or Advanced membership. Locked tokens are not burned and eligibility updates immediately.</p></div>
          <button type="button" onClick={() => openView('nftOverview')}>View membership tiers<ArrowRight /></button>
        </article>
        <article className="fp-overview-program-card">
          <div className="fp-overview-card__icon"><Orbit /></div>
          <div><span>Transparent structure</span><h2>Inspect every orbit position.</h2><p>View the participant, ring, structural parent, cycle, and payment record for each indexed position across all six orbit engines.</p></div>
          <button type="button" onClick={() => openView('orbits')}>Open orbit viewer<ArrowRight /></button>
        </article>
      </section>
    </div>
  )
}

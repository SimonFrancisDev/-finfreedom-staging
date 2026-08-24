import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  ArrowRight,
  CheckCircle2,
  ChevronsUp,
  Coins,
  Compass,
  Crown,
  DoorOpen,
  Eye,
  Expand,
  Gem,
  Gauge,
  Layers3,
  LockKeyhole,
  Network,
  Orbit,
  Recycle,
  ShieldCheck,
  Sparkles,
  Trophy,
  TrendingUp,
  X,
} from 'lucide-react'

const HERO_IMAGES = {
  dark: '/images/freedom-plus/freedom-plus-hero-dark.png',
  light: '/images/freedom-plus/freedom-plus-hero-light.png',
  mobileDark: '/images/freedom-plus/freedom-plus-hero-mobile-dark.png',
  mobileLight: '/images/freedom-plus/freedom-plus-hero-mobile-light.png',
}

const HERO_FEATURES = [
  { title: '7 Progressive Levels', text: 'Manual advancement from 50 to 36,450 USDT.', icon: Layers3 },
  { title: 'Six Orbit Engines', text: 'P39, P14, P12, P6, P4 and P3 structures.', icon: Orbit },
  { title: 'Manual Progression', text: 'You decide when to activate each next level.', icon: CheckCircle2 },
  { title: 'Automatic Recycling', text: 'Completed cycles reopen the same active level.', icon: Recycle },
  { title: 'Token Rewards', text: 'FPT on activation and FPTr on recycle.', icon: Coins },
]

const WHY_IMAGES = {
  dark: '/images/freedom-plus/why-freedom-plus-dark.png',
  light: '/images/freedom-plus/why-freedom-plus-light.png',
  mobileDark: '/images/freedom-plus/why-freedom-plus-mobile-dark.png',
  mobileLight: '/images/freedom-plus/why-freedom-plus-mobile-light.png',
}

const WHY_TRUST_POINTS = [
  { title: 'Manual Control', text: 'You choose when to activate each next level.', icon: LockKeyhole },
  { title: 'Defined Execution', text: 'Placements, payments and cycles follow programmed rules.', icon: Eye },
  { title: 'Structured Opportunity', text: 'Seven levels provide a clear path for deeper participation.', icon: Compass },
]

const WHY_PILLARS = [
  { title: 'Advanced Ecosystem Positioning', icon: Network },
  { title: 'FPT and FPTr Utility', icon: Coins },
  { title: 'Freedom NFT Qualification Path', icon: Gem },
]

const PROGRESSION_LEVELS = [
  { number: 1, title: 'Foundation', orbit: 'P39', price: '50', text: 'Registration activates Level 1 and begins your Freedom-Plus journey.', icon: DoorOpen, tone: 'blue' },
  { number: 2, title: 'Positioning', orbit: 'P14', price: '150', text: 'Your first participant-controlled progression into a new orbit structure.', icon: TrendingUp, tone: 'cyan' },
  { number: 3, title: 'Expansion', orbit: 'P12', price: '450', text: 'A broader participation stage built around two structured rings.', icon: Expand, tone: 'green' },
  { number: 4, title: 'Momentum', orbit: 'P6', price: '1,350', text: 'A focused six-position orbit for deliberate continued progression.', icon: Gauge, tone: 'yellow' },
  { number: 5, title: 'Elevation', orbit: 'P4', price: '4,050', text: 'An advanced four-position orbit with participant-controlled entry.', icon: ChevronsUp, tone: 'orange' },
  { number: 6, title: 'Leadership', orbit: 'P4', price: '12,150', text: 'A higher-commitment P4 stage for deeper ecosystem positioning.', icon: Crown, tone: 'purple' },
  { number: 7, title: 'Zenith', orbit: 'P3', price: '36,450', text: 'The final Freedom-Plus level and highest progression milestone.', icon: Trophy, tone: 'gold' },
]

function useThemeMode() {
  const readTheme = () => document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
  const [theme, setTheme] = useState(readTheme)

  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(readTheme()))
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  return theme
}

function HeroImage() {
  const theme = useThemeMode()
  const desktop = theme === 'light' ? HERO_IMAGES.light : HERO_IMAGES.dark
  const mobile = theme === 'light' ? HERO_IMAGES.mobileLight : HERO_IMAGES.mobileDark

  return (
    <picture className="fp-program-hero__picture">
      <source media="(max-width: 640px)" srcSet={mobile} />
      <img src={desktop} alt="Freedom-Plus Program" className="fp-program-hero__image" />
    </picture>
  )
}

function WhyImage() {
  const theme = useThemeMode()
  const desktop = theme === 'light' ? WHY_IMAGES.light : WHY_IMAGES.dark
  const mobile = theme === 'light' ? WHY_IMAGES.mobileLight : WHY_IMAGES.mobileDark

  return (
    <picture className="fp-program-why__picture">
      <source media="(max-width: 640px)" srcSet={mobile} />
      <img src={desktop} alt="A structured progression pathway through Freedom-Plus" className="fp-program-why__image" />
    </picture>
  )
}

function ProgramNotice({ onClose }) {
  return createPortal(
    <div className="fp-program-notice" role="dialog" aria-modal="true" aria-labelledby="fp-program-notice-title">
      <button type="button" className="fp-program-notice__backdrop" onClick={onClose} aria-label="Close program notice" />
      <div className="fp-program-notice__dialog">
        <button type="button" className="fp-program-notice__close" onClick={onClose} aria-label="Close"><X /></button>
        <span className="fp-program-notice__badge"><ShieldCheck />Program notice</span>
        <h2 id="fp-program-notice-title">Participate with a clear understanding of the rules.</h2>
        <p>Freedom-Plus uses sequential manual activation. Registration activates Level 1, while Levels 2 through 7 are activated only when you choose to proceed.</p>
        <div className="fp-program-notice__points">
          <span><CheckCircle2 />Your existing FFN identity and permanent sponsor are retained.</span>
          <span><CheckCircle2 />There is no automatic upgrade to a higher level.</span>
          <span><CheckCircle2 />A completed orbit automatically reopens that same level.</span>
          <span><CheckCircle2 />All activations, placements, payments and token rewards execute on-chain.</span>
        </div>
        <button type="button" className="fp-program-notice__accept" onClick={onClose}>I understand</button>
      </div>
    </div>,
    document.body
  )
}

export default function FreedomPlusOverview({ registered, openView }) {
  const [noticeOpen, setNoticeOpen] = useState(false)

  return (
    <>
      <section className="fp-program-hero">
        <div className="fp-program-hero__background"><HeroImage /></div>
        <div className="fp-program-hero__overlay" />
        <div className="fp-program-hero__content">
          <span className="fp-program-eyebrow"><Sparkles />Advanced participation program</span>
          <p className="fp-program-hero__subtitle">Advanced Participation, Earning &amp; Progression Layer</p>
          <p className="fp-program-hero__description">A seven-level program for participants who want deeper ecosystem involvement, intentional manual progression, stronger token positioning and a direct pathway toward Freedom NFT membership.</p>
          <div className="fp-program-hero__actions">
            <button type="button" className="fp-program-button fp-program-button--primary" onClick={() => openView(registered ? 'dashboard' : 'levels')}>
              {registered ? 'Open Freedom-Plus Dashboard' : 'Join Freedom-Plus'}<ArrowRight />
            </button>
            <button type="button" className="fp-program-button fp-program-button--ghost" onClick={() => setNoticeOpen(true)}>View Program Notice</button>
          </div>
          <div className="fp-program-hero__features">
            {HERO_FEATURES.map((feature) => {
              const FeatureIcon = feature.icon
              return <article key={feature.title}><FeatureIcon /><strong>{feature.title}</strong><span>{feature.text}</span></article>
            })}
          </div>
        </div>
      </section>
      <section className="fp-program-why">
        <div className="fp-program-why__background"><WhyImage /></div>
        <div className="fp-program-why__content">
          <header className="fp-program-why__header">
            <span>Fin Freedom Network</span>
            <h2>Why Freedom-Plus <strong>Matters</strong></h2>
            <p>Intentional growth, strategic decisions and long-term commitment.</p>
          </header>

          <div className="fp-program-why__statement">
            <ShieldCheck />
            <div><strong>Progress is never forced.</strong><span>You choose when to move forward.</span></div>
          </div>

          <div className="fp-program-why__explanation">
            <Orbit />
            <p>Freedom-Plus is the advanced participation layer for members who want deeper ecosystem involvement, stronger token positioning and a deliberate route toward Freedom NFT membership.</p>
          </div>

          <div className="fp-program-why__trust-grid">
            {WHY_TRUST_POINTS.map((point) => {
              const PointIcon = point.icon
              return <article key={point.title}><PointIcon /><strong>{point.title}</strong><span>{point.text}</span></article>
            })}
          </div>

          <div className="fp-program-why__pillars">
            {WHY_PILLARS.map((pillar) => {
              const PillarIcon = pillar.icon
              return <article key={pillar.title}><PillarIcon /><strong>{pillar.title}</strong></article>
            })}
          </div>

          <p className="fp-program-why__slogan">Progress with purpose. Position for the future.</p>
        </div>
      </section>
      <section className="fp-program-levels">
        <div className="fp-program-levels__inner">
          <header className="fp-program-levels__header">
            <span>Your</span>
            <h2>Freedom-Plus</h2>
            <strong>Progression Levels</strong>
            <p>Seven sequential levels. Six orbit engines. Progress only when you choose.</p>
          </header>

          <div className="fp-program-levels__rules" aria-label="Freedom-Plus progression rules">
            <span><CheckCircle2 />Level 1 activates with registration</span>
            <span><LockKeyhole />Levels 2–7 are activated manually</span>
            <span><Recycle />Recycling reopens the same level</span>
          </div>

          <div className="fp-program-levels__board">
            {PROGRESSION_LEVELS.map((level) => {
              const LevelIcon = level.icon
              return (
                <article key={level.number} className={`fp-program-level-card fp-program-level-card--${level.tone}`}>
                  <div className="fp-program-level-card__number"><span>Level</span><strong>{level.number}</strong></div>
                  <div className="fp-program-level-card__icon"><LevelIcon /></div>
                  <div className="fp-program-level-card__content">
                    <div className="fp-program-level-card__heading"><h3>{level.title}</h3><span>{level.orbit} Orbit</span></div>
                    <strong className="fp-program-level-card__price">{level.price} <small>USDT</small></strong>
                    <p>{level.text}</p>
                    <div className="fp-program-level-card__rewards"><span>FPT on first activation</span><span>FPTr on recycle</span></div>
                  </div>
                </article>
              )
            })}
          </div>

          <footer className="fp-program-levels__footer">
            <span>Total Levels 1–7</span><strong>54,650 USDT</strong><small>No automatic upgrade to a higher level</small>
          </footer>
        </div>
      </section>
      {noticeOpen && <ProgramNotice onClose={() => setNoticeOpen(false)} />}
    </>
  )
}

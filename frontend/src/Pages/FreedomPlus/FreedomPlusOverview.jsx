import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  ArrowRight,
  CheckCircle2,
  Coins,
  Layers3,
  Orbit,
  Recycle,
  ShieldCheck,
  Sparkles,
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
      {noticeOpen && <ProgramNotice onClose={() => setNoticeOpen(false)} />}
    </>
  )
}

import Link from 'next/link'
import { CursorGlow } from '@/components/landing/CursorGlow'
import { LandingNav } from '@/components/landing/LandingNav'
import { PageEffects } from '@/components/landing/PageEffects'
import { UsernameInput } from '@/components/landing/UsernameInput'
import { FAQSection } from '@/components/landing/FAQSection'
import { PricingSection } from '@/components/landing/PricingSection'
import { createClient } from '@/lib/supabase/server'
import { ScrollProgressBar } from '@/components/animations/ScrollProgressBar'
import { ScrollCounter } from '@/components/animations/ScrollCounter'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { TemplateSwitcher } from '@/components/animations/TemplateSwitcher'
import { ScrubText } from '@/components/animations/ScrubText'

/* ── Design tokens ───────────────────────────────────────── */
const BG    = '#0A0A0A'
const SURF  = '#111111'
const ACC   = '#E8533A'
const HEAD  = '#F5F5F7'
const BODY  = '#A1A1A6'
const LABEL = '#6E6E73'
const GOLD  = '#C9A96E'
const INTER = 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'

const TEMPLATES = [
  { name: 'Bollywood Editorial', bg: '#0A0005', accent: '#F5C842', textColor: '#F5C842', nameFontFamily: "'Cinzel', serif", tag: 'Cinematic' },
  { name: 'Desi Marigold', bg: 'linear-gradient(160deg,#FF6500,#c8500a)', accent: '#FFD700', textColor: '#fff', nameFontFamily: "'Raleway', sans-serif", tag: 'Vibrant' },
  { name: 'Mumbai Noir', bg: '#08080F', accent: '#9B59B6', textColor: '#E0D0F8', nameFontFamily: "'Josefin Sans', sans-serif", tag: 'Dark' },
  { name: 'Rajasthani Royal', bg: '#1A0800', accent: '#D4AF37', textColor: '#D4AF37', nameFontFamily: "'Cinzel', serif", tag: 'Regal' },
  { name: 'Cyberpunk', bg: '#000', accent: '#00FF41', textColor: '#00FF41', nameFontFamily: 'monospace', tag: 'Futuristic' },
  { name: 'Rose Gold', bg: 'linear-gradient(160deg,#B76E79,#E8B4B8,#F7C59F)', accent: '#fff', textColor: '#fff', nameFontFamily: "'Cormorant Garamond', serif", tag: 'Elegant' },
]

const HOW_IT_WORKS = [
  { step: '01', title: 'Sign up free', sub: 'No credit card. Just your name.' },
  { step: '02', title: 'Pick your template', sub: 'Choose from 50 India-built designs.' },
  { step: '03', title: 'Share your link', sub: 'Add your UPI, Reels, links — go live.' },
]

const COMPARE = [
  { feature: 'UPI Payments (GPay, PhonePe)', taar: '✓ Free', linktree: '✗ Not available' },
  { feature: 'Indian-built templates', taar: '✓ 50 templates', linktree: '✗ Generic only' },
  { feature: 'Analytics dashboard', taar: '✓ Built-in', linktree: 'Paid only' },
  { feature: 'Sell digital products', taar: '✓ Pro', linktree: 'Paid only' },
  { feature: 'Email capture', taar: '✓ Pro', linktree: '✗ Not available' },
  { feature: 'Media Kit page', taar: '✓ Pro', linktree: '✗ Not available' },
  { feature: 'Price of paid plan', taar: '₹399/mo', linktree: '₹800+/mo' },
  { feature: 'Made in India', taar: '✓', linktree: '✗' },
]

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M3 8l4 4 6-8" stroke={ACC} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const isLoggedIn = !!user

  return (
    <div style={{ background: BG, minHeight: '100vh', fontFamily: INTER }}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99999] focus:bg-[#E8533A] focus:text-white focus:px-4 focus:py-2 focus:rounded-full focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>

      <ScrollProgressBar />
      <div className="grain-overlay" />
      <CursorGlow />
      <PageEffects />

      <header>
        <LandingNav isLoggedIn={isLoggedIn} />
      </header>

      <main id="main-content">

        {/* ── 1. HERO ──────────────────────────────────────────── */}
        <section
          id="hero-section"
          aria-label="Hero"
          className="min-h-[100svh] flex flex-col items-center justify-center text-center relative overflow-hidden px-6"
          style={{ background: BG, paddingTop: 52 }}
        >
          {/* Radial glow behind content */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{ background: `radial-gradient(ellipse 80% 50% at 50% 60%, rgba(232,83,58,0.07), transparent)` }}
          />

          {/* Eyebrow */}
          <p
            className="reveal uppercase mb-6"
            style={{ fontSize: 11, letterSpacing: '0.08em', color: LABEL, fontWeight: 500 }}
          >
            Link in bio · Built for India
          </p>

          {/* H1 */}
          <h1
            className="reveal"
            data-delay="80"
            style={{
              fontFamily: INTER,
              fontWeight: 800,
              fontSize: 'clamp(48px, 8.5vw, 96px)',
              lineHeight: 1.02,
              letterSpacing: '-0.04em',
              color: HEAD,
              maxWidth: 900,
            }}
          >
            Your link.<br />Your UPI.<br />Your page.
          </h1>

          {/* Subhead */}
          <p
            className="reveal mt-6"
            data-delay="160"
            style={{ fontSize: 'clamp(17px, 2vw, 22px)', fontWeight: 400, color: BODY, lineHeight: 1.5, maxWidth: 480 }}
          >
            50 templates · UPI payments · Free forever
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 items-center justify-center mt-10 reveal" data-delay="240">
            <Link
              href="/login"
              className="inline-block rounded-full text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: ACC, fontSize: 16, fontWeight: 600, paddingTop: 14, paddingBottom: 14, paddingLeft: 28, paddingRight: 28 }}
            >
              Claim your Taar →
            </Link>
            <Link
              href="/demo"
              target="_blank"
              className="text-[#A1A1A6] hover:text-[#F5F5F7] transition-colors"
              style={{ fontSize: 16, fontWeight: 400 }}
            >
              See an example ↗
            </Link>
          </div>

          {/* Phone mockup */}
          <div className="mt-16 reveal relative inline-block" data-delay="400">
            {/* Ambient glow */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: -60,
                background: `radial-gradient(ellipse 70% 60% at 50% 50%, rgba(232,83,58,0.10), transparent)`,
                filter: 'blur(24px)',
                pointerEvents: 'none',
              }}
            />
            {/* iPhone 16-style mockup */}
            <div
              style={{
                width: 'clamp(200px, 28vw, 260px)',
                aspectRatio: '9/19.5',
                borderRadius: 44,
                background: '#0A0005',
                boxShadow: '0 40px 100px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.08)',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* Dynamic Island */}
              <div
                style={{
                  position: 'absolute', top: 12, left: '50%',
                  transform: 'translateX(-50%)',
                  width: 100, height: 26,
                  background: '#000',
                  borderRadius: 100,
                  zIndex: 2,
                }}
              />
              {/* Content */}
              <div style={{ padding: '56px 24px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(245,200,66,0.12)', border: '2px solid rgba(245,200,66,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F5C842', fontFamily: 'Cinzel, serif', fontSize: 20, fontWeight: 600 }}>P</div>
                <p style={{ color: '#F5C842', fontFamily: 'Cinzel, serif', fontSize: 13, fontWeight: 600 }}>Priya Sharma</p>
                <p style={{ color: 'rgba(245,200,66,0.45)', fontSize: 10 }}>Food Creator · Mumbai</p>
                <span style={{ background: 'rgba(245,200,66,0.1)', color: '#F5C842', fontSize: 8, fontFamily: 'monospace', padding: '3px 10px', borderRadius: 20, marginBottom: 4 }}>CINEMATIC</span>
                {['Instagram', 'UPI Tips', 'YouTube'].map((l) => (
                  <div key={l} style={{ width: '100%', padding: '9px', borderRadius: 10, border: '1px solid rgba(245,200,66,0.15)', background: 'rgba(245,200,66,0.04)', color: '#F5C842', fontSize: 11, textAlign: 'center' }}>{l}</div>
                ))}
              </div>
            </div>
          </div>

          <p
            className="mt-8 reveal"
            data-delay="480"
            style={{ fontSize: 12, color: LABEL, fontWeight: 400 }}
          >
            Free forever · Just launched · Made in India
          </p>
        </section>

        {/* ── 2. STATS BAR ─────────────────────────────────────── */}
        <section aria-label="Key facts" className="py-12 px-6">
          <div className="max-w-3xl mx-auto">
            <div
              className="reveal grid grid-cols-3"
              style={{
                background: SURF,
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 20,
                padding: '40px 0',
              }}
            >
              <div className="text-center" style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                <p style={{ fontFamily: INTER, fontWeight: 700, fontSize: 'clamp(36px, 5vw, 48px)', color: HEAD, letterSpacing: '-0.03em', lineHeight: 1 }}>₹0</p>
                <p className="uppercase mt-2" style={{ fontSize: 11, letterSpacing: '0.1em', color: LABEL, fontWeight: 500 }}>Forever free</p>
              </div>
              <div className="text-center" style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                <p style={{ fontFamily: INTER, fontWeight: 700, fontSize: 'clamp(36px, 5vw, 48px)', color: HEAD, letterSpacing: '-0.03em', lineHeight: 1 }}>
                  <ScrollCounter from={0} to={5} suffix=" min">5 min</ScrollCounter>
                </p>
                <p className="uppercase mt-2" style={{ fontSize: 11, letterSpacing: '0.1em', color: LABEL, fontWeight: 500 }}>Setup time</p>
              </div>
              <div className="text-center">
                <p style={{ fontFamily: INTER, fontWeight: 700, fontSize: 'clamp(36px, 5vw, 48px)', color: HEAD, letterSpacing: '-0.03em', lineHeight: 1 }}>
                  <ScrollCounter from={0} to={50}>50</ScrollCounter>
                </p>
                <p className="uppercase mt-2" style={{ fontSize: 11, letterSpacing: '0.1em', color: LABEL, fontWeight: 500 }}>Templates</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. FEATURES (alternating layout) ─────────────────── */}
        <section aria-labelledby="features-heading" className="py-4 px-6" style={{ background: BG }}>
          <div className="max-w-5xl mx-auto">

            <p className="uppercase mb-5 reveal" style={{ fontSize: 11, letterSpacing: '0.08em', color: LABEL, fontWeight: 500 }}>
              Everything you need
            </p>
            <h2
              id="features-heading"
              className="mb-24 reveal"
              data-delay="80"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: 1.05, color: HEAD, maxWidth: 700 }}
            >
              Built for how Indian creators work.
            </h2>

            {/* Feature 1: UPI */}
            <div className="flex flex-col md:flex-row items-center gap-16 py-16 border-t border-white/[0.06] reveal">
              <div className="flex-1">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: 20, color: HEAD }}>₹</span>
                </div>
                <h3 style={{ fontFamily: INTER, fontWeight: 700, fontSize: 28, color: HEAD, letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 12 }}>UPI Payment Links</h3>
                <p style={{ fontSize: 17, color: BODY, lineHeight: 1.65, marginBottom: 20 }}>Accept tips, donations, and payments via GPay, PhonePe, Paytm — directly on your page. No gateway setup.</p>
                <Link href="/login" style={{ fontSize: 15, color: ACC, fontWeight: 500 }}>Learn more →</Link>
              </div>
              <div className="flex-1 flex justify-center md:justify-end">
                <div style={{ background: SURF, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 24, width: '100%', maxWidth: 340 }}>
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <p style={{ color: LABEL, fontSize: 11, marginBottom: 2 }}>Payment request</p>
                      <p style={{ color: HEAD, fontSize: 15, fontWeight: 600 }}>Priya Sharma</p>
                    </div>
                    <div style={{ background: '#1C1C1E', borderRadius: 10, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ color: ACC, fontSize: 18 }}>₹</span>
                    </div>
                  </div>
                  <div style={{ background: '#1C1C1E', borderRadius: 14, padding: 20, textAlign: 'center', marginBottom: 14 }}>
                    <div style={{ width: 88, height: 88, background: 'rgba(255,255,255,0.04)', borderRadius: 8, margin: '0 auto 10px', display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, padding: 4 }}>
                      {[1,1,1,0,1,1,1, 1,0,1,0,1,0,1, 1,0,1,1,1,0,1, 0,0,0,1,0,0,0, 1,1,0,0,0,1,1, 1,0,1,0,1,0,1, 1,1,1,0,1,1,1].map((v, i) => (
                        <div key={i} style={{ borderRadius: 1, background: v ? 'rgba(255,255,255,0.65)' : 'transparent' }} />
                      ))}
                    </div>
                    <p style={{ color: BODY, fontSize: 12 }}>Scan with any UPI app</p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                    {['GPay', 'PhonePe', 'Paytm'].map((p) => (
                      <div key={p} style={{ background: '#1C1C1E', borderRadius: 10, padding: '8px 0', textAlign: 'center', fontSize: 11, color: BODY }}>{p}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2: Templates */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-16 py-16 border-t border-white/[0.06] reveal">
              <div className="flex-1">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: 20 }}>✦</span>
                </div>
                <h3 style={{ fontFamily: INTER, fontWeight: 700, fontSize: 28, color: HEAD, letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 12 }}>50 Designer Templates</h3>
                <p style={{ fontSize: 17, color: BODY, lineHeight: 1.65, marginBottom: 20 }}>Bollywood editorial, Rajasthani royal, cyberpunk, pastel — built for Indian aesthetics, not generic global ones.</p>
                <Link href="/login" style={{ fontSize: 15, color: ACC, fontWeight: 500 }}>Browse templates →</Link>
              </div>
              <div className="flex-1 flex justify-center md:justify-start">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, maxWidth: 300 }}>
                  {TEMPLATES.slice(0, 4).map((tpl) => (
                    <div key={tpl.name} style={{
                      aspectRatio: '9/16', borderRadius: 18,
                      background: tpl.bg, overflow: 'hidden',
                      boxShadow: `0 12px 32px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)`,
                      padding: '10px 8px 12px',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                    }}>
                      {/* Dynamic Island */}
                      <div style={{ width: 34, height: 8, background: '#000', borderRadius: 100, marginBottom: 2, flexShrink: 0 }} />
                      {/* Avatar */}
                      <div style={{
                        width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                        background: `${tpl.accent}25`, border: `1.5px solid ${tpl.accent}70`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: tpl.accent, fontSize: 9, fontWeight: 700,
                        fontFamily: tpl.nameFontFamily,
                      }}>P</div>
                      {/* Name */}
                      <p style={{
                        color: tpl.textColor, fontSize: 8, fontWeight: 700,
                        fontFamily: tpl.nameFontFamily, textAlign: 'center',
                        letterSpacing: '0.01em', lineHeight: 1.1, margin: 0,
                      }}>Priya Sharma</p>
                      {/* Tag */}
                      <span style={{
                        fontSize: 6, background: `${tpl.accent}22`, color: tpl.accent,
                        borderRadius: 20, padding: '2px 7px', flexShrink: 0,
                      }}>{tpl.tag}</span>
                      {/* Link stubs */}
                      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3, marginTop: 1 }}>
                        {[0.38, 0.22, 0.15].map((op, i) => (
                          <div key={i} style={{
                            height: 12, borderRadius: 6,
                            background: tpl.accent, opacity: op,
                          }} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Feature 3: Analytics */}
            <div className="flex flex-col md:flex-row items-center gap-16 py-16 border-t border-white/[0.06] reveal">
              <div className="flex-1">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: 20 }}>◈</span>
                </div>
                <h3 style={{ fontFamily: INTER, fontWeight: 700, fontSize: 28, color: HEAD, letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 12 }}>Real Analytics</h3>
                <p style={{ fontSize: 17, color: BODY, lineHeight: 1.65, marginBottom: 20 }}>See who visits your page, which links they click, where they come from — updated daily. No guessing.</p>
                <Link href="/login" style={{ fontSize: 15, color: ACC, fontWeight: 500 }}>Learn more →</Link>
              </div>
              <div className="flex-1 flex justify-center md:justify-end">
                <div style={{ background: SURF, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 24, width: '100%', maxWidth: 340 }}>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p style={{ color: LABEL, fontSize: 11, marginBottom: 4 }}>PAGE VIEWS</p>
                      <p style={{ color: HEAD, fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>2,847</p>
                      <p style={{ color: '#30D158', fontSize: 12, marginTop: 2, fontWeight: 500 }}>↑ 18% this week</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 72 }}>
                    {[40, 65, 35, 80, 55, 92, 70].map((h, i) => (
                      <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: '3px 3px 0 0', background: i === 5 ? ACC : 'rgba(255,255,255,0.08)' }} />
                    ))}
                  </div>
                  <div style={{ display: 'flex', marginTop: 8 }}>
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                      <span key={i} style={{ flex: 1, fontSize: 10, color: LABEL, textAlign: 'center' }}>{d}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 4: Email */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-16 py-16 border-t border-white/[0.06] reveal">
              <div className="flex-1">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: 20 }}>⊡</span>
                </div>
                <h3 style={{ fontFamily: INTER, fontWeight: 700, fontSize: 28, color: HEAD, letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 12 }}>Email Capture</h3>
                <p style={{ fontSize: 17, color: BODY, lineHeight: 1.65, marginBottom: 20 }}>Add a subscribe form to your page. Build your mailing list directly from your Taar link.</p>
                <Link href="/login" style={{ fontSize: 15, color: ACC, fontWeight: 500 }}>Learn more →</Link>
              </div>
              <div className="flex-1 flex justify-center md:justify-start">
                <div style={{ background: SURF, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 24, width: '100%', maxWidth: 340 }}>
                  <p style={{ color: HEAD, fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Join my newsletter</p>
                  <p style={{ color: BODY, fontSize: 13, marginBottom: 20 }}>Weekly insights for creators.</p>
                  <div style={{ background: '#1C1C1E', borderRadius: 12, padding: '12px 16px', marginBottom: 10, border: '1px solid rgba(255,255,255,0.06)' }}>
                    <p style={{ color: '#3A3A3C', fontSize: 13 }}>your@email.com</p>
                  </div>
                  <div style={{ background: ACC, borderRadius: 12, padding: '12px 16px', textAlign: 'center' }}>
                    <p style={{ color: '#fff', fontSize: 13, fontWeight: 500 }}>Subscribe for free</p>
                  </div>
                  <p style={{ color: LABEL, fontSize: 11, marginTop: 12, textAlign: 'center' }}>847 subscribers · No spam, ever</p>
                </div>
              </div>
            </div>

            {/* Feature 5: Digital Products */}
            <div className="flex flex-col md:flex-row items-center gap-16 py-16 border-t border-white/[0.06] reveal">
              <div className="flex-1">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: 20 }}>◇</span>
                </div>
                <h3 style={{ fontFamily: INTER, fontWeight: 700, fontSize: 28, color: HEAD, letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 12 }}>Sell Digital Products</h3>
                <p style={{ fontSize: 17, color: BODY, lineHeight: 1.65, marginBottom: 20 }}>Sell presets, PDFs, courses, or anything digital. Payments via Razorpay, delivered instantly.</p>
                <Link href="/login" style={{ fontSize: 15, color: ACC, fontWeight: 500 }}>Learn more →</Link>
              </div>
              <div className="flex-1 flex justify-center md:justify-end">
                <div style={{ background: SURF, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 24, width: '100%', maxWidth: 340 }}>
                  <div style={{ height: 120, background: 'linear-gradient(135deg, #1C1C2E, #2C2C3E)', borderRadius: 12, marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36 }}>📸</div>
                  <p style={{ color: HEAD, fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Lightroom Preset Pack</p>
                  <p style={{ color: BODY, fontSize: 13, marginBottom: 16 }}>Professional film look presets</p>
                  <div className="flex items-center justify-between">
                    <p style={{ color: HEAD, fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>₹499</p>
                    <div style={{ background: ACC, borderRadius: 10, padding: '8px 20px' }}>
                      <p style={{ color: '#fff', fontSize: 13, fontWeight: 500 }}>Buy now</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 6: Media Kit */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-16 py-16 border-t border-white/[0.06] reveal">
              <div className="flex-1">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: 20 }}>⊞</span>
                </div>
                <h3 style={{ fontFamily: INTER, fontWeight: 700, fontSize: 28, color: HEAD, letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 12 }}>Media Kit</h3>
                <p style={{ fontSize: 17, color: BODY, lineHeight: 1.65, marginBottom: 20 }}>A shareable page with your live stats — page views, CTR, active channels. Built for brand pitches.</p>
                <Link href="/login" style={{ fontSize: 15, color: ACC, fontWeight: 500 }}>Learn more →</Link>
              </div>
              <div className="flex-1 flex justify-center md:justify-start">
                <div style={{ background: SURF, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 24, width: '100%', maxWidth: 340 }}>
                  <p className="uppercase mb-4" style={{ fontSize: 10, letterSpacing: '0.1em', color: LABEL, fontWeight: 500 }}>Media Kit · Priya Sharma</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                    {[{ label: 'Instagram', value: '82K' }, { label: 'Page views', value: '12K/mo' }, { label: 'Link CTR', value: '14.2%' }, { label: 'Engagement', value: '4.8%' }].map(({ label, value }) => (
                      <div key={label} style={{ background: '#1C1C1E', borderRadius: 12, padding: '14px 12px' }}>
                        <p className="uppercase" style={{ fontSize: 9, letterSpacing: '0.08em', color: LABEL, fontWeight: 500, marginBottom: 6 }}>{label}</p>
                        <p style={{ color: HEAD, fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── 4. HOW IT WORKS ──────────────────────────────────── */}
        <section aria-labelledby="how-heading" className="py-28 px-6" style={{ background: BG, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-5xl mx-auto">
            <p className="uppercase mb-5 text-center reveal" style={{ fontSize: 11, letterSpacing: '0.08em', color: LABEL, fontWeight: 500 }}>
              Quick setup
            </p>
            <h2
              id="how-heading"
              className="text-center mb-24 reveal"
              data-delay="80"
              style={{ fontFamily: INTER, fontWeight: 700, fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: 1.06, letterSpacing: '-0.03em', color: HEAD }}
            >
              Set up in 5 minutes.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">
              {/* Desktop connecting line */}
              <div
                className="hidden md:block absolute top-10 left-[16.66%] right-[16.66%] h-px"
                aria-hidden="true"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), rgba(255,255,255,0.1), transparent)' }}
              />

              {HOW_IT_WORKS.map(({ step, title, sub }, i) => (
                <div
                  key={step}
                  className="reveal relative flex flex-col items-center text-center px-8 py-6 md:py-0"
                  data-delay={String(i * 100)}
                >
                  {/* Ghosted step number */}
                  <div
                    className="relative z-10 flex items-center justify-center mb-6"
                    style={{ width: 80, height: 80 }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        fontFamily: INTER,
                        fontWeight: 700,
                        fontSize: 80,
                        color: 'rgba(255,255,255,0.05)',
                        lineHeight: 1,
                        letterSpacing: '-0.05em',
                      }}
                    >
                      {step}
                    </span>
                    <div
                      style={{
                        position: 'relative',
                        width: 48, height: 48,
                        borderRadius: '50%',
                        background: SURF,
                        border: '1px solid rgba(255,255,255,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <span style={{ fontFamily: INTER, fontSize: 12, fontWeight: 600, color: ACC, letterSpacing: '0.05em' }}>{step}</span>
                    </div>
                  </div>
                  <h3 style={{ fontFamily: INTER, fontWeight: 600, fontSize: 20, color: HEAD, marginBottom: 8 }}>{title}</h3>
                  <p style={{ fontSize: 15, color: BODY, lineHeight: 1.55, maxWidth: 180 }}>{sub}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <Link
                href="/login"
                className="inline-block rounded-full text-white transition-all hover:scale-[1.02]"
                style={{ background: ACC, fontSize: 16, fontWeight: 600, padding: '14px 32px' }}
              >
                Create your Taar →
              </Link>
            </div>
          </div>
        </section>

        {/* ── 5. TEMPLATE SWITCHER (GSAP scroll showcase) ──────── */}
        <TemplateSwitcher templates={TEMPLATES} />

        {/* ── 6. TEMPLATES GALLERY ─────────────────────────────── */}
        <section id="templates" aria-labelledby="templates-heading" className="py-20 px-6" style={{ background: BG }}>
          <div className="max-w-5xl mx-auto">
            <p className="uppercase mb-5 reveal" style={{ fontSize: 11, letterSpacing: '0.08em', color: LABEL, fontWeight: 500 }}>
              Your page, your aesthetic
            </p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-4">
              <h2
                id="templates-heading"
                className="reveal"
                data-delay="60"
                style={{ fontFamily: INTER, fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 40px)', lineHeight: 1.1, letterSpacing: '-0.025em', color: HEAD }}
              >
                Find your perfect template.
              </h2>
              <Link
                href="/login"
                className="shrink-0 hover:opacity-70 transition-opacity"
                style={{ fontSize: 14, fontWeight: 500, color: ACC }}
              >
                Browse all 50 →
              </Link>
            </div>

            {/* Phone mockup grid — 2 cols desktop, horizontal scroll mobile */}
            <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory md:snap-none">
              {TEMPLATES.map((t, i) => (
                <Link
                  key={t.name}
                  href="/login"
                  className="template-card group relative shrink-0 w-[52vw] sm:w-[40vw] md:w-auto snap-start flex flex-col items-center gap-3"
                  aria-label={`Use ${t.name} template`}
                >
                  {/* Phone mockup */}
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '9/18',
                      borderRadius: 28,
                      background: t.bg,
                      boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    {/* Notch */}
                    <div style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', width: 60, height: 16, background: '#000', borderRadius: 100, zIndex: 2 }} />
                    <div style={{ padding: '32px 14px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%' }}>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: `${t.accent}22`, border: `1.5px solid ${t.accent}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.accent, fontSize: 14, fontWeight: 700, flexShrink: 0 }}>P</div>
                      <p style={{ color: t.textColor, fontFamily: t.nameFontFamily, fontSize: 11, fontWeight: 600, textAlign: 'center' }}>Priya Sharma</p>
                      <span style={{ fontSize: 7, fontFamily: 'monospace', padding: '2px 8px', borderRadius: 20, background: `${t.accent}22`, color: t.accent }}>{t.tag.toUpperCase()}</span>
                      {[1, 2, 3].map((n) => (
                        <div key={n} style={{ width: '90%', height: 20, borderRadius: 10, background: t.accent, opacity: 0.18 }} />
                      ))}
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-end justify-center pb-6 bg-black/0 group-hover:bg-black/50 transition-all duration-300">
                      <span
                        className="opacity-0 group-hover:opacity-100 text-white transition-opacity duration-300 rounded-full px-5 py-2.5"
                        style={{ background: ACC, fontSize: 13, fontWeight: 600 }}
                      >
                        Use this →
                      </span>
                    </div>
                  </div>
                  {/* Label */}
                  <div className="text-center">
                    <p style={{ fontSize: 12, color: BODY, fontWeight: 500 }}>{t.name}</p>
                    <p style={{ fontSize: 11, color: LABEL }}>{t.tag}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="md:hidden mt-4 flex justify-center">
              <p style={{ color: LABEL, fontSize: 11 }}>← swipe for more →</p>
            </div>
          </div>
        </section>

        {/* ── 7. MARQUEE TAPE ──────────────────────────────────── */}
        <div className="overflow-hidden relative" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#0D0D0D', paddingTop: 14, paddingBottom: 14 }}>
          {/* Fade masks */}
          <div className="pointer-events-none absolute top-0 left-0 bottom-0 w-20 z-10" style={{ background: 'linear-gradient(to right, #0D0D0D, transparent)' }} aria-hidden="true" />
          <div className="pointer-events-none absolute top-0 right-0 bottom-0 w-20 z-10" style={{ background: 'linear-gradient(to left, #0D0D0D, transparent)' }} aria-hidden="true" />
          <span className="sr-only">Features: UPI Payments, Instagram Reels, 50 Templates, Custom Domain, Digital Products, Analytics, Free Forever</span>
          <div className="animate-marquee whitespace-nowrap" aria-hidden="true">
            {Array(2).fill(null).map((_, i) => (
              <span key={i} className="inline-flex items-center gap-10 mr-10">
                {['UPI Payments', 'Instagram Reels', '50 Templates', 'Custom Domain', 'Digital Products', 'Analytics', 'Free Forever'].map((item, j) => (
                  <span key={item} className="inline-flex items-center gap-3">
                    <span style={{ color: j % 2 === 0 ? ACC : LABEL, fontSize: 13 }}>·</span>
                    <span style={{ fontSize: 13, fontWeight: 500, color: BODY }}>{item}</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* ── 8. FOUNDER NOTE ──────────────────────────────────── */}
        <section aria-labelledby="founder-heading" className="py-28 px-6 relative overflow-hidden" style={{ background: BG }}>
          {/* Warm glow */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{ background: `radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,169,110,0.05), transparent)` }}
          />
          <div className="max-w-2xl mx-auto relative z-10">
            {/* Top rule */}
            <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', marginBottom: 40 }} />

            <p className="uppercase mb-6 reveal" style={{ fontSize: 11, letterSpacing: '0.08em', color: LABEL, fontWeight: 500 }}>
              From the founder
            </p>
            <h2 id="founder-heading" className="sr-only">Built because we were frustrated too.</h2>
            {/* Serif italic quote — only cultural moment to use serif */}
            <div
              className="mb-8 reveal"
              data-delay="60"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 'clamp(32px, 4.5vw, 52px)', lineHeight: 1.05, color: HEAD }}
              aria-hidden="true"
            >
              <ScrubText text="Built because we were frustrated too." />
            </div>

            <p className="reveal mb-8" data-delay="160" style={{ fontSize: 17, color: BODY, lineHeight: 1.7 }}>
              Every Indian creator we knew was losing tips, fans, and collabs because their bio link didn&apos;t speak Indian. No UPI. No Reels shelf. Templates that looked copy-pasted from a Western product. So we built Taar — the link in bio we always wanted. We just launched. Come build with us.
            </p>

            <p className="reveal mb-4" data-delay="200" style={{ fontSize: 14, color: LABEL }}>From the founder</p>
            <Link
              href="/blog"
              className="reveal inline-flex items-center gap-2 transition-opacity hover:opacity-70"
              data-delay="240"
              style={{ fontSize: 15, color: ACC, fontWeight: 500 }}
            >
              Read why we built Taar →
            </Link>

            {/* Bottom rule */}
            <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', marginTop: 40 }} />
          </div>
        </section>

        {/* ── 9. PRICING ───────────────────────────────────────── */}
        <ScrollReveal fromY={32}>
          <PricingSection />
        </ScrollReveal>

        {/* ── 10. COMPARISON TABLE ─────────────────────────────── */}
        <section aria-labelledby="compare-heading" className="py-24 px-6" style={{ background: BG }}>
          <div className="max-w-4xl mx-auto">
            <p className="uppercase mb-5 reveal" style={{ fontSize: 11, letterSpacing: '0.08em', color: LABEL, fontWeight: 500 }}>
              vs Linktree
            </p>
            <h2
              id="compare-heading"
              className="mb-12 reveal"
              data-delay="60"
              style={{ fontFamily: INTER, fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 40px)', lineHeight: 1.1, letterSpacing: '-0.025em', color: HEAD }}
            >
              Why creators switch<br />from Linktree.
            </h2>

            <div className="overflow-x-auto" style={{ borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)' }}>
              <table className="w-full min-w-[540px]" role="table" aria-label="Taar vs Linktree feature comparison">
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <th className="text-left px-6 py-4 uppercase" style={{ fontSize: 11, letterSpacing: '0.08em', color: LABEL, fontWeight: 500 }} scope="col">Feature</th>
                    <th className="px-6 py-4 uppercase text-center" style={{ fontSize: 11, letterSpacing: '0.08em', color: ACC, fontWeight: 500 }} scope="col">Taar</th>
                    <th className="px-6 py-4 uppercase text-center" style={{ fontSize: 11, letterSpacing: '0.08em', color: LABEL, fontWeight: 500 }} scope="col">Linktree</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map(({ feature, taar, linktree }, i) => (
                    <tr
                      key={feature}
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}
                    >
                      <td className="px-6 py-4" style={{ fontSize: 14, color: BODY }}>{feature}</td>
                      <td className="px-6 py-4 text-center" style={{ fontSize: 14, fontWeight: 500, color: ACC }}>{taar}</td>
                      <td className="px-6 py-4 text-center" style={{ fontSize: 14, color: LABEL }}>{linktree}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── 11. FAQ ───────────────────────────────────────────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              { '@type': 'Question', name: 'Is UPI really free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. There are no platform fees on UPI payments. You keep 100% of what your audience sends.' } },
              { '@type': 'Question', name: 'What is the Taar watermark?', acceptedAnswer: { '@type': 'Answer', text: "On the free plan, a small 'Made with Taar' badge appears at the bottom of your page. Upgrade to Pro to remove it." } },
              { '@type': 'Question', name: 'Can I use my own domain?', acceptedAnswer: { '@type': 'Answer', text: 'Custom domains are a Pro feature. On free, your link is taar.bio/yourname.' } },
              { '@type': 'Question', name: 'How do I connect UPI?', acceptedAnswer: { '@type': 'Answer', text: 'Just enter your UPI ID in your dashboard. We generate the payment link — no gateway setup needed.' } },
              { '@type': 'Question', name: 'What happens if I cancel Pro?', acceptedAnswer: { '@type': 'Answer', text: 'You drop back to the free plan. Your page stays live, links stay active, you just lose Pro features.' } },
              { '@type': 'Question', name: 'Is my data safe?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Payments go directly through Razorpay. We never store your UPI credentials or payment details.' } },
            ],
          }) }}
        />
        <FAQSection />

        {/* ── 12. FINAL CTA ─────────────────────────────────────── */}
        <section aria-labelledby="cta-heading" className="py-32 px-6 relative overflow-hidden text-center" style={{ background: BG }}>
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{ background: `radial-gradient(ellipse 70% 60% at 50% 50%, rgba(232,83,58,0.07), transparent)` }}
          />
          <div className="max-w-2xl mx-auto relative z-10">
            <p className="uppercase mb-8 reveal" style={{ fontSize: 11, letterSpacing: '0.08em', color: LABEL, fontWeight: 500 }}>
              Early access — free forever
            </p>
            <h2
              id="cta-heading"
              className="mb-4 reveal"
              data-delay="80"
              style={{ fontFamily: INTER, fontWeight: 800, fontSize: 'clamp(44px, 7vw, 80px)', lineHeight: 1.02, letterSpacing: '-0.04em', color: HEAD }}
            >
              Be one of the first.<br />
              <span style={{ color: ACC }}>taar.bio</span>/yourname.
            </h2>
            <p className="mb-10 reveal" data-delay="160" style={{ fontSize: 18, color: BODY, fontWeight: 400 }}>
              Free forever. No credit card. Set up in 5 minutes.
            </p>
            <div className="max-w-sm mx-auto reveal" data-delay="240">
              <UsernameInput />
            </div>
          </div>
        </section>

      </main>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="px-6 py-16" style={{ background: BG, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <p
              className="mb-2"
              style={{ fontFamily: INTER, fontWeight: 600, fontSize: 15, letterSpacing: '0.12em', color: HEAD }}
            >
              TAAR
            </p>
            <p
              className="mb-6"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 15, color: BODY }}
            >
              Made by creators, for creators.
            </p>
            <div className="flex items-center gap-4 mb-8">
              <a href="https://twitter.com/taarbio" target="_blank" rel="noopener noreferrer" aria-label="Taar on Twitter / X" style={{ color: LABEL }} className="hover:text-[#F5F5F7] transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L2.25 2.25h6.952l4.26 5.635L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
                </svg>
              </a>
              <a href="https://instagram.com/taarbio" target="_blank" rel="noopener noreferrer" aria-label="Taar on Instagram" style={{ color: LABEL }} className="hover:text-[#F5F5F7] transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162S8.597 18.163 12 18.163s6.162-2.759 6.162-6.162S15.403 5.838 12 5.838zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
            <p style={{ color: LABEL, fontSize: 11 }}>© {new Date().getFullYear()} Taar · Made with ♥ in India</p>
          </div>

          {/* Product */}
          <div>
            <p className="uppercase mb-4" style={{ fontSize: 11, letterSpacing: '0.08em', color: LABEL, fontWeight: 500 }}>Product</p>
            <nav aria-label="Product footer navigation">
              <ul className="space-y-3">
                {[
                  { label: 'How It Works', href: '/#how-heading' },
                  { label: 'Templates', href: '/#templates' },
                  { label: 'Pricing', href: '/#pricing' },
                  { label: 'Demo', href: '/demo' },
                  { label: 'Blog', href: '/blog' },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="hover:text-[#A1A1A6] transition-colors" style={{ color: LABEL, fontSize: 13 }}>{label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Company */}
          <div>
            <p className="uppercase mb-4" style={{ fontSize: 11, letterSpacing: '0.08em', color: LABEL, fontWeight: 500 }}>Company</p>
            <nav aria-label="Company footer navigation">
              <ul className="space-y-3">
                {[
                  { label: 'Privacy', href: '/privacy' },
                  { label: 'Terms', href: '/terms' },
                  { label: 'Contact', href: 'mailto:hello@taar.bio' },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="hover:text-[#A1A1A6] transition-colors" style={{ color: LABEL, fontSize: 13 }}>{label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </footer>

      <div className="md:hidden h-16" aria-hidden="true" />
    </div>
  )
}

import Link from 'next/link'
import { CursorGlow } from '@/components/landing/CursorGlow'
import { LandingNav } from '@/components/landing/LandingNav'
import { PageEffects } from '@/components/landing/PageEffects'
import { UsernameInput } from '@/components/landing/UsernameInput'
import { PricingProCard } from '@/components/landing/PricingProCard'
import { createClient } from '@/lib/supabase/server'
import { PRO_PRICE_INR } from '@/lib/constants'

const TEMPLATES = [
  { name: 'Bollywood Editorial', bg: '#0A0005', accent: '#F5C842', textColor: '#F5C842', nameFontFamily: "'Cinzel', serif", tag: 'Cinematic' },
  { name: 'Desi Marigold', bg: 'linear-gradient(160deg,#FF6500,#c8500a)', accent: '#FFD700', textColor: '#fff', nameFontFamily: "'Raleway', sans-serif", tag: 'Vibrant' },
  { name: 'Mumbai Noir', bg: '#08080F', accent: '#9B59B6', textColor: '#E0D0F8', nameFontFamily: "'Josefin Sans', sans-serif", tag: 'Dark' },
  { name: 'Rajasthani Royal', bg: '#1A0800', accent: '#D4AF37', textColor: '#D4AF37', nameFontFamily: "'Cinzel', serif", tag: 'Regal' },
  { name: 'Cyberpunk', bg: '#000', accent: '#00FF41', textColor: '#00FF41', nameFontFamily: 'monospace', tag: 'Futuristic' },
  { name: 'Rose Gold', bg: 'linear-gradient(160deg,#B76E79,#E8B4B8,#F7C59F)', accent: '#fff', textColor: '#fff', nameFontFamily: "'Cormorant Garamond', serif", tag: 'Elegant' },
]

const FEATURES = [
  { icon: '₹', title: 'UPI Payment Links', desc: 'Accept tips, donations, and service payments directly on your page. No payment gateway setup needed.' },
  { icon: '🎬', title: 'Instagram Reels Shelf', desc: 'Your latest Reels auto-sync to your Taar page. Visitors see your content without leaving.' },
  { icon: '🎨', title: '50 Designer Templates', desc: 'From Bollywood editorial to minimalist clean — every template is built for Indian aesthetics.' },
]

const HOW_IT_WORKS = [
  { step: '01', icon: '👤', title: 'Sign up free', sub: 'No credit card. Just your name.' },
  { step: '02', icon: '🎨', title: 'Pick your template', sub: 'Choose from 50 India-built designs.' },
  { step: '03', icon: '🔗', title: 'Share your link', sub: 'Add your UPI, Reels, links — go live.' },
]

const TESTIMONIALS = [
  { quote: 'Set up in 10 minutes, my audience can now tip me directly in UPI. Linktree never had this.', name: 'Priya S.', handle: 'Food Creator, Mumbai · 47K followers', initial: 'P' },
  { quote: 'The Bollywood template matches my brand perfectly. My link-in-bio finally looks like me.', name: 'Arjun M.', handle: 'Music Producer, Delhi · 82K followers', initial: 'A' },
  { quote: 'My Reels shelf updates automatically — I never have to manually add new content.', name: 'Sneha K.', handle: 'Travel Creator, Bangalore · 31K followers', initial: 'S' },
]

const COMPARE = [
  { feature: 'UPI Payments (GPay, PhonePe)', taar: '✓ Free', linktree: '✗ Not available' },
  { feature: 'Instagram Reels auto-sync', taar: '✓ Free', linktree: '✗ Not available' },
  { feature: 'Indian-built templates', taar: '✓ 50 templates', linktree: '✗ Generic only' },
  { feature: 'Free plan templates', taar: '✓ All 50', linktree: '1 only' },
  { feature: 'Price of paid plan', taar: `₹${PRO_PRICE_INR}/mo`, linktree: '₹800+/mo' },
  { feature: 'Made in India', taar: '✓', linktree: '✗' },
]

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const isLoggedIn = !!user

  return (
    <div style={{ background: '#060606', minHeight: '100vh' }}>
      {/* ── Skip to content (A11y) ─────────────────────────── */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99999] focus:bg-[#E8593C] focus:text-white focus:px-4 focus:py-2 focus:rounded-full focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>

      <div className="grain-overlay" />
      <CursorGlow />
      <PageEffects />

      {/* ── NAV ────────────────────────────────────────────── */}
      <header>
        <LandingNav isLoggedIn={isLoggedIn} />
      </header>

      {/* ── MAIN ───────────────────────────────────────────── */}
      <main id="main-content">

        {/* ── 1. HERO ──────────────────────────────────────── */}
        <section
          id="hero-section"
          aria-label="Hero"
          className="min-h-[100svh] flex flex-col md:flex-row bg-[#060606] relative pt-16 overflow-hidden"
        >
          <div
            className="pointer-events-none absolute top-0 left-0 w-full h-full"
            aria-hidden="true"
            style={{ background: 'radial-gradient(ellipse 60% 50% at 30% 50%, rgba(232,89,60,0.07) 0%, transparent 70%)' }}
          />

          {/* Left col */}
          <div className="flex-1 flex flex-col justify-center px-6 md:pl-16 md:pr-8 py-16 md:py-20 relative z-10">
            <p className="font-mono text-xs tracking-[0.2em] text-[#E8593C] mb-6 uppercase reveal">
              Free link in bio · Built for India
            </p>
            <h1 className="leading-[0.92] tracking-tight" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              <span className="block text-white reveal" data-delay="80" style={{ fontSize: 'clamp(52px, 7vw, 96px)' }}>Your link.</span>
              <span className="block text-white reveal" data-delay="160" style={{ fontSize: 'clamp(52px, 7vw, 96px)' }}>Your UPI.</span>
              <span className="block text-[#E8593C] reveal" data-delay="240" style={{ fontSize: 'clamp(52px, 7vw, 96px)' }}>Your page.</span>
            </h1>
            <p className="mt-6 text-white/50 text-base md:text-lg leading-relaxed max-w-sm reveal" data-delay="320">
              50 templates. UPI payments. Instagram Reels. All free.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 items-center reveal" data-delay="400">
              <Link
                href="/login"
                className="bg-[#E8593C] text-white text-sm px-7 py-4 rounded-full hover:bg-[#d44a2b] transition-colors"
                style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.1em' }}
              >
                Create your Taar &mdash; it&apos;s free →
              </Link>
              <Link href="/demo" target="_blank" className="hidden md:inline text-white/40 text-sm hover:text-white/70 transition-colors underline underline-offset-4">
                See an example ↗
              </Link>
            </div>
            <Link href="/demo" target="_blank" className="mt-4 text-white/30 text-sm md:hidden inline-block">
              👉 See what your page looks like →
            </Link>
            <p className="mt-8 text-white/25 text-xs font-mono reveal" data-delay="480">
              🧵 2,400+ Indian creators · ₹3.2L+ collected via UPI
            </p>
          </div>

          {/* Right col — phone frame */}
          <div className="hidden md:flex flex-1 items-center justify-center pr-8 py-16 relative z-10" aria-hidden="true">
            <div className="flex flex-col items-center">
              <div style={{ width: 260, height: 520, borderRadius: 40, border: '6px solid rgba(255,255,255,0.08)', background: '#111', boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)', overflow: 'hidden' }}>
                <iframe src="/demo" title="Taar demo preview" style={{ width: '100%', height: '100%', border: 'none', pointerEvents: 'none', display: 'block' }} />
              </div>
              <div className="flex gap-1.5 justify-center mt-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#E8593C]" />
                <div className="w-1 h-1 rounded-full bg-white/20 self-center" />
                <div className="w-1 h-1 rounded-full bg-white/20 self-center" />
              </div>
              <p className="font-mono text-xs text-white/30 mt-2">taar.bio/priya</p>
            </div>
          </div>
        </section>

        {/* ── 2. TRUST BAR ─────────────────────────────────── */}
        <section aria-label="Social proof" className="border-y border-white/[0.06] bg-[#060606] py-10">
          <div className="max-w-4xl mx-auto px-6 grid grid-cols-3 gap-6 text-center">
            {[
              { num: '2,400+', label: 'Creators' },
              { num: '₹3.2L+', label: 'Collected via UPI' },
              { num: '50', label: 'Free Templates' },
            ].map(({ num, label }) => (
              <div key={label} className="reveal">
                <p className="text-white" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(32px, 5vw, 56px)' }}>{num}</p>
                <p className="text-white/30 text-xs font-mono tracking-wide mt-1">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 3. FEATURES ──────────────────────────────────── */}
        <section aria-labelledby="features-heading" className="bg-[#060606] py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <p className="font-mono text-xs tracking-[0.2em] text-[#E8593C] mb-4 uppercase">Everything you need</p>
            <h2
              id="features-heading"
              className="text-white mb-16"
              style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(40px, 5.5vw, 72px)', lineHeight: 0.95 }}
            >
              Built for how<br />Indian creators work.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {FEATURES.map(({ icon, title, desc }, i) => (
                <div
                  key={title}
                  className="reveal border border-white/[0.07] rounded-2xl p-8 hover:border-white/[0.14] transition-colors"
                  data-delay={String(i * 100)}
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  <div className="text-3xl mb-6 w-12 h-12 flex items-center justify-center rounded-xl" style={{ background: 'rgba(232,89,60,0.1)', color: '#E8593C' }}>{icon}</div>
                  <h3 className="text-white mb-3" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 24, letterSpacing: '0.05em' }}>{title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. HOW IT WORKS ──────────────────────────────── */}
        <section aria-labelledby="how-heading" className="bg-[#060606] py-24 px-6 border-t border-white/[0.06]">
          <div className="max-w-5xl mx-auto">
            <p className="font-mono text-xs tracking-[0.2em] text-[#E8593C] mb-4 uppercase">Quick setup</p>
            <h2
              id="how-heading"
              className="text-white mb-16"
              style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(40px, 5.5vw, 72px)', lineHeight: 0.95 }}
            >
              Set up in 5 minutes.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-0 relative">
              {/* Desktop connecting line */}
              <div
                className="hidden md:block absolute top-8 left-[16.66%] right-[16.66%] h-px"
                aria-hidden="true"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(232,89,60,0.3), rgba(232,89,60,0.3), transparent)' }}
              />

              {HOW_IT_WORKS.map(({ step, icon, title, sub }, i) => (
                <div key={step} className="reveal relative flex flex-col items-center md:items-start text-center md:text-left px-6 py-8 md:py-0" data-delay={String(i * 100)}>
                  {/* Number badge */}
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6 text-2xl relative z-10"
                    style={{ background: '#0A0A0A', border: '1px solid rgba(232,89,60,0.3)', boxShadow: '0 0 0 4px #060606' }}
                    aria-label={`Step ${step}`}
                  >
                    <span aria-hidden="true">{icon}</span>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed max-w-[180px]">{sub}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <Link
                href="/login"
                className="inline-block bg-[#E8593C] text-white text-sm px-8 py-4 rounded-full hover:bg-[#d44a2b] transition-colors"
                style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.1em' }}
              >
                Create your Taar →
              </Link>
            </div>
          </div>
        </section>

        {/* ── 5. TEMPLATES ─────────────────────────────────── */}
        <section id="templates" aria-labelledby="templates-heading" className="bg-[#060606] py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <p className="font-mono text-xs tracking-[0.2em] text-[#E8593C] mb-4 uppercase">50 templates</p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
              <h2
                id="templates-heading"
                className="text-white"
                style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(40px, 5.5vw, 72px)', lineHeight: 0.95 }}
              >
                Your page,<br />your aesthetic.
              </h2>
              <Link href="/login" className="shrink-0 text-xs text-white/40 hover:text-white transition-colors underline underline-offset-4">
                Browse all 50 templates →
              </Link>
            </div>

            {/* Mobile: horizontally scrollable with snap; Desktop: 3-col grid */}
            <div
              className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory md:snap-none scroll-smooth"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {TEMPLATES.map((t, i) => (
                <Link
                  key={t.name}
                  href="/login"
                  className="template-card group relative shrink-0 w-[60vw] sm:w-[44vw] md:w-auto rounded-2xl overflow-hidden cursor-pointer snap-start"
                  data-delay={String(i * 60)}
                  style={{ background: t.bg, aspectRatio: '9/16' }}
                  aria-label={`Use ${t.name} template`}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shrink-0" style={{ background: `${t.accent}22`, color: t.accent, border: `1.5px solid ${t.accent}55` }}>P</div>
                    <p className="text-center text-sm font-semibold" style={{ color: t.textColor, fontFamily: t.nameFontFamily }}>Priya Sharma</p>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full" style={{ background: `${t.accent}22`, color: t.accent }}>{t.tag}</span>
                    {[1, 2, 3].map((n) => (
                      <div key={n} className="w-full max-w-[140px] h-6 rounded-full opacity-30" style={{ background: t.accent }} />
                    ))}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-[10px] font-mono text-white/50 truncate">{t.name}</p>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 text-white text-sm tracking-widest transition-opacity duration-300" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>USE THIS →</span>
                  </div>
                </Link>
              ))}
            </div>
            {/* Mobile scroll fade hint */}
            <div className="md:hidden mt-3 flex justify-center">
              <p className="text-white/20 text-xs font-mono">← scroll for more →</p>
            </div>
          </div>
        </section>

        {/* ── 6. MARQUEE TAPE ──────────────────────────────── */}
        <div className="overflow-hidden border-y border-white/[0.06] py-4" style={{ background: '#0A0A0A' }} aria-hidden="true">
          <div className="animate-marquee whitespace-nowrap">
            {Array(2).fill(null).map((_, i) => (
              <span key={i} className="inline-flex items-center gap-8 mr-8">
                {['UPI Payments', 'Instagram Reels', '50 Templates', 'Custom Domain', 'Digital Products', 'Analytics', 'Free Forever'].map((item) => (
                  <span key={item} className="inline-flex items-center gap-3">
                    <span className="w-1 h-1 rounded-full bg-[#E8593C] shrink-0" />
                    <span className="font-mono text-xs tracking-[0.15em] text-white/30 uppercase">{item}</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* ── 7. TESTIMONIALS ──────────────────────────────── */}
        <section aria-labelledby="testimonials-heading" className="bg-[#060606] py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <p className="font-mono text-xs tracking-[0.2em] text-[#E8593C] mb-4 uppercase">Creators love Taar</p>
            <h2
              id="testimonials-heading"
              className="text-white mb-16"
              style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(40px, 5.5vw, 72px)', lineHeight: 0.95 }}
            >
              Real creators,<br />real results.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map(({ quote, name, handle, initial }, i) => (
                <figure
                  key={name}
                  className="reveal border border-white/[0.07] rounded-2xl p-7 flex flex-col gap-5 hover:border-white/[0.12] transition-colors"
                  data-delay={String(i * 80)}
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  <blockquote className="text-white/70 text-sm leading-relaxed flex-1">&ldquo;{quote}&rdquo;</blockquote>
                  <figcaption className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0" style={{ background: 'rgba(232,89,60,0.15)', color: '#E8593C' }} aria-hidden="true">{initial}</div>
                    <div>
                      <p className="text-white text-sm font-semibold">{name}</p>
                      <p className="text-white/30 text-xs mt-0.5">{handle}</p>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── 8. PRICING ───────────────────────────────────── */}
        <section id="pricing" aria-labelledby="pricing-heading" className="bg-[#060606] py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <p className="font-mono text-xs tracking-[0.2em] text-[#E8593C] mb-4 text-center uppercase">Simple pricing</p>
            <h2
              id="pricing-heading"
              className="text-white text-center mb-16"
              style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(40px, 5.5vw, 72px)', lineHeight: 0.95 }}
            >
              Free. Forever.<br />Seriously.
            </h2>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Free */}
              <div id="pricing-free" className="reveal flex-1 border border-white/[0.08] rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <p className="font-mono text-xs text-white/40 tracking-wide mb-3">FREE</p>
                <p className="text-white mb-1" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 52, lineHeight: 1 }}>₹0</p>
                <p className="text-white/30 text-xs mb-8">forever · no credit card</p>
                <ul className="space-y-3 mb-10" aria-label="Free plan features">
                  {['All 50 templates', 'UPI payment links', 'Instagram Reels shelf', 'Unlimited links', 'Basic analytics'].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-white/60">
                      <span className="text-[#E8593C] shrink-0" aria-hidden="true">✓</span>{f}
                    </li>
                  ))}
                </ul>
                <Link href="/login" className="block text-center py-3.5 rounded-full border border-white/20 text-white text-sm hover:border-white/40 transition-colors" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.1em' }}>
                  Start for free →
                </Link>
              </div>

              {/* Pro */}
              <PricingProCard price={PRO_PRICE_INR} />
            </div>
          </div>
        </section>

        {/* ── 9. COMPARISON TABLE ──────────────────────────── */}
        <section aria-labelledby="compare-heading" className="bg-[#060606] py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <p className="font-mono text-xs tracking-[0.2em] text-[#E8593C] mb-4 uppercase">vs Linktree</p>
            <h2
              id="compare-heading"
              className="text-white mb-12"
              style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(40px, 5.5vw, 72px)', lineHeight: 0.95 }}
            >
              Why creators switch<br />from Linktree.
            </h2>

            <div className="overflow-x-auto rounded-2xl border border-white/[0.07]" style={{ WebkitOverflowScrolling: 'touch' }}>
              <table className="w-full min-w-[540px] text-sm" role="table" aria-label="Taar vs Linktree feature comparison">
                <thead>
                  <tr className="border-b border-white/[0.07]" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <th className="text-left px-6 py-4 text-white/40 font-mono text-xs tracking-widest uppercase" scope="col">Feature</th>
                    <th className="px-6 py-4 text-[#E8593C] font-mono text-xs tracking-widest uppercase text-center" scope="col">Taar</th>
                    <th className="px-6 py-4 text-white/25 font-mono text-xs tracking-widest uppercase text-center" scope="col">Linktree</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map(({ feature, taar, linktree }, i) => (
                    <tr
                      key={feature}
                      className="compare-row border-b border-white/[0.04] last:border-0"
                      style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}
                    >
                      <td className="px-6 py-4 text-white/60">{feature}</td>
                      <td className="px-6 py-4 text-center font-semibold" style={{ color: '#E8593C' }}>{taar}</td>
                      <td className="px-6 py-4 text-center text-white/30">{linktree}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── 10. FINAL CTA ────────────────────────────────── */}
        <section aria-labelledby="cta-heading" className="bg-[#060606] py-32 px-6 relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(232,89,60,0.08) 0%, transparent 70%)' }} />
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <p className="font-mono text-xs tracking-[0.2em] text-[#E8593C] mb-6 reveal uppercase">Get started in 5 minutes</p>
            <h2
              id="cta-heading"
              className="text-white mb-4 reveal"
              data-delay="80"
              style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(48px, 7vw, 88px)', lineHeight: 0.92 }}
            >
              Claim your<br /><span className="text-[#E8593C]">taar.bio</span> link.
            </h2>
            <p className="text-white/40 text-base mb-10 reveal" data-delay="160">Free forever. No credit card. Set up in 5 minutes.</p>
            <div className="max-w-sm mx-auto reveal" data-delay="240">
              <UsernameInput />
            </div>
          </div>
        </section>

      </main>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.06] py-16 px-6" style={{ background: '#040404' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left col */}
          <div>
            <p className="text-white/80 text-2xl tracking-[0.15em] mb-3" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>TAAR</p>
            <p className="text-white/25 text-xs font-mono mb-6">Made by creators, for creators.</p>
            {/* Social icons */}
            <div className="flex items-center gap-4 mb-8">
              <a href="https://twitter.com/taarbio" target="_blank" rel="noopener noreferrer" aria-label="Taar on Twitter / X" className="text-white/25 hover:text-white/60 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L2.25 2.25h6.952l4.26 5.635L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
                </svg>
              </a>
              <a href="https://instagram.com/taarbio" target="_blank" rel="noopener noreferrer" aria-label="Taar on Instagram" className="text-white/25 hover:text-white/60 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162S8.597 18.163 12 18.163s6.162-2.759 6.162-6.162S15.403 5.838 12 5.838zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
            <p className="text-white/15 text-xs font-mono">
              © {new Date().getFullYear()} Taar · Made with ♥ in India
            </p>
          </div>

          {/* Right col — nav */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-white/40 text-xs font-mono tracking-widest uppercase mb-4">Product</p>
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
                      <Link href={href} className="text-white/30 text-xs hover:text-white/60 transition-colors font-mono">{label}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div>
              <p className="text-white/40 text-xs font-mono tracking-widest uppercase mb-4">Company</p>
              <nav aria-label="Company footer navigation">
                <ul className="space-y-3">
                  {[
                    { label: 'Privacy', href: '/privacy' },
                    { label: 'Terms', href: '/terms' },
                    { label: 'Contact', href: 'mailto:hello@taar.bio' },
                  ].map(({ label, href }) => (
                    <li key={label}>
                      <Link href={href} className="text-white/30 text-xs hover:text-white/60 transition-colors font-mono">{label}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile padding for sticky CTA */}
      <div className="md:hidden h-16" aria-hidden="true" />
    </div>
  )
}

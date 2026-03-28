import Link from 'next/link'
import { CursorGlow } from '@/components/landing/CursorGlow'
import { LandingNav } from '@/components/landing/LandingNav'
import { PageEffects } from '@/components/landing/PageEffects'
import { UsernameInput } from '@/components/landing/UsernameInput'
import { FAQSection } from '@/components/landing/FAQSection'
import { PricingSection } from '@/components/landing/PricingSection'
import { HeroTemplateSwitcher } from '@/components/landing/HeroTemplateSwitcher'
import { createClient } from '@/lib/supabase/server'
import { ScrollProgressBar } from '@/components/animations/ScrollProgressBar'
import { ScrollCanvas } from '@/components/ScrollCanvas'
import { ScrollCounter } from '@/components/animations/ScrollCounter'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { HorizontalScrollFeatures } from '@/components/animations/HorizontalScrollFeatures'
import { TemplateSwitcher } from '@/components/animations/TemplateSwitcher'
import { ScrubText } from '@/components/animations/ScrubText'

const TEMPLATES = [
  { name: 'Bollywood Editorial', bg: '#0A0005', accent: '#F5C842', textColor: '#F5C842', nameFontFamily: "'Cinzel', serif", tag: 'Cinematic' },
  { name: 'Desi Marigold', bg: 'linear-gradient(160deg,#FF6500,#c8500a)', accent: '#FFD700', textColor: '#fff', nameFontFamily: "'Raleway', sans-serif", tag: 'Vibrant' },
  { name: 'Mumbai Noir', bg: '#08080F', accent: '#9B59B6', textColor: '#E0D0F8', nameFontFamily: "'Josefin Sans', sans-serif", tag: 'Dark' },
  { name: 'Rajasthani Royal', bg: '#1A0800', accent: '#D4AF37', textColor: '#D4AF37', nameFontFamily: "'Cinzel', serif", tag: 'Regal' },
  { name: 'Cyberpunk', bg: '#000', accent: '#00FF41', textColor: '#00FF41', nameFontFamily: 'monospace', tag: 'Futuristic' },
  { name: 'Rose Gold', bg: 'linear-gradient(160deg,#B76E79,#E8B4B8,#F7C59F)', accent: '#fff', textColor: '#fff', nameFontFamily: "'Cormorant Garamond', serif", tag: 'Elegant' },
]

const FEATURES = [
  { icon: '₹', title: 'UPI Payment Links', desc: 'Accept tips, donations, and payments via GPay, PhonePe, Paytm — directly on your page. No gateway setup.' },
  { icon: '✦', title: '50 Designer Templates', desc: 'Bollywood editorial, Rajasthani royal, cyberpunk, pastel — built for Indian aesthetics, not generic global ones.' },
  { icon: '◈', title: 'Real Analytics', desc: 'See who visits your page, which links they click, where they come from — updated daily. No guessing.' },
  { icon: '⊡', title: 'Email Capture', desc: 'Add a subscribe form to your page. Build your mailing list directly from your Taar link.' },
  { icon: '◇', title: 'Sell Digital Products', desc: 'Sell presets, PDFs, courses, or anything digital. Payments via Razorpay, delivered instantly.' },
  { icon: '⊞', title: 'Media Kit', desc: 'A shareable page with your live stats — page views, CTR, active channels. Built for brand pitches.' },
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

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const isLoggedIn = !!user

  return (
    <div style={{ background: '#0A0805', minHeight: '100vh' }}>
      {/* ── Skip to content ──────────────────────────────── */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99999] focus:bg-[#BFA07A] focus:text-[#0A0805] focus:px-4 focus:py-2 focus:rounded-none focus:text-sm focus:font-mono focus:tracking-wider"
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

        {/* ── 0. SCROLL CANVAS ─────────────────────────────── */}
        <ScrollCanvas />

        {/* ── 1. HERO ──────────────────────────────────────── */}
        <section
          id="hero-section"
          aria-label="Hero"
          className="min-h-[100svh] flex flex-col md:flex-row bg-[#0A0805] relative pt-16 overflow-hidden"
        >
          {/* Ambient warm glow */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{ background: 'radial-gradient(ellipse 55% 70% at 10% 55%, rgba(191,160,122,0.07) 0%, transparent 65%)' }}
          />

          {/* Left col */}
          <div className="flex-1 flex flex-col justify-center px-8 md:pl-20 md:pr-12 py-20 md:py-24 relative z-10">

            {/* Label */}
            <div className="flex items-center gap-4 mb-10 reveal">
              <div className="w-10 h-px bg-[#BFA07A]" />
              <p className="font-mono text-[10px] tracking-[0.25em] text-[#BFA07A] uppercase">Link in bio · Built for India</p>
            </div>

            {/* Headline */}
            <h1
              className="leading-[0.88]"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', letterSpacing: '-0.01em' }}
            >
              <span className="block text-[#F0EBE3] reveal" data-delay="60" style={{ fontSize: 'clamp(68px, 9vw, 126px)' }}>Your link.</span>
              <span className="block text-[#F0EBE3] reveal" data-delay="120" style={{ fontSize: 'clamp(68px, 9vw, 126px)' }}>Your UPI.</span>
              <span className="block text-[#BFA07A] reveal" data-delay="180" style={{ fontSize: 'clamp(68px, 9vw, 126px)' }}>Your page.</span>
            </h1>

            {/* Hairline + sub */}
            <div className="flex items-center gap-5 mt-8 mb-2 reveal" data-delay="240">
              <div className="w-12 h-px bg-[#BFA07A]/50 shrink-0" />
              <p className="text-[#F0EBE3]/50 text-sm leading-relaxed">
                50 templates · UPI payments · Free forever
              </p>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-4 items-center reveal" data-delay="300">
              <Link
                href="/login"
                className="inline-block px-8 py-[14px] text-[#0A0805] text-[11px] tracking-[0.2em] uppercase font-mono hover:bg-[#D4C09A] transition-colors"
                style={{ background: '#BFA07A' }}
              >
                Claim your Taar →
              </Link>
              <Link
                href="/demo"
                target="_blank"
                className="hidden md:inline text-[#F0EBE3]/45 text-sm hover:text-[#F0EBE3] transition-colors"
              >
                See an example ↗
              </Link>
            </div>
            <Link href="/demo" target="_blank" className="mt-4 text-[#BFA07A]/70 text-sm md:hidden inline-block">
              See what your page looks like →
            </Link>

            <p className="mt-8 text-[#F0EBE3]/28 text-[10px] font-mono tracking-wide reveal" data-delay="400">
              Free forever · Just launched · Made in India
            </p>
          </div>

          {/* Right col */}
          <HeroTemplateSwitcher />
        </section>

        {/* ── 2. VALUE PROPS BAR ───────────────────────────── */}
        <section aria-label="Key facts" className="border-y border-[#BFA07A]/10 bg-[#0A0805]">
          <div className="max-w-4xl mx-auto px-8 grid grid-cols-3">
            <div className="text-center py-10 border-r border-[#BFA07A]/10 reveal">
              <p
                className="text-[#F0EBE3]"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(44px, 6vw, 72px)', lineHeight: 1, fontWeight: 300 }}
              >
                ₹0
              </p>
              <p className="font-mono text-[10px] tracking-[0.2em] text-[#BFA07A]/60 uppercase mt-2">Forever free</p>
            </div>
            <div className="text-center py-10 border-r border-[#BFA07A]/10 reveal" data-delay="100">
              <p
                className="text-[#F0EBE3]"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(44px, 6vw, 72px)', lineHeight: 1, fontWeight: 300 }}
              >
                <ScrollCounter from={0} to={5} suffix=" min">5 min</ScrollCounter>
              </p>
              <p className="font-mono text-[10px] tracking-[0.2em] text-[#BFA07A]/60 uppercase mt-2">Setup time</p>
            </div>
            <div className="text-center py-10 reveal" data-delay="200">
              <p
                className="text-[#F0EBE3]"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(44px, 6vw, 72px)', lineHeight: 1, fontWeight: 300 }}
              >
                <ScrollCounter from={0} to={50}>50</ScrollCounter>
              </p>
              <p className="font-mono text-[10px] tracking-[0.2em] text-[#BFA07A]/60 uppercase mt-2">Templates</p>
            </div>
          </div>
        </section>

        {/* ── 3. FEATURES ──────────────────────────────────── */}
        <HorizontalScrollFeatures
          features={FEATURES}
          label="Built for creators"
          heading={<>Built for how<br />Indian creators work.</>}
        />

        {/* ── 4. HOW IT WORKS ──────────────────────────────── */}
        <section aria-labelledby="how-heading" className="bg-[#0A0805] py-24 px-8 border-t border-[#BFA07A]/10">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8 reveal">
              <div className="w-10 h-px bg-[#BFA07A]" />
              <p className="font-mono text-[10px] tracking-[0.25em] text-[#BFA07A] uppercase">Quick setup</p>
            </div>
            <h2
              id="how-heading"
              className="text-[#F0EBE3] mb-16 reveal"
              data-delay="60"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 'clamp(44px, 6vw, 80px)', lineHeight: 0.92 }}
            >
              Set up in 5 minutes.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">
              {/* Desktop connecting line */}
              <div
                className="hidden md:block absolute top-8 left-[16.66%] right-[16.66%] h-px"
                aria-hidden="true"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(191,160,122,0.2), rgba(191,160,122,0.2), transparent)' }}
              />

              {HOW_IT_WORKS.map(({ step, title, sub }, i) => (
                <div
                  key={step}
                  className="reveal relative flex flex-col items-center md:items-start text-center md:text-left px-6 py-8 md:py-0"
                  data-delay={String(i * 120)}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6 relative z-10"
                    style={{ background: '#110E09', border: '1px solid rgba(191,160,122,0.2)', boxShadow: '0 0 0 5px #0A0805' }}
                  >
                    <span className="font-mono text-[11px] text-[#BFA07A] tracking-widest">{step}</span>
                  </div>
                  <h3
                    className="text-[#F0EBE3] font-normal text-xl mb-2"
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  >
                    {title}
                  </h3>
                  <p className="text-[#F0EBE3]/55 text-sm leading-relaxed max-w-[180px]">{sub}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <Link
                href="/login"
                className="inline-block px-8 py-[14px] text-[#0A0805] text-[11px] tracking-[0.2em] uppercase font-mono hover:bg-[#D4C09A] transition-colors"
                style={{ background: '#BFA07A' }}
              >
                Create your Taar →
              </Link>
            </div>
          </div>
        </section>

        {/* ── 4b. TEMPLATE SWITCHER ────────────────────────── */}
        <TemplateSwitcher templates={TEMPLATES} />

        {/* ── 5. TEMPLATES ─────────────────────────────────── */}
        <section id="templates" aria-labelledby="templates-heading" className="bg-[#0A0805] pt-10 pb-20 px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-6 reveal">
              <div className="w-10 h-px bg-[#BFA07A]" />
              <p className="font-mono text-[10px] tracking-[0.25em] text-[#BFA07A] uppercase">50 templates</p>
            </div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
              <h2
                id="templates-heading"
                className="text-[#F0EBE3] reveal"
                data-delay="60"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 'clamp(40px, 5.5vw, 72px)', lineHeight: 0.92 }}
              >
                Your page,<br />your aesthetic.
              </h2>
              <Link
                href="/login"
                className="shrink-0 text-[11px] font-mono text-[#BFA07A]/60 hover:text-[#BFA07A] transition-colors tracking-widest uppercase"
              >
                Browse all 50 →
              </Link>
            </div>

            <div
              className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory md:snap-none scroll-smooth"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {TEMPLATES.map((t, i) => (
                <Link
                  key={t.name}
                  href="/login"
                  className="template-card group relative shrink-0 w-[60vw] sm:w-[44vw] md:w-auto rounded-xl overflow-hidden cursor-pointer snap-start"
                  data-delay={String(i * 60)}
                  style={{ background: t.bg, aspectRatio: '9/16' }}
                  aria-label={`Use ${t.name} template`}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shrink-0"
                      style={{ background: `${t.accent}22`, color: t.accent, border: `1.5px solid ${t.accent}55` }}
                    >P</div>
                    <p className="text-center text-sm font-semibold" style={{ color: t.textColor, fontFamily: t.nameFontFamily }}>Priya Sharma</p>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full" style={{ background: `${t.accent}22`, color: t.accent }}>{t.tag}</span>
                    {[1, 2, 3].map((n) => (
                      <div key={n} className="w-full max-w-[140px] h-6 rounded-full opacity-25" style={{ background: t.accent }} />
                    ))}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-[10px] font-mono text-white/40 truncate">{t.name}</p>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/55 transition-all duration-300 flex items-center justify-center">
                    <span
                      className="opacity-0 group-hover:opacity-100 text-white text-sm tracking-[0.2em] transition-opacity duration-300 font-mono"
                    >
                      USE THIS →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="md:hidden mt-3 flex justify-center">
              <p className="text-[#F0EBE3]/20 text-[10px] font-mono">← scroll for more →</p>
            </div>
          </div>
        </section>

        {/* ── 6. MARQUEE TAPE ──────────────────────────────── */}
        <div className="overflow-hidden border-y border-[#BFA07A]/10 py-4" style={{ background: '#080604' }}>
          <span className="sr-only">Features: UPI Payments, Instagram Reels, 50 Templates, Custom Domain, Digital Products, Analytics, Free Forever</span>
          <div className="animate-marquee whitespace-nowrap" aria-hidden="true">
            {Array(2).fill(null).map((_, i) => (
              <span key={i} className="inline-flex items-center gap-8 mr-8">
                {['UPI Payments', 'Instagram Reels', '50 Templates', 'Custom Domain', 'Digital Products', 'Analytics', 'Free Forever'].map((item) => (
                  <span key={item} className="inline-flex items-center gap-3">
                    <span className="w-1 h-1 rounded-full bg-[#BFA07A]/50 shrink-0" />
                    <span className="font-mono text-[10px] tracking-[0.2em] text-[#F0EBE3]/35 uppercase">{item}</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* ── 7. FOUNDER NOTE ──────────────────────────────── */}
        <section aria-labelledby="founder-heading" className="bg-[#0A0805] py-24 px-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8 reveal">
              <div className="w-10 h-px bg-[#BFA07A]" />
              <p className="font-mono text-[10px] tracking-[0.25em] text-[#BFA07A] uppercase">From the founder</p>
            </div>
            <h2 id="founder-heading" className="sr-only">Built because we were frustrated too.</h2>
            <div
              className="text-[#F0EBE3] mb-8"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 0.95 }}
              aria-hidden="true"
            >
              <ScrubText text="Built because we were frustrated too." />
            </div>
            <p className="text-[#F0EBE3]/60 text-base leading-relaxed mb-8 reveal" data-delay="160">
              Every Indian creator we knew was losing tips, fans, and collabs because their bio link didn&apos;t speak Indian. No UPI. No Reels shelf. Templates that looked copy-pasted from a Western product. So we built Taar — the link in bio we always wanted. We just launched. Come build with us.
            </p>
            <Link
              href="/blog"
              className="reveal inline-flex items-center gap-2 text-sm text-[#BFA07A] hover:text-[#F0EBE3] transition-colors"
              data-delay="240"
            >
              Read why we built Taar →
            </Link>
          </div>
        </section>

        {/* ── 8. PRICING ───────────────────────────────────── */}
        <ScrollReveal fromY={40}>
          <PricingSection />
        </ScrollReveal>

        {/* ── 9. COMPARISON TABLE ──────────────────────────── */}
        <section aria-labelledby="compare-heading" className="bg-[#0A0805] py-24 px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8 reveal">
              <div className="w-10 h-px bg-[#BFA07A]" />
              <p className="font-mono text-[10px] tracking-[0.25em] text-[#BFA07A] uppercase">vs Linktree</p>
            </div>
            <h2
              id="compare-heading"
              className="text-[#F0EBE3] mb-12 reveal"
              data-delay="60"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 'clamp(40px, 5.5vw, 72px)', lineHeight: 0.92 }}
            >
              Why creators switch<br />from Linktree.
            </h2>

            <div className="overflow-x-auto rounded-xl border border-[#BFA07A]/10" style={{ WebkitOverflowScrolling: 'touch' }}>
              <table className="w-full min-w-[540px] text-sm" role="table" aria-label="Taar vs Linktree feature comparison">
                <thead>
                  <tr className="border-b border-[#BFA07A]/10" style={{ background: 'rgba(191,160,122,0.03)' }}>
                    <th className="text-left px-6 py-4 text-[#F0EBE3]/40 font-mono text-[10px] tracking-widest uppercase" scope="col">Feature</th>
                    <th className="px-6 py-4 text-[#BFA07A] font-mono text-[10px] tracking-widest uppercase text-center" scope="col">Taar</th>
                    <th className="px-6 py-4 text-[#F0EBE3]/40 font-mono text-[10px] tracking-widest uppercase text-center" scope="col">Linktree</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map(({ feature, taar, linktree }, i) => (
                    <tr
                      key={feature}
                      className="compare-row border-b border-[#BFA07A]/[0.06] last:border-0"
                      style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(191,160,122,0.015)' }}
                    >
                      <td className="px-6 py-4 text-[#F0EBE3]/65">{feature}</td>
                      <td className="px-6 py-4 text-center font-medium text-[#BFA07A]">{taar}</td>
                      <td className="px-6 py-4 text-center text-[#F0EBE3]/40">{linktree}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── 10. FAQ ──────────────────────────────────────── */}
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

        {/* ── 11. FINAL CTA ────────────────────────────────── */}
        <section aria-labelledby="cta-heading" className="bg-[#0A0805] py-24 px-8 relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(191,160,122,0.06) 0%, transparent 70%)' }}
          />
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <div className="flex items-center justify-center gap-4 mb-8 reveal">
              <div className="w-8 h-px bg-[#BFA07A]" />
              <p className="font-mono text-[10px] tracking-[0.25em] text-[#BFA07A] uppercase">Early access — free forever</p>
              <div className="w-8 h-px bg-[#BFA07A]" />
            </div>
            <h2
              id="cta-heading"
              className="text-[#F0EBE3] mb-4 reveal"
              data-delay="80"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 'clamp(52px, 7vw, 96px)', lineHeight: 0.88 }}
            >
              Be one of the first.<br /><span className="text-[#BFA07A]">taar.bio</span>/yourname.
            </h2>
            <p className="text-[#F0EBE3]/55 text-base mb-10 reveal" data-delay="160">Free forever. No credit card. Set up in 5 minutes.</p>
            <div className="max-w-sm mx-auto reveal" data-delay="240">
              <UsernameInput />
            </div>
          </div>
        </section>

      </main>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className="border-t border-[#BFA07A]/10 py-16 px-8" style={{ background: '#080604' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left col */}
          <div>
            <p className="text-[#F0EBE3]/90 text-2xl tracking-[0.15em] mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>TAAR</p>
            <p
              className="text-[#F0EBE3]/45 mb-6"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 15 }}
            >
              Made by creators, for creators.
            </p>
            <div className="flex items-center gap-4 mb-8">
              <a href="https://twitter.com/taarbio" target="_blank" rel="noopener noreferrer" aria-label="Taar on Twitter / X" className="text-[#F0EBE3]/35 hover:text-[#BFA07A] transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L2.25 2.25h6.952l4.26 5.635L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
                </svg>
              </a>
              <a href="https://instagram.com/taarbio" target="_blank" rel="noopener noreferrer" aria-label="Taar on Instagram" className="text-[#F0EBE3]/35 hover:text-[#BFA07A] transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162S8.597 18.163 12 18.163s6.162-2.759 6.162-6.162S15.403 5.838 12 5.838zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
            <p className="text-[#F0EBE3]/25 text-[11px] font-mono">
              © {new Date().getFullYear()} Taar · Made with ♥ in India
            </p>
          </div>

          {/* Right col */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-[#F0EBE3]/45 text-[10px] font-mono tracking-widest uppercase mb-4">Product</p>
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
                      <Link href={href} className="text-[#F0EBE3]/40 text-xs hover:text-[#BFA07A] transition-colors font-mono">{label}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div>
              <p className="text-[#F0EBE3]/45 text-[10px] font-mono tracking-widest uppercase mb-4">Company</p>
              <nav aria-label="Company footer navigation">
                <ul className="space-y-3">
                  {[
                    { label: 'Privacy', href: '/privacy' },
                    { label: 'Terms', href: '/terms' },
                    { label: 'Contact', href: 'mailto:hello@taar.bio' },
                  ].map(({ label, href }) => (
                    <li key={label}>
                      <Link href={href} className="text-[#F0EBE3]/40 text-xs hover:text-[#BFA07A] transition-colors font-mono">{label}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </footer>

      <div className="md:hidden h-16" aria-hidden="true" />
    </div>
  )
}

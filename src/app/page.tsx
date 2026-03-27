import Link from 'next/link'
import { CursorGlow } from '@/components/landing/CursorGlow'
import { LandingAnimations } from '@/components/landing/LandingAnimations'
import { PageTurnEffect } from '@/components/landing/PageTurnEffect'

const _jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://taar.bio/#organization',
      name: 'Taar',
      url: 'https://taar.bio',
      description: 'Free link in bio tool for Indian creators with UPI payment links, Instagram Reels shelf, digital products, and 50 premium templates.',
      foundingDate: '2024',
      foundingLocation: { '@type': 'Country', name: 'India' },
      areaServed: 'IN',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://taar.bio/#website',
      url: 'https://taar.bio',
      name: 'Taar',
      description: 'Free link in bio for Indian creators',
      publisher: { '@id': 'https://taar.bio/#organization' },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: 'https://taar.bio/{username}' },
        'query-input': 'required name=username',
      },
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Taar',
      applicationCategory: 'WebApplication',
      operatingSystem: 'Web',
      description: 'Taar is a free link in bio tool built for Indian creators. It supports UPI payment links, auto Instagram Reels, digital product sales via Razorpay, click analytics, and 50 premium templates.',
      offers: [
        {
          '@type': 'Offer',
          name: 'Free',
          price: '0',
          priceCurrency: 'INR',
          description: '1 bio page, 8 links, all 50 templates, UPI links, custom username',
        },
        {
          '@type': 'Offer',
          name: 'Pro',
          price: '399',
          priceCurrency: 'INR',
          billingIncrement: 'P1M',
          description: 'Click analytics, Instagram Reels shelf, sell digital products, remove watermark',
        },
      ],
      featureList: [
        'UPI payment links',
        'Auto Instagram Reels shelf',
        'Click analytics',
        'Sell digital products',
        '50 premium templates',
        'Custom username',
        'Razorpay integration',
        'Built for Indian creators',
      ],
      url: 'https://taar.bio',
      publisher: { '@id': 'https://taar.bio/#organization' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is Taar?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Taar is a free link in bio tool built specifically for Indian creators. It lets you put all your important links — UPI payment, Instagram, YouTube, WhatsApp, digital products — on one custom page. You share that one link in your Instagram bio.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is Taar free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Taar has a free plan that is free forever — no credit card, no trial period. The free plan includes 1 bio page, 8 links, all 50 templates, UPI payment links, WhatsApp links, and a custom username. The Pro plan is ₹399/month and adds click analytics, Instagram Reels auto-sync, and digital product sales.',
          },
        },
        {
          '@type': 'Question',
          name: 'How is Taar different from Linktree?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Taar is built specifically for India where Linktree is not. Key differences: Taar supports UPI payment links (GPay, PhonePe, Paytm) which Linktree does not. Taar uses Razorpay for Indian payments. Taar has Indian-specific templates (Bollywood, Desi, Marigold). Taar Pro costs ₹399/month vs Linktree\'s $9/month (~₹750). Taar has an auto Instagram Reels shelf. Taar is built and supported by an Indian company.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does Taar support UPI payments?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Taar supports UPI payment links as a first-class feature — free on all plans. You add your UPI ID and fans can pay you directly via GPay, PhonePe, Paytm, or any UPI app. No payment gateway fee, no middleman. The money goes directly to your bank account.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I sell digital products on Taar?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, on the Pro plan. You can upload up to 5 digital products (PDFs, presets, music, courses) and set a price. Razorpay handles payment collection and the buyer automatically receives the download link by email. You earn while you sleep.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the best Linktree alternative for India?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Taar is the best Linktree alternative for India because it is built specifically for Indian creators. It has UPI payment link support, Indian-specific templates, Razorpay integration for digital product sales, and pricing in INR (₹399/month for Pro vs Linktree\'s ~₹750/month). The free plan is genuinely free forever.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I create a Taar page?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sign up at taar-five.vercel.app with your email. You will receive a magic link — no password needed. Pick a username, choose one of 50 templates, add your links and UPI ID. Your page is live in under 5 minutes. Share your taar link in your Instagram bio.',
          },
        },
      ],
    },
  ],
}

export default function LandingPage() {
  return (
    <div className="bg-[#060606] text-white overflow-x-hidden selection:bg-[#E8593C] selection:text-white" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      <div className="grain-overlay" />
      <CursorGlow />
      <LandingAnimations />
      <PageTurnEffect />

      {/* ─────────────────────────────── NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5">
        <span className="font-display text-2xl tracking-[0.15em] text-white anim-fade-in">TAAR</span>
        <div className="flex items-center gap-4 md:gap-8 anim-fade-in delay-200">
          <Link href="/demo" target="_blank"
            className="text-xs text-[#E8593C] hover:text-white transition-colors tracking-widest uppercase underline-wipe hidden md:block">
            See example ↗
          </Link>
          <Link href="#templates" className="text-xs text-white/40 hover:text-white transition-colors tracking-widest uppercase underline-wipe hidden md:block">Templates</Link>
          <Link href="#pricing"   className="text-xs text-white/40 hover:text-white transition-colors tracking-widest uppercase underline-wipe hidden md:block">Pricing</Link>
          <Link href="/login"     className="text-xs text-white/40 hover:text-white transition-colors tracking-widest uppercase underline-wipe">Login</Link>
          <Link href="/login"
            className="text-xs font-semibold bg-[#E8593C] text-white px-5 py-2.5 tracking-widest uppercase hover:bg-[#d44e33] transition-all">
            Start Free →
          </Link>
        </div>
      </nav>

      {/* ─────────────────────────────── HERO */}
      <section id="hero-section" aria-label="Hero" className="relative min-h-screen flex flex-col justify-end overflow-hidden pb-16 px-6 md:px-12">
        {/* SEO: visually hidden primary heading */}
        <h1 className="sr-only">Free Link in Bio for Indian Creators</h1>
        <h2 className="sr-only">The Linktree Alternative Built for Bharat</h2>
        {/* Faint grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />

        {/* Vertical thread spine */}
        <div className="absolute left-6 md:left-12 top-0 bottom-0 w-px pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1 1" preserveAspectRatio="none">
            <line x1="0.5" y1="0" x2="0.5" y2="1" stroke="#E8593C" strokeWidth="2" strokeDasharray="3 6" opacity="0.3" />
          </svg>
        </div>

        {/* Phone mockup — right side (visible only when fixed phone not active: < xl) */}
        <div className="absolute right-6 md:right-16 top-1/2 -translate-y-1/2 anim-fade-up delay-500 hidden lg:block xl:hidden" style={{ zIndex: 5 }}>
          <div style={{
            width: 220,
            height: 440,
            borderRadius: 36,
            border: '2px solid rgba(255,255,255,0.12)',
            background: '#0A0A0A',
            boxShadow: '0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04), inset 0 0 0 1px rgba(255,255,255,0.06)',
            overflow: 'hidden',
            position: 'relative',
          }}>
            {/* Phone notch */}
            <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 60, height: 6, borderRadius: 3, background: '#1A1A1A', zIndex: 10 }} />

            {/* Bio page inside phone */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #1a0010 0%, #0A0020 60%, #001A10 100%)' }}>
              {/* Glow */}
              <div style={{ position: 'absolute', top: -40, left: '50%', transform: 'translateX(-50%)', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,89,60,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />

              {/* Content */}
              <div style={{ padding: '40px 20px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, height: '100%' }}>
                {/* Avatar */}
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg, #E8593C, #F5C842)', border: '2px solid rgba(255,255,255,0.2)', flexShrink: 0 }} />

                {/* Name */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 16, letterSpacing: 3, color: '#fff' }}>PRIYA SHARMA</div>
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>Mumbai · Creator · Chef</div>
                </div>

                {/* Reels row */}
                <div style={{ display: 'flex', gap: 4, width: '100%' }}>
                  {['#E8593C22', '#F5C84222', '#00FF4122'].map((bg, i) => (
                    <div key={i} style={{ flex: 1, height: 48, borderRadius: 6, background: bg, border: '1px solid rgba(255,255,255,0.08)' }} />
                  ))}
                </div>

                {/* Links */}
                {[
                  { label: 'Pay me via UPI ₹', bg: '#E8593C', color: '#fff' },
                  { label: 'My Recipe eBook', bg: 'rgba(255,255,255,0.07)', color: '#fff' },
                  { label: 'YouTube Channel', bg: 'rgba(255,255,255,0.07)', color: '#fff' },
                  { label: 'Join My Telegram', bg: 'rgba(255,255,255,0.07)', color: '#fff' },
                ].map((link) => (
                  <div key={link.label} style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 8,
                    background: link.bg,
                    color: link.color,
                    fontSize: 9,
                    fontWeight: 600,
                    letterSpacing: 0.5,
                    textAlign: 'center',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}>
                    {link.label}
                  </div>
                ))}

                {/* Watermark */}
                <div style={{ marginTop: 'auto', fontSize: 8, color: 'rgba(255,255,255,0.15)', letterSpacing: 2, fontFamily: 'Bebas Neue, sans-serif' }}>
                  TAAR
                </div>
              </div>
            </div>
          </div>

          {/* Label under phone */}
          <div style={{ textAlign: 'center', marginTop: 12 }}>
            <Link href="/demo" target="_blank"
              className="text-[9px] text-white/30 tracking-widest uppercase hover:text-[#E8593C] transition-colors">
              See live example ↗
            </Link>
          </div>
        </div>

        {/* Hero wordmark */}
        <div className="relative z-10 mb-12">
          {/* Year badge */}
          <div id="hero-badge" className="flex items-center gap-3 mb-8 anim-fade-in delay-200">
            <div className="w-6 h-px bg-[#E8593C]" />
            <span className="text-[10px] tracking-[0.3em] text-white/30 uppercase">Est. 2024 · Made in India</span>
          </div>

          {/* Main title */}
          <div id="hero-title" className="relative">
            <h1 className="font-display leading-[0.85] tracking-tight select-none" style={{ fontSize: 'clamp(72px, 18vw, 280px)', perspective: '800px' }}>
              <span className="block text-white" data-hero-word style={{ display: 'block', opacity: 0 }}>YOUR</span>
              <span className="block" data-hero-word style={{ display: 'block', opacity: 0, color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.25)' }}>THREAD</span>
              <span className="block text-[#E8593C]" data-hero-word style={{ display: 'block', opacity: 0 }}>TO ALL.</span>
            </h1>

            {/* Tagline — visible on all sizes */}
            <div className="mt-6 md:mt-0 md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 text-left md:text-right max-w-xs anim-fade-up delay-700">
              <p className="text-sm text-white/50 leading-relaxed mb-4">
                One link. Your UPI.<br />Your reels. Your products.<br />Your everything.
              </p>
              <div className="flex items-center gap-2 md:justify-end">
                <span className="text-[10px] text-white/20 tracking-widest uppercase">Built for Bharat</span>
                <div className="w-4 h-px bg-white/20" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div id="hero-bottom" className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-t border-white/8 pt-8">
          <div className="flex items-center gap-8 md:gap-10">
            {[['50+','Templates'],['₹0','To start'],['5 min','Setup']].map(([n,l]) => (
              <div key={l}>
                <div className="font-display text-2xl md:text-3xl tracking-wider text-white anim-fade-up delay-800">{n}</div>
                <div className="text-[10px] text-white/30 tracking-widest uppercase mt-0.5">{l}</div>
              </div>
            ))}
          </div>
          <Link href="/login"
            className="group inline-flex items-center gap-4 bg-[#E8593C] text-white px-8 md:px-10 py-4 md:py-5 text-sm font-bold tracking-widest uppercase anim-fade-up delay-900 hover:bg-white hover:text-[#060606] transition-all duration-300">
            Create your Taar
            <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
          </Link>
        </div>

        {/* Scroll nudge */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 anim-fade-in delay-1200">
          <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <div className="text-[9px] text-white/20 tracking-[0.3em] uppercase">Scroll</div>
        </div>
      </section>

      {/* ─────────────────────────────── TAPE STRIP */}
      <div className="py-4 bg-[#E8593C] overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          {Array(3).fill(['UPI PAYMENT LINKS','AUTO INSTAGRAM REELS','CLICK ANALYTICS','SELL DIGITAL PRODUCTS','50 PREMIUM TEMPLATES','BUILT FOR BHARAT']).flat().map((t,i) => (
            <span key={i} className="inline-flex items-center gap-6 mr-6 text-white font-display tracking-[0.15em] text-sm">
              {t}
              <span className="text-white/40">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────── WHY TAAR */}
      <section className="bg-[#080808] py-14 md:py-20 px-6 md:px-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
            {[
              { icon: '🇮🇳', title: 'Built for India', body: 'UPI-first. Hindi-friendly templates. Razorpay payments. No dollar pricing, no foreign gateways — designed ground-up for how Indian creators actually work.' },
              { icon: '⚡', title: 'Live in 5 minutes', body: 'Sign up, pick a template, add your links. Share your taar.link/username anywhere. No tech knowledge needed. No design skills needed.' },
              { icon: '₹', title: 'Free. Really.', body: 'All 50 templates, UPI links, WhatsApp links, custom username — free forever. No credit card, no trial period, no hidden limit that kicks in on day 7.' },
            ].map((c) => (
              <div key={c.title} className="why-card bg-[#080808] p-8 md:p-10">
                <div className="text-2xl mb-4">{c.icon}</div>
                <h3 className="font-semibold text-white text-base mb-2">{c.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
          {/* See example link */}
          <div className="mt-8 pt-8 border-t border-white/5 flex items-center gap-4">
            <Link href="/demo" target="_blank"
              className="text-sm font-semibold text-[#E8593C] hover:text-white transition-colors tracking-wide">
              See what a Taar page looks like ↗
            </Link>
            <span className="text-white/20 text-xs">— a live example, no signup needed</span>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────── STATEMENT */}
      <section id="statement-section" className="bg-[#F2EDE6] text-[#0A0806] py-28 md:py-40 px-6 md:px-12 clip-diagonal-b relative overflow-hidden">
        <div className="absolute top-6 right-12 text-[9px] tracking-[0.3em] text-[#0A0806]/30 uppercase">01 / 06</div>
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] tracking-[0.4em] text-[#E8593C] uppercase mb-10 font-semibold">The problem</p>
          <h2 id="statement-headline" className="font-display leading-[0.88] tracking-tight" style={{ fontSize: 'clamp(52px, 9vw, 140px)' }}>
            <span className="block">STOP SENDING</span>
            <span className="block" style={{ color: 'transparent', WebkitTextStroke: '1.5px #0A0806' }}>10 DIFFERENT</span>
            <span className="block text-[#E8593C]">LINKS.</span>
          </h2>
          <div className="mt-14 flex flex-col md:flex-row md:items-end gap-10 md:gap-24">
            <p className="text-base md:text-lg text-[#0A0806]/60 leading-relaxed max-w-md">
              Your audience is on Instagram. Your fans want to pay you UPI. Your customers want to buy your products. They shouldn&apos;t need to DM you for each one.
            </p>
            <div className="flex-1 border-t border-[#0A0806]/10 pt-6">
              <p className="font-display text-5xl md:text-7xl text-[#0A0806] tracking-wider">ONE TAAR.<br/>EVERYTHING.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────── FEATURES */}
      <section aria-label="Features" className="bg-[#060606] py-24 md:py-32 relative" style={{ marginTop: '-5vw' }}>
        <div className="px-6 md:px-12 mb-16 flex items-end justify-between">
          <div>
            <p className="text-[10px] tracking-[0.4em] text-[#E8593C] uppercase mb-4 font-semibold">02 / 06 · What you get</p>
            <h2 className="font-display text-5xl md:text-7xl tracking-wider leading-none" data-anim-heading>
              EVERY TOOL<br/><span className="text-white/20">A CREATOR</span><br/>NEEDS.
            </h2>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-white/30 text-sm max-w-xs">Free tier. Pro tier. Both insane value for what you get.</p>
          </div>
        </div>

        {/* Feature rows */}
        {[
          {
            num:'01', id:'feature-upi', icon:'₹', title:'UPI That Converts',
            body:'Your UPI ID as a link. A fan sees it, taps, pays you via GPay or PhonePe in 10 seconds. No payment gateway. No 2% cut. Every rupee goes straight to your account.',
            proof:'Creators collect ₹500–₹5000/day in fan support',
            tag:'Free', tagColor:'#E8593C',
            mobileIllustration: <div className="flex lg:hidden items-center justify-center w-12 h-12 shrink-0 text-3xl font-bold text-[#E8593C]" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>₹</div>
          },
          {
            num:'02', id:'feature-reels', icon:'📸', title:'Your Reels, Always Fresh',
            body:'Link your Instagram once. Your 3 latest reels show up on your bio page automatically, updated every 24h. Your page stays alive even when you\'re deep in a shoot.',
            proof:'Fans watch your latest content without leaving your page',
            tag:'Pro', tagColor:'#F5C842',
            mobileIllustration: <div className="flex lg:hidden gap-1 shrink-0">{[0,1,2].map(i=><div key={i} style={{width:8,height:28,background:'rgba(245,200,66,0.3)',border:'1px solid rgba(245,200,66,0.4)',borderRadius:1}}/>)}</div>
          },
          {
            num:'03', id:'feature-analytics', icon:'📊', title:'Know What Makes You Money',
            body:'See exactly which link your fans click after each reel drops. Post more of what works, drop what doesn\'t. Real data — not guesses — to grow your income.',
            proof:'7-day charts · per-link clicks · device breakdown',
            tag:'Pro', tagColor:'#F5C842',
            mobileIllustration: <div className="flex lg:hidden items-end gap-0.5 shrink-0 h-8">{[40,65,50,80,55].map((h,i)=><div key={i} style={{width:5,height:`${h}%`,background:'rgba(245,200,66,0.5)',borderRadius:'1px 1px 0 0'}}/>)}</div>
          },
          {
            num:'04', id:'feature-products', icon:'📦', title:'Wake Up to New Sales',
            body:'Upload your preset pack, recipe PDF, or music loop. Set a price. Razorpay collects the money, and your buyer gets the download link by email — all automatic. You earn while you sleep.',
            proof:'Sell up to 5 digital products · instant delivery',
            tag:'Pro', tagColor:'#F5C842',
            mobileIllustration: <div className="flex lg:hidden items-center justify-center shrink-0" style={{width:28,height:28,background:'rgba(245,200,66,0.15)',border:'1px solid rgba(245,200,66,0.3)',borderRadius:2}}><span style={{fontSize:14}}>₹</span></div>
          },
          {
            num:'05', id:'feature-templates', icon:'🎨', title:'50 Templates. Zero Cringe.',
            body:'From Bollywood editorial to Y2K to pastel food creator — we built for every creator, every vibe, every age. All 50 free. Switch anytime. Your personality, not a generic blue page.',
            proof:'50 templates · instant preview · 1-click change',
            tag:'Free', tagColor:'#E8593C',
            mobileIllustration: null
          },
        ].map((f) => (
          <div key={f.num} id={f.id} className="feature-row px-6 md:px-12 py-8 md:py-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center gap-4 md:gap-16">
              <div className="section-num font-display text-7xl md:text-9xl text-white/5 leading-none w-24 shrink-0 hidden md:block">{f.num}</div>
              {/* Mobile illustration or emoji */}
              {f.mobileIllustration ?? <div className="text-3xl shrink-0 hidden md:block">{f.icon}</div>}
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <h3 className="font-display text-2xl md:text-3xl tracking-wider text-white">{f.title}</h3>
                  <span className="text-[9px] px-2.5 py-1 font-bold tracking-widest uppercase shrink-0" style={{ color: f.tagColor, border: `1px solid ${f.tagColor}40`, background: `${f.tagColor}10` }}>{f.tag}</span>
                </div>
                <p className="text-white/50 text-sm leading-relaxed max-w-xl mb-3">{f.body}</p>
                <p className="text-[10px] text-white/20 tracking-wider">{f.proof}</p>
              </div>
              <div className="text-white/10 text-2xl shrink-0 hidden md:block">→</div>
            </div>
          </div>
        ))}
      </section>

      {/* ─────────────────────────────── TEMPLATES */}
      <section id="templates" className="bg-[#0A0806] py-24 md:py-36 overflow-hidden">
        <div className="px-6 md:px-12 mb-12 flex items-end justify-between">
          <div>
            <p className="text-[10px] tracking-[0.4em] text-[#E8593C] uppercase mb-4 font-semibold">03 / 06 · Templates</p>
            <h2 className="font-display leading-none tracking-wider" data-anim-heading style={{ fontSize: 'clamp(60px, 12vw, 180px)' }}>
              50<br/><span className="text-white/15">VIBES.</span>
            </h2>
          </div>
          <Link href="/login" className="hidden md:inline-flex items-center gap-3 text-xs text-white/40 hover:text-white transition-colors tracking-widest uppercase underline-wipe mb-4">
            Get all 50 free →
          </Link>
        </div>

        {/* 6 hero templates at phone scale — horizontal scroll mobile, 6-col desktop */}
        <div className="flex gap-5 overflow-x-auto pb-4 px-6 md:px-12 md:grid md:grid-cols-6" style={{ scrollbarWidth: 'none' }}>
          {[
            { name:'Bollywood Editorial', cat:'Indian Culture', bg:'#0A0005', accent:'#F5C842', text:'#F5C842', secondaryText:'#8B7320', btnStyle:'outline', btnR:0, font:'Bebas Neue' },
            { name:'Streetwear', cat:'Creator', bg:'#0A0A0A', accent:'#FFFFFF', text:'#FFFFFF', secondaryText:'#555555', btnStyle:'solid', btnR:0, font:'Bebas Neue' },
            { name:'Cyberpunk', cat:'Creator', bg:'#000000', accent:'#00FF41', text:'#00FF41', secondaryText:'#006B11', btnStyle:'outline', btnR:0, font:'Space Mono' },
            { name:'Pastel Food', cat:'Creator', bg:'#FDF6EC', accent:'#E8593C', text:'#5C2D0E', secondaryText:'#C89B7B', btnStyle:'outline', btnR:999, font:'Playfair Display' },
            { name:'Dark Academia', cat:'Creator', bg:'#1A1209', accent:'#C8A96E', text:'#C8A96E', secondaryText:'#7A5C2A', btnStyle:'outline', btnR:0, font:'Cormorant Garamond' },
            { name:'Rose Gold', cat:'Creator', bg:'linear-gradient(160deg,#B76E79,#E8B4B8,#F7C59F)', accent:'#FFFFFF', text:'#FFFFFF', secondaryText:'rgba(255,255,255,0.7)', btnStyle:'outline', btnR:999, font:'Cormorant Garamond' },
          ].map((t) => (
            <Link key={t.name} href="/login"
              className="template-card shrink-0 md:shrink rounded-2xl overflow-hidden border border-white/8 cursor-pointer block"
              style={{ background: t.bg, width: 150, minWidth: 150, height: 280 }}>
              <div style={{ padding: '20px 14px 16px', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                {/* Avatar */}
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: `${t.accent}33`, border: `1.5px solid ${t.accent}77`, flexShrink: 0 }} />
                {/* Name */}
                <div style={{ fontFamily: `'${t.font}', serif`, fontSize: 11, letterSpacing: 1.5, color: t.text, textAlign: 'center', lineHeight: 1.2 }}>CREATOR NAME</div>
                {/* Bio */}
                <div style={{ fontSize: 8, color: t.secondaryText, textAlign: 'center', lineHeight: 1.4 }}>Creator · Mumbai</div>
                {/* Links */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%', marginTop: 4 }}>
                  {['UPI Payment ₹', 'Instagram', 'YouTube'].map((label, i) => (
                    <div key={i} style={{
                      padding: '6px 10px', textAlign: 'center', fontSize: 8, fontWeight: 700, letterSpacing: 0.5,
                      color: t.btnStyle === 'solid' ? (t.bg.startsWith('#0') || t.bg.startsWith('#1') ? '#000' : t.text) : t.accent,
                      background: t.btnStyle === 'solid' ? t.accent : 'transparent',
                      border: t.btnStyle === 'outline' ? `1px solid ${t.accent}66` : 'none',
                      borderRadius: t.btnR,
                      opacity: i === 0 ? 1 : 0.7,
                    }}>
                      {label}
                    </div>
                  ))}
                </div>
                {/* Template name */}
                <div style={{ marginTop: 'auto', textAlign: 'center' }}>
                  <div style={{ fontSize: 7, color: t.secondaryText, letterSpacing: 2, textTransform: 'uppercase', opacity: 0.5 }}>{t.cat}</div>
                  <div style={{ fontSize: 9, color: t.text, marginTop: 2, fontWeight: 600 }}>{t.name}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Row 2 — more templates */}
        <div className="flex gap-4 overflow-x-auto pb-4 px-6 md:px-12 mt-5" style={{ scrollbarWidth: 'none' }}>
          {[
            { name:'Desi Marigold', cat:'Indian Culture', bg:'#FF6500', accent:'#FFD700', text:'#FFFFFF' },
            { name:'Vaporwave', cat:'Creator', bg:'linear-gradient(135deg,#1a001a,#0d0033)', accent:'#FF71CE', text:'#FF71CE' },
            { name:'Executive', cat:'Professional', bg:'#0F172A', accent:'#6366F1', text:'#F8FAFC' },
            { name:'Concert Poster', cat:'Music & Arts', bg:'#000000', accent:'#FFD700', text:'#FFD700' },
            { name:'Fitness Mode', cat:'Lifestyle', bg:'#0A0A0A', accent:'#FF4500', text:'#FFFFFF' },
            { name:'Lo-Fi Beats', cat:'Creator', bg:'#2D2B3D', accent:'#FF9EAA', text:'#E8D5B7' },
            { name:'Wellness', cat:'Lifestyle', bg:'#F5F0E8', accent:'#6B8F6B', text:'#3D3020' },
            { name:'Neon Purple', cat:'Niche', bg:'#0A0015', accent:'#BF5FFF', text:'#BF5FFF' },
            { name:'Astrology', cat:'Niche', bg:'#080018', accent:'#D4AF37', text:'#D4AF37' },
            { name:'Vintage Retro', cat:'Niche', bg:'#F0E6D3', accent:'#8B3A00', text:'#2C1A0A' },
          ].map((t) => (
            <div key={t.name}
              className="template-card shrink-0 rounded-2xl overflow-hidden border border-white/8"
              style={{ background: t.bg, width: 140, height: 200 }}>
              <div style={{ padding: '14px 12px', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: `${t.accent}33`, border: `1px solid ${t.accent}66` }} />
                <div style={{ fontSize: 9, color: t.text, letterSpacing: 1, fontWeight: 700 }}>CREATOR</div>
                {[100,80,90].map((w,i) => (
                  <div key={i} style={{ width:`${w}%`, height:14, borderRadius:4, background:`${t.accent}18`, border:`1px solid ${t.accent}25` }}/>
                ))}
                <div style={{ marginTop:'auto', textAlign:'center' }}>
                  <div style={{ fontSize:7, color:t.text, opacity:0.4, letterSpacing:2, textTransform:'uppercase' }}>{t.cat}</div>
                  <div style={{ fontSize:9, color:t.text, marginTop:2, fontWeight:600 }}>{t.name}</div>
                </div>
              </div>
            </div>
          ))}
          <Link href="/login"
            className="shrink-0 rounded-2xl border border-white/10 flex flex-col items-center justify-center gap-2 text-white/30 hover:text-white hover:border-white/30 transition-all"
            style={{ width: 140, height: 200 }}>
            <span className="font-display text-3xl">+34</span>
            <span className="text-[9px] tracking-widest uppercase">More inside</span>
          </Link>
        </div>

        <div className="px-6 md:px-12 mt-10 text-center md:text-left">
          <Link href="/login"
            className="inline-flex items-center gap-3 text-sm font-semibold text-white border border-white/15 px-8 py-4 tracking-widest uppercase hover:border-[#E8593C] hover:bg-[#E8593C]/5 transition-all">
            Browse all 50 templates free →
          </Link>
        </div>
      </section>

      {/* ─────────────────────────────── AUDIENCE */}
      <section className="bg-[#060606] py-24 md:py-36 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] tracking-[0.4em] text-[#E8593C] uppercase mb-6 font-semibold">04 / 06 · For every creator</p>
          <h2 className="font-display text-5xl md:text-7xl tracking-wider leading-none mb-16" data-anim-heading>
            FROM<br/>FIRST REEL<br/><span className="text-[#E8593C]">TO FULL-TIME.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
            {[
              { age:'15–25', icon:'🎮', type:'Gaming · Fashion · Memes', pitch:'Drop one neon link in your bio. Fans find your Discord, Insta, YouTube — all at once. No more "link in story" every time.', themes:'Cyberpunk, Streetwear, Y2K, Neon Purple' },
              { age:'20–35', icon:'🥗', type:'Food · Lifestyle · Fitness', pitch:'Sell your recipe PDF. Share your UPI for fan support. Show your latest reels. All from one page your followers actually visit.', themes:'Pastel, Wellness, Gradient, Mint' },
              { age:'25–45', icon:'🎵', type:'Music · Art · Culture', pitch:'Link Spotify, sell your beat pack, collect fan support via UPI direct to your account. Your music career on one page.', themes:'Vinyl, Concert, Vaporwave, Lo-Fi' },
              { age:'30–60', icon:'💼', type:'Business · Education · Coaching', pitch:'One sharp link for your course, consultation booking, and WhatsApp. Clients get what they need without 10 DMs.', themes:'Executive, Corporate Dark, Cream, Art Gallery' },
            ].map((c) => (
              <div key={c.age} className="audience-card bg-[#060606] p-8 md:p-10 hover:bg-[#0D0D0D] transition-colors group">
                <div className="flex items-start justify-between mb-6">
                  <span className="text-3xl">{c.icon}</span>
                  <span className="font-display text-4xl text-white/5 group-hover:text-[#E8593C]/20 transition-colors">{c.age}</span>
                </div>
                <h3 className="font-semibold text-white text-lg mb-2">{c.type}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">{c.pitch}</p>
                <p className="text-[10px] text-white/20 tracking-widest uppercase">{c.themes}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────── PRICING */}
      <section id="pricing" aria-label="Pricing" className="bg-[#0E0804] py-24 md:py-36 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] tracking-[0.4em] text-[#E8593C] uppercase mb-6 font-semibold">05 / 06 · Pricing</p>
          <h2 className="font-display text-5xl md:text-8xl tracking-wider leading-none mb-16" data-anim-heading>
            CUT THE NOISE.<br/><span className="text-[#E8593C]">OWN YOUR</span><br/>THREAD.
          </h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            {/* Free */}
            <div id="pricing-free" className="border border-white/8 p-8 md:p-10 flex flex-col">
              <div className="font-display text-4xl tracking-wider mb-1">FREE</div>
              <div className="font-display text-6xl text-[#E8593C] mb-1">₹0</div>
              <div className="text-white/25 text-xs tracking-widest uppercase mb-8">No card. No catch. Forever.</div>
              <ul className="space-y-3 mb-10 flex-1">
                {[
                  ['1 bio page', true],
                  ['8 links', true],
                  ['All 50 templates', true],
                  ['UPI + WhatsApp links', true],
                  ['Custom username', true],
                  ['Basic view count', true],
                ].map(([f, ok]) => (
                  <li key={String(f)} className="flex items-center gap-3 text-sm text-white/50">
                    <span className={`w-4 h-px ${ok ? 'bg-[#E8593C]' : 'bg-white/20'}`} />{f}
                  </li>
                ))}
              </ul>
              <Link href="/login" className="block text-center border border-white/15 text-white py-4 text-xs tracking-[0.2em] uppercase font-semibold hover:border-[#E8593C] hover:bg-[#E8593C]/5 transition-all">
                Start free — no card needed
              </Link>
            </div>

            {/* Pro */}
            <div id="pricing-pro" className="bg-[#E8593C] p-8 md:p-10 flex flex-col relative overflow-hidden">
              <div className="absolute top-5 right-5 text-[9px] bg-white/20 text-white px-3 py-1 tracking-widest uppercase">Most popular</div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-white/5" />
              <div className="font-display text-4xl tracking-wider mb-1 relative">PRO</div>
              <div className="font-display text-6xl text-white mb-0 relative">₹399</div>
              <div className="text-white/70 text-xs tracking-widest uppercase mb-2 relative">/month</div>
              <div className="text-white/60 text-xs mb-8 relative">That&apos;s ₹13/day. Less than a chai.</div>
              <ul className="space-y-3 mb-10 flex-1 relative">
                {[
                  'Everything in Free',
                  'Click analytics — see what fans tap',
                  'Auto Instagram Reels on your page',
                  'Sell up to 5 digital products',
                  'Razorpay + auto email delivery',
                  'Remove Taar watermark',
                ].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-white">
                    <span className="w-4 h-px bg-white" />{f}
                  </li>
                ))}
              </ul>
              <Link href="/dashboard/upgrade" className="relative block text-center bg-white text-[#E8593C] py-4 text-xs tracking-[0.2em] uppercase font-bold hover:bg-[#060606] hover:text-white transition-all">
                Go Pro — cancel anytime →
              </Link>
            </div>
          </div>

          {/* Trust signals */}
          <div className="mt-10 flex flex-col md:flex-row items-start md:items-center gap-6 text-xs text-white/25 tracking-widest uppercase">
            <span>✓ Cancel anytime — no lock-in</span>
            <span>✓ Razorpay secure payments</span>
            <span>✓ Indian company · Indian support</span>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────── VS LINKTREE */}
      <section className="bg-[#080808] py-24 md:py-36 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] tracking-[0.4em] text-[#E8593C] uppercase mb-6 font-semibold">Why switch</p>
          <h2 className="font-display text-5xl md:text-7xl tracking-wider leading-none mb-4">
            TAAR VS<br/><span className="text-white/20">LINKTREE.</span>
          </h2>
          <p className="text-white/40 text-sm mb-14 max-w-lg">Linktree is built for the world. Taar is built for India. Here&apos;s the difference that matters.</p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 pr-8 text-white/30 text-xs tracking-widest uppercase font-medium w-1/3">Feature</th>
                  <th className="text-left py-4 pr-8 text-[#E8593C] text-xs tracking-widest uppercase font-bold">Taar</th>
                  <th className="text-left py-4 text-white/20 text-xs tracking-widest uppercase font-medium">Linktree</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['UPI Payment Links (GPay, PhonePe, Paytm)', '✓ Free', '✗ Not available'],
                  ['Price (equivalent Pro plan)', '₹399 / month', '~₹750 / month ($9)'],
                  ['Indian payment gateway', 'Razorpay ✓', '✗ No INR support'],
                  ['Auto Instagram Reels shelf', '✓ Pro', '✗ Basic'],
                  ['Sell digital products', '✓ Pro — Razorpay', '✓ Paid only'],
                  ['Templates made for India', '✓ Bollywood, Desi, Marigold…', '✗ Generic only'],
                  ['Total templates', '50 templates', '30+ templates'],
                  ['Free plan limit', '8 links, forever free', '5 links free'],
                  ['Built & supported in India', '✓ Yes', '✗ No'],
                ].map(([feat, taar, other], i) => (
                  <tr key={i} className="compare-row border-b border-white/5 hover:bg-white/2 transition-colors">
                    <td className="py-4 pr-8 text-white/50">{feat}</td>
                    <td className="py-4 pr-8 text-white font-medium">{taar}</td>
                    <td className="py-4 text-white/25">{other}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10">
            <Link href="/login"
              className="inline-flex items-center gap-3 bg-[#E8593C] text-white px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-[#060606] transition-all">
              Switch to Taar — free →
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────── FAQ */}
      <section className="bg-[#060606] py-24 md:py-36 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-[10px] tracking-[0.4em] text-[#E8593C] uppercase mb-6 font-semibold">FAQ</p>
          <h2 className="font-display text-5xl md:text-6xl tracking-wider leading-none mb-14">
            COMMON<br/><span className="text-white/20">QUESTIONS.</span>
          </h2>

          <div className="space-y-0">
            {[
              {
                q: 'What is Taar?',
                a: 'Taar is a free link in bio tool built for Indian creators. Put all your links — UPI, Instagram, YouTube, WhatsApp, digital products — on one custom page. Share that one link in your Instagram bio. Done.',
              },
              {
                q: 'Is it really free? What\'s the catch?',
                a: 'No catch. The free plan is free forever — no credit card, no 14-day trial. You get 1 page, 8 links, all 50 templates, UPI payment links, and a custom username. The Pro plan (₹399/month) unlocks analytics, Reels shelf, and digital products.',
              },
              {
                q: 'How is Taar different from Linktree?',
                a: 'Taar is built specifically for India. We have UPI payment link support (Linktree doesn\'t), Indian-specific templates, Razorpay for digital product payments, pricing in INR, and customer support based in India. Linktree is a great global tool — Taar is the version made for how Indian creators actually work.',
              },
              {
                q: 'Can my fans pay me directly from my Taar page?',
                a: 'Yes. Add your UPI ID as a link and your fans can pay you via GPay, PhonePe, Paytm, or any UPI app — directly to your bank account. No platform cut, no gateway fee. It\'s your money.',
              },
              {
                q: 'How do I set up my Taar page?',
                a: 'Sign up with email, get a magic link (no password needed), pick a username, choose a template, add your links. Your page is live in under 5 minutes. Share your taar link anywhere.',
              },
              {
                q: 'Can I sell eBooks, presets, or courses through Taar?',
                a: 'Yes, on the Pro plan. Upload your file, set a price, and Razorpay handles the checkout. The buyer gets an automatic download link by email. Works for PDFs, Lightroom presets, music packs, course access links — anything digital.',
              },
              {
                q: 'What is the best link in bio tool for Indian creators?',
                a: 'Taar. It is the only link in bio tool built specifically for India — with UPI payment support, Indian templates, Razorpay integration, and INR pricing. Free to start, with a Pro plan at ₹399/month (less than a chai a day).',
              },
            ].map((item, i) => (
              <details key={i} className="group border-t border-white/8 py-6 cursor-pointer list-none">
                <summary className="flex items-center justify-between gap-4 list-none">
                  <h3 className="font-semibold text-white text-base pr-4">{item.q}</h3>
                  <span className="text-white/30 group-open:rotate-45 transition-transform duration-200 shrink-0 text-xl font-light">+</span>
                </summary>
                <p className="mt-4 text-white/50 text-sm leading-relaxed max-w-2xl">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────── FINAL CTA */}
      <section className="bg-[#060606] py-32 md:py-48 px-6 md:px-12 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative max-w-7xl mx-auto">
          <p className="text-[10px] tracking-[0.4em] text-[#E8593C] uppercase mb-8 font-semibold">06 / 06</p>
          <h2 className="font-display leading-none tracking-tight" style={{ fontSize: 'clamp(72px, 14vw, 220px)' }}>
            <span className="block text-white" data-cta-word>YOUR</span>
            <span className="block" data-cta-word style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.15)' }}>THREAD</span>
            <span className="block text-[#E8593C]" data-cta-word>STARTS</span>
            <span className="block text-white" data-cta-word>NOW.</span>
          </h2>
          <div className="mt-16 flex flex-col md:flex-row items-start md:items-center gap-6">
            <Link href="/login"
              className="group inline-flex items-center gap-4 bg-[#E8593C] text-white px-10 md:px-12 py-5 md:py-6 text-sm font-bold tracking-widest uppercase hover:bg-white hover:text-[#060606] transition-all duration-300">
              Create your Taar — it&apos;s free
              <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
            </Link>
            <p className="text-white/20 text-xs tracking-widest uppercase">No card needed · Live in 5 minutes</p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────── FOOTER */}
      <footer className="border-t border-white/5 py-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="font-display text-2xl tracking-[0.15em] text-white">TAAR</span>
            <p className="text-white/20 text-xs mt-1 tracking-widest">Your thread to everything.</p>
          </div>
          <div className="flex items-center gap-8 flex-wrap">
            {['Templates','Pricing','Login'].map(l => (
              <Link key={l} href={l === 'Login' ? '/login' : `#${l.toLowerCase()}`}
                className="text-[10px] text-white/25 hover:text-white transition-colors tracking-widest uppercase underline-wipe">
                {l}
              </Link>
            ))}
            <Link href="/linktree-alternative-india"
              className="text-[10px] text-white/25 hover:text-white transition-colors tracking-widest uppercase underline-wipe">
              Linktree Alternative
            </Link>
            <Link href="/privacy"
              className="text-[10px] text-white/25 hover:text-white transition-colors tracking-widest uppercase underline-wipe">
              Privacy
            </Link>
            <Link href="/terms"
              className="text-[10px] text-white/25 hover:text-white transition-colors tracking-widest uppercase underline-wipe">
              Terms
            </Link>
          </div>
          <p className="text-white/15 text-xs tracking-wider">Made in India 🇮🇳 for Indian creators</p>
        </div>
      </footer>
    </div>
  )
}

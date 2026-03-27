import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="bg-[#080808] text-white min-h-screen overflow-x-hidden" style={{ fontFamily: 'DM Sans, sans-serif' }}>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#080808]/90 backdrop-blur-xl border-b border-white/5">
        <span style={{ fontFamily: 'Bebas Neue, sans-serif' }} className="text-2xl tracking-wider text-[#E8593C]">TAAR</span>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm text-white/50 hover:text-white transition-colors">Login</Link>
          <Link href="/login" className="text-sm bg-[#E8593C] text-white px-5 py-2.5 rounded-full hover:bg-[#d44e33] transition-all font-semibold hover:scale-105 active:scale-95">
            Start free →
          </Link>
        </div>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-16 relative overflow-hidden">
        {/* Background glow orbs */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #E8593C 0%, transparent 70%)' }} />
        <div className="absolute top-2/3 left-1/4 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #F5C842 0%, transparent 70%)' }} />

        {/* Animated thread line */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="absolute top-0 left-0 w-full h-full opacity-10" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
            <path d="M -100 450 C 200 200, 400 700, 720 450 C 1040 200, 1240 700, 1540 450" stroke="#E8593C" strokeWidth="1" fill="none" strokeDasharray="8 8" />
            <path d="M -100 500 C 300 250, 500 750, 720 500 C 940 250, 1140 750, 1540 500" stroke="#F5C842" strokeWidth="0.5" fill="none" strokeDasharray="4 12" opacity="0.5" />
          </svg>
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm text-white/60 mb-8">
            <span className="w-1.5 h-1.5 bg-[#E8593C] rounded-full animate-pulse" />
            Built for India&apos;s 100M+ creators
          </div>

          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif' }} className="text-[80px] md:text-[120px] lg:text-[140px] leading-none tracking-wider mb-6">
            <span className="text-white">ONE LINK.</span><br />
            <span className="text-[#E8593C]">INFINITE</span><br />
            <span className="text-white">REACH.</span>
          </h1>

          <p className="text-white/50 text-lg md:text-xl mb-4 max-w-2xl mx-auto leading-relaxed">
            Stop sending 10 links. Start owning one.<br />
            <span className="text-white/80">UPI. Reels. Products. Analytics. Your whole world — one Taar.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link href="/login"
              className="bg-[#E8593C] text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-[#d44e33] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#E8593C]/30">
              Create your Taar — free →
            </Link>
            <a href="#templates"
              className="border border-white/15 text-white px-10 py-4 rounded-full text-lg font-medium hover:border-white/40 transition-colors hover:bg-white/5">
              See 50 templates ↓
            </a>
          </div>

          {/* Stats bar */}
          <div className="mt-16 flex items-center justify-center gap-8 md:gap-16">
            {[
              { n: '50+', label: 'Templates' },
              { n: '₹0', label: 'To start' },
              { n: '1 link', label: 'For everything' },
              { n: '5 min', label: 'Setup time' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div style={{ fontFamily: 'Bebas Neue, sans-serif' }} className="text-3xl md:text-4xl text-[#E8593C] tracking-wider">{s.n}</div>
                <div className="text-white/40 text-xs mt-1 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/20">
          <div className="w-px h-12 bg-gradient-to-b from-[#E8593C] to-transparent" />
          <div className="text-xs tracking-widest">SCROLL</div>
        </div>
      </section>

      {/* ── USP STRIP ──────────────────────────────────────────────── */}
      <section className="py-6 border-y border-white/5 bg-[#0D0D0D] overflow-hidden">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {[
            '₹ UPI PAYMENT LINKS', '📸 AUTO INSTAGRAM REELS', '📊 CLICK ANALYTICS', '📦 SELL DIGITAL PRODUCTS', '🎨 50 PREMIUM TEMPLATES', '🇮🇳 BUILT FOR BHARAT', '₹ UPI PAYMENT LINKS', '📸 AUTO INSTAGRAM REELS', '📊 CLICK ANALYTICS', '📦 SELL DIGITAL PRODUCTS', '🎨 50 PREMIUM TEMPLATES', '🇮🇳 BUILT FOR BHARAT',
          ].map((item, i) => (
            <span key={i} className="text-white/30 text-sm font-medium tracking-widest uppercase">{item}</span>
          ))}
        </div>
      </section>

      {/* ── WHY TAAR ───────────────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[#E8593C] text-sm uppercase tracking-widest mb-3 font-medium">Why Taar?</div>
            <h2 style={{ fontFamily: 'Bebas Neue, sans-serif' }} className="text-5xl md:text-7xl tracking-wider">
              YOUR AUDIENCE PAYS<br />
              <span className="text-[#E8593C]">ATTENTION.</span><br />
              MAKE EVERY TAP COUNT.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: '₹',
                headline: 'UPI links that actually work on mobile',
                body: 'One tap. Your fans pay you directly via any UPI app. No payment gateway fees. No redirects. Just money in your account.',
                accent: '#E8593C',
              },
              {
                icon: '📸',
                headline: 'Your latest reels, always up to date',
                body: 'Connect Instagram once. Your 3 newest reels auto-appear on your bio page every 24 hours. Zero effort, max engagement.',
                accent: '#F5C842',
                pro: true,
              },
              {
                icon: '📊',
                headline: 'Know which links your audience loves',
                body: 'See clicks per link, device types, 7-day trends. Stop guessing. Start knowing what works for your audience.',
                accent: '#7EC880',
                pro: true,
              },
              {
                icon: '📦',
                headline: 'Sell anything. Instantly.',
                body: 'Presets, PDFs, courses, music. Add a product, set a price. Razorpay collects the money. Resend delivers the file. You sleep.',
                accent: '#BF5FFF',
                pro: true,
              },
              {
                icon: '🎨',
                headline: '50 templates. Zero design skills needed.',
                body: 'From Bollywood gold to neon cyberpunk to pastel aesthetic — pick a vibe, publish in seconds. Every template is mobile-perfect.',
                accent: '#FF71CE',
              },
              {
                icon: '⚡',
                headline: 'Live in 5 minutes. Seriously.',
                body: 'Magic link login, username, add links, pick template, publish. No app downloads, no credit card, no tech headache.',
                accent: '#01CDFE',
              },
            ].map((f) => (
              <div key={f.headline} className="bg-[#111] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all group">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: `${f.accent}20`, border: `1px solid ${f.accent}40` }}>
                    {f.icon}
                  </div>
                  {f.pro && (
                    <span className="text-[10px] bg-[#E8593C]/20 text-[#E8593C] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">
                      Pro
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-white text-base mb-2 leading-snug">{f.headline}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEMPLATES SHOWCASE ──────────────────────────────────────── */}
      <section id="templates" className="py-24 px-4 bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[#E8593C] text-sm uppercase tracking-widest mb-3 font-medium">50 Templates</div>
            <h2 style={{ fontFamily: 'Bebas Neue, sans-serif' }} className="text-5xl md:text-7xl tracking-wider mb-4">
              EVERY VIBE.<br />
              <span className="text-[#E8593C]">EVERY CREATOR.</span>
            </h2>
            <p className="text-white/40 max-w-xl mx-auto">From 15 to 60, gamer to chef, artist to entrepreneur — there&apos;s a Taar for everyone.</p>
          </div>

          {/* Category showcase */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { name: 'Bollywood Editorial', bg: '#0A0005', text: '#F5C842', desc: 'Desi × Cinematic', emoji: '🎬' },
              { name: 'Cyberpunk', bg: '#000000', text: '#00FF41', desc: 'Neon × Dark', emoji: '🟢' },
              { name: 'Rose Gold', bg: 'linear-gradient(135deg, #B76E79, #F7C59F)', text: '#FFFFFF', desc: 'Gradient × Luxury', emoji: '✨' },
              { name: 'Streetwear', bg: '#0A0A0A', text: '#FFFFFF', desc: 'Bold × Minimal', emoji: '🖤' },
              { name: 'Pastel Food', bg: '#FDF6EC', text: '#8B5E3C', desc: 'Soft × Warm', emoji: '🍰' },
              { name: 'Dark Academia', bg: '#1A1209', text: '#C8A96E', desc: 'Moody × Literary', emoji: '📚' },
              { name: 'Y2K Babe', bg: '#FFB6C1', text: '#8B0057', desc: '2000s × Pop', emoji: '💅' },
              { name: 'Vaporwave', bg: 'linear-gradient(135deg, #1a001a, #001a33)', text: '#FF71CE', desc: 'Retro × Digital', emoji: '🌐' },
            ].map((t) => (
              <div key={t.name}
                className="rounded-2xl overflow-hidden border border-white/5 hover:border-white/15 transition-all hover:scale-[1.02] cursor-pointer group"
                style={{ background: t.bg }}>
                <div className="p-5 h-28 flex flex-col justify-between">
                  <div className="text-xl">{t.emoji}</div>
                  <div>
                    <div className="font-bold text-sm" style={{ color: t.text }}>{t.name}</div>
                    <div className="text-xs mt-0.5 opacity-60" style={{ color: t.text }}>{t.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-white/30 text-sm mb-6">+ 42 more: Minimal, Neon, Wellness, Fitness, Lo-Fi, Concert, Retro 90s, Marigold Festival, and more...</p>
            <Link href="/login"
              className="inline-block bg-[#E8593C] text-white px-10 py-4 rounded-full font-bold hover:bg-[#d44e33] transition-all hover:scale-105">
              Browse all 50 templates →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOR EVERY CREATOR ───────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 style={{ fontFamily: 'Bebas Neue, sans-serif' }} className="text-5xl md:text-6xl tracking-wider">
              FROM <span className="text-[#E8593C]">FIRST REEL</span><br />TO <span className="text-[#F5C842]">FULL-TIME CREATOR</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                age: '15–25',
                type: 'Gaming / Fashion / Memes',
                templates: 'Cyberpunk, Streetwear, Y2K, Neon, Hypebeast',
                useCase: 'Drop your Discord, Insta, YouTube — all in one neon-lit link.',
                emoji: '🎮',
              },
              {
                age: '20–35',
                type: 'Food / Lifestyle / Fitness',
                templates: 'Pastel, Wellness, Gradient, Mint, Peachy',
                useCase: 'Sell your recipe PDF, share your UPI, show your latest reels.',
                emoji: '🥗',
              },
              {
                age: '25–45',
                type: 'Music / Art / Culture',
                templates: 'Vinyl, Concert, Vaporwave, Lo-Fi, Dark Academia',
                useCase: 'Link your Spotify, sell your beats, collect fan support via UPI.',
                emoji: '🎵',
              },
              {
                age: '30–60',
                type: 'Business / Education / Coaching',
                templates: 'Executive, Corporate Dark, Cream, Stone, Art Gallery',
                useCase: 'One professional link for your course, contact, services — in minutes.',
                emoji: '💼',
              },
            ].map((c) => (
              <div key={c.age} className="bg-[#111] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all">
                <div className="flex items-start gap-4">
                  <div className="text-3xl shrink-0">{c.emoji}</div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-semibold">{c.type}</span>
                      <span className="text-[#E8593C] text-xs bg-[#E8593C]/10 px-2 py-0.5 rounded-full">Age {c.age}</span>
                    </div>
                    <p className="text-white/40 text-sm mb-3">{c.useCase}</p>
                    <div className="text-white/30 text-xs">
                      <span className="text-white/50">Themes: </span>{c.templates}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-[#0A0A0A]" id="pricing">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 style={{ fontFamily: 'Bebas Neue, sans-serif' }} className="text-5xl md:text-7xl tracking-wider mb-4">
              CUT THE NOISE.<br />
              <span className="text-[#E8593C]">OWN YOUR THREAD.</span>
            </h2>
            <p className="text-white/40">Start free. Go Pro when you&apos;re serious.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Free */}
            <div className="bg-[#111] border border-white/8 rounded-2xl p-8">
              <div style={{ fontFamily: 'Bebas Neue, sans-serif' }} className="text-3xl tracking-wider text-white mb-1">FREE</div>
              <div className="text-5xl font-black text-white mb-1">₹0</div>
              <div className="text-white/30 text-sm mb-8">Forever, no card needed</div>
              <ul className="space-y-3 mb-8">
                {['1 bio page', 'Up to 8 links', 'All 50 templates', 'UPI + WhatsApp links', 'Custom username', 'Basic view count'].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-white/60">
                    <span className="text-[#E8593C] shrink-0">✓</span>{f}
                  </li>
                ))}
              </ul>
              <Link href="/login"
                className="block w-full text-center border border-white/15 text-white py-3.5 rounded-full hover:border-[#E8593C] hover:bg-[#E8593C]/5 transition-colors font-semibold">
                Get started free
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-[#111] border border-[#E8593C] rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-5 right-5 bg-[#E8593C] text-white text-[10px] px-3 py-1 rounded-full font-bold tracking-widest uppercase">
                Most popular
              </div>
              <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-[#E8593C]/10 blur-2xl" />

              <div style={{ fontFamily: 'Bebas Neue, sans-serif' }} className="text-3xl tracking-wider text-[#E8593C] mb-1">PRO</div>
              <div className="text-5xl font-black text-white mb-1">₹399<span className="text-xl font-normal text-white/40">/mo</span></div>
              <div className="text-white/30 text-sm mb-8">Cancel anytime</div>
              <ul className="space-y-3 mb-8 relative">
                {[
                  'Everything in Free',
                  'Click analytics + 7-day charts',
                  'Auto Instagram Reels shelf',
                  'Sell up to 5 digital products',
                  'Razorpay payments + auto delivery',
                  'Remove Taar watermark',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-white/80">
                    <span className="text-[#E8593C] shrink-0">✓</span>{f}
                  </li>
                ))}
              </ul>
              <Link href="/dashboard/upgrade"
                className="relative block w-full text-center bg-[#E8593C] text-white py-3.5 rounded-full hover:bg-[#d44e33] transition-all font-bold text-base">
                Go Pro — ₹399/month →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────────────────────── */}
      <section className="py-32 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-15 blur-3xl"
            style={{ background: 'radial-gradient(circle, #E8593C 0%, transparent 70%)' }} />
        </div>
        <div className="relative max-w-2xl mx-auto">
          <div style={{ fontFamily: 'Bebas Neue, sans-serif' }} className="text-6xl md:text-8xl tracking-wider leading-none mb-6">
            YOUR THREAD<br />
            <span className="text-[#E8593C]">STARTS NOW.</span>
          </div>
          <p className="text-white/40 text-lg mb-10">Free forever. 5 minutes to live. No excuses.</p>
          <Link href="/login"
            className="inline-block bg-[#E8593C] text-white px-12 py-5 rounded-full text-xl font-bold hover:bg-[#d44e33] transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-[#E8593C]/40">
            Create your Taar →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span style={{ fontFamily: 'Bebas Neue, sans-serif' }} className="text-2xl tracking-wider text-[#E8593C]">TAAR</span>
          <p className="text-white/25 text-sm">Your thread to everything.</p>
          <p className="text-white/25 text-sm">Made in India 🇮🇳 for Indian creators</p>
        </div>
      </footer>

    </div>
  )
}

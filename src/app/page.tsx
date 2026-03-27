import Link from 'next/link'
import { CursorGlow } from '@/components/landing/CursorGlow'

export default function LandingPage() {
  return (
    <div className="bg-[#060606] text-white overflow-x-hidden selection:bg-[#E8593C] selection:text-white" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      <div className="grain-overlay" />
      <CursorGlow />

      {/* ─────────────────────────────── NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-12 py-6">
        <span className="font-display text-2xl tracking-[0.15em] text-white anim-fade-in">TAAR</span>
        <div className="flex items-center gap-8 anim-fade-in delay-200">
          <Link href="#templates" className="text-xs text-white/40 hover:text-white transition-colors tracking-widest uppercase underline-wipe">Templates</Link>
          <Link href="#pricing"   className="text-xs text-white/40 hover:text-white transition-colors tracking-widest uppercase underline-wipe">Pricing</Link>
          <Link href="/login"     className="text-xs text-white/40 hover:text-white transition-colors tracking-widest uppercase underline-wipe">Login</Link>
          <Link href="/login"
            className="text-xs font-semibold bg-[#E8593C] text-white px-6 py-3 tracking-widest uppercase hover:bg-[#d44e33] transition-all">
            Start Free →
          </Link>
        </div>
      </nav>

      {/* ─────────────────────────────── HERO */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden pb-16 px-8 md:px-12">
        {/* Faint grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />

        {/* Vertical thread spine */}
        <div className="absolute left-8 md:left-12 top-0 bottom-0 w-px pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1 1" preserveAspectRatio="none">
            <line x1="0.5" y1="0" x2="0.5" y2="1" stroke="#E8593C" strokeWidth="2" strokeDasharray="3 6" opacity="0.3" />
          </svg>
        </div>

        {/* Hero wordmark — enormous, bleeds off edge */}
        <div className="relative z-10 mb-12">
          {/* Year badge */}
          <div className="flex items-center gap-3 mb-8 anim-fade-in delay-200">
            <div className="w-6 h-px bg-[#E8593C]" />
            <span className="text-[10px] tracking-[0.3em] text-white/30 uppercase">Est. 2024 · Made in India</span>
          </div>

          {/* Main title */}
          <div className="relative">
            <h1 className="font-display leading-[0.85] tracking-tight select-none" style={{ fontSize: 'clamp(96px, 22vw, 320px)' }}>
              <span className="block text-white anim-slide-r delay-100" style={{ WebkitTextStroke: '0px' }}>YOUR</span>
              <span className="block anim-slide-r delay-200" style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.25)' }}>THREAD</span>
              <span className="block text-[#E8593C] anim-slide-r delay-300">TO ALL.</span>
            </h1>

            {/* Floating tagline — right-aligned, vertical position */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 text-right max-w-xs anim-fade-up delay-700 hidden md:block">
              <p className="text-sm text-white/50 leading-relaxed mb-4">
                One link. Your UPI.<br />Your reels. Your products.<br />Your everything.
              </p>
              <div className="flex items-center justify-end gap-2">
                <span className="text-[10px] text-white/20 tracking-widest uppercase">Built for Bharat</span>
                <div className="w-4 h-px bg-white/20" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-t border-white/8 pt-8">
          <div className="flex items-center gap-10">
            {[['50+','Templates'],['₹0','To start'],['5min','Setup']].map(([n,l]) => (
              <div key={l}>
                <div className="font-display text-2xl md:text-3xl tracking-wider text-white anim-fade-up delay-800">{n}</div>
                <div className="text-[10px] text-white/30 tracking-widest uppercase mt-0.5">{l}</div>
              </div>
            ))}
          </div>
          <Link href="/login"
            className="group inline-flex items-center gap-4 bg-[#E8593C] text-white px-10 py-5 text-sm font-bold tracking-widest uppercase anim-fade-up delay-900 hover:bg-white hover:text-[#060606] transition-all duration-300">
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

      {/* ─────────────────────────────── STATEMENT */}
      <section className="bg-[#F2EDE6] text-[#0A0806] py-28 md:py-40 px-8 md:px-12 clip-diagonal-b relative overflow-hidden">
        <div className="absolute top-6 right-12 text-[9px] tracking-[0.3em] text-[#0A0806]/30 uppercase">01 / 06</div>
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] tracking-[0.4em] text-[#E8593C] uppercase mb-10 font-semibold">The problem</p>
          <h2 className="font-display leading-[0.88] tracking-tight" style={{ fontSize: 'clamp(52px, 9vw, 140px)' }}>
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
      <section className="bg-[#060606] py-24 md:py-32 relative" style={{ marginTop: '-5vw' }}>
        <div className="px-8 md:px-12 mb-16 flex items-end justify-between">
          <div>
            <p className="text-[10px] tracking-[0.4em] text-[#E8593C] uppercase mb-4 font-semibold">02 / 06 · What you get</p>
            <h2 className="font-display text-5xl md:text-7xl tracking-wider leading-none">
              EVERY TOOL<br/><span className="text-white/20">A CREATOR</span><br/>NEEDS.
            </h2>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-white/30 text-sm max-w-xs">Free tier. Pro tier. Both insane value for what you get.</p>
          </div>
        </div>

        {/* Feature rows */}
        {[
          { num:'01', icon:'₹', title:'UPI That Converts', body:'Your UPI ID as a link. Fans open it, pay you in one tap via GPay, PhonePe, Paytm. No gateway, no middleman. Money hits your account directly.', tag:'Free', tagColor:'#E8593C' },
          { num:'02', icon:'📸', title:'Reels on Autopilot', body:'Link your Instagram handle once. Your 3 latest reels auto-populate on your bio page, refreshed every 24h. Your page always looks alive — even when you\'re not.', tag:'Pro', tagColor:'#F5C842' },
          { num:'03', icon:'📊', title:'Analytics That Matter', body:'7-day click charts. Per-link breakdown. Device split. Know exactly what your audience is clicking and when. Data that actually helps you grow.', tag:'Pro', tagColor:'#F5C842' },
          { num:'04', icon:'📦', title:'Sell Directly to Fans', body:'Presets, PDFs, courses, music packs. Add a product, set a price, let Razorpay collect. Download links auto-emailed. You earn while you sleep.', tag:'Pro', tagColor:'#F5C842' },
          { num:'05', icon:'🎨', title:'50 Templates. Zero Cringe.', body:'From Bollywood editorial to cyberpunk neon to pastel food creator — we built for every creator, every vibe, every age. Pick one in under a minute.', tag:'Free', tagColor:'#E8593C' },
        ].map((f) => (
          <div key={f.num} className="feature-row px-8 md:px-12 py-8 md:py-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center gap-6 md:gap-16">
              <div className="font-display text-7xl md:text-9xl text-white/5 leading-none w-24 shrink-0">{f.num}</div>
              <div className="text-4xl shrink-0">{f.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <h3 className="font-display text-2xl md:text-4xl tracking-wider text-white">{f.title}</h3>
                  <span className="text-[9px] px-2.5 py-1 font-bold tracking-widest uppercase" style={{ color: f.tagColor, border: `1px solid ${f.tagColor}40`, background: `${f.tagColor}10` }}>{f.tag}</span>
                </div>
                <p className="text-white/40 text-sm leading-relaxed max-w-xl">{f.body}</p>
              </div>
              <div className="text-white/10 text-2xl shrink-0 hidden md:block">→</div>
            </div>
          </div>
        ))}
      </section>

      {/* ─────────────────────────────── TEMPLATES */}
      <section id="templates" className="bg-[#0A0806] py-24 md:py-36 overflow-hidden">
        <div className="px-8 md:px-12 mb-12 flex items-end justify-between">
          <div>
            <p className="text-[10px] tracking-[0.4em] text-[#E8593C] uppercase mb-4 font-semibold">03 / 06 · Templates</p>
            <h2 className="font-display leading-none tracking-wider" style={{ fontSize: 'clamp(60px, 12vw, 180px)' }}>
              50<br/><span className="text-white/15">VIBES.</span>
            </h2>
          </div>
          <Link href="/login" className="hidden md:inline-flex items-center gap-3 text-xs text-white/40 hover:text-white transition-colors tracking-widest uppercase underline-wipe mb-4">
            Browse all →
          </Link>
        </div>

        {/* Horizontal scroll row 1 */}
        <div className="flex gap-4 overflow-x-auto pb-4 px-8 md:px-12 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
          {[
            { name:'Bollywood Editorial', cat:'Desi', bg:'#0A0005', text:'#F5C842', emoji:'🎬' },
            { name:'Cyberpunk', cat:'Neon', bg:'#000', text:'#00FF41', emoji:'🟢' },
            { name:'Pastel Food', cat:'Aesthetic', bg:'#FDF6EC', text:'#8B5E3C', emoji:'🍰' },
            { name:'Rose Gold', cat:'Gradient', bg:'linear-gradient(135deg,#B76E79,#F7C59F)', text:'#fff', emoji:'✨' },
            { name:'Dark Academia', cat:'Retro', bg:'#1A1209', text:'#C8A96E', emoji:'📚' },
            { name:'Streetwear', cat:'Bold', bg:'#0A0A0A', text:'#fff', emoji:'🖤' },
            { name:'Vaporwave', cat:'Neon', bg:'linear-gradient(135deg,#1a001a,#001a33)', text:'#FF71CE', emoji:'🌐' },
          ].map((t) => (
            <div key={t.name}
              className="template-card shrink-0 rounded-2xl overflow-hidden border border-white/5 cursor-pointer"
              style={{ background: t.bg, width: 180, height: 280 }}>
              <div className="h-full flex flex-col justify-between p-5">
                <span className="text-2xl">{t.emoji}</span>
                <div>
                  <div className="text-[9px] tracking-widest uppercase mb-1" style={{ color: t.text, opacity: 0.5 }}>{t.cat}</div>
                  <div className="font-display text-lg tracking-wider" style={{ color: t.text }}>{t.name}</div>
                </div>
              </div>
            </div>
          ))}
          <Link href="/login"
            className="shrink-0 rounded-2xl border border-white/10 flex flex-col items-center justify-center gap-2 text-white/30 hover:text-white hover:border-white/30 transition-all"
            style={{ width: 180, height: 280 }}>
            <span className="font-display text-4xl">+43</span>
            <span className="text-[10px] tracking-widest uppercase">More</span>
          </Link>
        </div>

        {/* Row 2 — reversed, different offset */}
        <div className="flex gap-4 overflow-x-auto pb-4 px-8 md:px-12 mt-4 animate-marquee-r" style={{ scrollbarWidth: 'none' }}>
          {[
            { name:'Wellness', cat:'Professional', bg:'#F8F5F0', text:'#3D3020', emoji:'🧘' },
            { name:'Marigold', cat:'Desi', bg:'#FF6B00', text:'#fff', emoji:'🌼' },
            { name:'Neon Purple', cat:'Neon', bg:'#0A0015', text:'#BF5FFF', emoji:'🟣' },
            { name:'Vintage Paper', cat:'Retro', bg:'#F4ECD8', text:'#2C1A0E', emoji:'📜' },
            { name:'Fitness Mode', cat:'Pro', bg:'#0A0A0A', text:'#FF4500', emoji:'💪' },
            { name:'Lo-Fi', cat:'Retro', bg:'#2D2B3D', text:'#FF9EAA', emoji:'🎧' },
            { name:'Art Gallery', cat:'Pro', bg:'#FAFAFA', text:'#000', emoji:'🖼️' },
            { name:'Aurora', cat:'Gradient', bg:'linear-gradient(135deg,#0A0015,#001A00)', text:'#00FF88', emoji:'🌌' },
          ].map((t) => (
            <div key={t.name}
              className="template-card shrink-0 rounded-2xl overflow-hidden border border-white/5"
              style={{ background: t.bg, width: 180, height: 180 }}>
              <div className="h-full flex flex-col justify-between p-4">
                <span className="text-xl">{t.emoji}</span>
                <div>
                  <div className="text-[8px] tracking-widest uppercase mb-0.5" style={{ color: t.text, opacity: 0.4 }}>{t.cat}</div>
                  <div className="font-display text-sm tracking-wider" style={{ color: t.text }}>{t.name}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────── AUDIENCE */}
      <section className="bg-[#060606] py-24 md:py-36 px-8 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] tracking-[0.4em] text-[#E8593C] uppercase mb-6 font-semibold">04 / 06 · For every creator</p>
          <h2 className="font-display text-5xl md:text-7xl tracking-wider leading-none mb-16">
            FROM<br/>FIRST REEL<br/><span className="text-[#E8593C]">TO FULL-TIME.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
            {[
              { age:'15–25', icon:'🎮', type:'Gaming · Fashion · Memes', pitch:'Drop Discord, Insta, YouTube — all one neon link.', themes:'Cyberpunk, Streetwear, Y2K, Neon Purple' },
              { age:'20–35', icon:'🥗', type:'Food · Lifestyle · Fitness', pitch:'Sell your recipe PDF, share UPI, show your latest reels.', themes:'Pastel, Wellness, Gradient, Mint' },
              { age:'25–45', icon:'🎵', type:'Music · Art · Culture', pitch:'Link Spotify, sell beats, collect fan support via UPI.', themes:'Vinyl, Concert, Vaporwave, Lo-Fi' },
              { age:'30–60', icon:'💼', type:'Business · Education · Coaching', pitch:'One professional link for course, contact, services.', themes:'Executive, Corporate Dark, Cream, Art Gallery' },
            ].map((c) => (
              <div key={c.age} className="bg-[#060606] p-8 md:p-10 hover:bg-[#0D0D0D] transition-colors group">
                <div className="flex items-start justify-between mb-6">
                  <span className="text-3xl">{c.icon}</span>
                  <span className="font-display text-4xl text-white/5 group-hover:text-[#E8593C]/20 transition-colors">{c.age}</span>
                </div>
                <h3 className="font-semibold text-white text-lg mb-2">{c.type}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-4">{c.pitch}</p>
                <p className="text-[10px] text-white/20 tracking-widest uppercase">{c.themes}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────── PRICING */}
      <section id="pricing" className="bg-[#0E0804] py-24 md:py-36 px-8 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] tracking-[0.4em] text-[#E8593C] uppercase mb-6 font-semibold">05 / 06 · Pricing</p>
          <h2 className="font-display text-5xl md:text-8xl tracking-wider leading-none mb-16">
            CUT THE NOISE.<br/><span className="text-[#E8593C]">OWN YOUR</span><br/>THREAD.
          </h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            {/* Free */}
            <div className="border border-white/8 p-8 md:p-10 flex flex-col">
              <div className="font-display text-4xl tracking-wider mb-1">FREE</div>
              <div className="font-display text-6xl text-[#E8593C] mb-1">₹0</div>
              <div className="text-white/25 text-xs tracking-widest uppercase mb-10">No card. No catch. Forever.</div>
              <ul className="space-y-3 mb-10 flex-1">
                {['1 bio page','8 links','All 50 templates','UPI + WhatsApp links','Custom username','Basic view count'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-white/50">
                    <span className="w-4 h-px bg-[#E8593C]" />{f}
                  </li>
                ))}
              </ul>
              <Link href="/login" className="block text-center border border-white/15 text-white py-4 text-xs tracking-[0.2em] uppercase font-semibold hover:border-[#E8593C] hover:bg-[#E8593C]/5 transition-all">
                Start free
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-[#E8593C] p-8 md:p-10 flex flex-col relative overflow-hidden">
              <div className="absolute top-5 right-5 text-[9px] bg-white/20 text-white px-3 py-1 tracking-widest uppercase">Most popular</div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-white/5" />
              <div className="font-display text-4xl tracking-wider mb-1 relative">PRO</div>
              <div className="font-display text-6xl text-white mb-0.5 relative">₹399</div>
              <div className="text-white/60 text-xs tracking-widest uppercase mb-10 relative">/month · Cancel anytime</div>
              <ul className="space-y-3 mb-10 flex-1 relative">
                {['Everything in Free','Click analytics + charts','Auto Instagram Reels shelf','Sell up to 5 digital products','Razorpay + auto email delivery','Remove Taar watermark'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-white">
                    <span className="w-4 h-px bg-white" />{f}
                  </li>
                ))}
              </ul>
              <Link href="/dashboard/upgrade" className="relative block text-center bg-white text-[#E8593C] py-4 text-xs tracking-[0.2em] uppercase font-bold hover:bg-[#060606] hover:text-white transition-all">
                Go Pro →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────── FINAL CTA */}
      <section className="bg-[#060606] py-32 md:py-48 px-8 md:px-12 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative max-w-7xl mx-auto">
          <p className="text-[10px] tracking-[0.4em] text-[#E8593C] uppercase mb-8 font-semibold">06 / 06</p>
          <h2 className="font-display leading-none tracking-tight" style={{ fontSize: 'clamp(72px, 14vw, 220px)' }}>
            <span className="block text-white">YOUR</span>
            <span className="block" style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.15)' }}>THREAD</span>
            <span className="block text-[#E8593C]">STARTS</span>
            <span className="block text-white">NOW.</span>
          </h2>
          <div className="mt-16 flex flex-col md:flex-row items-start md:items-center gap-6">
            <Link href="/login"
              className="group inline-flex items-center gap-4 bg-[#E8593C] text-white px-12 py-6 text-sm font-bold tracking-widest uppercase hover:bg-white hover:text-[#060606] transition-all duration-300">
              Create your Taar — free
              <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
            </Link>
            <p className="text-white/20 text-xs tracking-widest uppercase">No card needed · Live in 5 minutes</p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────── FOOTER */}
      <footer className="border-t border-white/5 py-10 px-8 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="font-display text-2xl tracking-[0.15em] text-white">TAAR</span>
            <p className="text-white/20 text-xs mt-1 tracking-widest">Your thread to everything.</p>
          </div>
          <div className="flex items-center gap-8">
            {['Templates','Pricing','Login'].map(l => (
              <Link key={l} href={l === 'Login' ? '/login' : `#${l.toLowerCase()}`}
                className="text-[10px] text-white/25 hover:text-white transition-colors tracking-widest uppercase underline-wipe">
                {l}
              </Link>
            ))}
          </div>
          <p className="text-white/15 text-xs tracking-wider">Made in India 🇮🇳 for Indian creators</p>
        </div>
      </footer>
    </div>
  )
}

import Link from 'next/link'
import { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Best Linktree Alternative for India — Taar | Free, UPI, Indian Creators',
  description:
    'Looking for a Linktree alternative in India? Taar is the best free link in bio tool for Indian creators — with UPI payment links, Instagram Reels, digital product sales via Razorpay, and 50 templates. Free forever.',
  keywords: [
    'linktree alternative india',
    'free linktree alternative india',
    'linktree india',
    'link in bio india',
    'upi link in bio',
    'best linktree alternative for indian creators',
    'linktree vs taar',
    'link in bio with upi payment',
  ],
  alternates: {
    canonical: 'https://taar.bio/linktree-alternative-india',
  },
  openGraph: {
    title: 'Best Linktree Alternative for India — Taar',
    description:
      'Free link in bio for Indian creators. UPI payments, Instagram Reels, digital products. Built for Bharat.',
    url: 'https://taar.bio/linktree-alternative-india',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Best Linktree Alternative for India — Taar',
  description:
    'Taar is the best free Linktree alternative for Indian creators. It supports UPI payment links, Instagram Reels auto-sync, digital product sales via Razorpay, and 50 premium templates made for Indian creators.',
  author: { '@type': 'Organization', name: 'Taar', url: 'https://taar.bio' },
  publisher: { '@type': 'Organization', name: 'Taar', url: 'https://taar.bio' },
  mainEntityOfPage: 'https://taar.bio/linktree-alternative-india',
  datePublished: '2024-01-01',
  dateModified: new Date().toISOString().split('T')[0],
}

const comparisons = [
  { feature: 'UPI Payment Links (GPay, PhonePe, Paytm)', taar: '✓ Free on all plans', linktree: '✗ Not available' },
  { feature: 'Pro plan price', taar: '₹399 / month', linktree: '~₹750 / month ($9 USD)' },
  { feature: 'Indian payment gateway', taar: 'Razorpay ✓', linktree: '✗ No INR support' },
  { feature: 'Auto Instagram Reels shelf', taar: '✓ Pro plan', linktree: '✗ Not available' },
  { feature: 'Sell digital products', taar: '✓ Pro — Razorpay checkout + auto email', linktree: '✓ Paid plan only' },
  { feature: 'Templates made for India', taar: '✓ Bollywood, Desi, Marigold, Holi…', linktree: '✗ Generic global templates' },
  { feature: 'Total templates', taar: '50 templates, all free', linktree: '30+ (paid required for many)' },
  { feature: 'Free plan link limit', taar: '8 links, forever', linktree: '5 links' },
  { feature: 'Click analytics', taar: '✓ Pro plan', linktree: '✓ Paid plan' },
  { feature: 'Custom domain', taar: 'Coming soon', linktree: '✓ Paid plan' },
  { feature: 'Built & supported in India', taar: '✓ India-first product', linktree: '✗ Australian company' },
  { feature: 'WhatsApp link type', taar: '✓ Built-in type', linktree: '✗ Generic URL only' },
]

const faqs = [
  {
    q: 'What is the best free Linktree alternative for India?',
    a: 'Taar is the best free Linktree alternative for India. Unlike Linktree, Taar is built specifically for Indian creators with UPI payment link support, Indian-specific templates, Razorpay integration, and pricing in INR. The free plan is genuinely free forever with 8 links, all 50 templates, and UPI support.',
  },
  {
    q: 'Does Taar support UPI payments like Linktree does not?',
    a: 'Yes. Taar supports UPI payment links as a core feature on all plans including the free plan. You add your UPI ID (any app — GPay, PhonePe, Paytm, BHIM), and fans can pay you directly. Linktree does not support UPI at all.',
  },
  {
    q: 'How much does Taar cost compared to Linktree in India?',
    a: 'Taar Pro costs ₹399 per month. Linktree Starter costs $9 per month, which is approximately ₹750 per month at current exchange rates — almost double. Both have free plans, but Taar\'s free plan includes more: 8 links (vs 5), all templates (vs limited), and UPI links (not available on Linktree at any tier).',
  },
  {
    q: 'Can I switch from Linktree to Taar?',
    a: 'Yes, easily. Sign up on Taar, add your username, and re-enter your links. It takes under 10 minutes. You can then update your Instagram bio to your Taar link.',
  },
  {
    q: 'Is Taar only for Instagram creators?',
    a: 'No. Taar works for any creator who shares links — YouTube, Spotify, WhatsApp, any website. It is especially useful for Instagram creators because of the auto Reels shelf feature, but it works for anyone who needs a single link that leads to multiple destinations.',
  },
]

export default function LinktreeAlternativePage() {
  return (
    <div className="bg-[#060606] text-white min-h-screen" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      <Script id="json-ld-compare" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-white/5">
        <Link href="/" className="font-display text-xl tracking-[0.15em] text-white">TAAR</Link>
        <div className="flex items-center gap-6">
          <Link href="/#pricing" className="text-xs text-white/40 hover:text-white transition-colors tracking-widest uppercase">Pricing</Link>
          <Link href="/login" className="text-xs font-semibold bg-[#E8593C] text-white px-5 py-2.5 tracking-widest uppercase hover:bg-[#d44e33] transition-all">
            Start Free →
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 md:px-12 py-20 md:py-32">

        {/* Hero */}
        <div className="mb-20">
          <p className="text-[10px] tracking-[0.4em] text-[#E8593C] uppercase mb-6 font-semibold">Linktree Alternative · India</p>
          <h1 className="font-display text-5xl md:text-7xl tracking-wider leading-[0.9] mb-8">
            THE BEST<br/>LINKTREE<br/>ALTERNATIVE<br/><span className="text-[#E8593C]">FOR INDIA.</span>
          </h1>
          <p className="text-white/50 text-lg leading-relaxed max-w-2xl mb-10">
            Linktree is a great tool — but it was not built for India. No UPI support, dollar pricing, no Indian templates.
            Taar is the link in bio tool built ground-up for Indian creators. Free forever.
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Link href="/login"
              className="inline-flex items-center gap-3 bg-[#E8593C] text-white px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-[#060606] transition-all">
              Create your free Taar page →
            </Link>
            <Link href="/demo" target="_blank"
              className="inline-flex items-center gap-3 border border-white/15 text-white/60 px-8 py-4 text-xs tracking-widest uppercase hover:border-white/40 hover:text-white transition-all">
              See example page ↗
            </Link>
          </div>
        </div>

        {/* Why switch — 3 cards */}
        <div className="grid md:grid-cols-3 gap-px bg-white/5 mb-20">
          {[
            { icon: '₹', title: 'UPI built-in', body: 'Accept payments from fans via GPay, PhonePe, Paytm directly. Linktree has no UPI support at any price point.' },
            { icon: '🇮🇳', title: 'Indian pricing', body: 'Taar Pro is ₹399/month. Linktree\'s equivalent plan is ~₹750/month in India. Same features, half the price.' },
            { icon: '🎨', title: 'Made for Indian creators', body: 'Bollywood editorial, Marigold, Desi vibes — templates that actually reflect Indian creator culture.' },
          ].map((c) => (
            <div key={c.title} className="bg-[#060606] p-8">
              <div className="font-display text-3xl text-[#E8593C] mb-3">{c.icon}</div>
              <h2 className="font-semibold text-white text-base mb-2">{c.title}</h2>
              <p className="text-white/40 text-sm leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="mb-20">
          <h2 className="font-display text-4xl md:text-5xl tracking-wider mb-10">TAAR VS LINKTREE</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 pr-6 text-white/30 text-xs tracking-widest uppercase font-medium">Feature</th>
                  <th className="text-left py-4 pr-6 text-[#E8593C] text-xs tracking-widest uppercase font-bold">Taar</th>
                  <th className="text-left py-4 text-white/20 text-xs tracking-widest uppercase font-medium">Linktree</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-4 pr-6 text-white/50">{row.feature}</td>
                    <td className="py-4 pr-6 text-white font-medium">{row.taar}</td>
                    <td className="py-4 text-white/30">{row.linktree}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-20">
          <h2 className="font-display text-4xl md:text-5xl tracking-wider mb-10">FREQUENTLY ASKED</h2>
          <div className="space-y-0">
            {faqs.map((item, i) => (
              <details key={i} className="group border-t border-white/8 py-6 cursor-pointer">
                <summary className="flex items-center justify-between gap-4 list-none">
                  <h3 className="font-semibold text-white text-sm md:text-base pr-4">{item.q}</h3>
                  <span className="text-white/30 group-open:rotate-45 transition-transform duration-200 shrink-0 text-xl font-light">+</span>
                </summary>
                <p className="mt-4 text-white/50 text-sm leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="border-t border-white/5 pt-16 text-center">
          <h2 className="font-display text-4xl md:text-6xl tracking-wider mb-6">
            SWITCH TODAY.<br/><span className="text-[#E8593C]">IT&apos;S FREE.</span>
          </h2>
          <p className="text-white/40 text-sm mb-8">No credit card. No trial. Live in 5 minutes.</p>
          <Link href="/login"
            className="inline-flex items-center gap-4 bg-[#E8593C] text-white px-10 py-5 text-sm font-bold tracking-widest uppercase hover:bg-white hover:text-[#060606] transition-all">
            Create your Taar page — free →
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6 md:px-12 text-center">
        <Link href="/" className="font-display text-lg tracking-[0.15em] text-white">TAAR</Link>
        <p className="text-white/20 text-xs mt-1">Your thread to everything · Made in India 🇮🇳</p>
      </footer>
    </div>
  )
}

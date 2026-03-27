import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Taar',
  description: 'How Taar collects, uses, and protects your data.',
  alternates: { canonical: 'https://taar.bio/privacy' },
}

const sections = [
  {
    title: 'What We Collect',
    body: [
      'When you sign up for Taar, we collect your email address to create and identify your account.',
      'You choose your own username. We store it along with the links, bio text, and profile information you add to your Taar page.',
      'When visitors view your Taar page, we log an anonymous page view count. We do not collect visitor IP addresses, browser fingerprints, or any personally identifiable information about your page visitors.',
      'If you upgrade to Pro, Razorpay collects your payment details (card or UPI). We never see or store full payment credentials — only a transaction reference ID.',
    ],
  },
  {
    title: 'How We Use Your Data',
    body: [
      'Your email is used solely to send you the magic login link and, if you opt in, occasional product updates. We do not send promotional email from third parties.',
      'Your username and page content are used to serve your public Taar page at taar.bio/[username].',
      'Anonymous page view counts are shown to you in your dashboard analytics. They are never shared externally.',
      'Payment transaction IDs are used to verify Pro subscriptions and deliver digital product purchases.',
    ],
  },
  {
    title: 'Third-Party Services',
    body: [
      'Authentication & Database — We use Supabase (supabase.com) to store your account data and page content. Supabase is SOC 2 Type II certified and stores data in secured cloud infrastructure.',
      'Payments — Razorpay (razorpay.com) processes all payments for Pro subscriptions and digital product sales. Razorpay is PCI-DSS compliant. Your payment data is governed by Razorpay\'s privacy policy.',
      'Hosting — Taar is hosted on Vercel (vercel.com). Vercel may log request metadata (IP, user agent) for infrastructure security purposes per their data processing terms.',
    ],
  },
  {
    title: 'We Do Not Sell Your Data',
    body: [
      'We do not sell, rent, trade, or share your personal data with any third party for marketing or advertising purposes. Full stop.',
      'We do not run any advertising on Taar. There are no ad networks, trackers, or retargeting pixels on this platform.',
    ],
  },
  {
    title: 'Data Retention',
    body: [
      'Your account data is retained for as long as your account is active. If you delete your account, we permanently delete your email, username, links, and page content within 30 days.',
      'Anonymous analytics aggregates (total page views) may be retained indefinitely as they contain no personal information.',
    ],
  },
  {
    title: 'Your Rights',
    body: [
      'You can update or delete your Taar page content at any time from your dashboard.',
      'You can request a copy of all data we hold about you, or request deletion of your account, by emailing us at the address below.',
      'If you are in the EU/EEA, you have additional rights under GDPR including the right to access, rectify, erase, restrict, or port your data.',
    ],
  },
  {
    title: 'Cookies',
    body: [
      'Taar uses a single session cookie to keep you logged in. This is a functional cookie and is required for the service to work. We do not use tracking cookies or third-party analytics cookies.',
    ],
  },
  {
    title: 'Changes to This Policy',
    body: [
      'We may update this policy occasionally. If we make material changes we will notify you by email or by a prominent notice on the dashboard. The "Last updated" date below always reflects the current version.',
    ],
  },
  {
    title: 'Contact',
    body: [
      'If you have questions about this privacy policy or want to exercise your data rights, email us at: hello@taar.bio',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', fontFamily: 'DM Sans, sans-serif' }}>
      <div className="grain-overlay" />

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-white/5">
        <Link href="/" className="font-display text-2xl tracking-[0.15em] text-white hover:text-[#E8593C] transition-colors"
          style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
          TAAR
        </Link>
        <Link href="/login" className="text-xs text-white/40 hover:text-white transition-colors tracking-widest uppercase">
          Login →
        </Link>
      </nav>

      <div className="max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-24">

        {/* Header */}
        <div className="mb-16">
          <p className="text-[10px] tracking-[0.4em] text-[#E8593C] uppercase mb-4 font-semibold">Legal</p>
          <h1 className="font-display text-6xl md:text-8xl tracking-wider leading-none text-white mb-4"
            style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
            PRIVACY<br />POLICY
          </h1>
          <p className="text-white/30 text-sm tracking-widest uppercase">Last updated: March 2026</p>
          <div className="mt-6 h-px bg-gradient-to-r from-[#E8593C] via-white/10 to-transparent" />
        </div>

        {/* Intro */}
        <p className="text-white/50 text-base leading-relaxed mb-16 max-w-xl">
          Taar is built by creators, for creators. We take your privacy seriously and keep our data practices simple and transparent. Here is exactly what we collect and why.
        </p>

        {/* Sections */}
        <div className="space-y-14">
          {sections.map((s, i) => (
            <div key={s.title} className="group">
              <div className="flex items-baseline gap-4 mb-5">
                <span className="font-display text-4xl text-white/5 leading-none tabular-nums"
                  style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="font-display text-2xl md:text-3xl tracking-wider text-white"
                  style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                  {s.title.toUpperCase()}
                </h2>
              </div>
              <div className="pl-0 md:pl-14 space-y-4 border-l border-white/5 pl-6">
                {s.body.map((para, j) => (
                  <p key={j} className="text-white/50 text-sm leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-white/20 text-xs tracking-widest uppercase">
            Taar · Made in India 🇮🇳
          </p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="text-xs text-white/25 hover:text-[#E8593C] transition-colors tracking-widest uppercase">
              Terms of Service
            </Link>
            <Link href="/" className="text-xs text-white/25 hover:text-white transition-colors tracking-widest uppercase">
              ← Back to Taar
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

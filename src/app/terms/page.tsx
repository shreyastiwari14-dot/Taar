import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — Taar',
  description: 'Terms and conditions for using the Taar link-in-bio platform.',
  alternates: { canonical: 'https://taar.bio/terms' },
}

const sections = [
  {
    title: 'Acceptance of Terms',
    body: [
      'By creating an account or using Taar (taar.bio), you agree to be bound by these Terms of Service. If you do not agree, do not use the service.',
      'We may update these terms from time to time. Continued use of Taar after changes constitutes acceptance of the updated terms. We will notify you of material changes via email or dashboard notice.',
    ],
  },
  {
    title: 'The Service',
    body: [
      'Taar provides a link-in-bio platform that lets you create a single public page hosting your links, UPI payment address, Instagram Reels shelf, and digital products.',
      'The Free plan includes 1 page, up to 8 links, all 50 templates, UPI links, and a custom username at no cost.',
      'The Pro plan (₹399/month) adds click analytics, auto Instagram Reels sync, digital product sales (up to 5 products), and watermark removal. Pro is billed monthly and can be cancelled at any time.',
      'We reserve the right to modify, suspend, or discontinue any part of the service with reasonable notice.',
    ],
  },
  {
    title: 'Your Account',
    body: [
      'You must provide a valid email address to create an account. You are responsible for all activity under your account.',
      'Usernames are first-come, first-served. We reserve the right to reclaim inactive usernames or usernames that infringe trademarks.',
      'You may not create accounts for the purpose of impersonating other people or organisations.',
      'You are responsible for keeping your account secure. We use magic-link email authentication — do not forward magic links to others.',
    ],
  },
  {
    title: 'Acceptable Use',
    body: [
      'You may use Taar only for lawful purposes. You agree not to use Taar to:',
      '— Post, link to, or promote illegal content, including pirated software, illegal drugs, or CSAM.',
      '— Run phishing schemes, spread malware, or engage in fraud.',
      '— Harass, threaten, or impersonate other individuals.',
      '— Spam or send unsolicited commercial communications.',
      '— Violate any applicable Indian or international law.',
      'We reserve the right to suspend or terminate any account that violates these rules, without prior notice.',
    ],
  },
  {
    title: 'Content Ownership',
    body: [
      'You retain full ownership of all content you add to your Taar page — your links, bio text, profile photo, and digital products.',
      'By uploading content, you grant Taar a limited, non-exclusive, royalty-free licence to display and serve that content as part of the Taar service.',
      'You are solely responsible for ensuring you have the rights to any content you post. We do not pre-screen content but will act on valid takedown requests.',
    ],
  },
  {
    title: 'Digital Products & Payments',
    body: [
      'Pro users may sell digital products through their Taar page. Payments are processed by Razorpay. Taar does not take a commission on digital product sales — you receive the full amount minus Razorpay\'s standard processing fee.',
      'You are responsible for the accuracy of product descriptions, delivery of purchased files, and any applicable GST obligations on your sales.',
      'UPI links on your page are direct transfers to your UPI ID. Taar has no involvement in UPI transactions and takes no fee.',
      'Pro subscription fees are non-refundable. If you cancel Pro, your Pro features remain active until the end of the current billing period.',
    ],
  },
  {
    title: 'Intellectual Property',
    body: [
      'The Taar name, logo, templates, and website design are the intellectual property of Taar and may not be reproduced without permission.',
      'The 50 Taar templates are licensed to you for personal use on your Taar page. You may not extract, redistribute, or resell the template designs.',
    ],
  },
  {
    title: 'Limitation of Liability',
    body: [
      'Taar is provided "as is" without warranties of any kind. We do not guarantee uninterrupted availability, though we aim for high uptime.',
      'To the maximum extent permitted by law, Taar\'s total liability to you for any claim arising out of these terms or use of the service shall not exceed the amount you paid us in the 3 months preceding the claim.',
      'We are not liable for indirect, incidental, or consequential damages including lost profits or data loss.',
    ],
  },
  {
    title: 'Termination',
    body: [
      'You may delete your account at any time from your dashboard settings. Deletion is permanent and we will remove your data within 30 days.',
      'We may suspend or terminate your account immediately if you breach these terms, with or without notice depending on the severity.',
      'Upon termination, your public Taar page will become inaccessible. Your username will be released after 90 days.',
    ],
  },
  {
    title: 'Governing Law',
    body: [
      'These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Mumbai, Maharashtra.',
    ],
  },
  {
    title: 'Contact',
    body: [
      'Questions about these terms? Email us at: hello@taar.bio',
    ],
  },
]

export default function TermsPage() {
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
            TERMS OF<br />SERVICE
          </h1>
          <p className="text-white/30 text-sm tracking-widest uppercase">Last updated: March 2026</p>
          <div className="mt-6 h-px bg-gradient-to-r from-[#E8593C] via-white/10 to-transparent" />
        </div>

        {/* Intro */}
        <p className="text-white/50 text-base leading-relaxed mb-16 max-w-xl">
          These are the rules of the road for using Taar. We have kept them as straightforward as possible. Please read them — they matter.
        </p>

        {/* Sections */}
        <div className="space-y-14">
          {sections.map((s, i) => (
            <div key={s.title}>
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
              <div className="border-l border-white/5 pl-6 space-y-4">
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
            <Link href="/privacy" className="text-xs text-white/25 hover:text-[#E8593C] transition-colors tracking-widest uppercase">
              Privacy Policy
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

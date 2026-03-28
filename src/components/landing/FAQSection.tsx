'use client'

import { useState } from 'react'

const FAQS = [
  {
    q: 'Is UPI really free?',
    a: 'Yes. There are no platform fees on UPI payments. You keep 100% of what your audience sends. Standard UPI transaction limits apply.',
  },
  {
    q: 'What is the Taar watermark?',
    a: "On the free plan, a small 'Made with Taar' badge appears at the bottom of your page. Upgrade to Pro to remove it.",
  },
  {
    q: 'Can I use my own domain?',
    a: 'Custom domains (like link.yourname.com) are a Pro feature. On free, your link is taar.bio/yourname.',
  },
  {
    q: 'How do I connect UPI?',
    a: "Just enter your UPI ID (like name@gpay) in your dashboard. We generate the payment link — no gateway setup needed.",
  },
  {
    q: 'What happens if I cancel Pro?',
    a: 'You drop back to the free plan. Your page stays live, links stay active, you just lose Pro features.',
  },
  {
    q: 'Is my data safe?',
    a: 'Yes. Payments go directly through Razorpay. We never store your UPI credentials or payment details.',
  },
]

const FAQ_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section aria-labelledby="faq-heading" className="bg-[#060606] py-24 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />
      <div className="max-w-3xl mx-auto">
        <p className="font-mono text-xs tracking-[0.2em] text-[#E8593C] mb-4 uppercase">Got questions?</p>
        <h2
          id="faq-heading"
          className="text-white mb-12"
          style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(40px, 5.5vw, 72px)', lineHeight: 0.95 }}
        >
          Frequently asked.
        </h2>

        <div className="divide-y divide-white/[0.06]">
          {FAQS.map(({ q, a }, i) => {
            const isOpen = open === i
            return (
              <div key={q}>
                <button
                  className="w-full flex items-center justify-between py-5 text-left gap-4 group"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span className="text-white text-sm font-medium group-hover:text-white/80 transition-colors">{q}</span>
                  <svg
                    width="16" height="16" viewBox="0 0 16 16" fill="none"
                    className="shrink-0 transition-transform duration-300"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', color: isOpen ? '#E8593C' : 'rgba(255,255,255,0.3)' }}
                  >
                    <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div
                  id={`faq-answer-${i}`}
                  className={`faq-answer${isOpen ? ' open' : ''}`}
                  role="region"
                >
                  <div>
                    <p className="text-white/50 text-sm leading-relaxed pb-5">{a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

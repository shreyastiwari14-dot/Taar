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

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section aria-labelledby="faq-heading" className="py-24 px-6" style={{ background: '#0A0A0A' }}>
      <div className="max-w-3xl mx-auto">
        <p
          className="uppercase mb-5"
          style={{ fontSize: 11, letterSpacing: '0.08em', color: '#6E6E73', fontWeight: 500 }}
        >
          Got questions?
        </p>
        <h2
          id="faq-heading"
          className="mb-14"
          style={{
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(32px, 4vw, 48px)',
            lineHeight: 1.06,
            letterSpacing: '-0.03em',
            color: '#F5F5F7',
          }}
        >
          Frequently asked.
        </h2>

        <div>
          {FAQS.map(({ q, a }, i) => {
            const isOpen = open === i
            return (
              <div key={q} style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <button
                  className="w-full flex items-center justify-between py-5 text-left gap-6"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span style={{ color: '#F5F5F7', fontSize: 17, fontWeight: 500, lineHeight: 1.4 }}>{q}</span>
                  <span
                    style={{
                      color: '#6E6E73',
                      fontSize: 22,
                      fontWeight: 300,
                      lineHeight: 1,
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease, color 0.2s ease',
                      display: 'block',
                      flexShrink: 0,
                      color: isOpen ? '#E8533A' : '#6E6E73',
                    } as React.CSSProperties}
                  >
                    +
                  </span>
                </button>
                <div
                  id={`faq-answer-${i}`}
                  className={`faq-answer${isOpen ? ' open' : ''}`}
                  role="region"
                >
                  <div>
                    <p style={{ color: '#A1A1A6', fontSize: 15, lineHeight: 1.65, paddingBottom: 20 }}>{a}</p>
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

'use client'

import { useState } from 'react'
import Link from 'next/link'

const MONTHLY = 399
const ANNUAL_PER_MONTH = 319
const ANNUAL_TOTAL = ANNUAL_PER_MONTH * 12

const FREE_FEATURES = [
  'All 50 templates',
  'Up to 8 links',
  'UPI payment links',
  'Analytics (7-day history)',
]

const PRO_FEATURES = [
  'Unlimited links',
  'Analytics: 30-day history, traffic sources, city-level data',
  'Sell digital products via Razorpay',
  'Email capture & subscribers list',
  'UPI QR code shown on your page',
  'Page QR code — download & share anywhere',
  'Remove Taar watermark',
  'All 50 templates unlocked',
  'Priority support',
]

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
      <path d="M3 8l4 4 6-8" stroke="#E8533A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function PricingSection() {
  const [annual, setAnnual] = useState(false)
  const price = annual ? ANNUAL_PER_MONTH : MONTHLY

  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="py-24 px-6" style={{ background: '#0A0A0A' }}>
      <div className="max-w-4xl mx-auto">
        <p
          className="uppercase text-center mb-5"
          style={{ fontSize: 11, letterSpacing: '0.08em', color: '#6E6E73', fontWeight: 500 }}
        >
          Simple pricing
        </p>
        <h2
          id="pricing-heading"
          className="text-center mb-10"
          style={{
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(32px, 4vw, 48px)',
            lineHeight: 1.06,
            letterSpacing: '-0.03em',
            color: '#F5F5F7',
          }}
        >
          Free. Forever.<br />Seriously.
        </h2>

        {/* Segmented control toggle */}
        <div className="flex justify-center mb-12">
          <div
            className="flex p-1 rounded-xl"
            style={{ background: '#1C1C1E' }}
            role="group"
            aria-label="Billing period"
          >
            <button
              onClick={() => setAnnual(false)}
              className="px-6 py-2 rounded-lg transition-all"
              style={{
                background: !annual ? '#2C2C2E' : 'transparent',
                color: !annual ? '#F5F5F7' : '#6E6E73',
                fontSize: 14,
                fontWeight: !annual ? 500 : 400,
              }}
              aria-pressed={!annual}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className="px-6 py-2 rounded-lg transition-all flex items-center gap-2"
              style={{
                background: annual ? '#2C2C2E' : 'transparent',
                color: annual ? '#F5F5F7' : '#6E6E73',
                fontSize: 14,
                fontWeight: annual ? 500 : 400,
              }}
              aria-pressed={annual}
            >
              Annual
              <span
                className="px-1.5 py-0.5 rounded-full"
                style={{ background: 'rgba(48,209,88,0.15)', color: '#30D158', fontSize: 10, fontWeight: 600 }}
              >
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-5">
          {/* Free card */}
          <div
            className="reveal flex-1 rounded-2xl p-10"
            style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <p
              className="uppercase mb-5"
              style={{ fontSize: 11, letterSpacing: '0.08em', color: '#6E6E73', fontWeight: 500 }}
            >
              Free
            </p>
            <p
              style={{
                color: '#F5F5F7',
                fontFamily: 'Inter, -apple-system, sans-serif',
                fontWeight: 700,
                fontSize: 52,
                lineHeight: 1,
                letterSpacing: '-0.03em',
              }}
            >
              ₹0
            </p>
            <p style={{ color: '#6E6E73', fontSize: 13, marginTop: 6, marginBottom: 32 }}>forever · no credit card</p>
            <ul className="space-y-3.5 mb-10" aria-label="Free plan features">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3" style={{ fontSize: 15, color: '#A1A1A6' }}>
                  <Check />
                  {f}
                </li>
              ))}
              <li className="flex items-center gap-3" style={{ fontSize: 15, color: '#6E6E73' }}>
                <span style={{ width: 16, textAlign: 'center', color: '#3A3A3C', fontSize: 20, lineHeight: 1, display: 'block', flexShrink: 0 }}>—</span>
                Taar watermark shown
              </li>
            </ul>
            <Link
              href="/login"
              className="block text-center py-4 rounded-full transition-all hover:opacity-80"
              style={{ border: '1px solid rgba(255,255,255,0.14)', color: '#F5F5F7', fontSize: 15, fontWeight: 500 }}
            >
              Start for free
            </Link>
          </div>

          {/* Pro card */}
          <div
            className="reveal flex-1 rounded-2xl p-10 relative overflow-hidden pro-card-glow"
            data-delay="120"
            style={{ background: '#111111', border: '1px solid rgba(232,83,58,0.35)' }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(232,83,58,0.09) 0%, transparent 65%)' }}
            />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-5">
                <p
                  className="uppercase"
                  style={{ fontSize: 11, letterSpacing: '0.08em', color: '#E8533A', fontWeight: 500 }}
                >
                  Pro
                </p>
                <span
                  className="uppercase px-3 py-1 rounded-full"
                  style={{ background: 'rgba(232,83,58,0.12)', color: '#E8533A', fontSize: 10, letterSpacing: '0.08em', fontWeight: 600 }}
                >
                  Most Popular
                </span>
              </div>
              <div className="flex items-end gap-3 mb-1">
                <p
                  style={{
                    color: '#F5F5F7',
                    fontFamily: 'Inter, -apple-system, sans-serif',
                    fontWeight: 700,
                    fontSize: 52,
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                  }}
                >
                  ₹{price}
                </p>
                {annual && (
                  <p style={{ color: '#6E6E73', fontSize: 18, marginBottom: 4, textDecoration: 'line-through' }}>
                    ₹{MONTHLY}
                  </p>
                )}
              </div>
              <p style={{ color: '#6E6E73', fontSize: 13, marginBottom: 32 }}>
                per month{annual ? ` · billed ₹${ANNUAL_TOTAL.toLocaleString('en-IN')}/year` : ' · cancel anytime'}
              </p>
              <ul className="space-y-3.5 mb-8" aria-label="Pro plan features">
                {PRO_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-3" style={{ fontSize: 15, color: '#A1A1A6' }}>
                    <Check />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/dashboard/upgrade"
                className="block w-full py-4 rounded-full text-white text-center transition-opacity hover:opacity-85"
                style={{ background: '#E8533A', fontSize: 15, fontWeight: 600 }}
              >
                Get Pro for ₹{price}/month
              </Link>

              <div className="mt-5 text-center">
                <p style={{ color: '#3A3A3C', fontSize: 12 }}>Powered by Razorpay · No hidden charges</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

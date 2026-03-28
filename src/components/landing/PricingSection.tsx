'use client'

import { useState } from 'react'
import Link from 'next/link'

const MONTHLY = 399
const ANNUAL_PER_MONTH = 319
const ANNUAL_TOTAL = ANNUAL_PER_MONTH * 12

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

export function PricingSection() {
  const [annual, setAnnual] = useState(false)
  const price = annual ? ANNUAL_PER_MONTH : MONTHLY

  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="bg-[#060606] py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="font-mono text-xs tracking-[0.2em] text-[#E8593C] mb-4 text-center uppercase">Simple pricing</p>
        <h2
          id="pricing-heading"
          className="text-white text-center mb-8"
          style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(40px, 5.5vw, 72px)', lineHeight: 0.95 }}
        >
          Free. Forever.<br />Seriously.
        </h2>

        {/* Annual toggle */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <span className={`text-sm font-mono ${!annual ? 'text-white' : 'text-white/40'}`}>Monthly</span>
          <button
            onClick={() => setAnnual(!annual)}
            className={`relative w-12 h-6 rounded-full transition-colors ${annual ? 'bg-[#E8593C]' : 'bg-white/10'}`}
            role="switch"
            aria-checked={annual}
            aria-label="Toggle annual billing"
          >
            <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${annual ? 'translate-x-7' : 'translate-x-1'}`} />
          </button>
          <span className={`text-sm font-mono ${annual ? 'text-white' : 'text-white/40'}`}>
            Annual
            <span className="ml-1.5 text-[10px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded-full">Save 20%</span>
          </span>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Free */}
          <div className="reveal flex-1 border border-white/[0.08] rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <p className="font-mono text-xs text-white/40 tracking-wide mb-3">FREE</p>
            <p className="text-white mb-1" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 52, lineHeight: 1 }}>₹0</p>
            <p className="text-white/30 text-xs mb-8">forever · no credit card</p>
            <ul className="space-y-3 mb-10" aria-label="Free plan features">
              {['All 50 templates', 'Up to 8 links', 'UPI payment links', 'Analytics (7-day history)'].map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-white/60">
                  <span className="text-[#E8593C] shrink-0">✓</span>{f}
                </li>
              ))}
              {/* Limitation item */}
              <li className="flex items-start gap-3 text-sm group relative">
                <span className="shrink-0 mt-0.5">🔒</span>
                <span className="text-gray-500 italic">Taar watermark shown
                  <span className="ml-1 hidden group-hover:inline absolute left-0 top-6 z-10 bg-[#1a1a1a] border border-white/10 text-white/60 text-xs rounded-lg px-3 py-2 w-52 shadow-xl not-italic">
                    Upgrade to Pro to remove the Taar watermark
                  </span>
                </span>
              </li>
            </ul>
            <Link href="/login" className="block text-center py-3.5 rounded-full border border-white/20 text-white text-sm hover:border-white/40 transition-colors" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.1em' }}>
              Start for free →
            </Link>
          </div>

          {/* Pro */}
          <div className="reveal flex-1 rounded-2xl p-8 relative overflow-hidden" data-delay="120" style={{ background: 'linear-gradient(135deg, #1a0a07 0%, #0f0606 100%)', border: '1px solid rgba(232,89,60,0.3)' }}>
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(232,89,60,0.12) 0%, transparent 70%)' }} />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <p className="font-mono text-xs text-[#E8593C] tracking-wide">PRO</p>
                <span className="font-mono text-[10px] bg-[#E8593C] text-white px-2.5 py-1 rounded-full">MOST POPULAR</span>
              </div>
              <div className="flex items-end gap-2 mb-1">
                <p className="text-white" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 52, lineHeight: 1 }}>₹{price}</p>
                {annual && <p className="text-white/30 line-through text-lg mb-1">₹{MONTHLY}</p>}
              </div>
              <p className="text-white/30 text-xs mb-1">
                per month{annual ? ` · billed ₹${ANNUAL_TOTAL.toLocaleString('en-IN')}/year` : ' · cancel anytime'}
              </p>
              <ul className="space-y-3 mb-6 mt-6" aria-label="Pro plan features">
                {PRO_FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="text-[#E8593C] shrink-0">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* Social proof pull quote */}
              <blockquote className="border-l-2 border-[#E8593C]/40 pl-3 mb-6">
                <p className="text-white/40 text-xs italic">&ldquo;The Bollywood template matches my brand perfectly.&rdquo;</p>
                <footer className="text-[#E8593C]/60 text-xs mt-1">— Arjun M. · 82K followers</footer>
              </blockquote>

              <Link
                href="/dashboard/upgrade"
                className="block w-full py-3.5 rounded-full text-white text-sm text-center bg-[#E8593C] hover:bg-[#d44e33] transition-colors"
                style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.1em', fontSize: 16 }}
              >
                Get Pro for ₹{price}/month →
              </Link>

              {/* Trust badges */}
              <div className="mt-4">
                <p className="sr-only">Accepted payment methods</p>
                <p className="text-center text-white/20 text-xs mb-3">Powered by Razorpay · No hidden charges</p>
                <div className="flex items-center justify-center gap-3" aria-label="Accepted payment methods">
                  {[
                    { label: 'GPay', color: '#4285F4', text: 'G' },
                    { label: 'PhonePe', color: '#5f259f', text: 'Pe' },
                    { label: 'Paytm', color: '#00BAF2', text: 'P' },
                    { label: 'Razorpay', color: '#2D8CF0', text: 'Rz' },
                  ].map(({ label, color, text }) => (
                    <div
                      key={label}
                      className="rounded-md px-2 py-1 text-white text-[10px] font-bold"
                      style={{ background: color, minWidth: 32, textAlign: 'center' }}
                      title={label}
                    >
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

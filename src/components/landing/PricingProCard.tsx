'use client'

import { useState } from 'react'
import { NotifyModal } from './NotifyModal'

export function PricingProCard({ price }: { price: number }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div
        id="pricing-pro"
        className="reveal flex-1 rounded-2xl p-8 relative overflow-hidden"
        data-delay="120"
        style={{ background: 'linear-gradient(135deg, #1a0a07 0%, #0f0606 100%)', border: '1px solid rgba(232,89,60,0.3)' }}
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(232,89,60,0.12) 0%, transparent 70%)' }} />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <p className="font-mono text-xs text-[#E8593C] tracking-wide">PRO</p>
            <span className="font-mono text-[10px] bg-[#E8593C] text-white px-2.5 py-1 rounded-full">COMING SOON</span>
          </div>
          <p className="text-white mb-1" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 52, lineHeight: 1 }}>₹{price}</p>
          <p className="text-white/30 text-xs mb-8">per month</p>
          <ul className="space-y-3 mb-10" aria-label="Pro plan features">
            {['Everything in Free', 'Custom domain', 'Digital product sales', 'Email capture', 'Advanced analytics', 'Priority support'].map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm text-white/60">
                <span className="text-[#E8593C] shrink-0" aria-hidden="true">✓</span>{f}
              </li>
            ))}
          </ul>
          <button
            onClick={() => setShowModal(true)}
            className="w-full py-3.5 rounded-full text-white text-sm border border-[#E8593C]/40 hover:border-[#E8593C] hover:bg-[#E8593C]/10 transition-colors"
            style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.1em' }}
          >
            Notify me when Pro launches →
          </button>
        </div>
      </div>

      {showModal && <NotifyModal onClose={() => setShowModal(false)} />}
    </>
  )
}

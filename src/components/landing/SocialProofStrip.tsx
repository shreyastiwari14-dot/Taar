import React from 'react'

const TESTIMONIALS = [
  { name: 'Priya Sharma', handle: '@priya.creates', quote: "Finally a link page that doesn't look generic.", gradient: 'linear-gradient(135deg, #E8593C, #1a0800)' },
  { name: 'Rohan Mehta', handle: '@rohanmehta_', quote: 'Got my first UPI tip within 10 minutes of setup.', gradient: 'linear-gradient(135deg, #9B59B6, #0a0a1a)' },
  { name: 'Ananya V', handle: '@ananya.studio', quote: "The templates are insane. Rose Gold is *chef's kiss*.", gradient: 'linear-gradient(135deg, #2EC4B6, #0a1a1a)' },
]

export function SocialProofStrip() {
  return (
    <section className="bg-[#060606] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-xs tracking-[0.2em] text-[#E8593C] mb-4 uppercase">Real creators. Real results.</p>
        <h2 className="text-white mb-16" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(40px, 5.5vw, 72px)', lineHeight: 0.95 }}>
          They switched.<br />They stayed.
        </h2>

        {/* Desktop: 3-col grid | Mobile: horizontal snap scroll */}
        <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory md:snap-none" style={{ WebkitOverflowScrolling: 'touch' }}>
          {TESTIMONIALS.map(({ name, handle, quote, gradient }, i) => (
            <div key={name} className="reveal shrink-0 w-[80vw] sm:w-[60vw] md:w-auto snap-start" data-delay={String(i * 120)}
              style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 24 }}>
              {/* Avatar */}
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: gradient, marginBottom: 12 }} />
              {/* Name + handle */}
              <p style={{ color: 'white', fontFamily: 'DM Sans, sans-serif', fontWeight: 500, fontSize: 15, marginBottom: 2 }}>{name}</p>
              <p style={{ color: '#E8593C', fontFamily: 'monospace', fontSize: 12, marginBottom: 12 }}>{handle}</p>
              {/* Stars */}
              <div style={{ display: 'flex', gap: 3, marginBottom: 12 }}>
                {[1,2,3,4,5].map(s => (
                  <svg key={s} width="14" height="14" viewBox="0 0 14 14" fill="#E8593C"><path d="M7 1l1.5 4H13l-3.5 2.5L10.8 12 7 9.5 3.2 12l1.3-4.5L1 5h4.5z"/></svg>
                ))}
              </div>
              {/* Quote */}
              <p style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontStyle: 'italic', lineHeight: 1.5 }}>&ldquo;{quote}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

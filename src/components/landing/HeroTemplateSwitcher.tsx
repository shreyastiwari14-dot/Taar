'use client'

import { useState, useCallback } from 'react'

const TEMPLATES = [
  { id: 'bollywood', name: 'Bollywood Editorial', bg: '#0A0005', accent: '#F5C842', text: '#F5C842', font: "'Cinzel', serif", swatch: '#F5C842' },
  { id: 'marigold',  name: 'Desi Marigold',      bg: 'linear-gradient(160deg,#FF6500,#c8500a)', accent: '#FFD700', text: '#fff', font: "'Raleway', sans-serif", swatch: '#FF6500' },
  { id: 'noir',      name: 'Mumbai Noir',         bg: '#08080F', accent: '#9B59B6', text: '#E0D0F8', font: "'Josefin Sans', sans-serif", swatch: '#9B59B6' },
  { id: 'rosegold',  name: 'Rose Gold',           bg: 'linear-gradient(160deg,#B76E79,#E8B4B8)', accent: '#fff', text: '#fff', font: "'Cormorant Garamond', serif", swatch: '#E8B4B8' },
  { id: 'cyber',     name: 'Cyberpunk',           bg: '#000', accent: '#00FF41', text: '#00FF41', font: 'monospace', swatch: '#00FF41' },
]

export function HeroTemplateSwitcher() {
  const [active, setActive] = useState(0)
  const [fading, setFading] = useState(false)

  const switchTo = useCallback((i: number) => {
    if (i === active) return
    setFading(true)
    setTimeout(() => { setActive(i); setFading(false) }, 200)
  }, [active])

  function onKeyDown(e: React.KeyboardEvent, i: number) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); switchTo(i) }
    if (e.key === 'ArrowRight') switchTo((active + 1) % TEMPLATES.length)
    if (e.key === 'ArrowLeft') switchTo((active - 1 + TEMPLATES.length) % TEMPLATES.length)
  }

  const t = TEMPLATES[active]

  return (
    <div className="hidden md:flex flex-1 items-center justify-center pr-8 py-16 relative z-10" aria-label="Template preview">
      <div className="flex flex-col items-center">
        {/* Phone frame */}
        <div
          className="template-preview-frame"
          style={{
            width: 260, height: 520,
            borderRadius: 40,
            border: '6px solid rgba(255,255,255,0.08)',
            background: t.bg,
            boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
            overflow: 'hidden',
            opacity: fading ? 0 : 1,
            transition: 'opacity 0.2s ease',
          }}
        >
          <div style={{ padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: `${t.accent}22`, border: `2px solid ${t.accent}66`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              <span style={{ fontFamily: t.font, color: t.accent, fontSize: 24, fontWeight: 700 }}>P</span>
            </div>
            <p style={{ fontFamily: t.font, color: t.text, fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Priya Sharma</p>
            <p style={{ color: `${t.text}66`, fontSize: 11, marginBottom: 24 }}>Food Creator · Mumbai</p>
            {['Instagram', 'UPI Tips', 'YouTube'].map((l) => (
              <div key={l} style={{ width: '100%', padding: '10px 16px', borderRadius: 10, border: `1px solid ${t.accent}33`, background: `${t.accent}0a`, color: t.text, fontSize: 12, marginBottom: 8, textAlign: 'center' }}>{l}</div>
            ))}
          </div>
        </div>

        {/* Swatches */}
        <div className="flex gap-2 justify-center mt-4" role="radiogroup" aria-label="Choose template">
          {TEMPLATES.map((tmpl, i) => (
            <button
              key={tmpl.id}
              onClick={() => switchTo(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              role="radio"
              aria-checked={active === i}
              aria-label={tmpl.name}
              title={tmpl.name}
              style={{
                width: active === i ? 20 : 14,
                height: 14,
                borderRadius: 7,
                background: tmpl.swatch,
                border: active === i ? `2px solid ${tmpl.swatch}` : '2px solid transparent',
                boxShadow: active === i ? `0 0 0 2px #060606, 0 0 0 4px ${tmpl.swatch}` : 'none',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>

        <p className="font-mono text-xs text-white/30 mt-2">{t.name}</p>
        <p className="font-mono text-xs text-white/20 mt-0.5">taar.bio/priya</p>
      </div>
    </div>
  )
}

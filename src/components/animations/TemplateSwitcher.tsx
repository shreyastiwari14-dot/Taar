'use client'
import { useEffect, useRef, useState } from 'react'

interface Template {
  name: string
  bg: string
  accent: string
  textColor: string
  nameFontFamily: string
  tag: string
}

interface Props {
  templates: Template[]
}

export function TemplateSwitcher({ templates }: Props) {
  const sectionRef  = useRef<HTMLElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const section = sectionRef.current
    if (!section) return

    const isMobile = window.innerWidth < 768
    const count    = isMobile ? Math.min(3, templates.length) : templates.length

    let st: { kill: () => void } | null = null

    async function init() {
      const { gsap }          = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      st = ScrollTrigger.create({
        trigger: section,
        start:   'top top',
        end:     '+=600%',
        pin:     true,
        scrub:   1,
        anticipatePin: 1,
        id:      'template-switcher',
        onUpdate(self) {
          const idx = Math.min(count - 1, Math.floor(self.progress * count))
          setActiveIdx(idx)
        },
      })
    }

    init()
    return () => { st?.kill() }
  }, [templates.length])

  const active = templates[activeIdx] ?? templates[0]

  return (
    <section
      ref={sectionRef}
      aria-label="Template showcase"
      className="bg-[#0A0A0A] relative overflow-hidden"
      style={{ height: '100vh' }}
    >
      {/* Section label */}
      <div
        className="absolute top-20 left-1/2 z-10 text-center w-full px-6 pointer-events-none"
        style={{ transform: 'translateX(-50%)' }}
      >
        <div className="flex items-center justify-center gap-3">
          <div className="w-6 h-px bg-[#BFA07A]" />
          <p className="font-mono text-[10px] tracking-[0.25em] text-[#BFA07A] uppercase">Scroll through templates</p>
          <div className="w-6 h-px bg-[#BFA07A]" />
        </div>
      </div>

      {/* Ghosted template name */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <p
          style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize:   'clamp(8vw, 13vw, 180px)',
            color:      'rgba(255,255,255,0.08)',
            textAlign:  'center',
            lineHeight: 1,
            letterSpacing: '0.04em',
            whiteSpace: 'nowrap',
            transition: 'color 0.5s ease',
          }}
        >
          {active.name.toUpperCase()}
        </p>
      </div>

      {/* Phone mockup */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div style={{ width: 'clamp(190px, 24vw, 260px)', aspectRatio: '9/19.5', position: 'relative' }}>
          {/* Side buttons */}
          <div style={{ position: 'absolute', right: -3, top: '28%', width: 3, height: '11%', background: 'rgba(255,255,255,0.2)', borderRadius: '0 2px 2px 0' }} />
          <div style={{ position: 'absolute', left: -3, top: '20%', width: 3, height: '7%', background: 'rgba(255,255,255,0.2)', borderRadius: '2px 0 0 2px' }} />
          <div style={{ position: 'absolute', left: -3, top: '30%', width: 3, height: '7%', background: 'rgba(255,255,255,0.2)', borderRadius: '2px 0 0 2px' }} />
          {/* Screen */}
          <div style={{
            position: 'absolute', inset: 0,
            borderRadius: 44, overflow: 'hidden',
            background: active.bg,
            transition: 'background 0.45s ease',
            boxShadow: [
              '0 0 0 1.5px rgba(255,255,255,0.1)',
              '0 0 0 4px rgba(0,0,0,0.4)',
              '0 48px 96px rgba(0,0,0,0.85)',
              '0 16px 32px rgba(0,0,0,0.5)',
              `0 0 80px ${active.accent}18`,
            ].join(', '),
          }}>
            {/* Glass highlight */}
            <div style={{ position: 'absolute', inset: 0, borderRadius: 44, background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 35%, transparent 60%)', pointerEvents: 'none', zIndex: 5 }} />
            {/* Status bar time */}
            <div style={{ position: 'absolute', top: 14, left: '10%', fontSize: 9, fontWeight: 700, color: active.textColor, opacity: 0.7, fontFamily: 'Inter, sans-serif', zIndex: 6, transition: 'color 0.45s ease' }}>9:41</div>
            {/* Dynamic Island */}
            <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: '34%', height: 24, background: '#000', borderRadius: 100, zIndex: 6 }} />
            {/* Content */}
            <div style={{ position: 'absolute', inset: 0, paddingTop: 50, paddingLeft: 20, paddingRight: 20, paddingBottom: 22, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Avatar */}
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: `${active.accent}28`, border: `2px solid ${active.accent}60`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: active.accent, fontFamily: 'Inter, sans-serif', fontSize: 20, fontWeight: 800, marginBottom: 10, flexShrink: 0, transition: 'border-color 0.45s ease, color 0.45s ease' }}>P</div>
              {/* Name */}
              <p style={{ color: active.textColor, fontFamily: 'Inter, sans-serif', fontSize: 15, fontWeight: 800, textAlign: 'center', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 4, transition: 'color 0.45s ease' }}>
                Priya Sharma
              </p>
              {/* Bio */}
              <p style={{ color: active.textColor, opacity: 0.45, fontFamily: 'Inter, sans-serif', fontSize: 10, textAlign: 'center', lineHeight: 1.3, marginBottom: 8 }}>
                Content Creator · Mumbai
              </p>
              {/* Tag */}
              <span style={{ fontSize: 9, padding: '3px 11px', borderRadius: 20, background: `${active.accent}22`, color: active.accent, marginBottom: 14, flexShrink: 0, transition: 'background 0.45s ease, color 0.45s ease' }}>
                {active.tag}
              </span>
              {/* Link buttons */}
              {['Instagram', 'YouTube', 'UPI Pay'].map((label, n) => (
                <div key={label} style={{ width: '100%', height: 32, borderRadius: 8, border: `1.5px solid ${active.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: n === 0 ? 0.75 : n === 1 ? 0.5 : 0.3, marginBottom: n < 2 ? 8 : 0, fontSize: 10, color: active.textColor, fontWeight: 600, fontFamily: 'Inter, sans-serif', transition: 'border-color 0.45s ease' }}>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Template counter */}
      <div
        className="absolute z-20 text-center w-full"
        style={{ bottom: 56, left: 0 }}
      >
        <p
          className="font-mono text-xs text-white/25 mb-3"
          style={{ letterSpacing: '0.15em' }}
        >
          {activeIdx + 1} / {templates.length}
        </p>
        {/* Progress dots */}
        <div className="flex justify-center gap-2">
          {templates.map((_, i) => (
            <div
              key={i}
              style={{
                width:       i === activeIdx ? 22 : 5,
                height:      5,
                borderRadius: 3,
                background:  i === activeIdx ? '#E8533A' : 'rgba(255,255,255,0.12)',
                transition:  'width 0.3s cubic-bezier(0.34,1.56,0.64,1), background 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

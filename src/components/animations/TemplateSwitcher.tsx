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
            color:      'rgba(255,255,255,0.025)',
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
        <div
          style={{
            width:        'clamp(190px, 24vw, 270px)',
            aspectRatio:  '9/19',
            borderRadius: 40,
            background:   active.bg,
            border:       '1.5px solid rgba(255,255,255,0.1)',
            overflow:     'hidden',
            boxShadow:    `0 48px 96px rgba(0,0,0,0.85), 0 0 60px ${active.accent}14`,
            transition:   'background 0.45s ease, box-shadow 0.45s ease',
            display:      'flex',
            flexDirection: 'column',
            alignItems:   'center',
            padding:      '14px 18px 22px',
            gap:          0,
            position:     'relative',
          }}
        >
          {/* Dynamic Island */}
          <div style={{
            width: 90, height: 24, background: '#000',
            borderRadius: 100, marginBottom: 20, flexShrink: 0,
          }}/>
          {/* Avatar */}
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: `${active.accent}28`,
            border: `2px solid ${active.accent}60`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: active.accent,
            fontFamily: active.nameFontFamily,
            fontSize: 20, fontWeight: 700,
            marginBottom: 10, flexShrink: 0,
            transition: 'border-color 0.45s ease, color 0.45s ease',
          }}>P</div>
          {/* Name */}
          <p style={{
            color: active.textColor,
            fontFamily: active.nameFontFamily,
            fontSize: 15, fontWeight: 700,
            textAlign: 'center', lineHeight: 1.1,
            marginBottom: 6,
            transition: 'color 0.45s ease',
          }}>
            Priya Sharma
          </p>
          {/* Tag */}
          <span style={{
            fontSize: 9,
            padding: '3px 11px', borderRadius: 20,
            background: `${active.accent}22`, color: active.accent,
            marginBottom: 14, flexShrink: 0,
            transition: 'background 0.45s ease, color 0.45s ease',
          }}>
            {active.tag}
          </span>
          {/* Link buttons */}
          {[1, 2, 3].map(n => (
            <div key={n} style={{
              width: '100%', height: 30, borderRadius: 15,
              border: `1.5px solid ${active.accent}`,
              opacity: n === 1 ? 0.7 : n === 2 ? 0.45 : 0.25,
              marginBottom: n < 3 ? 8 : 0,
              transition: 'border-color 0.45s ease, opacity 0.45s ease',
            }}/>
          ))}
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

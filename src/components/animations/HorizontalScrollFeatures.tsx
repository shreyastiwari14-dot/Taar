'use client'
import { useEffect, useRef, ReactNode } from 'react'
import { ScrollReveal } from './ScrollReveal'

interface Feature {
  icon: string
  title: string
  desc: string
}

interface Props {
  features: Feature[]
  label?: string
  heading?: ReactNode
}

export function HorizontalScrollFeatures({ features, label, heading }: Props) {
  const sectionRef  = useRef<HTMLElement>(null)
  const trackRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.innerWidth < 1024) return

    const section = sectionRef.current
    const track   = trackRef.current
    if (!section || !track) return

    let st: { kill: () => void } | null = null

    async function init() {
      const { gsap }          = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const cards       = Array.from(track!.children) as HTMLElement[]
      const totalScroll = track!.scrollWidth - section!.offsetWidth + 96

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start:   'top top',
          end:     `+=${Math.max(totalScroll * 1.6, features.length * 700)}`,
          pin:     true,
          scrub:   1,
          anticipatePin: 1,
          id:      'h-scroll-features',
          onUpdate(self) {
            const idx = Math.round(self.progress * (cards.length - 1))
            cards.forEach((card, i) => {
              card.dataset.active = i === idx ? 'true' : 'false'
            })
          },
        },
      })
      st = tl.scrollTrigger ?? null

      tl.to(track, { x: -totalScroll, ease: 'none' })
    }

    init()
    return () => { st?.kill() }
  }, [features.length])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="features-heading"
      className="bg-[#0A0805]"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Heading */}
      <div className="max-w-5xl mx-auto px-8 pt-24 pb-10">
        {label && (
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-px bg-[#BFA07A]" />
            <p className="font-mono text-[10px] tracking-[0.25em] text-[#BFA07A] uppercase">{label}</p>
          </div>
        )}
        {heading && (
          <h2
            id="features-heading"
            className="text-[#F0EBE3] mb-0"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 'clamp(40px, 5.5vw, 72px)', lineHeight: 0.92 }}
          >
            {heading}
          </h2>
        )}
      </div>

      {/* ── Desktop: horizontal scroll track ────────────────── */}
      <div
        className="hidden lg:block px-8 pb-24"
        style={{ overflowX: 'visible', overscrollBehavior: 'contain' }}
      >
        <div
          ref={trackRef}
          className="flex gap-5"
          style={{ width: 'max-content' }}
        >
          {features.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="h-scroll-card border rounded-xl p-8 shrink-0"
              style={{
                background:  'rgba(191,160,122,0.02)',
                borderColor: 'rgba(191,160,122,0.1)',
                width: 'clamp(280px, 26vw, 340px)',
              }}
              data-active="false"
            >
              <div
                className="text-lg mb-6 w-11 h-11 flex items-center justify-center rounded-lg font-mono"
                style={{ background: 'rgba(191,160,122,0.08)', color: '#BFA07A', fontSize: 15, letterSpacing: '0.05em' }}
              >
                {icon}
              </div>
              <h3
                className="text-[#F0EBE3] mb-3"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, letterSpacing: '0.02em', fontWeight: 500 }}
              >
                {title}
              </h3>
              <p className="text-[#F0EBE3]/55 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile / tablet: vertical stack ─────────────────── */}
      <div className="lg:hidden max-w-5xl mx-auto px-8 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {features.map(({ icon, title, desc }, i) => (
            <ScrollReveal key={title} delay={i * 100}>
              <div
                className="border rounded-xl p-8 h-full"
                style={{ background: 'rgba(191,160,122,0.02)', borderColor: 'rgba(191,160,122,0.1)' }}
              >
                <div
                  className="text-lg mb-6 w-11 h-11 flex items-center justify-center rounded-lg font-mono"
                  style={{ background: 'rgba(191,160,122,0.08)', color: '#BFA07A', fontSize: 15 }}
                >
                  {icon}
                </div>
                <h3
                  className="text-[#F0EBE3] mb-3"
                  style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, letterSpacing: '0.02em', fontWeight: 500 }}
                >
                  {title}
                </h3>
                <p className="text-[#F0EBE3]/55 text-sm leading-relaxed">{desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

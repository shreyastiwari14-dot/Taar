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

      const cards      = Array.from(track!.children) as HTMLElement[]
      const totalScroll = track!.scrollWidth - section!.offsetWidth + 96  // 96 = right padding buffer

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
      className="bg-[#060606]"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Heading */}
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-10">
        {label && (
          <p className="font-mono text-xs tracking-[0.2em] text-[#E8593C] mb-4 uppercase">{label}</p>
        )}
        {heading && (
          <h2
            id="features-heading"
            className="text-white mb-0"
            style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(40px, 5.5vw, 72px)', lineHeight: 0.95 }}
          >
            {heading}
          </h2>
        )}
      </div>

      {/* ── Desktop: horizontal scroll track ────────────────── */}
      <div
        className="hidden lg:block px-6 pb-24"
        style={{ overflowX: 'visible', overscrollBehavior: 'contain' }}
      >
        <div
          ref={trackRef}
          className="flex gap-6"
          style={{ width: 'max-content' }}
        >
          {features.map(({ icon, title, desc }, i) => (
            <div
              key={title}
              className="h-scroll-card border border-white/[0.07] rounded-2xl p-8 shrink-0"
              style={{
                background: 'rgba(255,255,255,0.02)',
                width: 'clamp(300px, 28vw, 360px)',
              }}
              data-active="false"
            >
              <div
                className="text-2xl mb-6 w-12 h-12 flex items-center justify-center rounded-xl"
                style={{ background: 'rgba(232,89,60,0.1)', color: '#E8593C' }}
              >
                {icon}
              </div>
              <h3
                className="text-white mb-3"
                style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, letterSpacing: '0.05em' }}
              >
                {title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile / tablet: vertical stack with stagger ─────── */}
      <div className="lg:hidden max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map(({ icon, title, desc }, i) => (
            <ScrollReveal key={title} delay={i * 100}>
              <div
                className="border border-white/[0.07] rounded-2xl p-8 hover:border-white/[0.14] transition-colors h-full"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                <div
                  className="text-2xl mb-6 w-12 h-12 flex items-center justify-center rounded-xl"
                  style={{ background: 'rgba(232,89,60,0.1)', color: '#E8593C' }}
                >
                  {icon}
                </div>
                <h3
                  className="text-white mb-3"
                  style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, letterSpacing: '0.05em' }}
                >
                  {title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

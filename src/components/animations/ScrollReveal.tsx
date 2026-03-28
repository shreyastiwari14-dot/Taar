'use client'
import { useEffect, useRef, ReactNode } from 'react'

interface Props {
  children: ReactNode
  delay?: number
  fromY?: number
  fromScale?: number
  duration?: number
  className?: string
}

export function ScrollReveal({ children, delay = 0, fromY = 24, fromScale = 1, duration = 0.75, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    if (!el) return

    let st: { kill: () => void } | null = null

    async function init() {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const tween = gsap.fromTo(el,
        { opacity: 0, y: fromY, scale: fromScale, rotateX: fromScale !== 1 ? 0 : 4 },
        {
          opacity: 1, y: 0, scale: 1, rotateX: 0,
          duration,
          delay: delay / 1000,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      )
      st = tween.scrollTrigger ?? null
    }

    init()

    return () => { st?.kill() }
  }, [delay, fromY, fromScale, duration])

  return (
    <div ref={ref} className={className} data-animation="scroll-reveal"
      style={{ opacity: 0, transform: `translateY(${fromY}px)`, perspective: '1000px' }}>
      {children}
    </div>
  )
}

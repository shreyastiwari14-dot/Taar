'use client'
import { useEffect, useRef, ReactNode } from 'react'

interface Props {
  children: ReactNode
  speed?: number
  className?: string
}

export function ParallaxText({ children, speed = 0.3, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    if (!el) return

    async function init() {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.to(el, {
        yPercent: -30 * speed * 10,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }

    init()

    return () => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach((st: any) => {
          if (st.trigger === el) st.kill()
        })
      })
    }
  }, [speed])

  return (
    <div ref={ref} className={className} data-animation="parallax-text" style={{ willChange: 'transform' }}>
      {children}
    </div>
  )
}

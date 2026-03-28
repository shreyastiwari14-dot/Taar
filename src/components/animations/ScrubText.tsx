'use client'
import { useEffect, useRef } from 'react'

interface Props {
  text: string
  className?: string
}

export function ScrubText({ text, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const container = ref.current
    if (!container) return

    async function init() {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const words = container!.querySelectorAll('[data-word]')
      const totalWords = words.length

      words.forEach((word, i) => {
        const startOffset = i / totalWords
        const endOffset = (i + 1) / totalWords

        gsap.fromTo(word,
          { opacity: 0.15 },
          {
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'top 70%',
              end: 'bottom 30%',
              scrub: true,
              onUpdate: (self) => {
                const progress = self.progress
                const wordProgress = Math.max(0, Math.min(1, (progress - startOffset) / (endOffset - startOffset)))
                ;(word as HTMLElement).style.opacity = String(0.15 + wordProgress * 0.85)
              },
            },
          }
        )
      })
    }

    init()

    return () => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach((st: any) => {
          if (st.trigger === container) st.kill()
        })
      })
    }
  }, [text])

  const words = text.split(' ')

  return (
    <div ref={ref} className={className} data-animation="scrub-text">
      {words.map((word, i) => (
        <span
          key={i}
          data-word
          style={{ opacity: 0.15, display: 'inline-block', marginRight: '0.25em', transition: 'none' }}
        >
          {word}
        </span>
      ))}
    </div>
  )
}

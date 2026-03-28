'use client'
import { useEffect, useRef, ReactNode } from 'react'

interface Props {
  from?: number
  to: number
  prefix?: string
  suffix?: string
  duration?: number
  children?: ReactNode
}

export function ScrollCounter({ from = 0, to, prefix = '', suffix = '', duration = 1.5, children }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const triggered = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true
          let startTime: number | null = null
          const step = (ts: number) => {
            if (!startTime) startTime = ts
            const progress = Math.min((ts - startTime) / (duration * 1000), 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            const value = Math.round(from + (to - from) * eased)
            if (el) el.textContent = `${prefix}${value}${suffix}`
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [from, to, prefix, suffix, duration])

  return (
    <span ref={ref} data-animation="scroll-counter">
      {children ?? `${prefix}${from}${suffix}`}
    </span>
  )
}

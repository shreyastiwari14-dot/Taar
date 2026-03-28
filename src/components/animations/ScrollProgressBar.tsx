'use client'
import { useEffect, useRef } from 'react'

export function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return
    let ticking = false

    function update() {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      if (bar) bar.style.width = `${progress}%`
      ticking = false
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      style={{
        position: 'fixed', top: 0, left: 0, width: '0%', height: '2px',
        background: '#E8593C', zIndex: 99999, transition: 'none',
        willChange: 'width',
      }}
      ref={barRef}
      aria-hidden="true"
    />
  )
}

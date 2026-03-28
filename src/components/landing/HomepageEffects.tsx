'use client'

import { useEffect, useState } from 'react'

export function HomepageEffects() {
  const [pastHero, setPastHero] = useState(false)

  useEffect(() => {
    const bar = document.getElementById('taar-scroll-bar') as HTMLElement | null

    const handleScroll = () => {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      if (bar && total > 0) bar.style.width = `${(scrolled / total) * 100}%`
      setPastHero(scrolled > window.innerHeight)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Scroll progress bar */}
      <div
        id="taar-scroll-bar"
        style={{
          position: 'fixed', top: 0, left: 0, height: '2px',
          background: '#E8593C', zIndex: 9999, width: '0%',
          transition: 'width 0.1s linear', pointerEvents: 'none',
        }}
      />

      {/* Mobile sticky CTA — appears after scrolling past hero */}
      {pastHero && (
        <a
          href="/login"
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex items-center justify-center bg-[#E8593C] text-white tracking-widest text-sm py-4"
          style={{
            fontFamily: 'Bebas Neue, sans-serif',
            paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
          }}
        >
          START FREE — NO CARD NEEDED →
        </a>
      )}
    </>
  )
}

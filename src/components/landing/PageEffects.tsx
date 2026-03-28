'use client'

import { useEffect, useState } from 'react'

export function PageEffects() {
  const [pastHero, setPastHero] = useState(false)

  useEffect(() => {
    const bar = document.getElementById('sp') as HTMLElement | null

    // Reveal observer — reads data-delay for stagger
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            el.style.transitionDelay = `${el.dataset.delay || '0'}ms`
            el.classList.add('in-view')
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.15 }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))

    const handleScroll = () => {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight

      if (bar && total > 0) bar.style.width = `${(scrolled / total) * 100}%`

      const nav = document.querySelector('nav')
      if (nav) nav.classList.toggle('nav-scrolled', scrolled > 80)

      setPastHero(scrolled > window.innerHeight)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div
        id="sp"
        style={{
          position: 'fixed', top: 0, left: 0, height: '2px',
          background: '#E8593C', zIndex: 9999, width: '0',
          transition: 'width 0.1s linear', pointerEvents: 'none',
        }}
      />
      {pastHero && (
        <a
          href="/login"
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex items-center justify-center bg-[#E8593C] text-white text-sm"
          style={{
            fontFamily: 'Bebas Neue, sans-serif',
            letterSpacing: '0.15em',
            paddingTop: 16,
            paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
          }}
        >
          START FREE — NO CARD NEEDED →
        </a>
      )}
    </>
  )
}

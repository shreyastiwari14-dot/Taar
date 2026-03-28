'use client'

import { useEffect, useRef } from 'react'

export function LandingAnimations() {
  const threadRef = useRef<HTMLDivElement>(null)
  const gsapRef = useRef<any>(null)
  const STRef = useRef<any>(null)
  const tickerFnRef = useRef<((t: number) => void) | null>(null)

  useEffect(() => {
    let cancelled = false

    const init = async () => {
      const [gsapMod, stMod] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      if (cancelled) return

      const gsap = gsapMod.gsap
      gsapRef.current = gsap
      const { ScrollTrigger } = stMod
      STRef.current = ScrollTrigger

      gsap.registerPlugin(ScrollTrigger)

      // ── GPU promote all animated elements ────────────────────
      // This prevents jitter by keeping transforms on compositor thread
      gsap.set([
        '#hero-title', '#hero-badge', '#hero-bottom',
        '#statement-headline', '.feature-row',
        '[data-hero-word]', '[data-cta-word]',
      ], { force3D: true, willChange: 'transform' })

      // ── Thread progress ────────────────────────────────────────
      const thread = threadRef.current
      if (thread) {
        gsap.set(thread, { scaleY: 0, transformOrigin: 'top center', force3D: true })
        gsap.to(thread, {
          scaleY: 1, ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top', end: 'bottom bottom',
            scrub: 0.4,
          },
        })
      }

      // ── Scroll velocity for reactive feel ────────────────────
      // Sections tilt slightly based on scroll velocity
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const vel = self.getVelocity()
          const skew = Math.min(Math.abs(vel) / 2000, 3) * (vel > 0 ? -1 : 1)
          gsap.to('.feature-row', {
            skewY: skew,
            duration: 0.6,
            ease: 'power3.out',
            overwrite: 'auto',
          })
        },
      })

      // ── Parallax — Hero layers ────────────────────────────────
      const heroST = { trigger: '#hero-section', start: 'top top', end: 'bottom top', scrub: true }

      const heroTitle = document.getElementById('hero-title')
      if (heroTitle) gsap.to(heroTitle, { y: -180, ease: 'none', scrollTrigger: heroST })

      const heroBadge = document.getElementById('hero-badge')
      if (heroBadge) gsap.to(heroBadge, { y: -70, opacity: 0, ease: 'none', scrollTrigger: heroST })

      const heroBottom = document.getElementById('hero-bottom')
      if (heroBottom) gsap.to(heroBottom, { y: -50, opacity: 0.3, ease: 'none', scrollTrigger: heroST })

      // ── Parallax — Statement ──────────────────────────────────
      const statHeadline = document.getElementById('statement-headline')
      if (statHeadline) {
        gsap.fromTo(statHeadline, { y: 80 }, {
          y: -60, ease: 'none',
          scrollTrigger: { trigger: '#statement-section', start: 'top bottom', end: 'bottom top', scrub: true },
        })
      }

      // ── Parallax — section bg numbers ────────────────────────
      document.querySelectorAll('.section-num').forEach((el) => {
        gsap.fromTo(el, { y: 40 }, {
          y: -40, ease: 'none',
          scrollTrigger: { trigger: el.closest('section') || el, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })

      // ── Hero headline — on load ───────────────────────────────
      document.querySelectorAll('[data-hero-word]').forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 60, rotationX: 10 },
          { opacity: 1, y: 0, rotationX: 0, duration: 1.2, ease: 'expo.out', delay: 0.1 + i * 0.18, force3D: true }
        )
      })

      // ── Helper: reactive entry animation ─────────────────────
      // toggleActions: play reverse play reverse = reactive backscroll
      const reactiveIn = (
        el: Element,
        from: gsap.TweenVars,
        to: gsap.TweenVars,
        start = 'top 87%'
      ) => {
        gsap.fromTo(el, from, {
          ...to,
          scrollTrigger: {
            trigger: el, start, end: 'bottom 20%',
            toggleActions: 'play reverse play reverse',
          },
        })
      }

      // ── Feature rows — reactive ───────────────────────────────
      document.querySelectorAll('.feature-row').forEach((el, i) => {
        reactiveIn(el,
          { opacity: 0, y: 40, x: i % 2 === 0 ? -20 : 20 },
          { opacity: 1, y: 0, x: 0, duration: 0.75, ease: 'power3.out', delay: 0, force3D: true }
        )
      })

      // ── Template cards — reactive ─────────────────────────────
      document.querySelectorAll('.template-card').forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 32, scale: 0.93 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out',
            delay: (i % 6) * 0.065, force3D: true,
            scrollTrigger: { trigger: el, start: 'top 93%', toggleActions: 'play reverse play reverse' },
          }
        )
      })

      // ── Section headings — reactive slide ────────────────────
      document.querySelectorAll('[data-anim-heading]').forEach((el) => {
        reactiveIn(el,
          { opacity: 0, x: -70 },
          { opacity: 1, x: 0, duration: 0.95, ease: 'power4.out' },
          'top 83%'
        )
      })

      // ── Compare table rows — reactive wipe ───────────────────
      document.querySelectorAll('.compare-row').forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
          {
            opacity: 1, clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'power2.out',
            delay: i * 0.04,
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play reverse play reverse' },
          }
        )
      })

      // ── Pricing cards — reactive from sides ───────────────────
      const freeCard = document.getElementById('pricing-free')
      const proCard = document.getElementById('pricing-pro')
      if (freeCard) {
        reactiveIn(freeCard, { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' }, 'top 82%')
      }
      if (proCard) {
        reactiveIn(proCard, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' }, 'top 82%')
      }

      // ── Why cards — reactive ──────────────────────────────────
      document.querySelectorAll('.why-card').forEach((el, i) => {
        reactiveIn(el,
          { opacity: 0, y: 28, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'power3.out', delay: i * 0.08 }
        )
      })

      // ── Audience cards — reactive ─────────────────────────────
      document.querySelectorAll('.audience-card').forEach((el, i) => {
        reactiveIn(el,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: (i % 2) * 0.1 }
        )
      })

      // ── CTA words — reactive stagger ─────────────────────────
      document.querySelectorAll('[data-cta-word]').forEach((el, i) => {
        reactiveIn(el,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', delay: i * 0.1 },
          'top 90%'
        )
      })

      // ── Tape strip marquee — speed up on fast scroll ─────────
      const tape = document.querySelector('.animate-marquee') as HTMLElement
      if (tape) {
        ScrollTrigger.create({
          trigger: document.body, start: 'top top', end: 'bottom bottom',
          onUpdate: (self) => {
            const speed = 28 - Math.min(Math.abs(self.getVelocity()) / 500, 20)
            tape.style.animationDuration = `${speed}s`
          },
        })
      }
    }

    init().catch(() => { /* animation init failed — non-fatal */ })

    return () => {
      cancelled = true
      if (tickerFnRef.current && gsapRef.current) gsapRef.current.ticker.remove(tickerFnRef.current)
      if (STRef.current) STRef.current.getAll().forEach((st: any) => st.kill())
    }
  }, [])

  // ── IntersectionObserver for .reveal elements + nav scroll ──────────────
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target) }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal').forEach(el => io.observe(el))

    const onScroll = () => {
      const nav = document.querySelector('nav')
      if (nav) nav.classList.toggle('scrolled', window.scrollY > 60)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    /* Scroll progress thread */
    <div
      ref={threadRef}
      className="hidden md:block"
      style={{
        position: 'fixed', left: 14, top: 0, width: 1, height: '100vh',
        background: 'linear-gradient(to bottom, transparent 0%, #E8593C 10%, #E8593C 90%, transparent 100%)',
        transformOrigin: 'top center', zIndex: 100, pointerEvents: 'none', willChange: 'transform',
      }}
    />
  )
}

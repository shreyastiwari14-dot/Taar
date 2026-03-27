'use client'
import { useEffect } from 'react'

/**
 * Scroll-driven page-turn effect between major sections.
 * As you scroll into a section transition, a new "page" sweeps in
 * from the right with a diagonal leading edge (realistic paper curl).
 *
 * Uses GSAP timeline + scrub for smooth interpolation.
 * Fold shadow is baked into the overlay background gradient.
 */

export function PageTurnEffect() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    async function init() {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      // Wait for layout to settle
      await new Promise<void>((r) => requestAnimationFrame(() => r()))

      const transitions: {
        triggerId?: string
        triggerSelector?: string
        color: string
        shadowColor: string
        start: string
        end: string
      }[] = [
        {
          triggerId: 'statement-section',
          // Cream page sweeps in over dark hero
          color: '#F2EDE6',
          shadowColor: 'rgba(0,0,0,0.22)',
          start: 'top 85%',
          end: 'top 10%',
        },
        {
          triggerSelector: '[aria-label="Features"]',
          // Dark page sweeps in over cream statement
          color: '#060606',
          shadowColor: 'rgba(255,255,255,0.06)',
          start: 'top 85%',
          end: 'top 10%',
        },
      ]

      const created: Array<{ tl: gsap.core.Timeline; st: ScrollTrigger; el: HTMLElement }> = []

      for (const t of transitions) {
        const triggerEl = t.triggerId
          ? document.getElementById(t.triggerId)
          : document.querySelector(t.triggerSelector!)
        if (!triggerEl) continue

        /*
         * Overlay background: solid color PLUS a 60px fold-shadow gradient
         * baked at x=0 (left edge). Since the clip-path reveals from left→right
         * as the page turns, the first 60px of the visible area IS the fold edge.
         * No separate child element needed — can't get clipped away.
         */
        const overlay = document.createElement('div')
        overlay.setAttribute('data-page-turn', '1')
        overlay.style.cssText = `
          position: fixed;
          inset: 0;
          z-index: 500;
          pointer-events: none;
          background: linear-gradient(to right, ${t.shadowColor} 0px, ${t.color} 60px);
          will-change: clip-path, opacity;
        `
        document.body.appendChild(overlay)

        /*
         * Timeline phases:
         *   0 → 0.75  page sweeps in (diagonal polygon)
         *   0.75 → 1  overlay fades out (section's own bg takes over)
         *
         * Diagonal: top corner leads (topX < botX), so the top-right corner
         * of the page arrives first — exactly like turning a book page.
         *
         * At progress=0:   polygon is off-screen right  → invisible
         * At progress=0.75: polygon covers full viewport → fully revealed
         * At progress=1:   opacity 0                    → section bg shows
         */
        const tl = gsap.timeline({ paused: true })
        tl
          .fromTo(
            overlay,
            {
              // Start: diagonal off to the right (top corner at 105%, bottom at 115%)
              clipPath: 'polygon(105% 0%, 115% 100%, 100% 100%, 100% 0%)',
              opacity: 1,
            },
            {
              // End of sweep: diagonal past the left edge (covers full viewport)
              clipPath: 'polygon(-5% 0%, 5% 100%, 100% 100%, 100% 0%)',
              opacity: 1,
              ease: 'none',
              duration: 0.75,
            },
          )
          // Fade out so section's own background takes over seamlessly
          .to(overlay, {
            opacity: 0,
            duration: 0.25,
            ease: 'power2.inOut',
          })

        const st = ScrollTrigger.create({
          trigger: triggerEl,
          start: t.start,
          end: t.end,
          scrub: 1.5,
          animation: tl,
        })

        created.push({ tl, st, el: overlay })
      }

      return () => {
        created.forEach(({ tl, st, el }) => {
          tl.kill()
          st.kill()
          el.remove()
        })
      }
    }

    let cleanup: (() => void) | undefined
    init().then((fn) => {
      cleanup = fn
    })

    return () => {
      cleanup?.()
    }
  }, [])

  return null
}

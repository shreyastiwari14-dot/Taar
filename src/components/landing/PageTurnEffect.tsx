'use client'
import { useEffect } from 'react'

/**
 * Scroll-driven page-turn wave effect between high-contrast sections.
 *
 * Architecture:
 * - Wave overlay: z-index 2 (above outgoing section at auto/0, below incoming at 3)
 * - During each transition, the INCOMING section is raised to z-index 3 so its
 *   content (text, images) is always visible ABOVE the sweeping wave.
 * - The wave carries the INCOMING section's background color, so the sweep reveals
 *   the correct background/text contrast.
 * - The incoming section's own background matches the wave color → seamless join.
 */

interface Transition {
  incomingSelector: string
  color: string           // incoming section's background color
  shadowColor: string     // fold shadow at the leading edge
}

const TRANSITIONS: Transition[] = [
  {
    // Dark hero/why → cream statement
    incomingSelector: '#statement-section',
    color: '#F2EDE6',
    shadowColor: 'rgba(0,0,0,0.12)',
  },
  {
    // Cream statement → dark features
    incomingSelector: '[aria-label="Features"]',
    color: '#060606',
    shadowColor: 'rgba(255,255,255,0.04)',
  },
]

export function PageTurnEffect() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    async function init() {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      // Let layout settle
      await new Promise<void>((r) => requestAnimationFrame(() => r()))

      const created: Array<{
        tl: gsap.core.Timeline
        st: ScrollTrigger
        el: HTMLElement
      }> = []

      for (const t of TRANSITIONS) {
        const incomingEl = document.querySelector<HTMLElement>(t.incomingSelector)
        if (!incomingEl) continue

        // ── Wave overlay ─────────────────────────────────────────────────────
        // z-index: 2 — above outgoing section (auto/0), below incoming section (3)
        // Fold shadow baked into background gradient at x=0 (the leading edge).
        const overlay = document.createElement('div')
        overlay.setAttribute('data-page-turn', '1')
        overlay.style.cssText = `
          position: fixed;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background: linear-gradient(
            to right,
            ${t.shadowColor} 0px,
            ${t.color} 60px
          );
          will-change: clip-path, opacity;
        `
        document.body.appendChild(overlay)

        // ── Raise/lower incoming section ─────────────────────────────────────
        // Raising to z-index 3 makes its background + content paint above the wave.
        // The incoming section's bg color === wave color → seamless at the join.
        const raise = () => {
          incomingEl.style.zIndex = '3'
          // Ensure positioned (most sections already have `relative` in their className)
          if (getComputedStyle(incomingEl).position === 'static') {
            incomingEl.style.position = 'relative'
          }
        }
        const lower = () => {
          incomingEl.style.zIndex = ''
          incomingEl.style.position = ''
        }

        // ── GSAP timeline ────────────────────────────────────────────────────
        // Phase 0 → 0.75 : diagonal wave sweeps right→left (top corner leads)
        // Phase 0.75 → 1  : overlay fades out (incoming section bg takes over)
        const tl = gsap.timeline({ paused: true })
        tl
          .fromTo(
            overlay,
            { clipPath: 'polygon(105% 0%, 115% 100%, 100% 100%, 100% 0%)', opacity: 1 },
            { clipPath: 'polygon(-5% 0%, 5% 100%, 100% 100%, 100% 0%)', opacity: 1, ease: 'none', duration: 0.75 },
          )
          .to(overlay, { opacity: 0, duration: 0.25, ease: 'power2.inOut' })

        // ── ScrollTrigger ────────────────────────────────────────────────────
        const st = ScrollTrigger.create({
          trigger: incomingEl,
          start: 'top 85%',
          end: 'top 10%',
          scrub: 1.5,
          animation: tl,
          onEnter: raise,
          onLeave: lower,
          onEnterBack: raise,
          onLeaveBack: lower,
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
    init().then((fn) => { cleanup = fn })
    return () => { cleanup?.() }
  }, [])

  return null
}

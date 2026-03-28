'use client'
import { useEffect, useRef } from 'react'

// Decorative scattered motifs with their unique parallax speeds
const DECORATIVES = [
  { x: 40,  y: 60,  scale: 0.5, speed: 0.15 },
  { x: 340, y: 50,  scale: 0.4, speed: 0.40 },
  { x: 20,  y: 280, scale: 0.45, speed: 0.25 },
  { x: 360, y: 300, scale: 0.5, speed: 0.35 },
  { x: 150, y: 20,  scale: 0.35, speed: 0.10 },
  { x: 250, y: 370, scale: 0.4, speed: 0.50 },
]

export function ScrollCanvas() {
  const sectionRef    = useRef<HTMLDivElement>(null)
  const outerRingRef  = useRef<SVGGElement>(null)
  const innerManRef   = useRef<SVGGElement>(null)
  const threadRef     = useRef<SVGGElement>(null)
  const centerRef     = useRef<SVGGElement>(null)
  const textRef       = useRef<HTMLDivElement>(null)
  const bgRef         = useRef<HTMLDivElement>(null)
  const decRefs       = useRef<(SVGGElement | null)[]>([])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const isMobile = window.innerWidth < 768
    const isSmall  = window.innerWidth < 480

    // Store all ST instances so we can kill them on cleanup
    const triggers: { kill: () => void }[] = []

    async function init() {
      const { gsap }         = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const section = sectionRef.current
      if (!section) return

      // ── Main pinned timeline ──────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start:   'top top',
          end:     '+=300%',
          pin:     true,
          scrub:   1,
          anticipatePin: 1,
          markers: false,
          id: 'scroll-canvas-pin',
        },
      })
      if (tl.scrollTrigger) triggers.push(tl.scrollTrigger)

      // Outer ring rotation (disabled on < 480px to prevent motion sickness)
      if (!isSmall && outerRingRef.current) {
        tl.to(outerRingRef.current, {
          rotation: isMobile ? 180 : 360,
          transformOrigin: '200px 200px',
          ease: 'none',
        }, 0)
      }

      // Inner mandala counter-rotation
      if (!isSmall && innerManRef.current) {
        tl.to(innerManRef.current, {
          rotation: isMobile ? -90 : -180,
          transformOrigin: '200px 200px',
          ease: 'none',
        }, 0)
      }

      // Center mark opacity
      if (centerRef.current) {
        tl.to(centerRef.current, { opacity: 1, ease: 'none' }, 0)
      }

      // Thread links — staggered scale (each starts 15% later)
      if (threadRef.current) {
        Array.from(threadRef.current.children).forEach((el, i) => {
          tl.fromTo(
            el,
            { scale: 0.8, transformOrigin: '50% 50%' },
            { scale: 1.2, transformOrigin: '50% 50%', ease: 'none' },
            i * 0.15,
          )
        })
      }

      // Parallax text — moves upward at 0.3x scroll speed (like Oda Nobunaga text)
      if (textRef.current) {
        tl.fromTo(textRef.current,
          { y: '60vh' },
          { y: '-40vh', ease: 'none' },
          0,
        )
      }

      // Background color shift: #060606 → #1a0800 → #060606
      if (bgRef.current) {
        tl.to(bgRef.current, { backgroundColor: '#1a0800', ease: 'none', duration: 0.5 }, 0)
        tl.to(bgRef.current, { backgroundColor: '#060606', ease: 'none', duration: 0.5 }, 0.5)
      }

      // ── Decorative element parallax (each at unique speed) ──
      decRefs.current.forEach((el, i) => {
        if (!el) return
        const speed = DECORATIVES[i]?.speed ?? 0.2
        const st = ScrollTrigger.create({
          trigger: section,
          start:   'top top',
          end:     '+=300%',
          scrub:   1,
          markers: false,
          id:      `scroll-canvas-dec-${i}`,
          onUpdate(self) {
            const y = self.progress * -120 * speed
            gsap.set(el, { y, willChange: 'transform' })
          },
          onLeaveBack() {
            gsap.set(el, { y: 0 })
          },
        })
        triggers.push(st)
      })
    }

    init()

    // Cleanup: kill all ScrollTrigger instances we created
    return () => {
      triggers.forEach(t => t.kill())
    }
  }, [])

  return (
    <div
      ref={sectionRef}
      data-animation="scroll-canvas"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: '#060606',
      }}
      aria-hidden="true"
    >
      {/* Animated background layer */}
      <div
        ref={bgRef}
        style={{ position: 'absolute', inset: 0, background: '#060606' }}
      />

      {/* Giant parallax text — behind SVG (z-index 1) */}
      <div
        ref={textRef}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
          pointerEvents: 'none',
          userSelect: 'none',
          overflow: 'hidden',
        }}
      >
        <p style={{
          fontFamily: 'Bebas Neue, sans-serif',
          fontSize: 'clamp(12vw, 15vw, 180px)',
          color: 'rgba(255,255,255,0.04)',
          textAlign: 'center',
          lineHeight: 0.88,
          letterSpacing: '0.02em',
          whiteSpace: 'nowrap',
        }}>
          YOUR LINK.<br />YOUR UPI.<br />YOUR PAGE.
        </p>
      </div>

      {/* SVG Mandala — above text (z-index 2) */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
      }}>
        <svg
          viewBox="0 0 400 400"
          style={{
            width: 'clamp(280px, 40vw, 400px)',
            height: 'clamp(280px, 40vw, 400px)',
            overflow: 'visible',
          }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ── Outer Ring ─────────────────────────────────── */}
          <g ref={outerRingRef} id="outer-ring">
            <circle cx="200" cy="200" r="190" stroke="#E8593C" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.5" />
            <circle cx="200" cy="200" r="178" stroke="#E8593C" strokeWidth="0.5" opacity="0.25" />
            {Array.from({ length: 24 }).map((_, i) => {
              const angle = (i * 360) / 24
              const rad   = (angle * Math.PI) / 180
              const x1 = 200 + 172 * Math.cos(rad)
              const y1 = 200 + 172 * Math.sin(rad)
              const x2 = 200 + 190 * Math.cos(rad)
              const y2 = 200 + 190 * Math.sin(rad)
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#E8593C" strokeWidth="1" opacity="0.4" />
            })}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 360) / 12
              const rad   = (angle * Math.PI) / 180
              const cx = 200 + 184 * Math.cos(rad)
              const cy = 200 + 184 * Math.sin(rad)
              return <circle key={i} cx={cx} cy={cy} r="3" fill="#E8593C" opacity="0.6" />
            })}
            {/* Diamond accents at cardinal points */}
            {[0, 90, 180, 270].map((angle, i) => {
              const rad = (angle * Math.PI) / 180
              const cx = 200 + 190 * Math.cos(rad)
              const cy = 200 + 190 * Math.sin(rad)
              const s = 6
              return (
                <polygon
                  key={i}
                  points={`${cx},${cy - s} ${cx + s},${cy} ${cx},${cy + s} ${cx - s},${cy}`}
                  fill="#E8593C"
                  opacity="0.8"
                />
              )
            })}
          </g>

          {/* ── Inner Mandala ──────────────────────────────── */}
          <g ref={innerManRef} id="inner-mandala">
            <circle cx="200" cy="200" r="140" stroke="white" strokeWidth="0.75" opacity="0.1" />
            <circle cx="200" cy="200" r="110" stroke="#E8593C" strokeWidth="1" opacity="0.3" />
            <circle cx="200" cy="200" r="80" stroke="white" strokeWidth="0.5" opacity="0.15" />
            {/* 8 radial spokes */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * 360) / 8
              const rad   = (angle * Math.PI) / 180
              const ox = 200 + 140 * Math.cos(rad)
              const oy = 200 + 140 * Math.sin(rad)
              const ix = 200 + 80  * Math.cos(rad)
              const iy = 200 + 80  * Math.sin(rad)
              return <line key={i} x1={ox} y1={oy} x2={ix} y2={iy} stroke="white" strokeWidth="0.75" opacity="0.12" />
            })}
            {/* 8 triangle accents on inner ring */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = ((i * 360) / 8) + 22.5
              const rad   = (angle * Math.PI) / 180
              const cx = 200 + 110 * Math.cos(rad)
              const cy = 200 + 110 * Math.sin(rad)
              const s = 10
              return (
                <polygon
                  key={i}
                  points={`${cx},${cy - s} ${cx + s * 0.7},${cy + s * 0.7} ${cx - s * 0.7},${cy + s * 0.7}`}
                  fill="#E8593C"
                  opacity="0.45"
                />
              )
            })}
            {/* Rangoli-style petal ring between 80→110 */}
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = (i * 360) / 16
              const rad   = (angle * Math.PI) / 180
              const r1 = 82, r2 = 108
              const x1 = 200 + r1 * Math.cos(rad)
              const y1 = 200 + r1 * Math.sin(rad)
              const x2 = 200 + r2 * Math.cos(rad + 0.2)
              const y2 = 200 + r2 * Math.sin(rad + 0.2)
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#E8593C" strokeWidth="0.6" opacity="0.2" />
            })}
          </g>

          {/* ── Thread Links — 4 stylized chain shapes ────── */}
          <g ref={threadRef} id="thread-links">
            {([0, 90, 180, 270] as const).map((angle, i) => {
              const rad = (angle * Math.PI) / 180
              const cx  = 200 + 58 * Math.cos(rad)
              const cy  = 200 + 58 * Math.sin(rad)
              return (
                <g key={i}>
                  {/* Horizontal link */}
                  <rect
                    x={cx - 15} y={cy - 8}
                    width="30" height="16" rx="8"
                    stroke="#E8593C" strokeWidth="2.5"
                    fill="#060606"
                    transform={`rotate(${angle}, ${cx}, ${cy})`}
                  />
                  {/* Vertical link (chain interlocked) */}
                  <rect
                    x={cx - 8} y={cy - 15}
                    width="16" height="30" rx="8"
                    stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"
                    fill="none"
                    transform={`rotate(${angle}, ${cx}, ${cy})`}
                  />
                  {/* Connector dot */}
                  <circle cx={cx} cy={cy} r="3" fill="#E8593C" opacity="0.7" />
                </g>
              )
            })}
          </g>

          {/* ── Center Mark ────────────────────────────────── */}
          <g ref={centerRef} id="center-mark" style={{ opacity: 0.4 }}>
            {/* Outer glow ring */}
            <circle cx="200" cy="200" r="32" stroke="#E8593C" strokeWidth="1" opacity="0.3" />
            {/* Main circle */}
            <circle cx="200" cy="200" r="26" fill="#0a0a0a" stroke="#E8593C" strokeWidth="2" />
            {/* Orange fill */}
            <circle cx="200" cy="200" r="18" fill="#E8593C" opacity="0.95" />
            {/* T mark */}
            <text
              x="200" y="208"
              textAnchor="middle"
              style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '18px', fill: 'white', letterSpacing: '2px' }}
            >T</text>
          </g>

          {/* ── Decorative scattered thread-link motifs ──── */}
          {DECORATIVES.map(({ x, y, scale }, i) => (
            <g
              key={i}
              ref={el => { decRefs.current[i] = el }}
              transform={`translate(${x}, ${y}) scale(${scale})`}
              aria-hidden="true"
              opacity="0.25"
            >
              <rect x="-15" y="-8"  width="30" height="16" rx="8" stroke="#E8593C" strokeWidth="2" fill="none" />
              <rect x="-8"  y="-15" width="16" height="30" rx="8" stroke="white"   strokeWidth="1.5" fill="none" opacity="0.5" />
              <circle cx="0" cy="0" r="2.5" fill="#E8593C" opacity="0.6" />
            </g>
          ))}
        </svg>
      </div>
    </div>
  )
}

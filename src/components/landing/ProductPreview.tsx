'use client'
import { useEffect, useRef } from 'react'

export function ProductPreview() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('product-preview-visible')
            observer.disconnect()
          }
        })
      },
      { threshold: 0.3 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-[#0A0A0A] py-20 px-6">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <div
          ref={ref}
          className="product-preview relative flex flex-col items-center"
          style={{ opacity: 0, transform: 'translateY(40px)' }}
        >
          {/* Phone frame */}
          <div className="relative" style={{ width: 220 }}>

            {/* Left stat pill — desktop only */}
            <div
              className="stat-pill-float hidden md:absolute"
              style={{
                left: -180,
                top: '40%',
                background: '#111111',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 10,
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#E8593C', flexShrink: 0, display: 'inline-block' }} />
              <span style={{ color: 'white', fontFamily: 'DM Sans, sans-serif', fontSize: 13 }}>
                ↗ 2,847 clicks this week
              </span>
            </div>

            {/* Phone */}
            <div
              style={{
                width: 220,
                aspectRatio: '9 / 18',
                borderRadius: 32,
                background: 'linear-gradient(160deg,#FF6500,#c8500a)',
                border: '1.5px solid rgba(255,255,255,0.15)',
                boxShadow: '0 40px 80px rgba(0,0,0,0.7)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                padding: '24px 16px',
              }}
            >
              {/* Profile circle */}
              <div style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: 'rgba(255,215,0,0.22)',
                border: '1.5px solid rgba(255,215,0,0.55)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFD700',
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 700,
                fontSize: 18,
              }}>
                P
              </div>
              {/* Name */}
              <p style={{
                color: 'white',
                fontFamily: 'Raleway, sans-serif',
                fontWeight: 600,
                fontSize: 15,
                margin: 0,
              }}>
                Priya Sharma
              </p>
              {/* Tag pill */}
              <span style={{
                background: 'rgba(255,215,0,0.22)',
                color: '#FFD700',
                fontFamily: 'monospace',
                fontSize: 10,
                padding: '3px 10px',
                borderRadius: 99,
                letterSpacing: '0.1em',
              }}>
                Vibrant
              </span>
              {/* Link placeholder bars */}
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  style={{
                    width: '100%',
                    height: 32,
                    borderRadius: 8,
                    background: '#FFD700',
                    opacity: 0.25,
                  }}
                />
              ))}
            </div>

            {/* Right stat pill — desktop only */}
            <div
              className="stat-pill-float hidden md:absolute"
              style={{
                right: -180,
                top: '60%',
                background: '#111111',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 10,
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#E8593C', flexShrink: 0, display: 'inline-block' }} />
              <span style={{ color: 'white', fontFamily: 'DM Sans, sans-serif', fontSize: 13 }}>
                ₹12,400 received via UPI
              </span>
            </div>
          </div>

          {/* Caption */}
          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 14,
            textAlign: 'center',
            marginTop: 24,
          }}>
            This is what your Taar page looks like.
          </p>
        </div>
      </div>
    </section>
  )
}

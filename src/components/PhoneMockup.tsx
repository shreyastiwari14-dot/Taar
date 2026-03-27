'use client'

import { useEffect, useRef } from 'react'

type PhoneState = 'default' | 'upi' | 'reels' | 'analytics' | 'products'

interface Props {
  state: PhoneState
}

function StateLayer({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      opacity: active ? 1 : 0,
      transition: 'opacity 0.22s ease',
      padding: '52px 18px 28px',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      gap: 8, overflow: 'hidden',
    }}>
      {children}
    </div>
  )
}

// Shared bio header for default/upi states
function BioHeader({ dimmed }: { dimmed?: boolean }) {
  return (
    <>
      <div style={{ width: 46, height: 46, borderRadius: '50%', flexShrink: 0,
        background: 'linear-gradient(135deg, #E8593C 0%, #F5C842 100%)',
        boxShadow: '0 4px 16px rgba(232,89,60,0.35)',
        opacity: dimmed ? 0.5 : 1, transition: 'opacity 0.22s' }} />
      <div style={{ textAlign: 'center', opacity: dimmed ? 0.5 : 1, transition: 'opacity 0.22s' }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 14, letterSpacing: 3,
          color: '#F5C842', lineHeight: 1 }}>PRIYA SHARMA</div>
        <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>Mumbai · Creator · Chef</div>
      </div>
    </>
  )
}

function DefaultState() {
  return (
    <>
      <BioHeader />
      {[
        { label: 'Pay me via UPI ₹', gold: true },
        { label: 'My Recipe eBook', gold: false },
        { label: 'YouTube Channel', gold: false },
        { label: 'Join Telegram', gold: false },
      ].map((link) => (
        <div key={link.label} style={{
          width: '100%', padding: '7px 10px', textAlign: 'center',
          fontSize: 8, fontWeight: 700, letterSpacing: 0.5,
          color: link.gold ? '#F5C842' : 'rgba(255,255,255,0.55)',
          background: 'transparent',
          border: `1px solid ${link.gold ? '#F5C84255' : 'rgba(255,255,255,0.1)'}`,
        }}>
          {link.label}
        </div>
      ))}
      <div style={{ marginTop: 'auto', fontSize: 7, color: 'rgba(255,255,255,0.12)',
        letterSpacing: 2, fontFamily: "'Bebas Neue', sans-serif" }}>TAAR</div>
    </>
  )
}

function UpiState() {
  const upiRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = upiRef.current
    if (!el) return
    let forward = true
    const interval = setInterval(() => {
      el.style.boxShadow = forward
        ? '0 0 18px rgba(232,89,60,0.7), 0 0 36px rgba(232,89,60,0.35)'
        : '0 0 6px rgba(232,89,60,0.3)'
      forward = !forward
    }, 700)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <BioHeader dimmed />
      {/* UPI link highlighted */}
      <div ref={upiRef} style={{
        width: '100%', padding: '9px 10px', textAlign: 'center',
        fontSize: 9, fontWeight: 700, letterSpacing: 0.8,
        color: '#fff', background: '#E8593C',
        transition: 'box-shadow 0.7s ease',
      }}>
        Pay me via UPI ₹
      </div>
      {/* Payment methods */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
        {['GPay', 'PhonePe', 'Paytm'].map((m) => (
          <div key={m} style={{ fontSize: 7, color: 'rgba(255,255,255,0.4)',
            padding: '2px 5px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 2 }}>
            {m}
          </div>
        ))}
      </div>
      {['My Recipe eBook', 'YouTube Channel', 'Join Telegram'].map((label) => (
        <div key={label} style={{
          width: '100%', padding: '7px 10px', textAlign: 'center',
          fontSize: 8, color: 'rgba(255,255,255,0.2)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          {label}
        </div>
      ))}
      <div style={{ marginTop: 'auto', fontSize: 7, color: 'rgba(255,255,255,0.12)',
        letterSpacing: 2, fontFamily: "'Bebas Neue', sans-serif" }}>TAAR</div>
    </>
  )
}

function ReelsState() {
  return (
    <>
      <BioHeader />
      {/* Reels shelf */}
      <div style={{ width: '100%', marginTop: 4 }}>
        <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.3)', letterSpacing: 2,
          textTransform: 'uppercase', marginBottom: 6 }}>Latest Reels — auto updated</div>
        <div style={{ display: 'flex', gap: 5 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{
              flex: 1, aspectRatio: '9/16', maxHeight: 120,
              background: `rgba(232,89,60,${0.08 + i * 0.03})`,
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Shimmer */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)',
                animation: `shimmer ${1.5 + i * 0.3}s ease-in-out infinite`,
              }} />
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', zIndex: 1 }}>▶</div>
            </div>
          ))}
        </div>
      </div>
      {['My Recipe eBook', 'YouTube Channel'].map((label) => (
        <div key={label} style={{
          width: '100%', padding: '7px 10px', textAlign: 'center',
          fontSize: 8, color: 'rgba(255,255,255,0.55)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}>
          {label}
        </div>
      ))}
      <div style={{ marginTop: 'auto', fontSize: 7, color: 'rgba(255,255,255,0.12)',
        letterSpacing: 2, fontFamily: "'Bebas Neue', sans-serif" }}>TAAR</div>
    </>
  )
}

const ANALYTICS_BARS = [42, 68, 55, 80, 90, 62, 75]

function AnalyticsState() {
  const barsRef = useRef<HTMLDivElement[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const heights = barsRef.current
    heights.forEach((el) => { if (el) el.style.height = '0%' })
    const timeout = setTimeout(() => {
      heights.forEach((el, i) => {
        if (el) setTimeout(() => { el.style.height = `${ANALYTICS_BARS[i]}%` }, i * 60)
      })
    }, 50)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 10, padding: '52px 18px 28px' }} ref={containerRef}>
      <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.3)', letterSpacing: 2, textTransform: 'uppercase' }}>This week</div>
      {/* Bar chart */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 80 }}>
        {ANALYTICS_BARS.map((h, i) => (
          <div key={i} style={{ flex: 1, height: '100%', display: 'flex', alignItems: 'flex-end' }}>
            <div
              ref={(el) => { if (el) barsRef.current[i] = el }}
              style={{
                width: '100%', background: '#E8593C', borderRadius: '1px 1px 0 0',
                height: '0%', transition: `height 0.5s cubic-bezier(0.34,1.56,0.64,1)`,
              }}
            />
          </div>
        ))}
      </div>
      {/* Days */}
      <div style={{ display: 'flex', gap: 4 }}>
        {['M','T','W','T','F','S','S'].map((d, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: 6, color: 'rgba(255,255,255,0.2)' }}>{d}</div>
        ))}
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 8 }}>
        <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.2)', marginBottom: 4, letterSpacing: 1, textTransform: 'uppercase' }}>Top links</div>
        {[
          { label: 'UPI Link', clicks: 142 },
          { label: 'Recipe eBook', clicks: 89 },
          { label: 'YouTube', clicks: 54 },
        ].map((item) => (
          <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
            <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.45)' }}>{item.label}</div>
            <div style={{ fontSize: 8, color: '#E8593C', fontWeight: 700 }}>{item.clicks}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 'auto', fontSize: 7, color: 'rgba(255,255,255,0.12)', letterSpacing: 2, fontFamily: "'Bebas Neue', sans-serif", textAlign: 'center' }}>TAAR</div>
    </div>
  )
}

function ProductsState() {
  return (
    <>
      <BioHeader dimmed />
      {/* Product card */}
      <div style={{
        width: '100%', borderRadius: 6, overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(255,255,255,0.04)',
      }}>
        {/* Thumbnail */}
        <div style={{
          height: 64, width: '100%',
          background: 'linear-gradient(135deg, rgba(232,89,60,0.3) 0%, rgba(245,200,66,0.2) 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ fontSize: 18 }}>📗</div>
        </div>
        <div style={{ padding: '8px 10px' }}>
          <div style={{ fontSize: 8, fontWeight: 700, color: 'rgba(255,255,255,0.8)', marginBottom: 2 }}>
            Mumbai Street Food PDF
          </div>
          <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.3)', marginBottom: 6 }}>
            Sold 24 copies
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#E8593C', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 1 }}>₹299</div>
            <div style={{
              fontSize: 7, padding: '4px 8px', background: '#E8593C',
              color: '#fff', fontWeight: 700, letterSpacing: 0.5,
            }}>Buy Now</div>
          </div>
        </div>
      </div>
      {['YouTube Channel', 'Join Telegram'].map((label) => (
        <div key={label} style={{
          width: '100%', padding: '7px 10px', textAlign: 'center',
          fontSize: 8, color: 'rgba(255,255,255,0.3)',
          border: '1px solid rgba(255,255,255,0.07)',
        }}>
          {label}
        </div>
      ))}
      <div style={{ marginTop: 'auto', fontSize: 7, color: 'rgba(255,255,255,0.12)',
        letterSpacing: 2, fontFamily: "'Bebas Neue', sans-serif" }}>TAAR</div>
    </>
  )
}

export default function PhoneMockup({ state }: Props) {
  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
      `}</style>
      <div style={{
        width: 220, height: 440,
        borderRadius: 38,
        background: '#080808',
        border: '1.5px solid rgba(255,255,255,0.1)',
        boxShadow: '0 40px 100px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.04), inset 0 0 0 1px rgba(255,255,255,0.04)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Notch */}
        <div style={{
          position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)',
          width: 56, height: 7, borderRadius: 4, background: '#111', zIndex: 10,
        }} />
        {/* Home indicator */}
        <div style={{
          position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)',
          width: 72, height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.18)', zIndex: 10,
        }} />

        {/* Subtle inner bg */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(160deg, #100010 0%, #0A0A1A 50%, #050505 100%)',
        }} />
        {/* Ambient glow */}
        <div style={{
          position: 'absolute', top: -30, left: '50%', transform: 'translateX(-50%)',
          width: 180, height: 180, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,89,60,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* States */}
        {state !== 'analytics' && (
          <>
            <StateLayer active={state === 'default'}><DefaultState /></StateLayer>
            <StateLayer active={state === 'upi'}><UpiState /></StateLayer>
            <StateLayer active={state === 'reels'}><ReelsState /></StateLayer>
            <StateLayer active={state === 'products'}><ProductsState /></StateLayer>
          </>
        )}
        {state === 'analytics' && (
          <div style={{ position: 'absolute', inset: 0, opacity: 1, transition: 'opacity 0.22s' }}>
            <AnalyticsState />
          </div>
        )}
      </div>
      {/* Label */}
      <div style={{ textAlign: 'center', marginTop: 10 }}>
        <a href="/demo" target="_blank" rel="noopener" style={{
          fontSize: 9, color: 'rgba(255,255,255,0.2)', letterSpacing: 3,
          textTransform: 'uppercase', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif',
        }}>
          See live example ↗
        </a>
      </div>
    </>
  )
}

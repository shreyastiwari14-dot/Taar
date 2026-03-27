import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Taar — Free Link in Bio for Indian Creators'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#060606',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Grid background */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />

        {/* Orange left accent line */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: 6, background: '#E8593C',
        }} />

        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
          <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: 8, color: '#fff', textTransform: 'uppercase' }}>
            TAAR
          </div>
          <div style={{
            fontSize: 11, color: 'rgba(255,255,255,0.3)',
            letterSpacing: 3, textTransform: 'uppercase',
          }}>
            EST. 2024 · MADE IN INDIA 🇮🇳
          </div>
        </div>

        {/* Main headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, position: 'relative' }}>
          <div style={{ fontSize: 96, fontWeight: 900, color: '#fff', lineHeight: 0.85, letterSpacing: -2, textTransform: 'uppercase' }}>
            YOUR
          </div>
          <div style={{ fontSize: 96, fontWeight: 900, color: 'transparent', lineHeight: 0.85, letterSpacing: -2, textTransform: 'uppercase', WebkitTextStroke: '1.5px rgba(255,255,255,0.2)' }}>
            THREAD
          </div>
          <div style={{ fontSize: 96, fontWeight: 900, color: '#E8593C', lineHeight: 0.85, letterSpacing: -2, textTransform: 'uppercase' }}>
            TO ALL.
          </div>
        </div>

        {/* Bottom row — feature pills + CTA */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', position: 'relative' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', letterSpacing: 2, textTransform: 'uppercase' }}>
              Free link in bio for Indian creators
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {['UPI Payment Links', 'Instagram Reels', '50 Templates', 'Sell Products', '₹0 to start'].map((f) => (
                <div key={f} style={{
                  fontSize: 11, color: '#E8593C', padding: '6px 14px',
                  border: '1px solid rgba(232,89,60,0.35)',
                  background: 'rgba(232,89,60,0.08)',
                  letterSpacing: 1, textTransform: 'uppercase',
                }}>
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Mini phone mockup */}
          <div style={{
            width: 120, height: 220, borderRadius: 20,
            border: '2px solid rgba(255,255,255,0.12)',
            background: 'linear-gradient(160deg, #1a0010, #0A0020)',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            padding: '20px 14px 14px', gap: 8,
          }}>
            <div style={{ width: 28, height: 28, borderRadius: 14, background: 'linear-gradient(135deg, #E8593C, #F5C842)' }} />
            <div style={{ fontSize: 8, color: '#fff', letterSpacing: 2 }}>CREATOR</div>
            {['#E8593C', 'rgba(255,255,255,0.1)', 'rgba(255,255,255,0.1)'].map((bg, i) => (
              <div key={i} style={{ width: '100%', height: 20, borderRadius: 5, background: bg }} />
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'

const DEMO_URL = 'https://taar.bio/priya'
const WA_URL = `https://wa.me/?text=Check%20out%20my%20page%3A%20${encodeURIComponent(DEMO_URL)}`

const LINKS = [
  { icon: '📸', label: 'Instagram', href: '#' },
  { icon: '▶️', label: 'YouTube', href: '#' },
  { icon: '₹', label: 'Support me via UPI', href: '#' },
  { icon: '🛒', label: 'My Preset Pack — ₹599', href: '#' },
]

export function DemoPageClient() {
  const [copied, setCopied] = useState(false)

  async function copyLink() {
    await navigator.clipboard.writeText(DEMO_URL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ background: '#060606', minHeight: '100vh' }}>
      {/* Nav */}
      <nav className="border-b border-white/[0.06] h-14 flex items-center px-6">
        <Link href="/" className="text-white text-xl tracking-[0.15em] hover:text-[#E8593C] transition-colors" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>TAAR</Link>
      </nav>

      <div className="flex flex-col items-center py-12 px-4">
        {/* Phone frame */}
        <div style={{ width: 300, borderRadius: 40, border: '6px solid rgba(255,255,255,0.08)', background: '#0A0005', boxShadow: '0 40px 80px rgba(0,0,0,0.6)', overflow: 'hidden' }}>
          {/* Page content */}
          <div style={{ background: 'linear-gradient(160deg, #0A0005 0%, #1a0010 100%)', padding: '40px 20px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(245,200,66,0.15)', border: '2px solid #F5C842', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
              <span style={{ fontFamily: 'Cinzel, serif', color: '#F5C842', fontSize: 28, fontWeight: 700 }}>P</span>
            </div>
            <h1 style={{ fontFamily: 'Cinzel, serif', color: '#F5C842', fontSize: 20, margin: '0 0 6px', letterSpacing: '0.06em' }}>Priya Sharma</h1>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, margin: '0 0 24px', textAlign: 'center' }}>Food creator · Mumbai · 47K followers</p>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 12, border: '1px solid rgba(245,200,66,0.25)', color: '#F5C842', fontSize: 13, fontWeight: 500, textDecoration: 'none', background: 'rgba(245,200,66,0.05)' }}
                >
                  <span>{l.icon}</span>{l.label}
                </a>
              ))}
            </div>

            {/* Share actions */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8, marginTop: 20 }}>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '11px 16px', borderRadius: 12, background: '#25D366', color: '#fff', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Share via WhatsApp
              </a>
              <button
                onClick={copyLink}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '11px 16px', borderRadius: 12, background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.3)', color: '#F5C842', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
              >
                {copied ? '✓ Copied!' : '🔗 Copy my link'}
              </button>
            </div>

            <p style={{ color: 'rgba(255,255,255,0.15)', fontSize: 9, letterSpacing: '0.15em', marginTop: 20 }}>MADE WITH TAAR</p>
          </div>
        </div>

        {/* Attribution bar */}
        <div className="mt-10 text-center">
          <p className="text-white/30 text-sm mb-1">This is a demo of what your page looks like.</p>
          <Link
            href="/login"
            className="inline-block bg-[#E8593C] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#d44e33] transition-colors mt-2"
          >
            Powered by Taar — Get your free page →
          </Link>
        </div>
      </div>
    </div>
  )
}

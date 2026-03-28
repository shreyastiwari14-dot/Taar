'use client'

import { useState } from 'react'
import Link from 'next/link'

export function LandingNav({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-14 md:h-16">
        <Link
          href="/"
          className="font-display text-xl tracking-[0.15em] text-white hover:text-[#E8593C] transition-colors"
          style={{ fontFamily: 'Bebas Neue, sans-serif' }}
        >
          TAAR
        </Link>

        <div className="flex items-center gap-3 md:gap-6">
          {/* Desktop links */}
          <Link href="#templates" className="hidden md:block text-xs text-white/60 hover:text-white transition-colors tracking-wide">
            Templates
          </Link>
          <Link href="#pricing" className="hidden md:block text-xs text-white/60 hover:text-white transition-colors tracking-wide">
            Pricing
          </Link>

          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className="text-xs font-semibold bg-[#E8593C] text-white px-5 py-2 rounded-full hover:bg-[#d44a2b] transition-colors"
            >
              Dashboard →
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden md:flex text-xs text-white border border-white/30 px-4 py-2 rounded-full hover:border-white transition-colors"
              >
                Login
              </Link>
              <Link
                href="/login"
                className="text-xs font-semibold bg-[#E8593C] text-white px-5 py-2 rounded-full hover:bg-[#d44a2b] transition-colors"
              >
                Start Free →
              </Link>
            </>
          )}

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(true)}
            className="flex md:hidden p-1"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect x="2" y="5" width="18" height="1.5" rx="0.75" fill="white" />
              <rect x="2" y="10.25" width="18" height="1.5" rx="0.75" fill="white" />
              <rect x="2" y="15.5" width="18" height="1.5" rx="0.75" fill="white" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="flex flex-col items-center justify-center"
          style={{ position: 'fixed', inset: 0, zIndex: 999, background: '#060606' }}
        >
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-5 right-6 text-white/50 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <line x1="6" y1="6" x2="18" y2="18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="18" y1="6" x2="6" y2="18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          <div
            className="absolute top-5 left-6 font-display text-xl tracking-[0.15em] text-white"
            style={{ fontFamily: 'Bebas Neue, sans-serif' }}
          >
            TAAR
          </div>

          <div className="flex flex-col items-center gap-8">
            {[
              { label: 'Templates', href: '#templates' },
              { label: 'Pricing', href: '#pricing' },
              { label: 'Login', href: '/login' },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="font-display text-4xl tracking-wider text-white hover:text-[#E8593C] transition-colors"
                style={{ fontFamily: 'Bebas Neue, sans-serif' }}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="mt-4 font-display text-3xl tracking-wider bg-[#E8593C] text-white px-8 py-3 rounded-full hover:bg-[#d44a2b] transition-colors"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}
            >
              START FREE →
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

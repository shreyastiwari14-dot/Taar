'use client'

import { useState } from 'react'
import Link from 'next/link'

export function LandingNav({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 h-[52px]">
        <Link
          href="/"
          className="text-[#F5F5F7] hover:opacity-70 transition-opacity"
          style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 600, fontSize: 15, letterSpacing: '0.12em' }}
        >
          TAAR
        </Link>

        <div className="flex items-center gap-2 md:gap-8">
          <Link
            href="#templates"
            className="hidden md:block text-[#F5F5F7] hover:opacity-60 transition-opacity"
            style={{ fontSize: 14, fontWeight: 400 }}
          >
            Templates
          </Link>
          <Link
            href="#pricing"
            className="hidden md:block text-[#F5F5F7] hover:opacity-60 transition-opacity"
            style={{ fontSize: 14, fontWeight: 400 }}
          >
            Pricing
          </Link>

          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className="text-white px-5 py-2 rounded-full transition-opacity hover:opacity-85"
              style={{ background: '#E8533A', fontSize: 14, fontWeight: 500 }}
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden md:flex text-[#F5F5F7] hover:opacity-60 transition-opacity"
                style={{ fontSize: 14, fontWeight: 400 }}
              >
                Login
              </Link>
              <Link
                href="/login"
                className="text-white px-5 py-2 rounded-full transition-opacity hover:opacity-85"
                style={{ background: '#E8533A', fontSize: 14, fontWeight: 500 }}
              >
                Start Free
              </Link>
            </>
          )}

          <button
            onClick={() => setMenuOpen(true)}
            className="flex md:hidden p-1"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
              <rect width="20" height="1.5" rx="0.75" fill="rgba(245,245,247,0.85)" />
              <rect y="6.25" width="20" height="1.5" rx="0.75" fill="rgba(245,245,247,0.85)" />
              <rect y="12.5" width="20" height="1.5" rx="0.75" fill="rgba(245,245,247,0.85)" />
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="flex flex-col items-center justify-center"
          style={{ position: 'fixed', inset: 0, zIndex: 999, background: '#0A0A0A' }}
        >
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-[14px] right-6"
            aria-label="Close menu"
            style={{ color: '#6E6E73' }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="16" y1="4" x2="4" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          <div
            className="absolute top-[14px] left-6"
            style={{ fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 600, fontSize: 15, letterSpacing: '0.12em', color: '#F5F5F7' }}
          >
            TAAR
          </div>

          <div className="flex flex-col items-center gap-10">
            {[
              { label: 'Templates', href: '#templates' },
              { label: 'Pricing', href: '#pricing' },
              { label: 'Login', href: '/login' },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="text-[#F5F5F7] hover:text-[#E8533A] transition-colors"
                style={{ fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 700, fontSize: 36, letterSpacing: '-0.025em' }}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="text-white px-10 py-4 rounded-full transition-opacity hover:opacity-85"
              style={{ background: '#E8533A', fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 600, fontSize: 16 }}
            >
              Start Free →
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'

export function NotifyModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const firstFocusRef = useRef<HTMLButtonElement>(null)

  // Trap focus inside modal and handle Escape
  useEffect(() => {
    const prev = document.activeElement as HTMLElement
    inputRef.current?.focus()

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') {
        const focusable = Array.from(
          document.getElementById('notify-modal')?.querySelectorAll<HTMLElement>(
            'button, input, [tabindex]:not([tabindex="-1"])'
          ) ?? []
        )
        if (!focusable.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      prev?.focus()
    }
  }, [onClose])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (data.error) { setError(data.error); return }
      setDone(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center px-4"
      style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        id="notify-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="notify-title"
        className="w-full max-w-sm relative"
        style={{
          background: '#0E0E0E',
          border: '1px solid rgba(232,89,60,0.3)',
          padding: 32,
        }}
      >
        {/* Top accent line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent, #E8593C, transparent)',
        }} />

        <button
          ref={firstFocusRef}
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <line x1="4" y1="4" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="14" y1="4" x2="4" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {done ? (
          <div className="text-center py-4">
            <div className="text-4xl mb-4">🎉</div>
            <h2
              id="notify-title"
              className="text-white font-semibold text-lg mb-3"
            >
              You&apos;re on the list!
            </h2>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              We&apos;ll email you when Pro launches.
            </p>
            <button
              onClick={onClose}
              className="bg-[#E8593C] text-white text-sm px-6 py-2.5 rounded-full hover:bg-[#d44e33] transition-colors"
            >
              Got it →
            </button>
          </div>
        ) : (
          <>
            <h2 id="notify-title" className="text-white font-semibold text-lg mb-1">
              Get notified when Pro launches
            </h2>
            <p className="text-white/40 text-sm mb-6">
              ₹399/month · Analytics, Products, Custom domain.
            </p>
            <form onSubmit={submit} className="space-y-3">
              <input
                ref={inputRef}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                aria-label="Your email address"
                className="w-full text-white placeholder-white/20 text-sm focus:outline-none transition-colors"
                style={{
                  background: '#0A0A0A',
                  border: '1px solid rgba(255,255,255,0.1)',
                  padding: '12px 16px',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#E8593C')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
              />
              {error && (
                <p role="alert" className="text-[#E8593C] text-xs font-mono">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#E8593C] text-white text-sm py-3 rounded-full hover:bg-[#d44e33] transition-colors disabled:opacity-50"
              >
                {loading ? 'Saving…' : 'Notify me when Pro launches →'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

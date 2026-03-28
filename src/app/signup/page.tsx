'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const { createClient } = await import('@/lib/supabase/client')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    })
    setLoading(false)
    if (error) toast.error(error.message)
    else setSent(true)
  }

  async function handleGoogle() {
    setGoogleLoading(true)
    const { createClient } = await import('@/lib/supabase/client')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${location.origin}/auth/callback` },
    })
    if (error) {
      toast.error(error.message)
      setGoogleLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: '#060606', fontFamily: 'DM Sans, sans-serif' }}
    >
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232,89,60,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      <div className="w-full max-w-sm relative z-10">
        {/* Wordmark */}
        <div className="text-center mb-10">
          <a href="/" className="font-display text-5xl tracking-[0.15em] text-white inline-block hover:text-[#E8593C] transition-colors"
            style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
            TAAR
          </a>
          <p className="text-white/25 text-xs tracking-[0.2em] uppercase mt-1">Your thread to everything.</p>
        </div>

        <div style={{
          background: '#0E0E0E', border: '1px solid rgba(255,255,255,0.08)',
          padding: '32px', position: 'relative',
        }}>
          {/* Top accent line */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 1,
            background: 'linear-gradient(90deg, transparent, #E8593C, transparent)',
          }} />

          {sent ? (
            <div className="text-center py-4">
              <div className="text-5xl mb-5">✉️</div>
              <h2 className="text-white font-semibold text-lg mb-2">Check your inbox</h2>
              <p className="text-white/40 text-sm mb-6 leading-relaxed">
                Magic link sent to<br />
                <span className="text-white font-medium">{email}</span>
              </p>
              <button
                onClick={() => setSent(false)}
                className="text-[#E8593C] text-xs tracking-widest uppercase hover:text-white transition-colors"
              >
                ← Use a different email
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-white font-semibold text-xl mb-1">
                Create your Taar.
              </h2>
              <p className="text-white/30 text-sm mb-7">
                Free forever — no credit card needed.
              </p>

              {/* Google OAuth button */}
              <button
                onClick={handleGoogle}
                disabled={googleLoading}
                className="w-full flex items-center justify-center gap-3 text-sm font-semibold tracking-wide transition-all mb-4 disabled:opacity-50"
                style={{
                  background: '#fff', color: '#1a1a1a',
                  padding: '12px 20px', border: 'none', cursor: 'pointer',
                }}
              >
                {googleLoading ? (
                  <span className="text-xs tracking-widest uppercase text-[#666]">Redirecting…</span>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                    </svg>
                    Sign up with Google
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
                <span className="text-white/20 text-xs tracking-widest uppercase">or</span>
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
              </div>

              {/* Email magic link */}
              <form onSubmit={handleSignup} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full text-white placeholder-white/20 text-sm focus:outline-none transition-colors"
                  style={{
                    background: '#0A0A0A', border: '1px solid rgba(255,255,255,0.1)',
                    padding: '12px 16px',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#E8593C')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white text-xs font-bold tracking-[0.2em] uppercase transition-all disabled:opacity-50"
                  style={{
                    background: 'transparent', border: '1px solid rgba(255,255,255,0.2)',
                    padding: '12px 20px', cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    const t = e.currentTarget
                    t.style.background = '#E8593C'
                    t.style.borderColor = '#E8593C'
                  }}
                  onMouseLeave={(e) => {
                    const t = e.currentTarget
                    t.style.background = 'transparent'
                    t.style.borderColor = 'rgba(255,255,255,0.2)'
                  }}
                >
                  {loading ? 'Sending…' : 'Send magic link →'}
                </button>
              </form>

              <p className="text-center text-white/20 text-xs mt-5">
                Already have an account?{' '}
                <a href="/login" className="text-[#E8593C] hover:text-white transition-colors">Sign in</a>
              </p>
            </>
          )}
        </div>

        <p className="text-center text-white/15 text-xs mt-5 tracking-wider">
          No password · No credit card · Free forever
        </p>
      </div>
    </div>
  )
}

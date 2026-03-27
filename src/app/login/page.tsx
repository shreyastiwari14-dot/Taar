'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const { createClient } = await import('@/lib/supabase/client')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })
    setLoading(false)
    if (error) {
      toast.error(error.message)
    } else {
      setSent(true)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl tracking-wider text-[#E8593C] mb-2">TAAR</h1>
          <p className="text-gray-500 text-sm">Your thread to everything.</p>
        </div>

        <div className="bg-[#141414] border border-[#222] rounded-2xl p-8">
          {sent ? (
            <div className="text-center">
              <div className="text-4xl mb-4">✉️</div>
              <h2 className="text-white font-semibold text-lg mb-2">Check your inbox</h2>
              <p className="text-gray-400 text-sm mb-6">
                We sent a magic link to <span className="text-white">{email}</span>
              </p>
              <button
                onClick={() => setSent(false)}
                className="text-[#E8593C] text-sm hover:underline"
              >
                Use a different email
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-white font-semibold text-xl mb-2">
                {`Let's set up your Taar.`}
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Enter your email to get a magic link.
              </p>
              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full bg-[#0A0A0A] border border-[#333] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#E8593C] transition-colors text-sm"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#E8593C] text-white py-3 rounded-xl font-semibold hover:bg-[#d44e33] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send magic link →'}
                </button>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          By continuing, you agree to our terms. No passwords needed.
        </p>
      </div>
    </div>
  )
}

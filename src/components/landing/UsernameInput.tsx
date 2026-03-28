'use client'

import { useState } from 'react'

const USERNAME_RE = /^[a-zA-Z0-9_-]+$/

export function UsernameInput() {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  function validate(val: string): string {
    if (val.length < 3) return 'Username must be at least 3 characters'
    if (val.length > 30) return 'Username must be 30 characters or less'
    if (!USERNAME_RE.test(val)) return 'Only letters, numbers, underscores, and hyphens allowed'
    return ''
  }

  function claim() {
    const t = value.trim()
    const err = validate(t)
    if (err) { setError(err); return }
    setError('')
    window.location.href = `/login?username=${encodeURIComponent(t)}`
  }

  return (
    <>
      <div className="flex items-center bg-white/5 border border-white/10 rounded-full px-5 py-3">
        <span className="text-white/30 text-sm font-mono shrink-0">taar.bio/</span>
        <input
          type="text"
          placeholder="yourname"
          value={value}
          onChange={(e) => { setValue(e.target.value); if (error) setError('') }}
          required
          minLength={3}
          maxLength={30}
          pattern="[a-zA-Z0-9_-]+"
          autoComplete="username"
          aria-label="Choose your Taar username"
          aria-describedby={error ? 'username-error' : undefined}
          className="bg-transparent text-white text-sm outline-none flex-1 min-w-0 placeholder:text-white/20"
          onKeyDown={(e) => { if (e.key === 'Enter') claim() }}
        />
        <button
          className="bg-[#E8593C] text-white text-xs px-4 py-2 rounded-full shrink-0 ml-2 hover:bg-[#d44a2b] transition-colors"
          onClick={claim}
        >
          Claim →
        </button>
      </div>
      {error && (
        <p id="username-error" role="alert" className="text-[#E8593C] text-xs mt-2 font-mono text-center">
          {error}
        </p>
      )}
      {!error && (
        <p className="text-white/20 text-xs mt-3 font-mono text-center">
          Free forever · No credit card · Setup in 5 minutes
        </p>
      )}
    </>
  )
}

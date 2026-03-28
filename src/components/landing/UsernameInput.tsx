'use client'

import { useState, useEffect, useRef } from 'react'

const USERNAME_RE = /^[a-zA-Z0-9_-]+$/
type Status = 'idle' | 'checking' | 'available' | 'taken' | 'invalid'

export function UsernameInput() {
  const [value, setValue] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [suggestion, setSuggestion] = useState('')
  const [error, setError] = useState('')
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function validate(val: string): string {
    if (!val) return ''
    if (val.length < 3) return 'At least 3 characters'
    if (val.length > 20) return 'Max 20 characters'
    if (!USERNAME_RE.test(val)) return 'Only letters, numbers, _ and - allowed'
    return ''
  }

  useEffect(() => {
    const trimmed = value.trim()
    const err = validate(trimmed)
    setError(err)
    if (err || !trimmed) { setStatus(trimmed ? 'invalid' : 'idle'); return }
    setStatus('checking')
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/check-username?username=${encodeURIComponent(trimmed)}`)
        const data = await res.json()
        if (data.available) { setStatus('available'); setSuggestion('') }
        else { setStatus('taken'); setSuggestion(data.suggestion || '') }
      } catch { setStatus('idle') }
    }, 500)
    return () => { if (timer.current) clearTimeout(timer.current) }
  }, [value])

  function claim() {
    if (status !== 'available') return
    window.location.href = `/login?username=${encodeURIComponent(value.trim())}`
  }

  return (
    <>
      <div className={`flex items-center bg-white/5 border rounded-full px-5 py-3 transition-colors ${
        status === 'available' ? 'border-green-500/50' :
        status === 'taken' || status === 'invalid' ? 'border-red-500/30' : 'border-white/10'
      }`}>
        <span className="text-white/30 text-sm font-mono shrink-0">taar.bio/</span>
        <input
          type="text"
          placeholder="yourname"
          value={value}
          onChange={(e) => setValue(e.target.value.replace(/\s/g, '').toLowerCase())}
          minLength={3} maxLength={20}
          pattern="[a-zA-Z0-9_-]+"
          autoComplete="username"
          aria-label="Choose your Taar username"
          aria-describedby="username-hint"
          className="bg-transparent text-white text-sm outline-none flex-1 min-w-0 placeholder:text-white/20"
          onKeyDown={(e) => { if (e.key === 'Enter' && status === 'available') claim() }}
        />
        {status === 'checking' && <span className="mr-2 w-3.5 h-3.5 rounded-full border-2 border-white/20 border-t-white/60 animate-spin shrink-0" />}
        {status === 'available' && <span className="mr-2 text-green-400 text-xs shrink-0">✓</span>}
        {status === 'taken' && <span className="mr-2 text-red-400 text-xs shrink-0">✗</span>}
        <button
          className="bg-[#E8593C] text-white text-xs px-4 py-2 rounded-full shrink-0 ml-2 hover:bg-[#d44a2b] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          onClick={claim}
          disabled={status !== 'available'}
        >
          Claim →
        </button>
      </div>
      <div id="username-hint" className="min-h-[20px] mt-2 text-center">
        {status === 'idle' && <p className="text-white/20 text-xs font-mono">3–20 characters · letters, numbers, _ and - only</p>}
        {status === 'invalid' && error && <p role="alert" className="text-red-400 text-xs font-mono">{error}</p>}
        {status === 'checking' && <p className="text-white/30 text-xs font-mono">Checking availability…</p>}
        {status === 'available' && <p role="status" className="text-green-400 text-xs font-mono">✓ {value} is available!</p>}
        {status === 'taken' && (
          <p role="alert" className="text-red-400 text-xs font-mono">
            ✗ Already taken{suggestion && <> — try <button className="underline hover:text-red-300" onClick={() => setValue(suggestion)}>{suggestion}</button></>}
          </p>
        )}
      </div>
      {(status === 'idle' || status === 'available') && (
        <p className="text-white/20 text-xs mt-1 font-mono text-center">Free forever · No credit card · Setup in 5 minutes</p>
      )}
    </>
  )
}

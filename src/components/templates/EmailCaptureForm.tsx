'use client'

import { useState } from 'react'

export function EmailCaptureForm({
  pageId,
  accentColor,
  textColor,
  borderColor,
  bgColor,
}: {
  pageId: string
  accentColor: string
  textColor: string
  borderColor: string
  bgColor: string
}) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page_id: pageId, email }),
      })
      if (res.ok) {
        setStatus('done')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div style={{
        border: `1px solid ${borderColor}`,
        borderRadius: 12,
        padding: '14px 16px',
        textAlign: 'center',
        color: accentColor,
        fontSize: 13,
        fontWeight: 500,
      }}>
        ✓ You&apos;re subscribed!
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <div style={{
        border: `1px solid ${borderColor}`,
        borderRadius: 12,
        padding: '14px 16px',
        background: bgColor,
      }}>
        <p style={{ color: textColor, fontSize: 12, marginBottom: 10, opacity: 0.7 }}>
          Stay updated — subscribe for new posts
        </p>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            style={{
              flex: 1,
              background: 'transparent',
              border: `1px solid ${borderColor}`,
              borderRadius: 8,
              padding: '8px 12px',
              color: textColor,
              fontSize: 12,
              outline: 'none',
            }}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              background: accentColor,
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '8px 14px',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              opacity: status === 'loading' ? 0.7 : 1,
              whiteSpace: 'nowrap',
            }}
          >
            {status === 'loading' ? '...' : 'Subscribe'}
          </button>
        </div>
        {status === 'error' && (
          <p style={{ color: '#ef4444', fontSize: 11, marginTop: 6 }}>Something went wrong. Try again.</p>
        )}
      </div>
    </form>
  )
}

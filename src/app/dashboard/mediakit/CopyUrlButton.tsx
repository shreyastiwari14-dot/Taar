'use client'

import { useState } from 'react'

export function CopyUrlButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={copy}
      className="shrink-0 text-xs px-4 py-3 rounded-xl border border-white/10 hover:border-white/30 text-white/50 hover:text-white transition-colors"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}

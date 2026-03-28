'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[Dashboard error]', error)
  }, [error])

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <p className="font-mono text-xs text-[#E8593C] tracking-widest uppercase mb-4">Something went wrong</p>
        <h2
          className="text-white mb-3"
          style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 40, letterSpacing: '0.05em' }}
        >
          Unexpected error
        </h2>
        <p className="text-white/40 text-sm mb-8">
          {error.message || 'An error occurred loading this page.'}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="bg-[#E8593C] text-white text-sm px-5 py-2.5 rounded-full hover:bg-[#d44e33] transition-colors"
          >
            Try again
          </button>
          <Link
            href="/dashboard"
            className="border border-white/20 text-white/60 text-sm px-5 py-2.5 rounded-full hover:border-white/40 transition-colors"
          >
            Back to dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}

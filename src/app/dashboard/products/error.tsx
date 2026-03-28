'use client'

import Link from 'next/link'

export default function ProductsError({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <p className="font-mono text-xs text-[#E8593C] tracking-widest uppercase mb-4">Digital Products</p>
        <h2 className="text-white text-2xl font-semibold mb-3">Something went wrong</h2>
        <p className="text-white/40 text-sm mb-8">
          Failed to load digital products. Please retry.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/dashboard/upgrade"
            className="bg-[#E8593C] text-white text-sm px-5 py-2.5 rounded-full hover:bg-[#d44e33] transition-colors"
          >
            Upgrade to Pro
          </Link>
          <button
            onClick={reset}
            className="border border-white/20 text-white/60 text-sm px-5 py-2.5 rounded-full hover:border-white/40 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  )
}

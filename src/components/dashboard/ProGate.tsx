import Link from 'next/link'

export function ProGate({ feature }: { feature: string }) {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-[#141414] border border-[#E8593C]/30 rounded-2xl p-10">
          <div className="text-5xl mb-4">🧵</div>
          <h2 className="font-display text-3xl tracking-wider text-white mb-2">
            PRO FEATURE
          </h2>
          <p className="text-gray-500 text-sm mb-2">
            This is a Pro thread. Upgrade to unlock.
          </p>
          <p className="text-[#E8593C] text-lg font-semibold mb-6">{feature}</p>
          <Link
            href="/dashboard/upgrade"
            className="block w-full bg-[#E8593C] text-white py-4 rounded-full font-semibold hover:bg-[#d44e33] transition-colors text-lg"
          >
            Go Pro. Own your thread. →
          </Link>
          <p className="text-gray-600 text-xs mt-4">₹399/month · Cancel anytime</p>
        </div>
      </div>
    </div>
  )
}

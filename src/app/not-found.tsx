import Link from 'next/link'

export default function RootNotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="font-display text-8xl text-[#E8593C] mb-4" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>404</div>
        <h1 className="text-3xl tracking-wider text-white mb-3" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>PAGE NOT FOUND</h1>
        <p className="text-gray-500 mb-8">This page doesn&apos;t exist. Try the homepage.</p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/" className="bg-[#E8593C] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#d44e33] transition-colors">
            Go home →
          </Link>
          <Link href="/#pricing" className="text-gray-500 hover:text-white transition-colors text-sm">
            See pricing
          </Link>
        </div>
      </div>
    </div>
  )
}

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="font-display text-8xl text-[#E8593C] mb-4">404</div>
        <h1 className="font-display text-3xl tracking-wider text-white mb-3">THREAD NOT FOUND</h1>
        <p className="text-gray-500 mb-8">This Taar page doesn&apos;t exist or isn&apos;t published yet.</p>
        <Link
          href="/"
          className="bg-[#E8593C] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#d44e33] transition-colors"
        >
          Go home →
        </Link>
      </div>
    </div>
  )
}

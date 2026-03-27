import Link from 'next/link'

export function PricingSection() {
  return (
    <section className="py-24 px-4" id="pricing">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-6xl tracking-wider mb-4">
            CUT THE NOISE.<br />
            <span className="text-[#E8593C]">OWN YOUR THREAD.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Free */}
          <div className="bg-[#141414] border border-[#222] rounded-2xl p-8">
            <div className="mb-6">
              <h3 className="font-display text-3xl tracking-wider mb-2">FREE</h3>
              <div className="text-4xl font-bold mb-1">₹0</div>
              <div className="text-gray-500 text-sm">Forever</div>
            </div>
            <ul className="space-y-3 mb-8 text-sm text-gray-400">
              {[
                '1 bio page',
                'Up to 8 links',
                '3 templates',
                'UPI & WhatsApp links',
                'Basic view count',
                'Custom username',
              ].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="text-[#E8593C]">✓</span> {f}
                </li>
              ))}
            </ul>
            <Link
              href="/login"
              className="block w-full text-center border border-[#333] text-white py-3 rounded-full hover:border-[#E8593C] transition-colors font-medium"
            >
              Get started
            </Link>
          </div>

          {/* Pro */}
          <div className="bg-[#141414] border border-[#E8593C] rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-[#E8593C] text-white text-xs px-3 py-1 rounded-full font-semibold">
              MOST POPULAR
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#E8593C]/10 rounded-full blur-2xl" />
            <div className="mb-6 relative">
              <h3 className="font-display text-3xl tracking-wider mb-2 text-[#E8593C]">PRO</h3>
              <div className="text-4xl font-bold mb-1">₹399<span className="text-lg text-gray-400">/mo</span></div>
              <div className="text-gray-500 text-sm">Cancel anytime</div>
            </div>
            <ul className="space-y-3 mb-8 text-sm text-gray-300 relative">
              {[
                'Everything in Free',
                'Click analytics (7-day charts)',
                'Auto Reels shelf',
                'Digital product shelf (5 products)',
                'All templates',
                'Priority support',
              ].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="text-[#E8593C]">✓</span> {f}
                </li>
              ))}
            </ul>
            <Link
              href="/dashboard/upgrade"
              className="block w-full text-center bg-[#E8593C] text-white py-3 rounded-full hover:bg-[#d44e33] transition-colors font-semibold relative"
            >
              Go Pro →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

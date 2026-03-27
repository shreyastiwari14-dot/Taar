import Link from 'next/link'
import { ThreadSVG } from '@/components/landing/ThreadSVG'
import { TemplatePreview } from '@/components/landing/TemplatePreview'
import { PricingSection } from '@/components/landing/PricingSection'

export default function LandingPage() {
  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-[#222]">
        <span className="font-display text-2xl tracking-wider text-[#E8593C]">TAAR</span>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm text-gray-400 hover:text-white transition-colors">
            Login
          </Link>
          <Link
            href="/login"
            className="text-sm bg-[#E8593C] text-white px-4 py-2 rounded-full hover:bg-[#d44e33] transition-colors font-medium"
          >
            Get started free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#E8593C]/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="mb-8 flex justify-center">
            <ThreadSVG />
          </div>

          <h1 className="font-display text-7xl md:text-9xl tracking-wider mb-4 leading-none">
            <span className="text-white">YOUR THREAD TO</span>
            <br />
            <span className="text-[#E8593C]">EVERYTHING.</span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-xl mx-auto">
            One link. Your UPI. Your reels. Your products.<br />
            Built for Indian creators.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="bg-[#E8593C] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#d44e33] transition-all hover:scale-105 active:scale-95"
            >
              Start for free →
            </Link>
            <a
              href="#templates"
              className="border border-[#333] text-white px-8 py-4 rounded-full text-lg font-medium hover:border-[#E8593C] transition-colors"
            >
              See templates
            </a>
          </div>

          <div className="mt-16 flex items-center justify-center gap-8 text-sm text-gray-500">
            {['UPI Links', 'Auto Reels', 'Analytics', 'Sell Direct'].map((f) => (
              <div key={f} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#E8593C] rounded-full" />
                {f}
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-px h-12 bg-gradient-to-b from-[#E8593C] to-transparent mx-auto" />
        </div>
      </section>

      {/* Templates */}
      <section id="templates" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl md:text-6xl tracking-wider mb-4">
              THREE THREADS.<br />
              <span className="text-[#E8593C]">YOUR VIBE.</span>
            </h2>
            <p className="text-gray-400">Pick a template and make it yours.</p>
          </div>
          <TemplatePreview />
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 bg-[#0D0D0D]">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-5xl md:text-6xl tracking-wider text-center mb-16">
            EVERYTHING <span className="text-[#E8593C]">CONNECTED.</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: '₹',
                title: 'UPI Payment Links',
                desc: 'Add your UPI ID directly. Fans can pay you instantly. No redirects, no friction.',
                tag: 'Free',
              },
              {
                icon: '📸',
                title: 'Auto Reels Shelf',
                desc: 'Connect Instagram. Your latest 3 reels appear automatically on your bio page.',
                tag: 'Pro',
              },
              {
                icon: '📊',
                title: 'Click Analytics',
                desc: 'See which links get traction. Track clicks over 7 days with device breakdown.',
                tag: 'Pro',
              },
              {
                icon: '📦',
                title: 'Digital Products',
                desc: 'Sell presets, PDFs, music, anything. Razorpay payments + auto delivery via email.',
                tag: 'Pro',
              },
            ].map((f) => (
              <div key={f.title} className="bg-[#141414] border border-[#222] rounded-2xl p-6 hover:border-[#E8593C]/40 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">{f.icon}</div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    f.tag === 'Pro'
                      ? 'bg-[#E8593C]/20 text-[#E8593C]'
                      : 'bg-[#333] text-gray-400'
                  }`}>
                    {f.tag}
                  </span>
                </div>
                <h3 className="font-semibold text-white text-lg mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <PricingSection />

      {/* CTA */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-6xl md:text-7xl tracking-wider mb-6">
            START YOUR<br />
            <span className="text-[#E8593C]">THREAD.</span>
          </h2>
          <p className="text-gray-400 mb-10">Free forever. Pro for the serious creator.</p>
          <Link
            href="/login"
            className="inline-block bg-[#E8593C] text-white px-10 py-5 rounded-full text-xl font-semibold hover:bg-[#d44e33] transition-all hover:scale-105 active:scale-95"
          >
            Create your Taar →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#111] py-8 px-4 text-center text-gray-600 text-sm">
        <p>Made in India for Indian creators 🇮🇳</p>
        <p className="mt-2 font-display text-lg tracking-widest text-[#333]">TAAR</p>
      </footer>
    </div>
  )
}

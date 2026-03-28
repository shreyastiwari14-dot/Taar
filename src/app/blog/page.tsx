import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog — Taar | Tips for Indian Creators',
  description: 'Guides and tips for Indian creators: how to accept UPI tips, grow on Instagram, and make money with your link in bio.',
}

const ARTICLES = [
  {
    slug: 'how-to-accept-upi-tips-instagram-creator',
    title: 'How to accept UPI tips as an Instagram creator (2026 guide)',
    excerpt: 'Step-by-step guide to adding GPay, PhonePe, and Paytm payment links to your Instagram bio using Taar.',
    date: '2026-03-01',
  },
  {
    slug: 'linktree-alternative-india-free',
    title: 'Best free Linktree alternative for India in 2026',
    excerpt: 'Why Indian creators are switching from Linktree to tools built for Bharat — UPI, Indian templates, and ₹0 forever.',
    date: '2026-02-15',
  },
  {
    slug: 'link-in-bio-indian-youtubers',
    title: 'Link in bio for Indian YouTubers: the complete setup guide',
    excerpt: 'How to build a link in bio page that converts YouTube viewers into followers, buyers, and UPI tippers.',
    date: '2026-02-01',
  },
  {
    slug: 'sell-digital-products-instagram-india',
    title: 'How to sell presets and e-books on Instagram (India)',
    excerpt: 'Set up a digital product store on your Taar page and start earning in INR — no international payment gateway needed.',
    date: '2026-01-20',
  },
  {
    slug: 'grow-instagram-india-creator-tools',
    title: '5 tools every Indian Instagram creator needs in 2026',
    excerpt: 'From Reels scheduling to link in bio — the essential toolkit for creators growing on Instagram in India.',
    date: '2026-01-10',
  },
]

export default function BlogPage() {
  return (
    <div style={{ background: '#060606', minHeight: '100vh' }}>
      {/* Nav */}
      <nav className="border-b border-white/[0.06] h-16 flex items-center px-6 md:px-12">
        <Link
          href="/"
          className="text-white text-xl tracking-[0.15em] hover:text-[#E8593C] transition-colors"
          style={{ fontFamily: 'Bebas Neue, sans-serif' }}
        >
          TAAR
        </Link>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-20">
        <p className="font-mono text-xs tracking-[0.2em] text-[#E8593C] mb-4 uppercase">
          Creator guides
        </p>
        <h1
          className="text-white mb-16"
          style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 0.95 }}
        >
          Tips for<br />Indian creators.
        </h1>

        <div className="space-y-px">
          {ARTICLES.map((article) => (
            <article
              key={article.slug}
              className="border-t border-white/[0.06] py-8 group"
            >
              <time className="font-mono text-xs text-white/25 block mb-3">{article.date}</time>
              <h2 className="text-white text-lg font-semibold mb-2 group-hover:text-[#E8593C] transition-colors">
                {article.title}
              </h2>
              <p className="text-white/40 text-sm leading-relaxed">{article.excerpt}</p>
              <span className="inline-block mt-3 text-xs font-mono text-white/25 group-hover:text-[#E8593C] transition-colors">
                Read more →
              </span>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}

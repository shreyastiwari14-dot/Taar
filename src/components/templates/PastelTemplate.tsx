import { TemplateProps, TrackableLink, ProductCard } from './shared'
import { getLinkIcon } from '@/lib/utils'

export function PastelTemplate({ page, links, products, username, showWatermark }: TemplateProps) {
  return (
    <div className="min-h-screen bg-[#FDF6EC] flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-sm">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
          {page.avatar_url ? (
            <img
              src={page.avatar_url}
              alt={page.title || username}
              className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-[#F5E6D0]"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-[#F9C784] flex items-center justify-center mb-4 border-4 border-[#F5E6D0] text-[#8B5E3C] font-bold text-3xl">
              {(page.title || username).charAt(0).toUpperCase()}
            </div>
          )}
          <h1
            className="text-2xl font-bold text-[#8B5E3C] text-center"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {page.title || username}
          </h1>
          {page.bio && (
            <p className="text-[#C89B7B] text-sm mt-2 text-center max-w-xs">{page.bio}</p>
          )}
        </div>

        {/* Links */}
        <div className="space-y-3 mb-8">
          {links.map((link) => (
            <TrackableLink
              key={link.id}
              link={link}
              className="block w-full bg-white border border-[#F0DCC8] rounded-full py-4 px-5 text-sm font-medium text-[#8B5E3C] text-center shadow-sm hover:shadow-md hover:bg-[#FFF9F5] transition-all"
            >
              {getLinkIcon(link.type)} {link.label}
            </TrackableLink>
          ))}
        </div>

        {/* Products */}
        {products.length > 0 && (
          <div className="mb-8">
            <h2
              className="text-sm font-bold text-[#C89B7B] mb-3 text-center"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              ✨ Shop
            </h2>
            <div className="space-y-3">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} theme="light" />
              ))}
            </div>
          </div>
        )}

        {showWatermark && (
          <div className="text-center py-6">
            <a href="/" className="text-[#D4B896] text-xs hover:text-[#C89B7B] transition-colors">
              Made with <span className="font-display tracking-widest">TAAR</span>
            </a>
          </div>
        )}
      </div>

      <script src="https://checkout.razorpay.com/v1/checkout.js" async />
    </div>
  )
}

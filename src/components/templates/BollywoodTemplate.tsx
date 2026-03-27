import { TemplateProps, TrackableLink, ProductCard, TaarWatermark } from './shared'
import { getLinkIcon } from '@/lib/utils'

export function BollywoodTemplate({ page, links, products, username, showWatermark }: TemplateProps) {
  return (
    <div className="min-h-screen bg-[#0A0005] flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-sm">
        {/* Decorative top line */}
        <div className="flex items-center gap-2 mb-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#F5C842]/50" />
          <div className="w-2 h-2 rotate-45 bg-[#F5C842]" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#F5C842]/50" />
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
          {page.avatar_url ? (
            <img
              src={page.avatar_url}
              alt={page.title || username}
              className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-[#F5C842]/50"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#F5C842] to-[#E8593C] flex items-center justify-center mb-4 border-2 border-[#F5C842]/50 font-display text-4xl text-white">
              {(page.title || username).charAt(0).toUpperCase()}
            </div>
          )}
          <h1 className="font-display text-4xl tracking-widest text-[#F5C842] uppercase text-center">
            {page.title || username}
          </h1>
          {page.bio && (
            <p className="text-gray-500 text-xs mt-2 text-center max-w-xs">{page.bio}</p>
          )}
        </div>

        {/* Links */}
        <div className="space-y-3 mb-8">
          {links.map((link) => (
            <TrackableLink
              key={link.id}
              link={link}
              className="block w-full border border-[#F5C842]/30 text-[#F5C842] py-4 px-5 text-xs font-display tracking-widest uppercase text-center hover:bg-[#F5C842]/10 hover:border-[#F5C842] transition-colors"
            >
              {getLinkIcon(link.type)} {link.label.toUpperCase()}
            </TrackableLink>
          ))}
        </div>

        {/* Products */}
        {products.length > 0 && (
          <div className="mb-8">
            <h2 className="font-display text-sm tracking-widest text-[#F5C842]/50 mb-3 uppercase text-center">
              — Products —
            </h2>
            <div className="space-y-3">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} theme="dark" />
              ))}
            </div>
          </div>
        )}

        {/* Bottom decoration */}
        <div className="flex items-center gap-2 mt-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#F5C842]/30" />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#F5C842]/50" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#F5C842]/30" />
        </div>

        {showWatermark && <TaarWatermark />}
      </div>

      <script src="https://checkout.razorpay.com/v1/checkout.js" async />
    </div>
  )
}

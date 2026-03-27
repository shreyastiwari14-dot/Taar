import { TemplateProps, TrackableLink, ProductCard, TaarWatermark } from './shared'
import { getLinkIcon } from '@/lib/utils'

export function StreetwearTemplate({ page, links, products, username, showWatermark }: TemplateProps) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-sm">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
          {page.avatar_url ? (
            <img
              src={page.avatar_url}
              alt={page.title || username}
              className="w-20 h-20 rounded-full object-cover mb-4 grayscale"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-4 font-display text-3xl text-black">
              {(page.title || username).charAt(0).toUpperCase()}
            </div>
          )}
          <h1 className="font-display text-3xl tracking-widest text-white uppercase text-center">
            {page.title || username}
          </h1>
          {page.bio && (
            <p className="text-gray-500 text-xs mt-2 text-center uppercase tracking-wider max-w-xs">
              {page.bio}
            </p>
          )}
        </div>

        {/* Links */}
        <div className="space-y-3 mb-8">
          {links.map((link) => (
            <TrackableLink
              key={link.id}
              link={link}
              className="block w-full bg-white text-black py-4 px-5 text-sm font-bold tracking-widest uppercase text-center hover:bg-[#E8593C] hover:text-white transition-colors"
            >
              {getLinkIcon(link.type)} {link.label.toUpperCase()}
            </TrackableLink>
          ))}
        </div>

        {/* Products */}
        {products.length > 0 && (
          <div className="mb-8">
            <h2 className="font-display text-sm tracking-widest text-gray-600 mb-3 uppercase">
              Products
            </h2>
            <div className="space-y-3">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} theme="dark" />
              ))}
            </div>
          </div>
        )}

        {showWatermark && <TaarWatermark />}
      </div>

      {/* Load Razorpay script */}
      <script src="https://checkout.razorpay.com/v1/checkout.js" async />
    </div>
  )
}

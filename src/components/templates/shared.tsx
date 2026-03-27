'use client'

import { Link, Page, Product } from '@/lib/types'
import { getLinkUrl, getDeviceType } from '@/lib/utils'

export interface TemplateProps {
  page: Page
  links: Link[]
  products: Product[]
  username: string
  isPro: boolean
  showWatermark: boolean
}

export function TrackableLink({
  link,
  className,
  style,
  children,
}: {
  link: Link
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}) {
  async function handleClick() {
    await fetch('/api/track-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        link_id: link.id,
        device_type: getDeviceType(),
      }),
    })
  }

  return (
    <a
      href={getLinkUrl(link.type, link.url)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
      style={style}
    >
      {children}
    </a>
  )
}

export function ProductCard({
  product,
  theme = 'dark',
}: {
  product: Product
  theme?: 'dark' | 'light'
}) {
  return (
    <div
      className={`rounded-xl p-4 border ${
        theme === 'dark'
          ? 'bg-[#141414] border-[#222] text-white'
          : 'bg-white border-[#F0DCC8] text-[#8B5E3C]'
      }`}
    >
      <div className="font-semibold text-sm mb-1">{product.name}</div>
      {product.description && (
        <div className={`text-xs mb-3 ${theme === 'dark' ? 'text-gray-500' : 'text-[#C89B7B]'}`}>
          {product.description}
        </div>
      )}
      <div className="flex items-center justify-between">
        <span className="font-bold">₹{product.price}</span>
        <BuyButton product={product} theme={theme} />
      </div>
    </div>
  )
}

function BuyButton({ product, theme }: { product: Product; theme: string }) {
  async function handleBuy() {
    const res = await fetch('/api/razorpay/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: product.id }),
    })
    const { order_id, key_id, amount } = await res.json()

    if (typeof window !== 'undefined' && (window as any).Razorpay) {
      const rzp = new (window as any).Razorpay({
        key: key_id,
        amount,
        currency: 'INR',
        name: 'Taar',
        description: product.name,
        order_id,
        handler: async (response: any) => {
          await fetch('/api/razorpay/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              product_id: product.id,
            }),
          })
        },
      })
      rzp.open()
    }
  }

  return (
    <button
      onClick={handleBuy}
      className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-colors ${
        theme === 'dark'
          ? 'bg-[#E8593C] text-white hover:bg-[#d44e33]'
          : 'bg-[#E8593C] text-white hover:bg-[#d44e33]'
      }`}
    >
      Buy →
    </button>
  )
}

export function TaarWatermark() {
  return (
    <div className="text-center py-6">
      <a href="/" className="text-gray-600 text-xs hover:text-gray-400 transition-colors">
        Made with <span className="font-display tracking-widest">TAAR</span>
      </a>
    </div>
  )
}

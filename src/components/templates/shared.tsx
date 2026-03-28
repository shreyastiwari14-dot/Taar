'use client'

import Script from 'next/script'
import { useState } from 'react'
import { Link, Page, Product } from '@/lib/types'
import { getLinkUrl, getDeviceType } from '@/lib/utils'
import { UpiModal } from './UpiModal'

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
  const [showUpi, setShowUpi] = useState(false)

  function handleClick(e: React.MouseEvent) {
    // Fire analytics (fire-and-forget)
    fetch('/api/track-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        link_id: link.id,
        device_type: getDeviceType(),
        referrer: document.referrer || null,
      }),
    }).catch(() => {})

    // UPI links: intercept and show QR modal
    if (link.type === 'upi') {
      e.preventDefault()
      setShowUpi(true)
    }
  }

  const upiUrl = getLinkUrl(link.type, link.url)

  return (
    <>
      <a
        href={upiUrl}
        target={link.type === 'upi' ? undefined : '_blank'}
        rel="noopener noreferrer"
        onClick={handleClick}
        className={className}
        style={style}
      >
        {children}
      </a>
      {showUpi && (
        <UpiModal
          upiUrl={upiUrl}
          upiId={link.url}
          name={link.label}
          onClose={() => setShowUpi(false)}
        />
      )}
    </>
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

interface RazorpayResponse {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}

function BuyButton({ product, theme }: { product: Product; theme: string }) {
  async function handleBuy() {
    try {
      const res = await fetch('/api/razorpay/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: product.id }),
      })
      const data = await res.json()
      if (data.error) return

      const { order_id, key_id, amount } = data

      if (typeof window !== 'undefined' && (window as unknown as { Razorpay?: unknown }).Razorpay) {
        const RazorpayConstructor = (window as unknown as { Razorpay: new (opts: unknown) => { open: () => void } }).Razorpay
        const rzp = new RazorpayConstructor({
          key: key_id,
          amount,
          currency: 'INR',
          name: 'Taar',
          description: product.name,
          order_id,
          handler: async (response: RazorpayResponse) => {
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
    } catch {
      // Silent
    }
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <button
        onClick={handleBuy}
        className="text-xs px-3 py-1.5 rounded-full font-semibold transition-colors bg-[#E8593C] text-white hover:bg-[#d44e33]"
      >
        Buy →
      </button>
    </>
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

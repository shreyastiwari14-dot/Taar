'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import Script from 'next/script'

interface Props {
  email: string
  userId: string
}

export function UpgradeClient({ email, userId }: Props) {
  const [loading, setLoading] = useState(false)

  async function handleUpgrade() {
    setLoading(true)
    try {
      const res = await fetch('/api/razorpay/subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, email }),
      })
      const data = await res.json()

      if (data.error) {
        toast.error(data.error)
        setLoading(false)
        return
      }

      const { subscription_id } = data

      const rzp = new (window as any).Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        subscription_id,
        name: 'Taar',
        description: `Taar Pro — ₹399/month`,
        prefill: { email },
        theme: { color: '#E8593C' },
        handler: async (_response: unknown) => {
          toast.success('Payment successful! Your Pro subscription is active.')
          window.location.href = '/dashboard'
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      })
      rzp.open()
    } catch (_err) {
      toast.error('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4">
        <div className="max-w-lg w-full">
          <div className="text-center mb-10">
            <h1 className="font-display text-5xl md:text-6xl tracking-wider text-white mb-3">
              CUT THE NOISE.<br />
              <span className="text-[#E8593C]">OWN YOUR THREAD.</span>
            </h1>
            <p className="text-gray-500">Upgrade to unlock everything.</p>
          </div>

          <div className="bg-[#141414] border border-[#E8593C]/40 rounded-2xl p-8 mb-6 relative overflow-hidden">
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#E8593C]/10 rounded-full blur-2xl" />

            <div className="flex items-start justify-between mb-6 relative">
              <div>
                <h2 className="font-display text-3xl tracking-wider text-[#E8593C]">PRO</h2>
                <div className="text-4xl font-bold text-white mt-1">
                  ₹399<span className="text-lg text-gray-500">/month</span>
                </div>
              </div>
              <span className="bg-[#E8593C]/20 text-[#E8593C] text-xs px-3 py-1 rounded-full font-semibold">
                MOST POPULAR
              </span>
            </div>

            <ul className="space-y-3 mb-8 text-sm text-gray-300 relative">
              {[
                '✓  Click analytics with 7-day charts',
                '✓  Auto Instagram Reels shelf',
                '✓  Sell up to 5 digital products',
                '✓  All templates (Bollywood, Streetwear, Pastel)',
                '✓  Remove Taar watermark',
                '✓  Priority support',
                '✓  Everything in Free',
              ].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="text-[#E8593C]">{f.split('  ')[0]}</span>
                  <span>{f.split('  ')[1]}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={handleUpgrade}
              disabled={loading}
              className="w-full bg-[#E8593C] text-white py-4 rounded-full text-lg font-semibold hover:bg-[#d44e33] transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative"
            >
              {loading ? 'Opening payment...' : 'Go Pro for ₹399/month →'}
            </button>
          </div>

          <p className="text-center text-gray-600 text-xs">
            Powered by Razorpay · Cancel anytime · No hidden charges
          </p>
        </div>
      </div>
    </>
  )
}

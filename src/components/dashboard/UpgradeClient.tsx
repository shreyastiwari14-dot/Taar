'use client'

import { useState } from 'react'
import { Component, ReactNode } from 'react'
import toast from 'react-hot-toast'
import Script from 'next/script'

interface Props {
  email: string
  userId: string
}

class UpgradeErrorBoundary extends Component<{ children: ReactNode }, { crashed: boolean }> {
  state = { crashed: false }
  static getDerivedStateFromError() { return { crashed: true } }
  render() {
    if (this.state.crashed) {
      return (
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4">
          <div className="text-center max-w-sm">
            <p className="text-white/60 text-sm mb-4">Something went wrong with the payment. Please try again.</p>
            <button onClick={() => this.setState({ crashed: false })} className="bg-[#E8593C] text-white px-6 py-2.5 rounded-full text-sm hover:bg-[#d44e33] transition-colors">Try again</button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

function extractRazorpayError(err: unknown): string {
  if (typeof err === 'string') return err
  if (err && typeof err === 'object') {
    const e = err as Record<string, unknown>
    // Razorpay error callback shape: { error: { description, code } }
    const inner = e.error as Record<string, unknown> | undefined
    if (inner?.description) return String(inner.description)
    if (e.description) return String(e.description)
    if (e.message) return String(e.message)
  }
  return 'Payment failed. Please try again.'
}

function UpgradeInner({ email, userId }: Props) {
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
        toast.error(typeof data.error === 'string' ? data.error : 'Failed to create subscription')
        setLoading(false)
        return
      }

      const { subscription_id } = data

      const rzp = new (window as any).Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        subscription_id,
        name: 'Taar',
        description: 'Taar Pro — ₹399/month',
        prefill: { email },
        theme: { color: '#E8593C' },
        handler: async (_response: unknown) => {
          toast.success('Payment successful! Your Pro subscription is active.')
          window.location.href = '/dashboard'
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error: (err: unknown) => {
          toast.error(extractRazorpayError(err))
          setLoading(false)
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
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" />
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
                'Unlimited links (free plan: 8 max)',
                'Analytics: 30-day history, traffic sources, city-level data',
                'Sell digital products via Razorpay',
                'Email capture — grow your subscriber list',
                'UPI QR code shown on your page',
                'Page QR code — download & share anywhere',
                'Remove Taar watermark',
                'All 50 templates unlocked',
                'Priority support',
              ].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="text-[#E8593C] shrink-0">✓</span>
                  <span>{f}</span>
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

export function UpgradeClient(props: Props) {
  return (
    <UpgradeErrorBoundary>
      <UpgradeInner {...props} />
    </UpgradeErrorBoundary>
  )
}

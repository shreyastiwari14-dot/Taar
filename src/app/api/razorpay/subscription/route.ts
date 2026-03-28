import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { user_id, email } = await request.json()

  if (!user_id || !email) {
    return NextResponse.json({ error: 'user_id and email required' }, { status: 400 })
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const Razorpay = require('razorpay')
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })

    const subscription = await razorpay.subscriptions.create({
      plan_id: process.env.RAZORPAY_PLAN_ID || 'plan_taar_pro',
      customer_notify: 1,
      total_count: 12,
      notes: { user_id, email },
    })

    return NextResponse.json({ subscription_id: subscription.id })
  } catch (err: unknown) {
    console.error('[razorpay/subscription] raw error:', JSON.stringify(err))
    let message = 'Failed to create subscription'
    if (err instanceof Error) {
      message = err.message
    } else if (typeof err === 'object' && err !== null) {
      const e = err as Record<string, unknown>
      // Razorpay Node SDK: { statusCode, error: { code, description } }
      const inner = e.error as Record<string, unknown> | undefined
      message = (inner?.description as string)
        || (inner?.code as string)
        || (e.description as string)
        || JSON.stringify(err)
    }
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

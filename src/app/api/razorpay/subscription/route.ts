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
  } catch (err: any) {
    console.error('Razorpay subscription error:', err)
    return NextResponse.json({ error: err.message || 'Failed to create subscription' }, { status: 500 })
  }
}

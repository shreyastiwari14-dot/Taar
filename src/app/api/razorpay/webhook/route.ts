import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import crypto from 'crypto'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('x-razorpay-signature')

  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(body)
    .digest('hex')

  if (signature !== expectedSignature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = getSupabase()
  let parsed: { event: string; payload: { subscription: { entity: { id: string; notes?: Record<string, string>; current_end?: number } } } }
  try {
    parsed = JSON.parse(body)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }
  const { event: eventType, payload } = parsed

  switch (eventType) {
    case 'subscription.activated':
    case 'subscription.charged': {
      const sub = payload.subscription.entity
      const userId = sub.notes?.user_id
      if (userId) {
        await supabase.from('users').update({ is_pro: true }).eq('id', userId)
        await supabase.from('subscriptions').upsert({
          user_id: userId,
          razorpay_sub_id: sub.id,
          status: 'active',
          current_period_end: sub.current_end ? new Date(sub.current_end * 1000).toISOString() : null,
        }, { onConflict: 'razorpay_sub_id' })
      }
      break
    }
    case 'subscription.cancelled':
    case 'subscription.expired':
    case 'subscription.halted': {
      const sub = payload.subscription.entity
      const userId = sub.notes?.user_id
      if (userId) {
        await supabase.from('users').update({ is_pro: false }).eq('id', userId)
        await supabase.from('subscriptions').update({
          status: eventType.split('.')[1],
        }).eq('razorpay_sub_id', sub.id)
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}

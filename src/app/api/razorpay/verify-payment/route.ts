import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'
import { Resend } from 'resend'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function POST(request: Request) {
  let razorpay_payment_id: string, razorpay_order_id: string, razorpay_signature: string, product_id: string, buyer_email: string
  try {
    const body = await request.json()
    razorpay_payment_id = body.razorpay_payment_id
    razorpay_order_id = body.razorpay_order_id
    razorpay_signature = body.razorpay_signature
    product_id = body.product_id
    buyer_email = body.buyer_email
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature || !product_id) {
    return NextResponse.json({ error: 'Missing required payment fields' }, { status: 400 })
  }

  const body = `${razorpay_order_id}|${razorpay_payment_id}`
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest('hex')

  if (razorpay_signature !== expectedSignature) {
    return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 })
  }

  const supabase = getSupabase()

  const { data: order, error } = await supabase
    .from('orders')
    .insert({
      product_id,
      buyer_email,
      razorpay_payment_id,
      razorpay_order_id,
      status: 'paid',
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: 'Failed to store order' }, { status: 500 })
  }

  const { data: product } = await supabase
    .from('products')
    .select('name, file_path')
    .eq('id', product_id)
    .single()

  if (product?.file_path && buyer_email) {
    const { data: signedUrl } = await supabase.storage
      .from('products')
      .createSignedUrl(product.file_path, 60 * 60 * 24)

    if (signedUrl) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: 'Taar <noreply@taar.bio>',
        to: buyer_email,
        subject: `Your download: ${product.name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto;">
            <h2 style="color: #E8593C;">Your purchase is ready!</h2>
            <p>Thanks for buying <strong>${product.name}</strong>.</p>
            <p>
              <a href="${signedUrl.signedUrl}" style="background: #E8593C; color: white; padding: 12px 24px; border-radius: 24px; text-decoration: none; display: inline-block; margin: 16px 0;">
                Download now &rarr;
              </a>
            </p>
            <p style="color: #999; font-size: 12px;">This link expires in 24 hours.</p>
            <p style="color: #999; font-size: 12px;">Powered by Taar &middot; Your thread to everything.</p>
          </div>
        `,
      })
    }
  }

  return NextResponse.json({ ok: true, order_id: order.id })
}

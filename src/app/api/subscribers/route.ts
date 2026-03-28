import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { page_id, email } = await request.json()

  if (!page_id || !email) {
    return NextResponse.json({ error: 'page_id and email required' }, { status: 400 })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  const supabase = createClient()

  // Get the creator user_id from the page
  const { data: page } = await supabase
    .from('pages')
    .select('user_id, email_capture_enabled')
    .eq('id', page_id)
    .single()

  if (!page || !page.email_capture_enabled) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const { error } = await supabase.from('subscribers').upsert(
    { creator_user_id: page.user_id, email, page_id },
    { onConflict: 'creator_user_id,email', ignoreDuplicates: true }
  )

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

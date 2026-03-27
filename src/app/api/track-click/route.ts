import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { link_id, device_type } = await request.json()

  if (!link_id) {
    return NextResponse.json({ error: 'link_id required' }, { status: 400 })
  }

  const supabase = createClient()

  // Get country from CF headers if available
  const country = request.headers.get('cf-ipcountry') || null

  const { error } = await supabase.from('link_clicks').insert({
    link_id,
    device_type: device_type || 'unknown',
    country,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

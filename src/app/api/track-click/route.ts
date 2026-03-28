import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

function parseReferrerSource(referrer: string | null): string {
  if (!referrer) return 'direct'
  if (/instagram\.com/i.test(referrer)) return 'instagram'
  if (/youtube\.com|youtu\.be/i.test(referrer)) return 'youtube'
  if (/whatsapp\.com|wa\.me/i.test(referrer)) return 'whatsapp'
  if (/tiktok\.com/i.test(referrer)) return 'tiktok'
  if (/twitter\.com|t\.co|x\.com/i.test(referrer)) return 'twitter'
  return 'other'
}

export async function POST(request: Request) {
  const { link_id, device_type, referrer } = await request.json()

  if (!link_id) {
    return NextResponse.json({ error: 'link_id required' }, { status: 400 })
  }

  const supabase = createClient()

  const country =
    request.headers.get('x-vercel-ip-country') ||
    request.headers.get('cf-ipcountry') ||
    null
  const rawCity =
    request.headers.get('x-vercel-ip-city') ||
    request.headers.get('cf-ipcity') ||
    null
  const city = rawCity ? decodeURIComponent(rawCity) : null

  const { error } = await supabase.from('link_clicks').insert({
    link_id,
    device_type: device_type || 'unknown',
    country,
    city,
    referrer_source: parseReferrerSource(referrer || null),
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

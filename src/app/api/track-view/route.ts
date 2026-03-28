import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function parseReferrerSource(referrer: string | null): string {
  if (!referrer) return 'direct'
  if (/instagram\.com/i.test(referrer)) return 'instagram'
  if (/youtube\.com|youtu\.be/i.test(referrer)) return 'youtube'
  if (/whatsapp\.com|wa\.me/i.test(referrer)) return 'whatsapp'
  if (/tiktok\.com/i.test(referrer)) return 'tiktok'
  if (/twitter\.com|t\.co|x\.com/i.test(referrer)) return 'twitter'
  return 'other'
}

function parseDeviceType(ua: string | null): string {
  if (!ua) return 'unknown'
  if (/mobile/i.test(ua)) return 'mobile'
  if (/tablet|ipad/i.test(ua)) return 'tablet'
  return 'desktop'
}

export async function POST(request: Request) {
  try {
    const { page_id, referrer } = await request.json()
    if (!page_id) return NextResponse.json({ ok: true }) // silent fail

    // Geo from Vercel/Cloudflare edge headers
    const country =
      request.headers.get('x-vercel-ip-country') ||
      request.headers.get('cf-ipcountry') ||
      null
    const city =
      request.headers.get('x-vercel-ip-city') ||
      request.headers.get('cf-ipcity') ||
      null

    const ua = request.headers.get('user-agent')
    const device_type = parseDeviceType(ua)
    const referrer_source = parseReferrerSource(referrer)

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    await supabase.from('page_views').insert({
      page_id,
      referrer: referrer || null,
      referrer_source,
      device_type,
      country,
      city: city ? decodeURIComponent(city) : null,
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: true }) // never surface errors to visitors
  }
}

import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Instagram Basic Display API
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('user_id')

  if (!userId) {
    return NextResponse.json({ error: 'user_id required' }, { status: 400 })
  }

  const supabase = createClient()
  const { data: user } = await supabase
    .from('users')
    .select('instagram_handle, is_pro')
    .eq('id', userId)
    .single()

  if (!user?.is_pro || !user.instagram_handle) {
    return NextResponse.json({ reels: [] })
  }

  // Fetch public reels via Instagram oEmbed (no auth required for public posts)
  // In production, use Instagram Basic Display API with user access token
  // For now, return empty - users connect via their handle
  return NextResponse.json({ reels: [], handle: user.instagram_handle })
}

export async function POST(request: Request) {
  const { instagram_handle } = await request.json()
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { error } = await supabase
    .from('users')
    .update({ instagram_handle })
    .eq('id', user.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}

import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

const RESERVED = new Set([
  'admin','api','dashboard','login','signup','demo','blog','pricing','features',
  'about','contact','terms','privacy','help','support','taar','www','app',
])

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username')?.toLowerCase().trim()

  if (!username) return NextResponse.json({ available: false, error: 'Username required' })

  const re = /^[a-zA-Z0-9_-]+$/
  if (username.length < 3 || username.length > 20 || !re.test(username)) {
    return NextResponse.json({ available: false, error: 'Invalid username' })
  }

  if (RESERVED.has(username)) {
    return NextResponse.json({ available: false, suggestion: `${username}_` })
  }

  const supabase = createClient()
  const { data } = await supabase
    .from('users')
    .select('id')
    .eq('username', username)
    .single()

  if (data) {
    const suggestion = `${username}${Math.floor(Math.random() * 90) + 10}`
    return NextResponse.json({ available: false, suggestion })
  }

  return NextResponse.json({ available: true })
}

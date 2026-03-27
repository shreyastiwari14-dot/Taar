import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const error = requestUrl.searchParams.get('error')
  const origin = requestUrl.origin

  if (error) {
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(error)}`)
  }

  if (code) {
    try {
      const supabase = createClient()
      const { data: { user }, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

      if (exchangeError || !user) {
        return NextResponse.redirect(`${origin}/login?error=auth_failed`)
      }

      // Check if user has a page, if not create one
      const { data: existingPage } = await supabase
        .from('pages')
        .select('id')
        .eq('user_id', user.id)
        .single()

      if (!existingPage) {
        await supabase.from('pages').insert({
          user_id: user.id,
          template_id: 'streetwear',
          is_published: false,
        })
      }

      return NextResponse.redirect(`${origin}/dashboard`)
    } catch {
      return NextResponse.redirect(`${origin}/login?error=auth_failed`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_failed`)
}

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

      // Respect post-login redirect if present (e.g. ?redirect=/dashboard/analytics)
      const redirectTo = requestUrl.searchParams.get('redirect')
      const destination = redirectTo && redirectTo.startsWith('/') ? redirectTo : '/dashboard'
      return NextResponse.redirect(`${origin}${destination}`)
    } catch {
      return NextResponse.redirect(`${origin}/login?error=auth_failed`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_failed`)
}

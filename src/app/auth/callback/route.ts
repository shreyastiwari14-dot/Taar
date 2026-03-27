import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin

  if (code) {
    const supabase = createClient()
    const { data: { user }, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && user) {
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
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_failed`)
}

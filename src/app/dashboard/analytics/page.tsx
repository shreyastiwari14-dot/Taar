import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { AnalyticsDashboard } from '@/components/dashboard/AnalyticsDashboard'

export default async function AnalyticsPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: userData } = await supabase
    .from('users')
    .select('is_pro')
    .eq('id', user.id)
    .single()

  const isPro = true
  const days = 30

  const { data: page } = await supabase
    .from('pages')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!page) return <div className="p-8 text-gray-500">No page found.</div>

  const { data: links } = await supabase
    .from('links')
    .select('id, label, type')
    .eq('page_id', page.id)

  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()

  const [{ data: clicks }, { data: views }] = await Promise.all([
    supabase
      .from('link_clicks')
      .select('id, link_id, clicked_at, device_type, referrer_source')
      .in('link_id', (links || []).map((l) => l.id))
      .gte('clicked_at', since)
      .order('clicked_at', { ascending: false }),
    supabase
      .from('page_views')
      .select('id, viewed_at, referrer_source, device_type, country, city')
      .eq('page_id', page.id)
      .gte('viewed_at', since)
      .order('viewed_at', { ascending: false }),
  ])

  return (
    <AnalyticsDashboard
      links={links || []}
      clicks={clicks || []}
      views={views || []}
      isPro={isPro}
      days={days}
    />
  )
}

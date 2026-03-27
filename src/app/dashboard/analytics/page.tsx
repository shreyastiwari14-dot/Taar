import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ProGate } from '@/components/dashboard/ProGate'
import { AnalyticsDashboard } from '@/components/dashboard/AnalyticsDashboard'

export default async function AnalyticsPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: userData } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!userData?.is_pro) {
    return <ProGate feature="Analytics" />
  }

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

  // Get clicks for last 7 days
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  const { data: clicks } = await supabase
    .from('link_clicks')
    .select('id, link_id, clicked_at, device_type')
    .in('link_id', (links || []).map((l) => l.id))
    .gte('clicked_at', sevenDaysAgo)
    .order('clicked_at', { ascending: false })

  return <AnalyticsDashboard links={links || []} clicks={clicks || []} />
}

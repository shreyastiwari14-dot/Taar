import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { LinkEditor } from '@/components/dashboard/LinkEditor'

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [{ data: userData }, { data: pageData }] = await Promise.all([
    supabase.from('users').select('*').eq('id', user.id).single(),
    supabase.from('pages').select('*').eq('user_id', user.id).single(),
  ])

  if (!pageData) {
    // Create page if it doesn't exist
    const { data: newPage } = await supabase
      .from('pages')
      .insert({ user_id: user.id, template_id: 'streetwear' })
      .select()
      .single()

    const { data: linksData } = await supabase
      .from('links')
      .select('*')
      .eq('page_id', newPage?.id || '')
      .order('position')

    return <LinkEditor page={newPage} links={linksData || []} user={userData} />
  }

  const { data: linksData } = await supabase
    .from('links')
    .select('*')
    .eq('page_id', pageData.id)
    .order('position')

  return <LinkEditor page={pageData} links={linksData || []} user={userData} />
}

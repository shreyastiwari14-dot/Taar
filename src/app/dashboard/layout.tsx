import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { DashboardNav } from '@/components/dashboard/DashboardNav'
import { MobileBottomTabs } from '@/components/dashboard/MobileBottomTabs'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: userData } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <DashboardNav user={userData} />
      <main className="pt-16 pb-20 md:pb-0">
        {children}
      </main>
      <MobileBottomTabs isPro={userData?.is_pro ?? false} />
    </div>
  )
}

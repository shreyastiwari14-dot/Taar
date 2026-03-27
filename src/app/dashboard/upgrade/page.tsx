import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { UpgradeClient } from '@/components/dashboard/UpgradeClient'

export default async function UpgradePage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: userData } = await supabase
    .from('users')
    .select('is_pro, email')
    .eq('id', user.id)
    .single()

  if (userData?.is_pro) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="font-display text-3xl tracking-wider text-white mb-2">YOU&apos;RE PRO</h2>
          <p className="text-gray-500 text-sm">You already have a Pro subscription. All features are unlocked.</p>
        </div>
      </div>
    )
  }

  return <UpgradeClient email={userData?.email || user.email || ''} userId={user.id} />
}

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { CopyUrlButton } from './CopyUrlButton'

export default async function MediaKitDashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: userData } = await supabase
    .from('users')
    .select('username, is_pro')
    .eq('id', user.id)
    .single()

  if (!userData?.is_pro) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-4">📊</div>
        <h1 className="text-white text-2xl font-semibold mb-2">Media Kit</h1>
        <p className="text-gray-500 text-sm mb-6">
          A shareable page with your live stats — perfect for brand collab pitches.
        </p>
        <Link href="/dashboard/upgrade" className="inline-block bg-[#E8593C] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#d44e33] transition-colors">
          Unlock with Pro →
        </Link>
      </div>
    )
  }

  const username = userData.username
  const mediakitUrl = `https://taar.bio/${username}/mediakit`

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-8 pb-24">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-white text-2xl font-semibold">Media Kit</h1>
          <p className="text-gray-500 text-sm mt-0.5">Share your stats with brands & collaborators</p>
        </div>
        <Link
          href={`/${username}/mediakit`}
          target="_blank"
          className="text-sm bg-[#E8593C] text-white px-5 py-2 rounded-full hover:bg-[#d44e33] transition-colors"
        >
          View live →
        </Link>
      </div>

      {/* URL card */}
      <div className="bg-[#141414] border border-[#222] rounded-2xl p-6 mb-6">
        <p className="text-gray-500 text-xs mb-2">Your media kit URL</p>
        <div className="flex items-center gap-3">
          <code className="flex-1 text-white text-sm bg-[#0A0A0A] border border-[#333] rounded-xl px-4 py-3 truncate">
            {mediakitUrl}
          </code>
          <CopyUrlButton url={mediakitUrl} />
        </div>
      </div>

      {/* What's included */}
      <div className="bg-[#141414] border border-[#222] rounded-2xl p-6 mb-6">
        <h2 className="text-white font-semibold mb-4">What&apos;s included</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { icon: '👁', label: 'Page views (30d)' },
            { icon: '🔗', label: 'Link clicks (30d)' },
            { icon: '📈', label: 'CTR %' },
            { icon: '📱', label: 'Active channels' },
            { icon: '🤝', label: 'Collab CTA' },
            { icon: '🔄', label: 'Auto-updated live' },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-gray-400 text-sm">
              <span>{icon}</span><span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-[#141414] border border-[#222] rounded-2xl p-6">
        <h2 className="text-white font-semibold mb-4">How to use it</h2>
        <ol className="space-y-3 text-gray-400 text-sm list-decimal list-inside">
          <li>Copy your media kit URL above</li>
          <li>Share it with brands, agencies, or PR contacts via email or DM</li>
          <li>Stats update automatically — always shows latest 30-day data</li>
          <li>No login required for brands to view it</li>
        </ol>
      </div>
    </div>
  )
}

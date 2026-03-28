import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

interface Props { params: { username: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `${params.username} — Media Kit | Taar`,
    description: `${params.username}'s media kit — stats, audience, and collaboration info.`,
  }
}

export default async function MediaKitPage({ params }: Props) {
  const supabase = createClient()

  const { data: user } = await supabase
    .from('users')
    .select('id, username, is_pro')
    .eq('username', params.username)
    .single()

  if (!user) notFound()

  const { data: page } = await supabase
    .from('pages')
    .select('title, bio, avatar_url')
    .eq('user_id', user.id)
    .eq('is_published', true)
    .single()

  if (!page) notFound()

  // Get 30-day stats
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()

  const { data: pageData } = await supabase
    .from('pages')
    .select('id')
    .eq('user_id', user.id)
    .single()

  const [{ count: totalViews }, { count: totalClicks }, { data: links }] = await Promise.all([
    supabase.from('page_views').select('*', { count: 'exact', head: true }).eq('page_id', pageData?.id || '').gte('viewed_at', thirtyDaysAgo),
    supabase.from('link_clicks').select('*', { count: 'exact', head: true }).in('link_id', (await supabase.from('links').select('id').eq('page_id', pageData?.id || '')).data?.map(l => l.id) || []).gte('clicked_at', thirtyDaysAgo),
    supabase.from('links').select('id, label, type').eq('page_id', pageData?.id || '').eq('is_active', true),
  ])

  const displayName = page.title || params.username
  const ctr = totalViews && totalClicks ? ((totalClicks / totalViews) * 100).toFixed(1) : '0.0'

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <div className="border-b border-[#222] px-6 py-4 flex items-center justify-between">
        <a href="/" className="font-display text-xl tracking-wider text-[#E8593C]">TAAR</a>
        <span className="text-gray-600 text-xs">Media Kit</span>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">

        {/* Creator header */}
        <div className="flex items-center gap-6 mb-12">
          <div className="w-20 h-20 rounded-full bg-[#222] border border-[#333] flex items-center justify-center overflow-hidden shrink-0">
            {page.avatar_url
              ? <img src={page.avatar_url} alt={displayName} className="w-full h-full object-cover" />
              : <span className="text-3xl font-bold text-white">{displayName[0]?.toUpperCase()}</span>
            }
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">{displayName}</h1>
            <p className="text-gray-400 text-sm mt-1">taar.bio/{params.username}</p>
            {page.bio && <p className="text-gray-500 text-sm mt-2 max-w-md">{page.bio}</p>}
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Page Views', value: (totalViews || 0).toLocaleString('en-IN'), sub: 'last 30 days' },
            { label: 'Link Clicks', value: (totalClicks || 0).toLocaleString('en-IN'), sub: 'last 30 days' },
            { label: 'Click-through Rate', value: `${ctr}%`, sub: 'engagement rate' },
          ].map(({ label, value, sub }) => (
            <div key={label} className="bg-[#141414] border border-[#222] rounded-2xl p-6 text-center">
              <p className="text-3xl font-bold text-white mb-1">{value}</p>
              <p className="text-gray-400 text-xs font-medium">{label}</p>
              <p className="text-gray-600 text-xs mt-0.5">{sub}</p>
            </div>
          ))}
        </div>

        {/* Active links */}
        {links && links.length > 0 && (
          <div className="mb-10">
            <h2 className="text-white font-semibold mb-4">Active channels</h2>
            <div className="flex flex-wrap gap-2">
              {links.map((link) => (
                <span key={link.id} className="bg-[#141414] border border-[#222] px-4 py-2 rounded-full text-sm text-gray-300 capitalize">
                  {link.type === 'url' ? link.label : link.type}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Collab CTA */}
        <div className="bg-[#141414] border border-[#E8593C]/20 rounded-2xl p-8 text-center">
          <h2 className="text-white font-semibold text-xl mb-2">Interested in collaborating?</h2>
          <p className="text-gray-500 text-sm mb-6">Reach out directly via my Taar page.</p>
          <a
            href={`/` + params.username}
            className="inline-block bg-[#E8593C] text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-[#d44e33] transition-colors"
          >
            Visit my page →
          </a>
        </div>

        <p className="text-center text-gray-700 text-xs mt-8">
          Made with <a href="/" className="text-gray-600 hover:text-gray-400">TAAR</a>
        </p>
      </div>
    </div>
  )
}

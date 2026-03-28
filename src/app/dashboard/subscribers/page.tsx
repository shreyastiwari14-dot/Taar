import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function SubscribersPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: subscribers } = await supabase
    .from('subscribers')
    .select('id, email, created_at')
    .eq('creator_user_id', user.id)
    .order('created_at', { ascending: false })

  const list = subscribers || []

  function downloadCSV() {
    // Server component — CSV download handled client-side via link
    return null
  }

  const csvContent = 'data:text/csv;charset=utf-8,Email,Subscribed At\n' +
    list.map((s) => `${s.email},${new Date(s.created_at).toLocaleDateString('en-IN')}`).join('\n')

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-8 pb-24">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-white text-2xl font-semibold">Subscribers</h1>
          <p className="text-gray-500 text-sm mt-0.5">{list.length} email{list.length !== 1 ? 's' : ''} collected</p>
        </div>
        {list.length > 0 && (
          <a
            href={encodeURI(csvContent)}
            download={`taar-subscribers-${new Date().toISOString().slice(0, 10)}.csv`}
            className="text-xs text-white/50 hover:text-white border border-white/10 hover:border-white/30 px-3 py-1.5 rounded-lg transition-colors"
          >
            Export CSV ↓
          </a>
        )}
      </div>

      {list.length === 0 ? (
        <div className="bg-[#141414] border border-[#222] rounded-2xl p-12 text-center">
          <div className="text-4xl mb-3">📬</div>
          <p className="text-white font-medium mb-1">No subscribers yet</p>
          <p className="text-gray-500 text-sm mb-5">Enable email capture on your page to start collecting emails.</p>
          <Link href="/dashboard" className="text-sm bg-[#E8593C] text-white px-5 py-2 rounded-full hover:bg-[#d44e33] transition-colors">
            Go to Editor →
          </Link>
        </div>
      ) : (
        <div className="bg-[#141414] border border-[#222] rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1a1a1a]">
                <th className="text-left px-6 py-3 text-gray-600 text-xs font-normal">#</th>
                <th className="text-left px-6 py-3 text-gray-600 text-xs font-normal">Email</th>
                <th className="text-right px-6 py-3 text-gray-600 text-xs font-normal">Date</th>
              </tr>
            </thead>
            <tbody>
              {list.map((sub, idx) => (
                <tr key={sub.id} className={idx < list.length - 1 ? 'border-b border-[#1a1a1a]' : ''}>
                  <td className="px-6 py-3 text-gray-600 text-sm">{idx + 1}</td>
                  <td className="px-6 py-3 text-white/80 text-sm">{sub.email}</td>
                  <td className="px-6 py-3 text-right text-gray-500 text-xs">
                    {new Date(sub.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

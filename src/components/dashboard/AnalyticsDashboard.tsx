'use client'

import { useMemo, useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend,
} from 'recharts'
import { getLinkIcon } from '@/lib/utils'
import Link from 'next/link'

interface LinkMeta { id: string; label: string; type: string }

interface PageView {
  id: string
  viewed_at: string
  referrer_source: string | null
  device_type: string | null
  country: string | null
  city: string | null
}

interface Click {
  id: string
  link_id: string
  clicked_at: string
  device_type: string | null
  referrer_source: string | null
}

interface Props {
  links: LinkMeta[]
  clicks: Click[]
  views: PageView[]
  isPro: boolean
  days: number
}

const SOURCE_COLORS: Record<string, string> = {
  instagram: '#E1306C',
  youtube: '#FF0000',
  whatsapp: '#25D366',
  tiktok: '#010101',
  twitter: '#1DA1F2',
  direct: '#E8593C',
  other: '#555',
}

const SOURCE_LABELS: Record<string, string> = {
  instagram: 'Instagram',
  youtube: 'YouTube',
  whatsapp: 'WhatsApp',
  tiktok: 'TikTok',
  twitter: 'Twitter / X',
  direct: 'Direct',
  other: 'Other',
}

function buildDailyData(views: PageView[], clicks: Click[], days: number) {
  const result: { date: string; label: string; views: number; clicks: number }[] = []
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000)
    const dateKey = d.toISOString().slice(0, 10)
    const label = d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })
    result.push({ date: dateKey, label, views: 0, clicks: 0 })
  }
  views.forEach((v) => {
    const key = v.viewed_at.slice(0, 10)
    const entry = result.find((r) => r.date === key)
    if (entry) entry.views++
  })
  clicks.forEach((c) => {
    const key = c.clicked_at.slice(0, 10)
    const entry = result.find((r) => r.date === key)
    if (entry) entry.clicks++
  })
  return result
}

function buildSourceData(views: PageView[]) {
  const counts: Record<string, number> = {}
  views.forEach((v) => {
    const src = v.referrer_source || 'direct'
    counts[src] = (counts[src] || 0) + 1
  })
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({ name, value, label: SOURCE_LABELS[name] || name }))
}

export function AnalyticsDashboard({ links, clicks, views, isPro, days }: Props) {
  const [activeChart, setActiveChart] = useState<'views' | 'clicks'>('views')

  const totalViews = views.length
  const totalClicks = clicks.length
  const ctr = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : '0.0'

  const topSource = useMemo(() => {
    const counts: Record<string, number> = {}
    views.forEach((v) => { const s = v.referrer_source || 'direct'; counts[s] = (counts[s] || 0) + 1 })
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]
    return top ? SOURCE_LABELS[top[0]] || top[0] : 'Direct'
  }, [views])

  const dailyData = useMemo(() => buildDailyData(views, clicks, days), [views, clicks, days])
  const sourceData = useMemo(() => buildSourceData(views), [views])

  const clicksByLink = useMemo(() => {
    const map: Record<string, number> = {}
    clicks.forEach((c) => { map[c.link_id] = (map[c.link_id] || 0) + 1 })
    return map
  }, [clicks])

  const deviceStats = useMemo(() => {
    const mobile = views.filter((v) => v.device_type === 'mobile').length
    const desktop = views.filter((v) => v.device_type === 'desktop').length
    const tablet = views.filter((v) => v.device_type === 'tablet').length
    const total = mobile + desktop + tablet || 1
    return { mobile: Math.round((mobile / total) * 100), desktop: Math.round((desktop / total) * 100), tablet }
  }, [views])

  const topCities = useMemo(() => {
    const counts: Record<string, number> = {}
    views.forEach((v) => { if (v.city) counts[v.city] = (counts[v.city] || 0) + 1 })
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5)
  }, [views])

  const sortedLinks = [...links]
    .sort((a, b) => (clicksByLink[b.id] || 0) - (clicksByLink[a.id] || 0))

  function exportCSV() {
    const header = 'Date,Page Views,Link Clicks\n'
    const rows = dailyData.map((d) => `${d.date},${d.views},${d.clicks}`).join('\n')
    const blob = new Blob([header + rows], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `taar-analytics-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const hasNoData = totalViews === 0 && totalClicks === 0

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 pb-24">

      {/* Header */}
      <div className="flex items-center justify-between mb-2 flex-wrap gap-3">
        <div>
          <h1 className="text-white text-2xl font-semibold">Analytics</h1>
          <p className="text-gray-500 text-sm mt-0.5">Last {days} days</p>
        </div>
        <div className="flex items-center gap-3">
          {isPro && (
            <button
              onClick={exportCSV}
              className="text-xs text-white/50 hover:text-white border border-white/10 hover:border-white/30 px-3 py-1.5 rounded-lg transition-colors"
            >
              Export CSV ↓
            </button>
          )}
          <span className={`text-xs px-2.5 py-1 rounded-full font-mono ${isPro ? 'bg-[#E8593C]/15 text-[#E8593C]' : 'bg-white/5 text-white/40'}`}>
            {isPro ? `Pro · ${days}d` : `Free · ${days}d`}
          </span>
        </div>
      </div>

      {/* Free upgrade banner */}
      {!isPro && (
        <div className="mb-6 flex items-center justify-between gap-4 bg-[#1a0a07] border border-[#E8593C]/20 rounded-xl px-5 py-3">
          <p className="text-white/60 text-sm">Upgrade to Pro for 30-day history and city-level location data.</p>
          <Link href="/dashboard/upgrade" className="shrink-0 text-xs bg-[#E8593C] text-white px-4 py-2 rounded-full hover:bg-[#d44e33] transition-colors">
            Go Pro →
          </Link>
        </div>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Page views', value: totalViews.toLocaleString('en-IN'), sub: `last ${days} days` },
          { label: 'Link clicks', value: totalClicks.toLocaleString('en-IN'), sub: 'total' },
          { label: 'Click-through rate', value: `${ctr}%`, sub: 'clicks / views' },
          { label: 'Top source', value: topSource, sub: 'most visits from' },
        ].map(({ label, value, sub }) => (
          <div key={label} className="bg-[#141414] border border-[#222] rounded-2xl p-5">
            <p className="text-gray-500 text-xs mb-1">{label}</p>
            <p className="text-white font-semibold text-xl leading-tight">{value}</p>
            <p className="text-gray-600 text-xs mt-1">{sub}</p>
          </div>
        ))}
      </div>

      {/* Line chart */}
      <div className="bg-[#141414] border border-[#222] rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-semibold">Daily traffic</h2>
          <div className="flex rounded-lg overflow-hidden border border-[#2a2a2a]">
            {(['views', 'clicks'] as const).map((key) => (
              <button
                key={key}
                onClick={() => setActiveChart(key)}
                className={`px-3 py-1 text-xs capitalize transition-colors ${activeChart === key ? 'bg-[#E8593C] text-white' : 'bg-transparent text-gray-500 hover:text-white'}`}
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        {hasNoData ? (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">📈</p>
            <p className="text-gray-500 text-sm">Share your Taar link to start seeing data here.</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={dailyData} margin={{ top: 4, right: 8, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" vertical={false} />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#555', fontSize: 11 }}
                interval={days > 7 ? 4 : 0}
              />
              <YAxis
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#555', fontSize: 11 }}
              />
              <Tooltip
                contentStyle={{ background: '#0A0A0A', border: '1px solid #222', borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: '#fff' }}
                itemStyle={{ color: '#E8593C' }}
                cursor={{ stroke: '#E8593C22', strokeWidth: 1 }}
              />
              <Line
                type="monotone"
                dataKey={activeChart}
                stroke="#E8593C"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: '#E8593C', stroke: '#0A0A0A', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Traffic sources pie */}
        <div className="bg-[#141414] border border-[#222] rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-5">Traffic sources</h2>
          {sourceData.length === 0 ? (
            <div className="text-center py-8 text-gray-600 text-sm">No data yet.</div>
          ) : (
            <div className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={sourceData}
                    dataKey="value"
                    nameKey="label"
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    innerRadius={40}
                    paddingAngle={2}
                    strokeWidth={0}
                  >
                    {sourceData.map((entry) => (
                      <Cell key={entry.name} fill={SOURCE_COLORS[entry.name] || '#555'} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: '#0A0A0A', border: '1px solid #222', borderRadius: 8, fontSize: 12 }}
                    itemStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="w-full space-y-1.5 mt-2">
                {sourceData.map(({ name, label, value }) => (
                  <div key={name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: SOURCE_COLORS[name] || '#555' }} />
                      <span className="text-gray-400 text-xs">{label}</span>
                    </div>
                    <span className="text-white text-xs font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Device split + Top locations */}
        <div className="flex flex-col gap-6">
          {/* Device split */}
          <div className="bg-[#141414] border border-[#222] rounded-2xl p-6 flex-1">
            <h2 className="text-white font-semibold mb-4">Devices</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Mobile', pct: deviceStats.mobile, icon: '📱' },
                { label: 'Desktop', pct: deviceStats.desktop, icon: '💻' },
              ].map(({ label, pct, icon }) => (
                <div key={label} className="text-center">
                  <div className="text-3xl mb-1">{icon}</div>
                  <div className="text-white text-2xl font-semibold">{pct}%</div>
                  <div className="text-gray-500 text-xs">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Top cities */}
          <div className={`bg-[#141414] border border-[#222] rounded-2xl p-6 flex-1 ${!isPro ? 'relative overflow-hidden' : ''}`}>
            <h2 className="text-white font-semibold mb-4">Top cities</h2>
            {!isPro ? (
              <>
                <div className="space-y-2 opacity-30 pointer-events-none select-none">
                  {['Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Chennai'].map((city, i) => (
                    <div key={city} className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">{i + 1}. {city}</span>
                      <span className="text-white text-sm">—</span>
                    </div>
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-[#141414]/80 backdrop-blur-[2px]">
                  <Link href="/dashboard/upgrade" className="text-xs bg-[#E8593C] text-white px-4 py-2 rounded-full hover:bg-[#d44e33]">
                    Unlock with Pro →
                  </Link>
                </div>
              </>
            ) : topCities.length === 0 ? (
              <p className="text-gray-600 text-sm">No location data yet.</p>
            ) : (
              <div className="space-y-2">
                {topCities.map(([city, count], i) => (
                  <div key={city} className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">{i + 1}. {city}</span>
                    <span className="text-white text-sm font-medium">{count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Links performance table */}
      <div className="bg-[#141414] border border-[#222] rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#222]">
          <h2 className="text-white font-semibold">Links performance</h2>
        </div>
        {sortedLinks.length === 0 ? (
          <div className="px-6 py-8 text-center text-gray-600 text-sm">Add links to see performance data.</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1a1a1a]">
                <th className="text-left px-6 py-3 text-gray-600 text-xs font-normal">Link</th>
                <th className="text-right px-6 py-3 text-gray-600 text-xs font-normal">Clicks</th>
                <th className="text-right px-6 py-3 text-gray-600 text-xs font-normal hidden sm:table-cell">Share</th>
              </tr>
            </thead>
            <tbody>
              {sortedLinks.map((link, idx) => {
                const count = clicksByLink[link.id] || 0
                const pct = totalClicks > 0 ? (count / totalClicks) * 100 : 0
                return (
                  <tr key={link.id} className={idx < sortedLinks.length - 1 ? 'border-b border-[#1a1a1a]' : ''}>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{getLinkIcon(link.type as any)}</span>
                        <span className="text-white/80 text-sm truncate max-w-[180px]">{link.label}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <span className="text-white font-semibold text-sm">{count}</span>
                    </td>
                    <td className="px-6 py-3 hidden sm:table-cell">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-24 h-1.5 bg-[#222] rounded-full overflow-hidden">
                          <div className="h-full bg-[#E8593C] rounded-full transition-all" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-gray-500 text-xs w-10 text-right">{pct.toFixed(0)}%</span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

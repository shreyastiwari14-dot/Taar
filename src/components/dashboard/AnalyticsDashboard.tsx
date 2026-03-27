'use client'

import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { getLinkIcon } from '@/lib/utils'

interface LinkMeta {
  id: string
  label: string
  type: string
}

interface Click {
  id: string
  link_id: string
  clicked_at: string
  device_type: string | null
}

interface Props {
  links: LinkMeta[]
  clicks: Click[]
}

export function AnalyticsDashboard({ links, clicks }: Props) {
  const totalClicks = clicks.length

  const clicksByLink = useMemo(() => {
    const map: Record<string, number> = {}
    clicks.forEach((c) => {
      map[c.link_id] = (map[c.link_id] || 0) + 1
    })
    return map
  }, [clicks])

  const topLink = useMemo(() => {
    let max = 0
    let topId = ''
    Object.entries(clicksByLink).forEach(([id, count]) => {
      if (count > max) { max = count; topId = id }
    })
    return links.find((l) => l.id === topId)
  }, [clicksByLink, links])

  const dailyData = useMemo(() => {
    const days: Record<string, number> = {}
    for (let i = 6; i >= 0; i--) {
      const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
      const key = d.toLocaleDateString('en-IN', { weekday: 'short' })
      days[key] = 0
    }
    clicks.forEach((c) => {
      const d = new Date(c.clicked_at)
      const key = d.toLocaleDateString('en-IN', { weekday: 'short' })
      if (key in days) days[key]++
    })
    return Object.entries(days).map(([day, count]) => ({ day, count }))
  }, [clicks])

  const deviceBreakdown = useMemo(() => {
    const map: Record<string, number> = {}
    clicks.forEach((c) => {
      const d = c.device_type || 'unknown'
      map[d] = (map[d] || 0) + 1
    })
    return map
  }, [clicks])

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-8">
      <h1 className="font-display text-4xl tracking-wider text-white mb-2">ANALYTICS</h1>
      <p className="text-gray-500 text-sm mb-8">Last 7 days</p>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#141414] border border-[#222] rounded-2xl p-5">
          <div className="text-gray-500 text-xs mb-1">Total clicks</div>
          <div className="font-display text-4xl text-white">{totalClicks}</div>
        </div>
        <div className="bg-[#141414] border border-[#222] rounded-2xl p-5">
          <div className="text-gray-500 text-xs mb-1">Top link</div>
          <div className="font-semibold text-white text-sm truncate">
            {topLink ? (
              <span>{getLinkIcon(topLink.type as any)} {topLink.label}</span>
            ) : (
              <span className="text-gray-600">—</span>
            )}
          </div>
          {topLink && (
            <div className="text-[#E8593C] text-xs mt-1">{clicksByLink[topLink.id]} clicks</div>
          )}
        </div>
        <div className="bg-[#141414] border border-[#222] rounded-2xl p-5">
          <div className="text-gray-500 text-xs mb-2">Devices</div>
          {Object.entries(deviceBreakdown).map(([device, count]) => (
            <div key={device} className="flex items-center justify-between text-xs">
              <span className="text-gray-400 capitalize">{device}</span>
              <span className="text-white">{count}</span>
            </div>
          ))}
          {Object.keys(deviceBreakdown).length === 0 && (
            <div className="text-gray-600 text-xs">No data</div>
          )}
        </div>
      </div>

      {/* Daily chart */}
      <div className="bg-[#141414] border border-[#222] rounded-2xl p-6 mb-8">
        <h2 className="font-semibold text-white mb-4">Clicks over 7 days</h2>
        {totalClicks === 0 ? (
          <div className="text-center py-8 text-gray-600">
            <div className="text-2xl mb-2">📈</div>
            <p className="text-sm">Your thread is warming up. Share your Taar link to start seeing clicks.</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={dailyData}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#666', fontSize: 11 }} />
              <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fill: '#666', fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: '#0A0A0A', border: '1px solid #222', borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: '#fff' }}
                itemStyle={{ color: '#E8593C' }}
                cursor={{ fill: '#E8593C11' }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {dailyData.map((entry, index) => (
                  <Cell key={index} fill="#E8593C" opacity={entry.count > 0 ? 1 : 0.2} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Per-link breakdown */}
      <div className="bg-[#141414] border border-[#222] rounded-2xl p-6">
        <h2 className="font-semibold text-white mb-4">Clicks per link</h2>
        <div className="space-y-3">
          {links.map((link) => {
            const count = clicksByLink[link.id] || 0
            const pct = totalClicks > 0 ? (count / totalClicks) * 100 : 0
            return (
              <div key={link.id}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-300">
                    {getLinkIcon(link.type as any)} {link.label}
                  </span>
                  <span className="text-sm text-white">{count}</span>
                </div>
                <div className="h-1.5 bg-[#222] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#E8593C] rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          })}
          {links.length === 0 && (
            <p className="text-gray-600 text-sm">No links yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const tabs = [
  {
    href: '/dashboard',
    label: 'Editor',
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="6" height="6" rx="1.5" fill={active ? '#E8593C' : 'currentColor'} fillOpacity={active ? 1 : 0.4} />
        <rect x="11" y="3" width="6" height="6" rx="1.5" fill={active ? '#E8593C' : 'currentColor'} fillOpacity={active ? 1 : 0.4} />
        <rect x="3" y="11" width="6" height="6" rx="1.5" fill={active ? '#E8593C' : 'currentColor'} fillOpacity={active ? 1 : 0.4} />
        <rect x="11" y="11" width="6" height="6" rx="1.5" fill={active ? '#E8593C' : 'currentColor'} fillOpacity={active ? 1 : 0.4} />
      </svg>
    ),
  },
  {
    href: '/dashboard/analytics',
    label: 'Analytics',
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="12" width="3" height="5" rx="1" fill={active ? '#E8593C' : 'currentColor'} fillOpacity={active ? 1 : 0.4} />
        <rect x="8.5" y="8" width="3" height="9" rx="1" fill={active ? '#E8593C' : 'currentColor'} fillOpacity={active ? 1 : 0.4} />
        <rect x="14" y="4" width="3" height="13" rx="1" fill={active ? '#E8593C' : 'currentColor'} fillOpacity={active ? 1 : 0.4} />
      </svg>
    ),
  },
  {
    href: '/dashboard/subscribers',
    label: 'Subs',
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 16c0-3 1.8-4 7-4s7 1 7 4" stroke={active ? '#E8593C' : 'currentColor'} strokeOpacity={active ? 1 : 0.4} strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="10" cy="7" r="3.5" stroke={active ? '#E8593C' : 'currentColor'} strokeOpacity={active ? 1 : 0.4} strokeWidth="1.5"/>
        <path d="M15.5 8.5v3M14 10h3" stroke={active ? '#E8593C' : 'currentColor'} strokeOpacity={active ? 1 : 0.4} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    href: '/dashboard/products',
    label: 'Products',
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 5h14l-1.5 8H4.5L3 5z" stroke={active ? '#E8593C' : 'currentColor'} strokeOpacity={active ? 1 : 0.4} strokeWidth="1.5" strokeLinejoin="round" fill="none" />
        <circle cx="7.5" cy="16" r="1.25" fill={active ? '#E8593C' : 'currentColor'} fillOpacity={active ? 1 : 0.4} />
        <circle cx="13.5" cy="16" r="1.25" fill={active ? '#E8593C' : 'currentColor'} fillOpacity={active ? 1 : 0.4} />
      </svg>
    ),
  },
  {
    href: '/dashboard/upgrade',
    label: 'Upgrade',
    upgradeOnly: true,
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 3l2.5 4H17l-3.5 3 1.5 4.5L10 12l-5 2.5 1.5-4.5L3 7h4.5L10 3z" fill={active ? '#E8593C' : 'currentColor'} fillOpacity={active ? 1 : 0.4} />
      </svg>
    ),
  },
]

export function MobileBottomTabs({ isPro }: { isPro: boolean }) {
  const pathname = usePathname()

  const visibleTabs = isPro ? tabs.filter((t) => !t.upgradeOnly) : tabs

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0A0A0A] border-t border-[#222] safe-area-pb">
      <div className={`grid h-16`} style={{ gridTemplateColumns: `repeat(${visibleTabs.length}, 1fr)` }}>
        {visibleTabs.map((tab) => {
          const active = pathname === tab.href
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 transition-colors',
                active ? 'text-[#E8593C]' : 'text-white/40 hover:text-white/70'
              )}
            >
              {tab.icon(active)}
              <span className="text-[10px] font-medium tracking-wide">{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { User } from '@/lib/types'
import { cn } from '@/lib/utils'

export function DashboardNav({ user }: { user: User | null }) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [signingOut, setSigningOut] = useState(false)

  async function signOut() {
    setSigningOut(true)
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const navItems = [
    { href: '/dashboard', label: 'Editor' },
    { href: '/dashboard/analytics', label: 'Analytics' },
    { href: '/dashboard/products', label: 'Products', pro: true },
    { href: '/dashboard/subscribers', label: 'Subscribers' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0A0A0A] border-b border-[#222] flex items-center px-4 md:px-6">
      <Link href="/dashboard" className="font-display text-xl tracking-wider text-[#E8593C] mr-8">
        TAAR
      </Link>

      {/* Desktop nav items */}
      <div className="hidden md:flex items-center gap-1 flex-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'px-4 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5',
              pathname === item.href
                ? 'bg-[#222] text-white'
                : 'text-gray-500 hover:text-white hover:bg-[#161616]'
            )}
          >
            {item.label}
            {item.pro && !user?.is_pro && (
              <span className="text-[10px] bg-[#E8593C]/20 text-[#E8593C] px-1.5 py-0.5 rounded-full">
                PRO
              </span>
            )}
          </Link>
        ))}
      </div>

      {/* Mobile: spacer */}
      <div className="flex-1 md:hidden" />

      <div className="flex items-center gap-3">
        {!user?.is_pro && (
          <Link
            href="/dashboard/upgrade"
            className="hidden md:inline-flex text-sm bg-[#E8593C] text-white px-4 py-1.5 rounded-full hover:bg-[#d44e33] transition-colors font-medium"
          >
            Go Pro
          </Link>
        )}
        {user?.username && (
          <Link
            href={`/${user.username}`}
            target="_blank"
            className="hidden md:inline text-sm text-gray-500 hover:text-white transition-colors"
          >
            View page ↗
          </Link>
        )}
        {/* Avatar menu */}
        <div className="relative group">
          <button
            className="w-8 h-8 rounded-full bg-[#222] text-white text-sm font-semibold flex items-center justify-center hover:bg-[#333] transition-colors"
            aria-label="Account menu"
          >
            {user?.username?.[0]?.toUpperCase() || 'U'}
          </button>
          <div className="absolute right-0 top-full mt-2 w-48 bg-[#141414] border border-[#222] rounded-xl shadow-xl overflow-hidden opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
            {user?.username && (
              <Link
                href={`/${user.username}`}
                target="_blank"
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-[#1a1a1a] transition-colors"
              >
                View page ↗
              </Link>
            )}
            {!user?.is_pro && (
              <Link
                href="/dashboard/upgrade"
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#E8593C] hover:bg-[#1a1a1a] transition-colors"
              >
                Upgrade to Pro
              </Link>
            )}
            <button
              onClick={signOut}
              disabled={signingOut}
              className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:text-white hover:bg-[#1a1a1a] transition-colors disabled:opacity-40"
            >
              {signingOut ? 'Signing out…' : 'Sign out'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

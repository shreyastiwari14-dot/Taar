'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { User } from '@/lib/types'
import { cn } from '@/lib/utils'

export function DashboardNav({ user }: { user: User | null }) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/')
  }

  const navItems = [
    { href: '/dashboard', label: 'Editor' },
    { href: '/dashboard/analytics', label: 'Analytics', pro: true },
    { href: '/dashboard/products', label: 'Products', pro: true },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0A0A0A] border-b border-[#222] flex items-center px-4 md:px-6">
      <Link href="/" className="font-display text-xl tracking-wider text-[#E8593C] mr-8">
        TAAR
      </Link>

      <div className="flex items-center gap-1 flex-1">
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

      <div className="flex items-center gap-3">
        {!user?.is_pro && (
          <Link
            href="/dashboard/upgrade"
            className="text-sm bg-[#E8593C] text-white px-4 py-1.5 rounded-full hover:bg-[#d44e33] transition-colors font-medium"
          >
            Go Pro
          </Link>
        )}
        {user?.username && (
          <Link
            href={`/${user.username}`}
            target="_blank"
            className="text-sm text-gray-500 hover:text-white transition-colors"
          >
            View page ↗
          </Link>
        )}
        <button
          onClick={signOut}
          className="text-sm text-gray-600 hover:text-white transition-colors"
        >
          Sign out
        </button>
      </div>
    </nav>
  )
}

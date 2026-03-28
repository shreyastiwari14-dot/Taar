import { useEffect, useRef } from 'react'

export function useNavbarScroll() {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    function onScroll() {
      if (window.scrollY > 20) {
        nav?.classList.add('nav-scrolled')
      } else {
        nav?.classList.remove('nav-scrolled')
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return navRef
}

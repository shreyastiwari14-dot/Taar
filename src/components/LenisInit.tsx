'use client'
import { useEffect } from 'react'

export function LenisInit() {
  useEffect(() => {
    let cleanup: (() => void) | undefined
    import('@/lib/lenis').then(async ({ initLenis }) => {
      cleanup = await initLenis()
    })
    return () => cleanup?.()
  }, [])
  return null
}

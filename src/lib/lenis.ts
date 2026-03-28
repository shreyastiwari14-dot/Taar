// Lenis smooth scroll — initialized once via LenisInit client component
// All imports are dynamic to avoid SSR issues

export async function initLenis(): Promise<() => void> {
  if (typeof window === 'undefined') return () => {}
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}

  const [{ default: Lenis }, { gsap }] = await Promise.all([
    import('@studio-freight/lenis'),
    import('gsap'),
  ])

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    syncTouch: false,
  })

  // Use GSAP ticker so scrub animations stay in sync with smooth scroll
  const ticker = (time: number) => lenis.raf(time * 1000)
  gsap.ticker.add(ticker)
  gsap.ticker.lagSmoothing(0)

  return () => {
    gsap.ticker.remove(ticker)
    lenis.destroy()
  }
}

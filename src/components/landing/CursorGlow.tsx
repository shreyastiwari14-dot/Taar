'use client'

import { useEffect, useRef } from 'react'

export function CursorGlow() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ringX = 0, ringY = 0
    let dotX  = 0, dotY  = 0
    let raf: number

    const onMove = (e: MouseEvent) => {
      dotX = e.clientX
      dotY = e.clientY
    }
    window.addEventListener('mousemove', onMove)

    const tick = () => {
      ringX += (dotX - ringX) * 0.12
      ringY += (dotY - ringY) * 0.12
      if (dotRef.current) {
        dotRef.current.style.left  = `${dotX}px`
        dotRef.current.style.top   = `${dotY}px`
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`
        ringRef.current.style.top  = `${ringY}px`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const onEnterLink = () => {
      if (!dotRef.current || !ringRef.current) return
      dotRef.current.style.width  = '6px'
      dotRef.current.style.height = '6px'
      ringRef.current.style.width  = '56px'
      ringRef.current.style.height = '56px'
    }
    const onLeaveLink = () => {
      if (!dotRef.current || !ringRef.current) return
      dotRef.current.style.width  = '10px'
      dotRef.current.style.height = '10px'
      ringRef.current.style.width  = '36px'
      ringRef.current.style.height = '36px'
    }
    document.querySelectorAll('a,button').forEach(el => {
      el.addEventListener('mouseenter', onEnterLink)
      el.addEventListener('mouseleave', onLeaveLink)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}

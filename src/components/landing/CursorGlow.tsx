'use client'

import { useEffect, useRef } from 'react'

export function CursorGlow() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Don't show custom cursor on touch devices
    if (window.matchMedia('(hover: none)').matches) return

    // Scope cursor: none to this page only
    document.body.classList.add('has-custom-cursor')

    let ringX = 0, ringY = 0
    let dotX  = 0, dotY  = 0
    let raf: number
    let visible = false

    const show = () => {
      if (visible) return
      visible = true
      if (dotRef.current)  dotRef.current.style.opacity  = '1'
      if (ringRef.current) ringRef.current.style.opacity = '1'
    }

    const onMove = (e: MouseEvent) => {
      dotX = e.clientX
      dotY = e.clientY
      show()
    }
    window.addEventListener('mousemove', onMove)

    const tick = () => {
      ringX += (dotX - ringX) * 0.12
      ringY += (dotY - ringY) * 0.12

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const onEnterLink = () => {
      if (!dotRef.current || !ringRef.current) return
      dotRef.current.style.width   = '6px'
      dotRef.current.style.height  = '6px'
      ringRef.current.style.width  = '56px'
      ringRef.current.style.height = '56px'
      ringRef.current.style.borderColor = 'rgba(232,89,60,0.8)'
    }
    const onLeaveLink = () => {
      if (!dotRef.current || !ringRef.current) return
      dotRef.current.style.width   = '10px'
      dotRef.current.style.height  = '10px'
      ringRef.current.style.width  = '36px'
      ringRef.current.style.height = '36px'
      ringRef.current.style.borderColor = 'rgba(232,89,60,0.5)'
    }

    document.querySelectorAll('a,button').forEach(el => {
      el.addEventListener('mouseenter', onEnterLink)
      el.addEventListener('mouseleave', onLeaveLink)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ opacity: 0 }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ opacity: 0 }}
      />
    </>
  )
}

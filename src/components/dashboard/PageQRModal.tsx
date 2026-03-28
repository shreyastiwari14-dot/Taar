'use client'

import { useEffect, useRef } from 'react'
import QRCode from 'qrcode'

export function PageQRModal({ username, onClose }: { username: string; onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const url = `https://taar.bio/${username}`

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, url, {
        width: 240,
        margin: 2,
        color: { dark: '#000000', light: '#ffffff' },
      })
    }
  }, [url])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  function downloadQR() {
    if (!canvasRef.current) return
    const link = document.createElement('a')
    link.download = `taar-${username}-qr.png`
    link.href = canvasRef.current.toDataURL('image/png')
    link.click()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
      role="dialog"
      aria-modal
      aria-label="Page QR Code"
    >
      <div
        className="bg-[#141414] border border-[#222] rounded-2xl p-6 flex flex-col items-center gap-5 shadow-2xl max-w-xs w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <h2 className="text-white font-semibold">Your page QR code</h2>
          <p className="text-gray-500 text-xs mt-1">{url}</p>
        </div>

        <div className="bg-white p-3 rounded-xl">
          <canvas ref={canvasRef} />
        </div>

        <div className="flex gap-3 w-full">
          <button
            onClick={downloadQR}
            className="flex-1 bg-[#E8593C] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#d44e33] transition-colors"
          >
            Download PNG
          </button>
          <button
            onClick={onClose}
            className="px-4 border border-[#333] text-gray-400 rounded-xl text-sm hover:border-[#555] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

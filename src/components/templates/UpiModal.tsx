'use client'

import { useEffect, useRef } from 'react'
import QRCode from 'qrcode'

export function UpiModal({
  upiUrl,
  upiId,
  name,
  onClose,
}: {
  upiUrl: string
  upiId: string
  name: string
  onClose: () => void
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, upiUrl, {
        width: 220,
        margin: 2,
        color: { dark: '#000000', light: '#ffffff' },
      })
    }
  }, [upiUrl])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
      role="dialog"
      aria-modal
      aria-label="UPI QR Code"
    >
      <div
        className="bg-white rounded-2xl p-6 flex flex-col items-center gap-4 shadow-2xl max-w-xs w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <p className="font-semibold text-gray-900 text-sm">Pay {name}</p>
          <p className="text-gray-500 text-xs mt-0.5">{upiId}</p>
        </div>

        <canvas ref={canvasRef} className="rounded-lg" />

        <div className="text-center space-y-2 w-full">
          <p className="text-xs text-gray-500">Scan with any UPI app</p>
          <div className="flex gap-2 justify-center text-xs text-gray-400">
            <span>GPay</span><span>·</span><span>PhonePe</span><span>·</span><span>Paytm</span>
          </div>
          <a
            href={upiUrl}
            className="block w-full text-center bg-[#E8593C] text-white py-2.5 rounded-xl text-sm font-semibold mt-2"
          >
            Open UPI App →
          </a>
        </div>

        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-xs"
        >
          Close
        </button>
      </div>
    </div>
  )
}

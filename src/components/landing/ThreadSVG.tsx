'use client'

export function ThreadSVG() {
  return (
    <svg
      width="320"
      height="120"
      viewBox="0 0 320 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="thread-float"
    >
      {/* Thread path connecting icons */}
      <path
        d="M 30 60 C 80 20, 100 100, 160 60 C 220 20, 240 100, 290 60"
        stroke="#E8593C"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        fill="none"
        opacity="0.6"
        className="thread-animate"
      />

      {/* Instagram icon */}
      <circle cx="30" cy="60" r="20" fill="#141414" stroke="#222" strokeWidth="1" />
      <text x="30" y="65" textAnchor="middle" fontSize="16">📸</text>

      {/* UPI icon */}
      <circle cx="106" cy="60" r="20" fill="#141414" stroke="#222" strokeWidth="1" />
      <text x="106" y="66" textAnchor="middle" fontSize="14" fill="#E8593C" fontWeight="bold">₹</text>

      {/* YouTube icon */}
      <circle cx="182" cy="60" r="20" fill="#141414" stroke="#222" strokeWidth="1" />
      <text x="182" y="65" textAnchor="middle" fontSize="16">▶️</text>

      {/* WhatsApp icon */}
      <circle cx="258" cy="60" r="20" fill="#141414" stroke="#222" strokeWidth="1" />
      <text x="258" y="65" textAnchor="middle" fontSize="16">💬</text>

      {/* Taar node in center */}
      <circle cx="160" cy="60" r="6" fill="#E8593C" />
      <circle cx="160" cy="60" r="10" fill="none" stroke="#E8593C" strokeWidth="1" opacity="0.3" />
    </svg>
  )
}

import Link from 'next/link'

// ── Blurred mockup backgrounds per feature ────────────────────────────────────

function AnalyticsMockup() {
  const bars = [72, 45, 88, 60, 95, 38, 70, 52, 83, 66, 90, 48]
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="p-6 h-full flex flex-col gap-4 opacity-60">
        {/* Stat cards row */}
        <div className="grid grid-cols-3 gap-3">
          {[['1,284', 'Total Views'], ['48', 'Link Clicks'], ['3.7%', 'CTR']].map(([val, label]) => (
            <div key={label} className="bg-[#1a1a1a] border border-white/5 rounded-lg p-3">
              <div className="text-xl font-bold text-white">{val}</div>
              <div className="text-xs text-white/30 mt-0.5">{label}</div>
            </div>
          ))}
        </div>
        {/* Bar chart */}
        <div className="flex-1 bg-[#1a1a1a] border border-white/5 rounded-lg p-4">
          <div className="text-xs text-white/30 mb-3 tracking-widest uppercase">Views · Last 30 days</div>
          <div className="flex items-end gap-1.5 h-24">
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm"
                style={{
                  height: `${h}%`,
                  background: `rgba(232,89,60,${0.3 + (h / 100) * 0.5})`,
                }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {['Mar 1', '', '', 'Mar 15', '', '', 'Mar 30'].map((l, i) => (
              <div key={i} className="text-[9px] text-white/20">{l}</div>
            ))}
          </div>
        </div>
        {/* Top links table */}
        <div className="bg-[#1a1a1a] border border-white/5 rounded-lg p-3">
          <div className="text-xs text-white/30 mb-2 tracking-widest uppercase">Top Links</div>
          {['Instagram', 'YouTube', 'Portfolio'].map((link, i) => (
            <div key={link} className="flex justify-between items-center py-1.5 border-b border-white/5 last:border-0">
              <div className="text-sm text-white/60">{link}</div>
              <div className="text-sm text-[#E8593C]">{[142, 98, 67][i]} clicks</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProductsMockup() {
  const products = [
    { name: 'Preset Pack Vol.1', price: '₹599', sales: 34 },
    { name: 'Lightroom Bundle', price: '₹999', sales: 18 },
    { name: 'Edit Masterclass', price: '₹1,499', sales: 9 },
    { name: 'Brand Kit', price: '₹299', sales: 51 },
  ]
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="p-6 opacity-60">
        {/* Revenue banner */}
        <div className="bg-[#1a1a1a] border border-white/5 rounded-lg p-4 mb-3 flex justify-between items-center">
          <div>
            <div className="text-xs text-white/30 tracking-widest uppercase mb-1">Total Revenue</div>
            <div className="text-2xl font-bold text-white">₹54,280</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-white/30 tracking-widest uppercase mb-1">This Month</div>
            <div className="text-lg font-semibold text-[#E8593C]">+₹8,400</div>
          </div>
        </div>
        {/* Product grid */}
        <div className="grid grid-cols-2 gap-2">
          {products.map((p) => (
            <div key={p.name} className="bg-[#1a1a1a] border border-white/5 rounded-lg p-3">
              <div className="w-full h-12 rounded bg-white/5 mb-2" />
              <div className="text-xs text-white/70 font-medium leading-tight">{p.name}</div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-[#E8593C] text-sm font-bold">{p.price}</span>
                <span className="text-white/20 text-xs">{p.sales} sold</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function GenericMockup() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="p-6 opacity-50 space-y-3">
        {[80, 60, 40, 70, 50].map((w, i) => (
          <div key={i} className="h-10 rounded bg-white/5" style={{ width: `${w}%` }} />
        ))}
      </div>
    </div>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────

export function ProGate({ feature }: { feature: string }) {
  const lf = feature.toLowerCase()
  const Mockup = lf.includes('analytic') ? AnalyticsMockup
    : lf.includes('product') || lf.includes('store') ? ProductsMockup
    : GenericMockup

  return (
    <div className="relative flex items-center justify-center min-h-[calc(100vh-64px)] px-4 overflow-hidden">
      {/* Blurred mockup layer */}
      <div className="absolute inset-0">
        <Mockup />
        <div className="absolute inset-0" style={{
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          background: 'rgba(10,10,10,0.55)',
        }} />
      </div>

      {/* Upgrade card */}
      <div className="relative z-10 max-w-md w-full text-center">
        <div style={{
          background: '#0E0E0E',
          border: '1px solid rgba(232,89,60,0.25)',
          padding: '40px 32px',
          position: 'relative',
        }}>
          {/* Top accent */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 1,
            background: 'linear-gradient(90deg, transparent, #E8593C, transparent)',
          }} />

          <div className="text-4xl mb-4">🧵</div>
          <h2 className="font-display text-3xl tracking-wider text-white mb-2"
            style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
            PRO FEATURE
          </h2>
          <p className="text-white/40 text-sm mb-2">
            Upgrade to unlock full access.
          </p>
          <p className="text-[#E8593C] font-semibold mb-6">{feature}</p>

          <Link
            href="/dashboard/upgrade"
            className="block w-full text-white py-4 font-semibold text-base tracking-wide bg-[#E8593C] hover:bg-[#d44e33] transition-colors"
          >
            Go Pro. Own your thread. →
          </Link>

          <p className="text-white/20 text-xs mt-4">₹399/month · Cancel anytime</p>
        </div>
      </div>
    </div>
  )
}

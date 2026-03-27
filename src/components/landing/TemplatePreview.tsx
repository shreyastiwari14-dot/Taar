export function TemplatePreview() {
  const templates = [
    {
      id: 'bollywood',
      name: 'Bollywood Editorial',
      desc: 'Dark, bold, cinematic',
      preview: (
        <div className="bg-black h-full rounded-xl p-4 flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#F5C842] to-[#E8593C] mb-3 border-2 border-[#F5C842]" />
          <div className="font-display text-[#F5C842] text-xl tracking-widest mb-1">PRIYA SHARMA</div>
          <div className="text-gray-500 text-xs mb-4">Content Creator</div>
          <div className="w-full space-y-2">
            {['MY LATEST REEL', 'UPI SUPPORT ME', 'MERCH DROP'].map((l) => (
              <div key={l} className="w-full bg-[#111] border border-[#F5C842]/30 rounded-lg py-2 px-3 text-[#F5C842] text-xs font-display tracking-widest text-center">
                {l}
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'streetwear',
      name: 'Streetwear',
      desc: 'Black, stark, minimal',
      preview: (
        <div className="bg-[#0A0A0A] h-full rounded-xl p-4 flex flex-col items-center border border-[#222]">
          <div className="w-14 h-14 rounded-full bg-white mb-3" />
          <div className="font-display text-white text-xl tracking-widest mb-1">ARJUN</div>
          <div className="text-gray-600 text-xs mb-4">STREETWEAR / CULTURE</div>
          <div className="w-full space-y-2">
            {['NEW DROP ↗', 'COLLAB INQUIRY', 'FOLLOW ME'].map((l) => (
              <div key={l} className="w-full bg-white text-black rounded py-2 px-3 text-xs font-bold tracking-widest text-center uppercase">
                {l}
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'pastel',
      name: 'Pastel Food Creator',
      desc: 'Warm, soft, playful',
      preview: (
        <div className="bg-[#FDF6EC] h-full rounded-xl p-4 flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-[#F9C784] mb-3 border-4 border-[#F5E6D0]" />
          <div className="text-[#8B5E3C] font-bold text-lg mb-1" style={{fontFamily: 'serif'}}>Meera&apos;s Kitchen</div>
          <div className="text-[#C89B7B] text-xs mb-4">Food & Lifestyle</div>
          <div className="w-full space-y-2">
            {['My Recipes ✨', 'Order Sweets 🍮', 'Cooking Class 🎓'].map((l) => (
              <div key={l} className="w-full bg-white border border-[#F0DCC8] rounded-full py-2 px-3 text-[#8B5E3C] text-xs font-medium text-center shadow-sm">
                {l}
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {templates.map((t) => (
        <div key={t.id} className="group">
          <div className="relative bg-[#111] rounded-2xl overflow-hidden border border-[#222] hover:border-[#E8593C]/40 transition-all hover:scale-[1.02] duration-300 p-3">
            {/* Phone frame */}
            <div className="bg-[#0A0A0A] rounded-xl overflow-hidden" style={{ height: '280px' }}>
              {t.preview}
            </div>
          </div>
          <div className="mt-4 text-center">
            <h3 className="font-semibold text-white">{t.name}</h3>
            <p className="text-gray-500 text-sm">{t.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

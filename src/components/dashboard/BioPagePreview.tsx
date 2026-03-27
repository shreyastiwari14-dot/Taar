'use client'

import { Link, Page, Template } from '@/lib/types'
import { getLinkUrl, getLinkIcon } from '@/lib/utils'

interface Props {
  page: Page | null
  links: Link[]
  username?: string
  title?: string
  bio?: string
}

export function BioPagePreview({ page, links, username, title, bio }: Props) {
  const template = (page?.template_id || 'streetwear') as Template

  const activeLinks = links.filter((l) => l.is_active)

  if (template === 'bollywood') {
    return (
      <div className="bg-[#0A0005] min-h-[600px] rounded-2xl overflow-hidden p-6 flex flex-col items-center font-body">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F5C842] to-[#E8593C] mb-3 border-2 border-[#F5C842]/50 mt-4" />
        <div className="font-display text-[#F5C842] text-xl tracking-widest mb-1 text-center">
          {title || 'YOUR NAME'}
        </div>
        {bio && <div className="text-gray-500 text-xs mb-5 text-center">{bio}</div>}
        <div className="w-full space-y-3 mt-2">
          {activeLinks.length === 0 ? (
            <div className="text-center text-gray-700 text-xs py-4">Add links to see them here</div>
          ) : (
            activeLinks.map((link) => (
              <a
                key={link.id}
                href={getLinkUrl(link.type, link.url)}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-transparent border border-[#F5C842]/30 rounded-lg py-3 px-4 text-[#F5C842] text-xs font-display tracking-widest text-center hover:bg-[#F5C842]/10 transition-colors"
              >
                {getLinkIcon(link.type)} {link.label.toUpperCase()}
              </a>
            ))
          )}
        </div>
        <div className="mt-auto pt-6 text-[#333] text-[10px] tracking-widest">TAAR</div>
      </div>
    )
  }

  if (template === 'pastel') {
    return (
      <div className="bg-[#FDF6EC] min-h-[600px] rounded-2xl overflow-hidden p-6 flex flex-col items-center font-body">
        <div className="w-16 h-16 rounded-full bg-[#F9C784] mb-3 border-4 border-[#F5E6D0] mt-4" />
        <div className="text-[#8B5E3C] font-bold text-lg mb-1 text-center" style={{ fontFamily: 'Georgia, serif' }}>
          {title || 'Your Name'}
        </div>
        {bio && <div className="text-[#C89B7B] text-xs mb-5 text-center">{bio}</div>}
        <div className="w-full space-y-3 mt-2">
          {activeLinks.length === 0 ? (
            <div className="text-center text-[#D4B896] text-xs py-4">Add links to see them here</div>
          ) : (
            activeLinks.map((link) => (
              <a
                key={link.id}
                href={getLinkUrl(link.type, link.url)}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-white border border-[#F0DCC8] rounded-full py-3 px-4 text-[#8B5E3C] text-xs font-medium text-center shadow-sm hover:shadow-md transition-shadow"
              >
                {getLinkIcon(link.type)} {link.label}
              </a>
            ))
          )}
        </div>
        <div className="mt-auto pt-6 text-[#D4B896] text-[10px]">taar</div>
      </div>
    )
  }

  // Streetwear (default)
  return (
    <div className="bg-[#0A0A0A] min-h-[600px] rounded-2xl overflow-hidden p-6 flex flex-col items-center border border-[#1a1a1a] font-body">
      <div className="w-16 h-16 rounded-full bg-[#E8593C] mb-3 mt-4 flex items-center justify-center font-display text-2xl text-white">
        {(title || username || 'T').charAt(0).toUpperCase()}
      </div>
      <div className="font-display text-white text-xl tracking-widest mb-1 text-center uppercase">
        {title || username || 'YOUR NAME'}
      </div>
      {bio && <div className="text-gray-600 text-xs mb-5 text-center uppercase tracking-wider">{bio}</div>}
      <div className="w-full space-y-3 mt-2">
        {activeLinks.length === 0 ? (
          <div className="text-center text-gray-700 text-xs py-4">Add links to see them here</div>
        ) : (
          activeLinks.map((link) => (
            <a
              key={link.id}
              href={getLinkUrl(link.type, link.url)}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-white text-black rounded py-3 px-4 text-xs font-bold tracking-widest text-center uppercase hover:bg-[#E8593C] hover:text-white transition-colors"
            >
              {getLinkIcon(link.type)} {link.label.toUpperCase()}
            </a>
          ))
        )}
      </div>
      <div className="mt-auto pt-6 text-[#222] text-[10px] tracking-widest font-display">TAAR</div>
    </div>
  )
}

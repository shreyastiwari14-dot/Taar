'use client'

import { Link, Page } from '@/lib/types'
import { TemplateRenderer } from '@/components/templates/TemplateRenderer'

interface Props {
  page: Page | null
  links: Link[]
  username?: string
  title?: string
  bio?: string
}

export function BioPagePreview({ page, links, username, title, bio }: Props) {
  if (!page) {
    return (
      <div className="bg-[#141414] rounded-2xl h-64 flex items-center justify-center text-gray-600 text-sm">
        No page data
      </div>
    )
  }

  const previewPage = {
    ...page,
    title: title || page.title,
    bio: bio || page.bio,
  }

  return (
    <div className="rounded-2xl overflow-hidden border border-[#222]" style={{ minHeight: 500 }}>
      <TemplateRenderer
        page={previewPage}
        links={links}
        products={[]}
        username={username || ''}
        isPro={true}
        showWatermark={false}
        isPreview={true}
      />
    </div>
  )
}

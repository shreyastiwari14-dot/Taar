'use client'

import { useEffect } from 'react'

export function ViewTracker({ pageId }: { pageId: string }) {
  useEffect(() => {
    fetch('/api/track-view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page_id: pageId,
        referrer: document.referrer || null,
      }),
    }).catch(() => {}) // fire-and-forget, never block render
  }, [pageId])

  return null
}

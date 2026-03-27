import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { LinkType } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLinkUrl(type: LinkType, url: string): string {
  switch (type) {
    case 'upi':
      return `upi://pay?pa=${url}`
    case 'whatsapp': {
      const num = url.replace(/\D/g, '')
      return `https://wa.me/${num}?text=Hi!`
    }
    case 'instagram':
      return url.startsWith('http') ? url : `https://instagram.com/${url}`
    case 'youtube':
      return url.startsWith('http') ? url : `https://youtube.com/@${url}`
    default:
      return url.startsWith('http') ? url : `https://${url}`
  }
}

export function getLinkIcon(type: LinkType): string {
  const icons: Record<LinkType, string> = {
    url: '🔗',
    upi: '₹',
    whatsapp: '💬',
    instagram: '📸',
    youtube: '▶️',
    custom: '✨',
  }
  return icons[type] || '🔗'
}

export function formatPrice(paise: number): string {
  return `₹${(paise / 100).toLocaleString('en-IN')}`
}

export function getDeviceType(): string {
  if (typeof window === 'undefined') return 'unknown'
  const ua = navigator.userAgent
  if (/mobile/i.test(ua)) return 'mobile'
  if (/tablet/i.test(ua)) return 'tablet'
  return 'desktop'
}

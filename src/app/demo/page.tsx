import { Metadata } from 'next'
import { DemoPageClient } from './DemoPageClient'

export const metadata: Metadata = {
  title: 'Demo — See your Taar page | Taar',
  description: 'Preview what your Taar link-in-bio page looks like. UPI payments, Instagram Reels, and 50 templates.',
}

export default function DemoPage() {
  return <DemoPageClient />
}

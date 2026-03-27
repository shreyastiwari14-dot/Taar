import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'Taar — Your thread to everything.',
  description: 'One link. Your UPI. Your reels. Your products. Built for Indian creators.',
  openGraph: {
    title: 'Taar — Your thread to everything.',
    description: 'One link. Your UPI. Your reels. Your products. Built for Indian creators.',
    siteName: 'Taar',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased font-body">
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: '#141414',
              color: '#fff',
              border: '1px solid #222',
              fontFamily: 'DM Sans, sans-serif',
            },
          }}
        />
      </body>
    </html>
  )
}

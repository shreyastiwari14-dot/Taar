import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: "Taar — Free Link in Bio for Indian Creators | UPI, Reels, 50 Templates",
  description: "Free UPI link in bio built for Indian creators. 50 templates, Instagram Reels auto-sync, digital products. Pro plan at ₹399/month. No credit card.",
  keywords: "link in bio India, linktree alternative India, UPI link in bio, Indian creators, bio link Indian creators, linktree India free, taar bio",
  authors: [{ name: "Taar" }],
  creator: "Taar",
  metadataBase: new URL("https://taar.bio"),
  alternates: {
    canonical: "https://taar.bio",
    languages: {
      'en-IN': 'https://taar.bio',
      'hi': 'https://taar.bio',
    },
  },
  openGraph: {
    title: "Taar — Free Link in Bio for Indian Creators",
    description: "UPI links, Auto Reels, 50 templates, sell digital products. Built for Bharat. Free forever. Pro at ₹399/month.",
    url: "https://taar.bio",
    siteName: "Taar",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Taar — Link in Bio for Indian Creators" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Taar — Free Link in Bio for Indian Creators",
    description: "UPI links, Auto Reels, 50 templates. Built for Bharat. Free forever.",
    images: ["/og-image.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" }
  },
  verification: {
    google: 'ScdS2gXzfCDswJtOvonDFhuKkTHDgJ_j2siJ6cdjCTk',
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Taar",
      "applicationCategory": "BusinessApplication",
      "description": "Free UPI link in bio for Indian creators. 50 templates, auto Instagram Reels, digital product sales.",
      "url": "https://taar.bio",
      "offers": [
        {
          "@type": "Offer",
          "name": "Free Plan",
          "price": "0",
          "priceCurrency": "INR",
          "description": "1 bio page, 8 links, 50 templates, UPI links, WhatsApp CTA"
        },
        {
          "@type": "Offer",
          "name": "Pro Plan",
          "price": "399",
          "priceCurrency": "INR",
          "billingDuration": "P1M",
          "description": "Analytics, Auto Reels, sell digital products, remove watermark"
        }
      ],
      "operatingSystem": "Web",
      "inLanguage": ["en-IN", "hi"],
      "audience": {
        "@type": "Audience",
        "audienceType": "Indian content creators, influencers, YouTubers, Instagram creators"
      }
    },
    {
      "@type": "Organization",
      "@id": "https://taar.bio/#organization",
      "name": "Taar",
      "url": "https://taar.bio",
      "foundingDate": "2024",
      "foundingLocation": { "@type": "Country", "name": "India" },
      "areaServed": "IN"
    },
    {
      "@type": "WebSite",
      "@id": "https://taar.bio/#website",
      "url": "https://taar.bio",
      "name": "Taar",
      "publisher": { "@id": "https://taar.bio/#organization" }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Taar?",
          "acceptedAnswer": { "@type": "Answer", "text": "Taar is a free link in bio tool built specifically for Indian creators. It lets you put all your important links — UPI payment, Instagram, YouTube, WhatsApp, digital products — on one custom page you share in your Instagram bio." }
        },
        {
          "@type": "Question",
          "name": "Is Taar free?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. Taar has a free plan that is free forever — no credit card, no trial period. It includes 1 bio page, 8 links, all 50 templates, UPI payment links, WhatsApp links, and a custom username. Pro is ₹399/month." }
        },
        {
          "@type": "Question",
          "name": "How is Taar different from Linktree?",
          "acceptedAnswer": { "@type": "Answer", "text": "Taar is built specifically for India. It supports UPI payment links (GPay, PhonePe, Paytm) which Linktree does not. Taar has Indian-specific templates and costs ₹399/month vs Linktree's ~₹800+/month." }
        },
        {
          "@type": "Question",
          "name": "What is the best Linktree alternative for India?",
          "acceptedAnswer": { "@type": "Answer", "text": "Taar is the best Linktree alternative for India. It is the only link in bio tool built specifically for Indian creators with UPI payment support, Indian templates, Razorpay integration, and INR pricing. Free forever with a Pro plan at ₹399/month." }
        },
        {
          "@type": "Question",
          "name": "Does Taar support UPI payments?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. Taar supports UPI payment links as a free feature. Add your UPI ID and fans pay you directly via GPay, PhonePe, or Paytm. No platform cut, no gateway fee." }
        }
      ]
    }
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-IN" className="bg-[#0A0A0A]" suppressHydrationWarning>
      <head>
        {/* Performance: DNS prefetch + preconnect for third-party origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://checkout.razorpay.com" />
        <link rel="dns-prefetch" href="https://api.razorpay.com" />

        {/* Preload display font used in hero heading */}
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
        />

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased font-body bg-[#0A0A0A]">
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

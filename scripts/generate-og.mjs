import sharp from 'sharp'

const width = 1200
const height = 630

const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
      <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(255,255,255,0.025)" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="${width}" height="${height}" fill="#0A0A0A"/>
  <rect width="${width}" height="${height}" fill="url(#grid)"/>

  <!-- Left accent bar -->
  <rect x="0" y="0" width="6" height="${height}" fill="#E8593C"/>

  <!-- Top: TAAR wordmark -->
  <text x="72" y="100" font-family="Arial Black, sans-serif" font-weight="900" font-size="36" letter-spacing="12" fill="white" text-anchor="start">TAAR</text>

  <!-- Top right: India badge -->
  <text x="${width - 60}" y="80" font-family="Arial, sans-serif" font-size="12" letter-spacing="3" fill="rgba(255,255,255,0.3)" text-anchor="end">MADE IN INDIA · EST. 2024</text>

  <!-- Main headline -->
  <text x="72" y="240" font-family="Arial Black, sans-serif" font-weight="900" font-size="88" fill="white" text-anchor="start">FREE LINK</text>
  <text x="72" y="340" font-family="Arial Black, sans-serif" font-weight="900" font-size="88" fill="#E8593C" text-anchor="start">IN BIO</text>
  <text x="72" y="430" font-family="Arial Black, sans-serif" font-weight="900" font-size="56" fill="rgba(255,255,255,0.2)" text-anchor="start">FOR INDIAN CREATORS</text>

  <!-- Divider -->
  <line x1="72" y1="480" x2="${width - 72}" y2="480" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>

  <!-- Feature pills -->
  <rect x="72" y="502" width="180" height="36" rx="0" fill="rgba(232,89,60,0.12)" stroke="rgba(232,89,60,0.3)" stroke-width="1"/>
  <text x="162" y="526" font-family="Arial, sans-serif" font-size="11" letter-spacing="1.5" fill="#E8593C" text-anchor="middle" font-weight="700">UPI PAYMENT LINKS</text>

  <rect x="268" y="502" width="160" height="36" rx="0" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
  <text x="348" y="526" font-family="Arial, sans-serif" font-size="11" letter-spacing="1.5" fill="rgba(255,255,255,0.5)" text-anchor="middle" font-weight="700">AUTO REELS</text>

  <rect x="444" y="502" width="160" height="36" rx="0" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
  <text x="524" y="526" font-family="Arial, sans-serif" font-size="11" letter-spacing="1.5" fill="rgba(255,255,255,0.5)" text-anchor="middle" font-weight="700">50 TEMPLATES</text>

  <rect x="620" y="502" width="180" height="36" rx="0" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
  <text x="710" y="526" font-family="Arial, sans-serif" font-size="11" letter-spacing="1.5" fill="rgba(255,255,255,0.5)" text-anchor="middle" font-weight="700">SELL PRODUCTS</text>

  <rect x="816" y="502" width="150" height="36" rx="0" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
  <text x="891" y="526" font-family="Arial, sans-serif" font-size="11" letter-spacing="1.5" fill="rgba(255,255,255,0.5)" text-anchor="middle" font-weight="700">₹399/MO PRO</text>

  <!-- Mini phone mockup -->
  <rect x="980" y="120" width="150" height="300" rx="24" fill="#111" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
  <rect x="1030" y="132" width="50" height="6" rx="3" fill="#1a1a1a"/>
  <circle cx="1055" cy="192" r="22" fill="linear-gradient(#E8593C,#F5C842)"/>
  <rect x="980" y="120" width="150" height="300" rx="24" fill="url(#phoneGrad)" opacity="0.3"/>
  <rect x="998" y="226" width="114" height="18" rx="4" fill="#E8593C" opacity="0.9"/>
  <rect x="998" y="252" width="114" height="18" rx="4" fill="rgba(255,255,255,0.07)"/>
  <rect x="998" y="278" width="114" height="18" rx="4" fill="rgba(255,255,255,0.07)"/>
  <rect x="998" y="304" width="114" height="18" rx="4" fill="rgba(255,255,255,0.07)"/>
  <text x="1055" y="410" font-family="Arial, sans-serif" font-size="9" letter-spacing="2" fill="rgba(255,255,255,0.2)" text-anchor="middle">TAAR</text>
</svg>
`

await sharp(Buffer.from(svg))
  .png()
  .toFile('./public/og-image.png')

console.log('✓ OG image generated at public/og-image.png')

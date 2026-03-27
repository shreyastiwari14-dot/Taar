import { getTemplate, TemplateConfig } from '@/lib/templates'
import { Page, Link as LinkType, Product } from '@/lib/types'
import { getLinkUrl, getLinkIcon } from '@/lib/utils'
import { TrackableLink, ProductCard } from './shared'

interface Props {
  page: Page
  links: LinkType[]
  products: Product[]
  username: string
  isPro: boolean
  showWatermark: boolean
  isPreview?: boolean
}

export function TemplateRenderer({ page, links, products, username, showWatermark, isPreview }: Props) {
  const t = getTemplate(page.template_id)

  const avatarLetter = (page.title || username || 'T').charAt(0).toUpperCase()

  const bgStyle = t.bgGradient
    ? { background: t.bgGradient }
    : { background: t.bg }

  const btnRadius = {
    none: '0px',
    sm: '6px',
    lg: '12px',
    full: '9999px',
  }[t.btnRadius]

  function getBtnStyle(): React.CSSProperties {
    const base: React.CSSProperties = {
      borderRadius: btnRadius,
      fontFamily: t.fontBody,
      transition: 'all 0.2s',
      fontSize: '14px',
      fontWeight: 600,
      letterSpacing: t.fontDisplay === 'Bebas Neue' ? '0.1em' : '0.02em',
    }
    if (t.btnStyle === 'solid' || t.btnStyle === 'gradient') {
      return { ...base, background: t.btnBg, color: t.btnText }
    }
    if (t.btnStyle === 'outline') {
      return { ...base, background: t.btnBg, color: t.btnText, border: `1px solid ${t.btnBorder || t.btnText}` }
    }
    return { ...base, background: 'transparent', color: t.btnText }
  }

  const btnCss = getBtnStyle()

  const glowStyle = t.glowColor
    ? { boxShadow: `0 0 20px ${t.glowColor}, 0 0 40px ${t.glowColor}` }
    : {}

  const Decoration = () => {
    if (!t.decoration || t.decoration === 'none') return null
    if (t.decoration === 'dots') {
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          <svg width="100%" height="100%">
            <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill={t.textPrimary} />
            </pattern>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
      )
    }
    if (t.decoration === 'stars') {
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          {['10%,15%', '85%,25%', '50%,10%', '20%,80%', '75%,70%', '35%,55%'].map((pos, i) => {
            const [l, t2] = pos.split(',')
            return (
              <div key={i} style={{ position: 'absolute', left: l, top: t2, color: t.textAccent, fontSize: 12 }}>★</div>
            )
          })}
        </div>
      )
    }
    if (t.decoration === 'lines') {
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
          <svg width="100%" height="100%">
            <pattern id="lines" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <line x1="0" y1="40" x2="40" y2="0" stroke={t.textPrimary} strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#lines)" />
          </svg>
        </div>
      )
    }
    if (t.decoration === 'diamonds') {
      return (
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', opacity: 0.15 }}>
          <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8 }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ width: 6, height: 6, transform: 'rotate(45deg)', background: t.textAccent }} />
            ))}
          </div>
          <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8 }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ width: 6, height: 6, transform: 'rotate(45deg)', background: t.textAccent }} />
            ))}
          </div>
        </div>
      )
    }
    if (t.decoration === 'grid') {
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
          <svg width="100%" height="100%">
            <pattern id="grid" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke={t.textPrimary} strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      )
    }
    return null
  }

  return (
    <div
      style={{ ...bgStyle, minHeight: isPreview ? '100%' : '100vh', fontFamily: t.fontBody, position: 'relative' }}
    >
      <Decoration />

      {/* Glow bg for neon templates */}
      {t.glowColor && (
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(ellipse at 50% 30%, ${t.glowColor} 0%, transparent 70%)`
        }} />
      )}

      <div style={{ maxWidth: 420, margin: '0 auto', padding: isPreview ? '24px 16px' : '48px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>

        {/* Avatar */}
        <div style={{
          width: isPreview ? 64 : 88,
          height: isPreview ? 64 : 88,
          borderRadius: '50%',
          background: t.avatarBg || t.btnBg || t.textAccent,
          border: t.avatarBorder || `2px solid ${t.textAccent}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 16, overflow: 'hidden', flexShrink: 0,
          ...(t.glowColor ? { boxShadow: `0 0 20px ${t.glowColor}` } : {}),
        }}>
          {page.avatar_url ? (
            <img src={page.avatar_url} alt={page.title || username} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span style={{
              fontFamily: t.fontDisplay, fontSize: isPreview ? 22 : 32,
              color: t.btnStyle === 'solid' ? t.btnText : t.textPrimary,
              letterSpacing: '0.05em',
            }}>
              {avatarLetter}
            </span>
          )}
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily: t.fontDisplay, fontSize: isPreview ? 18 : 26,
          color: t.textPrimary, marginBottom: 6, textAlign: 'center',
          letterSpacing: t.fontDisplay === 'Bebas Neue' ? '0.1em' : '0.01em',
          lineHeight: 1.1,
          ...(t.glowColor ? { textShadow: `0 0 20px ${t.textPrimary}88` } : {}),
        }}>
          {page.title || username || 'YOUR NAME'}
        </h1>

        {/* Bio */}
        {page.bio && (
          <p style={{
            color: t.textSecondary, fontSize: isPreview ? 11 : 14,
            textAlign: 'center', marginBottom: isPreview ? 16 : 24,
            maxWidth: 280, lineHeight: 1.5,
          }}>
            {page.bio}
          </p>
        )}
        {!page.bio && <div style={{ marginBottom: isPreview ? 12 : 20 }} />}

        {/* Links */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: isPreview ? 8 : 12, marginBottom: isPreview ? 16 : 24 }}>
          {links.filter(l => l.is_active).map((link) => {
            const content = (
              <div style={{
                ...btnCss,
                ...glowStyle,
                width: '100%',
                padding: isPreview ? '10px 16px' : '14px 20px',
                textAlign: 'center',
                display: 'block',
                textDecoration: 'none',
                cursor: 'pointer',
                fontFamily: t.fontDisplay === 'Bebas Neue' ? 'Bebas Neue' : t.fontBody,
                letterSpacing: t.fontDisplay === 'Bebas Neue' ? '0.12em' : '0.02em',
              }}>
                {getLinkIcon(link.type)} {t.fontDisplay === 'Bebas Neue' ? link.label.toUpperCase() : link.label}
              </div>
            )

            if (isPreview) {
              return (
                <a
                  key={link.id}
                  href={getLinkUrl(link.type, link.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', width: '100%' }}
                >
                  {content}
                </a>
              )
            }

            return (
              <TrackableLink key={link.id} link={link} style={{ textDecoration: 'none', width: '100%' }}>
                {content}
              </TrackableLink>
            )
          })}

          {links.filter(l => l.is_active).length === 0 && isPreview && (
            <div style={{ textAlign: 'center', color: t.textSecondary, fontSize: 12, padding: '16px 0' }}>
              Add links to see them here
            </div>
          )}
        </div>

        {/* Products */}
        {products.filter(p => p.is_active).length > 0 && (
          <div style={{ width: '100%', marginBottom: isPreview ? 16 : 24 }}>
            <div style={{ color: t.textSecondary, fontSize: isPreview ? 10 : 12, textAlign: 'center', marginBottom: 10, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Products
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {products.filter(p => p.is_active).map((p) => (
                <ProductCard key={p.id} product={p} theme={['minimal-white', 'minimal-stone', 'minimal-cream', 'pastel', 'pastel-blue', 'pastel-lavender', 'pastel-mint', 'pastel-peach', 'y2k-pink', 'vintage-paper', 'retro-90s', 'hypebeast', 'corporate-clean', 'wellness', 'art-gallery', 'desi-modern', 'marigold'].includes(t.id) ? 'light' : 'dark'} />
              ))}
            </div>
          </div>
        )}

        {/* Watermark */}
        {showWatermark && (
          <div style={{ color: t.watermarkColor, fontSize: 10, letterSpacing: '0.15em', marginTop: 16 }}>
            <a href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              MADE WITH TAAR
            </a>
          </div>
        )}
      </div>

      {!isPreview && <script src="https://checkout.razorpay.com/v1/checkout.js" async />}
    </div>
  )
}

import { getTemplate, TemplateConfig } from '@/lib/templates'
import { Page, Link as LinkType, Product } from '@/lib/types'
import { getLinkUrl, getLinkIcon } from '@/lib/utils'
import { TrackableLink, ProductCard } from './shared'
import { EmailCaptureForm } from './EmailCaptureForm'

interface Props {
  page: Page
  links: LinkType[]
  products: Product[]
  username: string
  isPro: boolean
  showWatermark: boolean
  isPreview?: boolean
}

// ─── Template classification helpers ─────────────────────────────────────────

const GLOW_TEMPLATES = new Set([
  'cyberpunk_neon','glitch_art','anime_otaku','neon_purple','esports','vaporwave',
  'mumbai_noir','startup_founder','finance_bro',
])

const INDIAN_TEMPLATES = new Set([
  'bollywood_editorial','rajasthani_royal','desi_marigold','south_indian_temple',
  'kolkata_adda','punjabi_energy','dilli_hustle','classical_music',
])

const MOODY_TEMPLATES = new Set([
  'dark_academia','lo_fi_beats','cottagecore','dark_minimal','vinyl_record',
  'poetry_zine','wellness_spa','nature_earth','travel_journal','astrology',
])

const EDITORIAL_TEMPLATES = new Set([
  'fashion_editorial','architect_grid','brutalist','journalist','art_gallery',
  'food_magazine','film_director','street_photography',
])

const LUXURY_TEMPLATES = new Set([
  'rose_gold_luxury','legal_professional','rajasthani_royal','bollywood_editorial',
  'concert_poster','classical_music','executive_dark',
])

const NATURE_TEMPLATES = new Set([
  'wellness_spa','nature_earth','cottagecore','educator_warm',
])

const LIGHT_BG_TEMPLATES = new Set([
  'fashion_editorial','brutalist','corporate_clean','food_magazine','art_gallery',
  'medical_clean','architect_grid','journalist','kolkata_adda','south_indian_temple',
  'pastel_food','wellness_spa','travel_journal','cottagecore','educator_warm',
  'classical_music','poetry_zine','vintage_retro','y2k_revival','desi_marigold',
  'punjabi_energy','meme_lord',
])

// ─── Font family map ──────────────────────────────────────────────────────────

function getFontFamily(f: string): string {
  const map: Record<string, string> = {
    'Playfair Display': "'Playfair Display', Georgia, serif",
    'Space Mono': "'Space Mono', monospace",
    'Cormorant Garamond': "'Cormorant Garamond', Georgia, serif",
    'Anton': "'Anton', Impact, sans-serif",
    'Josefin Sans': "'Josefin Sans', sans-serif",
    'Cinzel': "'Cinzel', serif",
    'Oswald': "'Oswald', sans-serif",
    'Abril Fatface': "'Abril Fatface', serif",
    'Righteous': "'Righteous', sans-serif",
    'Raleway': "'Raleway', sans-serif",
    'Caveat': "'Caveat', cursive",
    'Libre Baskerville': "'Libre Baskerville', Georgia, serif",
    'Russo One': "'Russo One', sans-serif",
    'Bebas Neue': "'Bebas Neue', sans-serif",
    'DM Sans': "'DM Sans', sans-serif",
  }
  return map[f] || f
}

// ─── Per-template CSS (tid-scoped only — global keyframes live in globals.css) ─

function GlobalStyles({ tid, t }: { tid: string; t: TemplateConfig }) {
  return (
    <style>{`
      .taar-btn-${tid} {
        transition: transform 0.18s ease, box-shadow 0.18s ease, opacity 0.15s ease !important;
      }
      .taar-btn-${tid}:hover { transform: translateY(-2px); }

      .taar-solid-${tid}:hover {
        transform: translateY(-2px);
        opacity: 0.88;
        box-shadow: 0 8px 28px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2) !important;
      }

      .taar-outline-${tid} {
        transition: background 0.2s ease, transform 0.18s ease, box-shadow 0.18s ease !important;
      }
      .taar-outline-${tid}:hover {
        background: ${t.textAccent}18 !important;
        transform: translateY(-2px);
        box-shadow: 0 4px 16px rgba(0,0,0,0.2);
      }

      .taar-ghost-${tid} {
        border-left: 3px solid transparent !important;
        transition: border-left-color 0.2s ease, background 0.2s ease, transform 0.15s ease !important;
      }
      .taar-ghost-${tid}:hover {
        transform: translateY(-2px);
        border-left-color: ${t.textAccent} !important;
        background: ${t.textAccent}08 !important;
      }

      .taar-glow-btn-${tid}:hover {
        animation: taar-glow 1.5s ease infinite;
        box-shadow: 0 0 20px ${t.glowColor || t.textAccent + '44'} !important;
      }
    `}</style>
  )
}

// ─── Background layers ────────────────────────────────────────────────────────

function GlowBackground({ t }: { t: TemplateConfig }) {
  return (
    <>
      {/* Primary radial spotlight behind avatar */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 60% 40% at 50% 25%, ${t.glowColor || t.textAccent + '22'} 0%, transparent 70%)`,
      }} />
      {/* Scanline effect */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden',
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${t.textAccent}08 2px, ${t.textAccent}08 4px)`,
        zIndex: 0,
      }} />
      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(${t.textAccent}08 1px, transparent 1px),
          linear-gradient(90deg, ${t.textAccent}08 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        zIndex: 0,
      }} />
    </>
  )
}

function IndianBackground({ t }: { t: TemplateConfig }) {
  const patId = `mandala-${t.id}`
  return (
    <>
      {/* Mandala-inspired SVG pattern */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.04, overflow: 'hidden', zIndex: 0 }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={patId} x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <g transform="translate(60,60)">
                {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => (
                  <g key={i} transform={`rotate(${deg})`}>
                    <ellipse cx="0" cy="-28" rx="4" ry="12" fill={t.textAccent} opacity="0.8"/>
                    <polygon points="0,-42 3,-36 -3,-36" fill={t.textAccent} opacity="0.6"/>
                  </g>
                ))}
                <circle cx="0" cy="0" r="18" fill="none" stroke={t.textAccent} strokeWidth="1.5" opacity="0.8"/>
                <circle cx="0" cy="0" r="10" fill="none" stroke={t.textAccent} strokeWidth="1" opacity="0.6"/>
                <circle cx="0" cy="0" r="4" fill={t.textAccent} opacity="0.9"/>
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${patId})`}/>
        </svg>
      </div>
      {/* Geometric corner accents */}
      <div style={{ position: 'absolute', top: 16, left: 16, pointerEvents: 'none', opacity: 0.5 }}>
        <svg width="48" height="48" viewBox="0 0 48 48"><path d="M0,0 L48,0 L48,8 M0,0 L0,48 L8,48" fill="none" stroke={t.textAccent} strokeWidth="1.5"/><path d="M8,8 L24,8 L24,14 M8,8 L8,24 L14,24" fill="none" stroke={t.textAccent} strokeWidth="1" opacity="0.6"/></svg>
      </div>
      <div style={{ position: 'absolute', top: 16, right: 16, pointerEvents: 'none', opacity: 0.5, transform: 'scaleX(-1)' }}>
        <svg width="48" height="48" viewBox="0 0 48 48"><path d="M0,0 L48,0 L48,8 M0,0 L0,48 L8,48" fill="none" stroke={t.textAccent} strokeWidth="1.5"/><path d="M8,8 L24,8 L24,14 M8,8 L8,24 L14,24" fill="none" stroke={t.textAccent} strokeWidth="1" opacity="0.6"/></svg>
      </div>
      <div style={{ position: 'absolute', bottom: 16, left: 16, pointerEvents: 'none', opacity: 0.5, transform: 'scaleY(-1)' }}>
        <svg width="48" height="48" viewBox="0 0 48 48"><path d="M0,0 L48,0 L48,8 M0,0 L0,48 L8,48" fill="none" stroke={t.textAccent} strokeWidth="1.5"/></svg>
      </div>
      <div style={{ position: 'absolute', bottom: 16, right: 16, pointerEvents: 'none', opacity: 0.5, transform: 'scale(-1,-1)' }}>
        <svg width="48" height="48" viewBox="0 0 48 48"><path d="M0,0 L48,0 L48,8 M0,0 L0,48 L8,48" fill="none" stroke={t.textAccent} strokeWidth="1.5"/></svg>
      </div>
    </>
  )
}

function MoodyBackground({ t }: { t: TemplateConfig }) {
  return (
    <>
      {/* Paper texture via SVG feTurbulence */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.45, zIndex: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23paper)' opacity='0.06'/%3E%3C/svg%3E")`,
        backgroundSize: '400px 400px',
        animation: 'taar-grain 8s steps(1) infinite',
      }} />
      {/* Soft vignette */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: `radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, ${t.bg} 100%)`,
      }} />
    </>
  )
}

function EditorialBackground({ t }: { t: TemplateConfig }) {
  const displayName = t.name.toUpperCase().replace(/\s+/g, ' ')
  return (
    <>
      {/* Oversized watermark text */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%) rotate(-15deg)',
        pointerEvents: 'none', zIndex: 0, whiteSpace: 'nowrap',
        fontFamily: getFontFamily(t.fontDisplay),
        fontSize: 96, fontWeight: 900, color: t.watermarkColor,
        letterSpacing: '0.08em', lineHeight: 1, opacity: 0.35,
        userSelect: 'none',
      }}>
        {displayName}
      </div>
    </>
  )
}

function NatureBackground({ t }: { t: TemplateConfig }) {
  return (
    <>
      {/* Soft organic radial behind avatar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '60%',
        pointerEvents: 'none', zIndex: 0,
        background: `radial-gradient(ellipse 70% 60% at 50% 20%, ${t.textAccent}18 0%, transparent 70%)`,
      }} />
      {/* Subtle organic shapes */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', opacity: 0.05, zIndex: 0 }}>
        <svg width="100%" height="100%" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice">
          <ellipse cx="350" cy="150" rx="120" ry="80" fill={t.textAccent}/>
          <ellipse cx="50" cy="400" rx="90" ry="60" fill={t.textAccent}/>
          <ellipse cx="300" cy="650" rx="100" ry="70" fill={t.textAccent}/>
        </svg>
      </div>
    </>
  )
}

function NoiseLayer({ opacity = 0.035 }: { opacity?: number }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', opacity,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      backgroundSize: '180px',
      zIndex: 1,
    }} />
  )
}

// ─── Decoration components ────────────────────────────────────────────────────

function Decoration({ t, p }: { t: TemplateConfig; p: boolean }) {
  if (!t.decoration || t.decoration === 'none') return null

  if (t.decoration === 'dots') {
    return (
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <svg width="100%" height="100%">
          <defs>
            <radialGradient id={`dotfade-${t.id}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={t.textAccent} stopOpacity="0.18"/>
              <stop offset="100%" stopColor={t.textAccent} stopOpacity="0.04"/>
            </radialGradient>
            <pattern id={`dots-${t.id}`} x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="2" fill={`url(#dotfade-${t.id})`}/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#dots-${t.id})`}/>
        </svg>
      </div>
    )
  }

  if (t.decoration === 'stars') {
    const starPositions = [
      { l: '8%', top: '12%', size: 12, delay: '0s' },
      { l: '88%', top: '18%', size: 8, delay: '0.7s' },
      { l: '50%', top: '5%', size: 14, delay: '1.2s' },
      { l: '18%', top: '78%', size: 10, delay: '0.3s' },
      { l: '78%', top: '72%', size: 12, delay: '1.5s' },
      { l: '33%', top: '52%', size: 7, delay: '0.9s' },
      { l: '65%', top: '38%', size: 9, delay: '0.4s' },
      { l: '12%', top: '44%', size: 11, delay: '1.8s' },
      { l: '92%', top: '55%', size: 8, delay: '0.6s' },
      { l: '45%', top: '88%', size: 10, delay: '1.1s' },
    ]
    return (
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        {starPositions.map((s, i) => (
          <div key={i} style={{
            position: 'absolute', left: s.l, top: s.top,
            color: t.textAccent, fontSize: s.size,
            animation: `taar-twinkle ${2 + i * 0.4}s ease-in-out ${s.delay} infinite`,
          }}>
            <svg width={s.size} height={s.size} viewBox="0 0 24 24">
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" fill={t.textAccent}/>
            </svg>
          </div>
        ))}
      </div>
    )
  }

  if (t.decoration === 'lines') {
    return (
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <svg width="100%" height="100%">
          <defs>
            <pattern id={`lines-${t.id}`} x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
              <line x1="0" y1="48" x2="48" y2="0" stroke={t.textPrimary} strokeWidth="0.6" opacity="0.06"/>
              <line x1="-12" y1="48" x2="36" y2="0" stroke={t.textPrimary} strokeWidth="0.3" opacity="0.04"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#lines-${t.id})`}/>
        </svg>
      </div>
    )
  }

  if (t.decoration === 'diamonds') {
    return (
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <svg width="100%" height="100%">
          <defs>
            <pattern id={`diamonds-${t.id}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect x="14" y="14" width="12" height="12" transform="rotate(45 20 20)" fill="none" stroke={t.textAccent} strokeWidth="0.8" opacity="0.14"/>
              <rect x="18" y="18" width="4" height="4" transform="rotate(45 20 20)" fill={t.textAccent} opacity="0.07"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#diamonds-${t.id})`}/>
        </svg>
        {/* Accent diamond row top */}
        <div style={{ position: 'absolute', top: p ? 10 : 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 10, alignItems: 'center' }}>
          {[0,1,2,3,4].map(i => (
            <div key={i} style={{ width: p ? 4 : (i === 2 ? 8 : 5), height: p ? 4 : (i === 2 ? 8 : 5), transform: 'rotate(45deg)', background: t.textAccent, opacity: i === 2 ? 0.8 : 0.4 }}/>
          ))}
        </div>
        <div style={{ position: 'absolute', bottom: p ? 10 : 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 10, alignItems: 'center' }}>
          {[0,1,2,3,4].map(i => (
            <div key={i} style={{ width: p ? 4 : (i === 2 ? 8 : 5), height: p ? 4 : (i === 2 ? 8 : 5), transform: 'rotate(45deg)', background: t.textAccent, opacity: i === 2 ? 0.8 : 0.4 }}/>
          ))}
        </div>
      </div>
    )
  }

  if (t.decoration === 'grid') {
    return (
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <svg width="100%" height="100%">
          <defs>
            <pattern id={`grid-${t.id}`} x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke={t.textPrimary} strokeWidth="0.5" opacity="0.08"/>
              <circle cx="0" cy="0" r="1.5" fill={t.textAccent} opacity="0.12"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grid-${t.id})`}/>
        </svg>
      </div>
    )
  }

  if (t.decoration === 'circles') {
    return (
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0, opacity: 0.06 }}>
        <svg width="100%" height="100%" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice">
          {[60,120,200,300].map((r, i) => (
            <circle key={i} cx="200" cy="200" r={r} fill="none" stroke={t.textAccent} strokeWidth="1"/>
          ))}
        </svg>
      </div>
    )
  }

  return null
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

function Avatar({ t, page, username, size, p }: {
  t: TemplateConfig; page: Page; username: string; size: number; p: boolean
}) {
  const avatarLetter = (page.title || username || 'T').charAt(0).toUpperCase()
  const isGlow = GLOW_TEMPLATES.has(t.id)
  const isLuxury = LUXURY_TEMPLATES.has(t.id)
  const isEditorial = EDITORIAL_TEMPLATES.has(t.id)
  const isSquare = isEditorial && !isLuxury

  const borderRadius = isSquare ? '4px' : '50%'
  const border = isLuxury
    ? `2px solid ${t.textAccent}`
    : isEditorial
    ? `3px solid ${t.textAccent}`
    : `2px solid ${t.avatarBorder || t.textAccent}`

  const boxShadow = isGlow
    ? `0 0 0 3px ${t.bg}, 0 0 0 5px ${t.textAccent}66, 0 0 30px ${t.glowColor || t.textAccent + '44'}`
    : isLuxury
    ? `0 0 0 4px ${t.bg}, 0 0 0 6px ${t.textAccent}44, 0 0 0 8px ${t.bg}, 0 0 0 9px ${t.textAccent}22`
    : t.glowColor
    ? `0 0 20px ${t.glowColor}`
    : undefined

  const innerFontSize = size * 0.38

  return (
    <div className="taar-avatar-wrap" style={{ position: 'relative', display: 'inline-block' }}>
      {/* Animated glow ring for glow templates */}
      {isGlow && (
        <div style={{
          position: 'absolute', inset: -8, borderRadius: '50%',
          border: `2px solid ${t.textAccent}`,
          animation: 'taar-pulse-ring 2s ease-out infinite',
          pointerEvents: 'none',
        }}/>
      )}
      <div style={{
        width: size, height: size,
        borderRadius,
        flexShrink: 0,
        background: t.avatarBg || (t.btnStyle === 'solid' ? t.btnBg : t.textAccent + '22'),
        border,
        boxShadow,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {page.avatar_url
          ? <img src={page.avatar_url} alt={page.title || username} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
          : <span style={{
              fontFamily: getFontFamily(t.fontDisplay),
              fontSize: innerFontSize,
              color: t.btnStyle === 'solid' ? t.btnText : t.textPrimary,
              letterSpacing: '0.05em',
              fontWeight: 700,
            }}>
              {avatarLetter}
            </span>
        }
      </div>
    </div>
  )
}

// ─── Gold shimmer name for Indian/luxury templates ────────────────────────────

function NameDisplay({ t, text, p }: { t: TemplateConfig; text: string; p: boolean }) {
  const isIndian = INDIAN_TEMPLATES.has(t.id)
  const isLuxury = LUXURY_TEMPLATES.has(t.id)
  const isGlow = GLOW_TEMPLATES.has(t.id)
  const isSerifDisplay = ['Cormorant Garamond','Playfair Display','Cinzel','Abril Fatface','Libre Baskerville'].includes(t.fontDisplay)
  const isBoldDisplay = ['Bebas Neue','Anton','Russo One','Oswald','Josefin Sans'].includes(t.fontDisplay)
  const isCormorant = t.fontDisplay === 'Cormorant Garamond'

  const baseFontSize = p
    ? 18
    : isSerifDisplay ? 42 : isBoldDisplay ? 36 : 30

  let textStyle: React.CSSProperties = {
    fontFamily: getFontFamily(t.fontDisplay),
    fontSize: baseFontSize,
    color: t.textPrimary,
    letterSpacing: isBoldDisplay ? '0.08em' : isSerifDisplay ? '-0.01em' : '0.01em',
    lineHeight: 1.05,
    fontWeight: isBoldDisplay ? 400 : isSerifDisplay ? 600 : 700,
    fontStyle: isCormorant && !p ? 'italic' : 'normal',
  }

  if ((isIndian || isLuxury) && !p) {
    textStyle = {
      ...textStyle,
      background: `linear-gradient(90deg, ${t.textAccent}, #fff8e7, ${t.textAccent}, #fff8e7, ${t.textAccent})`,
      backgroundSize: '300% auto',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      animation: 'taar-gold-shimmer 5s linear infinite',
    }
  } else if (isGlow) {
    textStyle = { ...textStyle, textShadow: `0 0 20px ${t.textPrimary}88, 0 0 40px ${t.textAccent}44` }
  }

  return (
    <div className="taar-name-wrap" style={textStyle}>
      {isBoldDisplay ? text.toUpperCase() : text}
    </div>
  )
}

// ─── Link button ──────────────────────────────────────────────────────────────

function LinkButton({ link, t, p, isPreview }: {
  link: LinkType; t: TemplateConfig; p: boolean; isPreview?: boolean
}) {
  const btnRadius = { none: '0px', sm: '6px', lg: '12px', full: '9999px' }[t.btnRadius]
  const isGlow = GLOW_TEMPLATES.has(t.id)
  const isBoldFont = ['Bebas Neue','Anton','Russo One','Oswald','Josefin Sans','Raleway','Space Mono'].includes(t.fontDisplay)

  let baseStyle: React.CSSProperties = {
    borderRadius: btnRadius,
    fontFamily: getFontFamily(t.fontDisplay),
    fontSize: p ? 12 : 15,
    fontWeight: 600,
    letterSpacing: isBoldFont ? '0.1em' : '0.02em',
    width: '100%',
    padding: p ? '10px 16px' : '15px 24px',
    textAlign: 'center',
    display: 'block',
    textDecoration: 'none',
    cursor: 'pointer',
    lineHeight: 1,
  }

  let extraClasses = `taar-btn-${t.id}`

  if (t.btnStyle === 'solid') {
    baseStyle = {
      ...baseStyle,
      background: t.btnBg,
      color: t.btnText,
      boxShadow: '0 2px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
    }
    extraClasses += ` taar-solid-${t.id}`
  } else if (t.btnStyle === 'outline') {
    const borderColor = t.btnBorder || t.btnText
    baseStyle = {
      ...baseStyle,
      background: 'transparent',
      color: t.btnText,
      border: `1.5px solid ${borderColor}`,
    }
    extraClasses += ` taar-outline-${t.id}`
  } else if (t.btnStyle === 'gradient') {
    baseStyle = { ...baseStyle, background: t.bgGradient || t.btnBg, color: t.btnText }
    extraClasses += ` taar-solid-${t.id}`
  } else {
    // ghost
    baseStyle = { ...baseStyle, background: 'transparent', color: t.btnText }
    extraClasses += ` taar-ghost-${t.id}`
  }

  if (isGlow) {
    extraClasses += ` taar-glow-btn-${t.id}`
  }

  const icon = getLinkIcon(link.type)
  const label = isBoldFont ? link.label.toUpperCase() : link.label

  const inner = (
    <div className={extraClasses} style={baseStyle}>
      {icon} {label}
    </div>
  )

  if (isPreview) {
    return (
      <a href={getLinkUrl(link.type, link.url)} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', width: '100%' }}>
        {inner}
      </a>
    )
  }
  return (
    <TrackableLink link={link} style={{ textDecoration: 'none', width: '100%' }}>
      {inner}
    </TrackableLink>
  )
}

// ─── Editorial rule separator ─────────────────────────────────────────────────

function EditorialRule({ t, p }: { t: TemplateConfig; p: boolean }) {
  const isDouble = LUXURY_TEMPLATES.has(t.id)
  return (
    <div style={{ marginBottom: p ? 12 : 20, paddingBottom: p ? 12 : 20, borderBottom: `1px solid ${t.textPrimary}22`, position: 'relative' }}>
      {isDouble && (
        <div style={{ position: 'absolute', bottom: 3, left: 0, right: 0, height: '0.5px', background: `${t.textAccent}44` }}/>
      )}
    </div>
  )
}

// ─── Main renderer ────────────────────────────────────────────────────────────

export function TemplateRenderer({ page, links, products, username, showWatermark, isPreview }: Props) {
  const t = getTemplate(page.template_id)
  const p = !!isPreview

  const bgStyle = t.bgGradient ? { background: t.bgGradient } : { background: t.bg }
  const isLight = LIGHT_BG_TEMPLATES.has(t.id)
  const isGlow = GLOW_TEMPLATES.has(t.id)
  const isIndian = INDIAN_TEMPLATES.has(t.id)
  const isMoody = MOODY_TEMPLATES.has(t.id)
  const isEditorialTemplate = EDITORIAL_TEMPLATES.has(t.id)
  const isNature = NATURE_TEMPLATES.has(t.id)

  const activeLinks = links.filter(l => l.is_active)
  const activeProducts = products.filter(pr => pr.is_active)

  const displayTitle = page.title || username || 'YOUR NAME'

  // ── EDITORIAL LAYOUT ──────────────────────────────────────────────────────
  if (t.layout === 'editorial') {
    return (
      <div style={{ ...bgStyle, minHeight: p ? '100%' : '100vh', fontFamily: getFontFamily(t.fontBody), position: 'relative', overflow: 'hidden' }}>
        <GlobalStyles tid={t.id} t={t} />
        <Decoration t={t} p={p}/>

        {isGlow && <GlowBackground t={t}/>}
        {isIndian && <IndianBackground t={t}/>}
        {isEditorialTemplate && <EditorialBackground t={t}/>}
        {isMoody && <MoodyBackground t={t}/>}

        {t.bgNoise && <NoiseLayer opacity={0.04}/>}

        {/* Accent top bar */}
        <div style={{ height: 3, background: t.textAccent, position: 'relative', zIndex: 3 }}/>

        <div style={{ maxWidth: 420, margin: '0 auto', padding: p ? '16px 16px' : '40px 24px', position: 'relative', zIndex: 2 }}>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: p ? 12 : 20, marginBottom: p ? 16 : 28 }}>
            <Avatar t={t} page={page} username={username} size={p ? 52 : 80} p={p}/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <NameDisplay t={t} text={displayTitle} p={p}/>
              {page.bio && (
                <p style={{
                  color: t.textSecondary, fontSize: p ? 9 : 12,
                  marginTop: 6, lineHeight: 1.5, maxWidth: 240,
                  fontStyle: ['Cormorant Garamond','Libre Baskerville'].includes(t.fontDisplay) ? 'italic' : 'normal',
                }}>
                  {page.bio}
                </p>
              )}
            </div>
          </div>

          {/* Rule */}
          <EditorialRule t={t} p={p}/>

          {/* Links */}
          <div className="taar-links-wrap" style={{ display: 'flex', flexDirection: 'column', gap: p ? 8 : 10, marginBottom: p ? 12 : 20 }}>
            {activeLinks.map(link => (
              <LinkButton key={link.id} link={link} t={t} p={p} isPreview={isPreview}/>
            ))}
            {activeLinks.length === 0 && isPreview && (
              <div style={{ color: t.textSecondary, fontSize: 11, padding: '12px 0', textAlign: 'center' }}>
                Add links to see them here
              </div>
            )}
          </div>

          {activeProducts.length > 0 && (
            <div style={{ marginBottom: p ? 12 : 20 }}>
              <div style={{ color: t.textSecondary, fontSize: p ? 9 : 11, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8, borderBottom: `1px solid ${t.textPrimary}18`, paddingBottom: 6 }}>
                Products
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {activeProducts.map(pr => <ProductCard key={pr.id} product={pr} theme={isLight ? 'light' : 'dark'}/>)}
              </div>
            </div>
          )}

          {page.email_capture_enabled && !isPreview && (
            <div style={{ marginTop: 8, marginBottom: p ? 12 : 20 }}>
              <EmailCaptureForm
                pageId={page.id}
                accentColor={t.textAccent}
                textColor={t.textSecondary}
                borderColor={isLight ? '#00000018' : '#ffffff18'}
                bgColor={isLight ? '#00000008' : '#ffffff06'}
              />
            </div>
          )}

          {showWatermark && (
            <div style={{ color: t.watermarkColor, fontSize: 9, letterSpacing: '0.15em', marginTop: 12 }}>
              <a href="/" style={{ color: 'inherit', textDecoration: 'none' }}>MADE WITH TAAR</a>
            </div>
          )}
        </div>
        {!isPreview && <script src="https://checkout.razorpay.com/v1/checkout.js" async/>}
      </div>
    )
  }

  // ── CENTERED LAYOUT (default) ─────────────────────────────────────────────
  return (
    <div style={{ ...bgStyle, minHeight: p ? '100%' : '100vh', fontFamily: getFontFamily(t.fontBody), position: 'relative', overflow: 'hidden' }}>
      <GlobalStyles tid={t.id} t={t}/>
      <Decoration t={t} p={p}/>

      {isGlow && <GlowBackground t={t}/>}
      {isIndian && <IndianBackground t={t}/>}
      {isMoody && <MoodyBackground t={t}/>}
      {isNature && <NatureBackground t={t}/>}

      {t.bgNoise && <NoiseLayer opacity={0.035}/>}

      <div style={{ maxWidth: 420, margin: '0 auto', padding: p ? '24px 16px' : '64px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 }}>

        <Avatar t={t} page={page} username={username} size={p ? 64 : 100} p={p}/>

        <div style={{ height: p ? 12 : 18 }}/>

        <NameDisplay t={t} text={displayTitle} p={p}/>

        <div style={{ height: p ? 6 : 8 }}/>

        {page.bio && (
          <p className="taar-bio-wrap" style={{
            color: t.textSecondary,
            fontSize: p ? 10 : 15,
            textAlign: 'center',
            marginBottom: p ? 16 : 28,
            maxWidth: 300,
            lineHeight: 1.6,
            fontStyle: ['Cormorant Garamond','Libre Baskerville'].includes(t.fontDisplay) ? 'italic' : 'normal',
          }}>
            {page.bio}
          </p>
        )}
        {!page.bio && <div style={{ marginBottom: p ? 10 : 18 }}/>}

        {/* Decorative rule for Indian templates */}
        {isIndian && (
          <div style={{ width: p ? 80 : 120, marginBottom: p ? 14 : 22, display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${t.textAccent})` }}/>
            <div style={{ width: 5, height: 5, transform: 'rotate(45deg)', background: t.textAccent }}/>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${t.textAccent}, transparent)` }}/>
          </div>
        )}

        <div className="taar-links-wrap" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: p ? 9 : 13, marginBottom: p ? 14 : 24 }}>
          {activeLinks.map(link => (
            <LinkButton key={link.id} link={link} t={t} p={p} isPreview={isPreview}/>
          ))}
          {activeLinks.length === 0 && isPreview && (
            <div style={{ textAlign: 'center', color: t.textSecondary, fontSize: 11, padding: '16px 0' }}>
              Add links to see them here
            </div>
          )}
        </div>

        {activeProducts.length > 0 && (
          <div style={{ width: '100%', marginBottom: p ? 14 : 24 }}>
            <div style={{ color: t.textSecondary, fontSize: p ? 9 : 11, textAlign: 'center', marginBottom: 10, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Products
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {activeProducts.map(pr => <ProductCard key={pr.id} product={pr} theme={isLight ? 'light' : 'dark'}/>)}
            </div>
          </div>
        )}

        {page.email_capture_enabled && !isPreview && (
          <div style={{ width: '100%', marginTop: 8, marginBottom: p ? 12 : 20 }}>
            <EmailCaptureForm
              pageId={page.id}
              accentColor={t.textAccent}
              textColor={t.textSecondary}
              borderColor={isLight ? '#00000018' : '#ffffff18'}
              bgColor={isLight ? '#00000008' : '#ffffff06'}
            />
          </div>
        )}

        {showWatermark && (
          <div style={{ color: t.watermarkColor, fontSize: 9, letterSpacing: '0.15em', marginTop: 14 }}>
            <a href="/" style={{ color: 'inherit', textDecoration: 'none' }}>MADE WITH TAAR</a>
          </div>
        )}
      </div>
      {!isPreview && <script src="https://checkout.razorpay.com/v1/checkout.js" async/>}
    </div>
  )
}

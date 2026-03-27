export interface TemplateConfig {
  id: string
  name: string
  category: string
  emoji: string
  bg: string
  bgGradient?: string
  textPrimary: string
  textSecondary: string
  textAccent: string
  btnBg: string
  btnText: string
  btnBorder?: string
  btnRadius: string
  btnStyle: 'solid' | 'outline' | 'ghost' | 'gradient'
  fontDisplay: string
  fontBody: string
  nameStyle?: string
  avatarBorder?: string
  avatarBg?: string
  decoration?: 'none' | 'dots' | 'grid' | 'stars' | 'lines' | 'diamonds' | 'circles'
  animated?: boolean
  animationType?: 'gradient' | 'glow' | 'float'
  glowColor?: string
  watermarkColor: string
  layout?: 'centered' | 'editorial'
  bgNoise?: boolean
}

export const TEMPLATES: TemplateConfig[] = [

  // ─── INDIAN CULTURE (8) ───────────────────────────────────────────
  { id:'bollywood_editorial', name:'Bollywood Editorial', category:'Indian Culture', emoji:'🎬',
    bg:'#0A0005', textPrimary:'#F5C842', textSecondary:'#8B7320', textAccent:'#F5C842',
    btnBg:'transparent', btnText:'#F5C842', btnBorder:'#F5C842', btnRadius:'none', btnStyle:'outline',
    fontDisplay:'Bebas Neue', fontBody:'DM Sans', decoration:'diamonds', layout:'editorial', bgNoise:true, watermarkColor:'#2A1A00' },

  { id:'desi_marigold', name:'Desi Marigold', category:'Indian Culture', emoji:'🌼',
    bg:'#FF6500', textPrimary:'#FFFFFF', textSecondary:'#FFE4B5', textAccent:'#FFD700',
    btnBg:'#FFD700', btnText:'#3D1500', btnRadius:'full', btnStyle:'solid',
    fontDisplay:'Cinzel', fontBody:'DM Sans', watermarkColor:'#CC5200' },

  { id:'mumbai_noir', name:'Mumbai Noir', category:'Indian Culture', emoji:'🌧️',
    bg:'#111111', textPrimary:'#00E5FF', textSecondary:'#336B7A', textAccent:'#00E5FF',
    btnBg:'transparent', btnText:'#00E5FF', btnBorder:'#00E5FF', btnRadius:'none', btnStyle:'outline',
    fontDisplay:'Oswald', fontBody:'DM Sans', layout:'editorial', bgNoise:true, glowColor:'#00E5FF22', watermarkColor:'#222222' },

  { id:'rajasthani_royal', name:'Rajasthani Royal', category:'Indian Culture', emoji:'🏰',
    bg:'#1E0A12', textPrimary:'#D4AF37', textSecondary:'#8B6914', textAccent:'#D4AF37',
    btnBg:'transparent', btnText:'#D4AF37', btnBorder:'#D4AF37', btnRadius:'none', btnStyle:'outline',
    fontDisplay:'Cinzel', fontBody:'Cormorant Garamond', decoration:'diamonds', bgNoise:true, watermarkColor:'#3D1A22' },

  { id:'south_indian_temple', name:'Temple Stone', category:'Indian Culture', emoji:'🪔',
    bg:'#E8DCC8', textPrimary:'#2C1A0A', textSecondary:'#8B6540', textAccent:'#8B2500',
    btnBg:'#2C1A0A', btnText:'#E8DCC8', btnRadius:'none', btnStyle:'solid',
    fontDisplay:'Josefin Sans', fontBody:'DM Sans', decoration:'grid', watermarkColor:'#C4AE90' },

  { id:'kolkata_adda', name:'Kolkata Adda', category:'Indian Culture', emoji:'☕',
    bg:'#FFF9F0', textPrimary:'#2C1A0A', textSecondary:'#8B6540', textAccent:'#CC3300',
    btnBg:'transparent', btnText:'#2C1A0A', btnBorder:'#2C1A0A', btnRadius:'none', btnStyle:'outline',
    fontDisplay:'Libre Baskerville', fontBody:'DM Sans', decoration:'lines', watermarkColor:'#D4B896' },

  { id:'punjabi_energy', name:'Punjabi Energy', category:'Indian Culture', emoji:'🥁',
    bg:'#FFE500', textPrimary:'#0A0A0A', textSecondary:'#333300', textAccent:'#CC0000',
    btnBg:'#CC0000', btnText:'#FFE500', btnRadius:'none', btnStyle:'solid',
    fontDisplay:'Anton', fontBody:'DM Sans', watermarkColor:'#CCBB00' },

  { id:'dilli_hustle', name:'Dilli Hustle', category:'Indian Culture', emoji:'🏙️',
    bg:'#1A1A1A', textPrimary:'#FFFFFF', textSecondary:'#888888', textAccent:'#FF2D00',
    btnBg:'transparent', btnText:'#FFFFFF', btnBorder:'#444444', btnRadius:'none', btnStyle:'outline',
    fontDisplay:'Russo One', fontBody:'DM Sans', layout:'editorial', bgNoise:true, watermarkColor:'#333333' },

  // ─── CREATOR AESTHETICS (12) ──────────────────────────────────────
  { id:'streetwear', name:'Streetwear', category:'Creator', emoji:'🖤',
    bg:'#0A0A0A', textPrimary:'#FFFFFF', textSecondary:'#555555', textAccent:'#FFFFFF',
    btnBg:'#FFFFFF', btnText:'#000000', btnRadius:'none', btnStyle:'solid',
    fontDisplay:'Bebas Neue', fontBody:'DM Sans', watermarkColor:'#222222' },

  { id:'pastel_food', name:'Pastel Food', category:'Creator', emoji:'🍰',
    bg:'#FDF6EC', textPrimary:'#5C2D0E', textSecondary:'#C89B7B', textAccent:'#E8593C',
    btnBg:'#FFFFFF', btnText:'#5C2D0E', btnBorder:'#F0DCC8', btnRadius:'full', btnStyle:'outline',
    fontDisplay:'Playfair Display', fontBody:'DM Sans', watermarkColor:'#D4B896' },

  { id:'cyberpunk_neon', name:'Cyberpunk', category:'Creator', emoji:'🟢',
    bg:'#000000', textPrimary:'#00FF41', textSecondary:'#006B11', textAccent:'#00FF41',
    btnBg:'transparent', btnText:'#00FF41', btnBorder:'#00FF41', btnRadius:'none', btnStyle:'outline',
    fontDisplay:'Space Mono', fontBody:'Space Mono', glowColor:'#00FF4133', animated:true, animationType:'glow', bgNoise:true, watermarkColor:'#003311' },

  { id:'dark_academia', name:'Dark Academia', category:'Creator', emoji:'📚',
    bg:'#1A1209', textPrimary:'#C8A96E', textSecondary:'#7A5C2A', textAccent:'#C8A96E',
    btnBg:'transparent', btnText:'#C8A96E', btnBorder:'#5A3C1A', btnRadius:'none', btnStyle:'outline',
    fontDisplay:'Cormorant Garamond', fontBody:'Cormorant Garamond', decoration:'lines', bgNoise:true, watermarkColor:'#2A1F09' },

  { id:'rose_gold_luxury', name:'Rose Gold', category:'Creator', emoji:'✨',
    bg:'#B76E79', bgGradient:'linear-gradient(160deg,#B76E79 0%,#E8B4B8 50%,#F7C59F 100%)',
    textPrimary:'#FFFFFF', textSecondary:'rgba(255,255,255,0.7)', textAccent:'#FFFFFF',
    btnBg:'rgba(255,255,255,0.25)', btnText:'#FFFFFF', btnBorder:'rgba(255,255,255,0.5)', btnRadius:'full', btnStyle:'outline',
    fontDisplay:'Cormorant Garamond', fontBody:'DM Sans', watermarkColor:'rgba(255,255,255,0.3)' },

  { id:'y2k_revival', name:'Y2K Revival', category:'Creator', emoji:'💅',
    bg:'#FFB6C1', textPrimary:'#5C0035', textSecondary:'#CC3377', textAccent:'#FF1493',
    btnBg:'#FF1493', btnText:'#FFFFFF', btnRadius:'full', btnStyle:'solid',
    fontDisplay:'Righteous', fontBody:'DM Sans', decoration:'stars', watermarkColor:'#CC8899' },

  { id:'vaporwave', name:'Vaporwave', category:'Creator', emoji:'🌐',
    bg:'#0d0033', bgGradient:'linear-gradient(135deg,#1a001a 0%,#0d0033 50%,#001a33 100%)',
    textPrimary:'#FF71CE', textSecondary:'#B967FF', textAccent:'#01CDFE',
    btnBg:'transparent', btnText:'#01CDFE', btnBorder:'#01CDFE', btnRadius:'none', btnStyle:'outline',
    fontDisplay:'Bebas Neue', fontBody:'DM Sans', glowColor:'#FF71CE22', watermarkColor:'#2D0033' },

  { id:'lo_fi_beats', name:'Lo-Fi Beats', category:'Creator', emoji:'🎧',
    bg:'#2D2B3D', textPrimary:'#E8D5B7', textSecondary:'#9B8EA0', textAccent:'#FF9EAA',
    btnBg:'rgba(255,158,170,0.15)', btnText:'#FF9EAA', btnBorder:'#FF9EAA', btnRadius:'full', btnStyle:'outline',
    fontDisplay:'Caveat', fontBody:'DM Sans', decoration:'stars', watermarkColor:'#3D3B4D' },

  { id:'cottagecore', name:'Cottagecore', category:'Creator', emoji:'🌿',
    bg:'#EEF3EE', textPrimary:'#2D3B2D', textSecondary:'#6B8F6B', textAccent:'#4A7C4A',
    btnBg:'#4A7C4A', btnText:'#FFFFFF', btnRadius:'full', btnStyle:'solid',
    fontDisplay:'Playfair Display', fontBody:'DM Sans', decoration:'dots', watermarkColor:'#C4D4C4' },

  { id:'dark_minimal', name:'Dark Minimal', category:'Creator', emoji:'⬛',
    bg:'#000000', textPrimary:'#FFFFFF', textSecondary:'#444444', textAccent:'#FFFFFF',
    btnBg:'transparent', btnText:'#FFFFFF', btnBorder:'#333333', btnRadius:'none', btnStyle:'outline',
    fontDisplay:'DM Sans', fontBody:'DM Sans', watermarkColor:'#222222' },

  { id:'brutalist', name:'Brutalist', category:'Creator', emoji:'🧱',
    bg:'#FFFFFF', textPrimary:'#000000', textSecondary:'#555555', textAccent:'#FF2D00',
    btnBg:'#000000', btnText:'#FFFFFF', btnRadius:'none', btnStyle:'solid',
    fontDisplay:'Anton', fontBody:'Space Mono', decoration:'grid', layout:'editorial', watermarkColor:'#CCCCCC' },

  { id:'glitch_art', name:'Glitch Art', category:'Creator', emoji:'📡',
    bg:'#000000', textPrimary:'#00FFFF', textSecondary:'#FF00FF', textAccent:'#00FFFF',
    btnBg:'transparent', btnText:'#00FFFF', btnBorder:'#FF00FF', btnRadius:'none', btnStyle:'outline',
    fontDisplay:'Space Mono', fontBody:'Space Mono', layout:'editorial', bgNoise:true, glowColor:'#00FFFF22', watermarkColor:'#001111' },

  // ─── PROFESSIONAL (8) ─────────────────────────────────────────────
  { id:'executive_dark', name:'Executive', category:'Professional', emoji:'💼',
    bg:'#0F172A', textPrimary:'#F8FAFC', textSecondary:'#64748B', textAccent:'#6366F1',
    btnBg:'#6366F1', btnText:'#FFFFFF', btnRadius:'sm', btnStyle:'solid',
    fontDisplay:'Raleway', fontBody:'DM Sans', watermarkColor:'#1E293B' },

  { id:'corporate_clean', name:'Corporate Clean', category:'Professional', emoji:'🏢',
    bg:'#FFFFFF', textPrimary:'#0F172A', textSecondary:'#64748B', textAccent:'#0066CC',
    btnBg:'#0066CC', btnText:'#FFFFFF', btnRadius:'sm', btnStyle:'solid',
    fontDisplay:'Josefin Sans', fontBody:'DM Sans', decoration:'lines', watermarkColor:'#CCCCCC' },

  { id:'startup_founder', name:'Startup Founder', category:'Professional', emoji:'🚀',
    bg:'#0A0A0A', textPrimary:'#FFFFFF', textSecondary:'#666666', textAccent:'#00FF88',
    btnBg:'transparent', btnText:'#00FF88', btnBorder:'#00FF88', btnRadius:'none', btnStyle:'outline',
    fontDisplay:'Space Mono', fontBody:'Space Mono', glowColor:'#00FF8822', watermarkColor:'#1A1A1A' },

  { id:'educator_warm', name:'Educator', category:'Professional', emoji:'📖',
    bg:'#FFFBF0', textPrimary:'#3D2B0A', textSecondary:'#9A7B45', textAccent:'#E8593C',
    btnBg:'#E8593C', btnText:'#FFFFFF', btnRadius:'lg', btnStyle:'solid',
    fontDisplay:'Playfair Display', fontBody:'DM Sans', watermarkColor:'#E8D8B8' },

  { id:'legal_professional', name:'Legal', category:'Professional', emoji:'⚖️',
    bg:'#1C1C1C', textPrimary:'#F0E6D3', textSecondary:'#8B7355', textAccent:'#D4AF37',
    btnBg:'transparent', btnText:'#D4AF37', btnBorder:'#D4AF37', btnRadius:'none', btnStyle:'outline',
    fontDisplay:'Libre Baskerville', fontBody:'DM Sans', bgNoise:true, watermarkColor:'#2A2A2A' },

  { id:'medical_clean', name:'Medical', category:'Professional', emoji:'🩺',
    bg:'#F0FAFB', textPrimary:'#0F2A30', textSecondary:'#4A8A95', textAccent:'#00ACC1',
    btnBg:'#00ACC1', btnText:'#FFFFFF', btnRadius:'lg', btnStyle:'solid',
    fontDisplay:'Josefin Sans', fontBody:'DM Sans', watermarkColor:'#B0D8DD' },

  { id:'architect_grid', name:'Architect', category:'Professional', emoji:'📐',
    bg:'#FAFAFA', textPrimary:'#0A0A0A', textSecondary:'#555555', textAccent:'#0A0A0A',
    btnBg:'transparent', btnText:'#0A0A0A', btnBorder:'#0A0A0A', btnRadius:'none', btnStyle:'outline',
    fontDisplay:'Space Mono', fontBody:'Space Mono', decoration:'grid', layout:'editorial', watermarkColor:'#CCCCCC' },

  { id:'journalist', name:'Journalist', category:'Professional', emoji:'📰',
    bg:'#F4ECD8', textPrimary:'#1A0E00', textSecondary:'#7A5C2A', textAccent:'#8B0000',
    btnBg:'#1A0E00', btnText:'#F4ECD8', btnRadius:'none', btnStyle:'solid',
    fontDisplay:'Libre Baskerville', fontBody:'DM Sans', decoration:'lines', layout:'editorial', watermarkColor:'#D4C4A0' },

  // ─── MUSIC & ARTS (7) ─────────────────────────────────────────────
  { id:'concert_poster', name:'Concert Poster', category:'Music & Arts', emoji:'🎤',
    bg:'#000000', textPrimary:'#FFD700', textSecondary:'#AA8800', textAccent:'#FFD700',
    btnBg:'#FFD700', btnText:'#000000', btnRadius:'none', btnStyle:'solid',
    fontDisplay:'Bebas Neue', fontBody:'DM Sans', decoration:'stars', bgNoise:true, watermarkColor:'#1A1400' },

  { id:'vinyl_record', name:'Vinyl', category:'Music & Arts', emoji:'🎵',
    bg:'#0D0D0D', textPrimary:'#F0E6CC', textSecondary:'#7A6A50', textAccent:'#E8593C',
    btnBg:'transparent', btnText:'#F0E6CC', btnBorder:'#333333', btnRadius:'full', btnStyle:'outline',
    fontDisplay:'Abril Fatface', fontBody:'DM Sans', decoration:'dots', watermarkColor:'#1A1A1A' },

  { id:'art_gallery', name:'Art Gallery', category:'Music & Arts', emoji:'🖼️',
    bg:'#FAFAFA', textPrimary:'#0A0A0A', textSecondary:'#777777', textAccent:'#0A0A0A',
    btnBg:'transparent', btnText:'#0A0A0A', btnBorder:'#0A0A0A', btnRadius:'none', btnStyle:'outline',
    fontDisplay:'Cormorant Garamond', fontBody:'DM Sans', decoration:'lines', watermarkColor:'#CCCCCC' },

  { id:'film_director', name:'Film Director', category:'Music & Arts', emoji:'🎬',
    bg:'#0A0A0A', textPrimary:'#E8E0D0', textSecondary:'#6A5A4A', textAccent:'#E8593C',
    btnBg:'transparent', btnText:'#E8E0D0', btnBorder:'#3A3A3A', btnRadius:'none', btnStyle:'outline',
    fontDisplay:'Oswald', fontBody:'DM Sans', layout:'editorial', bgNoise:true, watermarkColor:'#1A1A1A' },

  { id:'poetry_zine', name:'Poetry Zine', category:'Music & Arts', emoji:'✍️',
    bg:'#F5F0E8', textPrimary:'#2A1A0A', textSecondary:'#8B6540', textAccent:'#8B2500',
    btnBg:'transparent', btnText:'#2A1A0A', btnBorder:'#2A1A0A', btnRadius:'none', btnStyle:'outline',
    fontDisplay:'Caveat', fontBody:'DM Sans', watermarkColor:'#D4C4A0' },

  { id:'street_photography', name:'Street Photo', category:'Music & Arts', emoji:'📷',
    bg:'#111111', textPrimary:'#FFFFFF', textSecondary:'#666666', textAccent:'#FFFFFF',
    btnBg:'#FFFFFF', btnText:'#111111', btnRadius:'none', btnStyle:'solid',
    fontDisplay:'Anton', fontBody:'DM Sans', layout:'editorial', bgNoise:true, watermarkColor:'#222222' },

  { id:'classical_music', name:'Classical', category:'Music & Arts', emoji:'🎻',
    bg:'#FFFDF5', textPrimary:'#3D0A1A', textSecondary:'#8B4A5A', textAccent:'#8B0000',
    btnBg:'transparent', btnText:'#3D0A1A', btnBorder:'#8B0000', btnRadius:'none', btnStyle:'outline',
    fontDisplay:'Cinzel', fontBody:'Cormorant Garamond', decoration:'diamonds', watermarkColor:'#D4C4B0' },

  // ─── LIFESTYLE & WELLNESS (5) ─────────────────────────────────────
  { id:'fitness_mode', name:'Fitness Mode', category:'Lifestyle', emoji:'💪',
    bg:'#0A0A0A', textPrimary:'#FFFFFF', textSecondary:'#666666', textAccent:'#FF4500',
    btnBg:'#FF4500', btnText:'#FFFFFF', btnRadius:'none', btnStyle:'solid',
    fontDisplay:'Anton', fontBody:'DM Sans', watermarkColor:'#1A0A00' },

  { id:'wellness_spa', name:'Wellness', category:'Lifestyle', emoji:'🧘',
    bg:'#F5F0E8', textPrimary:'#3D3020', textSecondary:'#8B7B5A', textAccent:'#6B8F6B',
    btnBg:'#6B8F6B', btnText:'#FFFFFF', btnRadius:'full', btnStyle:'solid',
    fontDisplay:'Playfair Display', fontBody:'DM Sans', decoration:'dots', watermarkColor:'#D4C8B0' },

  { id:'travel_journal', name:'Travel Journal', category:'Lifestyle', emoji:'✈️',
    bg:'#F4ECD8', textPrimary:'#2C1A0A', textSecondary:'#8B6540', textAccent:'#D2691E',
    btnBg:'#D2691E', btnText:'#FFFFFF', btnRadius:'sm', btnStyle:'solid',
    fontDisplay:'Libre Baskerville', fontBody:'DM Sans', decoration:'dots', watermarkColor:'#C4A880' },

  { id:'food_magazine', name:'Food Magazine', category:'Lifestyle', emoji:'🍜',
    bg:'#FFFFFF', textPrimary:'#1A0A00', textSecondary:'#8B5E3C', textAccent:'#E8593C',
    btnBg:'#E8593C', btnText:'#FFFFFF', btnRadius:'none', btnStyle:'solid',
    fontDisplay:'Playfair Display', fontBody:'DM Sans', layout:'editorial', decoration:'lines', watermarkColor:'#DDDDDD' },

  { id:'fashion_editorial', name:'Fashion Editorial', category:'Lifestyle', emoji:'👗',
    bg:'#FFFFFF', textPrimary:'#000000', textSecondary:'#777777', textAccent:'#000000',
    btnBg:'transparent', btnText:'#000000', btnBorder:'#000000', btnRadius:'none', btnStyle:'outline',
    fontDisplay:'Raleway', fontBody:'DM Sans', layout:'editorial', watermarkColor:'#CCCCCC' },

  // ─── NICHE & INTERNET (10) ────────────────────────────────────────
  { id:'anime_otaku', name:'Anime Otaku', category:'Niche', emoji:'⛩️',
    bg:'#0A0015', textPrimary:'#FF71CE', textSecondary:'#B967FF', textAccent:'#01CDFE',
    btnBg:'transparent', btnText:'#FF71CE', btnBorder:'#FF71CE', btnRadius:'sm', btnStyle:'outline',
    fontDisplay:'Russo One', fontBody:'DM Sans', glowColor:'#FF71CE22', decoration:'stars', animated:true, animationType:'glow', watermarkColor:'#1A0030' },

  { id:'podcast_studio', name:'Podcast Studio', category:'Niche', emoji:'🎙️',
    bg:'#111111', textPrimary:'#FFFFFF', textSecondary:'#666666', textAccent:'#FF6B00',
    btnBg:'#FF6B00', btnText:'#FFFFFF', btnRadius:'lg', btnStyle:'solid',
    fontDisplay:'Space Mono', fontBody:'DM Sans', bgNoise:true, watermarkColor:'#222222' },

  { id:'esports', name:'Esports', category:'Niche', emoji:'🎮',
    bg:'#0A0A14', textPrimary:'#00B4FF', textSecondary:'#005577', textAccent:'#00B4FF',
    btnBg:'transparent', btnText:'#00B4FF', btnBorder:'#00B4FF', btnRadius:'none', btnStyle:'outline',
    fontDisplay:'Russo One', fontBody:'DM Sans', decoration:'grid', glowColor:'#00B4FF22', watermarkColor:'#0A0A22' },

  { id:'astrology', name:'Astrology', category:'Niche', emoji:'🌙',
    bg:'#080018', textPrimary:'#D4AF37', textSecondary:'#9B72CF', textAccent:'#D4AF37',
    btnBg:'transparent', btnText:'#D4AF37', btnBorder:'#D4AF37', btnRadius:'full', btnStyle:'outline',
    fontDisplay:'Cinzel', fontBody:'DM Sans', decoration:'stars', glowColor:'#D4AF3722', watermarkColor:'#1A1030' },

  { id:'meme_lord', name:'Meme Lord', category:'Niche', emoji:'😂',
    bg:'#FFE500', textPrimary:'#000000', textSecondary:'#333300', textAccent:'#FF0000',
    btnBg:'#FF0000', btnText:'#FFFFFF', btnRadius:'none', btnStyle:'solid',
    fontDisplay:'Righteous', fontBody:'DM Sans', decoration:'dots', watermarkColor:'#CCBB00' },

  { id:'finance_bro', name:'Finance', category:'Niche', emoji:'📈',
    bg:'#000000', textPrimary:'#00FF41', textSecondary:'#006611', textAccent:'#00FF41',
    btnBg:'transparent', btnText:'#00FF41', btnBorder:'#00FF41', btnRadius:'none', btnStyle:'outline',
    fontDisplay:'Space Mono', fontBody:'Space Mono', decoration:'lines', layout:'editorial', bgNoise:true, watermarkColor:'#001100' },

  { id:'tech_minimal', name:'Tech Minimal', category:'Niche', emoji:'💻',
    bg:'#0D0D0D', textPrimary:'#FFFFFF', textSecondary:'#555555', textAccent:'#AAAAAA',
    btnBg:'transparent', btnText:'#FFFFFF', btnBorder:'#333333', btnRadius:'none', btnStyle:'outline',
    fontDisplay:'Space Mono', fontBody:'Space Mono', watermarkColor:'#1A1A1A' },

  { id:'vintage_retro', name:'Vintage Retro', category:'Niche', emoji:'📻',
    bg:'#F0E6D3', textPrimary:'#2C1A0A', textSecondary:'#8B6540', textAccent:'#8B3A00',
    btnBg:'#8B3A00', btnText:'#F0E6D3', btnRadius:'none', btnStyle:'solid',
    fontDisplay:'Abril Fatface', fontBody:'DM Sans', decoration:'dots', watermarkColor:'#C4A880' },

  { id:'nature_earth', name:'Nature & Earth', category:'Niche', emoji:'🌍',
    bg:'#1A2B1A', textPrimary:'#C8DCC8', textSecondary:'#6B8B6B', textAccent:'#7EC880',
    btnBg:'transparent', btnText:'#C8DCC8', btnBorder:'#4A7C4A', btnRadius:'full', btnStyle:'outline',
    fontDisplay:'Playfair Display', fontBody:'DM Sans', decoration:'lines', watermarkColor:'#2A3B2A' },

  { id:'neon_purple', name:'Neon Purple', category:'Niche', emoji:'🟣',
    bg:'#0A0015', textPrimary:'#BF5FFF', textSecondary:'#6B2F8F', textAccent:'#BF5FFF',
    btnBg:'transparent', btnText:'#BF5FFF', btnBorder:'#BF5FFF', btnRadius:'full', btnStyle:'outline',
    fontDisplay:'Bebas Neue', fontBody:'DM Sans', glowColor:'#BF5FFF33', animated:true, animationType:'glow', watermarkColor:'#1A0030' },
]

const LEGACY_ID_MAP: Record<string, string> = {
  'bollywood':'bollywood_editorial','bollywood-red':'desi_marigold','bollywood-royal':'rajasthani_royal',
  'marigold':'desi_marigold','desi-modern':'south_indian_temple','rangoli':'kolkata_adda',
  'pastel':'pastel_food','pastel-blue':'wellness_spa','pastel-lavender':'neon_purple',
  'pastel-mint':'cottagecore','pastel-peach':'pastel_food','y2k-pink':'y2k_revival',
  'neon-cyber':'cyberpunk_neon','neon-purple':'neon_purple','neon-pink':'anime_otaku',
  'neon-blue':'esports','neon-orange':'fitness_mode','gaming-retro':'esports','gaming-dark':'esports',
  'streetwear-grey':'dark_minimal','streetwear-red':'dilli_hustle','hypebeast':'brutalist',
  'grunge':'dark_academia','retro-90s':'vintage_retro','dark-academia':'dark_academia',
  'vintage-paper':'travel_journal','lo-fi':'lo_fi_beats','gradient-sunset':'rose_gold_luxury',
  'gradient-ocean':'wellness_spa','gradient-aurora':'nature_earth','gradient-rose-gold':'rose_gold_luxury',
  'glass':'rose_gold_luxury','corporate-clean':'corporate_clean','corporate-dark':'executive_dark',
  'fitness':'fitness_mode','wellness':'wellness_spa','art-gallery':'art_gallery',
  'vinyl-dark':'vinyl_record','concert':'concert_poster','minimal-white':'fashion_editorial',
  'minimal-dark':'dark_minimal','minimal-stone':'travel_journal','minimal-slate':'executive_dark',
  'minimal-rose':'rose_gold_luxury','minimal-sage':'wellness_spa','minimal-cream':'pastel_food',
  'minimal-navy':'executive_dark','minimal-forest':'nature_earth','minimal-clay':'vintage_retro',
}

export function getTemplate(id: string): TemplateConfig {
  const resolvedId = LEGACY_ID_MAP[id] || id
  return TEMPLATES.find((t) => t.id === resolvedId) || TEMPLATES.find((t) => t.id === 'streetwear')!
}

export const TEMPLATE_CATEGORIES = ['Indian Culture','Creator','Professional','Music & Arts','Lifestyle','Niche']

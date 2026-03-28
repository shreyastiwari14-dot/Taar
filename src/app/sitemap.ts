import { MetadataRoute } from "next"

const LASTMOD = "2026-03-28"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://taar.bio", lastModified: LASTMOD, changeFrequency: "weekly", priority: 1 },
    { url: "https://taar.bio/demo", lastModified: LASTMOD, changeFrequency: "weekly", priority: 0.9 },
    { url: "https://taar.bio/linktree-alternative-india", lastModified: LASTMOD, changeFrequency: "monthly", priority: 0.9 },
    { url: "https://taar.bio/blog", lastModified: LASTMOD, changeFrequency: "weekly", priority: 0.8 },
    { url: "https://taar.bio/login", lastModified: LASTMOD, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://taar.bio/privacy", lastModified: LASTMOD, changeFrequency: "yearly", priority: 0.3 },
    { url: "https://taar.bio/terms", lastModified: LASTMOD, changeFrequency: "yearly", priority: 0.3 },
  ]
}

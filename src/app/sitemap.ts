import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://taar.bio", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://taar.bio/linktree-alternative-india", lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: "https://taar.bio/login", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://taar.bio/dashboard", lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ]
}

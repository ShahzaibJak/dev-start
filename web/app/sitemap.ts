import type { MetadataRoute } from "next"
import { source } from "@/lib/source"

const siteUrl = "https://dev-start.shahzaibjak.com"

const weekly: MetadataRoute.Sitemap[number]["changeFrequency"] = "weekly"
const monthly: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly"

export default function sitemap(): MetadataRoute.Sitemap {
  const marketingRoutes = [
    "",
    "/features",
    "/workflow",
    "/about",
    "/roadmap",
    "/credits",
    "/contributing",
  ] satisfies ReadonlyArray<string>

  const marketingEntries = marketingRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/roadmap" ? weekly : monthly,
    priority: route === "" ? 1 : 0.8,
  }))

  const docsEntries = source.getPages().map((page) => ({
    url: `${siteUrl}${page.url}`,
    lastModified: new Date(),
    changeFrequency: weekly,
    priority: 0.7,
  }))

  return [...marketingEntries, ...docsEntries]
}

import type { MetadataRoute } from "next"

const siteUrl = "https://dev-start.shahzaibjak.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/features",
    "/docs",
    "/workflow",
    "/about",
    "/roadmap",
    "/credits",
    "/contributing",
  ] satisfies ReadonlyArray<string>

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/roadmap" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }))
}

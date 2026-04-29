import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

import "./globals.css"
import { cn } from "@/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const siteUrl = "https://dev-start.shahzaibjak.com"

export const metadata: Metadata = {
  title: {
    default: "ds-start — The composable Next.js app kit",
    template: "%s | ds-start",
  },
  description:
    "The composable Next.js app kit. Production-ready foundation with composable modules and agent workflows.",
  metadataBase: new URL(siteUrl),
  keywords: [
    "next.js",
    "app kit",
    "starter",
    "template",
    "typescript",
    "ai",
    "agent-ready",
    "tailwind",
    "shadcn",
    "prisma",
    "better-auth",
    "type-safe",
    "scaffold",
    "modules",
    "composable",
    "cli",
    "agentic",
    "claude",
    "codex",
  ],
  authors: [{ name: "Shahzaib Jak", url: "https://github.com/shahzaibjak" }],
  creator: "Shahzaib Jak",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "ds-start",
    title: "ds-start — The composable Next.js app kit",
    description:
      "Production-ready foundation with composable modules and agent workflows.",
    images: [{ url: "/logo.svg", width: 320, height: 64, alt: "ds-start" }],
  },
  twitter: {
    card: "summary",
    title: "ds-start — The composable Next.js app kit",
    description:
      "Production-ready foundation with composable modules and agent workflows.",
    images: ["/logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): React.ReactNode {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body className="flex min-h-svh flex-col">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

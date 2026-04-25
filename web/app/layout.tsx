import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { cn } from "@/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const siteUrl = "https://dev-start.shahzaibjak.com"

export const metadata: Metadata = {
  title: {
    default: "ds-start — The AI-native Next.js starter",
    template: "%s | ds-start",
  },
  description:
    "The AI-native Next.js starter. 10+ built-in AI skills, end-to-end type safety, and production tooling from first commit.",
  metadataBase: new URL(siteUrl),
  keywords: [
    "next.js",
    "starter",
    "template",
    "typescript",
    "ai",
    "ai-native",
    "tailwind",
    "shadcn",
    "prisma",
    "better-auth",
    "type-safe",
    "scaffold",
    "cli",
    "agentic",
    "claude",
  ],
  authors: [{ name: "Shahzaib Jak", url: "https://github.com/shahzaibjak" }],
  creator: "Shahzaib Jak",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "ds-start",
    title: "ds-start — The AI-native Next.js starter",
    description:
      "10+ built-in AI skills. Types from database to UI. Production tooling from first commit.",
    images: [{ url: "/logo.svg", width: 320, height: 64, alt: "ds-start" }],
  },
  twitter: {
    card: "summary",
    title: "ds-start — The AI-native Next.js starter",
    description:
      "10+ built-in AI skills. Types from database to UI. Production tooling from first commit.",
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
        <ThemeProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

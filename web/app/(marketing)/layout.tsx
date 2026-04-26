import { ThemeProvider } from "@/components/theme-provider"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): React.ReactNode {
  return (
    <ThemeProvider>
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </ThemeProvider>
  )
}

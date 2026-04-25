import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CodeBlock } from "@/components/code-block"

const highlights = [
  {
    title: "End-to-end type safety",
    description:
      "Types flow from database schema through server actions to client components. No manual type wiring.",
  },
  {
    title: "Agentic coding flows",
    description:
      "Built-in skills for plan-driven development. Your AI assistant follows structured workflows out of the box.",
  },
  {
    title: "Production tooling",
    description:
      "oxlint, oxfmt, strict TypeScript, Husky pre-commit hooks, and optional extras — all wired up from commit one.",
  },
  {
    title: "Composable extras",
    description:
      "Add Prisma, Better Auth, GitHub Workflows, or Vercel Deploy. Mix and match what you need.",
  },
] satisfies ReadonlyArray<{ title: string; description: string }>

export default function HomePage(): React.ReactNode {
  return (
    <div className="mx-auto max-w-5xl px-6">
      {/* Hero */}
      <section className="flex flex-col items-center gap-6 pb-16 pt-16 text-center sm:gap-8 sm:pb-24 sm:pt-32">
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          AI-native &middot; type-safe &middot; production-ready
        </p>
        <h1 className="max-w-4xl text-[clamp(1.75rem,5vw,3.5rem)] leading-[1.1] font-semibold tracking-tight text-balance">
          The AI-native Next.js starter.
          <br />
          Type-safe and production-ready.
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          10+ built-in AI skills. Types from database to UI. Production tooling
          from first commit.
        </p>

        <div className="w-full max-w-md">
          <CodeBlock>npx ds-start my-app</CodeBlock>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/docs">Get Started</Link>
          </Button>
          <Button asChild variant="outline">
            <a
              href="https://github.com/shahzaibjak/dev-start"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </Button>
        </div>
      </section>

      {/* Feature highlights */}
      <section className="pb-16 sm:pb-24">
        <div className="grid gap-4 sm:grid-cols-2">
          {highlights.map((item) => (
            <Card key={item.title}>
              <CardContent className="p-6">
                <h3 className="text-sm font-medium">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

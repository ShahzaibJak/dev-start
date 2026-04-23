import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Features",
  description: "Everything you get with ds-start out of the box.",
}

const baseStack = [
  {
    name: "Next.js 16",
    detail: "App Router, Turbopack, React Server Components",
    href: "https://nextjs.org",
  },
  {
    name: "TypeScript",
    detail: "Strict mode, no any, full type coverage",
    href: "https://www.typescriptlang.org",
  },
  {
    name: "Tailwind CSS 4",
    detail: "Utility-first CSS with shadcn/ui components",
    href: "https://tailwindcss.com",
  },
  {
    name: "shadcn/ui",
    detail: "Button, Card, Input, Label, Separator pre-installed",
    href: "https://ui.shadcn.com",
  },
  {
    name: "next-ts-api",
    detail: "End-to-end type-safe API routes and client",
    href: "https://github.com/zahinafsar/next-ts-api",
  },
  {
    name: "varlock",
    detail: "Schema-driven env validation and type-safe access",
    href: "https://varlock.dev",
  },
  {
    name: "ESLint + Prettier",
    detail: "Consistent code style enforced on every save",
    href: "https://eslint.org",
  },
  {
    name: "Husky + lint-staged",
    detail: "Pre-commit hooks run lint, format, and typecheck",
    href: "https://typicode.github.io/husky",
  },
  {
    name: "Geist Sans + Mono",
    detail: "Clean typography by Vercel",
    href: "https://vercel.com/font",
  },
  {
    name: "next-themes",
    detail: "Light/dark toggle with system preference support",
    href: "https://github.com/pacocoursey/next-themes",
  },
] satisfies ReadonlyArray<{ name: string; detail: string; href: string }>

const extras = [
  {
    flag: "--prisma",
    name: "Prisma",
    description:
      "Prisma 6 ORM with PostgreSQL, PrismaPg adapter, typed JSONB via prisma-json-types-generator, and a singleton client.",
    href: "https://www.prisma.io",
  },
  {
    flag: "--auth",
    name: "Better Auth",
    description:
      "Full authentication system with email/password, Google OAuth, forgot/reset password, route protection, and shadcn/ui forms. Requires --prisma.",
    href: "https://www.better-auth.com",
  },
  {
    flag: "--clerk",
    name: "Clerk",
    description:
      "Managed authentication with pre-built sign-in/sign-up components, route protection, and organization support. No database required.",
    href: "https://clerk.com",
  },
  {
    flag: "--github-workflows",
    name: "GitHub Workflows",
    description:
      "CI pipeline for GitHub Actions: lint, typecheck, build on every PR. Runs on Blacksmith for faster builds. Includes varlock scan for secret leak detection.",
    href: "https://github.com/features/actions",
  },
  {
    flag: "--vercel-deploy",
    name: "Vercel Deploy",
    description:
      "CD pipeline via Vercel CLI. Preview deploys on push to main, manual dispatch for production. Implies --github-workflows.",
    href: "https://vercel.com",
  },
] satisfies ReadonlyArray<{
  flag: string
  name: string
  description: string
  href: string
}>

const composabilityRules = [
  { rule: "--auth requires --prisma", reason: "Better Auth uses Prisma as its database adapter." },
  { rule: "--clerk works independently", reason: "Clerk manages users externally — no database required." },
  { rule: "--clerk and --auth are mutually exclusive", reason: "One auth provider per project." },
  { rule: "--vercel-deploy implies --github-workflows", reason: "CD builds on the CI pipeline." },
  { rule: "Everything else is independent", reason: "Mix and match freely." },
] satisfies ReadonlyArray<{ rule: string; reason: string }>

export default function FeaturesPage(): React.ReactNode {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Features</h1>
      <p className="mt-2 text-muted-foreground">
        Everything you get with ds-start, out of the box.
      </p>

      {/* Base Stack */}
      <section className="mt-12">
        <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Base Stack
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {baseStack.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-lg border p-4 transition-colors hover:bg-muted/50"
            >
              <p className="text-sm font-medium group-hover:text-foreground">
                {item.name}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.detail}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Extras */}
      <section className="mt-16">
        <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Extras
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Opt-in layers that compose on top of the base template.
        </p>
        <div className="mt-4 grid gap-4">
          {extras.map((extra) => (
            <Card key={extra.flag}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <a
                    href={extra.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium hover:underline"
                  >
                    {extra.name}
                  </a>
                  <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
                    {extra.flag}
                  </code>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {extra.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Composability */}
      <section className="mt-16">
        <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Composability
        </h2>
        <div className="mt-4 rounded-lg border divide-y">
          {composabilityRules.map((item) => (
            <div key={item.rule} className="px-4 py-4 sm:px-6">
              <p className="text-sm font-medium font-mono break-words">{item.rule}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.reason}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

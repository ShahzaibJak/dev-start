import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { toolLogos } from "@/lib/tool-logos"

export const metadata: Metadata = {
  title: "Features",
  description: "Foundation, modules, and agent workflows — everything in the ds-start app kit.",
}

const baseStack = [
  {
    name: "Next.js 16",
    detail: "App Router, Turbopack, React Server Components",
    href: "https://nextjs.org",
  },
  {
    name: "TypeScript",
    detail: "Strict mode, type-checked with tsgo (native compiler)",
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
    name: "nuqs",
    detail: "Type-safe URL state management for search params",
    href: "https://nuqs.47ng.com",
  },
  {
    name: "React Query",
    detail: "Server/async state management with caching and devtools",
    href: "https://tanstack.com/query",
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
    name: "Vitest",
    detail: "Fast unit testing with jsdom environment",
    href: "https://vitest.dev",
  },
  {
    name: "oxlint + oxfmt",
    detail: "Blazing-fast linting and formatting powered by Oxc",
    href: "https://oxc.rs",
  },
  {
    name: "Husky + lint-staged",
    detail: "Pre-commit hooks run lint, format, typecheck, and test",
    href: "https://typicode.github.io/husky",
  },
  {
    name: "commitlint + cz-git",
    detail: "Conventional commits enforced with interactive prompts",
    href: "https://commitlint.js.org",
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

const modules = [
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
    flag: "--stripe",
    name: "Stripe",
    description:
      "Billing and subscription management with Stripe. Includes webhook handling, customer portal, and plan management. Works with both Better Auth and Clerk. Requires --auth or --clerk.",
    href: "https://stripe.com",
  },
  {
    flag: "--email",
    name: "Email",
    description:
      "Transactional email with Resend for delivery and React Email for type-safe, previewable templates. Welcome emails, password resets, and invitations out of the box.",
    href: "https://resend.com",
  },
  {
    flag: "--file-uploads",
    name: "File Uploads",
    description:
      "S3-compatible file uploads with presigned URLs, upload helpers, and a ready-made FileUpload component. Works with AWS S3, Cloudflare R2, MinIO, and Backblaze B2.",
    href: "https://aws.amazon.com/s3",
  },
  {
    flag: "--zustand",
    name: "Zustand",
    description:
      "Lightweight client state management. Provider-free, TypeScript-first stores with Redux DevTools support via devtools middleware.",
    href: "https://zustand.docs.pmnd.rs",
  },
  {
    flag: "--forms",
    name: "Forms",
    description:
      "JSON-driven form renderer with classic, conversational, and multistep view modes. Define fields as a typed config, get validation and layout for free. Built on shadcn Form components (react-hook-form + zod). Overridable component map for custom field types.",
    href: "https://react-hook-form.com",
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
  { rule: "--stripe requires --auth or --clerk", reason: "Billing needs an auth provider to associate subscriptions with users." },
  { rule: "--vercel-deploy implies --github-workflows", reason: "CD builds on the CI pipeline." },
  { rule: "--forms + --file-uploads enables file field", reason: "The file field type uses the FileUpload component from the file-uploads module." },
  { rule: "Everything else is independent", reason: "--email, --file-uploads, --zustand, --forms, --prisma, and --github-workflows mix and match freely." },
] satisfies ReadonlyArray<{ rule: string; reason: string }>

export default function FeaturesPage(): React.ReactNode {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Features</h1>
      <p className="mt-2 text-muted-foreground">
        Foundation, modules, and agent workflows — everything in the app kit.
      </p>

      {/* Foundation */}
      <section className="mt-12">
        <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Foundation
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {baseStack.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50"
            >
              {toolLogos[item.name] ? (
                <img
                  src={toolLogos[item.name]}
                  alt=""
                  width={20}
                  height={20}
                  className="mt-0.5 shrink-0 rounded-sm dark:invert"
                />
              ) : null}
              <div>
                <p className="text-sm font-medium group-hover:text-foreground">
                  {item.name}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.detail}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Modules */}
      <section className="mt-16">
        <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Modules
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Pre-integrated app features that compose on top of the foundation. Include them at scaffold time with flags, or add them to an existing project later.
        </p>
        <div className="mt-4 rounded-lg border border-dashed bg-muted/30 px-4 py-3">
          <p className="text-sm font-medium">Add to an existing project</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Run{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">npx ds-start add email</code>{" "}
            from inside a supported Next.js project. Auto-merges package.json and config files, prompts only for real conflicts.
          </p>
        </div>
        <div className="mt-4 grid gap-4">
          {modules.map((module) => (
            <Card key={module.flag}>
              <CardContent className="flex items-start gap-4 p-6">
                {toolLogos[module.name] ? (
                  <img
                    src={toolLogos[module.name]}
                    alt=""
                    width={24}
                    height={24}
                    className="mt-0.5 shrink-0 rounded-sm dark:invert"
                  />
                ) : null}
                <div>
                  <div className="flex items-center gap-3">
                    <a
                      href={module.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium hover:underline"
                    >
                      {module.name}
                    </a>
                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
                      {module.flag}
                    </code>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {module.description}
                  </p>
                </div>
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

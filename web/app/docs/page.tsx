import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"

export const metadata: Metadata = {
  title: "Docs",
  description: "CLI usage documentation for ds-start.",
}

const flags = [
  {
    flag: "--prisma",
    description: "Add Prisma 6 ORM with PostgreSQL and typed JSONB.",
  },
  {
    flag: "--auth",
    description:
      "Add Better Auth with email/password, Google OAuth, and route protection. Requires --prisma.",
  },
  {
    flag: "--clerk",
    description:
      "Add Clerk managed authentication with pre-built components and route protection. No database required.",
  },
  {
    flag: "--stripe",
    description:
      "Add Stripe billing with subscription management, customer portal, and webhooks. Requires --auth or --clerk.",
  },
  {
    flag: "--email",
    description:
      "Add transactional email with Resend and React Email templates.",
  },
  {
    flag: "--file-uploads",
    description:
      "Add S3-compatible file uploads with presigned URLs. Works with AWS S3, Cloudflare R2, MinIO, Backblaze B2.",
  },
  {
    flag: "--zustand",
    description:
      "Add Zustand client state management with typed stores and devtools middleware.",
  },
  {
    flag: "--github-workflows",
    description:
      "Add GitHub Actions CI pipeline with lint, typecheck, build, and secret scanning.",
  },
  {
    flag: "--vercel-deploy",
    description:
      "Add Vercel CD pipeline with preview and production deploys. Implies --github-workflows.",
  },
  {
    flag: "-y, --yes",
    description: "Skip interactive prompts and use defaults (no extras).",
  },
] satisfies ReadonlyArray<{ flag: string; description: string }>

const examples = [
  { label: "Minimal", command: "npx ds-start my-app" },
  { label: "Full stack", command: "npx ds-start my-app --prisma --auth --stripe --email --github-workflows" },
  { label: "Clerk stack", command: "npx ds-start my-app --clerk --stripe --email --file-uploads" },
  { label: "API-focused", command: "npx ds-start my-app --prisma --github-workflows" },
  { label: "Everything", command: "npx ds-start my-app --prisma --auth --stripe --email --file-uploads --zustand --github-workflows --vercel-deploy" },
  { label: "Skip prompts", command: "npx ds-start my-app -y" },
  { label: "Add email to existing project", command: "npx ds-start add email" },
  { label: "Add file uploads to existing project", command: "npx ds-start add file-uploads" },
  { label: "Add Zustand to existing project", command: "npx ds-start add zustand" },
] satisfies ReadonlyArray<{ label: string; command: string }>

export default function DocsPage(): React.ReactNode {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Documentation</h1>
      <p className="mt-2 text-muted-foreground">
        CLI reference and usage guide for ds-start.
      </p>

      {/* Quick Start */}
      <section className="mt-12">
        <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Quick Start
        </h2>
        <div className="mt-4 space-y-3">
          <CodeBlock>npx ds-start my-app</CodeBlock>
          <p className="text-sm text-muted-foreground">
            This scaffolds a new Next.js project in the <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">my-app</code> directory
            with the full base stack. You&apos;ll be prompted to select optional extras.
          </p>
        </div>
      </section>

      {/* Installation */}
      <section className="mt-12">
        <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Installation
        </h2>
        <div className="mt-4 space-y-3">
          <p className="text-sm text-muted-foreground">
            No installation required. Run directly with npx:
          </p>
          <CodeBlock>npx ds-start my-app</CodeBlock>
          <p className="text-sm text-muted-foreground">
            Or install globally:
          </p>
          <CodeBlock>npm install -g ds-start</CodeBlock>
        </div>
      </section>

      {/* Command Reference */}
      <section className="mt-12">
        <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Command Reference
        </h2>
        <div className="mt-4 space-y-4">
          <div>
            <p className="mb-2 text-sm font-medium">Scaffold a new project</p>
            <CodeBlock copyable={false}>{`npx ds-start <project-name> [flags]`}</CodeBlock>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium">Add an extra to an existing project</p>
            <CodeBlock copyable={false}>{`npx ds-start add <extra>`}</CodeBlock>
            <p className="mt-2 text-sm text-muted-foreground">
              Run from inside an existing Next.js project to bolt on an independent extra.
              Detects conflicts, merges package.json / .gitignore / .env.schema automatically,
              and prompts for resolution on file-level conflicts. Dependencies are not auto-installed.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Available extras:{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">email</code>{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">file-uploads</code>{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">zustand</code>{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">github-workflows</code>{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">vercel-deploy</code>
            </p>
          </div>
        </div>
      </section>

      {/* Flags */}
      <section className="mt-12">
        <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Flags
        </h2>
        <div className="mt-4 rounded-lg border divide-y">
          {flags.map((item) => (
            <div
              key={item.flag}
              className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-baseline sm:gap-4"
            >
              <code className="shrink-0 font-mono text-sm font-medium">
                {item.flag}
              </code>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Examples */}
      <section className="mt-12">
        <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Examples
        </h2>
        <div className="mt-4 space-y-4">
          {examples.map((ex) => (
            <div key={ex.label}>
              <p className="mb-2 text-sm font-medium">{ex.label}</p>
              <CodeBlock>{ex.command}</CodeBlock>
            </div>
          ))}
        </div>
      </section>

      {/* After Scaffolding */}
      <section className="mt-12">
        <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          After Scaffolding
        </h2>
        <div className="mt-4 space-y-3">
          <CodeBlock>{`cd my-app
bun run env:check    # Validate environment
bun run dev          # Start dev server
bun run build        # Production build
bun run typecheck    # Verify types
bun run lint         # Lint code`}</CodeBlock>
        </div>
      </section>
    </div>
  )
}

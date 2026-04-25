import type { Metadata } from "next"
import { toolLogos } from "@/lib/tool-logos"

export const metadata: Metadata = {
  title: "Credits",
  description: "Tools and packages that power ds-start.",
}

interface PackageInfo {
  name: string
  description: string
  href: string
  category: string
}

const packages = [
  // Framework
  {
    name: "Next.js",
    description: "The React framework for the web. App Router with Turbopack.",
    href: "https://nextjs.org",
    category: "Framework",
  },
  {
    name: "React",
    description: "A JavaScript library for building user interfaces.",
    href: "https://react.dev",
    category: "Framework",
  },
  {
    name: "TypeScript",
    description: "Typed superset of JavaScript. Type-checked with tsgo (native TypeScript compiler).",
    href: "https://www.typescriptlang.org",
    category: "Framework",
  },

  // Styling
  {
    name: "Tailwind CSS",
    description: "A utility-first CSS framework for rapid UI development.",
    href: "https://tailwindcss.com",
    category: "Styling",
  },
  {
    name: "shadcn/ui",
    description: "Beautifully designed components built with Radix UI and Tailwind CSS.",
    href: "https://ui.shadcn.com",
    category: "Styling",
  },
  {
    name: "Radix UI",
    description: "Unstyled, accessible UI primitives for React.",
    href: "https://www.radix-ui.com",
    category: "Styling",
  },
  {
    name: "Lucide",
    description: "Beautiful and consistent open-source icons.",
    href: "https://lucide.dev",
    category: "Styling",
  },
  {
    name: "Geist",
    description: "A typeface family by Vercel for modern interfaces.",
    href: "https://vercel.com/font",
    category: "Styling",
  },
  {
    name: "next-themes",
    description: "Perfect Next.js dark mode with system preference support.",
    href: "https://github.com/pacocoursey/next-themes",
    category: "Styling",
  },

  // State Management
  {
    name: "nuqs",
    description: "Type-safe search params state manager for React. Like useState, but in the URL.",
    href: "https://nuqs.47ng.com",
    category: "State Management",
  },
  {
    name: "React Query",
    description: "Powerful asynchronous state management, caching, and data synchronization for React.",
    href: "https://tanstack.com/query",
    category: "State Management",
  },
  {
    name: "Zustand",
    description: "Small, fast, and scalable bearbones state management for React.",
    href: "https://zustand.docs.pmnd.rs",
    category: "State Management",
  },

  // Type Safety
  {
    name: "next-ts-api",
    description: "End-to-end type-safe API routes and client for Next.js.",
    href: "https://github.com/zahinafsar/next-ts-api",
    category: "Type Safety",
  },
  {
    name: "varlock",
    description: "Schema-driven env validation, type-safe access, and secret leak detection.",
    href: "https://varlock.dev",
    category: "Type Safety",
  },

  // Database & Auth
  {
    name: "Prisma",
    description: "Next-generation ORM for Node.js and TypeScript.",
    href: "https://www.prisma.io",
    category: "Database & Auth",
  },
  {
    name: "Better Auth",
    description: "Framework-agnostic TypeScript authentication library.",
    href: "https://www.better-auth.com",
    category: "Database & Auth",
  },
  {
    name: "Clerk",
    description: "Managed authentication with pre-built components and organization support.",
    href: "https://clerk.com",
    category: "Database & Auth",
  },

  // Billing & Email
  {
    name: "Stripe",
    description: "Payment processing and subscription billing for the internet.",
    href: "https://stripe.com",
    category: "Billing & Email",
  },
  {
    name: "Resend",
    description: "Email API built for developers. Simple, reliable delivery.",
    href: "https://resend.com",
    category: "Billing & Email",
  },
  {
    name: "React Email",
    description: "Build and preview email templates with React components.",
    href: "https://react.email",
    category: "Billing & Email",
  },

  // Dev Tooling
  {
    name: "oxlint",
    description: "Blazing-fast JavaScript/TypeScript linter written in Rust.",
    href: "https://oxc.rs/docs/guide/usage/linter",
    category: "Dev Tooling",
  },
  {
    name: "oxfmt",
    description: "High-performance code formatter written in Rust.",
    href: "https://oxc.rs/docs/guide/usage/formatter",
    category: "Dev Tooling",
  },
  {
    name: "Vitest",
    description: "Next-generation testing framework powered by Vite.",
    href: "https://vitest.dev",
    category: "Dev Tooling",
  },
  {
    name: "Husky",
    description: "Git hooks made easy. Runs lint-staged on every commit.",
    href: "https://typicode.github.io/husky",
    category: "Dev Tooling",
  },
  {
    name: "lint-staged",
    description: "Run linters on staged git files to catch issues before commit.",
    href: "https://github.com/lint-staged/lint-staged",
    category: "Dev Tooling",
  },
  {
    name: "commitlint",
    description: "Lint commit messages to enforce conventional commits.",
    href: "https://commitlint.js.org",
    category: "Dev Tooling",
  },
  {
    name: "cz-git",
    description: "Interactive commitizen adapter for conventional commit prompts.",
    href: "https://cz-git.qbb.sh",
    category: "Dev Tooling",
  },
  {
    name: "Changesets",
    description: "Manage versioning and changelogs for multi-package repositories.",
    href: "https://github.com/changesets/changesets",
    category: "Dev Tooling",
  },

  // CLI
  {
    name: "citty",
    description: "Elegant CLI builder for Node.js applications.",
    href: "https://github.com/unjs/citty",
    category: "CLI",
  },
  {
    name: "consola",
    description: "Beautiful console logger and interactive prompts.",
    href: "https://github.com/unjs/consola",
    category: "CLI",
  },
  {
    name: "fs-extra",
    description: "Extra methods for the Node.js fs module.",
    href: "https://github.com/jprichardson/node-fs-extra",
    category: "CLI",
  },
  {
    name: "tsup",
    description: "Bundle TypeScript libraries with zero config.",
    href: "https://tsup.egoist.dev",
    category: "CLI",
  },

  // CI/CD
  {
    name: "GitHub Actions",
    description: "Automate your workflow from idea to production.",
    href: "https://github.com/features/actions",
    category: "CI/CD",
  },
  {
    name: "Blacksmith",
    description: "Faster GitHub Actions runners with built-in caching.",
    href: "https://blacksmith.sh",
    category: "CI/CD",
  },
  {
    name: "Vercel",
    description: "Deploy frontend applications with zero configuration.",
    href: "https://vercel.com",
    category: "CI/CD",
  },
] satisfies ReadonlyArray<PackageInfo>

const categories = [...new Set(packages.map((p) => p.category))]

export default function CreditsPage(): React.ReactNode {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Credits</h1>
      <p className="mt-2 text-muted-foreground">
        ds-start is built on the shoulders of these excellent open-source tools
        and services.
      </p>

      {categories.map((category) => (
        <section key={category} className="mt-12">
          <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            {category}
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {packages
              .filter((p) => p.category === category)
              .map((pkg) => (
                <a
                  key={pkg.name}
                  href={pkg.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                >
                  {toolLogos[pkg.name] ? (
                    <img
                      src={toolLogos[pkg.name]}
                      alt=""
                      width={20}
                      height={20}
                      className="mt-0.5 shrink-0 rounded-sm dark:invert"
                    />
                  ) : null}
                  <div>
                    <p className="text-sm font-medium group-hover:text-foreground">
                      {pkg.name}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {pkg.description}
                    </p>
                  </div>
                </a>
              ))}
          </div>
        </section>
      ))}
    </div>
  )
}

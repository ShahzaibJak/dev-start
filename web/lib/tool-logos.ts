/**
 * Logo URLs for tools, services, and libraries used across the marketing site.
 *
 * Sources:
 * - Simple Icons CDN: https://cdn.simpleicons.org/{slug}
 * - GitHub org/user avatars for tools without a Simple Icons entry
 *
 * To update: change the URL here and it applies everywhere.
 */

const si = (slug: string): string => `https://cdn.simpleicons.org/${slug}`
const gh = (orgId: number): string =>
  `https://avatars.githubusercontent.com/u/${orgId}?s=64`

export const toolLogos: Record<string, string> = {
  // --- Simple Icons (brand SVGs) ---
  "Next.js": si("nextdotjs"),
  TypeScript: si("typescript"),
  "Tailwind CSS": si("tailwindcss"),
  "Tailwind CSS 4": si("tailwindcss"),
  React: si("react"),
  Prisma: si("prisma"),
  oxlint: gh(51567961), // oxc-project
  oxfmt: gh(51567961), // oxc-project
  "oxlint + oxfmt": gh(51567961), // oxc-project
  Vercel: si("vercel"),
  "Vercel Deploy": si("vercel"),
  "GitHub Actions": si("githubactions"),
  "GitHub Workflows": si("githubactions"),
  Clerk: si("clerk"),
  Stripe: si("stripe"),
  "Drizzle ORM": si("drizzle"),
  Turborepo: si("turborepo"),
  "shadcn/ui": si("shadcnui"),
  "Radix UI": si("radixui"),
  commitlint: si("commitlint"),
  Lucide: si("lucide"),
  Pusher: si("pusher"),
  "Next.js 16": si("nextdotjs"),
  "Node.js": si("nodedotjs"),
  Bun: si("bun"),

  // --- GitHub org/user avatars (for tools without Simple Icons) ---
  "Better Auth": gh(163827765),
  Husky: gh(5502029), // typicode
  "Husky + lint-staged": gh(5502029),
  "lint-staged": gh(142687600),
  tsup: gh(8784712), // egoist
  Blacksmith: gh(156274793), // useblacksmith
  Changesets: gh(51163350), // changesets org (note: GH API returned this as the changesets org)
  "Trigger.dev": gh(95297378),
  BullMQ: gh(29824808), // taskforcesh
  "React Email": gh(109384852), // resend
  PartyKit: gh(123780865),
  Ably: gh(1859245),
  "next-themes": gh(34928425), // pacocoursey
  "commitlint + cz-git": si("commitlint"),

  // --- Tools with no logo (use their project's GitHub avatar or org) ---
  citty: gh(80154025), // unjs
  consola: gh(80154025), // unjs
  "fs-extra": gh(80154025), // unjs fallback — generic Node icon
  "next-ts-api": si("nextdotjs"), // uses Next.js logo as contextual fallback
  varlock: si("dotenv"), // env-related, closest match

  // --- Roadmap items (mapped to closest brand) ---
  "Billing & Subscriptions": si("stripe"),
  "Monorepo Templates": si("turborepo"),
  "Email (Resend + React Email)": gh(109384852), // resend
  "Email Templates": gh(109384852), // resend (React Email)
  "File Uploads (S3-Compatible)": si("amazons3"),
  "Background Jobs": gh(95297378), // triggerdotdev
  "Real-time & WebSockets": si("pusher"),
  "Organizations & Multi-tenancy": si("clerk"),

  // --- Extras (feature page entries) ---
  Email: gh(109384852), // resend
  "File Uploads": si("amazons3"),
  Resend: gh(109384852),

  Vitest: si("vitest"),
  "cz-git": gh(106996107), // Zhengqbbb

  // --- State Management ---
  nuqs: gh(2675467), // 47ng (franky47)
  "React Query": gh(72518640), // TanStack
  Zustand: gh(45790596), // pmndrs


  // --- Fonts ---
  Geist: si("vercel"), // Vercel's font
  "Geist Sans + Mono": si("vercel"),
} satisfies Record<string, string>

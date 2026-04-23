# Launch Posts

## Final — Reddit (r/developersPak first, then r/nextjs etc. after bug fixes)

---

**Title:** I got tired of re-explaining my project to AI every session, so I built a starter that does it for me

I have been building a lot recently, specially with AI, but there's a big problem I run into with every new project.

Every new project: same TypeScript config, same linting, same env validation, same pre-commit hooks, same ci/cd, same auth and more, everytime. Hours of setup before writing a single feature.

And then every new AI session: "here's how the project works, here are the conventions, here's what not to do." Every. Single. Time.

So I built ds-start. One command:

```
npx ds-start my-app
```

You get an opinionated Next.js app where the dev tooling is already wired, the types already flow end-to-end from db->server->client, and your AI assistant already understands the codebase from the first prompt.

The key difference: the scaffolded project ships with all relevant AI Skills, opinionated PRD driven workflows (if you choose) — structured files that teach your AI the conventions, quality gates, and patterns. No more boiler plate setup, Your AI knows how to plan features, implement them, review code, and follow the correct shadcn/ui patterns — all before you type anything. Explore all features and future roadmap here: https://dev-start.shahzaibjak.com/

Still early, definitely has bugs. Would love feedback and contributions.

Site: https://dev-start.shahzaibjak.com/
GitHub: https://github.com/ShahzaibJak/dev-start

---

## Version 2 — Reddit (r/ClaudeAI, r/ChatGPTCoding, r/CursorAI)

AI-workflow focused. Same core message, lead with the AI angle.

---

**Title:** I got tired of re-explaining my project to AI every session, so I built a starter that does it for me

I have been building a lot recently, specially with AI, but there's a big problem I run into with every new project.

Every new project: same TypeScript config, same linting, same env validation, same pre-commit hooks, same ci/cd, same auth and more, everytime. Hours of setup before writing a single feature.

And then every new AI session: "here's how the project works, here are the conventions, here's what not to do." Every. Single. Time.

So I built ds-start. One command:

```
npx ds-start my-app
```

You get an opinionated Next.js app where the dev tooling is already wired, the types already flow end-to-end from db->server->client, and your AI assistant already understands the codebase from the first prompt.

The key difference: the scaffolded project ships with all relevant AI Skills, opinionated PRD driven workflows (if you choose) — structured files that teach your AI the conventions, quality gates, and patterns. No more boiler plate setup, Your AI knows how to plan features, implement them, review code, and follow the correct shadcn/ui patterns — all before you type anything.

Some of the built-in skills:
- `/start-prd` — interview-driven feature planning, generates a step-by-step implementation plan
- `/start-work` — picks up the plan, implements it with quality gates
- `/start-review` — runs lint, typecheck, tests + code review on your diff (read-only)
- `/shadcn` — correct shadcn/ui patterns (forms, composition, styling — not the generic stuff AI usually generates)
- `/vercel-react-best-practices` — 64 React/Next.js performance rules
- `/handoff` — saves session context so the next session picks up where you left off

Still early, definitely has bugs. Would love feedback — especially on what skills/workflows you'd want built in.

Site: https://dev-start.shahzaibjak.com/
GitHub: https://github.com/ShahzaibJak/dev-start

---

## Version 3 — X/Twitter thread

Concise, punchy. Same voice.

---

**Tweet 1:**
I have been building a lot recently, specially with AI, but there's a big problem I run into with every new project.

Same setup. Same boilerplate. Same "here's how the project works" to my AI every session.

So I built ds-start — one command, and your AI already knows how the project works.

`npx ds-start my-app`

https://dev-start.shahzaibjak.com/

**Tweet 2:**
The scaffolded app ships with built-in AI skills — structured files that teach your AI the conventions, quality gates, and patterns.

PRD-driven workflows, code review, correct shadcn/ui patterns, React perf rules — all before you type anything.

No more boilerplate setup. No more re-explaining.

**Tweet 3:**
Types flow end-to-end from db->server->client. Dev tooling is pre-wired. Optional --prisma and --better-auth flags, fully integrated.

Still early, definitely has bugs. Would love feedback and contributions.

GitHub: https://github.com/ShahzaibJak/dev-start

---

## Version 4 — Hacker News (Show HN)

Problem-first, no emojis, technical audience.

---

**Title:** Show HN: ds-start — Next.js starter with built-in AI coding skills

**Body:**
I have been building a lot with AI coding assistants and kept running into the same friction: every new project is hours of the same setup, and every new AI session starts with re-explaining how the project works.

ds-start is an opinionated Next.js scaffolder (`npx ds-start my-app`) where the dev tooling is already wired, types flow end-to-end from db to server to client, and the project ships with structured AI skill files that teach your assistant the conventions, quality gates, and patterns from the first prompt.

The scaffolded project includes PRD-driven workflows, code review skills, shadcn/ui best practices, and React performance rules — all as structured files the AI reads before you type anything.

Stack: Next.js App Router, TypeScript strict, Tailwind 4, shadcn/ui, next-ts-api (type-safe routes), varlock (env validation), conventional commits. Optional extras for Prisma and Better Auth via flags.

Still early, definitely has bugs. Feedback and contributions welcome.

Site: https://dev-start.shahzaibjak.com/
GitHub: https://github.com/ShahzaibJak/dev-start

---

## Where to share

| Platform | Version | Notes |
|---|---|---|
| r/developersPak | Final | Posted first, your community |
| r/nextjs | Final | After initial bug fixes + extras |
| r/reactjs | Final | Same post works |
| r/webdev | Final | Same post works |
| r/ClaudeAI | V2 | AI-workflow focused, lists skills |
| r/ChatGPTCoding | V2 | Same AI crowd |
| r/CursorAI | V2 | Skills work with Cursor too |
| X/Twitter | V3 thread | Tag @shadcn @nextjs @anthropic |
| Hacker News | V4 Show HN | Problem-first, no emojis |
| Dev.to / Hashnode | Final expanded | Longer write-up, good for SEO |
| Discord (Next.js, shadcn, Claude Code) | V2 shortened | Quick intro + link |

**Suggested rollout:** r/developersPak first (done), then r/nextjs + X after bug fixes, HN a day or two later.

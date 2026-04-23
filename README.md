<h1 align="center">Dev-Start</h1>

<p align="center">
  Next.js template reset in progress.<br />
  <em><code>nextjs/base</code>, the verified Prisma and Better Auth paths, the <code>ds-workflow</code> paths, the <code>dev-tooling</code> paths, and the new opt-in GitHub Actions paths are the supported scaffold contracts.</em>
</p>

<h2 id="status">Current Status</h2>

`devstart` can now scaffold `nextjs/base`, the verified Prisma and Better Auth paths, the `ds-workflow` paths, the `dev-tooling` paths, and the new opt-in GitHub Actions CI paths. Other templates and extras remain disabled until later rebuild phases.

```bash
$ bun run build
$ node cli/dist/index.js init my-app -y

Scaffolding nextjs/base into /path/to/my-app
Created my-app
```

<h2 id="table-of-contents">Table of Contents</h2>

- [The Stack](#the-stack)
- [Reset Plan](#reset-plan)
- [Getting Started](#getting-started)
- [Community](#community)
- [Contributors](#contributors)
- [License](#license)

<h2 id="the-stack">The Stack</h2>

Dev-Start is being reset around a simpler, stricter contract:

| Category | Tech |
|----------|------|
| CLI | `devstart` |
| Monorepo | Bun workspace |
| Build | `tsup` |
| CLI Framework | `citty` + `consola` |
| Current Goal | Rebuild the template catalog from real app baselines |

### Why the reset?

The existing template files were not good enough to keep shipping. This cleanup removes the fake baseline, keeps the CLI/package structure intact, and creates room to add templates back one by one with verification.

<h2 id="reset-plan">Reset Plan</h2>

The rebuild sequence is now:

1. Keep `nextjs/base` aligned with a real upstream baseline and verify it continuously.
2. Reintroduce overlays one by one after the base template is verified.
3. Only advertise features that are covered by scaffold verification.
4. Keep CI enforcing the supported scaffold contract as new overlays return.

<h2 id="getting-started">Getting Started</h2>

The repo currently ships these verified scaffold paths:

- `nextjs/base`
- `nextjs/base + dev-tooling`
- `nextjs/base + ds-workflow`
- `nextjs/base + ds-workflow + dev-tooling`
- `nextjs/base + github-workflows`
- `nextjs/base + prisma`
- `nextjs/base + prisma + dev-tooling`
- `nextjs/base + prisma + ds-workflow`
- `nextjs/base + prisma + ds-workflow + dev-tooling`
- `nextjs/base + prisma + better-auth`
- `nextjs/base + prisma + better-auth + dev-tooling`
- `nextjs/base + prisma + github-workflows`
- `nextjs/base + prisma + better-auth + github-workflows`
- `nextjs/base + ds-workflow + github-workflows`
- `nextjs/base + dev-tooling + github-workflows`

Useful commands during cleanup:

```bash
bun install
bun run lint
bun run typecheck
bun run build
bun run verify:nextjs-base
bun run verify:nextjs-better-auth-prisma
bun run verify:nextjs-better-auth-prisma-github-workflows
bun run verify:nextjs-dev-tooling
bun run verify:nextjs-dev-tooling-github-workflows
bun run verify:nextjs-github-workflows
bun run verify:nextjs-prisma
bun run verify:nextjs-prisma-github-workflows
bun run verify:nextjs-ds-workflow
bun run verify:nextjs-ds-workflow-github-workflows
bun run verify:nextjs-prisma-ds-workflow
node cli/dist/index.js init my-app --base
node cli/dist/index.js init my-app --prisma
node cli/dist/index.js init my-app --prisma --auth
node cli/dist/index.js init my-app --workflow
node cli/dist/index.js init my-app --github-workflows
node cli/dist/index.js init my-app --prisma --workflow
node cli/dist/index.js init my-app --prisma --github-workflows
```

`github-workflows` is intentionally a narrow CI-only starter. It does not imply release or deployment automation. Unsupported extras and additional templates remain intentionally unavailable until later phases. In particular, `better-auth` is only supported together with `prisma`, and `better-auth` still does not compose with `ds-workflow`.

<h2 id="community">Community</h2>

We'd love to hear from you! Community channels are coming soon — in the meantime, [open an issue][issues] or [start a discussion][discussions] on GitHub.

<h2 id="contributors">Contributors</h2>

We welcome contributions! Check out [CONTRIBUTING.md][contributing] to get started.

<a href="https://github.com/shahzaibjak/dev-start/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=shahzaibjak/dev-start" />
</a>

<h2 id="license">License</h2>

[MIT](LICENSE)

[issues]: https://github.com/shahzaibjak/dev-start/issues
[discussions]: https://github.com/shahzaibjak/dev-start/discussions
[contributing]: CONTRIBUTING.md

`nextjs/base` is restored from a real `shadcn` Next.js scaffold. Dev tooling (husky + lint-staged) is included in the base template.

Currently supported:

1. `base`
2. `base + extras/prisma`
3. `base + extras/prisma + extras/better-auth`
4. `base + extras/ds-workflow`
5. `base + extras/github-workflows`
6. `base + extras/github-workflows + extras/vercel-deploy`
7. `base + extras/prisma + extras/ds-workflow`
8. `base + extras/prisma + extras/github-workflows`
9. `base + extras/prisma + extras/github-workflows + extras/vercel-deploy`
10. `base + extras/prisma + extras/better-auth + extras/github-workflows`
11. `base + extras/prisma + extras/better-auth + extras/github-workflows + extras/vercel-deploy`
12. `base + extras/ds-workflow + extras/github-workflows`
13. `base + extras/ds-workflow + extras/github-workflows + extras/vercel-deploy`

Still pending:

1. auth without Prisma
2. `better-auth + prisma + ds-workflow`
3. overlay combinations beyond the verified paths

Do not expand the public scaffold contract until each supported path is verified in CI.

# Vercel Deploy

Adds a GitHub Actions CD workflow (`cd.yml`) that deploys your Next.js app to Vercel using the Vercel CLI.

## How deployments work

- **Push to main**: Automatically deploys a preview environment
- **Manual dispatch**: Go to Actions tab > CD > Run workflow > choose `preview` or `production`

Production deployments are manual-only to prevent accidental releases.

## Required setup

Add these to your GitHub repository settings:

### Secrets (Settings > Secrets and variables > Actions > Secrets)

| Name | Where to find it |
|------|-----------------|
| `VERCEL_TOKEN` | [Vercel dashboard](https://vercel.com/account/tokens) > Account Settings > Tokens |
| `VERCEL_ORG_ID` | [Vercel dashboard](https://vercel.com/dashboard) > Settings > General > Team ID |

### Variables (Settings > Secrets and variables > Actions > Variables)

| Name | Where to find it |
|------|-----------------|
| `VERCEL_PROJECT_ID` | [Vercel dashboard](https://vercel.com/dashboard) > Project > Settings > General > Project ID |

## Workflow details

The CD workflow uses the Vercel CLI build pipeline:

1. `vercel pull` — fetches project config and env vars
2. `vercel build` — builds locally (no Vercel remote build)
3. `vercel deploy --prebuilt` — uploads the pre-built output

This gives full control over the build process and avoids conflicts with Vercel's automatic GitHub integration.

Runs on Blacksmith (`blacksmith-4vcpu-ubuntu-2404`) for faster builds. Includes `varlock scan` to catch leaked secrets before deploy.

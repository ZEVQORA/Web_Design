# Deploying the website

The Next.js app is **not** at the repository root - it lives in `website/`.
That is the only thing about this deployment that is unusual, and it has to be
set in the Vercel project, not in a file.

## Vercel project settings

| Setting | Value |
| --- | --- |
| Root Directory | `website` |
| Framework Preset | Next.js (auto-detected) |
| Build Command | default (`next build`) |
| Install Command | default (`npm install`) |
| Node version | 20 or later |

`vercel.json` only pins the framework. Everything else is Vercel's native
Next.js behaviour on purpose - there are no rewrites, headers or custom builds
to go stale.

## Environment variables

See `.env.example`. There is exactly one, it is public, and the site is
designed to work correctly with it unset.

## Deploying a preview from the CLI

Run from `website/`, not from the repository root:

```bash
cd website
npx vercel --yes            # preview deployment, prints the URL
```

`npx vercel --prod` promotes to production. Do not run it until the design has
been signed off - a preview URL is enough to review.

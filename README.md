# ZEVQORA — Web Design

The canonical public website design for ZEVQORA.

This repository is **separate from the ZEVQORA product repository**. It has its
own git root and its own remote. Nothing here is imported by the product, and
nothing here should ever be committed into it.

```
design/
  references/     canonical brand source of truth (do not redraw from memory)
  shared/         brand rules and tokens shared with future design phases
  tools/          build-time asset pipeline + visual QA harness
  website/        the website application
  app_design/     reserved for the desktop-product design phase (not started)
```

## Repository boundary

The parent directory `D:\BeBe_Personal\Zevqora` is the ZEVQORA **product**
repository (`ZEVQORA/Zevqora.git`). This directory sits inside it on disk but is
a fully independent git repository.

Verify at any time:

```bash
git rev-parse --show-toplevel     # must end in /design
git remote -v                     # must be ZEVQORA/Web_Design.git
```

The parent repo is kept blind to this directory through its local
`.git/info/exclude` rather than its tracked `.gitignore`, so isolating this work
did not modify a single file the product repository tracks.

## Running the website

```bash
cd website
npm install
npm run dev          # http://localhost:3000
```

Checks that must pass before any commit:

```bash
npm run lint
npm run typecheck
npm run build
```

The development-only design lab lives at `/design-lab`. It renders every token,
type step, button state, status state and brand mark on one page for visual QA.
It is `noindex` and returns 404 in production.

## References are the source of truth

`references/brand-board.png` and `references/zev-turnaround.png` are canonical.
The Z mark, the wordmark, Zev, the palette and the logo geometry are **locked** —
they are never redesigned, re-drawn or approximated by hand.

The brand paths in `website/components/brand/marks.ts` are *machine-traced* from
the board by `tools/trace-mark.mjs`, not drawn from memory. Measured shape
fidelity against the source raster is 98.8% (mark) and 98.1% (wordmark) by
intersection-over-union, and the lockup proportions are measured from the
board's own application lockup rather than eyeballed.

To regenerate them, re-run the tools pipeline against the reference board.

## Visual QA

Code review alone does not catch a design problem. `tools/shoot.mjs` renders
routes at the project's target viewports and reports console and page errors:

```bash
cd tools
node shoot.mjs --full ./out /design-lab /
node shoot.mjs --vp=390x844 ./out /
```

## Integration seams

The website is built so a real backend can be connected later without
redesigning anything. Everything a backend will eventually own is isolated
behind typed adapters and configuration:

| Area | Seam |
| --- | --- |
| Product UI shown on the site | `components/product-preview/` |
| Auth | `lib/authClient` |
| Downloads | `config/download.ts` |
| Billing, plans, credits | `config/billing.ts`, `lib/billingClient` |

`app_design/` is reserved for the separate flagship desktop-product design
phase. The website must never depend on its internals.

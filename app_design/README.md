# app_design — reserved

This directory is the future destination for the **desktop-product design
phase**. It is intentionally empty.

Do not build it as part of the website work.

## Why it exists now

So the boundary is explicit. The website must never depend on anything inside
this directory. Any ZEVQORA product interface shown on the marketing site is
rendered by a replaceable component under
`website/components/product-preview/`, so that when real application UI exists
it can be dropped in without rebuilding the landing page.

## When this phase starts

The website's design system is the input, not a thing to be re-invented:

- brand geometry: `website/components/brand/marks.ts` (locked, machine-traced)
- tokens, type scale, radius, depth, motion: `website/styles/globals.css`
- brand rules: `shared/brand/`

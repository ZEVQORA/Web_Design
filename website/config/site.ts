export const site = {
  name: "ZEVQORA",
  /** The one-line description used for metadata and the hero sub-copy. */
  description:
    "ZEVQORA finds expensive AI work, tests cheaper ways to run it, and rejects changes that fail your verification gates.",
  tagline: "AI cost optimization engineer",
  url: "https://zevqora.com",
  /** The primary action, identical everywhere it appears. */
  primaryCta: { label: "Get ZEVQORA", href: "/signup?next=/download" },
  nav: [
    { label: "Product", href: "/#product" },
    { label: "How it works", href: "/#how-it-works" },
    { label: "Proof", href: "/#proof" },
    { label: "Pricing", href: "/pricing" },
  ],
} as const;

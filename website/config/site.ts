export const site = {
  name: "ZEVQORA",
  description:
    "ZEVQORA finds expensive AI work, tests cheaper ways to run it, and rejects changes that fail your verification gates.",
  tagline: "AI cost optimization engineer",
  url: "https://zevqora.com",
  /** The one primary action. Identical everywhere it appears. */
  primaryCta: { label: "Get ZEVQORA", href: "/signup?next=/download" },
  secondaryCta: { label: "See how verification works", href: "/#proof" },
  nav: [
    { label: "Product", href: "/#product" },
    { label: "How it works", href: "/#how-it-works" },
    { label: "Proof", href: "/#proof" },
    { label: "Pricing", href: "/pricing" },
  ],
  footer: {
    Product: [
      { label: "How it works", href: "/#how-it-works" },
      { label: "Proof", href: "/#proof" },
      { label: "Pricing", href: "/pricing" },
      { label: "Download", href: "/download" },
    ],
    Company: [
      { label: "Become a design partner", href: "/signup?next=/onboarding" },
      { label: "Contact", href: "mailto:hello@zevqora.com" },
    ],
    Legal: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
} as const;

/**
 * Commercial configuration.
 *
 * Pricing is NOT finalised, so this file publishes no invented figures. Every
 * plan is priced as "Talk to us" until a real number is set here, and the mode
 * below makes that state explicit rather than implied.
 *
 * When pricing is decided, set `mode: "live"` and give each plan a `price`.
 * Nothing in the components needs to change.
 */

export type PricingMode = "preview" | "live";

export interface Plan {
  id: string;
  name: string;
  /** Who the plan is for, in one line. */
  audience: string;
  /** Null until a real price exists. Components render "Talk to us". */
  price: string | null;
  cadence?: string;
  cta: { label: string; href: string };
  emphasis?: boolean;
  includes: string[];
}

/**
 * Declared as Plan[] rather than inferred: `as const` on the whole object
 * narrows each entry to only the keys it happens to have, so optional fields
 * like `cadence` stop existing on the type the moment no plan uses one.
 */
const plans: Plan[] = [
    {
      id: "starter",
      name: "Starter",
      audience: "One team, one workload, one workspace.",
      price: null,
      cta: { label: "Become a design partner", href: "/signup?next=/onboarding" },
      includes: [
        "One workspace",
        "Evidence connection",
        "Spend graph and diagnosis",
        "Replay against a frozen workload",
        "Verification gates",
      ],
    },
    {
      id: "team",
      name: "Team",
      audience: "Several workloads and a team reviewing changes together.",
      price: null,
      emphasis: true,
      cta: { label: "Become a design partner", href: "/signup?next=/onboarding" },
      includes: [
        "Multiple workspaces",
        "Team seats and roles",
        "Shared evidence and run history",
        "Verified change review",
        "Usage credits",
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      audience: "Custom gates, retention and security review.",
      price: null,
      cta: { label: "Talk to us", href: "mailto:hello@zevqora.com" },
      includes: [
        "Custom verification gates",
        "Evidence retention policy",
        "SSO and admin controls",
        "Security review",
        "Support agreement",
      ],
    },
];

export const billing = {
  mode: "preview" as PricingMode,
  note: "Pricing is not final. We are working with early design partners to set it against real workloads.",
  plans,
  /** Concepts the billing surface is built to carry once a backend exists. */
  concepts: ["Workspaces", "Team seats", "Usage credits", "Billing cadence"],
} as const;

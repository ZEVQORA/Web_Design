import Link from "next/link";
import { billing } from "@/config/billing";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

/**
 * Pricing structure without invented prices.
 *
 * `billing.mode` is "preview", so every plan renders "Talk to us" rather than a
 * placeholder figure dressed up as a decision. When real numbers exist they go
 * in config/billing.ts and nothing here changes.
 */
export function PricingSection({ heading = true }: { heading?: boolean }) {
  return (
    <div className="container-page">
      {heading && (
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="text-eyebrow text-muted uppercase">Pricing</p>
            <h2 className="text-h1 mt-6 max-w-[15ch]">
              Priced against real workloads.
            </h2>
          </div>
          <p className="text-body text-muted max-w-[46ch]">{billing.note}</p>
        </div>
      )}

      <div className="mt-14 grid gap-px border border-line bg-line lg:grid-cols-3">
        {billing.plans.map((plan) => (
          <div
            key={plan.id}
            className={cn(
              "bg-surface flex flex-col p-8 lg:p-10",
              plan.emphasis && "bg-canvas",
            )}
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-h3">{plan.name}</h3>
              {plan.emphasis && (
                <span className="text-technical font-mono text-accent uppercase">
                  most teams
                </span>
              )}
            </div>
            <p className="text-caption text-muted mt-3 min-h-[3em]">
              {plan.audience}
            </p>

            <p className="mt-8">
              {plan.price ? (
                <span className="text-h2 tabular-nums">{plan.price}</span>
              ) : (
                <span className="text-h3 text-muted">Talk to us</span>
              )}
              {plan.cadence && (
                <span className="text-caption text-subtle ml-2">
                  {plan.cadence}
                </span>
              )}
            </p>

            <ul className="mt-8 flex flex-1 flex-col gap-3 border-t border-line pt-7">
              {plan.includes.map((f) => (
                <li key={f} className="text-caption text-muted">
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-9">
              <ButtonLink
                href={plan.cta.href}
                variant={plan.emphasis ? "primary" : "secondary"}
                className="w-full"
              >
                {plan.cta.label}
              </ButtonLink>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
        <p className="text-technical font-mono text-subtle">
          Built to carry: {billing.concepts.join(" · ")}
        </p>
        <Link
          href="/pricing"
          className="text-caption text-muted hover:text-ink transition-control rounded-sm underline-offset-4 hover:underline"
        >
          Full pricing detail
        </Link>
      </div>
    </div>
  );
}

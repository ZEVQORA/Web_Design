import { AlertTriangle } from "lucide-react";
import {
  BENCHMARK_META,
  BENCHMARK_QUALIFIERS,
  REJECTED_CANDIDATE,
  VERIFIED_CANDIDATE,
  type BenchmarkCase,
} from "@/data/evidence";
import { StatusChip } from "@/components/ui/StatusChip";
import { Section, StepMark } from "./Section";

/**
 * The trust moment.
 *
 * The rejected candidate is given the same weight as the verified one - same
 * panel size, same number size - because the fact that ZEVQORA threw away the
 * bigger number is the product's whole argument. Leading with the win and
 * footnoting the rejection would invert the point.
 *
 * The qualifiers are set at readable size, not as legal microtype. The
 * confidence interval crosses zero and the benchmark predates the hardening
 * pass; both facts are part of the claim, so they are presented as such.
 */
function Panel({ c, headline }: { c: BenchmarkCase; headline: string }) {
  const rejected = c.status === "REJECTED";
  return (
    <div
      className={
        "border-t-2 pt-8 " + (rejected ? "border-t-rejected" : "border-t-verified")
      }
    >
      <div className="flex items-center justify-between gap-4">
        <StatusChip status={rejected ? "rejected" : "verified"} />
        <span className="text-technical font-mono text-subtle">{c.reason}</span>
      </div>

      <p className="text-technical font-mono text-muted mt-8 uppercase">
        {headline}
      </p>
      <p className="text-display mt-2 tabular-nums">{c.costReduction}</p>
      <p className="text-caption text-muted mt-2 max-w-[30ch]">
        lower raw measured inference cost
      </p>

      <dl className="mt-9 border-t border-line">
        {c.gates.map((g) => (
          <div
            key={g.label}
            className="flex items-baseline justify-between gap-4 border-b border-line py-3"
          >
            <dt className="text-caption text-muted">{g.label}</dt>
            <dd className="flex items-baseline gap-3">
              {g.floor && (
                <span className="text-technical font-mono text-subtle tabular-nums">
                  floor {g.floor}
                </span>
              )}
              <span
                className={
                  "text-technical font-mono tabular-nums " +
                  (g.status === "fail" ? "text-rejected" : "text-ink")
                }
              >
                {g.value}
              </span>
              <span
                className={
                  "text-technical font-mono uppercase " +
                  (g.status === "fail" ? "text-rejected" : "text-verified")
                }
              >
                {g.status}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function VerificationProof() {
  return (
    <Section id="proof" className="studio">
      <div className="container-page">
        <div className="flex items-baseline gap-6">
          <StepMark step={6} of={6} />
          <p className="text-eyebrow text-muted uppercase">Verification</p>
        </div>

        <h2 className="text-display mt-10 max-w-[14ch]">Cheaper isn&rsquo;t enough.</h2>
        <p className="text-body-lg text-muted mt-7 max-w-[52ch]">
          Two candidates from our own internal benchmark. The one that saved
          more money is the one we threw away.
        </p>

        <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-16">
          <Panel c={REJECTED_CANDIDATE} headline="Measured cost reduction" />
          <Panel c={VERIFIED_CANDIDATE} headline="Measured point estimate" />
        </div>

        <div className="mt-12 grid gap-8 border-t border-line pt-10 lg:grid-cols-[auto_1fr] lg:gap-12">
          <div className="flex items-start gap-3">
            <AlertTriangle
              size={18}
              className="text-warning mt-0.5 shrink-0"
              aria-hidden
            />
            <p className="text-eyebrow text-warning uppercase">
              Read this with the numbers
            </p>
          </div>
          <ul className="flex flex-col gap-4">
            {BENCHMARK_QUALIFIERS.map((q) => (
              <li key={q} className="text-body text-muted max-w-[76ch]">
                {q}
              </li>
            ))}
            <li className="text-technical font-mono text-subtle">
              {BENCHMARK_META.kind} · {BENCHMARK_META.cases} cases · 95% CI{" "}
              {BENCHMARK_META.confidenceInterval}
            </li>
          </ul>
        </div>
      </div>
    </Section>
  );
}

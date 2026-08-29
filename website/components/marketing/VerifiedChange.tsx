import { Check } from "lucide-react";
import { Section } from "./Section";

const READY = [
  "Evidence attached",
  "Replay complete",
  "Gates passed",
];

/**
 * What a verified result actually produces: something a person reviews.
 *
 * ZEVQORA does not merge or deploy anything. The deliberate end of the loop is
 * a reviewable change with its evidence attached, which is why the copy says
 * "ready for review" rather than claiming any integration it does not have.
 */
export function VerifiedChange() {
  return (
    <Section surface="sunken">
      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <p className="text-eyebrow text-muted uppercase">Verified change</p>
            <h2 className="text-h1 mt-6 max-w-[14ch]">Ship evidence, not hope.</h2>
            <p className="text-body-lg text-muted mt-7 max-w-[44ch]">
              A verified candidate becomes a change proposal with its evidence
              attached: the workload it was replayed against, the gates it
              passed, and the measurements behind them.
            </p>
            <p className="text-body text-muted mt-5 max-w-[44ch]">
              A person decides whether it ships. ZEVQORA does not merge to your
              repository and does not deploy to your environment.
            </p>
          </div>

          <div className="border-t border-line pt-8">
            <div className="flex items-baseline justify-between">
              <span className="text-caption text-ink">Candidate D</span>
              <span className="text-technical font-mono text-subtle">
                deterministic path
              </span>
            </div>

            <ul className="mt-7 flex flex-col gap-3">
              {READY.map((r) => (
                <li key={r} className="flex items-center gap-3">
                  <Check size={15} className="text-verified shrink-0" aria-hidden />
                  <span className="text-caption text-ink">{r}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap items-center gap-4 border-t border-line pt-6">
              <span className="text-technical font-mono text-accent uppercase">
                Ready for review
              </span>
              <span className="text-technical font-mono text-subtle">
                awaiting a human decision
              </span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

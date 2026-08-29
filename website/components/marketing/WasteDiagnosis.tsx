import { DIAGNOSES } from "@/data/product-demo";
import { StatusChip } from "@/components/ui/StatusChip";
import { Section, StepMark } from "./Section";

/**
 * Named waste, each with the observation and the evidence behind it.
 *
 * Written as a diagnosis rather than a feature: what was observed, what the
 * evidence is, and how confident the engine is. Not every workload has all of
 * these, and the copy says so rather than implying a universal checklist.
 */
export function WasteDiagnosis() {
  return (
    <Section>
      <div className="container-page">
        <div className="flex items-baseline gap-6">
          <StepMark step={3} of={6} />
          <p className="text-eyebrow text-muted uppercase">Waste diagnosis</p>
        </div>

        <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="text-h1 max-w-[18ch]">
            Name the waste, and show the evidence for it.
          </h2>
          <p className="text-body text-muted max-w-[42ch]">
            These are examples of what a diagnosis looks like. A real workload
            might show one of them, or none - ZEVQORA reports what the evidence
            supports rather than a checklist.
          </p>
        </div>

        <ul className="mt-14 border-t border-line">
          {DIAGNOSES.map((d) => (
            <li
              key={d.id}
              className="grid gap-x-10 gap-y-4 border-b border-line py-8 lg:grid-cols-[1fr_1.3fr_auto] lg:items-start"
            >
              <div>
                <h3 className="text-h3 text-ink">{d.title}</h3>
                <span className="text-technical font-mono text-subtle mt-2 block tabular-nums">
                  {d.share} of task spend
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <p className="grid grid-cols-[6rem_1fr] gap-3">
                  <span className="text-technical font-mono text-subtle uppercase">
                    Observed
                  </span>
                  <span className="text-caption text-ink">{d.observed}</span>
                </p>
                <p className="grid grid-cols-[6rem_1fr] gap-3">
                  <span className="text-technical font-mono text-subtle uppercase">
                    Evidence
                  </span>
                  <span className="text-technical font-mono text-muted">
                    {d.evidence}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-3 lg:justify-end">
                <span className="text-technical font-mono text-subtle uppercase">
                  {d.confidence} confidence
                </span>
                <StatusChip status="diagnosed" />
              </div>
            </li>
          ))}
        </ul>

        <p className="text-technical font-mono text-subtle mt-4">
          Illustrative diagnoses. Not measured results.
        </p>
      </div>
    </Section>
  );
}

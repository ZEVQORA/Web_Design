import { CANDIDATES } from "@/data/product-demo";
import { StatusChip } from "@/components/ui/StatusChip";
import { Section, StepMark } from "./Section";

const FIELDS = [
  { key: "hypothesis", label: "Hypothesis" },
  { key: "mechanism", label: "Mechanism" },
  { key: "risk", label: "Risk" },
  { key: "rollback", label: "Rollback" },
] as const;

/**
 * Candidates, stated as experiments.
 *
 * Every candidate carries a hypothesis, the mechanism it would use, the risk it
 * introduces and how it is undone. There is no button that promises a saving -
 * a candidate is a proposal that still has to survive replay and the gates.
 */
export function Experiment() {
  return (
    <Section>
      <div className="container-page">
        <div className="flex items-baseline gap-6">
          <StepMark step={4} of={6} />
          <p className="text-eyebrow text-muted uppercase">Experiment</p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <h2 className="text-h1 max-w-[16ch]">
            A candidate is a hypothesis, not a promise.
          </h2>
          <p className="text-body text-muted max-w-[46ch]">
            ZEVQORA proposes a cheaper way to do the same work and states, up
            front, what it expects to happen, what could go wrong and how the
            change is reversed.
          </p>
        </div>

        <div className="mt-12 flex flex-col">
          {CANDIDATES.map((c, i) => (
            <article
              key={c.id}
              className="bg-raised border-line mt-4 rounded-lg border p-7 shadow-[0_1px_2px_rgb(15_17_21/0.04),0_12px_32px_-20px_rgb(15_17_21/0.14)] lg:p-8"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <div className="flex items-baseline gap-5">
                  <span className="text-technical font-mono text-subtle tabular-nums">
                    C{i + 1}
                  </span>
                  <h3 className="text-h2">{c.name}</h3>
                </div>
                <StatusChip status={c.state} />
              </div>

              <dl className="mt-7 grid gap-x-10 gap-y-6 sm:grid-cols-2 xl:grid-cols-4">
                {FIELDS.map((f) => (
                  <div key={f.key}>
                    <dt className="text-technical font-mono text-subtle uppercase">
                      {f.label}
                    </dt>
                    <dd className="text-caption text-ink mt-2">{c[f.key]}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>

        <p className="text-technical font-mono text-subtle mt-4">
          Illustrative candidates. Not measured results.
        </p>
      </div>
    </Section>
  );
}

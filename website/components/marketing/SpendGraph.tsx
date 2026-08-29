import { SPEND_NODES } from "@/data/product-demo";
import { Section, StepMark } from "./Section";

/**
 * Spend mapped onto the work that caused it.
 *
 * Deliberately not a time series. A line of daily spend tells you that money
 * left; it does not tell you which unit of work took it. This is a weighted
 * tree - one request fanning into the tasks it triggers - so the expensive
 * path is a structural fact rather than a spike to interpret.
 */
const KIND_LABEL: Record<string, string> = {
  request: "request",
  task: "task",
  model: "model",
  retrieval: "retrieval",
  repeated: "repeated",
};

export function SpendGraph() {
  const root = SPEND_NODES[0]!;
  const children = SPEND_NODES.slice(1);
  const max = Math.max(...children.map((c) => c.share));

  return (
    <Section id="product" surface="sunken">
      <div className="container-page">
        <div className="flex items-baseline gap-6">
          <StepMark step={2} of={6} />
          <p className="text-eyebrow text-muted uppercase">Spend graph</p>
        </div>

        <div className="mt-10 grid gap-14 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
          <div>
            <h2 className="text-h1 max-w-[15ch]">Spend belongs to work, not to a day.</h2>
            <p className="text-body-lg text-muted mt-7 max-w-[44ch]">
              ZEVQORA attributes cost to the unit of work that caused it, then
              shows how one request fans out into the tasks, retrievals and
              model calls underneath it.
            </p>
            <p className="text-body text-muted mt-5 max-w-[44ch]">
              That is what makes the difference between a workload that is
              expensive because it is valuable and one that is expensive because
              the same bounded answer is being generated over and over.
            </p>
          </div>

          <div>
            <div className="flex items-baseline justify-between border-b border-line pb-3">
              <span className="text-caption text-ink">{root.label}</span>
              <span className="text-technical font-mono text-subtle">
                {KIND_LABEL[root.kind]} · 100% of task spend
              </span>
            </div>

            <ul className="relative">
              {/* The spine that makes this a tree rather than a list. */}
              <span
                aria-hidden
                className="bg-line absolute left-3 top-0 bottom-8 w-px"
              />
              {children.map((c) => {
                const repeated = Boolean(c.note);
                return (
                  <li key={c.id} className="relative py-5 pl-10">
                    <span
                      aria-hidden
                      className="bg-line absolute left-3 top-9 h-px w-5"
                    />
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <span className="text-h3 text-ink">{c.label}</span>
                      <span className="text-technical font-mono text-ink tabular-nums">
                        {c.share}%
                      </span>
                    </div>

                    <div className="bg-line/70 mt-3 h-1.5 w-full overflow-hidden rounded-sm">
                      <div
                        className={repeated ? "bg-accent h-full" : "bg-line-strong h-full"}
                        style={{ width: (c.share / max) * 100 + "%" }}
                      />
                    </div>

                    <div className="mt-2 flex flex-wrap items-baseline gap-x-4">
                      <span className="text-technical font-mono text-subtle">
                        {KIND_LABEL[c.kind]}
                      </span>
                      {c.note && (
                        <span className="text-technical font-mono text-accent">
                          {c.note}
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>

            <p className="text-technical font-mono text-subtle mt-2">
              Illustrative workload. Not measured results.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

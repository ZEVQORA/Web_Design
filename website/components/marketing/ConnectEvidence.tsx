import { Section, StepMark } from "./Section";

/**
 * The first movement of the argument: ZEVQORA works from what actually ran.
 *
 * Rendered as a flow from the application into the engine rather than as a
 * grid of connector logos - the point is the shape of the evidence, not a wall
 * of vendor marks.
 */
const SIGNALS = [
  { k: "application", v: "service, route, deploy" },
  { k: "model call", v: "provider, model, params" },
  { k: "runtime trace", v: "parent work, retries, tools" },
  { k: "work identity", v: "task name, input shape" },
  { k: "measurement", v: "tokens, cost, latency" },
];

export function ConnectEvidence() {
  return (
    <Section id="how-it-works">
      <div className="container-page">
        <div className="flex items-baseline gap-6">
          <StepMark step={1} of={6} />
          <p className="text-eyebrow text-muted uppercase">Connect evidence</p>
        </div>

        <div className="mt-10 grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <h2 className="text-h1 max-w-[16ch]">Start with what actually happened.</h2>
            <p className="text-body-lg text-muted mt-7 max-w-[46ch]">
              ZEVQORA does not guess at your architecture or read your source and
              speculate. It reads the record of real execution: which model ran,
              for which unit of work, at what cost, how often.
            </p>
            <p className="text-body text-muted mt-5 max-w-[46ch]">
              Everything downstream - the graph, the diagnosis, the candidates,
              the verdict - is derived from that record, which is why every
              conclusion can be traced back to the evidence that produced it.
            </p>
          </div>

          <div>
            <ul className="border-t border-line">
              {SIGNALS.map((s, i) => (
                <li
                  key={s.k}
                  className="grid grid-cols-[2.5rem_10rem_1fr] items-baseline gap-4 border-b border-line py-4"
                >
                  <span className="text-technical font-mono text-subtle tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-caption text-ink">{s.k}</span>
                  <span className="text-technical font-mono text-muted">{s.v}</span>
                </li>
              ))}
            </ul>
            <p className="text-technical font-mono text-subtle mt-4">
              Evidence shape. Illustrative field names.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

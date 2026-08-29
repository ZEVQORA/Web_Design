import { REPLAY } from "@/data/product-demo";
import { Section, StepMark } from "./Section";

/**
 * Baseline against candidate, on the same frozen workload.
 *
 * The comparison is the argument: a cheaper number is meaningless unless it was
 * produced by the same work. The quality row deliberately shows the candidate
 * slightly behind the baseline - a real replay is a trade, not a clean sweep.
 */
export function ReplayEval() {
  return (
    <Section surface="ink" rule={false}>
      <div className="container-page">
        <div className="flex items-baseline gap-6">
          <StepMark step={5} of={6} />
          <p className="text-eyebrow text-muted uppercase">Replay and eval</p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <h2 className="text-h1 max-w-[18ch]">
            Cheaper is only useful if it survives the same workload.
          </h2>
          <p className="text-body text-muted max-w-[46ch]">
            The candidate is replayed against a frozen sample of real work -
            the same cases, in the same order, measured the same way as the
            baseline.
          </p>
        </div>

        <div className="mt-14 overflow-x-auto">
          <table className="w-full min-w-[42rem] border-collapse">
            <caption className="sr-only">
              Baseline compared with candidate over a frozen workload
            </caption>
            <thead>
              <tr className="border-b border-line">
                <th className="text-technical font-mono text-subtle py-3 text-left font-medium uppercase">
                  Measure
                </th>
                <th className="text-technical font-mono text-subtle py-3 text-right font-medium uppercase">
                  Baseline
                </th>
                <th className="text-technical font-mono text-subtle py-3 text-right font-medium uppercase">
                  Candidate
                </th>
              </tr>
            </thead>
            <tbody>
              {REPLAY.rows.map((r) => (
                <tr key={r.label} className="border-b border-line">
                  <td className="text-caption text-ink py-4">{r.label}</td>
                  <td className="text-technical font-mono text-muted py-4 text-right tabular-nums">
                    {r.baseline}
                  </td>
                  <td className="text-technical font-mono text-ink py-4 text-right tabular-nums">
                    {r.candidate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-technical font-mono text-subtle mt-5">
          {REPLAY.workload} · {REPLAY.cases} cases · illustrative values
        </p>
      </div>
    </Section>
  );
}

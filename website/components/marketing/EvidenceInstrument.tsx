import { HERO_LEDGER } from "@/data/product-demo";
import { cn } from "@/lib/cn";

/**
 * The execution instrument.
 *
 * The product's real input - observed AI work - presented as a precision
 * instrument rather than a dashboard card: a raised plane with a lit top edge,
 * a machined header rail, monospaced columns that hold their grid, and a
 * single accented row where the diagnosis lands.
 *
 * State is a small dot plus a word, never a large coloured pill, so the surface
 * stays quiet and the one row that matters is the only thing that reads loud.
 *
 * Entirely server-rendered; the stagger is a CSS animation over markup that is
 * already there.
 */
const STATE_STYLE: Record<string, { dot: string; label: string; text: string }> = {
  observed: { dot: "bg-subtle", label: "Observed", text: "text-subtle" },
  diagnosed: { dot: "bg-accent", label: "Diagnosed", text: "text-accent-text" },
  experimental: { dot: "bg-accent", label: "Candidate", text: "text-accent-text" },
  verifying: { dot: "bg-accent", label: "Verifying", text: "text-accent-text" },
};

export function EvidenceInstrument({ className }: { className?: string }) {
  return (
    <div
      className={cn("plane-instrument rounded-lg", className)}
      role="img"
      aria-label="Example of observed AI work: routine calls, a repeated expensive call singled out, a candidate, and verification"
    >
      {/* Header rail. The workspace meta is dropped on narrow screens rather
          than allowed to wrap the rail into two ragged lines. */}
      <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3.5 sm:px-5">
        <span className="text-eyebrow text-subtle uppercase">
          Observed execution
        </span>
        <span className="text-technical font-mono text-subtle hidden sm:inline">
          support.thread &middot; last 7 days
        </span>
      </div>

      {/* Column headings, so the columns read as measurements not decoration.
          Hidden on narrow screens, where the rows carry their own labels. */}
      <div className="hidden border-b border-line px-5 py-2 sm:grid sm:grid-cols-[5.5rem_1fr_5rem_5rem_6rem] sm:items-center sm:gap-x-4">
        <span className="text-technical font-mono text-subtle uppercase">Req</span>
        <span className="text-technical font-mono text-subtle uppercase">Work</span>
        <span className="text-technical font-mono text-subtle text-right uppercase">Cost</span>
        <span className="text-technical font-mono text-subtle text-right uppercase">Latency</span>
        <span className="text-technical font-mono text-subtle pl-4 uppercase">State</span>
      </div>

      <div className="px-2 py-1.5">
        {HERO_LEDGER.map((row, i) => {
          const s = STATE_STYLE[row.state] ?? STATE_STYLE.observed!;
          return (
            <div
              key={row.id}
              className={cn(
                "relative grid grid-cols-[1fr_auto] items-center gap-x-4 rounded-md px-3 py-2.5",
                "sm:grid-cols-[5.5rem_1fr_5rem_5rem_6rem]",
                row.focus && "bg-accent-subtle/70",
              )}
              style={{
                animation: `zq-row-in 460ms cubic-bezier(0.2,0,0,1) ${120 + i * 95}ms both`,
              }}
            >
              {row.focus && (
                <span
                  aria-hidden
                  className="bg-accent absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-full"
                />
              )}

              {/* The request id is the first thing to go when width is scarce -
                  it identifies a row, it does not carry the story. */}
              <span className="text-technical font-mono text-subtle hidden tabular-nums sm:block">
                {row.id}
              </span>

              <span className="min-w-0">
                <span className="text-caption text-ink block truncate leading-tight">
                  {row.work}
                </span>
                <span className="text-technical font-mono text-subtle block truncate">
                  {row.model}
                </span>
              </span>

              {/* Narrow screens keep cost, latency and state - they are the
                  point of the row - stacked instead of columned. */}
              <span className="flex flex-col items-end gap-0.5 sm:contents">
                <span className="text-technical font-mono text-ink text-right tabular-nums sm:block">
                  {row.cost}
                </span>
                <span className="text-technical font-mono text-muted text-right tabular-nums sm:block">
                  {row.latency}
                </span>
                <span className="flex items-center gap-1.5 sm:justify-start sm:pl-4">
                  <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", s.dot)} />
                  <span className={cn("text-technical font-mono", s.text)}>
                    {s.label}
                  </span>
                </span>
              </span>
            </div>
          );
        })}
      </div>

      {/* Right-aligned so the figure standing at the instrument's lower-left
          corner can never cover the qualifier. */}
      <div className="border-t border-line px-5 py-3 text-right">
        <p className="text-technical font-mono text-subtle">
          Illustrative values. Not measured results.
        </p>
      </div>
    </div>
  );
}

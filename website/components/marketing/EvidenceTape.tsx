import { HERO_LEDGER } from "@/data/product-demo";
import { StatusChip } from "@/components/ui/StatusChip";
import { cn } from "@/lib/cn";

/**
 * The hero's evidence tape.
 *
 * This is the product's actual input - observed AI work - used as the hero's
 * structural element rather than as an illustration of it. It is deliberately
 * not a card: no outer border, no shadow, no rounded container, and it runs off
 * the top and bottom of the composition so it reads as a continuing stream the
 * page has been cut into, not a dashboard pasted beside the copy.
 *
 * The entrance is pure CSS, and that is the point. An earlier version gated
 * each row's opacity on a JavaScript timer, which meant the entire right half
 * of the hero was blank until the client bundle ran - the rows were literally
 * missing from the first render. Now the markup is server-rendered and visible,
 * the stagger is an animation over it, and the global reduced-motion rule
 * collapses the whole thing to "already there".
 */
/** Rows dropped below sm - duplicates of an observation already shown. */
const COMPACT_HIDDEN = new Set([1, 4]);

export function EvidenceTape({ className }: { className?: string }) {
  return (
    <div
      className={cn("relative", className)}
      aria-label="Example of observed AI work: routine calls, a repeated expensive call, a candidate, and verification"
      role="img"
    >
      <div
        className="flex flex-col"
        style={{
          // Fades the stream off at both ends so it never reads as a panel.
          maskImage:
            "linear-gradient(to bottom, transparent, #000 9%, #000 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, #000 9%, #000 88%, transparent)",
        }}
      >
        {HERO_LEDGER.map((row, i) => (
          <div
            key={row.id}
            className={cn(
              "grid-cols-[auto_1fr_auto] items-center gap-x-4 border-b border-line py-3.5",
              // The sequence still reads with fewer rows, so the duplicate
              // observations are dropped on small screens rather than making
              // the reader scroll through the same fact twice.
              COMPACT_HIDDEN.has(i) ? "hidden sm:grid" : "grid",
              row.focus &&
                "border-l-2 border-l-accent bg-accent-subtle/50 -ml-3 pl-3",
            )}
            style={{
              animation: `zq-row-in 420ms cubic-bezier(0.2,0,0,1) ${140 + i * 110}ms both`,
            }}
          >
            <span className="text-technical font-mono text-subtle tabular-nums">
              {row.id}
            </span>

            <span className="min-w-0">
              <span className="text-caption text-ink block truncate">
                {row.work}
              </span>
              <span className="text-technical font-mono text-subtle block truncate">
                {row.model}
              </span>
            </span>

            <span className="flex items-center gap-3">
              <span className="text-right">
                <span className="text-technical font-mono text-ink block tabular-nums">
                  {row.cost}
                </span>
                <span className="text-technical font-mono text-subtle block tabular-nums">
                  {row.latency}
                </span>
              </span>
              <StatusChip
                status={row.state}
                className="hidden min-[1180px]:inline-flex"
              />
            </span>
          </div>
        ))}
      </div>

      <p className="text-technical font-mono text-subtle mt-4">
        Illustrative values. Not measured results.
      </p>
    </div>
  );
}

import { ZevqoraMark } from "@/components/brand/ZevqoraMark";
import { DEMO_WORKSPACE, DIAGNOSES, SPEND_NODES } from "@/data/product-demo";
import { cn } from "@/lib/cn";

/**
 * The ZEVQORA desktop product, as shown on the marketing site.
 *
 * This is the single replaceable seam for real application UI: when app_design
 * exists, this component is swapped and nothing around it changes.
 *
 * Everything is sized in container-query units, so the whole interface scales
 * with whatever it is placed inside - the MacBook screen on desktop, a plain
 * framed surface on mobile - staying crisp and readable without a scale factor
 * measured in JavaScript.
 *
 * All values come from data/product-demo.ts and are labelled as demo data.
 */
export function ProductPreview({ className }: { className?: string }) {
  const spend = SPEND_NODES.slice(1);
  const max = Math.max(...spend.map((s) => s.share));

  return (
    <div
      className={cn("bg-canvas text-ink flex h-full w-full", className)}
      style={{ containerType: "inline-size" }}
      aria-hidden
    >
      {/* Sidebar */}
      <aside className="border-line flex h-full w-[21cqw] shrink-0 flex-col border-r">
        <div className="flex items-center gap-[1cqw] px-[1.6cqw] py-[1.5cqw]">
          <ZevqoraMark height={16} style={{ height: "2cqw", width: "auto" }} />
          <span className="text-[1.35cqw] font-semibold tracking-tight">
            {DEMO_WORKSPACE.name}
          </span>
        </div>
        <nav className="flex flex-col gap-[0.15cqw] px-[0.8cqw]">
          {DEMO_WORKSPACE.nav.map((item, i) => (
            <span
              key={item}
              className={cn(
                "rounded-[0.5cqw] px-[0.8cqw] py-[0.62cqw] text-[1.22cqw]",
                i === 0 ? "bg-accent-subtle text-accent font-medium" : "text-muted",
              )}
            >
              {item}
            </span>
          ))}
        </nav>
        <div className="mt-auto px-[1.6cqw] py-[1.4cqw]">
          <span className="text-subtle font-mono text-[1.05cqw]">
            {DEMO_WORKSPACE.environment}
          </span>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-line flex items-center justify-between border-b px-[2cqw] py-[1.4cqw]">
          <span className="text-[1.5cqw] font-semibold tracking-tight">Overview</span>
          <span className="border-line text-muted rounded-[0.5cqw] border px-[0.9cqw] py-[0.4cqw] font-mono text-[1.05cqw]">
            {DEMO_WORKSPACE.window}
          </span>
        </header>

        <div className="flex-1 overflow-hidden px-[2cqw] py-[1.6cqw]">
          {/* Stat row */}
          <div className="grid grid-cols-4 gap-[1.2cqw]">
            {DEMO_WORKSPACE.stats.map((s) => (
              <div key={s.label} className="border-line border-t pt-[0.9cqw]">
                <div className="text-subtle text-[1.02cqw] uppercase tracking-wide">
                  {s.label}
                </div>
                <div className="mt-[0.5cqw] font-mono text-[2.3cqw] tabular-nums">
                  {s.value}
                  {s.unit && (
                    <span className="text-subtle ml-[0.3cqw] text-[1.1cqw]">{s.unit}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-[2cqw] grid grid-cols-[1.25fr_1fr] gap-[2cqw]">
            {/* Spend graph */}
            <section>
              <h3 className="text-[1.25cqw] font-semibold">Spend graph</h3>
              <ul className="mt-[1cqw]">
                {spend.map((s) => (
                  <li key={s.id} className="border-line border-b py-[0.72cqw]">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[1.15cqw]">{s.label}</span>
                      <span className="font-mono text-[1.1cqw] tabular-nums">
                        {s.share}%
                      </span>
                    </div>
                    <div className="bg-line/70 mt-[0.45cqw] h-[0.5cqw] w-full overflow-hidden rounded-[0.25cqw]">
                      <div
                        className={s.note ? "bg-accent h-full" : "bg-line-strong h-full"}
                        style={{ width: (s.share / max) * 100 + "%" }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Diagnosis + verification */}
            <section className="flex flex-col">
              <h3 className="text-[1.25cqw] font-semibold">Open diagnoses</h3>
              <ul className="mt-[1cqw] flex flex-col gap-[0.7cqw]">
                {DIAGNOSES.map((d) => (
                  <li key={d.id} className="border-line border-l-[0.22cqw] border-l-accent pl-[0.9cqw]">
                    <div className="text-[1.15cqw]">{d.title}</div>
                    <div className="text-subtle font-mono text-[1.02cqw]">
                      {d.share} of task spend
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-line mt-[1.5cqw] border-t pt-[1cqw]">
                <div className="flex items-center justify-between">
                  <span className="text-[1.15cqw]">Candidate D</span>
                  <span className="bg-verified-bg text-verified rounded-[0.4cqw] px-[0.7cqw] py-[0.3cqw] font-mono text-[1cqw]">
                    VERIFIED
                  </span>
                </div>
                <div className="text-subtle mt-[0.5cqw] font-mono text-[1.02cqw]">
                  all configured gates passed · awaiting review
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

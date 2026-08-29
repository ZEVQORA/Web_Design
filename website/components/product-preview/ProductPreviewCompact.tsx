import { ZevqoraMark } from "@/components/brand/ZevqoraMark";
import { StatusChip } from "@/components/ui/StatusChip";
import { DEMO_WORKSPACE, DIAGNOSES, SPEND_NODES } from "@/data/product-demo";

/**
 * The product surface for small screens.
 *
 * Not the desktop interface scaled down. At 390px the full layout renders its
 * type at roughly five pixels - a picture of an interface rather than an
 * interface - so this shows the same information in the same order at a size a
 * person can actually read: the workspace, what was observed, where the spend
 * went, what was diagnosed, and the standing verdict.
 */
export function ProductPreviewCompact() {
  const spend = SPEND_NODES.slice(1);
  const max = Math.max(...spend.map((s) => s.share));

  return (
    <div className="bg-surface">
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <span className="flex items-center gap-2.5">
          <ZevqoraMark height={18} />
          <span className="text-caption text-ink font-semibold">
            {DEMO_WORKSPACE.name}
          </span>
        </span>
        <span className="text-technical font-mono text-subtle">
          {DEMO_WORKSPACE.window}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-px bg-line">
        {DEMO_WORKSPACE.stats.map((s) => (
          <div key={s.label} className="bg-surface px-5 py-4">
            <div className="text-technical font-mono text-subtle uppercase">
              {s.label}
            </div>
            <div className="text-h3 mt-1 font-mono tabular-nums">
              {s.value}
              {s.unit && (
                <span className="text-caption text-subtle ml-1">{s.unit}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-line px-5 py-5">
        <h3 className="text-caption text-ink font-semibold">Spend graph</h3>
        <ul className="mt-3">
          {spend.map((s) => (
            <li key={s.id} className="border-b border-line py-2.5 last:border-b-0">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-caption text-ink">{s.label}</span>
                <span className="text-technical font-mono text-muted tabular-nums">
                  {s.share}%
                </span>
              </div>
              <div className="bg-line/70 mt-2 h-1.5 w-full overflow-hidden rounded-sm">
                <div
                  className={s.note ? "bg-accent h-full" : "bg-line-strong h-full"}
                  style={{ width: (s.share / max) * 100 + "%" }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-line px-5 py-5">
        <h3 className="text-caption text-ink font-semibold">Open diagnoses</h3>
        <ul className="mt-3 flex flex-col gap-3">
          {DIAGNOSES.map((d) => (
            <li key={d.id} className="border-l-2 border-l-accent pl-3">
              <div className="text-caption text-ink">{d.title}</div>
              <div className="text-technical font-mono text-subtle">
                {d.share} of task spend
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-line px-5 py-4">
        <span className="text-caption text-ink">Candidate D</span>
        <StatusChip status="verified" />
      </div>
    </div>
  );
}

import { Check, CircleDashed, Minus, X } from "lucide-react";
import { cn } from "@/lib/cn";

export type Status =
  | "observed"
  | "diagnosed"
  | "experimental"
  | "verifying"
  | "verified"
  | "rejected"
  | "not-configured";

/**
 * Status never rests on colour alone: each state carries its own glyph and its
 * own word, so it survives greyscale, colour blindness and a screenshot.
 */
const STATES: Record<Status, { label: string; cls: string; Icon: typeof Check }> = {
  observed: { label: "OBSERVED", cls: "bg-line/60 text-muted", Icon: CircleDashed },
  diagnosed: { label: "DIAGNOSED", cls: "bg-accent-subtle text-accent", Icon: Minus },
  experimental: { label: "CANDIDATE", cls: "bg-accent-subtle text-accent", Icon: CircleDashed },
  verifying: { label: "VERIFYING", cls: "bg-accent-subtle text-accent", Icon: CircleDashed },
  verified: { label: "VERIFIED", cls: "bg-verified-bg text-verified", Icon: Check },
  rejected: { label: "REJECTED", cls: "bg-rejected-bg text-rejected", Icon: X },
  "not-configured": { label: "NOT CONFIGURED", cls: "bg-warning-bg text-warning", Icon: Minus },
};

export function StatusChip({
  status,
  label,
  className,
}: {
  status: Status;
  label?: string;
  className?: string;
}) {
  const s = STATES[status];
  const Icon = s.Icon;
  return (
    <span
      className={cn(
        "text-technical font-mono inline-flex items-center gap-1.5 rounded-sm px-2 py-1 leading-none",
        s.cls,
        className,
      )}
    >
      <Icon size={12} strokeWidth={2.5} aria-hidden />
      {label ?? s.label}
    </span>
  );
}

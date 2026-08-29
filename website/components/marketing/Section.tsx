import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Section shells for the homepage narrative.
 *
 * These deliberately do not impose an eyebrow/heading/paragraph rhythm - each
 * section composes its own header, so the page does not read as one repeated
 * template. What they standardise is vertical rhythm and the hairline that
 * separates one movement of the argument from the next.
 */
export function Section({
  id,
  children,
  className,
  surface,
  rule = true,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  surface?: "ink";
  rule?: boolean;
}) {
  return (
    <section
      id={id}
      data-surface={surface}
      className={cn(
        "py-24 lg:py-32",
        surface === "ink" && "bg-canvas",
        rule && !surface && "border-t border-line",
        className,
      )}
    >
      {children}
    </section>
  );
}

/** Numbered marker, used only where the content really is a sequence. */
export function StepMark({ step, of }: { step: number; of: number }) {
  return (
    <span className="text-technical font-mono text-subtle tabular-nums">
      {String(step).padStart(2, "0")} / {String(of).padStart(2, "0")}
    </span>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-eyebrow text-muted uppercase">{children}</p>;
}

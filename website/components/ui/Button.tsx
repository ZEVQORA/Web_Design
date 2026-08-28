import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "relative inline-flex items-center justify-center gap-2 text-button font-medium " +
  "transition-control " +
  "disabled:pointer-events-none disabled:opacity-45 " +
  "aria-disabled:pointer-events-none aria-disabled:opacity-45";

const variants: Record<Variant, string> = {
  /*
   * The single primary action across the whole site. Filled with --cta rather
   * than the brand accent: white on Soft Blue is 3.28:1 and would fail AA on
   * the most important label on the site. Every state below was measured.
   *   default 4.74:1 · hover 5.82:1 · active 7.47:1
   */
  primary:
    "bg-cta text-cta-fg hover:bg-cta-hover active:bg-cta-active",
  /*
   * The border is the thing that identifies this as a control, so it uses the
   * control-boundary token (3.15:1) rather than the decorative hairline, which
   * is only 1.15:1 against the canvas.
   */
  secondary:
    "bg-surface text-ink border border-line-control hover:bg-canvas active:bg-line/40",
  ghost: "text-muted hover:text-ink active:text-muted",
};

/*
 * Radius follows size so the corner stays proportionally the same. A flat
 * 10px on a 32px control reads as 31% of the height - almost a pill, which
 * the system does not want.
 */
const sizes: Record<Size, string> = {
  sm: "h-8 px-3 rounded-sm",
  // 44px tall - meets the touch-target minimum without looking chunky.
  md: "h-11 px-5 rounded-md",
  lg: "h-12 px-6 rounded-md",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & ComponentPropsWithoutRef<"button">) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...props
}: CommonProps & ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Link>
  );
}

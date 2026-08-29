import { cn } from "@/lib/cn";
import { LOCKUP } from "./marks";
import { ZevqoraMark } from "./ZevqoraMark";
import { ZevqoraWordmark } from "./ZevqoraWordmark";

/**
 * The approved lockup variants. There is no ink-mark or black-mark variant,
 * because no such lockup exists: the Z mark is Soft Blue on every surface, and
 * it is the wordmark that changes to hold contrast.
 */
type LogoVariant = "default" | "inverse";

interface ZevqoraLogoProps {
  /** `default` for light surfaces, `inverse` for ink surfaces. */
  variant?: LogoVariant;
  /** Mark height in px; everything else derives from the locked ratios. */
  size?: number;
  className?: string;
}

/**
 * The official lockup: Soft Blue mark plus canonical wordmark.
 *
 * Proportions are measured from the brand board, not eyeballed - the wordmark
 * cap height is the mark height divided by 2.125, the gap is 0.529 of the mark
 * height, and the two sit on a shared optical centre line.
 *
 * For the mark on its own, use <ZevqoraMark /> directly.
 */
export function ZevqoraLogo({
  variant = "default",
  size = 28,
  className,
}: ZevqoraLogoProps) {
  const wordHeight = size / LOCKUP.markToWordCapHeight;
  const gap = size * LOCKUP.gapToMarkHeight;

  return (
    <span className={cn("inline-flex items-center", className)}>
      <span className="sr-only">ZEVQORA</span>
      <ZevqoraMark height={size} />
      <span
        style={{ marginLeft: gap }}
        className={cn(
          "inline-flex",
          // Only the wordmark responds to the surface. The mark never does.
          variant === "inverse" ? "text-[#F7F8FA]" : "text-[#0F1115]",
        )}
      >
        <ZevqoraWordmark height={wordHeight} />
      </span>
    </span>
  );
}

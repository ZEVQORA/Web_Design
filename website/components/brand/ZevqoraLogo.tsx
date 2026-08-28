import { cn } from "@/lib/cn";
import { LOCKUP } from "./marks";
import { ZevqoraMark } from "./ZevqoraMark";
import { ZevqoraWordmark } from "./ZevqoraWordmark";

interface ZevqoraLogoProps {
  /** Mark height in px; everything else derives from the locked ratios. */
  size?: number;
  /** Hide the wordmark and show the mark alone (compact headers, favicons). */
  markOnly?: boolean;
  /** Tint the mark with the accent while the wordmark stays ink. */
  accentMark?: boolean;
  className?: string;
}

/**
 * The official lockup. Proportions are measured from the brand board, not
 * eyeballed: the wordmark cap height is the mark height divided by 2.125,
 * and the gap is 0.529 of the mark height.
 */
export function ZevqoraLogo({
  size = 28,
  markOnly = false,
  accentMark = true,
  className,
}: ZevqoraLogoProps) {
  const wordHeight = size / LOCKUP.markToWordCapHeight;
  const gap = size * LOCKUP.gapToMarkHeight;

  return (
    <span className={cn("inline-flex items-center", className)}>
      <span className="sr-only">ZEVQORA</span>
      <ZevqoraMark height={size} className={accentMark ? "text-accent" : undefined} />
      {!markOnly && (
        <span style={{ marginLeft: gap }} className="inline-flex">
          <ZevqoraWordmark height={wordHeight} />
        </span>
      )}
    </span>
  );
}

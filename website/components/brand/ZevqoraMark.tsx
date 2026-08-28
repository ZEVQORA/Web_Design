import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { MARK_ASPECT, MARK_PATH, MARK_VIEWBOX } from "./marks";

interface ZevqoraMarkProps {
  /** Rendered height in px. Width follows the locked aspect ratio. */
  height?: number;
  className?: string;
  /** Set when the mark stands alone as the accessible name for a link. */
  title?: string;
  style?: CSSProperties;
}

/**
 * The ZEVQORA Z mark. Geometry is locked - see components/brand/marks.ts.
 * Colour comes from `currentColor` so the mark inverts with its section.
 */
export function ZevqoraMark({
  height = 28,
  className,
  title,
  style,
}: ZevqoraMarkProps) {
  return (
    <svg
      viewBox={MARK_VIEWBOX}
      height={height}
      width={height * MARK_ASPECT}
      fill="currentColor"
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={cn("shrink-0", className)}
      style={style}
    >
      <path d={MARK_PATH} />
    </svg>
  );
}

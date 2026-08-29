import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { MARK_ASPECT, MARK_PATH, MARK_VIEWBOX } from "./marks";

/**
 * The canonical ZEVQORA Soft Blue. Hard-coded rather than tokenised on
 * purpose: the mark's colour is part of the mark. It does not theme, it does
 * not follow the surface, and it never becomes the accent's inverted step.
 */
const SOFT_BLUE = "#468BFF";

interface ZevqoraMarkProps {
  /** Rendered height in px. Width follows the locked aspect ratio. */
  height?: number;
  className?: string;
  /** Set when the mark stands alone as the accessible name for a link. */
  title?: string;
  style?: CSSProperties;
}

/**
 * The ZEVQORA Z mark.
 *
 * There is exactly one canonical standalone mark and it is Soft Blue. There is
 * no ink mark, no black mark and no monochrome variant, so this component
 * deliberately exposes no way to recolour it - not a colour prop, and not
 * `currentColor`. On an ink surface the mark stays Soft Blue and the wordmark
 * beside it goes light instead.
 *
 * Geometry is locked - see components/brand/marks.ts.
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
      fill={SOFT_BLUE}
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

import { cn } from "@/lib/cn";
import { WORDMARK_ASPECT, WORDMARK_PATH, WORDMARK_VIEWBOX } from "./marks";

interface ZevqoraWordmarkProps {
  /** Cap height in px. Width follows the locked aspect ratio. */
  height?: number;
  className?: string;
  title?: string;
}

/** The ZEVQORA wordmark. Geometry is locked - see components/brand/marks.ts. */
export function ZevqoraWordmark({
  height = 14,
  className,
  title,
}: ZevqoraWordmarkProps) {
  return (
    <svg
      viewBox={WORDMARK_VIEWBOX}
      height={height}
      width={height * WORDMARK_ASPECT}
      fill="currentColor"
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={cn("shrink-0", className)}
    >
      <path d={WORDMARK_PATH} />
    </svg>
  );
}

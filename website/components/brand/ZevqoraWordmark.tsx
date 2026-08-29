import { cn } from "@/lib/cn";
import { WORDMARK_ASPECT, WORDMARK_PATH, WORDMARK_VIEWBOX } from "./marks";

interface ZevqoraWordmarkProps {
  /** Cap height in px. Width follows the locked aspect ratio. */
  height?: number;
  className?: string;
  title?: string;
}

/**
 * The ZEVQORA wordmark - fixed brand geometry, never typeset.
 *
 * `fill-rule="evenodd"` is load-bearing: the counters of Q and O are separate
 * subpaths wound against their outers. Under the default nonzero rule they
 * fill solid and the two letters become indistinguishable blobs.
 *
 * Unlike the mark, the wordmark does take its colour from the surface - ink on
 * light, light on ink - which is what `currentColor` is for here.
 */
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
      fillRule="evenodd"
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={cn("shrink-0", className)}
    >
      <path d={WORDMARK_PATH} />
    </svg>
  );
}

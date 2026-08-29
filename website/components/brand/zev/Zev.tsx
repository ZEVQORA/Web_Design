import Image from "next/image";
import { cn } from "@/lib/cn";
import { zevConfig } from "@/config/zev";

export type ZevView =
  | "front"
  | "three-quarter-front"
  | "side"
  | "three-quarter-back"
  | "back"
  | "pose-sitting"
  | "pose-playful"
  | "pose-thinking"
  | "pose-waving";

/**
 * Intrinsic sizes of the extracted sprites. Each turnaround view is only about
 * 300px tall in the canonical reference, which is the largest crisp render -
 * so these are also the ceiling. Zev is never upscaled past his source.
 */
const SPRITES: Record<ZevView, { w: number; h: number }> = {
  front: { w: 245, h: 306 },
  "three-quarter-front": { w: 260, h: 304 },
  side: { w: 270, h: 302 },
  "three-quarter-back": { w: 233, h: 303 },
  back: { w: 230, h: 304 },
  "pose-sitting": { w: 140, h: 167 },
  "pose-playful": { w: 168, h: 145 },
  "pose-thinking": { w: 141, h: 167 },
  "pose-waving": { w: 144, h: 170 },
};

interface ZevProps {
  view?: ZevView;
  /** Rendered height in px, clamped to the source resolution. */
  height?: number;
  className?: string;
  priority?: boolean;
  /** Decorative by default; give alt text only when Zev carries meaning. */
  alt?: string;
}

/**
 * A single canonical Zev sprite, extracted from the turnaround - never
 * redrawn, never generated. Purely presentational so it stays a server
 * component; interaction lives in ZevScene.
 */
export function Zev({
  view = "three-quarter-front",
  height = 280,
  className,
  priority = false,
  alt,
}: ZevProps) {
  const s = SPRITES[view];
  const h = Math.min(height, zevConfig.maxRenderHeight);
  const w = Math.round((s.w / s.h) * h);
  return (
    <Image
      src={"/assets/zev/zev-" + view + ".webp"}
      width={w}
      height={h}
      alt={alt ?? ""}
      aria-hidden={alt ? undefined : true}
      priority={priority}
      className={cn("select-none", className)}
      draggable={false}
    />
  );
}

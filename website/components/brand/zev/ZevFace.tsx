import Image from "next/image";
import { cn } from "@/lib/cn";

export type ZevExpression =
  | "warm-smile"
  | "delighted"
  | "calm-confidence"
  | "curious"
  | "focused"
  | "friendly-idle";

const FACES: Record<ZevExpression, { w: number; h: number }> = {
  "warm-smile": { w: 132, h: 128 },
  delighted: { w: 131, h: 128 },
  "calm-confidence": { w: 131, h: 128 },
  curious: { w: 139, h: 128 },
  focused: { w: 138, h: 128 },
  "friendly-idle": { w: 139, h: 128 },
};

/**
 * A canonical Zev expression, framed.
 *
 * These are the expression plates from the brand system. They are tight
 * head-shots whose white fur runs to the edge of the plate, so there is no
 * closed silhouette to cut against - any matte eats his face. The brand sheet
 * presents them inside cards for exactly that reason, and so does this: framed,
 * on their own ground, rather than pretending to be a free-standing cutout.
 */
export function ZevFace({
  expression = "friendly-idle",
  size = 64,
  className,
  alt,
}: {
  expression?: ZevExpression;
  size?: number;
  className?: string;
  alt?: string;
}) {
  const f = FACES[expression];
  return (
    <span
      className={cn(
        "border-line bg-surface inline-flex shrink-0 overflow-hidden rounded-full border",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <Image
        src={`/assets/zev/zev-face-${expression}.webp`}
        width={f.w}
        height={f.h}
        alt={alt ?? ""}
        aria-hidden={alt ? undefined : true}
        className="h-full w-full object-cover"
        style={{ objectPosition: "50% 38%" }}
        draggable={false}
      />
    </span>
  );
}

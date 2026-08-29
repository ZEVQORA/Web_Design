"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { Zev, type ZevView } from "./Zev";

/**
 * Zev, responding to the pointer.
 *
 * The response is deliberately small: he shifts a few pixels and a degree or
 * two toward the pointer and settles. The intent is a character who is paying
 * attention, not one who chases the cursor. Nothing bounces, nothing loops,
 * and no idle animation runs when the pointer is elsewhere.
 *
 * The sprite itself is server-rendered, so Zev is fully visible before any of
 * this JavaScript arrives.
 */
export function ZevScene({
  view = "three-quarter-front",
  height = 280,
  className,
  priority,
}: {
  view?: ZevView;
  height?: number;
  className?: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ x: 0, y: 0, r: 0 });
  // Subscribed properly rather than mirrored into state inside an effect,
  // which is both a lint error and a render-after-paint flash.
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    // Coarse pointers have no hover, so there is nothing to track.
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const el = ref.current;
        if (!el) return;
        const b = el.getBoundingClientRect();
        const dx = (e.clientX - (b.left + b.width / 2)) / window.innerWidth;
        const dy = (e.clientY - (b.top + b.height / 2)) / window.innerHeight;
        const cx = Math.max(-1, Math.min(1, dx));
        const cy = Math.max(-1, Math.min(1, dy));
        setT({ x: cx * 10, y: cy * 5, r: cx * 1.6 });
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return (
    <div
      ref={ref}
      className={cn("will-change-transform", className)}
      style={{
        transform: reduced
          ? undefined
          : "translate3d(" + t.x + "px," + t.y + "px,0) rotate(" + t.r + "deg)",
        transition: "transform 900ms cubic-bezier(0.2, 0, 0, 1)",
      }}
    >
      <Zev view={view} height={height} priority={priority} />
    </div>
  );
}

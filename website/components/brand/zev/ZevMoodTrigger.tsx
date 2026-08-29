"use client";

import type { ReactNode } from "react";
import { useSetZevMood, type ZevMood } from "./ZevMoodContext";

/**
 * Sets Zev's mood while a control is hovered or focused.
 *
 * Focus is handled as well as hover so a keyboard user sees the same
 * behaviour, and the mood always returns to rest on the way out. Purely
 * decorative - it conveys nothing the control does not already say.
 */
export function ZevMoodTrigger({
  mood,
  children,
  className,
}: {
  mood: ZevMood;
  children: ReactNode;
  className?: string;
}) {
  const setMood = useSetZevMood();
  return (
    <span
      className={className}
      onPointerEnter={() => setMood(mood)}
      onPointerLeave={() => setMood("idle")}
      onFocusCapture={() => setMood(mood)}
      onBlurCapture={() => setMood("idle")}
    >
      {children}
    </span>
  );
}

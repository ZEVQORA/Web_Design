"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import {
  getServerZevMood,
  getZevMood,
  subscribeZevMood,
  type ZevMood,
} from "@/lib/zevMood";
import { Zev, type ZevView } from "./Zev";

/**
 * Zev, presented dimensionally and reacting to the page.
 *
 * There is no faithful 3D model of Zev, and a low-poly reconstruction from
 * primitives would look worse than the canonical artwork, not better. So the
 * dimensionality is built from the artwork itself: the sprite sits on its own
 * contact shadow, inside a perspective container, and rotates a couple of
 * degrees toward the pointer while the shadow shifts against it. Depth comes
 * from the light behaving correctly, not from geometry.
 *
 * Amplitude is deliberately tiny. This should read as a character who is paying
 * attention, never one performing.
 *
 * Moods map to canonical poses. Everything here is decorative: the base sprite
 * is server-rendered and visible before this component hydrates, and under
 * reduced motion the whole system resolves to a still, correctly-lit Zev.
 */
const MOOD_VIEW: Record<ZevMood, ZevView> = {
  idle: "three-quarter-front",
  warm: "pose-waving",
  curious: "pose-thinking",
  focused: "front",
  delighted: "pose-waving",
};

export function ZevScene({
  view,
  height = 260,
  className,
  priority,
  react = true,
}: {
  /** Fixed view. Omit to follow the shared mood. */
  view?: ZevView;
  height?: number;
  className?: string;
  priority?: boolean;
  react?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mood = useSyncExternalStore(
    subscribeZevMood,
    getZevMood,
    getServerZevMood,
  );
  const [t, setT] = useState({ x: 0, y: 0, ry: 0, rx: 0 });

  const active: ZevView = view ?? MOOD_VIEW[react ? mood : "idle"];

  useEffect(() => {
    if (reduced || !react) return;
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
        const cx = Math.max(-1, Math.min(1, dx * 2));
        const cy = Math.max(-1, Math.min(1, dy * 2));
        setT({ x: cx * 7, y: cy * 4, ry: cx * 7, rx: -cy * 4 });
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced, react]);

  const ease = "transform 1100ms cubic-bezier(0.2, 0, 0, 1)";
  const shadowW = height * 0.62;

  return (
    <div
      ref={ref}
      className={cn("relative isolate", className)}
      style={{ perspective: "900px" }}
    >
      {/*
        The contact shadow is a separate element so it can shift against the
        figure rather than with it - which is what actually sells the depth.
      */}
      <div
        aria-hidden
        className="absolute left-1/2 bottom-0 -z-10"
        style={{
          width: shadowW,
          height: shadowW * 0.17,
          transform: `translate(-50%, 42%) translateX(${-t.x * 0.55}px)`,
          background:
            "radial-gradient(ellipse at center, rgba(15,17,21,0.20), rgba(15,17,21,0.09) 45%, transparent 72%)",
          filter: "blur(7px)",
          transition: reduced ? undefined : ease,
        }}
      />

      <div
        style={{
          transformStyle: "preserve-3d",
          transform: reduced
            ? undefined
            : `translate3d(${t.x}px, ${t.y}px, 0) rotateY(${t.ry}deg) rotateX(${t.rx}deg)`,
          transition: reduced ? undefined : ease,
        }}
      >
        <Zev view={active} height={height} priority={priority} />
      </div>
    </div>
  );
}

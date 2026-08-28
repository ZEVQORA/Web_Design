/**
 * ZEVQORA motion vocabulary. These mirror the CSS custom properties in
 * styles/globals.css so a transition reads the same whether it is driven
 * by CSS or by the motion runtime. One runtime only - `motion`.
 */

/** Seconds, to match the motion runtime's units. */
export const duration = {
  micro: 0.12,
  enter: 0.32,
  section: 0.56,
  hero: 0.9,
} as const;

export const ease = {
  /** Default. Decelerating, no overshoot - reads as precise, not bouncy. */
  standard: [0.2, 0, 0, 1],
  exit: [0.4, 0, 1, 1],
} as const;

/**
 * The only spring in the system. Critically damped enough that nothing
 * wobbles; used for pointer-tracked motion, never for entrances.
 */
export const spring = {
  type: "spring",
  stiffness: 220,
  damping: 32,
  mass: 0.9,
} as const;

/** Section entrance. Deliberately small travel - content settles, it does not fly. */
export const sectionEnter = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.section, ease: ease.standard },
  },
} as const;

/** Reduced-motion equivalent: state changes, nothing travels. */
export const sectionEnterReduced = {
  hidden: { opacity: 0, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.01 } },
} as const;

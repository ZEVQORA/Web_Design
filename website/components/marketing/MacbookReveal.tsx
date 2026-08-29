"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { MacbookPro } from "@/components/product-preview/MacbookPro";
import { ProductPreview } from "@/components/product-preview/ProductPreview";

/**
 * The product reveal.
 *
 * The enclosure begins tipped away and rotates to frontal as the section is
 * scrolled through, because the payoff is the moment the screen becomes
 * readable - so the travel is modest and the final state is dead flat, not a
 * permanently skewed hero shot.
 *
 * Reduced motion, and any viewport too small for the enclosure to be legible,
 * get the frontal state immediately.
 */
export function MacbookReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.25"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [22, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [28, 0]);

  return (
    <div ref={ref} className="container-page">
      {/* Desktop: the enclosure, revealed on scroll. */}
      <div className="hidden lg:block" style={{ perspective: "1600px" }}>
        <motion.div
          style={
            reduced
              ? undefined
              : { rotateX, scale, y, transformStyle: "preserve-3d" }
          }
          className="mx-auto max-w-[70rem]"
        >
          <MacbookPro>
            <ProductPreview />
          </MacbookPro>
        </motion.div>
      </div>

      {/* Below lg the enclosure would shrink the UI past readability, so the
          preview is shown on its own framed surface instead. */}
      <div className="lg:hidden">
        <div className="border-line overflow-hidden rounded-lg border shadow-lift">
          <div className="aspect-[501/324] w-full">
            <ProductPreview />
          </div>
        </div>
      </div>
    </div>
  );
}

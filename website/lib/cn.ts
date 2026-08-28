import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge has no knowledge of a custom theme, so it has to guess which
 * group a class belongs to from its name alone. With the ZEVQORA scale that
 * guess is wrong in a way that silently breaks type: `text-button` (a font
 * size) and `text-cta-fg` (a colour) both look like `text-*`, so it treated
 * them as conflicting and dropped the font size - buttons were rendering at
 * the inherited body size with no visible error anywhere.
 *
 * Declaring the scale here is what keeps size and colour in separate groups.
 * Any new step added to @theme must be added to this list too.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display",
            "h1",
            "h2",
            "h3",
            "body-lg",
            "body",
            "caption",
            "technical",
            "eyebrow",
            "nav",
            "button",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

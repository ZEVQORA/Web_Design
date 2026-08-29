import { cn } from "@/lib/cn";
import { ZevqoraMark } from "./ZevqoraMark";

interface BrandLoaderProps {
  /**
   * How long to stay invisible before fading in, in ms. A loader that appears
   * instantly and vanishes 150ms later reads as a flicker, so nothing is shown
   * until the wait is actually worth acknowledging.
   */
  delayMs?: number;
  label?: string;
  className?: string;
}

/**
 * The branded wait state: the Z mark breathing, and nothing else. No spinner
 * ring, no progress bar pretending to know a percentage it cannot know.
 *
 * The delay and the pulse are pure CSS so this stays a server component and
 * costs no client JavaScript.
 */
export function BrandLoader({
  delayMs = 300,
  label = "Loading",
  className,
}: BrandLoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn("flex items-center justify-center", className)}
      style={{
        animation: `zq-loader-in 240ms cubic-bezier(0.2,0,0,1) ${delayMs}ms both`,
      }}
    >
      <ZevqoraMark
        height={32}
        // The pulse is opacity only - the mark never scales or spins, so the
        // geometry of the logo is never distorted.
        style={{ animation: "zq-loader-pulse 1600ms ease-in-out infinite" }}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}

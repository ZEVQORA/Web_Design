/**
 * Zev rendering configuration.
 *
 * The canonical turnaround is the only Zev artwork that exists, so the site
 * runs in `turnaround` mode: real extracted sprites, presented in 2.5D.
 *
 * The other modes are wired but deliberately inert. Nothing loads a 3D runtime
 * until a real scene is configured here, so an unused Spline bundle never
 * reaches the browser.
 */

export type ZevMode = "turnaround" | "spline" | "glb";

export const zevConfig = {
  mode: "turnaround" as ZevMode,
  /** Set to a Spline scene URL to switch modes. Null keeps the runtime out. */
  splineScene: null as string | null,
  /** Set to /assets/zev/zev.glb once a model exists. */
  glbUrl: null as string | null,
  /**
   * Each turnaround view is roughly 300px tall in the reference, so this is
   * the largest crisp render. Zev is never upscaled past it.
   */
  maxRenderHeight: 320,
} as const;

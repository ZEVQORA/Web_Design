/**
 * CANONICAL BENCHMARK TRUTH.
 *
 * This file holds the only real measured numbers on the website. Nothing here
 * may be edited to look better, and nothing from data/product-demo.ts may be
 * mixed into it - demo data is illustrative, this is evidence.
 *
 * Rules that the copy on the site must not break:
 *   - The retired ~45% claim does not exist and must never reappear.
 *   - Candidate D is an internal dogfooding benchmark. It is not customer
 *     proof, not production proof and not external validation.
 *   - The 95% confidence interval crosses zero, so the saving is a point
 *     estimate and not a statistically conclusive result. Any presentation of
 *     12.3196% must carry that qualifier legibly.
 *   - Candidate D predates the 2026-08-28 engine hardening pass. The rerun on
 *     the hardened engine has not happened yet, and the site says so.
 */

export interface GateResult {
  label: string;
  value: string;
  floor?: string;
  status: "pass" | "fail";
}

export interface BenchmarkCase {
  id: string;
  /** Headline measured figure, exactly as measured. */
  costReduction: string;
  quality: string;
  qualityFloor: string;
  status: "REJECTED" | "VERIFIED";
  /** Machine-readable reason, shown as the rejection cause. */
  reason: string;
  gates: GateResult[];
}

/**
 * The historical Phase 4C candidate. It produced the larger cost reduction and
 * was rejected anyway, because quality fell below the configured floor. This
 * is the point of the entire product and it is presented first, at full size.
 */
export const REJECTED_CANDIDATE: BenchmarkCase = {
  id: "phase-4c",
  costReduction: "42.01%",
  quality: "0.87",
  qualityFloor: "0.95",
  status: "REJECTED",
  reason: "quality_floor",
  gates: [
    { label: "Cost reduction", value: "42.01%", status: "pass" },
    { label: "Quality", value: "0.87", floor: "0.95", status: "fail" },
  ],
};

/** Candidate D - passed every configured gate. */
export const VERIFIED_CANDIDATE: BenchmarkCase = {
  id: "candidate-d",
  costReduction: "12.3196%",
  quality: "0.97",
  qualityFloor: "0.95",
  status: "VERIFIED",
  reason: "all_gates_pass",
  gates: [
    { label: "Cost reduction", value: "12.3196%", status: "pass" },
    { label: "Quality", value: "0.97", floor: "0.95", status: "pass" },
    { label: "Protected behaviour", value: "held", status: "pass" },
    { label: "Evidence completeness", value: "complete", status: "pass" },
  ],
};

/**
 * Qualifiers that must appear wherever the numbers above appear. These are not
 * legal small print - they are part of the claim, and the design gives them
 * enough size to actually be read.
 */
export const BENCHMARK_QUALIFIERS = [
  "Internal 50-case dogfooding benchmark. Not customer evidence.",
  "95% savings confidence interval [-11.0148%, 34.6365%] crosses zero, so the 12.3196% figure is a point estimate rather than a conclusive result.",
  "Historical internal benchmark produced before the 2026-08-28 hardening pass. Hardened-engine rerun pending.",
] as const;

export const BENCHMARK_META = {
  cases: 50,
  kind: "Internal dogfooding benchmark",
  confidenceInterval: "[-11.0148%, 34.6365%]",
  hardeningNote:
    "Historical internal benchmark produced before the 2026-08-28 hardening pass. Hardened-engine rerun pending.",
} as const;

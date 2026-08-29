/**
 * SEEDED DEMO DATA - illustrative only.
 *
 * Every number, name and identifier here is invented to show what the product
 * surfaces look like. None of it is measured, and none of it describes a real
 * workload, customer or result.
 *
 * Keep this strictly separate from data/evidence.ts, which holds the only real
 * measured figures on the site. Anything rendered from this file must read as
 * an example, never as a claim.
 */

export type EvidenceState =
  | "observed"
  | "diagnosed"
  | "experimental"
  | "verifying"
  | "rejected"
  | "verified";

export interface ObservedRow {
  id: string;
  model: string;
  work: string;
  cost: string;
  latency: string;
  state: EvidenceState;
  /** Marks the row the hero narrative points at. */
  focus?: boolean;
}

/** The hero's evidence tape. Reads top to bottom as a causal sequence. */
export const HERO_LEDGER: ObservedRow[] = [
  { id: "req_8f2c41", model: "gpt-4o-mini", work: "classify.intent", cost: "$0.0004", latency: "310 ms", state: "observed" },
  { id: "req_8f2c42", model: "text-embedding-3", work: "retrieve.chunks", cost: "$0.0001", latency: "88 ms", state: "observed" },
  { id: "req_8f2c43", model: "gpt-4o", work: "summarize.thread", cost: "$0.0192", latency: "2 140 ms", state: "observed" },
  { id: "req_8f2c44", model: "gpt-4o", work: "classify.intent", cost: "$0.0188", latency: "1 980 ms", state: "diagnosed", focus: true },
  { id: "req_8f2c45", model: "gpt-4o", work: "classify.intent", cost: "$0.0191", latency: "2 050 ms", state: "diagnosed" },
  { id: "req_8f2c46", model: "gpt-4o-mini", work: "classify.intent", cost: "$0.0004", latency: "290 ms", state: "experimental" },
  { id: "req_8f2c47", model: "deterministic", work: "classify.intent", cost: "$0.0000", latency: "3 ms", state: "verifying" },
];

/** Spend graph - work nodes, not a line chart. */
export interface SpendNode {
  id: string;
  label: string;
  kind: "request" | "task" | "model" | "retrieval" | "repeated";
  share: number;
  note?: string;
}

export const SPEND_NODES: SpendNode[] = [
  { id: "n1", label: "support.thread", kind: "request", share: 100 },
  { id: "n2", label: "classify.intent", kind: "task", share: 41, note: "repeated, bounded output" },
  { id: "n3", label: "summarize.thread", kind: "task", share: 34 },
  { id: "n4", label: "retrieve.chunks", kind: "retrieval", share: 11 },
  { id: "n5", label: "draft.reply", kind: "task", share: 14 },
];

export const SPEND_EDGES: Array<[string, string]> = [
  ["n1", "n2"],
  ["n1", "n3"],
  ["n1", "n4"],
  ["n1", "n5"],
];

export interface Diagnosis {
  id: string;
  title: string;
  observed: string;
  evidence: string;
  confidence: "high" | "medium" | "low";
  share: string;
}

export const DIAGNOSES: Diagnosis[] = [
  {
    id: "d1",
    title: "Repeated bounded work",
    observed: "classify.intent returns one of 6 labels, called on every thread",
    evidence: "4 812 calls / 7 days · 41% of task spend",
    confidence: "high",
    share: "41%",
  },
  {
    id: "d2",
    title: "Oversized context",
    observed: "summarize.thread sends the full thread where the last 12 turns suffice",
    evidence: "median 9 400 prompt tokens · p90 21 700",
    confidence: "medium",
    share: "18%",
  },
  {
    id: "d3",
    title: "Duplicate retrieval",
    observed: "retrieve.chunks issued twice per thread on re-render",
    evidence: "2 190 duplicate pairs / 7 days",
    confidence: "high",
    share: "6%",
  },
];

export interface Candidate {
  id: string;
  name: string;
  hypothesis: string;
  mechanism: string;
  risk: string;
  rollback: string;
  state: EvidenceState;
}

export const CANDIDATES: Candidate[] = [
  {
    id: "c1",
    name: "Deterministic path",
    hypothesis: "A bounded label set does not require a model call",
    mechanism: "Rule table with model fallback on low confidence",
    risk: "Unseen phrasings fall through to the model",
    rollback: "Single flag, reverts to model-first",
    state: "verifying",
  },
  {
    id: "c2",
    name: "Smaller-model route",
    hypothesis: "A smaller model holds label accuracy for this task",
    mechanism: "Route classify.intent to gpt-4o-mini",
    risk: "Accuracy drop on ambiguous threads",
    rollback: "Route reverts on gate failure",
    state: "experimental",
  },
  {
    id: "c3",
    name: "Shorter context",
    hypothesis: "The last 12 turns carry the summary signal",
    mechanism: "Window the thread before summarize.thread",
    risk: "Long-thread summaries lose earlier detail",
    rollback: "Window size is configuration",
    state: "experimental",
  },
];

/** Replay comparison - illustrative shape of a baseline vs candidate run. */
export const REPLAY = {
  cases: 50,
  workload: "support.thread · frozen 7-day sample",
  rows: [
    { label: "Cost / work", baseline: "$0.0191", candidate: "$0.0000", better: true },
    { label: "Quality", baseline: "0.98", candidate: "0.97", better: false },
    { label: "Latency p50", baseline: "1 980 ms", candidate: "3 ms", better: true },
    { label: "Protected behaviour", baseline: "held", candidate: "held", better: true },
    { label: "Execution completeness", baseline: "50 / 50", candidate: "50 / 50", better: true },
  ],
} as const;

/** Product preview - demo workspace shown inside the MacBook. */
export const DEMO_WORKSPACE = {
  name: "Acme AI",
  environment: "demo data",
  window: "Last 7 days",
  nav: [
    "Overview",
    "Spend Graph",
    "Evidence",
    "Diagnosis",
    "Experiments",
    "Replay & Eval",
    "Verification",
    "Verified Changes",
    "Ask Zev",
  ],
  stats: [
    { label: "Observed AI work", value: "18 402", unit: "calls" },
    { label: "Mapped task spend", value: "94", unit: "%" },
    { label: "Open diagnoses", value: "3", unit: "" },
    { label: "Candidates in replay", value: "1", unit: "" },
  ],
} as const;

/** Ask Zev - product-native questions, not a general chatbot. */
export const ASK_ZEV_QUESTIONS = [
  "What is driving AI cost this week?",
  "Why was Candidate 4 rejected?",
  "Which workloads are safe to test with a smaller model?",
] as const;

export const ASK_ZEV_ANSWER = {
  question: "Why was Candidate 4 rejected?",
  lines: [
    "Candidate 4 reduced cost per work unit, but quality measured 0.87 against a configured floor of 0.95.",
    "The run stopped at the quality gate, so the change was never prepared for review.",
  ],
  citations: [
    { label: "replay", value: "50 cases" },
    { label: "gate", value: "quality_floor" },
    { label: "verdict", value: "rejected" },
  ],
} as const;

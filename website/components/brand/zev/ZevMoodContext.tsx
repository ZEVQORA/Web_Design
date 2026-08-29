"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ZevMood = "idle" | "warm" | "curious" | "focused" | "delighted";

/**
 * Zev's mood, shared through context.
 *
 * Context rather than a module-level store: the trigger and the scene are
 * separate client islands, and context is resolved through the React tree, so
 * it cannot depend on the two ending up in the same chunk.
 *
 * The provider wraps server-rendered children untouched, so the headline and
 * the calls to action stay on the server.
 */
const MoodContext = createContext<ZevMood>("idle");
const SetMoodContext = createContext<(m: ZevMood) => void>(() => {});

export function ZevMoodProvider({ children }: { children: ReactNode }) {
  const [mood, setMood] = useState<ZevMood>("idle");
  // Split the value and the setter so a mood change re-renders the scene
  // without re-rendering every trigger.
  const set = useMemo(() => setMood, []);
  return (
    <SetMoodContext.Provider value={set}>
      <MoodContext.Provider value={mood}>{children}</MoodContext.Provider>
    </SetMoodContext.Provider>
  );
}

/** Defaults to resting, so a scene outside a provider still renders. */
export function useZevMood() {
  return useContext(MoodContext);
}

export function useSetZevMood() {
  return useContext(SetMoodContext);
}

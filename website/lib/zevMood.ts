/**
 * Zev's mood, as a tiny external store.
 *
 * The hero's calls to action and Zev live in different columns of a
 * server-rendered grid, so passing state between them would mean hoisting the
 * whole hero into a client component. A module-level store keeps both as small
 * independent islands and leaves the headline on the server.
 *
 * Moods map to canonical expressions from the brand system. They are always
 * decorative: nothing on the page requires a mood change to be understood.
 */
export type ZevMood =
  | "idle"
  | "warm"
  | "curious"
  | "focused"
  | "delighted";

let mood: ZevMood = "idle";
const listeners = new Set<() => void>();

export function setZevMood(next: ZevMood) {
  if (mood === next) return;
  mood = next;
  listeners.forEach((l) => l());
}

export function subscribeZevMood(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getZevMood() {
  return mood;
}

/** The server never has a mood, so it always renders the resting state. */
export function getServerZevMood(): ZevMood {
  return "idle";
}

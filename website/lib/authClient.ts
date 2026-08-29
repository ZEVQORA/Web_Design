/**
 * Auth adapter boundary.
 *
 * There is no auth backend yet, and this file does not pretend otherwise. It
 * stores no tokens, sets no cookies and creates no accounts.
 *
 * - In production with nothing configured, every action resolves to
 *   `not-configured` and the UI says so plainly. It never silently "succeeds".
 * - In development a clearly labelled demo adapter returns success so the
 *   designed states can be reviewed.
 *
 * Wiring a real provider means implementing this interface and setting
 * NEXT_PUBLIC_AUTH_CONFIGURED. Nothing in the components changes.
 */

export type AuthResult =
  | { status: "success" }
  | { status: "error"; message: string }
  | { status: "not-configured" };

export interface AuthClient {
  configured: boolean;
  signIn(input: { email: string; password: string }): Promise<AuthResult>;
  signUp(input: {
    name: string;
    email: string;
    password: string;
  }): Promise<AuthResult>;
  requestPasswordReset(input: { email: string }): Promise<AuthResult>;
  verifyEmail(input: { code: string }): Promise<AuthResult>;
}

const configured = process.env.NEXT_PUBLIC_AUTH_CONFIGURED === "true";

const notConfigured = async (): Promise<AuthResult> => ({
  status: "not-configured",
});

/** Development only. Demonstrates the designed states; authenticates nobody. */
const demoDelay = () => new Promise((r) => setTimeout(r, 700));

const demoAdapter: AuthClient = {
  configured: false,
  async signIn({ email }) {
    await demoDelay();
    if (!email.includes("@")) {
      return { status: "error", message: "Enter a valid email address." };
    }
    return { status: "success" };
  },
  async signUp({ email }) {
    await demoDelay();
    if (!email.includes("@")) {
      return { status: "error", message: "Enter a valid email address." };
    }
    return { status: "success" };
  },
  async requestPasswordReset() {
    await demoDelay();
    return { status: "success" };
  },
  async verifyEmail({ code }) {
    await demoDelay();
    if (code.replace(/\s/g, "").length < 6) {
      return { status: "error", message: "That code is not six digits." };
    }
    return { status: "success" };
  },
};

const productionAdapter: AuthClient = {
  configured: false,
  signIn: notConfigured,
  signUp: notConfigured,
  requestPasswordReset: notConfigured,
  verifyEmail: notConfigured,
};

export const authClient: AuthClient =
  configured || process.env.NODE_ENV !== "development"
    ? productionAdapter
    : demoAdapter;

/** True when a demo adapter is standing in, so the UI can label itself. */
export const isDemoAuth = authClient === demoAdapter;

/**
 * Only same-origin absolute paths are accepted as a redirect target, so a
 * crafted `?next=` cannot bounce a signed-in user off to another host.
 */
export function safeNext(next: string | undefined | null, fallback = "/download") {
  if (!next) return fallback;
  if (!next.startsWith("/")) return fallback;
  if (next.startsWith("//")) return fallback;
  return next;
}

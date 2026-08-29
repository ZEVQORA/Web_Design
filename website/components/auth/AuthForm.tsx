"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Field";
import { authClient, isDemoAuth, safeNext } from "@/lib/authClient";

type Mode = "signin" | "signup" | "reset" | "verify";

/**
 * The auth form for all four flows.
 *
 * Every state the designer has to review is real and reachable: idle, loading,
 * field error, submitted success, and the not-configured state that production
 * returns while no auth backend exists. It never fakes a session.
 */
export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const params = useSearchParams();
  const next = safeNext(params.get("next"));

  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notConfigured, setNotConfigured] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);
    setNotConfigured(false);

    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "");

    const result =
      mode === "signin"
        ? await authClient.signIn({ email: get("email"), password: get("password") })
        : mode === "signup"
          ? await authClient.signUp({
              name: get("name"),
              email: get("email"),
              password: get("password"),
            })
          : mode === "reset"
            ? await authClient.requestPasswordReset({ email: get("email") })
            : await authClient.verifyEmail({ code: get("code") });

    setPending(false);

    if (result.status === "not-configured") {
      setNotConfigured(true);
      return;
    }
    if (result.status === "error") {
      setError(result.message);
      return;
    }
    if (mode === "reset") {
      setDone(true);
      return;
    }
    router.push(mode === "signup" ? "/verify?next=" + encodeURIComponent(next) : next);
  }

  if (done) {
    return (
      <div className="border-line rounded-md border p-5">
        <p className="text-caption text-ink">Check your email.</p>
        <p className="text-body text-muted mt-2">
          If an account exists for that address, a reset link is on its way.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      {mode === "signup" && (
        <Field id="name" label="Name">
          <Input id="name" name="name" autoComplete="name" required />
        </Field>
      )}

      {mode !== "verify" && (
        <Field id="email" label="Work email">
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            invalid={Boolean(error)}
          />
        </Field>
      )}

      {(mode === "signin" || mode === "signup") && (
        <Field
          id="password"
          label="Password"
          hint={mode === "signup" ? "At least 12 characters." : undefined}
        >
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
            required
          />
        </Field>
      )}

      {mode === "verify" && (
        <Field id="code" label="Six-digit code" hint="Sent to your work email.">
          <Input
            id="code"
            name="code"
            inputMode="numeric"
            autoComplete="one-time-code"
            required
            className="font-mono tracking-[0.4em]"
          />
        </Field>
      )}

      {mode === "signup" && (
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            name="terms"
            required
            className="mt-1 h-4 w-4 shrink-0 rounded-sm"
          />
          <span className="text-caption text-muted">
            I agree to the{" "}
            <Link href="/terms" className="text-ink underline underline-offset-4">
              terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-ink underline underline-offset-4">
              privacy policy
            </Link>
            .
          </span>
        </label>
      )}

      {error && (
        <p role="alert" className="text-technical font-mono text-rejected">
          {error}
        </p>
      )}

      {notConfigured && (
        <div
          role="status"
          className="border-line bg-warning-bg rounded-md border p-4"
        >
          <p className="text-technical font-mono text-warning uppercase">
            Auth not connected
          </p>
          <p className="text-caption text-muted mt-2">
            This is a design build. No account was created and nothing was sent.
          </p>
        </div>
      )}

      <Button type="submit" size="lg" disabled={pending} className="mt-1 w-full">
        {pending
          ? "Working…"
          : mode === "signin"
            ? "Sign in"
            : mode === "signup"
              ? "Create account"
              : mode === "reset"
                ? "Send reset link"
                : "Verify email"}
      </Button>

      {isDemoAuth && (
        <p className="text-technical font-mono text-subtle">
          Development demo adapter — no real account is created.
        </p>
      )}
    </form>
  );
}

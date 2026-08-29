import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthForm } from "@/components/auth/AuthForm";

export const metadata: Metadata = { title: "Sign in" };

export default function Page() {
  return (
    <AuthShell title="Sign in" subtitle="Continue to your workspace.">
      <Suspense fallback={<div className="h-64" aria-hidden />}>
        <AuthForm mode="signin" />
      </Suspense>
      <p className="text-caption text-muted mt-8">
        <Link href="/forgot-password" className="text-ink underline underline-offset-4">
          Forgot your password?
        </Link>
      </p>
      <p className="text-caption text-muted mt-3">
        No account yet?{" "}
        <Link href="/signup" className="text-ink underline underline-offset-4">
          Create one
        </Link>
      </p>
    </AuthShell>
  );
}

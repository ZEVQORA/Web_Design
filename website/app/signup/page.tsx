import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthForm } from "@/components/auth/AuthForm";

export const metadata: Metadata = { title: "Create account" };

export default function Page() {
  return (
    <AuthShell title="Create your account" subtitle="ZEVQORA is in private beta. Tell us where to reach you.">
      <Suspense fallback={<div className="h-64" aria-hidden />}>
        <AuthForm mode="signup" />
      </Suspense>
      <p className="text-caption text-muted mt-8">
        Already have an account?{" "}
        <Link href="/login" className="text-ink underline underline-offset-4">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}

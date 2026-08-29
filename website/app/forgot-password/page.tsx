import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthForm } from "@/components/auth/AuthForm";

export const metadata: Metadata = { title: "Reset password" };

export default function Page() {
  return (
    <AuthShell title="Reset your password" subtitle="We will email you a link to set a new one.">
      <Suspense fallback={<div className="h-64" aria-hidden />}>
        <AuthForm mode="reset" />
      </Suspense>
      <p className="text-caption text-muted mt-8">
        <Link href="/login" className="text-ink underline underline-offset-4">
          Back to sign in
        </Link>
      </p>
    </AuthShell>
  );
}

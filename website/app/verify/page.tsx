import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthForm } from "@/components/auth/AuthForm";

export const metadata: Metadata = { title: "Verify email" };

export default function Page() {
  return (
    <AuthShell title="Verify your email" subtitle="Enter the six-digit code we sent you.">
      <Suspense fallback={<div className="h-64" aria-hidden />}>
        <AuthForm mode="verify" />
      </Suspense>
      <p className="text-caption text-muted mt-8">
        Wrong address?{" "}
        <Link href="/signup" className="text-ink underline underline-offset-4">
          Start again
        </Link>
      </p>
    </AuthShell>
  );
}

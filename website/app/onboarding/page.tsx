import type { Metadata } from "next";
import { OnboardingFlow } from "@/components/auth/OnboardingFlow";

export const metadata: Metadata = { title: "Set up your workspace" };

export default function Page() {
  return <OnboardingFlow />;
}

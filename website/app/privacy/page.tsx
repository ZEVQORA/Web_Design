import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/LegalPage";

export const metadata: Metadata = { title: "Privacy" };

export default function Page() {
  return (
    <LegalPage
      title="Privacy"
      updated="Last updated 29 August 2026"
      intro="ZEVQORA is in private beta. This page describes how the website and the private beta handle information today, and it will be replaced by a full policy before general availability."
      sections={[
        {
          h: "What the website collects",
          p: [
            "This marketing site does not run advertising trackers and does not sell data. If you contact us or ask to become a design partner, we keep what you send so we can reply.",
          ],
        },
        {
          h: "What the product reads",
          p: [
            "ZEVQORA works from execution evidence: which model ran, for which unit of work, at what cost and how often. Design partners agree the scope of that evidence with us before anything is connected.",
            "The engine does not need your source code to do its job, and it does not deploy to your environment.",
          ],
        },
        {
          h: "Contact",
          p: ["Questions about privacy: hello@zevqora.com."],
        },
      ]}
    />
  );
}

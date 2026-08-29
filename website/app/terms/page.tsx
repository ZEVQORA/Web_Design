import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/LegalPage";

export const metadata: Metadata = { title: "Terms" };

export default function Page() {
  return (
    <LegalPage
      title="Terms"
      updated="Last updated 29 August 2026"
      intro="ZEVQORA is in private beta and is offered to design partners under a separate written agreement. These terms cover use of this website."
      sections={[
        {
          h: "The website",
          p: [
            "This site describes a product in private beta. Figures shown are either internal benchmarks, labelled as such, or illustrative examples. They are not customer results and not a performance guarantee.",
          ],
        },
        {
          h: "No guarantee of savings",
          p: [
            "Cost outcomes depend entirely on the workload. ZEVQORA measures, tests and verifies; it does not promise a particular saving, and it rejects changes that fail the verification gates you configure.",
          ],
        },
        {
          h: "Beta software",
          p: [
            "Access is granted at our discretion during the private beta and may change. Any commercial terms are set out in the agreement covering that access.",
          ],
        },
      ]}
    />
  );
}

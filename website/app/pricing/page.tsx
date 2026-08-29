import type { Metadata } from "next";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { PricingSection } from "@/components/marketing/PricingSection";
import { billing } from "@/config/billing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "ZEVQORA pricing is being set against real workloads with early design partners.",
};

const COMPARISON = [
  { row: "Workspaces", starter: "1", team: "Multiple", enterprise: "Custom" },
  { row: "Team seats", starter: "1", team: "Included", enterprise: "Custom" },
  { row: "Evidence connection", starter: "Yes", team: "Yes", enterprise: "Yes" },
  { row: "Spend graph and diagnosis", starter: "Yes", team: "Yes", enterprise: "Yes" },
  { row: "Replay and eval", starter: "Yes", team: "Yes", enterprise: "Yes" },
  { row: "Verification gates", starter: "Defaults", team: "Configurable", enterprise: "Custom" },
  { row: "Evidence retention", starter: "Standard", team: "Standard", enterprise: "By policy" },
  { row: "Usage credits", starter: "Included allowance", team: "Included allowance", enterprise: "Custom" },
  { row: "SSO and admin controls", starter: "—", team: "—", enterprise: "Yes" },
  { row: "Security review", starter: "—", team: "—", enterprise: "Yes" },
];

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <div className="py-20 lg:py-24">
          <div className="container-page">
            <p className="text-eyebrow text-muted uppercase">Pricing</p>
            <h1 className="text-h1 mt-6 max-w-[17ch]">
              We are setting pricing against real workloads.
            </h1>
            <p className="text-body-lg text-muted mt-7 max-w-[54ch]">
              {billing.note} Rather than publish a number we would have to
              change, the structure is shown here and the figure is a
              conversation.
            </p>
          </div>

          <div className="mt-14">
            <PricingSection heading={false} />
          </div>

          <div className="container-page mt-24">
            <h2 className="text-h2">What each plan carries</h2>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[44rem] border-collapse">
                <thead>
                  <tr className="border-b border-line">
                    <th className="text-technical font-mono text-subtle py-3 text-left font-medium uppercase">
                      Capability
                    </th>
                    <th className="text-technical font-mono text-subtle py-3 text-left font-medium uppercase">
                      Starter
                    </th>
                    <th className="text-technical font-mono text-subtle py-3 text-left font-medium uppercase">
                      Team
                    </th>
                    <th className="text-technical font-mono text-subtle py-3 text-left font-medium uppercase">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((c) => (
                    <tr key={c.row} className="border-b border-line">
                      <td className="text-caption text-ink py-4">{c.row}</td>
                      <td className="text-caption text-muted py-4">{c.starter}</td>
                      <td className="text-caption text-muted py-4">{c.team}</td>
                      <td className="text-caption text-muted py-4">
                        {c.enterprise}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-technical font-mono text-subtle mt-5">
              Plan structure, not final commercial terms.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

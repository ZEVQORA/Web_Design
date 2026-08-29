import { Section } from "./Section";

const ROLES = ["Technical founders", "CTOs", "Heads of AI", "AI platform teams"];

const FIT = [
  "Repeated LLM workloads rather than one-off calls",
  "Tasks whose output can actually be measured",
  "AI COGS large enough to be worth an engineer's week",
  "A quality bar you are unwilling to trade away",
];

export function WhoItIsFor() {
  return (
    <Section>
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-eyebrow text-muted uppercase">Who it is for</p>
            <h2 className="text-h2 mt-6 max-w-[16ch]">
              Teams whose AI bill is now an engineering problem.
            </h2>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {ROLES.map((r) => (
                <li key={r} className="text-caption text-muted">
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <ul className="border-t border-line">
            {FIT.map((f) => (
              <li key={f} className="text-body text-muted border-b border-line py-4">
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

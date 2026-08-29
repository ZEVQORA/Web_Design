import { Section } from "./Section";
import { MacbookReveal } from "./MacbookReveal";

export function ProductReveal() {
  return (
    <Section surface="ink" rule={false}>
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <h2 className="text-h1 max-w-[16ch]">
            One place where the evidence and the verdict live together.
          </h2>
          <p className="text-body text-muted max-w-[46ch]">
            The desktop app is where the loop runs: what was observed, where the
            spend went, which candidates exist, how they replayed, and which
            ones survived verification.
          </p>
        </div>
      </div>

      <div className="mt-16">
        <MacbookReveal />
      </div>

      <div className="container-page">
        <p className="text-technical font-mono text-subtle mt-8 text-center">
          Product preview with seeded demo data. Not a live workspace.
        </p>
      </div>
    </Section>
  );
}

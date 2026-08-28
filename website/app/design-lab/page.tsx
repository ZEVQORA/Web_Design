import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ZevqoraLogo } from "@/components/brand/ZevqoraLogo";
import { ZevqoraMark } from "@/components/brand/ZevqoraMark";
import { ZevqoraWordmark } from "@/components/brand/ZevqoraWordmark";
import { BrandLoader } from "@/components/brand/BrandLoader";
import { Button } from "@/components/ui/Button";

/** Never indexed, never linked from the public site. */
export const metadata: Metadata = { robots: { index: false, follow: false } };

const SWATCHES = [
  { name: "canvas", token: "--zq-canvas", cls: "bg-canvas" },
  { name: "surface", token: "--zq-surface", cls: "bg-surface" },
  { name: "ink", token: "--zq-fg", cls: "bg-ink" },
  { name: "muted", token: "--zq-fg-muted", cls: "bg-muted" },
  { name: "subtle", token: "--zq-fg-subtle", cls: "bg-subtle" },
  { name: "line", token: "--zq-border", cls: "bg-line" },
  { name: "line-strong", token: "--zq-border-strong", cls: "bg-line-strong" },
  { name: "accent", token: "--zq-accent", cls: "bg-accent" },
  { name: "accent-subtle", token: "--zq-accent-subtle", cls: "bg-accent-subtle" },
  { name: "verified", token: "--zq-verified", cls: "bg-verified" },
  { name: "rejected", token: "--zq-rejected", cls: "bg-rejected" },
  { name: "warning", token: "--zq-warning", cls: "bg-warning" },
];

const TYPE = [
  { name: "display", cls: "text-display", sample: "Cut AI COGS." },
  { name: "h1", cls: "text-h1", sample: "Cheaper is not enough." },
  { name: "h2", cls: "text-h2", sample: "Measure. Replay. Verify." },
  { name: "h3", cls: "text-h3", sample: "Verification report" },
  {
    name: "body-lg",
    cls: "text-body-lg",
    sample:
      "ZEVQORA finds expensive AI work and proves a cheaper execution path.",
  },
  {
    name: "body",
    cls: "text-body",
    sample: "Ship only what passes your configured quality floor.",
  },
  {
    name: "caption",
    cls: "text-caption text-muted",
    sample: "Internal 50-case dogfooding benchmark. Not customer evidence.",
  },
  {
    name: "eyebrow",
    cls: "text-eyebrow uppercase text-muted",
    sample: "AI cost optimization engineer",
  },
  {
    name: "technical",
    cls: "text-technical font-mono",
    sample: "run_8f2c41ab / sha256:9e3f...c1d0",
  },
];

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="rule py-14">
      <h2 className="text-eyebrow uppercase text-subtle mb-8">{title}</h2>
      {children}
    </section>
  );
}

export default function DesignLab() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <main id="main" className="container-page py-16">
      <header className="mb-4">
        <h1 className="text-h2">Design lab</h1>
        <p className="text-body text-muted mt-2 max-w-[60ch]">
          Development-only visual QA surface for the ZEVQORA design system. Not
          linked publicly and not indexed.
        </p>
      </header>

      <Section id="brand" title="Brand geometry">
        <div className="flex flex-wrap items-end gap-12">
          <div>
            <ZevqoraLogo size={40} />
            <p className="text-caption text-subtle mt-3">Lockup, 40px mark</p>
          </div>
          <div>
            <ZevqoraLogo size={24} />
            <p className="text-caption text-subtle mt-3">Lockup, 24px mark</p>
          </div>
          <div>
            <ZevqoraMark height={48} className="text-accent" />
            <p className="text-caption text-subtle mt-3">Mark, accent</p>
          </div>
          <div>
            <ZevqoraMark height={48} />
            <p className="text-caption text-subtle mt-3">Mark, ink</p>
          </div>
          <div>
            <ZevqoraWordmark height={20} />
            <p className="text-caption text-subtle mt-3">Wordmark</p>
          </div>
        </div>
        <div
          data-surface="ink"
          className="bg-canvas mt-8 flex flex-wrap items-center gap-10 rounded-lg p-8"
        >
          <ZevqoraLogo size={40} />
          <ZevqoraMark height={40} className="text-ink" />
          <p className="text-caption text-muted">
            Inverted section, driven entirely by data-surface
          </p>
        </div>
      </Section>

      <Section id="color" title="Colour tokens">
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3 lg:grid-cols-4">
          {SWATCHES.map((s) => (
            <div key={s.name} className="flex items-center gap-3">
              <div
                className={`h-11 w-11 rounded-sm border border-line ${s.cls}`}
              />
              <div className="min-w-0">
                <div className="text-caption text-ink">{s.name}</div>
                <div className="text-technical font-mono text-subtle truncate">
                  {s.token}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="type" title="Type scale">
        <div className="space-y-7">
          {TYPE.map((t) => (
            <div
              key={t.name}
              className="grid gap-2 lg:grid-cols-[8rem_1fr] lg:gap-8"
            >
              <div className="text-technical font-mono text-subtle pt-2">
                {t.name}
              </div>
              <div className={t.cls}>{t.sample}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="buttons" title="Buttons">
        <div className="space-y-6">
          {(["primary", "secondary", "ghost"] as const).map((v) => (
            <div key={v} className="flex flex-wrap items-center gap-4">
              <span className="text-technical font-mono text-subtle w-24">
                {v}
              </span>
              <Button variant={v} size="sm">
                Get ZEVQORA
              </Button>
              <Button variant={v} size="md">
                Get ZEVQORA
              </Button>
              <Button variant={v} size="lg">
                Get ZEVQORA
              </Button>
              <Button variant={v} disabled>
                Disabled
              </Button>
            </div>
          ))}
          <p className="text-caption text-muted">
            Tab through these to check the single focus treatment.
          </p>
        </div>
      </Section>

      <Section id="status" title="Status">
        <div className="flex flex-wrap gap-3">
          <span className="text-technical font-mono inline-flex items-center gap-2 rounded-sm bg-verified-bg px-2.5 py-1.5 text-verified">
            VERIFIED
          </span>
          <span className="text-technical font-mono inline-flex items-center gap-2 rounded-sm bg-rejected-bg px-2.5 py-1.5 text-rejected">
            REJECTED
          </span>
          <span className="text-technical font-mono inline-flex items-center gap-2 rounded-sm bg-warning-bg px-2.5 py-1.5 text-warning">
            NOT CONFIGURED
          </span>
        </div>
      </Section>

      <Section id="loader" title="Loader">
        <div className="flex flex-wrap items-center gap-10">
          <div className="rounded-lg border border-line bg-surface px-16 py-10">
            <BrandLoader delayMs={0} />
          </div>
          <p className="text-caption text-muted max-w-[46ch]">
            Opacity-only pulse, so the locked mark geometry is never scaled or
            spun. In real use it waits 300ms before fading in, so a fast route
            never flashes a loader.
          </p>
        </div>
      </Section>

      <Section id="radius" title="Radius and depth">
        <div className="flex flex-wrap gap-6">
          <div className="text-center">
            <div className="h-24 w-24 rounded-sm border border-line bg-surface" />
            <div className="text-technical font-mono text-subtle mt-2">
              rounded-sm
            </div>
          </div>
          <div className="text-center">
            <div className="h-24 w-24 rounded-md border border-line bg-surface" />
            <div className="text-technical font-mono text-subtle mt-2">
              rounded-md
            </div>
          </div>
          <div className="text-center">
            <div className="h-24 w-24 rounded-lg border border-line bg-surface" />
            <div className="text-technical font-mono text-subtle mt-2">
              rounded-lg
            </div>
          </div>
          <div className="text-center">
            <div className="h-24 w-24 rounded-md bg-surface shadow-lift" />
            <div className="text-technical font-mono text-subtle mt-2">
              shadow-lift
            </div>
          </div>
          <div className="text-center">
            <div className="h-24 w-24 rounded-md bg-surface shadow-panel" />
            <div className="text-technical font-mono text-subtle mt-2">
              shadow-panel
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}

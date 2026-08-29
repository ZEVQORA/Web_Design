import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: Array<{ h: string; p: string[] }>;
}) {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <div className="container-page py-20 lg:py-28">
          <div className="max-w-[62ch]">
            <h1 className="text-h1">{title}</h1>
            <p className="text-technical font-mono text-subtle mt-4">{updated}</p>
            <p className="text-body-lg text-muted mt-8">{intro}</p>

            {sections.map((s) => (
              <section key={s.h} className="mt-14 border-t border-line pt-8">
                <h2 className="text-h3">{s.h}</h2>
                {s.p.map((para) => (
                  <p key={para} className="text-body text-muted mt-4">
                    {para}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

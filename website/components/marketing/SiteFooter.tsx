import Link from "next/link";
import { ZevqoraLogo } from "@/components/brand/ZevqoraLogo";
import { site } from "@/config/site";

export function SiteFooter() {
  return (
    <footer data-surface="ink" className="bg-canvas">
      <div className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <ZevqoraLogo variant="inverse" size={26} />
            <p className="text-caption text-muted mt-5 max-w-[34ch]">
              An AI cost optimization engineer for AI products. Measure, replay,
              verify, then optimize.
            </p>
          </div>

          {Object.entries(site.footer).map(([group, links]) => (
            <nav key={group} aria-label={group}>
              <h2 className="text-eyebrow text-subtle uppercase">{group}</h2>
              <ul className="mt-5 flex flex-col gap-3">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-caption text-muted hover:text-ink transition-control rounded-sm"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-technical font-mono text-subtle">
            ZEVQORA is in private beta. Figures shown on this site are internal
            benchmarks or illustrative examples, never customer results.
          </p>
        </div>
      </div>
    </footer>
  );
}

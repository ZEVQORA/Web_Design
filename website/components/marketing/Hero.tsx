import { ButtonLink } from "@/components/ui/Button";
import { ZevScene } from "@/components/brand/zev/ZevScene";
import { site } from "@/config/site";
import { EvidenceTape } from "./EvidenceTape";

/**
 * LEDGER EDGE.
 *
 * The composition is asymmetric on purpose: the statement holds the left and
 * the evidence stream runs down the right, fading off at both ends so it reads
 * as a continuing record the page has been cut into. Zev sits at the foot of
 * the stream, watching the work - which is the product's job - rather than
 * decorating the page.
 *
 * Zev is never mirrored. Flipping the sprite also flips the Z medallion on his
 * collar, which turns the mark backwards.
 *
 * Everything that matters is server-rendered: the headline and both calls to
 * action are in the HTML before any JavaScript runs, so the hero never waits on
 * the tape's entrance or on Zev's pointer response.
 */
export function Hero() {
  return (
    <section className="border-b border-line">
      <div className="container-page grid gap-14 py-16 lg:grid-cols-12 lg:gap-10 lg:py-20">
        <div className="lg:col-span-6 lg:self-center">
          <p className="text-eyebrow text-muted uppercase">{site.tagline}</p>

          <h1 className="text-display mt-6 max-w-[12ch]">
            Cut AI COGS.
            <br />
            Keep the quality.
          </h1>

          <p className="text-body-lg text-muted mt-7 max-w-[46ch]">
            ZEVQORA finds expensive AI work, tests cheaper ways to run it, and
            rejects changes that fail your verification gates.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <ButtonLink href={site.primaryCta.href} size="lg">
              {site.primaryCta.label}
            </ButtonLink>
            <a
              href={site.secondaryCta.href}
              className="text-button text-muted hover:text-ink transition-control rounded-sm underline-offset-4 hover:underline"
            >
              {site.secondaryCta.label}
            </a>
          </div>

          <p className="text-technical font-mono text-subtle mt-8 max-w-[52ch]">
            Never optimize blindly. Measure. Replay. Verify. Then optimize.
          </p>
        </div>

        {/* The evidence edge. */}
        <div className="relative lg:col-span-6 lg:pl-10">
          <EvidenceTape />

          {/* Zev sits at the foot of the stream, tucked against it rather than
              floating in the margin. */}
          <div className="pointer-events-none mt-2 flex justify-center lg:justify-end lg:pr-4 xl:-mt-6">
            <ZevScene view="three-quarter-front" height={200} priority />
          </div>
        </div>
      </div>
    </section>
  );
}

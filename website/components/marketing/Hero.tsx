import { ButtonLink } from "@/components/ui/Button";
import { ZevScene } from "@/components/brand/zev/ZevScene";
import { ZevMoodTrigger } from "@/components/brand/zev/ZevMoodTrigger";
import { ZevMoodProvider } from "@/components/brand/zev/ZevMoodContext";
import { site } from "@/config/site";
import { EvidenceInstrument } from "./EvidenceInstrument";

/**
 * LEDGER EDGE, built as a lit composition rather than a two-column split.
 *
 * The statement holds the left. The execution instrument floats on the right,
 * off its own ambient shadow, and Zev sits in front of its lower corner so the
 * two occupy different depths - that overlap is what stops the right side
 * reading as a flat panel beside text.
 *
 * Everything load-bearing is server-rendered: the headline, both calls to
 * action and every ledger row are in the HTML before any JavaScript. Zev's
 * reactions and the pointer response are enhancements on top of a sprite that
 * is already painted.
 */
export function Hero() {
  return (
    <section className="studio relative overflow-hidden border-b border-line">
      <ZevMoodProvider>
      <div className="container-wide grid items-center gap-16 py-16 lg:grid-cols-12 lg:gap-10 lg:py-20">
        <div className="lg:col-span-5">
          <p className="text-eyebrow text-muted uppercase">{site.tagline}</p>

          <h1 className="text-display mt-6 max-w-[13ch]">
            Cut AI COGS.
            <br />
            Keep the <span className="text-accent-text">quality.</span>
          </h1>

          <p className="text-body-lg text-muted mt-7 max-w-[42ch]">
            ZEVQORA finds expensive AI work, tests cheaper ways to run it, and
            rejects changes that fail your verification gates.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-4">
            <ZevMoodTrigger mood="delighted" className="inline-flex">
              <ButtonLink href={site.primaryCta.href} size="lg">
                {site.primaryCta.label}
              </ButtonLink>
            </ZevMoodTrigger>

            <ZevMoodTrigger mood="curious" className="inline-flex">
              <a
                href={site.secondaryCta.href}
                className="text-button text-muted hover:text-ink transition-control border-line-control hover:border-line-strong inline-flex h-12 items-center rounded-md border px-5"
              >
                {site.secondaryCta.label}
              </a>
            </ZevMoodTrigger>
          </div>

          <p className="text-technical font-mono text-subtle mt-9 max-w-[46ch]">
            Never optimize blindly. Measure. Replay. Verify. Then optimize.
          </p>
        </div>

        {/* The instrument, and Zev in front of it. */}
        <div className="relative lg:col-span-7 lg:pl-10">
          <EvidenceInstrument />

          {/* Zev overlaps the instrument's lower corner, so the two sit at
              different depths instead of side by side on one plane. */}
          <div className="pointer-events-none mt-2 flex justify-center lg:absolute lg:-bottom-20 lg:-left-24 lg:mt-0 lg:block">
            <ZevScene height={210} priority />
          </div>
        </div>
      </div>
      </ZevMoodProvider>
    </section>
  );
}

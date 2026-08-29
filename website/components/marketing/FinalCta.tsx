import { ButtonLink } from "@/components/ui/Button";
import { Zev } from "@/components/brand/zev/Zev";
import { site } from "@/config/site";
import { Section } from "./Section";

export function FinalCta() {
  return (
    <Section>
      <div className="container-page">
        <div className="grid items-end gap-12 lg:grid-cols-[1.3fr_auto]">
          <div>
            <h2 className="text-display max-w-[12ch]">Make AI lighter.</h2>
            <p className="text-body-lg text-muted mt-8 max-w-[38ch]">
              Connect the evidence. Find the waste. Verify the fix.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <ButtonLink href={site.primaryCta.href} size="lg">
                {site.primaryCta.label}
              </ButtonLink>
              <a
                href="mailto:hello@zevqora.com"
                className="text-button text-muted hover:text-ink transition-control rounded-sm underline-offset-4 hover:underline"
              >
                Talk to us
              </a>
            </div>
          </div>

          <div className="hidden justify-end lg:flex">
            <Zev view="pose-waving" height={190} />
          </div>
        </div>
      </div>
    </Section>
  );
}

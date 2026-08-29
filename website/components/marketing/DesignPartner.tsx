import { ButtonLink } from "@/components/ui/Button";
import { Section } from "./Section";

/**
 * The honest ask.
 *
 * ZEVQORA is a working MVP with internal proof and no external validation yet,
 * so the call to action is for exactly that: one bounded workload to measure
 * against. No claim of existing partners, paying or otherwise.
 */
export function DesignPartner() {
  return (
    <Section surface="ink" rule={false}>
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <p className="text-eyebrow text-muted uppercase">Design partners</p>
            <h2 className="text-h1 mt-6 max-w-[15ch]">
              Bring one expensive AI workflow.
            </h2>
            <p className="text-body-lg text-muted mt-7 max-w-[46ch]">
              We measure the baseline, test alternatives, replay the workload,
              and keep the change only if verification passes. If nothing passes,
              you keep the measurements and we keep the lesson.
            </p>
            <div className="mt-9">
              <ButtonLink href="/signup?next=/onboarding" size="lg">
                Become a design partner
              </ButtonLink>
            </div>
          </div>

          <div className="border-t border-line pt-8 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
            <p className="text-eyebrow text-subtle uppercase">Where we are</p>
            <ul className="mt-6 flex flex-col gap-4">
              <li className="text-body text-muted">
                A working MVP, in private beta.
              </li>
              <li className="text-body text-muted">
                Internal proof on our own dogfooding benchmark.
              </li>
              <li className="text-body text-muted">
                External validation is the next step, and it has not happened
                yet.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}

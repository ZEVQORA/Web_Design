import type { Metadata } from "next";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import {
  DownloadPanel,
  InstallSteps,
} from "@/components/marketing/DownloadPanel";
import { ButtonLink } from "@/components/ui/Button";
import { Zev } from "@/components/brand/zev/Zev";
import { downloadConfig } from "@/config/download";

export const metadata: Metadata = {
  title: "Download",
  description:
    "Install the ZEVQORA desktop app and connect one workload of real execution evidence.",
};

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <div className="container-page py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_auto] lg:items-end">
            <div>
              <p className="text-eyebrow text-muted uppercase">
                Desktop app · {downloadConfig.channel}
              </p>
              <h1 className="text-h1 mt-6 max-w-[16ch]">
                Run ZEVQORA where your evidence is.
              </h1>
              <p className="text-body-lg text-muted mt-7 max-w-[48ch]">
                ZEVQORA is a desktop application. It reads execution evidence
                from your runtime, and the analysis stays on the machine you run
                it on.
              </p>
            </div>
            <div className="hidden lg:block">
              <Zev view="pose-waving" height={170} />
            </div>
          </div>

          <div className="mt-14">
            <DownloadPanel />
          </div>

          <div className="mt-10 border border-line bg-surface p-8">
            <p className="text-eyebrow text-muted uppercase">
              While the beta is closed
            </p>
            <p className="text-body text-muted mt-4 max-w-[58ch]">
              Builds are not published yet. If you have one expensive AI
              workflow you want measured, that is exactly what we are looking
              for right now.
            </p>
            <div className="mt-7">
              <ButtonLink href="/signup?next=/onboarding" size="lg">
                Become a design partner
              </ButtonLink>
            </div>
          </div>

          <div className="mt-20 grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <h2 className="text-h2">What happens after install</h2>
              <InstallSteps className="mt-8" />
            </div>
            <div>
              <h2 className="text-h2">Signing and integrity</h2>
              <p className="text-body text-muted mt-8 max-w-[46ch]">
                {downloadConfig.signing}
              </p>
              <dl className="mt-8 border-t border-line">
                <div className="flex justify-between gap-4 border-b border-line py-4">
                  <dt className="text-caption text-muted">Version</dt>
                  <dd className="text-technical font-mono text-ink">
                    {downloadConfig.version ?? "not published"}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-line py-4">
                  <dt className="text-caption text-muted">Release notes</dt>
                  <dd className="text-technical font-mono text-ink">
                    {downloadConfig.releaseNotes ?? "with first release"}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-line py-4">
                  <dt className="text-caption text-muted">Channel</dt>
                  <dd className="text-technical font-mono text-ink">
                    {downloadConfig.channel}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

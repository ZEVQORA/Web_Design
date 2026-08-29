"use client";

import { useSyncExternalStore } from "react";
import { Apple, Monitor } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { downloadConfig, isBuildAvailable, type Build } from "@/config/download";
import { cn } from "@/lib/cn";

/**
 * Build list, with the visitor's platform brought to the front.
 *
 * No build URLs exist yet, so nothing here offers a link that would 404 and
 * nothing implies a file is waiting. The unavailable state is designed, not an
 * afterthought: it says what will happen and gives the visitor the action that
 * is actually available today.
 */
const subscribeNever = () => () => {};

function detectOs(): Build["os"] | null {
  const ua = navigator.userAgent;
  if (/Mac/i.test(ua)) return "macOS";
  if (/Win/i.test(ua)) return "Windows";
  return null;
}

export function DownloadPanel() {
  // Read straight from the browser rather than mirroring it into state inside
  // an effect: the server snapshot is null, so the markup is stable through
  // hydration and the platform hint appears without a second render pass.
  const detected = useSyncExternalStore(subscribeNever, detectOs, () => null);

  const ordered = [...downloadConfig.builds].sort((a, b) =>
    a.os === detected ? -1 : b.os === detected ? 1 : 0,
  );

  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line shadow-[0_2px_6px_rgb(15_17_21/0.04),0_24px_64px_-32px_rgb(15_17_21/0.14)] sm:grid-cols-2">
      {ordered.map((b) => {
        const available = isBuildAvailable(b);
        const Icon = b.os === "macOS" ? Apple : Monitor;
        return (
          <div key={b.os} className="bg-raised flex flex-col p-8">
            <div className="flex items-center gap-3">
              <Icon size={18} className="text-muted" aria-hidden />
              <h2 className="text-h3">{b.os}</h2>
              {detected === b.os && (
                <span className="text-technical font-mono text-accent uppercase">
                  your platform
                </span>
              )}
            </div>

            <dl className="mt-6 flex flex-col gap-2">
              <div className="flex justify-between gap-4">
                <dt className="text-technical font-mono text-subtle uppercase">
                  Architecture
                </dt>
                <dd className="text-technical font-mono text-muted">{b.arch}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-technical font-mono text-subtle uppercase">
                  Requires
                </dt>
                <dd className="text-technical font-mono text-muted">
                  {b.requirement}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-technical font-mono text-subtle uppercase">
                  Checksum
                </dt>
                <dd className="text-technical font-mono text-muted">
                  {b.checksum ?? "published with the build"}
                </dd>
              </div>
            </dl>

            <div className="mt-8">
              {available ? (
                <ButtonLink href={b.url ?? "#"} className="w-full">
                  Download for {b.os}
                </ButtonLink>
              ) : (
                <>
                  <Button disabled className="w-full">
                    Build not published yet
                  </Button>
                  <p className="text-technical font-mono text-subtle mt-3">
                    {downloadConfig.channel} · no installer is available to
                    download today
                  </p>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function InstallSteps({ className }: { className?: string }) {
  const steps = [
    "Install the desktop app on the machine that can reach your runtime evidence.",
    "Connect one workload and let ZEVQORA observe real execution.",
    "Review the spend graph and the first diagnosis.",
    "Replay a candidate and read the verdict before anything changes.",
  ];
  return (
    <ol className={cn("border-t border-line", className)}>
      {steps.map((s, i) => (
        <li
          key={s}
          className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-line py-4"
        >
          <span className="text-technical font-mono text-subtle tabular-nums">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="text-body text-muted">{s}</span>
        </li>
      ))}
    </ol>
  );
}

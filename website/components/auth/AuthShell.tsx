import Link from "next/link";
import type { ReactNode } from "react";
import { ZevqoraLogo } from "@/components/brand/ZevqoraLogo";
import { Zev } from "@/components/brand/zev/Zev";

/**
 * The auth surface.
 *
 * A split composition: the form holds the left at a comfortable measure, and
 * the right carries a quiet restatement of what the product does. No testimonial,
 * no giant illustration - Zev appears small, once, as a presence rather than a
 * mascot moment.
 */
export function AuthShell({
  title,
  subtitle,
  children,
  footer,
  aside,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <main id="main" className="studio min-h-dvh lg:grid lg:grid-cols-[1fr_1fr]">
      <div className="flex flex-col px-6 py-10 lg:px-14 lg:py-14">
        <Link href="/" aria-label="ZEVQORA home" className="inline-flex w-fit rounded-sm">
          <ZevqoraLogo size={26} />
        </Link>

        <div className="mx-auto flex w-full max-w-[26rem] flex-1 flex-col justify-center py-14">
          <h1 className="text-h2">{title}</h1>
          {subtitle && (
            <p className="text-body text-muted mt-3 max-w-[38ch]">{subtitle}</p>
          )}
          <div className="mt-9">{children}</div>
          {footer && <div className="mt-8">{footer}</div>}
        </div>
      </div>

      <div
        data-surface="ink"
        className="bg-canvas hidden flex-col justify-between px-14 py-14 lg:flex"
      >
        <p className="text-eyebrow text-subtle uppercase">
          AI cost optimization engineer
        </p>

        <div>
          {aside ?? (
            <>
              <p className="text-h2 max-w-[16ch]">
                Never optimize blindly.
              </p>
              <p className="text-body text-muted mt-6 max-w-[40ch]">
                Measure. Replay. Verify. Then optimize. ZEVQORA rejects changes
                that fail your verification gates, including the ones that would
                have saved the most.
              </p>
            </>
          )}
        </div>

        <div className="flex items-end justify-between">
          <Zev view="pose-sitting" height={150} />
          <p className="text-technical font-mono text-subtle max-w-[26ch] text-right">
            Private beta
          </p>
        </div>
      </div>
    </main>
  );
}

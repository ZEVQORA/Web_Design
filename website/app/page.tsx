import { SiteHeader } from "@/components/marketing/SiteHeader";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="container-page">
        {/* Phase 2 replaces this with the hero. */}
        <div className="flex min-h-[70vh] flex-col justify-center">
          <p className="text-eyebrow uppercase text-muted">
            AI cost optimization engineer
          </p>
          <h1 className="text-display mt-6 max-w-[14ch]">
            Cut AI COGS.
            <br />
            Keep the quality.
          </h1>
          <p className="text-body-lg text-muted mt-8 max-w-[52ch]">
            ZEVQORA finds expensive AI work, tests cheaper ways to run it, and
            rejects changes that fail your verification gates.
          </p>
        </div>
      </main>
    </>
  );
}

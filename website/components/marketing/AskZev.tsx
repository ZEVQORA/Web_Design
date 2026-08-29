import { ASK_ZEV_ANSWER, ASK_ZEV_QUESTIONS } from "@/data/product-demo";
import { ZevFace } from "@/components/brand/zev/ZevFace";
import { Section } from "./Section";

/**
 * Ask Zev.
 *
 * Product-native, not a general assistant: every answer is grounded in the
 * workspace's own evidence and cites the run it came from. Zev appears here as
 * a guide rather than decoration - this is the one place on the page where he
 * is doing a job for the reader.
 */
export function AskZev() {
  return (
    <Section>
      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-eyebrow text-muted uppercase">Ask Zev</p>
            <h2 className="text-h1 mt-6 max-w-[15ch]">
              Ask about your own evidence.
            </h2>
            <p className="text-body-lg text-muted mt-7 max-w-[42ch]">
              Zev answers from the workspace&rsquo;s own runs and cites what it
              used. It is not a general chatbot bolted to the side of a
              dashboard.
            </p>

            <ul className="mt-9 flex flex-col gap-2.5">
              {ASK_ZEV_QUESTIONS.map((q) => (
                <li
                  key={q}
                  className="text-caption text-muted border-line bg-raised rounded-md border px-4 py-3 shadow-[0_1px_2px_rgb(15_17_21/0.04)]"
                >
                  {q}
                </li>
              ))}
            </ul>
          </div>

          <div className="plane rounded-lg p-8 lg:p-10">
            <div className="flex items-start gap-4">
              <ZevFace expression="focused" size={44} />
              <p className="text-caption text-ink pt-2">
                {ASK_ZEV_ANSWER.question}
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-4">
              {ASK_ZEV_ANSWER.lines.map((l) => (
                <p key={l} className="text-body text-muted max-w-[52ch]">
                  {l}
                </p>
              ))}
            </div>
            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-2 border-t border-line pt-5">
              {ASK_ZEV_ANSWER.citations.map((c) => (
                <div key={c.label} className="flex items-baseline gap-2">
                  <dt className="text-technical font-mono text-subtle uppercase">
                    {c.label}
                  </dt>
                  <dd className="text-technical font-mono text-ink">{c.value}</dd>
                </div>
              ))}
            </dl>
            <p className="text-technical font-mono text-subtle mt-5">
              Illustrative answer over demo data.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

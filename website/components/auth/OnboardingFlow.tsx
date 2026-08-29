"use client";

import { useState } from "react";
import Link from "next/link";
import { ZevqoraLogo } from "@/components/brand/ZevqoraLogo";
import { Zev } from "@/components/brand/zev/Zev";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Field";
import { cn } from "@/lib/cn";

const STACKS = ["OpenAI", "Anthropic", "Google", "Open weights", "Mixed"];
const GOALS = [
  "Cut cost on a known expensive workload",
  "Find where the AI spend actually goes",
  "Prove a cheaper path is safe before shipping it",
];

const STEPS = ["Workspace", "Stack", "Goal"];

/**
 * Onboarding.
 *
 * Three steps, because the questions genuinely fall into three groups, and a
 * step marker is honest information rather than decoration. Nothing is sent
 * anywhere - this is the designed flow, and the final step says so.
 */
export function OnboardingFlow() {
  const [step, setStep] = useState(0);
  const [stack, setStack] = useState<string | null>(null);
  const [goal, setGoal] = useState<string | null>(null);
  const [workspace, setWorkspace] = useState("");

  const canContinue =
    step === 0 ? workspace.trim().length > 1 : step === 1 ? Boolean(stack) : Boolean(goal);

  return (
    <main id="main" className="min-h-dvh">
      <header className="container-page flex items-center justify-between py-8">
        <Link href="/" aria-label="ZEVQORA home" className="rounded-sm">
          <ZevqoraLogo size={26} />
        </Link>
        <ol className="flex items-center gap-3">
          {STEPS.map((s, i) => (
            <li key={s} className="flex items-center gap-3">
              <span
                className={cn(
                  "text-technical font-mono",
                  i === step ? "text-ink" : "text-subtle",
                )}
                aria-current={i === step ? "step" : undefined}
              >
                {String(i + 1).padStart(2, "0")} {s}
              </span>
              {i < STEPS.length - 1 && (
                <span aria-hidden className="bg-line h-px w-6" />
              )}
            </li>
          ))}
        </ol>
      </header>

      <div className="container-page grid gap-16 py-14 lg:grid-cols-[1fr_auto] lg:py-24">
        <div className="max-w-[34rem]">
          {step === 0 && (
            <>
              <h1 className="text-h1">Name your workspace.</h1>
              <p className="text-body text-muted mt-5 max-w-[42ch]">
                A workspace holds one product&rsquo;s evidence, its diagnoses and
                its verified changes.
              </p>
              <div className="mt-10">
                <Field id="workspace" label="Workspace name" hint="You can change this later.">
                  <Input
                    id="workspace"
                    value={workspace}
                    onChange={(e) => setWorkspace(e.target.value)}
                    placeholder="Acme AI"
                    autoFocus
                  />
                </Field>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h1 className="text-h1">Which models do you run?</h1>
              <p className="text-body text-muted mt-5 max-w-[42ch]">
                This shapes which cheaper execution paths are worth testing.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                {STACKS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStack(s)}
                    aria-pressed={stack === s}
                    className={cn(
                      "text-caption transition-control rounded-md border px-4 py-2.5",
                      stack === s
                        ? "border-accent bg-accent-subtle text-accent"
                        : "border-line-control text-muted hover:text-ink",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="text-h1">What are you optimizing for?</h1>
              <p className="text-body text-muted mt-5 max-w-[42ch]">
                ZEVQORA will start from the evidence that matters to this goal.
              </p>
              <div className="mt-10 flex flex-col gap-3">
                {GOALS.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGoal(g)}
                    aria-pressed={goal === g}
                    className={cn(
                      "text-caption transition-control rounded-md border px-4 py-3.5 text-left",
                      goal === g
                        ? "border-accent bg-accent-subtle text-accent"
                        : "border-line-control text-muted hover:text-ink",
                    )}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </>
          )}

          <div className="mt-12 flex items-center gap-4">
            {step > 0 && (
              <Button variant="secondary" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            )}
            {step < 2 ? (
              <Button onClick={() => setStep(step + 1)} disabled={!canContinue}>
                Continue
              </Button>
            ) : (
              <Button disabled={!canContinue} aria-disabled={!canContinue}>
                Finish setup
              </Button>
            )}
          </div>

          {step === 2 && (
            <p className="text-technical font-mono text-subtle mt-6 max-w-[46ch]">
              Design build — no workspace is created and nothing is submitted.
            </p>
          )}
        </div>

        <div className="hidden items-end lg:flex">
          <Zev view={step === 2 ? "pose-waving" : "pose-thinking"} height={220} />
        </div>
      </div>
    </main>
  );
}

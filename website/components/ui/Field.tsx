import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * A labelled form control.
 *
 * The label is always a real <label> bound to the input, and an error is
 * associated through aria-describedby and announced, rather than being a red
 * line of text floating next to the field.
 */
export function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-caption text-ink">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p id={id + "-hint"} className="text-technical font-mono text-subtle">
          {hint}
        </p>
      )}
      {error && (
        <p
          id={id + "-error"}
          role="alert"
          className="text-technical font-mono text-rejected"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export function Input({
  className,
  invalid,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  return (
    <input
      {...props}
      aria-invalid={invalid || undefined}
      className={cn(
        "bg-surface text-body h-11 w-full rounded-md border px-3.5 transition-control",
        "placeholder:text-subtle",
        invalid ? "border-rejected" : "border-line-control",
        className,
      )}
    />
  );
}

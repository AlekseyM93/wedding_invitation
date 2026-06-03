import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const textareaId = id ?? props.name;

    return (
      <div className="space-y-2">
        {label ? (
          <label
            htmlFor={textareaId}
            className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-wedding-brown/70"
          >
            {label}
          </label>
        ) : null}
        <textarea
          ref={ref}
          id={textareaId}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            error && textareaId ? `${textareaId}-error` : undefined
          }
          className={cn(
            "min-h-32 w-full resize-none rounded-2xl border border-wedding-line bg-white/70 px-5 py-4 text-base text-wedding-ink outline-none transition",
            "placeholder:text-wedding-ink/35",
            "focus:border-wedding-gold focus:ring-4 focus:ring-wedding-gold/15",
            error && "border-red-300 focus:border-red-400 focus:ring-red-100",
            className,
          )}
          {...props}
        />
        {error ? (
          <p
            id={textareaId ? `${textareaId}-error` : undefined}
            className="text-sm text-red-600"
            role="alert"
          >
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id ?? props.name;

    return (
      <div className="space-y-2">
        {label ? (
          <label
            htmlFor={inputId}
            className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-wedding-brown/70"
          >
            {label}
          </label>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error && inputId ? `${inputId}-error` : undefined}
          className={cn(
            "h-14 w-full rounded-2xl border border-wedding-line bg-white/70 px-5 text-base text-wedding-ink outline-none transition",
            "placeholder:text-wedding-ink/35",
            "focus:border-wedding-gold focus:ring-4 focus:ring-wedding-gold/15",
            error && "border-red-300 focus:border-red-400 focus:ring-red-100",
            className,
          )}
          {...props}
        />
        {error ? (
          <p id={inputId ? `${inputId}-error` : undefined} className="text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";

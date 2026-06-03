import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, id, children, ...props }, ref) => {
    const selectId = id ?? props.name;

    return (
      <div className="space-y-2">
        {label ? (
          <label
            htmlFor={selectId}
            className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-wedding-brown/70"
          >
            {label}
          </label>
        ) : null}
        <select
          ref={ref}
          id={selectId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error && selectId ? `${selectId}-error` : undefined}
          className={cn(
            "h-14 w-full appearance-none rounded-2xl border border-wedding-line bg-white/70 px-5 text-base text-wedding-ink outline-none transition",
            "focus:border-wedding-gold focus:ring-4 focus:ring-wedding-gold/15",
            error && "border-red-300 focus:border-red-400 focus:ring-red-100",
            className,
          )}
          {...props}
        >
          {children}
        </select>
        {error ? (
          <p id={selectId ? `${selectId}-error` : undefined} className="text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

Select.displayName = "Select";

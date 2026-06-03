import { cn } from "@/lib/utils";

type SectionCurveProps = {
  className?: string;
};

export function SectionCurve({ className }: SectionCurveProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute left-1/2 top-0 h-40 w-[min(88vw,960px)] -translate-x-1/2 rounded-b-[999px] border-b border-wedding-line/80",
        className,
      )}
      aria-hidden="true"
    />
  );
}
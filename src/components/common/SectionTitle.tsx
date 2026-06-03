import { cn } from "@/lib/utils";

type SectionTitleProps = {
  kicker?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionTitle({
  kicker,
  title,
  text,
  align = "center",
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "mx-auto max-w-3xl",
        align === "center" ? "text-center" : "text-left",
        className,
      )}
    >
      {kicker ? <p className="wedding-kicker mb-5">{kicker}</p> : null}

      <h2 className="wedding-title text-wedding-ink">{title}</h2>

      {text ? (
        <p className="wedding-text mx-auto mt-5 max-w-2xl sm:mt-7">{text}</p>
      ) : null}
    </div>
  );
}
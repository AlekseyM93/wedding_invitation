import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

type DecorativeHeartProps = {
  className?: string;
  variant?: "default" | "accent" | "hero";
  iconSize?: number;
};

const variantStyles = {
  default:
    "border-wedding-line bg-wedding-pearl text-wedding-gold shadow-card",
  accent:
    "border-wedding-gold/75 bg-white/95 text-wedding-brown shadow-[0_6px_28px_rgba(107,79,58,0.16)] ring-1 ring-wedding-gold/30",
  hero: "border-white/35 bg-white/12 text-white shadow-[0_4px_20px_rgba(0,0,0,.2)]",
} as const;

export function DecorativeHeart({
  className,
  variant = "default",
  iconSize,
}: DecorativeHeartProps) {
  const resolvedIconSize =
    iconSize ?? (variant === "accent" ? 22 : variant === "hero" ? 18 : 18);

  return (
    <div
      className={cn(
        "mx-auto flex h-12 w-12 items-center justify-center rounded-full border",
        variantStyles[variant],
        className,
      )}
      aria-hidden="true"
    >
      <Heart size={resolvedIconSize} strokeWidth={variant === "accent" ? 1.65 : 1.4} />
    </div>
  );
}

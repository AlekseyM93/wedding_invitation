import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

type DecorativeHeartProps = {
  className?: string;
};

export function DecorativeHeart({ className }: DecorativeHeartProps) {
  return (
    <div
      className={cn(
        "mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-wedding-line bg-wedding-pearl text-wedding-gold shadow-card",
        className,
      )}
      aria-hidden="true"
    >
      <Heart size={18} strokeWidth={1.4} />
    </div>
  );
}
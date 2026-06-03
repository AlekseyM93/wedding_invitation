import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "luxury-card rounded-luxury p-8 md:p-10",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
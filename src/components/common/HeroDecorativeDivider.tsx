import { DecorativeHeart } from "@/components/common/DecorativeHeart";

export function HeroDecorativeDivider() {
  return (
    <div
      className="mt-5 flex w-full max-w-xs items-center justify-center gap-3 sm:mt-6 sm:max-w-sm sm:gap-4 md:mt-8"
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-white/35" />
      <DecorativeHeart variant="hero" className="h-10 w-10 sm:h-11 sm:w-11" />
      <span className="h-px flex-1 bg-white/35" />
    </div>
  );
}

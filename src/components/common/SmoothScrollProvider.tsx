"use client";

import Lenis from "lenis";
import { ReactNode, useEffect } from "react";

type SmoothScrollProviderProps = {
  children: ReactNode;
};

function shouldUseSmoothScroll() {
  if (typeof window === "undefined") {
    return false;
  }

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const narrowViewport = window.matchMedia("(max-width: 1024px)").matches;

  return !prefersReducedMotion && !coarsePointer && !narrowViewport;
}

export function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
  useEffect(() => {
    if (!shouldUseSmoothScroll()) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    let rafId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

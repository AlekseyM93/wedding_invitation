"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { weddingData } from "@/data/wedding";
import { ScrollHint } from "@/components/common/ScrollHint";
import { HeroDecorativeDivider } from "@/components/common/HeroDecorativeDivider";

export function HeroSection() {
  const coupleLabel = `${weddingData.groom} и ${weddingData.bride}`;

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-wedding-ink text-white"
    >
      <Image
        src="/images/hero.jpg"
        alt={weddingData.heroImageAlt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.42)_0%,rgba(0,0,0,.18)_42%,rgba(0,0,0,.58)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,.08),transparent_42%)]" />

      <div className="safe-top relative z-10 mx-auto flex min-h-0 w-full max-w-[1180px] flex-1 flex-col items-center justify-center px-4 pb-28 pt-20 text-center sm:px-6 sm:pb-32">
        <motion.p
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
          className="mb-5 max-w-md text-[10px] font-medium uppercase tracking-[0.32em] text-white/85 sm:mb-7 sm:text-[11px] sm:tracking-[0.38em] md:text-[12px] md:tracking-[0.42em]"
        >
          {weddingData.heroSubtitle}
        </motion.p>

        <motion.h1
          initial={{ y: 34, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.15, delay: 0.32, ease: "easeOut" }}
          aria-label={coupleLabel}
          className="wedding-serif w-full max-w-4xl px-1 text-[clamp(2.25rem,8.5vw,6.5rem)] font-light uppercase leading-[0.9] tracking-[-0.05em] text-white sm:leading-[0.88] sm:tracking-[-0.07em] lg:text-[6.5rem]"
        >
          <span className="block break-words">{weddingData.groom}</span>
          <span
            className="my-1 block text-[clamp(1.35rem,4.5vw,2.75rem)] font-normal normal-case not-italic tracking-[0.12em] text-white/90 md:my-2"
            aria-hidden="true"
          >
            и
          </span>
          <span className="block break-words">{weddingData.bride}</span>
        </motion.h1>

        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.48, ease: "easeOut" }}
        >
          <HeroDecorativeDivider />
        </motion.div>

        <motion.p
          initial={{ y: 28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.58, ease: "easeOut" }}
          className="mt-5 text-center text-[11px] uppercase tracking-[0.28em] text-white/85 sm:mt-6 sm:text-[13px] sm:tracking-[0.34em] md:text-[14px]"
        >
          {weddingData.date}
        </motion.p>
      </div>

      <ScrollHint />
    </section>
  );
}

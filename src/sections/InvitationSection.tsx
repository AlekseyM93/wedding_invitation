"use client";

import { motion } from "framer-motion";
import { weddingData } from "@/data/wedding";
import { DecorativeHeart } from "@/components/common/DecorativeHeart";
import { SectionCurve } from "@/components/common/SectionCurve";

export function InvitationSection() {
  return (
    <section
      id="invitation"
      className="section-bg section-bg-invitation wedding-section"
    >
      <SectionCurve />

      <div className="noise-overlay" />

      <div className="wedding-container relative z-10">
        <motion.div
          initial={{ y: 46, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="invitation-content mx-auto max-w-4xl text-center"
        >
          <DecorativeHeart className="mb-10" />

          <p className="wedding-serif mb-5 text-[clamp(1.5rem,5vw,3.25rem)] italic leading-none text-wedding-gold md:mb-6">
            {weddingData.invitation.handwritten}
          </p>

          <h2 className="wedding-serif mx-auto max-w-3xl text-[clamp(2rem,7vw,5.75rem)] font-light leading-[0.95] tracking-[-0.05em] text-wedding-ink md:tracking-[-0.06em]">
            {weddingData.invitation.title}
          </h2>

          <div className="mx-auto mt-10 max-w-2xl space-y-6">
            <p className="wedding-text">
              {weddingData.invitation.mainText}
            </p>

            <p className="wedding-text">
              {weddingData.invitation.secondText}
            </p>
          </div>

          <div className="mx-auto mt-12 h-px w-28 bg-wedding-gold/45" />

          <p className="mt-8 text-[10px] uppercase tracking-[0.24em] text-wedding-brown/60 sm:text-[12px] sm:tracking-[0.34em]">
            {weddingData.date}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

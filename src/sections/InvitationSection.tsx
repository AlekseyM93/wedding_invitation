"use client";

import { motion } from "framer-motion";
import { weddingData } from "@/data/wedding";
import { DecorativeHeart } from "@/components/common/DecorativeHeart";

export function InvitationSection() {
  return (
    <section
      id="invitation"
      className="section-bg section-bg-invitation wedding-section flex min-h-[100dvh] items-center justify-center"
    >
      <div className="noise-overlay" />

      <div className="wedding-container relative z-10 w-full">
        <motion.div
          initial={{ y: 46, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="invitation-content mx-auto flex max-w-4xl flex-col items-center justify-center px-2 text-center"
        >
          <DecorativeHeart
            variant="accent"
            iconSize={24}
            className="mt-5 mb-8 h-[3.75rem] w-[3.75rem] sm:mt-7 sm:mb-10 sm:h-16 sm:w-16 md:mt-8 md:h-[4.25rem] md:w-[4.25rem]"
          />

          <p className="wedding-serif mb-5 text-[clamp(1.5rem,5vw,3.25rem)] italic leading-none text-wedding-gold md:mb-6">
            {weddingData.invitation.handwritten}
          </p>

          <h2 className="wedding-serif mx-auto max-w-3xl text-[clamp(2rem,7vw,5.75rem)] font-light leading-[0.95] tracking-[-0.05em] text-wedding-ink md:tracking-[-0.06em]">
            {weddingData.invitation.title}
          </h2>

          <div className="mx-auto mt-10 max-w-2xl space-y-6">
            <p className="wedding-text">{weddingData.invitation.mainText}</p>
            <p className="wedding-text">{weddingData.invitation.secondText}</p>
            <p className="wedding-text">{weddingData.invitation.thirdText}</p>
          </div>

          <div className="mx-auto mt-12 flex flex-col items-center sm:mt-14">
            <div className="h-px w-28 bg-wedding-gold/45 sm:w-32" />

            <p className="wedding-event-date wedding-event-date--invitation mt-8">
              {weddingData.date}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

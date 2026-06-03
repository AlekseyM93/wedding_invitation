"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Clock3 } from "lucide-react";
import { weddingData } from "@/data/wedding";
import { ui } from "@/data/ui";
import { SectionTitle } from "@/components/common/SectionTitle";

export function ProgramSection() {
  return (
    <section
      id="program"
      className="section-bg section-bg-program wedding-section"
    >
      <div className="wedding-container">
        <SectionTitle
          kicker={ui.sections.program.kicker}
          title={ui.sections.program.title}
          text={ui.sections.program.text}
        />

        <div className="relative mx-auto mt-12 max-w-5xl sm:mt-16 md:mt-20">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-wedding-line lg:block" />

          <div className="space-y-10 sm:space-y-12 md:space-y-14">
            {weddingData.program.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.article
                  key={item.id}
                  initial={{ y: 46, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.9,
                    delay: index * 0.06,
                    ease: "easeOut",
                  }}
                  className="relative grid min-w-0 gap-5 sm:gap-6 lg:grid-cols-2 lg:gap-14"
                >
                  <div
                    className={
                      isLeft
                        ? "min-w-0 lg:pr-10"
                        : "min-w-0 lg:order-2 lg:pl-10"
                    }
                  >
                    <div className="image-mask relative aspect-[1.25/1] shadow-luxury">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        loading="lazy"
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 42vw"
                      />
                    </div>
                  </div>

                  <div
                    className={
                      isLeft
                        ? "flex min-w-0 items-center lg:pl-10"
                        : "flex min-w-0 items-center lg:order-1 lg:justify-end lg:pr-10 lg:text-right"
                    }
                  >
                    <div className="w-full max-w-sm">
                      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full border border-wedding-line bg-wedding-pearl text-wedding-gold shadow-card">
                        <Clock3 size={18} strokeWidth={1.5} />
                      </div>

                      <p className="mb-3 text-[12px] uppercase tracking-[0.34em] text-wedding-gold">
                        {item.time}
                      </p>

                      <h3 className="wedding-serif text-[clamp(2rem,5.5vw,3.625rem)] font-light leading-none tracking-[-0.05em] text-wedding-ink">
                        {item.title}
                      </h3>

                      <p className="mt-5 text-[16px] leading-8 text-wedding-ink/70">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <span className="absolute left-1/2 top-1/2 hidden h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-wedding-cream bg-wedding-gold lg:block" />
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
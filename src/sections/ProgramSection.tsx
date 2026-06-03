"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { weddingData } from "@/data/wedding";
import { ui } from "@/data/ui";
import { SectionTitle } from "@/components/common/SectionTitle";
import { cn } from "@/lib/utils";

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
            {weddingData.program.map((item, index) => (
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
                  className={cn(
                    "program-step-row relative grid min-w-0 gap-5 sm:gap-6 lg:grid-cols-2",
                    index % 2 === 1 && "program-step-row--reversed",
                  )}
                >
                  <div className="program-step-copy flex min-w-0 flex-col justify-center">
                    <div className="program-step-copy-inner w-full max-w-sm lg:w-auto">
                      <h3 className="program-step-title">
                        <span className="program-step-time-em">
                          {item.time}
                        </span>
                        <span className="program-step-title-sep"> — </span>
                        <span>{item.title}</span>
                      </h3>

                      <p className="program-step-text">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="program-step-media min-w-0">
                    <div className="image-mask program-step-image relative aspect-[1.25/1] shadow-luxury">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        loading="lazy"
                        className="object-cover"
                        sizes="(max-width: 1023px) 100vw, 42vw"
                      />
                    </div>
                  </div>

                  <span className="absolute left-1/2 top-1/2 hidden h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-wedding-cream bg-wedding-gold lg:block" />
                </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

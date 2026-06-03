"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { weddingData } from "@/data/wedding";
import { ui } from "@/data/ui";
import { SectionTitle } from "@/components/common/SectionTitle";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export function StorySection() {
  return (
    <section
      id="story"
      className="section-bg section-bg-story wedding-section"
    >
      <div className="wedding-container">
        <SectionTitle
          kicker={ui.sections.story.kicker}
          title={ui.sections.story.title}
          text={ui.sections.story.text}
        />

        <div className="mt-12 space-y-10 sm:mt-16 sm:space-y-12 md:mt-20 md:space-y-16">
          {weddingData.story.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ y: 56, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{
                duration: 1,
                delay: index * 0.08,
                ease: "easeOut",
              }}
              className={cn(
                "grid min-w-0 items-center gap-5 sm:gap-6 md:grid-cols-12 md:gap-8",
                item.reversed && "md:[&_.story-image]:order-2 md:[&_.story-card]:order-1",
              )}
            >
              <div className="story-image md:col-span-7">
                <div className="image-mask relative aspect-[1.18/1] shadow-luxury">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    loading="lazy"
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 58vw"
                  />
                </div>
              </div>

              <div className="story-card md:col-span-5">
                <Card className="relative min-h-0 overflow-hidden p-6 sm:min-h-[280px] sm:p-8 md:min-h-[330px] md:p-12">
                  <span className="wedding-serif absolute right-5 top-3 text-[64px] leading-none text-wedding-gold/15 sm:right-8 sm:top-5 sm:text-[84px] md:text-[118px]">
                    0{item.id}
                  </span>

                  <p className="mb-4 text-[10px] uppercase tracking-[0.26em] text-wedding-gold sm:mb-6 sm:text-[11px] sm:tracking-[0.34em]">
                    {ui.sections.story.chapter} {item.id}
                  </p>

                  <h3 className="wedding-serif max-w-sm text-[clamp(1.75rem,5.5vw,3.5rem)] font-light leading-[0.95] tracking-[-0.05em] text-wedding-ink">
                    {item.title}
                  </h3>

                  <p className="mt-5 text-[15px] leading-7 text-wedding-ink/70 sm:mt-7 sm:text-[16px] sm:leading-8">
                    {item.text}
                  </p>
                </Card>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
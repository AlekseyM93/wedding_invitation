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
          className="story-section-head"
        />

        <div className="story-chapters">
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
                "story-chapter-row",
                item.reversed && "story-chapter-row--reversed",
              )}
            >
              <div className="story-chapter-media">
                <div className="image-mask relative aspect-[1.15/1] shadow-luxury sm:aspect-[1.12/1] lg:aspect-[1.18/1]">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    loading="lazy"
                    className="object-cover"
                    sizes="(max-width: 767px) 100vw, (max-width: 1023px) 52vw, 42vw"
                  />
                </div>
              </div>

              <div className="story-chapter-content">
                <Card className="story-chapter-card">
                  <p className="story-chapter-label">
                    {ui.sections.story.chapter} {item.id}
                  </p>

                  <h3 className="story-chapter-title">{item.title}</h3>

                  <div className="story-chapter-body">
                    {item.text.split("\n\n").map((paragraph, paragraphIndex) => (
                      <p key={paragraphIndex}>{paragraph}</p>
                    ))}
                  </div>
                </Card>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
"use client";

import { useState } from "react";
import { ChevronDown, Gift, Car, Baby, Shirt, Hotel, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingData } from "@/data/wedding";
import { ui } from "@/data/ui";
import { SectionTitle } from "@/components/common/SectionTitle";
import { cn } from "@/lib/utils";

const icons = [Gift, Car, Baby, Shirt, Hotel, MessageCircle];

export function FaqSection() {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="section-bg section-bg-faq wedding-section"
    >
      <div className="wedding-container">
        <SectionTitle
          kicker={ui.sections.faq.kicker}
          title={ui.sections.faq.title}
          text={ui.sections.faq.text}
        />

        <div className="mt-12 grid gap-4 sm:mt-16 sm:gap-5 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {weddingData.faq.map((item, index) => {
            const Icon = icons[index] ?? MessageCircle;
            const isActive = activeId === item.id;
            const panelId = `faq-panel-${item.id}`;
            const buttonId = `faq-button-${item.id}`;

            return (
              <motion.article
                key={item.id}
                initial={{ y: 44, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.85,
                  delay: index * 0.05,
                  ease: "easeOut",
                }}
                className="min-w-0 rounded-[24px] border border-wedding-line bg-wedding-pearl/78 p-4 shadow-card backdrop-blur-md sm:rounded-luxury sm:p-6"
              >
                <button
                  id={buttonId}
                  type="button"
                  onClick={() => setActiveId(isActive ? null : item.id)}
                  className="flex w-full min-w-0 items-start justify-between gap-3 text-left sm:gap-5"
                  aria-expanded={isActive}
                  aria-controls={panelId}
                >
                  <span className="flex min-w-0 gap-3 sm:gap-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-wedding-cream text-wedding-gold sm:h-12 sm:w-12">
                      <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                    </span>

                    <span className="min-w-0">
                      <span className="wedding-serif block text-[clamp(1.5rem,4.5vw,2.125rem)] font-light leading-[1.05] tracking-[-0.04em] text-wedding-ink">
                        {item.title}
                      </span>
                    </span>
                  </span>

                  <ChevronDown
                    size={20}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className={cn(
                      "mt-3 shrink-0 text-wedding-gold transition-transform duration-300",
                      isActive && "rotate-180",
                    )}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isActive ? (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-[14px] leading-7 text-wedding-ink/68 sm:pl-[68px] sm:pt-5 sm:text-[15px]">
                        {item.text}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
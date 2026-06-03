"use client";

import { useState } from "react";
import { ChevronDown, Gift, Car, Baby, Shirt, Hotel, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingData } from "@/data/wedding";
import { ui } from "@/data/ui";
import { SectionTitle } from "@/components/common/SectionTitle";
import { cn, formatPhoneForHref } from "@/lib/utils";

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
                  className="flex w-full min-w-0 items-center justify-between gap-3 text-left sm:gap-5"
                  aria-expanded={isActive}
                  aria-controls={panelId}
                >
                  <span className="faq-item-heading flex min-w-0">
                    <span className="faq-icon shrink-0" aria-hidden="true">
                      <Icon className="faq-icon-svg" strokeWidth={1.65} />
                    </span>

                    <span className="faq-item-title min-w-0">
                      <span className="faq-item-title-text wedding-serif block font-light tracking-[-0.04em] text-wedding-ink">
                        {item.title}
                      </span>
                    </span>
                  </span>

                  <ChevronDown
                    size={20}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className={cn(
                      "shrink-0 text-wedding-gold transition-transform duration-300",
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
                      <div className="faq-answer pt-4 sm:pt-5">
                        <p>{item.text}</p>
                        {item.id === 6 ? (
                          <div className="faq-coordinator-contact mt-5">
                            <p className="faq-coordinator-name">
                              {weddingData.coordinator.name}
                            </p>
                            <a
                              href={`tel:${formatPhoneForHref(weddingData.coordinator.phone)}`}
                              className="faq-coordinator-phone"
                            >
                              {weddingData.coordinator.phone}
                            </a>
                          </div>
                        ) : null}
                      </div>
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
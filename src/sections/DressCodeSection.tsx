"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingData } from "@/data/wedding";
import { ui } from "@/data/ui";
import { SectionTitle } from "@/components/common/SectionTitle";

type ActiveLook = {
  image: string;
  title: string;
};

export function DressCodeSection() {
  const [activeLook, setActiveLook] = useState<ActiveLook | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const closeLightbox = useCallback(() => {
    setActiveLook(null);
  }, []);

  useEffect(() => {
    if (!activeLook) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeLook, closeLightbox]);

  return (
    <section
      id="dress-code"
      className="section-bg section-bg-dress-code wedding-section"
    >
      <div className="wedding-container">
        <SectionTitle
          kicker={ui.sections.dressCode.kicker}
          title={ui.sections.dressCode.title}
          text={ui.sections.dressCode.text}
        />

        <motion.div
          initial={{ y: 44, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="mx-auto mt-12 grid max-w-4xl grid-cols-3 gap-3 sm:mt-16 sm:grid-cols-6 sm:gap-5"
        >
          {weddingData.dressColors.map((color) => (
            <div key={color.id} className="min-w-0 text-center">
              <div
                className="mx-auto h-12 w-12 rounded-full border border-white/80 shadow-card sm:h-16 sm:w-16 md:h-20 md:w-20"
                style={{ backgroundColor: color.hex }}
                role="img"
                aria-label={color.name}
              />
              <p className="mt-2 truncate text-[9px] uppercase tracking-[0.16em] text-wedding-ink/58 sm:mt-4 sm:text-[10px] sm:tracking-[0.22em]">
                {color.name}
              </p>
            </div>
          ))}
        </motion.div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-4 md:grid-cols-3 lg:mt-20 lg:grid-cols-5 lg:gap-5">
          {weddingData.dressLooks.map((look, index) => (
            <motion.button
              key={look.id}
              type="button"
              initial={{ y: 46, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.9,
                delay: index * 0.05,
                ease: "easeOut",
              }}
              onClick={() =>
                setActiveLook({ image: look.image, title: look.title })
              }
              aria-label={`${ui.sections.dressCode.lookAlt}: ${look.title}`}
              className="group relative aspect-[3/4] min-w-0 overflow-hidden rounded-[20px] bg-wedding-beige shadow-card sm:rounded-[28px] lg:rounded-[32px]"
            >
              <Image
                src={look.image}
                alt=""
                fill
                loading="lazy"
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 20vw"
              />

              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(0,0,0,.34)_100%)] opacity-0 transition group-hover:opacity-100" />

              <span className="absolute bottom-5 left-5 text-left text-[11px] uppercase tracking-[0.22em] text-white opacity-0 transition group-hover:opacity-100">
                {look.title}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeLook ? (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm sm:p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            role="presentation"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={activeLook.title}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="relative h-[min(82dvh,720px)] w-full max-w-3xl overflow-hidden rounded-[20px] sm:rounded-[32px]"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                ref={closeButtonRef}
                type="button"
                aria-label={ui.sections.dressCode.closeImage}
                className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white text-wedding-ink"
                onClick={closeLightbox}
              >
                <X size={20} aria-hidden="true" />
              </button>

              <Image
                src={activeLook.image}
                alt={activeLook.title}
                fill
                loading="lazy"
                className="object-cover"
                sizes="90vw"
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

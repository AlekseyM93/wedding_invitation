"use client";

import Image from "next/image";
import { MapPin, Navigation } from "lucide-react";
import { motion } from "framer-motion";
import { weddingData } from "@/data/wedding";
import { ui } from "@/data/ui";
import { SectionTitle } from "@/components/common/SectionTitle";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function LocationSection() {
  return (
    <section
      id="location"
      className="section-bg section-bg-location wedding-section"
    >
      <div className="wedding-container">
        <SectionTitle
          kicker={ui.sections.location.kicker}
          title={ui.sections.location.title}
          text={ui.sections.location.text}
        />

        <motion.div
          initial={{ y: 52, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mt-12 overflow-hidden rounded-[24px] bg-wedding-pearl shadow-luxury sm:mt-16 sm:rounded-[32px] md:mt-20 md:rounded-[42px]"
        >
          <div className="relative aspect-[4/3] min-h-[220px] sm:aspect-[16/10] sm:min-h-[280px] lg:aspect-[16/8] lg:min-h-[320px]">
            <Image
              src="/images/venue.jpg"
              alt={weddingData.venue.title}
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.04),rgba(0,0,0,.34))]" />
          </div>

          <div className="grid gap-5 p-4 sm:gap-6 sm:p-6 md:grid-cols-2 md:p-10">
            <Card className="flex min-h-0 flex-col justify-between sm:min-h-[300px] lg:min-h-[340px]">
              <div>
                <div className="mb-7 inline-flex h-14 w-14 items-center justify-center rounded-full bg-wedding-cream text-wedding-gold">
                  <MapPin size={22} strokeWidth={1.5} />
                </div>

                <p className="wedding-kicker mb-5">{ui.sections.location.addressLabel}</p>

                <h3 className="wedding-serif text-[clamp(2rem,6vw,4rem)] font-light leading-none tracking-[-0.05em] text-wedding-ink">
                  {weddingData.venue.title}
                </h3>

                <p className="mt-4 text-[15px] leading-7 text-wedding-ink/70 sm:mt-6 sm:text-[17px] sm:leading-8">
                  {weddingData.venue.address}
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
                <Button
                  href={weddingData.venue.yandexUrl}
                  className="w-full sm:w-auto"
                >
                  {ui.sections.location.yandexMaps}
                </Button>
                <Button
                  href={weddingData.venue.mapUrl}
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  {ui.sections.location.googleMaps}
                </Button>
              </div>
            </Card>

            <div className="relative min-h-[260px] overflow-hidden rounded-[24px] border border-wedding-line bg-wedding-beige sm:min-h-[300px] sm:rounded-luxury lg:min-h-[340px]">
              <iframe
                title={ui.sections.location.mapTitle}
                src="https://yandex.ru/map-widget/v1/?ll=37.617700%2C55.755864&z=10"
                className="absolute inset-0 h-full w-full grayscale-[35%]"
                loading="lazy"
              />

              <a
                href={weddingData.venue.yandexUrl}
                className="absolute bottom-3 left-3 right-3 inline-flex items-center justify-center gap-2 rounded-full bg-white/85 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-wedding-ink shadow-card backdrop-blur-md sm:bottom-5 sm:left-5 sm:right-auto sm:justify-start sm:px-5 sm:py-3 sm:text-[11px] sm:tracking-[0.24em]"
              >
                <Navigation size={15} strokeWidth={1.6} />
                {ui.sections.location.route}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
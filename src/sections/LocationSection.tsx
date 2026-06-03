"use client";

import Image from "next/image";
import { MapPin, Navigation } from "lucide-react";
import { motion } from "framer-motion";
import { weddingData } from "@/data/wedding";
import { ui } from "@/data/ui";
import { SectionTitle } from "@/components/common/SectionTitle";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getYandexMapEmbedUrl } from "@/lib/venue-map";

export function LocationSection() {
  const { venue } = weddingData;
  const mapEmbedUrl = getYandexMapEmbedUrl(venue);

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
          className="location-block mt-12 overflow-hidden rounded-[24px] bg-wedding-pearl shadow-luxury sm:mt-16 sm:rounded-[32px] md:mt-20 md:rounded-[42px]"
        >
          <div className="location-hero-image relative aspect-[4/3] min-h-[220px] sm:aspect-[16/10] sm:min-h-[280px] lg:aspect-[21/9] lg:min-h-[340px]">
            <Image
              src={venue.image}
              alt={venue.imageAlt}
              fill
              priority={false}
              className="object-cover"
              sizes="(max-width: 1023px) 100vw, 1200px"
            />
            <div className="location-hero-overlay absolute inset-0" />
          </div>

          <div className="grid gap-5 p-4 sm:gap-6 sm:p-6 md:grid-cols-2 md:p-10">
            <Card className="location-card flex min-h-0 flex-col justify-between sm:min-h-[300px] lg:min-h-[340px]">
              <div>
                <div className="location-address-heading">
                  <div className="location-pin flex shrink-0 items-center justify-center rounded-full">
                    <MapPin size={22} strokeWidth={1.5} aria-hidden="true" />
                  </div>

                  <p className="location-address-label">
                    {ui.sections.location.addressLabel}
                  </p>
                </div>

                <h3 className="location-venue-name">{venue.title}</h3>

                <p className="location-venue-address">{venue.address}</p>

                {venue.addressNote ? (
                  <p className="location-venue-note">{venue.addressNote}</p>
                ) : null}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
                <Button
                  href={venue.yandexUrl}
                  className="w-full sm:w-auto"
                >
                  {ui.sections.location.yandexMaps}
                </Button>
                <Button
                  href={venue.mapUrl}
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  {ui.sections.location.googleMaps}
                </Button>
              </div>
            </Card>

            <div className="location-map relative min-h-[260px] overflow-hidden rounded-[24px] border border-wedding-line bg-wedding-beige sm:min-h-[300px] sm:rounded-luxury lg:min-h-[340px]">
              <iframe
                title={ui.sections.location.mapTitle}
                src={mapEmbedUrl}
                className="absolute inset-0 h-full w-full grayscale-[35%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              <a
                href={venue.yandexUrl}
                className="absolute bottom-3 left-3 right-3 inline-flex items-center justify-center gap-2 rounded-full bg-white/85 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-wedding-ink shadow-card backdrop-blur-md sm:bottom-5 sm:left-5 sm:right-auto sm:justify-start sm:px-5 sm:py-3 sm:text-[11px] sm:tracking-[0.24em]"
              >
                <Navigation size={15} strokeWidth={1.6} aria-hidden="true" />
                {ui.sections.location.route}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { MessageCircle, Phone } from "lucide-react";
import { weddingData } from "@/data/wedding";
import { ui } from "@/data/ui";
import { formatPhoneForHref } from "@/lib/utils";

export function ThankYouSection() {
  const coupleLabel = `${weddingData.groom} и ${weddingData.bride}`;

  return (
    <section
      id="thank-you"
      className="safe-bottom safe-top relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-wedding-ink px-4 py-16 text-white sm:px-5 sm:py-20"
    >
      <Image
        src="/images/thank-you.jpg"
        alt={weddingData.thankYouImageAlt}
        fill
        loading="lazy"
        className="object-cover"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.36),rgba(0,0,0,.62))]" />

      <div className="relative z-10 mx-auto w-full max-w-3xl rounded-[24px] border border-white/18 bg-white/12 p-6 text-center shadow-luxury backdrop-blur-md sm:rounded-[36px] sm:p-8 md:rounded-[42px] md:p-14">
        <p className="mb-5 text-[10px] uppercase tracking-[0.28em] text-white/72 sm:mb-6 sm:text-[11px] sm:tracking-[0.36em]">
          {ui.sections.thankYou.kicker}
        </p>

        <h2
          aria-label={coupleLabel}
          className="wedding-serif text-[clamp(2.5rem,10vw,7rem)] font-light uppercase leading-[0.88] tracking-[-0.06em] sm:leading-[0.85] sm:tracking-[-0.07em]"
        >
          <span className="block break-words">{weddingData.groom}</span>
          <span
            className="my-1 block text-[clamp(1.25rem,5vw,2.5rem)] font-normal normal-case tracking-[0.12em] text-white/90"
            aria-hidden="true"
          >
            и
          </span>
          <span className="block break-words">{weddingData.bride}</span>
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-[15px] leading-7 text-white/75 sm:mt-8 sm:text-[17px] sm:leading-8">
          {ui.sections.thankYou.text}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:justify-center sm:gap-4">
          <a
            href={weddingData.coordinator.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 bg-white/15 px-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-sm transition hover:bg-white/25 sm:h-14 sm:px-8"
          >
            <MessageCircle size={16} aria-hidden="true" className="mr-2" />
            {ui.sections.thankYou.telegram}
          </a>

          <a
            href={`tel:${formatPhoneForHref(weddingData.coordinator.phone)}`}
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/35 px-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-white/10 sm:h-14 sm:px-8"
          >
            <Phone size={16} aria-hidden="true" className="mr-2" />
            {ui.sections.thankYou.call}
          </a>
        </div>
      </div>
    </section>
  );
}

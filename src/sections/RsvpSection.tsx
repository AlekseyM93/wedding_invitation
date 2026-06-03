import { RsvpForm } from "@/components/forms/RsvpForm";
import { DecorativeHeart } from "@/components/common/DecorativeHeart";
import { ui } from "@/data/ui";

export function RsvpSection() {
  return (
    <section
      id="rsvp"
      className="section-bg section-bg-rsvp wedding-section"
    >
      <div className="wedding-container relative z-10">
        <header className="rsvp-section-header">
          <p className="rsvp-section-kicker">{ui.sections.rsvp.kicker}</p>

          <h2 className="rsvp-section-title mt-4 sm:mt-5">
            {ui.sections.rsvp.title}
          </h2>

          <div className="rsvp-section-divider" aria-hidden="true">
            <span className="rsvp-section-divider-line" />
            <DecorativeHeart className="h-11 w-11 shrink-0 shadow-card" />
            <span className="rsvp-section-divider-line" />
          </div>

          <p className="rsvp-section-subtitle">{ui.sections.rsvp.text}</p>
        </header>

        <div className="rsvp-form-shell">
          <RsvpForm />
        </div>
      </div>
    </section>
  );
}

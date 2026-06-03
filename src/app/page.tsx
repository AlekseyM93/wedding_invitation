import { InvitationApp } from "@/components/common/InvitationApp";
import { weddingData } from "@/data/wedding";
import { getSiteUrl } from "@/lib/site";

export default function HomePage() {
  const siteUrl = getSiteUrl();
  const heroImageUrl = `${siteUrl}/images/hero.jpg`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `Свадьба ${weddingData.groom} и ${weddingData.bride}`,
    startDate: weddingData.isoDate,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    url: siteUrl,
    location: {
      "@type": "Place",
      name: weddingData.venue.title,
      address: {
        "@type": "PostalAddress",
        addressCountry: "RU",
        addressRegion: "Московская область",
        addressLocality: "Красногорск, деревня Марьино",
        streetAddress: "улица Центральная, 3Г",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: weddingData.venue.latitude,
        longitude: weddingData.venue.longitude,
      },
    },
    image: [heroImageUrl],
    description: weddingData.invitation.mainText,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <InvitationApp />
    </>
  );
}

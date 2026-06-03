import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "@/app/globals.css";
import { Header } from "@/components/common/Header";
import { SkipLink } from "@/components/common/SkipLink";
import { SmoothScrollProvider } from "@/components/common/SmoothScrollProvider";
import { InvitationFlowProvider } from "@/contexts/InvitationFlowContext";
import { weddingData } from "@/data/wedding";
import { getMetadataBase } from "@/lib/site";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const siteTitle = `${weddingData.groom} и ${weddingData.bride} — свадебное приглашение`;
const siteDescription = `Электронное свадебное приглашение ${weddingData.groom} и ${weddingData.bride}. Программа дня, локация, дресс-код и форма подтверждения присутствия.`;

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  metadataBase: getMetadataBase(),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteTitle,
    description: "Приглашаем вас разделить с нами самый важный день.",
    type: "website",
    locale: "ru_RU",
    url: "/",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: `${weddingData.groom} и ${weddingData.bride}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${weddingData.groom} и ${weddingData.bride}`,
    description: "Свадебное приглашение",
    images: ["/images/hero.jpg"],
  },
  manifest: "/site.webmanifest",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#F7F3EF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${cormorant.variable} ${manrope.variable}`}>
      <body>
        <InvitationFlowProvider>
          <SkipLink />
          <SmoothScrollProvider>
            <Header />
            {children}
          </SmoothScrollProvider>
        </InvitationFlowProvider>
      </body>
    </html>
  );
}

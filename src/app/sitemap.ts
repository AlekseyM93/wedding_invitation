import type { MetadataRoute } from "next";
import { weddingData } from "@/data/wedding";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  return [
    {
      url: siteUrl,
      lastModified: new Date(weddingData.isoDate),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

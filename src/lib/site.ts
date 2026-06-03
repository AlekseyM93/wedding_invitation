const FALLBACK_SITE_URL = "http://localhost:3000";

export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!url) {
    return FALLBACK_SITE_URL;
  }
  return url.replace(/\/$/, "");
}

export function getMetadataBase(): URL {
  try {
    return new URL(getSiteUrl());
  } catch {
    return new URL(FALLBACK_SITE_URL);
  }
}

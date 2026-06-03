import type { Venue } from "@/types/wedding";

/** Виджет Яндекс.Карт с меткой площадки (долгота, широта). */
export function getYandexMapEmbedUrl(venue: Venue): string {
  const { longitude, latitude } = venue;
  const ll = `${longitude}%2C${latitude}`;
  const pt = `${longitude}%2C${latitude}%2Cpm2rdm`;
  return `https://yandex.ru/map-widget/v1/?ll=${ll}&z=15&pt=${pt}`;
}

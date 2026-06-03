export type StoryItem = {
  id: number;
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  reversed?: boolean;
};

export type ProgramItem = {
  id: number;
  time: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export type DressColor = {
  id: number;
  name: string;
  hex: string;
  /** Светлый оттенок — усиленная обводка, чтобы не терялся на фоне */
  light?: boolean;
};

export type DressLook = {
  id: number;
  title: string;
  image: string;
};

export type FaqItem = {
  id: number;
  title: string;
  text: string;
};

export type Venue = {
  title: string;
  address: string;
  addressNote?: string;
  image: string;
  imageAlt: string;
  latitude: number;
  longitude: number;
  mapUrl: string;
  yandexUrl: string;
};

export type Coordinator = {
  name: string;
  phone: string;
  telegram: string;
};

export type WeddingData = {
  groom: string;
  bride: string;
  date: string;
  isoDate: string;
  city: string;
  heroSubtitle: string;
  heroImageAlt: string;
  thankYouImageAlt: string;
  invitation: {
    handwritten: string;
    title: string;
    mainText: string;
    secondText: string;
    thirdText: string;
  };
  venue: Venue;
  coordinator: Coordinator;
  story: StoryItem[];
  program: ProgramItem[];
  dressColors: DressColor[];
  dressLooks: DressLook[];
  faq: FaqItem[];
};
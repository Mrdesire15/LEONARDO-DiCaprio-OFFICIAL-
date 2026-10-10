export type AuraTheme = 'gold' | 'platinum' | 'emerald' | 'sapphire' | 'ruby';

export interface VIPPass {
  id: string;
  tier: 'Silver' | 'Gold' | 'Platinum';
  title: string;
  price: number;
  badge: string;
  colorScheme: {
    accent: string;
    border: string;
    glow: string;
    badgeBg: string;
    gradient: string;
  };
  features: string[];
  exclusiveBonus: string;
  availability: string;
  image: string;
  backImage?: string;
}

export interface ArchiveItem {
  id: string;
  title: string;
  category: string;
  price: number;
  year: string;
  isSoldOut: boolean;
  edition: string;
  description: string;
  provenance: string;
  imageFallbackGradient: string;
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  category: string;
  quantity: number;
  tier?: string;
  image?: string;
}

export interface FilmItem {
  id: string;
  title: string;
  year: number;
  director: string;
  role: string;
  boxOffice: string;
  quote: string;
  synopsis: string;
  accolades: string;
  accentColor: string;
}

export interface AwardItem {
  id: string;
  year: number;
  title: string;
  category: string;
  project: string;
  institution: string;
  iconType: 'oscar' | 'globe' | 'bafta' | 'sag' | 'bear' | 'peace';
  description: string;
}

export interface PhotoArchiveItem {
  id: string;
  title: string;
  year: string;
  era: string;
  description: string;
  location: string;
  photographer: string;
  image: string;
  tags: string[];
}

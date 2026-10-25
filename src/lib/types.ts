export interface Vehicle {
  id: string;
  name: string;
  category: string;
  seatCapacity: number;
  imageUrl: string;
  description: string;
  priceFrom: number | null;
}

export interface FamousSpot {
  id: string;
  name: string;
  imageUrl: string;
}

export interface City {
  id: string;
  name: string;
  slug: string;
  heroImage: string;
  cardImage?: string;
  description: string;
  spots: FamousSpot[];
}

export interface Testimonial {
  id: string;
  name: string;
  message: string;
  rating: number;
  imageUrl?: string; // small avatar
  coverImage?: string; // large trip/group photo shown at the top of the card
  role?: string; // e.g. "CEO, PPM Logistics" or "Frequent Traveller"
  cityName?: string;
}
export interface PageContent {
  heroImage?: string;
  heroHeading?: string;
  heroSubheading?: string;
  aboutVideoId?: string;
  aboutVideoTitle?: string;
  aboutLeft?: string;
  aboutRight?: string;
  aboutBottom?: string[];
  fleetSubtitle?: string;
    servicesTitleAccent?: string;
  servicesTitle?: string;
  servicesSubheading?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  image: string;
  publishedAt: string;
}
export interface HeroSlideData {
  id: string;
  image: string;
  heading: string;
  subheading: string;
}

export interface FleetItemData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  vehicleImage: string;
  images: string[];
  amenities: { label: string; icon: string }[];
  linkCategorySlug: string;
}
export interface ServiceCardData {
  id: string;
  occasion: string;
  title: string;
  description: string;
  image: string;
}
export interface FaqData {
  id: string;
  question: string;
  answer: string;
}
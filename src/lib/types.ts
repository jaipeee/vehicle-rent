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
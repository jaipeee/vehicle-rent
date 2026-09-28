export interface VehicleCategoryDef {
  slug: string;
  label: string;
  // Backend Vehicle.category values that belong on this page — lets one
  // page group several DB categories together (e.g. "Car & SUVs" covers
  // both "Sedan" and "SUV" vehicles).
  matches: string[];
}

export const VEHICLE_CATEGORIES: VehicleCategoryDef[] = [
  { slug: "car-suv", label: "Car & SUVs", matches: ["Sedan", "SUV"] },
  { slug: "luxury-cars-suvs-vans", label: "Luxury Cars, SUVs, Vans", matches: ["Luxury Car", "Luxury SUV", "Luxury Van"] },
  { slug: "tempo-traveller", label: "Tempo Traveller", matches: ["Tempo Traveller"] },
  { slug: "urbania", label: "Urbania", matches: ["Urbania"] },
  { slug: "mini-bus", label: "Mini Bus", matches: ["Mini Bus"] },
  { slug: "luxury-buses", label: "Luxury Buses", matches: ["Luxury Bus"] },
];
import type { City } from "./types";
import type { VehicleCategoryDef } from "@/features/vehicles/vehicle-categories.config";

export interface PageContext {
  city?: City;
  category?: VehicleCategoryDef;
}

// buildPath() -> "/", buildPath("delhi") -> "/delhi",
// buildPath(undefined, "mini-bus") -> "/mini-bus", buildPath("delhi","mini-bus") -> "/delhi/mini-bus"
export const buildPath = (citySlug?: string, categorySlug?: string) =>
  "/" + [citySlug, categorySlug].filter(Boolean).join("/");

export function fillTemplate(text: string, ctx?: PageContext) {
  return text
    .replaceAll("{city}", ctx?.city?.name ?? "India")
    .replaceAll("{category}", ctx?.category?.label ?? "Vehicle");
}

export function buildMetadata(ctx: PageContext) {
  const { city, category } = ctx;
  if (city && category) {
    return {
      title: `${category.label} on Rent in ${city.name} | Indiventure Tour & Travel`,
      description: `Book ${category.label} on rent in ${city.name} with transparent pricing and professional drivers.`,
    };
  }
  if (city) {
    return {
      title: `Tempo Traveller & Bus Rental in ${city.name} | Indiventure Tour & Travel`,
      description: `Book reliable tempo traveller, car, and bus rentals in ${city.name} for corporate trips, events, and outstation travel.`,
    };
  }
  return {
    title: `${category?.label} on Rent | Indiventure Tour & Travel`,
    description: `Browse our ${category?.label} available for rent, with transparent pricing and professional drivers.`,
  };
}
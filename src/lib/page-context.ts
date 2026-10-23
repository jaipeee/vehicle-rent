import type { City } from "./types";
import type { VehicleCategoryDef } from "@/features/vehicles/vehicle-categories.config";
import { pageMeta } from "./seo";

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
  const path = buildPath(city?.slug, category?.slug);

  // No "| Indiventra" suffix here: layout.tsx adds it through the title template.
  if (city && category) {
    return pageMeta({
      title: `${category.label} on Rent in ${city.name}`,
      description: `Book ${category.label} on rent in ${city.name} with transparent pricing and professional drivers.`,
      path,
    });
  }
  if (city) {
    return pageMeta({
      title: `Tempo Traveller & Bus Rental in ${city.name}`,
      description: `Book reliable tempo traveller, car, and bus rentals in ${city.name} for corporate trips, events, and outstation travel.`,
      path,
    });
  }
  return pageMeta({
    title: `${category?.label} on Rent`,
    description: `Browse our ${category?.label} available for rent, with transparent pricing and professional drivers.`,
    path,
  });
}
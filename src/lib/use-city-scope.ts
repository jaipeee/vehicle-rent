"use client";

import { usePathname } from "next/navigation";
import { VEHICLE_CATEGORIES } from "@/features/vehicles/vehicle-categories.config";

// First URL segments that are NOT cities. Add any other fixed routes you create.
const RESERVED = new Set([
  "admin", "blog", "info", "services", "about", "contact",
  "careers", "partner", "privacy", "terms", "api",
]);

export function useCitySlug(): string | undefined {
  const first = (usePathname() ?? "").split("/").filter(Boolean)[0];
  if (!first || RESERVED.has(first) || VEHICLE_CATEGORIES.some((c) => c.slug === first)) return undefined;
  return first;
}

// Turns "/mini-bus" into "/delhi/mini-bus" while you're inside a city.
export function useScopedHref() {
  const city = useCitySlug();
  return (href: string) => {
    const slug = href.replace(/^\/(vehicles\/)?/, "");
    const isVehicle = VEHICLE_CATEGORIES.some((c) => c.slug === slug);
    return city && isVehicle ? `/${city}/${slug}` : href;
  };
}
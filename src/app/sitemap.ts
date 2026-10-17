import type { MetadataRoute } from "next";
import { apiFetch } from "@/lib/api";
import type { City } from "@/lib/types";
import { VEHICLE_CATEGORIES } from "@/features/vehicles/vehicle-categories.config";
import { buildPath } from "@/lib/page-context";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cities = await apiFetch<City[]>("/cities").catch(() => []);

  return [
    { url: SITE_URL, lastModified: new Date() },
    ...cities.map((c) => ({ url: `${SITE_URL}${buildPath(c.slug)}`, lastModified: new Date() })),
...VEHICLE_CATEGORIES.map((v) => ({ url: `${SITE_URL}${buildPath(undefined, v.slug)}`, lastModified: new Date() })),
...cities.flatMap((c) =>
  VEHICLE_CATEGORIES.map((v) => ({ url: `${SITE_URL}${buildPath(c.slug, v.slug)}`, lastModified: new Date() }))
),
  ];
}
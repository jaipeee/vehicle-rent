import type { MetadataRoute } from "next";
import { apiFetch } from "@/lib/api";
import type { City } from "@/lib/types";
import { VEHICLE_CATEGORIES } from "@/features/vehicles/vehicle-categories.config";
import { buildPath } from "@/lib/page-context";
import { SITE_URL } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cities = await apiFetch<City[]>("/cities").catch((): City[] => []);
  const now = new Date();

  return [
    { url: SITE_URL, lastModified: now },
    ...cities.map((c) => ({ url: `${SITE_URL}${buildPath(c.slug)}`, lastModified: now })),
    ...VEHICLE_CATEGORIES.map((v) => ({
      url: `${SITE_URL}${buildPath(undefined, v.slug)}`,
      lastModified: now,
    })),
    ...cities.flatMap((c) =>
      VEHICLE_CATEGORIES.map((v) => ({
        url: `${SITE_URL}${buildPath(c.slug, v.slug)}`,
        lastModified: now,
      }))
    ),
  ];
}
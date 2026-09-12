import type { MetadataRoute } from "next";
import { apiFetch } from "@/lib/api";
import type { City } from "@/lib/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cities = await apiFetch<City[]>("/cities").catch(() => []);

  return [
    { url: SITE_URL, lastModified: new Date() },
    ...cities.map((city) => ({
      url: `${SITE_URL}/cities/${city.slug}`,
      lastModified: new Date(),
    })),
  ];
}
import { notFound } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { dummyCities } from "@/lib/dummyData";
import type { City } from "@/lib/types";
import { VEHICLE_CATEGORIES } from "@/features/vehicles/vehicle-categories.config";
import { buildMetadata, type PageContext } from "@/lib/page-context";
import { getCity } from "@/lib/page-data";
import { ContextPage } from "@/features/home/context-page";

interface Props {
  params: Promise<{ segment: string }>;
}

export const revalidate = 3600;

async function resolve(segment: string): Promise<PageContext | null> {
  const category = VEHICLE_CATEGORIES.find((c) => c.slug === segment);
  if (category) return { category };
  const city = await getCity(segment);
  return city ? { city } : null;
}

export async function generateStaticParams() {
  const cities = await apiFetch<City[]>("/cities").catch(() => []);
  const source = cities.length > 0 ? cities : dummyCities;
  return [
    ...source.map((c) => ({ segment: c.slug })),
    ...VEHICLE_CATEGORIES.map((c) => ({ segment: c.slug })),
  ];
}

export async function generateMetadata({ params }: Props) {
  const { segment } = await params;
  const ctx = await resolve(segment);
  return ctx ? buildMetadata(ctx) : {};
}

export default async function Page({ params }: Props) {
  const { segment } = await params;
  const ctx = await resolve(segment);
  if (!ctx) notFound();
  return <ContextPage ctx={ctx} />;
}
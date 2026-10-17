import { notFound } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { dummyCities } from "@/lib/dummyData";
import type { City } from "@/lib/types";
import { VEHICLE_CATEGORIES } from "@/features/vehicles/vehicle-categories.config";
import { buildMetadata, type PageContext } from "@/lib/page-context";
import { getCity } from "@/lib/page-data";
import { ContextPage } from "@/features/home/context-page";

interface Props {
  params: Promise<{ segment: string; vehicle: string }>;
}

export const revalidate = 3600;

async function resolve(segment: string, vehicle: string): Promise<Required<PageContext> | null> {
  const category = VEHICLE_CATEGORIES.find((c) => c.slug === vehicle);
  if (!category) return null;
  const city = await getCity(segment);
  return city ? { city, category } : null;
}

export async function generateStaticParams() {
  const cities = await apiFetch<City[]>("/cities").catch(() => []);
  const source = cities.length > 0 ? cities : dummyCities;
  return source.flatMap((c) => VEHICLE_CATEGORIES.map((v) => ({ segment: c.slug, vehicle: v.slug })));
}

export async function generateMetadata({ params }: Props) {
  const { segment, vehicle } = await params;
  const ctx = await resolve(segment, vehicle);
  return ctx ? buildMetadata(ctx) : {};
}

export default async function Page({ params }: Props) {
  const { segment, vehicle } = await params;
  const ctx = await resolve(segment, vehicle);
  if (!ctx) notFound();
  return <ContextPage ctx={ctx} />;
}
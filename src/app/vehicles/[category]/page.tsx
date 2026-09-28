import { notFound } from "next/navigation";
import Image from "next/image";
import { apiFetch } from "@/lib/api";
import type { Vehicle } from "@/lib/types";
import { VEHICLE_CATEGORIES } from "@/features/vehicles/vehicle-categories.config";
import { EnquiryForm } from "@/features/enquiry";

interface VehicleCategoryPageProps {
  // Next.js 15+/16: dynamic route params are a Promise and must be awaited.
  params: Promise<{ category: string }>;
}

// Static config, not a backend call — every category page can be generated up front.
export function generateStaticParams() {
  return VEHICLE_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: VehicleCategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = VEHICLE_CATEGORIES.find((c) => c.slug === categorySlug);
  if (!category) return {};

  return {
    title: `${category.label} on Rent | Indiventure Tour & Travel`,
    description: `Browse our ${category.label} available for rent, with transparent pricing and professional drivers.`,
  };
}

export const revalidate = 3600;

export default async function VehicleCategoryPage({ params }: VehicleCategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = VEHICLE_CATEGORIES.find((c) => c.slug === categorySlug);
  if (!category) notFound();

  const vehicles = await apiFetch<Vehicle[]>("/vehicles").catch(() => []);
  const filtered = vehicles.filter((v) => category.matches.includes(v.category));

  return (
    <main>
      <section className="bg-emerald-950 py-20 text-center text-white">
        <h1 className="text-3xl font-extrabold sm:text-5xl">{category.label}</h1>
        <p className="mx-auto mt-3 max-w-xl text-white/80">
          Browse our {category.label.toLowerCase()} available for rent, with transparent pricing and professional
          drivers.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        {filtered.length === 0 ? (
          <p className="text-center text-slate-400">No vehicles listed in this category yet — check back soon.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((vehicle) => (
              <div key={vehicle.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="relative h-48 w-full">
                  <Image src={vehicle.imageUrl} alt={vehicle.name} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-slate-900">{vehicle.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">{vehicle.seatCapacity} seats</p>
                  <p className="mt-2 text-sm text-slate-600">{vehicle.description}</p>
                  <p className="mt-3 font-semibold text-emerald-700">
                    {vehicle.priceFrom ? `From ₹${vehicle.priceFrom}` : "Contact for Quote"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section id="get-a-quote" className="bg-slate-50 py-16">
        <div className="mx-auto max-w-md px-4">
          <h2 className="text-center text-2xl font-bold text-emerald-900 sm:text-3xl">
            Get a Quote for {category.label}
          </h2>
          <div className="mt-8">
            <EnquiryForm />
          </div>
        </div>
      </section>
    </main>
  );
}
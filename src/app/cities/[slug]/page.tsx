import { notFound } from "next/navigation";
import Image from "next/image";
import { apiFetch } from "@/lib/api";
import type { City } from "@/lib/types";
import { EnquiryForm } from "@/features/enquiry";

interface CityPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const cities = await apiFetch<City[]>("/cities").catch(() => []);
  return cities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: CityPageProps) {
  const city = await apiFetch<City>(`/cities/${params.slug}`).catch(() => null);
  if (!city) return {};

  return {
    title: `Tempo Traveller & Bus Rental in ${city.name} | Indiventure Tour & Travel`,
    description: `Book reliable tempo traveller, car, and bus rentals in ${city.name} for corporate trips, events, and outstation travel.`,
  };
}

export const revalidate = 3600;

export default async function CityPage({ params }: CityPageProps) {
  const city = await apiFetch<City>(`/cities/${params.slug}`).catch(() => null);

  if (!city) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Indiventure Tour & Travel",
    areaServed: city.name,
    description: city.description,
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative h-72 w-full sm:h-96">
        <Image src={city.heroImage} alt={city.name} fill priority className="object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 px-4 text-center text-white">
          <h1 className="text-3xl font-extrabold sm:text-5xl">Rentals in {city.name}</h1>
          <p className="mt-3 max-w-xl text-white/90">{city.description}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <h2 className="text-2xl font-bold text-emerald-900 sm:text-3xl">Famous Spots in {city.name}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {city.spots.map((spot) => (
            <div key={spot.id} className="group relative h-48 overflow-hidden rounded-2xl">
              <Image
                src={spot.imageUrl}
                alt={spot.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <p className="absolute bottom-3 left-4 font-semibold text-white">{spot.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="get-a-quote" className="bg-slate-50 py-16">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-emerald-900 sm:text-3xl">
            Get a Quote for {city.name}
          </h2>
          <div className="mt-8">
            <EnquiryForm />
          </div>
        </div>
      </section>
    </main>
  );
}
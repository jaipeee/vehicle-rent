import Image from "next/image";
import Link from "next/link";
import type { City } from "@/lib/types";

export function CitiesGrid({ cities }: { cities: City[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <h2 className="text-center text-2xl font-bold text-emerald-900 sm:text-3xl">Cities We Serve</h2>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cities.map((city) => (
          <Link
            key={city.slug}
            href={`/cities/${city.slug}`}
            className="group relative block h-56 overflow-hidden rounded-2xl"
          >
            <Image
              src={city.heroImage}
              alt={city.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <h3 className="text-lg font-bold text-white">{city.name}</h3>
              <p className="mt-1 max-h-0 overflow-hidden text-sm text-white/80 opacity-0 transition-all duration-300 group-hover:max-h-20 group-hover:opacity-100">
                Famous for {city.spots.slice(0, 2).map((s) => s.name).join(", ")}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
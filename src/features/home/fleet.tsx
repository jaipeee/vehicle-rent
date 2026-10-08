"use client";

import { FLEET_SERVICES } from "./fleet.config";
import { FleetCard } from "./fleet-card";

interface FleetProps {
  categorySlug?: string;
  cityName?: string;
}

export function Fleet({ categorySlug, cityName }: FleetProps) {
  const filtered = categorySlug
    ? FLEET_SERVICES.filter((s) => s.relatedCategorySlugs.includes(categorySlug))
    : FLEET_SERVICES;
  const services = filtered.length > 0 ? filtered : FLEET_SERVICES;

  return (
    <section className="py-16" style={{ backgroundColor: "#fe980a2d" }}>
      <div className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-amber-600 p-2">
        <span className="h-px w-8 bg-amber-400" />
        Our Fleet
        <span className="h-px w-8 bg-amber-400" />
      </div>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="text-center text-2xl font-bold sm:text-3xl" style={{ color: "#0B2A4A" }}>
          Vehicle For <span className="text-amber-500">Every Group</span> Size
          {cityName ? ` in ${cityName}` : ""}
        </h2>
        <p className="text-center pt-2">hello this is ashish</p>

        <div className={services.length === 1 ? "mx-auto mt-10 max-w-xl" : "mt-10 grid gap-10 lg:grid-cols-2"}>
          {services.map((service) => (
            <FleetCard key={service.id} service={service} cityName={cityName} />
          ))}
        </div>
      </div>
    </section>
  );
}
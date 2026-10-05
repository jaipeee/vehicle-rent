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
    <section className="py-16" style={{ backgroundColor: "#F4F7FB" }}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="text-center text-2xl font-bold sm:text-3xl" style={{ color: "#0B2A4A" }}>
  {cityName ? `Vehicle For Every Group Size in ${cityName}` : "Vehicle For Every Group Size"}
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
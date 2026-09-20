"use client";

import { FLEET_SERVICES } from "./fleet.config";
import { FleetCard } from "./fleet-card";

export function Fleet() {
  return (
    <section className="py-16" style={{ backgroundColor: "#F4F7FB" }}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="text-center text-2xl font-bold sm:text-3xl" style={{ color: "#0B2A4A" }}>
          Our Rental Services
        </h2>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          {FLEET_SERVICES.map((service) => (
            <FleetCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
"use client";

import { FLEET_SERVICES, type FleetService } from "./fleet.config";
import { FleetCard } from "./fleet-card";
import { buildPath } from "@/lib/page-context";
import { getIcon } from "@/lib/icons";
import type { FleetItemData } from "@/lib/types";

interface FleetProps {
  items?: FleetItemData[]; // from the database; empty -> built-in defaults
  categorySlug?: string;
  citySlug?: string;
  cityName?: string;
  subtitle?: string;
}

interface Entry {
  service: FleetService;
  linkSlug: string;
}

export function Fleet({ items = [], categorySlug, citySlug, cityName, subtitle }: FleetProps) {
  let entries: Entry[];

  if (items.length > 0) {
    entries = items.map((it) => ({
      linkSlug: it.linkCategorySlug,
      service: {
        id: it.id,
        title: it.title,
        subtitle: it.subtitle,
        description: it.description,
        vehicleImage: it.vehicleImage,
        images: it.images.length > 0 ? it.images : [it.vehicleImage],
        relatedCategorySlugs: it.linkCategorySlug ? [it.linkCategorySlug] : [],
        amenities: it.amenities.map((a) => ({ label: a.label, icon: getIcon(a.icon) })),
      },
    }));
  } else {
    const filtered = categorySlug
      ? FLEET_SERVICES.filter((s) => s.relatedCategorySlugs.includes(categorySlug))
      : FLEET_SERVICES;
    entries = (filtered.length > 0 ? filtered : FLEET_SERVICES).map((s) => ({
      service: s,
      linkSlug: s.relatedCategorySlugs[0] ?? "",
    }));
  }

  return (
    <section className="py-16" style={{ backgroundColor: "#fe980a2d" }}>
      <div className="flex items-center justify-center gap-3 p-2 text-xs font-bold uppercase tracking-[0.3em] text-amber-600">
        <span className="h-px w-8 bg-amber-400" />
        Our Fleet
        <span className="h-px w-8 bg-amber-400" />
      </div>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="text-center text-2xl font-bold sm:text-3xl" style={{ color: "#0B2A4A" }}>
          Right Hire Vehicle For <span className="text-amber-500">Every Group</span> & <span className="text-amber-500">Occasion</span>
          {cityName ? ` in ${cityName}` : ""}
        </h2>
        <p className="pt-2 text-center  text-slate-600">
          {subtitle ?? "From luxury cars to luxury buses, choose a rented vehicle by group size and luggage. Every booking comes with a chauffeur, a clean vehicle and a written quote."}
        </p>

        <div className={entries.length === 1 ? "mx-auto mt-10 max-w-xl" : "mt-10 grid gap-10 lg:grid-cols-2"}>
          {entries.map(({ service, linkSlug }) => (
            <FleetCard
              key={service.id}
              service={service}
              cityName={cityName}
              // On a vehicle page the arrow does nothing special; elsewhere it goes to
              // /vehicle (global) or /city/vehicle (inside a city).
              href={categorySlug || !linkSlug ? undefined : buildPath(citySlug, linkSlug)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
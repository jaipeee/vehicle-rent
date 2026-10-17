"use client";

import { usePathname, useRouter } from "next/navigation";
import { CalendarDays, ChevronDown, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { buildPath } from "@/lib/page-context";
import { useCitySlug } from "@/lib/use-city-scope";
import { CITIES, CONTACT_PHONE } from "./navbar.config";
import { currentVehicleSlug } from "./nav-utils";

export function PhoneBadge() {
  return (
    <a
      href={CONTACT_PHONE.href}
      className="flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
    >
      <Phone className="h-4 w-4" />
      {CONTACT_PHONE.display}
    </a>
  );
}

export function CtaButton({ className }: { className?: string }) {
  return (
    <Button
      className={cn(
        "group gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 shadow-[0_0_16px_rgba(251,191,36,0.45)] transition-all duration-300 hover:scale-105 hover:from-amber-300 hover:to-amber-400 hover:shadow-[0_0_26px_rgba(251,191,36,0.65)]",
        className
      )}
    >
      <CalendarDays className="h-4 w-4 transition-transform duration-300 group-hover:rotate-[-8deg]" />
      Get a Quote
    </Button>
  );
}

export function CitySelector() {
  const router = useRouter();
  const pathname = usePathname() ?? "/";
  const citySlug = useCitySlug();
  const vehicle = currentVehicleSlug(pathname);

  const activeCity = CITIES.find((c) => c.slug === citySlug) ?? null;

  // Keeps the vehicle you're viewing: /mini-bus + Delhi -> /delhi/mini-bus
  const go = (slug?: string) => router.push(buildPath(slug, vehicle));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 rounded-full border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white data-[state=open]:bg-white/25"
        >
          <MapPin className="h-4 w-4" />
          {activeCity?.name ?? "Select City"}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => go(undefined)} className={cn(!activeCity && "bg-accent font-semibold")}>
          All cities
        </DropdownMenuItem>
        {CITIES.map((city) => (
          <DropdownMenuItem
            key={city.slug}
            onClick={() => go(city.slug)}
            className={cn(city.slug === citySlug && "bg-accent font-semibold")}
          >
            {city.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
"use client";

import { useMemo } from "react";
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
import { CITIES, CONTACT_PHONE } from "./navbar.config";

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
  const pathname = usePathname();

  // Auto-detect the current city from the URL (e.g. /cities/delhi -> "Delhi"),
  // so the button shows the right name on load/refresh, not just after a click.
  const activeCity = useMemo(() => {
    const match = pathname?.match(/^\/cities\/([^/]+)/);
    if (!match) return null;
    const slug = match[1];
    return CITIES.find((city) => city.toLowerCase() === slug) ?? null;
  }, [pathname]);

  const handleSelect = (city: string) => {
    router.push(`/cities/${city.toLowerCase()}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 rounded-full border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white"
        >
          <MapPin className="h-4 w-4" />
          {activeCity ?? "Select City"}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {CITIES.map((city) => (
          <DropdownMenuItem key={city} onClick={() => handleSelect(city)}>
            {city}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
"use client";

import { useState } from "react";
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
        "gap-2 rounded-full bg-[#ea7236] text-emerald-100 hover:bg-[#37d4d9]",
        className
      )}
    >
      <CalendarDays className="h-4 w-4" />
      Get a Quote
    </Button>
  );
}

export function CitySelector() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 rounded-full border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white"
        >
          <MapPin className="h-4 w-4" />
          {selected ?? "Select City"}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {CITIES.map((city) => (
          <DropdownMenuItem key={city} onClick={() => setSelected(city)}>
            {city}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FleetService } from "./fleet.config";

export function FleetCard({ service }: { service: FleetService }) {
  const [hovered, setHovered] = useState(false);
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleEnter = () => {
    setHovered(true);
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % service.images.length);
    }, 1600);
  };

  const handleLeave = () => {
    setHovered(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIndex(0);
  };

  // Safety cleanup if the component unmounts mid-hover.
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="relative overflow-visible rounded-[22px] bg-white p-[18px] pt-10 shadow-sm"
    >
      <div
        className="relative flex h-[200px] overflow-hidden rounded-[18px]"
        style={{ backgroundColor: "#E9F0FB" }}
      >
        {/* Text panel — blurs and fades while the car sits over it */}
        <div
          className={cn(
            "relative z-10 flex w-[46%] flex-col justify-between p-7 pl-8 transition-all duration-500",
            hovered && "opacity-20 blur-[2px]"
          )}
        >
          <h3 className="text-xl font-bold leading-tight" style={{ color: "#1863E0" }}>
            {service.title}
            <span className="block" style={{ color: "#0B2A4A" }}>
              {service.subtitle}
            </span>
          </h3>
          <div
            className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white"
            style={{ boxShadow: "0 6px 14px rgba(11,42,74,0.10)" }}
          >
            <ArrowRight className="h-5 w-5" style={{ color: "#1863E0" }} />
          </div>
        </div>

        {/* Blue panel — solid color at rest. The photo is only ever mounted while
            `hovered` is true, so there's no ambiguity about "what's showing" when
            the cursor isn't over the card — nothing is, just the blue background. */}
        <div
          className="absolute inset-y-0 right-0 z-[1] w-[50%] overflow-hidden rounded-[18px]"
          style={{ backgroundColor: "#ea7236" }}
        >
          {hovered && (
            <Image
              key={index}
              src={service.images[index]}
              alt={`${service.title} view ${index + 1}`}
              fill
              className="object-cover"
            />
          )}
        </div>
      </div>

      {/* Vehicle cutout — floats just above the card, slides onto the text on hover */}
      <div
        className={cn(
          "pointer-events-none absolute -top-6 mt-15 right-15 z-20 w-[63%] transition-transform duration-700 ease-out sm:-top-8",
          hovered && "-translate-x-[50%]"
        )}
      >
        <div className="relative aspect-[4/3] w-full">
          <Image src={service.vehicleImage} alt={service.title} fill className="object-contain drop-shadow-2xl" />
        </div>
      </div>

      {/* Description + amenities — always visible */}
      <div className="px-3 pb-1.5 pt-5">
        <p className="max-w-[62ch] text-[0.98rem] leading-relaxed" style={{ color: "#5C7089" }}>
          {service.description}
        </p>

        <p className="mb-3 mt-4 text-sm font-bold" style={{ color: "#0B2A4A" }}>
          Amenities &amp; Highlights
        </p>
        <ul className="mb-6 flex flex-wrap gap-2.5">
          {service.amenities.map(({ label, icon: Icon }) => (
            <li
              key={label}
              style={{ backgroundColor: "#E9F0FB", color: "#0B2A4A" }}
              className="flex items-center gap-1.5 rounded-full px-3 py-2 text-[0.85rem] font-medium"
            >
              <Icon className="h-4 w-4" style={{ color: "#ea7236" }} />
              {label}
            </li>
          ))}
        </ul>

        <div className="flex gap-3">
          <button
            type="button"
            className="rounded-xl border-[1.5px] px-[22px] py-[13px] text-sm font-semibold transition-colors hover:bg-[#E9F0FB]"
            style={{ borderColor: "#C9DAF3", color: "#1863E0" }}
          >
            Check Price
          </button>
          <button
            type="button"
            className="group relative overflow-hidden rounded-xl px-[22px] py-[13px] shadow-md transition-all hover:shadow-lg"
            style={{ backgroundColor: "#ea7236" }}
          >
            <span className="absolute left-0 top-0 h-0 w-1/4 bg-[#37d4d9] transition-all duration-500 group-hover:h-full" />
            <span className="absolute bottom-0 left-1/4 h-0 w-1/4 bg-[#37d4d9] transition-all duration-500 group-hover:h-full" />
            <span className="absolute right-1/4 top-0 h-0 w-1/4 bg-[#37d4d9] transition-all duration-500 group-hover:h-full" />
            <span className="absolute bottom-0 right-0 h-0 w-1/4 bg-[#37d4d9] transition-all duration-500 group-hover:h-full" />
            <span className="relative z-10 text-sm font-semibold text-white">Book Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { OCCASIONS } from "./services.config";

export function Services() {
  const [activeId, setActiveId] = useState(OCCASIONS[0].id);
  const active = OCCASIONS.find((o) => o.id === activeId) ?? OCCASIONS[0];

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <div className="text-center">
        <span className="inline-block rounded-lg bg-amber-400 px-4 py-1.5 text-sm font-extrabold uppercase tracking-wide text-emerald-950">
          A Vehicle
        </span>
        <h2 className="mt-4 text-2xl font-extrabold text-emerald-900 sm:text-3xl">For Every Occasion</h2>
        <p className="mt-2 text-slate-500">Whatever the occasion for traveling, we have the right vehicle for you.</p>
      </div>

      {/* Occasion tabs */}
      <div className="mt-8 flex justify-center overflow-x-auto">
        <div className="inline-flex overflow-hidden rounded-full border border-emerald-900">
          {OCCASIONS.map((occasion) => (
            <button
              key={occasion.id}
              type="button"
              onClick={() => setActiveId(occasion.id)}
              className={cn(
                "whitespace-nowrap px-5 py-2.5 text-xs font-bold uppercase tracking-wide transition-colors sm:text-sm",
                activeId === occasion.id
                  ? "bg-amber-400 text-emerald-950"
                  : "bg-emerald-950 text-white hover:bg-emerald-900"
              )}
            >
              {occasion.label}
            </button>
          ))}
        </div>
      </div>

      {/* Example vehicle cards for the active occasion */}
      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        {active.examples.map((example) => (
          <div key={example.title} className="overflow-hidden rounded-2xl border-2 border-emerald-600 bg-white">
            <div className="relative h-56 w-full">
              <Image src={example.image} alt={example.title} fill className="object-cover" />
              <div className="absolute left-3 top-3 rounded-md bg-white px-2.5 py-1 shadow">
                <span className="text-xs font-bold text-emerald-700">Indiventure</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-slate-900">{example.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{example.description}</p>
              <div className="mt-5 flex gap-3">
                <a
                  href="#get-a-quote"
                  className="group relative flex-1 overflow-hidden rounded-xl bg-[#ea7236] px-5 py-2.5 text-center shadow-md transition-all hover:shadow-lg"
                >
                  <span className="absolute left-0 top-0 h-0 w-1/4 bg-[#37d4d9] transition-all duration-500 group-hover:h-full" />
                  <span className="absolute bottom-0 left-1/4 h-0 w-1/4 bg-[#37d4d9] transition-all duration-500 group-hover:h-full" />
                  <span className="absolute right-1/4 top-0 h-0 w-1/4 bg-[#37d4d9] transition-all duration-500 group-hover:h-full" />
                  <span className="absolute bottom-0 right-0 h-0 w-1/4 bg-[#37d4d9] transition-all duration-500 group-hover:h-full" />
                  <span className="relative z-10 text-sm font-bold text-white">Book Now</span>
                </a>
                <a
                  href="#get-a-quote"
                  className="group relative flex-1 overflow-hidden rounded-xl bg-[#0b2a4a] px-5 py-2.5 text-center shadow-md transition-all hover:shadow-lg"
                >
                  <span className="absolute left-0 top-0 h-0 w-1/4 bg-[#f2a93b] transition-all duration-500 group-hover:h-full" />
                  <span className="absolute bottom-0 left-1/4 h-0 w-1/4 bg-[#f2a93b] transition-all duration-500 group-hover:h-full" />
                  <span className="absolute right-1/4 top-0 h-0 w-1/4 bg-[#f2a93b] transition-all duration-500 group-hover:h-full" />
                  <span className="absolute bottom-0 right-0 h-0 w-1/4 bg-[#f2a93b] transition-all duration-500 group-hover:h-full" />
                  <span className="relative z-10 text-sm font-bold text-white">Read More</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
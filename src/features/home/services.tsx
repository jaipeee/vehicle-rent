"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { OCCASIONS } from "./services.config";

export function Services() {
  const [activeId, setActiveId] = useState(OCCASIONS[0].id);
  const active = OCCASIONS.find((o) => o.id === activeId) ?? OCCASIONS[0];

  return (
    <section className="mx-auto max-w-7xl px-3 py-10 sm:px-4 sm:py-16 lg:px-8">
      <div className="text-center">
        <span className="inline-block rounded-lg bg-[#ea7236] px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-emerald-100 sm:px-4 sm:py-1.5 sm:text-sm">
          A Vehicle
        </span>
        <h2 className="mt-3 text-xl font-extrabold text-slate-900 sm:mt-4 sm:text-3xl">
          For Every Occasion
        </h2>
        <p className="mt-2 text-xs text-slate-500 sm:text-base">
          Whatever the occasion for traveling, we have the right vehicle for you.
        </p>
      </div>

      {/* Occasion tabs: scrollable on phones, centered on larger screens */}
      <div className="mt-5 flex overflow-x-auto pb-1 [scrollbar-width:none] sm:mt-4 sm:justify-center [&::-webkit-scrollbar]:hidden">
        <div className="inline-flex shrink-0 overflow-hidden rounded-full border border-emerald-900">
          {OCCASIONS.map((occasion) => (
            <button
              key={occasion.id}
              type="button"
              onClick={() => setActiveId(occasion.id)}
              className={cn(
                "whitespace-nowrap px-3 py-2 text-[11px] font-bold uppercase tracking-wide transition-colors sm:py-2.5 sm:text-sm",
                activeId === occasion.id
                  ? "bg-[#37d4d9] text-emerald-950"
                  : "bg-[#ea7236] text-white hover:bg-[#37d4d9]"
              )}
            >
              {occasion.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2 per row on phones and up */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-8">
        {active.examples.map((example) => (
          <div
            key={example.title}
            className="flex h-full flex-col overflow-hidden rounded-xl border-2 border-emerald-600 bg-white sm:rounded-2xl"
          >
            <div className="relative h-28 w-full sm:h-56">
              <Image
                src={example.image}
                alt={example.title}
                fill
                sizes="(min-width: 640px) 50vw, 50vw"
                className="object-cover"
              />
              <div className="absolute left-2 top-2 rounded-md bg-white px-1.5 py-0.5 shadow sm:left-3 sm:top-3 sm:px-2.5 sm:py-1">
                <span className="text-[10px] font-bold text-emerald-700 sm:text-xs">
                  Indiventra
                </span>
              </div>
            </div>

            <div className="flex flex-1 flex-col p-3 sm:p-6">
              <h3 className="text-sm font-bold leading-tight text-slate-900 sm:text-lg">
                {example.title}
              </h3>
              <p className="mt-1.5 text-[11px] leading-snug text-slate-600 sm:mt-2 sm:text-sm sm:leading-relaxed">
                {example.description}
              </p>

              <div className="mt-auto flex gap-2 pt-3 sm:gap-3 sm:pt-5">
                <a
                  href="#get-a-quote"
                  className="group relative flex-1 overflow-hidden rounded-lg bg-[#ea7236] px-2 py-2 text-center shadow-md transition-all hover:shadow-lg sm:rounded-xl sm:px-5 sm:py-2.5"
                >
                  <span className="absolute left-0 top-0 h-0 w-1/4 bg-[#37d4d9] transition-all duration-500 group-hover:h-full" />
                  <span className="absolute bottom-0 left-1/4 h-0 w-1/4 bg-[#37d4d9] transition-all duration-500 group-hover:h-full" />
                  <span className="absolute right-1/4 top-0 h-0 w-1/4 bg-[#37d4d9] transition-all duration-500 group-hover:h-full" />
                  <span className="absolute bottom-0 right-0 h-0 w-1/4 bg-[#37d4d9] transition-all duration-500 group-hover:h-full" />
                  <span className="relative z-10 whitespace-nowrap text-[11px] font-bold text-white sm:text-sm">
                    Book Now
                  </span>
                </a>
                <a
                  href="#get-a-quote"
                  className="group relative flex-1 overflow-hidden rounded-lg bg-[#03070a] px-2 py-2 text-center shadow-md transition-all hover:shadow-lg sm:rounded-xl sm:px-5 sm:py-2.5"
                >
                  <span className="absolute left-0 top-0 h-0 w-1/4 bg-[#37d4d9] transition-all duration-500 group-hover:h-full" />
                  <span className="absolute bottom-0 left-1/4 h-0 w-1/4 bg-[#37d4d9] transition-all duration-500 group-hover:h-full" />
                  <span className="absolute right-1/4 top-0 h-0 w-1/4 bg-[#37d4d9] transition-all duration-500 group-hover:h-full" />
                  <span className="absolute bottom-0 right-0 h-0 w-1/4 bg-[#37d4d9] transition-all duration-500 group-hover:h-full" />
                  <span className="relative z-10 whitespace-nowrap text-[11px] font-bold text-white sm:text-sm">
                    Read More
                  </span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
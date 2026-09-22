"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Testimonial } from "@/lib/types";

const FALLBACK_COVER = "/placeholder/testimonial-cover.jpg";

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials.length) return null;

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="text-center text-3xl font-extrabold text-slate-900 sm:text-4xl">
          What Our <span className="text-amber-500">Customers Say</span>
        </h2>
        <p className="mt-3 text-center text-slate-500">Real experiences from real travellers.</p>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-amber-400" />

        <Carousel opts={{ align: "start", loop: testimonials.length > 3 }} className="mt-12">
          <CarouselContent>
            {testimonials.map((t) => (
              <CarouselItem key={t.id} className="sm:basis-1/2 lg:basis-1/3">
                <div className="h-full px-1 pb-2">
                  <div className="relative">
                    <div className="relative h-56 w-full overflow-hidden rounded-2xl">
                      <Image src={t.coverImage ?? FALLBACK_COVER} alt={t.name} fill className="object-cover" />
                    </div>

                    {/* Avatar + name + role + rating card, overlapping the bottom of the photo */}
                    <div className="absolute -bottom-8 left-4 right-4 flex items-center gap-3 rounded-xl bg-white p-3 shadow-md">
                      {t.imageUrl ? (
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                          <Image src={t.imageUrl} alt={t.name} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-400 font-bold text-white">
                          {t.name.charAt(0)}
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold text-slate-900">{t.name}</p>
                        <div className="flex flex-wrap items-center gap-x-2">
                          {(t.role ?? t.cityName) && (
                            <span className="truncate text-xs italic text-slate-500">{t.role ?? t.cityName}</span>
                          )}
                          <span className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "h-3 w-3",
                                  i < Math.round(t.rating)
                                    ? "fill-amber-400 text-amber-400"
                                    : "fill-slate-200 text-slate-200"
                                )}
                              />
                            ))}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="mt-10 text-sm leading-relaxed text-slate-600">{t.message}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4 sm:-left-6" />
          <CarouselNext className="-right-4 sm:-right-6" />
        </Carousel>
      </div>
    </section>
  );
}
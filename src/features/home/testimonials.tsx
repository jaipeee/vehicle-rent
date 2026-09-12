"use client";

import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Testimonial } from "@/lib/types";

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials.length) return null;

  return (
    <section className="bg-emerald-50 py-16">
      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-emerald-900 sm:text-3xl">What Our Clients Say</h2>
        <Carousel className="mt-10" opts={{ loop: true }}>
          <CarouselContent>
            {testimonials.map((t) => (
              <CarouselItem key={t.id}>
                <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
                  <div className="flex justify-center gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="mt-4 text-slate-600">&ldquo;{t.message}&rdquo;</p>
                  <p className="mt-4 font-semibold text-emerald-900">{t.name}</p>
                  {t.cityName && <p className="text-sm text-slate-400">{t.cityName}</p>}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
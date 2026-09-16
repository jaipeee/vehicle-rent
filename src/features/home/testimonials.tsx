import { Quote, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/lib/types";

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

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.id} className="relative rounded-2xl bg-white p-8 text-center shadow-sm">
              <Quote className="absolute left-6 top-6 h-8 w-8 text-amber-100" fill="currentColor" />

              <div className="flex justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < Math.round(t.rating) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"
                    )}
                  />
                ))}
              </div>

              <p className="mt-4 italic text-slate-600">&ldquo;{t.message}&rdquo;</p>

              <div className="mt-6 flex items-center justify-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-400 font-bold text-white">
                  {t.name.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-slate-900">{t.name}</p>
                  {t.cityName && <p className="text-xs text-slate-400">{t.cityName}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
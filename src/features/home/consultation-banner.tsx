import { ArrowRight } from "lucide-react";

export function ConsultationBanner() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-400 to-amber-500 px-6 py-8 shadow-xl sm:px-10 sm:py-10">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-16 right-24 h-52 w-52 rounded-full bg-white/10" />

        <div className="relative z-10 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <h2 className="text-center text-xl font-extrabold uppercase tracking-tight text-emerald-950 sm:text-left sm:text-2xl">
            Get Your Free Quote Today
          </h2>
          <a
            href="#get-a-quote"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-emerald-950 px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Contact With Us
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
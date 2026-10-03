import { PlayCircle } from "lucide-react";

// Placeholder — set your real YouTube video ID once you have one.
const ABOUT_VIDEO_ID = "MVYRGxM7NtU?si=H-etPJKH3gdVg1TU";

// Placeholder copy — swap for your real company story once ready.
const LEFT_PARAGRAPH =
  "Indiventra is a leading vehicle rental service provider in India, delivering reliable and comfortable Vehicle Rental solutions since 2018. With years of experience in the travel and mobility industry, we offer professional car rental, luxury bus rental and tempo traveller rental services for every type of journey. Our wide range of Vehicle Rental solutions for airport transfers, local sightseeing, outstation travel, corporate transportation, destination weddings, family vacations, group tours, and pilgrimage trips. We serve individuals, families, businesses, and large groups by providing well-managed vehicles on rent across major cities and travel destinations throughout India.";
const RIGHT_PARAGRAPH =
  "Our vehicle rental fleet is designed to match different travel requirements, including premium cars, SUVs, luxury cars, luxury vans, tempo travellers, Maharaja tempo travellers, Force Urbania, mini buses, luxury buses, Volvo buses, and sleeper buses. Every vehicle is carefully inspected and maintained before every journey to ensure a safe, comfortable, and smooth travel experience. Our vehicles come equipped with modern amenities such as comfortable seating, air conditioning, GPS tracking, entertainment systems, spacious interiors, and advanced safety features. Along with quality vehicles, our experienced professional drivers have excellent knowledge of highways, city routes, tourist destinations, and long-distance travel requirements.";
const BOTTOM_PARAGRAPH =
  "ooking vehicle on rent with Indiventra is simple, transparent, and hassle-free. Customers can easily explore available vehicles on rent, select the right option based on their travel needs, and hire  reliable Vehicle on rent with clear pricing and dedicated support. Whether you need a car rental for business travel, a tempo traveller for a family trip & Business trips & Event, a luxury bus for events, or complete transportation management for weddings and corporate journeys, Indiventra delivers dependable travel solutions backed by professional service and customer-focused assistance.";
export function About() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <h2 className="text-center text-2xl font-bold text-emerald-900 sm:text-3xl">
        KNOW MORE ABOUT INDIVENTRA <br/> YOUR TRUSTED VEHICLE RENTAL PARTNER SINCE 2018
      </h2>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_minmax(0,580px)_1fr] lg:items-center lg:gap-10">
        <p className="text-slate-600 lg:text-right">{LEFT_PARAGRAPH}</p>

        {/* Video "surrounded" by a white framed card */}
        <div className="mx-auto w-full max-w-2xl rounded-2xl border border-slate-100 bg-slate-900/40 p-1.5 shadow-xl">
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-100">
            {ABOUT_VIDEO_ID ? (
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${ABOUT_VIDEO_ID}`}
                title="About Indiventra Tour & Travel"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-slate-400">
                <PlayCircle className="h-12 w-12" />
                <p className="text-sm">Company video coming soon</p>
              </div>
            )}
          </div>
        </div>

        <p className="text-slate-600">{RIGHT_PARAGRAPH}</p>
      </div>

      <p className="mx-auto mt-10 max-w-3xl text-center text-slate-600">{BOTTOM_PARAGRAPH}</p>
    </section>
  );
}
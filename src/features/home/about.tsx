import { PlayCircle } from "lucide-react";

// Placeholder — set your real YouTube video ID once you have one.
const ABOUT_VIDEO_ID = "MVYRGxM7NtU?si=H-etPJKH3gdVg1TU";

// Placeholder copy — swap for your real company story once ready.
const LEFT_PARAGRAPH =
  "Indiventure Tour & Travel has spent years building a fleet you can trust — every vehicle is regularly serviced, every driver vetted, so your trip starts stress-free. Indiventure Tour & Travel has spent years building a fleet you can trust — every vehicle is regularly serviced, every driver vetted, so your trip starts stress-free. ";
const RIGHT_PARAGRAPH =
  "From a single sedan for a corporate meeting to a full luxury bus for a wedding party, we scale to whatever your event needs, in every city we serve.";
const BOTTOM_PARAGRAPH =
  "Our promise is simple: on-time pickups, transparent pricing, and a team that treats every trip — big or small — with the same level of care.";
export function About() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <h2 className="text-center text-2xl font-bold text-emerald-900 sm:text-3xl">
        About Indiventure Tour &amp; Travel
      </h2>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_minmax(0,640px)_1fr] lg:items-center lg:gap-10">
        <p className="text-slate-600 lg:text-right">{LEFT_PARAGRAPH}</p>

        {/* Video "surrounded" by a white framed card */}
        <div className="mx-auto w-full max-w-2xl rounded-3xl border border-slate-100 bg-white p-3 shadow-xl">
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-100">
            {ABOUT_VIDEO_ID ? (
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${ABOUT_VIDEO_ID}`}
                title="About Indiventure Tour & Travel"
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
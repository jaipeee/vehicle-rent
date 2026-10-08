"use client";

import { useState } from "react";
import {
  PlayCircle,
  Share2,
  CalendarClock,
  ShieldCheck,
  Users,
} from "lucide-react";
import { FaYoutube } from "react-icons/fa6";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["600"],
  display: "swap",
});

// YouTube video
const ABOUT_VIDEO_ID = "MVYRGxM7NtU";
const VIDEO_TITLE = "Sierra | Glimpse 1 | The Legend Returns";
const VIDEO_CHANNEL = "INDIVENTRA";
const VIDEO_THUMBNAIL = `https://img.youtube.com/vi/${ABOUT_VIDEO_ID}/maxresdefault.jpg`;

const LEFT_PARAGRAPH =
  "Indiventra is a leading vehicle rental service provider in India, delivering reliable and comfortable Vehicle Rental solutions since 2018. With years of experience in the travel and mobility industry, we offer professional car rental, luxury bus rental and tempo traveller rental services for every type of journey. Our wide range of Vehicle Rental solutions for airport transfers, local sightseeing, outstation travel, corporate transportation, destination weddings, family vacations, group tours, and pilgrimage trips.";

const RIGHT_PARAGRAPH =
  "Our vehicle rental fleet is designed to match different travel requirements, including premium cars, SUVs, luxury cars, luxury vans, tempo travellers, Maharaja tempo travellers, Force Urbania, mini buses, luxury buses, Volvo buses, and sleeper buses. Every vehicle is carefully inspected and maintained before every journey to ensure a safe, comfortable, and smooth travel experience";

const BUTTOM_PARAGRAPH = "We serve individuals, families, businesses, and large groups by providing well-managed vehicles on rent across major cities and travel destinations throughout India. Booking vehicle on rent with Indiventra is simple, transparent, and hassle-free."
const BUTTOM_PARAGRAPH_1 = "Our vehicles come equipped with modern amenities such as comfortable seating, air conditioning, GPS tracking, entertainment systems, spacious interiors, and advanced safety features. Along with quality vehicles, our experienced professional drivers have excellent knowledge of highways, city routes, tourist destinations, and long-distance travel requirements."
const BUTTOM_PARAGRAPH_2 = "Customers can easily explore available vehicles on rent, select the right option based on their travel needs, and hire  reliable Vehicle on rent with clear pricing and dedicated support. Indiventra delivers dependable travel solutions backed by professional service and customer-focused assistance."

const FEATURES = [
  {
    icon: CalendarClock,
    title: "On-Time Pickups",
    desc: "We value your time and ensure punctual service.",
    bg: "bg-amber-100",
    color: "text-amber-600",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Pricing",
    desc: "Clear rates with no hidden charges.",
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
  {
    icon: Users,
    title: "Same Level of Care",
    desc: "Every trip, big or small, gets our full attention.",
    bg: "bg-emerald-100",
    color: "text-emerald-600",
  },
];

export function About() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="bg-gradient-to-b from-amber-50 to-white py-16 pb-5">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-amber-600">
            <span className="h-px w-8 bg-amber-400" />
            About Us
            <span className="h-px w-8 bg-amber-400" />
          </div>

          <h2 className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-4xl">
            About <span className="text-amber-500">Indiventra</span> Tour &amp;
            Travel
          </h2>

          <p className="mt-2 text-slate-500">
            Your Journey. Our Commitment.
          </p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_minmax(0,480px)_1fr] lg:items-center">
          {/* Left Content */}
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">
              Travel Made Easy,
            </h3>

            <p
              className={`${playfair.className} text-2xl italic text-amber-500`}
            >
              Since Day One
            </p>

            <p className="mt-4 text-[13px] leading-relaxed text-slate-600">
              {LEFT_PARAGRAPH}
            </p>
          </div>

          {/* Video */}
          <div className="group relative block aspect-video w-full overflow-hidden rounded-2xl shadow-xl">
            {!playing && (
              <>
                {/* Thumbnail */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={VIDEO_THUMBNAIL}
                  alt={VIDEO_TITLE}
                  className="h-full w-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40" />

                {/* Video Info */}
                <div className="absolute left-4 top-4 flex items-center gap-2 text-white">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-xs font-bold">
                    {VIDEO_CHANNEL.charAt(0)}
                  </span>

                  <div>
                    <p className="text-sm font-semibold leading-tight">
                      {VIDEO_TITLE}
                    </p>

                    <p className="text-xs text-white/80">
                      {VIDEO_CHANNEL}
                    </p>
                  </div>
                </div>

                {/* Play Button */}
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  aria-label="Play video"
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <PlayCircle className="h-16 w-16 text-white drop-shadow-lg transition-transform group-hover:scale-110" />
                </button>

                {/* Share Icon */}
                <span className="absolute bottom-4 left-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white">
                  <Share2 className="h-4 w-4" />
                </span>

                {/* Watch on YouTube */}
                <a
                  href={`https://www.youtube.com/watch?v=${ABOUT_VIDEO_ID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-900 transition-transform hover:scale-105"
                >
                  <FaYoutube className="h-4 w-4 text-red-600" />
                  Watch on YouTube
                </a>
              </>
            )}

            {/* Inline YouTube Player */}
            {playing && (
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${ABOUT_VIDEO_ID}?autoplay=1`}
                title={VIDEO_TITLE}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>

          {/* Right Content */}
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">
              From Small Trips
            </h3>

            <p className="text-xl font-extrabold text-slate-900">
              to Big Celebrations
            </p>

            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              {RIGHT_PARAGRAPH}
            </p>
          </div>
        </div>

        {/* Feature Strip */}
        <div className="mx-auto mt-10 flex max-w-4xl flex-col divide-y divide-slate-100 rounded-2xl bg-white p-6 pb-0 shadow-md sm:flex-row sm:divide-x sm:divide-y-0">
          {FEATURES.map(({ icon: Icon, title, desc, bg, color }) => (
            <div
              key={title}
              className="flex flex-1 items-start gap-3 px-4 py-3"
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${bg}`}
              >
                <Icon className={`h-5 w-5 ${color}`} />
              </span>

              <div>
                <p className="font-bold text-slate-900">{title}</p>
                <p className="text-xs text-slate-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
          <div className=" mt-5 bg-amber-500/10 rounded-2xl">
            <p className="p-3  text-sm leading-relaxed">{BUTTOM_PARAGRAPH}</p>
            <p className="p-3  text-sm leading-relaxed">{BUTTOM_PARAGRAPH_1}</p>
            <p className="p-3 text-sm leading-relaxed">{BUTTOM_PARAGRAPH_2}</p>
          </div>
      </div>
    </section>
  );
}
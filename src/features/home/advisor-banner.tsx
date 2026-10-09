import Image from "next/image";

const ADVISOR_PHOTO =
  "https://res.cloudinary.com/yhuaios0/image/upload/v1791056016/Friendly_Travel_Planning_Consultation.png";

export function AdvisorBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:py-10 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#ea7236] to-[#a7623f] shadow-xl">
        <div className="grid items-stretch sm:grid-cols-[1.2fr_1fr]">
          {/* Photo: on top on phones, on the right from `sm` up */}
          <div className="relative order-first h-56 w-full sm:order-last sm:h-auto sm:min-h-[320px]">
            <Image
              src={ADVISOR_PHOTO}
              alt="Travel advisor"
              fill
              sizes="(max-width: 640px) 100vw, 40vw"
              className="object-cover object-top"
            />
            {/* Phone: fade the bottom of the photo into the orange background */}
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#ea7236] to-transparent sm:hidden" />
            {/* Desktop: fade the left edge into the text side */}
            <div className="absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-[#ea7236] to-transparent sm:block" />
          </div>

          {/* Text */}
          <div className="px-5 pb-8 pt-2 sm:px-10 sm:py-10 lg:py-14">
            <h2 className="text-2xl font-extrabold leading-snug text-white sm:text-3xl">
              Talk to a <span className="text-amber-300">Travel Advisor</span> for Your Next Trip
            </h2>
            <div className="mt-3 h-1 w-14 rounded-full bg-amber-300" />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/90 sm:text-base">
              Not sure which vehicle fits your group, budget, or route? Talk to our travel advisors — free of cost —
              for personalized recommendations on rentals for trips, weddings, and corporate events.
            </p>
            <a
              href="#get-a-quote"
              className="mt-6 inline-flex items-center rounded-full border-2 border-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-[#ea7236]"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
import Image from "next/image";

// Placeholder — swap /placeholder/advisor.jpg for a real photo of your team/advisor.
const ADVISOR_PHOTO = "https://res.cloudinary.com/yhuaios0/image/upload/v1790181270/main-sample.png";

export function AdvisorBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#ea7236] to-[#a7623f] shadow-xl">
        <div className="grid items-center gap-8 sm:grid-cols-[1.2fr_1fr]">
          <div className="px-6 py-10 sm:px-10 lg:py-14">
            <h2 className="text-2xl font-extrabold leading-snug text-white sm:text-3xl">
              Talk to a <span className="text-amber-400">Travel Advisor</span> for Your Next Trip
            </h2>
            <div className="mt-3 h-1 w-14 rounded-full bg-amber-400" />
            <p className="mt-4 max-w-md text-sm text-emerald-100/90 sm:text-base">
              Not sure which vehicle fits your group, budget, or route? Talk to our travel advisors — free of cost —
              for personalized recommendations on rentals for trips, weddings, and corporate events.
            </p>
            <a
              href="#get-a-quote"
              className="mt-6 inline-flex items-center rounded-full border-2 border-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-emerald-800"
            >
              Book Now
            </a>
          </div>

          <div className="relative hidden h-full min-h-[280px] sm:block">
            <Image src={ADVISOR_PHOTO} alt="Travel advisor" fill className="object-cover object-top" />
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#ea7236]to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
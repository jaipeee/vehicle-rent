import Image from "next/image";
import { cn } from "@/lib/utils";

interface Step {
  number: string;
  title: string;
  description: string;
  img: string;
  theme: "pink" | "teal" | "blue" | "amber";
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "Select Your Vehicle",
    description: "Choose a traveller based on your group size and preferences.",
    img: "https://res.cloudinary.com/yhuaios0/image/upload/v1791053094/Select_Your_Vehicle.png",
    theme: "pink",
  },
  {
    number: "02",
    title: "Share Trip Details",
    description: "Tell us your destination, dates, and duration via call, WhatsApp, or Email.",
    img: "https://res.cloudinary.com/yhuaios0/image/upload/v1791053438/Share_Trip_Details.png",
    theme: "teal",
  },
  {
    number: "03",
    title: "Get Instant Quote",
    description: "Get pricing quotes for vehicle rental or a custom trip.",
    img: "https://res.cloudinary.com/yhuaios0/image/upload/v1791053095/Get_Instant_Quote.png",
    theme: "blue",
  },
  {
    number: "04",
    title: "Confirm & Ride",
    description: "Book and enjoy the ride, we will handle the rest.",
    img: "https://res.cloudinary.com/yhuaios0/image/upload/v1791053095/Travel_Booking_Confirmed.png",
    theme: "amber",
  },
];

const THEME_STYLES: Record<
  Step["theme"],
  { card: string; badge: string; progress: string }
> = {
  pink: { card: "bg-white", badge: "bg-[#ea7236]", progress: "bg-slate-900" },
  teal: { card: "bg-white", badge: "bg-[#ea7236]", progress: "bg-emerald-500" },
  blue: { card: "bg-white", badge: "bg-[#ea7236]", progress: "bg-blue-500" },
  amber: { card: "bg-white", badge: "bg-[#ea7236]", progress: "bg-amber-500" },
};

export function HowItWorks() {
  return (
    <section className="bg-[#fe980a2d] py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <div className="mb-3 flex items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400 sm:mb-4 sm:gap-3 sm:text-xs">
            <span className="h-px w-6 bg-slate-900 sm:w-9" /> Your Journey • Our Priority
            <span className="h-px w-6 bg-slate-900 sm:w-9" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 sm:text-4xl">
            Simple Steps to{" "}
            <span className="bg-gradient-to-r from-[#eb6623] to-[#24d6dc] bg-clip-text text-transparent">
              Your Next Ride
            </span>
          </h2>
          <p className="mt-2 text-sm text-slate-500 sm:mt-3 sm:text-base">
            From choosing to riding, we make it easy, fast and comfortable.
          </p>
        </div>

        {/* 2 per row on phones, 4 per row on large screens */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-6 lg:grid-cols-4">
          {STEPS.map((step) => {
            const theme = THEME_STYLES[step.theme];
            return (
              <div
                key={step.number}
                className={cn(
                  "flex flex-col rounded-2xl border border-[#eb6623] p-3 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl sm:rounded-[22px] sm:p-6",
                  theme.card
                )}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white shadow sm:h-9 sm:w-9 sm:text-xs",
                      theme.badge
                    )}
                  >
                    {step.number}
                  </span>
                  <span className="text-[9px] font-bold tracking-wide text-slate-400 sm:text-[11px]">
                    STEP {step.number}
                  </span>
                </div>

                <div className="relative my-2 aspect-[4/3] w-full">
                  <Image
                    src={step.img}
                    alt={step.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-contain"
                  />
                </div>

                <h3 className="text-sm font-bold leading-tight text-slate-900 sm:text-lg">
                  {step.title}
                </h3>
                <p className="mt-1 text-[11px] leading-snug text-slate-500 sm:text-sm">
                  {step.description}
                </p>

                <div className="mt-auto flex gap-1 pt-4 sm:gap-1.5 sm:pt-6">
                  <span className={cn("h-1 flex-[1.6] rounded-full", theme.progress)} />
                  <span className="h-1 flex-1 rounded-full bg-slate-900/10" />
                  <span className="h-1 flex-1 rounded-full bg-slate-900/10" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
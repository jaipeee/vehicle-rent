import { Car, MessageCircleHeart, Tag, CheckCircle2, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  number: string;
  title: string;
  description: string;
  img : string;
  theme: "pink" | "teal" | "blue" | "amber";
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "Select Your Vehicle",
    description: "Choose a traveller based on your group size and preferences.",
    img :"https://res.cloudinary.com/yhuaios0/image/upload/v1791053094/Select_Your_Vehicle.png",
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
  { card: string; badge: string; iconBg: string; iconText: string; progress: string;}
> = {
  pink: {
    card: "bg-white",
    badge: "bg-[#ea7236]",
    iconBg: "bg-white",
    iconText: "text-rose-500",
    progress: "bg-slate-900",
  },
  teal: {
    card: "bg-white",
    badge: "bg-[#ea7236]",
    iconBg: "bg-emerald-100",
    iconText: "text-emerald-600",
    progress: "bg-emerald-500",
  },
  blue: {
    card: "bg-white",
    badge: "bg-[#ea7236]",
    iconBg: "bg-blue-100",
    iconText: "text-blue-500",
    progress: "bg-blue-500",
  },
  amber: {
    card: "bg-white",
    badge: "bg-[#ea7236]",
    iconBg: "bg-amber-100",
    iconText: "text-amber-500",
    progress: "bg-amber-500",
  },
};

export function HowItWorks() {
  return (
    <section className="bg-[#fe980a2d] py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
            <span className="h-px w-9 bg-slate-900" /> Your Journey • Our Priority
            <span className="h-px w-9 bg-slate-900" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Simple Steps to{" "}
            <span className="bg-gradient-to-r from-[#eb6623] to-[#24d6dc] bg-clip-text text-transparent">
              Your Next Ride
            </span>
          </h2>
          <p className="mt-3 text-slate-500">From choosing to riding, we make it easy, fast and comfortable.</p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => {
            const theme = THEME_STYLES[step.theme];
            const Icon = step.img;
            return (
              <div
                key={step.number}
                className={cn(
                  "flex flex-col rounded-[22px] border border-[#eb6623] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl",
                  theme.card
                )}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white shadow",
                      theme.badge
                    )}
                  >
                    {step.number}
                  </span>
                  <span className="text-[11px] font-bold tracking-wide text-slate-400">STEP {step.number}</span>
                </div>

                <div className="my-2 flex flex-1 items-center justify-center">
                  <img src={step.img} />
                </div>

                {/* <div className={cn("mb-4 flex h-11 w-11 items-center justify-center rounded-xl", theme.iconBg)}>
                  <Icon className={cn("h-5 w-5", theme.iconText)} />
                </div> */}

                <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                <p className=" text-sm text-slate-500">{step.description}</p>

                <div className="mt-auto flex gap-1.5 pt-6">
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
import Image from "next/image";
import { Car, Headset, ReceiptText, ShieldCheck, Sparkles, UserCheck, ChevronRight, type LucideIcon } from "lucide-react";

interface Reason {
  icon: LucideIcon;
  title: string;
  points: string[];
  image: string;
}

const REASONS: Reason[] = [
  {
    icon: Car,
    title: "Widest Range of Vehicles",
    points: [
      "Sedans to 40-seater luxury buses",
      "A fit for every occasion — trips, weddings, corporate travel",
      "Well-maintained interiors with premium amenities",
    ],
    image: "https://res.cloudinary.com/yhuaios0/image/upload/v1791053094/Select_Your_Vehicle.png",
  },
  {
    icon: UserCheck,
    title: "Trained & Experienced Drivers",
    points: [
      "Verified, background-checked drivers",
      "Trained in safe, defensive driving",
      "Always on time for pickup",
    ],
    image: "https://res.cloudinary.com/yhuaios0/image/upload/v1791053095/Get_Instant_Quote.png",
  },
  {
    icon: Headset,
    title: "24×7 Customer Support",
    points: [
      "Round-the-clock booking assistance",
      "Real-time support during your trip",
      "Quick response to any query",
    ],
    image: "https://res.cloudinary.com/yhuaios0/image/upload/v1791053511/Confirmed_Journey_Booking_Illustration.png",
  },
  {
    icon: ReceiptText,
    title: "Transparent Pricing",
    points: [
      "No hidden charges, ever",
      "Final bill matches your quote exactly",
      "Pay only for what you book",
    ],
    image: "https://res.cloudinary.com/yhuaios0/image/upload/v1791053438/Share_Trip_Details.png",
  },
  {
    icon: Sparkles,
    title: "Deep Cleaning & Hygiene",
    points: [
      "Every vehicle sanitized before each trip",
      "Regular maintenance checks",
      "Fresh, hygienic interiors",
    ],
    image: "https://res.cloudinary.com/yhuaios0/image/upload/v1791053512/24_7_Travel_Support_Illustration.png",
  },
  {
    icon: ShieldCheck,
    title: "No Last-Minute Cancellations",
    points: [
      "Once booked, your ride is guaranteed",
      "No surprise cancellations",
      "Reliable service you can plan around",
    ],
    image: "https://res.cloudinary.com/yhuaios0/image/upload/v1791053513/Travel_Booking_Quote_to_Receipt_Illustration.png",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-emerald-50 py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-8">
        <h2 className="text-center text-xl font-bold text-emerald-900 sm:text-3xl">
          Why Indiventra Is the Best Choice
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-xs text-slate-600 sm:mt-3 sm:text-base">
          A reliable, customer-first travel partner across every city we serve.
        </p>

        {/* 2 columns on phones => 4 cards visible per screen */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-6 lg:grid-cols-3">
          {REASONS.map(({ icon: Icon, title, points, image }) => (
            <div
              key={title}
              className="flex flex-col overflow-hidden rounded-xl border border-emerald-100 bg-white shadow-sm sm:rounded-2xl"
            >
              {/* Full image visible: aspect ratio box + object-contain (no cropping) */}
              <div className="relative aspect-[4/3] w-full bg-emerald-50/60">
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="object-contain p-2 sm:p-4"
                />
              </div>

              <div className="flex flex-1 flex-col p-3 sm:p-6">
                <div className="flex items-center gap-2 sm:block">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 sm:h-12 sm:w-12">
                    <Icon className="h-4 w-4 text-emerald-700 sm:h-6 sm:w-6" />
                  </div>
                  <h3 className="text-xs font-bold leading-tight text-slate-900 sm:mt-4 sm:text-lg">
                    {title}
                  </h3>
                </div>

                {/* Bullet points hidden on phones to keep cards compact */}
                <ul className="mt-3 hidden space-y-2 sm:block">
                  {points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-slate-600">
                      <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
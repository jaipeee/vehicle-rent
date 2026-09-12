import { Car, Headset, ReceiptText, ShieldCheck, Sparkles, UserCheck, ChevronRight, type LucideIcon } from "lucide-react";

interface Reason {
  icon: LucideIcon;
  title: string;
  points: string[];
}

// Original copy for Indiventure — structure inspired by common "why choose us"
// sections, not copied text.
const REASONS: Reason[] = [
  {
    icon: Car,
    title: "Widest Range of Vehicles",
    points: [
      "Sedans to 40-seater luxury buses",
      "A fit for every occasion — trips, weddings, corporate travel",
      "Well-maintained interiors with premium amenities",
    ],
  },
  {
    icon: UserCheck,
    title: "Trained & Experienced Drivers",
    points: [
      "Verified, background-checked drivers",
      "Trained in safe, defensive driving",
      "Always on time for pickup",
    ],
  },
  {
    icon: Headset,
    title: "24×7 Customer Support",
    points: [
      "Round-the-clock booking assistance",
      "Real-time support during your trip",
      "Quick response to any query",
    ],
  },
  {
    icon: ReceiptText,
    title: "Transparent Pricing",
    points: [
      "No hidden charges, ever",
      "Final bill matches your quote exactly",
      "Pay only for what you book",
    ],
  },
  {
    icon: Sparkles,
    title: "Deep Cleaning & Hygiene",
    points: [
      "Every vehicle sanitized before each trip",
      "Regular maintenance checks",
      "Fresh, hygienic interiors",
    ],
  },
  {
    icon: ShieldCheck,
    title: "No Last-Minute Cancellations",
    points: [
      "Once booked, your ride is guaranteed",
      "No surprise cancellations",
      "Reliable service you can plan around",
    ],
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-emerald-50 py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-emerald-900 sm:text-3xl">
          Why Indiventure Is the Best Choice
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
          A reliable, customer-first travel partner across every city we serve.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map(({ icon: Icon, title, points }) => (
            <div key={title} className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                <Icon className="h-6 w-6 text-emerald-700" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">{title}</h3>
              <ul className="mt-3 space-y-2">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-slate-600">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
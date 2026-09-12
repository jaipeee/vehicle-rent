import { Briefcase, Crown, Gem, PiggyBank, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Category {
  name: string;
  icon: LucideIcon;
  gradient: string;
}

const CATEGORIES: Category[] = [
  { name: "Economy", icon: PiggyBank, gradient: "from-lime-400 to-lime-500" },
  { name: "Premium", icon: Briefcase, gradient: "from-emerald-600 to-emerald-700" },
  { name: "Luxury", icon: Gem, gradient: "from-rose-400 to-rose-500" },
  { name: "Maharaja", icon: Crown, gradient: "from-violet-600 to-violet-700" },
];

export function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <h2 className="text-center text-2xl font-bold text-emerald-900 sm:text-3xl">
        4 Categories of Vehicles to Suit Every Budget
      </h2>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES.map(({ name, icon: Icon, gradient }) => (
          <div
            key={name}
            className={cn(
              "flex flex-col items-center rounded-3xl bg-gradient-to-br p-8 text-center text-white shadow-lg transition-transform duration-300 hover:-translate-y-1",
              gradient
            )}
          >
            <Icon className="h-16 w-16" strokeWidth={1.5} />
            <h3 className="mt-8 text-xl font-extrabold tracking-wide">{name.toUpperCase()}</h3>
            <div className="mt-5 flex w-full items-center gap-2">
              <span className="h-px flex-1 bg-white/40" />
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/60">
                <Icon className="h-4 w-4" />
              </span>
              <span className="h-px flex-1 bg-white/40" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
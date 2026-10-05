import Image from "next/image";
import { Briefcase, Crown, Gem, PiggyBank, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Category {
  name: string;
  icon: LucideIcon;
  gradient: string;
  image: string;
}

const CATEGORIES: Category[] = [
  { name: "Standard", icon: PiggyBank, gradient: "from-lime-400 to-lime-500", image: "https://res.cloudinary.com/yhuaios0/image/upload/v1789756966/ECONOMY_CATEGORY.png" },
  { name: "Preferred", icon: Briefcase, gradient: "from-emerald-600 to-emerald-700", image: "https://res.cloudinary.com/yhuaios0/image/upload/v1789757379/ChatGPT_Image_Sep_19_2026_12_18_57_AM_convert.io.webp" },
  { name: "Regal", icon: Gem, gradient: "from-rose-400 to-rose-500", image: "https://res.cloudinary.com/yhuaios0/image/upload/v1789757513/ChatGPT_Image_Sep_19_2026_12_21_32_AM_convert.io.webp" },
  { name: "Maharaja", icon: Crown, gradient: "from-violet-600 to-violet-700", image: "https://res.cloudinary.com/yhuaios0/image/upload/v1789757700/ChatGPT_Image_Sep_19_2026_12_24_42_AM_convert.io.webp" },
];

export function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-2 py-8 lg:px-8">
      <h2 className="text-center text-2xl font-bold text-emerald-900 sm:text-3xl">
        4 Categories of Vehicles to Suit Every Budget
      </h2>

      {/* extra top margin + row gap so the overflowing images don't collide with the title/other cards */}
      <div className="mt-20 grid gap-x-6 gap-y-20 sm:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES.map(({ name, icon: Icon, gradient, image }) => (
          <div
            key={name}
            className={cn(
              "group relative flex flex-col items-center rounded-3xl bg-gradient-to-br px-5 pb-6 text-center text-white shadow-lg transition-transform duration-300 hover:-translate-y-1",
              gradient
            )}
          >
            {/* Image: ~30% of its height sits above the card */}
            <div className="relative -mt-20 h-45 w-full">
              <Image
                src={image}
                alt={name}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-contain drop-shadow-[0_18px_18px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-105"
              />
            </div>

            <h3 className="mt-4 text-xl font-extrabold tracking-wide">{name.toUpperCase()}</h3>
            <div className="mt-5 flex w-full items-center gap-2">
              <span className="h-px flex-1 bg-white/40" />
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/60">
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
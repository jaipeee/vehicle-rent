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
    <section className="mx-auto max-w-7xl px-3 py-8 sm:px-2 lg:px-8">
      <div className="flex items-center justify-center gap-3 p-2 text-xs font-bold uppercase tracking-[0.3em] text-amber-600">
            <span className="h-px w-8 bg-amber-400 " />
            Our Categories
            <span className="h-px w-8 bg-amber-400" />
          </div>
      <h2 className="text-center text-xl font-bold text-slate-900 sm:text-3xl">
        4 <span className="text-amber-500">Categories of Vehicles</span> to Suit Every Budget
      </h2>

      {/* 2 per row on phones, 4 per row on large screens */}
      <div className="mt-14 grid grid-cols-2 gap-x-3 gap-y-14 sm:mt-20 sm:gap-x-6 sm:gap-y-20 lg:grid-cols-4">
        {CATEGORIES.map(({ name, icon: Icon, gradient, image }) => (
          <div
            key={name}
            className={cn(
              "group relative flex flex-col items-center rounded-2xl bg-gradient-to-br px-3 pb-4 text-center text-white shadow-lg transition-transform duration-300 hover:-translate-y-1 sm:rounded-3xl sm:px-5 sm:pb-6",
              gradient
            )}
          >
            {/* Image: part of it sits above the card */}
            <div className="relative -mt-8 h-28 w-full sm:-mt-14 sm:h-48">
              <Image
                src={image}
                alt={name}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-contain drop-shadow-[0_12px_12px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-105 sm:drop-shadow-[0_18px_18px_rgba(0,0,0,0.35)]"
              />
            </div>

            <h3 className="mt-2 text-sm font-extrabold tracking-wide sm:mt-4 sm:text-xl">
              {name.toUpperCase()}
            </h3>
            <p>ashish</p>

            <div className="mt-3 flex w-full items-center gap-2 sm:mt-5">
              <span className="h-px flex-1 bg-white/40" />
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/60 sm:h-9 sm:w-9">
                <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </span>
              <span className="h-px flex-1 bg-white/40" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
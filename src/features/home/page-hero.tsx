import Image from "next/image";

interface PageHeroProps {
  image: string;
  heading: string;
  subheading: string;
  ctaLabel?: string;
  ctaHref?: string;
}

// Single-image hero for city/vehicle-category pages — same visual language
// as the homepage's <Hero /> carousel (full-bleed image, gradient overlay,
// centered heading/subheading/CTA), just without the multi-slide rotation.
export function PageHero({
  image,
  heading,
  subheading,
  ctaLabel = "Get a Free Quote",
  ctaHref = "#get-a-quote",
}: PageHeroProps) {
  return (
    <section className="relative h-[420px] w-full sm:h-[520px]">
      <Image src={image} alt={heading} fill priority className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
        <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight drop-shadow-lg sm:text-5xl">{heading}</h1>
        <p className="mt-3 max-w-xl text-sm text-white/90 sm:text-base">{subheading}</p>
        <a
          href={ctaHref}
          className="mt-6 rounded-full bg-amber-400 px-8 py-3 text-sm font-bold text-emerald-950 shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-amber-300"
        >
          {ctaLabel}
        </a>
      </div>
    </section>
  );
}
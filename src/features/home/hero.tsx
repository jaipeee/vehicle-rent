"use client";
 
import { useCallback, useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Playfair_Display } from "next/font/google";


interface Slide {
  image: string;
  heading: string;
  subheading: string;
}

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});
// Placeholder slides — swap images for real vehicle photos, edit copy per slide.
const SLIDES: Slide[] = [
  {
    image: "/assets/hero-1.png",
    heading: "Welcome to Indiventure Tour & Travel",
    subheading: "Comfortable, reliable rentals for corporate trips, events, and outstation travel.",
  },
  {
    image: "/assets/hero-2.png",
    heading: "Travel in Comfort, Every Time",
    subheading: "Premium sedans and SUVs for every occasion, in every city we serve.",
  },
  {
    image: "/assets/hero-3.png",
    heading: "Group Travel Made Easy",
    subheading: "Tempo travellers and buses for weddings, events, and large corporate trips.",
  },
   {
    image: "/assets/hero-3.png",
    heading: "Group Travel Made Easy",
    subheading: "Tempo travellers and buses for weddings, events, and large corporate trips.",
  },
   {
    image: "/assets/hero-3.png",
    heading: "Group Travel Made Easy",
    subheading: "Tempo travellers and buses for weddings, events, and large corporate trips.",
  },
];

export function Hero() {
  const autoplay = useRef(Autoplay({ delay: 4500, stopOnInteraction: false }));
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);
 
  useEffect(() => {
    if (!api) return;
    setActiveIndex(api.selectedScrollSnap());
    api.on("select", () => setActiveIndex(api.selectedScrollSnap()));
  }, [api]);

  const goTo = useCallback((index: number) => api?.scrollTo(index), [api]);
  const active = SLIDES[activeIndex];

  return (
    <section className="relative pb-14 sm:pb-20">
      <Carousel setApi={setApi} plugins={[autoplay.current]} opts={{ loop: true }} className="w-full">
        <CarouselContent>
          {SLIDES.map((slide) => (
            <CarouselItem key={slide.image}>
              <div className="relative h-[560px] w-full sm:h-[660px]">
                <Image src={slide.image} alt={slide.heading} fill priority className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
 
      {/* Heading/subtext swap per active slide */}
<div className="pointer-events-none absolute inset-0 flex items-center px-8 text-left text-white sm:px-20 lg:px-32">
  <div className="max-w-xl">
    <h1
  className={`
    ${playfair.className}
    text-2xl
    font-bold
    leading-[1.1]
    tracking-tight
    text-white
    drop-shadow-lg
    sm:text-4xl
    lg:text-6xl
  `}
>
  {active.heading}
</h1>

<p className="mt-4 max-w-xl text-sm font-medium leading-relaxed tracking-wide text-white/90 sm:text-lg">
  {active.subheading}
</p>

    <Button
      size="lg"
      className="group pointer-events-auto w-30 h-10 relative mt-6 overflow-hidden rounded-xl bg-[#ea7236] text-emerald-100 hover:text-white"
    >
      <span className="absolute left-0 top-0 h-0 w-1/4 bg-[#37d4d9] duration-500 group-hover:h-full" />
      <span className="absolute bottom-0 left-1/4 h-0 w-1/4 bg-[#37d4d9] duration-500 group-hover:h-full" />
      <span className="absolute right-1/4 top-0 h-0 w-1/4 bg-[#37d4d9] duration-500 group-hover:h-full" />
      <span className="absolute bottom-0 right-0 h-0 w-1/4 bg-[#37d4d9] duration-500 group-hover:h-full" />

      <span className="relative z-10 text-xl">Get a Quote</span>
    </Button>
  </div>
</div>
 
      {/* Vertical numbered pagination — shows current slide, clickable to jump */}
      <div className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center sm:flex lg:left-10">
        {SLIDES.map((_, index) => (
          <div key={index} className="flex flex-col items-center">
            <button
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => goTo(index)}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full border text-xl font-semibold transition-colors duration-300",
                index === activeIndex
                  ? "border-amber-400 bg-[#ea7236] text-emerald-950"
                  : "border-white/50 bg-white/10 text-white hover:bg-white/20"
              )}
            >
              {index + 1}
            </button>
            {index < SLIDES.length - 1 && <span className="h-8 w-px bg-white/40" />}
          </div>
        ))}
      </div>


    </section>
  );
}
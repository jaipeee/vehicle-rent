import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FLEET_SERVICES } from "./fleet.config";

export function Fleet() {
  return (
    <section className="py-16" style={{ backgroundColor: "#F4F7FB" }}>
      {/*
        Pure-CSS 5-image hover slideshow (no JS state needed): each .fleet-slide
        fades in for its 2s turn out of a 10s cycle, but the animation is paused
        by default and only runs while the card (.group) is hovered — so at rest
        it sits at its 0% keyframe (opacity 0), letting the blurred base image
        underneath show through, and on mouse-leave it simply pauses again.
      */}
      <style>{`
        @keyframes fleetCycle {
          0% { opacity: 0; }
          4% { opacity: 1; }
          16% { opacity: 1; }
          20% { opacity: 0; }
          100% { opacity: 0; }
        }
        .fleet-slide {
          animation: fleetCycle 10s ease-in-out infinite;
          animation-play-state: paused;
        }
        .group:hover .fleet-slide {
          animation-play-state: running;
        }
        .fleet-slide:nth-of-type(1) { animation-delay: 0s; }
        .fleet-slide:nth-of-type(2) { animation-delay: 2s; }
        .fleet-slide:nth-of-type(3) { animation-delay: 4s; }
        .fleet-slide:nth-of-type(4) { animation-delay: 6s; }
        .fleet-slide:nth-of-type(5) { animation-delay: 8s; }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="text-center text-2xl font-bold sm:text-3xl" style={{ color: "#0B2A4A" }}>
          Our Rental Services
        </h2>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {FLEET_SERVICES.map((service) => (
            <div key={service.id} className="group overflow-hidden rounded-[22px] bg-white p-[18px] shadow-sm">
              {/* Hero zone */}
              <div
                className="relative flex h-[230px] overflow-hidden rounded-[18px]"
                style={{ backgroundColor: "#E9F0FB" }}
              >
                <div className="relative z-10 flex w-[46%] flex-col justify-between p-7 pl-8">
                  <h3 className="text-xl font-bold leading-tight" style={{ color: "#1863E0" }}>
                    {service.title}
                    <span className="block" style={{ color: "#0B2A4A" }}>
                      {service.subtitle}
                    </span>
                  </h3>
                  <div
                    className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white transition-transform duration-300 group-hover:translate-x-1"
                    style={{ boxShadow: "0 6px 14px rgba(11,42,74,0.10)" }}
                  >
                    <ArrowRight className="h-5 w-5" style={{ color: "#1863E0" }} />
                  </div>
                </div>

                {/* Image panel — shifts left on hover, blurred base + 5-image slideshow on top */}
                <div
                  className="absolute inset-y-0 right-0 z-[1] w-[56%] overflow-hidden rounded-[18px] transition-transform duration-500 ease-out group-hover:-translate-x-3"
                  style={{ backgroundColor: "#1863E0" }}
                >
                  <Image
                    src={service.images[0]}
                    alt={service.title}
                    fill
                    className="object-cover opacity-90 blur-[2px] transition-[filter] duration-500 group-hover:blur-0"
                  />
                  {service.images.map((src, i) => (
                    <Image
                      key={src + i}
                      src={src}
                      alt={`${service.title} view ${i + 1}`}
                      fill
                      className="fleet-slide object-cover opacity-0"
                    />
                  ))}
                </div>
              </div>

              {/* Description + amenities — always visible */}
              <div className="px-3 pb-1.5 pt-5">
                <p className="max-w-[62ch] text-[0.98rem] leading-relaxed" style={{ color: "#5C7089" }}>
                  {service.description}
                </p>

                <p className="mb-3 mt-4 text-sm font-bold" style={{ color: "#0B2A4A" }}>
                  Amenities &amp; Highlights
                </p>
                <ul className="mb-6 flex flex-wrap gap-2.5">
                  {service.amenities.map(({ label, icon: Icon }) => (
                    <li
                      key={label}
                      style={{ backgroundColor: "#E9F0FB", color: "#0B2A4A" }}
                      className="flex items-center gap-1.5 rounded-full px-3 py-2 text-[0.85rem] font-medium"
                    >
                      <Icon className="h-4 w-4" style={{ color: "#1863E0" }} />
                      {label}
                    </li>
                  ))}
                </ul>

                <div className="flex gap-3">
                  <button
                    type="button"
                    className="rounded-xl border-[1.5px] px-[22px] py-[13px] text-sm font-semibold transition-colors hover:bg-[#E9F0FB]"
                    style={{ borderColor: "#C9DAF3", color: "#1863E0" }}
                  >
                    Check Price
                  </button>
                  <button
                    type="button"
                    className="rounded-xl px-[22px] py-[13px] text-sm font-semibold transition-transform hover:-translate-y-0.5"
                    style={{ backgroundColor: "#F2A93B", color: "#0B2A4A", boxShadow: "0 8px 16px rgba(242,169,59,0.35)" }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
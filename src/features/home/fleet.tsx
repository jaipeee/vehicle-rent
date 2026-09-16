import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FLEET_SERVICES } from "./fleet.config";

export function Fleet() {
  return (
    <section className="py-16" style={{ backgroundColor: "#F4F7FB" }}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="text-center text-2xl font-bold sm:text-3xl" style={{ color: "#0B2A4A" }}>
          Our Rental Services
        </h2>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {FLEET_SERVICES.map((service) => (
            <div key={service.id} className="group overflow-hidden rounded-[22px] bg-white p-[18px] shadow-sm">
              {/* Hero zone — text fades, image shifts, on hover */}
              <div
                className="relative flex h-[230px] overflow-hidden rounded-[18px]"
                style={{ backgroundColor: "#E9F0FB" }}
              >
                <div className="relative z-10 flex w-[46%] flex-col justify-between p-7 pl-8 transition-all duration-500 group-hover:-translate-x-1.5 group-hover:opacity-[0.16]">
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

                <div className="absolute inset-y-0 right-0 z-[1] w-[56%] overflow-hidden rounded-[18px]" style={{ backgroundColor: "#1863E0" }}>
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Description + amenities that slide in on hover */}
              <div className="px-3 pb-1.5 pt-5">
                <p className="max-w-[62ch] text-[0.98rem] leading-relaxed" style={{ color: "#5C7089" }}>
                  {service.description}
                </p>

                <p className="mb-3 mt-4 text-sm font-bold" style={{ color: "#0B2A4A" }}>
                  Amenities &amp; Highlights
                </p>
                <ul className="mb-6 flex flex-wrap gap-2.5">
                  {service.amenities.map(({ label, icon: Icon }, i) => (
                    <li
                      key={label}
                      style={{ backgroundColor: "#E9F0FB", color: "#0B2A4A", transitionDelay: `${i * 40}ms` }}
                      className="flex translate-y-2 items-center gap-1.5 rounded-full px-3 py-2 text-[0.85rem] font-medium opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
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
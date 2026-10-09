"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Copy, Check, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FleetService } from "./fleet.config";

interface FleetCardProps {
  service: FleetService;
  cityName?: string;
}

// Digits only, with country code (used for wa.me and tel:)
const PHONE_NUMBER = "918369687417";
const PHONE_DISPLAY = "+91 83696 87417";

function isMobileDevice() {
  if (typeof navigator === "undefined") return false;
  const ua = /Android|iPhone|iPad|iPod|Mobi/i.test(navigator.userAgent);
  // iPadOS reports as "Macintosh" but has touch points
  const ipadOS = navigator.userAgent.includes("Macintosh") && navigator.maxTouchPoints > 1;
  return ua || ipadOS;
}

export function FleetCard({ service, cityName }: FleetCardProps) {
  const [hovered, setHovered] = useState(false);
  const [index, setIndex] = useState(0);
  const [showCall, setShowCall] = useState(false);
  const [copied, setCopied] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const callWrapRef = useRef<HTMLDivElement | null>(null);

  const handleEnter = () => {
    setHovered(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % service.images.length);
    }, 1600);
  };

  const handleLeave = () => {
    setHovered(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIndex(0);
  };

  // Safety cleanup if the component unmounts mid-hover.
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Close the desktop number popover when clicking outside it.
  useEffect(() => {
    if (!showCall) return;
    const onDown = (e: MouseEvent) => {
      if (callWrapRef.current && !callWrapRef.current.contains(e.target as Node)) {
        setShowCall(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowCall(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [showCall]);

  // Phone: let the browser open the dialer via the tel: link.
  // Desktop: block the tel: navigation and show the number instead.
  const handleCallClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isMobileDevice()) {
      e.preventDefault();
      setShowCall((v) => !v);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`+${PHONE_NUMBER}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — number is still visible to read */
    }
  };

  const whatsappMessage = `Hi, I'd like to book the ${service.title} ${service.subtitle}${
    cityName ? ` in ${cityName}` : ""
  }. Please share availability and price.`;
  const whatsappHref = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="relative overflow-visible rounded-[22px] bg-white p-3 pt-9 shadow-sm sm:p-[18px] sm:pt-10"
    >
      <div
        className="relative flex h-[170px] overflow-hidden rounded-[18px] sm:h-[200px]"
        style={{ backgroundColor: "#ea723646" }}
      >
        {/* Text panel — blurs and fades while the car sits over it */}
        <div
          className={cn(
            "relative z-10 flex w-[56%] flex-col justify-between p-4 transition-all duration-500 sm:p-7 sm:pl-6",
            hovered && "opacity-20 blur-[2px]"
          )}
        >
          <div>
            <h3
              className="text-base font-bold leading-tight sm:text-xl"
              style={{ color: "#0B2A4A" }}
            >
              {service.title}
              <span className="block" style={{ color: "#0B2A4A" }}>
                {service.subtitle}
              </span>
            </h3>
            {cityName && (
              <span
                className="mt-2 inline-block w-fit max-w-full truncate rounded-full px-2 py-0.5 text-[0.65rem] font-semibold sm:px-2.5 sm:py-1 sm:text-[0.7rem]"
                style={{ backgroundColor: "#ffe4d6", color: "#ea7236" }}
              >
                Available in {cityName}
              </span>
            )}
          </div>
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white sm:h-[52px] sm:w-[52px]"
            style={{ boxShadow: "0 6px 14px rgba(11,42,74,0.10)" }}
          >
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: "#1863E0" }} />
          </div>
        </div>

        {/* Photo panel — solid color at rest. The photo is only mounted while hovered. */}
        <div
          className="absolute inset-y-0 right-0 z-[1] w-[50%] overflow-hidden rounded-[18px]"
          style={{ backgroundColor: "#ea7236" }}
        >
          {hovered && (
            <Image
              key={index}
              src={service.images[index]}
              alt={`${service.title} view ${index + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, 300px"
              className="object-cover"
            />
          )}
        </div>
      </div>

      {/* Vehicle cutout — floats just above the card, slides onto the text on hover */}
      <div
        className={cn(
          "pointer-events-none absolute -top-4 right-6 z-20 mt-12 w-[53%] transition-transform duration-700 ease-out sm:-top-8 sm:right-15 sm:mt-15",
          hovered && "-translate-x-[70%]"
        )}
      >
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={service.vehicleImage}
            alt={service.title}
            fill
            sizes="(max-width: 640px) 50vw, 300px"
            className="object-contain drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Description + amenities — always visible */}
      <div className="px-1 pb-1.5 pt-5 sm:px-3">
        <p
          className="max-w-[62ch] text-sm leading-relaxed sm:text-[0.98rem]"
          style={{ color: "#5C7089" }}
        >
          {service.description}
        </p>

        <p className="mb-3 mt-4 text-sm font-bold" style={{ color: "#0B2A4A" }}>
          Amenities &amp; Highlights
        </p>
        <ul className="mb-5 flex flex-wrap gap-2 sm:mb-6 sm:gap-2.5">
          {service.amenities.map(({ label, icon: Icon }) => (
            <li
              key={label}
              style={{ backgroundColor: "#fe980a2d", color: "#0B2A4A" }}
              className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium sm:px-3 sm:py-2 sm:text-[0.85rem]"
            >
              <Icon className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" style={{ color: "#ea7236" }} />
              {label}
            </li>
          ))}
        </ul>

        {/* Buttons: 3 equal columns on mobile, natural width in a row on larger screens */}
        <div className="grid grid-cols-3 gap-2 sm:flex sm:gap-3">
          <button
            type="button"
            className="flex items-center justify-center whitespace-nowrap rounded-xl border-[1.5px] px-2 py-3 text-[0.8rem] font-semibold transition-colors hover:bg-[#E9F0FB] sm:px-[22px] sm:py-[13px] sm:text-sm"
            style={{ borderColor: "#C9DAF3", color: "#1863E0" }}
          >
            Check Price
          </button>

          {/* Book Now → WhatsApp (app on phone, WhatsApp Web / app on desktop) */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center overflow-hidden whitespace-nowrap rounded-xl px-2 py-3 shadow-md transition-all hover:shadow-lg sm:px-[22px] sm:py-[13px]"
            style={{ backgroundColor: "#ea7236" }}
          >
            <span className="absolute left-0 top-0 h-0 w-1/4 bg-[#37d4d9] transition-all duration-500 group-hover:h-full" />
            <span className="absolute bottom-0 left-1/4 h-0 w-1/4 bg-[#37d4d9] transition-all duration-500 group-hover:h-full" />
            <span className="absolute right-1/4 top-0 h-0 w-1/4 bg-[#37d4d9] transition-all duration-500 group-hover:h-full" />
            <span className="absolute bottom-0 right-0 h-0 w-1/4 bg-[#37d4d9] transition-all duration-500 group-hover:h-full" />
            <span className="relative z-10 text-[0.8rem] font-semibold text-white sm:text-sm">
              Book Now
            </span>
          </a>

          {/* Call Now → dialer on phone, number popover on desktop */}
          <div ref={callWrapRef} className="relative">
            <a
              href={`tel:+${PHONE_NUMBER}`}
              onClick={handleCallClick}
              aria-expanded={showCall}
              className="flex w-full items-center justify-center whitespace-nowrap rounded-xl border-[1.5px] px-2 py-3 text-[0.8rem] font-semibold text-[#ea7236] transition-colors hover:bg-[#37d4d9] hover:text-[#e2eded] sm:px-[22px] sm:py-[13px] sm:text-sm"
              style={{ borderColor: "#C9DAF3" }}
            >
              Call Now
            </a>

            {showCall && (
              <div
                role="dialog"
                aria-label="Call us"
                className="absolute bottom-full right-0 z-30 mb-2 w-60 rounded-xl bg-white p-4 shadow-xl ring-1 ring-black/5"
              >
                <p className="text-xs font-medium" style={{ color: "#5C7089" }}>
                  Call us on
                </p>
                <p
                  className="mt-1 flex items-center gap-2 text-lg font-bold"
                  style={{ color: "#0B2A4A" }}
                >
                  <Phone className="h-4 w-4" style={{ color: "#ea7236" }} />
                  {PHONE_DISPLAY}
                </p>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#ea7236" }}
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" /> Copy number
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
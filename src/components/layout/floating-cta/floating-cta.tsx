"use client";

import { Phone, Mail, CalendarDays, type LucideIcon } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { CONTACT_PHONE } from "@/components/layout/navbar/navbar.config";
import { useQuote } from "@/features/quote/quote-context";

// Placeholders — update with your real WhatsApp number and support email.
const WHATSAPP_NUMBER = "918369687417";
const CONTACT_EMAIL = "indiventra@gmail.com";

interface CtaAction {
  label: string;
  href?: string;
  icon: LucideIcon | IconType;
  external?: boolean;
  quote?: boolean; // opens the quote popup instead of a link
}

const ACTIONS: CtaAction[] = [
  { label: "Call Us", href: CONTACT_PHONE.href, icon: Phone },
  { label: "WhatsApp", href: `https://wa.me/${WHATSAPP_NUMBER}`, icon: FaWhatsapp, external: true },
  { label: "Email Us", href: `mailto:${CONTACT_EMAIL}`, icon: Mail },
  { label: "Get a Quote", icon: CalendarDays, quote: true },
];

export function FloatingCta() {
  const { open } = useQuote();

  return (
    <div className="pointer-events-none fixed bottom-1/2 right-4 z-50 flex flex-col items-end gap-3 sm:right-6">
      {ACTIONS.map(({ label, href, icon: Icon, external, quote }) => {
        const className = "group pointer-events-auto relative block h-12 w-12 shrink-0 cursor-pointer";
        const content = (
          <>
            <span className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-lg bg-emerald-950 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-md transition-all duration-200 [@media(hover:hover)]:block group-hover:translate-x-0 group-hover:opacity-100">
              {label}
            </span>
            <span className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-[#ea7236] text-white shadow-lg transition-transform duration-200 group-hover:scale-110">
              <span className="absolute left-0 top-0 h-0 w-1/4 bg-[#37d4d9] transition-all duration-500 group-hover:h-full" />
              <span className="absolute bottom-0 left-1/4 h-0 w-1/4 bg-[#37d4d9] transition-all duration-500 group-hover:h-full" />
              <span className="absolute right-1/4 top-0 h-0 w-1/4 bg-[#37d4d9] transition-all duration-500 group-hover:h-full" />
              <span className="absolute bottom-0 right-0 h-0 w-1/4 bg-[#37d4d9] transition-all duration-500 group-hover:h-full" />
              <Icon className="relative z-10 h-5 w-5" />
            </span>
          </>
        );

        return quote ? (
          <button key={label} type="button" onClick={open} aria-label={label} className={className}>
            {content}
          </button>
        ) : (
          <a
            key={label}
            href={href}
            aria-label={label}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className={className}
          >
            {content}
          </a>
        );
      })}
    </div>
  );
}
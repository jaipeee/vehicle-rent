"use client";

import { Phone, Mail, CalendarDays, type LucideIcon } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { CONTACT_PHONE } from "@/components/layout/navbar/navbar.config";

// Placeholders — update with your real WhatsApp number and support email.
const WHATSAPP_NUMBER = "918369681231";
const CONTACT_EMAIL = "enquiry@indiventure.com";

interface CtaAction {
  label: string;
  href: string;
  icon: LucideIcon | IconType;
  external?: boolean;
}

const ACTIONS: CtaAction[] = [
  { label: "Call Us", href: CONTACT_PHONE.href, icon: Phone },
  { label: "WhatsApp", href: `https://wa.me/${WHATSAPP_NUMBER}`, icon: FaWhatsapp, external: true },
  { label: "Email Us", href: `mailto:${CONTACT_EMAIL}`, icon: Mail },
  { label: "Get a Quote", href: "/#get-a-quote", icon: CalendarDays },
];

export function FloatingCta() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {ACTIONS.map(({ label, href, icon: Icon, external }) => (
        <a
          key={label}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="group flex items-center gap-3"
        >
          <span className="translate-x-2 whitespace-nowrap rounded-lg bg-emerald-950 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-md transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
            {label}
          </span>
          <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#ea7236] text-white shadow-lg transition-transform duration-200 group-hover:scale-110">
            <span className="absolute left-0 top-0 h-0 w-1/4 bg-[#37d4d9] transition-all duration-500 group-hover:h-full" />
            <span className="absolute bottom-0 left-1/4 h-0 w-1/4 bg-[#37d4d9] transition-all duration-500 group-hover:h-full" />
            <span className="absolute right-1/4 top-0 h-0 w-1/4 bg-[#37d4d9] transition-all duration-500 group-hover:h-full" />
            <span className="absolute bottom-0 right-0 h-0 w-1/4 bg-[#37d4d9] transition-all duration-500 group-hover:h-full" />
            <Icon className="relative z-10 h-5 w-5" />
          </span>
        </a>
      ))}
    </div>
  );
}
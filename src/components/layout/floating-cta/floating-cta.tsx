"use client";

import { Phone, Mail, CalendarDays, type LucideIcon } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { cn } from "@/lib/utils";
import { CONTACT_PHONE } from "@/components/layout/navbar/navbar.config";

// Placeholders — update with your real WhatsApp number and support email.
const WHATSAPP_NUMBER = "918369681231";
const CONTACT_EMAIL = "enquiry@indiventure.com";

interface CtaAction {
  label: string;
  href: string;
  icon: LucideIcon | IconType;
  bg: string;
  textDark?: boolean;
  external?: boolean;
}

const ACTIONS: CtaAction[] = [
  {
    label: "Call Us",
    href: CONTACT_PHONE.href,
    icon: Phone,
    bg: "bg-emerald-700 hover:bg-emerald-800",
  },
  {
    label: "WhatsApp",
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    icon: FaWhatsapp,
    bg: "bg-[#25D366] hover:bg-[#1ebe57]",
    external: true,
  },
  {
    label: "Email Us",
    href: `mailto:${CONTACT_EMAIL}`,
    icon: Mail,
    bg: "bg-slate-700 hover:bg-slate-800",
  },
  {
    label: "Get a Quote",
    href: "/#get-a-quote",
    icon: CalendarDays,
    bg: "bg-amber-400 hover:bg-amber-300",
    textDark: true,
  },
];

export function FloatingCta() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {ACTIONS.map(({ label, href, icon: Icon, bg, textDark, external }) => (
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
          <span
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-full shadow-lg transition-transform duration-200 group-hover:scale-110",
              bg,
              textDark ? "text-emerald-950" : "text-white"
            )}
          >
            <Icon className="h-5 w-5" />
          </span>
        </a>
      ))}
    </div>
  );
}
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { LOGO_SRC, LOGO_ALT, type NavItem } from "./navbar.config";
import { PhoneBadge, CtaButton, CitySelector } from "./navbar-actions";

const MOBILE_KEYFRAMES = `
@keyframes mnav-item {
  from { opacity: 0; transform: translateX(36px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes mnav-up {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes mnav-float {
  0%, 100% { transform: translate(0, 0); }
  50%      { transform: translate(14px, -18px); }
}
@keyframes mnav-down {
  from { height: 0; opacity: 0; }
  to   { height: var(--radix-collapsible-content-height); opacity: 1; }
}
@keyframes mnav-collapse {
  from { height: var(--radix-collapsible-content-height); opacity: 1; }
  to   { height: 0; opacity: 0; }
}
.mnav-item { animation: mnav-item 0.5s cubic-bezier(0.22, 1, 0.36, 1) both; }
.mnav-up   { animation: mnav-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both; }
.mnav-float { animation: mnav-float 9s ease-in-out infinite; }
.mnav-sub { overflow: hidden; }
.mnav-sub[data-state="open"]   { animation: mnav-down 0.25s ease-out; }
.mnav-sub[data-state="closed"] { animation: mnav-collapse 0.2s ease-in; }
@media (prefers-reduced-motion: reduce) {
  .mnav-item, .mnav-up, .mnav-float, .mnav-sub { animation: none !important; }
}
`;

interface MobileNavProps {
  items: NavItem[];
  triggerClassName?: string;
}

export function MobileNav({ items, triggerClassName }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <style>{MOBILE_KEYFRAMES}</style>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open menu"
            className={cn(triggerClassName)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="w-full max-w-none gap-0 overflow-y-auto border-0 bg-emerald-950 p-0 text-white sm:w-96 sm:max-w-sm [&>button]:right-5 [&>button]:top-5 [&>button]:text-white [&>button]:opacity-90"
        >
          {/* ---------- Background ---------- */}
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-900 via-emerald-950 to-slate-950" />
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />
            <div className="mnav-float absolute -right-16 -top-16 h-64 w-64 rounded-full bg-lime-400/25 blur-3xl" />
            <div
              className="mnav-float absolute -bottom-20 -left-16 h-72 w-72 rounded-full bg-teal-400/20 blur-3xl"
              style={{ animationDelay: "-4s" }}
            />
          </div>

          {/* ---------- Content ---------- */}
          <div className="relative z-10 flex min-h-full flex-col">
            <SheetHeader className="border-b border-white/10 px-5 py-4 text-left">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <Link href="/" onClick={() => setOpen(false)} className="mnav-up block w-fit">
                <Image
                  src={LOGO_SRC}
                  alt={LOGO_ALT}
                  width={160}
                  height={96}
                  className="h-11 w-auto object-contain"
                />
              </Link>
            </SheetHeader>

            <nav className="flex flex-1 flex-col gap-1.5 px-4 py-5">
              {items.map((item, i) => {
                const Icon = item.icon;
                const delay = { animationDelay: `${120 + i * 70}ms` };

                const rowClass =
                  "flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/15 active:bg-white/20";

                const iconBox = (
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-lime-300">
                    <Icon className="h-5 w-5" />
                  </span>
                );

                return item.children?.length ? (
                  <Collapsible key={item.href} className="mnav-item group" style={delay}>
                    <CollapsibleTrigger className={rowClass}>
                      <span className="flex items-center gap-3">
                        {iconBox}
                        {item.label}
                      </span>
                      <ChevronDown className="h-4 w-4 text-white/70 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mnav-sub">
                      <div className="ml-6 mt-1.5 flex flex-col gap-1 border-l border-white/15 pl-4">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setOpen(false)}
                            className="rounded-lg px-3 py-2.5 text-sm text-emerald-100/80 transition-colors hover:bg-white/10 hover:text-white"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn("mnav-item", rowClass, "justify-start gap-3")}
                    style={delay}
                  >
                    {iconBox}
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* ---------- Footer: city, phone, CTA ---------- */}
            <div
              className="mnav-up px-4 pb-6"
              style={{ animationDelay: `${120 + items.length * 70 + 60}ms` }}
            >
              <div className="flex flex-col gap-3 whitespace-nowrap rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
                <CitySelector />
                <PhoneBadge />
                <CtaButton className="w-full justify-center" />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
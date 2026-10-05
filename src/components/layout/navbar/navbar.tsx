"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";
import { NAV_ITEMS, LOGO_SRC, LOGO_ALT, type NavItem } from "./navbar.config";
import { PhoneBadge, CtaButton, CitySelector } from "./navbar-actions";
import { MobileNav } from "./mobile-nav";

// -----------------------------------------------------
// Keyframes (desktop only: animated gradient, light sweep)
// -----------------------------------------------------

const NAV_KEYFRAMES = `
@keyframes nav-gradient {
  0%, 100% { background-position: 0% 50%; }
  50%      { background-position: 100% 50%; }
}
@keyframes nav-shine {
  0%   { transform: translateX(-150%) skewX(-20deg); }
  60%, 100% { transform: translateX(450%) skewX(-20deg); }
}
@media (prefers-reduced-motion: reduce) {
  .nav-anim { animation: none !important; }
}
`;

// -----------------------------------------------------
// Sliding navigation indicator
// -----------------------------------------------------

interface SliderRect {
  left: number;
  width: number;
}

function useNavSlider() {
  const refs = useRef<Map<string, HTMLElement>>(new Map());
  const [rect, setRect] = useState<SliderRect | null>(null);

  const registerRef = useCallback((key: string, el: HTMLElement | null) => {
    if (el) refs.current.set(key, el);
    else refs.current.delete(key);
  }, []);

  const moveTo = useCallback((key: string) => {
    const el = refs.current.get(key);
    if (!el) return;
    setRect({ left: el.offsetLeft, width: el.offsetWidth });
  }, []);

  return { registerRef, moveTo, rect };
}

function NavIndicator({ rect }: { rect: SliderRect | null }) {
  if (!rect) return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-1.5 left-0 z-0 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.45)] transition-[transform,width] duration-300 ease-out"
      style={{ width: rect.width, transform: `translateX(${rect.left}px)` }}
    />
  );
}

// -----------------------------------------------------
// Navigation link
// -----------------------------------------------------

interface NavLinkProps {
  item: NavItem;
  isActive: boolean;
  onHover: (href: string) => void;
  onLeave: () => void;
  onActivate: (href: string) => void;
  registerRef: (href: string, el: HTMLLIElement | null) => void;
}

function NavLink({
  item,
  isActive,
  onHover,
  onLeave,
  onActivate,
  registerRef,
}: NavLinkProps) {
  const [hovered, setHovered] = useState(false);

  const Icon = item.icon;
  const hasChildren = !!item.children?.length;
  const highlighted = isActive || hovered;

  const content = (
    <span
      className={cn(
        "relative z-10 flex items-center gap-2 whitespace-nowrap px-4 py-2 text-sm font-semibold tracking-wide transition-colors duration-300",
        highlighted
          ? "text-emerald-950"
          : "text-emerald-100/80 hover:text-emerald-50"
      )}
    >
      <Icon
        className={cn(
          "h-4 w-4 shrink-0 transition-transform duration-300",
          highlighted && "scale-110 -rotate-6"
        )}
      />
      {item.label}
      {hasChildren && <ChevronDown className="h-3.5 w-3.5 shrink-0" />}
    </span>
  );

  return (
    <li
      ref={(el) => registerRef(item.href, el)}
      className="relative z-10 flex shrink-0 list-none items-center"
      onMouseEnter={() => {
        onHover(item.href);
        setHovered(true);
      }}
      onMouseLeave={() => {
        onLeave();
        setHovered(false);
      }}
    >
      {hasChildren ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={() => onActivate(item.href)}>
            <button type="button" className="flex items-center outline-none">
              {content}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="mt-2">
            {item.children!.map((child) => (
              <DropdownMenuItem key={child.href} asChild>
                <Link href={child.href}>{child.label}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link
          href={item.href}
          onClick={() => onActivate(item.href)}
          className="flex items-center"
        >
          {content}
        </Link>
      )}
    </li>
  );
}

// -----------------------------------------------------
// Main Navbar
// -----------------------------------------------------

const DOCK_AFTER = 40; // px scrolled before the navbar docks to the top

export function Navbar() {
  const [activeHref, setActiveHref] = useState(NAV_ITEMS[0]?.href ?? "");
  const [docked, setDocked] = useState(false);
  const [progress, setProgress] = useState(0);

  const { registerRef, moveTo, rect } = useNavSlider();

  const handleActivate = (href: string) => {
    setActiveHref(href);
    moveTo(href);
  };

  useEffect(() => {
    moveTo(activeHref);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleResize = () => moveTo(activeHref);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeHref, moveTo]);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const max =
        document.documentElement.scrollHeight - window.innerHeight || 1;
      setDocked(y > DOCK_AFTER);
      setProgress(Math.min(1, Math.max(0, y / max)));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{NAV_KEYFRAMES}</style>

      <header
        className={cn(
          "pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center transition-[padding] duration-500 ease-out",
          docked ? "lg:pt-0" : "lg:pt-4"
        )}
      >
        <div
          className={cn(
            "pointer-events-auto relative w-full",
            // MOBILE: simple solid bar
            "border-b border-white/10 bg-emerald-950 shadow-md",
            // DESKTOP: glass pill / docked bar
            "lg:border-b-0 lg:bg-transparent lg:ring-1 lg:ring-white/20 lg:backdrop-blur-xl",
            "lg:transition-[max-width,border-radius,box-shadow] lg:duration-500 lg:ease-[cubic-bezier(0.22,1,0.36,1)]",
            docked
              ? "lg:max-w-[100vw] lg:rounded-none lg:shadow-2xl lg:shadow-emerald-950/40"
              : "lg:max-w-[min(1360px,calc(100vw_-_2rem))] lg:rounded-3xl lg:shadow-xl"
          )}
        >
          {/* ---------- Animated background (desktop only) ---------- */}
          <div className="absolute inset-0 hidden overflow-hidden rounded-[inherit] lg:block">
            <div
              className={cn(
                "nav-anim absolute inset-0 bg-[length:300%_300%] bg-gradient-to-r from-emerald-950 via-teal-800 to-slate-900 transition-opacity duration-500",
                docked ? "opacity-95" : "opacity-70"
              )}
              style={{ animation: "nav-gradient 10s ease-in-out infinite" }}
            />
            <div className="absolute -left-10 top-0 h-24 w-48 rounded-full bg-lime-400/25 blur-3xl" />
            <div className="absolute -right-10 bottom-0 h-24 w-56 rounded-full bg-emerald-300/20 blur-3xl" />
            <div
              className="nav-anim absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-transparent via-white/15 to-transparent"
              style={{ animation: "nav-shine 6s ease-in-out infinite" }}
            />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </div>

          {/* ---------- Content ---------- */}
          <div className="relative mx-auto flex min-h-14 w-full max-w-[1360px] items-center justify-between gap-4 px-4 py-1.5 sm:px-5 lg:h-16 lg:gap-6 lg:px-6">
            {/* Logo */}
            <Link href="/" className="group flex shrink-0 items-center">
              <span className="relative flex h-10 w-28 items-center justify-center overflow-hidden rounded-xl transition-transform duration-300 ease-out group-hover:-translate-y-0.5 sm:h-11 lg:h-14 lg:w-32">
                <Image
                  src={LOGO_SRC}
                  alt={LOGO_ALT}
                  width={160}
                  height={96}
                  className="h-full w-full rounded-xl object-contain"
                  priority
                />
              </span>
            </Link>

            {/* Desktop navigation */}
            <ul className="relative hidden h-10 shrink-0 items-stretch rounded-full border border-white/15 bg-black/20 lg:flex">
              <NavIndicator rect={rect} />
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.href}
                  item={item}
                  isActive={activeHref === item.href}
                  onHover={moveTo}
                  onLeave={() => moveTo(activeHref)}
                  onActivate={handleActivate}
                  registerRef={registerRef}
                />
              ))}
            </ul>

            {/* Desktop actions: phone, CTA, city */}
            <div className="hidden shrink-0 items-center gap-3 whitespace-nowrap xl:flex [&>*]:shrink-0">
              <PhoneBadge />
              <CtaButton />
              <CitySelector />
            </div>

            {/* Mobile / tablet menu */}
            <div className="flex items-center lg:hidden">
              <MobileNav
                items={NAV_ITEMS}
                triggerClassName="text-white hover:bg-white/10 hover:text-white"
              />
            </div>
          </div>

          {/* ---------- Scroll progress bar (desktop, docked) ---------- */}
          <div
            aria-hidden
            className={cn(
              "absolute inset-x-0 bottom-0 hidden h-0.5 overflow-hidden transition-opacity duration-300 lg:block",
              docked ? "opacity-100" : "opacity-0"
            )}
          >
            <div
              className="h-full origin-left bg-gradient-to-r from-lime-300 via-emerald-300 to-teal-300"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>
        </div>
      </header>
    </>
  );
}
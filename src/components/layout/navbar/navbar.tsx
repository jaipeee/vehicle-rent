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
import {
  NAV_ITEMS,
  LOGO_SRC,
  LOGO_ALT,
  type NavItem,
} from "./navbar.config";

import {
  PhoneBadge,
  CtaButton,
  CitySelector,
} from "./navbar-actions";

import { MobileNav } from "./mobile-nav";

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

  const registerRef = useCallback(
    (key: string, el: HTMLElement | null) => {
      if (el) {
        refs.current.set(key, el);
      } else {
        refs.current.delete(key);
      }
    },
    []
  );

  const moveTo = useCallback((key: string) => {
    const el = refs.current.get(key);

    if (!el) return;

    setRect({
      left: el.offsetLeft,
      width: el.offsetWidth,
    });
  }, []);

  return {
    registerRef,
    moveTo,
    rect,
  };
}

// -----------------------------------------------------
// Sliding indicator
// -----------------------------------------------------

function NavIndicator({
  rect,
}: {
  rect: SliderRect | null;
}) {
  if (!rect) return null;

  return (
    <div
      aria-hidden
      className="
        pointer-events-none
        absolute
        inset-y-1.5
        left-0
        z-0
        rounded-full
        bg-white
        shadow-md
        transition-[transform,width]
        duration-300
        ease-out
      "
      style={{
        width: rect.width,
        transform: `translateX(${rect.left}px)`,
      }}
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
  registerRef: (
    href: string,
    el: HTMLLIElement | null
  ) => void;
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
        `
          relative
          z-10
          flex
          items-center
          gap-2
          px-5
          py-2
          text-sm
          font-semibold
          tracking-wide
          transition-colors
          duration-300
        `,
        highlighted
          ? "text-emerald-950"
          : "text-emerald-100/70 hover:text-emerald-50"
      )}
    >
      <Icon
        className={cn(
          "h-4 w-4 transition-transform duration-300",
          highlighted && "scale-110"
        )}
      />

      {item.label}

      {hasChildren && (
        <ChevronDown className="h-3.5 w-3.5" />
      )}
    </span>
  );

  return (
    <li
      ref={(el) => registerRef(item.href, el)}
      className="
        relative
        z-10
        flex
        list-none
        items-center
      "
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
          <DropdownMenuTrigger
            asChild
            onClick={() => onActivate(item.href)}
          >
            <button
              type="button"
              className="flex items-center"
            >
              {content}
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="start"
            className="mt-2"
          >
            {item.children!.map((child) => (
              <DropdownMenuItem
                key={child.href}
                asChild
              >
                <Link href={child.href}>
                  {child.label}
                </Link>
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

export function Navbar() {
  const [activeHref, setActiveHref] = useState(
    NAV_ITEMS[0]?.href ?? ""
  );

  const {
    registerRef,
    moveTo,
    rect,
  } = useNavSlider();

  const handleActivate = (href: string) => {
    setActiveHref(href);
    moveTo(href);
  };

  // Initial indicator position
  useEffect(() => {
    moveTo(activeHref);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Recalculate indicator on resize
  useEffect(() => {
    const handleResize = () => {
      moveTo(activeHref);
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, [activeHref, moveTo]);

  return (
    <header
      className="
        fixed
        left-1/2
        top-3
        z-50
        w-max
        max-w-[calc(100vw-1.5rem)]
        -translate-x-1/2
        rounded-3xl
        bg-slate-100/30
        shadow-xl
        ring-1
        ring-white/10
        backdrop-blur-md
        sm:top-4
      "
    >
      <div
        className="
          flex
          min-h-14
          items-center
          gap-8
          px-4
          py-1.5
          sm:px-5
          lg:h-16
          lg:px-6
        "
      >
        {/* ----------------------------------------- */}
        {/* Logo */}
        {/* ----------------------------------------- */}

        <Link
          href="/"
          className="
            group
            flex
            shrink-0
            items-center
          "
        >
          <span
            className="
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              overflow-hidden
              rounded-xl
              ring-1
              ring-black/5
              transition-transform
              duration-300
              ease-out
              group-hover:-translate-y-0.5
              group-hover:shadow-xl
              sm:h-11
              sm:w-11
              lg:h-12
              lg:w-12
            "
          >
            <Image
              src={LOGO_SRC}
              alt={LOGO_ALT}
              width={96}
              height={96}
              className="
                h-full
                w-full
                rounded-xl
                object-contain
              "
              priority
            />
          </span>
        </Link>

        {/* ----------------------------------------- */}
        {/* Desktop Navigation */}
        {/* ----------------------------------------- */}

        <ul
          className="
            relative
            hidden
            h-10
            items-stretch
            rounded-full
            border
            border-white/15
            bg-black/10
            lg:flex
          "
        >
          <NavIndicator rect={rect} />

          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              isActive={
                activeHref === item.href
              }
              onHover={moveTo}
              onLeave={() =>
                moveTo(activeHref)
              }
              onActivate={handleActivate}
              registerRef={registerRef}
            />
          ))}
        </ul>

        {/* ----------------------------------------- */}
        {/* Desktop Actions */}
        {/* ----------------------------------------- */}

        <div
          className="
            hidden
            items-center
            gap-2
            xl:flex
          "
        >
          <PhoneBadge />
          <CtaButton />
          <CitySelector />
        </div>

        {/* ----------------------------------------- */}
        {/* Mobile */}
        {/* ----------------------------------------- */}

        <div
          className="
            flex
            items-center
            lg:hidden
          "
        >
          <MobileNav
            items={NAV_ITEMS}
            triggerClassName="
              text-white
              hover:bg-white/10
              hover:text-white
            "
          />
        </div>
      </div>
    </header>
  );
}
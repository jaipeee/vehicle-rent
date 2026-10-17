"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { OCCASIONS } from "./services.config";

const AUTOPLAY_MS = 4000; // time between automatic slides
const PAUSE_AFTER_INTERACTION_MS = 6000; // autoplay waits this long after any touch/click/drag
const HOLD_DELAY_MS = 450; // how long you hold an arrow before it starts repeating
const HOLD_REPEAT_MS = 450; // repeat speed while an arrow is held

/** Distance between the start of one card and the start of the next (card width + gap). */
function getStep(track: HTMLDivElement | null) {
  const first = track?.firstElementChild as HTMLElement | null;
  if (!track || !first) return 0;
  const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
  return first.offsetWidth + gap;
}

export function Services({ cityName, categoryLabel }: { cityName?: string; categoryLabel?: string }) {
  const [activeId, setActiveId] = useState(OCCASIONS[0].id);
  const active = OCCASIONS.find((o) => o.id === activeId) ?? OCCASIONS[0];

  const trackRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef(false);
  const pausedUntilRef = useRef(0);
  const holdRef = useRef<{
    delay?: ReturnType<typeof setTimeout>;
    repeat?: ReturnType<typeof setInterval>;
  }>({});
  const dragRef = useRef({ active: false, startX: 0, startLeft: 0, moved: false });

  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(1);
  const [dragging, setDragging] = useState(false);

  const pause = useCallback(() => {
    pausedUntilRef.current = Date.now() + PAUSE_AFTER_INTERACTION_MS;
  }, []);

  // Work out how many slide positions exist and which one is showing.
  const measure = useCallback(() => {
    const track = trackRef.current;
    const step = getStep(track);
    if (!track || !step) return;
    const last = Math.round((track.scrollWidth - track.clientWidth) / step);
    setCount(Math.max(1, last + 1));
    setIndex(Math.min(Math.max(Math.round(track.scrollLeft / step), 0), Math.max(last, 0)));
  }, []);

  const scrollToIndex = useCallback((i: number) => {
    const track = trackRef.current;
    const step = getStep(track);
    if (!track || !step) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const last = Math.round(maxScroll / step);
    // The last position scrolls exactly to the end so nothing is left cut off.
    const left = i >= last ? maxScroll : i * step;
    track.scrollTo({ left, behavior: "smooth" });
  }, []);

  // dir = 1 → next, -1 → previous. Wraps around at both ends.
  const slide = useCallback(
    (dir: 1 | -1) => {
      const track = trackRef.current;
      const step = getStep(track);
      if (!track || !step) return;
      const last = Math.round((track.scrollWidth - track.clientWidth) / step);
      if (last <= 0) return;
      const current = Math.round(track.scrollLeft / step);
      let target = current + dir;
      if (target > last) target = 0;
      if (target < 0) target = last;
      scrollToIndex(target);
    },
    [scrollToIndex]
  );

  /* ---------- Arrows: tap to move one card, press and hold to keep moving ---------- */
  const stopHold = useCallback(() => {
    clearTimeout(holdRef.current.delay);
    clearInterval(holdRef.current.repeat);
    holdRef.current = {};
  }, []);

  const startHold = useCallback(
    (dir: 1 | -1) => {
      stopHold();
      pause();
      slide(dir);
      holdRef.current.delay = setTimeout(() => {
        holdRef.current.repeat = setInterval(() => {
          pause();
          slide(dir);
        }, HOLD_REPEAT_MS);
      }, HOLD_DELAY_MS);
    },
    [pause, slide, stopHold]
  );

  useEffect(() => stopHold, [stopHold]);

  /* ---------- Mouse: press and drag the cards (touch uses native swipe) ---------- */
  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    pause();
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const track = trackRef.current;
    if (!track) return;
    dragRef.current = { active: true, startX: e.clientX, startLeft: track.scrollLeft, moved: false };
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const track = trackRef.current;
    if (!drag.active || !track) return;
    const dx = e.clientX - drag.startX;
    if (!drag.moved && Math.abs(dx) > 5) {
      drag.moved = true;
      setDragging(true);
    }
    if (drag.moved) track.scrollLeft = drag.startLeft - dx;
  };

  const endDrag = () => {
    const drag = dragRef.current;
    const track = trackRef.current;
    if (!drag.active) return;
    drag.active = false;
    setDragging(false);
    const step = getStep(track);
    if (track && step && drag.moved) scrollToIndex(Math.round(track.scrollLeft / step));
  };

  // Don't follow a "Book Now" / "Read More" link if the press was really a drag.
  const onClickCapture = (e: React.MouseEvent) => {
    if (dragRef.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      dragRef.current.moved = false;
    }
  };

  /* ---------- Autoplay ---------- */
  // Skipped for people who prefer reduced motion; paused while hovering
  // or for a few seconds after any interaction.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (hoverRef.current || Date.now() < pausedUntilRef.current) return;
      slide(1);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [activeId, slide]);

  // Start from the first card whenever the occasion tab changes.
  useEffect(() => {
    const track = trackRef.current;
    if (track) track.scrollLeft = 0;
    measure();
  }, [activeId, measure]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const renderArrow = (dir: 1 | -1) => {
    const Icon = dir === 1 ? ChevronRight : ChevronLeft;
    return (
      <button
        type="button"
        aria-label={dir === 1 ? "Next" : "Previous"}
        onPointerDown={() => startHold(dir)}
        onPointerUp={stopHold}
        onPointerLeave={stopHold}
        onPointerCancel={stopHold}
        onContextMenu={(e) => e.preventDefault()}
        // detail === 0 means the click came from the keyboard (Enter / Space)
        onClick={(e) => {
          if (e.detail === 0) {
            pause();
            slide(dir);
          }
        }}
        className={cn(
          "absolute top-[6.5rem] z-10 flex h-9 w-9 -translate-y-1/2 touch-none select-none items-center justify-center rounded-full bg-white/90 text-[#ea7236] shadow-lg ring-1 ring-black/5 transition hover:bg-[#ea7236] hover:text-white active:scale-90 sm:top-28 sm:h-11 sm:w-11",
          dir === -1 ? "left-2 lg:-left-4" : "right-2 lg:-right-4"
        )}
      >
        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
    );
  };

  return (
    <section className="mx-auto max-w-7xl bg-amber-100/10 px-3 py-10 sm:px-4 sm:py-16 lg:px-8">
      <div className="flex items-center justify-center gap-3 pb-5 text-xs font-bold uppercase tracking-[0.3em] text-amber-600">
        <span className="h-px w-8 bg-amber-400" />
        Services
        <span className="h-px w-8 bg-amber-400" />
      </div>
      <div className="text-center">
        <h2 className="mt-1 text-xl font-extrabold text-slate-900 sm:mt-4 sm:text-3xl">
          For Every <span className="text-amber-500">Occasion</span>
        </h2>
        <p className="mt-2 text-xs text-slate-500 sm:text-base">
          Whatever the occasion for traveling, we have the right vehicle for you.
        </p>
      </div>

      {/* Occasion tabs: scrollable on phones, centered on larger screens */}
      <div className="mt-5 flex overflow-x-auto pb-1 [scrollbar-width:none] sm:mt-4 sm:justify-center [&::-webkit-scrollbar]:hidden">
        <div className="inline-flex shrink-0 overflow-hidden rounded-full border border-emerald-900">
          {OCCASIONS.map((occasion) => (
            <button
              key={occasion.id}
              type="button"
              onClick={() => setActiveId(occasion.id)}
              className={cn(
                "whitespace-nowrap px-3 py-2 text-[11px] font-bold uppercase tracking-wide transition-colors sm:py-2.5 sm:text-sm",
                activeId === occasion.id
                  ? "bg-[#37d4d9] text-emerald-950"
                  : "bg-[#ea7236] text-white hover:bg-[#37d4d9]"
              )}
            >
              {occasion.label}
            </button>
          ))}
        </div>
      </div>

      {/* Carousel: 1 card per view on phones, 2 from `sm` up */}
      <div
        className="mt-6 sm:mt-10"
        onMouseEnter={() => (hoverRef.current = true)}
        onMouseLeave={() => (hoverRef.current = false)}
        onFocusCapture={pause}
      >
        <div className="relative">
          {count > 1 && renderArrow(-1)}
          {count > 1 && renderArrow(1)}

          <div
            ref={trackRef}
            onScroll={measure}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            onPointerCancel={endDrag}
            onClickCapture={onClickCapture}
            role="region"
            aria-roledescription="carousel"
            aria-label={`${active.label} vehicles`}
            className={cn(
              "flex select-none gap-4 overflow-x-auto pb-2 sm:cursor-grab sm:gap-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&_img]:pointer-events-none",
              dragging ? "cursor-grabbing snap-none" : "snap-x snap-mandatory"
            )}
          >
            {active.examples.map((example) => (
              <div
                key={example.title}
                className="flex basis-full shrink-0 snap-start flex-col overflow-hidden rounded-xl border-2 border-amber-500 bg-white sm:basis-[calc((100%-2rem)/2)] sm:rounded-2xl"
              >
                <div className="relative h-52 w-full sm:h-56">
                  <Image
                    src={example.image}
                    alt={example.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute left-3 top-3 rounded-md bg-white px-2.5 py-1 shadow">
                    <span className="text-xs font-bold text-emerald-700">Indiventra</span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-4 sm:p-6">
                  <h3 className="text-lg font-bold leading-tight text-slate-900">{example.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{example.description}</p>

                  <div className="mt-auto flex gap-3 pt-5">
                    <a
                      href="#get-a-quote"
                      draggable={false}
                      className="group relative flex-1 overflow-hidden rounded-xl bg-[#ea7236] px-5 py-2.5 text-center shadow-md transition-all hover:shadow-lg"
                    >
                      <span className="absolute left-0 top-0 h-0 w-1/4 bg-[#37d4d9] transition-all duration-500 group-hover:h-full" />
                      <span className="absolute bottom-0 left-1/4 h-0 w-1/4 bg-[#37d4d9] transition-all duration-500 group-hover:h-full" />
                      <span className="absolute right-1/4 top-0 h-0 w-1/4 bg-[#37d4d9] transition-all duration-500 group-hover:h-full" />
                      <span className="absolute bottom-0 right-0 h-0 w-1/4 bg-[#37d4d9] transition-all duration-500 group-hover:h-full" />
                      <span className="relative z-10 whitespace-nowrap text-sm font-bold text-white">
                        Book Now
                      </span>
                    </a>
                    <a
                      href="#get-a-quote"
                      draggable={false}
                      className="group relative flex-1 overflow-hidden rounded-xl bg-[#03070a] px-5 py-2.5 text-center shadow-md transition-all hover:shadow-lg"
                    >
                      <span className="absolute left-0 top-0 h-0 w-1/4 bg-[#37d4d9] transition-all duration-500 group-hover:h-full" />
                      <span className="absolute bottom-0 left-1/4 h-0 w-1/4 bg-[#37d4d9] transition-all duration-500 group-hover:h-full" />
                      <span className="absolute right-1/4 top-0 h-0 w-1/4 bg-[#37d4d9] transition-all duration-500 group-hover:h-full" />
                      <span className="absolute bottom-0 right-0 h-0 w-1/4 bg-[#37d4d9] transition-all duration-500 group-hover:h-full" />
                      <span className="relative z-10 whitespace-nowrap text-sm font-bold text-white">
                        Read More
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        {count > 1 && (
          <div className="mt-5 flex items-center justify-center gap-2">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                onClick={() => {
                  pause();
                  scrollToIndex(i);
                }}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300",
                  i === index ? "w-6 bg-[#ea7236]" : "w-2.5 bg-slate-300 hover:bg-slate-400"
                )}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
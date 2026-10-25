"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Minus, Phone, Plus, RefreshCw, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { CONTACT_PHONE } from "@/components/layout/navbar/navbar.config";

/* ------------------------------- Data ------------------------------- */

const WHATSAPP_NO = "918369687417";
const IMG = "https://res.cloudinary.com/yhuaios0/image/upload/f_auto,w_500/";
const STEPS = ["Trip", "Vehicle", "Contact"] as const;
const GST_RE = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;

const VEHICLES = [
  { id: "Car on Rent", img: "v1790712443/cars_SUVs.png", cat: ["Standard", "Preferred"] },
  { id: "Luxury Car", img: "v1790712444/Luxury_Cars_SUVs.png", cat: ["Regal", "Imperial"] },
  { id: "Tempo Traveller", img: "v1790703115/Tempo_Traveller.png", cat: ["Standard", "Preferred"] },
  { id: "Maharaja Tempo Traveller", img: "v1790703115/Tempo_Traveller.png", cat: ["Regal", "Imperial"] },
  { id: "Urbania", img: "v1790712443/Force_Urbania.png", cat: ["Preferred", "Regal"] },
  { id: "Luxury Van", img: "v1790703150/Force_Urbania.png", cat: ["Regal", "Imperial"] },
  { id: "Mini Bus", img: "v1790703115/Minibus.png", cat: ["Standard", "Preferred"] },
  { id: "Luxury Bus", img: "v1790712443/Sleeper_Bus.png", cat: ["Preferred", "Regal", "Imperial"] },
];

const CATS = [
  { n: "Standard", d: "Clean, reliable vehicles with all essential comforts. Best value for everyday travel." },
  { n: "Preferred", d: "Pushback seats, powerful AC and extra comfort for longer journeys." },
  { n: "Regal", d: "New-age modified vehicles with premium interiors and best-in-class amenities." },
  { n: "Imperial", d: "Ultra-luxury, custom-designed vehicles with 1x1 Maharaja seats and a VIP feel." },
];

const FALLBACK_IMG = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 60"><rect x="8" y="14" width="104" height="30" rx="8" fill="#c9d0e4"/><rect x="16" y="19" width="22" height="12" rx="2" fill="#fff"/><rect x="44" y="19" width="22" height="12" rx="2" fill="#fff"/><rect x="72" y="19" width="22" height="12" rx="2" fill="#fff"/><circle cx="30" cy="46" r="8" fill="#1b1f3b"/><circle cx="90" cy="46" r="8" fill="#1b1f3b"/></svg>'
)}`;

const KEYFRAMES = `
@keyframes quote-step { from { opacity: 0; transform: translateX(18px); } to { opacity: 1; transform: translateX(0); } }
@keyframes quote-pop { 0% { transform: scale(0); } 70% { transform: scale(1.15); } 100% { transform: scale(1); } }
.quote-step { animation: quote-step 0.35s cubic-bezier(0.22, 1, 0.36, 1) both; }
.quote-pop { animation: quote-pop 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both; }
@media (prefers-reduced-motion: reduce) { .quote-step, .quote-pop { animation: none !important; } }
`;

/* ------------------------------- Form state ------------------------------- */

interface Form {
  pickup: string;
  pdate: string;
  drop: string;
  ddate: string;
  tripType: string;
  stops: string[];
  itin: string;
  pax: number;
  bag: number;
  category: string;
  models: string[];
  name: string;
  cc: string;
  phone: string;
  email: string;
  company: string;
  gst: string;
  message: string;
  answer: string;
  hp_site: string; // honeypot: real people never fill this
}

type Errors = Partial<Record<keyof Form, string>>;

const EMPTY: Form = {
  pickup: "", pdate: "", drop: "", ddate: "", tripType: "One way", stops: [], itin: "",
  pax: 1, bag: 0, category: "", models: [],
  name: "", cc: "+91", phone: "", email: "", company: "", gst: "", message: "",
  answer: "", hp_site: "",
};

const localToday = () => new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);

function validate(step: number, f: Form, captcha: { a: number; b: number }): Errors {
  const e: Errors = {};
  if (step === 0) {
    if (!f.pickup.trim()) e.pickup = "This field is required";
    if (!f.pdate) e.pdate = "This field is required";
    if (!f.drop.trim()) e.drop = "This field is required";
    if (!f.ddate) e.ddate = "This field is required";
    else if (f.pdate && f.ddate < f.pdate) e.ddate = "Drop date can’t be before pickup";
    if (!f.itin.trim()) e.itin = "This field is required";
  }
  if (step === 1 && f.models.length === 0) e.models = "Select at least one vehicle model.";
  if (step === 2) {
    if (!f.name.trim()) e.name = "This field is required";
    const digits = f.phone.replace(/\D/g, "");
    if (!digits) e.phone = "This field is required";
    else if (!/^\d{6,12}$/.test(digits)) e.phone = "Enter a valid phone number";
    if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Enter a valid email";
    if (f.gst && !GST_RE.test(f.gst)) e.gst = "Enter a valid 15-character GST number";
    if (Number(f.answer) !== captcha.a + captcha.b) e.answer = "Wrong answer, try again";
  }
  return e;
}

/* ------------------------------- Small pieces ------------------------------- */

const inputCls = (bad?: boolean) =>
  cn(
    "w-full rounded-xl border bg-white px-3.5 py-2.5 text-base text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#ea7236] focus:ring-4 focus:ring-[#ea7236]/15 sm:text-sm",
    bad ? "border-red-500" : "border-slate-300"
  );

function Field({
  id, label, error, className, children,
}: { id: string; label: string; error?: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-left text-sm font-semibold text-emerald-950">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-left text-xs text-red-600">{error}</p>}
    </div>
  );
}

function Counter({
  id, label, value, min, onChange,
}: { id: string; label: string; value: number; min: number; onChange: (n: number) => void }) {
  const btn = "flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center text-emerald-950 transition hover:bg-orange-50 active:scale-95";
  return (
    <div className="flex items-center overflow-hidden rounded-xl border border-slate-300">
      <button type="button" aria-label={`Fewer ${label}`} onClick={() => onChange(Math.max(min, value - 1))} className={btn}>
        <Minus className="h-4 w-4" />
      </button>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        min={min}
        value={value}
        onChange={(e) => onChange(Math.min(500, Math.max(min, Number(e.target.value) || min)))}
        className="h-11 w-full min-w-0 border-0 bg-transparent text-center text-base text-slate-800 outline-none sm:text-sm"
      />
      <button type="button" aria-label={`More ${label}`} onClick={() => onChange(Math.min(500, value + 1))} className={btn}>
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

/* ------------------------------- Modal ------------------------------- */

export function QuoteModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false); // in the DOM
  const [visible, setVisible] = useState(false); // drives the enter/exit transition
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [captcha, setCaptcha] = useState({ a: 2, b: 3 });
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [refCode, setRefCode] = useState<string | null>(null);

  const panelRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const prevFocus = useRef<HTMLElement | null>(null);
  const doneRef = useRef(false);

  const set = <K extends keyof Form>(key: K, value: Form[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => {
      if (!e[key]) return e;
      const n = { ...e };
      delete n[key];
      return n;
    });
  };

  const newCaptcha = useCallback(() => {
    setCaptcha({ a: 2 + Math.floor(Math.random() * 8), b: 2 + Math.floor(Math.random() * 8) });
    setForm((f) => ({ ...f, answer: "" }));
  }, []);

  // Mount, then fade/slide in one frame later. On close: fade out, then unmount.
  useEffect(() => {
    if (open) {
      prevFocus.current = document.activeElement as HTMLElement | null;
      setMounted(true);
      newCaptcha();
      const id = requestAnimationFrame(() => {
        setVisible(true);
        panelRef.current?.focus({ preventScroll: true });
      });
      return () => cancelAnimationFrame(id);
    }
    setVisible(false);
    const t = setTimeout(() => {
      setMounted(false);
      if (doneRef.current) {
        doneRef.current = false;
        setForm(EMPTY);
        setStep(0);
        setErrors({});
        setRefCode(null);
      }
      prevFocus.current?.focus?.();
    }, 300);
    return () => clearTimeout(t);
  }, [open, newCaptcha]);

  // Lock page scroll while open
  useEffect(() => {
    if (!mounted) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mounted]);

  // Escape closes
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Keep Tab inside the dialog
  const trapTab = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !panelRef.current) return;
    const els = panelRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), select, textarea'
    );
    if (!els.length) return;
    const first = els[0];
    const last = els[els.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && (active === first || active === panelRef.current)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const goTo = (i: number) => {
    setStep(i);
    bodyRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const next = () => {
    const errs = validate(step, form, captcha);
    setErrors(errs);
    if (Object.keys(errs).length === 0) goTo(step + 1);
  };

  async function submit() {
    setSending(true);
    setSubmitError("");
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { answer, ...rest } = form;
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...rest,
          stops: form.stops.filter((s) => s.trim()),
          sourcePage: window.location.pathname,
        }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok) throw new Error(json?.message ?? "Couldn’t send your request.");
      doneRef.current = true;
      setRefCode(json.ref);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Couldn’t send your request. Please try again or call us.");
    } finally {
      setSending(false);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    if (step < STEPS.length - 1) return next(); // Enter on steps 1-2 = Continue
    for (let i = 0; i < STEPS.length; i++) {
      const errs = validate(i, form, captcha);
      if (Object.keys(errs).length) {
        setErrors(errs);
        goTo(i);
        if (errs.answer) newCaptcha();
        return;
      }
    }
    submit();
  };

  if (!mounted) return null;

  const today = localToday();
  const list = form.category ? VEHICLES.filter((v) => v.cat.includes(form.category)) : VEHICLES;
  const toggleModel = (id: string) =>
    set("models", form.models.includes(id) ? form.models.filter((m) => m !== id) : [...form.models, id]);
  const firstName = form.name.trim().split(" ")[0];
  const isLast = step === STEPS.length - 1;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4">
      <style>{KEYFRAMES}</style>

      {/* Backdrop */}
      <div
        aria-hidden
        onMouseDown={onClose}
        className={cn(
          "absolute inset-0 bg-emerald-950/70 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none",
          visible ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-title"
        tabIndex={-1}
        onKeyDown={trapTab}
        className={cn(
          "relative flex max-h-[94dvh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl outline-none transition-all duration-300 ease-out motion-reduce:transition-none sm:max-h-[90dvh] sm:max-w-3xl sm:rounded-3xl",
          visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-10 scale-95 opacity-0"
        )}
      >
        {/* Header */}
        <div className="relative shrink-0 overflow-hidden bg-gradient-to-r from-emerald-950 via-teal-800 to-slate-900 px-5 pb-4 pt-5 text-white sm:px-7">
          <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-lime-400/25 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-12 left-10 h-28 w-40 rounded-full bg-[#37d4d9]/20 blur-3xl" />
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <h2 id="quote-title" className="text-lg font-bold text-white sm:text-xl">
                {refCode ? "Request received" : "Get a Quote"}
              </h2>
              <p className="mt-0.5 text-left text-xs text-white/75 sm:text-sm">
                {refCode ? "We’ll be in touch shortly." : "Tell us about your trip. We’ll send a written quote."}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="shrink-0 cursor-pointer rounded-full bg-white/10 p-2 text-white transition hover:rotate-90 hover:bg-white/25"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {!refCode && (
            <div className="relative mt-4 flex gap-2">
              {STEPS.map((label, i) => (
                <button
                  key={label}
                  type="button"
                  disabled={i > step}
                  onClick={() => i < step && goTo(i)}
                  className={cn(
                    "flex-1 text-left text-xs font-semibold transition-colors",
                    i === step ? "text-white" : i < step ? "cursor-pointer text-white/85" : "text-white/45"
                  )}
                >
                  <span
                    className={cn(
                      "mb-1.5 block h-1.5 rounded-full transition-colors duration-300",
                      i <= step ? "bg-[#ea7236]" : "bg-white/20"
                    )}
                  />
                  {i + 1}. {label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Success */}
        {refCode ? (
          <div className="flex-1 overflow-y-auto px-5 py-10 text-center sm:px-7">
            <div className="quote-pop mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ea7236] text-white shadow-lg">
              <Check className="h-8 w-8" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-emerald-950">Thank you{firstName ? `, ${firstName}` : ""}!</h3>
            <p className="mx-auto mt-2 max-w-md text-center text-sm leading-relaxed">
              Your quote request has been received. Our travel advisor will review your trip details and contact you
              shortly with the best vehicle and price.
            </p>
            <p className="mx-auto mt-4 w-fit rounded-xl bg-orange-50 px-4 py-2 text-sm">
              Your reference: <b className="text-emerald-950">{refCode}</b>
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`https://wa.me/${WHATSAPP_NO}?text=${encodeURIComponent(`Hi Indiventra, I just requested a quote. Ref: ${refCode}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                <FaWhatsapp className="h-4 w-4" /> Chat on WhatsApp
              </a>
              <a
                href={CONTACT_PHONE.href}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-slate-50"
              >
                <Phone className="h-4 w-4" /> {CONTACT_PHONE.display}
              </a>
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer rounded-xl bg-emerald-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex min-h-0 flex-1 flex-col">
            <div ref={bodyRef} className="flex-1 overflow-y-auto px-5 py-5 sm:px-7">
              <div key={step} className="quote-step">
                {/* ---------- Step 1: Trip ---------- */}
                {step === 0 && (
                  <div className="grid gap-x-4 gap-y-3 sm:grid-cols-2">
                    <Field id="q-pickup" label="Pickup address *" error={errors.pickup}>
                      <input id="q-pickup" value={form.pickup} onChange={(e) => set("pickup", e.target.value)} placeholder="Enter a location" aria-invalid={!!errors.pickup} className={inputCls(!!errors.pickup)} />
                    </Field>
                    <Field id="q-pdate" label="Pickup date *" error={errors.pdate}>
                      <input id="q-pdate" type="date" min={today} value={form.pdate} onChange={(e) => {
                        set("pdate", e.target.value);
                        if (form.ddate && form.ddate < e.target.value) set("ddate", e.target.value);
                      }} aria-invalid={!!errors.pdate} className={inputCls(!!errors.pdate)} />
                    </Field>
                    <Field id="q-drop" label="Drop address *" error={errors.drop}>
                      <input id="q-drop" value={form.drop} onChange={(e) => set("drop", e.target.value)} placeholder="Enter a location" aria-invalid={!!errors.drop} className={inputCls(!!errors.drop)} />
                    </Field>
                    <Field id="q-ddate" label="Drop date *" error={errors.ddate}>
                      <input id="q-ddate" type="date" min={form.pdate || today} value={form.ddate} onChange={(e) => set("ddate", e.target.value)} aria-invalid={!!errors.ddate} className={inputCls(!!errors.ddate)} />
                    </Field>

                    <Field id="q-trip" label="Trip type" className="sm:col-span-2">
                      <select id="q-trip" value={form.tripType} onChange={(e) => set("tripType", e.target.value)} className={inputCls()}>
                        <option>One way</option>
                        <option>Round trip</option>
                        <option>Multi-city / Tour</option>
                      </select>
                    </Field>

                    <div className="sm:col-span-2">
                      <span className="mb-1.5 block text-left text-sm font-semibold text-emerald-950">Route stops (optional)</span>
                      <div className="space-y-2">
                        {form.stops.map((s, i) => (
                          <div key={i} className="flex gap-2">
                            <input
                              aria-label={`Stop ${i + 1}`}
                              value={s}
                              placeholder={`Stop ${i + 1}`}
                              onChange={(e) => set("stops", form.stops.map((x, j) => (j === i ? e.target.value : x)))}
                              className={inputCls()}
                            />
                            <button type="button" aria-label={`Remove stop ${i + 1}`} onClick={() => set("stops", form.stops.filter((_, j) => j !== i))} className="shrink-0 cursor-pointer rounded-xl px-3 text-slate-500 transition hover:bg-red-50 hover:text-red-600">
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <button type="button" onClick={() => set("stops", [...form.stops, ""])} className="mt-2 inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-300 px-3.5 py-2 text-sm font-semibold text-emerald-950 transition hover:bg-orange-50">
                        <Plus className="h-4 w-4" /> Add stop
                      </button>
                    </div>

                    <Field id="q-itin" label="Travel itinerary *" error={errors.itin} className="sm:col-span-2">
                      <textarea id="q-itin" rows={4} maxLength={250} value={form.itin} onChange={(e) => set("itin", e.target.value)} placeholder="Share your complete travel plan: stops, timings, anything we should know" aria-invalid={!!errors.itin} className={inputCls(!!errors.itin)} />
                      <p className="mt-1 text-right text-xs text-slate-400">{form.itin.length} / 250</p>
                    </Field>

                    <Field id="q-pax" label="Passengers *">
                      <Counter id="q-pax" label="passengers" value={form.pax} min={1} onChange={(n) => set("pax", n)} />
                    </Field>
                    <Field id="q-bag" label="Baggages *">
                      <Counter id="q-bag" label="bags" value={form.bag} min={0} onChange={(n) => set("bag", n)} />
                    </Field>
                  </div>
                )}

                {/* ---------- Step 2: Vehicle ---------- */}
                {step === 1 && (
                  <div>
                    <p className="mb-3 text-left text-sm">Choose a category, then tap one or more models.</p>
                    <div className="flex flex-wrap gap-2">
                      {[{ n: "", label: "All" }, ...CATS.map((c) => ({ n: c.n, label: c.n }))].map((c) => (
                        <button
                          key={c.label}
                          type="button"
                          aria-pressed={form.category === c.n}
                          onClick={() => set("category", c.n)}
                          className={cn(
                            "cursor-pointer rounded-full border px-4 py-1.5 text-sm font-semibold transition",
                            form.category === c.n
                              ? "border-[#ea7236] bg-[#ea7236] text-white"
                              : "border-slate-300 bg-white text-emerald-950 hover:border-[#ea7236]"
                          )}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                    {form.category && (
                      <p className="mt-3 rounded-xl bg-orange-50 px-3.5 py-2.5 text-left text-xs leading-relaxed">
                        {CATS.find((c) => c.n === form.category)?.d}
                      </p>
                    )}

                    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {list.map((v) => {
                        const on = form.models.includes(v.id);
                        return (
                          <button
                            key={v.id}
                            type="button"
                            aria-pressed={on}
                            onClick={() => toggleModel(v.id)}
                            className={cn(
                              "relative cursor-pointer rounded-2xl border-2 p-2.5 text-center transition hover:-translate-y-0.5",
                              on ? "border-[#ea7236] bg-orange-50" : "border-slate-200 bg-white hover:border-[#ea7236]/60"
                            )}
                          >
                            {on && (
                              <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#ea7236] text-white">
                                <Check className="h-3 w-3" />
                              </span>
                            )}
                            <span className="flex h-20 items-center justify-center">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={IMG + v.img}
                                alt=""
                                loading="lazy"
                                className="max-h-20 max-w-full object-contain"
                                onError={(e) => {
                                  e.currentTarget.onerror = null;
                                  e.currentTarget.src = FALLBACK_IMG;
                                }}
                              />
                            </span>
                            <span className="mt-1 block text-xs font-semibold text-emerald-950 sm:text-[13px]">{v.id}</span>
                          </button>
                        );
                      })}
                    </div>
                    {errors.models && <p className="mt-2 text-left text-xs text-red-600">{errors.models}</p>}
                  </div>
                )}

                {/* ---------- Step 3: Contact ---------- */}
                {step === 2 && (
                  <div className="grid gap-x-4 gap-y-3 sm:grid-cols-2">
                    <Field id="q-name" label="Full name *" error={errors.name}>
                      <input id="q-name" value={form.name} autoComplete="name" onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} className={inputCls(!!errors.name)} />
                    </Field>
                    <Field id="q-phone" label="Phone number *" error={errors.phone}>
                      <div className="flex gap-2">
                        <select aria-label="Country code" value={form.cc} onChange={(e) => set("cc", e.target.value)} className={cn(inputCls(), "w-24 shrink-0")}>
                          <option>+91</option>
                          <option>+971</option>
                          <option>+1</option>
                          <option>+44</option>
                          <option>+65</option>
                        </select>
                        <input id="q-phone" type="tel" inputMode="numeric" autoComplete="tel-national" value={form.phone} onChange={(e) => set("phone", e.target.value)} aria-invalid={!!errors.phone} className={inputCls(!!errors.phone)} />
                      </div>
                    </Field>
                    <Field id="q-email" label="Email" error={errors.email} className="sm:col-span-2">
                      <input id="q-email" type="email" autoComplete="email" placeholder="Optional" value={form.email} onChange={(e) => set("email", e.target.value)} aria-invalid={!!errors.email} className={inputCls(!!errors.email)} />
                    </Field>
                    <Field id="q-co" label="Company name (for GST bill)">
                      <input id="q-co" placeholder="Optional" value={form.company} onChange={(e) => set("company", e.target.value)} className={inputCls()} />
                    </Field>
                    <Field id="q-gst" label="GST number" error={errors.gst}>
                      <input id="q-gst" maxLength={15} placeholder="Optional" value={form.gst} onChange={(e) => set("gst", e.target.value.toUpperCase())} aria-invalid={!!errors.gst} className={inputCls(!!errors.gst)} />
                    </Field>
                    <Field id="q-msg" label="Message" className="sm:col-span-2">
                      <textarea id="q-msg" rows={3} placeholder="Anything else?" value={form.message} onChange={(e) => set("message", e.target.value)} className={inputCls()} />
                    </Field>

                    <Field id="q-ans" label="Verify you’re human *" error={errors.answer} className="sm:col-span-2">
                      <div className="flex items-center gap-3">
                        <b className="whitespace-nowrap text-emerald-950">{captcha.a} + {captcha.b} =</b>
                        <input id="q-ans" inputMode="numeric" value={form.answer} onChange={(e) => set("answer", e.target.value)} aria-invalid={!!errors.answer} className={cn(inputCls(!!errors.answer), "w-24")} />
                        <button type="button" aria-label="New question" onClick={newCaptcha} className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-slate-300 text-emerald-950 transition hover:rotate-180 hover:bg-orange-50">
                          <RefreshCw className="h-4 w-4" />
                        </button>
                      </div>
                    </Field>

                    {/* Honeypot */}
                    <input name="hp_site" tabIndex={-1} autoComplete="off" aria-hidden="true" value={form.hp_site} onChange={(e) => set("hp_site", e.target.value)} className="absolute -left-[9999px] h-0 w-0 opacity-0" />
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="shrink-0 border-t border-slate-100 bg-white px-5 py-4 sm:px-7">
              {submitError && <p role="alert" className="mb-3 text-left text-sm text-red-600">{submitError}</p>}
              <div className="flex items-center justify-between gap-3">
                {step > 0 ? (
                  <button type="button" onClick={() => goTo(step - 1)} className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-slate-100 px-5 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-slate-200">
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                ) : (
                  <span />
                )}

                {isLast ? (
                  <button type="submit" disabled={sending} className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#ea7236] px-7 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#d9631f] disabled:cursor-wait disabled:opacity-60">
                    {sending ? "Sending…" : "Request quote"}
                  </button>
                ) : (
                  <button type="button" onClick={next} className="group inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#ea7236] px-7 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#d9631f]">
                    Continue <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                )}
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
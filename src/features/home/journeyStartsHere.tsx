"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { Caveat } from "next/font/google";
import { Clock, Headphones, IndianRupee, Phone, ShieldCheck, User, type LucideIcon } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { CONTACT_PHONE } from "@/components/layout/navbar/navbar.config";

const script = Caveat({ subsets: ["latin"], weight: ["500", "700"], display: "swap" });

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* ------------------------------------------------------------------ */

/** Button colors. Swap STRIP_COLOR to "bg-[#37d4d9]" for the original cyan sweep. */
const BUTTON_BG = "bg-[#ea7236]";
const STRIP_COLOR = "bg-[#0a1f44]";

const BADGES: { icon: LucideIcon; label: string }[] = [
  { icon: ShieldCheck, label: "Safe Travel" },
  { icon: Clock, label: "On Time" },
  { icon: IndianRupee, label: "Best Prices" },
  { icon: Headphones, label: "24/7 Support" },
];

const WHATSAPP_NUMBER = CONTACT_PHONE.display.replace(/\D/g, ""); // must include country code, e.g. 91XXXXXXXXXX

type Props = {
  /** Optional fleet photo (transparent PNG works best), shown on the right on large screens. */
  heroImage?: string;
  /** Called with the validated form values. Throw to show an error. */
  onSubmit?: (data: { name: string; mobile: string }) => Promise<void>;
  /** Used by the default submit handler when `onSubmit` is not passed. */
  endpoint?: string;
};

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function JourneyStartsHere({ heroImage, onSubmit, endpoint = "/api/leads" }: Props) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [errors, setErrors] = useState<{ name?: string; mobile?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function validate() {
    const next: { name?: string; mobile?: string } = {};
    if (name.trim().length < 2) next.name = "Enter your full name";
    if (!/^[6-9]\d{9}$/.test(mobile)) next.mobile = "Enter a valid 10-digit mobile number";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("idle");
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const payload = { name: name.trim(), mobile };
      if (onSubmit) {
        await onSubmit(payload);
      } else {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Request failed");
      }
      setStatus("success");
      setName("");
      setMobile("");
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  function openWhatsApp() {
    const who = name.trim() ? ` My name is ${name.trim()}.` : "";
    const text = `Hi Indiventra, I'd like a free quote for a vehicle rental.${who}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  }

  const fieldBase =
    "h-14 w-full rounded-xl border bg-white pl-12 pr-4 text-base text-[#0a1f44] outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/15";

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-100 via-amber-50 to-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:px-2 lg:py-4">
        <div>
          <p className={`${script.className} text-3xl text-orange-500 sm:text-4xl`}>Your Next</p>
          <h2 className="-mt-1 text-4xl font-extrabold leading-tight tracking-tight text-[#0a1f44] sm:text-5xl lg:text-6xl">
            Journey Starts Here
          </h2>
          <span className="mt-3 block h-1 w-64 max-w-full rounded-full bg-gradient-to-r from-orange-500 to-transparent" />

          <p className="mt-5 text-base text-slate-700 sm:text-lg">
            Comfortable Rides <span className="mx-2 text-orange-500">•</span>
            Trusted Drivers <span className="mx-2 text-orange-500">•</span>
            Easy Booking
          </p>

          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
            {BADGES.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm font-medium text-[#0a1f44]">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#0a1f44]/25 bg-white">
                  <Icon className="h-4 w-4" />
                </span>
                {label}
              </li>
            ))}
          </ul>

          {/* ---------- Quote form ---------- */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="mt-8 max-w-2xl rounded-2xl border border-white bg-white/70 p-4 shadow-xl shadow-[#0a1f44]/10 backdrop-blur sm:p-5"
          >
            <p className="mb-3 text-sm font-medium text-slate-600">Share your details and we will call you back.</p>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="jsh-name" className="sr-only">
                  Full name
                </label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-orange-500" />
                  <input
                    id="jsh-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "jsh-name-err" : undefined}
                    className={`${fieldBase} ${errors.name ? "border-red-400" : "border-slate-200"}`}
                  />
                </div>
                {errors.name && (
                  <p id="jsh-name-err" className="mt-1 pl-1 text-xs text-red-600">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="jsh-mobile" className="sr-only">
                  Mobile number
                </label>
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-orange-500" />
                  <input
                    id="jsh-mobile"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    maxLength={10}
                    placeholder="Mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                    aria-invalid={!!errors.mobile}
                    aria-describedby={errors.mobile ? "jsh-mobile-err" : undefined}
                    className={`${fieldBase} ${errors.mobile ? "border-red-400" : "border-slate-200"}`}
                  />
                </div>
                {errors.mobile && (
                  <p id="jsh-mobile-err" className="mt-1 pl-1 text-xs text-red-600">
                    {errors.mobile}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                className={`group pointer-events-auto relative h-14 w-full overflow-hidden rounded-xl ${BUTTON_BG} px-8 text-white shadow-md transition-all hover:shadow-lg disabled:pointer-events-none disabled:opacity-70 sm:w-auto sm:min-w-[190px]`}
              >
                <span className={`absolute left-0 top-0 h-0 w-1/4 ${STRIP_COLOR} duration-500 group-hover:h-full motion-reduce:duration-0`} />
                <span className={`absolute bottom-0 left-1/4 h-0 w-1/4 ${STRIP_COLOR} duration-500 group-hover:h-full motion-reduce:duration-0`} />
                <span className={`absolute right-1/4 top-0 h-0 w-1/4 ${STRIP_COLOR} duration-500 group-hover:h-full motion-reduce:duration-0`} />
                <span className={`absolute bottom-0 right-0 h-0 w-1/4 ${STRIP_COLOR} duration-500 group-hover:h-full motion-reduce:duration-0`} />

                <span className="relative z-10 text-lg font-bold tracking-wide">
                  {isSubmitting ? "Submitting..." : "GET A FREE QUOTE"}
                </span>
              </Button>

              <span className="hidden text-sm text-slate-500 sm:inline">or</span>

              <button
                type="button"
                onClick={openWhatsApp}
                className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-xl border border-[#0a1f44]/30 bg-white px-6 font-semibold text-[#0a1f44] transition hover:border-[#25d366] hover:bg-[#25d366]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25d366] sm:w-auto"
              >
                <FaWhatsapp className="h-6 w-6 text-[#25d366]" />
                Chat on WhatsApp
              </button>
            </div>

            <div aria-live="polite" className="min-h-5">
              {status === "success" && (
                <p className="mt-3 text-sm font-medium text-emerald-700">
                  Thanks! Our team will call you shortly.
                </p>
              )}
              {status === "error" && (
                <p className="mt-3 text-sm font-medium text-red-600">
                  Could not send your details. Please try again or chat with us on WhatsApp.
                </p>
              )}
            </div>
          </form>
        </div>

        {heroImage ? (
          <div className="relative hidden h-80 lg:block xl:h-96">
            <Image
              src={heroImage}
              alt="Our fleet of buses, tempo travellers and cars"
              fill
              className="object-contain object-right-bottom"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
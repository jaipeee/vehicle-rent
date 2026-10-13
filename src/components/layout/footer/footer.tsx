import Link from "next/link";
import Image from "next/image";
import { Caveat } from "next/font/google";
import { Car, ChevronRight, Headset, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { CONTACT_PHONE, LOGO_ALT, LOGO_SRC } from "@/components/layout/navbar/navbar.config";
import { JourneyStartsHere } from "@/features/home/journeyStartsHere"; // adjust to where you saved it

/* Handwritten accent font used for taglines ("Ride More. Worry Less.") */
const script = Caveat({ subsets: ["latin"], weight: ["500", "700"], display: "swap" });


/** Optional fleet photo for the top section (transparent PNG works best). Leave "" to hide. */
const HERO_IMAGE = "https://res.cloudinary.com/yhuaios0/image/upload/v1791053514/Modern_Travel_Fleet_Adventure.png"

const SERVICE_LINKS = [
  { label: "Car on Rent with Driver", href: "/#fleet" },
  { label: "Tempo Traveller on Rent", href: "/#fleet" },
  { label: "Bus Rental Services", href: "/#fleet" },
  { label: "Luxury Car Rental", href: "/#fleet" },
];

const CITY_LINKS = [
  { label: "Delhi", href: "/cities/delhi" },
  { label: "Haridwar", href: "/cities/haridwar" },
  { label: "Amritsar", href: "/cities/amritsar" },
  { label: "Chandigarh", href: "/cities/chandigarh" },
  { label: "Dehradun", href: "/cities/dehradun" },
  { label: "Varanasi", href: "/cities/varanasi" },
];

const SUPPORT_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "FAQs", href: "/#faq" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Partner With Us", href: "/partner" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

const SOCIALS = [
  { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook", className: "bg-[#1877f2] text-white" },
  {
    icon: FaInstagram,
    href: "https://instagram.com",
    label: "Instagram",
    className: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white",
  },
  { icon: FaYoutube, href: "https://youtube.com", label: "YouTube", className: "bg-[#ff0000] text-white" },
  { icon: FaLinkedinIn, href: "https://linkedin.com", label: "LinkedIn", className: "bg-[#0a66c2] text-white" },
  { icon: FaXTwitter, href: "https://twitter.com", label: "X", className: "bg-black text-white ring-1 ring-white/30" },
];

/**
 * Review badges shown in the white pill. Only add real, current ratings.
 * Example: { name: "Trustpilot", score: "4.8/5", note: "Reviews" }
 */
const RATINGS: { name: string; score: string; note: string }[] = [];

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

function ColumnHeading({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500/15 text-orange-400">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="text-base font-semibold text-white">{children}</h3>
    </div>
  );
}

function ArrowLinks({ links }: { links: { label: string; href: string }[] }) {
  return (
    <ul className="mt-5 space-y-3 text-sm">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            className="group flex items-center gap-2 text-blue-100/85 transition-colors hover:text-white"
          >
            <ChevronRight className="h-4 w-4 shrink-0 text-orange-400 transition-transform group-hover:translate-x-0.5" />
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0a1f44] text-blue-100">
      {/* ============ Journey Starts Here (form section) ============ */}
      <JourneyStartsHere heroImage={HERO_IMAGE} />

      {/* Orange-edged wave from the form section into the navy footer */}
      <div className="-mb-px bg-white">
        <svg className="block h-14 w-full sm:h-20" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 40 C 240 90, 520 0, 820 28 S 1260 70, 1440 10 L1440 80 L0 80 Z" fill="#f97316" />
          <path d="M0 48 C 240 96, 520 10, 820 36 S 1260 78, 1440 20 L1440 80 L0 80 Z" fill="#0a1f44" />
        </svg>
      </div>

      {/* ============ Main navy footer ============ */}
      <div className="mx-auto max-w-7xl px-4 pb-14 pt-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.2fr] lg:gap-0">
          {/* Brand */}
          <div className="lg:pr-8">
            <div className="flex items-center justify-center overflow-hidden rounded-xl">
              <Image src={LOGO_SRC} alt={LOGO_ALT} width={100} height={100} className="h-full w-full object-contain" />
            </div>
            <p className="mt-5 text-sm leading-relaxed text-blue-100/85">
              Your trusted travel partner for premium vehicle rentals. From business trips to family getaways, we
              make every journey comfortable, safe and memorable.
            </p>
            <p className={`${script.className} mt-5 text-3xl font-medium text-orange-400`}>Ride More. Worry Less.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {SOCIALS.map(({ icon: Icon, href, label, className }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex h-9 w-9 items-center justify-center rounded-full transition hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 ${className}`}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Our Vehicles */}
          <div className="lg:border-l lg:border-white/10 lg:px-8">
            <ColumnHeading icon={Car}>Our Vehicles</ColumnHeading>
            <ArrowLinks links={SERVICE_LINKS} />
            <p className={`${script.className} mt-6 text-xl text-sky-300`}>More Vehicles, More Possibilities</p>
          </div>

          {/* Popular Destinations */}
          <div className="lg:border-l lg:border-white/10 lg:px-8">
            <ColumnHeading icon={MapPin}>Popular Destinations</ColumnHeading>
            <ArrowLinks links={CITY_LINKS} />
            <p className={`${script.className} mt-6 text-xl text-sky-300`}>Explore India</p>
          </div>

          {/* Quick Links & Support */}
          <div className="lg:border-l lg:border-white/10 lg:px-8">
            <ColumnHeading icon={Headset}>Quick Links &amp; Support</ColumnHeading>
            <ArrowLinks links={SUPPORT_LINKS} />
          </div>

          {/* Get in touch */}
          <div className="lg:border-l lg:border-white/10 lg:pl-8">
            <ColumnHeading icon={Phone}>Get In Touch</ColumnHeading>
            <ul className="mt-5 space-y-5 text-sm">
              <li>
                <a href={CONTACT_PHONE.href} className="flex items-center gap-3 text-white hover:text-orange-300">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#0a1f44]">
                    <Phone className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block font-semibold">{CONTACT_PHONE.display}</span>
                    <span className="block text-xs text-blue-100/70">Call Us Anytime</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:enquiry@indiventure.com"
                  className="flex items-center gap-3 text-white hover:text-orange-300"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#0a1f44]">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block break-all font-semibold">enquiry@indiventure.com</span>
                    <span className="block text-xs text-blue-100/70">Send Us an Email</span>
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#0a1f44]">
                  <MapPin className="h-4 w-4" />
                </span>
                <p className="text-xs leading-relaxed text-blue-100/85">
                  Ground Floor, Block-B, G-04, Plot No. 41, Sector 63, Noida, Uttar Pradesh 201309
                </p>
              </li>
            </ul>
            <p className={`${script.className} mt-5 border-l-2 border-orange-500 pl-4 text-2xl text-orange-400`}>
              Let&apos;s Plan Your Next Trip
            </p>
          </div>
        </div>

        {/* Ratings pill (renders only when RATINGS has entries) */}
        {RATINGS.length > 0 && (
          <div className="mx-auto mt-12 flex w-fit max-w-full flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-full bg-white px-8 py-3 text-sm text-slate-800 shadow-xl">
            {RATINGS.map((r) => (
              <p key={r.name} className="flex items-center gap-2">
                <span className="font-semibold">{r.name}</span>
                <span className="font-semibold">{r.score}</span>
                <span className="text-xs text-slate-500">({r.note})</span>
              </p>
            ))}
          </div>
        )}
      </div>

      {/* ============ Bottom bar ============ */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-sm text-blue-100/85 sm:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} Indiventra Tour &amp; Travel. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <span className="h-4 w-px bg-white/30" aria-hidden="true" />
            <Link href="/terms" className="hover:text-white">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { CONTACT_PHONE, LOGO_ALT, LOGO_SRC } from "@/components/layout/navbar/navbar.config";

const SERVICE_LINKS = [
  { label: "Car on Rent with Driver", href: "/#fleet" },
  { label: "Tempo Traveller on Rent", href: "/#fleet" },
  { label: "Bus Rental Services", href: "/#fleet" },
  { label: "Luxury Car Rental", href: "/#fleet" },
];

const CITY_LINKS = [
  { label: "Delhi", href: "/cities/delhi" },
  { label: "Mumbai", href: "/cities/mumbai" },
  { label: "Pune", href: "/cities/pune" },
  { label: "Bangalore", href: "/cities/bangalore" },
  { label: "Hyderabad", href: "/cities/hyderabad" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Careers", href: "/careers" },
  { label: "Partner With Us", href: "/partner" },
];

const SUPPORT_LINKS = [
  { label: "FAQs", href: "/#faq" },
  { label: "Blog", href: "/blog" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

const SOCIALS = [
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
  { icon: FaXTwitter, href: "https://twitter.com", label: "Twitter" },
  { icon: FaYoutube, href: "https://youtube.com", label: "YouTube" },
  { icon: FaLinkedinIn, href: "https://linkedin.com", label: "LinkedIn" },
];

function LinkColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="font-semibold text-white">{title}</h3>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="text-emerald-200/80 transition-colors hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-emerald-950 text-emerald-100">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 lg:px-8">
        {/* Top row: logo/blurb, address, contact, socials */}
        <div className="grid gap-10 border-b border-emerald-900 pb-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-white p-1.5">
              <Image src={LOGO_SRC} alt={LOGO_ALT} width={48} height={48} className="h-full w-full object-contain" />
            </div>
            <p className="mt-4 text-sm text-emerald-200/80">
              Your reliable partner for car, SUV, tempo traveller, and bus rentals — for trips, weddings, and
              corporate events, across every city we serve.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white">Office Address</h3>
            <div className="mt-4 flex gap-2 text-sm text-emerald-200/80">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <p>123 Business Hub, Connaught Place, New Delhi, 110001</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white">Contact Us</h3>
            <div className="mt-4 space-y-2 text-sm text-emerald-200/80">
              <a href={CONTACT_PHONE.href} className="flex items-center gap-2 hover:text-white">
                <Phone className="h-4 w-4" />
                {CONTACT_PHONE.display}
              </a>
              <a href="mailto:enquiry@indiventure.com" className="flex items-center gap-2 hover:text-white">
                <Mail className="h-4 w-4" />
                enquiry@indiventure.com
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white">Follow Us</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-400 text-emerald-950 transition-colors hover:bg-amber-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Categorized link columns */}
        <div className="grid gap-8 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <LinkColumn title="Services" links={SERVICE_LINKS} />
          <LinkColumn title="Cities" links={CITY_LINKS} />
          <LinkColumn title="Company" links={COMPANY_LINKS} />
          <LinkColumn title="Support" links={SUPPORT_LINKS} />
        </div>
      </div>

      <div className="bg-amber-400 py-3 text-center text-xs font-medium text-emerald-950">
        © {new Date().getFullYear()} Indiventure Tour &amp; Travel. All rights reserved.
      </div>
    </footer>
  );
}
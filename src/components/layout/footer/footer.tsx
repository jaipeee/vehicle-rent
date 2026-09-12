import Link from "next/link";
import Image from "next/image";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

import {
  CONTACT_PHONE,
  LOGO_ALT,
  LOGO_SRC,
} from "@/components/layout/navbar/navbar.config";

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Careers", href: "/careers" },
  { label: "Partner With Us", href: "/partner" },
];

const INFO_LINKS = [
  { label: "FAQs", href: "/#faq" },
  { label: "Blog", href: "/blog" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

const SOCIALS = [
  {
    icon: FaInstagram,
    href: "https://instagram.com",
    label: "Instagram",
  },
  {
    icon: FaFacebookF,
    href: "https://facebook.com",
    label: "Facebook",
  },
  {
    icon: FaTwitter,
    href: "https://twitter.com",
    label: "Twitter",
  },
  {
    icon: FaYoutube,
    href: "https://youtube.com",
    label: "YouTube",
  },
  {
    icon: FaLinkedinIn,
    href: "https://linkedin.com",
    label: "LinkedIn",
  },
];

export function Footer() {
  return (
    <footer className="bg-emerald-950 text-emerald-100">
      {/* Main Footer */}
      <div
        className="
          mx-auto
          grid
          max-w-7xl
          gap-10
          px-4
          py-16
          sm:grid-cols-2
          lg:grid-cols-6
          lg:px-8
        "
      >
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-2">
          <Link
            href="/"
            aria-label="Indiventure Tour & Travel home"
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              overflow-hidden
              rounded-xl
              bg-white
              p-1.5
            "
          >
            <Image
              src={LOGO_SRC}
              alt={LOGO_ALT}
              width={48}
              height={48}
              className="h-full w-full object-contain"
            />
          </Link>

          <p className="mt-4 max-w-sm text-sm leading-6 text-emerald-200/80">
            Indiventure Tour &amp; Travel is your reliable partner for car,
            SUV, tempo traveller, and bus rentals — for trips, weddings,
            corporate events, and more, across every city we serve.
          </p>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold text-white">Company</h3>

          <ul className="mt-4 space-y-2.5 text-sm">
            {COMPANY_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="
                    text-emerald-200/80
                    transition-colors
                    hover:text-white
                  "
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Information */}
        <div>
          <h3 className="font-semibold text-white">Info</h3>

          <ul className="mt-4 space-y-2.5 text-sm">
            {INFO_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="
                    text-emerald-200/80
                    transition-colors
                    hover:text-white
                  "
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-white">Get in Touch</h3>

          <p className="mt-4 text-sm leading-6 text-emerald-200/80">
            Serving Delhi, Mumbai, Pune, Bangalore &amp; Hyderabad.
          </p>

          <p className="mt-3 text-sm text-emerald-200/80">
            Phone:
          </p>

          <a
            href={CONTACT_PHONE.href}
            className="
              text-sm
              font-medium
              text-white
              transition-colors
              hover:text-amber-300
            "
          >
            {CONTACT_PHONE.display}
          </a>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold text-white">Follow Us</h3>

          <div className="mt-4 flex flex-wrap gap-2">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={`Follow us on ${label}`}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-amber-400
                  text-emerald-950
                  shadow-sm
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-amber-300
                  hover:shadow-md
                "
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div
        className="
          border-t
          border-emerald-900
          px-4
          py-6
          text-center
          text-xs
          text-emerald-300/70
        "
      >
        © {new Date().getFullYear()} Indiventure Tour &amp; Travel. All rights
        reserved.
      </div>
    </footer>
  );
}
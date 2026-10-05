import { Home, Car, Wrench, Info, type LucideIcon } from "lucide-react";

export interface NavChildItem {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  children?: NavChildItem[];
}

// Placeholder data — replace hrefs/labels/children once real site content is ready.
export const NAV_ITEMS: NavItem[] = [
  {
    label: "About Us",
    href: "/about",
    icon: Home,
  },
  {
    label: "Our Vehicles",
    href: "/vehicles/car-suv",
    icon: Car,
    children: [
      { label: "Car & SUVs", href: "/vehicles/car-suv" },
      { label: "Luxury Cars, SUVs, Vans", href: "/vehicles/luxury-cars-suvs-vans" },
      { label: "Tempo Traveller", href: "/vehicles/tempo-traveller" },
      { label: "Urbania", href: "/vehicles/urbania" },
      { label: "Mini Bus", href: "/vehicles/mini-bus" },
      { label: "Luxury Buses", href: "/vehicles/luxury-buses" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    icon: Wrench,
    children: [
      { label: "Airport Transfer", href: "/services/airport-transfer" },
      { label: "Outstation", href: "/services/outstation" },
      { label: "Local Rental", href: "/services/local-rental" },
    ],
  },
  {
    label: "Info",
    href: "/info",
    icon: Info,
    children: [
      { label: "FAQ", href: "/info/faq" },
      { label: "Terms & Conditions", href: "/info/terms" },
    ],
  },
];

export const CITIES = ["Delhi", "Mumbai", "Haridwar", "Vanarasi"];

export const CONTACT_PHONE = {
  display: "(+91) 83 6968 1231",
  href: "tel:+918369681231",
};

// Placeholder — point this at your real logo file once you have one.
export const LOGO_SRC = "https://res.cloudinary.com/yhuaios0/image/upload/v1790619916/IN_LOGO_PNG.png";
export const LOGO_ALT = "Company logo";
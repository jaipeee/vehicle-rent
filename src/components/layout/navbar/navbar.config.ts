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
    href: "/vehicles",
    icon: Car,
    children: [
      { label: "Sedan", href: "/vehicles/sedan" },
      { label: "SUV", href: "/vehicles/suv" },
      { label: "Minivan", href: "/vehicles/minivan" },
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

export const CITIES = ["Delhi", "Mumbai", "Bangalore", "Pune", "Hyderabad"];

export const CONTACT_PHONE = {
  display: "(+91) 83 6968 1231",
  href: "tel:+918369681231",
};

// Placeholder — point this at your real logo file once you have one.
export const LOGO_SRC = "/assets/logo.png";
export const LOGO_ALT = "Company logo";
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
    label: "Home",
    href: "/",
    icon: Home,
  },
   {
    label: "Our Vehicles",
    href: "/car-suv",
    icon: Car,
    children: [
      { label: "Car & SUVs", href: "/car-suv" },
      { label: "Luxury Cars, SUVs, Vans", href: "/luxury-cars-suvs-vans" },
      { label: "Tempo Traveller", href: "/tempo-traveller" },
      { label: "Urbania", href: "/urbania" },
      { label: "Mini Bus", href: "/mini-bus" },
      { label: "Luxury Buses", href: "/luxury-buses" },
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
      { label: "About Us", href: "/info/About Us" },
      { label: "Blog", href: "/info/blog" },
      { label: "Terms & Conditions", href: "/info/terms" },
      { label: "Privacy Policy", href: "/info/privacypolicy" },
      { label: "Disclaimer", href: "/info/disclaimer" },
    ],
  },
];

export const CITIES = [
  { name: "Mumbai", slug: "mumbai" },
  { name: "Navi Mumbai", slug: "navimumbai" },
  { name: "Delhi", slug: "delhi" },
  { name: "Pune", slug: "pune" },
  { name: "Dehradun", slug: "dehradun" },
  { name: "Haridwar", slug: "haridwar" },
  { name: "Amritsar", slug: "amritsar" },
  { name: "Chandigarh", slug: "chandigarh" },
  { name: "Varanasi", slug: "varanasi" },
];

export const CONTACT_PHONE = {
  display: "(+91) 83 6968 7417",
  href: "tel:+918369687417",
};

// Placeholder — point this at your real logo file once you have one.
export const LOGO_SRC = "https://res.cloudinary.com/yhuaios0/image/upload/v1791662723/white_bg_indiventra_logo_png.png";
export const LOGO_ALT = "Company logo";
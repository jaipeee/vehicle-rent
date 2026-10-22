import { VEHICLE_CATEGORIES } from "@/features/vehicles/vehicle-categories.config";

export type FieldType =
  | "text" | "textarea" | "number" | "image" | "images" | "select"
  | "citySelect" | "checkbox" | "list" | "spots" | "amenities";

export interface Field {
  key: string;
  label: string;
  type: FieldType;
  help?: string;
  options?: { label: string; value: string }[];
}

export interface ResourceDef {
  id: string;
  label: string;
  endpoint: string;
  title: (r: any) => string;
  subtitle?: (r: any) => string;
  image?: (r: any) => string | undefined;
  duplicable?: boolean;
  fields: Field[];
  blank: Record<string, unknown>;
}

const categoryOptions = [
  { label: "— All vehicles —", value: "" },
  ...VEHICLE_CATEGORIES.map((c) => ({ label: c.label, value: c.slug })),
];

const IMG_HELP = "Upload, or paste a Cloudinary / Unsplash URL (other sites will break the page).";
const scope = (r: any) => `${r.citySlug || "All cities"} · ${r.categorySlug || "All vehicles"}`;

const SCOPE_FIELDS: Field[] = [
  { key: "citySlug", label: "City", type: "citySelect", help: "Which city page this appears on. “All cities” = everywhere." },
  { key: "categorySlug", label: "Vehicle page", type: "select", options: categoryOptions, help: "Which vehicle page. “All vehicles” = every page." },
];

export const RESOURCES: ResourceDef[] = [
  {
    id: "hero",
    label: "Hero",
    endpoint: "hero-slides",
    duplicable: true,
    title: (r) => r.heading,
    subtitle: (r) => `${scope(r)} · #${r.sortOrder}${r.active ? "" : " · hidden"}`,
    image: (r) => r.image,
    blank: { citySlug: "", categorySlug: "", sortOrder: 0, active: true },
    fields: [
      ...SCOPE_FIELDS,
      { key: "image", label: "Slide image", type: "image", help: IMG_HELP },
      { key: "heading", label: "Heading", type: "text", help: "You can use {city} and {category}." },
      { key: "subheading", label: "Subheading", type: "textarea" },
      { key: "sortOrder", label: "Order", type: "number", help: "0 shows first. Add several slides for a carousel." },
      { key: "active", label: "Show this slide", type: "checkbox" },
    ],
  },
  {
    id: "fleet",
    label: "Fleet",
    endpoint: "fleet",
    duplicable: true,
    title: (r) => `${r.title} ${r.subtitle}`,
    subtitle: (r) => `${scope(r)} · #${r.sortOrder}${r.active ? "" : " · hidden"}`,
    image: (r) => r.vehicleImage,
    blank: {
      citySlug: "", categorySlug: "", linkCategorySlug: "", subtitle: "on Rent",
      images: [], amenities: [], sortOrder: 0, active: true,
    },
    fields: [
      ...SCOPE_FIELDS,
      { key: "title", label: "Title", type: "text", help: "e.g. Tempo Traveller" },
      { key: "subtitle", label: "Subtitle", type: "text", help: "e.g. on Rent" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "vehicleImage", label: "Vehicle cutout image", type: "image", help: "Transparent PNG of the vehicle. " + IMG_HELP },
      { key: "images", label: "Hover photos", type: "images", help: "Shown one by one while hovering. 3 to 5 photos works best." },
      { key: "amenities", label: "Amenities", type: "amenities" },
      { key: "linkCategorySlug", label: "Arrow button opens", type: "select", options: categoryOptions, help: "The vehicle page this card links to." },
      { key: "sortOrder", label: "Order", type: "number" },
      { key: "active", label: "Show this card", type: "checkbox" },
    ],
  },  
  {
    id: "services",
    label: "Services",
    endpoint: "service-cards",
    duplicable: true,
    title: (r) => `${r.occasion} · ${r.title}`,
    subtitle: (r) => `${scope(r)} · #${r.sortOrder}${r.active ? "" : " · hidden"}`,
    image: (r) => r.image,
    blank: { citySlug: "", categorySlug: "", sortOrder: 0, active: true },
    fields: [
      ...SCOPE_FIELDS,
      { key: "occasion", label: "Occasion (tab name)", type: "text", help: "Cards with exactly the same name share one tab, e.g. Wedding Travel. Check the spelling, because a typo creates a new tab." },
      { key: "title", label: "Card title", type: "text", help: "You can use {city} and {category}." },
      { key: "description", label: "Description", type: "textarea" },
      { key: "image", label: "Image", type: "image", help: IMG_HELP },
      { key: "sortOrder", label: "Order", type: "number", help: "Lower numbers come first. The first card of each occasion decides the tab order." },
      { key: "active", label: "Show this card", type: "checkbox" },
    ],
  },
  {
    id: "about",
    label: "About & Texts",
    endpoint: "page-content",
    title: (r) => scope(r),
    subtitle: (r) => r.aboutLeft || r.fleetSubtitle || "",
    blank: { citySlug: "", categorySlug: "", aboutBottom: [] },
    fields: [
      ...SCOPE_FIELDS,
      { key: "aboutVideoId", label: "About video ID", type: "text", help: "The code after v= in the YouTube link." },
      { key: "aboutVideoTitle", label: "About video title", type: "text" },
      { key: "aboutLeft", label: "About: left paragraph", type: "textarea", help: "You can use {city} and {category}." },
      { key: "aboutRight", label: "About: right paragraph", type: "textarea" },
      { key: "aboutBottom", label: "About: bottom paragraphs", type: "list" },
      { key: "fleetSubtitle", label: "Line under the Fleet heading", type: "text" },
      { key: "servicesTitleAccent", label: "Services heading: orange part", type: "text", help: "e.g. India on Wheels:" },
      { key: "servicesTitle", label: "Services heading: rest", type: "text" },
      { key: "servicesSubheading", label: "Services subtitle", type: "textarea" },
    ],
  },
  {
    id: "blogs",
    label: "Blogs",
    endpoint: "blogs",
    title: (r) => r.title,
    subtitle: (r) => `${r.tag} · ${scope(r)}`,
    image: (r) => r.image,
    blank: { citySlug: "", categorySlug: "" },
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "slug", label: "URL slug", type: "text", help: "Lowercase, no spaces, e.g. choosing-a-tempo-traveller" },
      { key: "tag", label: "Tag", type: "text", help: "e.g. Travel Tips" },
      { key: "excerpt", label: "Short excerpt", type: "textarea" },
      { key: "image", label: "Image", type: "image", help: IMG_HELP },
      ...SCOPE_FIELDS,
    ],
  },
  {
    id: "testimonials",
    label: "Testimonials",
    endpoint: "testimonials",
    duplicable: true,
    title: (r) => r.name,
    subtitle: (r) => `${r.rating}★ · ${r.cityName ?? "no city"}`,
    image: (r) => r.coverImage ?? r.imageUrl,
    blank: { rating: 5 },
    fields: [
      { key: "name", label: "Name", type: "text" },
      { key: "role", label: "Role", type: "text", help: "e.g. Frequent Traveller" },
      { key: "message", label: "Message", type: "textarea" },
      { key: "rating", label: "Rating (1-5)", type: "number" },
      { key: "cityName", label: "City name", type: "text", help: "Exact name, e.g. Delhi (capital D)." },
      { key: "categorySlug", label: "Vehicle category", type: "select", options: categoryOptions },
      { key: "imageUrl", label: "Avatar", type: "image", help: IMG_HELP },
      { key: "coverImage", label: "Cover photo", type: "image", help: IMG_HELP },
    ],
  },
  {
    id: "cities",
    label: "Cities",
    endpoint: "cities",
    title: (r) => r.name,
    subtitle: (r) => `/${r.slug} · ${r.spots?.length ?? 0} spots`,
    image: (r) => r.cardImage ?? r.heroImage,
    blank: { spots: [] },
    fields: [
      { key: "name", label: "Name", type: "text" },
      { key: "slug", label: "URL slug", type: "text", help: "Lowercase, e.g. mumbai. Changing it changes the page URL." },
      { key: "description", label: "Description", type: "textarea" },
      { key: "heroImage", label: "Fallback hero image", type: "image", help: "Used if the city has no Hero slides. " + IMG_HELP },
      { key: "cardImage", label: "Card image (cities grid)", type: "image", help: IMG_HELP },
      { key: "spots", label: "Famous spots", type: "spots" },
    ],
  },
  {
    id: "vehicles",
    label: "Vehicles",
    endpoint: "vehicles",
    title: (r) => r.name,
    subtitle: (r) => `${r.category} · ${r.seatCapacity} seats`,
    image: (r) => r.imageUrl,
    blank: {},
    fields: [
      { key: "name", label: "Name", type: "text" },
      {
        key: "category",
        label: "Category",
        type: "select",
        help: "Must match a category on the vehicle pages.",
        options: Array.from(new Set(VEHICLE_CATEGORIES.flatMap((c) => c.matches))).map((m) => ({ label: m, value: m })),
      },
      { key: "seatCapacity", label: "Seats", type: "number" },
      { key: "priceFrom", label: "Price from (₹)", type: "number", help: "Empty = “Contact for Quote”." },
      { key: "description", label: "Description", type: "textarea" },
      { key: "imageUrl", label: "Image", type: "image", help: IMG_HELP },
    ],
  },
];
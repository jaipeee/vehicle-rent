import type { Metadata } from "next";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://indiventra.com";

// TODO: replace with your own 1200x630 image (upload it to Cloudinary).
export const OG_IMAGE = {
  url: "https://res.cloudinary.com/yhuaios0/image/upload/v1792783559/Indiventra_og_Image.png",
  width: 1200,
  height: 630,
  alt: "Indiventra fleet of tempo travellers, buses and cars",
};

export const SITE_DESCRIPTION =
  "Book reliable, chauffeur-driven vehicle rentals in India with Indiventra. Premium Tempo Travellers, Force Urbania, Luxury Buses, and Cars for weddings, corporate trips, and pilgrimages since 2018.";

interface PageMetaInput {
  title: string;
  description: string;
  path: string; // "/", "/delhi", "/delhi/mini-bus"
  absoluteTitle?: boolean; // true = skip the "| Indiventra Tour & Travel" suffix from layout.tsx
}

export function pageMeta({ title, description, path, absoluteTitle }: PageMetaInput): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "Indiventra",
      locale: "en_IN",
      url: path,
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
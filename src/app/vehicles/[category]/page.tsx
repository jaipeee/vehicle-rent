import { notFound } from "next/navigation";
import Image from "next/image";
import { apiFetch } from "@/lib/api";
import type { City, Vehicle, Testimonial } from "@/lib/types";
import { dummyCities, dummyTestimonials, dummyVehicles } from "@/lib/dummyData";
import { VEHICLE_CATEGORIES } from "@/features/vehicles/vehicle-categories.config";
import { EnquiryForm } from "@/features/enquiry";
import {
  Hero,
  About,
  HowItWorks,
  Categories,
  Fleet,
  Services,
  AdvisorBanner,
  WhyChooseUs,
  Testimonials,
  CitiesGrid,
  BlogSection,
  FAQ,
  ContactSection,
  ConsultationBanner,
} from "@/features/home";

interface VehicleCategoryPageProps {
  // Next.js 15+/16: dynamic route params are a Promise and must be awaited.
  params: Promise<{ category: string }>;
}

// Static config, not a backend call — every category page can be generated up front.
export function generateStaticParams() {
  return VEHICLE_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: VehicleCategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = VEHICLE_CATEGORIES.find((c) => c.slug === categorySlug);
  if (!category) return {};

  return {
    title: `${category.label} on Rent | Indiventure Tour & Travel`,
    description: `Browse our ${category.label} available for rent, with transparent pricing and professional drivers.`,
  };
}

export const revalidate = 3600;

const FALLBACK_HERO_IMAGE =
  "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1600&q=80";

export default async function VehicleCategoryPage({ params }: VehicleCategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = VEHICLE_CATEGORIES.find((c) => c.slug === categorySlug);
  if (!category) notFound();

  const [vehicles, cities, testimonials] = await Promise.all([
    apiFetch<Vehicle[]>("/vehicles").catch(() => []),
    apiFetch<City[]>("/cities").catch(() => []),
    apiFetch<Testimonial[]>("/testimonials").catch(() => []),
  ]);
  const vehiclesData = vehicles.length > 0 ? vehicles : dummyVehicles;
  const filtered = vehiclesData.filter((v) => category.matches.includes(v.category));
  const testimonialsData = testimonials.length > 0 ? testimonials : dummyTestimonials;
  const citiesData = cities.length > 0 ? cities : dummyCities;
  const heroImage = filtered[0]?.imageUrl ?? FALLBACK_HERO_IMAGE;

  return (
    <main>
      <Hero
        slides={[
          {
            image: heroImage,
            heading: `${category.label} on Rent`,
            subheading: `Explore our full range of ${category.label.toLowerCase()} — transparent pricing and professional drivers, available across every city we serve.`,
          },
        ]}
      />

      {/* Get a Quote — floats over the hero's bottom edge, same as the homepage */}
      <div
        id="get-a-quote"
        className="
          relative
          z-20
          mx-auto
          -mt-16
          w-full
          max-w-6xl
          px-4
          sm:-mt-20
          sm:px-6
          lg:-mt-32
          lg:px-8
        "
      >
        <EnquiryForm />
      </div>

      {/* Category-specific content */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-emerald-900 sm:text-3xl">Available {category.label}</h2>

        {filtered.length === 0 ? (
          <p className="mt-10 text-center text-slate-400">No vehicles listed in this category yet — check back soon.</p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((vehicle) => (
              <div
                key={vehicle.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative h-48 w-full">
                  <Image src={vehicle.imageUrl} alt={vehicle.name} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-slate-900">{vehicle.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">{vehicle.seatCapacity} seats</p>
                  <p className="mt-2 text-sm text-slate-600">{vehicle.description}</p>
                  <p className="mt-3 font-semibold text-emerald-700">
                    {vehicle.priceFrom ? `From ₹${vehicle.priceFrom}` : "Contact for Quote"}
                  </p>
                  <a
                    href="#get-a-quote"
                    className="mt-4 block rounded-full bg-emerald-700 px-4 py-2 text-center text-xs font-bold text-white transition-colors hover:bg-emerald-800"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Same section stack, same order, as the homepage */}
      <About />
      <HowItWorks />
      <Categories />
      <Fleet categorySlug={category.slug} />
      <Services />
      <AdvisorBanner />
      <WhyChooseUs />
      <Testimonials testimonials={testimonialsData} />
      <CitiesGrid cities={citiesData} />
      <BlogSection />
      <FAQ />
      <ContactSection />
      <ConsultationBanner />
    </main>
  );
}
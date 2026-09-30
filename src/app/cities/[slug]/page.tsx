import { notFound } from "next/navigation";
import Image from "next/image";
import { apiFetch, ApiError } from "@/lib/api";
import type { City, Testimonial } from "@/lib/types";
import { dummyTestimonials } from "@/lib/dummyData";
import { EnquiryForm } from "@/features/enquiry";
import {
  PageHero,
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

interface CityPageProps {
  // Next.js 15+/16: dynamic route params are a Promise and must be awaited.
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const cities = await apiFetch<City[]>("/cities").catch(() => []);
  return cities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: CityPageProps) {
  const { slug } = await params;
  const city = await apiFetch<City>(`/cities/${slug}`).catch(() => null);
  if (!city) return {};

  return {
    title: `Tempo Traveller & Bus Rental in ${city.name} | Indiventure Tour & Travel`,
    description: `Book reliable tempo traveller, car, and bus rentals in ${city.name} for corporate trips, events, and outstation travel.`,
  };
}

export const revalidate = 3600;

export default async function CityPage({ params }: CityPageProps) {
  const { slug } = await params;

  // Only a real 404 from the backend (city genuinely doesn't exist) becomes
  // Next's notFound(). Any other error is rethrown so it surfaces as a real
  // error instead of a misleading 404.
  const city = await apiFetch<City>(`/cities/${slug}`).catch((err) => {
    if (err instanceof ApiError && err.status === 404) return null;
    throw err;
  });
  if (!city) notFound();

  const [cities, testimonials] = await Promise.all([
    apiFetch<City[]>("/cities").catch(() => []),
    apiFetch<Testimonial[]>("/testimonials").catch(() => []),
  ]);
  const testimonialsData = testimonials.length > 0 ? testimonials : dummyTestimonials;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Indiventure Tour & Travel",
    areaServed: city.name,
    description: city.description,
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        image={city.heroImage}
        heading={`Vehicle Rentals in ${city.name}`}
        subheading={city.description}
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

      {/* City-specific content */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <h2 className="text-2xl font-bold text-emerald-900 sm:text-3xl">Famous Spots in {city.name}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {city.spots.map((spot) => (
            <div key={spot.id} className="group relative h-48 overflow-hidden rounded-2xl">
              <Image
                src={spot.imageUrl}
                alt={spot.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <p className="absolute bottom-3 left-4 font-semibold text-white">{spot.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Same section stack, same order, as the homepage */}
      <About />
      <HowItWorks />
      <Categories />
      <Fleet />
      <Services />
      <AdvisorBanner />
      <WhyChooseUs />
      <Testimonials testimonials={testimonialsData} />
      <CitiesGrid cities={cities} />
      <BlogSection />
      <FAQ />
      <ContactSection />
      <ConsultationBanner />
    </main>
  );
}
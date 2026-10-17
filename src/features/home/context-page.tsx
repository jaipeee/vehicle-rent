import Image from "next/image";
import { EnquiryForm } from "@/features/enquiry";
import { fillTemplate, type PageContext } from "@/lib/page-context";
import { getPageData } from "@/lib/page-data";
import {
  Hero, About, HowItWorks, Categories, Fleet, Services, AdvisorBanner,
  WhyChooseUs, Testimonials, CitiesGrid, BlogSection, FAQ, ContactSection,
} from "@/features/home";

const FALLBACK_HERO_IMAGE =
  "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1600&q=80";

export async function ContextPage({ ctx }: { ctx: PageContext }) {
  const { city, category } = ctx;
  const data = await getPageData(ctx);
  const { content } = data;
  const fill = (s?: string) => (s ? fillTemplate(s, ctx) : undefined);

  const defaultHeading =
    city && category ? `${category.label} on Rent in ${city.name}`
    : city ? `Vehicle Rentals in ${city.name}`
    : `${category?.label} on Rent`;
  const defaultSub =
    city && category
      ? `Book ${category.label.toLowerCase()} in ${city.name} with transparent pricing and professional drivers.`
      : city ? city.description
      : `Explore our full range of ${category?.label.toLowerCase()} — transparent pricing and professional drivers, available across every city we serve.`;

  const heroImage =
    content.heroImage ??
    (category ? data.categoryVehicles[0]?.imageUrl : undefined) ??
    city?.heroImage ??
    FALLBACK_HERO_IMAGE;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Indiventure Tour & Travel",
    ...(city && { areaServed: city.name }),
    description: fill(content.heroSubheading) ?? defaultSub,
  };
    const slides =
    data.heroSlides.length > 0
      ? data.heroSlides.map((s) => ({
          image: s.image,
          heading: fillTemplate(s.heading, ctx),
          subheading: fillTemplate(s.subheading, ctx),
        }))
      : [
          {
            image: heroImage,
            heading: fill(content.heroHeading) ?? defaultHeading,
            subheading: fill(content.heroSubheading) ?? defaultSub,
          },
        ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Hero slides={slides} />

      <div id="get-a-quote" className="relative z-20 mx-auto -mt-16 w-full max-w-6xl px-4 sm:-mt-20 sm:px-6 lg:-mt-32 lg:px-8">
        <EnquiryForm />
      </div>

      {/* Vehicles in this category (category and city+category pages) */}
      {category && (
        <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-emerald-900 sm:text-3xl">
            Available {category.label}{city ? ` in ${city.name}` : ""}
          </h2>
          {data.categoryVehicles.length === 0 ? (
            <p className="mt-10 text-center text-slate-400">No vehicles listed in this category yet — check back soon.</p>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.categoryVehicles.map((v) => (
                <div key={v.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
                  <div className="relative h-48 w-full">
                    <Image src={v.imageUrl} alt={v.name} fill className="object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-slate-900">{v.name}</h3>
                    <p className="mt-1 text-sm text-slate-500">{v.seatCapacity} seats</p>
                    <p className="mt-2 text-sm text-slate-600">{v.description}</p>
                    <p className="mt-3 font-semibold text-emerald-700">
                      {v.priceFrom ? `From ₹${v.priceFrom}` : "Contact for Quote"}
                    </p>
                    <a href="#get-a-quote" className="mt-4 block rounded-full bg-emerald-700 px-4 py-2 text-center text-xs font-bold text-white transition-colors hover:bg-emerald-800">
                      Book Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Famous spots (city and city+category pages) */}
      {city && (
        <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Famous Spots in {city.name}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {city.spots.map((spot) => (
              <div key={spot.id} className="group relative h-48 overflow-hidden rounded-2xl">
                <Image
                  src={spot.imageUrl}
                  alt={spot.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <p className="absolute bottom-3 left-4 font-semibold text-white">{spot.name}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <About content={content} ctx={ctx} />
      <HowItWorks />
      <Categories />
      <Fleet
  items={data.fleet}
  categorySlug={category?.slug}
  citySlug={city?.slug}
  cityName={city?.name}
  subtitle={fill(content.fleetSubtitle)}
/>
      <Services cityName={city?.name} categoryLabel={category?.label} />
      <AdvisorBanner />
      <WhyChooseUs />
      <Testimonials testimonials={data.testimonials} />
      <CitiesGrid cities={data.cities} categorySlug={category?.slug} />
      <BlogSection posts={data.blogs} />
      <FAQ />
      <ContactSection />
    </main>
  );
}
import type { City, Testimonial } from "@/lib/types";
import { apiFetch } from "@/lib/api";
import { dummyCities, dummyTestimonials } from "@/lib/dummyData";
import {
  About,
  AdvisorBanner,
  BlogSection,
  Categories,
  CitiesGrid,
  ConsultationBanner,
  ContactSection,
  FAQ,
  Fleet,
  Hero,
  HowItWorks,
  Services,
  Testimonials,
  WhyChooseUs,
} from "@/features/home";
import { EnquiryForm } from "@/features/enquiry";

export const revalidate = 3600; // ISR: refresh hourly

export const metadata = {
  title: "Indiventure Tour & Travel | Tempo Traveller, Bus & Car Rentals",
  description:
    "Reliable tempo traveller, luxury car, and bus rentals for corporate events, weddings, and outstation trips across India.",
};

export default async function HomePage() {
  const [cities, testimonials] = await Promise.all([
    apiFetch<City[]>("/cities").catch(() => []),
    apiFetch<Testimonial[]>("/testimonials").catch(() => []),
  ]);

  const testimonialsData = testimonials.length > 0 ? testimonials : dummyTestimonials;
  const citiesData = cities.length > 0 ? cities : dummyCities;
  return (
    <main>
      <Hero />

      {/* Get a Quote — floats over the hero's bottom edge, same technique as the navbar */}
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

      <About />
      <HowItWorks />
      <Categories />
      <Fleet />
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
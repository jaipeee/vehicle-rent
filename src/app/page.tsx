import { getPageData } from "@/lib/page-data";
import {
  About,
  AdvisorBanner,
  BlogSection,
  Categories,
  CitiesGrid,
  // ContactSection,
  FAQ,
  Fleet,
  Hero,
  HowItWorks,
  Services,
  Testimonials,
  WhyChooseUs,
} from "@/features/home";
import { EnquiryForm } from "@/features/enquiry";
import { fillTemplate } from "@/lib/page-context";
import { pageMeta, SITE_DESCRIPTION } from "@/lib/seo";
import type { FaqData, ServiceCardData } from "@/lib/types";

export const revalidate = 3600; // ISR: refresh hourly

export const metadata = {
  ...pageMeta({
    title: "Indiventra | Luxury Vehicle Rental Service in India @Best Price",
    description: SITE_DESCRIPTION,
    path: "/",
    absoluteTitle: true, // skips the "| Indiventra Tour & Travel" suffix
  }),
  alternates: {
    canonical: "/",
    languages: { "en-IN": "/", "x-default": "/" },
  },
};

export default async function HomePage() {
  // No city / category -> global content, global blogs, all testimonials, all cities.
  const data = await getPageData({});

  const serviceItems = data.serviceCards.map((c: ServiceCardData) => ({
    ...c,
    title: fillTemplate(c.title),
    description: fillTemplate(c.description),
  }));

  const slides = data.heroSlides.map((s) => ({
    image: s.image,
    heading: fillTemplate(s.heading),
    subheading: fillTemplate(s.subheading),
  }));
    const faqItems = data.faqs.map((f: FaqData) => ({
    ...f,
    question: fillTemplate(f.question),
    answer: fillTemplate(f.answer),
  }));

  return (
    <main>
      <Hero slides={slides.length > 0 ? slides : undefined} />

      {/* Get a Quote — floats over the hero's bottom edge */}
      <div
        id="get-a-quote"
        className="relative z-20 mx-auto -mt-16 w-full max-w-6xl px-4 sm:-mt-20 sm:px-6 lg:-mt-32 lg:px-8"
      >
        <EnquiryForm />
      </div>

      <About content={data.content} />
      <HowItWorks />
      <Categories />
      <Fleet items={data.fleet} />
      <Services
        items={serviceItems}
        titleAccent={data.content.servicesTitleAccent}
        title={data.content.servicesTitle}
        subheading={data.content.servicesSubheading}
      />
      <AdvisorBanner />
      <WhyChooseUs />
      <Testimonials testimonials={data.testimonials} />
      <CitiesGrid cities={data.cities} />
      <BlogSection posts={data.blogs} />
      <FAQ items={faqItems} />
      {/* <ContactSection /> */}
      {/* <ConsultationBanner /> */}
    </main>
  );
}
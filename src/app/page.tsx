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

export const revalidate = 3600; // ISR: refresh hourly

export const metadata = {
  title: "Indiventure Tour & Travel | Tempo Traveller, Bus & Car Rentals",
  description:
    "Reliable tempo traveller, luxury car, and bus rentals for corporate events, weddings, and outstation trips across India.",
};

export default async function HomePage() {
  // No city / category -> global content, global blogs, all testimonials, all cities.
    const data = await getPageData({});
  const slides = data.heroSlides.map((s) => ({
    image: s.image,
    heading: fillTemplate(s.heading),
    subheading: fillTemplate(s.subheading),
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
      <Services />
      <AdvisorBanner />
      <WhyChooseUs />
      <Testimonials testimonials={data.testimonials} />
      <CitiesGrid cities={data.cities} />
      <BlogSection posts={data.blogs} />
      <FAQ />
      {/* <ContactSection /> */}
      {/* <ConsultationBanner /> */}
    </main>
  );
}
import type { City, Testimonial } from "@/lib/types";
import { apiFetch } from "@/lib/api";
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
import { Footer } from "@/components/layout/footer";

export const revalidate = 3600; // ISR: refresh hourly

export const metadata = {
  title: "Indiventure Tour & Travel | Tempo Traveller, Bus & Car Rentals",
  description:
    "Reliable tempo traveller, luxury car, and bus rentals for corporate events, weddings, and outstation trips across India.",
};

// Dummy testimonials — swap once real ones are added (no create-testimonial UI yet, see earlier note).
const dummyTestimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Rohit Sharma",
    role: "CEO, Sharma Logistics",
    message: "Booked a tempo traveller for our family trip to Manali — clean vehicle, punctual driver, no hidden costs. Highly recommend!",
    rating: 5,
    cityName: "Delhi",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    coverImage: "https://res.cloudinary.com/yhuaios0/image/upload/v1789583302/cld-sample.jpg",
  },
  {
    id: "t2",
    name: "Priya Nair",
    role: "Corporate Travel Coordinator",
    message: "Used Indiventure for our corporate offsite. The bus was spacious and the whole process was hassle-free from booking to drop-off.",
    rating: 5,
    cityName: "Mumbai",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "t3",
    name: "Ankit Verma",
    role: "Frequent Traveller",
    message: "Great experience for our wedding transport — decorated cars looked amazing and everything ran exactly on schedule.",
    rating: 4,
    cityName: "Pune",
    coverImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "t3",
    name: "Ankit Verma",
    role: "Frequent Traveller",
    message: "Great experience for our wedding transport — decorated cars looked amazing and everything ran exactly on schedule.",
    rating: 4,
    cityName: "Pune",
    coverImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
  },
];

export default async function HomePage() {
  const [cities, testimonials] = await Promise.all([
    apiFetch<City[]>("/cities").catch(() => []),
    apiFetch<Testimonial[]>("/testimonials").catch(() => []),
  ]);

  const testimonialsData = testimonials.length > 0 ? testimonials : dummyTestimonials;

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
      <CitiesGrid cities={cities} />
      <BlogSection />
      <FAQ />
      <ContactSection />
      <ConsultationBanner />
    </main>
  );
}
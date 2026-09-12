import type { City, Testimonial, Vehicle } from "@/lib/types";
import { apiFetch } from "@/lib/api";
import {
  About,
  Categories,
  CitiesGrid,
  FAQ,
  Fleet,
  Hero,
  Services,
  Testimonials,
  WhyChooseUs,
} from "@/features/home";
import { EnquiryForm } from "@/features/enquiry";
import {Footer} from "@/components/layout/footer/index"

export const revalidate = 3600; // ISR: refresh hourly

export const metadata = {
  title: "Indiventure Tour & Travel | Tempo Traveller, Bus & Car Rentals",
  description:
    "Reliable tempo traveller, luxury car, and bus rentals for corporate events, weddings, and outstation trips across India.",
};

// Dummy fleet data — swap for a real /vehicles fetch once your catalog is ready.
const dummyVehicles: Vehicle[] = [
  {
    id: "tempo-12",
    name: "12 Seater Tempo Traveller",
    category: "Tempo Traveller",
    seatCapacity: 12,
    description: "Comfortable and spacious tempo traveller, perfect for family trips, group tours, and outstation travel.",
    priceFrom: 4500,
    imageUrl: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "tempo-17",
    name: "17 Seater Tempo Traveller",
    category: "Tempo Traveller",
    seatCapacity: 17,
    description: "Premium 17-seater tempo traveller with comfortable seating, ample luggage space, and AC.",
    priceFrom: 5500,
    imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "tempo-20",
    name: "20 Seater Tempo Traveller",
    category: "Tempo Traveller",
    seatCapacity: 20,
    description: "Ideal for large groups, corporate trips, weddings, and long-distance journeys.",
    priceFrom: 6500,
    imageUrl: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "luxury-car",
    name: "Toyota Innova Crysta",
    category: "Luxury Car",
    seatCapacity: 7,
    description: "Premium and comfortable SUV suitable for family vacations, airport transfers, and corporate travel.",
    priceFrom: 3500,
    imageUrl: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "sedan",
    name: "Toyota Etios",
    category: "Sedan",
    seatCapacity: 4,
    description: "Reliable and economical sedan for city travel, airport transfers, and outstation journeys.",
    priceFrom: 2200,
    imageUrl: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "luxury-bus",
    name: "Luxury Bus",
    category: "Bus",
    seatCapacity: 35,
    description: "Spacious luxury bus for weddings, corporate events, school trips, and large group tours.",
    priceFrom: 9000,
    imageUrl: "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?auto=format&fit=crop&w=1200&q=80",
  },
];

// Dummy testimonials — swap once real ones are added (no create-testimonial UI yet, see earlier note).
const dummyTestimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Rohit Sharma",
    message: "Booked a tempo traveller for our family trip to Manali — clean vehicle, punctual driver, no hidden costs. Highly recommend!",
    rating: 5,
    cityName: "Delhi",
  },
  {
    id: "t2",
    name: "Priya Nair",
    message: "Used Indiventure for our corporate offsite. The bus was spacious and the whole process was hassle-free from booking to drop-off.",
    rating: 5,
    cityName: "Mumbai",
  },
  {
    id: "t3",
    name: "Ankit Verma",
    message: "Great experience for our wedding transport — decorated cars looked amazing and everything ran exactly on schedule.",
    rating: 4,
    cityName: "Pune",
  },
];

export default async function HomePage() {
  const [cities, testimonials] = await Promise.all([
    apiFetch<City[]>("/cities"),
    apiFetch<Testimonial[]>("/testimonials"),
  ]);

  const vehicles = dummyVehicles;
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
          lg:-mt-24
          lg:px-8
        "
      >
        <EnquiryForm />
      </div>

      <About />
      <Categories />
      <Fleet vehicles={vehicles} />
      <Services />
      <WhyChooseUs />
      <Testimonials testimonials={testimonialsData} />
      <CitiesGrid cities={cities} />
      <FAQ />
      <Footer/>
    </main>
  );
}
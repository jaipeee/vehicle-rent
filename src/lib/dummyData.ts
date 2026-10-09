

import type { City, Testimonial, Vehicle } from "./types";

// Shared placeholder testimonials — used as a fallback on any page (home, city,
// vehicle category) when the backend has no real testimonials yet. Swap once
// real ones are added.
export const dummyTestimonials: Testimonial[] = [
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
    message: "Used Indiventra for our corporate offsite. The bus was spacious and the whole process was hassle-free from booking to drop-off.",
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

// Shared placeholder vehicles — matches the categories in
// features/vehicles/vehicle-categories.config.ts so every vehicle category
// page has something to show even before the backend is seeded.
export const dummyVehicles: Vehicle[] = [
  {
    id: "v1",
    name: "Sedan",
    category: "Sedan",
    seatCapacity: 4,
    imageUrl: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
    description: "Reliable and economical sedan for city travel, airport transfers, and outstation journeys.",
    priceFrom: 2500,
  },
  {
    id: "v2",
    name: "Maruti Suzuki Ertiga",
    category: "SUV",
    seatCapacity: 7,
    imageUrl: "https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1200&q=80",
    description: "Spacious 7-seater MPV, ideal for family trips and small group travel.",
    priceFrom: 3200,
  },
  {
    id: "v3",
    name: "SUV",
    category: "SUV",
    seatCapacity: 6,
    imageUrl: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
    description: "Comfortable SUV suitable for family vacations, airport transfers, and corporate travel.",
    priceFrom: 4000,
  },
  {
    id: "v4",
    name: "Toyota Innova Hycross",
    category: "Luxury Car",
    seatCapacity: 7,
    imageUrl: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
    description: "Premium hybrid MPV with top-tier comfort, ideal for weddings and corporate events.",
    priceFrom: 5000,
  },
  {
    id: "v5",
    name: "Toyota Innova Crysta",
    category: "Luxury Car",
    seatCapacity: 7,
    imageUrl: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80",
    description: "Premium and comfortable SUV suitable for family vacations, airport transfers, and corporate travel.",
    priceFrom: 4500,
  },
  {
    id: "v6",
    name: "Toyota Vellfire",
    category: "Luxury Van",
    seatCapacity: 6,
    imageUrl: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80",
    description: "Ultra-premium van with luxurious interiors, perfect for VIP transport and special occasions.",
    priceFrom: 12000,
  },
  {
    id: "v7",
    name: "Force Urbania",
    category: "Urbania",
    seatCapacity: 17,
    imageUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
    description: "Modern, spacious people-mover with premium seating — great for group tours and corporate outings.",
    priceFrom: 7000,
  },
  {
    id: "v8",
    name: "Tempo Traveller 12-Seater",
    category: "Tempo Traveller",
    seatCapacity: 12,
    imageUrl: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80",
    description: "Comfortable and spacious tempo traveller, perfect for family trips, group tours, and outstation travel.",
    priceFrom: 4500,
  },
  {
    id: "v9",
    name: "Tempo Traveller 17-Seater",
    category: "Tempo Traveller",
    seatCapacity: 17,
    imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
    description: "Premium 17-seater tempo traveller with comfortable seating, ample luggage space, and AC.",
    priceFrom: 5500,
  },
  {
    id: "v10",
    name: "Mini Bus",
    category: "Mini Bus",
    seatCapacity: 26,
    imageUrl: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80",
    description: "Ideal for large groups, corporate trips, weddings, and long-distance journeys.",
    priceFrom: null,
  },
  {
    id: "v11",
    name: "Luxury Bus",
    category: "Luxury Bus",
    seatCapacity: 40,
    imageUrl: "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?auto=format&fit=crop&w=1200&q=80",
    description: "Spacious luxury bus for weddings, corporate events, school trips, and large group tours.",
    priceFrom: null,
  },
];

// Shared placeholder cities — matches the backend seed data (5 cities), used
// as a fallback for the CitiesGrid and anywhere else that lists all cities.


const CLOUDINARY = "https://res.cloudinary.com/yhuaios0/image/upload";

const CARD_IMAGES = {
  delhi: `${CLOUDINARY}/v1791056116/Delhi_Landmarks_Circular_Emblem.png`,
  haridwar: `${CLOUDINARY}/v1791056117/Haridwar_Riverside_Ghat_Panorama.png`,
  amritsar: `${CLOUDINARY}/v1791056118/Golden_Gateway_Cityscape_Emblem.png`,
  chandigarh: `${CLOUDINARY}/v1791056118/Chandigarh_Open_Hand_Park_Badge.png`,
  dehradun: `${CLOUDINARY}/v1791056119/Clock_Tower_Amid_Himalayan_Gardens.png`,
  varanasi: `${CLOUDINARY}/v1791056119/Sunrise_on_the_Sacred_Ghats.png`,
};

export const dummyCities: City[] = [
  {
    id: "c1",
    name: "Delhi",
    slug: "delhi",
    heroImage:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1600&q=80",
    cardImage: CARD_IMAGES.delhi,
    description: "Reliable, comfortable travel across Delhi and nearby routes.",
    spots: [
      { id: "s1", name: "India Gate", imageUrl: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80" },
      { id: "s2", name: "Qutub Minar", imageUrl: "https://images.unsplash.com/photo-1587135941948-670b381f08ce?auto=format&fit=crop&w=800&q=80" },
      { id: "s3", name: "Red Fort", imageUrl: "https://images.unsplash.com/photo-1597040663342-45b6af1e4a67?auto=format&fit=crop&w=800&q=80" },
    ],
  },
  {
    id: "c2",
    name: "Haridwar",
    slug: "haridwar",
    // TODO: replace heroImage and spot imageUrl values with real photos
    heroImage: CARD_IMAGES.haridwar,
    cardImage: CARD_IMAGES.haridwar,
    description: "Reliable, comfortable travel across Haridwar and nearby routes.",
    spots: [
      { id: "s4", name: "Har Ki Pauri", imageUrl: CARD_IMAGES.haridwar },
      { id: "s5", name: "Mansa Devi Temple", imageUrl: CARD_IMAGES.haridwar },
      { id: "s6", name: "Chandi Devi Temple", imageUrl: CARD_IMAGES.haridwar },
    ],
  },
  {
    id: "c3",
    name: "Amritsar",
    slug: "amritsar",
    heroImage: CARD_IMAGES.amritsar,
    cardImage: CARD_IMAGES.amritsar,
    description: "Reliable, comfortable travel across Amritsar and nearby routes.",
    spots: [
      { id: "s7", name: "Golden Temple", imageUrl: CARD_IMAGES.amritsar },
      { id: "s8", name: "Jallianwala Bagh", imageUrl: CARD_IMAGES.amritsar },
      { id: "s9", name: "Wagah Border", imageUrl: CARD_IMAGES.amritsar },
    ],
  },
  {
    id: "c4",
    name: "Chandigarh",
    slug: "chandigarh",
    heroImage: CARD_IMAGES.chandigarh,
    cardImage: CARD_IMAGES.chandigarh,
    description: "Reliable, comfortable travel across Chandigarh and nearby routes.",
    spots: [
      { id: "s10", name: "Rock Garden", imageUrl: CARD_IMAGES.chandigarh },
      { id: "s11", name: "Sukhna Lake", imageUrl: CARD_IMAGES.chandigarh },
      { id: "s12", name: "Rose Garden", imageUrl: CARD_IMAGES.chandigarh },
    ],
  },
  {
    id: "c5",
    name: "Dehradun",
    slug: "dehradun",
    heroImage: CARD_IMAGES.dehradun,
    cardImage: CARD_IMAGES.dehradun,
    description: "Reliable, comfortable travel across Dehradun and nearby routes.",
    spots: [
      { id: "s13", name: "Robber's Cave", imageUrl: CARD_IMAGES.dehradun },
      { id: "s14", name: "Sahastradhara", imageUrl: CARD_IMAGES.dehradun },
      { id: "s15", name: "Mindrolling Monastery", imageUrl: CARD_IMAGES.dehradun },
    ],
  },
  {
    id: "c6",
    name: "Varanasi",
    slug: "varanasi",
    heroImage: CARD_IMAGES.varanasi,
    cardImage: CARD_IMAGES.varanasi,
    description: "Reliable, comfortable travel across Varanasi and nearby routes.",
    spots: [
      { id: "s16", name: "Kashi Vishwanath Temple", imageUrl: CARD_IMAGES.varanasi },
      { id: "s17", name: "Dashashwamedh Ghat", imageUrl: CARD_IMAGES.varanasi },
      { id: "s18", name: "Sarnath", imageUrl: CARD_IMAGES.varanasi },
    ],
  },
];
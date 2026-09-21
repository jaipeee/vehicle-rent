export interface ServiceExample {
  title: string;
  description: string;
  image: string;
}

export interface OccasionCategory {
  id: string;
  label: string;
  examples: ServiceExample[];
}

// Placeholder copy/images — swap for your real photos and descriptions once ready.
export const OCCASIONS: OccasionCategory[] = [
  {
    id: "wedding",
    label: "Wedding Travel",
    examples: [
      {
        title: "Luxury Bus on Rent for Wedding",
        description:
          "Indiventure offers spacious buses for wedding guests, seating 41 to 56 with reclining seats, panoramic windows, and onboard music — smooth, comfortable travel for the whole baraat.",
        image: "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Luxury Car on Rent for Wedding",
        description:
          "Arrive in style with our chauffeur-driven sedans and premium cars — elegant interiors, AC comfort, and professional drivers for a stress-free wedding day.",
        image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
  {
    id: "corporate",
    label: "Corporate Travel",
    examples: [
      {
        title: "Corporate Cab Service",
        description:
          "Reliable sedans and SUVs for client meetings, airport transfers, and daily commutes — punctual, professional, and comfortable for business travel.",
        image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Employee Shuttle & Offsite Travel",
        description:
          "Tempo travellers and buses for team offsites, company outings, and group commutes — spacious seating and ample luggage room for the whole team.",
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
  {
    id: "vacation",
    label: "Vacations/Local",
    examples: [
      {
        title: "Family Vacation Tempo Traveller",
        description:
          "Spacious, comfortable tempo travellers built for family trips and group tours — ample luggage space and courteous, experienced drivers.",
        image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "City Sightseeing Cab",
        description:
          "Explore the city at your own pace with a comfortable sedan or SUV and a driver who knows all the best local spots.",
        image: "https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
  {
    id: "pilgrimage",
    label: "Pilgrimage Tour",
    examples: [
      {
        title: "Pilgrimage Bus Rental",
        description:
          "Comfortable, well-maintained buses for large pilgrimage groups — reclining seats and ample space for a smooth, restful journey.",
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Pilgrimage Tempo Traveller",
        description:
          "Ideal for smaller pilgrimage groups and longer routes — comfortable seating, AC, and drivers experienced with pilgrimage routes and timings.",
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
];
import {
  Wind,
  UserCheck,
  MapPin,
  ShieldCheck,
  Fuel,
  Headset,
  Armchair,
  Briefcase,
  Music,
  Clock,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export interface FleetService {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  images: string[]; // exactly 5, cycled on hover
  amenities: { label: string; icon: LucideIcon }[];
}

// Placeholder images — swap for your real vehicle photos once available.
export const FLEET_SERVICES: FleetService[] = [
  {
    id: "car-with-driver",
    title: "Car on Rent",
    subtitle: "with Driver",
    description:
      "Travel across the city or outstation in comfort with our chauffeur-driven car rental. Every trip pairs a clean, sanitized vehicle with a licensed, experienced driver who knows the routes and values your time.",
    images: [
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: [
      { label: "AC Cabin", icon: Wind },
      { label: "Experienced Driver", icon: UserCheck },
      { label: "Live GPS Tracking", icon: MapPin },
      { label: "Sanitized Vehicle", icon: ShieldCheck },
      { label: "Fuel Included", icon: Fuel },
      { label: "24/7 Support", icon: Headset },
    ],
  },
  {
    id: "tempo-traveller",
    title: "Tempo Traveller",
    subtitle: "on Rent",
    description:
      "Perfect for family trips, group tours, and outstation travel. Our tempo travellers offer spacious, comfortable seating with ample luggage space and courteous, experienced drivers.",
    images: [
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: [
      { label: "AC Cabin", icon: Wind },
      { label: "Pushback Seats", icon: Armchair },
      { label: "Ample Luggage Space", icon: Briefcase },
      { label: "Experienced Driver", icon: UserCheck },
      { label: "Charging Points", icon: Sparkles },
      { label: "24/7 Support", icon: Headset },
    ],
  },
  {
    id: "bus-rental",
    title: "Bus Rental",
    subtitle: "Services",
    description:
      "Planning a group trip, corporate outing, or wedding function? Our spacious, well-maintained coaches offer pushback seating and ample luggage space — perfect for tours and events, big or small.",
    images: [
      "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: [
      { label: "AC & Non-AC", icon: Wind },
      { label: "Pushback Seats", icon: Armchair },
      { label: "Professional Driver", icon: UserCheck },
      { label: "Luggage Space", icon: Briefcase },
      { label: "Onboard Music", icon: Music },
      { label: "On-Time Guarantee", icon: Clock },
    ],
  },
  {
    id: "luxury-car",
    title: "Luxury Car",
    subtitle: "Rental",
    description:
      "Arrive in style for weddings, corporate events, or special occasions. Our premium fleet pairs top-tier comfort with a dedicated chauffeur for a smooth, first-class experience.",
    images: [
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: [
      { label: "Premium Interiors", icon: Sparkles },
      { label: "Chauffeur Service", icon: UserCheck },
      { label: "Live GPS Tracking", icon: MapPin },
      { label: "Sanitized Vehicle", icon: ShieldCheck },
      { label: "Fuel Included", icon: Fuel },
      { label: "24/7 Support", icon: Headset },
    ],
  },
];
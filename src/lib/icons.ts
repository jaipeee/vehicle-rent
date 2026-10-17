import {
  Wind, UserCheck, MapPin, ShieldCheck, Fuel, Headset, Armchair,
  Briefcase, Music, Clock, Sparkles, type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Wind, UserCheck, MapPin, ShieldCheck, Fuel, Headset, Armchair, Briefcase, Music, Clock, Sparkles,
};

export const ICON_NAMES = Object.keys(ICONS);
export const getIcon = (name: string): LucideIcon => ICONS[name] ?? Sparkles;
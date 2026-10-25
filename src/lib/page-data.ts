import { apiFetch, ApiError } from "@/lib/api";
import { dummyCities, dummyTestimonials, dummyVehicles } from "@/lib/dummyData";
import type {
  BlogPost,
  City,
  FleetItemData,
  HeroSlideData,
  PageContent,
  Testimonial,
  Vehicle,
  ServiceCardData,
  FaqData
} from "@/lib/types";
import type { PageContext } from "./page-context";

export async function getCity(slug: string): Promise<City | null> {
  const apiCity = await apiFetch<City>(`/cities/${slug}`).catch((err) => {
    if (err instanceof ApiError && err.status === 404) return null;
    throw err;
  });
  return apiCity ?? dummyCities.find((c) => c.slug === slug) ?? null;
}

export async function getPageData({ city, category }: PageContext) {
  const contentQs = new URLSearchParams({ city: city?.slug ?? "", category: category?.slug ?? "" });
  const testimonialQs = new URLSearchParams({ city: city?.name ?? "", category: category?.slug ?? "" });

  // Each fallback is typed, so the results are plain arrays, never `X[] | never[]`.
  const [vehicles, cities, testimonials, content, blogs, heroSlides, fleet,serviceCards,faqs ] = await Promise.all([
    apiFetch<Vehicle[]>("/vehicles").catch((): Vehicle[] => []),
    apiFetch<City[]>("/cities").catch((): City[] => []),
    apiFetch<Testimonial[]>(`/testimonials?${testimonialQs}`).catch((): Testimonial[] => []),
    apiFetch<PageContent>(`/page-content?${contentQs}`).catch((): PageContent => ({})),
    apiFetch<BlogPost[]>(`/blogs?${contentQs}`).catch((): BlogPost[] => []),
    apiFetch<HeroSlideData[]>(`/hero-slides?${contentQs}`).catch((): HeroSlideData[] => []),
    apiFetch<FleetItemData[]>(`/fleet?${contentQs}`).catch((): FleetItemData[] => []),
    apiFetch<ServiceCardData[]>(`/service-cards?${contentQs}`).catch((): ServiceCardData[] => []),
    apiFetch<FaqData[]>(`/faqs?${contentQs}`).catch((): FaqData[] => []),

  ]);

  const allVehicles = vehicles.length > 0 ? vehicles : dummyVehicles;
  const categoryVehicles = category ? allVehicles.filter((v) => category.matches.includes(v.category)) : [];

  let testimonialsData = testimonials;
  if (testimonialsData.length === 0) {
    const local = city ? dummyTestimonials.filter((t) => t.cityName === city.name) : [];
    testimonialsData = local.length > 0 ? local : dummyTestimonials;
  }

  return {
    content,
    blogs,
    heroSlides,
    fleet,
    categoryVehicles,
    testimonials: testimonialsData,
    cities: cities.length > 0 ? cities : dummyCities,
    serviceCards,
    faqs,
  };
}
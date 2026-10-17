import { VEHICLE_CATEGORIES } from "@/features/vehicles/vehicle-categories.config";
import type { NavItem } from "./navbar.config";

const slugOf = (href: string) => href.replace(/^\/(vehicles\/)?/, "");
const isVehicleHref = (href: string) => VEHICLE_CATEGORIES.some((c) => c.slug === slugOf(href));

// "/delhi/mini-bus" -> "mini-bus", "/mini-bus" -> "mini-bus", "/delhi" -> undefined
export function currentVehicleSlug(pathname: string) {
  return pathname
    .split("/")
    .filter(Boolean)
    .find((s) => VEHICLE_CATEGORIES.some((c) => c.slug === s));
}

export function isItemActive(item: NavItem, pathname: string) {
  if (item.href === "/") return pathname === "/";
  const hrefs = [item.href, ...(item.children?.map((c) => c.href) ?? [])];
  if (hrefs.some(isVehicleHref)) return !!currentVehicleSlug(pathname);
  return hrefs.some((h) => pathname === h || pathname.startsWith(h + "/"));
}
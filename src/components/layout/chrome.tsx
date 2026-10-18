"use client";

import { usePathname } from "next/navigation";

// Renders the site navbar/footer/floating button everywhere except /2906.
export function Chrome({
  top,
  bottom,
  children,
}: {
  top: React.ReactNode;
  bottom: React.ReactNode;
  children: React.ReactNode;
}) {
  const isAdmin = (usePathname() ?? "").startsWith("/2906");
  if (isAdmin) return <>{children}</>;
  return (
    <>
      {top}
      {children}
      {bottom}
    </>
  );
}
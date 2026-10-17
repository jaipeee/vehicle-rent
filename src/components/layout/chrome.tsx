"use client";

import { usePathname } from "next/navigation";

// Renders the site navbar/footer/floating button everywhere except /admin.
export function Chrome({
  top,
  bottom,
  children,
}: {
  top: React.ReactNode;
  bottom: React.ReactNode;
  children: React.ReactNode;
}) {
  const isAdmin = (usePathname() ?? "").startsWith("/admin");
  if (isAdmin) return <>{children}</>;
  return (
    <>
      {top}
      {children}
      {bottom}
    </>
  );
}
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer/footer";
import { FloatingCta } from "@/components/layout/floating-cta";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Indiventure Tour & Travel",
    template: "%s | Indiventure Tour & Travel",
  },
  description:
    "Reliable tempo traveller, luxury car, and bus rentals for corporate events, weddings, and outstation trips across India.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
        <FloatingCta />
      </body>
    </html>
  );
}
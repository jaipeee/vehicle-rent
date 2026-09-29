import type { Metadata } from "next";
import { Jost } from "next/font/google";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer/footer";
import { FloatingCta } from "@/components/layout/floating-cta";

import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Indiventra Tour & Travel",
    template: "%s | Indiventra Tour & Travel",
  },
  description:
    "Reliable tempo traveller, luxury car, and bus rentals for corporate events, weddings, and outstation trips across India.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={jost.className}>
        <Navbar />
        {children}
        <Footer />
        <FloatingCta />
      </body>
    </html>
  );
}
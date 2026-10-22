import type { Metadata } from "next";
import { Jost } from "next/font/google";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer/footer";
import { FloatingCta } from "@/components/layout/floating-cta";
import { Chrome } from "@/components/layout/chrome";

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
     icons: {
    icon: "https://res.cloudinary.com/yhuaios0/image/upload/v1790619916/WHITE_BG_SOICAL_MEDIA_IN.jpg.jpg",
     }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={jost.className}>
  <Chrome
    top={<Navbar />}
    bottom={
      <>
        <Footer />
        <FloatingCta />
      </>
    }
  >
    {children}
  </Chrome>
</body>
    </html>
  );
}
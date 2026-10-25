import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Poppins } from "next/font/google";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer/footer";
import { FloatingCta } from "@/components/layout/floating-cta";
import { Chrome } from "@/components/layout/chrome";
import { QuoteProvider } from "@/features/quote/quote-context";
import { OG_IMAGE, SITE_DESCRIPTION, SITE_URL } from "@/lib/seo";

import "./globals.css";

const GTM_ID = "GTM-MNCHT5XT";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Indiventra | Luxury Vehicle Rental Service in India @Best Price",
    template: "%s | Indiventra Tour & Travel",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "tempo traveller on rent",
    "tempo traveller rental",
    "force urbania on rent",
    "luxury bus on rent",
    "mini bus rental",
    "car rental with driver",
    "luxury car rental",
    "vehicle on rent in India",
    "wedding bus rental",
    "outstation cab",
  ],
  authors: [{ name: "Indiventra" }],
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  verification: { google: "AFVKPHmXsBaIxXgOCKMITL6FzihkI70YI7hhpxP4GWI" },
  icons: {
    icon: "https://res.cloudinary.com/yhuaios0/image/upload/v1790619916/WHITE_BG_SOICAL_MEDIA_IN.jpg.jpg",
    apple: "https://res.cloudinary.com/yhuaios0/image/upload/v1790619916/SOICAL_MEDIA_IN_LOGO.jpg.jpg",
  },
  openGraph: {
    type: "website",
    siteName: "Indiventra",
    locale: "en_IN",
    images: [OG_IMAGE],
  },
  twitter: { card: "summary_large_image", images: [OG_IMAGE.url] },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B3D91",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </head>
      <body className={poppins.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <QuoteProvider>
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
        </QuoteProvider>
      </body>
    </html>
  );
}
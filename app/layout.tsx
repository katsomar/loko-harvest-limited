import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import SmoothScroll from "@/components/layout/SmoothScroll";
import { PageTransition } from "@/components/layout/PageTransition";
import { WhatsAppWidget } from "@/components/ui/WhatsAppWidget";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { PremiumSplashScreen } from "@/components/ui/PremiumSplashScreen";
import PaywallPage from "./paywall/page";

// ==========================================
// SITE STATUS: Set to true to enable Paywall
// Set to false to restore normal site access
// ==========================================
const IS_SITE_LOCKED = true; 

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://loko-harvest-limited.vercel.app"),
  title: "Loko Harvest Limited | Farming with pastures and herbs",
  description: "Experience the finest organic, farm-to-table poultry with Loko Harvest Limited. A decade of ethical, sustainable, and organic poultry farming in Uganda.",
  applicationName: "Loko Harvest Limited",
  keywords: ["poultry", "organic chicken", "farm-to-table", "Uganda", "Loko Harvest", "Luxury Poultry"],
  authors: [{ name: "Loko Harvest Limited" }],
  openGraph: {
    title: "Loko Harvest Limited | Farming with pastures and herbs",
    description: "Experience the finest organic, farm-to-table poultry. Ethical, sustainable, and organic poultry farming in Uganda.",
    url: "https://loko-harvest-limited.vercel.app",
    siteName: "Loko Harvest Limited",
    images: [
      {
        url: "/logos/loko.png",
        width: 1200,
        height: 630,
        alt: "Loko Harvest Limited Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Loko Harvest Limited | Farming with pastures and herbs",
    description: "Premium organic poultry farming in Uganda.",
    images: ["/logos/loko.png"],
  },
  icons: {
    icon: [
      { url: "/logos/loko.png" },
      { url: "/logos/loko.png", sizes: "32x32", type: "image/png" },
      { url: "/logos/loko.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/logos/loko.png", sizes: "180x180", type: "image/png" },
    ],
  },
  appleWebApp: {
    title: "Loko Harvest Limited",
    statusBarStyle: "default",
    capable: true,
  },
  other: {
    "apple-mobile-web-app-title": "Loko Harvest Limited",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className="relative">
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-off-white text-brand-dark selection:bg-primary-yellow selection:text-brand-dark overflow-x-hidden relative`}
      >
        {IS_SITE_LOCKED ? (
          <PaywallPage />
        ) : (
          <SmoothScroll>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify([
                  {
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    "name": "Loko Harvest Limited",
                    "alternateName": ["Loko Harvest", "Loko Harvest Ltd"],
                    "url": "https://loko-harvest-limited.vercel.app",
                    "description": "Experience the finest organic, farm-to-table poultry with Loko Harvest Limited. Ethical, sustainable, and organic poultry farming in Uganda.",
                    "publisher": {
                      "@type": "Organization",
                      "name": "Loko Harvest Limited",
                      "logo": {
                        "@type": "ImageObject",
                        "url": "https://loko-harvest-limited.vercel.app/logos/loko.png"
                      }
                    }
                  },
                  {
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "Loko Harvest Limited",
                    "legalName": "Loko Harvest Limited",
                    "url": "https://loko-harvest-limited.vercel.app",
                    "logo": "https://loko-harvest-limited.vercel.app/logos/loko.png",
                    "contactPoint": {
                      "@type": "ContactPoint",
                      "telephone": "",
                      "contactType": "customer service",
                      "areaServed": "UG",
                      "availableLanguage": "en"
                    }
                  }
                ]),
              }}
            />
            <PremiumSplashScreen />
            <ScrollProgressBar />
            <CustomCursor />
            <Navbar />
            <WhatsAppWidget />
            <PageTransition>
              <main className="relative">{children}</main>
            </PageTransition>
            <Footer />
          </SmoothScroll>
        )}
      </body>
    </html>
  );
}

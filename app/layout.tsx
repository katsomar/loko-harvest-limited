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
  title: "Loko Harvest Limited | Earthy Luxury Poultry",
  description: "Experience the finest organic, farm-to-table poultry with Loko Harvest Limited. A decade of ethical, sustainable, and premium poultry farming in East Africa.",
  icons: {
    icon: "/logos/loko.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-off-white text-brand-dark selection:bg-primary-yellow selection:text-brand-dark overflow-x-hidden`}
      >
        <SmoothScroll>
          <PremiumSplashScreen />
          <ScrollProgressBar />
          <CustomCursor />
          <Navbar />
          <WhatsAppWidget />
          <PageTransition>
            <main>{children}</main>
          </PageTransition>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}

"use client";

import { Hero } from "@/components/home/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { MissionVision } from "@/components/home/MissionVision";
import { TeamSection } from "@/components/home/TeamSection";
import { GallerySection } from "@/components/home/GallerySection";
import { NewsHighlights } from "@/components/home/NewsHighlights";
import { LogoMarquee } from "@/components/home/LogoMarquee";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { ContactSection } from "@/components/home/ContactSection";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative"
    >
      <Hero />
      <AboutSection />
      <MissionVision />
      <TeamSection />
      <GallerySection />
      <NewsHighlights />
      <LogoMarquee />
      <ReviewsSection />
      <ContactSection />
    </motion.div>
  );
}

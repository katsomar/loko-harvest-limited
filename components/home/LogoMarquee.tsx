import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const logos = [
  { name: "Ecomart", src: "/logos/ecomart.jpg" },
  { name: "Fraine", src: "/logos/fraine.png" },
  { name: "Joma", src: "/logos/Joma.png" },
  { name: "Quality", src: "/logos/quality.jpg" },
  { name: "Shopwise", src: "/logos/shopwise.jpg" },
  { name: "Standard", src: "/logos/standard.jpg" },
  // Placeholders to reach 15 total
  { name: "Premium Partner 1", src: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80" },
  { name: "Premium Partner 2", src: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80" },
  { name: "Premium Partner 3", src: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80" },
  { name: "Premium Partner 4", src: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80" },
  { name: "Premium Partner 5", src: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80" },
  { name: "Premium Partner 6", src: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80" },
  { name: "Premium Partner 7", src: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80" },
  { name: "Premium Partner 8", src: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80" },
  { name: "Premium Partner 9", src: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80" },
];

export const LogoMarquee = () => {
  return (
    <section className="py-24 bg-off-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <span className="text-primary-yellow font-sans text-xs font-bold uppercase tracking-[8px] block mb-4">Stockists</span>
        <h2 className="text-2xl md:text-3xl font-serif text-dark-green uppercase tracking-[6px]">
          Where To Find Us
        </h2>
      </div>

      <div className="relative">
        {/* Row 1: Left to Right */}
        <div className="flex w-[300%] animate-scroll-marquee mb-10">
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={i}
              className="group w-[200px] h-[100px] flex items-center justify-center bg-off-white/50 border border-brand-dark/5 mx-6 rounded-2xl shadow-sm grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
            >
              <div className="relative w-32 h-16 opacity-40 group-hover:opacity-100 transition-all">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  fill
                  className="object-contain p-2"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: Right to Left */}
        <div className="flex w-[300%] animate-scroll-marquee-reverse">
          {[...logos, ...logos].reverse().map((logo, i) => (
            <div
              key={i}
              className="group w-[200px] h-[100px] flex items-center justify-center bg-off-white/50 border border-brand-dark/5 mx-6 rounded-2xl shadow-sm grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
            >
              <div className="relative w-32 h-16 opacity-40 group-hover:opacity-100 transition-all">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  fill
                  className="object-contain p-2"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Edge Fade Masks */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-off-white via-off-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-off-white via-off-white/80 to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
};

"use client";

import React from "react";
import { motion } from "framer-motion";

const partners = [
  "Global Foods", "Organic Mart", "Prime Retail", "City Fresh", "Nature's Basket", "Pure Poultry", "Farm to Fork", "Chef's Choice"
];

export const LogoMarquee = () => {
  return (
    <section className="py-24 bg-off-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <h2 className="text-xl md:text-2xl font-serif text-brand-dark/40 uppercase tracking-[6px]">
          Where To Find Us
        </h2>
      </div>

      <div className="relative">
        {/* Row 1: Left to Right */}
        <div className="flex w-[200%] animate-scroll-marquee mb-8">
          {[...partners, ...partners].map((partner, i) => (
            <div
              key={i}
              className="group w-[250px] h-[100px] flex items-center justify-center bg-white border border-brand-dark/5 mx-4 rounded-xl shadow-sm grayscale hover:grayscale-0 transition-all duration-500"
            >
              <span className="font-serif text-2xl font-bold text-brand-dark/20 group-hover:text-primary-yellow transition-colors italic">
                {partner}
              </span>
            </div>
          ))}
        </div>

        {/* Row 2: Right to Left */}
        <div className="flex w-[200%] animate-scroll-marquee-reverse">
          {[...partners, ...partners].reverse().map((partner, i) => (
            <div
              key={i}
              className="group w-[250px] h-[100px] flex items-center justify-center bg-white border border-brand-dark/5 mx-4 rounded-xl shadow-sm grayscale hover:grayscale-0 transition-all duration-500"
            >
              <span className="font-serif text-2xl font-bold text-brand-dark/20 group-hover:text-primary-yellow transition-colors italic">
                {partner}
              </span>
            </div>
          ))}
        </div>

        {/* Edge Fade Masks */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-off-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-off-white to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
};

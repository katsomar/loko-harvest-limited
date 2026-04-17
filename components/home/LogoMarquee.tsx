import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const logos = [
  { name: "Ecomart", src: "/logos/ecomart.jpg" },
  { name: "Premium Market", text: "Noh Supermarket rubaga" },
  { name: "Fraine", src: "/logos/fraine.png" },
  { name: "Joma", src: "/logos/Joma.png" },
  { name: "Abuja", text: "Abuja fruits and vegetables kitende"},
  { name: "Quality", src: "/logos/quality.jpg" },
  { name: "Fresh Choice", text: "KSL- Kawuku Stores Ltd" },
  { name: "Shopwise", src: "/logos/shopwise.jpg" },
  { name: "Premium Market", text: "Akright supermarket" },
  { name: "Standard", src: "/logos/standard.jpg" },
  { name: "Capital", src: "/logos/capital.png" },
  { name: "Mystica", text: "Mystica Supermarket Gayaza" },
  { name: "Coin", src: "/logos/coin.png" },
  { name: "Pearl", text: "Pearl Supermarket" },
  { name: "SS", src: "/logos/ss.png" },
  { name: "Master", src: "/logos/master.png" },
  { name: "Premium Market", text: "Deluxe Supermarket Gayaza" },
];

const LogoCard = ({ logo }: { logo: any }) => (
  <div className="group w-[140px] md:w-[260px] h-[80px] md:h-[100px] flex items-center justify-center bg-white border border-brand-dark/5 mx-3 md:mx-6 rounded-2xl shadow-sm transition-all duration-700 hover:scale-105 shrink-0">
    <div className="relative w-full h-full flex items-center justify-center transition-all bg-white rounded-2xl overflow-hidden">
      {logo.text ? (
        <span 
          className="text-center font-serif text-[7px] md:text-[9px] font-bold text-dark-green uppercase tracking-[1px] px-3 leading-tight"
          style={{
            textShadow: "0.5px 0.5px 0 #F5C518, -0.5px -0.5px 0 #F5C518, 0.5px -0.5px 0 #F5C518, -0.5px 0.5px 0 #F5C518"
          }}
        >
          {logo.text}
        </span>
      ) : (
          <Image
            src={logo.src || ""}
            alt={logo.name}
            fill
            className="object-contain p-2 md:p-1"
            sizes="(max-width: 768px) 150px, 260px"
          />
      )}
    </div>
  </div>
);

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
        <div className="flex flex-nowrap min-w-max animate-scroll-marquee mb-10">
          {[...logos, ...logos].map((logo, i) => (
            <LogoCard key={`r1-${i}`} logo={logo} />
          ))}
        </div>

        {/* Row 2: Right to Left */}
        <div className="flex flex-nowrap min-w-max animate-scroll-marquee-reverse">
          {[...logos, ...logos].reverse().map((logo, i) => (
            <LogoCard key={`r2-${i}`} logo={logo} />
          ))}
        </div>

        {/* Edge Fade Masks */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-off-white via-off-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-off-white via-off-white/80 to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
};

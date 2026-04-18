"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const reviews = [
  {
    name: "Babirye",
    role: "Proprietor, Global Foods",
    text: "Loko Harvest provides consistent quality that my customers love. Their poultry is always fresh and handled with care.",
    rating: 5,
  },
  {
    name: "Mary Nakato",
    role: "Head Chef, Blue Waters",
    text: "The taste is noticeably better than any other supplier. You can really tell the chickens are naturally raised and healthy.",
    rating: 5,
  },
  {
    name: "Robert Birungi",
    role: "Distributor, City Fresh",
    text: "Professional, reliable, and premium. Loko Harvest is the standard for poultry farming in the region.",
    rating: 5,
  },
];

export const ReviewsSection = () => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % reviews.length);
  const prev = () => setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="reviews" className="py-32 bg-dark-green relative overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-10" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">
            What Our Clients Say
          </h2>
          <div className="w-24 h-1 bg-primary-yellow mx-auto" />
        </div>

        <div className="relative h-[550px] flex items-center justify-center overflow-visible">
          <div className="flex items-center justify-center w-full max-w-6xl relative">
            <AnimatePresence mode="popLayout">
              {[-1, 0, 1].map((offset) => {
                const itemIndex = (index + offset + reviews.length) % reviews.length;
                const review = reviews[itemIndex];
                const isActive = offset === 0;

                return (
                  <motion.div
                    key={`${itemIndex}-${offset}`}
                    initial={{ opacity: 0, scale: 0.8, x: offset * 200 }}
                    animate={{
                      opacity: isActive ? 1 : 0.4,
                      scale: isActive ? 1 : 0.8,
                      x: offset * 320,
                      zIndex: isActive ? 30 : 10,
                      rotateY: offset * -15,
                    }}
                    exit={{ opacity: 0, scale: 0.8, x: offset * 200 }}
                    transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                    className={cn(
                      "absolute bg-white/5 border border-white/10 p-10 md:p-16 rounded-[40px] w-full max-w-lg backdrop-blur-xl group cursor-pointer",
                      isActive ? "shadow-2xl shadow-primary-yellow/10" : "hidden md:block"
                    )}
                    style={{ 
                      perspective: "1200px",
                      transformStyle: "preserve-3d"
                    }}
                    onClick={isActive ? undefined : offset < 0 ? prev : next}
                  >
                    {/* Hover Tilt Effect (Subtle CSS) */}
                    <div className="transition-transform duration-500 group-hover:[transform:rotateX(5deg)rotateY(5deg)] h-full">
                      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Quote className="w-24 h-24 text-white fill-white" />
                      </div>

                      <div className="relative z-10">
                        <div className="flex gap-1 mb-6">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-primary-yellow fill-primary-yellow" />
                          ))}
                        </div>

                        <p className={cn(
                          "font-serif text-white leading-relaxed mb-8 italic transition-all duration-500",
                          isActive ? "text-xl md:text-2xl" : "text-sm line-clamp-3"
                        )}>
                          "{review.text}"
                        </p>

                        <div className={cn("transition-all duration-500", isActive ? "opacity-100" : "opacity-40")}>
                          <h4 className="text-lg font-bold text-primary-yellow">{review.name}</h4>
                          <p className="text-white/40 uppercase tracking-widest text-[10px] mt-1">{review.role}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none px-4 z-40">
            <button
              onClick={prev}
              className="pointer-events-auto w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-primary-yellow hover:text-brand-dark transition-all shadow-xl group"
            >
              <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={next}
              className="pointer-events-auto w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-primary-yellow hover:text-brand-dark transition-all shadow-xl group"
            >
              <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-3 mt-12 relative z-40">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-700",
                i === index ? "bg-primary-yellow w-12" : "bg-white/10 hover:bg-white/30 w-2"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

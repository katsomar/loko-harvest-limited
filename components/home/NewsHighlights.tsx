"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

const newsItems = [
  {
    id: 1,
    title: "How This Poultry Farmer Produces Million-Dollar Eggs",
    videoUrl: "https://youtu.be/AfokdcVncOY",
    description: "Loko Harvest featured on Call Me Firdaus, showcasing our organic yellow yolk secrets and sustainable farming practices."
  },
  {
    id: 2,
    title: "Uganda's Agricultural Innovation",
    videoUrl: "https://youtu.be/RBN6CvdxVeA",
    description: "Insights into how Loko Harvest is leading the way in modern organic poultry techniques in East Africa."
  },
  {
    id: 3,
    title: "Organic Feed Techniques",
    videoUrl: "https://www.youtube.com/embed/68M_K9X8oW0",
    description: "Learn about our unique herbal blend and pasture-based diet that gives our eggs their signature nutritional profile."
  }
];

const GlowingOrb = ({ delay = 0 }) => {
  const [position, setPosition] = useState({ x: "50%", y: "40%" });

  useEffect(() => {
    const move = () => {
      setPosition({
        x: `${10 + Math.random() * 80}%`,
        y: `${10 + Math.random() * 80}%`
      });
    };
    const interval = setInterval(move, 6000 + Math.random() * 4000);
    move();
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        left: position.x,
        top: position.y,
        scale: [1, 1.4, 1.2, 1.5, 1],
        opacity: [0.1, 0.4, 0.2, 0.3, 0.1],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }}
      className="absolute w-96 h-96 bg-primary-yellow/30 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2"
    />
  );
};

export const NewsHighlights = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % newsItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + newsItems.length) % newsItems.length);
  };

  return (
    <section id="news-highlights" className="relative py-32 bg-dark-green overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <GlowingOrb delay={0} />
        <GlowingOrb delay={3} />
        <GlowingOrb delay={6} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
             <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-primary-yellow font-sans text-sm font-bold uppercase tracking-[4px] block mb-4"
            >
              News Updates
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-serif text-white leading-tight"
            >
              News Highlights
            </motion.h2>
          </div>

          <div className="flex gap-4">
             <button
              onClick={prevSlide}
              className="w-12 h-12 md:w-16 md:h-16 border border-white/20 rounded-full flex items-center justify-center text-white/50 hover:text-primary-yellow hover:border-primary-yellow transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 md:w-16 md:h-16 border border-white/20 rounded-full flex items-center justify-center text-white/50 hover:text-primary-yellow hover:border-primary-yellow transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden rounded-[2rem]">
          <div className="flex transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
               style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {newsItems.map((item) => (
              <div key={item.id} className="min-w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-12 rounded-[2rem]">
                  <div className="lg:col-span-8">
                    <div className="relative aspect-video rounded-2xl overflow-hidden group shadow-2xl">
                      <iframe
                        src={`${item.videoUrl}?rel=0&modestbranding=1`}
                        title={item.title}
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                  <div className="lg:col-span-4 space-y-6">
                    <div className="inline-block px-4 py-1 bg-primary-yellow/10 border border-primary-yellow/20 rounded-full">
                      <span className="text-primary-yellow text-xs font-bold uppercase tracking-widest">Video Highlight</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-serif text-white leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed font-sans text-lg">
                      {item.description}
                    </p>
                    <div className="pt-6">
                      <button className="flex items-center gap-4 text-primary-yellow group">
                        <div className="w-10 h-10 rounded-full border border-primary-yellow/30 flex items-center justify-center group-hover:bg-primary-yellow group-hover:text-dark-green transition-all">
                           <Play className="w-4 h-4 fill-current" />
                        </div>
                        <span className="font-bold text-sm uppercase tracking-widest">Watch full story</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {newsItems.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 transition-all duration-500 rounded-full ${
                currentIndex === idx ? "w-12 bg-primary-yellow" : "w-4 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

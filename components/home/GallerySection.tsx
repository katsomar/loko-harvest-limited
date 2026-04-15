"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const categories = ["All", "Farm", "Products", "Facilities", "Events"];

const items = [
  { id: 1, category: "Farm", title: "Sunrise over the fields", image: "/gallery/fields1.JPG", height: "h-[300px]" },
  { id: 2, category: "Products", title: "Premium Eggs", image: "/gallery/eggs2.JPG", height: "h-[450px]" },
  { id: 3, category: "Facilities", title: "Modern Hatchery", image: "/gallery/facilites.JPG", height: "h-[350px]" },
  { id: 4, category: "Events", title: "Community Day", image: "/gallery/events.JPG", height: "h-[400px]" },
  { id: 5, category: "Farm", title: "Healthy Flock", image: "/gallery/farm1.JPG", height: "h-[500px]" },
  { id: 6, category: "Products", title: "Fresh Poultry", image: "/gallery/eggs.JPG", height: "h-[320px]" },
];

export const GallerySection = () => {
  const [filter, setFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredItems = filter === "All" ? items : items.filter(i => i.category === filter);

  const openLightbox = (id: number) => {
    const idx = items.findIndex(item => item.id === id);
    setSelectedImage(idx);
  };
  const closeLightbox = () => setSelectedImage(null);

  const nextImage = () => setSelectedImage((prev) => (prev !== null ? (prev + 1) % items.length : null));
  const prevImage = () => setSelectedImage((prev) => (prev !== null ? (prev - 1 + items.length) % items.length : null));

  const selectedItem = selectedImage !== null ? items[selectedImage] : null;

  return (
    <section id="gallery" className="py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <span className="text-primary-yellow font-sans text-sm font-bold uppercase tracking-[4px] block mb-4">
              Our World
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-brand-dark leading-tight">
              A Glimpse Into Loko Harvest
            </h2>
          </div>

          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full font-sans text-xs uppercase tracking-widest transition-all duration-300 border ${
                  filter === cat
                    ? "bg-primary-yellow border-primary-yellow text-brand-dark"
                    : "border-brand-dark/10 text-brand-dark/40 hover:border-brand-dark/30 hover:text-brand-dark"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid */}
        <motion.div 
          layout
          className="columns-1 md:columns-2 lg:columns-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className={`mb-8 relative group cursor-pointer overflow-hidden rounded-2xl ${item.height}`}
                onClick={() => openLightbox(item.id)}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-brand-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
                  <Maximize2 className="text-primary-yellow w-10 h-10 mb-4 transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="text-white text-xs uppercase tracking-widest mb-2">{item.category}</span>
                  <h3 className="text-white font-serif text-xl">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-dark/95 flex items-center justify-center p-6 md:p-12"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-10 right-10 text-white/60 hover:text-white transition-colors z-50"
            >
              <X className="w-10 h-10" />
            </button>
            
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedItem.id}
                  initial={{ scale: 0.9, opacity: 0, x: 20 }}
                  animate={{ scale: 1, opacity: 1, x: 0 }}
                  exit={{ scale: 0.9, opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full max-w-5xl aspect-video rounded-lg overflow-hidden"
                >
                  <Image
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute bottom-4 left-0 right-0 py-10 flex flex-col items-center text-center">
                 <p className="text-primary-yellow uppercase tracking-widest text-xs mb-2 font-bold">{selectedItem.category}</p>
                 <h2 className="text-white font-serif text-3xl mb-4">{selectedItem.title}</h2>
                 <div className="px-4 py-1 bg-white/10 rounded-full text-white/40 text-[10px] tracking-widest uppercase">
                   {selectedImage + 1} of {items.length}
                 </div>
              </div>

              {/* Navigation Arrows */}
              <div className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2">
                <button 
                  onClick={prevImage}
                  className="w-12 md:w-16 h-12 md:h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all group"
                >
                  <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2">
                <button 
                  onClick={nextImage}
                  className="w-12 md:w-16 h-12 md:h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all group"
                >
                  <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

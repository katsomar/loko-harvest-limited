"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const words = ["Pasture Fed", "Nutritional", "Healthier", "Loko Harvest"];

const Particles = () => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 1000 - 500,
      y: Math.random() * 1000 - 500,
      targetY: Math.random() * -200 - 100,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: p.x, y: p.y, opacity: 0 }}
          animate={{ 
            y: [null, p.targetY],
            opacity: [0, 0.3, 0],
            scale: [0, 1, 0]
          }}
          transition={{ 
            duration: p.duration, 
            repeat: Infinity, 
            delay: p.delay 
          }}
          className="absolute w-1 h-1 bg-primary-yellow rounded-full blur-[1px]"
        />
      ))}
    </>
  );
};

export const PremiumSplashScreen = () => {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (index < words.length - 1) {
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 2000); // Slower word sequence
      return () => clearTimeout(timer);
    } else {
      // Final logo part lasts even longer now
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 6000); // 6 seconds for the final grand reveal
      return () => clearTimeout(timer);
    }
  }, [index]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%",
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[100000] bg-dark-green flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Hidden element to satisfy font preload requirements and avoid console warnings */}
          <span className="sr-only font-sans">Loko Harvest Loading...</span>

          {/* Subtle Grainy Background */}
          <div className="absolute inset-0 bg-grain opacity-5" />

          {/* Background Effects for Final Phase */}
          <AnimatePresence>
            {index === words.length - 1 && (
              <>
                {/* Expanding Ripples */}
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={`ripple-${i}`}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 3, opacity: [0, 0.1, 0] }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      delay: i * 1.2,
                      ease: "easeOut" 
                    }}
                    className="absolute w-[400px] h-[400px] border border-primary-yellow/30 rounded-full"
                  />
                ))}
                
                {/* Floating Particles */}
                <Particles />
              </>
            )}
          </AnimatePresence>

          {/* Golden Ambient Glow */}
          <motion.div 
             animate={{ 
               scale: [1, 1.2, 1],
               opacity: [0.3, 0.5, 0.3]
             }}
             transition={{ duration: 4, repeat: Infinity }}
             className="absolute w-[500px] h-[500px] bg-primary-yellow/10 rounded-full blur-[120px]"
          />

          <div className="relative h-20 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {index < words.length - 1 ? (
                <motion.h2
                  key={words[index]}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-white font-serif text-3xl md:text-5xl tracking-[0.2em] uppercase italic"
                >
                  {words[index]}
                </motion.h2>
              ) : (
                <motion.div
                  key="logo-reveal"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="flex flex-col items-center gap-8"
                >
                  <div className="relative w-32 h-32 md:w-48 md:h-48 group">
                    <Image
                      src="/logos/loko.png"
                      alt="Loko Harvest"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 128px, 192px"
                    />
                    <motion.div 
                      animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute inset-[-10%] border border-primary-yellow/20 rounded-full"
                    />
                  </div>
                  <motion.div 
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "240px", opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1.5 }}
                    className="h-[1px] bg-gradient-to-r from-transparent via-primary-yellow/50 to-transparent"
                  />
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.2, duration: 1 }}
                    className="text-primary-yellow/80 font-serif text-xs md:text-sm tracking-[0.4em] uppercase italic"
                  >
                    Simply egg-ceptional
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Counter/Progress */}
          <motion.div 
            animate={{ opacity: index < words.length - 1 ? 1 : 0 }}
            className="absolute bottom-12 overflow-hidden h-6 flex flex-col items-center"
          >
             <div className="flex gap-2">
                {words.map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ 
                      backgroundColor: i === index ? "#fbbf24" : "rgba(255,255,255,0.1)",
                      scale: i === index ? 1.5 : 1
                    }}
                    className="w-1 h-1 rounded-full transition-colors"
                  />
                ))}
             </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

"use client";

import React from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const heroImages = [
  "/hero/1.JPG",
  "/hero/2.JPG",
  "/hero/3.JPG",
  "/hero/4.JPG",
  "/hero/5.JPG",
  "/hero/6.JPG",
  "/hero/7.JPG",
  "/hero/8.JPG",
];

export const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const [mounted, setMounted] = React.useState(false);
  const [bgIndex, setBgIndex] = React.useState(0);
  const [particles, setParticles] = React.useState<{ x: string; delay: number; duration: number }[]>([]);

  React.useEffect(() => {
    setMounted(true);
    const newParticles = [...Array(20)].map(() => ({
      x: Math.random() * 100 + "%",
      delay: Math.random() * 10,
      duration: Math.random() * 10 + 10,
    }));
    setParticles(newParticles);

    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % heroImages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const words = "From Our Farm. To Your Table.".split(" ");

  return (
    <section id="home" className="relative h-screen min-h-[700px] overflow-hidden flex items-center justify-center">
      {/* Background Slideshow with Parallax */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 z-0 bg-brand-dark"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={bgIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.4, scale: 1.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[bgIndex]}
              alt="Loko Harvest Farm"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-transparent to-brand-dark/80 z-10" />
        <div className="absolute inset-0 bg-grain z-10" />
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {mounted && particles.map((p, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: p.x, 
              y: "110%", 
              opacity: 0 
            }}
            animate={{ 
              y: "-10%", 
              opacity: [0, 0.5, 0] 
            }}
            transition={{ 
              duration: p.duration, 
              repeat: Infinity, 
              delay: p.delay 
            }}
            className="absolute w-1 h-1 bg-primary-yellow rounded-full"
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl">
        <h1 className="text-5xl md:text-8xl font-serif text-white mb-8 overflow-hidden flex flex-wrap justify-center gap-x-4">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 1, 
                delay: i * 0.1, 
                ease: [0.33, 1, 0.68, 1] 
              }}
              className="inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-lg md:text-xl text-white/70 font-sans max-w-2xl mx-auto mb-12"
        >
          Premium quality chicken and poultry products grown with care at Loko Harvest Limited. Experience earthy luxury in every bite.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link
            href="/orders"
            className="group relative px-10 py-4 bg-primary-yellow text-brand-dark font-sans font-bold tracking-widest uppercase hover:text-white transition-colors duration-500 overflow-hidden rounded-sm w-full sm:w-auto"
          >
            <span className="relative z-10">Order Now</span>
            <span className="absolute inset-0 bg-brand-dark translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </Link>
          <Link
            href="/about"
            className="px-10 py-4 border border-white/30 text-white font-sans font-bold tracking-widest uppercase hover:bg-white hover:text-brand-dark transition-all duration-300 rounded-sm w-full sm:w-auto"
          >
            Our Story
          </Link>
        </motion.div>
      </div>

      {/* Rotating Badge */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-12 right-12 hidden lg:flex items-center justify-center w-32 h-32"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full fill-primary-yellow/20">
          <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
          <text className="text-[10px] font-sans tracking-[2px] uppercase fill-primary-yellow">
            <textPath xlinkHref="#circlePath">
              Farm Fresh • Naturally Raised • Quality Guaranteed •
            </textPath>
          </text>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <ChevronDown className="w-6 h-6 text-primary-yellow animate-bounce" />
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 cursor-pointer group"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[10px] uppercase tracking-[4px] text-white/40 group-hover:text-primary-yellow transition-colors duration-300">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8 text-primary-yellow/60 group-hover:text-primary-yellow transition-colors duration-300" />
        </motion.div>
      </motion.div>
    </section>
  );
};

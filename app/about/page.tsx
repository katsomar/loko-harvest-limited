"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Target, Eye, Shield, Users, Sprout, Heart, Leaf, ChevronRight, Egg, Zap, Truck, Package, Factory, Scissors, Droplets, LeafyGreen } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";

const processSteps = [
  {
    icon: LeafyGreen,
    title: "Picking the Pastures",
    description: "Every morning, our workers carefully pick the best fresh pastures. We gather banana leaves, pawpaw, guava, blackjack, and aloe vera. These local pastures help our birds stay healthy and strong.",
    color: "bg-dark-green",
    textColor: "text-white",
  },
  {
    icon: Droplets,
    title: "Cleaning the Pastures",
    description: "We make sure everything is clean. We wash and disinfect the pastures to remove any dirt or germs. This keeps the food safe and fresh for our birds.",
    color: "bg-primary-yellow",
    textColor: "text-brand-dark",
  },
  {
    icon: Scissors,
    title: "Chipping and Crushing",
    description: "We use special machines to chop the pastures into small pieces. This makes it very easy for our chickens to eat and get all the good nutrients from the pastures.",
    color: "bg-brand-dark",
    textColor: "text-white",
  },
  {
    icon: Zap,
    title: "Preparing the Feed",
    description: "Our team mixes healthy ingredients together to make high-protein feed. This feed is made to work perfectly when mixed with our fresh pastures.",
    color: "bg-dark-green",
    textColor: "text-white",
  },
  {
    icon: Factory,
    title: "Mixing Pastures and Feed",
    description: "Now we mix the chopped pastures together with the chicken feed. This special mix is what gives our eggs their beautiful and natural yellow yolks.",
    color: "bg-primary-yellow",
    textColor: "text-brand-dark",
  },
  {
    icon: Package,
    title: "Making the Pellets",
    description: "We press the mixture into small pellets. This makes the food easy to carry and ensures the chickens get a bit of everything in every bite.",
    color: "bg-brand-dark",
    textColor: "text-white",
  },
  {
    icon: Truck,
    title: "Packing and Moving",
    description: "We put the fresh food into bags and quickly transport them to the chicken houses. We want the food to be as fresh as possible for our birds.",
    color: "bg-dark-green",
    textColor: "text-white",
  },
  {
    icon: Egg,
    title: "Feeding Our Chickens",
    description: "Finally, we feed this healthy mix to our chickens. They love it! Because they eat such good food, they lay the best and most natural eggs for you.",
    color: "bg-primary-yellow",
    textColor: "text-brand-dark",
  },
];

export default function AboutBiographyPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  // Base transforms
  const eggY = useTransform(springScroll, [0, 1], ["0%", "95%"]);
  
  // Normalized snaking value (-1 to 1)
  const snakeValue = useTransform(
    springScroll, 
    [0, 0.1, 0.22, 0.34, 0.46, 0.58, 0.7, 0.82, 0.94, 1], 
    [0, -1, 1, -1, 1, -1, 1, -1, 1, 0]
  );

  // Apply responsive multiplier
  const eggX = useTransform(snakeValue, (v) => {
    const isMobile = windowWidth < 768;
    const multiplier = isMobile ? 30 : 250; // 30px on mobile, 250px on desktop
    return v * multiplier;
  });
  
  const eggRotate = useTransform(springScroll, [0, 1], [0, 2160]);
  
  const eggColors = ["#FDFCF0", "#F5E6BE", "#C68642"]; 
  const eggBaseColor = useTransform(
    springScroll,
    [0, 0.1, 0.22, 0.34, 0.46, 0.58, 0.7, 0.82, 0.94, 1],
    [
      eggColors[0], // Start
      eggColors[1], // Behind Step 1
      eggColors[2], // Behind Step 2
      eggColors[0], // Behind Step 3
      eggColors[1], // Behind Step 4
      eggColors[2], // Behind Step 5
      eggColors[0], // Behind Step 6
      eggColors[1], // Behind Step 7
      eggColors[2], // Behind Step 8
      eggColors[2]  // End
    ]
  );

  return (
    <div className="bg-white min-h-screen relative">
      {/* Cinematic Intro */}
      <section className="relative h-[120vh] flex items-center justify-center bg-brand-dark overflow-hidden">
         <div className="absolute inset-0 bg-grain opacity-20" />
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-yellow/10 via-transparent to-transparent opacity-50" />
         
         {/* Floating Decorative Elements */}
         <div className="absolute inset-0 pointer-events-none">
            <motion.div 
               animate={{ 
                  y: [0, -40, 0],
                  rotate: [0, 5, 0],
                  opacity: [0.1, 0.2, 0.1]
               }}
               transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-20 left-10 text-white/10"
            >
               <Leaf className="w-64 h-64" />
            </motion.div>
            <motion.div 
               animate={{ 
                  y: [0, 40, 0],
                  rotate: [0, -5, 0],
                  opacity: [0.05, 0.15, 0.05]
               }}
               transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute bottom-20 right-10 text-white/10"
            >
               <Sprout className="w-80 h-80" />
            </motion.div>
         </div>

         <div className="relative z-10 text-center px-6">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-primary-yellow font-sans text-xs font-bold uppercase tracking-[15px] block mb-12"
            >
              The Loko Method
            </motion.span>
            <h1 className="text-5xl sm:text-7xl md:text-[12rem] font-serif text-white overflow-hidden flex flex-wrap justify-center items-center gap-x-4 sm:gap-x-8 leading-none">
              {"Our Process".split(" ").map((word, wordIndex) => (
                <span key={wordIndex} className="flex whitespace-nowrap">
                  {word.split("").map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      initial={{ y: "150%", opacity: 0, rotate: 10 }}
                      animate={{ y: 0, opacity: 1, rotate: 0 }}
                      transition={{ 
                        duration: 1.5, 
                        delay: (wordIndex * word.length + charIndex) * 0.08, 
                        ease: [0.16, 1, 0.3, 1] 
                      }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                  {/* Add a space after the first word */}
                  {wordIndex === 0 && <span className="inline-block">&nbsp;</span>}
                </span>
              ))}
            </h1>
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2, delay: 1.5, ease: "circOut" }}
                className="w-48 h-[2px] bg-primary-yellow/40 mx-auto mt-20"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="mt-12 max-w-2xl mx-auto"
            >
              <p className="text-white/60 font-sans text-lg leading-relaxed italic">
                At Loko Harvest, we do things differently. We pick fresh green pastures like banana leaves and pawpaw and mix them with healthy feed. This special diet helps our birds grow strong and produce eggs with beautiful, natural yellow yolks that are good for you.
              </p>
            </motion.div>
         </div>

         {/* Scroll Indicator */}
         <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
         >
            <div className="w-[1px] h-20 bg-gradient-to-b from-primary-yellow to-transparent" />
         </motion.div>
      </section>

      {/* Process Walkthrough Section */}
      <section className="relative py-60 px-6 bg-white overflow-hidden" ref={containerRef}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-60 relative z-20">
            <motion.span 
              initial={{ opacity: 0, letterSpacing: "0px" }}
              whileInView={{ opacity: 1, letterSpacing: "8px" }}
              viewport={{ once: true }}
              className="text-primary-yellow font-sans text-sm font-bold uppercase block mb-6"
            >
              The Journey
            </motion.span>
            <h2 className="text-5xl md:text-9xl font-serif text-brand-dark leading-none">Forged in Nature</h2>
          </div>

          <div className="relative">
            {/* Animated Track */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-brand-dark/5 -translate-x-1/2 overflow-hidden z-0">
               <motion.div 
                 style={{ scaleY: springScroll }}
                 className="absolute top-0 left-0 right-0 origin-top bg-primary-yellow/20 w-full"
               />
            </div>

            {/* Moving Egg Element - Visible on all devices, higher Z index than background but lower than cards */}
            <motion.div 
              style={{ 
                top: eggY, 
                rotate: eggRotate, 
                x: eggX
              }}
              className="absolute left-8 md:left-1/2 w-16 h-20 md:w-24 md:h-28 -ml-8 md:-ml-12 z-10 pointer-events-none"
            >
               <motion.div 
                 style={{ backgroundColor: eggBaseColor }}
                 className="w-full h-full rounded-[50%_50%_50%_50%_/_65%_65%_35%_35%] shadow-[inset_-12px_-12px_25px_rgba(13,27,15,0.15),_inset_8px_8px_15px_rgba(255,255,255,0.8),_0_20px_40px_rgba(0,0,0,0.15)] border border-white/40 relative overflow-hidden"
               >
                  {/* Depth shading */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#9a8c73]/20 via-transparent to-white/40" />
                  <div className="absolute top-[8%] left-[20%] w-[25%] h-[35%] bg-white/70 rounded-full blur-[4px] -rotate-[25deg]" />
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-brand-dark/10 to-transparent" />
               </motion.div>
            </motion.div>
            
            <div className="space-y-40 md:space-y-80 relative z-20">
              {processSteps.map((step, i) => (
                <div key={i} className="relative">
                  <div className={cn(
                    "flex flex-col md:flex-row gap-20 items-center justify-between",
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  )}>
                    <motion.div 
                      initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full md:w-[45%] pl-20 md:pl-0 z-30"
                    >
                      <div className={cn(
                        "p-10 md:p-16 rounded-[40px] shadow-[0_30px_100px_rgba(0,0,0,0.05)] border transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 relative",
                        step.color,
                        step.textColor,
                        "border-white/10 font-sans"
                      )}>
                        <div className="flex items-center gap-6 mb-8">
                           <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                              <step.icon size={32} />
                           </div>
                           <span className="text-6xl md:text-8xl font-serif opacity-20 font-bold italic">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                        </div>
                        
                        <h3 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
                          {step.title}
                        </h3>
                        <div className={cn("w-20 h-1 mb-8 opacity-40", i % 2 !== 1 ? "bg-white" : "bg-brand-dark")} />
                        <p className="font-sans text-xl leading-relaxed opacity-80">
                          {step.description}
                        </p>

                        <div className="mt-12 flex items-center gap-4 text-sm font-bold tracking-widest uppercase opacity-60">
                           <div className="w-8 h-[1px] bg-current" />
                           Loko Standards
                        </div>
                      </div>
                    </motion.div>

                    <motion.div 
                       initial={{ opacity: 0, scale: 0.8, rotate: i % 2 === 0 ? 5 : -5 }}
                       whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                       viewport={{ once: true, margin: "-100px" }}
                       transition={{ duration: 1.5, delay: 0.2 }}
                       className="w-full md:w-1/2 aspect-video rounded-[60px] overflow-hidden shadow-2xl relative group z-30"
                    >
                       <Image 
                         src={i % 2 === 0 ? "/gallery/farm1.JPG" : "/hero.png"} 
                         alt={step.title} 
                         fill 
                         sizes="(max-width: 768px) 100vw, 50vw"
                         className="object-cover transition-transform group-hover:scale-110 duration-[3000ms]" 
                       />
                       <div className="absolute inset-0 bg-brand-dark/30 group-hover:bg-transparent transition-colors duration-[2000ms]" />
                       
                       <div className="absolute bottom-10 right-10 text-white flex flex-col items-end">
                          <span className="text-xs font-bold tracking-[4px] uppercase opacity-60 mb-2">Step</span>
                          <span className="text-6xl font-serif font-bold italic opacity-90">{i + 1}</span>
                       </div>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none rotate-12">
            <Egg size={800} />
        </div>
      </section>

      {/* Mission & Vision - Bold Cards */}
      <section className="py-60 bg-off-white px-6">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-20 md:p-32 rounded-[80px] bg-dark-green text-white relative overflow-hidden group min-h-[600px] flex flex-col justify-end"
                >
                    <div className="absolute -top-20 -right-20 opacity-5 group-hover:rotate-12 transition-transform duration-[3000ms]">
                        <Target className="w-96 h-96" />
                    </div>
                    <div className="relative z-10">
                        <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-10 border border-white/10 group-hover:bg-primary-yellow group-hover:text-brand-dark transition-all duration-700">
                           <Target className="w-10 h-10" />
                        </div>
                        <h2 className="text-5xl font-serif mb-8">Our Mission</h2>
                        <p className="text-white/60 text-xl leading-relaxed max-w-md">
                            Revolutionizing the poultry landscape by merging ancestral wisdom with cutting-edge tech.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="p-20 md:p-32 rounded-[80px] bg-primary-yellow text-brand-dark relative overflow-hidden group min-h-[600px] flex flex-col justify-end"
                >
                    <div className="absolute -top-20 -right-20 opacity-5 group-hover:-rotate-12 transition-transform duration-[3000ms]">
                        <Eye className="w-96 h-96" />
                    </div>
                    <div className="relative z-10">
                        <div className="w-20 h-20 rounded-3xl bg-brand-dark/5 flex items-center justify-center mb-10 border border-brand-dark/10 group-hover:bg-brand-dark group-hover:text-white transition-all duration-700">
                           <Eye className="w-10 h-10" />
                        </div>
                        <h2 className="text-5xl font-serif mb-8">Our Vision</h2>
                        <p className="text-brand-dark/60 text-xl leading-relaxed max-w-md">
                            Defining the global standard for earthy luxury and sustainable, natural poultry excellence.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
      </section>

      {/* Detailed Operations section */}
      <section className="py-60 px-6 bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-10" />
        <div className="max-w-6xl mx-auto text-center relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="text-5xl md:text-9xl font-serif text-white mb-20 leading-none">
                   Loko <br/> <span className="text-primary-yellow">Standards</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-24 text-left">
                    <div className="space-y-12">
                        <p className="text-white/50 text-2xl leading-relaxed font-serif italic">
                            "We believe the best eggs come from the happiest chickens eating the best food from mother nature."
                        </p>
                        <div className="space-y-6">
                            {["Pasture-First Policy", "Organic Herb Blend", "Natural Golden Yolks"].map(item => (
                                <div key={item} className="flex items-center gap-6 text-white/80 font-sans tracking-widest text-sm font-bold">
                                    <div className="w-2 h-2 rounded-full bg-primary-yellow" /> {item}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-12">
                         <p className="text-white/40 text-lg leading-relaxed">
                            Every egg we produce is a promise of quality. Our birds spend their days enjoying fresh pastures and a special mix of healthy herbs. This natural way of farming is why Loko Harvest eggs are so special, tasty, and good for your family.
                         </p>
                        <div className="space-y-6">
                            {["Happy Bird Housing", "Farm-to-Table Freshness", "Safe & Clean Standards"].map(item => (
                                <div key={item} className="flex items-center gap-6 text-white/80 font-sans tracking-widest text-sm font-bold">
                                    <div className="w-2 h-2 rounded-full bg-primary-yellow" /> {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-40 px-6 bg-primary-yellow relative overflow-hidden">
        <motion.div 
           animate={{ rotate: 360 }}
           transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
           className="absolute -top-40 -left-40 opacity-10 pointer-events-none"
        >
           <Leaf className="w-[500px] h-[500px]" />
        </motion.div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-5xl md:text-8xl font-serif text-brand-dark mb-16 leading-tight">Ready to Experience <br/> Loko Harvest?</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
                <Link href="/orders" className="px-16 py-7 bg-brand-dark text-white rounded-full font-serif text-2xl hover:scale-105 active:scale-95 transition-transform flex items-center gap-4 group">
                    Start Your Order <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </Link>
                <Link href="/#contact" className="px-16 py-7 border-2 border-brand-dark text-brand-dark rounded-full font-serif text-2xl hover:bg-brand-dark hover:text-white transition-all">
                    Inquire Now
                </Link>
            </div>
        </div>
      </section>
    </div>
  );
}

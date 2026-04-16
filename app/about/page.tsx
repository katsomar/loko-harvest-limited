"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Eye, Shield, Users, Sprout, Heart, Leaf, ChevronRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";

const timeline = [
  { year: "2014", title: "Humbling Roots", description: "Loko Harvest began with just 500 birds and a passion for ethical farming. We manually tended to each bird, learning the language of the land and the needs of our flock.", image: "/hero.png" },
  { year: "2016", title: "Modernizing the Vision", description: "Automated systems were introduced to ensure precise feeding and temperature control, significantly improving the welfare of our poultry.", image: "/gallery/farm1.JPG" },
  { year: "2019", title: "Regional Hub", description: "We opened three new state-of-the-art facilities, becoming a primary supplier for the central and western regions.", image: "/hero.png" },
  { year: "2024", title: "Sustainable Leadership", description: "Integration of solar energy and circular waste management, setting a new benchmark for eco-luxury farming in Uganda.", image: "/gallery/farm1.JPG" },
];

const values = [
  { icon: Shield, title: "Uncompromising Quality", description: "We adhere to the strictest health standards, ensuring every product is safe, fresh, and nutrient-rich." },
  { icon: Sprout, title: "Sustainability", description: "Our farming practices are designed to regenerate the earth, not deplete it. We use 70% less water than traditional farms." },
  { icon: Users, title: "Community First", description: "Empowering local farmers through training and fair-trade partnerships since day one." },
  { icon: Heart, title: "Animal Welfare", description: "A happy bird is a healthy bird. We provide stress-free environments and natural growth cycles." },
];

export default function AboutBiographyPage() {
  return (
    <div className="bg-white min-h-screen">
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
              Established 2014
            </motion.span>
            <h1 className="text-5xl sm:text-7xl md:text-[12rem] font-serif text-white overflow-hidden flex flex-wrap justify-center items-center gap-x-4 sm:gap-x-8 leading-none">
              {"Our Story".split(" ").map((word, wordIndex) => (
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
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="mt-12 text-white/40 font-sans tracking-[4px] uppercase text-[10px]"
            >
              A Decade of Earthy Luxury
            </motion.p>
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

      {/* Vertical Timeline - Rich Storytelling */}
      <section className="py-60 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-40">
            <span className="text-primary-yellow font-sans text-sm font-bold uppercase tracking-[6px] block mb-6">The Journey</span>
            <h2 className="text-5xl md:text-8xl font-serif text-brand-dark leading-none">Forged in Nature</h2>
          </div>

          <div className="relative ml-0 md:ml-0 overflow-visible">
            {/* Center Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-brand-dark/5" />
            
            <div className="space-y-40">
              {timeline.map((item, i) => (
                <div key={i} className="relative">
                  {/* Dot */}
                  <div className="absolute left-8 md:left-1/2 top-0 w-3 h-3 rounded-full bg-primary-yellow -translate-x-1/2 z-10 shadow-xl shadow-primary-yellow/20" />
                  
                  <div className={cn(
                    "flex flex-col md:flex-row gap-20 items-center justify-between",
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  )}>
                    <motion.div 
                      initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full md:w-[45%] pl-16 md:pl-0"
                    >
                      <span className="text-primary-yellow font-serif text-7xl font-bold italic mb-6 block opacity-20">
                        {item.year}
                      </span>
                      <h3 className="text-4xl md:text-5xl font-serif text-brand-dark mb-8 leading-tight">
                        {item.title}
                      </h3>
                      <div className="w-16 h-1 bg-primary-yellow/20 mb-8" />
                      <p className="text-brand-dark/60 font-sans text-xl leading-relaxed italic">
                        {item.description}
                      </p>
                    </motion.div>

                    <motion.div 
                       initial={{ opacity: 0, scale: 0.8, rotate: i % 2 === 0 ? 5 : -5 }}
                       whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                       viewport={{ once: true, margin: "-100px" }}
                       transition={{ duration: 1.5, delay: 0.2 }}
                       className="w-full md:w-1/2 aspect-[4/3] rounded-[60px] overflow-hidden shadow-2xl relative group"
                    >
                       <Image 
                         src={item.image} 
                         alt={item.title} 
                         fill 
                         sizes="(max-width: 768px) 100vw, 50vw"
                         className="object-cover transition-transform group-hover:scale-105 duration-[2000ms]" 
                       />
                       <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors duration-1000" />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
                   Legacy in <br/> <span className="text-primary-yellow">Motion</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-24 text-left">
                    <div className="space-y-12">
                        <p className="text-white/50 text-2xl leading-relaxed font-serif italic">
                            "Transparency is not a feature; it is our foundation. From the first hatch to the final delivery, we honor the life cycle."
                        </p>
                        <div className="space-y-6">
                            {["ISO 22000 World-Standard", "Bio-Metric Climate Guard", "Zero-Waste Ecosystem"].map(item => (
                                <div key={item} className="flex items-center gap-6 text-white/80 font-sans tracking-widest text-sm font-bold">
                                    <div className="w-2 h-2 rounded-full bg-primary-yellow" /> {item}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-12">
                         <p className="text-white/40 text-lg leading-relaxed">
                            Spanning over 500 acres of revitalized terrain, our facilities represent the pinnacle of ethical engineering. We've replaced mass production with precise, individual care, ensuring that every Loko Harvest product is a testament to quality.
                        </p>
                        <div className="space-y-6">
                            {["Real-time Health Monitoring", "Regional Logistics Hub", "Direct-to-Table Chain"].map(item => (
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

"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const stats = [
  { label: "Years of Excellence", value: 10, suffix: "+" },
  { label: "Healthy Birds", value: 50000, suffix: "+" },
  { label: "Active Regions", value: 3, suffix: "" },
];

const milestones = [
  { year: "2014", title: "The Beginning", description: "Loko Harvest founded with a vision for sustainable poultry farming." },
  { year: "2017", title: "Regional Expansion", description: "Expanded operations to cover 3 major regions in Uganda." },
  { year: "2020", title: "Quality Certification", description: "Received top-tier national environmental and health certifications." },
  { year: "2023", title: "Sustainable Tech", description: "Implementing state-of-the-art automated feeding and health monitoring." },
];

const CountUp = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

export const AboutSection = () => {
  return (
    <section id="about" className="py-32 px-6 bg-off-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-20 items-center mb-32">
          {/* Left: Image & Stats */}
          <div className="relative w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/teams/entireteam1.jpeg"
                alt="Poultry farm operations"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
            
            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="absolute -bottom-10 -right-4 md:right-10 bg-dark-green p-8 rounded-xl shadow-2xl z-20 w-[80%] md:w-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center md:text-left min-w-[120px]">
                    <p className="text-primary-yellow text-3xl font-serif font-bold mb-1">
                      <CountUp value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="text-white/60 text-xs uppercase tracking-widest">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Content */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <span className="text-primary-yellow font-sans text-sm font-bold uppercase tracking-[4px] block mb-4">
                Who We Are
              </span>
              <h2 className="text-4xl md:text-6xl font-serif text-brand-dark mb-8 leading-tight">
                A Legacy of Quality Poultry Farming
              </h2>
              <div className="space-y-6 text-brand-dark/70 font-sans leading-relaxed text-lg italic">
                <p>
                  At Loko Harvest Limited, we believe that premium quality starts at the roots. Founded a decade ago, our journey began with a simple mission: to provide the healthiest, most naturally raised poultry to families across the region.
                </p>
                <p>
                  We combine traditional farming wisdom with modern sustainable practices. Our birds are raised in a stress-free environment, fed with the highest quality organic nutrition, and monitored by expert caretakers who treat every bird with respect.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-32 relative">
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-brand-dark/10 hidden md:block" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {milestones.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="relative bg-white p-8 rounded-xl shadow-sm border border-brand-dark/5 hover:border-primary-yellow hover:shadow-xl transition-all group"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary-yellow border-4 border-white hidden md:block" />
                <span className="text-primary-yellow font-serif text-4xl font-bold block mb-4 group-hover:scale-110 transition-transform origin-left">
                  {item.year}
                </span>
                <h3 className="text-xl font-serif font-bold mb-2">{item.title}</h3>
                <p className="text-brand-dark/60 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

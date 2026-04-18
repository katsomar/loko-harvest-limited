"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Award, 
  Leaf, 
  Lightbulb, 
  Users, 
  Handshake, 
  TrendingUp, 
  ShieldCheck, 
  HeartHandshake 
} from "lucide-react";

const values = [
  {
    icon: Award,
    title: "Quality Excellence",
    description: "Maintain the highest standards of quality to ensure safe, herbal, nutritious products that meet consumer expectations.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "Commit to using resources wisely and responsibly, promoting the well-being of the environment, animals and people.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Embrace the latest innovations and technologies to continually improve processes and achieve better results in egg production.",
  },
  {
    icon: Users,
    title: "Customer-Centricity",
    description: "Focus on understanding and meeting customer needs, ensuring satisfaction through high-quality, safe products and services.",
  },
  {
    icon: Handshake,
    title: "Integrity",
    description: "Conduct business with honesty, transparency, and ethical behavior in all operations.",
  },
  {
    icon: TrendingUp,
    title: "Growth-Orientation",
    description: "Dedicate to sustainable growth, expanding operations to meet global food security needs and create lasting value for communities.",
  },
  {
    icon: ShieldCheck,
    title: "Responsibility",
    description: "Take responsibility for the well-being of employees, customers, and stakeholders while ensuring ethical practices across all areas.",
  },
  {
    icon: HeartHandshake,
    title: "Inclusivity",
    description: "Foster an inclusive culture where each team member is respected, valued, and encouraged to contribute to the company's success.",
  },
];

export const ValuesSection = () => {
  return (
    <section className="py-24 px-6 bg-primary-yellow relative overflow-hidden">
      {/* Decorative background patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-dark/40 font-sans text-sm font-bold uppercase tracking-[6px] block mb-4"
          >
            What We Stand For
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif text-brand-dark"
          >
            Core Values
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-brand-dark mx-auto mt-6"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((val, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white/40 backdrop-blur-md p-8 rounded-[32px] border border-brand-dark/5 hover:bg-white transition-all duration-500 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-dark text-primary-yellow flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-lg shadow-brand-dark/10">
                <val.icon size={28} />
              </div>
              <h3 className="text-xl font-serif font-bold text-brand-dark mb-4">{val.title}</h3>
              <p className="text-brand-dark/70 text-sm leading-relaxed font-sans">
                {val.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

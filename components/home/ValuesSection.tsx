"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Award, Leaf, Lightbulb, Users, 
  Handshake, TrendingUp, ShieldCheck, HeartHandshake,
  Sparkles
} from "lucide-react";

const values = [
  {
    icon: Award,
    title: "Quality Excellence",
    description: "Maintain the highest standards of quality to ensure safe, herbal, nutritious products that meet consumer expectations.",
    size: "md:col-span-2",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "Commit to using resources wisely and responsibly for the environment.",
    size: "md:col-span-1",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Embracing technology to achieve results in egg production.",
    size: "md:col-span-1",
  },
  {
    icon: Users,
    title: "Customer-Centricity",
    description: "Focus on understanding and meeting customer needs, ensuring satisfaction through safe products.",
    size: "md:col-span-1",
  },
  {
    icon: Handshake,
    title: "Integrity",
    description: "Conduct business with honesty, transparency, and ethical behavior.",
    size: "md:col-span-1",
  },
  {
    icon: TrendingUp,
    title: "Growth-Orientation",
    description: "Dedicate to sustainable growth, expanding operations to meet global food security needs.",
    size: "md:col-span-2",
  },
  {
    icon: ShieldCheck,
    title: "Responsibility",
    description: "Taking responsibility for the well-being of employees, customers, and stakeholders.",
    size: "md:col-span-2",
  },
  {
    icon: HeartHandshake,
    title: "Inclusivity",
    description: "Foster an inclusive culture where each team member is respected and valued.",
    size: "md:col-span-2",
  },
];

export const ValuesSection = () => {
  return (
    <section className="py-32 px-6 bg-primary-yellow relative overflow-hidden">
      {/* Cinematic Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-dark-green/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/40 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 text-dark-green font-bold uppercase tracking-[6px] text-xs mb-6"
            >
              <Sparkles size={16} />
              The Loko Way
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-8xl font-serif text-brand-dark leading-[0.9]"
            >
              Our Core <br />
              <span className="text-dark-green italic">Philosophy</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-brand-dark/60 font-sans max-w-sm text-lg leading-relaxed border-l-2 border-dark-green/20 pl-8"
          >
            Built on a decade of trust, these principles drive every egg we hatch and every life we touch.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {values.map((val, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`${val.size} group relative min-h-[250px] md:min-h-[300px] bg-white rounded-[40px] p-10 overflow-hidden flex flex-col justify-end transition-all duration-700 hover:shadow-[0_40px_80px_-15px_rgba(45,106,79,0.15)]`}
            >
              {/* Floating Watermark Icon */}
              <div className="absolute top-6 right-6 text-primary-yellow/20 group-hover:text-primary-yellow/40 transition-all duration-1000 group-hover:scale-150 group-hover:rotate-12">
                <val.icon size={180} strokeWidth={0.5} />
              </div>

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-dark-green text-primary-yellow flex items-center justify-center mb-8 transform group-hover:-rotate-6 transition-transform duration-500 shadow-xl shadow-dark-green/10">
                  <val.icon size={28} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-brand-dark mb-4">{val.title}</h3>
                <p className="text-brand-dark/50 text-base leading-relaxed group-hover:text-brand-dark transition-colors duration-500">
                  {val.description}
                </p>
              </div>

              {/* Decorative Corner Accents */}
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-primary-yellow/10 rounded-tl-[80px] translate-x-8 translate-y-8 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

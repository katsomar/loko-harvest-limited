"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Eye, ShieldCheck, Sparkles } from "lucide-react";

export const MissionVision = () => {
  return (
    <section className="py-32 px-6 bg-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-primary-yellow/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-dark-green/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary-yellow font-sans text-sm font-bold uppercase tracking-[8px] block mb-4"
          >
            Purpose & Drive
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-serif text-brand-dark leading-tight"
          >
            Our Commitment <br /> <span className="italic text-dark-green">To Excellence</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group relative h-[500px] rounded-[40px] overflow-hidden bg-brand-dark flex flex-col justify-end p-12 transition-all duration-700 hover:shadow-2xl hover:shadow-primary-yellow/20"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-dark-green via-transparent to-transparent opacity-60" />
            
            {/* Background Icon */}
            <motion.div 
               animate={{ rotate: [0, 10, 0], scale: [1, 1.1, 1] }}
               transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -top-10 -right-10 text-white/5"
            >
               <Target size={300} strokeWidth={1} />
            </motion.div>

            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-primary-yellow flex items-center justify-center mb-8 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl shadow-primary-yellow/20">
                <Target className="text-brand-dark" size={32} />
              </div>
              <h3 className="text-4xl font-serif text-white mb-6">Our Mission</h3>
              <p className="text-white/60 text-lg leading-relaxed max-w-sm group-hover:text-white transition-colors duration-500">
                Revolutionizing the poultry landscape by merging ancestral wisdom with cutting-edge technology to deliver purity in every product.
              </p>
              
              <div className="mt-8 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                <div className="h-[1px] w-12 bg-primary-yellow" />
                <span className="text-primary-yellow text-xs font-bold uppercase tracking-widest">Driven by Nature</span>
              </div>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group relative h-[500px] rounded-[40px] overflow-hidden bg-primary-yellow flex flex-col justify-end p-12 transition-all duration-700 hover:shadow-2xl hover:shadow-brand-dark/20"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/10 via-transparent to-transparent" />

            {/* Background Icon */}
            <motion.div 
               animate={{ rotate: [0, -10, 0], scale: [1, 1.1, 1] }}
               transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute -top-10 -right-10 text-brand-dark/5"
            >
               <Eye size={300} strokeWidth={1} />
            </motion.div>

            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-brand-dark flex items-center justify-center mb-8 transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 shadow-xl shadow-brand-dark/10">
                <Eye className="text-primary-yellow" size={32} />
              </div>
              <h3 className="text-4xl font-serif text-brand-dark mb-6">Our Vision</h3>
              <p className="text-brand-dark/60 text-lg leading-relaxed max-w-sm group-hover:text-brand-dark transition-colors duration-500">
                Defining the global standard for earthy luxury and sustainable, natural poultry excellence that inspires a healthier future.
              </p>

              <div className="mt-8 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                <div className="h-[1px] w-12 bg-brand-dark" />
                <span className="text-brand-dark text-xs font-bold uppercase tracking-widest">Global Purity Standard</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-brand-dark/5 pt-16">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="flex items-center gap-6"
           >
              <div className="w-12 h-12 rounded-full bg-dark-green/5 flex items-center justify-center text-dark-green">
                 <ShieldCheck size={24} />
              </div>
              <div>
                 <h4 className="font-bold text-brand-dark">Unwavering Quality</h4>
                 <p className="text-brand-dark/40 text-sm">Stringent standards in every egg.</p>
              </div>
           </motion.div>
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="flex items-center gap-6"
           >
              <div className="w-12 h-12 rounded-full bg-primary-yellow/10 flex items-center justify-center text-primary-yellow">
                 <Sparkles size={24} />
              </div>
              <div>
                 <h4 className="font-bold text-brand-dark">Earth Inspired</h4>
                 <p className="text-brand-dark/40 text-sm">Working in harmony with nature.</p>
              </div>
           </motion.div>
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="flex items-center gap-6"
           >
              <div className="w-12 h-12 rounded-full bg-dark-green/5 flex items-center justify-center text-dark-green">
                 <Sparkles size={24} />
              </div>
              <div>
                 <h4 className="font-bold text-brand-dark">Future Focused</h4>
                 <p className="text-brand-dark/40 text-sm">Sustainable farming for legacy.</p>
              </div>
           </motion.div>
        </div>
      </div>
    </section>
  );
};

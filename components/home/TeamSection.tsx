"use client";

import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Mail } from "lucide-react";
import Image from "next/image";

const team = [
  {
    name: "Samuel Okello",
    role: "Founding Director",
    bio: "With over 15 years in agriculture, Samuel leads with a vision for sustainable growth.",
    image: "/team_1.png",
  },
  {
    name: "Sarah Namubiru",
    role: "Operations Manager",
    bio: "Sarah ensures our farm runs with precision and care, maintaining our high standards.",
    image: "/team_2.png",
  },
  {
    name: "Dr. James Kato",
    role: "Head Veterinarian",
    bio: "Expert in avian health, Dr. James guarantees the welfare and quality of our flock.",
    image: "/team_3.png",
  },
];

export const TeamSection = () => {
  return (
    <section className="py-32 px-6 bg-brand-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-serif text-white mb-6"
          >
            Meet The People Behind The Farm
          </motion.h2>
          <div className="w-24 h-1 bg-primary-yellow mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="group relative bg-white/5 rounded-3xl p-10 flex flex-col items-center text-center border border-white/10 hover:shadow-2xl hover:shadow-primary-yellow/10 transition-all duration-500 overflow-hidden"
            >
              {/* Green Overlay that slides up - revealing social links */}
              <div className="absolute inset-0 bg-dark-green translate-y-full group-hover:translate-y-0 transition-transform duration-700 z-20 flex flex-col items-center justify-center p-8">
                <p className="text-white/60 mb-8 italic text-sm">"Lead with vision, grow with care."</p>
                <div className="flex justify-center gap-4">
                  {[Linkedin, Twitter, Mail].map((Icon, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary-yellow hover:border-primary-yellow hover:text-brand-dark text-white transition-all transform hover:scale-110"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Circular Photo */}
              <div className="relative w-40 h-40 mb-8 z-10">
                <div className="absolute inset-0 rounded-full border-2 border-primary-yellow/20 group-hover:border-primary-yellow scale-110 transition-all duration-500" />
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>
              
              <div className="z-10 relative">
                <h3 className="text-2xl font-serif text-white font-bold mb-2 group-hover:text-primary-yellow transition-colors">
                  {member.name}
                </h3>
                <p className="text-primary-yellow/80 font-sans text-xs uppercase tracking-widest mb-6 font-bold">
                  {member.role}
                </p>
                <p className="text-white/60 text-sm leading-relaxed max-w-[240px] mx-auto">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

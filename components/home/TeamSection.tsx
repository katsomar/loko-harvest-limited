"use client";

import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Mail } from "lucide-react";
import Image from "next/image";

const team = [
  {
    name: "Annette Mehangye Mbabazi",
    role: "Director",
    bio: "The director of loko harvest limited with over 15 years of experience in this field. She is a visionary leader who has built a successful business from the ground up.",
    image: "/teams/ann.JPG",
    quote: "Success is not just about reaching the finish line, it's about the seeds you plant along the way."
  },
  {
    name: "Mbabazi Jackson",
    role: "Founding Director",
    bio: "He is the pillar of loko harvest limited with a vision to see the company grow and expand its reach to other parts of the country.",
    image: "/teams/entireteam1.jpeg",
    quote: "Vision is the art of seeing things invisible to others, and making them a reality for everyone."
  },
  {
    name: "Babra Mehangye Kahima",
    role: "Head of marketing",
    bio: "She heads the marketing team and is responsible for the promotion and sale of our products.",
    image: "/teams/babra1.JPG",
    quote: "Our story is in every yolk. Marketing is simply sharing the natural melody of the farm."
  },
  {
    name: "Uwamahoro Desire Edrine",
    role: "Monitoring and Evaluation",
    bio: "She monitors the farm and ensures that the products are of high quality.",
    image: "/teams/desire1.JPG",
    quote: "Precision in the pastures leads to perfection in the nest. We measure what matters: Quality."
  },
  {
    name: "Emmanuel Lumbuye",
    role: "Head of sales",
    bio: "He is in charge of sales and marketing and ensures that our products are sold at the best possible prices.",
    image: "/teams/emma.JPG",
    quote: "Relationships are our best harvest. We deliver trust, one fresh egg at a time."
  },
  {
    name: "Masaba Daudi",
    role: "Finance and accounts",
    bio: "He is in charge of finance and accounts and ensures that our products are sold at the best possible prices.",
    image: "/teams/daudi1.JPG",
    quote: "Integrity is the currency of Loko Harvest. Every number tells a story of sustainability."
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
              {/* Green Overlay that slides up - revealing the unique quote */}
              <div className="absolute inset-0 bg-dark-green translate-y-full group-hover:translate-y-0 transition-transform duration-700 z-20 flex flex-col items-center justify-center p-8">
                <p className="text-white/80 mb-8 italic text-base font-serif px-4">"{member.quote}"</p>
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
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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

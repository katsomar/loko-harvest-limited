"use client";

import React from "react";
import { motion } from "framer-motion";

interface LeafyCornerProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
  delay?: number;
}

export const LeafyCorner = ({ position, className = "", delay = 0 }: LeafyCornerProps) => {
  const rotation = {
    "top-left": 0,
    "top-right": 90,
    "bottom-right": 180,
    "bottom-left": 270,
  };

  const posClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-right": "bottom-0 right-0",
    "bottom-left": "bottom-0 left-0",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: rotation[position] - 10 }}
      whileInView={{ opacity: 0.6, scale: 1, rotate: rotation[position] }}
      transition={{ duration: 1.5, delay, ease: "easeOut" }}
      viewport={{ once: true }}
      className={`absolute pointer-events-none z-0 ${posClasses[position]} ${className}`}
    >
      <svg
        width="300"
        height="300"
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-48 h-48 md:w-80 md:h-80"
      >
        {/* Main Vine */}
        <motion.path
          d="M0 0C50 20 100 100 150 150C200 200 280 250 300 300"
          stroke="#1B4332"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 2, delay: delay + 0.5 }}
        />
        
        {/* Leaves along the vine */}
        {[
          { cx: 40, cy: 30, r: 15, rot: 45 },
          { cx: 80, cy: 90, r: 20, rot: 30 },
          { cx: 130, cy: 140, r: 18, rot: 60 },
          { cx: 180, cy: 190, r: 22, rot: 20 },
          { cx: 240, cy: 250, r: 25, rot: 40 },
          { cx: 20, cy: 60, r: 12, rot: 80 },
          { cx: 100, cy: 50, r: 16, rot: 10 },
          { cx: 200, cy: 150, r: 14, rot: 50 },
        ].map((leaf, i) => (
          <motion.path
            key={i}
            d={`M${leaf.cx} ${leaf.cy} Q${leaf.cx + leaf.r} ${leaf.cy - leaf.r} ${leaf.cx + leaf.r * 2} ${leaf.cy} Q${leaf.cx + leaf.r} ${leaf.cy + leaf.r} ${leaf.cx} ${leaf.cy}`}
            fill="#2D6A4F"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: delay + 1 + i * 0.1 }}
            style={{ transformOrigin: `${leaf.cx}px ${leaf.cy}px`, rotate: `${leaf.rot}deg` }}
          />
        ))}

        {/* Smaller accent vine */}
        <motion.path
          d="M0 50C30 70 60 150 150 180"
          stroke="#1B4332"
          strokeWidth="1"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: delay + 0.8 }}
        />
      </svg>
    </motion.div>
  );
};

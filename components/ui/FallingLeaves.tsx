"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LeafIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2C12 2 12 10 2 12C2 12 10 12 12 22C12 22 12 14 22 12C22 12 14 12 12 2Z"
      fill={color}
      fillOpacity="0.3"
    />
  </svg>
);

export const FallingLeaves = () => {
  const [leaves, setLeaves] = useState<{ id: number; x: number; delay: number; duration: number; size: number; rotation: number }[]>([]);

  useEffect(() => {
    const newLeaves = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      delay: Math.random() * 10,
      duration: 10 + Math.random() * 20,
      size: 10 + Math.random() * 30,
      rotation: Math.random() * 360,
    }));
    setLeaves(newLeaves);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          initial={{ 
            y: -50, 
            x: `${leaf.x}%`, 
            rotate: leaf.rotation, 
            opacity: 0,
            scale: 0.5 
          }}
          animate={{ 
            y: "110vh",
            x: [`${leaf.x}%`, `${leaf.x + (Math.random() * 20 - 10)}%`, `${leaf.x}%`],
            rotate: leaf.rotation + 720,
            opacity: [0, 0.4, 0.4, 0],
            scale: 1
          }}
          transition={{ 
            duration: leaf.duration, 
            repeat: Infinity, 
            delay: leaf.delay,
            ease: "linear"
          }}
          style={{ position: "absolute", width: leaf.size, height: leaf.size }}
        >
          <LeafIcon color={Math.random() > 0.5 ? "#2D6A4F" : "#40916C"} />
        </motion.div>
      ))}
    </div>
  );
};
